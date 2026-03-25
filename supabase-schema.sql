-- ============================================================
-- THE HOLDOVER PROJECT — Supabase Schema
-- Run this in your Supabase SQL editor (Dashboard > SQL Editor)
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ============================================================
-- TAGS
-- ============================================================
create table if not exists tags (
  id   uuid primary key default uuid_generate_v4(),
  name text not null unique,
  slug text not null unique
);

-- ============================================================
-- CASES (public court records / regulatory actions)
-- ============================================================
create table if not exists cases (
  id           uuid primary key default uuid_generate_v4(),
  slug         text not null unique,
  title        text not null,
  jurisdiction text,
  state        char(2),
  county       text,
  filing_type  text,          -- e.g. 'Eviction', 'Civil', 'Regulatory', 'Criminal'
  filed_date   date,
  status       text,          -- e.g. 'Active', 'Dismissed', 'Filed'
  parties      text,
  summary      text,
  source_name  text,
  source_url   text,
  badge        text not null default 'public_record',
               -- public_record | agency | news | user
  published    boolean not null default false,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- ============================================================
-- CASE ↔ TAG JOIN
-- ============================================================
create table if not exists case_tags (
  id      uuid primary key default uuid_generate_v4(),
  case_id uuid references cases(id) on delete cascade,
  tag_id  uuid references tags(id)  on delete cascade,
  unique(case_id, tag_id)
);

-- ============================================================
-- STORIES (reviewed user experiences)
-- ============================================================
create table if not exists stories (
  id             uuid primary key default uuid_generate_v4(),
  slug           text not null unique,
  title          text not null,
  display_name   text,          -- anonymized or real
  state          char(2),
  excerpt        text,
  body           text,
  verified_level text not null default 'user_submitted',
                 -- user_submitted | reviewed | verified
  published      boolean not null default false,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

-- ============================================================
-- SUBMISSIONS (raw inbound — not auto-published)
-- ============================================================
create table if not exists submissions (
  id               uuid primary key default uuid_generate_v4(),
  name             text,
  email            text,
  state            char(2),
  city             text,
  description      text not null,
  status           text not null default 'pending',
                   -- pending | under_review | approved | rejected | published
  is_anonymous     boolean not null default false,
  consent_truthful boolean not null default false,
  consent_review   boolean not null default false,
  published_at     timestamptz,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

-- ============================================================
-- SUBMISSION FILES
-- ============================================================
create table if not exists submission_files (
  id            uuid primary key default uuid_generate_v4(),
  submission_id uuid references submissions(id) on delete cascade,
  file_path     text not null,   -- path in Supabase Storage
  file_type     text,
  original_name text,
  created_at    timestamptz not null default now()
);

-- ============================================================
-- CORRECTION REQUESTS
-- ============================================================
create table if not exists correction_requests (
  id          uuid primary key default uuid_generate_v4(),
  name        text,
  email       text,
  subject     text not null,
  message     text not null,
  related_url text,
  status      text not null default 'open',  -- open | reviewed | resolved
  created_at  timestamptz not null default now()
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

-- Cases: anyone can read published; no public writes
alter table cases enable row level security;
create policy "public can read published cases"
  on cases for select using (published = true);

-- Stories: anyone can read published; no public writes
alter table stories enable row level security;
create policy "public can read published stories"
  on stories for select using (published = true);

-- Tags: public read
alter table tags enable row level security;
create policy "public can read tags"
  on tags for select using (true);

-- Case tags: public read
alter table case_tags enable row level security;
create policy "public can read case_tags"
  on case_tags for select using (true);

-- Submissions: public insert only; no public read (moderation required)
alter table submissions enable row level security;
create policy "public can insert submissions"
  on submissions for insert with check (true);

-- Submission files: public insert only
alter table submission_files enable row level security;
create policy "public can insert submission_files"
  on submission_files for insert with check (true);

-- Correction requests: public insert only
alter table correction_requests enable row level security;
create policy "public can insert correction_requests"
  on correction_requests for insert with check (true);

-- ============================================================
-- STORAGE BUCKET (run separately if needed)
-- ============================================================
-- insert into storage.buckets (id, name, public) values ('submissions', 'submissions', false);

-- ============================================================
-- SEED DATA — Cases from existing archive
-- ============================================================
insert into cases (slug, title, jurisdiction, state, county, filing_type, filed_date, status, parties, summary, source_url, source_name, badge, published) values
('fair-v-hhm-2025', 'Fair v. Hudson Homes Management LLC', 'Supreme Court, Orleans County', 'NY', 'Orleans', 'Civil — Misrepresentation', '2025-01-01', 'Active', 'Shannon Fair v. Hudson Homes Management LLC, Lone Star Funds', 'According to the complaint, the plaintiff alleges systematic misrepresentation in property management practices. The filing names Lone Star Funds directly as a co-defendant.', 'https://unicourt.com/case/ny-sue1-caseggdd44370b4707-3249944', 'UniCourt', 'public_record', true),
('sec-hudson-advisors-2022', 'SEC v. Hudson Advisors L.P. — Release No. 2022-159', 'SEC (Administrative)', 'DC', null, 'Regulatory — Securities', '2022-01-01', 'Resolved — $11.2M Penalty', 'SEC v. Hudson Advisors L.P., Lone Star Global Acquisitions Ltd.', 'The SEC announced that the respondents agreed to pay $11.2 million in civil penalties for failing to disclose that fund fees were used to cover the founder''s personal income tax liability — totaling $54.6 million over 13 years across 14 funds.', 'https://www.sec.gov/newsroom/press-releases/2022-159', 'SEC.gov', 'agency', true),
('korea-exchange-bank-2011', 'Republic of Korea v. Lone Star Funds', 'South Korea Supreme Court', 'KR', null, 'Criminal — Stock Manipulation', '2011-01-01', 'Convicted (Upheld 2011)', 'Republic of Korea v. Lone Star Funds / Paul Yoo', 'A South Korean court found Lone Star Funds and executive Paul Yoo guilty of stock price manipulation in the acquisition of Korea Exchange Bank. Paul Yoo was sentenced to 3 years imprisonment. The Supreme Court upheld the conviction in 2011.', 'https://en.wikipedia.org/wiki/Korea_Exchange_Bank', 'Wikipedia', 'public_record', true),
('hhm-v-tenant-ohio-2024', 'HHM v. Tenant — Standing Dismissed', 'County Court', 'OH', null, 'Eviction', '2024-01-01', 'Dismissed — Standing', 'Hudson Homes Management LLC v. Tenant', 'According to BPIA reporting, the court dismissed the eviction after HHM failed to demonstrate its agency relationship with U.S. Bank Trust, N.A. as Trustee for LSF9 Master Participation Trust.', 'https://bpinvestigativeagency.com/hudson-homes-management-llc-fails-to-defend-its-agency-with-u-s-bank-trust-n-a-as-trustee-for-lsf9-master-participation-trust/', 'BPIA', 'news', true),
('weiss-v-hhm-oregon-2019', 'Weiss et al v. Hudson Homes Management LLC', 'U.S. District Court, D. Oregon', 'OR', null, 'Class Action', '2019-01-01', 'Filed', 'Weiss et al v. Hudson Homes Management LLC', 'The docket reflects a federal class action filing in the District of Oregon concerning HHM''s property management practices.', 'https://dockets.justia.com/docket/oregon/ordce/6:2019cv01104/146670', 'Justia', 'public_record', true),
('hhm-v-hayden-fl-2020', 'HHM v. Hayden — Palm Beach County', 'Palm Beach County', 'FL', 'Palm Beach', 'Eviction', '2020-01-01', 'Dismissed', 'Hudson Homes Management LLC v. Hayden', 'Public records show the eviction case was dismissed. The filing was made on behalf of U.S. Bank Trust, N.A. as Trustee for LSF9 Master Participation Trust.', 'https://unicourt.com/case/fl-pal-hudson-homes-management-llc-obo-us-bank-na-as-trustee-for-lsf9-master-participation-trust-v-hayden-marsha-753071', 'UniCourt', 'public_record', true),
('hhm-v-white-tx-2023', 'HHM v. Kyesha White — Tarrant County', 'Tarrant County', 'TX', 'Tarrant', 'Eviction', '2023-01-01', 'Default Judgment — $10,122', 'Hudson Homes Management LLC v. Kyesha White', 'The docket reflects a $10,122 default judgment entered against the tenant.', 'https://unicourt.com/case/tx-tr-hudson-homes-management-llc-vs-kyesha-white-and-all-occupants-1364907', 'UniCourt', 'public_record', true),
('hhm-v-downing-pa-2022', 'HHM v. Downing — LSF10 — Lackawanna County', 'Lackawanna County CCP', 'PA', 'Lackawanna', 'Eviction', '2022-01-01', 'Filed', 'HHM as attorney-in-fact for U.S. Bank Trust for LSF10 v. Downing', 'The filing identifies HHM acting as attorney-in-fact for U.S. Bank Trust, N.A. as Trustee for LSF10 Master Participation Trust — a separate trust entity within the Lone Star network.', 'https://www.docketalarm.com/cases/Pennsylvania_State_Court_of_Common_Pleas_Lackawanna_County/MJ-45105-LT-0000113-2022/', 'DocketAlarm', 'public_record', true),
('delhi-grayken-2022', 'Delhi Police v. John Grayken — RattanIndia', 'Delhi Police', 'IN', null, 'Criminal — Breach of Trust', '2022-01-01', 'Charges Filed', 'Delhi Police v. John Grayken', 'Delhi police accused founder John Grayken of criminal breach of trust, cheating, and criminal conspiracy related to ownership of RattanIndia Finance.', 'https://en.wikipedia.org/wiki/John_Grayken', 'Wikipedia', 'news', true)
on conflict (slug) do nothing;

-- Seed tags
insert into tags (name, slug) values
('Eviction', 'eviction'),
('LSF9', 'lsf9'),
('Standing Challenge', 'standing-challenge'),
('Regulatory', 'regulatory'),
('Class Action', 'class-action'),
('Criminal', 'criminal'),
('Securities', 'securities'),
('Fee Disclosure', 'fee-disclosure')
on conflict (slug) do nothing;
