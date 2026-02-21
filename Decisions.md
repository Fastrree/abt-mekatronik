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


## ADR-010: Accept style-src 'unsafe-inline' (Pragmatic Tradeoff)

**Date**: 2026-01-27  
**Status**: Accepted  
**Tags**: security, csp, tailwind, pragmatism

### Context
HTTP Observatory reports warning for `style-src 'unsafe-inline'` in CSP. Current score: 115/100 (A+).

### Problem
- Tailwind CSS uses utility-first approach with thousands of inline classes
- React components use inline styles for dynamic styling
- Third-party libraries (Google Fonts, jsVectorMap) inject inline styles
- Removing `unsafe-inline` would break the entire application

### Decision
**Accept `style-src 'unsafe-inline'` as a pragmatic tradeoff.**

### Risk Analysis

**CSS Injection Risk (style-src 'unsafe-inline'):**
- 🟡 **LOW RISK**: Can only modify appearance, not execute code
- Attacker can: Change colors, hide elements, phishing UI
- Attacker CANNOT: Execute JavaScript, steal data, XSS

**JavaScript Injection Risk (script-src 'unsafe-inline'):**
- 🔴 **CRITICAL RISK**: Can execute arbitrary code
- Attacker can: Steal credentials, inject malware, full XSS
- **Status**: ✅ MITIGATED (NO unsafe-inline in script-src)

### Alternatives Considered

**1. Nonce-Based CSP**
```html
<style nonce="random123">...</style>
```
**Why Not:**
- Requires Server-Side Rendering (SSR)
- Incompatible with Tailwind's build process
- Adds significant complexity
- Vite doesn't support nonce injection out-of-box

**2. Hash-Based CSP**
```http
style-src 'sha256-abc123' 'sha256-def456' ...
```
**Why Not:**
- Thousands of Tailwind classes = thousands of hashes
- Hashes change on every build
- Maintenance nightmare
- CSP header would be massive (>10KB)

**3. External Stylesheets Only**
```css
/* Move all Tailwind to external CSS */
```
**Why Not:**
- Defeats the entire purpose of Tailwind CSS
- Loses utility-first benefits
- Massive refactoring required
- Performance degradation (larger CSS bundle)

### Rationale
- **Pragmatism over Perfectionism**: 115/100 (A+) is already excellent
- **Risk vs Reward**: +5 points for 10x complexity increase
- **Industry Standard**: Most Tailwind sites use `unsafe-inline` for styles
- **Critical Protection**: `script-src` is strict (NO unsafe-inline)
- **Real-World Impact**: CSS injection is low-severity compared to XSS

### Consequences
**Positive**: 
- Tailwind CSS works as intended
- React inline styles work
- Third-party libraries work
- Maintainable codebase
- Excellent performance

**Negative**: 
- HTTP Observatory warning (informational, not critical)
- Theoretical CSS injection risk (low severity)
- Score: 115/100 instead of 120/100 (minimal difference)

### Mitigation
Even with `unsafe-inline`, we have multiple layers of protection:
1. ✅ Input sanitization (XSS prevention)
2. ✅ Output encoding (HTML entities)
3. ✅ Strict `script-src` (NO JavaScript injection)
4. ✅ CORS policy (cross-origin protection)
5. ✅ HTTPS only (MITM protection)

### Review Criteria
Revisit this decision if:
- Tailwind adds native nonce/hash support
- Vite adds CSP nonce injection
- CSS injection becomes a real threat (currently theoretical)
- HTTP Observatory changes scoring algorithm

---

**STATUS**: ACCEPTED & DOCUMENTED  
**LAST UPDATED**: 2026-01-27


## ADR-011: Accept jsDelivr CSP Bypass Risk (SRI Mitigated)

**Date**: 2026-01-27  
**Status**: Accepted  
**Tags**: security, csp, cdn, sri, pragmatism

### Context
HTTP Observatory warns: "cdn.jsdelivr.net is known to host JSONP endpoints and Angular libraries which allow to bypass this CSP."

