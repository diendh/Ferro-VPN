# Ferro VPN System Architecture

## Architecture Overview

The Ferro VPN website is built as a modern static site generator (SSG) application using Astro 6, designed for optimal performance, security, and maintainability. The architecture follows a component-based pattern with a clear separation of concerns between presentation, styling, and interactivity layers.

## High-Level Architecture

```
┌─────────────────────────────────────────────────────┐
│                  Client Layer                       │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  │
│  │   HTML       │  │    CSS      │  │   Alpine.js │  │
│  │  (Server-    │  │   (Tailwind │  │  (Light-    │  │
│  │  Generated) │  │   CSS 4)    │  │  weight)    │  │
│  └─────────────┘  └─────────────┘  └─────────────┘  │
└─────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────┐
│                Build Layer                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  │
│  │    Astro    │  │   TypeScript │  │   Cloudflare│  │
│  │    6 SSG    │  │    (Type    │  │   Adapter   │  │
│  │             │  │   Script)   │  │             │  │
│  └─────────────┘  └─────────────┘  └─────────────┘  │
└─────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────┐
│                Data Layer                           │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  │
│  │  Static     │  │    Images   │  │   Meta Data │  │
│  │  Content    │  │   (Optimized│  │   (SEO/OG)  │  │
│  │             │  │    Assets)   │  │             │  │
│  └─────────────┘  └─────────────┘  └─────────────┘  │
└─────────────────────────────────────────────────────┘
```

## Component Architecture

### 1. Layout Architecture

**Main Layout (`src/layouts/Layout.astro`)**
- Acts as the root template for all pages
- Manages document structure (head, body)
- Handles theme initialization script
- Includes meta tags for SEO
- Provides the base HTML structure with semantic elements

**Layout Features:**
```astro
<!doctype html>
<html lang="en" class="scroll-smooth">
  <head>
    <!-- Meta tags, theme script, title -->
    <script is:inline>
      // Default to dark mode, respect localStorage
    </script>
    <!-- Open Graph & Twitter meta tags -->
  </head>
  <body class="overflow-x-hidden">
    <slot /> <!-- Page content goes here -->
  </body>
</html>
```

### 2. Component Hierarchy

```
Layout
├── Navbar
│   ├── Logo
│   ├── Desktop Navigation
│   ├── Mobile Menu (Alpine.js)
│   └── Theme Toggle
├── Main
│   ├── Hero
│   ├── Features
│   ├── Servers
│   ├── Pricing
│   └── CTA Section
└── Footer
    ├── Company Info
    ├── Quick Links
    └── Contact Info
```

### 3. Component Design Patterns

**Container/Presentational Split**
- Container components handle data loading and logic
- Presentational components handle rendering and styling
- Clear separation of concerns

**Compound Components**
- Related UI components share state and interactions
- Used in mobile menu and payment flow
- Parent manages state, children consume via context

**Render Props/Slots**
- Flexible component composition
- Used in theme toggle and modal patterns
- Keeps behavior separate from markup

## Styling Architecture

### 1. CSS Architecture

**Centralized Design System**
- All design tokens defined in `src/styles/global.css`
- Tailwind CSS 4 for utility classes
- Custom CSS for specialized patterns (glass morphism)

**Theme System**
- CSS custom properties for theming
- Dark mode as default with light mode opt-in
- Semantic naming for consistent usage

**Glass Morphism Implementation**
```css
/* Design token approach */
:root {
  --bg-surface: rgba(255, 255, 255, 0.85);
  --bg-surface-secondary: rgba(239, 246, 255, 0.5);
}

/* Utility classes */
.glass-panel {
  @apply backdrop-blur-xl bg-bg-surface border border-border-main shadow-2xl;
}

.glass-card {
  @apply backdrop-blur-lg bg-bg-surface border border-border-main shadow-lg;
}
```

### 2. Responsive Design Architecture

**Mobile-First Approach**
- Mobile styles are the base
- Media queries for desktop breakpoints
- Progressive enhancement for features

**Breakpoint Strategy**
- Mobile: < 768px (collapsed navigation)
- Desktop: ≥ 768px (full navigation)
- Consistent spacing and typography scaling

## Interactivity Architecture

### 1. Alpine.js Integration

**Lightweight Client-Side Framework**
- Alpine.js for simple interactions
- No heavy JavaScript frameworks
- Component-based state management

