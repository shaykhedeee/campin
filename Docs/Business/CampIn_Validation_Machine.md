# CampIn Validation Machine

## Goal

Prove CampIn deserves a marketplace before building marketplace infrastructure.

CampIn should validate three things:

1. Campers will share contact details and trust concerns.
2. Hosts will consider listing land for camping.
3. At least one camper and one host will complete a manual paid pilot stay.

## 90-Day Targets

| Metric | Target | Why It Matters |
|---|---:|---|
| Email subscribers | 500 | Proves content/community demand |
| High-intent camper leads | 100 | Proves people want actual help |
| Host applications | 30 | Proves supply can be built |
| Verified candidate sites | 10 | Proves quality supply exists |
| Road-stop candidates | 20 | Proves route network can start |
| Manual booking attempts | 3 | Proves transaction intent |
| Successful paid pilot stay | 1 | Proves marketplace behavior |

## No-Code Stack

Forms:

Tally or Typeform.

Data:

Airtable as the operating CRM.

Email:

Brevo or Mailchimp.

Automation:

Make or Zapier.

Notifications:

Founder email plus WhatsApp manual follow-up.

## Form 1: Camper Waitlist

Purpose:

Capture early demand and segment campers before the website exists.

Form title:

Find safe, permissioned camping in India.

Promise:

Join CampIn for early access to verified camping spots, road-stop guides, and the weekly Campfire newsletter.

Fields:

| Field | Type | Required | Notes |
|---|---|---|---|
| Full name | Short text | Yes | |
| Email | Email | Yes | Double opt-in through email tool |
| Phone/WhatsApp | Phone | Optional | Required only for trip matching |
| City | Short text | Yes | |
| Camping type | Multiple choice | Yes | Own tent, hosted tent, car camping, campervan, family, trekking add-on |
| Own gear? | Single choice | Yes | Yes, no, building kit |
| Preferred region | Multiple choice | Yes | Bangalore, Coorg, Wayanad, Chikmagalur, Kanakapura, Other |
| Biggest concern | Multiple choice | Yes | Safety, permission, washroom, price, crowd, gear, family approval |
| Would pay for permissioned safe spot? | Single choice | Yes | Yes, maybe, no |
| WhatsApp opt-in | Checkbox | No | Must be explicit |

Tags:

- `camper_waitlist`
- `city_[city]`
- `own_gear_yes/no`
- `concern_[concern]`
- `south_validation`

Confirmation copy:

You are in. CampIn is mapping safe, permissioned camping spots around Bangalore and South India first. You will get the next Campfire email with early routes, safety notes, and founder updates.

## Form 2: Host Interest

Purpose:

Find private-land hosts and filter for safety before any listing page is built.

Form title:

Turn your land into a verified outdoor stay.

Promise:

Founding hosts get listing setup help, CampIn founder support, and no commission during the first validation phase.

Fields:

| Field | Type | Required | Notes |
|---|---|---|---|
| Host/property name | Short text | Yes | |
| Contact person | Short text | Yes | |
| Phone/WhatsApp | Phone | Yes | |
| Email | Email | Optional | |
| Property type | Multiple choice | Yes | Farm, coffee estate, homestay, orchard, terrace, forest-edge, lake/river side, dhaba/road stop |
| Exact Google Maps pin | URL | Yes | Non-negotiable trust input |
| Region | Short text | Yes | |
| Washroom access | Single choice | Yes | Guest/private/shared/none |
| Water access | Single choice | Yes | Drinking/basic/none |
| Electricity/charging | Single choice | Yes | Yes/limited/no |
| Parking | Single choice | Yes | Car, SUV, bike, campervan, none |
| Night safety | Long text | Yes | Lighting, caretaker, local context |
| Photos | File upload/link | Yes | Actual site photos only |
| Permission status | Single choice | Yes | Private land, leased, community land, unsure |
| Expected price/night | Number | Optional | |
| Host rules | Long text | Optional | |

Tags:

- `host_application`
- `fit_score_pending`
- `founding_host_candidate`

Confirmation copy:

Thank you. CampIn reviews every host application manually. We will check the location, amenities, photos, and safety basics before discussing a founding host listing.

## Form 3: Road Stop Lead

Purpose:

Build India's first useful road-stop intelligence layer for campers, SUVs, bikers, and campervans.

Form title:

Suggest a safe road stop for Indian campers.

Fields:

