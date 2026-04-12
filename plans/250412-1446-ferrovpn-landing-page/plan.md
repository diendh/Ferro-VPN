---
title: "Ferro VPN Landing Page — Full Marketing Site"
description: "Astro 6 + Tailwind 4 + Alpine.js landing site: Home, Features, Pricing, FAQ — bilingual EN/VI"
status: pending
priority: P1
effort: 40h
branch: pay-ui
tags: [landing-page, astro, tailwind, react, i18n, seo]
created: 2026-04-12
---

# Ferro VPN Landing Page — Implementation Plan

## Summary

Build a full marketing site (4 pages) as a sibling project at `/Users/tom/Documents/ferrovpn-landing/`. Astro 5 SSG with Tailwind CSS 4 and React islands for interactive components. Bilingual EN/VI with URL-based routing. Deployed as static site to Vercel/Cloudflare Pages.

---

## Data Flows

```
[User visits /] --> [Root redirect: Accept-Language --> /en/ or /vi/]
        |
        v
[/en/*, /vi/* routes] --> [Astro page] --> [i18n JSON + content collections]
        |                      |
        v                      v
[Static HTML]            [React islands hydrate on interaction]
   (zero JS)               (MobileMenu, PricingToggle, SpeedGauge, LangSwitcher)
        |
        v
[CDN] --> [User browser] --> [App Store / Play Store (CTA links)]
```

**i18n data flow:**
```
src/i18n/en.json, vi.json        -- UI strings
src/content/faq/en/*.yaml        -- FAQ content collections per language
src/content/faq/vi/*.yaml
src/config/servers.ts            -- Server list data (static, curated)
src/config/pricing.ts            -- Plan details (static, mirrors RevenueCat)
```

**Asset pipeline:**
```
vpn-flutter/assets/svgs/logo.svg     --> copy + optimize --> src/assets/logo.svg
vpn-flutter/assets/images/world_map.png --> optimize --> src/assets/world_map.webp
vpn-flutter/assets/icons/*.svg       --> selective reuse in Feature sections
```

---

## Dependency Graph

```
Phase 0: Scaffold + Config
    |
Phase 1: Design System + Layout
    |
Phase 2: i18n + Content Infrastructure
    |
    +----> Phase 3: Home Page (12 sections)
    |            |
    +----> Phase 4: Features Page (7 sections)
    |            |
    +----> Phase 5: Pricing Page (5 sections)
    |            |
    +----> Phase 6: FAQ Page (3 sections)
                 |
Phase 7: SEO + Performance + Deploy
```

Phases 3-6 are independent once Phase 2 lands. They can be parallelized across developers or AI agents.

---

## Phase 0: Scaffold + Configuration (2h)

### Deliverables

Scaffold Astro project with all tooling configured, design tokens in place.

### Files to Create

```
ferrovpn-landing/
├── astro.config.mjs                    # Astro config: react(), sitemap(), tailwind via Vite
├── tailwind.config.mjs                 # Tailwind 4 config: custom colors, fonts, spacing
├── tsconfig.json                       # Strict TS config
├── package.json                        # Deps: astro, @astrojs/react, @astrojs/sitemap, tailwindcss, react, react-dom
├── public/
│   ├── favicon.svg                     # Ferro shield icon (reuse from Flutter favicon)
│   ├── og-image.png                    # 1200x630 OG image (placeholder, finalize in Phase 7)
│   └── robots.txt                      # Allow all, sitemap reference
├── src/
│   └── styles/
│       └── global.css                  # Tailwind directives + CSS custom properties
└── .gitignore
```

### Design Tokens (in `global.css`)

