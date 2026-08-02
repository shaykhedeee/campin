# CampIn Owner Operations

CampIn is currently a discovery, community and request-first platform. The public site does not require camper accounts. The owner workspace is separate at `/admin.html`.

## What the workspace controls

- Review camper, host, road-stop, newsletter and guide requests.
- Edit listings and content drafts.
- Require source evidence, a current review date, no unresolved unknowns, gated contact and a source-authorized property image before public listing approval.
- Export lead data for follow-up.
- Prepare social drafts without publishing automatically.

## Production setup still required

1. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to the Netlify production environment.
2. Run `supabase/migrations/0001_campin_core.sql` and `0002_mvp_leads.sql` against the production Supabase project.
3. Create the owner account for `support@campin.co.in` in Supabase Auth and restrict the admin route/API to the owner role with RLS.
4. Configure Netlify Form notifications for every `campin-*` form to `support@campin.co.in`.
5. Create a private Supabase Storage bucket for approved property media. Store source URL, permission note, uploader, capture date and review date with every image.
6. Move listing and lead reads/writes from browser storage to authenticated server/API calls before relying on the dashboard across devices.

Until these settings are completed, browser storage is only a local fallback and must not be treated as the system of record.

## Brand and community priorities

CampIn should win trust before it scales inventory: publish fewer accurate places, answer real route questions, collect structured community requests, and turn verified host stories into useful guides. The next measurable milestones are 25 source-backed listings, 100 useful community responses, 10 active host conversations, and a weekly Campfire newsletter with one practical route answer.
