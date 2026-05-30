# CampIn Host + Road-Stop Lead Review

Reviewed on: 2026-05-26  
Inputs used: `data/forms/host_interest_form.json`, `data/forms/road_stop_lead_form.json`, `data/research/outputs/normalized_candidate_leads.json`, `data/research/outputs/research_insights.csv`, `Docs/Business/CampIn_Camper_Friendly_Site_Leads_2026-05-25.md`, and current public business pages checked on 2026-05-26.

## Snapshot

- Candidate set reviewed: 24 leads total.
- Mix: 7 host leads and 17 road-stop leads.
- Strongest host-direct opportunities remain Karnataka-heavy, with one Rajasthan desert BYOT lead.
- Strongest road-stop opportunities split between official Kerala caravan parks, Maharashtra route operators, and Meghalaya/Assam/Arunachal overlander inventory.
- Data quality issue: 22 leads are marked `public_business_contact_found` while `confidence.directBusinessContact` is still `unknown`. Treat those leads as source-verified, not contact-verified.

## Missing-Field Scoring

### Host lead missing-field pressure

| Gap | Leads affected | Priority |
|---|---:|---|
| Host or permission authority unclear | 7/7 | Critical |
| Current tariff missing or stale | 6/7 | High |
| Public business contact not captured in structured data | 6/7 | High |
| Overnight parking permission unclear | 1/7 | Medium |
| Washroom proof weak | 1/7 | Medium |

### Road-stop missing-field pressure

| Gap | Leads affected | Priority |
|---|---:|---|
| Public business contact not captured in structured data | 16/17 | Critical |
| Current tariff missing or stale | 14/17 | High |
| Host/operator authority unclear | 14/17 | High |
| BYOT / tent / non-network guest rule unclear | 13/17 | High |
| Washroom proof weak | 7/17 | Medium |

### Recurring risk patterns

- Permission risk is the biggest unresolved host-side blocker. Most leads look operationally usable, but the dataset rarely proves who controls the overnight stay area.
- Water and washroom are the dominant trust claims across both funnels. Those should not be published as verified unless backed by current photos or a direct call confirmation.
- Aggregator-sourced road stops are promising for discovery, but they are weak on direct contactability, current tariffs, and whether CampIn users can book outside the aggregator package.
- Route-level/operator leads such as MTDC and CaravaanLife are valuable for supply mapping, but they should not be treated like single-property listing-ready leads.

## Public-Source Enrichment Added This Run

These are public business details suitable for manual founder follow-up. They should still be verified before listing.

