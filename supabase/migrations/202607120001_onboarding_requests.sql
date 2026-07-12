create table if not exists public.onboarding_requests (
  id uuid primary key default gen_random_uuid(),
  contact_name text not null,
  business_name text not null,
  phone text not null,
  email text not null,
  primary_need text not null,
  current_call_problem text,
  callback_consent boolean not null default false,
  selected_plan text,
  billing_period text,
  status text not null default 'new',
  source_path text,
  user_agent text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint onboarding_requests_callback_consent_check check (callback_consent = true),
  constraint onboarding_requests_primary_need_check check (
    primary_need in ('appointments', 'reservations', 'orders', 'enquiries', 'other')
  ),
  constraint onboarding_requests_billing_period_check check (
    billing_period in ('monthly', 'annual', 'yearly')
  )
);

create index if not exists onboarding_requests_status_created_at_idx
  on public.onboarding_requests (status, created_at desc);

create trigger onboarding_requests_set_updated_at
  before update on public.onboarding_requests
  for each row execute function public.set_updated_at();

alter table public.onboarding_requests enable row level security;

grant insert on public.onboarding_requests to anon;

drop policy if exists "Public visitors can submit onboarding requests"
  on public.onboarding_requests;

create policy "Public visitors can submit onboarding requests"
  on public.onboarding_requests
  for insert
  to anon
  with check (true);
