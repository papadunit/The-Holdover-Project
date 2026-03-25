import { SectionHeading, CaseCard } from "../components/ArchiveComponents";
import { cases, siteMeta } from "../data/archiveData";

export default function CourtRecords() {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <SectionHeading
          eyebrow="Court records library"
          title="Documented case activity and record types"
          text="This library groups public materials into landlord-tenant records, trust or attorney-in-fact records, federal consumer collection cases, and complaint examples tied to collections or credit reporting."
        />
        <p className="mt-4 text-sm text-slate-600">{siteMeta.freshnessNote}</p>
      </section>

      <div className="grid gap-5 lg:grid-cols-2">
        {cases.map((item) => (
          <CaseCard key={item.title} item={item} />
        ))}
      </div>
    </div>
  );
}
