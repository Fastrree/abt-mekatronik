import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

export function FAQ() {
  const { t, tArray } = useI18n();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const faqItems = tArray('faq.items');

  return (
    <section className="py-20 bg-zinc-800">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-red-500 font-bold tracking-widest uppercase mb-2">
            {t('faq.subtitle')}
          </h3>
          <h2 className="text-3xl md:text-4xl font-black text-white">
            {t('faq.title')}
          </h2>
        </motion.div>

        <div className="space-y-4">
          {faqItems.map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-zinc-900 border border-zinc-700 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-zinc-800/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-red-500 shrink-0" />
                  <span className="text-white font-semibold">
                    {t(`faq.items.${index}.question`)}
                  </span>
                </div>
                <ChevronDown 
                  className={`w-5 h-5 text-zinc-400 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`} 
                />
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 pt-0 text-zinc-400 leading-relaxed border-t border-zinc-700 mt-0 pt-4">
                      {t(`faq.items.${index}.answer`)}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
