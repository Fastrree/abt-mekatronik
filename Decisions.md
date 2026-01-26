# 📋 ARCHITECTURAL DECISION RECORDS (ADR)

**ROLE**: Decision Documentation & Historical Context  
**PURPOSE**: Document significant architectural decisions with rationale  
**PHILOSOPHY**: "Every decision has a context, a reason, and consequences"

---

## ADR-001: React + TypeScript + Vite Stack

**Date**: 2026-01-16  
**Status**: Accepted  
**Tags**: technology, performance, dx

### Context
Need modern frontend stack for corporate website with fast development, type safety, and excellent performance.

### Decision
Use React 18 + TypeScript + Vite as core technology stack.

### Rationale
- React 18: Industry standard, concurrent features
- TypeScript: Type safety prevents runtime errors
- Vite: Lightning-fast HMR, optimized builds
- Excellent developer experience

### Consequences
**Positive**: Fast development, type-safe codebase, Lighthouse 92+, large ecosystem
**Negative**: TypeScript learning curve, build complexity

### Alternatives Considered
- Next.js: Too heavy for SPA
- Vue.js: Smaller ecosystem
- Svelte: Less mature tooling

---

## ADR-002: Edge Browser Video Autoplay - HTML-Only

**Date**: 2026-01-18  
**Status**: Accepted  
**Tags**: cross-browser, video, ux

### Context
Hero video autoplay failing in Edge Desktop (works in Chrome, Firefox, Safari, Edge Mobile).

### Decision
Use HTML-only autoplay approach instead of JavaScript play() method.

### Implementation
```tsx
// ✅ WORKS
<video src="/video.mp4?v=5" autoPlay="" muted="" loop="" playsInline="" preload="auto" />

// ❌ DOESN'T WORK
<video ref={videoRef}><source src="/video.mp4" /></video>
useEffect(() => videoRef.current?.play())
```

### Rationale
- Browser native autoplay policy handling
- Edge Desktop requires HTML attributes
- Simpler code, fewer edge cases
- No play/pause loops

### Consequences
**Positive**: 100% cross-browser success, simpler code, better performance
**Negative**: Less programmatic control, cache busting required

---

## ADR-003: Security Headers - HTTP Observatory B+

**Date**: 2026-01-19  
**Status**: Accepted  
**Tags**: security, compliance

### Context
Initial HTTP Observatory score: 58/100 (C). Missing critical security headers.

### Decision
Implement 10 critical security headers: CSP, X-Frame-Options, HSTS, etc.

### Rationale
- XSS Protection (CSP)
- Clickjacking Prevention (X-Frame-Options)
- HTTPS Enforcement (HSTS)
- OWASP Top 10 compliance

### Consequences
**Positive**: Score 88/100 (B+), +52% improvement, enterprise security
**Negative**: CSP complexity, Vercel config, testing overhead

---

## ADR-004: i18n System - Custom Implementation

**Date**: 2026-01-17  
**Status**: Accepted  
**Tags**: i18n, localization

### Context
Need 7-language support (TR, EN, DE, FR, ES, AR, RU) with RTL for Arabic.

### Decision
Build custom i18n system with React Context + TypeScript.

### Rationale
- Type-safe translations
- Small bundle (lazy loading per language)
- Full customization (RTL, pluralization)
- No external dependencies

### Consequences
**Positive**: Type safety, small bundle, full control
**Negative**: Manual translation management, no editor UI

---

## ADR-005: RTL Layout - Force LTR with RTL Text

**Date**: 2026-01-18  
**Status**: Accepted  
**Tags**: i18n, rtl, ux

### Context
Arabic requires RTL but full RTL layout causes animation bugs.

### Decision
Force LTR layout, only text direction RTL.

### Rationale
- Consistent layout across languages
- No animation bugs
- Simpler CSS
- User feedback positive

### Consequences
**Positive**: Consistent layout, no bugs, simpler code
**Negative**: Not "true" RTL, custom text handling

---

## ADR-006: Performance Budget - Lighthouse 90+

**Date**: 2026-01-18  
**Status**: Accepted  
**Tags**: performance, metrics

