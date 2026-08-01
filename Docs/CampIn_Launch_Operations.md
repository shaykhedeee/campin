# CampIn Launch Operations

## Netlify

- Connect `shaykhedeee/campin` to the Netlify project `campinco`.
- Branch: `main`; build command: `npm run build`; publish directory: `dist`.
- In Netlify Forms, confirm the six detected forms beginning with `campin-`.
- Add a form submission notification for each form to `support@campin.co.in`.
- Add `campin.co.in` and `www.campin.co.in` under Domain management. Make the apex domain primary and enable HTTPS.

## Google discovery

- In Google Search Console, add the Domain property `campin.co.in` and verify it with the DNS TXT record at GoDaddy.
- Submit `https://campin.co.in/sitemap.xml` after verification.
- Create a Google Tag Manager web container and set Netlify environment variable `VITE_GTM_CONTAINER_ID` to its container ID, then redeploy.
- If Search Console requests HTML meta verification instead, add the supplied token to the `google-site-verification` meta tag in `index.html` and redeploy.

## Forms and admin review

The public forms keep a local fallback and optionally sync structured records to Supabase. They also submit to Netlify Forms so Netlify can notify `support@campin.co.in`. The review dashboard is the separate `/admin.html` entry point; it is not linked from the public navigation. Use Supabase-backed records for shared team review, and local storage only as a browser fallback.

## Scope

CampIn is currently a discovery and request-first camping community, not an instant-booking marketplace. Listing cards show evidence and open questions; do not publish a campsite as available until the host, permission, access, amenity, and date details are confirmed.
