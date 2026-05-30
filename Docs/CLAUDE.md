# 🏕️ CLAUDE.md — CAMPIN PROJECT AGENT FILE
> This is the master instruction file for Claude Desktop / Claude Code when working on CampIn.

---

## IDENTITY & CONTEXT

You are working on **CampIn** — India's community-first camping platform. Think "Airbnb for camping in India" or "Hipcamp for India."

- **Domain:** campin.co.in
- **Tagline:** Stay. Explore. CampIn.
- **Hero line:** "Wake up to views, not hotel bills."
- **Mission:** Building India's outdoor culture, one campsite at a time.
- **Type:** Two-sided marketplace (Hosts ↔ Campers)
- **Stage:** MVP launched, entering Phase 2 (booking engine + Supabase backend)

---

## DESIGN SYSTEM (MANDATORY — NEVER DEVIATE)

### Colors
```
Forest Green: #1F3D2B — Primary (headers, buttons, CTAs, nav, footer)
Forest Green Light: #2A5239 — Hover states
Warm Orange: #E67E22 — Accent ONLY (highlights, tags, stars, key CTAs)
Off White: #F7F5F2 — Page background (NEVER pure white as page bg)
Text Grey: #5F5F5F — Body text (NEVER pure black)
Text Dark: #2D2D2D — Primary text on light backgrounds
Pure White: #FFFFFF — Cards, modals, inputs only
```

### Rules
- Orange is ALWAYS accent, never primary
- Off White is the default page background
- Text Grey for body copy, never #000
- No dark mode exists and should not be built
- No heavy gradients, no sharp corners, no 3D effects
- Border radius: 16px for cards, 12px for buttons/inputs
- Font: Inter (Google Fonts), NEVER any other font

### Typography
- H1: 56–72px, Bold, Forest Green
- H2: 36–48px, Semibold
- Body: 16–18px, Regular, Text Grey, 1.7 line height
- Buttons: 16px, Bold, rounded-xl
- Labels: 12–14px, Medium, uppercase tracking

### Component Patterns
- Cards: rounded-2xl, shadow-sm, hover: shadow-xl + -translate-y-1
- Buttons: rounded-xl, font-semibold, transition-all duration-200
- Inputs: bg-offwhite, rounded-xl, focus:border-forest/30
- Page top padding: pt-20 sm:pt-24 (below fixed navbar)
- Content max width: max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
- Section padding: py-20 sm:py-28

---

## TECH STACK (CURRENT)

```
Frontend: React 19 + Vite 7 + TypeScript 5.9
Styling: Tailwind CSS 4 with custom design tokens in index.css
Routing: React Router DOM v7
Icons: Lucide React
Build: vite-plugin-singlefile (single HTML output)
```

## TECH STACK (PHASE 2 TARGET — RESEARCHED 2026 BEST PRACTICES)

```
Framework: Next.js 15 (App Router) with Server Components
UI: shadcn/ui + Tailwind CSS 4
State: Zustand (simple, lightweight)
Database: Supabase (PostgreSQL 16 + Auth + Storage + Realtime)
ORM: Drizzle ORM (SQL-first, typed migrations)
Auth: Supabase Auth (email + phone OTP for India)
Payments: Razorpay (UPI, cards, wallets) + Razorpay Route (split payments)
Maps: Mapbox GL JS (beautiful, customizable)
Images: Cloudinary (WebP, responsive, CDN)
Email: Resend (React Email templates)
Search: PostgreSQL full-text search → Elasticsearch at scale
Caching: Redis (Upstash) for sessions and search
Deployment: Vercel (Next.js optimized, edge functions)
Analytics: PostHog (1M free events + replays + feature flags)
Error Tracking: Sentry ($50K startup credits)
Testing: Vitest + Playwright
Monorepo: pnpm + Turborepo (when mobile app added)
```

### Why This Stack (Research-Backed)
- **Next.js 15**: Recommended by every 2026 startup stack guide. SSR/SSG for SEO (critical for marketplace). React Server Components cut bundle size 40%+. Vercel deploy is zero-config.
- **Supabase over Firebase**: PostgreSQL (not NoSQL) is correct for relational marketplace data. Built-in auth with phone OTP (critical for India). Free tier handles MVP to 50K users. Open source = no vendor lock-in.
- **Drizzle over Prisma**: SQL-first = more control, zero runtime overhead, typed migrations. Prisma's abstraction layer adds complexity without benefit for experienced devs.
- **Razorpay over Stripe India**: UPI support (60%+ of Indian digital payments). Split payment via Route for marketplace. 10M+ Indian businesses. PCI DSS Level 1. 1.8-2% transaction fee.
- **PostHog over GA4+Mixpanel**: 1M free events/month. Session replay included. Feature flags built-in. One tool replaces three. Consensus best value on r/startups.
- **Mapbox over Google Maps**: Better customization for outdoor/camping aesthetic. Cost-effective at scale. Better offline support for remote Indian locations.

---

## PROJECT STRUCTURE

