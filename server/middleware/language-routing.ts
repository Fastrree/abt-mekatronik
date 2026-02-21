import { Request, Response, NextFunction } from 'express';

/**
 * Language Routing Middleware
 * Handles URL-based language routing for multi-language support
 * 
 * ALL languages now have prefix (including Turkish: /tr/)
 */

const SUPPORTED_LANGUAGES = ['tr', 'en', 'de', 'fr', 'es', 'ar', 'ru'];

/**
 * Middleware to handle language prefix in URLs
 * Validates language codes and redirects invalid/missing ones to Turkish (/tr/)
 */
export function languageRoutingMiddleware(req: Request, res: Response, next: NextFunction) {
  const pathname = req.path;
  
  // Skip API routes
  if (pathname.startsWith('/api')) {
    return next();
  }
  
  // Skip static assets
  if (pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|webp|mp4|pdf|txt|json|xml|woff|woff2|ttf|eot)$/)) {
    return next();
  }
  
  // Extract first segment
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];
  
  // Check if first segment is a valid language code
  if (SUPPORTED_LANGUAGES.includes(firstSegment)) {
    // Valid language prefix - continue
    return next();
  }
  
  // No language prefix or invalid language code - redirect to Turkish
  const cleanPath = '/' + segments.join('/');
  return res.redirect(301, `/tr${cleanPath}`);
}

/**
 * Middleware to set language header for SSR
 * Extracts language from URL and sets it in request headers
 */
export function setLanguageHeader(req: Request, res: Response, next: NextFunction) {
  const pathname = req.path;
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];
  
  // Set language header
  if (SUPPORTED_LANGUAGES.includes(firstSegment)) {
    req.headers['x-language'] = firstSegment;
  } else {
    req.headers['x-language'] = 'tr'; // Default to Turkish
  }
  
  next();
}
