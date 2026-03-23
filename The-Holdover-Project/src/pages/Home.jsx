export default function Home() {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="text-3xl font-bold">Documented Tenant Experiences</h2>
      <p className="mt-4 text-gray-700">
        This platform compiles publicly available complaint data and tenant-submitted
        experiences related to property management practices.
      </p>
      <p className="mt-4 text-gray-700">
        Content is presented for informational purposes only. User submissions are not
        independently verified unless clearly labeled otherwise.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border p-4">
          <h3 className="font-semibold">Public complaint trends</h3>
          <p className="mt-2 text-sm text-gray-600">
            Summaries of publicly available complaint themes and consumer reports.
          </p>
        </div>
        <div className="rounded-lg border p-4">
          <h3 className="font-semibold">Tenant-submitted experiences</h3>
          <p className="mt-2 text-sm text-gray-600">
            A moderated intake system for stories and optional supporting documents.
          </p>
        </div>
        <div className="rounded-lg border p-4">
          <h3 className="font-semibold">Evidence-oriented structure</h3>
          <p className="mt-2 text-sm text-gray-600">
            Neutral wording designed to reduce legal risk and improve credibility.
          </p>
        </div>
      </div>
    </div>
  );
}
