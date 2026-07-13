create or replace function public.normalize_onboarding_request()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  normalized_phone_digits text;
begin
  new.contact_name := nullif(btrim(new.contact_name), '');
  new.business_name := nullif(btrim(new.business_name), '');
  new.phone := nullif(btrim(new.phone), '');
  new.email := lower(nullif(btrim(new.email), ''));
  new.primary_need := nullif(btrim(new.primary_need), '');
  new.primary_need_label := nullif(btrim(new.primary_need_label), '');
  new.current_call_problem := nullif(btrim(new.current_call_problem), '');
  new.selected_plan := nullif(btrim(new.selected_plan), '');
  new.billing_period := nullif(btrim(new.billing_period), '');
  new.source_path := nullif(btrim(new.source_path), '');
  new.user_agent := nullif(btrim(new.user_agent), '');
  new.status := 'new';
  new.metadata := coalesce(new.metadata, '{}'::jsonb);

  if new.primary_need_label is null then
    new.primary_need_label := case new.primary_need
      when 'appointments' then 'Записване на часове'
      when 'reservations' then 'Приемане на резервации'
      when 'orders' then 'Приемане на поръчки'
      when 'enquiries' then 'Запитвания и огледи'
      when 'other' then 'Друго'
      else null
    end;
  end if;

  normalized_phone_digits := regexp_replace(coalesce(new.phone, ''), '\D', '', 'g');

  if exists (
    select 1
    from public.onboarding_requests existing
    where existing.created_at > now() - interval '10 minutes'
      and (
        lower(existing.email) = new.email
        or regexp_replace(coalesce(existing.phone, ''), '\D', '', 'g') = normalized_phone_digits
      )
  ) then
    raise exception 'Duplicate onboarding request throttled';
  end if;

  return new;
end;
$$;

drop trigger if exists onboarding_requests_normalize_insert
  on public.onboarding_requests;

create trigger onboarding_requests_normalize_insert
  before insert on public.onboarding_requests
  for each row execute function public.normalize_onboarding_request();

alter table public.onboarding_requests
  drop constraint if exists onboarding_requests_contact_name_length_check,
  drop constraint if exists onboarding_requests_business_name_length_check,
  drop constraint if exists onboarding_requests_phone_length_check,
  drop constraint if exists onboarding_requests_email_format_check,
  drop constraint if exists onboarding_requests_primary_need_label_length_check,
  drop constraint if exists onboarding_requests_current_call_problem_length_check,
  drop constraint if exists onboarding_requests_selected_plan_length_check,
  drop constraint if exists onboarding_requests_status_check,
  drop constraint if exists onboarding_requests_source_path_length_check,
  drop constraint if exists onboarding_requests_user_agent_length_check,
  drop constraint if exists onboarding_requests_metadata_shape_check;

alter table public.onboarding_requests
  add constraint onboarding_requests_contact_name_length_check
    check (length(btrim(contact_name)) between 1 and 120) not valid,
  add constraint onboarding_requests_business_name_length_check
    check (length(btrim(business_name)) between 1 and 160) not valid,
  add constraint onboarding_requests_phone_length_check
    check (length(btrim(phone)) between 8 and 32) not valid,
  add constraint onboarding_requests_email_format_check
    check (length(btrim(email)) between 3 and 254 and position('@' in email) > 1) not valid,
  add constraint onboarding_requests_primary_need_label_length_check
    check (primary_need_label is null or length(btrim(primary_need_label)) <= 80) not valid,
  add constraint onboarding_requests_current_call_problem_length_check
    check (current_call_problem is null or length(btrim(current_call_problem)) <= 1000) not valid,
  add constraint onboarding_requests_selected_plan_length_check
    check (selected_plan is null or length(btrim(selected_plan)) <= 80) not valid,
  add constraint onboarding_requests_status_check
    check (status in ('new', 'contacted', 'qualified', 'won', 'lost', 'spam', 'archived')) not valid,
  add constraint onboarding_requests_source_path_length_check
    check (source_path is null or length(btrim(source_path)) <= 300) not valid,
  add constraint onboarding_requests_user_agent_length_check
    check (user_agent is null or length(btrim(user_agent)) <= 500) not valid,
  add constraint onboarding_requests_metadata_shape_check
    check (jsonb_typeof(metadata) = 'object' and length(metadata::text) <= 4096) not valid;

revoke all on all tables in schema public from anon, authenticated;
grant usage on schema public to anon, authenticated;

grant insert on public.onboarding_requests to anon, authenticated;

grant select on public.tenants to authenticated;
grant update on public.tenants to authenticated;
grant select on public.tenant_members to authenticated;
grant select on public.business_profiles to authenticated;
grant update on public.business_profiles to authenticated;
grant select on public.subscriptions to authenticated;
grant select on public.phone_numbers to authenticated;
grant select on public.retell_agents to authenticated;
grant select on public.calls to authenticated;
grant select on public.call_events to authenticated;
grant select on public.leads to authenticated;
grant update on public.leads to authenticated;
grant select, insert, update, delete on public.calendar_connections to authenticated;
grant select on public.booking_event_types to authenticated;
grant select on public.bookings to authenticated;
grant select on public.provisioning_jobs to authenticated;
grant select on public.audit_logs to authenticated;
grant select, insert, update, delete on public.calendar_resources to authenticated;
grant select, insert, update, delete on public.calendar_integration_requests to authenticated;

revoke all on function public.create_tenant_onboarding(text, text, text, text, text, boolean) from public, anon;
revoke all on function public.select_subscription_plan(text) from public, anon;
revoke all on function public.is_tenant_member(uuid) from public, anon;
revoke all on function public.is_tenant_admin(uuid) from public, anon;
revoke all on function public.set_updated_at() from public, anon, authenticated;
revoke all on function public.normalize_onboarding_request() from public, anon, authenticated;

do $$
begin
  if to_regprocedure('public.notify_onboarding_request_insert()') is not null then
    revoke all on function public.notify_onboarding_request_insert() from public, anon, authenticated;
  end if;
end;
$$;

grant execute on function public.create_tenant_onboarding(text, text, text, text, text, boolean) to authenticated;
grant execute on function public.select_subscription_plan(text) to authenticated;
grant execute on function public.is_tenant_member(uuid) to authenticated;
grant execute on function public.is_tenant_admin(uuid) to authenticated;

drop policy if exists "Public visitors can submit onboarding requests"
  on public.onboarding_requests;

create policy "Public visitors can submit onboarding requests"
  on public.onboarding_requests
  for insert
  to anon, authenticated
  with check (
    callback_consent = true
    and status = 'new'
    and primary_need in ('appointments', 'reservations', 'orders', 'enquiries', 'other')
    and (billing_period is null or billing_period in ('monthly', 'annual', 'yearly'))
    and jsonb_typeof(metadata) = 'object'
  );
