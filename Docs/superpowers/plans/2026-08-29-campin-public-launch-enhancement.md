# CampIn Public Launch Enhancement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver a shorter, clearer, interactive CampIn homepage and a secure centralized lead dashboard, then publish a verified Vercel preview from a dedicated GitHub branch.

**Architecture:** Keep the existing React 19, Vite, React Router, Tailwind CSS, and Supabase application. Split homepage content, category/query behavior, media attribution, lead transport, and admin data access into focused modules so the public and owner experiences share typed interfaces instead of browser-local assumptions.

**Tech Stack:** React 19, TypeScript 5.9, Vite 7, React Router 7, Tailwind CSS 4, Supabase JS 2, Zod 4, Vitest, Testing Library, GitHub, Vercel.

**Spec:** `Docs/superpowers/specs/2026-08-29-campin-public-launch-enhancement-design.md`

## Global Constraints

- CampIn remains a reviewed-lead and founding-community product until stored evidence supports availability or booking claims.
- Preserve forest green `#1F3D2B`, warm orange `#E67E22`, and off-white `#F7F5F2`; orange remains an accent.
- Never present a regional editorial photograph as an actual campsite photograph.
- All lead data tables keep row-level security enabled; anonymous clients may insert allowed lead types but never read leads.
- Owner reads and updates require `public.is_campin_owner()`.
- The public site must support keyboard use, WCAG AA contrast, visible focus, reduced motion, and 44px touch targets where practical.
- Do not add instant booking, payments, host payouts, a native app, or a production map provider.
- Do not replace the current production deployment until the Vercel preview is accepted.

## File Structure

- `src/pages/Home.tsx`: homepage composition and waitlist state only.
- `src/components/home/CampInDefinition.tsx`: approved marketplace definition and camper/host paths.
- `src/components/home/CategoryExplorer.tsx`: accessible category rail linked to Explore queries.
- `src/components/home/TrustProcess.tsx`: one compact evidence-based trust explanation.
- `src/components/home/HostInvitation.tsx`: focused host conversion section.
- `src/data/homeCategories.ts`: category copy, query values, media keys, and alt text.
- `src/data/mediaRegistry.ts`: licensed media source, attribution, region, and usage metadata.
- `src/lib/exploreFilters.ts`: parse and serialize URL-backed Explore category filters.
- `src/lib/leadSchema.ts`: Zod validation and normalized lead types.
- `src/lib/mvpLeadStore.ts`: centralized public submission transport and local retry receipt.
- `src/lib/adminLeadStore.ts`: authenticated Supabase lead reads, filters, updates, and CSV export.
- `src/pages/OpsCenter.tsx`: owner dashboard composition using `adminLeadStore`.
- `src/AdminApp.tsx`: production-safe admin routing.
- `src/components/vectors/CampInVectors.tsx`: coherent responsive route, topography, and campsite SVGs.
- `supabase/migrations/0005_owner_leads_and_status.sql`: owner-only read/update policy and lead status rules.
- `src/**/*.test.ts(x)`: focused unit/component tests.
- `public/images/india/*`: optimized regional media derivatives.
- `public/images/india/ATTRIBUTION.md`: source and license record.
- `vercel.json`: Vite SPA and admin route behavior for Vercel preview.

---

### Task 1: Add the Test Harness and Lock Current Claims

**Files:**
- Modify: `package.json`
- Modify: `vite.config.ts`
- Create: `src/test/setup.ts`
- Create: `src/pages/Home.claims.test.tsx`

**Interfaces:**
- Consumes: existing `Home` component and React Router.
- Produces: `npm test`, jsdom setup, and a regression test preventing unsupported booking copy.

- [ ] **Step 1: Add test dependencies and scripts**

Add `vitest`, `jsdom`, `@testing-library/react`, `@testing-library/jest-dom`, and `@testing-library/user-event`. Add scripts:

```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 2: Configure Vitest**

Add this test block to `vite.config.ts` and import `defineConfig` from `vitest/config`:

```ts
test: {
  environment: "jsdom",
  setupFiles: ["./src/test/setup.ts"],
  css: true,
}
```

Create `src/test/setup.ts`:

```ts
import "@testing-library/jest-dom/vitest";
```

- [ ] **Step 3: Write the failing homepage claims test**

```tsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "./Home";

it("does not promise instant booking or unsupported universal verification", () => {
  render(<MemoryRouter><Home /></MemoryRouter>);
  expect(screen.queryByText(/book instantly/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/every campsite is verified/i)).not.toBeInTheDocument();
});
```

- [ ] **Step 4: Run the focused test**

Run: `npm test -- src/pages/Home.claims.test.tsx`

Expected: PASS, establishing the wording guard before the redesign.

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json vite.config.ts src/test/setup.ts src/pages/Home.claims.test.tsx
git commit -m "test: add homepage regression harness"
```

### Task 2: Implement URL-Backed Category Filtering

**Files:**
- Create: `src/lib/exploreFilters.ts`
- Create: `src/lib/exploreFilters.test.ts`
- Create: `src/data/homeCategories.ts`
- Modify: `src/pages/Explore.tsx`

**Interfaces:**
- Produces: `type ExploreCategory`, `parseExploreCategory(search: string): ExploreCategory | null`, and `categoryHref(category: ExploreCategory): string`.
- Produces: `homeCategories: HomeCategory[]` where `HomeCategory` includes `id`, `title`, `description`, `mediaKey`, and `alt`.

- [ ] **Step 1: Write filter contract tests**

```ts
import { categoryHref, parseExploreCategory } from "./exploreFilters";

it("round-trips a supported category", () => {
  expect(categoryHref("farms-estates")).toBe("/explore?category=farms-estates");
  expect(parseExploreCategory("?category=farms-estates")).toBe("farms-estates");
});

it("rejects unknown category values", () => {
  expect(parseExploreCategory("?category=secret-spot")).toBeNull();
});
```

- [ ] **Step 2: Run the tests and verify failure**

Run: `npm test -- src/lib/exploreFilters.test.ts`

Expected: FAIL because the module does not exist.

- [ ] **Step 3: Implement the typed parser and serializer**

```ts
export const exploreCategories = [
  "bring-your-own-tent",
  "pre-pitched-glamping",
  "farms-estates",
  "mountains-forests",
  "waterside",
  "road-trip-stops",
] as const;

export type ExploreCategory = (typeof exploreCategories)[number];

export function parseExploreCategory(search: string): ExploreCategory | null {
  const value = new URLSearchParams(search).get("category");
  return exploreCategories.includes(value as ExploreCategory) ? value as ExploreCategory : null;
}

export function categoryHref(category: ExploreCategory) {
  return `/explore?category=${encodeURIComponent(category)}`;
}
```

- [ ] **Step 4: Connect Explore to the URL**

Use `useLocation` and `useNavigate` to initialize the relevant existing filter, show the active category in the filter UI, and clear it by removing only the `category` parameter. Map each category to existing listing types/tags rather than duplicating listing data.

- [ ] **Step 5: Run tests and build**

Run: `npm test -- src/lib/exploreFilters.test.ts && npm run build`

Expected: tests and both Vite builds pass.

- [ ] **Step 6: Commit**

```bash
git add src/lib/exploreFilters.ts src/lib/exploreFilters.test.ts src/data/homeCategories.ts src/pages/Explore.tsx
git commit -m "feat: add shareable camping category filters"
```

### Task 3: Build the Clear Marketplace Definition and Category Explorer

**Files:**
- Create: `src/components/home/CampInDefinition.tsx`
- Create: `src/components/home/CategoryExplorer.tsx`
- Create: `src/components/home/CategoryExplorer.test.tsx`
- Modify: `src/pages/Home.tsx`

**Interfaces:**
- Consumes: `homeCategories` and `categoryHref` from Task 2.
- Produces: semantic homepage sections with `aria-labelledby` and keyboard-accessible links.

