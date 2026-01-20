import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SkipLink } from "@/components/SkipLink";
import { Button } from "@/components/ui/button";
import { Settings, Cog, PenTool, ChevronRight, Truck, Factory, Wrench, Layers, Phone, Mail, MapPin, Shield, Award, CheckCircle } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { OptimizedImage } from "@/components/OptimizedImage";
import { FAQ, Testimonials, ClientLogos, ComponentLoader } from "@/components/LazyComponents";
import { Suspense } from "react";

export default function Home() {
  const { t, language } = useI18n();
  
  // Detect Edge browser
  const isEdge = /Edg/.test(navigator.userAgent);

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

        <div className="container mx-auto px-6 relative z-10 pt-20">
          <div className="max-w-4xl animate-in fade-in-left duration-800">
            <div className="inline-block mb-4 px-3 py-1 bg-red-600/20 border border-red-600/50 text-red-500 font-bold text-xs tracking-widest uppercase rounded-sm backdrop-blur-sm">
              {t('hero.badge')}
            </div>
            <h1 id="hero-title" className="text-3xl xs:text-2xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] mb-6 xs:mb-4 sm:mb-8 tracking-tighter">
              {t('hero.title1')} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-400">{t('hero.title2')}</span> <br />
              <span className="text-red-500">{t('hero.title3')}</span> {t('hero.title4')}
            </h1>
            <p className="text-base xs:text-sm sm:text-xl md:text-2xl text-gray-200 max-w-2xl mb-8 xs:mb-6 sm:mb-10 font-light leading-relaxed border-l-4 border-red-500 pl-4 xs:pl-3 sm:pl-6">
              {t('hero.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-4 w-full sm:w-auto" role="group" aria-label="Ana eylem butonları">
              <Button 
                size="lg" 
                className="w-full xs:w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-bold text-base xs:text-sm sm:text-lg px-6 xs:px-4 sm:px-8 py-5 xs:py-4 sm:py-6 rounded-none skew-x-[-10deg] border-2 border-red-600 hover:shadow-[0_0_30px_rgba(220,38,38,0.5)] transition-all"
                onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                aria-label="Çözümlerimizi keşfedin"
              >
                <span className="skew-x-[10deg]">{t('hero.solutions')}</span>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full xs:w-full sm:w-auto border-gray-300 text-white hover:bg-white/10 hover:text-white font-bold text-base xs:text-sm sm:text-lg px-6 xs:px-4 sm:px-8 py-5 xs:py-4 sm:py-6 rounded-none skew-x-[-10deg] backdrop-blur-sm"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                aria-label="Projelerimizi görüntüleyin"
              >
                <span className="skew-x-[10deg]">{t('hero.projects')}</span>
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/70 flex flex-col items-center gap-2 animate-bounce" aria-hidden="true">
          <span className="text-[10px] uppercase tracking-[0.3em]">{t('hero.scroll')}</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-red-600 to-transparent"></div>
        </div>
      </section>

      {/* PRODUCTS SECTION - 4 Ürün Grubu */}
      <section 
        id="products" 
        className="py-24 bg-zinc-50 dark:bg-zinc-900 relative"
        aria-labelledby="products-title"
      >
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 animate-in fade-in duration-600">
            <div>
              <p className="text-red-600 dark:text-red-500 font-bold tracking-widest uppercase mb-2">{t('products.subtitle')}</p>
              <h2 id="products-title" className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white">{t('products.title')}</h2>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 max-w-md text-right md:text-left leading-relaxed">
              {t('products.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xs:gap-3" role="list" aria-label="Ürün kategorileri">
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
                <h3 className="text-xl xs:text-base font-bold text-zinc-900 dark:text-white mb-2 xs:mb-1 group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors">{t('productItems.konveyor.title')}</h3>
                <p className="text-zinc-700 dark:text-zinc-400 text-sm xs:text-xs mb-4 xs:mb-2 line-clamp-2">{t('productItems.konveyor.shortDesc')}</p>
                <span className="inline-flex items-center text-zinc-900 dark:text-white font-semibold text-sm xs:text-xs uppercase tracking-wider group-hover:translate-x-2 transition-transform">
                  {t('products.viewDetails')} <ChevronRight className="ml-1 w-4 h-4 xs:w-3 xs:h-3 text-red-600 dark:text-red-500" />
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
                <span className="inline-flex items-center text-zinc-900 dark:text-white font-semibold text-sm xs:text-xs uppercase tracking-wider group-hover:translate-x-2 transition-transform">
                  {t('products.viewDetails')} <ChevronRight className="ml-1 w-4 h-4 xs:w-3 xs:h-3 text-red-600 dark:text-red-500" aria-hidden="true" />
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
                <span className="inline-flex items-center text-zinc-900 dark:text-white font-semibold text-sm xs:text-xs uppercase tracking-wider group-hover:translate-x-2 transition-transform">
                  {t('products.viewDetails')} <ChevronRight className="ml-1 w-4 h-4 xs:w-3 xs:h-3 text-red-600 dark:text-red-500" aria-hidden="true" />
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
                <span className="inline-flex items-center text-zinc-900 dark:text-white font-semibold text-sm xs:text-xs uppercase tracking-wider group-hover:translate-x-2 transition-transform">
                  {t('products.viewDetails')} <ChevronRight className="ml-1 w-4 h-4 xs:w-3 xs:h-3 text-red-600 dark:text-red-500" aria-hidden="true" />
                </span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* EARLY CTA SECTION - Quick Contact */}
      <section className="py-16 bg-gradient-to-r from-red-600 to-red-700 dark:from-red-700 dark:to-red-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h3 className="text-3xl xs:text-2xl md:text-4xl font-black text-white mb-4 animate-in fade-in duration-600">
            {t('cta.quickContact.title')}
          </h3>
          <p className="text-white/90 text-base xs:text-sm md:text-lg mb-8 max-w-2xl mx-auto leading-relaxed animate-in fade-in duration-600 delay-100">
            {t('cta.quickContact.description')}
          </p>
          <div className="flex gap-4 xs:gap-3 justify-center flex-wrap animate-in scale-in duration-600 delay-200">
            <Button 
              size="lg"
              className="bg-white text-red-600 hover:bg-zinc-100 font-bold text-base xs:text-sm px-8 xs:px-4 py-6 xs:py-4 rounded-none skew-x-[-10deg] shadow-xl hover:shadow-2xl transition-all hover:scale-105"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              aria-label="Hemen teklif alın"
            >
              <span className="skew-x-[10deg] flex items-center gap-2 xs:gap-1.5">
                <Phone className="w-5 h-5 xs:w-4 xs:h-4" />
                {t('cta.getQuote')}
              </span>
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/10 font-bold text-base xs:text-sm px-8 xs:px-4 py-6 xs:py-4 rounded-none skew-x-[-10deg] backdrop-blur-sm transition-all hover:scale-105"
              onClick={() => window.open('https://wa.me/905300594494', '_blank')}
              aria-label="WhatsApp ile iletişime geçin"
            >
              <span className="skew-x-[10deg] flex items-center gap-2">
                💬 {t('cta.whatsapp')}
              </span>
            </Button>
          </div>
        </div>
      </section>

      {/* ENGINEERING / ABOUT SECTION */}
      <section id="engineering" className="py-24 bg-zinc-50 dark:bg-zinc-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-zinc-200/30 dark:bg-zinc-700/20 skew-x-12 transform translate-x-20"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 border border-zinc-300 dark:border-zinc-600 rounded-full opacity-20 -translate-x-1/2 translate-y-1/2"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 xs:gap-8 items-center">
            <div className="animate-in fade-in duration-600">
              <h3 className="text-red-600 dark:text-red-500 font-bold tracking-widest uppercase mb-4">{t('engineering.subtitle')}</h3>
              <h2 className="text-4xl xs:text-2xl md:text-5xl font-black text-zinc-900 dark:text-white mb-8 xs:mb-4">{t('engineering.title')} <br />{t('engineering.title2')}</h2>
              
              <div className="space-y-8 xs:space-y-4">
                <div className="flex gap-4 xs:gap-2">
                  <div className="w-12 h-12 xs:w-10 xs:h-10 bg-red-600/10 border border-red-600/30 flex items-center justify-center shrink-0">
                    <Settings className="text-red-600 dark:text-red-500 xs:w-5 xs:h-5" />
                  </div>
                  <div>
                    <h4 className="text-xl xs:text-base font-bold text-zinc-900 dark:text-white mb-2 xs:mb-1">{t('engineering.customDesign')}</h4>
                    <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed xs:text-sm xs:leading-snug">
                      {t('engineering.customDesignDesc')}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 xs:gap-2">
                  <div className="w-12 h-12 xs:w-10 xs:h-10 bg-red-600/10 border border-red-600/30 flex items-center justify-center shrink-0">
                    <Cog className="text-red-600 dark:text-red-500 xs:w-5 xs:h-5" />
                  </div>
                  <div>
                    <h4 className="text-xl xs:text-base font-bold text-zinc-900 dark:text-white mb-2 xs:mb-1">{t('engineering.precision')}</h4>
                    <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed xs:text-sm xs:leading-snug">
                      {t('engineering.precisionDesc')}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 xs:gap-2">
                  <div className="w-12 h-12 xs:w-10 xs:h-10 bg-red-600/10 border border-red-600/30 flex items-center justify-center shrink-0">
                    <PenTool className="text-red-600 dark:text-red-500 xs:w-5 xs:h-5" />
                  </div>
                  <div>
                    <h4 className="text-xl xs:text-base font-bold text-zinc-900 dark:text-white mb-2 xs:mb-1">{t('engineering.turnkey')}</h4>
                    <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed xs:text-sm xs:leading-snug">
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
          <div className="mt-20 pt-16 border-t border-zinc-300 dark:border-zinc-600">
            <div className="text-center mb-12 animate-in fade-in duration-600">
              <h3 className="text-red-600 dark:text-red-500 font-bold tracking-widest uppercase mb-2">{t('trust.subtitle')}</h3>
              <h2 className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-white">{t('trust.title')}</h2>
            </div>
            
            {/* Certifications - Top Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 xs:gap-4 mb-12 animate-in fade-in duration-600">
              <div className="flex flex-col items-center gap-2 group animate-in scale-in duration-500">
                <div className="w-24 h-24 xs:w-20 xs:h-20 bg-white dark:bg-zinc-700 border-2 border-zinc-200 dark:border-zinc-600 rounded-lg flex items-center justify-center group-hover:border-red-600 dark:group-hover:border-red-500 group-hover:shadow-xl group-hover:shadow-red-600/20 transition-all p-2">
                  <OptimizedImage src="/certifications/iso9001.webp" alt="ISO 9001" className="w-full h-full object-contain" loading="lazy" />
                </div>
                <span className="text-xs text-zinc-600 dark:text-zinc-400 font-semibold group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors">ISO 9001</span>
              </div>
              <div className="flex flex-col items-center gap-2 group animate-in scale-in duration-500" style={{ animationDelay: '50ms' }}>
                <div className="w-24 h-24 xs:w-20 xs:h-20 bg-white dark:bg-zinc-700 border-2 border-zinc-200 dark:border-zinc-600 rounded-lg flex items-center justify-center group-hover:border-red-600 dark:group-hover:border-red-500 group-hover:shadow-xl group-hover:shadow-red-600/20 transition-all p-2">
                  <OptimizedImage src="/certifications/tse.webp" alt="TSE" className="w-full h-full object-contain" loading="lazy" />
                </div>
                <span className="text-xs text-zinc-600 dark:text-zinc-400 font-semibold group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors">TSE</span>
              </div>
              <div className="flex flex-col items-center gap-2 group animate-in scale-in duration-500" style={{ animationDelay: '100ms' }}>
                <div className="w-24 h-24 xs:w-20 xs:h-20 bg-white dark:bg-zinc-700 border-2 border-zinc-200 dark:border-zinc-600 rounded-lg flex items-center justify-center group-hover:border-red-600 dark:group-hover:border-red-500 group-hover:shadow-xl group-hover:shadow-red-600/20 transition-all p-2">
                  <OptimizedImage src="/certifications/ce.webp" alt="CE" className="w-full h-full object-contain" loading="lazy" />
                </div>
                <span className="text-xs text-zinc-600 dark:text-zinc-400 font-semibold group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors">CE</span>
              </div>
              <div className="flex flex-col items-center gap-2 group animate-in scale-in duration-500" style={{ animationDelay: '150ms' }}>
                <div className="w-24 h-24 xs:w-20 xs:h-20 bg-white dark:bg-zinc-700 border-2 border-zinc-200 dark:border-zinc-600 rounded-lg flex items-center justify-center group-hover:border-red-600 dark:group-hover:border-red-500 group-hover:shadow-xl group-hover:shadow-red-600/20 transition-all p-2">
                  <OptimizedImage src="/certifications/golden.webp" alt="Quality" className="w-full h-full object-contain" loading="lazy" />
                </div>
                <span className="text-xs text-zinc-600 dark:text-zinc-400 font-semibold group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors">{t('certifications.quality')}</span>
              </div>
            </div>

            {/* Numbers - Bottom Row */}
            <div className="grid grid-cols-3 gap-8 xs:gap-4 animate-in fade-in duration-600" style={{ animationDelay: '200ms' }}>
              <div className="text-center group">
                <div className="text-5xl xs:text-4xl font-black text-red-600 dark:text-red-500 mb-2 group-hover:scale-110 transition-transform">15+</div>
                <div className="text-sm xs:text-xs text-zinc-600 dark:text-zinc-400 uppercase tracking-wider font-semibold">{t('trust.years')}</div>
              </div>
              <div className="text-center group">
                <div className="text-5xl xs:text-4xl font-black text-red-600 dark:text-red-500 mb-2 group-hover:scale-110 transition-transform">200+</div>
                <div className="text-sm xs:text-xs text-zinc-600 dark:text-zinc-400 uppercase tracking-wider font-semibold">{t('trust.projects')}</div>
              </div>
              <div className="text-center group">
                <div className="text-5xl xs:text-4xl font-black text-red-600 dark:text-red-500 mb-2 group-hover:scale-110 transition-transform">50+</div>
                <div className="text-sm xs:text-xs text-zinc-600 dark:text-zinc-400 uppercase tracking-wider font-semibold">{t('trust.clients')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS / GALLERY SECTION */}
      <section id="projects" className="py-24 bg-white dark:bg-zinc-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-in fade-in duration-600">
            <h3 className="text-red-600 dark:text-red-500 font-bold tracking-widest uppercase mb-2">{t('projectsSection.subtitle')}</h3>
            <h2 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white">{t('projectsSection.title')}</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 xs:gap-1.5">
            {[
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
            ].map((img, index) => (
              <div
                key={img}
                className="group relative aspect-square overflow-hidden bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-lg dark:shadow-none animate-in scale-in duration-500"
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
              </div>
            ))}
          </div>

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