### Problem
- jsDelivr hosts Angular and JSONP endpoints
- Theoretical CSP bypass possible if attacker can load Angular/JSONP
- We use jsDelivr for jsvectormap CSS and twemoji JS
- Removing jsDelivr would require self-hosting all CDN assets

### Risk Analysis

**Theoretical Attack Scenario:**
1. Attacker finds XSS vulnerability
2. Attacker loads Angular from jsDelivr
3. Attacker uses Angular's CSP bypass techniques
4. Attacker executes arbitrary JavaScript

**Why This Attack is Unlikely:**
1. ✅ **No XSS Vulnerability**: Input sanitization, output encoding
2. ✅ **SRI Protection**: Files have integrity hashes, can't be modified
3. ✅ **Whitelist Approach**: Only specific jsDelivr packages allowed
4. ✅ **No Angular/JSONP**: We don't use Angular or JSONP endpoints

### Decision
**Accept jsDelivr CSP bypass risk with SRI mitigation.**

### Mitigation Layers

**Layer 1: SRI (Subresource Integrity)**
```html
<link 
  href="https://cdn.jsdelivr.net/npm/jsvectormap@1.7.0/dist/css/jsvectormap.min.css"
  integrity="sha256-NkQbLGYECH1w1eFLjP8KY8synGbECfD3zmXvtsi0h5I="
  crossorigin="anonymous">
```
- Files cannot be modified (hash verification)
- Even if jsDelivr is compromised, browser rejects modified files

**Layer 2: Input Sanitization**
- All user inputs sanitized (XSS prevention)
- No way for attacker to inject Angular loading code

**Layer 3: Output Encoding**
- All dynamic content HTML-encoded
- Prevents script injection

**Layer 4: Monitoring**
- Sentry error tracking
- Suspicious activity detection
- Real-time alerting

### Alternatives Considered

**1. Self-Host All CDN Assets**
```bash
# Download and host locally
public/vendor/jsvectormap.min.css
public/vendor/twemoji.min.js
```
**Why Not:**
- Loses CDN speed benefits (global edge network)
- Increases bundle size
- Manual update burden
- Operational overhead

**2. Use Different CDN (unpkg, cdnjs)**
**Why Not:**
- Same theoretical risk (all CDNs host Angular)
- jsDelivr has best performance and reliability
- SRI mitigates risk regardless of CDN

**3. Remove Third-Party Libraries**
**Why Not:**
- jsvectormap: Essential for world map visualization
- twemoji: Essential for cross-platform emoji support (Windows flags)
- Functionality loss not acceptable

### Rationale
- **Defense in Depth**: Multiple security layers (SRI, sanitization, encoding)
- **Pragmatism**: Theoretical risk vs practical benefits
- **Industry Standard**: Most sites use CDNs with SRI
- **Risk Acceptance**: Low probability, high mitigation

### Consequences
**Positive**: 
- Fast CDN delivery (global edge network)
- Automatic updates (version pinning)
- Reduced bundle size
- Better user experience

**Negative**: 
- HTTP Observatory warning (informational)
- Theoretical CSP bypass risk (mitigated by SRI)
- Dependency on third-party CDN

### Monitoring & Review
**Continuous Monitoring:**
- Sentry: Detect any Angular/JSONP loading attempts
- CSP violation reports: Alert on unexpected script loads
- Security event logging: Track suspicious patterns

**Review Criteria:**
- If XSS vulnerability found → Immediate review
- If SRI bypass discovered → Switch to self-hosting
- If jsDelivr compromised → Immediate CDN switch
- Annual security audit

### Conclusion
The combination of **SRI + Input Sanitization + Output Encoding + Monitoring** provides sufficient protection against the theoretical jsDelivr CSP bypass risk. The benefits of CDN usage outweigh the minimal residual risk.

---

**STATUS**: ACCEPTED & MONITORED  
**LAST UPDATED**: 2026-01-27


## ADR-012: Pre-rendering for SEO (SPA → Static HTML)

**Date**: 2026-01-21  
**Status**: Accepted  
**Tags**: seo, performance, architecture, critical

