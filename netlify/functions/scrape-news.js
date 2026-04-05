const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const SEARCH_QUERIES = [
  "Hudson Homes Management",
  "Hudson Homes Management LLC eviction",
  "Lone Star Funds tenant",
  "LSF9 Master Participation Trust",
];

async function fetchNewsResults(query) {
  const url = `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=en-US&gl=US&ceid=US:en`;
  const res = await fetch(url);
  const xml = await res.text();
  const items = [];
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

exports.handler = async function () {
  console.log("Starting news scrape...");
  const allResults = [];
  for (const query of SEARCH_QUERIES) {
    try {
      const results = await fetchNewsResults(query);
      allResults.push(...results.map(r => ({ ...r, query })));
      console.log(`Found ${results.length} results for: ${query}`);
    } catch (err) {
      console.error(`Failed for query "${query}":`, err);
    }
  }

  const seen = new Set();
  const unique = allResults.filter(r => {
    if (seen.has(r.url)) return false;
    seen.add(r.url);
    return true;
  });

  if (unique.length > 0) {
    const { error } = await supabase.from("news_mentions").upsert(
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
    if (error) console.error("Supabase upsert error:", error);
    else console.log(`Upserted ${unique.length} news items.`);
  }

  return { statusCode: 200, body: JSON.stringify({ ok: true, count: unique.length }) };
};
