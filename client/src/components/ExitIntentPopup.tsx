import { useState, useEffect } from 'react';
import { X, Phone, MessageCircle } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

export function ExitIntentPopup() {
  const { t } = useI18n();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if already shown in this session
    const hasShown = sessionStorage.getItem('exit-intent-shown');
    if (hasShown === 'true') return;

    let triggered = false;

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger once, when mouse leaves from top of page
      if (triggered) return;
      if (e.clientY <= 0 && e.relatedTarget === null) {
        triggered = true;
        setIsVisible(true);
        sessionStorage.setItem('exit-intent-shown', 'true');
        document.removeEventListener('mouseout', handleMouseLeave);
      }
    };

    // Only trigger on desktop, with delay to avoid immediate trigger
    if (window.innerWidth > 768) {
      const timer = setTimeout(() => {
        document.addEventListener('mouseout', handleMouseLeave);
      }, 3000); // 3 saniye bekle

      return () => {
        clearTimeout(timer);
        document.removeEventListener('mouseout', handleMouseLeave);
      };
    }

    return () => {};
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 animate-in fade-in duration-300">
      <div className="relative w-full max-w-md animate-in zoom-in-95 slide-in-from-bottom-4 duration-500">
        {/* Gradient Border Effect - Optimized (no blur, no pulse) */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-red-500 to-orange-500 rounded-2xl opacity-30"></div>
        
        {/* Main Card */}
        <div className="relative bg-gradient-to-br from-zinc-900 to-zinc-800 border-2 border-zinc-700 rounded-2xl shadow-2xl overflow-hidden">
          {/* Close Button - Optimized (no backdrop-blur) */}
          <button
            onClick={() => setIsVisible(false)}
            className="absolute top-4 right-4 z-10 p-2 bg-zinc-800 hover:bg-red-600 text-zinc-400 hover:text-white rounded-xl transition-all duration-300 hover:scale-110 hover:rotate-90 border border-zinc-700 hover:border-red-500"
            aria-label="Kapat"
          >
            <X size={20} />
          </button>

          {/* Header - Optimized Gradient (no decorative circles) */}
          <div className="relative bg-gradient-to-br from-red-600 via-red-700 to-red-800 p-8 text-center">
            <div className="relative">
              <div className="inline-block mb-3 px-4 py-1.5 bg-white/10 rounded-full border border-white/20">
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  {t('exitPopup.badge')}
                </span>
              </div>
              <h3 className="text-3xl font-black text-white mb-2 leading-tight">
                {t('exitPopup.title')}
              </h3>
              <p className="text-white/90 text-sm font-medium">
                {t('exitPopup.subtitle')}
              </p>
            </div>
          </div>

          {/* Content - Optimized Layout */}
          <div className="p-6 space-y-5">
            <p className="text-zinc-300 text-center leading-relaxed">
              {t('exitPopup.description')}
            </p>

            <div className="space-y-3">
              {/* WhatsApp Button - Optimized (no shine effect) */}
              <button
                onClick={() => {
                  window.open('https://wa.me/905373197281', '_blank');
                  setIsVisible(false);
                }}
                className="w-full bg-gradient-to-r from-[#25D366] to-[#20bd5a] hover:from-[#20bd5a] hover:to-[#1da851] text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-green-500/30"
              >
                <span className="flex items-center justify-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  {t('exitPopup.whatsappButton')}
                </span>
              </button>

              {/* Contact Button - Optimized (no glow effect) */}
              <button
                onClick={() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  setIsVisible(false);
                }}
                className="w-full bg-zinc-800 hover:bg-zinc-700 border-2 border-zinc-700 hover:border-red-500 text-zinc-300 hover:text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 hover:scale-105"
              >
                <span className="flex items-center justify-center gap-2">
                  <Phone className="h-5 w-5" />
                  {t('exitPopup.contactButton')}
                </span>
              </button>
            </div>

            {/* Dismiss Button - Subtle */}
            <button
              onClick={() => setIsVisible(false)}
              className="w-full text-center text-sm text-zinc-500 hover:text-zinc-300 transition-colors pt-2 hover:underline underline-offset-4"
            >
              {t('exitPopup.dismiss')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