- [ ] **Step 1: Write the category interaction test**

```tsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CategoryExplorer from "./CategoryExplorer";

it("links every category to a shareable Explore filter", () => {
  render(<MemoryRouter><CategoryExplorer /></MemoryRouter>);
  expect(screen.getByRole("link", { name: /bring your own tent/i }))
    .toHaveAttribute("href", "/explore?category=bring-your-own-tent");
  expect(screen.getAllByRole("link")).toHaveLength(6);
});
```

- [ ] **Step 2: Run the test and verify failure**

Run: `npm test -- src/components/home/CategoryExplorer.test.tsx`

Expected: FAIL because the component does not exist.

- [ ] **Step 3: Implement `CampInDefinition`**

Use the approved headline and supporting definition verbatim. Add two clear paths: `For campers` linking to `/explore` and `For hosts` linking to `/host-your-land`. Keep the section open and two-column at large widths without nested card grids.

- [ ] **Step 4: Implement `CategoryExplorer`**

Render six semantic links from `homeCategories`. Each link contains an image, visible title, one-sentence description, and arrow icon. Use CSS scroll snapping on mobile and a three-column grid on large screens. Do not create a custom carousel control.

- [ ] **Step 5: Replace the current first post-hero taxonomy section**

In `Home.tsx`, place `CampInDefinition` immediately after the hero and `CategoryExplorer` after it. Remove the current four-card “One place for every way to camp in India” block and taxonomy disclosure from the homepage; retain taxonomy data for Explore.

- [ ] **Step 6: Run tests and build**

Run: `npm test -- src/components/home/CategoryExplorer.test.tsx src/pages/Home.claims.test.tsx && npm run build`

Expected: all commands pass.

- [ ] **Step 7: Commit**

```bash
git add src/components/home src/pages/Home.tsx
git commit -m "feat: clarify CampIn and add category discovery"
```

### Task 4: Add Licensed Indian Regional Photography

**Files:**
- Create: `src/data/mediaRegistry.ts`
- Create: `src/data/mediaRegistry.test.ts`
- Create: `public/images/india/ATTRIBUTION.md`
- Create: optimized image files under `public/images/india/`
- Modify: `src/data/homeCategories.ts`
- Modify: `src/data/listings.ts`

**Interfaces:**
- Produces: `MediaAsset` with `src`, `region`, `subject`, `alt`, `sourceUrl`, `author`, `license`, and `usage: "editorial-region" | "listing-photo"`.
- Consumes: Wikimedia Commons license pages and existing authorized repository assets.

- [ ] **Step 1: Write registry integrity tests**

```ts
import { mediaRegistry } from "./mediaRegistry";

it("records source and usage for every regional image", () => {
  for (const asset of Object.values(mediaRegistry)) {
    expect(asset.src).toMatch(/^\/images\/india\//);
    expect(asset.sourceUrl).toMatch(/^https:\/\//);
    expect(asset.author.length).toBeGreaterThan(1);
    expect(["editorial-region", "listing-photo"]).toContain(asset.usage);
  }
});
```

- [ ] **Step 2: Run the test and verify failure**

Run: `npm test -- src/data/mediaRegistry.test.ts`

Expected: FAIL because the registry does not exist.

- [ ] **Step 3: Download and optimize approved media**

Use Commons file pages with explicit Creative Commons licenses, including Kerala Backwaters by Vyacheslav Argenberg (CC BY 4.0), Cherrapunji/Nohkalikai imagery, Jibhi Banjar imagery, and additional Indian farm, desert, and tent imagery whose individual file pages record reuse rights. Convert to 1600px-wide WebP at quality 78 and 900px-wide WebP at quality 76 using the workspace image library. Do not download stock previews or operator photos without explicit reuse permission.

- [ ] **Step 4: Implement the registry and attribution ledger**

Record exact Commons file page, author, license, modification (`resized and converted to WebP`), subject, and usage for every file. Mark all regional discovery imagery as `editorial-region`.

