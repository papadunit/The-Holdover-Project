import { useEffect, useState } from 'react'
import { fetchNewsMentions, type NewsMention } from '../lib/supabase'

export default function News() {
  const [news, setNews] = useState<NewsMention[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchNewsMentions(50).then(data => {
      setNews(data)
      setLoading(false)
    })
  }, [])

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">News Mentions</h1>
      <p className="text-gray-500 mb-8 text-sm">
        Automatically updated daily from public news sources. Coverage of Hudson Homes Management LLC and related entities.
      </p>

      {loading && (
        <div className="text-center py-20 text-gray-400">Loading news...</div>
      )}

      {!loading && news.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          No news mentions found yet. Check back soon.
        </div>
      )}

      <div className="space-y-4">
        {news.map(item => (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block border border-gray-200 rounded-lg p-4 hover:border-gray-400 transition-colors"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-semibold text-gray-900 leading-snug">{item.title}</h2>
                {item.excerpt && (
                  <p className="text-sm text-gray-500 mt-1">{item.excerpt}</p>
                )}
                <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                  {item.source_name && <span>{item.source_name}</span>}
                  {item.published_at && (
                    <span>{new Date(item.published_at).toLocaleDateString()}</span>
                  )}
                </div>
              </div>
              <span className="text-gray-300 text-xl flex-shrink-0">→</span>
            </div>
          </a>
        ))}
      </div>
    </main>
  )
}
