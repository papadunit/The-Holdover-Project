-- ============================================================
-- ADD NEWS MENTIONS TABLE
-- Run this in Supabase SQL Editor
-- ============================================================

create table if not exists news_mentions (
  id           uuid primary key default uuid_generate_v4(),
  title        text not null,
  url          text not null unique,
  source_name  text,
  excerpt      text,
  published_at timestamptz,
  search_query text,
  published    boolean not null default false,
  created_at   timestamptz not null default now()
);

-- RLS: public can read published news
alter table news_mentions enable row level security;
create policy "public can read published news"
  on news_mentions for select using (published = true);

-- Service role can insert/update (for the scraper function)
create policy "service role can manage news"
  on news_mentions for all using (true) with check (true);
