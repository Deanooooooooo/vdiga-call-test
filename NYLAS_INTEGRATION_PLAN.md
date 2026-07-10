# Nylas Integration Plan

## Goal

Replace the active direct Google Calendar flow with a Nylas-first calendar provider layer that supports:

1. One doctor with one calendar.
2. One clinic with one shared calendar.
3. One clinic with multiple doctors and multiple calendars.

The old Google Calendar logic should be deprecated from the active product flow, not deleted blindly before Nylas is tested end-to-end.

## Product Decision

Use Nylas as the primary calendar provider layer.

Recommended plan: Nylas Calendar plan.

Why:

- Supports hosted OAuth.
- Supports calendar sync.
- Supports scheduler/availability/booking APIs.
- Supports webhooks.
- Supports Google, Microsoft/Outlook/Exchange, iCloud/Apple, and other major calendar providers.
- Lets customers connect calendars from inside our dashboard without creating their own Nylas accounts.

Customer-facing wording should be:

- Primary CTA: `Connect Calendar`
- Provider choices: Google Calendar first, then Microsoft/Outlook and Apple/iCloud later.

## Account Model

We use one Nylas account/project/application for our SaaS.

Customers do not create Nylas accounts.

Flow:

1. Customer clicks `Connect Calendar` in our dashboard.
2. Nylas hosted OAuth opens.
3. Customer signs in with their calendar provider.
4. Nylas creates a grant for that connected account.
5. We store the Nylas `grant_id` in Supabase against the tenant, doctor, or resource.
6. Backend calls Nylas APIs using that `grant_id`.

Rules:

- One connected Google/Microsoft/iCloud account equals one Nylas grant.
- One shared clinic calendar can be one grant.
- Ten doctors with ten separate accounts will usually be ten grants.
- Secrets stay in Supabase secrets or local env, not in GitHub.

## Secrets And Environment

Store these outside GitHub:

- `NYLAS_API_KEY`
- `NYLAS_CLIENT_ID` or app/client identifier if required by the selected Nylas auth flow
- `NYLAS_CALLBACK_SECRET` or webhook secret if provided
- `PUBLIC_SITE_URL`

Existing secrets that remain server-only:

- `SUPABASE_SERVICE_ROLE_KEY`
- Retell tokens
- Any provider webhook secrets

Do not paste long-lived secret keys into Telegram when avoidable. Prefer Supabase secrets or local `.env`.

## Database Plan

Add Nylas-aware calendar tables or columns.

Suggested entities:

- `calendar_connections`
  - tenant id
  - provider: `nylas`
  - grant id
  - provider account email
  - provider account name
  - status
  - connected at
  - last sync/status fields

- `calendar_resources`
  - tenant id
  - connection id
  - resource type: business, doctor, room, shared calendar
  - doctor/resource id when applicable
  - provider calendar id
  - provider calendar name
  - timezone
  - active flag

- `booking_settings`
  - tenant id
  - booking mode
  - default duration
  - buffer before/after
  - working hours
  - booking window
  - routing rule: specific provider, first available, round robin, service-based

- `doctors` or `service_resources`
  - tenant id
  - display name
  - specialties/services
  - working hours overrides
  - linked calendar resource id
  - active flag

Booking modes:

- `single_calendar`
- `shared_calendar`
- `multi_provider_calendar`

## Scenario Handling

### Scenario A: One Doctor, One Calendar

Use when:

- Solo doctor.
- Small business with one bookable calendar.

Data:

- One tenant.
- One Nylas grant.
- One selected calendar resource.
- Booking mode: `single_calendar`.

Retell behavior:

- Check availability for that calendar.
- Book the selected slot into that calendar.

### Scenario B: One Clinic, Many Doctors, One Shared Calendar

Use when:

- Clinic has a central calendar.
- Clinic does not need strict doctor-level availability.

Data:

- One tenant.
- One Nylas grant.
- One shared selected calendar.
- Booking mode: `shared_calendar`.

Retell behavior:

- Check availability for the shared calendar.
- Book into the shared calendar.
- Include patient/customer details in event metadata.

Important limitation:

If all doctors are mixed into one shared calendar, Nylas can see the calendar availability, but it does not automatically know which doctor is free unless we model doctors in our database or encode doctor metadata in events.

