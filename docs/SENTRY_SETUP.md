# 🔍 Sentry Error Monitoring Setup

## Overview
Sentry is integrated for real-time error tracking, performance monitoring, and session replay.

## Setup Instructions

### 1. Create Sentry Account
1. Go to [sentry.io](https://sentry.io)
2. Create a free account
3. Create a new project (React)
4. Copy your DSN (Data Source Name)

### 2. Configure Environment Variables
Create `.env` file in project root:

```bash
# Copy from .env.example
cp .env.example .env
```

Add your Sentry DSN:
```env
VITE_SENTRY_DSN=https://your-actual-dsn@sentry.io/your-project-id
VITE_APP_VERSION=1.0.0
```

### 3. Vercel Deployment Setup
Add environment variables in Vercel dashboard:
1. Go to Project Settings → Environment Variables
2. Add `VITE_SENTRY_DSN` with your DSN
3. Add `VITE_APP_VERSION` with current version
4. Redeploy

## Features Enabled

### ✅ Error Tracking
- Automatic exception capture
- Stack traces with source maps
- User context tracking
- Breadcrumb trail

### ✅ Performance Monitoring
- Page load times
- API request tracking
- Custom transaction tracking
- Core Web Vitals

### ✅ Session Replay
- 10% of normal sessions recorded
- 100% of error sessions recorded
- Privacy-focused (no sensitive data)

## Usage Examples

### Manual Error Capture
```typescript
import { captureException } from '@/lib/sentry';

try {
  // risky operation
} catch (error) {
  captureException(error, {
    context: 'payment-processing',
    userId: user.id,
  });
}
```

### Custom Messages
```typescript
import { captureMessage } from '@/lib/sentry';

captureMessage('User completed onboarding', 'info', {
  userId: user.id,
  plan: 'premium',
});
```

### Performance Tracking
```typescript
import { trackPerformance } from '@/lib/sentry';

const data = await trackPerformance('fetch-products', async () => {
  return await fetchProducts();
});
```

### User Context
```typescript
import { setUser, clearUser } from '@/lib/sentry';

// On login
setUser({
  id: user.id,
  email: user.email,
  username: user.username,
});

// On logout
clearUser();
```

## Error Boundary

Global error boundary catches React errors:
- Custom fallback UI
- Automatic error reporting to Sentry
- Reset functionality
- Development mode shows error details

## Ignored Errors

Common non-critical errors are filtered:
- `ResizeObserver loop limit exceeded`
- `Non-Error promise rejection captured`

Add more in `main.tsx` if needed.

## Monitoring Best Practices

### 1. Set User Context
Always set user context after authentication:
```typescript
setUser({ id: user.id, email: user.email });
```

### 2. Add Breadcrumbs
Add context before critical operations:
```typescript
addBreadcrumb('Starting payment', 'payment', { amount: 100 });
```

### 3. Track Performance
Wrap slow operations:
```typescript
await trackPerformance('image-upload', uploadImage);
```

### 4. Custom Tags
Add tags for filtering:
```typescript
Sentry.setTag('feature', 'checkout');
Sentry.setTag('experiment', 'new-ui');
```

## Sentry Dashboard

### Key Metrics to Monitor
- **Error Rate**: Should be < 1%
- **Affected Users**: Track unique users with errors
- **Performance**: P95 response times
- **Session Replay**: Watch user sessions with errors

### Alerts Setup
1. Go to Alerts → Create Alert
2. Set threshold (e.g., > 10 errors in 1 hour)
3. Configure notifications (email, Slack)

## Privacy & Compliance

### Data Collected
- Error messages and stack traces
- User actions (breadcrumbs)
- Performance metrics
- Session replays (opt-in)

### Data NOT Collected
- Passwords or sensitive form data
- Credit card information
- Personal health information

### GDPR Compliance
- User data can be deleted on request
- Session replay respects privacy settings
- No PII in error messages

## Troubleshooting

### Errors Not Appearing
1. Check DSN is correct in `.env`
2. Verify environment variable in Vercel
3. Check browser console for Sentry init errors
4. Ensure `import.meta.env.VITE_SENTRY_DSN` is defined

### Source Maps Not Working
1. Enable source maps in `vite.config.ts`
2. Upload source maps to Sentry (optional)
3. Check release version matches

### Too Many Errors
1. Review `ignoreErrors` list in `main.tsx`
2. Add filters for known issues
3. Adjust sample rates if needed

## Cost Management

### Free Tier Limits
- 5,000 errors/month
- 10,000 performance units/month
- 50 session replays/month

### Optimization Tips
1. **Reduce Sample Rate**: Lower `tracesSampleRate` in production
2. **Filter Errors**: Add more to `ignoreErrors`
3. **Limit Replays**: Reduce `replaysSessionSampleRate`

## Next Steps

1. ✅ Sentry installed and configured
2. ✅ **Tested successfully - First error captured!** (2026-01-19)
3. ⏳ Deploy to Vercel with environment variables
4. ⏳ Test error tracking in production
5. ⏳ Set up alerts for critical errors
6. ⏳ Review dashboard weekly

---

**Status**: ✅ Implemented & Verified  
**Test Result**: SUCCESS - Error tracking working perfectly  
**Last Updated**: 2026-01-19  
**Owner**: Development Team
