import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, Truck, Factory, Layers, Wrench } from "lucide-react";
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isQuickMenuOpen, setIsQuickMenuOpen] = useState(false);

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

  const navLinks = [
    { name: t('nav.home'), href: "#hero" },
    { name: t('nav.products'), href: "#products" },
    { name: t('nav.engineering'), href: "#engineering" },
    { name: t('nav.projects'), href: "#projects" },
    { name: t('nav.contact'), href: "#contact" },
    { name: t('nav.faq'), href: "#faq" },
    { name: t('nav.testimonials'), href: "#testimonials" },
    { name: t('nav.partners'), href: "#partners" },
  ];

  const productLinks: { name: string; key: ProductKey; icon: typeof Truck }[] = [
    { name: t('productItems.konveyor.title'), key: "konveyor", icon: Truck },
    { name: t('productItems.tekstil.title'), key: "tekstil", icon: Factory },
    { name: t('productItems.celik.title'), key: "celik", icon: Layers },
    { name: t('productItems.ozelMakine.title'), key: "ozelMakine", icon: Wrench },
  ];

  const handleProductClick = (key: ProductKey) => {
    setIsQuickMenuOpen(false);
    setIsMobileMenuOpen(false);
    if (onOpenProduct) {
      onOpenProduct(key);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-zinc-900/95 shadow-lg py-4 border-b border-zinc-700" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          {/* Quick Access Menu */}
          <div className="relative">
            <button
              onClick={() => setIsQuickMenuOpen(!isQuickMenuOpen)}
              className="flex items-center gap-1 text-zinc-300 hover:text-white transition-colors p-2 rounded-lg hover:bg-zinc-700/50"
              aria-label={t('nav.quickAccess')}
            >
              <Menu size={20} />
              <ChevronDown size={14} className={`transition-transform ${isQuickMenuOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {/* Quick Menu Dropdown */}
            {isQuickMenuOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-zinc-800 border border-zinc-600 rounded-lg shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="p-2 max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-zinc-800 hover:scrollbar-thumb-zinc-500">
                  <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider px-3 py-2">
                    {t('footer.productGroups')}
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
                  <div className="border-t border-zinc-600 mt-2 pt-2">
                    <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider px-3 py-2">
                      {t('nav.quickAccess')}
                    </div>
                    {navLinks.map((link) => (
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
            className="text-2xl font-black tracking-tighter text-white flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
          >
            ABT <span className="text-primary">MEKATRONİK</span>
          </button>
        </div>

        {/* Desktop Nav - Only main links */}
        <div className="hidden lg:flex items-center space-x-6">
          {navLinks.slice(0, 5).map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs font-semibold uppercase tracking-wider text-zinc-300 hover:text-primary transition-colors relative group whitespace-nowrap"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </a>
          ))}
          <LanguageSelector />
          <a href="#contact">
            <Button variant="default" className="bg-primary hover:bg-primary/90 text-white font-bold rounded-none skew-x-[-10deg] text-sm px-4 py-2">
              <span className="skew-x-[10deg]">{t('products.getQuote')}</span>
            </Button>
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-white p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Menu"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-zinc-900 border-b border-zinc-700 p-6 animate-in slide-in-from-top-5">
          <div className="flex flex-col space-y-2">
            <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider py-2">
              {t('footer.productGroups')}
            </div>
            {productLinks.map((product) => {
              const IconComponent = product.icon;
              return (
                <button
                  key={product.key}
                  onClick={() => handleProductClick(product.key)}
                  className="flex items-center gap-3 py-2 text-base text-zinc-300 hover:text-primary text-left"
                >
                  <IconComponent size={18} className="text-red-500" />
                  {product.name}
                </button>
              );
            })}
            <div className="border-t border-zinc-700 my-2 pt-2">
              <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider py-2">
                {t('nav.quickAccess')}
              </div>
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block py-2 text-base text-zinc-300 hover:text-primary"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
            </div>
            <div className="border-t border-zinc-700 my-2 pt-4">
              <LanguageSelector />
            </div>
            <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>
              <Button className="w-full bg-primary hover:bg-primary/90 mt-2">{t('products.getQuote')}</Button>
            </a>
          </div>
        </div>
      )}

      {/* Click outside to close quick menu */}
      {isQuickMenuOpen && (
        <div 
          className="fixed inset-0 z-[-1]" 
          onClick={() => setIsQuickMenuOpen(false)}
        />
      )}
    </nav>
  );
}
