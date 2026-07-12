grant usage on schema public to anon, authenticated;
grant insert on public.onboarding_requests to anon, authenticated;

drop policy if exists "Public visitors can submit onboarding requests"
  on public.onboarding_requests;

create policy "Public visitors can submit onboarding requests"
  on public.onboarding_requests
  for insert
  to anon, authenticated
  with check (true);
