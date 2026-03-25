import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    '[Holdover] Supabase env vars not set. ' +
    'Copy .env.example → .env.local and fill in your project credentials.'
  )
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder'
)

// ─── Database types ──────────────────────────────────────────
export interface Case {
  id: string
  slug: string
  title: string
  jurisdiction: string | null
  state: string | null
  county: string | null
  filing_type: string | null
  filed_date: string | null
  status: string | null
  parties: string | null
  summary: string | null
  source_name: string | null
  source_url: string | null
  badge: 'public_record' | 'agency' | 'news' | 'user'
  published: boolean
  created_at: string
  updated_at: string
  tags?: Tag[]
}

export interface Tag {
  id: string
  name: string
  slug: string
}

export interface Story {
  id: string
  slug: string
  title: string
  display_name: string | null
  state: string | null
  excerpt: string | null
  body: string | null
  verified_level: 'user_submitted' | 'reviewed' | 'verified'
  published: boolean
  created_at: string
  updated_at: string
}

export interface SubmissionInput {
  name?: string
  email?: string
  state?: string
  city?: string
  description: string
  is_anonymous: boolean
  consent_truthful: boolean
  consent_review: boolean
}

export interface CorrectionInput {
  name?: string
  email?: string
  subject: string
  message: string
  related_url?: string
}

// ─── Query helpers ────────────────────────────────────────────

export async function fetchCases(filters?: {
  state?: string
  filing_type?: string
  search?: string
  page?: number
  pageSize?: number
}): Promise<{ data: Case[]; count: number }> {
  const page = filters?.page ?? 1
  const pageSize = filters?.pageSize ?? 20
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  let query = supabase
    .from('cases')
    .select('*', { count: 'exact' })
    .eq('published', true)
    .order('filed_date', { ascending: false })
    .range(from, to)

  if (filters?.state) query = query.eq('state', filters.state)
  if (filters?.filing_type && filters.filing_type !== 'All') {
    query = query.ilike('filing_type', `%${filters.filing_type}%`)
  }
  if (filters?.search) {
    query = query.or(
      `title.ilike.%${filters.search}%,summary.ilike.%${filters.search}%,parties.ilike.%${filters.search}%`
    )
  }

  const { data, error, count } = await query
  if (error) throw error
  return { data: (data as Case[]) ?? [], count: count ?? 0 }
}

export async function fetchCaseBySlug(slug: string): Promise<Case | null> {
  const { data, error } = await supabase
    .from('cases')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()
  if (error) return null
  return data as Case
}

export async function fetchStories(page = 1, pageSize = 10) {
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1
  const { data, error, count } = await supabase
    .from('stories')
    .select('*', { count: 'exact' })
    .eq('published', true)
    .order('created_at', { ascending: false })
    .range(from, to)
  if (error) throw error
  return { data: (data as Story[]) ?? [], count: count ?? 0 }
}

export async function fetchStoryBySlug(slug: string): Promise<Story | null> {
  const { data, error } = await supabase
    .from('stories')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()
  if (error) return null
  return data as Story
}

export async function createSubmission(
  input: SubmissionInput,
  files?: File[]
): Promise<{ id: string }> {
  const { data, error } = await supabase
    .from('submissions')
    .insert([{ ...input, status: 'pending' }])
    .select('id')
    .single()
  if (error) throw error
  const id = (data as { id: string }).id

  if (files && files.length > 0) {
    for (const file of files) {
      const ext = file.name.split('.').pop()
      const path = `${id}/${Date.now()}.${ext}`
      const { error: uploadError } = await supabase.storage
        .from('submissions')
        .upload(path, file)
      if (!uploadError) {
        await supabase.from('submission_files').insert([{
          submission_id: id,
          file_path: path,
          file_type: file.type,
          original_name: file.name,
        }])
      }
    }
  }

  return { id }
}

export async function createCorrectionRequest(input: CorrectionInput) {
  const { error } = await supabase
    .from('correction_requests')
    .insert([{ ...input, status: 'open' }])
  if (error) throw error
}

export async function fetchTags(): Promise<Tag[]> {
  const { data, error } = await supabase.from('tags').select('*').order('name')
  if (error) return []
  return (data as Tag[]) ?? []
}
