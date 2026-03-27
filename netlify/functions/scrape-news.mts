import type { Config } from "@netlify/functions";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const SEARCH_QUERIES = [
  "Hudson Homes Management",
  "Hudson Homes Management LLC eviction",
  "Lone Star Funds tenant",
  "LSF9 Master Participation Trust",
];

async function fetchNewsResults(query: string) {
  const url = `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=en-US&gl=US&ceid=US:en`;
  const res = await fetch(url);
  const xml = await res.text();

  const items: { title: string; url: string; published_at: string; source: string }[] = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;

  while ((match = itemRegex.exec(xml)) !== null) {
    const item = match[1];
    const title = item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/)?.[1] || item.match(/<title>(.*?)<\/title>/)?.[1] || "";
    const link = item.match(/<link>(.*?)<\/link>/)?.[1] || "";
    const pubDate = item.match(/<pubDate>(.*?)<\/pubDate>/)?.[1] || "";
    const source = item.match(/<source[^>]*>(.*?)<\/source>/)?.[1] || "Google News";

    if (title && link) {
      items.push({
        title: title.trim(),
        url: link.trim(),
        published_at: pubDate ? new Date(pubDate).toISOString() : new Date().toISOString(),
        source: source.trim(),
      });
    }
  }

  return items;
}

export default async function handler() {
  console.log("[scrape-news] Starting news scrape...");

  const allResults: { title: string; url: string; published_at: string; source: string; query: string }[] = [];

  for (const query of SEARCH_QUERIES) {
    try {
      const results = await fetchNewsResults(query);
      allResults.push(...results.map(r => ({ ...r, query })));
      console.log(`[scrape-news] Found ${results.length} results for: ${query}`);
    } catch (err) {
      console.error(`[scrape-news] Failed for query "${query}":`, err);
    }
  }

  // Deduplicate by URL
  const seen = new Set<string>();
  const unique = allResults.filter(r => {
    if (seen.has(r.url)) return false;
    seen.add(r.url);
    return true;
  });

  // Upsert into Supabase news_mentions table
  if (unique.length > 0) {
    const { error } = await supabase
      .from("news_mentions")
      .upsert(
        unique.map(r => ({
          title: r.title,
          url: r.url,
          source_name: r.source,
          published_at: r.published_at,
          search_query: r.query,
          published: true,
        })),
        { onConflict: "url", ignoreDuplicates: true }
      );

    if (error) {
      console.error("[scrape-news] Supabase upsert error:", error);
    } else {
      console.log(`[scrape-news] Upserted ${unique.length} news items.`);
    }
  }

  return new Response(JSON.stringify({ ok: true, count: unique.length }), {
    headers: { "Content-Type": "application/json" },
  });
}

export const config: Config = {
  schedule: "0 8 * * *", // Run daily at 8am UTC
};
