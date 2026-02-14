/**
 * DYNAMIC SCROLL SYSTEM V2.0
 * 
 * Akıllı, dinamik scroll sistemi - sabit offset'ler yerine gerçek pozisyon hesaplama
 * Mobilde tam eşleştirme garantisi ile çalışır
 * 
 * FEATURES:
 * - Dinamik navbar yüksekliği hesaplama
 * - Element'in gerçek pozisyonunu bulma
 * - Viewport'a göre optimal scroll pozisyonu
 * - Otomatik düzeltme mekanizması
 * - Mobil-first yaklaşım
 */

/**
 * Get navbar height dynamically
 * Navbar yüksekliğini dinamik olarak hesaplar
 */
function getNavbarHeight(): number {
  const navbar = document.querySelector('nav');
  return navbar ? navbar.offsetHeight : 64; // Fallback: 64px
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
 * Calculate optimal scroll position for mobile
 * Mobil için optimal scroll pozisyonunu hesaplar
 * 
 * Strateji:
 * 1. Element'in sayfadaki gerçek pozisyonunu bul
 * 2. Navbar yüksekliğini çıkar
 * 3. Mobilde ekstra padding ekle (içerik navbar'ın altında görünsün)
 * 4. Viewport yüksekliğini hesaba kat
 */
function calculateOptimalScrollPosition(element: HTMLElement, deviceType: 'ultraMobile' | 'mobile' | 'desktop'): number {
  // Element'in sayfadaki mutlak pozisyonu
  const elementRect = element.getBoundingClientRect();
  const elementTop = elementRect.top + window.pageYOffset;
  
  // Navbar yüksekliği
  const navbarHeight = getNavbarHeight();
  
  // Viewport yüksekliği
  const viewportHeight = window.innerHeight;
  
  // Mobil için ekstra padding (içerik navbar'ın çok altında görünsün)
  let mobilePadding = 0;
  if (deviceType === 'ultraMobile') {
    mobilePadding = viewportHeight * 0.15; // Viewport'un %15'i kadar padding
  } else if (deviceType === 'mobile') {
    mobilePadding = viewportHeight * 0.12; // Viewport'un %12'si kadar padding
  }
  
  // Desktop için minimal padding
  const desktopPadding = deviceType === 'desktop' ? 20 : 0;
  
  // Final scroll pozisyonu
  // Element'in üstü - navbar yüksekliği - mobil padding + desktop padding
  const scrollPosition = elementTop - navbarHeight - mobilePadding + desktopPadding;
  
  return Math.max(0, scrollPosition); // Negatif değer olmasın
}

/**
 * Verify and correct scroll position
 * Scroll sonrası pozisyonu doğrula ve gerekirse düzelt
 */
function verifyAndCorrectScroll(element: HTMLElement, deviceType: 'ultraMobile' | 'mobile' | 'desktop', attempt: number = 0): void {
  if (attempt > 3) return; // Maksimum 3 deneme
  
  const rect = element.getBoundingClientRect();
  const navbarHeight = getNavbarHeight();
  const viewportHeight = window.innerHeight;
  
  // Mobilde ideal pozisyon: navbar'ın altında, viewport'un üst %20'sinde
  const idealTopPosition = deviceType === 'desktop' 
    ? navbarHeight + 20 
    : navbarHeight + (viewportHeight * 0.15);
  
  const currentTopPosition = rect.top;
  const positionDifference = Math.abs(currentTopPosition - idealTopPosition);
  
  // Eğer pozisyon farkı 50px'den fazlaysa düzelt
  if (positionDifference > 50) {
    const correction = currentTopPosition - idealTopPosition;
    
    window.scrollBy({
      top: correction,
      behavior: 'smooth'
    });
    
    // Tekrar kontrol et
    setTimeout(() => {
      verifyAndCorrectScroll(element, deviceType, attempt + 1);
    }, 400);
  }
}

/**
 * MAIN SCROLL FUNCTION - Dynamic & Intelligent
 * 
 * @param elementId - Target element ID
 * @param offset - Manual offset (optional, overrides automatic calculation)
 */
export function smoothScrollToElement(elementId: string, offset?: number): void {
  const element = document.getElementById(elementId);
  if (!element) {
    console.warn(`Element with id "${elementId}" not found`);
    return;
  }

  // Detect device type
  const deviceType = getDeviceType();
  
  // Calculate optimal scroll position
  const scrollPosition = offset !== undefined 
    ? element.getBoundingClientRect().top + window.pageYOffset - offset
    : calculateOptimalScrollPosition(element, deviceType);

  // Smooth scroll
  try {
    window.scrollTo({
      top: scrollPosition,
      behavior: 'smooth'
    });
  } catch (error) {
    // Fallback for older browsers
    window.scrollTo(0, scrollPosition);
  }
  
  // Verify and correct after scroll completes
  setTimeout(() => {
    verifyAndCorrectScroll(element, deviceType);
  }, 600);
  
  // Development logging
  if (process.env.NODE_ENV === 'development') {
    console.log(`🎯 Dynamic Scroll to ${elementId}:`, {
      deviceType,
      navbarHeight: getNavbarHeight(),
      viewportHeight: window.innerHeight,
      elementTop: element.getBoundingClientRect().top + window.pageYOffset,
      scrollPosition,
      calculatedAutomatically: offset === undefined
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
