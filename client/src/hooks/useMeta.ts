import { useEffect } from 'react';
import { useI18n } from '@/lib/i18n';
import { metaTranslations, PageMeta } from '@/lib/meta-translations';

type PageType = 'home' | 'about' | 'exports';
type ProductKey = 'konveyor' | 'tekstil' | 'celik' | 'ozelMakine';

/**
 * Custom hook to manage SEO meta tags dynamically
 * Updates title, description, keywords, Open Graph, and Twitter meta tags
 * 
 * @param pageType - Type of page (home, about, exports, or product)
 * @param productKey - Product key (only for product pages)
 * 
 * @example
 * // Home page
 * useMeta('home');
 * 
 * // About page
 * useMeta('about');
 * 
 * // Product page
 * useMeta('product', 'konveyor');
 */
export function useMeta(pageType: PageType | 'product', productKey?: ProductKey) {
  const { language } = useI18n();

  useEffect(() => {
    const translations = metaTranslations[language] || metaTranslations.tr;
    
    let meta: PageMeta;
    
    if (pageType === 'product' && productKey) {
      meta = translations.products[productKey];
    } else if (pageType !== 'product') {
      meta = translations[pageType];
    } else {
      // Fallback to home if invalid
      meta = translations.home;
    }

    // Update document title
    document.title = meta.title;

    // Update meta description
    const descMeta = document.querySelector('meta[name="description"]');
    if (descMeta) descMeta.setAttribute('content', meta.description);

    // Update meta keywords
    const keywordsMeta = document.querySelector('meta[name="keywords"]');
    if (keywordsMeta) keywordsMeta.setAttribute('content', meta.keywords);

    // Update Open Graph meta tags
    const ogTitleMeta = document.querySelector('meta[property="og:title"]');
    if (ogTitleMeta) ogTitleMeta.setAttribute('content', meta.ogTitle);

    const ogDescMeta = document.querySelector('meta[property="og:description"]');
    if (ogDescMeta) ogDescMeta.setAttribute('content', meta.ogDescription);

    // Update Twitter meta tags
    const twitterTitleMeta = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitleMeta) twitterTitleMeta.setAttribute('content', meta.twitterTitle);

    const twitterDescMeta = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescMeta) twitterDescMeta.setAttribute('content', meta.twitterDescription);

    // Update html lang attribute
    document.documentElement.lang = language;
  }, [language, pageType, productKey]);
}
