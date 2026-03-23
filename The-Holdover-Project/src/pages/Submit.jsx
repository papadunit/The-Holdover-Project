import { supabase } from "../lib/supabase";

export default function Submit() {
  async function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const file = form.file.files[0];
    let fileUrl = null;

    try {
      if (file) {
        const path = `${Date.now()}-${file.name}`;
        const { error: uploadError } = await supabase.storage.from("documents").upload(path, file);

        if (uploadError) throw uploadError;

        fileUrl = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/documents/${path}`;
      }

      const { error } = await supabase.from("submissions").insert([
        {
          state: form.state.value,
          issue_type: form.issue.value,
          story: form.story.value,
          file_url: fileUrl,
        },
      ]);

      if (error) throw error;

      alert("Submission received.");
      form.reset();
    } catch (err) {
      alert(`Submission failed: ${err.message}`);
    }
  }

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold">Submit your experience</h2>
      <p className="mt-2 text-sm text-gray-600">
        Submissions are moderated before publication.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium">State</label>
          <input name="state" placeholder="State" required />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Issue type</label>
          <select name="issue" defaultValue="Billing">
            <option>Billing</option>
            <option>Maintenance</option>
            <option>Eviction</option>
            <option>Deposit</option>
            <option>Communication</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Experience</label>
          <textarea name="story" placeholder="Describe your experience factually and clearly." required />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Optional document</label>
          <input type="file" name="file" />
        </div>

        <button type="submit" className="bg-black text-white border-black hover:bg-gray-900">
          Submit
        </button>
      </form>
    </div>
  );
}
