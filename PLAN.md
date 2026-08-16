# Sahin Cycle Store & Mechanical — Website Implementation Plan

> **Project:** Business + Local Store Website | Arar, Saudi Arabia
> **Stack:** Next.js 15 · React 19 · TypeScript · Tailwind CSS · shadcn/ui · Framer Motion · next-intl
> **Hosting:** Vercel | **Routing:** `/en` & `/ar` (RTL)

---

## Overview

A fast, SEO-optimised, bilingual (English/Arabic RTL) business website for a local bicycle shop in Arar, Saudi Arabia. The site showcases products, promotes repair services, builds trust, and funnels customers directly to WhatsApp for inquiries.

---

## Key Design Decisions & Improvements Over Draft

| Topic | Draft | Improved |
|---|---|---|
| Image strategy | Vague "images needed" | AI-generated placeholder images per section, replaced with real photos later |
| Data layer | No mention | Static typed JSON data files (`/src/data/`) with full TypeScript interfaces |
| WhatsApp integration | Button only | Pre-filled WhatsApp message templates per product/service |
| Fonts | Inter + Cairo | Loaded via `next/font` with `display: swap` — zero CLS |
| Icons | Lucide only | Lucide + custom SVG for cycling-specific icons |
| SEO | Basic metadata | Full Local Business JSON-LD, BreadcrumbList, Product schema, FAQ schema |
| Performance | Goals stated | Image component with `priority` prop on hero, WebP/AVIF via `next/image` |
| Accessibility | Not mentioned | ARIA labels, keyboard navigation, focus-visible rings, skip-link |
| 404 / Error pages | Not mentioned | Branded `not-found.tsx` & `error.tsx` per locale |
| Contact Form | Just "form" | React Hook Form + Zod + server action (no external API needed) |

---

## Folder Structure (Final)

```
src/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx             ← Root locale layout (font, dir, metadata)
│   │   ├── not-found.tsx
│   │   ├── error.tsx
│   │   ├── (marketing)/
│   │   │   ├── page.tsx           ← Home
│   │   │   ├── about/page.tsx
│   │   │   ├── products/
│   │   │   │   ├── page.tsx       ← Products listing
│   │   │   │   └── [slug]/page.tsx ← Product detail
│   │   │   ├── services/page.tsx
│   │   │   ├── gallery/page.tsx
│   │   │   └── contact/page.tsx
│   └── api/
│       └── contact/route.ts       ← Server Action / API route for form
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── MobileMenu.tsx
│   │   └── LanguageSwitcher.tsx
│   ├── home/
│   │   ├── HeroBanner.tsx
│   │   ├── CategoryCards.tsx
│   │   ├── FeaturedProducts.tsx
│   │   ├── ServicesPreview.tsx
│   │   ├── WhyChooseUs.tsx
│   │   ├── GalleryStrip.tsx
│   │   ├── Testimonials.tsx
│   │   ├── FAQSection.tsx
│   │   └── ContactCTA.tsx
│   ├── products/
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   ├── CategoryFilter.tsx
│   │   └── WhatsAppButton.tsx
│   ├── services/
│   │   ├── ServiceCard.tsx
│   │   └── ServiceList.tsx
│   ├── gallery/
│   │   ├── GalleryTabs.tsx
│   │   └── GalleryGrid.tsx
│   ├── contact/
│   │   ├── ContactForm.tsx
│   │   ├── ContactCard.tsx
│   │   └── MapEmbed.tsx
│   └── ui/                        ← shadcn/ui + custom primitives
├── messages/
│   ├── en.json
│   └── ar.json
├── lib/
│   ├── utils.ts
│   ├── whatsapp.ts               ← WhatsApp message builder
│   └── metadata.ts               ← Shared metadata helpers
├── hooks/
│   ├── useDirection.ts
│   └── useWhatsApp.ts
├── types/
│   ├── product.ts
│   ├── service.ts
│   └── testimonial.ts
├── data/
│   ├── products.ts
│   ├── services.ts
│   ├── testimonials.ts
│   └── faqs.ts
└── assets/
    ├── images/
    └── icons/
```

---

## Color Palette & Design Tokens

