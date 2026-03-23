import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Admin() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    const { data } = await supabase.from("submissions").select("*").order("created_at", { ascending: false });
    setData(data || []);
    setLoading(false);
  }

  async function approve(id) {
    await supabase.from("submissions").update({ approved: true }).eq("id", id);
    load();
  }

  async function remove(id) {
    await supabase.from("submissions").delete().eq("id", id);
    load();
  }

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold">Admin panel</h2>
      <p className="mt-2 text-sm text-red-600">
        Add authentication before using this in production.
      </p>

      <div className="mt-6 space-y-4">
        {loading && <p className="text-gray-600">Loading…</p>}
        {!loading && data.length === 0 && <p className="text-gray-600">No submissions yet.</p>}

        {data.map((item) => (
          <article key={item.id} className="rounded-lg border p-4">
            <div className="flex flex-wrap gap-2 text-xs text-gray-500">
              <span>{item.state}</span>
              <span>•</span>
              <span>{item.issue_type}</span>
              <span>•</span>
              <span>{item.approved ? "Approved" : "Pending"}</span>
            </div>
            <p className="mt-3 whitespace-pre-wrap">{item.story}</p>
            <div className="mt-4 flex gap-3">
              {!item.approved && (
                <button onClick={() => approve(item.id)} className="bg-black text-white border-black hover:bg-gray-900">
                  Approve
                </button>
              )}
              <button onClick={() => remove(item.id)} className="border-red-300 text-red-700 hover:bg-red-50">
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
