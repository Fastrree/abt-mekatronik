import { useState, useEffect } from "react";
import { Menu, ChevronDown, Truck, Factory, Layers, Wrench, Building2, Award, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageSelector } from "@/components/LanguageSelector";
import { useI18n } from "@/lib/i18n";

type ProductKey = 'konveyor' | 'tekstil' | 'celik' | 'ozelMakine';

interface NavbarProps {
  onOpenProduct?: (productKey: ProductKey) => void;
}

export function Navbar({ onOpenProduct }: NavbarProps) {
  const { t } = useI18n();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isQuickMenuOpen, setIsQuickMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

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

  const aboutLinks = [
    { name: t('nav.engineering'), href: "#engineering", icon: Building2 },
    { name: t('nav.testimonials'), href: "#testimonials", icon: Award },
    { name: t('nav.partners'), href: "#partners", icon: Users },
  ];

  const corporateLinks = [
    { name: t('nav.engineering'), href: "#engineering" },
    { name: t('nav.testimonials'), href: "#testimonials" },
    { name: t('nav.partners'), href: "#partners" },
    { name: t('nav.faq'), href: "#faq" },
  ];

  const handleProductClick = (key: ProductKey) => {
    setIsQuickMenuOpen(false);
    setIsProductsOpen(false);
    if (onOpenProduct) {
      onOpenProduct(key);
    }
  };

  const closeAllDropdowns = () => {
    setIsProductsOpen(false);
    setIsAboutOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-zinc-900/95 backdrop-blur-sm shadow-lg py-3 border-b border-zinc-700" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-2 lg:gap-4">
          {/* Quick Access Menu - Mobile & Tablet */}
          <div className="relative lg:hidden">
            <button
              onClick={() => setIsQuickMenuOpen(!isQuickMenuOpen)}
              className="flex items-center gap-1 text-zinc-300 hover:text-white transition-colors p-2 rounded-lg hover:bg-zinc-700/50"
              aria-label={t('nav.quickAccess')}
            >
              <Menu size={20} />
              <ChevronDown size={14} className={`transition-transform hidden sm:block ${isQuickMenuOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {/* Mobile Quick Menu Dropdown */}
            {isQuickMenuOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-zinc-800 border border-zinc-600 rounded-lg shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2">
                <div className="p-2 max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-zinc-800 hover:scrollbar-thumb-zinc-500">
                  {/* Products Section */}
                  <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider px-3 py-2">
                    {t('nav.products')}
                  </div>
                  {productLinks.map((product) => {
                    const IconComponent = product.icon;
                    return (
                      <button
                        key={product.key}
                        onClick={() => handleProductClick(product.key)}
                        className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-zinc-300 hover:text-white hover:bg-zinc-700 rounded-md transition-colors text-left"
                      >
                        <IconComponent size={16} className="text-red-500" />
                        {product.name}
                      </button>
                    );
                  })}
                  
                  {/* Corporate Section */}
                  <div className="border-t border-zinc-600 mt-2 pt-2">
                    <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider px-3 py-2">
                      {t('nav.engineering')}
                    </div>
                    {corporateLinks.map((link) => (
                      <a
                        key={link.name}
                        href={link.href}
                        onClick={() => setIsQuickMenuOpen(false)}
                        className="block px-3 py-2 text-sm text-zinc-300 hover:text-white hover:bg-zinc-700 rounded-md transition-colors"
                      >
                        {link.name}
                      </a>
                    ))}
                  </div>
                  
                  {/* Projects & Contact */}
                  <div className="border-t border-zinc-600 mt-2 pt-2">
                    <a
                      href="#projects"
                      onClick={() => setIsQuickMenuOpen(false)}
                      className="block px-3 py-2 text-sm text-zinc-300 hover:text-white hover:bg-zinc-700 rounded-md transition-colors"
                    >
                      {t('nav.projects')}
                    </a>
                    <a
                      href="#contact"
                      onClick={() => setIsQuickMenuOpen(false)}
                      className="block px-3 py-2 text-sm text-zinc-300 hover:text-white hover:bg-zinc-700 rounded-md transition-colors"
                    >
                      {t('nav.contact')}
                    </a>
                  </div>
                  
                  {/* CTA */}
                  <div className="border-t border-zinc-600 mt-2 pt-2">
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

          {/* Logo */}
          <button 
            onClick={scrollToTop}
            className="text-lg sm:text-2xl font-black tracking-tighter text-white flex items-center gap-1 sm:gap-2 cursor-pointer hover:opacity-80 transition-opacity"
          >
            ABT <span className="text-primary">MEKATRONİK</span>
          </button>
        </div>

        {/* Desktop Nav - Hierarchical Structure */}
        <div className="hidden lg:flex items-center space-x-6">
          {/* Home */}
          <a
            href="#hero"
            onClick={closeAllDropdowns}
            className="text-xs font-semibold uppercase tracking-wider text-zinc-300 hover:text-primary transition-colors relative group whitespace-nowrap"
          >
            {t('nav.home')}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
          </a>

          {/* Products Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setIsProductsOpen(true)}
            onMouseLeave={() => setIsProductsOpen(false)}
          >
            <button
              className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-zinc-300 hover:text-primary transition-colors relative group whitespace-nowrap"
            >
              {t('nav.products')}
              <ChevronDown size={12} className={`transition-transform ${isProductsOpen ? 'rotate-180' : ''}`} />
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </button>
            
            {isProductsOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-zinc-800 border border-zinc-600 rounded-lg shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2">
                <div className="p-2">
                  {productLinks.map((product) => {
                    const IconComponent = product.icon;
                    return (
                      <button
                        key={product.key}
                        onClick={() => handleProductClick(product.key)}
                        className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-zinc-300 hover:text-white hover:bg-zinc-700 rounded-md transition-colors text-left"
                      >
                        <IconComponent size={16} className="text-red-500" />
                        {product.name}
                      </button>
                    );
                  })}
                  <div className="border-t border-zinc-600 mt-2 pt-2">
                    <a
                      href="#products"
                      onClick={closeAllDropdowns}
                      className="block px-3 py-2 text-sm text-zinc-400 hover:text-white hover:bg-zinc-700 rounded-md transition-colors"
                    >
                      → {t('nav.products')}
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* About Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setIsAboutOpen(true)}
            onMouseLeave={() => setIsAboutOpen(false)}
          >
            <button
              className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-zinc-300 hover:text-primary transition-colors relative group whitespace-nowrap"
            >
              {t('nav.engineering')}
              <ChevronDown size={12} className={`transition-transform ${isAboutOpen ? 'rotate-180' : ''}`} />
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </button>
            
            {isAboutOpen && (
              <div className="absolute top-full left-0 mt-2 w-56 bg-zinc-800 border border-zinc-600 rounded-lg shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2">
                <div className="p-2">
                  {aboutLinks.map((link) => {
                    const IconComponent = link.icon;
                    return (
                      <a
                        key={link.name}
                        href={link.href}
                        onClick={closeAllDropdowns}
                        className="flex items-center gap-3 px-3 py-2.5 text-sm text-zinc-300 hover:text-white hover:bg-zinc-700 rounded-md transition-colors"
                      >
                        <IconComponent size={16} className="text-red-500" />
                        {link.name}
                      </a>
                    );
                  })}
                  <div className="border-t border-zinc-600 mt-2 pt-2">
                    <a
                      href="#faq"
                      onClick={closeAllDropdowns}
                      className="block px-3 py-2 text-sm text-zinc-400 hover:text-white hover:bg-zinc-700 rounded-md transition-colors"
                    >
                      → {t('nav.faq')}
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Projects */}
          <a
            href="#projects"
            onClick={closeAllDropdowns}
            className="text-xs font-semibold uppercase tracking-wider text-zinc-300 hover:text-primary transition-colors relative group whitespace-nowrap"
          >
            {t('nav.projects')}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
          </a>

          {/* Contact */}
          <a
            href="#contact"
            onClick={closeAllDropdowns}
            className="text-xs font-semibold uppercase tracking-wider text-zinc-300 hover:text-primary transition-colors relative group whitespace-nowrap"
          >
            {t('nav.contact')}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
          </a>

          {/* Language Selector */}
          <LanguageSelector />
          
          {/* CTA Button */}
          <a href="#contact">
            <Button variant="default" className="bg-primary hover:bg-primary/90 text-white font-bold rounded-none skew-x-[-10deg] text-sm px-4 py-2">
              <span className="skew-x-[10deg]">{t('products.getQuote')}</span>
            </Button>
          </a>
        </div>

        {/* Mobile: Only Language Selector */}
        <div className="lg:hidden">
          <LanguageSelector />
        </div>
      </div>

      {/* Click outside to close menus */}
      {(isQuickMenuOpen || isProductsOpen || isAboutOpen) && (
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
