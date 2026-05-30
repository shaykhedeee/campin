## 2026-05-27 premium reference polish

- Refined the public homepage against the supplied premium reference: larger mountain brand mark, two-line serif hero lockup, topographic dark hero field, wavy image collage, animated trust route chips, premium CTAs, guide vault cards, verification strip, and founding-community panel.
- Kept the page public-safe: no private campsite contacts, no "verified available" claims, no public phone exposure, and no booking/road-stop promises beyond permission-first research and community access.
- Verified public route availability for `/`, `/camping-guides`, `/community`, `/host-your-land`, `/strategy`, and `/coming-soon`.
- Checks passed: `npx.cmd tsc --noEmit`, `npm.cmd run build`, `npm.cmd run ops:check`.
- QA artifacts: `artifacts/screenshots/home-premium-polish-final-desktop.png` and `artifacts/screenshots/home-premium-polish-final-mobile.png`.

## 2026-05-27 detailed SVG refinement

- Increased detail in code-native homepage SVGs: added layered topographic contours, route waypoint dots, secondary route traces, richer mountain/camp/tree linework, and a more detailed tent constellation illustration.
- Preserved the existing SVG component API so homepage integration remains stable.
- Checks passed: `npx.cmd tsc --noEmit`, `npm.cmd run build`, `npm.cmd run ops:check`.
- QA artifacts: `artifacts/screenshots/home-detailed-svg-desktop.png` and `artifacts/screenshots/home-detailed-svg-mobile.png`.

## 2026-05-27 generated verification scenery

- Generated a new premium ink-style outdoor campsite scenery image and copied it to `public/images/campin-verification-scenery.png`.
- Replaced the verification section's right-side inline scenery sketch with the generated image, tuned opacity/contrast, and kept the section public-safe with no private or unverified campsite information.
- Checks passed: `npx.cmd tsc --noEmit`, `npm.cmd run build`, `npm.cmd run ops:check`.
- QA artifacts: `artifacts/screenshots/home-generated-scenery-final-desktop.png` and `artifacts/screenshots/home-generated-scenery-final-mobile.png`.

## 2026-05-28 founding-community sketch card

- Generated a new premium gold line-art tent and pine-tree scene and copied it to `public/images/campin-community-tent-sketch.png`.
- Reworked the founding-community signup card to use the generated sketch as a full-card background layer, avoiding visible rectangular image edges and matching the supplied dark-green reference more closely.
- Checks passed: `npx.cmd tsc --noEmit`, `npm.cmd run build`, `npm.cmd run ops:check`.
- QA artifacts: `artifacts/screenshots/home-community-sketch-card-final-desktop.png` and `artifacts/screenshots/home-community-sketch-card-final-mobile.png`.

## 2026-05-28 organic hero route overlay

- Reworked the hero collage route from a straight stepped badge stack into an S-shaped dotted map path with explicit badge anchor positions.
- Tuned desktop and mobile hero badge placement so the trust checks feel closer to the supplied reference map overlay.
- Checks passed: `npx.cmd tsc --noEmit`, `npm.cmd run build`, `npm.cmd run ops:check`.
- QA artifacts: `artifacts/screenshots/home-hero-route-scurve-desktop.png` and `artifacts/screenshots/home-hero-route-scurve-mobile.png`.

## 2026-05-28 mobile-first homepage refinement

- Reworked homepage responsive behavior with tighter mobile hero spacing, smaller mobile headline/body scale, compact CTAs, mobile proof cards, shorter hero collage, and smaller trust badges.
- Converted lower sections to mobile-native cards/rows with reduced vertical padding, improved margins, smaller icons/type, and cleaner guide/signup card rhythm.
- Kept desktop layout intact while making mobile widths 360/390/430px read as designed rather than compressed desktop.
- Checks passed: `npx.cmd tsc --noEmit`, `npm.cmd run build`, `npm.cmd run ops:check`.
- QA artifacts: `artifacts/screenshots/home-mobile-first-pass-360.png`, `artifacts/screenshots/home-mobile-first-pass-390.png`, `artifacts/screenshots/home-mobile-first-final-430.png`, and `artifacts/screenshots/home-mobile-first-pass-desktop.png`.

## 2026-05-28 mobile hero overflow fix

- Fixed mobile hero right-edge clipping by replacing the oversized fixed headline scale with a `clamp()` mobile type size, adding right padding, making hero CTAs full-width on mobile, and adding global horizontal overflow protection.
- Verified 360px and 390px screenshots after the fix.
- Checks passed: `npx.cmd tsc --noEmit`, `npm.cmd run build`, `npm.cmd run ops:check`.
- QA artifacts: `artifacts/screenshots/home-mobile-hero-overflow-fix-360.png` and `artifacts/screenshots/home-mobile-hero-overflow-fix-390.png`.

## 2026-05-28 functional MVP lead capture

- Added shared MVP lead storage in `src/lib/mvpLeadStore.ts` with localStorage fallback and optional Supabase insert when `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are configured.
- Added Supabase migration `supabase/migrations/0002_mvp_leads.sql` and Drizzle table `mvp_leads` for public form submissions.
- Wired homepage founding-community form, guide unlocks, validation leads, and listing inquiries into the shared MVP lead store. Listing inquiries now request name/email/phone while keeping host contacts gated.
- Added Ops Center MVP lead count and CSV export for Excel-compatible fallback.
- Added `Docs/Business/CampIn_MVP_Data_And_Form_Plan.md` and `data/mvp/campin_mvp_leads_template.csv`.
- Checks passed: `npx.cmd tsc --noEmit`, `npm.cmd run build`, `npm.cmd run db:check`, `npm.cmd run ops:check`.
- QA artifacts: `artifacts/screenshots/home-mvp-functional-mobile.png`, `artifacts/screenshots/home-mvp-form-desktop.png`, and `artifacts/screenshots/ops-mvp-leads-export.png`.