```css
:root {
  /* Dark theme (default) */
  --color-bg: #0A0B0E;
  --color-surface: #111318;
  --color-surface-hover: #1A1D24;
  --color-brand: #3B82F6;
  --color-brand-violet: #8B5CF6;
  --color-text: #F1F5F9;
  --color-text-secondary: #94A3B8;
  --color-text-tertiary: #475569;
  --color-success: #22C55E;
  --color-warning: #F59E0B;
  --color-error: #EF4444;
  --color-border: #1E293B;

  /* Gradients */
  --gradient-brand: linear-gradient(135deg, #3B82F6, #8B5CF6);

  /* Typography */
  --font-sans: 'Inter Variable', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* Fluid scale */
  --text-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);
  --text-sm: clamp(0.875rem, 0.8rem + 0.375vw, 1rem);
  --text-base: clamp(1rem, 0.92rem + 0.4vw, 1.125rem);
  --text-lg: clamp(1.125rem, 1rem + 0.625vw, 1.375rem);
  --text-xl: clamp(1.25rem, 1rem + 1.25vw, 1.75rem);
  --text-2xl: clamp(1.5rem, 1rem + 2.5vw, 2.5rem);
  --text-hero: clamp(2.5rem, 1.5rem + 5vw, 5rem);

  /* Spacing */
  --space-section: clamp(4rem, 3rem + 5vw, 8rem);

  /* Animation */
  --duration-fast: 150ms;
  --duration-normal: 300ms;
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
}
```

### Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Tailwind 4 + Astro 5 compat issue | Low | Medium | Pin exact versions tested together |
| Font loading FOUT | Medium | Low | `font-display: swap` + preload critical weights |

### Rollback

Delete `ferrovpn-landing/` directory. No shared state.

---

## Phase 1: Design System + Layout Components (4h)

### Deliverables

Reusable UI primitives + Header + Footer + Base Layout. All components functional with design tokens.

### Files to Create

```
src/
├── components/
│   ├── ui/
│   │   ├── Button.astro              # Primary (gradient), Secondary (outline), Ghost variants; sizes sm/md/lg
│   │   ├── Card.astro                # Surface card with subtle border, hover lift
│   │   ├── Badge.astro               # Small label: "Popular", "Best Value", "New"
│   │   ├── Container.astro           # Max-width wrapper: max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
│   │   ├── GradientText.astro        # Gradient span for headings
│   │   ├── SectionHeading.astro      # Eyebrow + H2 + subtitle pattern
│   │   └── Icon.astro                # SVG icon component
│   ├── layout/
│   │   ├── Header.astro              # Fixed nav: logo, page links, lang switcher, CTA button
│   │   ├── Footer.astro              # 4-col footer: Product, Resources, Legal, Social + copyright
│   │   ├── Layout.astro              # <html> shell: meta, fonts, global CSS, Header/Footer slot
│   │   └── SEO.astro                 # Reusable head component: title, desc, OG, hreflang, structured data
│   └── islands/
│       └── MobileMenu.tsx            # React: slide-out mobile nav with backdrop
└── assets/
    ├── logo.svg                      # Optimized from vpn-flutter/assets/svgs/logo.svg
    └── logo-wordmark.svg             # Logo + "Ferro VPN" text (new, derived from logo)
```

### Component Details

**Header.astro**:
- Fixed top, `backdrop-filter: blur(12px)` glass effect
- Desktop: logo left, nav links center (Home/Features/Pricing/FAQ), lang switcher + CTA right
- Mobile: logo left, hamburger right; opens MobileMenu island
- Active link indicator based on current path
- Transparent on hero, solid on scroll (via IntersectionObserver in a small `<script>`)

**MobileMenu.tsx** (React island):
- Full-screen overlay with slide-from-right animation
- Nav links, language toggle, CTA button
- Close on backdrop click, Escape key, or route change
- `client:load` only on mobile breakpoint detection

**Footer.astro**:
- 4-column grid: Product (links), Resources (FAQ, Docs), Legal (Terms, Privacy), Social
- Language selector at bottom
- Copyright line: "2026 Ferro Security"

### Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Header scroll detection causes CLS | Low | High | Use `position: fixed` with placeholder spacer; test CLS rigorously |
| Mobile menu hydration flash | Medium | Medium | Render server-side hidden; hydrate for interaction only |

---

## Phase 2: i18n + Content Infrastructure (3h)

### Deliverables

Translation system with URL-based routing. JSON translation files. YAML content collections for FAQ. Root redirect logic.

### Files to Create

