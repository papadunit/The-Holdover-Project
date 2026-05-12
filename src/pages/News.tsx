import { useEffect, useState } from 'react'
import { fetchNewsMentions, type NewsMention } from '../lib/supabase'
import { useSEO } from '../useSEO'
import { SectionHeading } from '../components/UI'

// Static news items shown when Supabase has no data
const STATIC_NEWS: NewsMention[] = [
  {
    id: 'n1',
    title: 'ICSID Fully Annuls $230M Award Against South Korea in Lone Star Dispute — One of Only 8 Full Annulments in ICSID History',
    url: 'https://www.kedglobal.com/legal-disputes/newsView/ked202511180007',
    source_name: 'KED Global',
    excerpt: 'An ICSID ad hoc committee fully annulled a 2022 arbitration award that had ordered Seoul to pay Lone Star Funds approximately $230 million. The committee found the original tribunal violated South Korea\'s due process rights by relying on evidence from a separate ICC case in which Korea was not a party. The tribunal also ordered Lone Star to reimburse South Korea approximately $5 million in legal costs. Lone Star has signaled it intends to resubmit a new ICSID claim.',
    published_at: '2025-11-18',
    created_at: '2025-11-18',
  },
  {
    id: 'n2',
    title: 'Lone Star Rejects ICSID Annulment, Eyes New Arbitration Against South Korea',
    url: 'https://www.koreatimes.co.kr/southkorea/politics/20251120/lone-star-rejects-icsid-annulment-eyes-new-arbitration',
    source_name: 'The Korea Times',
    excerpt: 'Lone Star Funds said it does not accept the ICSID annulment ruling, emphasizing the award was voided "on procedural grounds." A spokesperson said the firm "looks forward to presenting its case again to a new tribunal." Legal experts note Lone Star faces a narrow path — the original claims involved events 15–20 years ago.',
    published_at: '2025-11-21',
    created_at: '2025-11-21',
  },
  {
    id: 'n3',
    title: 'Hudson Homes Management LLC Fails to Defend Its Agency With LSF9 Master Participation Trust — Ohio Case Dismissed',
    url: 'https://bpinvestigativeagency.com/hudson-homes-management-llc-fails-to-defend-its-agency-with-u-s-bank-trust-n-a-as-trustee-for-lsf9-master-participation-trust/',
    source_name: 'BP Investigative Agency',
    excerpt: 'In an Ohio eviction case, Hudson Homes Management LLC claimed to be both the property owner and agent for LSF9 Master Participation Trust. The Magistrate granted leave for HHM to prove its standing. HHM filed no responsive brief and produced no supporting evidence. The case was dismissed. The investigative report states this is "further confirmation that U.S. Bank Trust, N.A. as Trustee, the LSF9 Master Participation Trust, Hudson Homes Management, LLC, or any combination thereof, do not own the properties they foreclosed upon."',
    published_at: '2024-11-08',
    created_at: '2024-11-08',
  },
  {
    id: 'n4',
    title: 'Zangara v. LSF9 Master Participation Trust — New Mexico Supreme Court Rules on Repeated Standing Failures',
    url: 'https://law.justia.com/cases/new-mexico/supreme-court/2024/s-1-sc-39679-0.html',
    source_name: 'New Mexico Supreme Court / Justia',
    excerpt: 'The New Mexico Supreme Court addressed a case in which LSF9\'s foreclosure action had been previously dismissed for lack of standing. The Trust filed a second foreclosure action invoking the state\'s savings statute. The Court clarified that a dismissal for lack of standing does not constitute "negligence in prosecution," addressing the repeated pattern of LSF9 standing challenges in state courts.',
    published_at: '2024-01-01',
    created_at: '2024-01-01',
  },
  {
    id: 'n5',
    title: 'Lone Star Agrees to Acquire Alliance Ground International Through Lone Star Fund XII (Jan. 2026)',
    url: 'https://en.wikipedia.org/wiki/Lone_Star_Funds',
    source_name: 'Wikipedia / Lone Star Funds',
    excerpt: 'In January 2026, Lone Star agreed to acquire Alliance Ground International, a North American airport ground handling and aviation services provider, through an affiliate of Lone Star Fund XII, L.P. The deal reflects ongoing deployment of capital from Lone Star\'s latest fund as the firm continues expanding its portfolio.',
    published_at: '2026-01-01',
    created_at: '2026-01-01',
  },
  {
    id: 'n6',
    title: 'Delhi Police Charge John Grayken With Criminal Breach of Trust Over RattanIndia Finance',
    url: 'https://en.wikipedia.org/wiki/John_Grayken',
    source_name: 'Wikipedia',
    excerpt: 'In 2022, Delhi police accused Lone Star founder John Grayken of criminal breach of trust, cheating, and criminal conspiracy. It is alleged that Grayken personally became the beneficial owner of RattanIndia Finance when he had told other shareholders that Lone Star Funds would do so.',
    published_at: '2022-01-01',
    created_at: '2022-01-01',
  },
]

