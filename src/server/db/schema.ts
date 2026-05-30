import {
  boolean,
  index,
  integer,
  jsonb,
  numeric,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

export const userRole = pgEnum("user_role", ["camper", "host", "ops", "admin"]);
export const verificationStage = pgEnum("verification_stage", [
  "community_suggested",
  "lead",
  "reviewed",
  "date_confirmed",
  "calendar_synced",
]);
export const sourceType = pgEnum("source_type", ["official", "host_direct", "aggregator", "community_forum", "manual_research"]);
export const contactPolicy = pgEnum("contact_policy", ["gated_relay", "direct_business_contact", "campin_review_required"]);
export const confidenceLevel = pgEnum("confidence_level", ["unknown", "low", "medium", "high"]);
export const listingType = pgEnum("listing_type", ["caravan_park", "overland", "byot", "road_stop", "farm", "desert", "beach", "forest"]);
export const availabilityMode = pgEnum("availability_mode", ["unknown", "call_to_confirm", "request_to_book", "campin_confirmed", "calendar_synced"]);
export const inquiryStatus = pgEnum("inquiry_status", ["new", "ops_review", "sent_to_host", "host_accepted", "host_declined", "camper_confirmed", "cancelled"]);
export const bookingStatus = pgEnum("booking_status", ["draft", "payment_pending", "confirmed", "completed", "cancelled", "refunded"]);
export const claimType = pgEnum("claim_type", [
  "byot_allowed",
  "overnight_parking",
  "washroom",
  "water",
  "electricity",
  "direct_business_contact",
  "campervan_suitability",
  "permission",
  "pricing",
  "availability",
]);
export const evidenceType = pgEnum("evidence_type", ["source_url", "host_submission", "ops_call", "field_visit", "official_document", "camper_report"]);

const timestamps = {
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
};

export const profiles = pgTable("profiles", {
  id: uuid("id").primaryKey(),
  role: userRole("role").default("camper").notNull(),
  fullName: text("full_name"),
  phone: text("phone"),
  email: text("email"),
  city: text("city"),
  consentMarketing: boolean("consent_marketing").default(false).notNull(),
  ...timestamps,
});

export const hosts = pgTable("hosts", {
  id: uuid("id").defaultRandom().primaryKey(),
  ownerProfileId: uuid("owner_profile_id").references(() => profiles.id),
  name: text("name").notNull(),
  legalName: text("legal_name"),
  segment: text("segment").notNull(),
  region: text("region").notNull(),
  state: text("state").notNull(),
  publicUrl: text("public_url"),
  contactPolicy: contactPolicy("contact_policy").default("gated_relay").notNull(),
  responseTargetHours: integer("response_target_hours").default(24).notNull(),
  onboardingStage: verificationStage("onboarding_stage").default("lead").notNull(),
  notes: text("notes"),
  ...timestamps,
}, (table) => ({
  regionIdx: index("hosts_region_idx").on(table.region, table.state),
}));

export const properties = pgTable("properties", {
  id: uuid("id").defaultRandom().primaryKey(),
  hostId: uuid("host_id").references(() => hosts.id).notNull(),
  name: text("name").notNull(),
  slug: text("slug").notNull(),
  addressText: text("address_text"),
  region: text("region").notNull(),
  state: text("state").notNull(),
  country: text("country").default("India").notNull(),
  latitude: numeric("latitude", { precision: 10, scale: 7 }),
  longitude: numeric("longitude", { precision: 10, scale: 7 }),
  accessNotes: text("access_notes"),
  houseRules: jsonb("house_rules").$type<string[]>().default([]).notNull(),
  safetyNotes: jsonb("safety_notes").$type<string[]>().default([]).notNull(),
  ...timestamps,
}, (table) => ({
  slugIdx: uniqueIndex("properties_slug_idx").on(table.slug),
  geoIdx: index("properties_geo_idx").on(table.latitude, table.longitude),
}));

export const listings = pgTable("listings", {
  id: uuid("id").defaultRandom().primaryKey(),
  propertyId: uuid("property_id").references(() => properties.id).notNull(),
  slug: text("slug").notNull(),
  title: text("title").notNull(),
  listingType: listingType("listing_type").notNull(),
  verificationStage: verificationStage("verification_stage").default("lead").notNull(),
  availabilityMode: availabilityMode("availability_mode").default("request_to_book").notNull(),
  contactPolicy: contactPolicy("contact_policy").default("gated_relay").notNull(),
  publicSummary: text("public_summary").notNull(),
  priceFromInr: integer("price_from_inr"),
  maxGuests: integer("max_guests"),
  essentials: jsonb("essentials").$type<string[]>().default([]).notNull(),
  unknowns: jsonb("unknowns").$type<string[]>().default([]).notNull(),
  lastCheckedAt: timestamp("last_checked_at", { withTimezone: true }),
  publishedAt: timestamp("published_at", { withTimezone: true }),
  ...timestamps,
}, (table) => ({
  slugIdx: uniqueIndex("listings_slug_idx").on(table.slug),
  stageIdx: index("listings_stage_idx").on(table.verificationStage),
}));

export const listingInventory = pgTable("listing_inventory", {
  id: uuid("id").defaultRandom().primaryKey(),
  listingId: uuid("listing_id").references(() => listings.id).notNull(),
  unitType: text("unit_type").notNull(),
  label: text("label").notNull(),
  quantity: integer("quantity").notNull(),
  maxGuestsPerUnit: integer("max_guests_per_unit").notNull(),
  pricePerNightInr: integer("price_per_night_inr"),
  ...timestamps,
});

export const researchSources = pgTable("research_sources", {
  id: uuid("id").defaultRandom().primaryKey(),
  sourceType: sourceType("source_type").notNull(),
  url: text("url").notNull(),
  title: text("title"),
  publisher: text("publisher"),
  retrievedAt: timestamp("retrieved_at", { withTimezone: true }).defaultNow().notNull(),
  robotsAllowed: boolean("robots_allowed").default(true).notNull(),
  notes: text("notes"),
  ...timestamps,
}, (table) => ({
  urlIdx: uniqueIndex("research_sources_url_idx").on(table.url),
}));

export const researchLeads = pgTable("research_leads", {
  id: uuid("id").defaultRandom().primaryKey(),
  sourceId: uuid("source_id").references(() => researchSources.id),
  title: text("title").notNull(),
  region: text("region").notNull(),
  state: text("state").notNull(),
  leadType: text("lead_type").notNull(),
  score: integer("score").default(0).notNull(),
  status: verificationStage("status").default("lead").notNull(),
  extractedClaims: jsonb("extracted_claims").$type<Record<string, unknown>>().default({}).notNull(),
  missingProof: jsonb("missing_proof").$type<string[]>().default([]).notNull(),
  duplicateClusterKey: text("duplicate_cluster_key"),
  nextAction: text("next_action"),
  ...timestamps,
}, (table) => ({
  scoreIdx: index("research_leads_score_idx").on(table.score),
  clusterIdx: index("research_leads_cluster_idx").on(table.duplicateClusterKey),
}));

export const trustClaims = pgTable("trust_claims", {
  id: uuid("id").defaultRandom().primaryKey(),
  listingId: uuid("listing_id").references(() => listings.id),
  researchLeadId: uuid("research_lead_id").references(() => researchLeads.id),
  claimType: claimType("claim_type").notNull(),
  claimValue: text("claim_value").notNull(),
  confidence: confidenceLevel("confidence").default("unknown").notNull(),
  verificationStage: verificationStage("verification_stage").default("lead").notNull(),
  lastCheckedAt: timestamp("last_checked_at", { withTimezone: true }),
  sourceUrl: text("source_url"),
  notes: text("notes"),
  ...timestamps,
}, (table) => ({
  claimIdx: index("trust_claims_claim_idx").on(table.claimType, table.verificationStage),
}));

export const evidenceArtifacts = pgTable("evidence_artifacts", {
  id: uuid("id").defaultRandom().primaryKey(),
  claimId: uuid("claim_id").references(() => trustClaims.id).notNull(),
  evidenceType: evidenceType("evidence_type").notNull(),
  sourceUrl: text("source_url"),
  storagePath: text("storage_path"),
  summary: text("summary").notNull(),
  capturedBy: uuid("captured_by").references(() => profiles.id),
  capturedAt: timestamp("captured_at", { withTimezone: true }).defaultNow().notNull(),
  ...timestamps,
});

export const inquiries = pgTable("inquiries", {
  id: uuid("id").defaultRandom().primaryKey(),
  listingId: uuid("listing_id").references(() => listings.id).notNull(),
  camperProfileId: uuid("camper_profile_id").references(() => profiles.id),
  status: inquiryStatus("status").default("new").notNull(),
  startDate: timestamp("start_date", { withTimezone: true }).notNull(),
  endDate: timestamp("end_date", { withTimezone: true }).notNull(),
  guests: integer("guests").notNull(),
  vehicleType: text("vehicle_type"),
  ownTent: boolean("own_tent").default(false).notNull(),
  requestedEssentials: jsonb("requested_essentials").$type<string[]>().default([]).notNull(),
  message: text("message"),
  trackingId: text("tracking_id").notNull(),
  ...timestamps,
}, (table) => ({
  trackingIdx: uniqueIndex("inquiries_tracking_idx").on(table.trackingId),
  statusIdx: index("inquiries_status_idx").on(table.status),
}));

export const bookings = pgTable("bookings", {
  id: uuid("id").defaultRandom().primaryKey(),
  inquiryId: uuid("inquiry_id").references(() => inquiries.id).notNull(),
  status: bookingStatus("status").default("draft").notNull(),
  amountInr: integer("amount_inr").notNull(),
  platformFeeInr: integer("platform_fee_inr").default(0).notNull(),
  paymentProvider: text("payment_provider").default("razorpay").notNull(),
  paymentReference: text("payment_reference"),
  paymentLinkUrl: text("payment_link_url"),
  confirmedAt: timestamp("confirmed_at", { withTimezone: true }),
  cancelledAt: timestamp("cancelled_at", { withTimezone: true }),
  ...timestamps,
});

export const availabilityBlocks = pgTable("availability_blocks", {
  id: uuid("id").defaultRandom().primaryKey(),
  listingId: uuid("listing_id").references(() => listings.id).notNull(),
  startDate: timestamp("start_date", { withTimezone: true }).notNull(),
  endDate: timestamp("end_date", { withTimezone: true }).notNull(),
  mode: availabilityMode("mode").default("request_to_book").notNull(),
  source: text("source").default("manual").notNull(),
  notes: text("notes"),
  ...timestamps,
}, (table) => ({
  listingDateIdx: index("availability_listing_date_idx").on(table.listingId, table.startDate, table.endDate),
}));

export const guidePages = pgTable("guide_pages", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: text("slug").notNull(),
  title: text("title").notNull(),
  region: text("region").notNull(),
  targetQuery: text("target_query").notNull(),
  status: verificationStage("status").default("community_suggested").notNull(),
  summary: text("summary").notNull(),
  linkedListingIds: jsonb("linked_listing_ids").$type<string[]>().default([]).notNull(),
  safetyNotes: jsonb("safety_notes").$type<string[]>().default([]).notNull(),
  publishedAt: timestamp("published_at", { withTimezone: true }),
  ...timestamps,
}, (table) => ({
  slugIdx: uniqueIndex("guide_pages_slug_idx").on(table.slug),
}));