```
src/
├── i18n/
│   ├── config.ts                     # Supported languages, default language, route patterns
│   ├── utils.ts                      # t() helper, getLangFromUrl(), getLocalizedPath()
│   ├── en.json                       # ~200 keys: all UI strings for 4 pages
│   └── vi.json                       # Vietnamese translations of all keys
├── content/
│   ├── config.ts                     # Astro content collection schema for FAQ
│   ├── faq/
│   │   ├── en/
│   │   │   ├── general.yaml          # "What is Ferro VPN?", "How does it work?", etc.
│   │   │   ├── billing.yaml          # Pricing, refund, payment method questions
│   │   │   ├── technical.yaml        # WireGuard, protocols, compatibility questions
│   │   │   └── privacy.yaml          # No-log policy, data handling questions
│   │   └── vi/
│   │       ├── general.yaml
│   │       ├── billing.yaml
│   │       ├── technical.yaml
│   │       └── privacy.yaml
│   └── servers.ts                    # Static server list data (curated from app: 13+ countries)
├── pages/
│   ├── index.astro                   # Root: redirect to /en/ or /vi/ based on Accept-Language
│   ├── en/
│   │   ├── index.astro               # Home page (EN)
│   │   ├── features.astro            # Features page (EN)
│   │   ├── pricing.astro             # Pricing page (EN)
│   │   └── faq.astro                 # FAQ page (EN)
│   └── vi/
│       ├── index.astro               # Home page (VI)
│       ├── features.astro            # Features page (VI)
│       ├── pricing.astro             # Pricing page (VI)
│       └── faq.astro                 # FAQ page (VI)
└── config/
    ├── servers.ts                    # Server country data: [{name, code, city, flag}]
    └── pricing.ts                    # Plan tiers: monthly/annual pricing, feature lists
```

### i18n Architecture

**Routing pattern:**
- `/en/*` and `/vi/*` are separate page trees (Astro file-based routing)
- Each page file imports shared section components, passes language prop
- Root `/` does a lightweight redirect via `<meta http-equiv="refresh">` or server redirect

**Translation approach:**
- JSON files keyed by dot-notation: `"home.hero.title"`, `"features.wireguard.title"`
- `t(lang, key)` utility for Astro components
- React islands receive pre-translated strings as props (no client-side i18n)

**Content collections for FAQ:**
```yaml
# content/faq/en/general.yaml
items:
  - question: "What is Ferro VPN?"
    answer: "Ferro VPN is a fast, secure VPN powered by the WireGuard protocol..."
  - question: "How does Ferro VPN protect my privacy?"
    answer: "..."
```

### Server Data (`config/servers.ts`)

Curated static list derived from the app's server infrastructure. Not API-fetched. Updated when new servers are added.

```typescript
export const SERVERS = [
  { country: "Singapore", code: "SG", city: "Singapore", region: "Asia Pacific" },
  { country: "Japan", code: "JP", city: "Tokyo", region: "Asia Pacific" },
  { country: "United States", code: "US", city: "California", region: "North America" },
  // ... 13+ entries
];
```

### Pricing Data (`config/pricing.ts`)

Static pricing that mirrors RevenueCat configuration. Update when app pricing changes.

```typescript
export const PLANS = [
  {
    id: "monthly",
    name: "Monthly",
    price: "$9.99",
    period: "/month",
    features: [...],
    cta: "Start Free Trial",
    badge: null,
  },
  {
    id: "annual",
    name: "Annual",
    price: "$4.99",
    period: "/month",
    billedAs: "Billed $59.99/year",
    savings: "Save 50%",
    features: [...],
    cta: "Start Free Trial",
    badge: "Best Value",
  },
];
```

### Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Content duplication across EN/VI page files | High | Low | Shared section components accept `lang` prop; pages are thin wrappers |
| Accept-Language redirect blocks crawlers | Medium | High | Include `<link rel=alternate>` on all pages; root page has minimal HTML with both language links |
| Vietnamese translation quality | Medium | Medium | Review by native speaker before deploy; mark as draft initially |

---

## Phase 3: Home Page (8h)

### Deliverables

Full home page with all 12 sections. Responsive. Animated. Bilingual.

### Files to Create

