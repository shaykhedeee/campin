# Task 9 report — admin deployment and routing

Implementation commit: `399441d`
Auth guard follow-up: `0bbed2a`

## Delivered

- The admin build now appends `admin.html` to the deployable `dist` directory without removing the public build.
- The build runs a deterministic artifact check for both entries and the Netlify/Vercel SPA routing contract.
- Netlify explicitly preserves `/admin.html` before the public fallback; Vercel publishes `dist` and uses its filesystem-aware SPA rewrite.
- Hash routes for `/validation` and `/strategy` have regression coverage, while `/admin.html` renders the explicit owner sign-in screen.
- The admin tool navigation scrolls at phone width and dashboard tables scroll within their panels instead of widening or clipping the page.
- A shared session guard now wraps every admin hash route. Signed-out and non-owner sessions cannot mount the Ops Center, validation, or strategy surfaces.
- The client owner allowlist accepts only `support@campin.co.in`, blocks OTP requests for other addresses, and signs out persisted non-owner sessions before rendering data.
- The existing `/admin.html` magic-link callback is preserved. Supabase RLS remains the authoritative server-side data boundary.

## Verification

- Vitest: 11 files, 36 tests passed, including signed-out direct hashes, non-owner OTP/session rejection, owner routes, and the magic-link redirect.
- TypeScript `--noEmit`: passed.
- Public and admin Vite production builds: passed.
- Deployment artifact check: passed with `dist/index.html` and `dist/admin.html` present.
- `git diff --check`: passed.

## Boundaries

- No external deployment or database migration was run.
- Supabase authentication and magic-link redirect behavior were not changed.
