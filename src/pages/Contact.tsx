import { useState } from 'react'
import { createCorrectionRequest } from '../lib/supabase'
import { SectionHeading } from '../components/UI'
import { Link } from 'react-router-dom'

type FormState = { name: string; email: string; subject: string; message: string; related_url: string }
const EMPTY: FormState = { name: '', email: '', subject: '', message: '', related_url: '' }

type Status = 'idle' | 'submitting' | 'success' | 'error'

export default function Contact() {
  const [form, setForm] = useState<FormState>(EMPTY)
  const [status, setStatus] = useState<Status>('idle')

  const set = (k: keyof FormState, v: string) => setForm(prev => ({ ...prev, [k]: v }))
  const canSubmit = form.subject.trim().length > 3 && form.message.trim().length > 20 && status !== 'submitting'

  const handleSubmit = async () => {
    if (!canSubmit) return
    setStatus('submitting')
    try {
      await createCorrectionRequest({
        name: form.name || undefined,
        email: form.email || undefined,
        subject: form.subject.trim(),
        message: form.message.trim(),
        related_url: form.related_url || undefined,
      })
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="section-pad container-pad max-w-xl mx-auto text-center">
        <div className="w-14 h-14 bg-verdict-green/10 border border-emerald-700/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-emerald-400 text-xl">✓</span>
        </div>
        <h1 className="font-display text-2xl text-ink-50 font-bold mb-4">Request Received</h1>
        <p className="font-body text-ink-400 text-base leading-relaxed mb-6">
          Thank you. Your correction or inquiry will be reviewed. Verified corrections are applied promptly and noted with a correction date.
        </p>
        <Link to="/" className="btn-ghost">Return Home</Link>
      </div>
    )
  }

  return (
    <div className="section-pad container-pad">
      <div className="max-w-2xl mx-auto">
        <SectionHeading
          eyebrow="Get in touch"
          title="Corrections & Contact"
          subtitle="To request a correction, dispute a factual claim, or make a general inquiry. Verified corrections are applied promptly and noted with a correction date."
        />

        {/* Contact cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {[
            { label: 'General Inquiries', email: 'info@hudsonhomesexposed.com' },
            { label: 'Media & Press',     email: 'media@hudsonhomesexposed.com' },
            { label: 'Corrections',       email: 'info@hudsonhomesexposed.com' },
          ].map(c => (
            <div key={c.label} className="card p-4 text-center">
              <p className="font-mono text-ink-500 text-[10px] uppercase tracking-widest mb-2">{c.label}</p>
              <a href={`mailto:${c.email}`} className="font-body text-blood-400 hover:text-blood-300 text-xs transition-colors break-all">
                {c.email}
              </a>
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="card p-6 md:p-8">
          <h2 className="font-display text-ink-100 font-semibold text-xl mb-6">Submit a Correction or Inquiry</h2>

          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-ink-500 text-[10px] uppercase tracking-widest mb-2">
                  Name <span className="text-ink-700">(optional)</span>
                </label>
                <input type="text" value={form.name} onChange={e => set('name', e.target.value)}
                  placeholder="Your name" className="input-field" />
              </div>
              <div>
                <label className="block font-mono text-ink-500 text-[10px] uppercase tracking-widest mb-2">
                  Email <span className="text-ink-700">(optional)</span>
                </label>
                <input type="email" value={form.email} onChange={e => set('email', e.target.value)}
                  placeholder="For follow-up if needed" className="input-field" />
              </div>
            </div>

            <div>
              <label className="block font-mono text-ink-500 text-[10px] uppercase tracking-widest mb-2">
                Subject <span className="text-blood-700">*</span>
              </label>
              <input type="text" value={form.subject} onChange={e => set('subject', e.target.value)}
                placeholder="e.g. Correction request for [case name]" className="input-field" />
            </div>

            <div>
              <label className="block font-mono text-ink-500 text-[10px] uppercase tracking-widest mb-2">
                Related URL <span className="text-ink-700">(optional)</span>
              </label>
              <input type="url" value={form.related_url} onChange={e => set('related_url', e.target.value)}
                placeholder="Link to the specific page or case in question" className="input-field" />
            </div>

            <div>
              <label className="block font-mono text-ink-500 text-[10px] uppercase tracking-widest mb-2">
                Message <span className="text-blood-700">*</span>
              </label>
              <textarea
                value={form.message}
                onChange={e => set('message', e.target.value)}
                placeholder="Describe the specific claim you believe is inaccurate and provide supporting documentation or context. Corrections are reviewed against primary sources."
                rows={6}
                className="input-field resize-y"
              />
            </div>

            {status === 'error' && (
              <p className="font-body text-red-400 text-sm">
                There was an error submitting. Please email us directly at info@hudsonhomesexposed.com
              </p>
            )}

            <button
              onClick={handleSubmit}
              disabled={!canSubmit}
              className={`w-full py-4 rounded-lg font-body font-semibold text-base transition-all ${
                canSubmit ? 'bg-blood-700 hover:bg-blood-600 text-white cursor-pointer' : 'bg-ink-800 text-ink-600 cursor-not-allowed'
              }`}
            >
              {status === 'submitting' ? 'Sending…' : 'Submit Request'}
            </button>
          </div>
        </div>

        {/* Policy note */}
        <div className="mt-8 bg-ink-900/40 border border-ink-700/30 rounded-lg p-5">
          <p className="font-body text-ink-500 text-xs leading-relaxed">
            <strong className="text-ink-400">Correction Policy:</strong> This archive does not accept
            payment to remove or alter documented public records. Corrections must be supported by
            documentation demonstrating a factual error. Verified corrections are applied promptly
            and noted with a correction date. Requests disputing interpretations of public records
            (rather than factual errors) will be reviewed on a case-by-case basis.
          </p>
        </div>
      </div>
    </div>
  )
}
