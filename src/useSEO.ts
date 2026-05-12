/**
 * useSEO — per-route meta tag manager for hudsonhomesexposed.com
 * Call at the top of each page component: useSEO('/evidence')
 */

interface SEOConfig {
  title: string
  description: string
  canonical: string
  ogTitle?: string
  ogDescription?: string
  ogType?: string
  keywords?: string[]
}

const SEO_MAP: Record<string, SEOConfig> = {
  '/': {
    title: 'Hudson Homes Management Lawsuit, Complaints & Court Records | HudsonHomesExposed.com',
    description: '191 documented court cases across 21+ states. CFPB filings, BBB complaints, SEC penalty, tenant reports, and eviction records involving Hudson Homes Management LLC and Lone Star Funds. All sourced from public records.',
    canonical: 'https://hudsonhomesexposed.com/',
    ogTitle: 'Hudson Homes Management LLC — 191 Court Cases, 141 BBB Complaints, $11.2M SEC Penalty',
    ogDescription: '191 documented court cases. 141 BBB complaints. $11.2M SEC fine. The public evidence archive about Hudson Homes Management LLC and Lone Star Funds.',
    ogType: 'website',
    keywords: ['Hudson Homes Management lawsuit', 'Hudson Homes Management complaints', 'Hudson Homes Management reviews', 'who owns Hudson Homes Management', 'is Hudson Homes legit', 'Lone Star Funds evictions', 'LSF9 Master Participation Trust'],
  },
  '/evidence': {
    title: 'Hudson Homes Management Court Cases — Searchable Database | 191+ Records',
    description: 'Search 191+ court cases involving Hudson Homes Management LLC. Eviction filings, housing court records, regulatory actions, and dismissals across 21+ states. Filter by state, court, and case type.',
    canonical: 'https://hudsonhomesexposed.com/evidence',
    ogTitle: 'Hudson Homes Management Court Cases — 191+ Records',
    ogDescription: 'Searchable database of court cases and regulatory actions involving Hudson Homes Management LLC and LSF9 Master Participation Trust across 21+ states.',
    ogType: 'article',
    keywords: ['Hudson Homes Management court cases', 'Hudson Homes Management lawsuit database', 'LSF9 Trust eviction cases', 'Tony Madan court filing', 'Hudson Homes eviction records', 'Hudson Homes Management legal cases'],
  },
  '/stories': {
    title: 'Hudson Homes Management Tenant Complaints & Experiences | Reviewed Submissions',
    description: 'Reviewed tenant accounts from Hudson Homes Management LLC residents. Lease disputes, maintenance failures, holdover charges, and wrongful eviction claims. Clearly labeled and separate from verified public records.',
    canonical: 'https://hudsonhomesexposed.com/stories',
    ogTitle: 'Hudson Homes Management Tenant Complaints — Reviewed Accounts',
    ogDescription: 'Tenant-submitted experiences with Hudson Homes Management LLC. Reviewed before publication, clearly labeled as unverified accounts.',
    ogType: 'article',
    keywords: ['Hudson Homes Management tenant complaints', 'Hudson Homes Management tenant reviews', 'Hudson Homes Management resident reports', 'Hudson Homes Management bad reviews', 'Hudson Homes holdover charges'],
  },
  '/submit': {
    title: 'Submit Your Hudson Homes Management Experience | HudsonHomesExposed.com',
    description: 'Submit documentation or your personal experience with Hudson Homes Management LLC. All submissions are reviewed before publication. Anonymization available on request.',
    canonical: 'https://hudsonhomesexposed.com/submit',
    ogTitle: 'Submit Your Hudson Homes Management Experience',
    ogDescription: 'Share your experience or documentation related to Hudson Homes Management LLC. Reviewed before publication. Anonymous submissions accepted.',
    ogType: 'article',
    keywords: ['Hudson Homes Management complaint', 'report Hudson Homes Management', 'Hudson Homes Management tenant submission'],
  },
  '/methodology': {
    title: 'Methodology & Editorial Standards | HudsonHomesExposed.com',
    description: 'How the Hudson Homes Management investigation is sourced, verified, and maintained. Verification badge system, attribution standards, corrections policy, and content separation guidelines.',
    canonical: 'https://hudsonhomesexposed.com/methodology',
    ogTitle: 'Methodology & Editorial Standards — HudsonHomesExposed.com',
    ogDescription: 'Sourcing standards, verification badge system, attribution rules, and corrections policy for the Hudson Homes Management investigation archive.',
    ogType: 'article',
    keywords: ['Hudson Homes Management investigation methodology', 'Hudson Homes exposed sources', 'HudsonHomesExposed editorial standards'],
  },
  '/news': {
    title: 'Hudson Homes Management News Coverage & Media Mentions',
    description: 'News articles and media coverage of Hudson Homes Management LLC, Lone Star Funds, and related entities. Updated daily from public news sources.',
    canonical: 'https://hudsonhomesexposed.com/news',
    ogTitle: 'Hudson Homes Management News & Media Coverage',
    ogDescription: 'News mentions and press coverage of Hudson Homes Management LLC, Lone Star Funds, and John Grayken. Updated daily.',
    ogType: 'article',
    keywords: ['Hudson Homes Management news', 'Hudson Homes Management media coverage', 'Lone Star Funds news', 'Hudson Homes Management press'],
  },
  '/contact': {
    title: 'Contact & Corrections | HudsonHomesExposed.com',
    description: 'Submit a correction request, ask an editorial question, or contact the Hudson Homes Management investigation archive. All documented errors are corrected promptly.',
    canonical: 'https://hudsonhomesexposed.com/contact',
    ogTitle: 'Contact & Corrections — HudsonHomesExposed.com',
    ogDescription: 'Submit correction requests or contact the Hudson Homes Management investigation archive.',
    ogType: 'article',
    keywords: ['HudsonHomesExposed contact', 'Hudson Homes Management correction', 'HudsonHomesExposed corrections'],
  },
}

function setMeta(attr: string, attrVal: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${attrVal}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, attrVal)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setLink(rel: string, href: string) {
  let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

export function useSEO(path: string): void {
  const config = SEO_MAP[path] ?? SEO_MAP['/']

  document.title = config.title

  setMeta('name', 'description', config.description)
  setMeta('name', 'keywords', (config.keywords ?? []).join(', '))
  setMeta('name', 'robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1')

  // Canonical — fixes http:// vs https:// GSC split
  setLink('canonical', config.canonical)

  // Open Graph
  setMeta('property', 'og:title', config.ogTitle ?? config.title)
  setMeta('property', 'og:description', config.ogDescription ?? config.description)
  setMeta('property', 'og:type', config.ogType ?? 'website')
  setMeta('property', 'og:url', config.canonical)
  setMeta('property', 'og:site_name', 'The Holdover Project — HudsonHomesExposed.com')
  setMeta('property', 'og:image', 'https://hudsonhomesexposed.com/og-image.jpg')

  // Twitter Card
  setMeta('name', 'twitter:card', 'summary_large_image')
  setMeta('name', 'twitter:title', config.ogTitle ?? config.title)
  setMeta('name', 'twitter:description', config.ogDescription ?? config.description)
  setMeta('name', 'twitter:image', 'https://hudsonhomesexposed.com/og-image.jpg')
}