```
src/
├── components/
│   ├── sections/
│   │   ├── HeroSection.astro              # Gradient bg, headline, subtitle, 2 CTAs, app screenshot/mockup
│   │   ├── TrustBar.astro                  # Row of trust indicators: "13+ countries", "WireGuard", "No logs"
│   │   ├── FeatureHighlights.astro         # 3-col grid: Speed, Security, Privacy — icon + title + desc
│   │   ├── AppPreview.astro                # Large app screenshot/mockup with device frame
│   │   ├── ServerMapSection.astro          # World map SVG + animated ping dots for server locations
│   │   ├── SpeedTestSection.astro          # Decorative speed visualization (static CSS animation)
│   │   ├── TestimonialsSection.astro       # 3 testimonial cards with avatar, quote, name
│   │   ├── PricingPreview.astro            # 2-card pricing preview linking to /pricing
│   │   ├── HomeFAQPreview.astro            # Top 3-4 FAQ items, links to /faq
│   │   └── CTASection.astro                # Full-width gradient CTA: "Protect yourself now"
│   └── islands/
│       └── LanguageSwitcher.tsx            # React: dropdown to toggle EN/VI, updates URL
├── pages/
│   ├── en/index.astro
│   └── vi/index.astro
```

### Section Details

**HeroSection**:
- `--text-hero` headline with GradientText: "Your Privacy, Fortified"
- Subtitle in `--color-text-secondary`
- Two CTAs: "Download for Free" (gradient primary) + "View Plans" (ghost)
- Background: subtle radial gradient from brand center, fade to bg
- Staggered CSS fade-in animation on load (headline -> subtitle -> CTAs)
- App store badges (Apple, Google Play) below CTAs on mobile

**ServerMapSection**:
- Reuse `world_map.png` from Flutter assets (convert to WebP, use as bg)
- CSS-animated pulsing dots at server locations
- Counter: "13+ servers in 13+ countries"
- `prefers-reduced-motion`: static dots, no pulse

**SpeedTestSection**:
- Pure CSS gauge/speed visualization (no React needed)
- Counter animation via CSS `@property` or IntersectionObserver + JS
- "Up to 10 Gbps" marketing claim with speed stat cards

**TestimonialsSection**:
- 3 hardcoded testimonials (not user-generated — use placeholder/presigned quotes)
- Card: quote text, name, country flag, avatar placeholder

### Page File Structure (thin wrapper)

```astro
---
// pages/en/index.astro
import Layout from '../../components/layout/Layout.astro';
import HeroSection from '../../components/sections/HeroSection.astro';
// ... all sections
import { t } from '../../i18n/utils';
const lang = 'en';
---
<Layout lang={lang} title={t(lang, 'home.meta.title')} description={t(lang, 'home.meta.description')}>
  <HeroSection lang={lang} />
  <TrustBar lang={lang} />
  <FeatureHighlights lang={lang} />
  <!-- ... -->
</Layout>
```

### Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Hero animation CLS > 0.05 | Medium | High | Use explicit dimensions on all elements; test at 320, 768, 1440 breakpoints |
| Server map large image hurts LCP | Medium | High | WebP format, lazy-load below fold, explicit width/height |
| App screenshot not available | High | Low | Use CSS mockup placeholder initially; replace with real screenshot from store listing |

---

## Phase 4: Features Page (5h)

### Deliverables

Features page with 7 sections detailing WireGuard, ad blocking, security, servers, and analytics.

### Files to Create

```
src/
├── components/
│   └── sections/
│       ├── FeaturesHero.astro             # "Built for Speed. Designed for Privacy." + breadcrumb
│       ├── WireGuardDeepDive.astro        # Protocol comparison table + architecture diagram
│       ├── AdBlockerSection.astro         # DNS-level ad blocking explainer with toggle visual
│       ├── SecuritySuiteSection.astro     # Kill switch, split tunneling, DNS leak protection
│       ├── ServerNetworkSection.astro     # Server list with filter by region
│       ├── AnalyticsSection.astro         # Stats dashboard preview + screenshots
│       └── FeaturesCTA.astro              # "Experience it yourself" CTA
├── pages/
│   ├── en/features.astro
│   └── vi/features.astro
```

### Section Details

**WireGuardDeepDive**:
- Comparison table: WireGuard vs OpenVPN vs IKEv2 (speed, security, code size)
- Visual: protocol flow diagram (simplified SVG)
- Stats: "4,000 lines of code" (WireGuard), "256-bit encryption"

