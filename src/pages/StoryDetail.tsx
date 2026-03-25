import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchStoryBySlug } from '../lib/supabase'
import type { Story } from '../lib/supabase'
import { LoadingSpinner } from '../components/UI'

export default function StoryDetail() {
  const { slug } = useParams<{ slug: string }>()
  const [story, setStory] = useState<Story | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) return
    fetchStoryBySlug(slug)
      .then(setStory)
      .catch(() => setStory(null))
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) return <LoadingSpinner />

  if (!story) {
    return (
      <div className="section-pad container-pad max-w-3xl mx-auto text-center">
        <p className="font-mono text-blood-600 text-sm mb-4">Story not found</p>
        <Link to="/stories" className="btn-ghost">← Back to Stories</Link>
      </div>
    )
  }

  return (
    <div className="section-pad container-pad">
      <div className="max-w-2xl mx-auto">
        <nav className="flex items-center gap-2 font-mono text-xs text-ink-600 mb-8">
          <Link to="/" className="hover:text-ink-400">Home</Link>
          <span>/</span>
          <Link to="/stories" className="hover:text-ink-400">Stories</Link>
          <span>/</span>
          <span className="text-ink-400 truncate">{story.title}</span>
        </nav>

        <div className="mb-3">
          <span className="font-mono text-amber-500 text-xs bg-amber-900/20 border border-amber-700/30 px-2.5 py-1 rounded">
            User-Submitted — Not Independently Verified
          </span>
        </div>

        <h1 className="font-display text-2xl md:text-3xl text-ink-50 font-bold leading-snug mb-4">
          {story.title}
        </h1>

        <div className="flex items-center gap-3 mb-8 pb-6 border-b border-ink-800">
          <span className="font-body text-ink-500 text-sm">{story.display_name ?? 'Anonymous'}</span>
          {story.state && <span className="font-mono text-ink-600 text-xs">· {story.state}</span>}
          <span className="font-body text-ink-600 text-xs">
            · {new Date(story.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
          </span>
        </div>

        <div className="prose prose-invert prose-sm max-w-none font-body text-ink-300 leading-relaxed">
          {(story.body ?? story.excerpt ?? '').split('\n').map((para, i) => (
            <p key={i} className="mb-4">{para}</p>
          ))}
        </div>

        <div className="mt-10 bg-ink-900/50 border border-ink-700/40 rounded-lg p-4">
          <p className="font-body text-ink-500 text-xs leading-relaxed italic">
            This account was submitted by a user and reviewed before publication. It has not been
            independently verified and represents the personal experience of the submitter. It is
            presented separately from verified public records.
          </p>
        </div>

        <div className="mt-8">
          <Link to="/stories" className="btn-ghost">← Back to Stories</Link>
        </div>
      </div>
    </div>
  )
}
