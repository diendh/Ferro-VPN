# Ferro VPN Project Overview & Product Development Requirements (PDR)

## Project Summary

**Ferro VPN** is a premium VPN service marketing website built as a static site generator (SSG) using Astro 6. The project serves as the primary landing page for Puresoft Limited's VPN service, featuring a modern glassmorphism design system with dark/light theme support, global server visualization, and a crypto payment flow implementation.

## Company Information

- **Company:** Puresoft Limited (Hong Kong)
- **Website:** https://puresoftltd.com/
- **Project Type:** Marketing/Landing Website
- **Deployment:** Cloudflare Pages

## Product Vision

To create a world-class VPN landing experience that:
1. Builds trust through transparent server coverage and encryption details
2. Provides a seamless purchase experience with crypto payment integration
3. Establishes Ferro VPN as a premium, privacy-focused brand
4. Serves as a conversion-optimized platform for mobile app downloads

## Target Audience

- Privacy-conscious individuals and professionals
- Users seeking secure internet access across devices
- Mobile-first users (iOS/Android focus)
- Crypto-savvy customers for payment options

## Key Features

### 1. Hero Section
- Animated background with radial gradients
- Download modal trigger for iOS/Android/macOS
- Brand messaging emphasizing security and trust
- Full-screen immersive experience

### 2. Features Section
- 5 key feature cards showcasing VPN benefits:
  - Military-grade encryption
  - Web filtering capabilities
  - Family control features
  - Real-time dashboard
  - Strict no-logs policy
- Interactive hover effects with glass morphism

### 3. Global Servers Section
- Interactive world map visualization
- Server statistics (3000+ servers, 90+ countries)
- Search and filter capabilities for specific servers
- Performance indicators for each location

### 4. Pricing Section
- Tiered pricing structure:
  - Basic Monthly: $9.9
  - Pro Monthly: $9.9
  - Pro Yearly: $79.99 (save 33%)
  - Ultimate: Coming Soon
- Crypto payment integration (BTC, USDT)
- QR code generation for payments
- Real-time transaction status updates

### 5. Technical Infrastructure
- Astro 6 static site generator for optimal performance
- Tailwind CSS 4 for utility-first styling
- Alpine.js for lightweight interactivity
- Cloudflare Pages for global CDN deployment
- Dark/light theme toggle with system preference detection

## Design System

### Color Palette (from Flutter AppColors)
- **Brand Primary:** #114AD0
- **Brand Secondary:** #1D4ED8 (hover state)
- **Brand Accent:** #3B82F6
- **Dark Theme:** 
  - Background: #020617 (slate-950)
  - Surface: rgba(31, 41, 55, 0.6) with backdrop blur
- **Light Theme:**
  - Background: #F6F6F8
  - Surface: rgba(255, 255, 255, 0.85) with backdrop blur

### Glass Morphism UI Components
- `glass-panel`: Full blur with border shadow
- `glass-card`: Subtle blur with hover animations
- Used consistently across all components for premium feel

## Mobile App Integration

### App Store Links
- **iOS:** ID 6754163980
- **Android:** com.vietts.vpn

### Download Modal
- Platform-specific download buttons
- QR code for mobile scanning
- Direct App Store links for seamless conversion

## Backend API Integration

### Crypto Payment Flow
The frontend implements a complete crypto payment UI that requires these backend endpoints:

1. **POST /api/v1/payment/create** - Generate payment order and address
2. **GET /api/v1/payment/status/{order_id}** - Poll transaction status
3. **POST /api/v1/webhooks/crypto** - Receive payment confirmations

### Payment Features
- BTC and USDT support
- TRC20 network option
- Real-time transaction verification
- QR code integration
- Order expiration handling

## Performance Requirements

- **Core Web Vitals:** LCP < 2.5s, INP < 200ms, CLS < 0.1
- **Bundle Size:** < 150kb JS (gzipped)
- **CSS Budget:** < 30kb
- **Deployment:** < 60s build time
- **CDN:** Edge caching via Cloudflare Pages

## Development Standards

### Code Organization
- Feature-based component structure
- Separate landing/common component directories
- Centralized design tokens in global.css
- TypeScript for type safety

### Quality Assurance
- Mobile-first responsive design
- Cross-browser compatibility (Chrome, Firefox, Safari)
- Accessibility compliance (WCAG 2.1 AA)
- SEO optimized with proper meta tags

### Security Considerations
- No hardcoded API keys or secrets
- CSP-compliant script loading
- HTTPS enforcement
- Input validation on all forms

## Success Metrics

1. **Conversion Rate:** > 3% from visit to app download
2. **Page Speed:** > 90 on Google PageSpeed Insights
3. **Mobile UX:** > 95 on Lighthouse mobile score
4. **SEO Ranking:** Top 3 for "VPN Hong Kong" keywords
5. **Performance:** 100% Core Web Vitals good

## Roadmap

### Phase 1 - Complete (Current)
- ✅ Static landing page with all sections
- ✅ Glass morphism design system
- ✅ Dark/light theme toggle
- ✅ Mobile responsive design
- ✅ Crypto payment UI implementation
- ✅ Server visualization mockup

### Phase 2 - Q1 2026
- 🔲 Backend API integration
- 🔲 Real-time server status updates
- 🔲 User account dashboard
- � Affiliate program integration

### Phase 3 - Q2 2026
- 🔲 Multi-language support
- 🔨 Blog/content management system
- 🔨 Performance monitoring dashboard
- 🔨 Advanced analytics integration

## Dependencies and Resources

### Key Technologies
- Astro 6 - SSG framework
- Tailwind CSS 4 - Styling
- Alpine.js - Interactivity
- Cloudflare Pages - Deployment
- Font Source Inter - Typography

### Third-party Services
- Crypto payment provider (to be determined)
- Analytics platform (Google Analytics)
- CDN (Cloudflare)
- SSL certificate (Let's Encrypt)

## Contact Information

- **Project Lead:** [To be assigned]
- **Development Team:** Puresoft Limited
- **Design Agency:** [To be assigned]
- **Backend Integration:** [To be assigned]

---

*Last Updated: April 2026*
*Document Version: 1.0*
*Status: Production Ready*