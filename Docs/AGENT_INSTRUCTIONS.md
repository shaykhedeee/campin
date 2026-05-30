# 🤖 AGENT_INSTRUCTIONS — CAMPIN DEVELOPMENT GUIDE

> Use these instructions for any AI (Claude, Cursor, Codex) to ensure the code matches the CampIn vision.

## 1. CORE DIRECTIVES
- **Design Philosophy:** Nature-First, Minimalist, Human.
- **Tone:** Premium but Accessible.
- **Tech Stack:** Next.js 15, Supabase, Tailwind, Framer Motion.
- **Target Screen:** Mobile-First. 80% of our users will be on mobile in remote areas.

---

## 2. COMPONENT RULES
- **Rounded Corners:** Always use `rounded-2xl` (16px) or `rounded-3xl` for a soft, friendly feel.
- **Shadows:** Use custom soft shadows: `shadow-[0_4px_24px_rgba(0,0,0,0.08)]`.
- **Colors:**
  - `bg-campin-green` (#1F3D2B) for primary actions.
  - `text-campin-orange` (#E67E22) for highlights and active states.
  - `bg-campin-offwhite` (#F7F5F2) for backgrounds.
- **Typography:** Use Inter. Headings should be `font-bold` and `tracking-tight`.

---

## 3. PAGE-SPECIFIC LOGIC
### 3.1 Home Page
- **Hero:** Must feel expansive. Use a split layout or a full-bleed nature image with a high-contrast overlay.
- **Dual CTA:** "Explore Stays" (Primary) vs. "List Your Space" (Secondary/Outline).

### 3.2 Explore Page
- **Filter Bar:** Must be sticky. Use horizontal scroll for categories on mobile.
- **Map View:** Default to "List View" but allow an easy "Map Toggle" using Mapbox.

### 3.3 Listing Cards
- Aspect ratio: `aspect-[4/3]`.
- Must show "Amenities" at a glance (Icons for Washroom, Water, Electricity).

---

## 4. CODE STANDARDS
- **TypeScript:** Use strict types for all components.
- **Performance:** Optimize images using `next/image`.
- **Animations:** Use `framer-motion` for page transitions. Keep them subtle (under 0.3s).
- **Forms:** Use `react-hook-form` + `zod` for validation.

---

## 5. DATABASE (SUPABASE)
- **Table Naming:** plural_lowercase (e.g., `listings`, `bookings`).
- **RLS:** Row Level Security must be active for all tables.
- **Locations:** Store lat/lng in a `geography` type column for proximity searches.
