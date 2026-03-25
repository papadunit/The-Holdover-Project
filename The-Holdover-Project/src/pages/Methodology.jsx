import { SectionHeading, Callout } from "../components/ArchiveComponents";
import { siteMeta } from "../data/archiveData";

export default function Methodology() {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <SectionHeading
          eyebrow="Methodology"
          title="How this archive is built and reviewed"
          text="The site uses source labels so readers can distinguish official records from third-party complaints, company materials, and official complaint portals. The goal is to support independent review rather than to substitute for the linked source material."
        />
      </section>

      <div className="grid gap-5 md:grid-cols-2">
        <Callout title="Official records vs. third-party complaints" text="Court dockets, judicial opinions, SEC filings, government portals, and company materials are treated as primary or official sources. Complaint-platform entries and tenant submissions are labeled as third-party or user-submitted materials and are not treated as verified proof of wrongdoing by themselves." />
        <Callout title="How counts are calculated" text="Counts shown on the site reflect the number of linked source records or documented categories currently in the archive. Complaint-platform totals are timestamped because those numbers can change." />
        <Callout title="How often sources are checked" text="High-change pages such as complaint totals or company profile pages should be checked weekly. Court dockets, opinions, and regulatory filings should be reviewed when new material is added and then periodically revisited." />
        <Callout title="Limits of complaint examples" text="Complaint examples may illustrate recurring issue categories, but they do not by themselves establish liability or wrongdoing. Readers are encouraged to compare complaint examples with linked official records and agency resources." />
      </div>

      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm text-sm leading-7 text-slate-700">
        <p>{siteMeta.disclaimer}</p>
        <p className="mt-4">{siteMeta.freshnessNote}</p>
      </section>
    </div>
  );
}
