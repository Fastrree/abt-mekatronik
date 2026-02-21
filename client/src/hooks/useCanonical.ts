import { useEffect } from 'react';

/**
 * Custom hook to set canonical URL for SEO
 * Adds/updates <link rel="canonical"> tag in document head
 * 
 * @param path - The canonical path (e.g., "/about", "/exports")
 * @param baseUrl - Base URL (default: https://abt-mekatronik.vercel.app)
 */
export function useCanonical(path: string, baseUrl: string = 'https://abt-mekatronik.vercel.app') {
  useEffect(() => {
    const canonicalUrl = `${baseUrl}${path}`;
    
    // Check if canonical link already exists
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    
    if (canonicalLink) {
      // Update existing canonical link
      canonicalLink.href = canonicalUrl;
    } else {
      // Create new canonical link
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      canonicalLink.href = canonicalUrl;
      document.head.appendChild(canonicalLink);
    }
    
    // Cleanup: Reset to homepage canonical on unmount
    return () => {
      const link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (link) {
        link.href = baseUrl + '/';
      }
    };
  }, [path, baseUrl]);
}
