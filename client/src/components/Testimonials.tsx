import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

export function Testimonials() {
  const { t, tArray } = useI18n();
  const testimonials = tArray('testimonials.items');

  return (
    <section className="py-20 bg-zinc-900">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-red-500 font-bold tracking-widest uppercase mb-2">
            {t('testimonials.subtitle')}
          </h3>
          <h2 className="text-3xl md:text-4xl font-black text-white">
            {t('testimonials.title')}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="bg-zinc-800 border border-zinc-700 p-6 rounded-lg relative"
            >
              <Quote className="absolute top-4 right-4 w-8 h-8 text-red-600/20" />
              
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-zinc-300 mb-6 leading-relaxed">
                "{t(`testimonials.items.${index}.quote`)}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-600/20 rounded-full flex items-center justify-center">
                  <span className="text-red-500 font-bold">
                    {t(`testimonials.items.${index}.name`).charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">
                    {t(`testimonials.items.${index}.name`)}
                  </p>
                  <p className="text-zinc-500 text-xs">
                    {t(`testimonials.items.${index}.company`)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
