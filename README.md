# The Holdover Project

A production-ready evidence-centered transparency platform built with React, Vite, Tailwind CSS, Supabase, and Vercel.

## Stack

| Layer     | Technology                     |
|-----------|-------------------------------|
| Frontend  | React 18 + TypeScript + Vite  |
| Styling   | Tailwind CSS v3               |
| Routing   | React Router v6               |
| Backend   | Supabase (Postgres + Storage) |
| Deploy    | Vercel                        |

---

## Local Development

### 1. Clone and install

```bash
git clone https://github.com/your-org/holdover-project.git
cd holdover-project
npm install
```

### 2. Configure environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key-here
```

Get these from: **Supabase Dashboard → Settings → API**

### 3. Set up Supabase

1. Create a free project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the full contents of `supabase-schema.sql`
3. This creates all tables, RLS policies, and seeds the initial case data
4. Optionally create a storage bucket named `submissions` (Dashboard → Storage → New Bucket → private)

### 4. Run locally

```bash
npm run dev
```

Visit `http://localhost:5173`

> **No Supabase?** The app works without credentials — it falls back to static seed data for cases and demo stories. Submission forms will error gracefully.

---

## Project Structure

```
src/
├── components/
│   ├── Header.tsx       # Sticky nav with mobile drawer
│   ├── Footer.tsx       # Full footer with trust signals
│   └── UI.tsx           # Shared: CaseCard, badges, SectionHeading, etc.
├── pages/
│   ├── Home.tsx         # Homepage: hero, evidence preview, patterns
│   ├── Evidence.tsx     # Searchable/filterable case archive
│   ├── CaseDetail.tsx   # Individual case page (/evidence/:slug)
│   ├── Stories.tsx      # Reviewed tenant submissions
│   ├── StoryDetail.tsx  # Individual story (/stories/:slug)
│   ├── Submit.tsx       # Submission form with file upload
│   ├── Methodology.tsx  # Editorial standards + transparency
│   └── Contact.tsx      # Corrections & contact form
├── lib/
│   ├── supabase.ts      # Client, types, query helpers
│   └── staticData.ts    # Fallback data when Supabase not configured
├── App.tsx              # Routes
├── main.tsx             # Entry point
└── index.css            # Tailwind + global styles
```

---

## Deployment (Vercel)

### Option A: GitHub Integration (recommended)

1. Push to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import from GitHub
3. Framework Preset: **Vite**
4. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Deploy

### Option B: Vercel CLI

```bash
npm install -g vercel
vercel
```

### Custom Domain

1. Vercel Dashboard → Settings → Domains → Add `theholdoverproject.org` or `hudsonhomesexposed.com`
2. Update your DNS registrar:
   - `A` record → `76.76.21.21`
   - `CNAME www` → `cname.vercel-dns.com`

---

## Supabase Schema Summary

| Table                | Purpose                                  |
|----------------------|------------------------------------------|
| `cases`              | Documented court cases & regulatory acts |
| `tags`               | Tag taxonomy                             |
| `case_tags`          | Many-to-many join                        |
| `stories`            | Published tenant experiences             |
| `submissions`        | Raw inbound submissions (not public)     |
| `submission_files`   | Uploaded file references (Storage)       |
| `correction_requests`| Correction/removal requests              |

### Row Level Security

- **Public users** can: read published cases/stories, insert submissions, insert correction requests
- **Public users cannot**: read unpublished records, modify any records, access admin data
- Admin functionality is architected for future service-role key implementation

---

## Adding Content

### Add a new case

Run in Supabase SQL Editor:

```sql
INSERT INTO cases (slug, title, jurisdiction, state, filing_type, filed_date, status, parties, summary, source_url, source_name, badge, published)
VALUES (
  'my-case-slug',
  'Case Title Here',
  'Court Name',
  'TX',
  'Eviction',
  '2024-06-01',
  'Filed',
  'HHM v. Tenant Name',
  'According to the docket, ...',
  'https://source-url.com',
  'UniCourt',
  'public_record',
  true
);
```

### Publish a submitted story

```sql
UPDATE stories SET published = true WHERE id = 'story-uuid-here';
```

### Review a submission

```sql
UPDATE submissions SET status = 'under_review' WHERE id = 'submission-uuid';
-- Then after review:
UPDATE submissions SET status = 'approved' WHERE id = 'submission-uuid';
```

---

## SEO

The `index.html` in the `/public` project files has full SEO meta tags, JSON-LD schemas,
sitemap.xml, and robots.txt. The Vite build outputs clean static assets compatible with
Vercel's edge CDN for fast global load times.

---

## Editorial Rules

All copy on this site follows strict attribution standards:

- Every factual claim uses language like "according to the filing," "public records show," or "the docket reflects"
- Words like "fraud," "scam," and "abuse" are never used in editorial copy unless directly quoting a source
- User-submitted stories are always separated from verified public records
- Unresolved matters are not presented as final findings

See `/methodology` for full editorial standards.

---

## License

This codebase is provided for public interest use. Content is based on publicly available records.
