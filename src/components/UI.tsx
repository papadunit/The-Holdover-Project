import type { Case } from '../lib/supabase'
import { Link } from 'react-router-dom'

// ─── Verification Badge ─────────────────────────────────────
const BADGE_CONFIG = {
  public_record: { label: 'Verified Public Record', cls: 'badge-public', icon: '✓' },
  agency:        { label: 'Agency Source',           cls: 'badge-agency', icon: '✓' },
  news:          { label: 'News Report',             cls: 'badge-news',   icon: '✓' },
  user:          { label: 'User-Submitted',          cls: 'badge-user',   icon: '!' },
}

export function VerificationBadge({ type }: { type: Case['badge'] }) {
  const cfg = BADGE_CONFIG[type] ?? BADGE_CONFIG.user
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-mono font-semibold tracking-wide ${cfg.cls}`}>
      <span className="opacity-80">{cfg.icon}</span>
      {cfg.label}
    </span>
  )
}

// ─── Status Badge ───────────────────────────────────────────
function statusClass(status: string): string {
  const s = status.toLowerCase()
  if (s.includes('active'))                       return 'status-active'
  if (s.includes('dismissed') || s.includes('resolved') || s.includes('convicted')) return 'status-resolved'
  if (s.includes('filed') || s.includes('charges') || s.includes('judgment'))       return 'status-filed'
  return 'status-default'
}

export function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded text-[11px] font-mono font-semibold tracking-wide ${statusClass(status)}`}>
      {status}
    </span>
  )
}

// ─── State Badge ────────────────────────────────────────────
export function StateBadge({ state }: { state: string }) {
  return (
    <span className="inline-flex items-center px-2 py-1 rounded bg-ink-700/60 border border-ink-600/40 text-ink-300 text-[11px] font-mono font-semibold tracking-widest">
      {state}
    </span>
  )
}

// ─── Tag Badge ──────────────────────────────────────────────
export function TagBadge({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-ink-700/40 border border-ink-600/30 text-ink-400 text-[10px] font-mono tracking-wide">
      {name}
    </span>
  )
}

// ─── Case Card ──────────────────────────────────────────────
interface CaseCardProps {
  c: Case
  compact?: boolean
  linkable?: boolean
}

