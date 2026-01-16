import { useState } from 'react';
import { useI18n, languages, Language } from '@/lib/i18n';
import { ChevronDown, Globe } from 'lucide-react';

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
        className="flex items-center gap-2 px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg hover:border-red-600/50 transition-colors"
        aria-label={t('nav.selectLanguage')}
      >
        <Globe size={16} className="text-zinc-400" />
        <span className="text-sm font-medium">{currentLang?.flag} {currentLang?.code.toUpperCase()}</span>
        <ChevronDown size={14} className={`text-zinc-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 top-full mt-2 z-50 bg-zinc-800 border border-zinc-700 rounded-lg shadow-xl overflow-hidden min-w-[160px]">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleSelect(lang.code)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-zinc-700 transition-colors ${
                  language === lang.code ? 'bg-red-600/20 text-red-400' : 'text-zinc-300'
                }`}
              >
                <span className="text-lg">{lang.flag}</span>
                <span className="text-sm font-medium">{lang.name}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