- [ ] **Step 5: Replace misleading listing imagery**

For entries without authorized listing photos, reference a regionally accurate editorial asset and expose that status to the card renderer. Do not change a listing's evidence stage because an editorial image exists.

- [ ] **Step 6: Run tests and inspect every image**

Run: `npm test -- src/data/mediaRegistry.test.ts && npm run build`

Open each generated image with the image viewer and reject blank, distorted, or incorrectly cropped outputs.

- [ ] **Step 7: Commit**

```bash
git add public/images/india src/data/mediaRegistry.ts src/data/mediaRegistry.test.ts src/data/homeCategories.ts src/data/listings.ts
git commit -m "feat: add attributed Indian outdoor photography"
```

### Task 5: Consolidate Trust, Host, Guide, and Footer Sections

**Files:**
- Create: `src/components/home/TrustProcess.tsx`
- Create: `src/components/home/HostInvitation.tsx`
- Modify: `src/pages/Home.tsx`
- Modify: `src/App.tsx`
- Modify: `src/components/Navbar.tsx`

**Interfaces:**
- Produces: one three-step trust section and one focused host conversion section.
- Consumes: shared `Footer`, `Navbar`, listing status language, and the existing host route.

- [ ] **Step 1: Write a homepage structure test**

```tsx
it("shows one concise trust explanation and both marketplace actions", () => {
  render(<MemoryRouter><Home /></MemoryRouter>);
  expect(screen.getAllByRole("heading", { name: /how campin builds trust/i })).toHaveLength(1);
  expect(screen.getByRole("link", { name: /explore camps/i })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /list your land/i })).toBeInTheDocument();
});
```

- [ ] **Step 2: Run the test and verify failure**

Run: `npm test -- src/pages/Home.claims.test.tsx`

Expected: FAIL on the new structural assertions.

- [ ] **Step 3: Implement the consolidated sections**

Render the three trust stages: permission and host context, access and essentials, status and unknowns. Add a host section that emphasizes control and responsible demand without unsupported revenue promises.

- [ ] **Step 4: Remove repeated homepage blocks**

Remove “Why CampIn exists,” “The Four CampIn Pillars,” the five repeated verification checks, the four-step operational workflow, and the long founder story from the homepage. Retain a short guide preview, founding-community form, featured places, and journal preview.

- [ ] **Step 5: Restore the homepage footer and refine navigation actions**

Always render `Footer` in `App.tsx`. Make `Explore camps` the primary public navigation action and keep `Host` visible. Do not add an admin link.

- [ ] **Step 6: Run tests and build**

Run: `npm test -- src/pages/Home.claims.test.tsx && npm run build`

Expected: pass.

- [ ] **Step 7: Commit**

```bash
git add src/components/home/TrustProcess.tsx src/components/home/HostInvitation.tsx src/pages/Home.tsx src/App.tsx src/components/Navbar.tsx
git commit -m "refactor: simplify the CampIn homepage journey"
```

### Task 6: Redraw the CampIn SVG System and Motion

**Files:**
- Modify: `src/components/vectors/CampInVectors.tsx`
- Create: `src/components/vectors/CampInVectors.test.tsx`
- Modify: `src/index.css`
- Modify: `src/pages/Home.tsx`

**Interfaces:**
- Produces: accessible `HeroRoute`, `TopographicPattern`, and `TentConstellation` components with stable `viewBox` values and `decorative?: boolean`.

- [ ] **Step 1: Write SVG accessibility tests**

```tsx
it("hides decorative scenery and labels informative vectors", () => {
  const { rerender } = render(<HeroRoute decorative />);
  expect(screen.getByTestId("hero-route")).toHaveAttribute("aria-hidden", "true");
  rerender(<TentConstellation decorative={false} title="Tent below Indian mountain ridges" />);
  expect(screen.getByRole("img", { name: /tent below indian mountain ridges/i })).toBeInTheDocument();
});
```

- [ ] **Step 2: Run the test and verify failure**

