import { SectionHeading, Callout } from "../components/ArchiveComponents";
import { siteMeta } from "../data/archiveData";

export default function Press() {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <SectionHeading
          eyebrow="Media & research overview"
          title="Press-ready project summary"
          text="This site compiles publicly available court records, regulatory actions, company materials, and tenant-submitted reports related to Hudson Homes Management LLC across multiple states. The archive is designed to make it easier to review source material in one place."
        />
      </section>

      <div className="grid gap-5 md:grid-cols-2">
        <Callout title="Key observations" text="Public records indicate activity across multiple jurisdictions, filings spanning multiple years, and repeated dispute categories involving maintenance, billing, deposits, lease termination, collections, and credit-reporting concerns." />
        <Callout title="Data sources" text="Primary source categories include company materials, court dockets, judicial opinions, SEC filings, and official government complaint portals. Third-party complaint platforms and tenant submissions are labeled separately." />
        <Callout title="How to use the archive" text="Readers should verify all information through the linked source material. The site is intended as a structured starting point, not as a substitute for the original records." />
        <Callout title="Media contact" text="Replace the placeholder contact below before public outreach: media@holdoverproject.example" />
      </div>

      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm text-sm leading-7 text-slate-700">
        {siteMeta.disclaimer}
      </section>
    </div>
  );
}