**AdBlockerSection**:
- Visual toggle UI (CSS illustration, not interactive)
- Blocked content categories: ads, trackers, malware, phishing
- Stat: "Block 99.9% of ads and trackers"

**SecuritySuiteSection**:
- 3 feature cards in grid: Kill Switch, Split Tunneling, DNS Leak Protection
- Each card: icon, title, description, visual indicator

**ServerNetworkSection**:
- Region-grouped server list derived from `config/servers.ts`
- Accordion or tabs for regions: Asia Pacific, Europe, North America
- Each server: country flag, city name, status indicator

### Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| WireGuard comparison data outdated | Low | Low | Source from wireguard.com; add review date in code comment |
| Server list diverges from actual servers | Medium | Medium | Add comment pointing to update process; static data is intentional for perf |

---

## Phase 5: Pricing Page (5h)

### Deliverables

Pricing page with toggle (monthly/annual), feature comparison table, money-back guarantee.

### Files to Create

```
src/
├── components/
│   └── sections/
│       ├── PricingHero.astro              # "Simple, Transparent Pricing"
│       ├── PricingCards.astro             # Monthly vs Annual cards
│       ├── FeatureComparison.astro        # Full comparison table: Free vs Premium
│       ├── MoneyBackSection.astro         # "30-day money-back guarantee" trust section
│       └── PricingCTA.astro              # Final CTA
│   └── islands/
│       └── PricingToggle.tsx              # React: monthly/annual toggle, updates displayed prices
├── pages/
│   ├── en/pricing.astro
│   └── vi/pricing.astro
```

### Section Details

**PricingCards**:
- 2-card layout: Monthly and Annual
- Annual card: highlighted with gradient border + "Best Value" badge
- Each card: price, period, feature checklist, CTA button
- PricingToggle island switches displayed prices

**PricingToggle.tsx** (React island):
- Toggle switch: Monthly | Annual
- Updates price display, badge visibility
- `client:idle` — hydrates after page load
- Accessible: `role="switch"`, `aria-checked`, keyboard support

**FeatureComparison**:
- Full-width table: feature rows, Free vs Premium columns
- Check/X icons for feature availability
- Rows grouped: Security, Privacy, Performance, Support

### Pricing Data Source

Pricing is hardcoded in `config/pricing.ts`, mirroring RevenueCat configuration:
- Monthly plan price
- Annual plan price (and monthly equivalent)
- Free tier feature limits
- Premium tier features

Actual prices fetched from RevenueCat SDK in the app; landing page shows marketing prices that should match.

### Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Prices on landing page diverge from app store | High | Medium | Add prominent comment in pricing.ts with update instructions; consider making prices obvious round numbers |
| PricingToggle hydration delay | Low | Medium | Server-render default state (annual); toggle hydrates progressively |

---

## Phase 6: FAQ Page (3h)

### Deliverables

FAQ page with categorized questions, expandable accordion, and contact section.

### Files to Create

```
src/
├── components/
│   ├── sections/
│   │   ├── FAQHero.astro                  # "Frequently Asked Questions"
│   │   ├── FAQCategories.astro            # Category tabs + accordion items
│   │   └── ContactSection.astro           # "Still have questions?" + email/support link
│   └── islands/
│       └── AccordionItem.tsx              # React: expand/collapse with animation
├── pages/
│   ├── en/faq.astro
│   └── vi/faq.astro
```

### Section Details

**FAQCategories**:
- Tab navigation: General, Billing, Technical, Privacy
- Each tab filters FAQ items from content collections
- AccordionItem islands for expand/collapse
- Smooth height animation on expand

**AccordionItem.tsx** (React island):
- Props: question, answer (pre-translated strings)
- Click/Enter/Space to toggle
- `max-height` transition for smooth expand
- `aria-expanded`, `aria-controls` for accessibility
- `client:visible` — hydrate when scrolled into view

**Content Structure (YAML):**
```yaml
# content/faq/en/general.yaml
category: "General"
items:
  - question: "What is Ferro VPN?"
    answer: "Ferro VPN is a fast, secure VPN application..."
  - question: "Is Ferro VPN free?"
    answer: "Ferro VPN offers a free tier with limited features..."
```

### Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Accordion animation jank | Low | Low | Use `max-height` with fixed upper bound or `grid-template-rows: 0fr/1fr` trick |
| FAQ content feels thin | Medium | Medium | Aim for 5-8 questions per category; source from actual support tickets |

---

## Phase 7: SEO + Performance + Deployment (5h)

### Deliverables

Full SEO optimization, performance audit, deployment configuration, final QA.

### Files to Create/Modify

```
src/
├── components/
│   └── layout/
│       └── SEO.astro (finalize)            # Structured data injection per page
├── pages/
│   └── (all pages) (finalize)              # hreflang, canonical URLs, OG images
public/
├── og-image.png (finalize)                 # Real OG image
├── robots.txt (finalize)
└── sitemap.xml (auto-generated)
```

### SEO Checklist

- [ ] Per-page `<title>` and `<meta name="description">`
- [ ] Open Graph tags: `og:title`, `og:description`, `og:image`, `og:url`
- [ ] Twitter card meta tags
- [ ] `<link rel="canonical">` on every page
- [ ] `<link rel="alternate" hreflang="en">` and `hreflang="vi"` on every page
- [ ] `<link rel="alternate" hreflang="x-default">` pointing to `/en/`
- [ ] FAQ structured data (`FAQPage` schema) on FAQ pages
- [ ] `SoftwareApplication` structured data on Home page
- [ ] Auto-generated sitemap via `@astrojs/sitemap`
- [ ] `robots.txt` with sitemap reference
- [ ] Proper heading hierarchy (single H1 per page, logical H2/H3 order)

### Performance Targets

| Metric | Target | Validation |
|--------|--------|------------|
| LCP | < 1.5s | Lighthouse CI |
| FCP | < 1.0s | Lighthouse CI |
| CLS | < 0.05 | Lighthouse CI |
| INP | < 200ms | Field data |
| Lighthouse | > 95 | All categories |
| JS Bundle | < 50kb gzipped | Only React islands |
| CSS | < 30kb gzipped | Tailwind purge |

### Performance Strategy

1. **Zero JS by default** — Astro renders static HTML
2. **React islands only**: MobileMenu, PricingToggle, AccordionItem, LanguageSwitcher
3. **Font loading**: `font-display: swap`, preload Inter Variable weight 400 + 700
4. **Image optimization**: Astro `<Image>` component for automatic WebP/AVIF, responsive sizes
5. **Hero image**: `loading="eager"`, `fetchpriority="high"`, explicit dimensions
6. **Below-fold**: `loading="lazy"` on all images
7. **CSS**: Tailwind purge removes unused classes

### Deployment Configuration

**Vercel** (primary):
- `vercel.json` with headers for caching (immutable assets 1 year)
- Auto-deploy from `main` branch
- Framework preset: Astro

**Alternative: Cloudflare Pages**:
- `wrangler.toml` for build config
- `_headers` file for caching and security headers

**Security Headers:**
```
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' https://fonts.gstatic.com
```

### Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Google indexes both /en/ and /vi/ without proper signals | Medium | High | hreflang is mandatory; submit sitemap in Google Search Console |
| Font loading blocks LCP | Medium | Medium | Preload only critical font files; use `font-display: swap` |
| OG image not sized correctly for social platforms | Low | Low | Test with Facebook Debugger, Twitter Card Validator |

---

## Test Matrix

| What | How | Where |
|------|-----|-------|
| Visual regression | Screenshot comparison at 320, 768, 1024, 1440 | Playwright or manual |
| Accessibility | Axe automated + keyboard nav | All pages |
| i18n completeness | Script: compare EN/VI JSON keys | CI |
| Broken links | Crawl all internal links | CI |
| Performance | Lighthouse CI (LCP, CLS, FCP) | CI |
| Responsive | Manual check at 6 breakpoints | QA |
| Reduced motion | All animations respect `prefers-reduced-motion` | Manual |
| SEO | Structured data validator, meta tag audit | Pre-deploy |
| Cross-browser | Chrome, Firefox, Safari | Manual |
| 404 handling | Visit nonexistent paths | Manual |

