import { useState } from "react";
import { courtRecords, sourceTypeLabels } from "../data/archiveData";

const tabs = [
  { id: "landlordTenant", label: "Landlord / Tenant" },
  { id: "foreclosureEjectment", label: "Foreclosure / Ejectment-related" },
  { id: "trustAttorney", label: "Trust / Attorney-in-Fact records" },
  { id: "federalConsumer", label: "Federal Consumer / Collection cases" },
];

export default function CourtRecords() {
  const [activeTab, setActiveTab] = useState("landlordTenant");
  const records = courtRecords[activeTab];

  return (
    <section className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold">Court Records Library</h2>
      <div className="mt-4 flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={activeTab === tab.id ? "bg-gray-900 text-white" : ""}>
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-6 space-y-4">
        {records.map((record) => (
          <article key={`${record.caption}-${record.filingDate}`} className="rounded-lg border p-4">
            <h3 className="font-semibold">{record.caption}</h3>
            <p className="mt-2 text-sm text-gray-700">{record.summary}</p>
            <div className="mt-3 grid gap-1 text-xs text-gray-600 sm:grid-cols-2">
              <p>Jurisdiction: {record.jurisdiction}</p>
              <p>Filing date: {record.filingDate}</p>
              <p>Status: {record.status}</p>
              <p>Last checked: {record.lastChecked}</p>
              <p>Source type: {sourceTypeLabels[record.sourceType]}</p>
              <p>Verified from linked source</p>
            </div>
            <a href={record.sourceLink} target="_blank" rel="noreferrer" className="mt-3 block text-sm text-blue-700 underline">
              Source link
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
