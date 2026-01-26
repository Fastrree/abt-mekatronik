import { memo } from 'react';
import { MapPin, Phone, Mail, Linkedin, Instagram, Facebook, Truck, Factory, Layers, Wrench } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { smoothScrollToElement, smoothScrollToTop } from "@/lib/scroll-utils";

type ProductKey = 'konveyor' | 'tekstil' | 'celik' | 'ozelMakine';

export const Footer = memo(function Footer() {
  const { t, language } = useI18n();
  
  const isRTL = language === 'ar';
  
  const productLinks: { key: ProductKey; icon: typeof Truck }[] = [
    { key: "konveyor", icon: Truck },
    { key: "tekstil", icon: Factory },
    { key: "celik", icon: Layers },
    { key: "ozelMakine", icon: Wrench },
  ];

  // Smart navigation: if already on home page, just scroll to top
  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const currentPath = window.location.pathname;
    if (currentPath === '/') {
      e.preventDefault();
      smoothScrollToTop();
    }
  };

  // Smart navigation for section links
  const handleSectionClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    const currentPath = window.location.pathname;
    if (currentPath === '/') {
      e.preventDefault();
      smoothScrollToElement(sectionId);
    }
  };

  return (
    <footer className="bg-zinc-50 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* FOOTER CONTENT */}
      <div className="container mx-auto px-6 pt-20 pb-10">
        {/* GOOGLE MAPS SECTION */}
        <div className="mb-16">
          {/* Invisible anchor for precise scroll positioning - 50px offset for perfect view */}
          <div id="contact" className="absolute" style={{ marginTop: '-175px' }}></div>
          <div className="grid lg:grid-cols-2 gap-8">
            {/* MAP - Premium Interactive Design */}
            <a
              href="https://www.google.com/maps/search/?api=1&query=37.5467137,36.93"
              target="_blank"
              rel="noopener noreferrer"
              className="relative block h-[400px] lg:h-[500px] rounded-2xl overflow-hidden border-2 border-zinc-200 dark:border-zinc-700 shadow-2xl bg-gradient-to-br from-zinc-50 via-white to-zinc-100 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 group cursor-pointer transition-all hover:shadow-red-500/20 hover:border-red-500/50"
            >
              {/* Animated Background Grid */}
              <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="premium-grid" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
                      <circle cx="25" cy="25" r="1" fill="currentColor"/>
                      <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#premium-grid)" />
                </svg>
              </div>

              {/* Decorative Circles */}
              <div className="absolute top-10 right-10 w-32 h-32 bg-red-500/5 rounded-full blur-3xl"></div>
              <div className="absolute bottom-10 left-10 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl"></div>

              {/* Premium Location Info Card */}
              <div className="absolute top-6 left-6 right-6 bg-white/95 dark:bg-zinc-800/95 backdrop-blur-xl rounded-2xl shadow-2xl p-5 border border-zinc-200/50 dark:border-zinc-700/50 transform group-hover:-translate-y-1 transition-transform">
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-br from-red-500 to-red-600 p-3 rounded-xl shadow-lg shrink-0">
                    <MapPin className="text-white" size={24} strokeWidth={2.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-black text-lg text-zinc-900 dark:text-white mb-2 tracking-tight">
                      ABT MEKATRONİK
                    </h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                      ELMALAR MAH. YENİ İSKAN KÜME EVLERİ<br />
                      NO: 79/6A DULKADİROĞLU / KAHRAMANMARAŞ
                    </p>
                  </div>
                </div>
              </div>

              {/* Hover Overlay with CTA - Mobilde her zaman görünür, altta konumlu */}
              <div className="absolute inset-x-0 bottom-0 md:inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/0 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 flex items-end md:items-center justify-center pb-6 md:pb-0">
                <div className="transform translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 transition-transform duration-300">
                  <div className="bg-white dark:bg-zinc-800 px-4 py-3 md:px-8 md:py-4 rounded-xl md:rounded-2xl shadow-2xl border-2 border-red-600 backdrop-blur-xl">
                    <div className="flex items-center gap-2 md:gap-3">
                      <div className="bg-red-600 p-1.5 md:p-2 rounded-lg">
                        <MapPin className="text-white" size={16} />
                      </div>
                      <span className="text-zinc-900 dark:text-white font-black text-sm md:text-lg tracking-tight">
                        {t('footer.openInMaps')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Corner Accent - Top Right Only */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-500/10 to-transparent rounded-bl-full"></div>
            </a>

            {/* CONTACT INFO */}
            <div className="flex flex-col justify-center space-y-6">
              <div>
                <h3 className="text-2xl font-black text-zinc-900 dark:text-white mb-4" dir={isRTL ? 'rtl' : 'ltr'}>
                  {t('footer.contactTitle')}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6" dir={isRTL ? 'rtl' : 'ltr'}>
                  {t('footer.contactSubtitle')}
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:border-red-500 dark:hover:border-red-500 transition-colors">
                  <MapPin className="text-red-600 dark:text-red-500 shrink-0 mt-1" size={24} />
                  <div>
                    <h4 className="font-bold text-zinc-900 dark:text-white mb-1">{t('footer.address')}</h4>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      ELMALAR MAH. YENİ İSKAN KÜME EVLERİ NO: 79/6A<br />
                      DULKADİROĞLU / KAHRAMANMARAŞ
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:border-red-500 dark:hover:border-red-500 transition-colors">
                  <Phone className="text-red-600 dark:text-red-500 shrink-0 mt-1" size={24} />
                  <div>
                    <h4 className="font-bold text-zinc-900 dark:text-white mb-1">{t('footer.phone')}</h4>
                    <a href="tel:+905373197281" className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-red-600 dark:hover:text-red-500 transition-colors">
                      0 537 319 72 81
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:border-red-500 dark:hover:border-red-500 transition-colors">
                  <Mail className="text-red-600 dark:text-red-500 shrink-0 mt-1" size={24} />
                  <div>
                    <h4 className="font-bold text-zinc-900 dark:text-white mb-1">{t('footer.email')}</h4>
                    <a href="mailto:info@abtmekatronik.com" className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-red-600 dark:hover:text-red-500 transition-colors">
                      info@abtmekatronik.com
                    </a>
                  </div>
                </div>
              </div>

              {/* WhatsApp CTA Button */}
              <a
                href="https://wa.me/905373197281?text=Merhaba,%20ABT%20Mekatronik%20hakkında%20bilgi%20almak%20istiyorum."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-black text-lg rounded-2xl transition-all shadow-2xl hover:shadow-green-500/50 hover:scale-105 transform"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                {t('footer.whatsappButton')}
              </a>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <h2 className="text-2xl font-black text-zinc-900 dark:text-white mb-6" dir={isRTL ? 'rtl' : 'ltr'}>ABT <span className="text-primary">MEKATRONİK</span></h2>
            <p className="text-sm leading-relaxed mb-6" dir={isRTL ? 'rtl' : 'ltr'}>
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <Linkedin size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <Facebook size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-zinc-900 dark:text-white font-bold uppercase tracking-wider mb-6" dir={isRTL ? 'rtl' : 'ltr'}>{t('footer.quickAccess')}</h3>
            <ul className="space-y-3 text-sm">
              {/* Hierarchical Navigation - Matches New Page Structure */}
              <li><a href="/" onClick={handleHomeClick} className="hover:text-primary transition-colors" dir={isRTL ? 'rtl' : 'ltr'}>{t('nav.home')}</a></li>
              <li><a href="/about" className="hover:text-primary transition-colors" dir={isRTL ? 'rtl' : 'ltr'}>{t('nav.about')}</a></li>
              <li><a href="/#products" onClick={(e) => handleSectionClick(e, 'products')} className="hover:text-primary transition-colors" dir={isRTL ? 'rtl' : 'ltr'}>{t('nav.products')}</a></li>
              <li><a href="/#engineering" onClick={(e) => handleSectionClick(e, 'engineering')} className="hover:text-primary transition-colors" dir={isRTL ? 'rtl' : 'ltr'}>{t('nav.engineering')}</a></li>
              <li><a href="/#projects" onClick={(e) => handleSectionClick(e, 'projects')} className="hover:text-primary transition-colors" dir={isRTL ? 'rtl' : 'ltr'}>{t('nav.projects')}</a></li>
              <li><a href="/#faq" onClick={(e) => handleSectionClick(e, 'faq')} className="hover:text-primary transition-colors" dir={isRTL ? 'rtl' : 'ltr'}>{t('nav.faq')}</a></li>
              <li><a href="/#testimonials" onClick={(e) => handleSectionClick(e, 'testimonials')} className="hover:text-primary transition-colors" dir={isRTL ? 'rtl' : 'ltr'}>{t('nav.testimonials')}</a></li>
              <li><a href="/#partners" onClick={(e) => handleSectionClick(e, 'partners')} className="hover:text-primary transition-colors" dir={isRTL ? 'rtl' : 'ltr'}>{t('nav.partners')}</a></li>
              <li><a href="/exports" className="hover:text-primary transition-colors" dir={isRTL ? 'rtl' : 'ltr'}>{t('nav.exports')}</a></li>
              <li><a href="/#contact" onClick={(e) => handleSectionClick(e, 'contact')} className="hover:text-primary transition-colors" dir={isRTL ? 'rtl' : 'ltr'}>{t('nav.contact')}</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-zinc-900 dark:text-white font-bold uppercase tracking-wider mb-6" dir={isRTL ? 'rtl' : 'ltr'}>{t('footer.productGroups')}</h3>
            <ul className="space-y-3 text-sm">
              {productLinks.map((product) => {
                const IconComponent = product.icon;
                return (
                  <li key={product.key}>
                    <a
                      href={`/products/${product.key}`}
                      className={`flex items-center hover:text-primary transition-colors gap-2 ${
                        isRTL ? 'flex-row-reverse text-right' : 'text-left'
                      }`}
                      dir={isRTL ? 'rtl' : 'ltr'}
                    >
                      {!isRTL && <IconComponent size={14} className="text-red-600 dark:text-red-500 shrink-0" />}
                      <span className="flex-1">{t(`productItems.${product.key}.title`)}</span>
                      {isRTL && <IconComponent size={14} className="text-red-600 dark:text-red-500 shrink-0" />}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-200 dark:border-zinc-800 pt-8 text-center text-xs uppercase tracking-widest font-medium">
          <p dir={isRTL ? 'rtl' : 'ltr'}>{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
});
