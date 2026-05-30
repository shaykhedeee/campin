# ⚙️ CAMPIN — TECH STACK & ARCHITECTURE

> Full technology decisions for building and scaling CampIn

---

## 1. CURRENT MVP STACK

| Layer | Technology | Why |
|---|---|---|
| Framework | React + Vite + TypeScript | Fast, modern, excellent DX, AI-friendly |
| Styling | Tailwind CSS 4 | Utility-first, rapid iteration, consistent design |
| Routing | React Router DOM | Standard React routing, simple setup |
| Icons | Lucide React | Clean, consistent, tree-shakeable icons |
| Deployment | Vite single-file build | Static hosting, fast loads, simple deployment |

---

## 2. PHASE 2 STACK (Months 6–12)

### Frontend
| Layer | Technology | Why |
|---|---|---|
| Framework | **Next.js 14+ (App Router)** | SEO-friendly SSR/SSG, fast, scalable for marketplace |
| Component Library | **shadcn/ui + Tailwind CSS** | Clean, minimal, fast to build with AI tools |
| State Management | **Zustand** | Simple, lightweight, works great with React |
| Maps | **Mapbox GL JS** | Beautiful, customizable, fits CampIn's aesthetic |
| Image Optimization | **Cloudinary** | Automatic WebP, responsive sizes, lazy loading |

### Backend
| Layer | Technology | Why |
|---|---|---|
| Database | **Supabase (PostgreSQL)** | Open-source Firebase, real-time DB, auth, storage, generous free tier |
| Auth | **Supabase Auth** | Email + Phone OTP (critical for India), social login |
| File Storage | **Supabase Storage + Cloudinary** | Image uploads, optimization, CDN delivery |
| API | **Next.js API Routes / Server Actions** | Seamless full-stack, no separate backend needed |
| Real-time | **Supabase Realtime** | Chat, notifications, live booking updates |

### Payments
| Tool | Use |
|---|---|
| **Razorpay** | India's best payment gateway. UPI, cards, wallets, net banking |
| **Razorpay Route** | Split payments between host and CampIn automatically |

### Forms (MVP → Phase 2 transition)
| Tool | Use |
|---|---|
| **Tally Forms** (MVP) | Fastest form creation, connects to Airtable natively |
| **Supabase** (Phase 2) | Direct database writes, real-time, no form service needed |

### Analytics
| Tool | Use | Cost |
|---|---|---|
| **Google Analytics 4** | Traffic, conversions, user behavior | Free |
| **Microsoft Clarity** | Heatmaps + session recordings | Free |
| **PostHog** | Product analytics, funnel analysis | Free tier excellent |

### Email
| Tool | Use |
|---|---|
| **Resend** | Transactional emails (welcome, booking confirmations) |
| **Mailchimp** (later) | Marketing emails, newsletters, drip campaigns |

---

## 3. DATABASE SCHEMA (SUPABASE)

