import { sitewideFreshnessNote, sourceTypeLabels } from "../data/archiveData";

const officialActions = [
  {
    label: "CFPB complaint portal (Official)",
    href: "https://www.consumerfinance.gov/complaint/",
  },
  {
    label: "CFPB debt collection resources (Official)",
    href: "https://www.consumerfinance.gov/consumer-tools/debt-collection/",
  },
  {
    label: "HUD fair housing complaint (Official)",
    href: "https://www.hud.gov/fairhousing/fileacomplaint",
  },
  { label: "FTC report fraud (Official)", href: "https://reportfraud.ftc.gov/" },
  {
    label: "State attorney general complaint portal (Official directory)",
    href: "https://www.naag.org/find-my-ag/",
  },
];

const collectionsTopics = [
  "Move-out balance disputes",
  "Deposit disputes",
  "Collections",
  "Credit reporting issues",
];

export default function Home() {
  return (
    <div className="space-y-6">
      <section className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="text-3xl font-bold">Source-Centered Consumer Archive</h2>
        <p className="mt-3 text-gray-700">
          This archive is organized around linked sources, neutral summaries, and date-based review metadata.
        </p>
        <p className="mt-3 text-sm text-gray-700">{sitewideFreshnessNote}</p>
      </section>

      <section className="rounded-xl border bg-white p-6 shadow-sm">
        <h3 className="text-xl font-semibold">Collections / Credit Reporting</h3>
        <ul className="mt-3 list-disc pl-6 text-sm text-gray-700">
          {collectionsTopics.map((topic) => (
            <li key={topic}>{topic}</li>
          ))}
        </ul>
        <p className="mt-3 text-sm text-gray-700">
          These categories are tracked separately so complaint narratives are not merged with court-record summaries.
        </p>
      </section>

      <section className="rounded-xl border bg-white p-6 shadow-sm">
        <h3 className="text-xl font-semibold">Consumer Action Center</h3>
        <p className="mt-2 text-sm text-gray-700">Official reporting destinations:</p>
        <ul className="mt-3 space-y-2 text-sm">
          {officialActions.map((action) => (
            <li key={action.href}>
              <a className="text-blue-700 underline" href={action.href} target="_blank" rel="noreferrer">
                {action.label}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-xl border bg-white p-6 shadow-sm">
        <h3 className="text-xl font-semibold">Related Corporate / Regulatory Context</h3>
        <p className="mt-2 text-sm text-gray-700">
          SEC context entries are labeled as {sourceTypeLabels.sec}. This section records what the SEC filing states
          and does not treat that filing as proof of tenant-related wrongdoing.
        </p>
      </section>

      <section className="rounded-xl border bg-white p-6 shadow-sm">
        <h3 className="text-xl font-semibold">Company Context</h3>
        <ul className="mt-3 list-disc pl-6 text-sm text-gray-700">
          <li>Hudson states it operates in 61 markets.</li>
          <li>Hudson states Hudson Homes Management LLC is a wholly owned subsidiary of Hudson Advisors L.P.</li>
          <li>BBB profile context is presented alongside complaint-oriented materials.</li>
        </ul>
      </section>
    </div>
  );
}
