# Marketplace and search-content review

## Product comparison

Campin should borrow interaction patterns, not copy another marketplace's identity or property media.

| Pattern | Established marketplace pattern | Campin adaptation |
| --- | --- | --- |
| Find a stay | Hipcamp leads with place, dates, guests, and stay types; category discovery narrows options. | Homepage search plus own-tent, hosted tent, glamping, RV/campervan, farm, and road-stop filters. Dates are a request, not a live calendar promise. |
| Compare options | Search results expose location, photos, amenities, and useful filters. | Use published catalogue facts and actual host/property photos only; unknown price remains “Ask operator.” |
| Trust | Host details, policies, and reviews help a guest decide. | Use explicit source-review status, checked date, official source link, host-confirmed contact status, and clear “host confirmation required.” Do not fabricate reviews, safety certification, or availability. |
| Contact | Established booking products support host messaging or booking flows. | Persist a consented enquiry, then let the signed-in camper review and open WhatsApp. The camper taps Send; Campin does not claim delivery or booking. |
| Content | Editorial pages help users plan and create internal discovery paths. | Keep `/blog` and guide URLs crawlable and linked contextually from pages/footer resources; leave the main menu focused on campsite discovery. |

Hipcamp is a useful interaction reference for destination/date/guest search and stay-type discovery ([Hipcamp](https://www.hipcamp.com/en-US)). Campin's request-first WhatsApp model differs from an instant-booking flow and should say so at every conversion step.

## Search and GEO

“GEO” is implemented as strong retrieval-ready publishing, not a special markup promise: crawlable canonical URLs, indexable sitemap entries, clear headings, direct answers, useful source links, plain-language trip facts, accurate image alt text, and structured data that matches visible content. Google says its AI Search experiences use the same technical eligibility and helpful-content foundations, with no special AI schema required; it also recommends crawlability, internal discovery, high-quality media, and consistency between schema and visible page text ([Google Search guidance](https://developers.google.com/search/docs/appearance/ai-features), [Google's generative AI search guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)).

Guides are available without an email gate. Blog article routes remain public and are generated into the sitemap, but are omitted from the top navigation. Do not publish thin location pages, keyword-swapped duplicates, invented property facts, or schema-only FAQ claims. Refresh legal/access information against the relevant official authority and show the source and review date.

## Photography standard

The regional landscape files in `public/images/india` are credited under the included attribution file and are used as editorial destination imagery only. Catalogue cards use an operator property photograph when one is provided; otherwise the component shows a neutral placeholder. The owner workspace requires an explicit photo-rights confirmation and records a source before publishing a property image. Do not relabel regional scenery as a specific campsite.

## Launch priority

1. Establish actual published supply and accurate source/host contact records.
2. Keep the search-to-enquiry path clear and fast on mobile.
3. Monitor enquiry save, host handoff opens, and email delivery separately.
4. Add verified reviews and map discovery only after there are completed stays and maintainable host data.
5. Defer instant booking, payment, availability claims, and booking-style review counts until Campin can operate those promises reliably.
