import { useEffect, useState } from "react";
import { SectionHeading, CaseCard } from "../components/ArchiveComponents";
import { cases as staticCases, siteMeta } from "../data/archiveData";
import { supabase } from "../lib/supabase";

export default function CourtRecords() {
  const [liveCases, setLiveCases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCases() {
      const { data, error } = await supabase
        .from("cases")
        .select("*")
        .eq("published", true)
        .order("filed_date", { ascending: false });

      if (!error && data && data.length > 0) {
        setLiveCases(data.map(c => ({
          title: c.title,
          type: c.filing_type || "Court Record",
          jurisdiction: c.jurisdiction,
          state: c.state,
          status: c.status,
          filed: c.filed_date,
          summary: c.summary,
          sourceUrl: c.source_url,
          badge: c.badge || "public_record",
        })));
      }
      setLoading(false);
    }
    fetchCases();
  }, []);

  const allCases = liveCases.length > 0 ? liveCases : staticCases;

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <SectionHeading
          eyebrow="Court records library"
          title="Documented case activity and record types"
          text="This library groups public materials into landlord-tenant records, trust or attorney-in-fact records, federal consumer collection cases, and complaint examples tied to collections or credit reporting."
        />
        <p className="mt-4 text-sm text-slate-600">{siteMeta.freshnessNote}</p>
        {liveCases.length > 0 && (
          <p className="mt-2 text-xs text-green-700 font-medium">
            ● Live — {liveCases.length} cases auto-indexed from public court records
          </p>
        )}
      </section>

      {loading && (
        <div className="text-center py-12 text-slate-500">Loading court records…</div>
      )}

      <div className="grid gap-5 lg:grid-cols-2">
        {allCases.map((item, i) => (
          <CaseCard key={item.title || i} item={item} />
        ))}
      </div>
    </div>
  );
}
