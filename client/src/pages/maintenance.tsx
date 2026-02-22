import { Clock, Mail, Phone, Moon, Sun, ChevronDown, MoreVertical, X } from 'lucide-react';
import { useI18n, languages, getFlagSrc } from '@/lib/i18n';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function Maintenance() {
  const { language, setLanguage, t } = useI18n();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const currentLanguage = languages.find(lang => lang.code === language);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 flex items-center justify-center px-4 sm:px-6 transition-colors duration-300">
      {/* Desktop: Language & Theme Selector - Top Right */}
      <div className="hidden sm:flex fixed top-6 right-6 items-center gap-3 z-50" dir="ltr">
        {/* Theme Toggle */}
        {mounted && (
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-3 bg-white/90 dark:bg-zinc-800/90 backdrop-blur-md border-2 border-slate-200 dark:border-zinc-700 rounded-xl hover:scale-110 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-xl min-w-[48px] min-h-[48px]"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-yellow-500" />
            ) : (
              <Moon className="w-5 h-5 text-slate-700" />
            )}
          </button>
        )}

        {/* Language Selector */}
        <div className="relative">
          <button 
            onClick={() => setIsLanguageOpen(!isLanguageOpen)}
            className="p-3 bg-gradient-to-br from-white to-slate-50 dark:from-zinc-800 dark:to-zinc-900 backdrop-blur-md border-2 border-slate-200 dark:border-zinc-700 rounded-xl hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 min-w-[48px] min-h-[48px]"
            aria-label="Select language"
          >
            <img src={getFlagSrc(language)} alt={currentLanguage?.name} className="w-5 h-4 object-cover rounded-md shadow-sm" />
            <span className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase">{language}</span>
            <ChevronDown className={`w-4 h-4 text-slate-500 dark:text-slate-400 transition-transform duration-300 ${isLanguageOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {/* Language Dropdown */}
          {isLanguageOpen && (
            <div className="absolute right-0 top-full mt-2 bg-gradient-to-br from-white to-slate-50 dark:from-zinc-800 dark:to-zinc-900 border-2 border-slate-200 dark:border-zinc-700 rounded-2xl shadow-2xl min-w-[240px] overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code as any);
                    setIsLanguageOpen(false);
                  }}
                  className={`w-full px-4 py-4 text-left transition-all duration-200 flex items-center gap-3 min-h-[48px] ${
                    language === lang.code 
                      ? 'bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/20 text-red-600 dark:text-red-400 font-bold shadow-inner' 
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-zinc-700/50 active:bg-slate-200 dark:active:bg-zinc-700'
                  }`}
                >
                  <img src={getFlagSrc(lang.code)} alt={lang.name} className="w-6 h-5 object-cover rounded-md shadow-sm" />
                  <span className="text-base font-semibold">{lang.name}</span>
                  {language === lang.code && (
                    <span className="ml-auto text-red-600 dark:text-red-400">✓</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile: Menu Button - Top Right */}
      <div className="sm:hidden fixed top-4 right-2 z-50" dir="ltr">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 bg-gradient-to-br from-white to-slate-50 dark:from-zinc-800 dark:to-zinc-900 backdrop-blur-md border-2 border-slate-200 dark:border-zinc-700 rounded-lg active:scale-95 transition-all duration-300 shadow-lg min-w-[40px] min-h-[40px]"
          aria-label="Open menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-4 h-4 text-slate-700 dark:text-slate-300" />
          ) : (
            <MoreVertical className="w-4 h-4 text-slate-700 dark:text-slate-300" />
          )}
        </button>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Menu Panel */}
            <div className="absolute right-0 top-full mt-2 bg-gradient-to-br from-white to-slate-50 dark:from-zinc-800 dark:to-zinc-900 border-2 border-slate-200 dark:border-zinc-700 rounded-2xl shadow-2xl min-w-[280px] overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              {/* Theme Toggle */}
              {mounted && (
                <button
                  onClick={() => {
                    setTheme(theme === 'dark' ? 'light' : 'dark');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full px-4 py-4 text-left transition-all duration-200 flex items-center gap-3 min-h-[56px] text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-zinc-700/50 active:bg-slate-200 dark:active:bg-zinc-700 border-b-2 border-slate-200 dark:border-zinc-700"
                >
                  {theme === 'dark' ? (
                    <>
                      <Sun className="w-6 h-6 text-yellow-500" />
                      <span className="text-base font-semibold">Light Mode</span>
                    </>
                  ) : (
                    <>
                      <Moon className="w-6 h-6 text-slate-700 dark:text-slate-300" />
                      <span className="text-base font-semibold">Dark Mode</span>
                    </>
                  )}
                </button>
              )}

              {/* Language Options */}
              <div className="py-2">
                <div className="px-4 py-2 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  {t('nav.selectLanguage')}
                </div>
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code as any);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full px-4 py-3.5 text-left transition-all duration-200 flex items-center gap-3 min-h-[52px] ${
                      language === lang.code 
                        ? 'bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/20 text-red-600 dark:text-red-400 font-bold shadow-inner' 
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-zinc-700/50 active:bg-slate-200 dark:active:bg-zinc-700'
                    }`}
                  >
                    <img src={getFlagSrc(lang.code)} alt={lang.name} className="w-6 h-5 object-cover rounded-md shadow-sm" />
                    <span className="text-base font-semibold">{lang.name}</span>
                    {language === lang.code && (
                      <span className="ml-auto text-red-600 dark:text-red-400">✓</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      <div className="max-w-3xl w-full">
        {/* Logo/Brand */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">
            {language === 'tr' ? 'ABT MEKATRONİK' : 'ABT MECHATRONICS'}
          </h1>
          <div className="h-1 w-24 sm:w-32 mx-auto bg-gradient-to-r from-red-600 to-red-500 rounded-full" />
        </div>

        {/* Main Message Card */}
        <div className="bg-gradient-to-br from-white/90 to-slate-50/90 dark:from-white/5 dark:to-white/10 backdrop-blur-xl border-2 border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-10 md:p-12 text-center shadow-2xl hover:shadow-3xl transition-all duration-500">
          {/* Status Badge - Top */}
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-yellow-100 to-yellow-200 dark:from-yellow-900/30 dark:to-yellow-800/20 border-2 border-yellow-300 dark:border-yellow-700 rounded-full shadow-lg">
              <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
              <span className="text-xs sm:text-sm font-bold text-yellow-800 dark:text-yellow-400" dir={language === 'ar' ? 'rtl' : 'ltr'}>
                {t('maintenance.statusBadge')}
              </span>
            </div>
          </div>

          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-yellow-400 to-yellow-500 dark:from-yellow-500 dark:to-yellow-600 rounded-2xl sm:rounded-3xl mb-6 shadow-lg">
            <Clock className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
          
          {/* Title */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4 sm:mb-6 tracking-tight" dir={language === 'ar' ? 'rtl' : 'ltr'}>
            {t('maintenance.title')}
          </h2>
          
          {/* Description */}
          <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-4 sm:mb-6 leading-relaxed max-w-2xl mx-auto" dir={language === 'ar' ? 'rtl' : 'ltr'}>
            {t('maintenance.description')}
          </p>

          {/* Thank You Message */}
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mb-6 sm:mb-8 font-medium" dir={language === 'ar' ? 'rtl' : 'ltr'}>
            {t('maintenance.thankYou')}
          </p>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-white/20 to-transparent mb-6 sm:mb-8" />

          {/* Contact Section */}
          <div className="space-y-4 sm:space-y-6">
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider mb-4" dir={language === 'ar' ? 'rtl' : 'ltr'}>
              {t('maintenance.contactText')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              {/* Phone Button */}
              <a 
                href="tel:+905373197281" 
                className="group inline-flex items-center justify-center gap-3 px-5 sm:px-6 py-3.5 sm:py-4 bg-gradient-to-r from-slate-100 to-slate-200 dark:from-white/10 dark:to-white/5 hover:from-slate-200 hover:to-slate-300 dark:hover:from-white/15 dark:hover:to-white/10 border-2 border-slate-200 dark:border-white/20 rounded-xl sm:rounded-2xl transition-all duration-300 text-slate-900 dark:text-white hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl min-h-[48px]"
              >
                <Phone className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                <span className="font-bold text-sm sm:text-base">+90 537 319 72 81</span>
              </a>
              
              {/* Email Button */}
              <a 
                href="mailto:info@abtmekatronik.com" 
                className="group inline-flex items-center justify-center gap-3 px-5 sm:px-6 py-3.5 sm:py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 border-2 border-red-600 dark:border-red-500 rounded-xl sm:rounded-2xl transition-all duration-300 text-white hover:scale-105 active:scale-95 shadow-lg hover:shadow-2xl hover:shadow-red-500/50 min-h-[48px]"
              >
                <Mail className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                <span className="font-bold text-sm sm:text-base">info@abtmekatronik.com</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
