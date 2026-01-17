import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

export function FAQ() {
  const { t, tArray } = useI18n();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const faqItems = tArray('faq.items');

  return (
    <section className="py-20 bg-zinc-50 dark:bg-zinc-800">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-12 animate-in fade-in duration-600">
          <h3 className="text-red-600 dark:text-red-500 font-bold tracking-widest uppercase mb-2">
            {t('faq.subtitle')}
          </h3>
          <h2 className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-white">
            {t('faq.title')}
          </h2>
        </div>

        <div className="space-y-4">
          {faqItems.map((_, index) => (
            <div
              key={index}
              className="bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-lg overflow-hidden shadow-lg dark:shadow-none animate-in slide-up duration-500"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-red-600 dark:text-red-500 shrink-0" />
                  <span className="text-zinc-900 dark:text-white font-semibold">
                    {t(`faq.items.${index}.question`)}
                  </span>
                </div>
                <ChevronDown 
                  className={`w-5 h-5 text-zinc-600 dark:text-zinc-400 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`} 
                />
              </button>
              
              {openIndex === index && (
                <div className="overflow-hidden animate-in slide-up duration-300">
                  <div className="px-5 pb-5 pt-0 text-zinc-600 dark:text-zinc-400 leading-relaxed border-t border-zinc-300 dark:border-zinc-700 mt-0 pt-4">
                    {t(`faq.items.${index}.answer`)}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
