# CampIn Compliance And Data Ethics

## Principle

CampIn can learn from the public web, but it should not behave like a spam engine. The research system exists to understand demand and find public business leads, not to harvest private people.

## What CampIn Stores

Allowed:

- Public source URL.
- Source name.
- Search query.
- Short paraphrased insight.
- Location and persona tags.
- Public business contact details.
- Official policy/source links.
- Competitor positioning notes.
- CampIn form submissions where the user explicitly consented.

Avoid:

- Raw Reddit comment dumps.
- User profile history.
- Private personal contact data.
- Sensitive personal details.
- Screenshots of private or semi-private communities.
- Anything from login-only spaces unless the community explicitly permits use.

## Reddit Rules

Use Reddit for:

- Public demand analysis.
- Topic discovery.
- Pain-point summaries.
- Links back to source threads.

Do not use Reddit for:

- Mass DMs.
- Personal lead harvesting.
- User profiling.
- Reposting full comments.
- Training private models.

Implementation:

- Prefer Reddit official API/Data API access where available and allowed.
- Keep rate limits low.
- Store thread URLs and short summaries.
- Quote only tiny excerpts when necessary and always cite the source.
- Do not contact individual Reddit users unless they separately opt into CampIn through a CampIn form or public business channel.

## Google/Search Rules

Use search for:

- Discovering public pages.
- Competitor/source discovery.
- Host business discovery.
- Content gap analysis.

Do not:

- Scrape Google HTML directly at scale.
- Cache or redistribute search results in a way that violates API/provider terms.
- Mix search results into a public data product without checking the provider agreement.

Implementation:

- Use approved search APIs or approved SERP providers.
- Store enough metadata for internal validation, not a public mirror of search results.
- Keep source attribution in every insight.

## Forum Rules

Use forums for:

- Public discussions about road trips, camping, overlanding, policy, and gear.
- Manual logging of specific public posts.
- Source URLs and short summaries.

Before automated collection:

- Check `robots.txt`.
- Check the site's terms if available.
- Respect crawl delays and rate limits.
- Avoid login-only pages.

## Outreach Rules

Allowed outreach:

- Farms, homestays, campsites, dhabas, cafes, petrol pumps, travel businesses, and public tourism operators with public contact information.
- Personal founder-led messages.
- Clear opt-out.
- No misleading claim that CampIn is already a booking authority.

Not allowed:

- Bulk scraped personal outreach.
- Buying random email lists.
- Misrepresenting compliance or government approval.
- Claiming a road stop is officially verified before the verification checklist is complete.

## Consent Rules

Every CampIn form must include:

- Purpose of collection.
- Email/newsletter opt-in.
- Optional WhatsApp opt-in.
- Unsubscribe path for email.
- Clear note that CampIn is in validation phase.

Suggested form footer:

CampIn uses your details to send early access updates, safety guides, and trip validation follow-ups. WhatsApp updates are optional. You can unsubscribe from emails anytime.

## Trust Language Rules

Use:

- CampIn Reviewed: basic manual review completed.
- CampIn Verified: stronger verification completed through checklist.
- Road Stop Candidate: promising but not verified.
- Road Stop Standard: amenities and local permission checked.

Do not use:

- Government approved, unless actually approved.
- 100% safe.
- Guaranteed legal.
- Official camping site, unless the site is formally permitted/licensed.

## Data Retention

Raw research:

Review monthly. Archive stale or low-confidence insights after 90 days.

Camper leads:

Keep while subscribed or actively opted in.

Host leads:

Keep public business leads and submitted applications. Delete private details on request.

Road-stop leads:

Keep operational notes, but do not publish private contacts without permission.

## Minimum Privacy Page Requirements

Before public launch, CampIn needs:

- What data is collected.
- Why it is collected.
- Email/WhatsApp opt-in and unsubscribe.
- How data is stored.
- How users request deletion.
- Cookie/analytics notice.
- No sale of personal data.
- Contact email.

