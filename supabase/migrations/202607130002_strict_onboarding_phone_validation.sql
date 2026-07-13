alter table public.onboarding_requests
  drop constraint if exists onboarding_requests_phone_digits_check;

alter table public.onboarding_requests
  add constraint onboarding_requests_phone_digits_check
    check (
      regexp_replace(coalesce(phone, ''), '\D', '', 'g') ~ '^(0[0-9]{9}|359[0-9]{9})$'
    ) not valid;
