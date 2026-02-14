import { useState, memo, useEffect } from 'react';
import { useI18n, languages, Language, getFlagSrc } from '@/lib/i18n';
import { ChevronDown } from 'lucide-react';

interface LanguageSelectorProps {
  isScrolled?: boolean;
}

export const LanguageSelector = memo(function LanguageSelector({ isScrolled = false }: LanguageSelectorProps) {
  const { language, setLanguage, t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState<string | undefined>(undefined);

  const currentLang = languages.find(l => l.code === language);

  // Track theme
  useEffect(() => {
    const updateTheme = () => {
      setTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    };
    updateTheme();
    
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    
    return () => observer.disconnect();
  }, []);

  const handleSelect = (code: Language) => {
    setLanguage(code);
    setIsOpen(false);
  };

  // Dynamic styling based on theme and scroll
  const isDark = theme === 'dark';
  const buttonClasses = isDark
    ? "bg-white/10 hover:bg-white/20 border-white/20 hover:border-white/40"
    : isScrolled
    ? "bg-white/90 hover:bg-white border-white/40 hover:border-white/60"
    : "bg-white/10 hover:bg-white/20 border-white/20 hover:border-white/40";

  const textClasses = isDark
    ? "text-white"
    : isScrolled
    ? "text-zinc-900"
    : "text-white";

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Desktop: Full style with flag and language name */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`hidden lg:flex items-center gap-2 px-4 py-2.5 backdrop-blur-sm border-2 rounded-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 hover:shadow-lg ${buttonClasses} ${
          isDark ? "hover:shadow-white/20" : isScrolled ? "hover:shadow-zinc-900/20" : "hover:shadow-white/20"
        } ${
          isOpen ? (isDark ? 'bg-white/20 border-white/40' : isScrolled ? 'bg-white border-white/60' : 'bg-white/20 border-white/40') + ' scale-105' : ''
        }`}
        aria-label={t('nav.selectLanguage')}
      >
        <img src={getFlagSrc(language)} alt={currentLang?.name} className="w-5 h-4 object-cover rounded-md shadow-sm" />
        <span className={`text-sm font-bold ${textClasses}`}>{currentLang?.code.toUpperCase()}</span>
        <ChevronDown size={14} className={`transition-transform duration-300 ${textClasses} ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Mobile: Minimal style with just flag */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`lg:hidden flex items-center gap-1 px-2.5 py-2 backdrop-blur-sm border-2 rounded-xl transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 ${buttonClasses} ${
          isOpen ? (isDark ? 'bg-white/20 border-white/40' : isScrolled ? 'bg-white border-white/60' : 'bg-white/20 border-white/40') + ' scale-105' : ''
        }`}
        aria-label={t('nav.selectLanguage')}
      >
        <img src={getFlagSrc(language)} alt={currentLang?.name} className="w-4 h-3 object-cover rounded-sm shadow-sm" />
        <ChevronDown size={10} className={`transition-transform duration-300 ${textClasses} ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div 
          className="absolute right-0 top-full mt-0.5 z-50 bg-gradient-to-br from-zinc-800 to-zinc-900 border-2 border-zinc-700 rounded-2xl shadow-2xl overflow-hidden w-[110px] sm:w-[180px] animate-in fade-in slide-in-from-top-2 duration-200"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleSelect(lang.code)}
                className={`w-full flex items-center gap-1.5 sm:gap-2.5 px-2.5 py-2 sm:px-3 sm:py-2.5 text-left hover:bg-zinc-700 transition-all duration-200 hover:scale-[1.02] hover:translate-x-1 ${
                  language === lang.code ? 'bg-gradient-to-r from-red-600/30 to-red-600/10 text-red-400 font-bold border-l-4 border-red-500' : 'text-white hover:text-red-400'
                }`}
              >
                <img src={getFlagSrc(lang.code)} alt={lang.name} className="w-4 h-3 sm:w-5 sm:h-4 object-cover rounded-md shadow-sm shrink-0" />
                <span className="text-[9px] sm:text-sm font-semibold truncate">{lang.name}</span>
              </button>
            ))}
          </div>
      )}
    </div>
  );
});
