import { useState, useEffect } from 'react';
import { X, Phone, MessageCircle } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { Button } from '@/components/ui/button';

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
      <div className="relative w-full max-w-md bg-zinc-800 border border-zinc-600 rounded-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Close Button */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-3 right-3 p-1 text-zinc-400 hover:text-white transition-colors"
          aria-label="Kapat"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 p-6 text-center">
          <h3 className="text-2xl font-black text-white mb-2">
            {t('exitPopup.title')}
          </h3>
          <p className="text-white/80 text-sm">
            {t('exitPopup.subtitle')}
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <p className="text-zinc-300 text-center">
            {t('exitPopup.description')}
          </p>

          <div className="space-y-3">
            <Button
              onClick={() => {
                window.open('https://wa.me/905373197281', '_blank');
                setIsVisible(false);
              }}
              className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-5"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              {t('exitPopup.whatsappButton')}
            </Button>

            <Button
              onClick={() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                setIsVisible(false);
              }}
              variant="outline"
              className="w-full border-zinc-600 text-zinc-300 hover:bg-zinc-700 py-5"
            >
              <Phone className="mr-2 h-5 w-5" />
              {t('exitPopup.contactButton')}
            </Button>
          </div>

          <button
            onClick={() => setIsVisible(false)}
            className="w-full text-center text-sm text-zinc-500 hover:text-zinc-300 transition-colors pt-2"
          >
            {t('exitPopup.dismiss')}
          </button>
        </div>
      </div>
    </div>
  );
}