### Decision
Enforce strict performance budget:
- Lighthouse: 90+ (all categories)
- FCP: <1.5s, LCP: <2.5s, TTI: <3.5s
- Bundle: <200KB gzipped
- Lighthouse CI on every commit

### Consequences
**Positive**: Excellent UX (92+ score), better SEO, higher conversion
**Negative**: Development constraints, CI complexity

---

## ADR-007: Monitoring Stack - Sentry + Lighthouse CI + GA4

**Date**: 2026-01-19  
**Status**: Accepted  
**Tags**: monitoring, observability

### Decision
Three-tier monitoring:
1. Sentry: Error tracking + Performance
2. Lighthouse CI: Automated audits
3. GA4: User behavior analytics

### Consequences
**Positive**: Proactive error detection, regression prevention, data-driven decisions, zero cost
**Negative**: Setup complexity, privacy considerations

---

## ADR-008: Vercel Web Analytics Integration

**Date**: 2026-01-24  
**Status**: Accepted  
**Tags**: monitoring, analytics, privacy

### Context
Need privacy-focused visitor tracking to complement GA4. Vercel Web Analytics provides GDPR-compliant, cookie-less tracking with zero configuration.

### Decision
Add Vercel Web Analytics alongside existing monitoring stack.

### Implementation
```tsx
// App.tsx
import { Analytics } from "@vercel/analytics/react";

function AppContent() {
  return (
    <TooltipProvider>
      {/* ... other components ... */}
      <SpeedInsights />
      <Analytics />
    </TooltipProvider>
  );
}
```

### Rationale
- **Privacy-First**: No cookies, GDPR compliant
- **Zero Config**: Works out-of-box on Vercel
- **Lightweight**: Minimal performance impact
- **Complementary**: Works alongside GA4 and Sentry
- **Real User Metrics**: Accurate visitor tracking

### Consequences
**Positive**: 
- Privacy-compliant tracking
- No cookie consent needed for Web Analytics
- Automatic route tracking (React wrapper)
- Free tier sufficient for traffic volume
- Unified Vercel dashboard (Speed Insights + Web Analytics)

**Negative**: 
- Vercel platform lock-in
- Limited customization vs GA4
- Requires Vercel deployment to enable

### Monitoring Stack (Updated)
1. **Vercel Web Analytics**: Privacy-focused visitor tracking
2. **Vercel Speed Insights**: Performance monitoring (Core Web Vitals)
3. **Google Analytics 4**: User behavior analytics (detailed)
4. **Sentry**: Error tracking + Performance monitoring
5. **Lighthouse CI**: Automated performance audits

### Alternatives Considered
- **Plausible Analytics**: Paid, self-hosted complexity
- **Fathom Analytics**: Paid, no free tier
- **Matomo**: Self-hosted, infrastructure overhead
- **Simple Analytics**: Paid, limited features

### Next Steps
1. Deploy to Vercel production
2. Enable Web Analytics in Vercel dashboard (Project → Analytics → Enable)
3. Verify tracking: Network tab → `/_vercel/insights/view` requests
4. Monitor visitor data in Vercel dashboard
5. Compare metrics with GA4 for validation

---

**STATUS**: ACTIVE & ENFORCED  
**LAST UPDATED**: 2026-01-24


## ADR-008: CSP Improvement - Remove unsafe-inline/unsafe-eval

**Date**: 2026-01-27  
**Status**: Accepted  
**Tags**: security, csp, http-observatory

### Context
HTTP Observatory reported CSP failure due to `unsafe-inline` and `unsafe-eval` in production. Score: 88/100 (B+), losing 20 points on CSP.

### Problem
- Inline Google Analytics script in `index.html`
- Inline splash screen script in `index.html`
- Development CSP with `unsafe-inline` and `unsafe-eval` leaking to production

### Decision
1. Move all inline scripts to external `init.js` file
2. Implement environment-aware CSP (development vs production)
3. Keep Schema.org JSON-LD scripts inline (safe, `type="application/ld+json"`)

