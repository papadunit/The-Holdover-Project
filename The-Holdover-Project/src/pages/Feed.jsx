import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Feed() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    const { data, error } = await supabase
      .from("submissions")
      .select("*")
      .eq("approved", true)
      .order("created_at", { ascending: false });

    if (!error) setData(data || []);
    setLoading(false);
  }

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold">Approved stories</h2>
      <p className="mt-2 text-sm text-gray-600">
        Only moderated submissions marked approved are shown here.
      </p>

      <div className="mt-6 space-y-4">
        {loading && <p className="text-gray-600">Loading…</p>}
        {!loading && data.length === 0 && (
          <p className="text-gray-600">No approved stories yet.</p>
        )}

        {data.map((item) => (
          <article key={item.id} className="rounded-lg border p-4">
            <div className="flex flex-wrap gap-2 text-xs text-gray-500">
              <span>{item.state}</span>
              <span>•</span>
              <span>{item.issue_type}</span>
            </div>
            <p className="mt-3 whitespace-pre-wrap">{item.story}</p>
            {item.file_url && (
              <a
                href={item.file_url}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-block text-sm text-blue-600 underline"
              >
                View document
              </a>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
