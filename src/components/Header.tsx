import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'

const NAV_LINKS = [
  { to: '/evidence',    label: 'Evidence' },
  { to: '/stories',     label: 'Stories' },
  { to: '/submit',      label: 'Submit' },
  { to: '/methodology', label: 'Methodology' },
  { to: '/contact',     label: 'Contact' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Lock body scroll when mobile nav open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-ink-950/95 backdrop-blur-md border-b border-ink-700/60 shadow-xl shadow-black/30'
            : 'bg-ink-950/80 backdrop-blur-sm border-b border-ink-800/40'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group"
            onClick={() => setMobileOpen(false)}
          >
            <div className="w-7 h-7 bg-blood-600 rounded flex items-center justify-center flex-shrink-0">
              <span className="font-display font-bold text-white text-xs leading-none">HP</span>
            </div>
            <div className="leading-none">
              <div className="font-display font-bold text-ink-50 text-sm tracking-wide group-hover:text-white transition-colors">
                THE HOLDOVER PROJECT
              </div>
              <div className="font-mono text-ink-500 text-[10px] tracking-widest uppercase">
                Public Records Archive
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `px-4 py-2 rounded font-body text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? 'text-ink-50 bg-ink-800'
                      : 'text-ink-400 hover:text-ink-200 hover:bg-ink-800/50'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link to="/submit" className="btn-primary ml-3 py-2 px-4 text-xs">
              Submit Experience
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-ink-300 hover:text-ink-100 p-2 -mr-2 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            <div className={`w-5 flex flex-col gap-1 transition-all ${mobileOpen ? 'gap-0' : ''}`}>
              <span className={`block h-px bg-current transition-all duration-200 ${mobileOpen ? 'rotate-45 translate-y-px' : ''}`} />
              <span className={`block h-px bg-current transition-all duration-200 ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-px bg-current transition-all duration-200 ${mobileOpen ? '-rotate-45 -translate-y-px' : ''}`} />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
        {/* Drawer panel */}
        <div
          className={`absolute top-16 left-0 right-0 bg-ink-900 border-b border-ink-700 transition-all duration-300 ${
            mobileOpen ? 'translate-y-0' : '-translate-y-4'
          }`}
        >
          <nav className="py-4">
            {NAV_LINKS.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `block px-6 py-4 font-body text-base font-medium border-l-2 transition-all ${
                    isActive
                      ? 'text-ink-50 border-blood-600 bg-ink-800/50'
                      : 'text-ink-400 border-transparent hover:text-ink-200 hover:border-ink-600'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <div className="px-6 pt-4 pb-2">
              <Link
                to="/submit"
                onClick={() => setMobileOpen(false)}
                className="btn-primary w-full justify-center"
              >
                Submit Your Experience
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </>
  )
}
