/**
 * Scroll Utility Functions
 * 
 * Mobil ve desktop için optimize edilmiş scroll fonksiyonları
 * Navbar yüksekliğini hesaba katarak doğru pozisyona scroll yapar
 */

/**
 * Section-specific offset configuration
 * Her section için özel offset değerleri
 */
const SECTION_OFFSETS: Record<string, { mobile: number; desktop: number }> = {
  products: { mobile: 80, desktop: 20 },      // Ürünler - az offset (daha aşağı)
  engineering: { mobile: 80, desktop: 60 },   // Mühendislik - orta offset (biraz daha aşağı)
  projects: { mobile: 80, desktop: 40 },      // Projeler - az offset (daha aşağı)
  faq: { mobile: 80, desktop: 80 },           // SSS - orta
  testimonials: { mobile: 80, desktop: 80 },  // Referanslar - orta
  partners: { mobile: 80, desktop: 80 },      // Partnerler - orta
  contact: { mobile: 80, desktop: -10 },      // İletişim - negatif offset (daha fazla aşağı scroll)
  default: { mobile: 80, desktop: 80 },       // Varsayılan
};

/**
 * Smooth scroll to element with mobile optimization
 * 
 * @param elementId - Target element ID
 * @param offset - Additional offset (default: auto-calculated based on screen size and section)
 */
export function smoothScrollToElement(elementId: string, offset?: number): void {
  const element = document.getElementById(elementId);
  if (!element) return;

  // Auto-calculate offset based on screen size and section
  const isMobile = window.innerWidth < 768; // md breakpoint
  const sectionConfig = SECTION_OFFSETS[elementId] || SECTION_OFFSETS.default;
  const defaultOffset = isMobile ? sectionConfig.mobile : sectionConfig.desktop;
  const scrollOffset = offset ?? defaultOffset;

  // Get element position
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - scrollOffset;

  // Smooth scroll
  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
}

/**
 * Smooth scroll to top of page
 */
export function smoothScrollToTop(): void {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

/**
 * Check if element is in viewport
 */
export function isElementInViewport(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}
