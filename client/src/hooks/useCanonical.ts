import { useEffect } from 'react';
import { useI18n } from '@/lib/i18n';
import { getLanguageAlternates, getPathWithoutLanguage } from '@/lib/language-utils';

/**
 * Custom hook to set canonical URL and hreflang tags for SEO
 * Adds/updates <link rel="canonical"> and <link rel="alternate" hreflang> tags
 * 
 * @param path - The canonical path (e.g., "/about", "/exports")
 * @param baseUrl - Base URL (default: https://abt-mekatronik.vercel.app)
 */
export function useCanonical(path: string, baseUrl: string = 'https://abt-mekatronik.vercel.app') {
  const { language } = useI18n();
  
  useEffect(() => {
    // Get clean path without language prefix
    const cleanPath = getPathWithoutLanguage(path);
    
    // Build canonical URL with language prefix (if not Turkish)
    const canonicalPath = language === 'tr' ? cleanPath : `/${language}${cleanPath}`;
    const canonicalUrl = `${baseUrl}${canonicalPath}`;
    
    // Update or create canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (canonicalLink) {
      canonicalLink.href = canonicalUrl;
    } else {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      canonicalLink.href = canonicalUrl;
      document.head.appendChild(canonicalLink);
    }
    
    // Remove existing hreflang links
    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(link => link.remove());
    
    // Add hreflang links for all language versions
    const alternates = getLanguageAlternates(cleanPath, baseUrl);
    Object.entries(alternates).forEach(([lang, url]) => {
      const hreflangLink = document.createElement('link');
      hreflangLink.rel = 'alternate';
      hreflangLink.hreflang = lang;
      hreflangLink.href = url;
      document.head.appendChild(hreflangLink);
    });
    
    // Add x-default hreflang (Turkish as default)
    const xDefaultLink = document.createElement('link');
    xDefaultLink.rel = 'alternate';
    xDefaultLink.hreflang = 'x-default';
    xDefaultLink.href = `${baseUrl}${cleanPath}`;
    document.head.appendChild(xDefaultLink);
    
    // Cleanup: Reset to homepage canonical on unmount
    return () => {
      const link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (link) {
        link.href = baseUrl + '/';
      }
      // Remove hreflang links
      document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(link => link.remove());
    };
  }, [path, baseUrl, language]);
}
