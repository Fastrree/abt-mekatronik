import { useLocation, useRoute } from 'wouter';
import { useEffect } from 'react';
import { useI18n, Language } from '@/lib/i18n';
import { 
  getLanguageFromPath, 
  getLanguageRedirectPath,
  buildLanguagePath 
} from '@/lib/language-utils';

/**
 * Custom hook for language-aware routing
 * Syncs URL language prefix with i18n context
 * Handles language switching and redirects
 */
export function useLanguageRoute() {
  const [location, setLocation] = useLocation();
  const { language, setLanguage } = useI18n();

  // Sync URL language with i18n context on mount and location change
  useEffect(() => {
    const urlLanguage = getLanguageFromPath(location);
    
    // If URL language differs from context, update context
    if (urlLanguage !== language) {
      setLanguage(urlLanguage);
    }
  }, [location, language, setLanguage]);

  /**
   * Navigate to a path with current language prefix
   * @param path - Clean path without language (e.g., "/about")
   */
  const navigateWithLanguage = (path: string) => {
    const languagePath = buildLanguagePath(path, language);
    setLocation(languagePath);
  };

  /**
   * Switch to a different language (updates URL)
   * @param newLanguage - Target language code
   */
  const switchLanguage = (newLanguage: Language) => {
    const redirectPath = getLanguageRedirectPath(location, newLanguage);
    
    if (redirectPath) {
      setLocation(redirectPath);
    }
    
    // Update i18n context (will be synced by useEffect)
    setLanguage(newLanguage);
  };

  return {
    currentLanguage: language,
    navigateWithLanguage,
    switchLanguage,
  };
}

/**
 * Hook to get language-aware route matching
 * Strips language prefix before matching route pattern
 */
export function useLanguageAwareRoute(pattern: string): [boolean, Record<string, string>] {
  const [location] = useLocation();
  const cleanPath = getLanguageFromPath(location) === 'tr' 
    ? location 
    : location.replace(/^\/[a-z]{2}\//, '/');
  
  return useRoute(pattern);
}
