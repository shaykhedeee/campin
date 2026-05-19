# 🛠️ CAMPIN — TECH STACK: SCALABLE MARKETPLACE ARCHITECTURE

## 1. THE "DREAM TEAM" STACK (2026)
This stack is chosen for **speed-to-market**, **SEO dominance**, and **cost-efficiency**.

### 1.1 Frontend: Next.js 15+ (App Router)
- **Why:** Best-in-class SEO (crucial for camping search terms), Server-Side Rendering (SSR) for fast listing loads, and seamless React integration.
- **Styling:** Tailwind CSS + Shadcn UI (Customized for "Nature-First" aesthetic).
- **Animations:** Framer Motion (for premium, liquid page transitions).

### 1.2 Backend-as-a-Service: Supabase
- **Database:** PostgreSQL with PostGIS (Essential for location-based search and "near me" features).
- **Auth:** Built-in Social login + Phone OTP (High priority for the Indian market).
- **Real-time:** Live booking notifications and messaging between campers/hosts.

### 1.3 Mapping & Location: Mapbox GL JS
- **Why:** Much more customizable than Google Maps. We can create a "National Geographic" style map that fits the CampIn brand.
- **Features:** Geofencing (know when a camper arrives), custom marker icons (Van vs. Tent).

### 1.4 Payments: Razorpay (Standard for India)
- **UPI Deep Integration:** 90% of bookings will happen via UPI.
- **Razorpay Route:** Automatically split payments—Host gets 90%, CampIn gets 10%—reducing accounting overhead.

---

## 2. INFRASTRUCTURE & OPS
- **Hosting:** Vercel (Optimized for Next.js).
- **Image CDN:** Cloudinary (On-the-fly image optimization for mobile users in low-signal areas).
- **Analytics:** 
  - **PostHog:** Privacy-first product analytics & session recordings.
  - **GA4:** For SEO/Traffic tracking.
- **Emails/SMS:** 
  - **Resend:** For clean transactional emails.
  - **Twilio/MessageBird:** For OTP and booking alerts via WhatsApp.

---

## 3. SCALABILITY PLAN
- **Phase 1:** Monolithic Next.js app + Supabase.
- **Phase 2 (Mobile):** Progressive Web App (PWA) + React Native for iOS/Android apps using the same Supabase backend.
- **Phase 3:** Edge functions for high-performance searching in remote regions.

---

## 4. AI-ASSISTED DEVELOPMENT
- **Editor:** Cursor (AI-native IDE).
- **Prompts:** Use specialized `AGENT_INSTRUCTIONS.md` to ensure the AI writes code following the "CampIn Design System."
