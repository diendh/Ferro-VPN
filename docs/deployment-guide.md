# Ferro VPN Deployment Guide

## Overview

This guide provides comprehensive instructions for deploying and maintaining the Ferro VPN website on Cloudflare Pages. The guide covers local development, production builds, deployment procedures, and ongoing maintenance tasks.

## Prerequisites

### System Requirements
- Node.js >= 22.12.0
- npm >= 8.0.0
- Git
- Wrangler CLI (for Cloudflare deployment)

### Required Accounts
- Cloudflare account
- GitHub account (for repository hosting)
- Domain name (optional, for custom domain)

## Local Development

### 1. Setup Project

```bash
# Clone the repository
git clone https://github.com/your-org/ferro-vpn.git
cd ferro-vpn

# Install dependencies
npm install

# Start development server
npm run dev
```

### 2. Development Server

- **URL:** http://localhost:4321
- **Live reload enabled**
- **HMR (Hot Module Replacement)** for components
- **TypeScript checking** enabled

### 3. Available Scripts

```json
{
  "dev": "astro dev",          // Development server with watch mode
  "build": "astro build",      // Production build optimization
  "preview": "astro preview", // Preview production build locally
  "astro": "astro",           // Run Astro CLI commands
  "generate-types": "wrangler types",
  "deploy": "astro build && wrangler deploy",
  "cf-typegen": "wrangler types"
}
```

### 4. File Watching

Astro automatically watches for changes in:
- Component files (`.astro`)
- Page files (`.astro` in pages/)
- CSS files
- Static assets

## Production Build

### 1. Build Commands

```bash
# Standard production build
npm run build

# Build with preview
npm run preview

# Build and type generate
npm run generate-types
```

### 2. Build Output

After running `npm run build`, the following files are generated:
```
dist/
├── assets/          # Optimized images and static files
├── index.html       # Homepage
├── 404.html         # Custom 404 page
├── contact.html     # Contact page
├── privacy.html     # Privacy policy
├── support.html     # Support page
├── terms.html       # Terms of service
├── client/          # JavaScript and CSS assets
└── server/          # Server-side rendering assets
```

### 3. Build Optimization

Astro automatically optimizes:
- **CSS:** Minification and critical CSS extraction
- **JavaScript:** Tree-shaking and minification
- **Images:** WebP/AVIF conversion, optimization
- **HTML:** Minification and semantic markup
- **Fonts:** Subsetting and optimization

## Cloudflare Pages Deployment

### 1. Setup Cloudflare Pages

#### Method A: Via Cloudflare Dashboard

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to "Pages" > "Create project"
3. Connect your GitHub repository
4. Configure build settings:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
5. Enable "Preview deployments" on pull requests

#### Method B: Via Wrangler CLI

```bash
# Install Wrangler CLI
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Deploy directly
npm run deploy
```

### 2. Environment Variables

Create a `.env.production` file for production environment variables:

```env
# Cloudflare Pages specific variables
NODE_VERSION=22.12.0

# Future payment API variables
API_BASE_URL=https://api.ferrovpn.com
CURRENCY_API_KEY=your_api_key_here
```

### 3. Custom Domain Setup

1. In Cloudflare Dashboard, go to "Pages" > your project > "Custom domains"
2. Add your domain (e.g., `ferrovpn.com`)
3. Configure DNS records:
   ```
   Type: CNAME
   Name: (or @ for root)
   Target: your-project.pages.dev
   Proxy status: Proxied
   ```
4. Ensure SSL is enabled ( automatic with Cloudflare)

### 4. Deployment Configuration

Create `wrangler.toml` for advanced configuration:

```toml
name = "ferro-vpn"
compatibility_date = "2024-01-01"

[env.production]
vars = { NODE_ENV = "production" }

[env.preview]
vars = { NODE_ENV = "development" }
```

## Performance Optimization

### 1. Cloudflare Optimizations

Enable these features in Cloudflare Dashboard:
- **Cache:** Everything except HTML
- **Compression:** Brotli and Gzip
- **HTTP/2 & HTTP/3:** Enabled by default
- **Minify:** HTML, CSS, JavaScript
- **Security:** Always Use HTTPS

### 2. Caching Strategy

```http
# Cache-Control headers for different asset types
Cache-Control: public, max-age=31536000, immutable  # Static assets
Cache-Control: public, max-age=86400               # HTML pages
Cache-Control: no-store                          # Sensitive pages
```

### 3. Image Optimization

