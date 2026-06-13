# ADDICTION JO

Premium automotive event platform built with Next.js 15, TypeScript, TailwindCSS, Framer Motion, shadcn/ui, and Supabase.

## Stack

- Next.js 15 (App Router)
- React + TypeScript
- TailwindCSS
- Framer Motion
- shadcn/ui-style components
- Supabase (Auth + Database + Storage)

## Pages

- `/`
- `/register`
- `/tickets`
- `/volunteer`
- `/gallery`
- `/sponsors`
- `/contact`
- `/admin`

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create `.env.local` from `.env.example`.
3. Apply SQL in [`supabase/schema.sql`](./supabase/schema.sql) to your Supabase project.
4. Add at least one row to `public.admins` with your Supabase auth user ID + email.
5. Place your logo file at `public/images/addiction-jo-logo.png`.
6. Run:
   ```bash
   npm run dev
   ```

## Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```

## Deploy To Vercel

1. Push this project to GitHub.
2. In Vercel, click `New Project` and import the repo.
3. In Project Settings -> Environment Variables, add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. Deploy.

Notes:
- The app uses Supabase Auth + Database + Storage, so all 3 env vars are required in Vercel.
- Make sure your Supabase schema is applied from [`supabase/schema.sql`](./supabase/schema.sql).
