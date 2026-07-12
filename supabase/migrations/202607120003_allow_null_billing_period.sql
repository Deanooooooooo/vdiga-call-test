alter table public.onboarding_requests
  alter column billing_period drop default,
  alter column billing_period drop not null;
