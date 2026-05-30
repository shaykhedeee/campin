# CampIn Website Information Architecture

Last updated: 2026-05-21

Domain:

campin.co.in

## Website Goal

The first public CampIn website should not behave like a full booking engine. It should convert demand, qualify supply, build trust, and prepare the marketplace.

Primary jobs:

1. Help campers understand where they can camp safely and legally.
2. Capture camper demand with city, camping type, own-gear status, preferred region, safety concerns, and WhatsApp opt-in.
3. Capture host and road-stop supply.
4. Publish answer-first pages that can rank in Google and appear in AI answers.
5. Explain CampIn's verification, community, safety, and responsible camping standards.
6. Prepare users for manual pilots before automated booking.

## Navigation

Primary nav:

- Explore
- Camping Near Bangalore
- Road Stops
- Host Your Land
- Community
- Safety
- The Campfire

Secondary nav:

- About
- Support
- Terms
- Privacy
- Cancellation
- Community Guidelines

Internal-only routes:

- Validation
- Ops
- Strategy

## Page Map

| Page | URL | Primary Intent | CTA | Phase |
|---|---|---|---|---|
| Home | `/` | Explain CampIn and route users | Join waitlist | Now |
| Explore | `/explore` | Preview verified/coming campsites | Join waitlist | Now |
| Listing Detail | `/listing/:id` | Show trust details for one place | Request pilot | Now |
| Camping Near Bangalore | `/camping-near-bangalore` | Capture local demand | Get Bangalore list | Phase 1 |
| Camping Near Coorg | `/camping-near-coorg` | Region SEO/AEO | Join Coorg waitlist | Phase 1 |
| Camping Near Wayanad | `/camping-near-wayanad` | Region SEO/AEO | Join Wayanad waitlist | Phase 1 |
| Camping Near Chikmagalur | `/camping-near-chikmagalur` | Region SEO/AEO | Join waitlist | Phase 1 |
| Own-Tent Camping India | `/own-tent-camping-india` | Answer core problem | Join own-gear group | Phase 1 |
| Safe Camping In India | `/safe-camping-india` | Trust and beginner confidence | Download checklist | Phase 1 |
| Road Stops | `/road-stops` | Explain overnight parking/rest stops | Suggest a road stop | Phase 1 |
| Host Your Land | `/host-your-land` | Convert hosts | Apply as host | Now |
| Community | `/community` | Join WhatsApp/newsletter | Join community | Phase 1 |
| The Campfire | `/campfire` | Newsletter archive and signup | Subscribe | Phase 1 |
| Safety And Trust | `/safety` | Explain verification | Read standard | Phase 1 |
| About | `/about` | Founder story and mission | Join movement | Phase 1 |
| Support | `/support` | Contact, help, report issue | Contact CampIn | Now |
| Terms | `/terms` | Legal terms | Contact support | Required |
| Privacy | `/privacy` | DPDP-aligned privacy notice | Manage consent | Required |
| Cancellation | `/cancellation-refund-policy` | Manual pilot refund rules | Contact support | Required before pilots |
| Community Guidelines | `/community-guidelines` | Conduct and moderation | Join community | Required |
| Responsible Camping Pledge | `/responsible-camping-pledge` | Camper behavior standard | Accept pledge | Required |
| Host Agreement | `/host-agreement` | Host responsibilities | Apply as host | Required before pilots |
| Verification Standard | `/verification-standard` | What CampIn Reviewed means | Suggest site | Required |
| Grievance | `/grievance-redressal` | Consumer support channel | Raise issue | Required before bookings |

## Homepage Flow

1. Hero:
   - Headline: India's outdoors, verified.
   - Supporting copy: Find safe, permissioned places to camp, pitch your own tent, or stop overnight on Indian road trips.
   - CTAs: Join Waitlist, Host Your Land.
   - Trust chips: Permission, washroom, water, parking, emergency contact.

2. Demand problem:
   - "Camping in India should not require guesswork."
   - Show the core pains: safety, local interference, unclear permission, toilets, noisy camps, hidden prices.

3. CampIn answer:
   - Verified campsites, own-tent support, route road-stops, community intelligence.

4. First regions:
   - Bangalore, Coorg, Wayanad, Chikmagalur, Ramanagara, Kanakapura.

