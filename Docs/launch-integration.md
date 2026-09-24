# Campin launch handoff

The code and database migrations support discovery, OTP accounts, camper enquiries, owner review, and queued email. Production email and customer-to-host messaging still depend on the provider values and verified listing contacts below. Do not treat a submitted enquiry as a reservation.

The connected Supabase project currently has 15 published source-reviewed campsite records, four operators, and the email/enquiry RPCs and photo bucket. Migration `campsite_suggestion_moderation` is applied; `/suggest-campsite` submissions now appear in the owner moderation queue and are backfilled from earlier leads. The 15 current records have no property-specific images or approved WhatsApp contacts yet; the interface keeps those gaps explicit.

## 1. Netlify environment

In **Netlify → campinco → Site configuration → Environment variables**, set these for Production and Deploy Previews. Keep service credentials private; never add them to Vite variables or commit them.

| Variable | Value / source | Exposure |
| --- | --- | --- |
| `SUPABASE_URL` | `https://qhtsapsomxexbnpdmcmc.supabase.co` | Server/build only |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase project API settings → service-role secret | Server only; never `VITE_` |
| `VITE_SUPABASE_URL` | Same project URL | Public browser config |
| `VITE_SUPABASE_ANON_KEY` | Supabase publishable key | Public browser config; RLS must remain enabled |
| `RESEND_API_KEY` | Resend API keys | Server only |
| `RESEND_FROM` | Verified sender, e.g. `Campin <support@campin.co.in>` | Server only |
| `LEAD_ALERT_TO` | Inbox monitored by the Campin owner | Server only |
| `RESEND_WEBHOOK_SECRET` | Signing secret from the Resend webhook | Server only |

Redeploy after changing variables. Build secrets scanning must remain enabled. Only the public project URL keys are omitted from Netlify's source scan; the service-role key and email secrets remain scanned and server-only.

## 2. Supabase Auth and email

In **Supabase → Authentication → URL Configuration**, set Site URL to `https://campin.co.in` and add `https://campin.co.in/auth/callback` and `https://campin.co.in/admin.html` (the owner magic-link return path). Add the exact Netlify Deploy Preview URL pattern you use before testing preview sign-in. In **Authentication → Email**, enable one-time codes and use `{{ .Token }}` in the email template.

For real camper email delivery, configure Supabase Custom SMTP with the verified Resend domain (`smtp.resend.com`, port 465 or 587, username `resend`, password the Resend API key). Test a non-team address and a passwordless code sign-in. Supabase Auth SMTP is separate from Campin's server email outbox. Campin uses email codes, so Google OAuth credentials are not needed for this release.

One Supabase security advisor remains outside the migration role's permissions: PostGIS owns `public.spatial_ref_sys` as `supabase_admin`, while Campin migrations run as `postgres`. Advisors report that the reference table and three `ST_EstimatedExtent` overloads are exposed to public/authenticated roles. Campin code does not call these; we did not move or alter extension-owned objects because the project migration role is not their owner. Ask Supabase support or an extension administrator to revoke direct catalog access and the unused extent RPC grants safely; do not drop/reinstall PostGIS as a workaround. Recheck the Supabase Security Advisor afterward.

## 3. Resend delivery tracking

Verify the sending domain in Resend and publish its requested SPF/DKIM DNS records (and DMARC policy). Create a webhook to `https://campin.co.in/api/email-webhook` for `email.sent`, `email.delivered`, `email.delivery_delayed`, `email.bounced`, `email.complained`, `email.failed`, and `email.suppressed`. Put the webhook's `whsec_…` secret in Netlify as `RESEND_WEBHOOK_SECRET`, then redeploy. The scheduled outbox function runs every five minutes; inspect **Owner workspace → Email delivery** for retries and permanent failures.

## 4. Owner access and real inventory

Sign in to the deployed admin page with the verified owner account `support@campin.co.in`, then open **Owner workspace** at `https://campin.co.in/admin.html#/workspace`. If the account email differs, update the server-side allowlist in `netlify/functions/owner.ts` before deploying. No user-editable role grants owner access.

For each real campsite, fill the listing's facts and publish only after checking the operator source. Add the host's approved WhatsApp number in international E.164 format (`+91…`). Upload property photographs only when they depict that property and the owner has the right to publish them; record the permission/source in the adjacent field. If a rights-cleared property image is unavailable, leave it blank: the site will show a neutral placeholder, not an unrelated landscape. State/destination discovery derives from published rows.

Review Host leads, Suggestions, Enquiries, and Email delivery in the workspace. A suggestion is private moderation input and is not made public by marking it reviewed. Remove a host contact immediately if it becomes invalid; the website then returns to its support/official-source fallback. The community invite is unset, so no Join WhatsApp community action is displayed; add a genuine invite URL only when one exists.

The main menu keeps blog articles out of sight; `/blog` and its article URLs remain indexable and linked only from relevant guide/resource contexts. Sitemap generation includes the existing listing slugs when build credentials are unavailable, and uses the live published catalogue when server credentials are present.

## 5. Release and live checks

Push the reviewed branch and merge it to the Netlify production branch after its preview deploy is green. Confirm the deploy commit matches the merged Git commit. Then test:

1. `/auth`: request and enter a real email code; sign out and sign in again.
2. `/explore`: search a published listing, use a category filter, refresh with filters in the URL, and open its details.
3. Availability: signed-out redirect preserves the listing and trip dates; signed-in enquiry produces a reference and acknowledgement email; the page says host confirmation is pending.
4. WhatsApp: with an approved listing contact, inspect and open the prewritten message; tap Send yourself. Without a contact, verify the honest support/official-source fallback.
5. `/waitlist` and `/suggest-campsite`: submit once, verify the confirmation/reference and complete internal email; force a failed email and confirm it stays visible for retry.
6. `/account`: save contact details and check only that account's favourites and enquiry history.
7. `/admin.html#/workspace`: confirm unauthenticated/ordinary accounts are refused; verify owner edits/photos, lead visibility, suggestion review, and outbox retries.

Search Console and Google Analytics IDs are intentionally not invented. Add the real Search Console verification token, submit `/sitemap.xml`, and enable analytics only after using Campin's privacy-approved property IDs. Image credits for the editorial landscape assets are listed in `public/images/india/ATTRIBUTION.md`.
