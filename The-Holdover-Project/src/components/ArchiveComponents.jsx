export function Badge({ children }) {
  return (
    <span className="inline-flex rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-semibold tracking-wide text-amber-900">
      {children}
    </span>
  );
}

export function SectionHeading({ eyebrow, title, text }) {
  return (
    <div className="max-w-3xl">
      {eyebrow && <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">{eyebrow}</p>}
      <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">{title}</h2>
      {text && <p className="mt-3 text-base leading-7 text-slate-600">{text}</p>}
    </div>
  );
}

export function StatCard({ value, label }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="text-3xl font-bold text-slate-950">{value}</div>
      <div className="mt-2 text-sm text-slate-600">{label}</div>
    </div>
  );
}

export function SourceMeta({ type, lastChecked, reliability }) {
  return (
    <div className="flex flex-wrap gap-2 text-xs text-slate-500">
      {type && <span>Source type: {type}</span>}
      {lastChecked && <span>Last checked: {lastChecked}</span>}
      {reliability && <span>Reliability: {reliability}</span>}
    </div>
  );
}

export function CaseCard({ item }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-500">{item.category}</p>
          <h3 className="mt-1 text-xl font-semibold text-slate-950">{item.title}</h3>
        </div>
        <Badge>{item.badge}</Badge>
      </div>
      <div className="mt-4 grid gap-2 text-sm text-slate-600 md:grid-cols-2">
        <p><span className="font-semibold text-slate-800">State:</span> {item.state}</p>
        <p><span className="font-semibold text-slate-800">Court:</span> {item.court}</p>
        <p><span className="font-semibold text-slate-800">Case number:</span> {item.caseNumber}</p>
        <p><span className="font-semibold text-slate-800">Filing date:</span> {item.filingDate}</p>
        <p><span className="font-semibold text-slate-800">Status:</span> {item.status}</p>
      </div>
      <p className="mt-4 text-sm leading-7 text-slate-700">{item.summary}</p>
      <div className="mt-4">
        <SourceMeta type={item.badge} lastChecked={item.lastChecked} reliability="Verified from linked source" />
      </div>
      <a href={item.url} target="_blank" rel="noreferrer" className="mt-4 inline-flex text-sm font-medium text-blue-700 underline underline-offset-4">
        View source
      </a>
    </article>
  );
}

export function SourceCard({ item }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h3 className="text-lg font-semibold text-slate-950">{item.title}</h3>
        <Badge>{item.type}</Badge>
      </div>
      <p className="mt-3 text-sm leading-7 text-slate-700">{item.description}</p>
      <div className="mt-4">
        <SourceMeta type={item.type} lastChecked={item.lastChecked} reliability={item.reliability} />
      </div>
      <div className="mt-3 text-xs text-slate-500">Date added: {item.dateAdded}</div>
      <a href={item.url} target="_blank" rel="noreferrer" className="mt-4 inline-flex text-sm font-medium text-blue-700 underline underline-offset-4">
        Open source
      </a>
    </article>
  );
}

export function Callout({ title, text }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <h3 className="text-lg font-semibold text-slate-950">{title}</h3>
      <p className="mt-2 text-sm leading-7 text-slate-700">{text}</p>
    </div>
  );
}
