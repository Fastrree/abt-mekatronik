import { Language } from './i18n';

/**
 * Language URL Utilities
 * Handles URL construction and parsing for multi-language routing
 * 
 * Turkish (default): No language prefix
 * Other languages: Language prefix (e.g., /en/, /de/)
 */

export const SUPPORTED_LANGUAGES: Language[] = ['tr', 'en', 'de', 'fr', 'es', 'ar', 'ru'];
export const DEFAULT_LANGUAGE: Language = 'tr';

/**
 * Extract language code from URL path
 * @param pathname - Current URL pathname (e.g., "/en/about", "/about")
 * @returns Language code or null if Turkish (default)
 */
export function getLanguageFromPath(pathname: string): Language {
  // Remove leading slash
  const path = pathname.startsWith('/') ? pathname.slice(1) : pathname;
  
  // Extract first segment
  const firstSegment = path.split('/')[0];
  
  // Check if first segment is a valid language code
  if (SUPPORTED_LANGUAGES.includes(firstSegment as Language) && firstSegment !== 'tr') {
    return firstSegment as Language;
  }
  
  // Default to Turkish
  return DEFAULT_LANGUAGE;
}

/**
 * Get clean path without language prefix
 * @param pathname - Current URL pathname
 * @returns Path without language prefix
 */
export function getPathWithoutLanguage(pathname: string): string {
  const language = getLanguageFromPath(pathname);
  
  // If Turkish (default), return as is
  if (language === DEFAULT_LANGUAGE) {
    return pathname;
  }
  
  // Remove language prefix
  const path = pathname.startsWith('/') ? pathname.slice(1) : pathname;
  const segments = path.split('/');
  segments.shift(); // Remove language code
  
  return '/' + segments.join('/');
}

/**
 * Build URL with language prefix
 * @param path - Clean path without language (e.g., "/about", "/products/konveyor")
 * @param language - Target language code
 * @returns Full path with language prefix if needed
 */
export function buildLanguagePath(path: string, language: Language): string {
  // Ensure path starts with /
  const cleanPath = path.startsWith('/') ? path : '/' + path;
  
  // Turkish (default) - no prefix
  if (language === DEFAULT_LANGUAGE) {
    return cleanPath;
  }
  
  // Other languages - add prefix
  return `/${language}${cleanPath}`;
}

/**
 * Get all language alternate URLs for current path
 * @param pathname - Current URL pathname
 * @param baseUrl - Base URL (e.g., "https://abtmekatronik.com")
 * @returns Object with language codes as keys and full URLs as values
 */
export function getLanguageAlternates(pathname: string, baseUrl: string = 'https://abt-mekatronik.vercel.app'): Record<Language, string> {
  const cleanPath = getPathWithoutLanguage(pathname);
  const alternates: Record<string, string> = {};
  
  SUPPORTED_LANGUAGES.forEach(lang => {
    const langPath = buildLanguagePath(cleanPath, lang);
    alternates[lang] = `${baseUrl}${langPath}`;
  });
  
  return alternates as Record<Language, string>;
}

/**
 * Check if a path is valid for the given language
 * @param pathname - URL pathname to validate
 * @param language - Language code to check against
 * @returns True if path matches language expectations
 */
export function isValidLanguagePath(pathname: string, language: Language): boolean {
  const detectedLanguage = getLanguageFromPath(pathname);
  return detectedLanguage === language;
}

/**
 * Redirect to correct language URL if mismatch
 * @param currentPath - Current URL pathname
 * @param targetLanguage - Desired language
 * @returns New path if redirect needed, null otherwise
 */
export function getLanguageRedirectPath(currentPath: string, targetLanguage: Language): string | null {
  const currentLanguage = getLanguageFromPath(currentPath);
  
  // No redirect needed if languages match
  if (currentLanguage === targetLanguage) {
    return null;
  }
  
  // Build new path with target language
  const cleanPath = getPathWithoutLanguage(currentPath);
  return buildLanguagePath(cleanPath, targetLanguage);
}
