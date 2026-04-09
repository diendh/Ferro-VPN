# Ferro VPN Code Standards & Conventions

## Introduction
This document outlines the coding standards, conventions, and design patterns used in the Ferro VPN website project. All developers should adhere to these standards to maintain code quality, consistency, and performance across the codebase.

## General Principles

### 1. Immutability (CRITICAL)
- **Always create new objects, never mutate existing ones**
- Use const for variables that won't be reassigned
- Prefer object spread/clone operations for state updates
- Example:
  ```javascript
  // WRONG: mutate existing object
  user.plan = 'pro';
  
  // CORRECT: create new object
  const updatedUser = { ...user, plan: 'pro' };
  ```

### 2. File Organization
- **MANY SMALL FILES > FEW LARGE FILES**
- Target: 200-400 lines per file, maximum 800 lines
- Organize by feature/domain, not by file type
- High cohesion, low coupling between modules

### 3. Error Handling
- Handle errors explicitly at every level
- Provide user-friendly error messages in UI
- Log detailed error context server-side
- Never silently swallow errors

### 4. Input Validation
- Validate all user input before processing
- Use schema-based validation where available
- Fail fast with clear error messages
- Never trust external data

## Project-Specific Standards

### 1. Component Structure

#### Astro Component Template
```astro
---
// Frontmatter with imports and props
import Navbar from '../components/common/Navbar.astro';

interface Props {
  title: string;
  description?: string;
  showFooter?: boolean;
}

const { title, description = "Default description", showFooter = true } = Astro.props;
---

// Component JSX with proper spacing
<div class="container">
  <Navbar />
  <main>
    <h1 class="text-3xl font-bold">{title}</h1>
    <p>{description}</p>
  </main>
  {showFooter && <Footer />}
</div>
```

#### Component File Naming
- Use PascalCase for components: `Hero.astro`, `Pricing.astro`
- Group related components in subdirectories: `components/landing/`
- Common components go in `components/common/`

#### Component Organization
```astro
<Layout title="Ferro - Privacy Shield">
  <Navbar />
  <main>
    <Hero />
    <Features />
    <Servers />
    <Pricing />
  </main>
  <Footer />
</Layout>
```

### 2. CSS & Styling

#### Design Tokens System
- **Only edit in `src/styles/global.css`**
- Use CSS custom properties for theming
- Follow the established color system from AppColors

#### Tailwind CSS Usage
```css
/* Use utility classes for styling */
.glass-card {
  @apply backdrop-blur-lg bg-bg-surface border border-border-main shadow-lg;
}

/* Custom CSS only for design tokens */
@theme {
  --color-brand-primary: #114AD0;
  --radius-button: 9999px;
}
```

#### Responsive Design
- Mobile-first approach
- Use responsive breakpoints: sm, md, lg, xl
- Example:
  ```html
  <div class="hidden md:flex">Desktop only</div>
  <div class="flex md:hidden">Mobile only</div>
  ```

### 3. JavaScript & TypeScript

#### TypeScript Requirements
- Use `.ts` or `.tsx` for all JavaScript files
- Define proper interfaces for props
- Enable strict mode in tsconfig

#### Alpine.js Integration
```javascript
// Use x-data for component state
<div x-data="{ open: false }">
  <button @click="open = !open">Toggle</button>
  <div x-show="open" x-transition>Content</div>
</div>
```

#### Event Handling
```javascript
// Prefer event delegation
<a href="#" @click.prevent="handleSubmit">Submit</a>

// Use custom events for component communication
<button @click="$dispatch('open-download-modal')">Download</button>
```

### 4. Theme System

#### Dark Mode Default
- Site defaults to dark mode
- Light mode only if explicitly saved in localStorage
- Theme script must be inlined in head to avoid FOUC

#### Theme Variables
```css
/* Light theme */
:root {
  --bg-page: #F6F6F8;
  --bg-surface: rgba(255, 255, 255, 0.85);
  --text-main: #0F172A;
}

/* Dark theme (default) */
.dark {
  --bg-page: #020617;
  --bg-surface: rgba(31, 41, 55, 0.6);
  --text-main: #f8fafc;
}
```

### 5. Navigation & Routing

#### Smooth Scrolling
```html
<html lang="en" class="scroll-smooth">
```

#### Link Structure
```html
<!-- Internal links with smooth scroll -->
<a href="/#features" class="text-text-muted hover:text-brand-primary">Features</a>

<!-- External links with rel="noopener" -->
<a href="https://puresoftltd.com/" rel="noopener" target="_blank">Company Website</a>
```

### 6. Performance Standards