```
src/
├── App.tsx                    # Router setup
├── main.tsx                   # Entry point
├── index.css                  # Tailwind + design tokens
├── lib/
│   └── supabase.ts            # Supabase client (Phase 2)
├── components/
│   ├── Navbar.tsx             # Sticky nav, mobile hamburger
│   ├── Footer.tsx             # 4-column footer
│   ├── ListingCard.tsx        # Reusable listing card
│   ├── CategoryCard.tsx       # Category type card
│   ├── SEO.tsx                # Meta tag management
│   └── ui/                    # shadcn/ui components (Phase 2)
├── pages/
│   ├── Home.tsx               # 10-section landing
│   ├── Explore.tsx            # Filterable listing grid
│   ├── Signup.tsx             # Lead capture form
│   ├── ListYourSpace.tsx      # Host application form
│   ├── Support.tsx            # Community funding
│   ├── ListingDetail.tsx      # Single listing view (Phase 2)
│   ├── Dashboard.tsx          # Host dashboard (Phase 2)
│   ├── Booking.tsx            # Booking flow (Phase 2)
│   └── Privacy.tsx            # Legal pages
├── data/
│   └── listings.ts            # TypeScript interfaces + dummy data
├── hooks/                     # Custom React hooks (Phase 2)
├── types/                     # TypeScript type definitions
docs/                          # All strategic documents (20+ files)
```

---

## BRAND VOICE (ALWAYS FOLLOW)

### Tone
- Warm like a campfire conversation, not a corporate pitch
- Authentic, calm, inspiring, non-corporate
- Like a friend who camps, not a brand that sells
- India-specific — reference real Indian places and experiences

### DO
- Write conversationally
- Use short, impactful headlines
- Reference real Indian landscapes (Coorg, Spiti, Meghalaya, Jaisalmer)
- Be specific about experiences, not generic travel talk

### DON'T
- Use corporate jargon (leverage, synergy, disrupt)
- Overpromise or exaggerate
- Use non-Indian imagery references
- Be preachy about sustainability
- Compare to competitors directly

---

## CURRENT STATE & CONSTRAINTS

### What EXISTS (MVP)
- ✅ 5-page website: Home, Explore, Signup, List Your Space, Support
- ✅ 8 dummy listings with realistic Indian camping data
- ✅ Mobile responsive design
- ✅ Form capture (frontend only, no backend yet)
- ✅ Filterable Explore page with search, type, amenities, price

### What DOES NOT EXIST Yet
- ❌ No backend / database connection
- ❌ No user authentication
- ❌ No booking engine
- ❌ No payment processing
- ❌ No map integration
- ❌ No real-time messaging
- ❌ No review system
- ❌ No host dashboard
- ❌ No listing detail pages
- ❌ No mobile app

### Critical Constraints
- MVP has NO booking engine — forms capture leads only
- No real authentication — forms store to Airtable/Supabase
- 8 dummy listings are NOT real — for UI demonstration only
- No payment processing — Support page has Razorpay placeholder
- Mobile-first design — every feature works on mobile first
- Community over commerce — trust and authenticity over transactional
- India-first — UPI, Indian locations, ₹ pricing, Indian identity

---

## HOW TO APPROACH TASKS

### When building UI:
1. Read docs/CampIn_Design_System.md for visual rules
2. Read docs/CampIn_Page_Copy.md for approved text
3. Follow the color/spacing/typography rules EXACTLY
4. Make it mobile-responsive
5. Use Tailwind utility classes only

### When building backend:
1. Read docs/CampIn_Tech_Stack.md for schema and architecture
2. Use Supabase client from src/lib/supabase.ts
3. Follow the database schema exactly
4. Handle errors with user-friendly messages (never expose technical errors)
5. Add loading states for all async operations

### When writing copy:
1. Read docs/CampIn_Brand_Guidelines.md for voice rules
2. Read docs/CampIn_Page_Copy.md for approved text
3. Follow the brand voice rules EXACTLY
4. Be warm, authentic, Indian-specific

---

## DOCUMENTATION MAP

| Need | Read This |
|---|---|
| Business context | docs/CampIn_Master_Brief.md |
| What to build | docs/CampIn_Product_Specification.md |
| Exact page text | docs/CampIn_Page_Copy.md |
| Technical architecture | docs/CampIn_Tech_Stack.md |
| Visual rules | docs/CampIn_Design_System.md |
| Brand voice/tone | docs/CampIn_Brand_Guidelines.md |
| Database schema | docs/CampIn_Tech_Stack.md Section 3 |
| SEO plan | docs/CampIn_SEO_Strategy.md |
| Marketing channels | docs/CampIn_Marketing_Strategy.md |
| Host outreach | docs/CampIn_Host_Outreach_Scripts.md |
| Launch timeline | docs/CampIn_Launch_Timeline.md |
| Validation | docs/CampIn_Idea_Validation.md |
| Competitors | docs/CampIn_Competitor_Analysis.md |
| Revenue model | docs/CampIn_Business_Model.md |
| Safety features | docs/CampIn_Trust_Safety.md |
| Metrics | docs/CampIn_Metrics_Framework.md |
| Instagram content | docs/CampIn_Content_Plan.md |
| Community strategy | docs/CampIn_Community_Strategy.md |
| Client pitch | docs/CampIn_Client_Pitch_Deck.md |
| Host proposal | docs/CampIn_Host_Partnership_Proposal.md |
| Brand partnerships | docs/CampIn_Brand_Partnership_Proposal.md |
| Investor deck | docs/CampIn_Investor_Pitch_Deck.md |
| PR & media | docs/CampIn_PR_Media_Kit.md |
| Brand story | docs/CampIn_Brand_Story.md |
| Campervan strategy | docs/CampIn_Campervan_Strategy.md |
| Operations manual | docs/CampIn_Operations_Manual.md |
| Pricing strategy | docs/CampIn_Pricing_Strategy.md |

---

**Stay. Explore. CampIn. 🏕️**