Run: `npm test -- src/components/vectors/CampInVectors.test.tsx`

Expected: FAIL because the accessibility props are not implemented.

- [ ] **Step 3: Normalize vector geometry**

Use clean paths, round linecaps and joins, `currentColor`, non-scaling strokes where appropriate, consistent optical weight, and fewer decorative nodes. Keep route motion on one dashed path and ensure it does not communicate status.

- [ ] **Step 4: Refine motion CSS**

Keep transitions below 300ms for UI responses, use slow ambient motion only on decorative background layers, and preserve the existing reduced-motion override. Remove pulsing effects that compete with reading.

- [ ] **Step 5: Run tests, build, and inspect desktop/mobile renderings**

Run: `npm test -- src/components/vectors/CampInVectors.test.tsx && npm run build`

Capture the hero at 1440px and 390px widths and inspect both images.

- [ ] **Step 6: Commit**

```bash
git add src/components/vectors/CampInVectors.tsx src/components/vectors/CampInVectors.test.tsx src/index.css src/pages/Home.tsx
git commit -m "feat: refine CampIn outdoor vector system"
```

### Task 7: Centralize and Validate Public Lead Submission

**Files:**
- Create: `src/lib/leadSchema.ts`
- Create: `src/lib/leadSchema.test.ts`
- Modify: `src/lib/mvpLeadStore.ts`
- Modify: `src/lib/validationMachine.ts`
- Modify: `src/lib/guideAccess.ts`
- Modify: all public form components that call `submitMvpLead`

**Interfaces:**
- Produces: `leadInputSchema`, `normalizeLead(input): MvpLeadInput`, and `submitMvpLead(input): Promise<LeadSubmissionResult>`.
- `LeadSubmissionResult` is `{ lead: MvpLeadRecord; remote: "synced" | "queued"; notification: "sent" | "skipped" | "failed" }`.

- [ ] **Step 1: Write validation tests**

```ts
it("normalizes email and requires consent", () => {
  expect(normalizeLead(validLead({ email: " USER@EXAMPLE.COM " })).email).toBe("user@example.com");
  expect(() => normalizeLead(validLead({ consent: false }))).toThrow(/consent/i);
});
```

- [ ] **Step 2: Run the tests and verify failure**

Run: `npm test -- src/lib/leadSchema.test.ts`

Expected: FAIL because the schema module does not exist.

- [ ] **Step 3: Implement Zod validation and normalization**

Validate the six allowed lead types, source path, contact fields, consent, score range, status length, and serialized payload size. Normalize email casing, trim text fields, and reject an input with neither email nor phone.

- [ ] **Step 4: Refactor the transport**

Insert into Supabase first. Keep a local retry receipt only when the insert fails. Treat Netlify Forms as a notification fallback and return its state separately. Never report success solely because localStorage accepted a record.

- [ ] **Step 5: Update every public form state**

Provide saving, saved, queued-for-retry, and validation-error messages through an `aria-live="polite"` status region. Disable repeat submission while saving and preserve entered data on recoverable failure.

- [ ] **Step 6: Run all lead tests and build**

Run: `npm test -- src/lib/leadSchema.test.ts && npm run build`

Expected: pass.

- [ ] **Step 7: Commit**

```bash
git add src/lib/leadSchema.ts src/lib/leadSchema.test.ts src/lib/mvpLeadStore.ts src/lib/validationMachine.ts src/lib/guideAccess.ts src/pages src/components
git commit -m "feat: centralize validated CampIn lead capture"
```

### Task 8: Secure Supabase Owner Access and Build the Admin Lead Store

**Files:**
- Create: `supabase/migrations/0005_owner_leads_and_status.sql`
- Create: `src/lib/adminLeadStore.ts`
- Create: `src/lib/adminLeadStore.test.ts`
- Modify: `src/pages/OpsCenter.tsx`

**Interfaces:**
- Produces: `AdminLeadFilters`, `listAdminLeads(filters)`, `updateAdminLeadStatus(id, status)`, and `exportAdminLeadsToCsv(leads)`.
- Consumes: authenticated `supabase` client and `mvp_leads` rows.

