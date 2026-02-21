# ADR-008: URL-Based Language Routing

**Date**: 2026-02-21  
**Status**: Accepted  
**Author**: Development Team  
**Tags**: i18n, seo, routing, ux

---

## Context

The website supports 7 languages (TR, EN, DE, FR, ES, AR, RU) but language selection was only stored in localStorage without URL reflection. This created several issues:

1. **SEO Problem**: Google couldn't index separate language versions
2. **Sharing Problem**: Users couldn't share language-specific URLs
3. **Direct Access Problem**: No way to directly access a specific language version
4. **Analytics Problem**: Couldn't track language-specific page views

**User Request**: "dil seçiciden seçilen dile göre bizim urlmizde buna göre değişsin" (URL should change based on language selector)

---

## Decision

Implement URL-based language routing with the following structure:

### URL Structure
- **ALL Languages**: Language prefix in URL (including Turkish)
  - `https://abtmekatronik.com/tr/`
  - `https://abtmekatronik.com/tr/about`
  - `https://abtmekatronik.com/en/products/konveyor`
  - `https://abtmekatronik.com/ar/exports`

- **Old URLs (no prefix)**: Redirect to `/tr/`
  - `https://abtmekatronik.com/` → `/tr/`
  - `https://abtmekatronik.com/about` → `/tr/about`

### Language Detection Priority
1. **URL prefix** (highest priority)
2. **localStorage** (user preference)
3. **Browser language** (automatic detection)

---

## Implementation

### 1. Core Utilities (`language-utils.ts`)
```typescript
// Extract language from URL
getLanguageFromPath('/en/about') → 'en'
getLanguageFromPath('/tr/about') → 'tr'
getLanguageFromPath('/about') → 'tr' (redirects to /tr/about)

// Build language-aware URLs (ALL languages have prefix)
buildLanguagePath('/about', 'en') → '/en/about'
buildLanguagePath('/about', 'tr') → '/tr/about'

// Get all language alternates for SEO
getLanguageAlternates('/about') → {
  tr: 'https://abtmekatronik.com/tr/about',
  en: 'https://abtmekatronik.com/en/about',
  de: 'https://abtmekatronik.com/de/about',
  // ... all 7 languages
}
```

### 2. Client-Side Routing (`App.tsx`)
- Router extracts clean path without language prefix
- Routes match against clean paths
- Language context syncs with URL on every navigation

### 3. Language Selector (`LanguageSelector.tsx`)
- Clicking a language updates URL with new prefix
- Uses `useLocation` from wouter for navigation
- Maintains current page path when switching languages

### 4. Server-Side Middleware (`language-routing.ts`)
- Validates language prefixes
- Redirects invalid language codes to Turkish
- Sets language header for SSR
- Skips API routes and static assets

### 5. SEO Optimization (`useCanonical.ts`)
- Generates canonical URLs with language prefix
- Adds hreflang tags for all language versions
- Includes x-default hreflang (Turkish)

---

## Rationale

### Why All Languages Have Prefix (Including Turkish)?
1. **Consistency**: All languages treated equally
2. **No Ambiguity**: Clear language indication in every URL
3. **Easier Routing**: Simpler logic, no special cases
4. **Better UX**: Language switching preserves current page
5. **SEO Clarity**: Google knows exact language for each URL

### Why URL-Based (Not Subdomain)?
- **Simpler Infrastructure**: No need for multiple subdomains
- **Easier Maintenance**: Single codebase, single deployment
- **Better for Small Sites**: Subdomain approach is overkill for 7 pages
- **SEO Friendly**: Google handles path-based i18n well

### Why Not Query Parameters?
- **Cleaner URLs**: `/en/about` vs `/about?lang=en`
- **Better SEO**: Search engines prefer path-based structure
- **User-Friendly**: Easier to read and share

---

## Consequences

### Positive
✅ **SEO Improvement**: Google can index all 49 URL combinations (7 languages × 7 pages)  
✅ **Shareable URLs**: Users can share language-specific links  
✅ **Direct Access**: Can bookmark and access specific language versions  
✅ **Analytics**: Track language-specific page views in GA4  
✅ **Better UX**: URL reflects current language state  
✅ **hreflang Tags**: Proper SEO signals for multilingual content  
✅ **Canonical URLs**: Prevents duplicate content issues  

