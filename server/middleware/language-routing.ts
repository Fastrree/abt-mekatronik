import { Request, Response, NextFunction } from 'express';

/**
 * Language Routing Middleware
 * Handles URL-based language routing for multi-language support
 * 
 * Turkish (default): No language prefix
 * Other languages: Language prefix (e.g., /en/, /de/)
 */

const SUPPORTED_LANGUAGES = ['en', 'de', 'fr', 'es', 'ar', 'ru'];

/**
 * Middleware to handle language prefix in URLs
 * Validates language codes and redirects invalid ones to Turkish (default)
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
  
  // Check if first segment is a language code
  if (SUPPORTED_LANGUAGES.includes(firstSegment)) {
    // Valid language prefix - continue
    return next();
  }
  
  // Check if it's an invalid language code (2-letter code but not supported)
  if (firstSegment && firstSegment.length === 2 && /^[a-z]{2}$/.test(firstSegment)) {
    // Invalid language code - redirect to Turkish (remove prefix)
    const cleanPath = '/' + segments.slice(1).join('/');
    return res.redirect(301, cleanPath || '/');
  }
  
  // No language prefix or valid path - continue (Turkish default)
  next();
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
