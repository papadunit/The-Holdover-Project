export default function Methodology() {
  return (
    <section className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold">Methodology</h2>

      <div className="mt-5 space-y-4 text-sm text-gray-700">
        <p>
          <strong>Official records vs. third-party complaints:</strong> Official records (court dockets, government
          filings, county records, agency portals, and company primary sources) are listed separately from third-party
          complaint narratives.
        </p>
        <p>
          <strong>How counts are calculated:</strong> Counts are derived from the entries currently listed in each
          category and can change when records are added, removed, corrected, sealed, or reclassified in source systems.
        </p>
        <p>
          <strong>How often sources are checked:</strong> Every source-backed item includes a Last checked date and is
          reviewed on a rolling basis. Items are updated when the linked source changes.
        </p>
        <p>
          <strong>Liability note:</strong> Complaint examples are included as records of allegations or reported
          experiences and do not, by themselves, establish liability or wrongdoing.
        </p>
      </div>
    </section>
  );
}