| Field | Type | Required | Notes |
|---|---|---|---|
| Stop name | Short text | Yes | |
| Route | Multiple choice | Yes | Bangalore-Coorg-Wayanad, Bangalore-Chikmagalur, Mumbai-Goa, Delhi-Manali-Leh, Other |
| Location/pin | URL | Yes | |
| Stop type | Multiple choice | Yes | Dhaba, farm, homestay, petrol pump, cafe, campground, estate |
| Overnight parking possible? | Single choice | Yes | Yes, maybe, no, unknown |
| Washroom | Single choice | Yes | Clean/basic/unknown/none |
| Water | Single choice | Yes | Drinking/basic/unknown/none |
| Power/charging | Single choice | Yes | Yes/unknown/no |
| Food nearby | Single choice | Yes | On-site/nearby/unknown/none |
| Night safety notes | Long text | Yes | |
| Vehicle suitability | Multiple choice | Yes | Bike, hatchback, SUV, campervan |
| Public contact | Text | Optional | Business contact only |

Tags:

- `road_stop_lead`
- `route_[route]`
- `verification_pending`

## Form 4: Safety Survey

Purpose:

Find the real trust objections that stop people from camping.

Fields:

| Field | Type | Required |
|---|---|---|
| Would you camp if the site was verified? | Single choice | Yes |
| What makes a campsite feel safe? | Multiple choice | Yes |
| What would stop you from booking? | Long text | Yes |
| What amenities are non-negotiable? | Multiple choice | Yes |
| Would you prefer host present or privacy? | Single choice | Yes |
| Would you join a WhatsApp group for route/camping help? | Single choice | Yes |

## Airtable Automations

### Camper Submission

Trigger:

New camper waitlist form submission.

Actions:

1. Create record in Camper Waitlist.
2. Apply tags based on city, own gear, concern, and preferred region.
3. Add to Brevo/Mailchimp list `CampIn Waitlist`.
4. Send welcome email 1.
5. Notify founder if `own gear = yes` and `willing to pay = yes`.

### Host Submission

Trigger:

New host form submission.

Actions:

1. Create record in Host Leads.
2. Set outreach stage to `New Application`.
3. Notify founder immediately.
4. Send host acknowledgement email.
5. Add verification checklist tasks.

### Road Stop Submission

Trigger:

New road-stop form submission.

Actions:

1. Create road-stop record.
2. Score basic amenities.
3. Assign route.
4. Add to weekly verification queue.

## CRM Stages

Camper stages:

- New Waitlist
- High Intent
- Survey Sent
- WhatsApp Invited
- Pilot Candidate
- Pilot Completed
- Archived

Host stages:

- New Lead
- Contacted
- Replied
- Call Scheduled
- Call Completed
- Verification Pending
- Candidate Approved
- Founding Host
- Rejected

Road-stop stages:

- New Lead
- Contact Needed
- Permission Unknown
- Amenities Confirmed
- Video/Photo Verified
- Road Stop Basic
- Road Stop Standard
- Road Stop Premium
- Rejected

## Manual Pilot Booking SOP

Use this only after one host and one camper are both high intent.

1. Confirm host has exact location, washroom, water, phone availability, and permission.
2. Confirm camper trip date, group size, gear, vehicle, safety concerns, and emergency contact.
3. Send both parties a written WhatsApp summary.
4. Ask host to confirm price and rules.
5. Ask camper to confirm willingness to pay.
6. Payment goes directly to host during validation, unless CampIn is ready for Razorpay/UPI collection.
7. CampIn records the transaction as a manual pilot, not a platform booking.
8. After stay, collect host feedback, camper feedback, photos if permitted, and trust objections.

## Weekly Scoreboard

| Metric | Week 1 | Week 2 | Week 3 | Week 4 | Target Trend |
|---|---:|---:|---:|---:|---|
| New email subscribers | | | | | Up |
| Camper waitlist leads | | | | | Up |
| High-intent camper leads | | | | | Up |
| Host leads added | | | | | 15+/week |
| Host replies | | | | | 20%+ |
| Host calls completed | | | | | 3+/week |
| Road-stop leads added | | | | | 5+/week |
| Newsletter open rate | | | | | 35%+ |
| Newsletter click/reply rate | | | | | 5%+ |
| Manual booking conversations | | | | | 1+/month |

## Decision Rules

Proceed toward website build when:

- Waitlist conversion proves clear city/persona demand.
- Host supply is not the bottleneck.
- At least one manual pilot stay is completed or seriously scheduled.

Do not proceed when:

- Leads are mostly low intent.
- Hosts are not reachable.
- Safety objections remain vague.
- No one is willing to pay for permissioned camping.

