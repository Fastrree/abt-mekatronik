import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SkipLink } from "@/components/SkipLink";
import { OptimizedImage } from "@/components/OptimizedImage";
import { smoothScrollToElement } from "@/lib/scroll-utils";
import { Globe, TrendingUp, Award, Package, Ship, CheckCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/lib/i18n";

// Twemoji type declaration
declare global {
  interface Window {
    twemoji?: {
      parse: (node: HTMLElement | Document, options?: { folder?: string; ext?: string }) => void;
    };
  }
}

function OurExports() {
  const { language, t } = useI18n();
  
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const [hoveredCountry, setHoveredCountry] = useState<{ code: string; x: number; y: number } | null>(null);
  const [showTurkeyPulse, setShowTurkeyPulse] = useState(true);
  const [isMapHovered, setIsMapHovered] = useState(false);
  const [isZooming, setIsZooming] = useState(false);

  // Parse emojis on component mount and when hoveredCountry changes
  useEffect(() => {
    const parseEmojis = () => {
      if (typeof window.twemoji !== 'undefined') {
        // Parse all emoji containers
        const emojiContainers = document.querySelectorAll('.emoji-container');
        emojiContainers.forEach(container => {
          if (container) {
            window.twemoji?.parse(container as HTMLElement, {
              folder: 'svg',
              ext: '.svg',
              base: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/'
            });
          }
        });
      }
    };

    // Initial parse
    parseEmojis();

    // Re-parse after a short delay (for dynamic content)
    const timer = setTimeout(parseEmojis, 200);

    return () => clearTimeout(timer);
  }, [hoveredCountry]); // Re-parse when hovered country changes

  const exportCountryCodes = [
    "TR", // Türkiye
    "UZ", // Özbekistan
    "EG", // Mısır
    "TJ", // Tacikistan
    "KZ", // Kazakistan
    "TM"  // Türkmenistan
  ];

  // Country names with flags - using emoji-container class for Twemoji parsing
  const countryNames: { [key: string]: { flag: string; name: string } } = {
    TR: { flag: "🇹🇷", name: "TÜRKİYE" },
    UZ: { flag: "🇺🇿", name: "ÖZBEKİSTAN" },
    EG: { flag: "🇪🇬", name: "MISIR" },
    TJ: { flag: "🇹🇯", name: "TACİKİSTAN" },
    KZ: { flag: "🇰🇿", name: "KAZAKİSTAN" },
    TM: { flag: "🇹🇲", name: "TÜRKMENİSTAN" }
  };

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    const isMobile = window.innerWidth < 640;
    let isCancelled = false; // Cancellation token

    const loadMap = async () => {
      try {
        // DOM'un tamamen hazır olmasını bekle
        await new Promise(resolve => {
          if (document.readyState === 'complete') {
            resolve(true);
          } else {
            window.addEventListener('load', () => resolve(true), { once: true });
          }
        });

        // Component unmount olduysa işlemi durdur
        if (isCancelled) return;

        // Ekstra gecikme - mobile için daha uzun
        await new Promise(resolve => setTimeout(resolve, isMobile ? 800 : 200));

        // Component unmount olduysa işlemi durdur
        if (isCancelled) return;

        // DOM element kontrolü - birden fazla kez dene
        let mapElement = document.getElementById('world-map');
        let attempts = 0;
        while (!mapElement && attempts < 5 && !isCancelled) {
          await new Promise(resolve => setTimeout(resolve, 200));
          mapElement = document.getElementById('world-map');
          attempts++;
        }

        // Component unmount olduysa işlemi durdur
        if (isCancelled || !mapElement) {
          if (!isCancelled) {
            console.error('Map element not found after multiple attempts');
          }
          return;
        }

        // jsVectorMap kütüphanesini yükle
        const jsVectorMap = (await import("jsvectormap")).default;
        await import("jsvectormap/dist/maps/world.js");

        // Component unmount olduysa işlemi durdur
        if (isCancelled) return;

        if (!jsVectorMap) {
          console.error('jsVectorMap library not loaded');
          return;
        }

        // Mobile'da basitleştirilmiş config
        const mapConfig: any = {
          selector: "#world-map",
          map: "world",
          zoomButtons: !isMobile, // Mobile'da zoom butonları kapalı
          zoomOnScroll: false,
          zoomMax: 12,
          zoomMin: 1,
          regionStyle: {
            initial: { 
              fill: "#d1d5db", 
              stroke: "#ffffff", 
              strokeWidth: 1, 
              fillOpacity: 1 
            },
            hover: { 
              fill: "#b8bcc2", 
              stroke: "#ffffff", 
              strokeWidth: 1, 
              cursor: "pointer" 
            },
            selected: { 
              fill: "#ef4444", 
              stroke: "#ffffff", 
              strokeWidth: 1 
            },
            selectedHover: {
              fill: "#dc2626",
              stroke: "#ffffff",
              strokeWidth: 1,
              cursor: "pointer"
            }
          },
          selectedRegions: ["TR", "UZ", "EG", "TJ", "KZ", "TM"],
          visualizeData: {
            scale: ["#d1d5db", "#ef4444"],
            values: {
              "TR": 1,
              "UZ": 1,
              "EG": 1,
              "TJ": 1,
              "KZ": 1,
              "TM": 1
            }
          }
        };

        // Desktop-only event handlers
        if (!isMobile) {
          mapConfig.onViewportChange = function() {
            if (!isCancelled) {
              setShowTurkeyPulse(false);
              setIsZooming(true);
              setTimeout(() => {
                if (!isCancelled) setIsZooming(false);
              }, 300);
            }
          };

          mapConfig.onRegionTooltipShow = function(event: any, tooltip: any, code: string) {
            event.preventDefault();
          };

          mapConfig.onRegionOver = function(event: any, code: string) {
            if (!isCancelled && exportCountryCodes.includes(code)) {
              const rect = mapRef.current?.getBoundingClientRect();
              if (rect) {
                setHoveredCountry({
                  code,
                  x: event.clientX - rect.left,
                  y: event.clientY - rect.top
                });
              }
            }
          };

          mapConfig.onRegionOut = function(event: any, code: string) {
            if (!isCancelled) {
              setHoveredCountry(null);
            }
          };

          mapConfig.onLoaded = function(map: any) {
            if (isCancelled) return;

            setTimeout(() => {
              if (!isCancelled) setShowTurkeyPulse(false);
            }, 5000);

            setTimeout(() => {
              if (isCancelled) return;

              const exportCodes = ["TR", "UZ", "EG", "TJ", "KZ", "TM"];
              exportCodes.forEach(code => {
                try {
                  const region = map.regions[code];
                  if (region && region.element && region.element.shape) {
                    region.element.shape.node.setAttribute('fill', '#ef4444');
                    
                    region.element.shape.node.addEventListener('mouseenter', (e: MouseEvent) => {
                      if (isCancelled) return;
                      const rect = mapRef.current?.getBoundingClientRect();
                      if (rect) {
                        setHoveredCountry({
                          code,
                          x: e.clientX - rect.left,
                          y: e.clientY - rect.top
                        });
                      }
                    });
                    
                    region.element.shape.node.addEventListener('mouseleave', () => {
                      if (!isCancelled) setHoveredCountry(null);
                    });
                    
                    region.element.shape.node.addEventListener('mousemove', (e: MouseEvent) => {
                      if (isCancelled) return;
                      const rect = mapRef.current?.getBoundingClientRect();
                      if (rect) {
                        setHoveredCountry({
                          code,
                          x: e.clientX - rect.left,
                          y: e.clientY - rect.top
                        });
                      }
                    });
                  }
                } catch (error) {
                  console.error(`Error setting up ${code}:`, error);
                }
              });
            }, 100);
          };
        }

        // Component unmount olduysa haritayı oluşturma
        if (isCancelled) return;

        // Haritayı oluştur
        mapInstance.current = new jsVectorMap(mapConfig);
      } catch (error) {
        console.error("jsVectorMap error:", error);
      }
    };

    loadMap();

    return () => {
      // Cancellation token'ı aktif et - tüm async işlemleri durdur
      isCancelled = true;

      // Cleanup: Harita instance'ını tamamen temizle
      if (mapInstance.current) {
        try {
          // Önce destroy et
          if (typeof mapInstance.current.destroy === 'function') {
            mapInstance.current.destroy();
          }
          
          // Referansı temizle
          mapInstance.current = null;
          
          // DOM'dan harita elementini temizle
          const mapElement = document.getElementById('world-map');
          if (mapElement) {
            mapElement.innerHTML = '';
          }
          
          // State'leri sıfırla
          setHoveredCountry(null);
          setShowTurkeyPulse(false);
          setIsMapHovered(false);
          setIsZooming(false);
        } catch (error) {
          console.error('Map cleanup error:', error);
        }
      }
    };
  }, []);

  // Klavye kontrolleri - sadece mouse harita üzerindeyken
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isMapHovered || !mapInstance.current) return;

      console.log('Key pressed:', e.key, 'Code:', e.code, 'KeyCode:', e.keyCode); // Debug için

      const map = mapInstance.current;
      const panStep = 50; // Kaydırma adımı (pixel)
      
      let handled = false;

      // Mevcut viewport pozisyonunu al
      const currentX = map.transX || 0;
      const currentY = map.transY || 0;
      const currentScale = map.scale || 1;

      // e.code ile de kontrol et (klavye bağımsız)
      const keyCode = e.code;
      const key = e.key;

      // Zoom için özel kontrol (e.code kullanarak)
      if (keyCode === 'NumpadAdd' || keyCode === 'Equal' || key === '+' || key === '=') {
        e.preventDefault();
        // Zoom butonunu programatik olarak tetikle
        const zoomInBtn = document.querySelector('.jvm-zoom-btn.jvm-zoomin');
        if (zoomInBtn) {
          (zoomInBtn as HTMLElement).click();
          console.log('Zoom IN button clicked');
          setShowTurkeyPulse(false);
        }
        return;
      }

      if (keyCode === 'NumpadSubtract' || keyCode === 'Minus' || key === '-' || key === '_') {
        e.preventDefault();
        // Zoom butonunu programatik olarak tetikle
        const zoomOutBtn = document.querySelector('.jvm-zoom-btn.jvm-zoomout');
        if (zoomOutBtn) {
          (zoomOutBtn as HTMLElement).click();
          console.log('Zoom OUT button clicked');
          setShowTurkeyPulse(false);
        }
        return;
      }

      switch(key) {
        // Ok tuşları ile kaydırma
        case 'ArrowUp':
          map.setFocus({ x: currentX, y: currentY + panStep, scale: currentScale, animate: true });
          handled = true;
          break;
        case 'ArrowDown':
          map.setFocus({ x: currentX, y: currentY - panStep, scale: currentScale, animate: true });
          handled = true;
          break;
        case 'ArrowLeft':
          map.setFocus({ x: currentX + panStep, y: currentY, scale: currentScale, animate: true });
          handled = true;
          break;
        case 'ArrowRight':
          map.setFocus({ x: currentX - panStep, y: currentY, scale: currentScale, animate: true });
          handled = true;
          break;
        
        // WASD ile kaydırma (oyuncu dostu)
        case 'w':
        case 'W':
          map.setFocus({ x: currentX, y: currentY + panStep, scale: currentScale, animate: true });
          handled = true;
          break;
        case 's':
        case 'S':
          map.setFocus({ x: currentX, y: currentY - panStep, scale: currentScale, animate: true });
          handled = true;
          break;
        case 'a':
        case 'A':
          map.setFocus({ x: currentX + panStep, y: currentY, scale: currentScale, animate: true });
          handled = true;
          break;
        case 'd':
        case 'D':
          map.setFocus({ x: currentX - panStep, y: currentY, scale: currentScale, animate: true });
          handled = true;
          break;
      }

      if (handled) {
        e.preventDefault();
        setShowTurkeyPulse(false); // Klavye ile etkileşimde pulse'ı gizle
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMapHovered]);

  const exportCountries = [
    { name: "TÜRKİYE", flag: "🇹🇷", regionKey: "europeAsia" },
    { name: "ÖZBEKİSTAN", flag: "🇺🇿", regionKey: "centralAsia" },
    { name: "MISIR", flag: "🇪🇬", regionKey: "africa" },
    { name: "TACİKİSTAN", flag: "🇹🇯", regionKey: "centralAsia" },
    { name: "KAZAKİSTAN", flag: "🇰🇿", regionKey: "centralAsia" },
    { name: "TÜRKMENİSTAN", flag: "🇹🇲", regionKey: "centralAsia" }
  ];

  const exportStats = [
    { icon: Globe, value: "5+", label: t('exports.stats.countries') },
    { icon: Package, value: "500+", label: t('exports.stats.machines') },
    { icon: TrendingUp, value: "%40", label: t('exports.stats.growth') },
    { icon: Award, value: "ISO 9001", label: t('exports.stats.certificate') }
  ];

  const exportProducts = [
    { title: t('exports.products.conveyor'), description: t('exports.products.conveyorDesc'), image: "WhatsApp Image 2026-01-16 at 14.32.03.jpeg" },
    { title: t('exports.products.textile'), description: t('exports.products.textileDesc'), image: "WhatsApp Image 2026-01-16 at 14.32.04 (3).jpeg" },
    { title: t('exports.products.steel'), description: t('exports.products.steelDesc'), image: "WhatsApp Image 2026-01-16 at 14.32.05 (3).jpeg" },
    { title: t('exports.products.custom'), description: t('exports.products.customDesc'), image: "WhatsApp Image 2026-01-16 at 14.32.06 (5).jpeg" }
  ];

  const exportAdvantages = [
    t('exports.advantages.certified'),
    t('exports.advantages.standards'),
    t('exports.advantages.shipping'),
    t('exports.advantages.support'),
    t('exports.advantages.warranty'),
    t('exports.advantages.multilingual')
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-200" dir="ltr">
      <SkipLink />
      <Navbar />

      <section className="relative h-[60vh] min-h-[500px] xs:min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <OptimizedImage src="/media/img1.jpeg" alt="ABT Mekatronik İhracat" className="absolute inset-0 w-full h-full object-cover" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/90 via-zinc-900/70 to-zinc-900/50" />
        </div>
        <div className="container mx-auto px-6 xs:px-4 relative z-10 text-center">
          <div className="inline-block mb-4 xs:mb-3 px-4 xs:px-3 py-2 xs:py-1.5 bg-red-600/20 border border-red-600/50 text-red-500 font-bold text-sm xs:text-xs tracking-widest uppercase rounded-sm backdrop-blur-sm" dir={language === 'ar' ? 'rtl' : 'ltr'}>{t('exports.hero.badge')}</div>
          <h1 className="text-3xl xs:text-2xl sm:text-4xl md:text-7xl font-black text-white leading-tight mb-6 xs:mb-4 px-4 xs:px-0" dir={language === 'ar' ? 'rtl' : 'ltr'}>{t('exports.hero.title1')} <br /><span className="text-red-500">{t('exports.hero.title2')}</span></h1>
          <p className="text-lg xs:text-base sm:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed px-4 xs:px-0" dir={language === 'ar' ? 'rtl' : 'ltr'}>{t('exports.hero.description')}</p>
        </div>
      </section>

      <section className="py-16 xs:py-12 bg-gradient-to-br from-red-600 to-red-700">
        <div className="container mx-auto px-6 xs:px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 xs:gap-4">
            {exportStats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={stat.label} className="text-center animate-in scale-in duration-600" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="inline-flex items-center justify-center w-16 h-16 xs:w-14 xs:h-14 bg-white/20 rounded-full mb-4 xs:mb-3 backdrop-blur-sm">
                    <IconComponent className="w-8 h-8 xs:w-7 xs:h-7 text-white" />
                  </div>
                  <div className="text-4xl xs:text-3xl font-black text-white mb-2 xs:mb-1">{stat.value}</div>
                  <div className="text-sm xs:text-xs text-white/90 uppercase tracking-wider">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 xs:py-16 bg-zinc-50 dark:bg-zinc-900">
        <div className="container mx-auto px-6 xs:px-4">
          <div className="text-center mb-16 xs:mb-12">
            <h2 className="text-3xl xs:text-2xl sm:text-4xl md:text-5xl font-black text-zinc-900 dark:text-white mb-6 xs:mb-4 px-4 xs:px-0" dir={language === 'ar' ? 'rtl' : 'ltr'}><span className="text-red-600 dark:text-red-500">{t('exports.countries.title')}</span> {t('exports.countries.titleHighlight')}</h2>
            <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto text-base xs:text-sm sm:text-lg px-4 xs:px-0" dir={language === 'ar' ? 'rtl' : 'ltr'}>{t('exports.countries.description')}</p>
          </div>
          <div className="max-w-6xl mx-auto mb-16 xs:mb-12">
            <div className="bg-white dark:bg-zinc-800 p-8 xs:p-4 rounded-2xl border-2 border-zinc-200 dark:border-zinc-700 shadow-2xl">
              <style>{`
                .jvm-zoom-btn {
                  background-color: #ef4444 !important;
                  border: 2px solid #ffffff !important;
                  color: #ffffff !important;
                  font-weight: bold !important;
                  width: 36px !important;
                  height: 36px !important;
                  border-radius: 8px !important;
                  box-shadow: 0 4px 6px rgba(239, 68, 68, 0.3) !important;
                  transition: all 0.3s ease !important;
                  display: flex !important;
                  align-items: center !important;
                  justify-content: center !important;
                  line-height: 1 !important;
                  padding: 0 !important;
                }
                .jvm-zoom-btn:hover {
                  background-color: #dc2626 !important;
                  transform: scale(1.1) !important;
                  box-shadow: 0 6px 12px rgba(239, 68, 68, 0.4) !important;
                }
                .jvm-zoom-btn:active {
                  transform: scale(0.95) !important;
                }
                #world-map {
                  will-change: transform;
                }
                #world-map svg {
                  will-change: transform;
                }
                @media (max-width: 640px) {
                  .jvm-zoom-btn {
                    display: none !important;
                  }
                }
              `}</style>
              <div 
                id="world-map" 
                ref={mapRef} 
                className="w-full relative" 
                style={{ height: window.innerWidth < 640 ? "400px" : "600px" }}
                onMouseEnter={() => setIsMapHovered(true)}
                onMouseLeave={() => setIsMapHovered(false)}
              >
                {/* Türkiye Üretim Merkezi - 5 saniye göster sonra kaybol - Desktop only */}
                {showTurkeyPulse && (
                  <div 
                    className="absolute z-40 pointer-events-none animate-in fade-in zoom-in duration-500 hidden sm:block" 
                    style={{ 
                      left: "56.5%", 
                      top: "42%"
                    }}
                  >
                    <div className="relative">
                      {/* Pulse Ring - Attention Grabber */}
                      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div className="w-3 h-3 bg-blue-500/70 rounded-full animate-ping"></div>
                        <div className="absolute inset-0 w-3 h-3 bg-blue-600/90 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Modern Hover Tooltip - Always visible on hover */}
                {hoveredCountry && !isZooming && (
                  <div
                    className="absolute pointer-events-none z-50"
                    style={{
                      left: `${hoveredCountry.x + 15}px`,
                      top: `${hoveredCountry.y - 15}px`,
                    }}
                  >
                    <div className="relative">
                      {/* Arrow - Dark Gray/Black */}
                      <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-r-6 border-r-zinc-800"></div>
                      
                      {/* Tooltip Content - Red for all, special badge for Turkey */}
                      <div className="bg-gradient-to-br from-red-600 to-red-700 text-white px-3 py-2 rounded-2xl shadow-xl border border-red-500 animate-in fade-in slide-in-from-left-2 duration-200 min-w-[120px] max-w-[180px]">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-2xl xs:text-xl drop-shadow-lg emoji-container" style={{ lineHeight: 1 }}>{countryNames[hoveredCountry.code]?.flag}</span>
                          <div className="flex-1">
                            <div className="font-black text-xs xs:text-[10px] leading-tight break-words">
                              {countryNames[hoveredCountry.code]?.name}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 pt-1 border-t border-white/30">
                          {hoveredCountry.code === 'TR' ? (
                            <>
                              <div className="relative">
                                <div className="w-1.5 h-1.5 bg-blue-500/70 rounded-full animate-ping absolute"></div>
                                <div className="w-1.5 h-1.5 bg-blue-600/90 rounded-full"></div>
                              </div>
                              <span className="text-[10px] font-bold uppercase tracking-wide text-white/90">🏭 {t('exports.legend.productionCenter')}</span>
                            </>
                          ) : (
                            <>
                              <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                              <span className="text-[10px] font-bold uppercase tracking-wide text-white/90">{t('exports.legend.export')}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {/* Legend - Desktop only */}
              <div className="mt-6 xs:mt-4 hidden sm:flex items-center justify-center gap-8 xs:gap-3 flex-wrap">
                <div className="flex items-center gap-3 xs:gap-2">
                  <div className="relative inline-block">
                    <div className="w-6 h-6 xs:w-5 xs:h-5 bg-red-600 dark:bg-red-500 rounded-full"></div>
                  </div>
                  <span className="text-sm xs:text-xs font-semibold text-zinc-700 dark:text-zinc-300">{t('exports.legend.exportCountries')}</span>
                </div>
                <div className="flex items-center gap-3 xs:gap-2">
                  <div className="w-6 h-6 xs:w-5 xs:h-5 bg-zinc-200 dark:bg-zinc-700 rounded-full"></div>
                  <span className="text-sm xs:text-xs font-semibold text-zinc-700 dark:text-zinc-300">{t('exports.legend.otherCountries')}</span>
                </div>
                <div className="flex items-center gap-3 xs:gap-2 px-4 xs:px-3 py-2 xs:py-1.5 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl xs:rounded-xl shadow-lg">
                  <div className="relative">
                    <div className="w-2 h-2 xs:w-1.5 xs:h-1.5 bg-blue-300 rounded-full animate-ping absolute"></div>
                    <div className="w-2 h-2 xs:w-1.5 xs:h-1.5 bg-white rounded-full"></div>
                  </div>
                  <div className="flex items-center gap-2 xs:gap-1.5">
                    <div className="text-xl xs:text-lg">🏭</div>
                    <div className="flex flex-col">
                      <span className="text-xs xs:text-[10px] font-bold text-white/80 uppercase tracking-wider leading-tight">{t('exports.legend.productionCenter')}</span>
                      <span className="text-sm xs:text-xs font-black text-white leading-tight">TÜRKİYE</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 xs:gap-2">
            {exportCountries.map((country, index) => (
              <div key={country.name} className="bg-white dark:bg-zinc-800 p-4 xs:p-3 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 hover:border-red-500 dark:hover:border-red-500 shadow-lg hover:shadow-xl transition-all group text-center animate-in slide-up duration-600" style={{ animationDelay: `${index * 50}ms` }}>
                <div className="text-5xl xs:text-4xl mb-2 xs:mb-1.5 group-hover:scale-110 transition-transform emoji-container" style={{ lineHeight: 1 }}>{country.flag}</div>
                <h3 className="text-sm xs:text-xs font-bold text-zinc-900 dark:text-white mb-1 xs:mb-0.5 break-words leading-tight" dir={language === 'ar' ? 'rtl' : 'ltr'}>{country.name}</h3>
                <p className="text-[10px] xs:text-[9px] text-zinc-500 dark:text-zinc-400 break-words" dir={language === 'ar' ? 'rtl' : 'ltr'}>{t(`exports.regions.${country.regionKey}`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 xs:py-16 bg-white dark:bg-zinc-800">
        <div className="container mx-auto px-6 xs:px-4">
          <div className="text-center mb-16 xs:mb-12">
            <h2 className="text-3xl xs:text-2xl sm:text-4xl md:text-5xl font-black text-zinc-900 dark:text-white mb-6 xs:mb-4 px-4 xs:px-0" dir={language === 'ar' ? 'rtl' : 'ltr'}>{t('exports.productsSection.title')} <span className="text-red-600 dark:text-red-500">{t('exports.productsSection.titleHighlight')}</span></h2>
            <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto text-base xs:text-sm sm:text-lg px-4 xs:px-0" dir={language === 'ar' ? 'rtl' : 'ltr'}>{t('exports.productsSection.description')}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 xs:gap-3">
            {exportProducts.map((product, index) => (
              <div key={product.title} className="group relative overflow-hidden bg-zinc-100 dark:bg-zinc-900 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 hover:border-red-500 dark:hover:border-red-500 shadow-lg hover:shadow-xl transition-all animate-in scale-in duration-600" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="aspect-square overflow-hidden">
                  <OptimizedImage src={`/media/${encodeURIComponent(product.image)}`} alt={product.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                </div>
                <div className="p-4 xs:p-3">
                  <h3 className="text-base xs:text-sm font-bold text-zinc-900 dark:text-white mb-1.5 xs:mb-1">{product.title}</h3>
                  <p className="text-xs xs:text-[10px] text-zinc-600 dark:text-zinc-400 leading-snug">{product.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 xs:py-16 bg-zinc-50 dark:bg-zinc-900">
        <div className="container mx-auto px-6 xs:px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16 xs:mb-12">
              <h2 className="text-3xl xs:text-2xl sm:text-4xl md:text-5xl font-black text-zinc-900 dark:text-white mb-6 xs:mb-4 px-4 xs:px-0" dir={language === 'ar' ? 'rtl' : 'ltr'}>{t('exports.whyUs.title')} <span className="text-red-600 dark:text-red-500">{t('exports.whyUs.titleHighlight')}</span></h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4 xs:gap-3">
              {exportAdvantages.map((advantage, index) => (
                <div key={advantage} className="flex items-center gap-3 xs:gap-2 bg-white dark:bg-zinc-800 p-4 xs:p-3 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 hover:border-red-500 dark:hover:border-red-500 shadow-lg hover:shadow-xl transition-all animate-in slide-up duration-600" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="shrink-0 w-10 h-10 xs:w-8 xs:h-8 bg-red-600/10 dark:bg-red-500/10 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 xs:w-4 xs:h-4 text-red-600 dark:text-red-500" />
                  </div>
                  <span className="text-sm xs:text-xs font-semibold text-zinc-900 dark:text-white leading-snug" dir={language === 'ar' ? 'rtl' : 'ltr'}>{advantage}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 xs:py-16 bg-gradient-to-br from-red-600 to-red-700">
        <div className="container mx-auto px-6 xs:px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <Ship className="w-20 h-20 xs:w-16 xs:h-16 text-white mx-auto mb-8 xs:mb-6" />
            <h2 className="text-4xl xs:text-3xl md:text-5xl font-black text-white mb-6 xs:mb-4" dir={language === 'ar' ? 'rtl' : 'ltr'}>{t('exports.cta.title')}</h2>
            <p className="text-xl xs:text-lg text-white/90 mb-8 xs:mb-6 leading-relaxed" dir={language === 'ar' ? 'rtl' : 'ltr'}>{t('exports.cta.description')}</p>
            <div className="flex flex-col sm:flex-row gap-3 xs:gap-2 justify-center">
              <button 
                onClick={() => smoothScrollToElement('contact')}
                className="inline-flex items-center justify-center px-6 xs:px-3 py-3 xs:py-2.5 bg-white text-red-600 font-bold text-base xs:text-sm rounded-xl hover:bg-white/90 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
              >
                {t('exports.cta.contactButton')}
              </button>
              <a href="https://wa.me/905373197281" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-6 xs:px-3 py-3 xs:py-2.5 bg-white/10 text-white border-2 border-white font-bold text-base xs:text-sm rounded-xl hover:bg-white/20 transition-all backdrop-blur-sm">{t('exports.cta.whatsappButton')}</a>
            </div>
          </div>
        </div>
      </section>

      {/* PARTNERS SECTION - 2-Row Infinite Scroll */}
      <section id="ortaklarimiz" className="py-24 xs:py-16 bg-zinc-50 dark:bg-zinc-900 scroll-mt-24 overflow-hidden">
        {/* Invisible anchor for precise scroll positioning */}
        <div className="absolute" style={{ marginTop: '-100px' }}></div>
        
        {/* Title Section - With Container */}
        <div className="container mx-auto px-6 mb-16 xs:mb-12">
          <div className="text-center animate-in fade-in duration-600">
            <h2 className="text-4xl xs:text-3xl md:text-5xl font-black text-zinc-900 dark:text-white mb-6" dir={language === 'ar' ? 'rtl' : 'ltr'}>
              {t('exports.partners.title')} <span className="text-red-600 dark:text-red-500">{t('exports.partners.titleHighlight')}</span>
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto text-lg xs:text-base" dir={language === 'ar' ? 'rtl' : 'ltr'}>
              {t('exports.partners.description')}
            </p>
          </div>
        </div>
        
        {/* Scrolling Rows - Full Width */}
        <div className="w-full">

          {/* CSS for dual-direction infinite scroll */}
          <style>{`
            @keyframes scroll-left {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(-50%);
              }
            }
            @keyframes scroll-right {
              0% {
                transform: translateX(-50%);
              }
              100% {
                transform: translateX(0);
              }
            }
            .animate-scroll-left {
              animation: scroll-left 30s linear infinite;
            }
            .animate-scroll-right {
              animation: scroll-right 30s linear infinite;
            }
            .animate-scroll-left:hover,
            .animate-scroll-right:hover {
              animation-play-state: paused;
            }
          `}</style>

          {/* First Row - Scroll Left */}
          <div className="relative mb-8">
            {/* Gradient overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-zinc-50 dark:from-zinc-900 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-zinc-50 dark:from-zinc-900 to-transparent z-10 pointer-events-none"></div>
            
            <div className="flex gap-4 xs:gap-3 animate-scroll-left">
              {/* First set of 10 partners */}
              {[...Array(10)].map((_, index) => (
                <div 
                  key={`row1-first-${index}`}
                  className="flex-shrink-0 flex flex-col items-center justify-center px-4 xs:px-3 py-4 xs:py-3 bg-white dark:bg-zinc-800 border-2 border-zinc-200 dark:border-zinc-700 rounded-xl hover:border-red-500 dark:hover:border-red-500 shadow-lg hover:shadow-xl transition-all group min-w-[140px] xs:min-w-[120px]"
                >
                  <div className="w-14 h-14 xs:w-12 xs:h-12 bg-zinc-100 dark:bg-zinc-700/50 rounded-lg flex items-center justify-center mb-2 xs:mb-1.5 group-hover:bg-red-600/20 transition-all duration-300 group-hover:scale-110">
                    <span className="text-xl xs:text-lg font-black text-zinc-700 dark:text-zinc-500 group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors">
                      {String.fromCharCode(65 + index)}
                    </span>
                  </div>
                  <span className="text-[10px] xs:text-[9px] text-zinc-600 dark:text-zinc-500 uppercase tracking-wider group-hover:text-zinc-700 dark:group-hover:text-zinc-400 transition-colors text-center">
                    {t('exports.partners.partner')} {index + 1}
                  </span>
                </div>
              ))}
              
              {/* Duplicate set for seamless loop */}
              {[...Array(10)].map((_, index) => (
                <div 
                  key={`row1-second-${index}`}
                  className="flex-shrink-0 flex flex-col items-center justify-center px-4 xs:px-3 py-4 xs:py-3 bg-white dark:bg-zinc-800 border-2 border-zinc-200 dark:border-zinc-700 rounded-xl hover:border-red-500 dark:hover:border-red-500 shadow-lg hover:shadow-xl transition-all group min-w-[140px] xs:min-w-[120px]"
                >
                  <div className="w-14 h-14 xs:w-12 xs:h-12 bg-zinc-100 dark:bg-zinc-700/50 rounded-lg flex items-center justify-center mb-2 xs:mb-1.5 group-hover:bg-red-600/20 transition-all duration-300 group-hover:scale-110">
                    <span className="text-xl xs:text-lg font-black text-zinc-700 dark:text-zinc-500 group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors">
                      {String.fromCharCode(65 + index)}
                    </span>
                  </div>
                  <span className="text-[10px] xs:text-[9px] text-zinc-600 dark:text-zinc-500 uppercase tracking-wider group-hover:text-zinc-700 dark:group-hover:text-zinc-400 transition-colors text-center">
                    {t('exports.partners.partner')} {index + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Second Row - Scroll Right */}
          <div className="relative">
            {/* Gradient overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-zinc-50 dark:from-zinc-900 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-zinc-50 dark:from-zinc-900 to-transparent z-10 pointer-events-none"></div>
            
            <div className="flex gap-4 xs:gap-3 animate-scroll-right">
              {/* First set of 10 partners */}
              {[...Array(10)].map((_, index) => (
                <div 
                  key={`row2-first-${index}`}
                  className="flex-shrink-0 flex flex-col items-center justify-center px-4 xs:px-3 py-4 xs:py-3 bg-white dark:bg-zinc-800 border-2 border-zinc-200 dark:border-zinc-700 rounded-xl hover:border-red-500 dark:hover:border-red-500 shadow-lg hover:shadow-xl transition-all group min-w-[140px] xs:min-w-[120px]"
                >
                  <div className="w-14 h-14 xs:w-12 xs:h-12 bg-zinc-100 dark:bg-zinc-700/50 rounded-lg flex items-center justify-center mb-2 xs:mb-1.5 group-hover:bg-red-600/20 transition-all duration-300 group-hover:scale-110">
                    <span className="text-xl xs:text-lg font-black text-zinc-700 dark:text-zinc-500 group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors">
                      {String.fromCharCode(75 + index)}
                    </span>
                  </div>
                  <span className="text-[10px] xs:text-[9px] text-zinc-600 dark:text-zinc-500 uppercase tracking-wider group-hover:text-zinc-700 dark:group-hover:text-zinc-400 transition-colors text-center">
                    {t('exports.partners.partner')} {index + 11}
                  </span>
                </div>
              ))}
              
              {/* Duplicate set for seamless loop */}
              {[...Array(10)].map((_, index) => (
                <div 
                  key={`row2-second-${index}`}
                  className="flex-shrink-0 flex flex-col items-center justify-center px-4 xs:px-3 py-4 xs:py-3 bg-white dark:bg-zinc-800 border-2 border-zinc-200 dark:border-zinc-700 rounded-xl hover:border-red-500 dark:hover:border-red-500 shadow-lg hover:shadow-xl transition-all group min-w-[140px] xs:min-w-[120px]"
                >
                  <div className="w-14 h-14 xs:w-12 xs:h-12 bg-zinc-100 dark:bg-zinc-700/50 rounded-lg flex items-center justify-center mb-2 xs:mb-1.5 group-hover:bg-red-600/20 transition-all duration-300 group-hover:scale-110">
                    <span className="text-xl xs:text-lg font-black text-zinc-700 dark:text-zinc-500 group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors">
                      {String.fromCharCode(75 + index)}
                    </span>
                  </div>
                  <span className="text-[10px] xs:text-[9px] text-zinc-600 dark:text-zinc-500 uppercase tracking-wider group-hover:text-zinc-700 dark:group-hover:text-zinc-400 transition-colors text-center">
                    {t('exports.partners.partner')} {index + 11}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default OurExports;