export function CaseCard({ c, compact = false, linkable = true }: CaseCardProps) {
  const inner = (
    <article className={`card border-l-2 border-l-blood-700 p-5 md:p-6 ${linkable ? 'cursor-pointer' : ''}`}>
      {/* Top row: badges */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        {c.state && <StateBadge state={c.state} />}
        {c.status && <StatusBadge status={c.status} />}
        <div className="ml-auto"><VerificationBadge type={c.badge} /></div>
      </div>

      {/* Title */}
      <h3 className={`font-display text-ink-100 font-semibold mb-2 leading-snug ${compact ? 'text-base' : 'text-lg'}`}>
        {c.title}
      </h3>

      {/* Summary */}
      {!compact && c.summary && (
        <p className="font-body text-ink-400 text-sm leading-relaxed mb-4 line-clamp-3">
          {c.summary}
        </p>
      )}

      {/* Footer row */}
      <div className="flex flex-wrap items-center justify-between gap-3 mt-3">
        <div className="flex flex-wrap items-center gap-3">
          {c.filing_type && (
            <span className="font-mono text-ink-500 text-[11px] tracking-wide">{c.filing_type}</span>
          )}
          {c.jurisdiction && (
            <span className="font-mono text-ink-600 text-[11px]">{c.jurisdiction}</span>
          )}
          {c.filed_date && (
            <span className="font-mono text-ink-600 text-[11px]">
              {new Date(c.filed_date).getFullYear()}
            </span>
          )}
        </div>
        {c.source_url && (
          <a
            href={c.source_url}
            target="_blank"
            rel="noopener noreferrer"
            className="source-link"
            onClick={e => e.stopPropagation()}
          >
            {c.source_name ?? 'Source'} ↗
          </a>
        )}
      </div>
    </article>
  )

  if (linkable) {
    return (
      <Link to={`/evidence/${c.slug}`} className="block no-underline hover:no-underline">
        {inner}
      </Link>
    )
  }
  return inner
}

// ─── Section Heading ────────────────────────────────────────
export function SectionHeading({
  eyebrow, title, subtitle,
}: { eyebrow?: string; title: string; subtitle?: string }) {
  return (
    <div className="mb-10">
      {eyebrow && (
        <p className="font-mono text-blood-600 text-xs tracking-widest uppercase mb-3">{eyebrow}</p>
      )}
      <h2 className="font-display text-3xl md:text-4xl text-ink-50 font-bold leading-tight mb-3">
        {title}
      </h2>
      {subtitle && (
        <p className="font-body text-ink-400 text-base md:text-lg leading-relaxed max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  )
}

// ─── Citation Block ─────────────────────────────────────────
export function CitationBlock({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="border-l-2 border-blood-700 pl-6 py-1 my-8">
      <p className="font-display text-ink-300 text-lg leading-relaxed italic">{children}</p>
    </blockquote>
  )
}

// ─── Disclaimer Banner ──────────────────────────────────────
export function DisclaimerBanner() {
  return (
    <div className="bg-ink-900/60 border border-ink-700/40 rounded-lg p-4 mt-8">
      <p className="font-body text-ink-500 text-xs leading-relaxed italic">
        Case summaries reflect publicly available information from court dockets, regulatory filings,
        and published reporting. This archive does not render legal opinions or conclusions. Attribution
        language such as "according to the filing," "the docket reflects," and "public records show"
        is used throughout to identify the source of each claim.
      </p>
    </div>
  )
}

// ─── Empty State ────────────────────────────────────────────
export function EmptyState({ message = 'No results found.' }: { message?: string }) {
  return (
    <div className="py-16 text-center">
      <div className="font-mono text-ink-600 text-sm mb-3">∅</div>
      <p className="font-body text-ink-500 text-base">{message}</p>
    </div>
  )
}

// ─── Loading Spinner ────────────────────────────────────────
export function LoadingSpinner() {
  return (
    <div className="py-16 flex justify-center">
      <div className="w-6 h-6 border-2 border-blood-700 border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

// ─── Pagination ─────────────────────────────────────────────
interface PaginationProps {
  page: number
  totalPages: number
  onChange: (p: number) => void
}
export function Pagination({ page, totalPages, onChange }: PaginationProps) {
  if (totalPages <= 1) return null
  return (
    <div className="flex items-center justify-center gap-2 mt-10">
      <button
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
        className="btn-ghost py-2 px-4 text-sm disabled:opacity-30 disabled:cursor-not-allowed"
      >
        ← Prev
      </button>
      <span className="font-mono text-ink-500 text-sm px-4">
        {page} / {totalPages}
      </span>
      <button
        disabled={page >= totalPages}
        onClick={() => onChange(page + 1)}
        className="btn-ghost py-2 px-4 text-sm disabled:opacity-30 disabled:cursor-not-allowed"
      >
        Next →
      </button>
    </div>
  )
}

// ─── TransparencyCallout ─────────────────────────────────────
export function TransparencyCallout() {
  return (
    <div className="bg-gradient-to-r from-ink-900 to-ink-800/50 rounded-xl border border-ink-700/40 p-6 md:p-8 my-12">
      <div className="flex items-start gap-4">
        <div className="w-8 h-8 bg-verdict-blue/10 rounded-lg flex items-center justify-center flex-shrink-0 border border-blue-700/30">
          <span className="text-blue-400 text-sm">i</span>
        </div>
        <div>
          <h4 className="font-display text-ink-200 font-semibold mb-2">Editorial Standards</h4>
          <p className="font-body text-ink-400 text-sm leading-relaxed">
            Every factual claim on this site is attributed to its source. This archive uses language such as
            "according to the filing," "public records show," and "the complaint alleges" throughout.
            Submissions are reviewed before publication. Unresolved matters are not presented as final findings.
          </p>
          <Link to="/methodology" className="source-link mt-3 inline-block">
            Read full methodology →
          </Link>
        </div>
      </div>
    </div>
  )
}
