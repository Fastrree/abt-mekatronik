import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Phone } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export default function NotFound() {
  const { t, language } = useI18n();
  const isRTL = language === 'ar';
  
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-zinc-900 relative overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-zinc-700/20 rounded-full blur-3xl" />
      </div>
      
      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
        {/* 404 Number */}
        <div className="mb-8">
          <span className="text-[12rem] md:text-[16rem] font-black text-transparent bg-clip-text bg-gradient-to-b from-zinc-600 to-zinc-800 leading-none select-none">
            404
          </span>
        </div>
        
        {/* Message */}
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          {t('notFound.title')}
        </h1>
        <p className="text-zinc-300 text-lg mb-10 max-w-md mx-auto">
          {t('notFound.description')}
        </p>
        
        {/* Action Buttons */}
        <div className={`flex flex-col sm:flex-row gap-4 justify-center ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
          <Button 
            size="lg"
            className="bg-red-600 hover:bg-red-700 text-white font-bold"
            onClick={() => window.location.href = '/'}
          >
            {!isRTL && <Home className="mr-2 h-5 w-5" />}
            {t('notFound.homeButton')}
            {isRTL && <Home className="ml-2 h-5 w-5" />}
          </Button>
          <Button 
            size="lg"
            variant="outline"
            className="border-zinc-600 text-zinc-300 hover:bg-zinc-800"
            onClick={() => window.history.back()}
          >
            {!isRTL && <ArrowLeft className="mr-2 h-5 w-5" />}
            {t('notFound.backButton')}
            {isRTL && <ArrowLeft className="ml-2 h-5 w-5" />}
          </Button>
          <Button 
            size="lg"
            variant="outline"
            className="border-zinc-600 text-zinc-300 hover:bg-zinc-800"
            onClick={() => window.location.href = '/#contact'}
          >
            {!isRTL && <Phone className="mr-2 h-5 w-5" />}
            {t('notFound.contactButton')}
            {isRTL && <Phone className="ml-2 h-5 w-5" />}
          </Button>
        </div>
        
        {/* Logo */}
        <div className="mt-16">
          <a href="/" className="text-2xl font-black text-white hover:opacity-80 transition-opacity">
            ABT <span className="text-red-600">MEKATRONİK</span>
          </a>
        </div>
      </div>
    </div>
  );
}
