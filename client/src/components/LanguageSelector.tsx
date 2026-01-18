import { useState, memo } from 'react';
import { useI18n, languages, Language, getFlagSrc } from '@/lib/i18n';
import { ChevronDown } from 'lucide-react';

interface LanguageSelectorProps {
  isScrolled?: boolean;
}

export const LanguageSelector = memo(function LanguageSelector({ isScrolled = false }: LanguageSelectorProps) {
  const { language, setLanguage, t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);

  const currentLang = languages.find(l => l.code === language);

  const handleSelect = (code: Language) => {
    setLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Desktop: Full style with flag and language name */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`hidden lg:flex items-center gap-2 px-3 py-2 hover:opacity-70 transition-opacity ${
          isOpen ? 'opacity-100' : ''
        }`}
        aria-label={t('nav.selectLanguage')}
      >
        <img src={getFlagSrc(language)} alt={currentLang?.name} className="w-5 h-4 object-cover rounded-sm" />
        <span className="text-sm font-medium text-white">{currentLang?.code.toUpperCase()}</span>
        <ChevronDown size={14} className={`transition-transform text-white ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Mobile: Minimal style with just flag */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`lg:hidden flex items-center gap-1 px-2 py-1.5 hover:opacity-70 transition-opacity ${
          isOpen ? 'opacity-100' : ''
        }`}
        aria-label={t('nav.selectLanguage')}
      >
        <img src={getFlagSrc(language)} alt={currentLang?.name} className="w-5 h-3.5 object-cover rounded-sm" />
        <ChevronDown size={12} className={`transition-transform text-white ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 top-full mt-2 z-50 bg-zinc-800 border border-zinc-700 rounded-lg shadow-xl overflow-hidden min-w-[160px] lg:min-w-[160px] max-w-[140px] lg:max-w-none">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleSelect(lang.code)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-zinc-700 transition-colors ${
                  language === lang.code ? 'bg-red-600/20 text-red-400' : 'text-white'
                }`}
              >
                <img src={getFlagSrc(lang.code)} alt={lang.name} className="w-6 h-4 object-cover rounded-sm shrink-0" />
                <span className="text-sm font-medium truncate">{lang.name}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
});