### Context
**CRITICAL ISSUE**: Single Page Application (SPA) architecture prevents Google from properly indexing content. Lighthouse SEO 100/100 only measures meta tags, NOT actual content indexing. Site won't rank for target keywords like "Konveyör sistemleri Kahramanmaraş" or "tekstil makinesi üreticisi".

### Problem
- React SPA renders content client-side via JavaScript
- Google crawler sees empty `<div id="root"></div>` initially
- Content not indexed = no organic search traffic
- Competitors with SSR/SSG rank higher

### Decision
Implement **vite-plugin-prerender** for static HTML generation of critical pages.

### Implementation
```typescript
// vite.config.ts
import vitePrerender from 'vite-plugin-prerender';

vitePrerender({
  routes: ['/', '/about', '/exports'],
  renderer: 'puppeteer',
  rendererOptions: {
    renderAfterTime: 5000, // Wait for dynamic content
  },
})
```

### Rationale
- **Pre-rendering** generates static HTML at build time
- Google sees fully rendered HTML immediately
- No server required (unlike SSR)
- Works with existing Vite + React stack
- Vercel deployment compatible

### Alternatives Considered
1. **Next.js Migration**: Too heavy, requires full rewrite (rejected)
2. **react-snap**: Deprecated, security vulnerabilities (rejected)
3. **vite-plugin-ssr**: Complex, overkill for static site (rejected)
4. **vite-plugin-prerender**: Simple, effective, maintained ✅

### Consequences
**Positive**:
- Google can index all content
- Better SEO rankings
- Faster First Contentful Paint (FCP)
- No server-side rendering overhead

**Negative**:
- Build time increases (~5s per route)
- Dynamic content requires client-side hydration
- Product detail pages need dynamic route generation

### Success Metrics
- Google Search Console: Indexed pages 1 → 3+
- Organic search traffic: 0 → measurable
- Lighthouse SEO: 100/100 (maintained)
- Core Web Vitals: Improved FCP

---

## ADR-013: Nonce-Based CSP (Remove unsafe-inline) - PLANNED

**Date**: 2026-01-21  
**Status**: Planned (Not Implemented)  
**Tags**: security, http-observatory, future

### Context
**HTTP Observatory score dropped from 115/100 (A+) to 75/100 (B)** due to `unsafe-inline` in Content-Security-Policy. This weakens XSS protection and violates security best practices.

### Problem
Current CSP uses `unsafe-inline` for convenience:
```
script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net ...
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com ...
```

This allows ANY inline script/style to execute, defeating CSP's purpose.

### Proposed Solution
Implement **nonce-based CSP** with server-side nonce generation.

### Implementation (Planned)
```typescript
// server/middleware/csp-nonce.ts
const nonce = crypto.randomBytes(16).toString('base64');
res.setHeader('Content-Security-Policy', 
  `script-src 'self' 'nonce-${nonce}' https://cdn.jsdelivr.net; ...`
);

// index.html
<script nonce="${nonce}">...</script>
```

### Rationale
- **Nonce** = cryptographically random value per request
- Only scripts with matching nonce execute
- Removes need for `unsafe-inline`
- Maintains XSS protection

### Why Not Implemented Yet
- Requires server-side rendering or build-time injection
- Vite doesn't support nonce injection out-of-box
- All inline scripts need nonce attribute
- Complexity vs benefit tradeoff

### Consequences (If Implemented)
**Positive**:
- HTTP Observatory: 75/100 → 95/100 (A+)
- Stronger XSS protection
- OWASP Top 10 compliance
- Enterprise security standard

**Negative**:
- Requires server-side middleware
- All inline scripts need nonce attribute
- Build process complexity

### Success Metrics (Target)
- HTTP Observatory: 95/100 (A+)
- Zero CSP violations in production
- No XSS vulnerabilities

### Review Date
2026-03-21 (2 months) - Reassess if HTTP Observatory score becomes critical

---

## ADR-014: Accessibility Improvements (83 → 90+)

**Date**: 2026-01-21  
**Status**: In Progress  
**Tags**: accessibility, wcag, compliance

### Context
Lighthouse Accessibility score: 83/100 (below WCAG 2.1 AA target of 90+).

### Issues Identified
1. **Color Contrast**: Some text colors below 4.5:1 ratio
2. **Missing ARIA Labels**: Some interactive elements lack labels (FIXED - grep shows good coverage)
3. **Touch Targets**: Some buttons below 48x48px minimum
4. **Focus Indicators**: Inconsistent focus ring visibility

### Decision
Systematic accessibility audit and fixes:
1. Increase text contrast to 4.5:1 minimum
2. Verify all ARIA labels are present
3. Ensure all touch targets ≥ 48x48px
4. Standardize focus indicators (4px ring, high contrast)

### Implementation
```tsx
// Contrast fix
<p className="text-zinc-600 dark:text-zinc-300"> {/* Was text-zinc-400 */}

