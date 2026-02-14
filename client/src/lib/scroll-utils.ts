/**
 * DYNAMIC SCROLL SYSTEM V2.1 - ENHANCED
 * 
 * Ultra-akıllı, hatasız scroll sistemi
 * Mobilde mükemmel eşleştirme, desktop'ta klasik davranış
 * 
 * FEATURES:
 * - Dinamik navbar yüksekliği hesaplama (her scroll'da yeniden)
 * - Element'in gerçek pozisyonunu piksel hassasiyetiyle bulma
 * - Viewport'a göre optimal scroll pozisyonu (mobil için özel)
 * - Çoklu doğrulama mekanizması (5 denemeye kadar)
 * - Hassas pozisyon kontrolü (30px tolerans)
 * - Desktop'ta klasik davranış (değişiklik yok)
 */

/**
 * Get navbar height dynamically with cache busting
 * Navbar yüksekliğini her seferinde yeniden hesaplar
 */
function getNavbarHeight(): number {
  const navbar = document.querySelector('nav');
  if (!navbar) return 64; // Fallback
  
  // Force reflow to get accurate height
  const height = navbar.getBoundingClientRect().height;
  return Math.ceil(height); // Round up for safety
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
 * Calculate optimal scroll position - ENHANCED
 * Mobil için ultra-hassas pozisyon hesaplama
 * Desktop için klasik davranış
 * 
 * Strateji (Mobil):
 * 1. Element'in sayfadaki gerçek pozisyonunu piksel hassasiyetiyle bul
 * 2. Navbar yüksekliğini dinamik olarak hesapla
 * 3. Viewport yüksekliğine göre optimal padding hesapla
 * 4. Element yüksekliğini hesaba kat (küçük elementler için)
 * 5. Scroll pozisyonunu hesapla ve güvenli aralıkta tut
 */
function calculateOptimalScrollPosition(element: HTMLElement, deviceType: 'ultraMobile' | 'mobile' | 'desktop'): number {
  // Element'in sayfadaki mutlak pozisyonu (piksel hassasiyeti)
  const elementRect = element.getBoundingClientRect();
  const elementTop = elementRect.top + window.pageYOffset;
  const elementHeight = elementRect.height;
  
  // Navbar yüksekliği (dinamik)
  const navbarHeight = getNavbarHeight();
  
  // Desktop için klasik davranış (DEĞİŞİKLİK YOK)
  if (deviceType === 'desktop') {
    return elementTop - navbarHeight - 20; // Klasik 20px padding
  }
  
  // MOBILE ONLY - Enhanced calculation
  const viewportHeight = window.innerHeight;
  
  // Viewport bazlı dinamik padding
  // Ultra-mobile: %18 (daha fazla aşağı)
  // Mobile: %15 (optimal)
  const paddingPercentage = deviceType === 'ultraMobile' ? 0.18 : 0.15;
  let mobilePadding = viewportHeight * paddingPercentage;
  
  // Küçük elementler için ekstra padding (element yüksekliği < viewport'un %30'u)
  if (elementHeight < viewportHeight * 0.3) {
    mobilePadding += 30; // Ekstra 30px
  }
  
  // Final scroll pozisyonu
  const scrollPosition = elementTop - navbarHeight - mobilePadding;
  
  // Güvenli aralıkta tut (minimum 0, maksimum sayfa sonu)
  const maxScroll = document.documentElement.scrollHeight - viewportHeight;
  return Math.max(0, Math.min(scrollPosition, maxScroll));
}

/**
 * Verify and correct scroll position - ENHANCED
 * Çoklu doğrulama ile hassas pozisyon kontrolü
 * Mobil için agresif düzeltme, desktop için minimal müdahale
 */
function verifyAndCorrectScroll(
  element: HTMLElement, 
  deviceType: 'ultraMobile' | 'mobile' | 'desktop', 
  targetPadding: number,
  attempt: number = 0
): void {
  // Maksimum 5 deneme (daha fazla şans)
  if (attempt > 5) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`⚠️ Scroll verification failed after 5 attempts`);
    }
    return;
  }
  
  const rect = element.getBoundingClientRect();
  const navbarHeight = getNavbarHeight();
  const viewportHeight = window.innerHeight;
  
  // Desktop için minimal kontrol
  if (deviceType === 'desktop') {
    const idealTop = navbarHeight + 20;
    const currentTop = rect.top;
    const difference = Math.abs(currentTop - idealTop);
    
    // 50px'den fazla sapma varsa düzelt
    if (difference > 50) {
      window.scrollBy({
        top: currentTop - idealTop,
        behavior: 'smooth'
      });
      
      setTimeout(() => {
        verifyAndCorrectScroll(element, deviceType, targetPadding, attempt + 1);
      }, 300);
    }
    return;
  }
  
  // MOBILE ONLY - Hassas kontrol
  const idealTop = navbarHeight + targetPadding;
  const currentTop = rect.top;
  const difference = Math.abs(currentTop - idealTop);
  
  // 30px tolerans (daha hassas)
  if (difference > 30) {
    const correction = currentTop - idealTop;
    
    // Smooth scroll ile düzelt
    window.scrollBy({
      top: correction,
      behavior: 'smooth'
    });
    
    // Daha kısa aralıklarla tekrar kontrol (300ms)
    setTimeout(() => {
      verifyAndCorrectScroll(element, deviceType, targetPadding, attempt + 1);
    }, 300);
  } else {
    // Başarılı!
    if (process.env.NODE_ENV === 'development') {
      console.log(`✅ Scroll verified successfully (attempt ${attempt + 1}, difference: ${difference.toFixed(1)}px)`);
    }
  }
}

/**
 * MAIN SCROLL FUNCTION - Enhanced & Intelligent
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
  
  // Calculate target padding for verification
  const viewportHeight = window.innerHeight;
  const targetPadding = deviceType === 'desktop' 
    ? 20 
    : viewportHeight * (deviceType === 'ultraMobile' ? 0.18 : 0.15);
  
  // Verify and correct after scroll completes (600ms for smooth scroll)
  setTimeout(() => {
    verifyAndCorrectScroll(element, deviceType, targetPadding);
  }, 600);
  
  // Development logging
  if (process.env.NODE_ENV === 'development') {
    console.log(`🎯 Enhanced Scroll to ${elementId}:`, {
      deviceType,
      navbarHeight: getNavbarHeight(),
      viewportHeight,
      elementTop: element.getBoundingClientRect().top + window.pageYOffset,
      elementHeight: element.getBoundingClientRect().height,
      scrollPosition,
      targetPadding: targetPadding.toFixed(1),
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