- [ ] **Step 1: Write admin store tests with a mocked Supabase chain**

```ts
it("applies lead type and status filters server-side", async () => {
  await listAdminLeads({ type: "host_interest", status: "new", search: "", from: null, to: null });
  expect(eq).toHaveBeenCalledWith("lead_type", "host_interest");
  expect(eq).toHaveBeenCalledWith("status", "new");
});
```

- [ ] **Step 2: Run the test and verify failure**

Run: `npm test -- src/lib/adminLeadStore.test.ts`

Expected: FAIL because the admin store does not exist.

- [ ] **Step 3: Write the owner-only migration**

The migration must drop any broad authenticated select/update policies and create:

```sql
create policy "CampIn owners read leads"
on public.mvp_leads for select to authenticated
using (public.is_campin_owner());

create policy "CampIn owners update lead status"
on public.mvp_leads for update to authenticated
using (public.is_campin_owner())
with check (public.is_campin_owner());
```

Restrict status values with a check constraint covering `new`, `reviewing`, `contacted`, `qualified`, `closed`, and existing launch statuses that are already stored.

- [ ] **Step 4: Implement the admin store**

Fetch ordered rows from Supabase, apply filters in the query, escape `%` and `_` in search input, cap default pages at 100 records, update only status and `updated_at`, and export the rows currently visible after filters.

- [ ] **Step 5: Replace local-only dashboard reads**

In `OpsCenter.tsx`, load centralized leads after owner authentication. Render loading, error, empty, and results states. Add filters for type, status, source, date, and search; a detail drawer; status update; and filtered CSV export. Keep legacy local data in a separately labelled prototype panel.

- [ ] **Step 6: Run tests and database checks**

Run: `npm test -- src/lib/adminLeadStore.test.ts && npm run db:check && npm run build`

Expected: pass. If `db:check` cannot connect without environment credentials, record that blocker and still validate the SQL locally through the Supabase CLI parser when available.

- [ ] **Step 7: Commit**

```bash
git add supabase/migrations/0005_owner_leads_and_status.sql src/lib/adminLeadStore.ts src/lib/adminLeadStore.test.ts src/pages/OpsCenter.tsx
git commit -m "feat: add secure centralized lead operations"
```

### Task 9: Repair Admin Routing and Vercel SPA Behavior

**Files:**
- Modify: `src/AdminApp.tsx`
- Modify: `admin.html`
- Create: `vercel.json`
- Create: `src/AdminApp.test.tsx`

**Interfaces:**
- Produces: a working `/admin.html` entry, hash subroutes, and Vercel rewrites that do not route admin assets into the public app.

- [ ] **Step 1: Write an admin entry test**

```tsx
it("renders the owner sign-in at the admin entry path", () => {
  window.history.replaceState({}, "", "/admin.html");
  render(<AdminApp />);
  expect(screen.getByRole("heading", { name: /campin launch console/i })).toBeInTheDocument();
});
```

- [ ] **Step 2: Run the test and verify failure**

Run: `npm test -- src/AdminApp.test.tsx`

Expected: FAIL with the current route mismatch.

- [ ] **Step 3: Fix the router base**

Use a router configuration where `/admin.html` renders the Ops Center and subtools remain reachable through explicit hash paths such as `/admin.html#/validation`. Remove the route ambiguity that currently logs `No routes matched location "/admin.html"`.

- [ ] **Step 4: Add Vercel configuration**

Configure the public SPA fallback while preserving `/admin.html`, built assets, robots, sitemap, and static images. Set security headers equivalent to the existing deployment headers.

- [ ] **Step 5: Run tests and preview locally**

Run: `npm test -- src/AdminApp.test.tsx && npm run build`

Serve the production output and verify `/`, `/explore?category=waterside`, `/admin.html`, and `/admin.html#/validation` directly.

- [ ] **Step 6: Commit**