```sql
-- USERS TABLE
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  user_type TEXT CHECK (user_type IN ('camper', 'host', 'both')),
  city TEXT,
  verified BOOLEAN DEFAULT false,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- LISTINGS TABLE
CREATE TABLE listings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  host_id UUID REFERENCES users(id),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  location TEXT NOT NULL,
  state TEXT NOT NULL,
  lat DECIMAL(10, 8),
  lng DECIMAL(11, 8),
  description TEXT,
  type TEXT CHECK (type IN ('terrace', 'farm', 'forest', 'campervan', 'car-camping', 'lakeside', 'desert', 'orchard', 'other')),
  price_per_night INTEGER,
  washroom BOOLEAN DEFAULT false,
  electricity BOOLEAN DEFAULT false,
  water BOOLEAN DEFAULT false,
  parking BOOLEAN DEFAULT false,
  campervan_friendly BOOLEAN DEFAULT false,
  tent_allowed BOOLEAN DEFAULT true,
  campfire_allowed BOOLEAN DEFAULT false,
  local_food BOOLEAN DEFAULT false,
  mobile_signal BOOLEAN DEFAULT false,
  pet_friendly BOOLEAN DEFAULT false,
  images TEXT[] DEFAULT '{}',
  tags TEXT[] DEFAULT '{}',
  amenities TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'paused', 'inactive')),
  featured BOOLEAN DEFAULT false,
  avg_rating DECIMAL(2, 1),
  review_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- BOOKINGS TABLE
CREATE TABLE bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  listing_id UUID REFERENCES listings(id),
  camper_id UUID REFERENCES users(id),
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  guests INTEGER DEFAULT 1,
  total_price INTEGER NOT NULL,
  host_payout INTEGER NOT NULL,
  commission INTEGER NOT NULL,
  service_fee INTEGER NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'active', 'completed', 'cancelled')),
  payment_id TEXT,
  razorpay_order_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- REVIEWS TABLE
CREATE TABLE reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_id UUID REFERENCES bookings(id),
  listing_id UUID REFERENCES listings(id),
  reviewer_id UUID REFERENCES users(id),
  rating INTEGER CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- HOST APPLICATIONS (for MVP lead capture)
CREATE TABLE host_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  location TEXT NOT NULL,
  state TEXT,
  property_type TEXT,
  amenities TEXT[] DEFAULT '{}',
  description TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'reviewing', 'approved', 'rejected')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- USER SIGNUPS (for MVP lead capture)
CREATE TABLE user_signups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  user_type TEXT DEFAULT 'camper',
  city TEXT,
  source TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 4. API ENDPOINTS (PHASE 2)

```
# Listings
GET    /api/listings              → List all active listings (with filters)
GET    /api/listings/:id          → Get single listing detail
POST   /api/listings              → Create new listing (host only)
PUT    /api/listings/:id          → Update listing (host only)
DELETE /api/listings/:id          → Deactivate listing

# Bookings
GET    /api/bookings              → List user's bookings
POST   /api/bookings              → Create booking request
PUT    /api/bookings/:id          → Update booking status
POST   /api/bookings/:id/cancel   → Cancel booking

# Reviews
POST   /api/reviews               → Create review (post-stay)
GET    /api/listings/:id/reviews  → Get listing reviews

# Users
GET    /api/users/me              → Get current user profile
PUT    /api/users/me              → Update profile
POST   /api/auth/signup           → Register
POST   /api/auth/login            → Login
POST   /api/auth/otp              → Send OTP

# Host Applications
POST   /api/host-applications     → Submit host form (MVP)
GET    /api/host-applications     → List applications (admin)

# Search
GET    /api/search                → Search listings (location, type, amenities)
```

---

## 5. ENVIRONMENT VARIABLES

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key

# Razorpay
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Mapbox
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token

# Resend (Email)
RESEND_API_KEY=your_resend_key

# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_CLARITY_PROJECT_ID=your_clarity_id

# App
NEXT_PUBLIC_APP_URL=https://campin.co.in
NEXT_PUBLIC_APP_NAME=CampIn
```

---

## 6. AI DEVELOPMENT WORKFLOW

### Tools for Solo Developer
| Tool | Purpose |
|---|---|
| **Cursor** | AI-powered code editor, 10x development speed |
| **v0.dev** (Vercel) | Generate UI components from text prompts |
| **Claude** | Architecture, debugging, code generation |
| **GitHub Copilot** | In-editor AI assistance |
| **ChatGPT** | Alternative code generation, copy writing |

### Development Workflow
1. Design in Figma first (visual reference)
2. Use v0.dev to generate component stubs from descriptions
3. Refine in Cursor with AI assistance
4. Test locally with `npm run dev`
5. Build and deploy

---

## 7. DEPLOYMENT STRATEGY

### MVP (Current)
- Static build via Vite
- Single HTML file deployment
- No server needed

### Phase 2
- **Vercel** (primary) — optimized for Next.js, edge functions, automatic deployments
- **Supabase** — hosted database, auth, storage
- **Cloudinary** — image CDN and optimization
- **Domain:** campin.co.in (primary), campin.in (redirect)

### Performance Targets
- Lighthouse Performance: 90+
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Time to Interactive: < 3s
- Cumulative Layout Shift: < 0.1

---

**Stay. Explore. CampIn. 🏕️**
