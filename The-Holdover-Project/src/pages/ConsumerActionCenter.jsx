import { SectionHeading } from "../components/ArchiveComponents";
import { consumerActions } from "../data/archiveData";

export default function ConsumerActionCenter() {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <SectionHeading
          eyebrow="Consumer action center"
          title="Official complaint and help destinations"
          text="These resources are official government pathways for reporting or researching housing, debt collection, credit reporting, or consumer-protection issues."
        />
      </section>

      <div className="grid gap-5 md:grid-cols-2">
        {consumerActions.map((item) => (
          <a key={item.title} href={item.url} target="_blank" rel="noreferrer" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-slate-300">
            <h3 className="text-lg font-semibold text-slate-950">{item.title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-700">{item.detail}</p>
            <div className="mt-4 text-xs text-slate-500">Source type: Government Complaint Portal</div>
            <div className="mt-1 text-xs text-slate-500">Last checked: 2026-03-25</div>
            <span className="mt-4 inline-flex text-sm font-medium text-blue-700 underline underline-offset-4">Open official resource</span>
          </a>
        ))}
      </div>
    </div>
  );
}
