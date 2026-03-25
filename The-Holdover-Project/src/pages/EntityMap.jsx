import { entityMap, sourceRegistry } from "../data/archiveData";

function sourceFor(id) {
  return sourceRegistry.find((source) => source.id === id);
}

export default function EntityMap() {
  return (
    <section className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold">Corporate / Entity Map</h2>
      <p className="mt-3 text-sm text-gray-700">
        Relationship labels below are limited to sourced terms only: wholly owned subsidiary, attorney-in-fact,
        as agent for owner, and trustee for.
      </p>

      <div className="mt-6 space-y-4">
        {entityMap.relationships.map((item) => {
          const source = sourceFor(item.sourceId);
          return (
            <article key={`${item.from}-${item.to}-${item.relationship}`} className="rounded-lg border p-4">
              <p className="font-medium">
                {item.from} <span className="text-gray-500">→</span> {item.to}
              </p>
              <p className="mt-2 text-sm">
                Relationship language: <strong>{item.relationship}</strong>
              </p>
              <p className="mt-2 text-xs text-gray-600">Last checked: {item.lastChecked}</p>
              <p className="mt-1 text-xs text-gray-600">Verified from linked source</p>
              {source && (
                <a href={source.url} target="_blank" rel="noreferrer" className="mt-2 block text-xs text-blue-700 underline">
                  Source: {source.title}
                </a>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
