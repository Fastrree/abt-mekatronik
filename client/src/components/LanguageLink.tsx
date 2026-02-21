import { Link, LinkProps } from 'wouter';
import { useI18n } from '@/lib/i18n';
import { buildLanguagePath } from '@/lib/language-utils';

/**
 * Language-aware Link component
 * Automatically adds current language prefix to all internal links
 * 
 * @example
 * <LanguageLink href="/about">About</LanguageLink>
 * // Turkish: /tr/about
 * // English: /en/about
 * // Arabic: /ar/about
 */
export function LanguageLink({ href, ...props }: LinkProps) {
  const { language } = useI18n();
  
  // Skip language prefix for:
  // 1. External links (http://, https://)
  // 2. Hash-only links (#section)
  // 3. Already prefixed links (starts with language code)
  const isExternal = typeof href === 'string' && (href.startsWith('http://') || href.startsWith('https://'));
  const isHashOnly = typeof href === 'string' && href.startsWith('#');
  const isAlreadyPrefixed = typeof href === 'string' && href.match(/^\/(tr|en|de|fr|es|ar|ru)\//);
  
  if (isExternal || isHashOnly || isAlreadyPrefixed) {
    return <Link href={href} {...props} />;
  }
  
  // Add language prefix to internal links
  const languageHref = typeof href === 'string' ? buildLanguagePath(href, language) : href;
  
  return <Link href={languageHref} {...props} />;
}

/**
 * Language-aware anchor tag (for non-SPA navigation)
 * Use this for links that need full page reload or external links
 */
interface LanguageAnchorProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

export function LanguageAnchor({ href, ...props }: LanguageAnchorProps) {
  const { language } = useI18n();
  
  // Skip language prefix for external links and hash-only links
  const isExternal = href.startsWith('http://') || href.startsWith('https://');
  const isHashOnly = href.startsWith('#');
  const isAlreadyPrefixed = href.match(/^\/(tr|en|de|fr|es|ar|ru)\//);
  
  if (isExternal || isHashOnly || isAlreadyPrefixed) {
    return <a href={href} {...props} />;
  }
  
  // Add language prefix to internal links
  const languageHref = buildLanguagePath(href, language);
  
  return <a href={languageHref} {...props} />;
}
