/**
 * Scroll Utility Functions
 * 
 * Mobil ve desktop için optimize edilmiş scroll fonksiyonları
 * Navbar yüksekliğini hesaba katarak doğru pozisyona scroll yapar
 * 
 * ULTRA-MOBILE OPTIMIZATION (300px-340px)
 */

/**
 * Section-specific offset configuration
 * Her section için özel offset değerleri
 * Ultra-mobile: 300-340px ekranlar için özel ayar
 * Mobile: 341-767px ekranlar
 * Desktop: 768px+
 * 
 * NOT: Mobilde çok daha aşağı scroll için agresif negatif offset'ler
 * Negatif değerler içeriği navbar'ın çok altında gösterir
 */
const SECTION_OFFSETS: Record<string, { ultraMobile: number; mobile: number; desktop: number }> = {
  products: { ultraMobile: -200, mobile: -180, desktop: 20 },      // Çok daha aşağı
  engineering: { ultraMobile: -200, mobile: -180, desktop: 60 },   // Çok daha aşağı
  projects: { ultraMobile: -200, mobile: -180, desktop: 40 },      // Çok daha aşağı
  faq: { ultraMobile: -200, mobile: -180, desktop: 80 },           // Çok daha aşağı
  testimonials: { ultraMobile: -200, mobile: -180, desktop: 80 },  // Çok daha aşağı
  partners: { ultraMobile: -200, mobile: -180, desktop: 80 },      // Çok daha aşağı
  contact: { ultraMobile: -220, mobile: -200, desktop: -10 },      // En fazla aşağı (Teklif Al)
  default: { ultraMobile: -200, mobile: -180, desktop: 80 },       // Çok daha aşağı
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
 * Detect device type based on screen width
 */
function getDeviceType(): 'ultraMobile' | 'mobile' | 'desktop' {
  const width = window.innerWidth;
  if (width <= 340) return 'ultraMobile';
  if (width < 768) return 'mobile';
  return 'desktop';
}

/**
 * Smooth scroll to element with ultra-mobile optimization
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

  // Detect device type
  const deviceType = getDeviceType();
  const sectionConfig = SECTION_OFFSETS[elementId] || SECTION_OFFSETS.default;
  
  // Get appropriate offset based on device
  let baseOffset: number;
  switch (deviceType) {
    case 'ultraMobile':
      baseOffset = sectionConfig.ultraMobile;
      break;
    case 'mobile':
      baseOffset = sectionConfig.mobile;
      break;
    case 'desktop':
      baseOffset = sectionConfig.desktop;
      break;
  }
  
  // Use dynamic navbar height for more accurate positioning
  const navbarHeight = getNavbarHeight();
  
  // Add extra padding for ultra-mobile to ensure content is fully visible
  const extraPadding = deviceType === 'ultraMobile' ? 15 : (deviceType === 'mobile' ? 10 : 0);
  const scrollOffset = offset ?? (baseOffset + extraPadding);

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
  
  // Additional check: After scroll completes, verify element is visible
  setTimeout(() => {
    const rect = element.getBoundingClientRect();
    const isVisible = rect.top >= navbarHeight && rect.top < window.innerHeight;
    
    if (!isVisible) {
      // Fine-tune scroll if element is not properly visible
      const adjustment = deviceType === 'ultraMobile' ? -20 : -10;
      window.scrollBy({
        top: adjustment,
        behavior: 'smooth'
      });
    }
  }, 600); // Wait for smooth scroll to complete
  
  // Log for debugging (remove in production)
  if (process.env.NODE_ENV === 'development') {
    console.log(`Scrolling to ${elementId}:`, {
      deviceType,
      navbarHeight,
      scrollOffset,
      elementPosition,
      finalPosition: offsetPosition,
      extraPadding
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