```
Primary:   #0F766E  (Teal — Trust, Nature)
Accent:    #F59E0B  (Amber — Energy, Action)
Dark:      #1E293B  (Slate 800)
Light:     #F8FAFC  (Slate 50)
White:     #FFFFFF
Muted:     #64748B  (Slate 500)
Error:     #EF4444
Success:   #22C55E
```

**Gradients:**
- Hero: `linear-gradient(135deg, #0F766E 0%, #1E293B 100%)`
- Card hover glow: `box-shadow: 0 0 0 2px #0F766E40`

---

## Phase-by-Phase Execution Plan

---

### ✅ Phase 1 — Project Initialization & Tooling

**Goal:** Working Next.js 15 project with all dependencies installed and configured.

**Steps:**
1. Bootstrap with `npx create-next-app@latest` — TypeScript, Tailwind, App Router, `src/` dir
2. Install dependencies:
   - `next-intl` — i18n routing
   - `framer-motion` — animations
   - `shadcn/ui` — component library
   - `react-hook-form` + `zod` — form validation
   - `embla-carousel-react` — carousels
   - `lucide-react` — icons
   - `clsx` + `tailwind-merge` — class utilities
3. Configure `tailwind.config.ts` — custom color tokens, fonts (Inter + Cairo via `next/font`)
4. Set up `prettier`, `eslint`, and `tsconfig.json` paths aliases (`@/`)
5. Set up folder structure scaffolding

**Deliverables:** Running dev server at `localhost:3000`

---

### ✅ Phase 2 — i18n & Routing Configuration

**Goal:** Bilingual routing with Arabic RTL and English LTR fully working.

**Steps:**
1. Configure `next-intl` middleware (`middleware.ts`) — detect locale, redirect root `/` to `/en`
2. Create `i18n.ts` with supported locales: `['en', 'ar']`, default: `'en'`
3. Create translation files:
   - `messages/en.json` — full English copy
   - `messages/ar.json` — full Arabic copy (all UI strings, nav, CTA, form labels)
4. Configure `[locale]/layout.tsx` to set `lang` and `dir` attributes dynamically:
   ```tsx
   <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
   ```
5. Create `useDirection` hook for conditional RTL-aware class logic
6. Verify `next-intl` `useTranslations()` hook works in both server & client components

**Translation Keys Structure:**
```json
{
  "nav": { "home": "", "about": "", "products": "", "services": "", "gallery": "", "contact": "" },
  "hero": { "headline": "", "subheadline": "", "ctaPrimary": "", "ctaSecondary": "" },
  "products": { "title": "", "filters": {}, "whatsappCta": "" },
  "services": {},
  "contact": { "form": {}, "info": {} },
  "footer": {},
  "common": { "readMore": "", "whatsapp": "", "phone": "", "address": "" }
}
```

**Deliverables:** `/en` and `/ar` routes working, RTL applied on Arabic

---

### ✅ Phase 3 — Global Layout: Navbar, Footer & Language Switcher

**Goal:** Consistent shell layout rendered on every page.

#### Navbar
- Logo (SVG + text "Sahin Cycle Store")
- Desktop navigation links (translated)
- Language switcher (`EN | العربية`) — switches locale preserving current path
- WhatsApp quick-contact button (sticky on mobile)
- Hamburger menu for mobile
- Scroll-aware: transparent on hero, solid `#1E293B` after 80px scroll (Framer Motion)
- Active link highlight with animated underline

#### Footer
- 4-column grid (desktop) / stacked (mobile)
  - Column 1: Logo + short description + social icons
  - Column 2: Quick Links
  - Column 3: Services list
  - Column 4: Contact info (phone, WhatsApp, address, hours)
- Bottom bar: Copyright + "Built with ❤️ in Saudi Arabia"
- RTL-safe flex direction

**Deliverables:** Responsive navbar and footer on all pages

---

### ✅ Phase 4 — Home Page

**Goal:** High-converting, visually stunning landing page.

#### Section 1: Hero Banner
- Full-viewport hero with a cycling-themed background image (AI-generated)
- Headline: "Your Trusted Bicycle Shop in Arar"
- Sub: "Sales · Repair · Refurbished · Kids Scooters"
- Two CTAs: "Browse Products" (primary, teal) + "WhatsApp Us" (accent, amber)
- Subtle floating bike SVG animation (Framer Motion)
- Scroll-down indicator

