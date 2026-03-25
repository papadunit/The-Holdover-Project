import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchCases } from '../lib/supabase'
import { STATIC_CASES } from '../lib/staticData'
import type { Case } from '../lib/supabase'
import {
  CaseCard, SectionHeading, CitationBlock,
  TransparencyCallout, LoadingSpinner,
} from '../components/UI'

const WHAT_WE_DOCUMENT = [
  {
    icon: '⚖',
    title: 'Court-Filed Cases',
    desc: 'Civil filings, eviction cases, and regulatory proceedings sourced from publicly available court databases across multiple U.S. jurisdictions.',
  },
  {
    icon: '🏛',
    title: 'Regulatory Actions',
    desc: 'Government agency enforcement actions, administrative orders, and documented complaint data from the SEC, CFPB, BBB, and state agencies.',
  },
  {
    icon: '📋',
    title: 'Reviewed Submissions',
    desc: 'Tenant-reported experiences submitted through this platform. Displayed separately from verified public records and clearly labeled as unverified.',
  },
]

const PATTERNS = [
  { label: 'Multi-state filing activity', desc: 'Court records reflect eviction and civil filings across multiple U.S. states over a multi-year period.' },
  { label: 'LSF9 trust entity involvement', desc: 'Multiple filings identify HHM acting on behalf of U.S. Bank Trust, N.A. as Trustee for LSF9 Master Participation Trust — a Delaware Statutory Trust within the Lone Star network.' },
  { label: 'Standing challenges documented', desc: 'In at least one documented case, a court dismissed an eviction after HHM could not demonstrate its agency authority with the named trust.' },
  { label: 'Regulatory enforcement history', desc: 'Affiliated entities have faced SEC enforcement actions and international criminal proceedings documented in public records.' },
]

const HOW_TO_USE = [
  { n: '1', title: 'Review Sources', desc: 'Every case entry links directly to the original public record, court docket, or regulatory filing.' },
  { n: '2', title: 'Distinguish Record Types', desc: 'Verified public records, agency sources, and user-submitted reports are clearly labeled with different verification badges.' },
  { n: '3', title: 'Explore Patterns', desc: 'Cases are organized by state, filing type, and jurisdiction to allow independent pattern review.' },
]

export default function Home() {
  const [previewCases, setPreviewCases] = useState<Case[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCases({ pageSize: 4 })
      .then(({ data }) => setPreviewCases(data.length ? data : STATIC_CASES.slice(0, 4)))
      .catch(() => setPreviewCases(STATIC_CASES.slice(0, 4)))
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      {/* ── HERO ───────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-ink-950 pt-20 pb-24 md:pt-28 md:pb-32 px-4 md:px-8">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-blood-700/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-ink-800/30 rounded-full blur-3xl" />
          {/* Subtle grid */}
          <div className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blood-700/10 border border-blood-700/30 rounded-full px-4 py-1.5 mb-8">
            <span className="w-1.5 h-1.5 bg-blood-500 rounded-full animate-pulse-slow" />
            <span className="font-mono text-blood-400 text-xs tracking-widest uppercase">
              Independent Investigation · Public Records Archive
            </span>
          </div>

          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-ink-50 font-bold leading-[1.1] mb-6">
            Public Records Raise Questions About{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blood-400 to-blood-600">
              Housing Practices
            </span>{' '}
            Across Multiple States
          </h1>

          <p className="font-body text-ink-400 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
            This platform compiles publicly available court records, regulatory actions, and reviewed
            tenant experiences related to Hudson Homes Management LLC for transparency and public awareness.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/evidence" className="btn-primary text-base px-8 py-3.5">
              View Evidence Archive
            </Link>
            <Link to="/submit" className="btn-ghost text-base px-8 py-3.5">
              Submit Your Experience
            </Link>
            <Link to="/methodology" className="btn-ghost text-base px-8 py-3.5">
              How This Works
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHAT THIS DOCUMENTS ─────────────────────── */}
      <section className="section-pad container-pad border-t border-ink-800/40">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            eyebrow="What this archive contains"
            title="A Structured Public Record"
            subtitle="All entries link to original source material. Records are organized to allow independent review and pattern recognition."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 stagger-children">
            {WHAT_WE_DOCUMENT.map(item => (
              <div key={item.title} className="card p-6 md:p-7">
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="font-display text-ink-100 font-semibold text-xl mb-3">{item.title}</h3>
                <p className="font-body text-ink-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EVIDENCE PREVIEW ────────────────────────── */}
      <section className="section-pad container-pad bg-ink-900/30 border-t border-ink-800/40">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <SectionHeading
              eyebrow="From the archive"
              title="Documented Cases"
              subtitle="Each entry links directly to publicly available source material."
            />
            <Link to="/evidence" className="btn-ghost shrink-0 self-start md:self-auto mb-2">
              View all cases →
            </Link>
          </div>

          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="flex flex-col gap-4">
              {previewCases.map(c => <CaseCard key={c.id} c={c} />)}
            </div>
          )}

          <CitationBlock>
            According to public dockets, court activity involving Hudson Homes Management LLC
            has been documented across multiple states over a multi-year period.
          </CitationBlock>
        </div>
      </section>

      {/* ── PATTERNS OBSERVED ───────────────────────── */}
      <section className="section-pad container-pad border-t border-ink-800/40">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            eyebrow="Patterns observed in reviewed records"
            title="Recurring Themes Across Filings"
            subtitle="Across reviewed public filings and submissions, the following patterns may be observed. All characterizations reflect documented public records."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {PATTERNS.map((p, i) => (
              <div key={i} className="card p-5 md:p-6 flex gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-blood-600 mt-2.5 flex-shrink-0" />
                <div>
                  <h4 className="font-display text-ink-200 font-semibold text-base mb-2">{p.label}</h4>
                  <p className="font-body text-ink-500 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW TO USE ──────────────────────────────── */}
      <section className="section-pad container-pad bg-ink-900/30 border-t border-ink-800/40">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            eyebrow="Getting started"
            title="How to Use This Archive"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {HOW_TO_USE.map(item => (
              <div key={item.n} className="flex gap-4">
                <div className="w-9 h-9 bg-blood-700 rounded-lg flex items-center justify-center flex-shrink-0 font-mono font-bold text-white text-sm">
                  {item.n}
                </div>
                <div>
                  <h3 className="font-display text-ink-200 font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="font-body text-ink-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TransparencyCallout />

      {/* ── FINAL CTA ───────────────────────────────── */}
      <section className="section-pad container-pad border-t border-ink-800/40 bg-gradient-to-b from-ink-950 to-ink-900/50">
        <div className="max-w-2xl mx-auto text-center">
          <p className="font-mono text-blood-600 text-xs tracking-widest uppercase mb-4">Take action</p>
          <h2 className="font-display text-3xl md:text-4xl text-ink-50 font-bold mb-4">
            Submit Documentation or Experience
          </h2>
          <p className="font-body text-ink-400 text-base md:text-lg leading-relaxed mb-8">
            Submissions are reviewed before publication. Information may be anonymized upon request.
            Submission does not guarantee publication.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/submit" className="btn-primary px-8 py-3.5">
              Submit Your Experience
            </Link>
            <Link to="/evidence" className="btn-ghost px-8 py-3.5">
              Browse Evidence
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