---

## Backwards Compatibility / Migration

This is a new project. No migration needed. However:

- **Flutter project untouched**: Landing page is a sibling directory, no shared files
- **Assets are copied**, not referenced across projects (so Flutter project remains self-contained)
- **Future consideration**: If landing page needs server data, it stays static. Server list is curated manually, not API-fetched. This avoids coupling landing page to app infrastructure.

---

## File Ownership Map (Parallel Phase Safety)

| Phase | Touches | Conflicts With |
|-------|---------|----------------|
| Phase 3 (Home) | `components/sections/HeroSection.astro`, etc., `pages/en/index.astro`, `pages/vi/index.astro` | None if other phases use different section files and page files |
| Phase 4 (Features) | `components/sections/Features*.astro`, `pages/*/features.astro` | None |
| Phase 5 (Pricing) | `components/sections/Pricing*.astro`, `islands/PricingToggle.tsx`, `pages/*/pricing.astro` | None |
| Phase 6 (FAQ) | `components/sections/FAQ*.astro`, `islands/AccordionItem.tsx`, `pages/*/faq.astro` | None |

**Shared files (must be done before parallel phases):**
- `components/ui/*` — done in Phase 1
- `components/layout/*` — done in Phase 1
- `i18n/en.json`, `i18n/vi.json` — initialized in Phase 2; each phase appends its keys
- `global.css` — done in Phase 0; phases may add minor tokens but should coordinate

---

## Asset Reuse Plan

| Source (vpn-flutter) | Destination (ferrovpn-landing) | Transformation |
|----------------------|-------------------------------|----------------|
| `assets/svgs/logo.svg` | `src/assets/logo.svg` | Optimize with SVGO; convert `fill="#0066CC"` to `currentColor` |
| `assets/images/world_map.png` | `src/assets/world_map.webp` | Convert to WebP, optimize |
| `assets/icons/ic_shield_btn.svg` | `src/assets/icons/shield.svg` | May reuse for security section |
| `assets/icons/ic_server.svg` | `src/assets/icons/server.svg` | May reuse for server section |
| `assets/svgs/ic_google.svg` | Not needed (Google icon for auth, not landing page) | Skip |
| Brand colors from `app_colors.dart` | `global.css` tokens | Map: primaryMid `#3B82F6` becomes `--color-brand` |

**New assets to create:**
- `logo-wordmark.svg` — Logo + "Ferro VPN" text
- `og-image.png` — 1200x630 social sharing image
- `favicon.svg` — Simplified shield icon
- App screenshots/mockups for Hero and AppPreview sections (take from app store listings)
- Server location dots SVG overlay for world map

---

## Success Criteria (Measurable)

1. **Lighthouse > 95** on all 4 pages, all categories
2. **LCP < 1.5s** on simulated 4G throttled connection
3. **CLS < 0.05** on all viewports
4. **Zero JS errors** in console on any page
5. **All 4 pages render correctly** at 320px, 375px, 768px, 1024px, 1440px, 1920px
6. **Both EN and VI pages** have complete content (no missing translations)
7. **All CTA links** point to correct App Store / Play Store URLs
8. **hreflang tags** present on all 8 page variants (4 pages x 2 languages)
9. **All animations respect** `prefers-reduced-motion: reduce`
10. **Keyboard navigable** — all interactive elements reachable via Tab, operable via Enter/Space

---

## Unresolved Questions

1. **Exact subscription pricing** — RevenueCat prices are fetched at runtime in the app. What are the actual monthly/annual prices to show on the landing page? Need confirmation from Tom.
2. **App Store / Play Store URLs** — Are these finalized? Needed for CTA links.
3. **Real testimonials** — Are there user testimonials to use, or should we write placeholder marketing copy?
4. **OG image design** — Should this be auto-generated per page or a single static image?
5. **Deployment target decision** — Vercel or Cloudflare Pages? Both configured but one needs to be primary.
6. **Domain name** — What domain will the landing page live on? (e.g., ferrovpn.com, getferrovpn.com)
7. **Vietnamese translation review** — Who will review the Vietnamese content for quality?
8. **App screenshots** — Are there high-quality app screenshots available from the store listing, or do we need to generate them?