#### Section 2: Categories
- 6 cards in a responsive grid:
  1. New Bicycles 🚲
  2. Used Bicycles 🔄
  3. Refurbished 🔧
  4. Kids Bicycles 👶
  5. Baby Scooters 🛴
  6. Accessories ⚙️
- Hover: scale + teal border glow + icon animation

#### Section 3: Featured Products
- 4–6 product cards from `data/products.ts` (featured: true)
- "View All Products" CTA

#### Section 4: Mechanical Services Preview
- 3 service highlight cards with icon, title, description
- "View All Services" CTA

#### Section 5: Why Choose Us
- 4 trust pillars with animated counters:
  - 10+ Years Experience
  - 500+ Happy Customers
  - All Brands Serviced
  - Same-Day Repair
- Icons + short description per pillar

#### Section 6: Shop Gallery Strip
- Masonry/horizontal scroll strip of 6 shop photos
- "View Full Gallery" CTA

#### Section 7: Customer Testimonials
- Embla Carousel with 4–6 testimonial cards
- Star rating, customer name, short review
- Auto-play with pause on hover

#### Section 8: FAQ Accordion
- 6–8 frequently asked questions
- shadcn/ui Accordion component
- Schema-ready (FAQ JSON-LD added here)

#### Section 9: Contact CTA Banner
- Bold background (teal gradient)
- "Ready to get your bike fixed?" + WhatsApp CTA

#### Section 10: Google Map Embed
- Embedded iframe map for Arar, Saudi Arabia location
- Business hours table alongside

**Deliverables:** Complete Home page, all sections, animations, and responsive

---

### ✅ Phase 5 — Products Page

**Goal:** Filterable, WhatsApp-integrated product showcase.

#### Products Listing Page (`/[locale]/products`)
- Hero with page title
- Category filter bar (tabs or pill buttons):
  - All | New | Used | Refurbished | Kids | Scooters | Accessories
- Responsive product grid (3 cols desktop, 2 tablet, 1 mobile)
- Filter updates URL query param (`?category=kids`) for shareability & SEO

#### Product Card Component
```
┌─────────────────────┐
│   [Product Image]   │
│ Badge: Condition    │
├─────────────────────┤
│ Product Name        │
│ Category Tag        │
│ Price: SAR XXX      │
│ [WhatsApp Inquire]  │
└─────────────────────┘
```
- WhatsApp button pre-fills: `"Hello, I'm interested in [Product Name] (SAR XXX). Is it available?"`
- Hover: lift shadow + image zoom

#### Product Detail Page (`/[locale]/products/[slug]`)
- Large image gallery (Embla Carousel)
- Full description, specs, condition, price
- WhatsApp CTA (prominent)
- "Related Products" section
- Breadcrumb: Home > Products > Category > Product Name
- JSON-LD: Product schema (name, price, image, description)

#### Data Structure
```typescript
interface Product {
  id: string;
  slug: string;
  name: { en: string; ar: string };
  category: 'new' | 'used' | 'refurbished' | 'kids' | 'scooter' | 'accessory';
  condition: 'new' | 'used' | 'refurbished';
  price: number;
  currency: 'SAR';
  images: string[];
  description: { en: string; ar: string };
  featured: boolean;
  inStock: boolean;
}
```

**Deliverables:** Listing + Detail pages, filter, WhatsApp CTAs, Product schema

---

### ✅ Phase 6 — Services, Gallery, About & Contact Pages

#### Services Page (`/[locale]/services`)
- Hero section
- Grid of 7 service cards:
  1. Bicycle Repair
  2. Tire Replacement
  3. Brake Adjustment
  4. Gear Repair
  5. Wheel Alignment
  6. Chain Replacement
  7. Full Maintenance Package
- Each card: icon, title, short description, "Book via WhatsApp" button
- Process section: "How It Works" (3 steps: Drop Off → Diagnose → Pick Up)
- Pricing note (or "Contact for pricing")

