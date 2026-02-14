import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SkipLink } from "@/components/SkipLink";
import { Button } from "@/components/ui/button";
import { Settings, Cog, PenTool, ChevronRight, Truck, Factory, Wrench, Layers, Phone, Mail, MapPin, Shield, Award, CheckCircle } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { smoothScrollToElement } from "@/lib/scroll-utils";
import { OptimizedImage } from "@/components/OptimizedImage";
import { FAQ, Testimonials, ClientLogos, ComponentLoader } from "@/components/LazyComponents";
import { ImageLightbox } from "@/components/ImageLightbox";
import { Suspense, useEffect, useState } from "react";

export default function Home() {
  const { t, language } = useI18n();
  
  // Detect Edge browser
  const isEdge = /Edg/.test(navigator.userAgent);

  // Detect theme
  const [isDark, setIsDark] = useState(document.documentElement.classList.contains('dark'));
  
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  // Lightbox state
  const galleryImages = [
    "WhatsApp Image 2026-01-16 at 14.32.03 (3).jpeg",
    "WhatsApp Image 2026-01-16 at 14.32.03 (4).jpeg",
    "WhatsApp Image 2026-01-16 at 14.32.04 (1).jpeg",
    "WhatsApp Image 2026-01-16 at 14.32.04 (2).jpeg",
    "WhatsApp Image 2026-01-16 at 14.32.05 (1).jpeg",
    "WhatsApp Image 2026-01-16 at 14.32.05 (2).jpeg",
    "WhatsApp Image 2026-01-16 at 14.32.06 (2).jpeg",
    "WhatsApp Image 2026-01-16 at 14.32.06 (3).jpeg",
    "WhatsApp Image 2026-01-16 at 14.32.06 (4).jpeg",
    "WhatsApp Image 2026-01-16 at 14.32.07 (4).jpeg",
    "WhatsApp Image 2026-01-16 at 14.32.07 (5).jpeg",
    "WhatsApp Image 2026-01-16 at 14.32.08 (1).jpeg",
  ];
  
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);
  
  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  
  const previousImage = () => setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-200 selection:bg-red-900 selection:text-white overflow-x-hidden" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <SkipLink />
      <Navbar />

      {/* HERO SECTION */}
      <section 
        id="hero" 
        className="relative h-screen flex items-center justify-center overflow-hidden"
        aria-labelledby="hero-title"
      >
        <div className="absolute inset-0 z-0">
          {/* 
            EDGE BROWSER DETECTION:
            - Edge has strict autoplay policy that blocks video
            - Show static image for Edge users
            - Show video for other browsers (Chrome, Firefox, Safari, etc.)
          */}
          {isEdge ? (
            // Edge: Static hero image - full coverage, no white space
            <OptimizedImage 
              src="/media/img1.jpeg"
              alt="ABT Mekatronik üretim tesisi"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ 
                zIndex: 1,
                objectPosition: 'center 40%' // Slightly adjust vertical position
              }}
              loading="eager"
            />
          ) : (
            // Other browsers: Video with autoplay - full coverage, no white space
            <video 
              src="/media/video1.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ 
                zIndex: 1,
                objectPosition: 'center 40%' // Slightly adjust vertical position
              }}
              aria-label="ABT Mekatronik üretim tesisi video arka planı"
            />
          )}
          {/* Overlay - Light theme: medium dark, Dark theme: very dark */}
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/70 via-zinc-900/50 to-zinc-900/30 dark:from-zinc-900/90 dark:via-zinc-900/80 dark:to-zinc-900/60" style={{ zIndex: 2 }} aria-hidden="true" />
        </div>

        <div className="container mx-auto px-4 xs:px-3 sm:px-6 relative z-10 pt-28 sm:pt-32">
          <div className="max-w-4xl animate-in fade-in-left duration-800">
            {/* Badge - Mobilde gizle, tablet ve üstünde göster */}
            <div className="hidden sm:inline-block mb-3 px-2.5 py-1 bg-red-600/20 border border-red-600/50 text-red-500 font-bold text-xs tracking-widest uppercase rounded-sm backdrop-blur-sm">
              {t('hero.badge')}
            </div>
            {/* Başlık - Mobilde daha küçük, okunabilir boyut */}
            <h1 id="hero-title" className="text-2xl xs:text-xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white leading-tight xs:leading-tight sm:leading-[0.9] mb-4 xs:mb-3 sm:mb-8 tracking-tight xs:tracking-tight sm:tracking-tighter">
              {t('hero.title1')} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-400">{t('hero.title2')}</span> <br />
              <span className="text-red-500">{t('hero.title3')}</span> {t('hero.title4')}
            </h1>
            {/* Açıklama - Mobilde daha küçük font */}
            <p className="text-sm xs:text-xs sm:text-xl md:text-2xl text-gray-200 max-w-2xl mb-6 xs:mb-4 sm:mb-10 font-light leading-relaxed xs:leading-relaxed border-l-2 xs:border-l-2 sm:border-l-4 border-red-500 pl-3 xs:pl-2 sm:pl-6">
              {t('hero.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 xs:gap-2 sm:gap-4 w-full sm:w-auto" role="group" aria-label="Ana eylem butonları">
              <Button 
                size="lg" 
                className="w-full xs:w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-bold text-base xs:text-sm sm:text-lg px-6 xs:px-3 sm:px-8 py-5 xs:py-3 sm:py-6 rounded-none skew-x-[-10deg] border-2 border-red-600 hover:shadow-[0_0_30px_rgba(220,38,38,0.5)] transition-all"
                onClick={() => smoothScrollToElement('products')}
                aria-label="Çözümlerimizi keşfedin"
              >
                <span className="skew-x-[10deg]">{t('hero.solutions')}</span>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full xs:w-full sm:w-auto border-gray-300 text-white hover:bg-white/10 hover:text-white font-bold text-base xs:text-sm sm:text-lg px-6 xs:px-3 sm:px-8 py-5 xs:py-3 sm:py-6 rounded-none skew-x-[-10deg] backdrop-blur-sm"
                onClick={() => smoothScrollToElement('projects')}
                aria-label="Projelerimizi görüntüleyin"
              >
                <span className="skew-x-[10deg]">{t('hero.projects')}</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll indicator - Mobilde daha büyük ve görünür */}
        <div className="absolute bottom-4 xs:bottom-3 left-1/2 -translate-x-1/2 text-white/70 flex flex-col items-center gap-2 xs:gap-1 animate-bounce" aria-hidden="true">
          <span className="text-xs xs:text-[11px] sm:text-[10px] uppercase tracking-[0.3em] font-medium">{t('hero.scroll')}</span>
          <div className="w-[1px] h-12 xs:h-8 sm:h-12 bg-gradient-to-b from-red-600 to-transparent"></div>
        </div>
      </section>

      {/* PRODUCTS SECTION - 4 Ürün Grubu */}
      <section 
        id="products" 
        className="py-24 bg-zinc-50 dark:bg-zinc-900 relative"
        aria-labelledby="products-title"
      >
        <div className="container mx-auto px-4 xs:px-3 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 xs:mb-8 sm:mb-16 gap-4 xs:gap-3 sm:gap-6 animate-in fade-in duration-600">
            <div>
              <p className="text-red-600 dark:text-red-500 font-bold tracking-widest uppercase mb-2 xs:mb-1 text-xs xs:text-[10px]">{t('products.subtitle')}</p>
              <h2 id="products-title" className="text-3xl xs:text-2xl sm:text-4xl md:text-5xl font-black text-zinc-900 dark:text-white">{t('products.title')}</h2>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 max-w-md text-right md:text-left leading-relaxed text-sm xs:text-xs">
              {t('products.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 xs:gap-2 sm:gap-6" role="list" aria-label="Ürün kategorileri">
            {/* Konveyör Sistemleri */}
            <a 
              href="/products/konveyor"
              className="group relative h-[450px] xs:h-[350px] overflow-hidden bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-red-600/30 border-t-0 hover:border-t-4 hover:border-t-red-600 dark:hover:border-t-red-500 transition-all cursor-pointer shadow-lg dark:shadow-none animate-in slide-up duration-600"
              role="listitem"
              aria-label={`${t('productItems.konveyor.title')} - Detayları görüntülemek için tıklayın`}
            >
              <div className="absolute inset-0 bg-white/20 dark:bg-zinc-800/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
              <OptimizedImage 
                src={`/media/${encodeURIComponent("WhatsApp Image 2026-01-16 at 14.32.03.jpeg")}`}
                alt={t('productItems.konveyor.title')} 
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-50/60 to-transparent dark:from-zinc-900 dark:via-zinc-900/60 dark:to-transparent opacity-90 z-20" />
              
              <div className="absolute bottom-0 left-0 p-6 xs:p-4 z-30 w-full pointer-events-none">
                <div className="flex items-center gap-2 xs:gap-1 mb-3 xs:mb-2">
                  <Truck className="w-5 h-5 xs:w-4 xs:h-4 text-red-600 dark:text-red-500" />
                  <span className="text-xs xs:text-[10px] text-red-600 dark:text-red-400 uppercase tracking-wider font-semibold">{t('productItems.konveyor.subtitle')}</span>
                </div>
                <div className="w-10 xs:w-8 h-1 bg-red-600 mb-3 xs:mb-2 transition-all duration-300 group-hover:w-16"></div>
                <h3 className="text-xl xs:text-base font-bold text-zinc-900 dark:text-white mb-2 xs:mb-1 transition-colors">{t('productItems.konveyor.title')}</h3>
                <p className="text-zinc-700 dark:text-zinc-400 text-sm xs:text-xs mb-4 xs:mb-2 line-clamp-2 group-hover:text-zinc-900 dark:group-hover:text-zinc-200 transition-colors">{t('productItems.konveyor.shortDesc')}</p>
                <span className={`inline-flex items-center text-red-600 dark:text-red-500 font-semibold text-sm xs:text-xs uppercase tracking-wider group-hover:translate-x-2 transition-transform ${
                  language === 'ar' ? 'flex-row-reverse' : ''
                }`}>
                  {language === 'ar' && <ChevronRight className="mr-1 w-4 h-4 xs:w-3 xs:h-3 text-red-600 dark:text-red-500" aria-hidden="true" />}
                  {t('products.viewDetails')}
                  {language !== 'ar' && <ChevronRight className="ml-1 w-4 h-4 xs:w-3 xs:h-3 text-red-600 dark:text-red-500" aria-hidden="true" />}
                </span>
              </div>
            </a>

            {/* Tekstil Makinaları */}
            <a 
              href="/products/tekstil"
              className="group relative h-[450px] xs:h-[350px] overflow-hidden bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-red-600/30 border-t-0 hover:border-t-4 hover:border-t-red-600 dark:hover:border-t-red-500 transition-all cursor-pointer shadow-lg dark:shadow-none animate-in slide-up duration-600 delay-100"
              role="listitem"
              aria-label={`${t('productItems.tekstil.title')} - Detayları görüntülemek için tıklayın`}
            >
              <div className="absolute inset-0 bg-white/20 dark:bg-zinc-800/20 group-hover:bg-transparent transition-colors duration-500 z-10" aria-hidden="true" />
              <OptimizedImage 
                src={`/media/${encodeURIComponent("WhatsApp Image 2026-01-16 at 14.32.04 (3).jpeg")}`}
                alt={`${t('productItems.tekstil.title')} - ${t('productItems.tekstil.shortDesc')}`} 
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-50/60 to-transparent dark:from-zinc-900 dark:via-zinc-900/60 dark:to-transparent opacity-90 z-20" aria-hidden="true" />
              
              <div className="absolute bottom-0 left-0 p-6 xs:p-4 z-30 w-full pointer-events-none">
                <div className="flex items-center gap-2 xs:gap-1 mb-3 xs:mb-2">
                  <Factory className="w-5 h-5 xs:w-4 xs:h-4 text-red-600 dark:text-red-500" aria-hidden="true" />
                  <span className="text-xs xs:text-[10px] text-red-600 dark:text-red-400 uppercase tracking-wider font-semibold">{t('productItems.tekstil.subtitle')}</span>
                </div>
                <div className="w-10 xs:w-8 h-1 bg-red-600 mb-3 xs:mb-2 transition-all duration-300 group-hover:w-16" aria-hidden="true"></div>
                <h3 className="text-xl xs:text-base font-bold text-zinc-900 dark:text-white mb-2 xs:mb-1 group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors">{t('productItems.tekstil.title')}</h3>
                <p className="text-zinc-700 dark:text-zinc-400 text-sm xs:text-xs mb-4 xs:mb-2 line-clamp-2">{t('productItems.tekstil.shortDesc')}</p>
                <span className={`inline-flex items-center text-zinc-900 dark:text-white font-semibold text-sm xs:text-xs uppercase tracking-wider group-hover:translate-x-2 transition-transform ${
                  language === 'ar' ? 'flex-row-reverse' : ''
                }`}>
                  {language === 'ar' && <ChevronRight className="mr-1 w-4 h-4 xs:w-3 xs:h-3 text-red-600 dark:text-red-500" aria-hidden="true" />}
                  {t('products.viewDetails')}
                  {language !== 'ar' && <ChevronRight className="ml-1 w-4 h-4 xs:w-3 xs:h-3 text-red-600 dark:text-red-500" aria-hidden="true" />}
                </span>
              </div>
            </a>

            {/* Çelik Konstrüksiyon */}
            <a 
              href="/products/celik"
              className="group relative h-[450px] xs:h-[350px] overflow-hidden bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-red-600/30 border-t-0 hover:border-t-4 hover:border-t-red-600 dark:hover:border-t-red-500 transition-all cursor-pointer shadow-lg dark:shadow-none animate-in slide-up duration-600 delay-200"
              role="listitem"
              aria-label={`${t('productItems.celik.title')} - Detayları görüntülemek için tıklayın`}
            >
              <div className="absolute inset-0 bg-white/20 dark:bg-zinc-800/20 group-hover:bg-transparent transition-colors duration-500 z-10" aria-hidden="true" />
              <OptimizedImage 
                src={`/media/${encodeURIComponent("WhatsApp Image 2026-01-16 at 14.32.05 (3).jpeg")}`}
                alt={`${t('productItems.celik.title')} - ${t('productItems.celik.shortDesc')}`} 
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-50/60 to-transparent dark:from-zinc-900 dark:via-zinc-900/60 dark:to-transparent opacity-90 z-20" aria-hidden="true" />
              
              <div className="absolute bottom-0 left-0 p-6 xs:p-4 z-30 w-full pointer-events-none">
                <div className="flex items-center gap-2 xs:gap-1 mb-3 xs:mb-2">
                  <Layers className="w-5 h-5 xs:w-4 xs:h-4 text-red-600 dark:text-red-500" aria-hidden="true" />
                  <span className="text-xs xs:text-[10px] text-red-600 dark:text-red-400 uppercase tracking-wider font-semibold">{t('productItems.celik.subtitle')}</span>
                </div>
                <div className="w-10 xs:w-8 h-1 bg-red-600 mb-3 xs:mb-2 transition-all duration-300 group-hover:w-16" aria-hidden="true"></div>
                <h3 className="text-xl xs:text-base font-bold text-zinc-900 dark:text-white mb-2 xs:mb-1 group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors">{t('productItems.celik.title')}</h3>
                <p className="text-zinc-700 dark:text-zinc-400 text-sm xs:text-xs mb-4 xs:mb-2 line-clamp-2">{t('productItems.celik.shortDesc')}</p>
                <span className={`inline-flex items-center text-zinc-900 dark:text-white font-semibold text-sm xs:text-xs uppercase tracking-wider group-hover:translate-x-2 transition-transform ${
                  language === 'ar' ? 'flex-row-reverse' : ''
                }`}>
                  {language === 'ar' && <ChevronRight className="mr-1 w-4 h-4 xs:w-3 xs:h-3 text-red-600 dark:text-red-500" aria-hidden="true" />}
                  {t('products.viewDetails')}
                  {language !== 'ar' && <ChevronRight className="ml-1 w-4 h-4 xs:w-3 xs:h-3 text-red-600 dark:text-red-500" aria-hidden="true" />}
                </span>
              </div>
            </a>

            {/* Özel Makine Tasarımı */}
            <a 
              href="/products/ozelMakine"
              className="group relative h-[450px] xs:h-[350px] overflow-hidden bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-red-600/30 border-t-0 hover:border-t-4 hover:border-t-red-600 dark:hover:border-t-red-500 transition-all cursor-pointer shadow-lg dark:shadow-none animate-in slide-up duration-600 delay-300"
              role="listitem"
              aria-label={`${t('productItems.ozelMakine.title')} - Detayları görüntülemek için tıklayın`}
            >
              <div className="absolute inset-0 bg-white/20 dark:bg-zinc-800/20 group-hover:bg-transparent transition-colors duration-500 z-10" aria-hidden="true" />
              <OptimizedImage 
                src={`/media/${encodeURIComponent("WhatsApp Image 2026-01-16 at 14.32.06 (5).jpeg")}`}
                alt={`${t('productItems.ozelMakine.title')} - ${t('productItems.ozelMakine.shortDesc')}`} 
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-50/60 to-transparent dark:from-zinc-900 dark:via-zinc-900/60 dark:to-transparent opacity-90 z-20" aria-hidden="true" />
              
              <div className="absolute bottom-0 left-0 p-6 xs:p-4 z-30 w-full pointer-events-none">
                <div className="flex items-center gap-2 xs:gap-1 mb-3 xs:mb-2">
                  <Wrench className="w-5 h-5 xs:w-4 xs:h-4 text-red-600 dark:text-red-500" aria-hidden="true" />
                  <span className="text-xs xs:text-[10px] text-red-600 dark:text-red-400 uppercase tracking-wider font-semibold">{t('productItems.ozelMakine.subtitle')}</span>
                </div>
                <div className="w-10 xs:w-8 h-1 bg-red-600 mb-3 xs:mb-2 transition-all duration-300 group-hover:w-16" aria-hidden="true"></div>
                <h3 className="text-xl xs:text-base font-bold text-zinc-900 dark:text-white mb-2 xs:mb-1 group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors">{t('productItems.ozelMakine.title')}</h3>
                <p className="text-zinc-700 dark:text-zinc-400 text-sm xs:text-xs mb-4 xs:mb-2 line-clamp-2">{t('productItems.ozelMakine.shortDesc')}</p>
                <span className={`inline-flex items-center text-zinc-900 dark:text-white font-semibold text-sm xs:text-xs uppercase tracking-wider group-hover:translate-x-2 transition-transform ${
                  language === 'ar' ? 'flex-row-reverse' : ''
                }`}>
                  {language === 'ar' && <ChevronRight className="mr-1 w-4 h-4 xs:w-3 xs:h-3 text-red-600 dark:text-red-500" aria-hidden="true" />}
                  {t('products.viewDetails')}
                  {language !== 'ar' && <ChevronRight className="ml-1 w-4 h-4 xs:w-3 xs:h-3 text-red-600 dark:text-red-500" aria-hidden="true" />}
                </span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* EARLY CTA SECTION - Quick Contact */}
      <section className="py-12 xs:py-8 sm:py-16 bg-gradient-to-r from-red-600 to-red-700 dark:from-red-700 dark:to-red-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 xs:px-3 sm:px-6 text-center relative z-10">
          <h3 className="text-2xl xs:text-xl sm:text-3xl md:text-4xl font-black text-white mb-3 xs:mb-2 sm:mb-4 animate-in fade-in duration-600">
            {t('cta.quickContact.title')}
          </h3>
          <p className="text-white/90 text-sm xs:text-xs sm:text-base md:text-lg mb-6 xs:mb-4 sm:mb-8 max-w-2xl mx-auto leading-relaxed animate-in fade-in duration-600 delay-100">
            {t('cta.quickContact.description')}
          </p>
          <div className="flex gap-3 xs:gap-2 sm:gap-4 justify-center flex-wrap animate-in scale-in duration-600 delay-200">
            <Button 
              size="lg"
              className="bg-white text-red-600 hover:bg-zinc-100 font-bold text-sm xs:text-xs sm:text-base px-6 xs:px-3 sm:px-8 py-4 xs:py-3 sm:py-6 rounded-none skew-x-[-10deg] shadow-xl hover:shadow-2xl transition-all hover:scale-105"
              onClick={() => smoothScrollToElement('contact')}
              aria-label="Hemen teklif alın"
            >
              <span className="skew-x-[10deg] flex items-center gap-1.5 xs:gap-1">
                <Phone className="w-4 h-4 xs:w-3 xs:h-3" />
                {t('cta.getQuote')}
              </span>
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/10 font-bold text-sm xs:text-xs sm:text-base px-6 xs:px-3 sm:px-8 py-4 xs:py-3 sm:py-6 rounded-none skew-x-[-10deg] backdrop-blur-sm transition-all hover:scale-105"
              onClick={() => window.open('https://wa.me/905300594494', '_blank')}
              aria-label="WhatsApp ile iletişime geçin"
            >
              <span className="skew-x-[10deg] flex items-center gap-1.5 xs:gap-1">
                💬 {t('cta.whatsapp')}
              </span>
            </Button>
          </div>
        </div>
      </section>

      {/* ENGINEERING / ABOUT SECTION */}
      <section id="engineering" className="py-16 xs:py-12 sm:py-24 bg-zinc-50 dark:bg-zinc-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-zinc-200/30 dark:bg-zinc-700/20 skew-x-12 transform translate-x-20"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 border border-zinc-300 dark:border-zinc-600 rounded-full opacity-20 -translate-x-1/2 translate-y-1/2"></div>
        
        <div className="container mx-auto px-4 xs:px-3 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 xs:gap-6 sm:gap-16 items-center">
            <div className="animate-in fade-in duration-600">
              <h3 className="text-red-600 dark:text-red-500 font-bold tracking-widest uppercase mb-3 xs:mb-2 sm:mb-4 text-xs xs:text-[10px]">{t('engineering.subtitle')}</h3>
              <h2 className="text-3xl xs:text-xl sm:text-4xl md:text-5xl font-black text-zinc-900 dark:text-white mb-6 xs:mb-3 sm:mb-8">{t('engineering.title')} <br />{t('engineering.title2')}</h2>
              
              <div className="space-y-6 xs:space-y-3 sm:space-y-8">
                <div className="flex gap-3 xs:gap-2 sm:gap-4">
                  <div className="w-10 h-10 xs:w-8 xs:h-8 sm:w-12 sm:h-12 bg-red-600/10 border border-red-600/30 flex items-center justify-center shrink-0">
                    <Settings className="text-red-600 dark:text-red-500 w-5 h-5 xs:w-4 xs:h-4" />
                  </div>
                  <div>
                    <h4 className="text-lg xs:text-sm sm:text-xl font-bold text-zinc-900 dark:text-white mb-1.5 xs:mb-1">{t('engineering.customDesign')}</h4>
                    <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm xs:text-xs xs:leading-snug">
                      {t('engineering.customDesignDesc')}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 xs:gap-2 sm:gap-4">
                  <div className="w-10 h-10 xs:w-8 xs:h-8 sm:w-12 sm:h-12 bg-red-600/10 border border-red-600/30 flex items-center justify-center shrink-0">
                    <Cog className="text-red-600 dark:text-red-500 w-5 h-5 xs:w-4 xs:h-4" />
                  </div>
                  <div>
                    <h4 className="text-lg xs:text-sm sm:text-xl font-bold text-zinc-900 dark:text-white mb-1.5 xs:mb-1">{t('engineering.precision')}</h4>
                    <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm xs:text-xs xs:leading-snug">
                      {t('engineering.precisionDesc')}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 xs:gap-2 sm:gap-4">
                  <div className="w-10 h-10 xs:w-8 xs:h-8 sm:w-12 sm:h-12 bg-red-600/10 border border-red-600/30 flex items-center justify-center shrink-0">
                    <PenTool className="text-red-600 dark:text-red-500 w-5 h-5 xs:w-4 xs:h-4" />
                  </div>
                  <div>
                    <h4 className="text-lg xs:text-sm sm:text-xl font-bold text-zinc-900 dark:text-white mb-1.5 xs:mb-1">{t('engineering.turnkey')}</h4>
                    <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm xs:text-xs xs:leading-snug">
                      {t('engineering.turnkeyDesc')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 xs:gap-2">
               <div className="space-y-3 xs:space-y-2 mt-8 xs:mt-4 animate-in scale-in duration-500">
                 <div className="bg-zinc-700 p-1.5 xs:p-1 rounded-lg border border-zinc-600">
                    <OptimizedImage src={`/media/${encodeURIComponent("WhatsApp Image 2026-01-16 at 14.32.07 (3).jpeg")}`} alt="Engineering Site" className="w-full h-40 xs:h-28 object-cover rounded shadow-lg opacity-80 hover:opacity-100 transition-opacity" loading="lazy" />
                 </div>
               </div>
               <div className="space-y-3 xs:space-y-2 animate-in scale-in duration-500 delay-200">
                 <div className="bg-zinc-700 p-1.5 xs:p-1 rounded-lg border border-zinc-600">
                    <OptimizedImage src={`/media/${encodeURIComponent("WhatsApp Image 2026-01-16 at 14.32.08.jpeg")}`} alt="Automation Detail" className="w-full h-56 xs:h-40 object-cover rounded shadow-lg opacity-80 hover:opacity-100 transition-opacity" loading="lazy" />
                 </div>
               </div>
            </div>
          </div>

          {/* TRUST INDICATORS - Certifications + Numbers Combined */}
          <div className="mt-16 xs:mt-10 sm:mt-20 pt-12 xs:pt-8 sm:pt-16 border-t border-zinc-300 dark:border-zinc-600">
            <div className="text-center mb-8 xs:mb-6 sm:mb-12 animate-in fade-in duration-600">
              <h3 className="text-red-600 dark:text-red-500 font-bold tracking-widest uppercase mb-2 xs:mb-1 text-xs xs:text-[10px]">{t('trust.subtitle')}</h3>
              <h2 className="text-2xl xs:text-xl sm:text-3xl md:text-4xl font-black text-zinc-900 dark:text-white">{t('trust.title')}</h2>
            </div>
            
            {/* Certifications - Top Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 xs:gap-2 sm:gap-6 mb-8 xs:mb-6 sm:mb-12 animate-in fade-in duration-600">
              <div className="flex flex-col items-center gap-1.5 xs:gap-1 sm:gap-2 group animate-in scale-in duration-500">
                <div className="w-20 h-20 xs:w-16 xs:h-16 sm:w-24 sm:h-24 dark:bg-zinc-700 dark:border-2 dark:border-zinc-600 rounded-2xl overflow-hidden flex items-center justify-center group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-red-600/20 transition-all p-3">
                  <OptimizedImage src={isDark ? "/certifications/iso.png?t=1737738100" : "/certifications/isoLight.png?t=1737739400"} alt="ISO 9001" className="w-full h-full object-contain" loading="lazy" />
                </div>
                <span className="text-[10px] xs:text-[9px] sm:text-xs text-zinc-600 dark:text-zinc-400 font-semibold group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors">ISO 9001</span>
              </div>
              <div className="flex flex-col items-center gap-1.5 xs:gap-1 sm:gap-2 group animate-in scale-in duration-500" style={{ animationDelay: '50ms' }}>
                <div className="w-20 h-20 xs:w-16 xs:h-16 sm:w-24 sm:h-24 dark:bg-zinc-700 dark:border-2 dark:border-zinc-600 rounded-2xl overflow-hidden flex items-center justify-center group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-red-600/20 transition-all p-1">
                  <OptimizedImage src={isDark ? "/certifications/tse.png?t=1737738100" : "/certifications/tseLight.png?t=1737739400"} alt="TSE" className="w-full h-full object-contain" loading="lazy" />
                </div>
                <span className="text-[10px] xs:text-[9px] sm:text-xs text-zinc-600 dark:text-zinc-400 font-semibold group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors">TSE</span>
              </div>
              <div className="flex flex-col items-center gap-1.5 xs:gap-1 sm:gap-2 group animate-in scale-in duration-500" style={{ animationDelay: '100ms' }}>
                <div className="w-20 h-20 xs:w-16 xs:h-16 sm:w-24 sm:h-24 dark:bg-zinc-700 dark:border-2 dark:border-zinc-600 rounded-2xl overflow-hidden flex items-center justify-center group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-red-600/20 transition-all p-3 pt-5">
                  <OptimizedImage src={isDark ? "/certifications/ce.png?t=1737738100" : "/certifications/ceLight.png?t=1737739300"} alt="CE" className="w-full h-full object-contain" loading="lazy" />
                </div>
                <span className="text-[10px] xs:text-[9px] sm:text-xs text-zinc-600 dark:text-zinc-400 font-semibold group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors">CE</span>
              </div>
              <div className="flex flex-col items-center gap-1.5 xs:gap-1 sm:gap-2 group animate-in scale-in duration-500" style={{ animationDelay: '150ms' }}>
                <div className="w-20 h-20 xs:w-16 xs:h-16 sm:w-24 sm:h-24 dark:bg-zinc-700 dark:border-2 dark:border-zinc-600 rounded-2xl overflow-hidden flex items-center justify-center group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-red-600/20 transition-all p-1">
                  <OptimizedImage src={isDark ? "/certifications/guaranteed.png?t=1737738100" : "/certifications/guaranteedLight.png?t=1737739500"} alt="Quality" className="w-full h-full object-contain" loading="lazy" />
                </div>
                <span className="text-[10px] xs:text-[9px] sm:text-xs text-zinc-600 dark:text-zinc-400 font-semibold group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors">{t('certifications.quality')}</span>
              </div>
            </div>

            {/* Numbers - Bottom Row */}
            <div className="grid grid-cols-3 gap-6 xs:gap-3 sm:gap-8 animate-in fade-in duration-600" style={{ animationDelay: '200ms' }}>
              <div className="text-center group">
                <div className="text-4xl xs:text-3xl sm:text-5xl font-black text-red-600 dark:text-red-500 mb-1.5 xs:mb-1 sm:mb-2 group-hover:scale-110 transition-transform">15+</div>
                <div className="text-xs xs:text-[10px] sm:text-sm text-zinc-600 dark:text-zinc-400 uppercase tracking-wider font-semibold">{t('trust.years')}</div>
              </div>
              <div className="text-center group">
                <div className="text-4xl xs:text-3xl sm:text-5xl font-black text-red-600 dark:text-red-500 mb-1.5 xs:mb-1 sm:mb-2 group-hover:scale-110 transition-transform">200+</div>
                <div className="text-xs xs:text-[10px] sm:text-sm text-zinc-600 dark:text-zinc-400 uppercase tracking-wider font-semibold">{t('trust.projects')}</div>
              </div>
              <div className="text-center group">
                <div className="text-4xl xs:text-3xl sm:text-5xl font-black text-red-600 dark:text-red-500 mb-1.5 xs:mb-1 sm:mb-2 group-hover:scale-110 transition-transform">50+</div>
                <div className="text-xs xs:text-[10px] sm:text-sm text-zinc-600 dark:text-zinc-400 uppercase tracking-wider font-semibold">{t('trust.clients')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS / GALLERY SECTION */}
      <section id="projects" className="py-16 xs:py-12 sm:py-24 bg-white dark:bg-zinc-900">
        <div className="container mx-auto px-4 xs:px-3 sm:px-6">
          <div className="text-center mb-12 xs:mb-8 sm:mb-16 animate-in fade-in duration-600">
            <h3 className="text-red-600 dark:text-red-500 font-bold tracking-widest uppercase mb-2 xs:mb-1 text-xs xs:text-[10px]">{t('projectsSection.subtitle')}</h3>
            <h2 className="text-3xl xs:text-2xl sm:text-4xl md:text-5xl font-black text-zinc-900 dark:text-white">{t('projectsSection.title')}</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 xs:gap-1.5">
            {galleryImages.map((img, index) => (
              <button
                key={img}
                onClick={() => openLightbox(index)}
                className="group relative aspect-square overflow-hidden bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-lg dark:shadow-none animate-in scale-in duration-500 cursor-pointer"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <OptimizedImage 
                  src={`/media/${encodeURIComponent(img)}`}
                  alt={`ABT Mekatronik Proje ${index + 1}`}
                  loading={index < 4 ? "eager" : "lazy"}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0"
                  aspectRatio="1/1"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent dark:from-zinc-900/60 dark:via-transparent dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            ))}
          </div>

          {/* Lightbox */}
          {lightboxOpen && (
            <ImageLightbox
              images={galleryImages}
              currentIndex={currentImageIndex}
              onClose={closeLightbox}
              onNext={nextImage}
              onPrevious={previousImage}
            />
          )}

          {/* Video Showcase - TEMPORARILY DISABLED FOR TESTING */}
          {/* 
          <div className="mt-16 xs:mt-8 animate-in fade-in duration-600">
            <h3 className="text-2xl xs:text-xl font-bold text-zinc-900 dark:text-white mb-8 xs:mb-4 text-center">{t('projectsSection.videoGallery')}</h3>
            <div className="grid md:grid-cols-2 gap-6 xs:gap-3">
              {[
                "WhatsApp Video 2026-01-16 at 14.32.04.mp4",
                "WhatsApp Video 2026-01-16 at 14.32.05.mp4",
                "WhatsApp Video 2026-01-16 at 14.32.07.mp4",
                "WhatsApp Video 2026-01-16 at 14.32.08.mp4",
              ].map((video, idx) => (
                <div key={video} className="relative aspect-video bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg overflow-hidden group shadow-lg dark:shadow-none">
                  <OptimizedVideo 
                    src={`/media/${encodeURIComponent(video)}`}
                    poster={`/media/${encodeURIComponent(`WhatsApp Image 2026-01-16 at 14.32.0${4 + idx}.jpeg`)}`}
                    className="w-full h-full"
                    controls
                    muted
                    aria-label={`ABT Mekatronik proje videosu ${idx + 1}`}
                  />
                </div>
              ))}
            </div>
          </div>
          */}
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq">
        <Suspense fallback={<ComponentLoader />}>
          <FAQ />
        </Suspense>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section id="testimonials">
        <Suspense fallback={<ComponentLoader />}>
          <Testimonials />
        </Suspense>
      </section>

      {/* CLIENT LOGOS / PARTNERS SECTION */}
      <section id="partners" className="scroll-mt-24">
        <Suspense fallback={<ComponentLoader />}>
          <ClientLogos />
        </Suspense>
      </section>

      <Footer />
    </div>
  );
}
