import { useState, useEffect } from 'react';
import { useI18n } from '@/lib/i18n';
import { X } from 'lucide-react';

export function CookieBanner() {
  const { t } = useI18n();
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
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-in slide-in-from-bottom duration-500">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-zinc-800 border border-zinc-700 rounded-lg shadow-2xl p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex-1 text-center md:text-left">
            <p className="text-zinc-300 text-sm md:text-base">
              🍪 {t('cookie.message')}
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={handleDecline}
              className="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors"
            >
              {t('cookie.decline')}
            </button>
            <button
              onClick={handleAccept}
              className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded transition-colors"
            >
              {t('cookie.accept')}
            </button>
            <button
              onClick={handleDecline}
              className="p-1 text-zinc-500 hover:text-white transition-colors md:hidden"
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
