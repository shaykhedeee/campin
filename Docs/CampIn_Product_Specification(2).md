# 📋 CAMPIN — PRODUCT SPECIFICATION

> MVP V1 — What to build and how

---

## 1. MVP PHILOSOPHY

**Do not try to build a perfect product. Build the minimum product that creates real trust.**

The MVP is NOT a booking engine. It's a **lead capture + community building machine** that proves demand exists.

### MVP Goals
- ✅ Launch the website (5 pages)
- ✅ Capture host leads (form → Airtable)
- ✅ Capture user signups (form → Airtable)
- ✅ Show realistic dummy listings (8 listings)
- ✅ Build emotional brand presence
- ✅ Enable community support (Razorpay/Patreon/UPI)
- ✅ Be fully mobile responsive

### What the MVP Does NOT Include
- ❌ Real booking engine
- ❌ User authentication
- ❌ Payment processing for bookings
- ❌ Map integration
- ❌ Real-time messaging
- ❌ Review system
- ❌ Host dashboard
- ❌ Mobile app

---

## 2. SITE MAP

```
HOME (/)
├── Section 1: Navigation
├── Section 2: Hero ("Wake up to views, not hotel bills")
├── Section 3: Camping Categories (5 cards)
├── Section 4: How CampIn Works (3 steps)
├── Section 5: Featured Listings (4 cards)
├── Section 6: Campervan & Road Travel Section
├── Section 7: Host CTA ("Turn your land into an experience")
├── Section 8: Trust & Safety (5 points)
├── Section 9: Community / Mission
├── Section 10: Support CampIn CTA
└── Footer

EXPLORE (/explore)
├── Hero with search bar
├── Filter bar (type, amenities, price)
└── Listing grid (8 dummy listings)

SIGNUP (/signup)
├── Benefits sidebar
└── Form (name, email, phone, city, user type)
    → Stores to Airtable/Supabase

LIST YOUR SPACE (/list-your-space)
├── Benefits sidebar
└── Form (contact, location, property type, amenities, description, photos)
    → Stores to Airtable/Supabase

SUPPORT CAMPIN (/support)
├── Hero section
├── Payment methods (Razorpay, Patreon, UPI)
├── Transparency section
└── Community story
```

---

## 3. PAGE SPECIFICATIONS

### 🏠 HOME PAGE

#### Section 1: Navigation
- Logo (🏕️ CampIn) → links to /
- Links: Explore → /explore, List Your Space → /list-your-space, Support → /support
- CTA button: "Sign Up" → /signup
- Sticky on scroll, white bg with blur backdrop
- Mobile: Hamburger menu with slide-down panel

#### Section 2: Hero
- Full viewport height
- Background: Immersive camping photo with gradient overlay
- Left side: Text content
  - Label: "India's Camping Platform" (orange, uppercase, small)
  - H1: "Wake up to views, not hotel bills." (white, bold, 56–72px)
  - Subtext: "Discover campsites on farms, terraces, and forests across India. Find safe stops for your campervan. Sleep under a billion stars." (white/80%, 18–20px)
  - Dual CTAs:
    - Primary: "Explore Camps" → /explore (orange bg, white text)
    - Secondary: "List Your Space" → /list-your-space (ghost button)

#### Section 3: Camping Categories
- 5 cards in a row (responsive grid)
- Each card: Emoji icon + Title + Description + Count + hover effect
- Cards: Terrace, Farm, Forest, Campervan Stops, Car Camping
- Background: white

#### Section 4: How CampIn Works
- 3 columns: Discover → Connect → Camp
- Each: Step number (orange) + Icon + Title + Description
- Background: off-white

#### Section 5: Featured Listings
- 4 listing cards in grid (from dummy data)
- "View All" link → /explore
- Background: white

#### Section 6: Campervan & Road Travel
- Dark section (forest green bg)
- Split: Text left, feature icons right
- H2: "India's first campervan stop directory"
- 6 feature tiles: Safe Parking, Electricity, Water, Washroom, Verified Safe, GPS
- CTA: "Find Road Stops" → /explore?type=campervan

#### Section 7: Host CTA
- Split: Image left, text right
- H2: "Turn your land into an experience"
- CTA: "List Your Space" → /list-your-space
- Supporting badges: Free to list, Keep 90%, Personal support

#### Section 8: Trust & Safety
- 5 trust point cards in a row
- Each: Icon + Title + Description
- Points: Verified Hosts, Real Reviews, Direct Contact, Community Built, Safe Stops

#### Section 9: Community / Mission
- Centered text block
- H2: "Building India's outdoor culture, one campsite at a time"
- Emotional copy about the mission
- Dual CTAs: "Join the Community" + "Support Our Mission"

#### Section 10: Support CTA Banner
- Rounded card with forest green tint
- "Support CampIn's Mission" headline
- Two CTA buttons: Razorpay + Patreon

