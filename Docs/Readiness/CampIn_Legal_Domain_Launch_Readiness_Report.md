# CampIn Legal + Domain Launch Readiness (Operational Review)

Date: 2026-05-25  
Scope: legal docs coverage, website IA surfaces, consent capture needs, campin.co.in launch hygiene, analytics/privacy readiness, grievance flow, and paid-pilot blockers.  
Note: This is an operational readiness review, not legal advice.

## Executive Summary

**Overall readiness:** Medium (pre-launch / validation).  
**Risk if launching public marketing site (no payments):** Low–Medium.  
**Risk if accepting paid pilots (collecting money):** Medium–High until payment + disclosures + support flows are hardened.

What is in good shape:
- Draft legal docs exist and are internally consistent for validation + manual pilots.
- Consent separation intent is documented (WhatsApp vs newsletter) and now reflected in the on-site forms.
- Clear grievance response targets and a simple severity model exist (draft).

What needed attention (and was addressed in-app in this run):
- Legal docs existed only in `Docs/Legal/*` but were not reachable from the website routes/footer.
- Validation forms collected personal data without explicit Privacy/Terms/Pledge acknowledgements.
- Support page had action buttons that looked “live” despite payments not being connected.

## Current Site IA vs Planned IA

Planned IA exists in `data/website/site_map_and_content_model.json` (version `2026-05-21`), including:
- Secondary navigation: Terms, Privacy, Cancellation, Community Guidelines
- Trust page: Safety & Trust

Observed gaps (site routes):
- `/terms`, `/privacy`, `/cancellation`, `/grievance`, `/responsible-camping-pledge` were missing previously; added in this run.
- Planned pages like `/safety`, `/road-stops`, `/camping-near-bangalore`, `/own-tent-camping-india` are not implemented yet (SEO/AEO launch work still pending).
- No explicit “About / Company details” surface.

## Form Consent Readiness

### What’s now present in the app
The following acknowledgements are now captured directly in the React forms (and stored with the lead record):
- Camper waitlist: optional newsletter consent + required Privacy + Terms + Responsible Camping Pledge + optional WhatsApp updates.
- Host interest: required Privacy + Terms.
- Road-stop lead: required Privacy + Terms.
- Newsletter signup: required newsletter consent + required Privacy + Terms.

### Remaining consent items to decide
- Whether “newsletter consent” should be collected only via the newsletter form (recommended), or also via the camper form (currently both exist via an optional checkbox).
- Whether WhatsApp opt-in should include more explicit language about WhatsApp processing + leaving the group.

## Privacy + Analytics Readiness

Observed implementation status:
- No GA4/PostHog/Clarity scripts are included in `index.html`.
- No cookie banner / consent manager is present.

Operational guidance:
- If launching with **no trackers**, cookie banner is optional but keep Privacy Notice live and accurate.
- If adding session replay/heatmaps (e.g., Clarity/PostHog), implement:
  - A clear “Analytics” section in the Privacy Notice (tool names, purpose, retention).
  - A basic cookie/consent preference UI before enabling non-essential analytics.

## Grievance / Support Flow Readiness

Draft policy exists: `Docs/Legal/Grievance_Redressal_And_Support.md`.

What’s still missing operationally:
- A public “Raise an issue” intake form (email-only is workable early, but add a form for structured intake when pilots begin).
- An internal incident log template (“Trust Matrix” is referenced but no concrete tracker surfaced on the site).
- On-site guidance for “Safety incident” escalation (what to do immediately, whom to call).

## Paid-Pilot Blockers (Must-Fix Before Taking Money)

1. **Payment link / gateway not connected**
   - Support page now shows payments as “Coming soon”, but paid pilots still need a real collection + refund path.
2. **Pre-payment disclosures**
   - Ensure Terms + Cancellation/Refund policy + pledge acceptance are shown/confirmed *before* collecting payment (not only on general site pages).
3. **Booking confirmation evidence**
   - Terms require explicit written confirmation for a pilot; define a standard confirmation message template (email/WhatsApp) that includes date/site/price/cancellation window and a reference ID.
4. **Refund execution mechanics**
   - Decide whether refunds are handled via gateway refund APIs vs manual UPI; document the exact steps and timelines.
5. **Required “business identity” details**
   - Before processing payments at scale, ensure public pages reflect required entity/merchant disclosures (legal name, address, contact, and any required identifiers for payment/consumer compliance).

## Domain (campin.co.in) Launch Hygiene Checklist

Not verifiable from this repo (needs ops confirmation), but required for launch readiness:
- TLS/SSL on the deployed host, HSTS where appropriate.
- DNS: apex + `www` decision, redirects to canonical host.
- Email: `hello@campin.co.in` deliverability (SPF, DKIM, DMARC).
- `robots.txt` + `sitemap.xml` (especially once SEO pages exist).
- 404/redirect handling for planned IA routes.

## Risk Rating

- **Public validation site (no payments):** **Low–Medium risk**
  - Main risk is user confusion: legal pages missing (now fixed in-app) and “coming soon” controls that appear active.
- **Paid pilots:** **Medium–High risk**
  - Main risk is operational: payment/refund + grievance + incident handling need tighter execution, and pre-payment disclosures must be explicit.

## Next Actions (Prioritized)

### P0 (before public launch)
- Deploy the new legal routes and ensure footer links work on the production host.
- Confirm the domain + email deliverability checklist (SPF/DKIM/DMARC).
- Add a simple “About / Contact” page with business identity + support instructions.

### P1 (before paid pilots)
- Implement a paid-pilot confirmation workflow (template + reference IDs + logging).
- Add a structured grievance intake form (public) and an internal tracking board.
- Add explicit pre-payment acceptance step for Terms + Cancellation + Pledge.

### P2 (analytics/SEO scale-up)
- Decide analytics stack (GA4 vs PostHog vs Clarity) and implement consent gating.
- Add `robots.txt` + `sitemap.xml` and start building planned SEO/AEO pages from the IA model.

