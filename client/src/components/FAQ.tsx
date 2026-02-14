import { useState, useCallback, useMemo } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { memo } from 'react';

const FAQItem = memo(function FAQItem({ 
  index, 
  isOpen, 
  onToggle 
}: { 
  index: number; 
  isOpen: boolean; 
  onToggle: () => void;
}) {
  const { t } = useI18n();
  
  return (
    <div
      className="bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-700 dark:to-zinc-800 border-2 border-zinc-200 dark:border-zinc-600 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:scale-[1.02] hover:border-red-600 dark:hover:border-red-500 transition-all duration-300 will-change-transform"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-white/30 dark:hover:bg-black/20 transition-all duration-300"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          <HelpCircle className="w-6 h-6 text-red-600 dark:text-red-500 shrink-0" aria-hidden="true" />
          <span className="text-zinc-900 dark:text-white font-semibold text-lg">
            {t(`faq.items.${index}.question`)}
          </span>
        </div>
        <ChevronDown 
          className={`w-6 h-6 text-zinc-600 dark:text-zinc-400 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
          aria-hidden="true"
        />
      </button>
      
      {isOpen && (
        <div className="overflow-hidden">
          <div className="px-6 pb-6 pt-4 text-zinc-700 dark:text-zinc-300 leading-relaxed border-t-2 border-zinc-300 dark:border-zinc-600">
            {t(`faq.items.${index}.answer`)}
          </div>
        </div>
      )}
    </div>
  );
});

export const FAQ = memo(function FAQ() {
  const { t, tArray } = useI18n();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const faqItems = tArray('faq.items');

  const handleToggle = useCallback((index: number) => {
    setOpenIndex(prev => prev === index ? null : index);
  }, []);

  const items = useMemo(() => 
    faqItems.map((_, index) => (
      <FAQItem
        key={index}
        index={index}
        isOpen={openIndex === index}
        onToggle={() => handleToggle(index)}
      />
    )),
    [faqItems, openIndex, handleToggle]
  );

  return (
    <section className="py-20 bg-zinc-50 dark:bg-zinc-800">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-12">
          <h3 className="text-red-600 dark:text-red-500 font-bold tracking-widest uppercase mb-2">
            {t('faq.subtitle')}
          </h3>
          <h2 className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-white">
            {t('faq.title')}
          </h2>
        </div>

        <div className="space-y-4">
          {items}
        </div>
      </div>
    </section>
  );
});