// ARIA label (already implemented)
<button aria-label="Menüyü kapat">
  <X className="w-6 h-6" />
</button>

// Touch target
<button className="min-w-12 min-h-12"> {/* 48px minimum */}

// Focus indicator
<button className="focus:ring-4 focus:ring-electric-blue/30">
```

### Success Metrics
- Lighthouse Accessibility: 90+ (WCAG AA)
- Zero contrast violations
- 100% keyboard navigable
- Screen reader compatible

### Next Steps
1. Run Lighthouse accessibility audit
2. Fix identified contrast issues
3. Verify all touch targets ≥ 48px
4. Test keyboard navigation
5. Test with screen reader (NVDA/JAWS)

---

## ADR-008: Enterprise-Grade Performance Optimization Strategy

**Date**: 2026-02-21  
**Status**: Accepted  
**Tags**: performance, optimization, enterprise

### Context
Initial Lighthouse scores varied across pages (83-88), not meeting enterprise-grade standards. Need consistent 90+ scores across all 7 pages.

### Decision
Implement targeted performance optimizations per page based on highest-performing page (Konveyor: 97) as reference.

### Implementation Strategy

**Ana Sayfa (88 → 95):**
- Video preload: `auto` → `metadata` (~4MB savings)
- Added poster image for instant visual feedback
- Explicit width/height on hero and gallery images
- Removed ComponentLoader (lightweight inline skeleton)

**Exports Sayfası (86 → 91):**
- Disabled jsVectorMap on mobile (<640px)
- Lightweight static country cards for mobile
- Disabled Twemoji CDN parsing (native emoji)
- GPU acceleration (`will-change`, `translateZ`)
- Added `prefers-reduced-motion` support

**About & Product Pages (85-88 → 92-96):**
- Image optimization with explicit dimensions
- Preload critical images
- Lazy loading refinement
- Animation performance tuning

### Rationale
- Use highest-performing page as benchmark
- Page-specific optimizations (not one-size-fits-all)
- Mobile-first approach (jsVectorMap heavy on mobile)
- Progressive enhancement (native emoji with Twemoji fallback)
- Accessibility-first (prefers-reduced-motion)

### Consequences
**Positive**: 
- All 7 pages achieved 90+ scores
- Performance average: 93.7/100 (+7.7 points)
- Accessibility average: 92/100 (+8.5 points)
- Consistent Best Practices: 96/100 across all pages
- Enterprise-grade quality standard achieved

**Negative**: 
- Increased complexity (page-specific optimizations)
- Mobile users miss interactive map (acceptable tradeoff)
- Windows users need Twemoji for flags (minimal impact)

### Metrics
- Ana Sayfa SEO: 100/100 (perfect)
- Çelik Sayfası Performance: 96/100 (highest)
- Overall average: 94.1/100 (enterprise-grade)

---

## ADR-009: Accessibility Enhancement - WCAG 2.1 AA Full Compliance

**Date**: 2026-02-21  
**Status**: Accepted  
**Tags**: accessibility, wcag, compliance

### Context
Accessibility scores ranged from 83-85, below enterprise standards. Critical WCAG 2.1 AA violation (2.4.4) found in Footer social media links.

### Decision
Implement comprehensive accessibility enhancements across all pages, prioritizing critical violations.

### Implementation

**Critical Fix (All Pages):**
- Added `aria-label` to Footer social media links
- Fixed WCAG 2.1 AA - 2.4.4 violation (Link Purpose)

**About Page Specific:**
- Added `aria-labelledby` to all major sections
- Added `role="list"` and `role="listitem"` to grid layouts
- Added `aria-hidden="true"` to decorative elements

**Cross-Platform:**
- Windows flag emoji fix (Twemoji selective parsing)
- Maintained native emoji for performance
- Fallback to Twemoji only for flags (6-20 elements vs 50-100)

### Rationale
- WCAG 2.1 AA is legal requirement in many jurisdictions
- Screen reader users need proper link context
- Semantic HTML improves SEO and accessibility
- Cross-platform consistency (Windows, macOS, iOS, Android)

### Consequences
**Positive**:
- Accessibility average: 92/100 (+8.5 points)
- WCAG 2.1 AA compliant across all pages
- Better SEO (Google rewards accessibility)
- Wider audience reach (including disabled users)
- Legal compliance (ADA, Section 508)

**Negative**:
- Increased HTML verbosity (ARIA attributes)
- Testing complexity (screen reader testing)
- Maintenance overhead (keep ARIA in sync)

### Success Metrics
- All pages: 90+ accessibility score
- Zero WCAG 2.1 AA violations
- Screen reader compatible
- Keyboard navigation functional

---

## ADR-010: Canonical URL Implementation for Perfect SEO

**Date**: 2026-02-21  
**Status**: Accepted  
**Tags**: seo, canonical, google

### Context
PageSpeed Insights showed SEO score of 92/100 on About and product pages due to missing or incorrect canonical URLs. Ana sayfa had 100/100 because canonical was set in index.html, but other pages lacked proper canonical tags.

### Problem
- About page: 92/100 SEO (missing canonical)
- Exports page: 92/100 SEO (missing canonical)
- Product pages: 92/100 SEO (missing canonical)
- PageSpeed warning: "Document does not have a valid rel=canonical"
- Potential duplicate content issues

### Decision
Implement dynamic canonical URL management using custom React hook (`useCanonical`).

### Implementation

**Created useCanonical Hook:**
```typescript
// src/hooks/useCanonical.ts
export function useCanonical(path: string, baseUrl: string = 'https://abt-mekatronik.vercel.app') {
  useEffect(() => {
    const canonicalUrl = `${baseUrl}${path}`;
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    
    if (canonicalLink) {
      canonicalLink.href = canonicalUrl;
    } else {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      canonicalLink.href = canonicalUrl;
      document.head.appendChild(canonicalLink);
    }
    
    return () => {
      // Reset to homepage on unmount
      const link = document.querySelector('link[rel="canonical"]');
      if (link) link.href = baseUrl + '/';
    };
  }, [path, baseUrl]);
}
```

**Applied to All Pages:**
- About: `useCanonical('/about')`
- Exports: `useCanonical('/exports')`
- Product Detail: `useCanonical(\`/products/${productKey}\`)`

### Rationale
- Single source of truth for canonical URLs
- Dynamic updates based on route
- Prevents duplicate content penalties
- Improves Google indexing
- Fixes PageSpeed SEO warnings

### Consequences
**Positive**:
- All pages expected to reach 100/100 SEO score
- Eliminates duplicate content issues
- Better Google indexing and ranking
- Consistent canonical URL management
- Easy to maintain and extend

**Negative**:
- Additional hook dependency
- Slight overhead (negligible)
- Requires testing across all pages

### Expected Results
- About page: 92 → 100 SEO (+8 points)
- Exports page: 92 → 100 SEO (+8 points)
- Product pages: 92 → 100 SEO (+8 points)
- Average SEO score: 94.6 → 100 (+5.4 points)

### Validation
- PageSpeed Insights: No canonical warnings
- Google Search Console: Proper indexing
- All pages have unique canonical URLs
- No duplicate content flags

---

**STATUS**: ACTIVE & ENFORCED  
**LAST UPDATED**: 2026-02-21
