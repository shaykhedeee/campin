# 🧠 CAMPIN — CLAUDE DESKTOP SETUP GUIDE

> How to use Claude Desktop (with Claude Code) to build and manage CampIn

---

## 1. PROJECT CONTEXT FOR CLAUDE

**CampIn** is India's community-first camping platform. Think "Airbnb for camping in India."

### Core Identity
- **Tagline:** Stay. Explore. CampIn.
- **Hero:** "Wake up to views, not hotel bills."
- **Mission:** Building India's outdoor culture, one campsite at a time.
- **Vibe:** Warm, authentic, calm, Indian, community-first.

### Tech Stack
- **Frontend:** React 19 + Vite 7 + TypeScript + Tailwind CSS 4
- **Routing:** React Router DOM v7
- **Icons:** Lucide React
- **State:** React useState (MVP), Zustand (later)
- **Backend (Phase 2):** Supabase (PostgreSQL + Auth + Storage)
- **Payments (Phase 2):** Razorpay
- **Maps (Phase 2):** Mapbox
- **Deployment:** Vite single-file build → static hosting

---

## 2. STARTUP INSTRUCTIONS FOR CLAUDE

### Initial Context to Share
Copy this to Claude when starting a new session:

```
I'm building CampIn — India's camping platform (like Hipcamp/Airbnb for camping).
The website is built with React + Vite + TypeScript + Tailwind CSS.

Key docs to read:
- docs/CampIn_Master_Brief.md — Business vision and strategy
- docs/CampIn_Product_Specification.md — What each page contains
- docs/CampIn_Tech_Stack.md — Full architecture and database schema
- docs/CampIn_Page_Copy.md — All approved text (source of truth for copy)
- docs/CampIn_Design_System.md — Visual rules, spacing, colors
- docs/CampIn_Brand_Guidelines.md — Brand voice, photography rules

Design tokens:
- forest: #1F3D2B (primary green)
- orange: #E67E22 (accent)
- offwhite: #F7F5F2 (page background)
- textgrey: #5F5F5F (body text)
- Font: Inter

Current pages: Home, Explore, Signup, ListYourSpace, Support
Data: 8 dummy listings in src/data/listings.ts
```

---

## 3. CLAUDE PROJECT STRUCTURE

### Recommended: Use Claude Code (CLI)
```bash
# Navigate to project
cd campin

# Start Claude Code in the project directory
claude

# Claude will read your docs and codebase
# Then you can ask it to build features
```

### Project Files Claude Should Know About

| File | What Claude Needs to Know |
|---|---|
| `src/App.tsx` | Router setup, all 5 routes |
| `src/index.css` | Design tokens, custom animations |
| `src/components/Navbar.tsx` | Sticky nav, mobile hamburger |
| `src/components/Footer.tsx` | 4-column footer |
| `src/pages/Home.tsx` | 10-section landing page |
| `src/pages/Explore.tsx` | Filterable listing grid |
| `src/pages/Signup.tsx` | Lead capture form |
| `src/pages/ListYourSpace.tsx` | Host application form |
| `src/pages/Support.tsx` | Community funding page |
| `src/data/listings.ts` | TypeScript interfaces + 8 listings |

---

## 4. PROMPT TEMPLATES FOR CLAUDE

### Adding a New Feature
```
I need to add [FEATURE] to CampIn. Here's the context:

Current state: [describe what exists]
Goal: [describe the desired outcome]

Constraints:
- Must follow CampIn design system (docs/CampIn_Design_System.md)
- Must be mobile responsive
- Must use Tailwind CSS utility classes
- Must match the tone in docs/CampIn_Page_Copy.md

Please:
1. Plan the implementation
2. Show me the code changes
3. Explain any new dependencies needed
```

### Fixing a Bug
```
There's a bug in [COMPONENT/PAGE]:
- Expected: [what should happen]
- Actual: [what's happening]
- Steps to reproduce: [steps]

Here's the relevant code:
[paste code]

Please fix this while maintaining the CampIn design patterns.
```

### Building a New Page
```
Create a new page for CampIn: [PAGE NAME]

Purpose: [what the page does]
Reference spec: docs/CampIn_Product_Specification.md

Design rules:
- bg-offwhite page background (#F7F5F2)
- pt-20 sm:pt-24 for top padding (below fixed navbar)
- max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 for content width
- text-forest for headings, text-textgrey for body
- rounded-2xl for cards, rounded-xl for buttons/inputs
- Follow the pattern from existing pages

Content/copy: [reference specific section in docs/CampIn_Page_Copy.md]
```

