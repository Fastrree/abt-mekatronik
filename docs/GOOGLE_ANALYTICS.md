# 📊 Google Analytics 4 Integration

## Overview
Google Analytics 4 (GA4) tracks user behavior, page views, conversions, and provides insights into how users interact with the website.

## Setup Instructions

### 1. Create GA4 Property
1. Go to [Google Analytics](https://analytics.google.com)
2. Create account (if needed)
3. Create GA4 property
4. Get Measurement ID (format: `G-XXXXXXXXXX`)

### 2. Configure Environment Variables
Add to `.env`:
```env
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### 3. Vercel Deployment
Add environment variable in Vercel:
1. Project Settings → Environment Variables
2. Add `VITE_GA_MEASUREMENT_ID`
3. Redeploy

## Features Enabled

### ✅ Automatic Tracking
- **Page Views**: Every route change
- **User Sessions**: Session duration and engagement
- **Device Info**: Browser, OS, screen size
- **Geographic Data**: Country, city (anonymized)

### ✅ Custom Events
Pre-configured event tracking:
- Button clicks
- Form submissions
- External link clicks
- Video interactions
- Downloads
- Search queries
- Language changes
- Theme changes
- Errors

## Usage Examples

### Track Button Click
```typescript
import { trackButtonClick } from '@/lib/analytics';

<Button onClick={() => {
  trackButtonClick('Contact Us', 'Hero Section');
  // ... button action
}}>
  İletişime Geç
</Button>
```

### Track Form Submission
```typescript
import { trackFormSubmit } from '@/lib/analytics';

const handleSubmit = async (data) => {
  try {
    await submitForm(data);
    trackFormSubmit('Contact Form', true);
  } catch (error) {
    trackFormSubmit('Contact Form', false);
  }
};
```

### Track External Link
```typescript
import { trackExternalLink } from '@/lib/analytics';

<a 
  href="https://example.com"
  onClick={() => trackExternalLink('https://example.com', 'Partner Site')}
>
  Visit Partner
</a>
```

### Track Video Interaction
```typescript
import { trackVideoEvent } from '@/lib/analytics';

<video
  onPlay={() => trackVideoEvent('play', 'Hero Video')}
  onPause={() => trackVideoEvent('pause', 'Hero Video')}
  onEnded={() => trackVideoEvent('complete', 'Hero Video')}
>
  ...
</video>
```

### Track Language Change
```typescript
import { trackLanguageChange } from '@/lib/analytics';

const changeLanguage = (newLang: string) => {
  trackLanguageChange(currentLang, newLang);
  setLanguage(newLang);
};
```

### Track Theme Change
```typescript
import { trackThemeChange } from '@/lib/analytics';

const toggleTheme = () => {
  const newTheme = theme === 'dark' ? 'light' : 'dark';
  trackThemeChange(newTheme);
  setTheme(newTheme);
};
```

### Track Performance Timing
```typescript
import { trackTiming } from '@/lib/analytics';

const startTime = performance.now();
await loadData();
const duration = performance.now() - startTime;

trackTiming('Data Loading', 'Products', duration, 'Homepage');
```

## GA4 Dashboard

### Key Reports

#### 1. Realtime Report
- Active users right now
- Page views in last 30 minutes
- Top pages and events

#### 2. Acquisition Report
- Traffic sources (organic, direct, referral)
- Campaign performance
- User acquisition channels

#### 3. Engagement Report
- Page views and screen views
- Event count by event name
- Conversions
- Average engagement time

#### 4. User Report
- Demographics (age, gender)
- Interests
- Technology (browser, OS, device)
- Location (country, city)

### Custom Reports

#### Conversion Tracking
Track key actions:
- Form submissions
- Button clicks (CTA)
- External link clicks
- Video completions
- Downloads

#### User Flow
Understand user journey:
- Entry pages
- Navigation paths
- Exit pages
- Drop-off points

## Event Tracking Strategy

### Automatic Events (GA4 Default)
- `page_view`: Page loads
- `session_start`: New session
- `first_visit`: First-time visitor
- `scroll`: 90% scroll depth
- `click`: Outbound link clicks

### Custom Events (Our Implementation)
- `button_click`: CTA interactions
- `form_submit`: Form completions
- `external_link`: External navigation
- `video_play/pause/complete`: Video engagement
- `download`: File downloads
- `search`: Search queries
- `language_change`: i18n interactions
- `theme_change`: Dark/light mode toggle
- `error`: Error occurrences

## Privacy & GDPR Compliance

### Data Collection
- **Anonymized IP**: Enabled by default
- **Cookie Consent**: Integrated with CookieBanner
- **No PII**: No personally identifiable information

### Cookie Settings
```typescript
gaOptions: {
  anonymizeIp: true,
  cookieFlags: "SameSite=None;Secure",
}
```

### User Rights
- Data deletion requests handled via GA4 admin
- Cookie opt-out via CookieBanner
- Transparent data collection notice

## Conversion Goals

### Primary Conversions
1. **Contact Form Submission**
   - Event: `form_submit`
   - Label: `Contact Form`
   - Value: Lead quality score

2. **WhatsApp Click**
   - Event: `button_click`
   - Label: `WhatsApp - [Location]`

3. **Phone Call Click**
   - Event: `button_click`
   - Label: `Phone Call - [Location]`

4. **Email Click**
   - Event: `button_click`
   - Label: `Email - [Location]`

### Secondary Conversions
- Newsletter signup
- Brochure download
- Video completion
- External link clicks (partners)

## Troubleshooting

### Events Not Showing
**Problem**: Events not appearing in GA4  
**Solution**:
1. Check Measurement ID is correct
2. Verify environment variable in Vercel
3. Check browser console for errors
4. Wait 24-48 hours for data processing

### Duplicate Page Views
**Problem**: Multiple page views for single visit  
**Solution**:
- Check `useEffect` dependencies
- Ensure `trackPageView` called once per route

### Cookie Consent Issues
**Problem**: GA4 not tracking until consent  
**Solution**:
- Integrate with CookieBanner
- Only initialize GA4 after consent
- Respect user privacy preferences

## Performance Impact

### Bundle Size
- `react-ga4`: ~15KB (gzipped)
- Minimal impact on load time

### Network Requests
- Initial load: 1 request (gtag.js)
- Per event: 1 request (analytics.google.com)
- Batched for efficiency

### Optimization
- Lazy load GA4 after page load
- Debounce frequent events
- Use `requestIdleCallback` for non-critical tracking

## Best Practices

### 1. Meaningful Event Names
```typescript
// ❌ Bad
trackEvent('click', 'button', 'btn1');

// ✅ Good
trackButtonClick('Request Quote', 'Hero Section');
```

### 2. Consistent Naming Convention
- Use PascalCase for categories
- Use Title Case for actions
- Include context in labels

### 3. Track User Intent
Focus on actions that indicate user interest:
- CTA clicks
- Form interactions
- Content engagement
- Navigation patterns

### 4. Set Up Funnels
Track multi-step processes:
1. Landing page view
2. CTA click
3. Form start
4. Form submit
5. Thank you page

### 5. Regular Review
- Weekly: Check realtime data
- Monthly: Review conversion rates
- Quarterly: Analyze user behavior trends

## Integration with Other Tools

### Sentry + GA4
Track errors in both systems:
```typescript
try {
  // risky operation
} catch (error) {
  captureException(error); // Sentry
  trackError(error.message, 'Payment'); // GA4
}
```

### Vercel Analytics + GA4
- Vercel: Core Web Vitals
- GA4: User behavior and conversions
- Complementary data sources

## Next Steps

1. ✅ GA4 installed and configured
2. ⏳ Create GA4 property and get Measurement ID
3. ⏳ Add environment variable to Vercel
4. ⏳ Deploy and verify tracking
5. ⏳ Set up conversion goals in GA4
6. ⏳ Create custom reports and dashboards

---

**Status**: ✅ Implemented  
**Last Updated**: 2026-01-19  
**Owner**: Development Team
