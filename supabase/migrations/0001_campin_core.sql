create extension if not exists "pgcrypto";
create extension if not exists "postgis";

create type user_role as enum ('camper', 'host', 'ops', 'admin');
create type verification_stage as enum ('community_suggested', 'lead', 'reviewed', 'date_confirmed', 'calendar_synced');
create type source_type as enum ('official', 'host_direct', 'aggregator', 'community_forum', 'manual_research');
create type contact_policy as enum ('gated_relay', 'direct_business_contact', 'campin_review_required');
create type confidence_level as enum ('unknown', 'low', 'medium', 'high');
create type listing_type as enum ('caravan_park', 'overland', 'byot', 'road_stop', 'farm', 'desert', 'beach', 'forest');
create type availability_mode as enum ('unknown', 'call_to_confirm', 'request_to_book', 'campin_confirmed', 'calendar_synced');
create type inquiry_status as enum ('new', 'ops_review', 'sent_to_host', 'host_accepted', 'host_declined', 'camper_confirmed', 'cancelled');
create type booking_status as enum ('draft', 'payment_pending', 'confirmed', 'completed', 'cancelled', 'refunded');
create type claim_type as enum ('byot_allowed', 'overnight_parking', 'washroom', 'water', 'electricity', 'direct_business_contact', 'campervan_suitability', 'permission', 'pricing', 'availability');
create type evidence_type as enum ('source_url', 'host_submission', 'ops_call', 'field_visit', 'official_document', 'camper_report');

create table profiles (
  id uuid primary key,
  role user_role not null default 'camper',
  full_name text,
  phone text,
  email text,
  city text,
  consent_marketing boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table hosts (
  id uuid primary key default gen_random_uuid(),
  owner_profile_id uuid references profiles(id),
  name text not null,
  legal_name text,
  segment text not null,
  region text not null,
  state text not null,
  public_url text,
  contact_policy contact_policy not null default 'gated_relay',
  response_target_hours integer not null default 24,
  onboarding_stage verification_stage not null default 'lead',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index hosts_region_idx on hosts(region, state);

create table properties (
  id uuid primary key default gen_random_uuid(),
  host_id uuid not null references hosts(id),
  name text not null,
  slug text not null unique,
  address_text text,
  region text not null,
  state text not null,
  country text not null default 'India',
  latitude numeric(10, 7),
  longitude numeric(10, 7),
  access_notes text,
  house_rules jsonb not null default '[]'::jsonb,
  safety_notes jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index properties_geo_idx on properties(latitude, longitude);

create table listings (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references properties(id),
  slug text not null unique,
  title text not null,
  listing_type listing_type not null,
  verification_stage verification_stage not null default 'lead',
  availability_mode availability_mode not null default 'request_to_book',
  contact_policy contact_policy not null default 'gated_relay',
  public_summary text not null,
  price_from_inr integer,
  max_guests integer,
  essentials jsonb not null default '[]'::jsonb,
  unknowns jsonb not null default '[]'::jsonb,
  last_checked_at timestamptz,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index listings_stage_idx on listings(verification_stage);

create table listing_inventory (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid not null references listings(id),
  unit_type text not null,
  label text not null,
  quantity integer not null,
  max_guests_per_unit integer not null,
  price_per_night_inr integer,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table research_sources (
  id uuid primary key default gen_random_uuid(),
  source_type source_type not null,
  url text not null unique,
  title text,
  publisher text,
  retrieved_at timestamptz not null default now(),
  robots_allowed boolean not null default true,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table research_leads (
  id uuid primary key default gen_random_uuid(),
  source_id uuid references research_sources(id),
  title text not null,
  region text not null,
  state text not null,
  lead_type text not null,
  score integer not null default 0,
  status verification_stage not null default 'lead',
  extracted_claims jsonb not null default '{}'::jsonb,
  missing_proof jsonb not null default '[]'::jsonb,
  duplicate_cluster_key text,
  next_action text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index research_leads_score_idx on research_leads(score);
create index research_leads_cluster_idx on research_leads(duplicate_cluster_key);

create table trust_claims (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid references listings(id),
  research_lead_id uuid references research_leads(id),
  claim_type claim_type not null,
  claim_value text not null,
  confidence confidence_level not null default 'unknown',
  verification_stage verification_stage not null default 'lead',
  last_checked_at timestamptz,
  source_url text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint trust_claims_entity_check check (listing_id is not null or research_lead_id is not null)
);
create index trust_claims_claim_idx on trust_claims(claim_type, verification_stage);

create table evidence_artifacts (
  id uuid primary key default gen_random_uuid(),
  claim_id uuid not null references trust_claims(id),
  evidence_type evidence_type not null,
  source_url text,
  storage_path text,
  summary text not null,
  captured_by uuid references profiles(id),
  captured_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table inquiries (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid not null references listings(id),
  camper_profile_id uuid references profiles(id),
  status inquiry_status not null default 'new',
  start_date timestamptz not null,
  end_date timestamptz not null,
  guests integer not null,
  vehicle_type text,
  own_tent boolean not null default false,
  requested_essentials jsonb not null default '[]'::jsonb,
  message text,
  tracking_id text not null unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index inquiries_status_idx on inquiries(status);

create table bookings (
  id uuid primary key default gen_random_uuid(),
  inquiry_id uuid not null references inquiries(id),
  status booking_status not null default 'draft',
  amount_inr integer not null,
  platform_fee_inr integer not null default 0,
  payment_provider text not null default 'razorpay',
  payment_reference text,
  payment_link_url text,
  confirmed_at timestamptz,
  cancelled_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table availability_blocks (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid not null references listings(id),
  start_date timestamptz not null,
  end_date timestamptz not null,
  mode availability_mode not null default 'request_to_book',
  source text not null default 'manual',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index availability_listing_date_idx on availability_blocks(listing_id, start_date, end_date);

create table guide_pages (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  region text not null,
  target_query text not null,
  status verification_stage not null default 'community_suggested',
  summary text not null,
  linked_listing_ids jsonb not null default '[]'::jsonb,
  safety_notes jsonb not null default '[]'::jsonb,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table guide_access_leads (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references profiles(id),
  guide_slug text not null,
  guide_title text not null,
  name text not null,
  email text not null,
  phone text not null,
  city text not null,
  interest text not null,
  consent boolean not null default false,
  source text not null default 'guide_unlock',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index guide_access_leads_guide_idx on guide_access_leads(guide_slug);
create index guide_access_leads_email_idx on guide_access_leads(email);

create table compliance_events (
  id uuid primary key default gen_random_uuid(),
  actor_profile_id uuid references profiles(id),
  event_type text not null,
  entity_type text not null,
  entity_id uuid,
  decision text not null,
  rationale text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index compliance_events_entity_idx on compliance_events(entity_type, entity_id);

alter table profiles enable row level security;
alter table hosts enable row level security;
alter table properties enable row level security;
alter table listings enable row level security;
alter table listing_inventory enable row level security;
alter table research_sources enable row level security;
alter table research_leads enable row level security;
alter table trust_claims enable row level security;
alter table evidence_artifacts enable row level security;
alter table inquiries enable row level security;
alter table bookings enable row level security;
alter table availability_blocks enable row level security;
alter table guide_pages enable row level security;
alter table guide_access_leads enable row level security;
alter table compliance_events enable row level security;