#### Footer
- Forest green background
- 4 columns: Brand, Discover, Host, Community
- Bottom: Copyright + tagline

---

### 🔍 EXPLORE PAGE

#### Hero
- Forest green background
- "Find your next campsite" headline
- Search bar (location/name/state)

#### Filter Bar (sticky below nav)
- Type buttons: All, Terrace, Farm, Forest, Campervan, Car Camping
- Expandable filters panel: Amenities checkboxes, Price range slider
- Result count

#### Listing Grid
- 4 columns on desktop, 2 on tablet, 1 on mobile
- Each card:
  - Image (16:9 ratio, hover zoom)
  - Price badge (top left)
  - Rating badge (top right)
  - Type badge (bottom left)
  - Title, Location (icon + text), Description (2 lines max)
  - Amenities tags (3 shown + "+N")
  - "View Details" button
- Empty state if no results

---

### 👤 SIGNUP PAGE

#### Layout: 2-column (content + form)

**Left: Content**
- "Join the Movement" label
- H1: "Be part of India's outdoor community"
- Description paragraph
- Benefits list (4 items with check icons)

**Right: Form Card**
- Fields: Full Name*, Email*, Phone, City, User Type (Camper/Host toggle)
- Submit button: "Join CampIn"
- Trust note with shield icon
- Success state: Checkmark + welcome message + CTAs

---

### 🏡 HOST YOUR LAND PAGE

#### Layout: 3-column (form spans 2, benefits sidebar)

**Benefits Sidebar (sticky)**
- Why host: Free to List, Keep 92%, India-first focus.
- Amenity Strategy: Add Fire Places, Washrooms, and local experiences to double your daily rate.
- Manual Acceptance: Every piece of land is reviewed for safety and quality.

**Form Card**
- Contact Information: Name*, Phone*, Email*
- Location Verification: **Exact Google Maps Pin Link* (Mandatory)**
- Property Type: 8 toggle buttons
- Amenities: Fire Place*, Washroom*, Water, Electricity, Parking, Signal, etc.
- Description: Focus on the "Disconnection Desire".
- Photos: **Actual Pictures of the Site* (Campers need to see exactly where they will sleep)**
- Submit: "Submit for Backend Review"
- Trust note: "Listing will be reviewed and accepted from the backend before going live."
- Success state

---

### 💛 SUPPORT PAGE

#### Hero (forest green bg)
- Heart icon, headline, emotional copy

#### Payment Methods
- 3 cards: Razorpay, Patreon, UPI Direct
- Each with icon, description, action button

#### Transparency Section
- "What your support enables" headline
- 4 cards: Host Verification, Community Tools, Safe Road Stops, Platform Development

#### Community Story
- Centered text about the mission
- CTAs: Join Community + Explore Campsites

---

## 4. DUMMY LISTINGS

| # | Title | Location | Type | Price | Image Theme |
|---|---|---|---|---|---|
| 1 | Living Root Bridge Terrace Camp | Cherrapunji, Meghalaya | Terrace | ₹1,200 | Mountain view |
| 2 | Coffee Estate Farm Stay | Madikeri, Coorg | Farm | ₹1,500 | Coffee plantation |
| 3 | Cedar Forest Hideout | Jibhi, Himachal Pradesh | Forest | ₹1,000 | Forest/mountains |
| 4 | Ganga Riverside Road Stop | Shivpuri, Uttarakhand | Campervan | ₹800 | Riverside |
| 5 | Aravalli Lakeside Camp | Badi Lake, Rajasthan | Car Camping | ₹1,300 | Lake/sunset |
| 6 | Apple Orchard Glade | Pahalgam, Kashmir | Farm | ₹1,800 | Orchard/mountains |
| 7 | Thar Desert Star Camp | Sam Sand Dunes, Rajasthan | Desert | ₹1,400 | Desert/dunes |
| 8 | Spiti Valley Base Camp | Kaza, Himachal Pradesh | Mountain | ₹900 | High altitude |

---

## 5. RESPONSIVE BREAKPOINTS

| Breakpoint | Width | Layout Changes |
|---|---|---|
| Mobile | < 640px | Single column, 16px padding, stacked CTAs, hamburger nav |
| Tablet | 640–1023px | 2 columns, 24px padding, condensed nav |
| Desktop | 1024–1279px | Full layout, 3–4 column grids |
| Large | 1280px+ | Max-width 1280px container, spacious padding |

---

## 6. POST-MVP FEATURES (Phase 2)

These are NOT in the MVP but planned for Months 6–12:
- Individual listing detail pages
- Real booking engine with Razorpay
- User authentication (Supabase Auth)
- Map integration (Mapbox)
- Review system
- Host dashboard
- Direct messaging
- Email notifications
- SEO content pages (city/state landing pages)

---

**Stay. Explore. CampIn. 🏕️**
