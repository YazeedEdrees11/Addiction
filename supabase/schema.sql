-- ADDICTION JO Supabase schema
create extension if not exists "pgcrypto";

create table if not exists public.cars (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  car_brand text not null,
  car_category text not null,
  manufacturing_year int not null,
  plate_number text not null,
  phone_number text not null,
  car_image text not null,
  approval_status text not null default 'pending' check (approval_status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.ticket_orders (
  id text primary key,
  ticket_type text not null,
  full_name text not null,
  phone_number text not null,
  email text not null,
  quantity int not null check (quantity > 0),
  qr_code text,
  qr_used boolean not null default false,
  amount_jod numeric(10, 2) not null default 0,
  order_status text not null default 'pending',
  payment_status text not null default 'unpaid',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.volunteers (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  age int not null check (age >= 16),
  phone_number text not null,
  agreed_to_volunteer boolean not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.gallery_assets (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
  title text,
  caption text,
  is_featured boolean not null default false,
  sort_order int not null default 0,
  uploaded_by uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.gallery (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
  category text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.admins (
  id uuid primary key,
  email text unique not null,
  role text not null default 'editor',
  created_at timestamptz not null default now()
);

create table if not exists public.homepage_content (
  key text primary key,
  value text not null,
  updated_at timestamptz not null default now()
);

alter table public.cars enable row level security;
alter table public.ticket_orders enable row level security;
alter table public.volunteers enable row level security;
alter table public.contact_messages enable row level security;
alter table public.gallery_assets enable row level security;
alter table public.gallery enable row level security;
alter table public.admins enable row level security;
alter table public.homepage_content enable row level security;

-- Public can submit forms.
drop policy if exists "public insert cars" on public.cars;
create policy "public insert cars" on public.cars for insert to anon, authenticated with check (true);

drop policy if exists "public insert ticket orders" on public.ticket_orders;
create policy "public insert ticket orders" on public.ticket_orders for insert to anon, authenticated with check (true);

drop policy if exists "public insert volunteers" on public.volunteers;
create policy "public insert volunteers" on public.volunteers for insert to anon, authenticated with check (true);

drop policy if exists "public insert contact messages" on public.contact_messages;
create policy "public insert contact messages" on public.contact_messages for insert to anon, authenticated with check (true);

-- Public can read gallery assets.
drop policy if exists "public read gallery assets" on public.gallery_assets;
create policy "public read gallery assets" on public.gallery_assets for select to anon, authenticated using (true);

drop policy if exists "public read gallery" on public.gallery;
create policy "public read gallery" on public.gallery for select to anon, authenticated using (true);

-- Admins can read/write all event data.
drop policy if exists "admins read all cars" on public.cars;
create policy "admins read all cars"
on public.cars for select to authenticated
using (exists (select 1 from public.admins a where a.id = auth.uid()));

drop policy if exists "admins update cars" on public.cars;
create policy "admins update cars"
on public.cars for update to authenticated
using (exists (select 1 from public.admins a where a.id = auth.uid()))
with check (exists (select 1 from public.admins a where a.id = auth.uid()));

drop policy if exists "admins read ticket orders" on public.ticket_orders;
create policy "admins read ticket orders"
on public.ticket_orders for select to authenticated
using (exists (select 1 from public.admins a where a.id = auth.uid()));

drop policy if exists "admins read volunteers" on public.volunteers;
create policy "admins read volunteers"
on public.volunteers for select to authenticated
using (exists (select 1 from public.admins a where a.id = auth.uid()));

drop policy if exists "admins read contact messages" on public.contact_messages;
create policy "admins read contact messages"
on public.contact_messages for select to authenticated
using (exists (select 1 from public.admins a where a.id = auth.uid()));

drop policy if exists "admins read admins" on public.admins;
create policy "admins read admins"
on public.admins for select to authenticated
using (id = auth.uid());

drop policy if exists "admins manage gallery assets" on public.gallery_assets;
create policy "admins manage gallery assets"
on public.gallery_assets for all to authenticated
using (exists (select 1 from public.admins a where a.id = auth.uid()))
with check (exists (select 1 from public.admins a where a.id = auth.uid()));

drop policy if exists "admins manage gallery" on public.gallery;
create policy "admins manage gallery"
on public.gallery for all to authenticated
using (exists (select 1 from public.admins a where a.id = auth.uid()))
with check (exists (select 1 from public.admins a where a.id = auth.uid()));

drop policy if exists "public read homepage content" on public.homepage_content;
create policy "public read homepage content"
on public.homepage_content for select to anon, authenticated using (true);

drop policy if exists "admins manage homepage content" on public.homepage_content;
create policy "admins manage homepage content"
on public.homepage_content for all to authenticated
using (exists (select 1 from public.admins a where a.id = auth.uid()))
with check (exists (select 1 from public.admins a where a.id = auth.uid()));

insert into storage.buckets (id, name, public)
values ('car-images', 'car-images', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('qr-codes', 'qr-codes', true)
on conflict (id) do nothing;

drop policy if exists "public upload car images" on storage.objects;
create policy "public upload car images"
on storage.objects for insert to anon, authenticated
with check (bucket_id = 'car-images');

drop policy if exists "public view car images" on storage.objects;
create policy "public view car images"
on storage.objects for select to anon, authenticated
using (bucket_id = 'car-images');

drop policy if exists "admin manage qr codes" on storage.objects;
create policy "admin manage qr codes"
on storage.objects for all to authenticated
using (bucket_id = 'qr-codes' and exists (select 1 from public.admins a where a.id = auth.uid()))
with check (bucket_id = 'qr-codes' and exists (select 1 from public.admins a where a.id = auth.uid()));

drop policy if exists "public view qr codes" on storage.objects;
create policy "public view qr codes"
on storage.objects for select to anon, authenticated
using (bucket_id = 'qr-codes');
