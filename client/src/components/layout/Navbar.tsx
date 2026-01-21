import { useState, useEffect, useCallback, useMemo, memo } from "react";
import { Menu, ChevronDown, Truck, Factory, Layers, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageSelector } from "@/components/LanguageSelector";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useI18n } from "@/lib/i18n";
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
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    // If on another page, let the default link behavior work (navigate to /#section)
  }, []);

  // Programmatic navigation for hamburger menu (works from any page)
  const navigateToSection = useCallback((sectionId: string) => {
    const currentPath = window.location.pathname;
    if (currentPath === '/') {
      // Already on home page, just scroll
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      // Navigate to home page with hash
      setLocation(`/#${sectionId}`);
    }
    setIsQuickMenuOpen(false);
  }, [setLocation]);

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
          <div className="relative">
            <button
              onClick={() => setIsQuickMenuOpen(!isQuickMenuOpen)}
              className={`flex items-center gap-1 xs:gap-0.5 p-2 xs:p-1 rounded-lg transition-colors ${
                isScrolled
                  ? "text-white hover:bg-zinc-700/50"
                  : "text-white hover:bg-zinc-700/50"
              }`}
              aria-label={t('nav.quickAccess')}
            >
              <Menu size={20} className="xs:w-4 xs:h-4" />
              <ChevronDown size={14} className={`transition-transform hidden sm:block xs:w-3 xs:h-3 ${isQuickMenuOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {/* Quick Menu Dropdown - Hierarchical Structure */}
            {isQuickMenuOpen && (
              <div 
                className="absolute top-full mt-2 w-64 bg-zinc-800 border border-zinc-600 rounded-lg shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 z-50"
                style={{ [isRTL ? 'right' : 'left']: 0 }}
                dir={isRTL ? 'rtl' : 'ltr'}
              >
                <div className="p-2 max-h-[70vh] overflow-y-auto scrollbar-thin">
                  {/* 1. Ana Sayfa */}
                  <a
                    href="/"
                    onClick={(e) => {
                      handleHomeClick(e);
                      setIsQuickMenuOpen(false);
                    }}
                    className="block px-3 py-2 text-sm text-white hover:text-gray-200 hover:bg-zinc-700 rounded-md transition-colors"
                  >
                    {t('nav.home')}
                  </a>

                  {/* 2. Hakkımızda (Separate Page) */}
                  <div className="border-t border-zinc-600 mt-2 pt-2">
                    <a
                      href="/about"
                      onClick={() => setIsQuickMenuOpen(false)}
                      className="block px-3 py-2 text-sm text-white hover:text-gray-200 hover:bg-zinc-700 rounded-md transition-colors"
                    >
                      {t('nav.about')}
                    </a>
                  </div>

                  {/* 3. Ürünler (Products Section) */}
                  <div className="border-t border-zinc-600 mt-2 pt-2">
                    <div className="text-xs font-semibold text-gray-300 uppercase tracking-wider px-3 py-2">
                      {t('nav.products')}
                    </div>
                    {productLinks.map((product) => {
                      const IconComponent = product.icon;
                      return (
                        <a
                          key={product.key}
                          href={`/products/${product.key}`}
                          onClick={() => setIsQuickMenuOpen(false)}
                          className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-white hover:text-gray-200 hover:bg-zinc-700 rounded-md transition-colors text-left"
                        >
                          <IconComponent size={16} className="text-red-500" />
                          {product.name}
                        </a>
                      );
                    })}
                  </div>
                  
                  {/* 4. Mühendislik (Engineering + Trust Indicators) */}
                  <div className="border-t border-zinc-600 mt-2 pt-2">
                    <button
                      onClick={() => navigateToSection('engineering')}
                      className="w-full text-left block px-3 py-2 text-sm text-white hover:text-gray-200 hover:bg-zinc-700 rounded-md transition-colors"
                    >
                      {t('nav.engineering')}
                    </button>
                  </div>

                  {/* 5. Projeler (Gallery) */}
                  <div className="border-t border-zinc-600 mt-2 pt-2">
                    <button
                      onClick={() => navigateToSection('projects')}
                      className="w-full text-left block px-3 py-2 text-sm text-white hover:text-gray-200 hover:bg-zinc-700 rounded-md transition-colors"
                    >
                      {t('nav.projects')}
                    </button>
                  </div>

                  {/* 6. SSS (FAQ) */}
                  <div className="border-t border-zinc-600 mt-2 pt-2">
                    <button
                      onClick={() => navigateToSection('faq')}
                      className="w-full text-left block px-3 py-2 text-sm text-white hover:text-gray-200 hover:bg-zinc-700 rounded-md transition-colors"
                    >
                      {t('nav.faq')}
                    </button>
                  </div>

                  {/* 7. Referanslar (Testimonials) */}
                  <div className="border-t border-zinc-600 mt-2 pt-2">
                    <button
                      onClick={() => navigateToSection('testimonials')}
                      className="w-full text-left block px-3 py-2 text-sm text-white hover:text-gray-200 hover:bg-zinc-700 rounded-md transition-colors"
                    >
                      {t('nav.testimonials')}
                    </button>
                  </div>

                  {/* 8. Ortaklarımız (Client Logos) */}
                  <div className="border-t border-zinc-600 mt-2 pt-2">
                    <button
                      onClick={() => navigateToSection('partners')}
                      className="w-full text-left block px-3 py-2 text-sm text-white hover:text-gray-200 hover:bg-zinc-700 rounded-md transition-colors"
                    >
                      {t('nav.partners')}
                    </button>
                  </div>

                  {/* 9. İhracatlarımız (Separate Page) */}
                  <div className="border-t border-zinc-600 mt-2 pt-2">
                    <a
                      href="/exports"
                      onClick={() => setIsQuickMenuOpen(false)}
                      className="block px-3 py-2 text-sm text-white hover:text-gray-200 hover:bg-zinc-700 rounded-md transition-colors"
                    >
                      {t('nav.exports')}
                    </a>
                  </div>

                  {/* 10. İletişim (Contact in Footer) */}
                  <div className="border-t border-zinc-600 mt-2 pt-2">
                    <button
                      onClick={() => navigateToSection('contact')}
                      className="w-full text-left block px-3 py-2 text-sm text-white hover:text-gray-200 hover:bg-zinc-700 rounded-md transition-colors"
                    >
                      {t('nav.contact')}
                    </button>
                  </div>
                  
                  {/* CTA - Highlighted */}
                  <div className="border-t border-zinc-600 mt-2 pt-2">
                    <button
                      onClick={() => navigateToSection('contact')}
                      className="w-full text-left block px-3 py-2.5 text-sm font-semibold text-red-500 hover:text-red-400 hover:bg-red-600/10 rounded-md transition-colors"
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
            href="/#contact"
            onClick={(e) => handleSectionClick(e, 'contact')}
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
