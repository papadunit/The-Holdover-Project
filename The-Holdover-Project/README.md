# Holdover Platform

Neutral, evidence-oriented React + Vite + Supabase project for collecting tenant-submitted experiences.

## Setup
1. Copy `.env.example` to `.env`
2. Fill in your Supabase URL and anon key
3. Run:
   npm install
   npm run dev

## Supabase requirements
- `submissions` table
- `documents` storage bucket
- `approved` boolean column on `submissions`
- appropriate RLS/storage policies

## Notes
- Keep content factual and evidence-based
- Add authentication before exposing admin in production
