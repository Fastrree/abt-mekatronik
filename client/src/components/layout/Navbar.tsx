import { useState, useEffect, useCallback, useMemo, memo } from "react";
import { Menu, ChevronDown, Truck, Factory, Layers, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageSelector } from "@/components/LanguageSelector";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useI18n } from "@/lib/i18n";
import { smoothScrollToElement } from "@/lib/scroll-utils";
import { useLocation } from "wouter";

type ProductKey = 'konveyor' | 'tekstil' | 'celik' | 'ozelMakine';

export const Navbar = memo(function Navbar() {
  const { t, language } = useI18n();
  const [, setLocation] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isQuickMenuOpen, setIsQuickMenuOpen] = useState(false);
  
  const isRTL = language === 'ar';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const productLinks: { name: string; key: ProductKey; icon: typeof Truck }[] = useMemo(() => [
    { name: t('productItems.konveyor.title'), key: "konveyor", icon: Truck },
    { name: t('productItems.tekstil.title'), key: "tekstil", icon: Factory },
    { name: t('productItems.celik.title'), key: "celik", icon: Layers },
    { name: t('productItems.ozelMakine.title'), key: "ozelMakine", icon: Wrench },
  ], [t]);

  const closeAllDropdowns = useCallback(() => {
    setIsQuickMenuOpen(false);
  }, []);

  // Smart navigation: if already on home page, just scroll to top
  const handleHomeClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const currentPath = window.location.pathname;
    if (currentPath === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    // If on another page, let the default link behavior work (navigate to /)
  }, []);

  // Smart navigation for section links: if on home page, scroll; if not, navigate
  const handleSectionClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    const currentPath = window.location.pathname;
    if (currentPath === '/') {
      e.preventDefault();
      smoothScrollToElement(sectionId);
    }
    // If on another page, let the default link behavior work (navigate to /#section)
  }, []);

  // Programmatic navigation for hamburger menu (works from any page)
  const navigateToSection = useCallback((sectionId: string) => {
    const currentPath = window.location.pathname;
    if (currentPath === '/') {
      // Already on home page, just scroll
      smoothScrollToElement(sectionId);
    } else {
      // Navigate to home page with hash
      setLocation(`/#${sectionId}`);
    }
    setIsQuickMenuOpen(false);
  }, [setLocation]);

  // Smart CTA handler: scroll to WhatsApp button on current page
  const handleCTAClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    const currentPath = window.location.pathname;
    
    // All pages have WhatsApp button in Footer, scroll to it
    smoothScrollToElement('contact-whatsapp');
    
    // Close dropdown if open
    setIsQuickMenuOpen(false);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-zinc-900/95 backdrop-blur-sm shadow-lg py-3 border-b border-zinc-700" 
          : "bg-transparent py-6"
      }`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="container mx-auto px-3 sm:px-4 flex justify-between items-center gap-2 sm:gap-4">
        {/* LEFT SIDE: Hamburger Menu + Logo */}
        <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-4">
          {/* Hamburger Menu - Mobile & Desktop */}
          <div 
            className="relative"
            onMouseEnter={(e) => {
              // Only trigger on desktop (devices with hover capability)
              if (window.matchMedia('(hover: hover)').matches) {
                setIsQuickMenuOpen(true);
              }
            }}
            onMouseLeave={(e) => {
              // Only trigger on desktop (devices with hover capability)
              if (window.matchMedia('(hover: hover)').matches) {
                setIsQuickMenuOpen(false);
              }
            }}
          >
            <button
              onClick={() => setIsQuickMenuOpen(!isQuickMenuOpen)}
              className={`group flex items-center gap-1.5 xs:gap-1 px-3 py-2 xs:px-2 xs:py-1.5 rounded-xl transition-all duration-300 border-2 ${
                isScrolled
                  ? "text-white border-zinc-700 hover:border-red-500 hover:bg-red-600/10 hover:shadow-lg hover:shadow-red-600/20"
                  : "text-white border-zinc-700/50 hover:border-red-500 hover:bg-red-600/10 hover:shadow-lg hover:shadow-red-600/20"
              } ${isQuickMenuOpen ? 'border-red-500 bg-red-600/10 shadow-lg shadow-red-600/20' : ''}`}
              aria-label={t('nav.quickAccess')}
              aria-expanded={isQuickMenuOpen}
              aria-haspopup="true"
            >
              <Menu size={20} className="xs:w-4 xs:h-4 group-hover:scale-110 transition-transform" />
              <ChevronDown size={14} className={`transition-all hidden sm:block xs:w-3 xs:h-3 group-hover:scale-110 ${isQuickMenuOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {/* Quick Menu Dropdown - Hierarchical Structure */}
            {isQuickMenuOpen && (
              <div 
                className="absolute top-full mt-0.5 w-64 bg-gradient-to-br from-zinc-800 to-zinc-900 border-2 border-zinc-700 rounded-2xl shadow-2xl shadow-red-600/10 overflow-hidden animate-in fade-in slide-in-from-top-2 z-50"
                style={{ [isRTL ? 'right' : 'left']: 0 }}
                dir={isRTL ? 'rtl' : 'ltr'}
              >
                <div className="p-3 max-h-[70vh] overflow-y-auto scrollbar-thin">
                  {/* 1. Ana Sayfa */}
                  <a
                    href="/"
                    onClick={(e) => {
                      handleHomeClick(e);
                      setIsQuickMenuOpen(false);
                    }}
                    className="block px-4 py-2.5 text-sm font-medium text-white hover:text-red-500 hover:bg-zinc-700/50 rounded-xl transition-all duration-300 hover:translate-x-1"
                    dir={isRTL ? 'rtl' : 'ltr'}
                  >
                    {t('nav.home')}
                  </a>

                  {/* 2. Hakkımızda (Separate Page) */}
                  <div className="border-t border-zinc-700/50 mt-2 pt-2">
                    <a
                      href="/about"
                      onClick={() => setIsQuickMenuOpen(false)}
                      className="block px-4 py-2.5 text-sm font-medium text-white hover:text-red-500 hover:bg-zinc-700/50 rounded-xl transition-all duration-300 hover:translate-x-1"
                      dir={isRTL ? 'rtl' : 'ltr'}
                    >
                      {t('nav.about')}
                    </a>
                  </div>

                  {/* 3. Ürünler (Products Section) */}
                  <div className="border-t border-zinc-700/50 mt-2 pt-2">
                    <div className={`text-xs font-bold text-red-500 uppercase tracking-wider px-4 py-2 ${isRTL ? 'text-right' : 'text-left'}`} dir={isRTL ? 'rtl' : 'ltr'}>
                      {t('nav.products')}
                    </div>
                    {productLinks.map((product) => {
                      const IconComponent = product.icon;
                      return (
                        <a
                          key={product.key}
                          href={`/products/${product.key}`}
                          onClick={() => setIsQuickMenuOpen(false)}
                          className={`w-full flex items-center px-4 py-2.5 text-sm font-medium text-white hover:text-red-500 hover:bg-zinc-700/50 rounded-xl transition-all duration-300 gap-3 hover:translate-x-1 ${
                            isRTL ? 'flex-row-reverse text-right' : 'text-left'
                          }`}
                          dir={isRTL ? 'rtl' : 'ltr'}
                        >
                          {!isRTL && <IconComponent size={16} className="text-red-500 shrink-0 group-hover:scale-110 transition-transform" />}
                          <span className="flex-1">{product.name}</span>
                          {isRTL && <IconComponent size={16} className="text-red-500 shrink-0 group-hover:scale-110 transition-transform" />}
                        </a>
                      );
                    })}
                  </div>
                  
                  {/* 4. Mühendislik (Engineering + Trust Indicators) */}
                  <div className="border-t border-zinc-700/50 mt-2 pt-2">
                    <button
                      onClick={() => navigateToSection('engineering')}
                      className={`w-full block px-4 py-2.5 text-sm font-medium text-white hover:text-red-500 hover:bg-zinc-700/50 rounded-xl transition-all duration-300 hover:translate-x-1 ${isRTL ? 'text-right' : 'text-left'}`}
                      dir={isRTL ? 'rtl' : 'ltr'}
                    >
                      {t('nav.engineering')}
                    </button>
                  </div>

                  {/* 5. Projeler (Gallery) */}
                  <div className="border-t border-zinc-700/50 mt-2 pt-2">
                    <button
                      onClick={() => navigateToSection('projects')}
                      className={`w-full block px-4 py-2.5 text-sm font-medium text-white hover:text-red-500 hover:bg-zinc-700/50 rounded-xl transition-all duration-300 hover:translate-x-1 ${isRTL ? 'text-right' : 'text-left'}`}
                      dir={isRTL ? 'rtl' : 'ltr'}
                    >
                      {t('nav.projects')}
                    </button>
                  </div>

                  {/* 6. SSS (FAQ) */}
                  <div className="border-t border-zinc-700/50 mt-2 pt-2">
                    <button
                      onClick={() => navigateToSection('faq')}
                      className={`w-full block px-4 py-2.5 text-sm font-medium text-white hover:text-red-500 hover:bg-zinc-700/50 rounded-xl transition-all duration-300 hover:translate-x-1 ${isRTL ? 'text-right' : 'text-left'}`}
                      dir={isRTL ? 'rtl' : 'ltr'}
                    >
                      {t('nav.faq')}
                    </button>
                  </div>

                  {/* 7. Referanslar (Testimonials) */}
                  <div className="border-t border-zinc-700/50 mt-2 pt-2">
                    <button
                      onClick={() => navigateToSection('testimonials')}
                      className={`w-full block px-4 py-2.5 text-sm font-medium text-white hover:text-red-500 hover:bg-zinc-700/50 rounded-xl transition-all duration-300 hover:translate-x-1 ${isRTL ? 'text-right' : 'text-left'}`}
                      dir={isRTL ? 'rtl' : 'ltr'}
                    >
                      {t('nav.testimonials')}
                    </button>
                  </div>

                  {/* 8. Ortaklarımız (Client Logos) */}
                  <div className="border-t border-zinc-700/50 mt-2 pt-2">
                    <button
                      onClick={() => navigateToSection('partners')}
                      className={`w-full block px-4 py-2.5 text-sm font-medium text-white hover:text-red-500 hover:bg-zinc-700/50 rounded-xl transition-all duration-300 hover:translate-x-1 ${isRTL ? 'text-right' : 'text-left'}`}
                      dir={isRTL ? 'rtl' : 'ltr'}
                    >
                      {t('nav.partners')}
                    </button>
                  </div>

                  {/* 9. İhracatlarımız (Separate Page) */}
                  <div className="border-t border-zinc-700/50 mt-2 pt-2">
                    <a
                      href="/exports"
                      onClick={() => setIsQuickMenuOpen(false)}
                      className="block px-4 py-2.5 text-sm font-medium text-white hover:text-red-500 hover:bg-zinc-700/50 rounded-xl transition-all duration-300 hover:translate-x-1"
                      dir={isRTL ? 'rtl' : 'ltr'}
                    >
                      {t('nav.exports')}
                    </a>
                  </div>

                  {/* 10. İletişim (WhatsApp Button in Footer) */}
                  <div className="border-t border-zinc-700/50 mt-2 pt-2">
                    <button
                      onClick={() => navigateToSection('contact-whatsapp')}
                      className={`w-full block px-4 py-2.5 text-sm font-medium text-white hover:text-red-500 hover:bg-zinc-700/50 rounded-xl transition-all duration-300 hover:translate-x-1 ${isRTL ? 'text-right' : 'text-left'}`}
                      dir={isRTL ? 'rtl' : 'ltr'}
                    >
                      {t('nav.contact')}
                    </button>
                  </div>
                  
                  {/* CTA - Highlighted */}
                  <div className="border-t border-zinc-700/50 mt-2 pt-2">
                    <button
                      onClick={handleCTAClick}
                      className={`w-full block px-4 py-3 text-sm font-bold text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-600/50 ${isRTL ? 'text-right' : 'text-left'}`}
                      dir={isRTL ? 'rtl' : 'ltr'}
                    >
                      🚀 {t('products.getQuote')}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Logo - Mobile: Next to hamburger (not centered), Desktop: Next to hamburger */}
          <a 
            href="/"
            onClick={handleHomeClick}
            className="text-base sm:text-2xl font-black tracking-tighter text-white flex items-center gap-0.5 sm:gap-2 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <span className="text-lg sm:text-3xl">ABT</span>
            <span className="text-primary text-[9px] sm:text-base font-semibold">MEKATRONİK</span>
          </a>
        </div>

        {/* RIGHT SIDE: Desktop Nav Items + Language + CTA */}
        <div className={`hidden lg:flex items-center space-x-6 ${
          isRTL ? 'ml-8' : ''
        }`}>
          {/* Ana Sayfa */}
          <a
            href="/"
            onClick={(e) => {
              handleHomeClick(e);
              closeAllDropdowns();
            }}
            className="text-xs font-semibold uppercase tracking-wider py-2.5 text-white hover:text-primary transition-colors relative group whitespace-nowrap"
          >
            {t('nav.home')}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
          </a>

          {/* Hakkımızda */}
          <a
            href="/about"
            onClick={closeAllDropdowns}
            className="text-xs font-semibold uppercase tracking-wider py-2.5 text-white hover:text-primary transition-colors relative group whitespace-nowrap"
          >
            {t('nav.about')}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
          </a>

          {/* Ürünler */}
          <a
            href="/#products"
            onClick={(e) => {
              handleSectionClick(e, 'products');
              closeAllDropdowns();
            }}
            className="text-xs font-semibold uppercase tracking-wider py-2.5 text-white hover:text-primary transition-colors relative group whitespace-nowrap"
          >
            {t('nav.products')}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
          </a>

          {/* Mühendislik */}
          <a
            href="/#engineering"
            onClick={(e) => {
              handleSectionClick(e, 'engineering');
              closeAllDropdowns();
            }}
            className="text-xs font-semibold uppercase tracking-wider py-2.5 text-white hover:text-primary transition-colors relative group whitespace-nowrap"
          >
            {t('nav.engineering')}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
          </a>

          {/* Projeler */}
          <a
            href="/#projects"
            onClick={(e) => {
              handleSectionClick(e, 'projects');
              closeAllDropdowns();
            }}
            className="text-xs font-semibold uppercase tracking-wider py-2.5 text-white hover:text-primary transition-colors relative group whitespace-nowrap"
          >
            {t('nav.projects')}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
          </a>

          {/* İhracatlarımız */}
          <a
            href="/exports"
            onClick={closeAllDropdowns}
            className="text-xs font-semibold uppercase tracking-wider py-2.5 text-white hover:text-primary transition-colors relative group whitespace-nowrap"
          >
            {t('nav.exports')}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
          </a>

          {/* İletişim */}
          <a
            href="/#contact"
            onClick={(e) => {
              handleSectionClick(e, 'contact');
              closeAllDropdowns();
            }}
            className="text-xs font-semibold uppercase tracking-wider py-2.5 text-white hover:text-primary transition-colors relative group whitespace-nowrap"
          >
            {t('nav.contact')}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
          </a>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Language Selector */}
          <LanguageSelector isScrolled={isScrolled} />
          
          {/* CTA Button */}
          <a 
            href="#contact"
            onClick={handleCTAClick}
          >
            <Button variant="default" className="bg-primary hover:bg-primary/90 text-white font-bold rounded-none skew-x-[-10deg] text-sm px-4 py-2">
              <span className="skew-x-[10deg]">{t('products.getQuote')}</span>
            </Button>
          </a>
        </div>

        {/* Mobile: Theme Toggle + Language Selector (RIGHT SIDE) */}
        <div className={`lg:hidden flex items-center gap-0.5 sm:gap-1 ${
          isRTL ? 'ml-16 sm:ml-8' : ''
        }`}>
          <ThemeToggle />
          <LanguageSelector isScrolled={isScrolled} />
        </div>
      </div>

      {/* Click outside to close menus */}
      {isQuickMenuOpen && (
        <div 
          className="fixed inset-0 z-[-1]" 
          onClick={() => {
            setIsQuickMenuOpen(false);
            closeAllDropdowns();
          }}
        />
      )}
    </nav>
  );
});