### Implementation
```typescript
// server/index.ts - Environment-aware CSP
const isDevelopment = process.env.NODE_ENV !== 'production';
const cspDirectives = [
  "default-src 'self'",
  isDevelopment 
    ? "script-src 'self' 'unsafe-inline' 'unsafe-eval' ..." // Dev only
    : "script-src 'self' ...", // Production: NO unsafe directives
  // ... other directives
];
```

```html
<!-- index.html - External scripts only -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-6VF25T2SF3"></script>
<script src="/init.js"></script>
```

### Rationale
- `unsafe-inline` and `unsafe-eval` are major XSS risks
- External scripts are easier to audit and secure
- Environment-aware CSP allows development flexibility
- Schema.org JSON-LD is safe (not executable JavaScript)

### Consequences
**Positive**: 
- HTTP Observatory score: 88/100 → 95-100/100 (B+ → A+)
- +7-12 points improvement
- Enterprise-grade CSP compliance
- Maximum XSS protection

**Negative**: 
- Additional HTTP request for `init.js` (minimal impact, ~1KB)
- CSP complexity increased (environment awareness)

### Alternatives Considered
- Hash-based CSP: Too complex, hard to maintain
- Nonce-based CSP: Requires SSR, overkill for static site
- Keep unsafe directives: Security risk, failed audit


## ADR-009: Subresource Integrity (SRI) Implementation

**Date**: 2026-01-27  
**Status**: Accepted  
**Tags**: security, sri, cdn, http-observatory

### Context
HTTP Observatory reported missing SRI (Subresource Integrity) for external CDN scripts. Score: 110/100 (A+), losing 5 points on SRI.

### Problem
- jsVectorMap CSS loaded from jsDelivr CDN without integrity check
- Twemoji JS loaded from jsDelivr CDN without integrity check
- Risk: CDN compromise or MITM attack could inject malicious code

### Decision
Add SHA-256 integrity hashes to all external CDN resources.

### Implementation
```html
<!-- jsVectorMap CSS with SRI -->
<link 
  rel="stylesheet" 
  href="https://cdn.jsdelivr.net/npm/jsvectormap@1.7.0/dist/css/jsvectormap.min.css"
  integrity="sha256-NkQbLGYECH1w1eFLjP8KY8synGbECfD3zmXvtsi0h5I="
  crossorigin="anonymous">

<!-- Twemoji JS with SRI -->
<script 
  src="https://cdn.jsdelivr.net/npm/twemoji@14.0.2/dist/twemoji.min.js"
  integrity="sha256-cGIk2NxUQEYPjtkcGmqtJdcyr24O5vsxFRsVerSFurs="
  crossorigin="anonymous"></script>
```

### Hash Generation
```powershell
# Download file and compute SHA-256 hash
$content = Invoke-WebRequest -Uri "https://cdn.jsdelivr.net/..." -UseBasicParsing
$bytes = [System.Text.Encoding]::UTF8.GetBytes($content.Content)
$hash = [System.Security.Cryptography.SHA256]::Create().ComputeHash($bytes)
$base64 = [Convert]::ToBase64String($hash)
Write-Output "sha256-$base64"
```

### Rationale
- **CDN Compromise Protection**: If CDN is hacked, browser rejects modified files
- **MITM Protection**: Man-in-the-Middle attacks can't inject malicious code
- **Supply Chain Security**: Ensures third-party resources are not tampered with
- **Zero Performance Impact**: Hash verification is instant

### Consequences
**Positive**: 
- HTTP Observatory score: 110/100 → 115/100 (A+)
- +5 points improvement
- Maximum security score achieved
- Protection against CDN compromise
- Protection against supply chain attacks

**Negative**: 
- Hash must be updated when CDN file version changes
- Requires manual hash generation for new CDN resources
- Slight maintenance overhead

### Alternatives Considered
- Self-hosting CDN files: Increases bundle size, loses CDN benefits
- Skip SRI: Security risk, failed audit
- Use jsDelivr auto-SRI: Not reliable, manual is better

### Maintenance
When updating CDN versions:
1. Download new file from CDN
2. Compute SHA-256 hash
3. Update `integrity` attribute in HTML
4. Test that file loads correctly
5. Commit changes

---

**STATUS**: ACTIVE & ENFORCED  
**LAST UPDATED**: 2026-01-27
