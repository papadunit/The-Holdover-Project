import { SectionHeading, SourceCard } from "../components/ArchiveComponents";
import { siteMeta, sourceRegistry } from "../data/archiveData";

export default function Sources() {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <SectionHeading
          eyebrow="Source registry"
          title="Every major source used in the archive"
          text="This page distinguishes official records from third-party complaint sources, company materials, and government complaint portals. Each entry includes a source type, last-checked date, and short description."
        />
        <p className="mt-4 text-sm text-slate-600">{siteMeta.freshnessNote}</p>
      </section>

      <div className="grid gap-5 lg:grid-cols-2">
        {sourceRegistry.map((item) => (
          <SourceCard key={item.title} item={item} />
        ))}
      </div>
    </div>
  );
}