### Negative
⚠️ **URL Changes**: All URLs now require language prefix (including Turkish)  
⚠️ **Redirect Needed**: Old URLs without prefix redirect to `/tr/`  
⚠️ **Complexity**: More complex routing logic  
⚠️ **Testing**: Need to test 49 URL combinations  
⚠️ **Migration**: Need to update internal links and bookmarks  

### Neutral
ℹ️ **Backward Compatible**: Old URLs (without prefix) redirect to `/tr/`  
ℹ️ **No Breaking Changes**: localStorage still used as fallback  
ℹ️ **Consistent**: All languages now have equal URL structure  

---

## Alternatives Considered

### Alternative 1: Subdomain-Based Routing
```
tr.abtmekatronik.com
en.abtmekatronik.com
de.abtmekatronik.com
```
**Rejected**: Too complex for 7 pages, requires DNS configuration, splits domain authority

### Alternative 2: Query Parameter-Based
```
abtmekatronik.com/about?lang=en
```
**Rejected**: Poor SEO, ugly URLs, not user-friendly

### Alternative 3: Cookie-Based (No URL Change)
```
abtmekatronik.com/about (language in cookie)
```
**Rejected**: No SEO benefit, can't share language-specific URLs

---

## Migration Plan

### Phase 1: Implementation ✅
- [x] Create language utilities
- [x] Update i18n provider
- [x] Update LanguageSelector
- [x] Update App.tsx routing
- [x] Update useCanonical hook
- [x] Add server-side middleware

### Phase 2: Testing
- [ ] Test all 49 URL combinations
- [ ] Test language switching
- [ ] Test direct URL access
- [ ] Test browser back/forward
- [ ] Validate hreflang tags
- [ ] Check Google Search Console

### Phase 3: Deployment
- [ ] Deploy to staging (Vercel preview)
- [ ] Test in production-like environment
- [ ] Deploy to production
- [ ] Monitor analytics for issues
- [ ] Update sitemap.xml

---

## Success Metrics

### Technical Metrics
- ✅ All 49 URLs work correctly
- ✅ Language switching is seamless
- ✅ hreflang tags present on all pages
- ✅ Canonical URLs correct for each language
- ✅ No 404 errors from language routing

### SEO Metrics (Post-Deployment)
- 📊 Google Search Console shows no hreflang errors
- 📊 All language versions indexed by Google
- 📊 No duplicate content warnings
- 📊 Improved international search visibility

### User Metrics (Post-Deployment)
- 📊 Language-specific page views in GA4
- 📊 Reduced bounce rate (better language targeting)
- 📊 Increased engagement from international users

---

## Testing Checklist

### Functional Testing
- [ ] `/` → `/tr/` redirect
- [ ] `/about` → `/tr/about` redirect
- [ ] `/tr/` → Turkish homepage
- [ ] `/en/` → English homepage
- [ ] `/de/about` → German about page
- [ ] `/ar/products/konveyor` → Arabic product page
- [ ] `/invalid-lang/` → Redirect to `/tr/`
- [ ] Language selector updates URL
- [ ] Browser back/forward works
- [ ] Page refresh maintains language
- [ ] Direct URL access works
- [ ] **Arabic to other page preserves language** ✅ (FIXED)

### SEO Testing
- [ ] Canonical URL correct for each language
- [ ] hreflang tags present (7 languages + x-default)
- [ ] No duplicate content issues
- [ ] Sitemap includes all language URLs
- [ ] Google Search Console validates hreflang

### Cross-Browser Testing
- [ ] Chrome (Desktop & Mobile)
- [ ] Firefox (Desktop & Mobile)
- [ ] Safari (Desktop & Mobile)
- [ ] Edge (Desktop)

---

## Rollback Plan

If critical issues arise:
1. Revert to previous commit
2. Language falls back to localStorage only
3. URLs work without language prefix (Turkish default)
4. No data loss (localStorage preserved)
5. Deploy hotfix within 1 hour

---

## Related ADRs

- **ADR-004**: i18n System - Custom Implementation
- **ADR-005**: RTL Layout - Force LTR with RTL Text

---

## References

- [Google Multi-Regional and Multilingual Sites](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites)
- [hreflang Best Practices](https://developers.google.com/search/docs/specialty/international/localized-versions)
- [URL Structure for Multilingual Sites](https://moz.com/learn/seo/hreflang-tag)

---

**STATUS**: Accepted & Implemented  
**LAST UPDATED**: 2026-02-21  
**REVIEW DATE**: 2026-03-21 (1 month post-deployment)
