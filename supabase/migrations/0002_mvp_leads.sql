create table if not exists mvp_leads (
  id text primary key,
  lead_type text not null,
  source_page text not null,
  name text,
  email text,
  phone text,
  city text,
  status text not null default 'new',
  score integer not null default 0,
  consent boolean not null default false,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists mvp_leads_type_created_idx on mvp_leads(lead_type, created_at desc);
create index if not exists mvp_leads_email_idx on mvp_leads(email);
create index if not exists mvp_leads_status_idx on mvp_leads(status);

alter table mvp_leads enable row level security;

drop policy if exists "Public form insert only" on mvp_leads;
create policy "Public form insert only"
on mvp_leads
for insert
to anon
with check (
  lead_type in ('camper_waitlist', 'guide_unlock', 'host_interest', 'listing_inquiry', 'newsletter', 'road_stop')
  and source_page <> ''
  and consent = true
);

drop policy if exists "Authenticated ops can read leads" on mvp_leads;
create policy "Authenticated ops can read leads"
on mvp_leads
for select
to authenticated
using (true);