| Lead | Public contact/channel found | Public tariff or operational note | Source checked |
|---|---|---|---|
| ChukkiMane Eco Resort | `+91 7676180470`, `chukkimane@gmail.com`, Javanagahalli, Malavalli Taluk, Mandya | BYOT page confirms potable water, restrooms, showers, and 24/7 security; no public BYOT tariff found | [chukkimane.com/byot-camping](https://www.chukkimane.com/byot-camping/) |
| Chayagruha Homestay | `+91 9481920827`, `+91 8217671006`, `chayagruhahomestay@gmail.com`, map pin `8M9X+H2P, Basagodu, Mylimane` | Public tenting price shown at `Rs 700` per person/night; free parking, pets allowed, 24/7 front desk | [chayagruhahomestay.in](https://chayagruhahomestay.in/) |
| Backyard Camp | `9019339172`, `98861 69698`, Nayakanahalli / Bajibab Farm, Karnataka | DIY camping listed at `Rs 1,120`; DIY with food at `Rs 2,462.5`; bathrooms and toilets explicitly mentioned on tariff page | [thebackyardcamp.in/tariff](https://thebackyardcamp.in/tariff) and [contact page](https://thebackyardcamp.in/contact-us) |
| Wilderness Jungle Camp | `9901298860`, `9483178860`, `wildernessjunglecamp@gmail.com`, Hebbani Village, Malavalli Taluk, Mandya | Bring-your-own-tent tariff listed at `Rs 2,400` double occupancy EP | [wildernessjunglecamp.com/tariff.php](https://www.wildernessjunglecamp.com/tariff.php) |
| Dreamtime Bungalows | `+91-6367071565`, `hello@dreamtimebungalows.com`, KH. No. 87/363 95, Kuldhara, Jiyai, Rajasthan 345001 | BYOT area and common washrooms explicitly described; no public BYOT tariff found | [dreamtimebungalows.com](https://dreamtimebungalows.com/) |

## Founder Call Priority Queue

### Host leads

| Priority | Lead | Fit score | Why it is worth founder time now | Main unresolved items |
|---:|---|---:|---|---|
| 1 | Chayagruha Homestay | 9/10 | Clear BYOT offer, published price, public contacts, washroom/water/electricity/security claims already visible | Campervan overnight acceptance, max vehicle size, exact parking zone, permission owner confirmation |
| 2 | ChukkiMane Eco Resort | 8/10 | Host-direct site, public phone/email, Karnataka Tourism recognition, strong safety framing | Campervan parking policy, power load/plug details, public tariff, permission owner confirmation |
| 3 | Dreamtime Bungalows | 8/10 | Strong Rajasthan BYOT story, direct email/phone, defined camping area, common washrooms on premises | Vehicle access, charging/water refill, exact desert-edge compliance, parking tariff |
| 4 | Wilderness Jungle Camp | 7/10 | BYOT tariff already public, direct contacts captured, Mandya corridor fit | Parking layout, drinking water proof, toilet/shower proof, permission holder confirmation |
| 5 | Backyard Camp | 7/10 | Public DIY tariff and business phone found, near-Bangalore demand fit | Overnight vehicle acceptance, exact camping boundary, electricity access, washroom photo proof |
| 6 | Sea Shore Beach Stay | 6/10 | Coastal Karnataka route value and existing BYOT/car-camping signal | Direct host contact, tide-safe parking area, beach-rule compliance, tariff freshness |
| 7 | Campers Creek - Kabbal Forest | 5/10 | Bangalore road-trip adjacency and car-camping fit | Direct host contact, overnight parking permission, wildlife/protected-land risk, tariff freshness |

### Road-stop leads

| Priority | Lead | Fit score | Why it is worth founder time now | Main unresolved items |
|---:|---|---:|---|---|
| 1 | KAVA Eco Camp and Caravan Park | 9/10 | Official Kerala caravan inventory with caravan/campervan bays and core infrastructure already described | Current operator contact, current tariff, washroom proof, non-package guest flow |
| 2 | Caravan Meadows | 9/10 | Official caravan-park profile and likely benchmark listing for Kerala route supply | Current operator contact, tariff, washroom proof, BYOT rule |
| 3 | Black Bridge Resort | 8/10 | Strong Meghalaya overlander fit with caravan/tent options and core amenities | Direct host contact, tariff, operator authority, approach-road confirmation |
| 4 | Sohra View Lodge | 8/10 | Cherrapunji corridor value and multi-format stay signal | Direct host contact, tariff, operator authority, direct booking outside aggregator |
| 5 | White Water Village | 8/10 | Dedicated overlander parking signal is rare and high-value | Direct host contact, tariff, size limits, direct booking path |
| 6 | Sapoi Tea Estate | 8/10 | Agritourism angle plus overlander amenities makes this a differentiated Assam lead | Direct host contact, tariff, private campervan/BYOT acceptance |
| 7 | MTDC resort parking network | 7/10 | High leverage if it converts into named route inventory | Participating resorts, exact tariffs, authority to publish, non-MTDC package access |
| 8 | CaravaanLife - Of Valleys and Lakes | 7/10 | Strong Mumbai-Pune-Lonavala corridor fit | Current operator identity, direct contact, tariff, washroom proof outside network claims |

## Permission And Amenity Gaps To Validate Before Listing

### Permission gaps

- Confirm whether the overnight parking or tent area is inside the operator's controlled boundary.
- Identify the actual permission holder: owner, leaseholder, manager, plantation operator, resort operator, or network partner.
- For desert, forest-edge, river-edge, and beach-edge properties, confirm there is no local restriction on overnight vehicle stays, fires, amplified sound, or waste discharge.
- For aggregator-discovered leads, confirm CampIn guests can book directly or through an approved referral path instead of relying on informal off-platform acceptance.

### Amenity gaps

- Water: verify drinking-water access separately from general utility water.
- Washroom: require current photo or live confirmation of guest-accessible toilets and shower/bathing arrangements.
- Electricity: separate simple charging points from vehicle-supportive electrical supply.
- Parking: verify slope, turning radius, overnight lighting, and whether campervans/SUVs can stay without blocking local use.
- Safety: confirm fencing, guard presence, staff-on-site after dark, and any flood/tide/wildlife/monsoon constraints.

## Founder Call Questions

Use these in addition to the existing generic outreach list.

### For host-direct properties

1. Who has the authority to approve overnight tents, campervans, and cars on this exact patch of land?
2. Which part of the property would CampIn guests use, and can you share a maps pin plus 3-5 current photos?
3. Do you allow campervans or only ground-tent BYOT?
4. What is the longest and widest vehicle that can safely enter, turn, and park overnight?
5. Is electricity only for guest-device charging, or can it support vehicle-side use? If yes, what plug type and load?
6. Can guests access toilets and water all night, or only during staffed hours?
7. Are there any quiet-hour, campfire, alcohol, pet, or family-only rules we must publish clearly?
8. Who greets guests after dark, and what happens if they arrive late?

### For operator / route / aggregator leads

1. Can you share the named properties on this route that are currently open for overnight camper or BYOT stays?
2. Which of those properties already have water, washrooms, power, and safe parking confirmed this season?
3. Can CampIn receive direct booking permission or a documented referral workflow for those properties?
4. Which partner properties should be excluded during monsoon, peak crowd dates, or local permit restrictions?

## Verification Checklist

Mark a lead as listing-ready only after all of the following are complete.

- Public business identity captured: legal/business name, public phone/email or public booking channel, public URL.
- Exact location captured: maps pin, approach-road note, nearest town, and last-mile vehicle note.
- Permission captured: owner/operator authority confirmed for overnight stays on the specific area CampIn will publish.
- Amenity proof captured: current photos or direct confirmation for washroom, water, electricity, parking, and night lighting.
- Vehicle fit captured: supported vehicle classes, max size, turning/entry constraint, monsoon or seasonal limits.
- Policy captured: check-in/out window, tariff, cancellation/payment method, pet rule, food availability, quiet hours, fire/alcohol rules.
- Safety captured: staff presence after dark, emergency contact, mobile network notes, nearest clinic/fuel/food support.
- Publishability captured: approval to publish photos, GPS, amenities, rules, and contact workflow on CampIn.

## Recommended Next Moves

1. Call the five host-direct leads enriched above first; they now have enough public context to validate quickly.
2. Treat KAVA and Caravan Meadows as official flagship road-stop validations and try to identify current operator contacts before expanding further in Kerala.
3. Convert route/operator leads into named-property sub-leads before any listing work.
4. Clean the `contactVerificationStatus` field in structured data so "public source found" is not confused with "direct contact captured."