**Common Use Cases:**
- Mobile menu toggle
- Theme switcher
- Modal interactions
- Form handling
- Payment flow UI

**Example Implementation:**
```javascript
// Mobile menu state
<div x-data="{ open: false }">
  <button @click="open = !open">Menu</button>
  <div x-show="open" x-transition:enter>...</div>
</div>

// Event delegation
<button @click="$dispatch('open-download-modal')">Download</button>
```

### 2. Event System

**Custom Events**
- Component communication via events
- Modal system with event dispatching
- Centralized event handling

**Event Patterns:**
- DOM events for user interactions
- Custom events for component communication
- Event delegation for performance

## Performance Architecture

### 1. Static Site Generation

**Astro 6 SSG Benefits:**
- Pre-rendered HTML at build time
- Zero JavaScript on initial load
- Optimized for Core Web Vitals
- Automatic code splitting

**Build Process:**
```
Source Files → Astro Build → Static HTML/CSS/JS → Cloudflare
```

### 2. Performance Optimizations

**CSS Optimization:**
- Tailwind CSS tree-shaking
- Critical CSS inlining
- Non-critical CSS deferred loading

**Image Optimization:**
- Automatic WebP/AVIF generation
- Fixed dimensions for layout stability
- Lazy loading for below-the-fold images

**JavaScript Optimization:**
- Only Alpine.js for interactivity
- Code splitting by route
- Deferred loading of non-critical scripts

## Deployment Architecture

### 1. Cloudflare Pages Integration

**Static Hosting Benefits:**
- Global CDN distribution
- Automatic HTTPS
- Edge caching
- DDoS protection

**Build & Deploy Pipeline:**
```bash
npm run build         # Generate static files
npm run deploy        # Deploy to Cloudflare
```

**Environment Configuration:**
- Node.js 22.12.0 required
- Wrangler CLI for deployment
- Environment variables for configuration

### 2. Cache Strategy

**Static Asset Caching:**
- Long cache for images and fonts
- Cache-busting for versioned assets
- Service worker for future PWA features

**Page Caching:**
- HTML pages cached at edge
- Cache invalidation on deployment
- ETag support for efficient updates

## Security Architecture

### 1. Content Security Policy (CSP)

**Production CSP Configuration:**
```http
Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'nonce-{RANDOM}';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  font-src 'self';
  connect-src 'self';
```

### 2. Security Features

**HTTPS Enforcement**
- Automatic HTTPS via Cloudflare
- HSTS headers
- Certificate transparency

**Input Sanitization**
- Form validation on client and server
- No hardcoded secrets
- Proper escaping of user content

**XSS Prevention**
- No `innerHTML` usage
- Sanitized user content
- CSP-compliant script loading

## Data Flow Architecture

### 1. Content Flow

**Static Content:**
- Markdown files for content
- Component-based structure
- Frontmatter for metadata

**Dynamic Data:**
- API endpoints for payment system
- Static JSON for server data
- Environment variables for config

### 2. State Management

**Client State:**
- Alpine.js for simple state
- LocalStorage for theme preference
- Event-based communication

**Server State:**
- Static generation at build time
- API integration for dynamic data
- Server-side rendering for SEO

## Architecture Benefits

### 1. Performance Benefits
- Fast page loads with SSG
- Optimized Core Web Vitals
- Global CDN distribution
- Minimal JavaScript footprint

### 2. Security Benefits
- No server-side vulnerabilities
- Static files are inherently secure
- CSP protection
- HTTPS by default

### 3. Maintainability Benefits
- Clear component structure
- TypeScript for type safety
- Centralized design system
- Easy to test and debug

### 4. Scalability Benefits
- Static files scale infinitely
- Edge caching reduces server load
- Easy to add new pages
- Simple deployment process

## Future Architecture Considerations

### 1. PWA Features
- Service worker for offline support
- App-like experience on mobile
- Push notifications for updates

### 2. Internationalization
- i18n support for multiple languages
- RTL layout support
- Localized content management

### 3. Analytics Integration
- Client-side analytics
- Performance monitoring
- User behavior tracking

### 4. CMS Integration
- Headless CMS for content
- Dynamic content updates
- Preview environments

---

*Architecture Version: 1.0*
*Last Updated: April 2026*
*Status: Production Ready*