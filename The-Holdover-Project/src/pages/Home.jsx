import {
  siteMeta,
  stats,
  keyObservations,
  cases,
  companyContext,
  complaintThemes,
  consumerActions,
  entityMap,
} from "../data/archiveData";
import { CaseCard, Callout, SectionHeading, StatCard } from "../components/ArchiveComponents";

export default function Home({ setPage }) {
  return (
    <div className="space-y-10">
      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-12">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">Source-centered archive</p>
        <h2 className="mt-3 text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
          A Multi-State Investigation Into Hudson Homes Management LLC
        </h2>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">{siteMeta.subtitle}</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button onClick={() => setPage("courtRecords")} className="border-black bg-black text-white hover:bg-slate-900">
            View documented cases
          </button>
          <button onClick={() => setPage("methodology")}>Review methodology</button>
          <button onClick={() => setPage("submit")}>Submit information</button>
        </div>
        <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-7 text-slate-700">
          {siteMeta.disclaimer}
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <SectionHeading
          eyebrow="About this project"
          title="A structured archive for independent review"
          text="This project organizes publicly available court records, regulatory actions, company materials, and tenant-submitted reports into a structured archive for review. The goal is to present information in a clear and accessible format so patterns and timelines can be independently evaluated using original source material."
        />
        <p className="mt-4 text-sm text-slate-600">
          Sources include public court databases, government agencies, documented filings, official company materials, and third-party complaint platforms.
        </p>
      </section>

      <section>
        <SectionHeading eyebrow="Documented activity snapshot" title="Scope of documented activity" text={siteMeta.freshnessNote} />
        <div className="mt-6 grid gap-4 md:grid-cols-4">
          {stats.map((item) => (
            <StatCard key={item.label} value={item.value} label={item.label} />
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <SectionHeading eyebrow="Key observations" title="Why readers may see a pattern" text="These are neutral takeaways supported by linked public materials." />
          <div className="mt-6 grid gap-4">
            {keyObservations.map((item) => (
              <Callout key={item} title="Source-linked observation" text={item} />
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <SectionHeading eyebrow="Company context" title="Balanced context matters" text="Company self-description and third-party profile context are included so the archive is easier to evaluate fairly." />
          <ul className="mt-6 space-y-3 text-sm leading-7 text-slate-700">
            {companyContext.map((item) => (
              <li key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Browse documented cases" title="Public court filings and documented case activity" text="Review publicly available source material across court records, judicial opinions, and complaint-tracking examples." />
        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          {cases.slice(0, 4).map((item) => (
            <CaseCard key={item.title} item={item} />
          ))}
        </div>
        <button onClick={() => setPage("courtRecords")} className="mt-6">Open the full court records library</button>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <SectionHeading eyebrow="Timeline and themes" title="How to interpret this archive" text="The archive separates verified records from user-submitted reports and groups documented materials by type, timeline, and issue category." />
          <div className="mt-6 space-y-4 text-sm leading-7 text-slate-700">
            <p><span className="font-semibold text-slate-900">Timeline of activity:</span> Linked materials span multiple years, allowing readers to review whether similar issues appear over time rather than in one isolated period.</p>
            <p><span className="font-semibold text-slate-900">Case type overview:</span> The archive separates landlord-tenant filings, trust or attorney-in-fact records, federal consumer collection cases, and complaint examples tied to deposits, billing, and collections.</p>
            <p><span className="font-semibold text-slate-900">Entity structure:</span> Public materials show Hudson Homes Management LLC appearing in several roles across company materials and public records, which may help explain how different names appear in a single dispute trail.</p>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <SectionHeading eyebrow="Complaint themes" title="Reported dispute categories" text="Complaint examples are shown as third-party reports and do not by themselves establish liability or wrongdoing." />
          <div className="mt-6 grid gap-4">
            {complaintThemes.map((item) => (
              <Callout key={item.title} title={item.title} text={item.detail} />
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <SectionHeading eyebrow="Entity structure" title="Who appears in the records" text="Relationship labels below follow source language such as wholly owned subsidiary, agent for owner, attorney-in-fact, or trustee for." />
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {entityMap.map((item) => (
            <div key={item.name} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="text-lg font-semibold text-slate-950">{item.name}</h3>
              <p className="mt-2 text-sm font-medium text-slate-600">{item.role}</p>
              <p className="mt-3 text-sm leading-7 text-slate-700">{item.relationship}</p>
              <p className="mt-3 text-xs text-slate-500">Source type: {item.sourceType}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <SectionHeading eyebrow="Consumer action center" title="Official reporting and help portals" text="These links point to official government resources. They are included as action pathways, not as conclusions about any individual record." />
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {consumerActions.map((item) => (
            <a key={item.title} href={item.url} target="_blank" rel="noreferrer" className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-slate-300 hover:bg-white">
              <h3 className="text-lg font-semibold text-slate-950">{item.title}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-700">{item.detail}</p>
              <span className="mt-3 inline-flex text-sm font-medium text-blue-700 underline underline-offset-4">Open official resource</span>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
