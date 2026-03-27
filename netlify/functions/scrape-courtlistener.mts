import type { Config } from "@netlify/functions";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const COURTLISTENER_BASE = "https://www.courtlistener.com/api/rest/v4";

const SEARCH_QUERIES = [
  "Hudson Homes Management",
  "Hudson Homes Management LLC",
  "LSF9 Master Participation Trust",
  "LSF10 Master Participation Trust",
];

interface CLDocket {
  id: number;
  docket_number: string;
  case_name: string;
  court: string;
  date_filed: string | null;
  date_terminated: string | null;
  absolute_url: string;
  pacer_case_id: string | null;
  cause: string | null;
  nature_of_suit: string | null;
  jury_demand: string | null;
  jurisdiction_type: string | null;
  parties_roles?: { party: string }[];
}

interface CLSearchResult {
  count: number;
  results: CLDocket[];
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

function mapBadge(court: string): string {
  if (court.includes("ca") || court.includes("circuit")) return "public_record";
  if (court.includes("bankr")) return "public_record";
  return "public_record";
}

function inferFilingType(cause: string | null, nature: string | null): string {
  const combined = `${cause ?? ""} ${nature ?? ""}`.toLowerCase();
  if (combined.includes("evict")) return "Eviction";
  if (combined.includes("class action")) return "Class Action";
  if (combined.includes("civil rights")) return "Civil Rights";
  if (combined.includes("contract")) return "Civil — Contract";
  if (combined.includes("fraud")) return "Civil — Fraud";
  if (combined.includes("bankruptcy")) return "Bankruptcy";
  if (combined.includes("foreclos")) return "Foreclosure";
  if (combined.includes("housing")) return "Civil — Housing";
  return "Civil";
}

async function searchCourtListener(query: string): Promise<CLDocket[]> {
  const params = new URLSearchParams({
    q: query,
    type: "d", // dockets
    order_by: "score desc",
    page_size: "20",
  });

  const url = `${COURTLISTENER_BASE}/dockets/?${params}`;
  console.log(`[courtlistener] Searching: ${url}`);

  const res = await fetch(url, {
    headers: {
      "User-Agent": "HoldoverProject/1.0 (public interest archive; papadunit@gmail.com)",
      "Accept": "application/json",
    },
  });

  if (!res.ok) {
    console.error(`[courtlistener] HTTP ${res.status} for query: ${query}`);
    return [];
  }

  const data: CLSearchResult = await res.json();
  console.log(`[courtlistener] Found ${data.count} results for: ${query}`);
  return data.results ?? [];
}

async function upsertCase(docket: CLDocket, query: string) {
  const baseSlug = slugify(docket.case_name || `case-${docket.id}`);
  const slug = `cl-${docket.id}-${baseSlug}`;
  const sourceUrl = `https://www.courtlistener.com${docket.absolute_url}`;

  // Extract state from court ID (e.g. "dcd" → DC, "flmd" → FL)
  const courtId = docket.court ?? "";
  const stateMatch = courtId.match(/^([a-z]{2})/);
  const state = stateMatch ? stateMatch[1].toUpperCase().slice(0, 2) : null;

  const status = docket.date_terminated
    ? `Terminated ${new Date(docket.date_terminated).toLocaleDateString()}`
    : "Active";

  const caseRow = {
    slug,
    title: docket.case_name || `Case #${docket.docket_number}`,
    jurisdiction: docket.court,
    state,
    county: null,
    filing_type: inferFilingType(docket.cause, docket.nature_of_suit),
    filed_date: docket.date_filed || null,
    status,
    parties: docket.case_name || null,
    summary: [
      docket.cause ? `Cause: ${docket.cause}.` : null,
      docket.nature_of_suit ? `Nature of suit: ${docket.nature_of_suit}.` : null,
      docket.jurisdiction_type ? `Jurisdiction: ${docket.jurisdiction_type}.` : null,
      `Docket number: ${docket.docket_number}.`,
      `Auto-indexed from CourtListener via search query: "${query}".`,
    ]
      .filter(Boolean)
      .join(" "),
    source_name: "CourtListener / PACER",
    source_url: sourceUrl,
    badge: mapBadge(docket.court),
    published: true, // auto-publish court records
  };

  const { error } = await supabase
    .from("cases")
    .upsert(caseRow, { onConflict: "slug", ignoreDuplicates: false });

  if (error) {
    console.error(`[courtlistener] Supabase error for ${slug}:`, error.message);
  } else {
    console.log(`[courtlistener] Upserted: ${caseRow.title}`);
  }
}

export default async function handler() {
  console.log("[courtlistener] Starting CourtListener scrape...");

  const seen = new Set<number>();
  let total = 0;

  for (const query of SEARCH_QUERIES) {
    try {
      const results = await searchCourtListener(query);

      for (const docket of results) {
        if (seen.has(docket.id)) continue;
        seen.add(docket.id);

        // Only include cases that actually mention Hudson Homes in the case name
        const name = (docket.case_name ?? "").toLowerCase();
        if (
          name.includes("hudson homes") ||
          name.includes("lsf9") ||
          name.includes("lsf10") ||
          name.includes("lone star")
        ) {
          await upsertCase(docket, query);
          total++;
        }
      }

      // Be polite — small delay between requests
      await new Promise(r => setTimeout(r, 1000));
    } catch (err) {
      console.error(`[courtlistener] Error for query "${query}":`, err);
    }
  }

  console.log(`[courtlistener] Done. Upserted ${total} cases.`);
  return new Response(JSON.stringify({ ok: true, upserted: total }), {
    headers: { "Content-Type": "application/json" },
  });
}

export const config: Config = {
  schedule: "0 6 * * *", // Run daily at 6am UTC
};
