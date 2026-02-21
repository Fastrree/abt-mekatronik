# URL-Based Language Routing Implementation Plan

## Current State
- **Architecture**: Multi-Page Application (MPA) with Express SSR
- **Languages**: 7 (TR, EN, DE, FR, ES, AR, RU)
- **Language Storage**: localStorage only
- **URL Structure**: No language reflection
- **Pages**: 7 total (/, /about, /exports, /products/*)

## Target State
- **Turkish (default)**: Clean URLs without language code
  - `https://abtmekatronik.com/`
  - `https://abtmekatronik.com/about`
  - `https://abtmekatronik.com/exports`
- **Other Languages**: Language prefix in URL
  - `https://abtmekatronik.com/en/`
  - `https://abtmekatronik.com/de/about`
  - `https://abtmekatronik.com/ar/products/konveyor`

## Implementation Steps

### Phase 1: Core Routing System
1. ✅ Create language detection utility
2. ✅ Update i18n provider to sync with URL
3. ✅ Create URL helper functions
4. ✅ Update App.tsx routing configuration
5. ✅ Update server-side routing (Express)

### Phase 2: Component Updates
6. ✅ Update LanguageSelector to change URL
7. ✅ Update all internal links to include language prefix
8. ✅ Update useCanonical hook for language-aware URLs

### Phase 3: SEO Optimization
9. ✅ Add hreflang tags for all language versions
10. ✅ Update sitemap.xml with language URLs
11. ✅ Add language alternates to meta tags

### Phase 4: Testing & Validation
12. ✅ Test all 7 languages × 7 pages = 49 URL combinations
13. ✅ Test browser language detection
14. ✅ Test language switching
15. ✅ Validate SEO tags (hreflang, canonical)

## Technical Details

### URL Structure
```
Turkish (default):
  /                    → Home
  /about               → About
  /exports             → Exports
  /products/konveyor   → Product Detail

Other Languages:
  /en/                 → Home (English)
  /de/about            → About (German)
  /ar/exports          → Exports (Arabic)
  /ru/products/tekstil → Product Detail (Russian)
```

### Route Matching Priority
1. Exact match with language prefix: `/en/about`
2. Turkish default (no prefix): `/about`
3. 404 for invalid routes

### Language Detection Logic
1. Check URL for language prefix
2. If no prefix → Turkish (default)
3. If invalid prefix → Redirect to Turkish
4. Sync with localStorage for persistence

## Files to Modify

### Core Files
- [x] `client/src/lib/i18n.tsx` - Add URL sync logic
- [x] `client/src/App.tsx` - Update routing
- [x] `server/index.ts` - Add language prefix handling
- [x] `client/src/components/LanguageSelector.tsx` - URL navigation
- [x] `client/src/hooks/useCanonical.ts` - Language-aware canonical

### Helper Files (New)
- [x] `client/src/lib/language-utils.ts` - URL helpers
- [x] `client/src/hooks/useLanguageRoute.ts` - Language routing hook

### Component Updates
- [x] All components with `<Link>` or navigation
- [x] Footer links
- [x] Navigation menu
- [x] Product cards

## SEO Considerations

### Hreflang Tags
```html
<link rel="alternate" hreflang="tr" href="https://abtmekatronik.com/" />
<link rel="alternate" hreflang="en" href="https://abtmekatronik.com/en/" />
<link rel="alternate" hreflang="de" href="https://abtmekatronik.com/de/" />
<link rel="alternate" hreflang="fr" href="https://abtmekatronik.com/fr/" />
<link rel="alternate" hreflang="es" href="https://abtmekatronik.com/es/" />
<link rel="alternate" hreflang="ar" href="https://abtmekatronik.com/ar/" />
<link rel="alternate" hreflang="ru" href="https://abtmekatronik.com/ru/" />
<link rel="alternate" hreflang="x-default" href="https://abtmekatronik.com/" />
```

### Canonical URLs
- Turkish: `<link rel="canonical" href="https://abtmekatronik.com/about" />`
- English: `<link rel="canonical" href="https://abtmekatronik.com/en/about" />`

## Testing Checklist

### Functional Testing
- [ ] Language switching updates URL
- [ ] Direct URL access works for all languages
- [ ] Turkish URLs work without prefix
- [ ] Non-Turkish URLs require prefix
- [ ] Invalid language prefix redirects to Turkish
- [ ] Browser back/forward works correctly
- [ ] Page refresh maintains language

### SEO Testing
- [ ] Hreflang tags present on all pages
- [ ] Canonical URLs correct for each language
- [ ] Sitemap includes all language URLs
- [ ] Google Search Console validates hreflang
- [ ] No duplicate content issues

### Cross-Browser Testing
- [ ] Chrome (Desktop & Mobile)
- [ ] Firefox (Desktop & Mobile)
- [ ] Safari (Desktop & Mobile)
- [ ] Edge (Desktop)

## Rollout Plan

### Stage 1: Development (Local)
- Implement all changes
- Test locally with all languages
- Validate routing logic

### Stage 2: Staging (Vercel Preview)
- Deploy to preview environment
- Test with real URLs
- Validate SEO tags

### Stage 3: Production
- Deploy to production
- Monitor Google Search Console
- Track analytics for language usage
- Monitor for 404 errors

## Rollback Plan

If issues arise:
1. Revert to previous commit
2. Language will fall back to localStorage
3. URLs will work without language prefix
4. No data loss (localStorage preserved)

## Success Metrics

- ✅ All 49 URL combinations work (7 languages × 7 pages)
- ✅ Google Search Console shows no hreflang errors
- ✅ Language switching is seamless
- ✅ SEO rankings maintained or improved
- ✅ No increase in 404 errors

## Timeline

- **Phase 1**: 2 hours (Core routing)
- **Phase 2**: 1 hour (Component updates)
- **Phase 3**: 1 hour (SEO optimization)
- **Phase 4**: 1 hour (Testing)
- **Total**: ~5 hours

## Notes

- Turkish is the default language (no prefix)
- This is SEO-friendly (Google will index separate URLs per language)
- hreflang tags will help Google understand language versions
- Canonical URLs prevent duplicate content issues
- Browser language detection provides better UX

---

**Status**: Ready for Implementation
**Last Updated**: 2026-02-21
