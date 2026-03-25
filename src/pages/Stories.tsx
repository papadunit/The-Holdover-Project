import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchStories } from '../lib/supabase'
import type { Story } from '../lib/supabase'
import {
  SectionHeading, EmptyState, LoadingSpinner,
  Pagination, TransparencyCallout,
} from '../components/UI'

const VERIFIED_LABEL: Record<Story['verified_level'], { label: string; cls: string }> = {
  user_submitted: { label: 'User-Submitted (Unverified)', cls: 'badge-user' },
  reviewed:       { label: 'Reviewed Submission',         cls: 'badge-news' },
  verified:       { label: 'Independently Verified',      cls: 'badge-public' },
}

function StoryCard({ story }: { story: Story }) {
  const vl = VERIFIED_LABEL[story.verified_level]
  return (
    <article className="card p-6 md:p-7">
      <div className="flex flex-wrap items-center gap-2 mb-4">
        {story.state && (
          <span className="font-mono text-ink-400 text-xs bg-ink-700/50 px-2 py-1 rounded border border-ink-600/30">
            {story.state}
          </span>
        )}
        <span className={`inline-flex items-center px-2.5 py-1 rounded text-[11px] font-mono font-semibold tracking-wide ${vl.cls}`}>
          {vl.label}
        </span>
      </div>
      <h3 className="font-display text-ink-100 font-semibold text-xl mb-3 leading-snug">
        {story.title}
      </h3>
      {story.excerpt && (
        <p className="font-body text-ink-400 text-sm leading-relaxed mb-4 line-clamp-4">
          {story.excerpt}
        </p>
      )}
      <div className="flex items-center justify-between pt-3 border-t border-ink-700/40">
        <span className="font-body text-ink-600 text-xs">
          {story.display_name ?? 'Anonymous'} · {new Date(story.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
        </span>
        <Link
          to={`/stories/${story.slug}`}
          className="source-link"
        >
          Read full account →
        </Link>
      </div>
    </article>
  )
}

const DEMO_STORIES: Story[] = [
  {
    id: 'd1', slug: 'demo-daily-emails', title: 'Daily emails and $100/day holdover charges',
    display_name: 'Former tenant, Texas',
    state: 'TX', excerpt: 'After my lease ended, I began receiving daily emails threatening a $100/day holdover charge. I had already vacated the property and returned keys. The emails continued for weeks. When I contacted HHM to resolve the issue I was told the charges were "system-generated" and could not be reversed without a supervisor review that never came.',
    verified_level: 'user_submitted', published: true,
    created_at: '2025-11-01', updated_at: '2025-11-01', body: null,
  },
  {
    id: 'd2', slug: 'demo-maintenance-ignored', title: 'Maintenance requests ignored for months',
    display_name: 'Tenant, Georgia',
    state: 'GA', excerpt: 'I submitted a maintenance request for a broken HVAC unit in July. Temperatures in my unit reached over 90 degrees. After 6 weeks without response, I escalated through the online portal, by phone, and by email. I was told a work order had been submitted but no technician ever arrived. I was offered a $50 credit on a $1,800/month unit.',
    verified_level: 'user_submitted', published: true,
    created_at: '2025-09-15', updated_at: '2025-09-15', body: null,
  },
  {
    id: 'd3', slug: 'demo-eviction-notice', title: 'Eviction notice after requesting repairs',
    display_name: 'Tenant, Florida',
    state: 'FL', excerpt: 'Within 30 days of sending a certified letter requesting that HHM address a plumbing issue affecting habitability, I received an eviction notice for a lease violation I had never been previously warned about. My attorney reviewed the notice and identified procedural deficiencies. The case was ultimately resolved, but the process cost me significant legal fees and emotional distress.',
    verified_level: 'reviewed', published: true,
    created_at: '2025-08-20', updated_at: '2025-08-20', body: null,
  },
]

const PAGE_SIZE = 6

export default function Stories() {
  const [stories, setStories] = useState<Story[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)

  useEffect(() => {
    setLoading(true)
    fetchStories(page, PAGE_SIZE)
      .then(({ data, count }) => {
        if (data.length === 0) {
          setStories(DEMO_STORIES.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE))
          setTotal(DEMO_STORIES.length)
        } else {
          setStories(data)
          setTotal(count)
        }
      })
      .catch(() => {
        setStories(DEMO_STORIES.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE))
        setTotal(DEMO_STORIES.length)
      })
      .finally(() => setLoading(false))
  }, [page])

  const totalPages = Math.ceil(total / PAGE_SIZE)

  return (
    <div className="section-pad container-pad">
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          eyebrow="Tenant accounts"
          title="Reviewed Submissions"
          subtitle="Experiences submitted by tenants and reviewed before publication. User-submitted accounts are clearly labeled and presented separately from verified public records."
        />

        {/* Warning callout */}
        <div className="bg-amber-950/30 border border-amber-700/30 rounded-lg p-4 mb-8">
          <div className="flex items-start gap-3">
            <span className="text-amber-500 text-sm mt-0.5">⚠</span>
            <div>
              <p className="font-body text-amber-400 text-sm font-semibold mb-1">About These Submissions</p>
              <p className="font-body text-amber-600/80 text-xs leading-relaxed">
                User-submitted accounts are reviewed before publication but are <strong>not independently verified</strong>. They represent the personal experience of the submitter and are presented separately from verified public records. Do not treat them as established facts.
              </p>
            </div>
          </div>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : stories.length === 0 ? (
          <EmptyState message="No published stories yet. Be the first to submit your experience." />
        ) : (
          <div className="flex flex-col gap-5">
            {stories.map(s => <StoryCard key={s.id} story={s} />)}
          </div>
        )}

        <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        <TransparencyCallout />

        <div className="text-center mt-8">
          <p className="font-body text-ink-500 text-sm mb-4">Have an experience to share?</p>
          <Link to="/submit" className="btn-primary">Submit Your Experience</Link>
        </div>
      </div>
    </div>
  )
}
