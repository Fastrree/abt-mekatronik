import { useState, useEffect } from 'react';
import { useI18n } from '@/lib/i18n';
import { Cookie, X, Shield, Settings } from 'lucide-react';

export function CookieBanner() {
  const { t, language } = useI18n();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Show banner after a short delay
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
    // Enable analytics
    if (typeof window.gtag !== 'undefined') {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted'
      });
    }
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setIsVisible(false);
    // Disable analytics
    if (typeof window.gtag !== 'undefined') {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied'
      });
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 animate-in slide-in-from-bottom duration-500">
      <div className="container mx-auto max-w-5xl">
        <div className="relative bg-gradient-to-br from-zinc-900 to-zinc-800 dark:from-zinc-800 dark:to-zinc-900 border-2 border-zinc-700 dark:border-zinc-600 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-sm">
          {/* Decorative gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-transparent pointer-events-none"></div>
          
          <div className="relative p-6 sm:p-8" dir={language === 'ar' ? 'rtl' : 'ltr'}>
            {/* Close button */}
            <button
              onClick={handleDecline}
              className="absolute top-4 right-4 p-2 text-zinc-300 hover:text-white hover:bg-zinc-700/50 rounded-lg transition-all"
              aria-label={t('cookie.close')}
            >
              <X size={20} />
            </button>

            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
              {/* Icon */}
              <div className="shrink-0 w-14 h-14 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center shadow-lg">
                <Cookie className="w-7 h-7 text-white" />
              </div>

              {/* Content */}
              <div className="flex-1 space-y-3">
                <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                  <Shield className="w-5 h-5 text-red-500" />
                  {t('cookie.title')}
                </h3>
                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                  {t('cookie.message')}
                </p>
                <p className="text-xs text-zinc-300">
                  {t('cookie.details')}
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
                <button
                  onClick={handleDecline}
                  className="px-6 py-3 bg-zinc-700 hover:bg-zinc-600 text-white text-sm font-semibold rounded-xl transition-all hover:scale-105 shadow-lg flex items-center justify-center gap-2 min-w-[140px]"
                >
                  <X size={16} />
                  {t('cookie.decline')}
                </button>
                <button
                  onClick={handleAccept}
                  className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white text-sm font-bold rounded-xl transition-all hover:scale-105 shadow-xl flex items-center justify-center gap-2 min-w-[140px]"
                >
                  <Cookie size={16} />
                  {t('cookie.accept')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
