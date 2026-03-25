import { sourceRegistry, sourceTypeLabels, sitewideFreshnessNote } from "../data/archiveData";

export default function Sources() {
  return (
    <section className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold">Source Registry</h2>
      <p className="mt-3 text-sm text-gray-700">{sitewideFreshnessNote}</p>

      <div className="mt-6 space-y-4">
        {sourceRegistry.map((source) => (
          <article key={source.id} className="rounded-lg border p-4">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-semibold">{source.title}</h3>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs">
                {sourceTypeLabels[source.sourceType]}
              </span>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs text-emerald-800">
                Verified from linked source
              </span>
            </div>
            <p className="mt-2 text-sm text-gray-700">{source.description}</p>
            <a href={source.url} className="mt-3 block text-sm text-blue-700 underline" target="_blank" rel="noreferrer">
              {source.url}
            </a>
            <div className="mt-3 grid gap-1 text-xs text-gray-600 sm:grid-cols-3">
              <p>Date added: {source.dateAdded}</p>
              <p>Last checked: {source.lastChecked}</p>
              <p>Reliability: {source.reliability}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
