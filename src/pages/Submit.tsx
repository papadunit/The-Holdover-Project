import { useState, useRef } from 'react'
import { createSubmission } from '../lib/supabase'
import { SectionHeading } from '../components/UI'
import { Link } from 'react-router-dom'

type FormState = {
  name: string
  email: string
  state: string
  city: string
  description: string
  is_anonymous: boolean
  consent_truthful: boolean
  consent_review: boolean
}

const EMPTY: FormState = {
  name: '', email: '', state: '', city: '',
  description: '', is_anonymous: false,
  consent_truthful: false, consent_review: false,
}

const US_STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA',
  'KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM',
  'NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA',
  'WV','WI','WY','DC',
]

type Status = 'idle' | 'submitting' | 'success' | 'error'

export default function Submit() {
  const [form, setForm] = useState<FormState>(EMPTY)
  const [files, setFiles] = useState<File[]>([])
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  const set = (k: keyof FormState, v: string | boolean) =>
    setForm(prev => ({ ...prev, [k]: v }))

  const canSubmit =
    form.description.trim().length > 30 &&
    form.consent_truthful &&
    form.consent_review &&
    status !== 'submitting'

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files ?? [])
    setFiles(prev => [...prev, ...selected].slice(0, 5)) // max 5 files
  }

  const removeFile = (i: number) => setFiles(prev => prev.filter((_, idx) => idx !== i))

  const handleSubmit = async () => {
    if (!canSubmit) return
    setStatus('submitting')
    setErrorMsg('')
    try {
      await createSubmission(
        {
          name: form.name || undefined,
          email: form.email || undefined,
          state: form.state || undefined,
          city: form.city || undefined,
          description: form.description.trim(),
          is_anonymous: form.is_anonymous,
          consent_truthful: form.consent_truthful,
          consent_review: form.consent_review,
        },
        files.length > 0 ? files : undefined
      )
      setStatus('success')
    } catch {
      setStatus('error')
      setErrorMsg('There was an error submitting your information. Please try again or email us directly.')
    }
  }

  if (status === 'success') {
    return (
      <div className="section-pad container-pad">
        <div className="max-w-xl mx-auto text-center">
          <div className="w-14 h-14 bg-verdict-green/10 border border-emerald-700/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-emerald-400 text-xl">✓</span>
          </div>
          <h1 className="font-display text-2xl md:text-3xl text-ink-50 font-bold mb-4">
            Information Received
          </h1>
          <p className="font-body text-ink-400 text-base leading-relaxed mb-8">
            Thank you for your submission. It will be reviewed before any publication decision is made.
            If displayed, it will be clearly labeled as a user-submitted account — separate from verified public records.
            Identifying details may be anonymized upon request.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/evidence" className="btn-primary">View Evidence Archive</Link>
            <Link to="/" className="btn-ghost">Return Home</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="section-pad container-pad">
      <div className="max-w-2xl mx-auto">
        <SectionHeading
          eyebrow="Contribute to the archive"
          title="Submit Documentation or Experience"
          subtitle="All submissions are reviewed before any publication decision. Submission does not guarantee publication."
        />

        {/* Important notice */}
        <div className="bg-amber-950/30 border border-amber-700/30 rounded-lg p-5 mb-8">
          <div className="flex items-start gap-3">
            <span className="text-amber-500 mt-0.5">⚠</span>
            <div>
              <p className="font-body text-amber-400 text-sm font-semibold mb-2">Important</p>
              <ul className="font-body text-amber-600/80 text-xs leading-relaxed space-y-1.5">
                <li>• User-submitted information is clearly separated from verified public records on this site.</li>
                <li>• Submissions may be anonymized. Identifying details will not be published without your consent.</li>
                <li>• This archive cannot provide legal advice. Contact a tenant rights attorney or legal aid organization for assistance with your specific situation.</li>
                <li>• By submitting you confirm the information is truthful to the best of your knowledge.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-5">
          {/* Name + Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-mono text-ink-500 text-[10px] uppercase tracking-widest mb-2">
                Name <span className="text-ink-700">(optional)</span>
              </label>
              <input
                type="text"
                value={form.name}
                onChange={e => set('name', e.target.value)}
                placeholder="Your name"
                className="input-field"
              />
            </div>
            <div>
              <label className="block font-mono text-ink-500 text-[10px] uppercase tracking-widest mb-2">
                Email <span className="text-ink-700">(optional, not published)</span>
              </label>
              <input
                type="email"
                value={form.email}
                onChange={e => set('email', e.target.value)}
                placeholder="your@email.com"
                className="input-field"
              />
            </div>
          </div>

          {/* State + City */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-mono text-ink-500 text-[10px] uppercase tracking-widest mb-2">State</label>
              <select
                value={form.state}
                onChange={e => set('state', e.target.value)}
                className="input-field"
              >
                <option value="">Select state…</option>
                {US_STATES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block font-mono text-ink-500 text-[10px] uppercase tracking-widest mb-2">
                City <span className="text-ink-700">(optional)</span>
              </label>
              <input
                type="text"
                value={form.city}
                onChange={e => set('city', e.target.value)}
                placeholder="City"
                className="input-field"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block font-mono text-ink-500 text-[10px] uppercase tracking-widest mb-2">
              Your Experience or Documentation Details <span className="text-blood-700">*</span>
            </label>
            <textarea
              value={form.description}
              onChange={e => set('description', e.target.value)}
              placeholder="Describe your experience, reference a public record, or provide context for documentation you'd like to share. Be as specific as possible about dates, communications, and outcomes."
              rows={7}
              className="input-field resize-y min-h-[160px]"
            />
            <p className={`font-mono text-xs mt-1 ${form.description.length < 30 ? 'text-ink-600' : 'text-verdict-green'}`}>
              {form.description.length} / 30 minimum characters
            </p>
          </div>

          {/* File upload */}
          <div>
            <label className="block font-mono text-ink-500 text-[10px] uppercase tracking-widest mb-2">
              Supporting Files <span className="text-ink-700">(optional, max 5)</span>
            </label>
            <div
              className="border-2 border-dashed border-ink-700 rounded-lg p-6 text-center cursor-pointer hover:border-ink-500 transition-colors"
              onClick={() => fileRef.current?.click()}
            >
              <input
                ref={fileRef}
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png,.webp,.doc,.docx"
                onChange={handleFiles}
                className="hidden"
              />
              <p className="font-body text-ink-500 text-sm mb-1">Click to upload files</p>
              <p className="font-mono text-ink-700 text-xs">PDF, JPG, PNG, DOC up to 10MB each</p>
            </div>
            {files.length > 0 && (
              <ul className="mt-3 space-y-2">
                {files.map((f, i) => (
                  <li key={i} className="flex items-center justify-between bg-ink-800/50 rounded px-3 py-2 border border-ink-700/40">
                    <span className="font-mono text-ink-400 text-xs truncate max-w-[80%]">{f.name}</span>
                    <button
                      onClick={() => removeFile(i)}
                      className="text-ink-600 hover:text-blood-500 transition-colors text-xs ml-2 flex-shrink-0"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Anonymous toggle */}
          <div className="flex items-center gap-3">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={form.is_anonymous}
                onChange={e => set('is_anonymous', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-10 h-6 bg-ink-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-ink-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blood-700 relative" />
            </label>
            <span className="font-body text-ink-400 text-sm">
              I prefer to remain anonymous if this is published
            </span>
          </div>

          {/* Consent checkboxes */}
          <div className="space-y-3 pt-2">
            {[
              {
                k: 'consent_truthful' as const,
                text: 'I confirm that the information I am providing is truthful to the best of my knowledge. I understand that submitting false information is harmful to this platform and to others.',
              },
              {
                k: 'consent_review' as const,
                text: 'I understand that my submission will be reviewed before any publication decision is made, and if published, will be clearly labeled as a user-submitted account — separate from verified public records.',
              },
            ].map(({ k, text }) => (
              <label key={k} className="flex items-start gap-3 cursor-pointer group">
                <div className="relative mt-0.5 flex-shrink-0">
                  <input
                    type="checkbox"
                    checked={form[k] as boolean}
                    onChange={e => set(k, e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-5 h-5 bg-ink-800 border-2 border-ink-600 rounded peer-checked:bg-blood-700 peer-checked:border-blood-600 transition-all flex items-center justify-center">
                    {form[k] && <span className="text-white text-[10px]">✓</span>}
                  </div>
                </div>
                <span className="font-body text-ink-500 text-sm leading-relaxed group-hover:text-ink-400 transition-colors">
                  {text}
                </span>
              </label>
            ))}
          </div>

          {/* Error message */}
          {status === 'error' && (
            <div className="bg-red-950/40 border border-red-700/40 rounded-lg p-4">
              <p className="font-body text-red-400 text-sm">{errorMsg}</p>
            </div>
          )}

          {/* Submit button */}
          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className={`w-full py-4 rounded-lg font-body font-semibold text-base transition-all duration-200 ${
              canSubmit
                ? 'bg-blood-700 hover:bg-blood-600 text-white cursor-pointer'
                : 'bg-ink-800 text-ink-600 cursor-not-allowed'
            }`}
          >
            {status === 'submitting' ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Submitting…
              </span>
            ) : 'Submit Information'}
          </button>

          <p className="font-body text-ink-600 text-xs text-center">
            Or email directly:{' '}
            <a href="mailto:info@hudsonhomesexposed.com" className="text-blood-500 hover:text-blood-400">
              info@hudsonhomesexposed.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
