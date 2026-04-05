const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const COURTLISTENER_BASE = "https://www.courtlistener.com/api/rest/v4";

const SEARCH_QUERIES = [
  "Hudson Homes Management",
  "Hudson Homes Management LLC",
  "LSF9 Master Participation Trust",
  "LSF10 Master Participation Trust",
];

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 80);
}

function inferFilingType(cause, nature) {
  const combined = `${cause ?? ""} ${nature ?? ""}`.toLowerCase();
  if (combined.includes("evict")) return "Eviction";
  if (combined.includes("class action")) return "Class Action";
  if (combined.includes("foreclos")) return "Foreclosure";
  if (combined.includes("housing")) return "Civil — Housing";
  if (combined.includes("contract")) return "Civil — Contract";
  if (combined.includes("fraud")) return "Civil — Fraud";
  if (combined.includes("bankruptcy")) return "Bankruptcy";
  return "Civil";
}

async function searchCourtListener(query) {
  const params = new URLSearchParams({ q: query, type: "d", order_by: "score desc", page_size: "20" });
  const url = `${COURTLISTENER_BASE}/dockets/?${params}`;
  const res = await fetch(url, {
    headers: {
      "User-Agent": "HoldoverProject/1.0 (public interest archive; papadunit@gmail.com)",
      Accept: "application/json",
    },
  });
  if (!res.ok) return [];
  const data = await res.json();
  return data.results ?? [];
}

async function upsertCase(docket, query) {
  const baseSlug = slugify(docket.case_name || `case-${docket.id}`);
  const slug = `cl-${docket.id}-${baseSlug}`;
  const sourceUrl = `https://www.courtlistener.com${docket.absolute_url}`;
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
    filing_type: inferFilingType(docket.cause, docket.nature_of_suit),
    filed_date: docket.date_filed || null,
    status,
    summary: [
      docket.cause ? `Cause: ${docket.cause}.` : null,
      docket.nature_of_suit ? `Nature of suit: ${docket.nature_of_suit}.` : null,
      `Docket number: ${docket.docket_number}.`,
      `Auto-indexed from CourtListener via search query: "${query}".`,
    ].filter(Boolean).join(" "),
    source_name: "CourtListener / PACER",
    source_url: sourceUrl,
    badge: "public_record",
    published: true,
  };

  const { error } = await supabase.from("cases").upsert(caseRow, { onConflict: "slug", ignoreDuplicates: false });
  if (error) console.error(`Supabase error for ${slug}:`, error.message);
  else console.log(`Upserted: ${caseRow.title}`);
}

exports.handler = async function () {
  console.log("Starting CourtListener scrape...");
  const seen = new Set();
  let total = 0;

  for (const query of SEARCH_QUERIES) {
    try {
      const results = await searchCourtListener(query);
      for (const docket of results) {
        if (seen.has(docket.id)) continue;
        seen.add(docket.id);
        const name = (docket.case_name ?? "").toLowerCase();
        if (name.includes("hudson homes") || name.includes("lsf9") || name.includes("lsf10") || name.includes("lone star")) {
          await upsertCase(docket, query);
          total++;
        }
      }
      await new Promise(r => setTimeout(r, 1000));
    } catch (err) {
      console.error(`Error for query "${query}":`, err);
    }
  }

  console.log(`Done. Upserted ${total} cases.`);
  return { statusCode: 200, body: JSON.stringify({ ok: true, upserted: total }) };
};
