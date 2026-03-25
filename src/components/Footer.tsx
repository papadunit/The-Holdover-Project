import { Link } from 'react-router-dom'

const QUICK_LINKS = [
  { to: '/evidence',    label: 'Evidence Archive' },
  { to: '/stories',     label: 'Tenant Stories' },
  { to: '/submit',      label: 'Submit Information' },
  { to: '/methodology', label: 'Methodology' },
  { to: '/contact',     label: 'Corrections & Contact' },
]

const TRUST_SIGNALS = [
  'Public records sourced',
  'Submissions reviewed before publication',
  'Source links on every entry',
  'Corrections accepted',
]

export default function Footer() {
  return (
    <footer className="bg-ink-950 border-t border-ink-700/40 mt-auto">
      {/* Trust strip */}
      <div className="border-b border-ink-800/60">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
            {TRUST_SIGNALS.map(sig => (
              <div key={sig} className="flex items-center gap-2">
                <span className="text-verdict-green text-xs">✓</span>
                <span className="font-body text-ink-500 text-xs">{sig}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-7 h-7 bg-blood-600 rounded flex items-center justify-center flex-shrink-0">
                <span className="font-display font-bold text-white text-xs">HP</span>
              </div>
              <span className="font-display font-bold text-ink-300 text-sm tracking-wide">
                THE HOLDOVER PROJECT
              </span>
            </div>
            <p className="font-body text-ink-500 text-sm leading-relaxed mb-4">
              A structured public archive of court records, regulatory actions, and reviewed tenant
              experiences related to Hudson Homes Management LLC.
            </p>
            <p className="font-body text-ink-600 text-xs">Est. 2026</p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-mono text-ink-400 text-xs tracking-widest uppercase mb-4">Navigate</h4>
            <ul className="space-y-2">
              {QUICK_LINKS.map(link => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="font-body text-ink-500 hover:text-ink-300 text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-mono text-ink-400 text-xs tracking-widest uppercase mb-4">Contact</h4>
            <div className="space-y-3">
              <div>
                <div className="font-mono text-ink-500 text-xs uppercase tracking-wide mb-1">General</div>
                <a href="mailto:info@hudsonhomesexposed.com"
                   className="font-body text-blood-400 hover:text-blood-300 text-sm transition-colors">
                  info@hudsonhomesexposed.com
                </a>
              </div>
              <div>
                <div className="font-mono text-ink-500 text-xs uppercase tracking-wide mb-1">Media</div>
                <a href="mailto:media@hudsonhomesexposed.com"
                   className="font-body text-blood-400 hover:text-blood-300 text-sm transition-colors">
                  media@hudsonhomesexposed.com
                </a>
              </div>
              <div>
                <div className="font-mono text-ink-500 text-xs uppercase tracking-wide mb-1">Corrections</div>
                <Link to="/contact" className="font-body text-blood-400 hover:text-blood-300 text-sm transition-colors">
                  Submit correction request →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Primary disclaimer */}
        <div className="border-t border-ink-800/60 pt-8 mb-8">
          <div className="bg-ink-900/50 rounded-lg border border-ink-700/40 p-5">
            <p className="font-body text-ink-500 text-xs leading-relaxed mb-2">
              <strong className="text-ink-400">Disclaimer:</strong> This website is for informational and educational purposes only. All information is derived from publicly available records and user-submitted experiences. No conclusions are made regarding the outcome of any individual case. Unresolved matters should not be interpreted as final findings of liability or wrongdoing.
            </p>
            <p className="font-body text-ink-500 text-xs leading-relaxed">
              This site is not affiliated with, endorsed by, or operated by any government agency, law firm, or the companies discussed herein. User-submitted reports are clearly separated from verified public records. Consult a qualified attorney for guidance on your specific situation. This archive does not accept payment to remove or alter documented public records.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <p className="font-body text-ink-600 text-xs">© 2026 The Holdover Project</p>
          <p className="font-body text-ink-600 text-xs">
            All case summaries reflect source material and do not constitute legal conclusions.
          </p>
        </div>
      </div>
    </footer>
  )
}