### Database Work
```
I need to set up [TABLE/FUNCTION] in Supabase for CampIn.

Reference schema: docs/CampIn_Tech_Stack.md (Section 3)

Please:
1. Write the SQL migration
2. Create the TypeScript types
3. Build the React hooks/functions to interact with it
4. Handle error states gracefully
```

### Content/Copy
```
Write [CONTENT TYPE] for CampIn's [PAGE/CHANNEL].

Brand voice rules (from docs/CampIn_Brand_Guidelines.md):
- Warm, authentic, calm, non-corporate
- Like a friend who camps, not a brand that sells
- India-specific references (Coorg, Spiti, Meghalaya)
- No jargon, no overpromising

Target audience: [WHO]
Goal: [WHAT ACTION]
```

---

## 5. PHASE 2 MIGRATION PLAN (FOR CLAUDE)

### From Vite/React to Next.js

When ready to migrate (Month 6+):

```
Migrate CampIn from React+Vite to Next.js 14+ (App Router):

1. Set up new Next.js project with TypeScript and Tailwind
2. Transfer design tokens to tailwind.config.ts
3. Convert pages to Next.js app router structure:
   - app/page.tsx (Home)
   - app/explore/page.tsx (Explore)
   - app/signup/page.tsx (Signup)
   - app/list-your-space/page.tsx (List Your Space)
   - app/support/page.tsx (Support)
4. Convert components to client/server components
5. Set up Supabase client (src/lib/supabase.ts)
6. Add server actions for form submissions
7. Implement SEO with Next.js metadata API
8. Add loading states and error boundaries
9. Deploy to Vercel

Reference: docs/CampIn_Tech_Stack.md for full architecture
```

---

## 6. KEY DECISIONS CLAUDE SHOULD KNOW

1. **MVP has NO booking engine** — forms capture leads, bookings are manual
2. **No real authentication yet** — forms store to Airtable/Supabase
3. **8 dummy listings** — these are NOT real, used for UI demonstration
4. **No payment processing** — Support page has Razorpay placeholder
5. **Mobile-first design** — every feature must work on mobile first
6. **Community over commerce** — trust, warmth, and authenticity over transactional
7. **India-first** — UPI payments, Indian locations, Indian pricing (₹), Indian identity
8. **No dark mode** — offwhite background is the default and only theme

---

## 7. IMPORTANT: WHAT NOT TO DO

- ❌ Don't add booking functionality until Phase 2
- ❌ Don't use stock corporate language
- ❌ Don't use non-Indian imagery or references
- ❌ Don't add dark mode
- ❌ Don't use heavy animations or parallax
- ❌ Don't add chat/messaging until Phase 2
- ❌ Don't implement user accounts/auth until Phase 2
- ❌ Don't change the color palette or typography
- ❌ Don't add features not in the product spec without discussion

---

## 8. DOCUMENTATION MAP

| If you need... | Read this file |
|---|---|
| Business context | `docs/CampIn_Master_Brief.md` |
| What to build | `docs/CampIn_Product_Specification.md` |
| Exact page text | `docs/CampIn_Page_Copy.md` |
| Technical architecture | `docs/CampIn_Tech_Stack.md` |
| Visual rules | `docs/CampIn_Design_System.md` |
| Brand voice/tone | `docs/CampIn_Brand_Guidelines.md` |
| Colors/typography | `docs/CampIn_Brand_Guidelines.md` (Section 2-3) |
| Database schema | `docs/CampIn_Tech_Stack.md` (Section 3) |
| SEO plan | `docs/CampIn_SEO_Strategy.md` |
| Marketing channels | `docs/CampIn_Marketing_Strategy.md` |
| Host outreach scripts | `docs/CampIn_Host_Outreach_Scripts.md` |
| Launch timeline | `docs/CampIn_Launch_Timeline.md` |
| Validation experiments | `docs/CampIn_Idea_Validation.md` |
| Competitor analysis | `docs/CampIn_Competitor_Analysis.md` |
| Revenue model | `docs/CampIn_Business_Model.md` |
| Trust/safety features | `docs/CampIn_Trust_Safety.md` |
| Success metrics | `docs/CampIn_Metrics_Framework.md` |
| Instagram content plan | `docs/CampIn_Content_Plan.md` |

---

**Stay. Explore. CampIn. 🏕️**
