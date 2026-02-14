/**
 * Scroll Utility Functions
 * 
 * Mobil ve desktop için optimize edilmiş scroll fonksiyonları
 * Navbar yüksekliğini hesaba katarak doğru pozisyona scroll yapar
 */

/**
 * Section-specific offset configuration
 * Her section için özel offset değerleri
 * Mobile: Daha küçük navbar + tam görünüm için optimize
 * Desktop: Standart navbar yüksekliği
 */
const SECTION_OFFSETS: Record<string, { mobile: number; desktop: number }> = {
  products: { mobile: 70, desktop: 20 },      // Ürünler - mobilde tam görünür
  engineering: { mobile: 70, desktop: 60 },   // Mühendislik - mobilde tam görünür
  projects: { mobile: 70, desktop: 40 },      // Projeler - mobilde tam görünür
  faq: { mobile: 70, desktop: 80 },           // SSS - mobilde tam görünür
  testimonials: { mobile: 70, desktop: 80 },  // Referanslar - mobilde tam görünür
  partners: { mobile: 70, desktop: 80 },      // Partnerler - mobilde tam görünür
  contact: { mobile: 60, desktop: -10 },      // İletişim - mobilde footer tam görünür
  default: { mobile: 70, desktop: 80 },       // Varsayılan
};

/**
 * Get navbar height dynamically
 * Navbar yüksekliğini dinamik olarak hesaplar
 */
function getNavbarHeight(): number {
  const navbar = document.querySelector('nav');
  return navbar ? navbar.offsetHeight : 0;
}

/**
 * Smooth scroll to element with mobile optimization
 * 
 * @param elementId - Target element ID
 * @param offset - Additional offset (default: auto-calculated based on screen size and section)
 */
export function smoothScrollToElement(elementId: string, offset?: number): void {
  const element = document.getElementById(elementId);
  if (!element) {
    console.warn(`Element with id "${elementId}" not found`);
    return;
  }

  // Auto-calculate offset based on screen size and section
  const isMobile = window.innerWidth < 768; // md breakpoint
  const sectionConfig = SECTION_OFFSETS[elementId] || SECTION_OFFSETS.default;
  
  // Use dynamic navbar height for more accurate positioning
  const navbarHeight = getNavbarHeight();
  const baseOffset = isMobile ? sectionConfig.mobile : sectionConfig.desktop;
  
  // Add extra padding for mobile to ensure content is fully visible
  const mobilePadding = isMobile ? 10 : 0;
  const scrollOffset = offset ?? (baseOffset + mobilePadding);

  // Get element position
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - scrollOffset;

  // Smooth scroll with fallback for older browsers
  try {
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  } catch (error) {
    // Fallback for browsers that don't support smooth scrolling
    window.scrollTo(0, offsetPosition);
  }
  
  // Log for debugging (remove in production)
  if (process.env.NODE_ENV === 'development') {
    console.log(`Scrolling to ${elementId}:`, {
      isMobile,
      navbarHeight,
      scrollOffset,
      elementPosition,
      finalPosition: offsetPosition
    });
  }
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