```bash
git add src/AdminApp.tsx src/AdminApp.test.tsx admin.html vercel.json
git commit -m "fix: restore the CampIn admin entry route"
```

### Task 10: Accessibility, Performance, and Visual Verification

**Files:**
- Modify: affected components from Tasks 3–9
- Create: `Docs/Readiness/CampIn_Launch_Enhancement_QA.md`

**Interfaces:**
- Consumes: complete public and admin experiences.
- Produces: verified desktop/mobile screenshots, keyboard checks, copy diff, performance notes, and a fidelity ledger.

- [ ] **Step 1: Run automated verification**

Run: `npm test && npm run build && npm run ops:check`

Expected: all configured checks pass.

- [ ] **Step 2: Verify the public desktop journey**

At 1440px, inspect hero, definition, all six category links, featured places, trust, host CTA, guide/community, journal, and footer. Follow a category to Explore, confirm the filter is active, then clear it.

- [ ] **Step 3: Verify mobile behavior**

At 390px and 360px, inspect navigation, hero line breaks, horizontal category rail, forms, listing cards, footer, and admin sign-in. Confirm no horizontal overflow, clipped buttons, or unreadable labels.

- [ ] **Step 4: Verify accessibility behavior**

Keyboard through navigation, category links, filters, forms, and admin controls. Confirm focus visibility, semantic names, `aria-live` form results, informative alt text, decorative image hiding, and reduced-motion behavior.

- [ ] **Step 5: Verify admin and form data flow**

Submit one safe test record for each of the six lead types against the preview data path, authenticate as the owner, confirm all six appear from a separate session, update one status, filter results, and export the filtered CSV. Confirm an unauthenticated client cannot select `mvp_leads`.

- [ ] **Step 6: Record the QA ledger**

Document at least five public visual comparisons, category behavior, image attribution, above-the-fold copy diff, all form outcomes, admin authorization, intentional deviations, and any environment-only blocker in `Docs/Readiness/CampIn_Launch_Enhancement_QA.md`.

- [ ] **Step 7: Commit**

```bash
git add src public Docs/Readiness/CampIn_Launch_Enhancement_QA.md
git commit -m "test: verify CampIn launch enhancement"
```

### Task 11: Publish GitHub Branch and Vercel Preview

**Files:**
- Modify only when deployment verification exposes a concrete defect.

**Interfaces:**
- Consumes: verified branch build.
- Produces: GitHub branch or pull-request URL and Vercel preview URL.

- [ ] **Step 1: Rebase safely on the current remote branch**

Run: `git fetch origin && git rebase origin/main`

Expected: the feature commits replay without discarding user changes. Resolve only files changed by this plan.

- [ ] **Step 2: Run the final local gate**

Run: `npm test && npm run build && git diff --check && git status --short`

Expected: tests/build pass, no whitespace errors, and only expected untracked QA screenshots if they are intentionally retained.

- [ ] **Step 3: Push the dedicated branch**

Push `codex/campin-launch-enhancement` using the authenticated Git transport or GitHub connection. Do not force-push.

- [ ] **Step 4: Create the Vercel project and preview**

Under team `team_2bFVG38GKLtJv8JOayxpv1PR`, create or deploy a CampIn project from the feature branch with Vite build settings. Add only required public environment variables; never upload service-role credentials.

- [ ] **Step 5: Verify the deployed preview**

Open the preview in the in-app browser and repeat the core public category flow and admin entry check. Inspect build logs and runtime errors if any route fails.

- [ ] **Step 6: Create a pull request when connector permissions allow**

Target `main`, summarize the public redesign, data/security changes, verification evidence, migration requirement, and production rollout steps. If the GitHub integration remains read-only, provide the pushed branch URL and exact pull-request creation link instead.

- [ ] **Step 7: Final handoff**

Provide the GitHub branch or PR, Vercel preview, admin preview link, build/test result, database migration status, image-license ledger, remaining intentional deviations, and a warning that production remains unchanged until accepted.

