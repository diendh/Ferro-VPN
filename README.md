# Ferro VPN - Privacy Shield

Modern VPN service landing page built with Astro 6, featuring glassmorphism design, dark/light theme toggle, and crypto payment integration.

## 🚀 Features

- **Glass Morphism Design** - Premium UI with backdrop blur effects
- **Dark/Light Theme** - System-aware theme switching with dark mode default
- **Mobile Responsive** - Optimized for all screen sizes with Alpine.js
- **Crypto Payment** - Complete BTC/USDT payment flow UI
- **Global Servers** - Interactive server map with 3000+ servers
- **SEO Optimized** - Open Graph, Twitter cards, and semantic HTML
- **Performance Focused** - Core Web Vitals optimized with SSG

## 📱 Mobile Apps

- **iOS:** [App Store](https://apps.apple.com/app/id6754163980)
- **Android:** [Google Play](https://play.google.com/store/apps/details?id=com.vietts.vpn)

## 🛠️ Tech Stack

- **Astro 6** - Static Site Generator
- **Tailwind CSS 4** - Utility-first styling
- **Alpine.js** - Lightweight interactivity
- **Cloudflare** - Global CDN deployment
- **TypeScript** - Type safety

## 📁 Project Structure

```
src/
├── components/
│   ├── landing/     # Hero, Features, Servers, Pricing
│   ├── common/      # Navbar, Footer, ThemeToggle
│   └── Welcome.astro
├── layouts/
│   └── Layout.astro
├── pages/          # index.astro, 404, legal pages
├── styles/
│   └── global.css  # Design system & color tokens
└── assets/         # Images, logos, graphics
```

## 🎨 Design System

Built with Ferro VPN brand colors from Flutter AppColors:
- Primary: `#114AD0`
- Secondary: `#1D4ED8`
- Accent: `#3B82F6`
- Dark theme: `#020617` background with glass surfaces

## 🚀 Getting Started

1. **Clone repository**
   ```bash
   git clone https://github.com/your-org/ferro-vpn.git
   cd ferro-vpn
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   Visit http://localhost:4321

## 📦 Scripts

| Command | Action |
|---------|--------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run deploy` | Deploy to Cloudflare Pages |

## 🎯 Payment Integration

The payment UI supports crypto transactions (BTC, USDT) and integrates with backend endpoints:

- `POST /api/v1/payment/create` - Create payment order
- `GET /api/v1/payment/status/{order_id}` - Check transaction status
- `POST /api/v1/webhooks/crypto` - Payment webhook

See [BE_SPECS.md](./BE_SPECS.md) for API specifications.

## 📄 Documentation

- [Project Overview & PDR](./docs/project-overview-pdr.md)
- [Codebase Summary](./docs/codebase-summary.md)
- [Code Standards](./docs/code-standards.md)
- [System Architecture](./docs/system-architecture.md)
- [Project Roadmap](./docs/project-roadmap.md)
- [Deployment Guide](./docs/deployment-guide.md)

## 🚢 Deployment

Automatic deployment on push to main:

```bash
# Build and deploy
npm run deploy

# Or build locally
npm run build
npm run preview
```

## 📊 Performance

- **Bundle Size:** < 150kb (gzipped)
- **Core Web Vitals:** LCP < 2.5s, INP < 200ms, CLS < 0.1
- **Lighthouse Score:** 95+
- **Global CDN:** Cloudflare Pages

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Follow [Code Standards](./docs/code-standards.md)
4. Test thoroughly
5. Submit a pull request

## 📄 License

© 2026 Puresoft Limited (Hong Kong). All rights reserved.

## 🌐 Company

**Puresoft Limited** - https://puresoftltd.com/

## 🔒 Security

This project follows security best practices:
- No hardcoded secrets
- CSP-compliant
- HTTPS enforcement
- Input validation
- No XSS vulnerabilities

---

Built with ❤️ using Astro + Tailwind CSS + Cloudflare