import { SectionHeading } from '../components/UI'
import { Link } from 'react-router-dom'

const SECTIONS = [
  {
    title: 'Sourcing Standards',
    items: [
      'Court case information is sourced exclusively from public dockets and court filing databases (UniCourt, Justia, Trellis, DocketAlarm) or published legal reporting.',
      'Regulatory actions are sourced from official agency press releases, enforcement orders, or public databases (SEC EDGAR, CFPB complaint database).',
      'Corporate structure information is derived from the companies\' own public websites, SEC investment adviser filings, and Wikipedia.',
      'Biographical information about public figures is sourced from Wikipedia, Forbes, and published financial journalism — not from private or confidential sources.',
    ],
  },
  {
    title: 'Attribution & Language Rules',
    items: [
      'Every factual claim is attributed to its source using language such as: "according to the filing," "public records show," "the complaint alleges," "the docket reflects," "the agency announced," or "per [source]."',
      'This site does not use the following words in editorial copy unless directly quoted from a source: fraud, scam, abuse, deception, scheme.',
      'The word "criminal" is used only when referring to an actual criminal proceeding documented in court records.',
      'Tenant-reported issues are described as "documented," "reported," or "alleged" — not stated as established facts.',
      'Unresolved matters are not presented as final findings of liability or wrongdoing.',
    ],
  },
  {
    title: 'Verification Badge System',
    items: [
      'Verified Public Record — Sourced from court dockets, regulatory orders, or official corporate filings. Independently accessible via the linked source.',
      'Agency Source — Sourced from a government agency database, press release, or enforcement order.',
      'News Report — Sourced from published journalism or documented investigative reporting.',
      'User-Submitted (Unverified) — Information provided by users. Not independently verified. Displayed in a separate section with a clear disclosure label.',
    ],
  },
  {
    title: 'Content Separation',
    items: [
      'Verified public records (court dockets, regulatory filings, corporate disclosures) appear in the Evidence section with direct source links.',
      'User-submitted reports are displayed only in the Stories section and are always labeled as "User-Submitted (Unverified)."',
      'Consumer complaint data (BBB, CFPB) is attributed to the platform and presented with the platform\'s own published counts.',
      'The two categories are never mixed or presented in a way that might imply unverified accounts are established public records.',
    ],
  },
  {
    title: 'Corrections & Disputes',
    items: [
      'If any party named in this archive believes a factual error exists, they may submit a correction request with the specific claim and supporting documentation.',
      'Verified corrections will be made promptly and noted with a correction date.',
      'This archive does not accept payment to remove or alter documented public records.',
      'Correction requests are reviewed on a rolling basis. Contact: info@hudsonhomesexposed.com',
    ],
  },
  {
    title: 'What This Archive Is Not',
    items: [
      'This is not a law firm and does not provide legal advice. Consult a qualified attorney for guidance on your specific situation.',
      'This is not affiliated with any government agency, tenant advocacy organization, or law firm.',
      'This does not make determinations of legal liability or guilt. Documented court activity does not imply final legal findings.',
      'This does not represent all possible legal activity — it reflects what has been identifiable through public sources.',
    ],
  },
]

export default function Methodology() {
  return (
    <div className="section-pad container-pad">
      <div className="max-w-3xl mx-auto">
        <SectionHeading
          eyebrow="Editorial standards"
          title="Methodology & Transparency"
          subtitle="How this archive is built, sourced, verified, and maintained."
        />

        {/* Primary disclaimer */}
        <div className="bg-ink-900/60 border border-ink-700/40 rounded-xl p-6 mb-12">
          <p className="font-display text-ink-300 text-lg leading-relaxed italic">
            "This website is for informational and educational purposes only. All information is
            derived from publicly available records and user-submitted experiences. No conclusions
            are made regarding the outcome of any individual case."
          </p>
        </div>

        {/* Sections */}
        {SECTIONS.map((sec, i) => (
          <div key={i} className="mb-12">
            <h2 className="font-display text-xl md:text-2xl text-ink-100 font-semibold mb-6 pb-4 border-b border-ink-700/50">
              {sec.title}
            </h2>
            <ul className="space-y-4">
              {sec.items.map((item, j) => (
                <li key={j} className="flex gap-4 items-start">
                  <span className="text-verdict-green text-sm mt-0.5 flex-shrink-0">✓</span>
                  <p className="font-body text-ink-400 text-sm leading-relaxed">{item}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Contact */}
        <div className="bg-ink-900/40 border border-ink-700/40 rounded-xl p-6">
          <h3 className="font-display text-ink-200 font-semibold text-lg mb-3">Questions or Concerns</h3>
          <p className="font-body text-ink-400 text-sm leading-relaxed mb-4">
            For correction requests, editorial questions, or concerns about specific entries, please
            contact us or use the corrections form.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/contact" className="btn-primary py-2.5 px-5">
              Submit Correction Request
            </Link>
            <a href="mailto:info@hudsonhomesexposed.com" className="btn-ghost py-2.5 px-5">
              Email Directly
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
