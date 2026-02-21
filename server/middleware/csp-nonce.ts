import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';

/**
 * CSP Nonce Middleware
 * Generates a unique nonce for each request to allow inline scripts/styles
 * while maintaining strong CSP security (removes unsafe-inline)
 */
export function cspNonceMiddleware(req: Request, res: Response, next: NextFunction) {
  // Generate cryptographically secure nonce
  const nonce = crypto.randomBytes(16).toString('base64');
  
  // Store nonce in res.locals for template access
  res.locals.cspNonce = nonce;
  
  // Build CSP header with nonce (NO unsafe-inline)
  const cspHeader = [
    `default-src 'self'`,
    `script-src 'self' 'nonce-${nonce}' https://cdn.jsdelivr.net https://unpkg.com https://www.googletagmanager.com https://vercel.live https://va.vercel-scripts.com`,
    `style-src 'self' 'nonce-${nonce}' https://fonts.googleapis.com https://cdn.jsdelivr.net`,
    `font-src 'self' https://fonts.gstatic.com data:`,
    `img-src 'self' data: blob: https:`,
    `connect-src 'self' https: wss: https://www.google-analytics.com https://*.ingest.de.sentry.io https://vercel.live https://vitals.vercel-analytics.com https://va.vercel-scripts.com`,
    `frame-src 'self' https://wa.me https://api.whatsapp.com https://www.google.com`,
    `media-src 'self' blob: data:`,
    `object-src 'none'`,
    `base-uri 'self'`,
    `form-action 'self'`,
    `frame-ancestors 'none'`,
    `worker-src 'self' blob:`,
    `upgrade-insecure-requests`
  ].join('; ');
  
  // Set CSP header
  res.setHeader('Content-Security-Policy', cspHeader);
  
  next();
}