#### Image Optimization
- Always specify width and height
- Use proper loading attribute
- Example:
  ```html
  <img src="/logo.svg" alt="Ferro VPN" width="200" height="60" loading="eager">
  ```

#### Critical CSS
- Inline critical CSS above-the-fold styles
- Load non-critical CSS asynchronously
- Use `@layer utilities` for custom utilities

#### JavaScript Minification
- Let Astro handle minification
- Use dynamic imports for heavy libraries
- Example:
  ```javascript
  const Alpine = await import('alpinejs');
  Alpine.start();
  ```

## Code Quality Checklist

Before marking work complete:

- [ ] Code follows established naming conventions
- [ ] Functions are small (<50 lines)
- [ ] Files are focused (<800 lines)
- [ ] No deep nesting (>4 levels)
- [ ] Proper error handling implemented
- [ ] No hardcoded values (use CSS variables or config)
- [ ] No mutation patterns (use immutable operations)
- [ ] TypeScript types defined for all props
- [ ] Responsive design tested
- [ ] Accessibility considerations addressed

## Testing Standards

### Visual Testing
- Test breakpoints: 320, 375, 768, 1024, 1440, 1920
- Verify dark/light theme switching
- Check hover states and transitions
- Test mobile menu functionality

### Performance Testing
- Core Web Vitals targets:
  - LCP < 2.5s
  - INP < 200ms
  - CLS < 0.1
- Bundle size < 150kb (gzipped)
- First paint < 1s

## Security Standards

### Content Security Policy
- Implement production CSP
- Use nonces for scripts instead of 'unsafe-inline'
- Example:
  ```html
  <script nonce="abc123">...</script>
  ```

### Input Sanitization
- Sanitize all user inputs
- Use proper escape functions for dynamic content
- Never use `dangerouslySetInnerHTML`

### API Security
- No hardcoded API keys
- Use environment variables for secrets
- Implement proper CORS headers

## Git Workflow

### Commit Message Format
```
<type>: <description>

[optional body]

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
```

Types:
- feat: New feature
- fix: Bug fix
- refactor: Code changes
- docs: Documentation changes
- test: Test changes
- chore: Maintenance
- perf: Performance improvements

### Branch Strategy
- Use feature branches for new work
- Main branch is protected
- Pull requests required for all changes
- Code review mandatory for all merges

## Performance Guidelines

### Loading Strategy
1. Inline critical CSS
2. Defer non-critical JavaScript
3. Use loading="lazy" for below-fold images
4. Preload critical assets

### Animation Performance
- Use CSS transforms for animations
- Avoid animating layout properties
- Use `will-change` sparingly
- Remove after animation completes

### Render Optimization
- Minimize DOM reflows
- Use CSS containment where appropriate
- Implement proper virtualization for long lists

## Accessibility Standards

### WCAG 2.1 AA Compliance
- Proper heading hierarchy (H1, H2, H3...)
- Alt text for all images
- ARIA labels for interactive elements
- Keyboard navigation support
- Color contrast ratios > 4.5:1

### Semantic HTML
```html
<!-- Use proper semantic elements -->
<header>
  <nav aria-label="Main navigation">...</nav>
</header>

<main>
  <section aria-labelledby="features-heading">
    <h2 id="features-heading">Features</h2>
  </section>
</main>
```

### Focus Management
- Visible focus indicators
- Logical tab order
- Focus trapping for modals
- Skip navigation links

## Development Environment Setup

### Prerequisites
- Node.js >= 22.12.0
- npm or yarn
- VS Code with recommended extensions

### Recommended VS Code Extensions
- Astro Language Support
- Tailwind CSS IntelliSense
- ESLint
- Prettier
- TypeScript Hero

### Local Development Commands
```bash
npm install          # Install dependencies
npm run dev          # Start dev server (localhost:4321)
npm run build        # Build for production
npm run preview      # Preview production build
npm run deploy       # Deploy to Cloudflare
```

## Common Patterns & Anti-patterns

### ✅ Do
- Use glass-morphism consistently
- Implement proper error boundaries
- Use semantic HTML elements
- Follow mobile-first design
- Implement proper loading states
- Use TypeScript for type safety
- Follow established naming conventions

### ❌ Don't
- Hardcode colors or styles
- Use inline styles in JSX
- Create deeply nested components
- Ignore accessibility requirements
- Skip responsive testing
- Use console.log in production
- Forget accessibility attributes

## Review Checklist

Code should be reviewed for:
- [ ] Performance impact
- [ ] Security vulnerabilities
- [ ] Accessibility compliance
- [ ] Code consistency
- [ ] Proper error handling
- [ ] Responsive design
- [ ] Type safety
- [ ] Documentation completeness

---

*Last Updated: April 2026*
*Document Version: 1.0*
*Status: Active*