#### Gallery Page (`/[locale]/gallery`)
- Tab navigation: Store | Workshop | Products | Repairs
- Masonry grid layout per tab
- Lightbox on image click (using a minimal lightbox pattern)
- AI-generated images as placeholders

#### About Page (`/[locale]/about`)
- Company story section (text + image)
- Timeline of milestones
- Mission & Vision cards
- Team/mechanic section
- Trust badges (Years in Business, Brands Serviced, etc.)

#### Contact Page (`/[locale]/contact`)
- Split layout: Form (left) + Info (right)
- **Contact Form** (React Hook Form + Zod):
  - Name, Phone, Email, Service (select), Message
  - Validation messages in current locale
  - Server Action submission (no external service needed initially)
- **Contact Card:**
  - 📞 Phone number (click-to-call)
  - 💬 WhatsApp (click-to-chat)
  - 📍 Address (link to Google Maps)
  - 🕐 Business Hours (table)
- Google Map embed (full width below the form/info)

**Deliverables:** All remaining pages complete

---

### ✅ Phase 7 — Animations & Responsive Polish

**Goal:** Smooth, premium feel across all devices.

**Framer Motion Animations:**
- Hero: Staggered fade-in (headline → subheadline → CTAs)
- Section entrance: `viewport: { once: true }` fade-up animations
- Category cards: hover scale + border glow
- Product cards: hover lift + subtle zoom on image
- Testimonial carousel: smooth drag
- Counters: animate from 0 to target when in viewport
- Navbar: background blur + opacity transition on scroll
- Mobile menu: slide-in drawer with backdrop

**Responsive Breakpoints:**
- Mobile: 320px–767px (single column, large touch targets)
- Tablet: 768px–1023px (2-column grids)
- Desktop: 1024px+ (full layout)

**RTL Responsive:**
- All flex/grid layouts mirror correctly in Arabic
- Margins/paddings use `ms-` / `me-` (margin-start/end) Tailwind utilities
- Icons that imply direction (arrows) flip with `rtl:rotate-180`

**Accessibility:**
- Skip to main content link
- All images have meaningful `alt` attributes (localised)
- Focus-visible rings on interactive elements
- ARIA labels on icon-only buttons (WhatsApp, Language Switcher)
- Reduced-motion: `@media (prefers-reduced-motion: reduce)` respected via Framer Motion

**Deliverables:** Polished UI with animations, fully responsive, RTL-correct

---

### ✅ Phase 8 — SEO Implementation

**Goal:** Lighthouse SEO 100, maximum local search visibility.

#### Metadata (per page)
```typescript
// lib/metadata.ts — generatePageMetadata(locale, page)
export const metadata: Metadata = {
  title: "Sahin Cycle Store | Bicycle Shop in Arar, Saudi Arabia",
  description: "Buy new, used & refurbished bicycles in Arar. Professional bicycle repair, tire replacement, brake & gear service. Kids scooters available.",
  keywords: ["cycle shop arar", "bicycle repair arar", "used bicycle saudi arabia", ...],
  openGraph: { title, description, images, locale },
  twitter: { card: 'summary_large_image', ... },
  alternates: {
    canonical: "https://sahincycle.sa/en",
    languages: { 'en': '/en', 'ar': '/ar' }
  }
}
```

#### JSON-LD Structured Data

**Local Business Schema** (in root layout):
```json
{
  "@context": "https://schema.org",
  "@type": "BikeStore",
  "name": "Sahin Cycle Store & Mechanical",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "...",
    "addressLocality": "Arar",
    "addressRegion": "Northern Borders",
    "addressCountry": "SA"
  },
  "telephone": "+966XXXXXXXXX",
  "openingHours": "Sa-Th 09:00-21:00",
  "geo": { "@type": "GeoCoordinates", "latitude": "...", "longitude": "..." },
  "url": "https://sahincycle.sa",
  "priceRange": "$$",
  "image": "...",
  "sameAs": ["https://wa.me/966XXXXXXXXX"]
}
```

**Additional Schemas:**
- `BreadcrumbList` — on Products and Services pages
- `FAQPage` — on Home FAQ section
- `Product` — on each product detail page
- `Service` — on Services page

#### `robots.txt` & `sitemap.xml`
- Dynamic sitemap via Next.js `sitemap.ts` — all pages in both locales
- `robots.txt` allowing all crawlers, pointing to sitemap

