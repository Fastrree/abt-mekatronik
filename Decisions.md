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
