import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchCaseBySlug } from '../lib/supabase'
import { STATIC_CASES } from '../lib/staticData'
import type { Case } from '../lib/supabase'
import {
  VerificationBadge, StatusBadge, StateBadge,
  DisclaimerBanner, LoadingSpinner,
} from '../components/UI'

export default function CaseDetail() {
  const { slug } = useParams<{ slug: string }>()
  const [c, setCase] = useState<Case | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) return
    fetchCaseBySlug(slug)
      .then(data => {
        if (data) {
          setCase(data)
        } else {
          // Try static fallback
          const found = STATIC_CASES.find(s => s.slug === slug) ?? null
          setCase(found)
        }
      })
      .catch(() => {
        const found = STATIC_CASES.find(s => s.slug === slug) ?? null
        setCase(found)
      })
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) return <LoadingSpinner />

  if (!c) {
    return (
      <div className="section-pad container-pad max-w-3xl mx-auto text-center">
        <p className="font-mono text-blood-600 text-sm mb-4">Case not found</p>
        <Link to="/evidence" className="btn-ghost">← Back to Evidence</Link>
      </div>
    )
  }

  return (
    <div className="section-pad container-pad">
      <div className="max-w-3xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 font-mono text-xs text-ink-600 mb-8" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-ink-400 transition-colors">Home</Link>
          <span>/</span>
          <Link to="/evidence" className="hover:text-ink-400 transition-colors">Evidence</Link>
          <span>/</span>
          <span className="text-ink-400 truncate">{c.title}</span>
        </nav>

        {/* Header badges */}
        <div className="flex flex-wrap gap-2 mb-5">
          {c.state && <StateBadge state={c.state} />}
          {c.status && <StatusBadge status={c.status} />}
          <VerificationBadge type={c.badge} />
        </div>

        {/* Title */}
        <h1 className="font-display text-2xl md:text-3xl text-ink-50 font-bold leading-snug mb-6">
          {c.title}
        </h1>

        {/* Meta grid */}
        <div className="bg-ink-900/60 border border-ink-700/40 rounded-xl p-5 mb-8 grid grid-cols-2 md:grid-cols-3 gap-5">
          {[
            { label: 'Jurisdiction', value: c.jurisdiction },
            { label: 'Filing Type', value: c.filing_type },
            { label: 'Filed', value: c.filed_date ? new Date(c.filed_date).getFullYear().toString() : null },
            { label: 'State', value: c.state },
            { label: 'County', value: c.county },
            { label: 'Status', value: c.status },
          ].filter(m => m.value).map(m => (
            <div key={m.label}>
              <dt className="font-mono text-ink-600 text-[10px] uppercase tracking-widest mb-1">{m.label}</dt>
              <dd className="font-body text-ink-300 text-sm">{m.value}</dd>
            </div>
          ))}
        </div>

        {/* Parties */}
        {c.parties && (
          <div className="mb-6">
            <h2 className="font-mono text-ink-500 text-xs uppercase tracking-widest mb-2">Parties</h2>
            <p className="font-body text-ink-300 text-sm leading-relaxed">{c.parties}</p>
          </div>
        )}

        {/* Summary */}
        {c.summary && (
          <div className="mb-8">
            <h2 className="font-mono text-ink-500 text-xs uppercase tracking-widest mb-3">Summary</h2>
            <div className="border-l-2 border-blood-700 pl-5">
              <p className="font-body text-ink-300 text-base leading-relaxed">{c.summary}</p>
            </div>
          </div>
        )}

        {/* Source */}
        {c.source_url && (
          <div className="bg-ink-900/40 border border-ink-700/40 rounded-lg p-4 mb-8 flex items-center justify-between flex-wrap gap-3">
            <div>
              <div className="font-mono text-ink-500 text-[10px] uppercase tracking-widest mb-1">Primary Source</div>
              <div className="font-body text-ink-400 text-sm">{c.source_name ?? 'External source'}</div>
            </div>
            <a
              href={c.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost py-2 px-4 text-sm"
            >
              View original record ↗
            </a>
          </div>
        )}

        <DisclaimerBanner />

        {/* Back link */}
        <div className="mt-8">
          <Link to="/evidence" className="btn-ghost">← Back to Evidence Archive</Link>
        </div>
      </div>
    </div>
  )
}
