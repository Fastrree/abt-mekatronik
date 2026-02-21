import { useI18n } from '@/lib/i18n';
import { buildLanguagePath } from '@/lib/language-utils';

/**
 * Custom hook to generate language-aware links
 * Automatically adds current language prefix to paths
 * 
 * @example
 * const { languageLink } = useLanguageLink();
 * <a href={languageLink('/about')}>About</a>
 * // Turkish: /tr/about
 * // English: /en/about
 */
export function useLanguageLink() {
  const { language } = useI18n();

  /**
   * Generate language-aware link
   * @param path - Clean path without language (e.g., "/about", "/products/konveyor")
   * @returns Full path with current language prefix
   */
  const languageLink = (path: string): string => {
    return buildLanguagePath(path, language);
  };

  return { languageLink };
}
