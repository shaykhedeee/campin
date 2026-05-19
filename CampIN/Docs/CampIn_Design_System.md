# 🎨 CAMPIN — DESIGN SYSTEM

> Component rules, spacing, interactions, and visual patterns

---

## 1. DESIGN PHILOSOPHY

CampIn must feel like: **Standing at a forest edge at sunrise. Calm. Warm. Expansive. Real.**

Inspired by:
- **Airbnb:** Clean layouts, trust-first UX, simple flows
- **Patagonia:** Storytelling through nature, authentic photography
- **Notion:** Whitespace, readability, minimal clutter

With an **Indian outdoor identity** — terracotta, forest greens, golden harvest light, misty Himalayan mornings, Western Ghats mist.

---

## 2. COMPONENT RULES

### Cards
- Border radius: 16px (rounded-2xl)
- Shadow: `0 4px 24px rgba(0,0,0,0.08)` or `shadow-sm`
- Hover: subtle lift (-translate-y-1) + shadow increase
- Image: 60% card height, object-cover, hover scale 1.05 (500ms transition)
- Padding: 20px (p-5)
- Background: white on offwhite, offwhite on white

### Buttons
- **Primary:** Forest Green bg (#1F3D2B), White text, 12px radius (rounded-xl)
  - Hover: Lighter green (#2A5239), shadow increase
  - Padding: py-3.5 px-7
- **Secondary:** White bg, Green text, Green border (border-forest/20)
  - Hover: bg-gray-50
- **Ghost:** Transparent, green text
  - Hover: bg-forest/5
- **Orange CTA:** Orange bg (#E67E22), White text
  - Hover: Lighter orange (#F0A04B)
- No sharp corners. No heavy gradients. No 3D effects.
- Font: 16px (text-base), Bold (font-semibold), Inter

### Input Fields
- Background: offwhite (#F7F5F2)
- Border: transparent default, forest/30 on focus
- Border radius: 12px (rounded-xl)
- Padding: py-3 pl-11 pr-4 (with icon), py-3 px-4 (without)
- Focus: border-forest/30, bg-white, outline-none
- Placeholder: text-grey/50

### Tags / Badges
- Small: text-xs, px-2.5 py-0.5/1, rounded-lg/full
- Background: forest/5 for green tags, offwhite for neutral
- Active/Selected: bg-forest text-white
- Rating badge: bg-forest/90, white text, orange star

### Navigation
- Fixed top, bg-white/90, backdrop-blur
- Height: 64px mobile, 80px desktop
- Border bottom: border-gray-100
- Logo left, links center-right, CTA button right
- Mobile: Hamburger → slide-down panel

### Footer
- Background: Forest Green
- Text: white, white/70 for secondary
- 4-column grid (Brand, Discover, Host, Community)
- Bottom bar: copyright left, tagline right

---

## 3. SPACING SYSTEM (8px grid)

| Element | Spacing |
|---|---|
| Section padding vertical | 80px mobile, 112px desktop (py-20 sm:py-28) |
| Section padding horizontal | 16px mobile, 24px tablet, 32px desktop |
| Card gap | 24px (gap-6) |
| Card internal padding | 20px (p-5) or 32px (p-8) |
| Max content width | 1280px (max-w-7xl) |
| Mobile page padding | 16px (px-4) |
| Between sections | Consistent 80-112px (no variation) |
| Between elements in card | 16px (space-y-4) |
| Form field spacing | 20px (space-y-5) |

---

## 4. ANIMATION & INTERACTION

### Allowed Animations
- **Fade up on scroll:** opacity 0→1, translateY 20px→0, 0.6s ease-out
- **Hover lift:** translateY 0→-4px, 0.3s ease
- **Image hover zoom:** scale 1→1.05, 0.5s ease
- **Mobile menu:** Fade in, 0.3s ease-out
- **Button hover:** Background color change, 0.2s ease
- **Color transitions:** All color changes, 0.2s ease

### NOT Allowed
- Bounce animations
- Spin effects
- Flash/pulse effects
- Parallax scrolling
- Heavy JavaScript animations
- Auto-play video
- Anything that slows page load

---

## 5. RESPONSIVE RULES

### Grid Breakpoints
| Component | Mobile | Tablet | Desktop |
|---|---|---|---|
| Category cards | 1 column | 2 columns | 5 columns |
| Listing cards | 1 column | 2 columns | 4 columns |
| Feature grid | 2 columns | 3 columns | 5 columns |
| Form layout | 1 column | 1 column | 2-3 columns |
| Hero text | Full width | Full width | Max 600px |

### Typography Scaling
| Element | Mobile | Desktop |
|---|---|---|
| H1 | 36px (text-4xl) | 64px (text-6xl xl:text-7xl) |
| H2 | 28px (text-3xl) | 48px (text-4xl lg:text-5xl) |
| Body | 16px (text-base) | 18px (text-lg) |

### Mobile-Specific
- Single column layouts
- Hamburger navigation
- Stacked CTAs (full width)
- Simplified filters
- Larger touch targets (min 44px)
- No hover effects (touch only)

---

## 6. IMAGE SPECIFICATIONS

### Sizes by Usage
| Usage | Aspect Ratio | Min Width | Format |
|---|---|---|---|
| Hero background | 16:9 | 1600px | WebP/JPG |
| Listing card | 4:3 | 800px | WebP/JPG |
| Category card | Any | 400px | WebP/JPG |
| Host photo | 1:1 | 400px | WebP/JPG |
| OG image | 1.91:1 | 1200px | JPG |

### Optimization
- WebP preferred (JPG fallback)
- Max 200KB per image
- Lazy loading on all non-hero images
- srcset for responsive images
- Object-fit: cover for all card images

---

**Stay. Explore. CampIn. 🏕️**
