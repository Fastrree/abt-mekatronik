import { useState, useEffect } from "react";
import { Menu, ChevronDown, Truck, Factory, Layers, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageSelector } from "@/components/LanguageSelector";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useI18n } from "@/lib/i18n";

type ProductKey = 'konveyor' | 'tekstil' | 'celik' | 'ozelMakine';

interface NavbarProps {
  onOpenProduct?: (productKey: ProductKey) => void;
}

export function Navbar({ onOpenProduct }: NavbarProps) {
  const { t, language } = useI18n();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isQuickMenuOpen, setIsQuickMenuOpen] = useState(false);
  
  const isRTL = language === 'ar';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const productLinks: { name: string; key: ProductKey; icon: typeof Truck }[] = [
    { name: t('productItems.konveyor.title'), key: "konveyor", icon: Truck },
    { name: t('productItems.tekstil.title'), key: "tekstil", icon: Factory },
    { name: t('productItems.celik.title'), key: "celik", icon: Layers },
    { name: t('productItems.ozelMakine.title'), key: "ozelMakine", icon: Wrench },
  ];

  const corporateLinks = [
    { name: t('nav.engineering'), href: "#engineering" },
    { name: t('nav.testimonials'), href: "#testimonials" },
    { name: t('nav.partners'), href: "#partners" },
    { name: t('nav.faq'), href: "#faq" },
  ];

  const handleProductClick = (key: ProductKey) => {
    setIsQuickMenuOpen(false);
    if (onOpenProduct) {
      onOpenProduct(key);
    }
  };

  const closeAllDropdowns = () => {
    setIsQuickMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white/95 dark:bg-zinc-900/95 backdrop-blur-sm shadow-lg py-3 border-b border-slate-200 dark:border-zinc-700" 
          : "bg-transparent py-6"
      }`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* LEFT SIDE: Hamburger Menu + Logo */}
        <div className="flex items-center gap-2 lg:gap-4">
          {/* Hamburger Menu - Mobile & Desktop */}
          <div className="relative">
            <button
              onClick={() => setIsQuickMenuOpen(!isQuickMenuOpen)}
              className={`flex items-center gap-1 p-2 rounded-lg transition-colors ${
                isScrolled
                  ? "text-zinc-900 dark:text-zinc-300 hover:bg-slate-200 dark:hover:bg-zinc-700/50"
                  : "text-white dark:text-zinc-300 hover:bg-zinc-700/50 dark:hover:bg-zinc-700/50"
              }`}
              aria-label={t('nav.quickAccess')}
            >
              <Menu size={20} />
              <ChevronDown size={14} className={`transition-transform hidden sm:block ${isQuickMenuOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {/* Quick Menu Dropdown - Same for Mobile & Desktop */}
            {isQuickMenuOpen && (
              <div 
                className="absolute top-full mt-2 w-64 bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-600 rounded-lg shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 z-50"
                style={{ [isRTL ? 'right' : 'left']: 0 }}
                dir={isRTL ? 'rtl' : 'ltr'}
              >
                <div className="p-2 max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-zinc-800 hover:scrollbar-thumb-zinc-500">
                  {/* Products Section */}
                  <div className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider px-3 py-2">
                    {t('nav.products')}
                  </div>
                  {productLinks.map((product) => {
                    const IconComponent = product.icon;
                    return (
                      <button
                        key={product.key}
                        onClick={() => handleProductClick(product.key)}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-700 rounded-md transition-colors text-left"
                      >
                        <IconComponent size={16} className="text-red-500" />
                        {product.name}
                      </button>
                    );
                  })}
                  
                  {/* Corporate Section */}
                  <div className="border-t border-zinc-600 dark:border-zinc-600 border-slate-200 mt-2 pt-2">
                    <div className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider px-3 py-2">
                      {t('nav.engineering')}
                    </div>
                    {corporateLinks.map((link) => (
                      <a
                        key={link.name}
                        href={link.href}
                        onClick={() => setIsQuickMenuOpen(false)}
                        className="block px-3 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-700 rounded-md transition-colors"
                      >
                        {link.name}
                      </a>
                    ))}
                  </div>
                  
                  {/* Projects & Contact */}
                  <div className="border-t border-slate-200 dark:border-zinc-600 mt-2 pt-2">
                    <a
                      href="#projects"
                      onClick={() => setIsQuickMenuOpen(false)}
                      className="block px-3 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-700 rounded-md transition-colors"
                    >
                      {t('nav.projects')}
                    </a>
                    <a
                      href="#contact"
                      onClick={() => setIsQuickMenuOpen(false)}
                      className="block px-3 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-700 rounded-md transition-colors"
                    >
                      {t('nav.contact')}
                    </a>
                  </div>
                  
                  {/* CTA */}
                  <div className="border-t border-slate-200 dark:border-zinc-600 mt-2 pt-2">
                    <a
                      href="#contact"
                      onClick={() => setIsQuickMenuOpen(false)}
                      className="block px-3 py-2.5 text-sm font-semibold text-red-500 hover:text-red-400 hover:bg-red-600/10 rounded-md transition-colors"
                    >
                      🚀 {t('products.getQuote')}
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Logo - Next to Hamburger on Desktop, Centered on Mobile */}
          <button 
            onClick={scrollToTop}
            className="text-lg sm:text-2xl font-black tracking-tighter text-zinc-900 dark:text-white flex items-center gap-1 sm:gap-2 cursor-pointer hover:opacity-80 transition-opacity lg:static absolute left-1/2 lg:left-auto lg:transform-none -translate-x-1/2 lg:translate-x-0"
          >
            ABT <span className="text-primary">MEKATRONİK</span>
          </button>
        </div>

        {/* RIGHT SIDE: Desktop Nav Items + Language + CTA */}
        <div className="hidden lg:flex items-center space-x-6">
          {/* Ana Sayfa */}
          <a
            href="#hero"
            onClick={closeAllDropdowns}
            className={`text-xs font-semibold uppercase tracking-wider py-2.5 ${
              isScrolled 
                ? "text-zinc-900 dark:text-zinc-300" 
                : "text-white dark:text-zinc-300"
            } hover:text-primary transition-colors relative group whitespace-nowrap`}
          >
            {t('nav.home')}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
          </a>

          {/* Ürünler */}
          <a
            href="#products"
            onClick={closeAllDropdowns}
            className={`text-xs font-semibold uppercase tracking-wider py-2.5 ${
              isScrolled 
                ? "text-zinc-900 dark:text-zinc-300" 
                : "text-white dark:text-zinc-300"
            } hover:text-primary transition-colors relative group whitespace-nowrap`}
          >
            {t('nav.products')}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
          </a>

          {/* Mühendislik */}
          <a
            href="#engineering"
            onClick={closeAllDropdowns}
            className={`text-xs font-semibold uppercase tracking-wider py-2.5 ${
              isScrolled 
                ? "text-zinc-900 dark:text-zinc-300" 
                : "text-white dark:text-zinc-300"
            } hover:text-primary transition-colors relative group whitespace-nowrap`}
          >
            {t('nav.engineering')}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
          </a>

          {/* Projeler */}
          <a
            href="#projects"
            onClick={closeAllDropdowns}
            className={`text-xs font-semibold uppercase tracking-wider py-2.5 ${
              isScrolled 
                ? "text-zinc-900 dark:text-zinc-300" 
                : "text-white dark:text-zinc-300"
            } hover:text-primary transition-colors relative group whitespace-nowrap`}
          >
            {t('nav.projects')}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
          </a>

          {/* İletişim */}
          <a
            href="#contact"
            onClick={closeAllDropdowns}
            className={`text-xs font-semibold uppercase tracking-wider py-2.5 ${
              isScrolled 
                ? "text-zinc-900 dark:text-zinc-300" 
                : "text-white dark:text-zinc-300"
            } hover:text-primary transition-colors relative group whitespace-nowrap`}
          >
            {t('nav.contact')}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
          </a>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Language Selector */}
          <LanguageSelector isScrolled={isScrolled} />
          
          {/* CTA Button */}
          <a href="#contact">
            <Button variant="default" className="bg-primary hover:bg-primary/90 text-white font-bold rounded-none skew-x-[-10deg] text-sm px-4 py-2">
              <span className="skew-x-[10deg]">{t('products.getQuote')}</span>
            </Button>
          </a>
        </div>

        {/* Mobile: Theme Toggle + Language Selector (RIGHT SIDE) */}
        <div className="lg:hidden flex items-center gap-2">
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
}