If the clinic needs doctor-specific booking while using one shared calendar, we need:

- Doctor/resource records in our database.
- Working hours per doctor.
- Service-to-doctor mapping.
- Event metadata/title/location indicating the doctor.

Cleaner alternative:

- Use separate calendars/resources per doctor.

### Scenario C: One Clinic, Multiple Doctors, Multiple Calendars

Use when:

- Clinic has many doctors.
- Each doctor has their own Google/Microsoft/iCloud calendar.

Data:

- One tenant.
- Multiple doctors/resources.
- Each doctor has one connection/calendar resource, or one admin grant with multiple calendars if permissions allow.
- Booking mode: `multi_provider_calendar`.

Retell behavior:

- If caller asks for a specific doctor, check only that doctor.
- If caller has no preference, check across eligible doctors.
- Choose slot by routing rule:
  - first available
  - round robin
  - service-based
  - specific doctor
- Book into the selected doctor's calendar.

This is the cleanest long-term clinic mode.

## Backend Edge Functions

Add new Nylas functions:

- `nylas-auth-start`
  - Starts hosted OAuth.
  - Receives tenant/user context.
  - Redirects user to Nylas auth.

- `nylas-auth-callback`
  - Receives Nylas auth result.
  - Creates or retrieves grant information.
  - Stores connection in Supabase.
  - Redirects back to dashboard.

- `nylas-calendar-tool`
  - Retell tool endpoint.
  - Checks availability.
  - Creates bookings.
  - Handles booking mode selection.
  - Returns concise responses for the voice agent.

- `nylas-webhook`
  - Receives Nylas calendar/booking events.
  - Updates local booking status.
  - Handles cancelled/rescheduled events.

Old Google functions to deprecate from active flow:

- `google-calendar-auth-start`
- `google-calendar-auth-callback`
- old direct Google calendar booking logic

Do not delete old functions until Nylas has passed live tests.

## Dashboard UI Plan

Replace Google-specific setup with Nylas calendar setup.

Dashboard section:

- Heading: `Calendar setup`
- Primary button: `Connect Calendar`
- Show connected account email.
- Show selected calendar.
- Show booking mode.
- Show status: connected, needs reconnect, error.

Onboarding question:

`How do you manage appointments?`

Options:

1. `One calendar for the whole business`
2. `One shared calendar with multiple staff`
3. `Each staff member has their own calendar`

Follow-up UI:

- For single/shared calendar:
  - Connect one account.
  - Select one calendar.

- For multi-doctor:
  - Add doctors/resources.
  - Connect each calendar or select calendars from an admin account.
  - Assign services/specialties.
  - Choose routing rule.

## Retell Integration Plan

Retell should call our backend, not Nylas directly.

Tool responsibilities:

- Parse requested date/time/service/doctor from Retell tool payload.
- Resolve tenant and booking mode.
- Query Nylas availability.
- Create booking when slot is accepted.
- Store booking in Supabase.
- Return a simple success/failure payload to the assistant.

Voice test cases:

- Book a normal available slot.
- Ask for a busy slot.
- Ask for a vague time like `tomorrow afternoon`.
- Ask for a specific doctor.
- Ask for any available doctor.
- Reschedule if supported.
- Cancel if supported.

## Implementation Order

1. Add Nylas secrets.
2. Add Supabase migration for Nylas connections/resources/settings.
3. Add Nylas auth start/callback functions.
4. Add dashboard `Connect Calendar` flow.
5. Verify grant is stored in Supabase.
6. Add availability query.
7. Add booking creation.
8. Add Retell `nylas-calendar-tool`.
9. Test single-calendar mode end-to-end.
10. Add shared-calendar mode.
11. Add multi-doctor/multi-calendar mode.
12. Add Nylas webhooks.
13. Remove old Google flow from active UI.
14. After live validation, clean obsolete Google-only functions if no longer needed.

## First Live Test

Start with one connected calendar to validate the pipeline:

1. Connect calendar in dashboard.
2. Confirm grant/resource in Supabase.
3. Ask backend for availability.
4. Create a test booking.
5. Confirm event appears in the real calendar.
6. Call the Retell assistant.
7. Ask it to book an appointment.
8. Confirm booking is stored and visible in calendar.

After that, immediately test the two clinic modes.
