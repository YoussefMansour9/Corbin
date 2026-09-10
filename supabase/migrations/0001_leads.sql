-- Corbin Staffing: lead capture
-- Run this in the Supabase SQL editor (Dashboard > SQL Editor > New query).

create table if not exists public.leads (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),

  -- which form produced this lead
  form_type   text not null check (form_type in ('consult', 'hire', 'vertical')),

  -- shared identity fields
  name        text not null,
  email       text,
  phone       text,
  company     text,

  -- short consultation form
  position_needed text,

  -- long "ready to hire" intake
  business_website     text,
  job_title            text,
  job_description      text,
  essential_programs   text,
  job_hours            text,
  additional_info      text,
  referral             text,
  workplace_preference text,
  how_did_you_hear     text,

  -- campaign landing pages (e.g. /roofing)
  source text,

  -- attribution, captured on the visitor's first page of the session
  utm_source   text,
  utm_medium   text,
  utm_campaign text,
  utm_term     text,
  utm_content  text,
  referrer     text,
  landing_path text,
  page_path    text,

  -- operations
  status      text not null default 'new'
              check (status in ('new', 'contacted', 'qualified', 'won', 'lost')),
  notes       text,
  email_sent  boolean not null default false,
  email_error text,

  -- hashed, never the raw address: enough to rate limit without storing PII
  ip_hash     text,
  user_agent  text,

  -- Not every form collects both, but a lead we cannot contact is useless.
  constraint leads_contactable check (email is not null or phone is not null)
);

comment on table public.leads is
  'Form submissions. Written only by the server via the service role key.';

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_status_idx     on public.leads (status);
create index if not exists leads_email_idx      on public.leads (email);
-- Supports the per-IP rate limit lookup in the API route.
create index if not exists leads_ip_hash_idx    on public.leads (ip_hash, created_at desc);

-- Row Level Security with no policies denies every anon and authenticated
-- request. The service role key used server-side bypasses RLS, so the only
-- way to read or write this table is through our own API route or the
-- Supabase dashboard. Nothing in the browser can reach it.
alter table public.leads enable row level security;
