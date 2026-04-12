# Ferro VPN Landing Page — Design Document

**Date**: 2026-04-12
**Status**: Approved
**Scope**: Full — 4 pages (Home, Features, Pricing, FAQ)
**Tech Stack**: Astro 6 + Tailwind CSS 4 + Alpine.js

---

## Problem Statement

Ferro VPN lacks a marketing website. Currently only has:
- Basic placeholder in `/web/` directory
- App store descriptions (EN/VI)
- Branding assets (logo, colors, icons)

Need a professional landing page to drive app downloads and build brand trust.

## Requirements

- **Goal**: Full marketing site — brand building + app download conversion
- **Language**: Bilingual EN/VI (URL-based routing: `/en/*`, `/vi/*`)
- **Design**: Modern SaaS style (Linear/Vercel/Raycast inspired)
- **Pages**: Home, Features, Pricing, FAQ
- **Performance**: LCP < 1.5s, CLS < 0.05, zero JS until interaction

## Evaluated Approaches

| Approach | Pros | Cons | Verdict |
|----------|------|------|---------|
| Astro + Tailwind + Alpine.js | Best perf, lightweight reactivity, SEO-first | Alpine ecosystem smaller than React | **CHOSEN** |
| Astro + Tailwind (Pure) | Maximum perf, simplest | No reactive components, manual DOM | Rejected — limits interactivity |
| Next.js + Tailwind | Full React, SSR, large community | Overkill for static marketing, heavier | Rejected — unnecessary complexity |

## Chosen Solution: Astro + Tailwind + Alpine.js

### Architecture

```
ferrovpn-landing/
├── src/
│   ├── components/
│   │   ├── islands/          # React interactive (PricingToggle, SpeedTest, MobileMenu, LanguageSwitcher)
│   │   ├── sections/         # Astro page sections
│   │   ├── ui/               # Primitives (Button, Card, Badge, Container, GradientText)
│   │   └── layout/           # Header, Layout, SEO
│   ├── content/              # FAQ YAML per language
│   ├── i18n/                 # en.json, vi.json
│   ├── pages/                # /en/*, /vi/* routes + root redirect
│   ├── styles/               # global.css
│   └── assets/               # Images, SVGs
├── public/                   # Static assets, OG image, robots.txt
├── astro.config.mjs
└── tailwind.config.mjs
```

### Design System — "Trusted Precision"

Dark-first, clean typography, subtle gradients, generous whitespace.

**Colors**:
- Background: `#0A0B0E` (near-black), surface: `#111318`
- Brand: `#3B82F6` (Ferro blue), gradient: `#3B82F6 → #8B5CF6` (blue→violet)
- Text: `#F1F5F9` / `#94A3B8` / `#475569`
- Success: `#22C55E`, Warning: `#F59E0B`, Error: `#EF4444`

**Typography**:
- Inter Variable (headings 600-700, body 400)
- JetBrains Mono (stats/numbers)
- Fluid scale via `clamp()`

**Spacing**: 4px grid, section gaps `clamp(4rem, 8vw, 8rem)`

### Page Structure

**Home** (12 sections): Nav → Hero → Trust Bar → Feature Highlights → App Preview → Server Map → Speed Test → Testimonials → Pricing Preview → FAQ → CTA → Footer

**Features** (7 sections): Hero → WireGuard Deep-Dive → Ad Blocker → Security Suite → Server Network → Analytics → CTA

**Pricing** (5 sections): Hero → Pricing Cards → Feature Comparison → Money-Back → CTA

**FAQ** (3 sections): Hero → FAQ Categories → Contact

### Animation Strategy

- Hero: staggered CSS fade-in
- Cards: IntersectionObserver scroll reveal
- Server pins: CSS pulse
- Speed gauge: React + rAF
- All animations respect `prefers-reduced-motion`

### i18n

- URL-based routing (`/en/*`, `/vi/*`)
- JSON translation files
- Content collections (YAML) for FAQ
- Root `/` redirects via `Accept-Language`
- `hreflang` alternate links for SEO

### SEO

- Per-page meta titles, descriptions, OG tags
- Auto sitemap via `@astrojs/sitemap`
- FAQ + SoftwareApplication structured data
- `<link rel="alternate" hreflang="en/vi">`

### Deployment

- **Target**: Cloudflare Pages (configured with `@astrojs/cloudflare` adapter)
- Auto-deploy from Git
- Domain: `ferrovpn.com`

## Implementation Considerations

- Ferro logo/brand assets from existing Flutter app can be reused
- App store download links already exist
- Server list (3000+ servers, 90+ countries) can be pulled from existing config
- Subscription pricing from RevenueCat configuration

## Success Metrics

- LCP < 1.5s, CLS < 0.05, FCP < 1.0s
- Mobile-first responsive (320–1920px)
- Lighthouse score > 95
- Bilingual fully functional
- App download CTA above fold on all viewports

## Next Steps

1. Scaffold Astro project
2. Set up Tailwind + design tokens
3. Build Layout + Header components
4. Implement Home page sections
5. Add React islands (PricingToggle, MobileMenu, LanguageSwitcher)
6. Implement Features, Pricing, FAQ pages
7. i18n setup with EN/VI content
8. SEO optimization (meta, sitemap, structured data)
9. Performance audit + deploy