5. Trust system:
   - CampIn Reviewed, Founding Host, Road Stop Standard.

6. Camper waitlist:
   - Capture city, camping type, own-gear, preferred region, safety concern, WhatsApp opt-in.

7. Host section:
   - Invite farms, homestays, estates, resorts, cafes/dhabas with parking, and rural landowners.

8. Newsletter:
   - The Campfire by CampIn.

## Core Components

| Component | Purpose | Required Data |
|---|---|---|
| RegionCard | Local SEO entry point | region, distance, terrain, best season, status |
| ListingCard | Preview site quality | name, area, type, amenities, trust status, price state |
| TrustChip | Fast confidence | permission, toilet, water, parking, safety, quiet hours |
| VerificationPanel | Prevent false trust | verified_by, verification_date, evidence, unknowns |
| RoadStopCard | Route stop candidate | route, vehicle access, washroom, water, power, night safety |
| HostPitchBlock | Convert supply | property types, earnings range, responsibilities |
| CommunityJoinBlock | Convert into WhatsApp/email | city, intent, opt-in, pledge |
| FAQBlock | SEO/AEO | direct answer, FAQ, source notes |
| SafetyChecklist | Beginner confidence | weather, permission, emergency, waste, fire rules |
| LegalFooter | Compliance access | terms, privacy, cancellation, grievance |

## Data Model

Listing:

- id
- name
- slug
- location
- state
- region_cluster
- lat_lng_precision
- type
- terrain
- suitable_for
- own_tent_allowed
- vehicle_access
- toilets
- water
- electricity
- parking
- food_available
- fire_allowed
- pet_policy
- quiet_hours
- permission_status
- verification_status
- verification_date
- evidence_links
- host_id
- price_state
- pilot_status
- risk_notes

Host:

- host_id
- name
- phone
- email
- property_type
- location_pin
- permission_status
- amenities
- photos_folder
- expected_price
- response_time
- founder_call_status
- verification_stage
- payout_preference

CamperLead:

- lead_id
- name
- email
- phone_optional
- city
- camping_type
- own_gear
- preferred_region
- safety_concern
- whatsapp_opt_in
- newsletter_consent
- lead_score
- source
- created_at

RoadStop:

- stop_id
- route
- stop_name
- location_pin
- parking_capacity
- vehicle_types
- washroom
- water
- power
- food
- night_safety
- local_contact
- permission_status
- score
- next_action

ContentBrief:

- page_slug
- target_query
- search_intent
- direct_answer
- local_notes
- permission_guidance
- safety_guidance
- FAQs
- schema_type
- internal_links
- source_links
- original_campin_data

## SEO/AEO/GEO Rules

Every local page must include:

- Direct answer in the first screen.
- Clear statement of what is verified, what is host-declared, and what is unknown.
- Local permissions and safety notes.
- Amenity matrix.
- FAQs written as direct answers.
- Schema plan where appropriate: WebPage, FAQPage, LodgingBusiness/Campground when eligible, BreadcrumbList.
- Original CampIn data: waitlist demand, community survey result, host verification count, or route findings.
- Internal links to safety, host, community, newsletter, and nearby region pages.

## Manual Pilot Booking Flow

1. Camper submits waitlist or request.
2. CampIn checks lead score and region.
3. Founder contacts camper manually.
4. Founder confirms site availability with host.
5. Host confirms permission, amenities, access, and price.
6. Camper receives pilot terms, cancellation policy, and responsible camping pledge.
7. Payment happens only through approved, logged process.
8. CampIn logs booking attempt, stay result, issue, review, and learning.

Do not automate instant bookings until the 90-day gate is passed and legal/payment/support flows are ready.

## Launch Readiness Checklist

- Terms, privacy, cancellation/refund, community guidelines, host agreement, responsible camping pledge, verification standard, and grievance pages are public.
- Forms have consent text and unsubscribe expectations.
- WhatsApp opt-in is explicit.
- Search Console, GA4 or privacy-conscious analytics, and Microsoft Clarity are configured only after privacy notice is live.
- Every listing distinguishes verified, host-declared, and unknown claims.
- No page claims camping is legal in a region without specific permission evidence.
- Contact email is visible: hello@campin.co.in.
- Founder has a manual incident response process.