export const guideAccessLeads = pgTable("guide_access_leads", {
  id: uuid("id").defaultRandom().primaryKey(),
  profileId: uuid("profile_id").references(() => profiles.id),
  guideSlug: text("guide_slug").notNull(),
  guideTitle: text("guide_title").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  city: text("city").notNull(),
  interest: text("interest").notNull(),
  consent: boolean("consent").default(false).notNull(),
  source: text("source").default("guide_unlock").notNull(),
  ...timestamps,
}, (table) => ({
  guideIdx: index("guide_access_leads_guide_idx").on(table.guideSlug),
  emailIdx: index("guide_access_leads_email_idx").on(table.email),
}));

export const complianceEvents = pgTable("compliance_events", {
  id: uuid("id").defaultRandom().primaryKey(),
  actorProfileId: uuid("actor_profile_id").references(() => profiles.id),
  eventType: text("event_type").notNull(),
  entityType: text("entity_type").notNull(),
  entityId: uuid("entity_id"),
  decision: text("decision").notNull(),
  rationale: text("rationale").notNull(),
  ...timestamps,
}, (table) => ({
  entityIdx: index("compliance_events_entity_idx").on(table.entityType, table.entityId),
}));

export const mvpLeads = pgTable("mvp_leads", {
  id: text("id").primaryKey(),
  leadType: text("lead_type").notNull(),
  sourcePage: text("source_page").notNull(),
  name: text("name"),
  email: text("email"),
  phone: text("phone"),
  city: text("city"),
  status: text("status").default("new").notNull(),
  score: integer("score").default(0).notNull(),
  consent: boolean("consent").default(false).notNull(),
  payload: jsonb("payload").$type<Record<string, unknown>>().default({}).notNull(),
  ...timestamps,
}, (table) => ({
  typeCreatedIdx: index("mvp_leads_type_created_idx").on(table.leadType, table.createdAt),
  emailIdx: index("mvp_leads_email_idx").on(table.email),
  statusIdx: index("mvp_leads_status_idx").on(table.status),
}));
