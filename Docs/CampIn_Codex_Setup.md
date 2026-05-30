# 🤖 CAMPIN — CODEX SETUP GUIDE

> Instructions for setting up and managing the CampIn project using OpenAI Codex CLI

---

## 1. PROJECT OVERVIEW

**CampIn** is India's community-first camping platform — "The Airbnb for Camping in India."

- **Repository:** CampIn website + application
- **Tech Stack:** React 19, Vite 7, TypeScript, Tailwind CSS 4, React Router DOM
- **Current State:** MVP website with 5 pages (Home, Explore, Signup, List Your Space, Support)
- **Next Phase:** Migrate to Next.js + Supabase for full marketplace functionality

---

## 2. QUICK START FOR CODEX

### Key Files to Read First
1. `docs/CampIn_Master_Brief.md` — Full business context and vision
2. `docs/CampIn_Product_Specification.md` — What to build
3. `docs/CampIn_Tech_Stack.md` — Architecture and database schema
4. `docs/CampIn_Page_Copy.md` — All approved text for every page
5. `docs/CampIn_Design_System.md` — Visual rules and component patterns

### Project Structure
```
src/
├── App.tsx                    # Main app with React Router
├── main.tsx                   # Entry point
├── index.css                  # Tailwind + custom styles + design tokens
├── components/
│   ├── Navbar.tsx             # Sticky nav with mobile menu
│   └── Footer.tsx             # 4-column footer
├── pages/
│   ├── Home.tsx               # Landing page (10 sections)
│   ├── Explore.tsx            # Listing discovery with filters
│   ├── Signup.tsx             # User signup form
│   ├── ListYourSpace.tsx      # Host application form
│   └── Support.tsx            # Community funding page
├── data/
│   └── listings.ts            # 8 dummy listings + categories
docs/                          # All strategic documents
```

### Design Tokens (in index.css)
```css
--color-forest: #1F3D2B;       /* Primary: headers, buttons, CTAs */
--color-forest-light: #2A5239; /* Hover states */
--color-orange: #E67E22;       /* Accent: highlights, tags, stars */
--color-offwhite: #F7F5F2;     /* Background: page bg */
--color-textgrey: #5F5F5F;     /* Body text */
--color-textdark: #2D2D2D;     /* Primary text */
--font-sans: "Inter", system-ui, sans-serif;
```

---

## 3. COMMON CODEX TASKS

### Task: Add a New Page
```
Create a new page at src/pages/PrivacyPolicy.tsx that:
- Uses the CampIn design system (forest, orange, offwhite colors)
- Has a white background with max-w-4xl centered content
- Includes placeholder sections for: Introduction, Data Collection, 
  Data Usage, Your Rights, Contact Information
- Uses Inter font, text-textgrey for body, text-forest for headings
- Is mobile responsive (single column on mobile)
- Follows the same page layout pattern as src/pages/Support.tsx
- Add route to src/App.tsx at path "/privacy"
```

### Task: Connect Form to Supabase
```
Modify src/pages/Signup.tsx to submit form data to Supabase:
- Install @supabase/supabase-js
- Create src/lib/supabase.ts with client initialization
- On form submit, insert into 'user_signups' table
- Keep the existing success state UI
- Add error handling with a friendly message
- Use environment variable NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
```

### Task: Add Listing Detail Page
```
Create a new page at src/pages/ListingDetail.tsx that:
- Takes listing ID from URL params (react-router useParams)
- Finds listing from data/listings.ts by ID
- Shows: Full-width hero image, title, location with MapPin icon, 
  price, description, amenities grid, host info placeholder
- Has a "Request to Book" CTA button (disabled with "Coming Soon" text)
- Mobile responsive
- Add route "/listing/:id" in App.tsx
- Make listing cards in Explore.tsx link to detail pages
```

### Task: Add Map to Explore Page
```
Add a map view to src/pages/Explore.tsx:
- Install react-map-gl and mapbox-gl
- Add a toggle between "List" and "Map" view
- Map view shows markers for each listing using their coordinates
- Clicking a marker shows a popup with listing title, price, and "View" link
- Use Mapbox style: mapbox://styles/mapbox/outdoors-v12
- Make the map responsive (full width, 400px height)
```

### Task: Implement SEO Meta Tags
```
Add dynamic SEO meta tags to all pages:
- Create src/components/SEO.tsx that sets document.title and meta tags
- Each page should have unique title, description, and OG image
- Use the titles and descriptions from docs/CampIn_SEO_Strategy.md
- Add Helmet or use document.title + meta tag manipulation
```

---

## 4. CODE CONVENTIONS

### File Naming
- Pages: PascalCase (Home.tsx, Explore.tsx)
- Components: PascalCase (Navbar.tsx, ListingCard.tsx)
- Data: camelCase (listings.ts)
- Utilities: camelCase (cn.ts)

### Component Pattern
```tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IconName } from 'lucide-react';

export default function ComponentName() {
  return (
    <div className="min-h-screen bg-offwhite pt-20 sm:pt-24">
      {/* Content */}
    </div>
  );
}
```

### Styling Rules
- Use Tailwind utility classes only (no custom CSS except in index.css)
- Mobile-first: base styles for mobile, sm: for tablet, lg: for desktop
- Use CampIn design tokens: text-forest, bg-offwhite, text-orange, etc.
- Rounded corners: rounded-xl for buttons/inputs, rounded-2xl for cards
- Shadows: shadow-sm default, shadow-md for buttons, shadow-xl for hover

### Import Order
1. React hooks
2. Router (Link, useLocation, etc.)
3. External libraries (lucide-react)
4. Internal data imports
5. Internal component imports

---

## 5. ENVIRONMENT SETUP

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Required Environment Variables (for Phase 2)
```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_RAZORPAY_KEY_ID=
VITE_MAPBOX_TOKEN=
```

---

## 6. WHAT TO BUILD NEXT (Priority Order)

### Immediate (Week 1)
1. [ ] Privacy Policy and Terms of Service pages
2. [ ] Connect signup form to Supabase/Airtable
3. [ ] Connect host form to Supabase/Airtable
4. [ ] Add email notification on form submission
5. [ ] Listing detail page

### Short-term (Month 1)
6. [ ] Map integration on Explore page
7. [ ] Real Supabase database setup
8. [ ] User authentication (email + phone OTP)
9. [ ] Admin dashboard for reviewing host applications
10. [ ] SEO optimization (meta tags, sitemap, structured data)

### Medium-term (Month 2-3)
11. [ ] Booking request flow
12. [ ] Razorpay payment integration
13. [ ] Email notification system (Resend)
14. [ ] Host dashboard (manage listings, bookings)
15. [ ] Review system (post-stay)
16. [ ] Blog section for SEO content

---

**Stay. Explore. CampIn. 🏕️**