Use these image loading strategies:
```html
<!-- Above-the-fold images -->
<img src="hero.webp" width="1200" height="600" loading="eager" fetchpriority="high">

<!-- Below-the-fold images -->
<img src="servers.webp" width="800" height="400" loading="lazy">

<!-- Responsive images -->
<picture>
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="description">
</picture>
```

## Monitoring & Analytics

### 1. Cloudflare Analytics

Enable in Cloudflare Dashboard:
- **Analytics Overview:** Traffic, performance metrics
- **Speed:** Page speed insights
- **Health:** Uptime monitoring
- **Security:** DDoS protection, WAF rules

### 2. Performance Monitoring

Set up monitoring for:
- **Core Web Vitals**
- **Page load times**
- **Error rates**
- **Conversion rates**

### 3. Google Analytics Integration

Add to `src/layouts/Layout.astro`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

## Maintenance Tasks

### 1. Regular Updates

```bash
# Update dependencies
npm update

# Update Astro
npm update astro @astrojs/cloudflare

# Update Tailwind CSS
npm update tailwindcss @tailwindcss/vite
```

### 2. Security Updates

- Monitor npm security advisories
- Update packages with known vulnerabilities
- Regular dependency audits

### 3. Content Updates

Legal pages should be reviewed quarterly:
- Privacy Policy
- Terms of Service
- Support Documentation

## Troubleshooting

### 1. Build Errors

**Common Issues:**

```bash
# Node.js version mismatch
# Solution: Use Node.js 22.12.0
nvm use 22.12.0

# Missing dependencies
# Solution: Clean install
rm -rf node_modules package-lock.json
npm install

# TypeScript errors
# Solution: Check types
npm run astro check
```

### 2. Deployment Issues

**Cloudflare Pages Problems:**

- Build timeout: Increase timeout in `wrangler.toml`
- Memory limit: Optimize bundle size
- Custom domain issues: Check DNS configuration

**Debug Commands:**

```bash
# Preview build locally
npm run preview

# Check build output
ls -la dist/

# Validate HTML
npm install -g html-validator
html-validator dist/
```

### 3. Performance Issues

**Slow Loading:**
- Check image optimization
- Reduce JavaScript bundle size
- Enable caching

**Mobile Issues:**
- Test responsive breakpoints
- Check touch targets
- Verify mobile menu functionality

## Backup & Recovery

### 1. Version Control

- Commit regularly with meaningful messages
- Use semantic versioning
- Maintain feature branches

### 2. Backup Strategy

- Repository backups (GitHub provides this)
- Database backups (when integrated)
- Custom configuration backups

### 3. Rollback Procedure

```bash
# Check recent deployments
git log --oneline -10

# Checkout previous version
git checkout <commit-hash>

# Deploy rollback
git push origin main --force
```

## Environment Management

### 1. Environment Variables

Create environment-specific files:

```bash
# .env.development (local)
NODE_ENV=development
API_URL=http://localhost:3000

# .env.production (Cloudflare)
NODE_ENV=production
API_URL=https://api.ferrovpn.com
```

### 2. Secrets Management

Use Cloudflare Pages environment variables:
1. Go to Pages > your project > Environment variables
2. Add key-value pairs
3. Reference in code: `import.meta.env.VAR_NAME`

## Testing in Production

### 1. Pre-Release Checklist

- [ ] All tests passing
- [ ] Build validation
- [ ] Performance testing
- [ ] Cross-browser testing
- [ ] Mobile device testing

### 2. Staging Deployment

Use Cloudflare Pages preview deployments:
- Every pull request creates a preview
- Test changes before merge
- Share preview links for review

### 3. Monitoring Post-Deploy

Check these metrics after deployment:
- Page load times
- Error rates
- Conversion rates
- Core Web Vitals

## Optimization Checklist

### Performance Checklist
- [ ] Images optimized and properly sized
- [ ] Critical CSS inlined
- [ ] JavaScript deferred
- [ ] Caching headers set
- [ ] CDN enabled
- [ ] HTTP/2 enabled
- [ ] Service worker implemented (future)

### SEO Checklist
- [ ] Meta tags updated
- [ ] Open Graph tags included
- [ ] Twitter cards implemented
- [ ] Sitemap generated
- [ ] Robots.txt present
- [ ] Custom domain configured
- [ ] SSL enabled

### Security Checklist
- [ ] HTTPS enabled
- [ ] CSP configured
- [ ] No hardcoded secrets
- [ ] Input validation
- [ ] XSS protection
- [ ] Rate limiting enabled

---

*Deployment Guide Version: 1.0*
*Last Updated: April 2026*
*Next Review: July 2026*