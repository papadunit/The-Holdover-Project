import { useEffect, useState, useCallback } from 'react'
import { fetchCases } from '../lib/supabase'
import { STATIC_CASES } from '../lib/staticData'
import type { Case } from '../lib/supabase'
import {
  CaseCard, SectionHeading, DisclaimerBanner,
  EmptyState, LoadingSpinner, Pagination,
} from '../components/UI'

const FILING_TYPES = ['All', 'Eviction', 'Regulatory', 'Civil', 'Criminal', 'Class Action']
const US_STATES = [
  '', 'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA',
  'KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM',
  'NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA',
  'WV','WI','WY','DC',
]
const PAGE_SIZE = 10

export default function Evidence() {
  const [cases, setCases] = useState<Case[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [search, setSearch]       = useState('')
  const [stateFilter, setStateFilter] = useState('')
  const [typeFilter, setTypeFilter]   = useState('All')
  const [page, setPage]           = useState(1)

  // Debounced search
  const [debouncedSearch, setDebouncedSearch] = useState('')
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 350)
    return () => clearTimeout(t)
  }, [search])

  const load = useCallback(() => {
    setLoading(true)
    setError('')
    fetchCases({
      search: debouncedSearch || undefined,
      state: stateFilter || undefined,
      filing_type: typeFilter !== 'All' ? typeFilter : undefined,
      page,
      pageSize: PAGE_SIZE,
    })
      .then(({ data, count }) => {
        // Fallback to static data if Supabase not configured
        if (data.length === 0 && count === 0 && !debouncedSearch && !stateFilter && typeFilter === 'All') {
          let filtered = STATIC_CASES
          setCases(filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE))
          setTotal(filtered.length)
        } else {
          setCases(data)
          setTotal(count)
        }
      })
      .catch(() => {
        // Local filter on static data
        let filtered = STATIC_CASES
        if (debouncedSearch) {
          const q = debouncedSearch.toLowerCase()
          filtered = filtered.filter(c =>
            c.title.toLowerCase().includes(q) ||
            (c.summary ?? '').toLowerCase().includes(q) ||
            (c.parties ?? '').toLowerCase().includes(q)
          )
        }
        if (stateFilter) filtered = filtered.filter(c => c.state === stateFilter)
        if (typeFilter !== 'All') filtered = filtered.filter(c => (c.filing_type ?? '').includes(typeFilter))
        setCases(filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE))
        setTotal(filtered.length)
      })
      .finally(() => setLoading(false))
  }, [debouncedSearch, stateFilter, typeFilter, page])

  useEffect(() => { load() }, [load])

  // Reset page when filters change
  useEffect(() => { setPage(1) }, [debouncedSearch, stateFilter, typeFilter])

  const totalPages = Math.ceil(total / PAGE_SIZE)

  return (
    <div className="section-pad container-pad">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="Public records archive"
          title="Documented Cases"
          subtitle="Court cases, regulatory proceedings, and enforcement actions. Every entry links to publicly available source material."
        />

        {/* ── Filters ── */}
        <div className="bg-ink-900/50 border border-ink-700/40 rounded-xl p-4 md:p-5 mb-8">
          {/* Search */}
          <div className="mb-4">
            <input
              type="search"
              placeholder="Search cases, parties, summaries…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="input-field"
              aria-label="Search cases"
            />
          </div>

          {/* Filter row */}
          <div className="flex flex-wrap gap-3 items-center">
            {/* State select */}
            <select
              value={stateFilter}
              onChange={e => setStateFilter(e.target.value)}
              className="input-field w-auto min-w-[120px]"
              aria-label="Filter by state"
            >
              <option value="">All States</option>
              {US_STATES.filter(Boolean).map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>

            {/* Filing type pills */}
            <div className="flex flex-wrap gap-2">
              {FILING_TYPES.map(t => (
                <button
                  key={t}
                  onClick={() => setTypeFilter(t)}
                  aria-pressed={typeFilter === t}
                  className={`px-3 py-1.5 rounded font-body text-xs font-medium transition-all duration-150 ${
                    typeFilter === t
                      ? 'bg-blood-700 text-white border border-blood-600'
                      : 'bg-ink-800 text-ink-400 border border-ink-700 hover:border-ink-500 hover:text-ink-300'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Result count */}
            <span className="font-mono text-ink-500 text-xs ml-auto">
              {total} {total === 1 ? 'record' : 'records'}
            </span>
          </div>
        </div>

        {/* ── Results ── */}
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="text-red-400 font-body text-sm">{error}</div>
        ) : cases.length === 0 ? (
          <EmptyState message="No cases match your search. Try adjusting the filters." />
        ) : (
          <div className="flex flex-col gap-4">
            {cases.map(c => <CaseCard key={c.id} c={c} />)}
          </div>
        )}

        <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        <DisclaimerBanner />
      </div>
    </div>
  )
}