export default function News() {
  useSEO('/news')
  const [news, setNews] = useState<NewsMention[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchNewsMentions(50).then(data => {
      setNews(data.length > 0 ? data : STATIC_NEWS)
      setLoading(false)
    }).catch(() => {
      setNews(STATIC_NEWS)
      setLoading(false)
    })
  }, [])

  const displayNews = news.length > 0 ? news : STATIC_NEWS

  return (
    <div className="section-pad container-pad">
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          eyebrow="Press & developments"
          title="News & Media Coverage"
          subtitle="Recent coverage of Hudson Homes Management LLC, Lone Star Funds, and related entities. Updated from public news sources."
        />

        {/* Update note */}
        <div className="bg-ink-900/50 border border-ink-700/40 rounded-lg px-5 py-3 mb-8 flex items-center gap-3">
          <span className="w-1.5 h-1.5 bg-blood-500 rounded-full flex-shrink-0 animate-pulse-slow" />
          <p className="font-mono text-ink-500 text-xs">
            Last updated May 12, 2026 · Sources linked directly to original reporting
          </p>
        </div>

        {loading ? (
          <div className="text-center py-20 text-ink-500 font-body text-sm">Loading...</div>
        ) : (
          <div className="flex flex-col gap-4">
            {displayNews.map(item => (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card p-5 md:p-6 block group hover:border-blood-700/50 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    {/* Source + date */}
                    <div className="flex items-center gap-3 mb-2">
                      {item.source_name && (
                        <span className="font-mono text-blood-500 text-[11px] tracking-widest uppercase">
                          {item.source_name}
                        </span>
                      )}
                      {item.published_at && (
                        <span className="font-mono text-ink-600 text-[11px]">
                          {new Date(item.published_at).toLocaleDateString('en-US', {
                            year: 'numeric', month: 'long', day: 'numeric',
                          })}
                        </span>
                      )}
                    </div>
                    <h2 className="font-display text-ink-100 font-semibold text-lg leading-snug mb-2 group-hover:text-ink-50 transition-colors">
                      {item.title}
                    </h2>
                    {item.excerpt && (
                      <p className="font-body text-ink-400 text-sm leading-relaxed line-clamp-3">
                        {item.excerpt}
                      </p>
                    )}
                  </div>
                  <span className="text-ink-600 group-hover:text-blood-500 text-lg flex-shrink-0 transition-colors mt-1">→</span>
                </div>
              </a>
            ))}
          </div>
        )}

        {/* Disclaimer */}
        <div className="mt-10 bg-ink-900/40 border border-ink-700/30 rounded-lg p-5">
          <p className="font-body text-ink-500 text-xs leading-relaxed">
            All news items link to original published sources. This archive does not author or editorialize news coverage —
            it compiles publicly available reporting for reference. Coverage is not exhaustive.
            To submit a news tip or additional coverage, <a href="/contact" className="text-blood-500 hover:text-blood-400">contact us</a>.
          </p>
        </div>
      </div>
    </div>
  )
}