#### `hreflang` Tags
- `<link rel="alternate" hreflang="en" href="...">` and `hreflang="ar"` on every page
- `hreflang="x-default"` pointing to `/en`

**Deliverables:** Full SEO metadata, JSON-LD, sitemap, hreflang, robots.txt

---

### ✅ Phase 9 — Performance Optimization

**Goal:** Lighthouse Performance 95+, Core Web Vitals green.

| Optimization | Implementation |
|---|---|
| Images | `next/image` with `priority` on hero, WebP/AVIF format |
| Fonts | `next/font/google` with `display: 'swap'`, preloaded |
| Code splitting | Dynamic imports for heavy components (Carousel, Lightbox, Map) |
| Bundle analysis | `@next/bundle-analyzer` to identify and trim bloat |
| CSS | Tailwind purge eliminates unused styles |
| Animations | `will-change: transform` only during animation, removed after |
| LCP | Hero image preloaded with `<link rel="preload">` |
| CLS | All images/embeds have explicit `width` & `height` |
| FID/INP | No blocking JS on initial load |
| Caching | `next.config.js` cache headers for static assets |

**Deliverables:** Lighthouse scores 95+, Core Web Vitals green

---

### ✅ Phase 10 — Testing, QA & Deployment

**Goal:** Live site on Vercel with custom domain.

#### Pre-Deployment Checklist
- [ ] All pages render correctly in `/en` and `/ar`
- [ ] RTL layout correct on all pages
- [ ] All WhatsApp buttons use correct phone number and message
- [ ] Contact form submits correctly
- [ ] All images load and have alt text
- [ ] No broken links or 404s
- [ ] Meta titles/descriptions unique per page
- [ ] JSON-LD validates on Google's Rich Results Test
- [ ] Sitemap accessible at `/sitemap.xml`
- [ ] robots.txt correct
- [ ] Mobile: test on 320px, 375px, 414px widths
- [ ] Cross-browser: Chrome, Firefox, Safari, Edge

#### Deployment
1. Push to GitHub repository
2. Connect to Vercel (auto-deploy on push)
3. Configure environment variables
4. Add custom domain (e.g., `sahincycle.sa`)
5. Enable Vercel Analytics
6. Submit sitemap to Google Search Console
7. Submit sitemap to Bing Webmaster Tools
8. Set up Google My Business (off-site, recommended)

---

## Open Questions

> **These need your input before or during development:**

1. **Phone / WhatsApp Number** — What is the business WhatsApp number? (needed for all CTA buttons)
2. **Real Address** — Exact street address in Arar for the map embed and schema
3. **Business Hours** — Opening and closing times per day
4. **Domain Name** — What domain will be used? (e.g., `sahincycle.sa` or `.com`)
5. **Real Photos** — Do you have product/store photos, or should I use AI-generated images as placeholders throughout?
6. **Products Data** — Do you have a list of actual products (names, prices, categories) to populate the site with?
7. **Language Review** — Will you review the Arabic translations for accuracy, or should a professional translator handle that?
8. **Google Maps** — Share the Google Maps link or coordinates for the embed
9. **Social Media** — Any Instagram, Snapchat, TikTok, or Twitter accounts to link?

---

## Phase Summary Table

| Phase | Description | Estimated Scope |
|---|---|---|
| 1 | Project Init & Tooling | Config files, dependencies |
| 2 | i18n & Routing | `/en` + `/ar` + RTL |
| 3 | Global Layout | Navbar + Footer |
| 4 | Home Page | 10 sections |
| 5 | Products Pages | Listing + Detail + Filter |
| 6 | Services, Gallery, About, Contact | 4 pages |
| 7 | Animations & Responsive Polish | Framer Motion, RTL, A11y |
| 8 | SEO | Metadata, JSON-LD, Sitemap |
| 9 | Performance | Lighthouse 95+ |
| 10 | Testing & Deployment | Vercel + Domain |

---

> Each phase is designed to be executed sequentially. Review and approve each phase before moving to the next to ensure the build matches your expectations. Real photos and business data can be added anytime — AI-generated placeholders will be used in the meantime.
