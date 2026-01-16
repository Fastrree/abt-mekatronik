import { useState } from 'react';
import { useI18n, languages, Language } from '@/lib/i18n';
import { ChevronDown } from 'lucide-react';

export function LanguageSelector() {
  const { language, setLanguage, t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);

  const currentLang = languages.find(l => l.code === language);

  const handleSelect = (code: Language) => {
    setLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 px-2 py-1.5 bg-zinc-800/80 border border-zinc-700 rounded hover:border-red-600/50 transition-colors"
        aria-label={t('nav.selectLanguage')}
      >
        <span className="text-sm">{currentLang?.flag}</span>
        <ChevronDown size={12} className={`text-zinc-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 top-full mt-1 z-50 bg-zinc-800 border border-zinc-700 rounded-lg shadow-xl overflow-hidden min-w-[140px]">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleSelect(lang.code)}
                className={`w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-zinc-700 transition-colors ${
                  language === lang.code ? 'bg-red-600/20 text-red-400' : 'text-zinc-300'
                }`}
              >
                <span>{lang.flag}</span>
                <span className="text-sm">{lang.code.toUpperCase()}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
