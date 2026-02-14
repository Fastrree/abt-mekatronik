import { Star, Quote } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { memo } from 'react';

export const Testimonials = memo(function Testimonials() {
  const { t, tArray, language } = useI18n();
  const testimonials = tArray('testimonials.items');
  const isRTL = language === 'ar';

  return (
    <section className="py-20 bg-white dark:bg-zinc-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 animate-in fade-in duration-600">
          <h3 className="text-red-600 dark:text-red-500 font-bold tracking-widest uppercase mb-2">
            {t('testimonials.subtitle')}
          </h3>
          <h2 className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-white">
            {t('testimonials.title')}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((_, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-700 dark:to-zinc-800 border-2 border-zinc-200 dark:border-zinc-600 p-6 rounded-2xl relative shadow-lg hover:shadow-xl hover:scale-[1.02] hover:border-red-600 dark:hover:border-red-500 transition-all duration-300"
            >
              <Quote className={`absolute top-4 w-8 h-8 text-red-600/20 ${isRTL ? 'left-4' : 'right-4'}`} />
              
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-zinc-700 dark:text-zinc-300 mb-6 leading-relaxed text-sm">
                "{t(`testimonials.items.${index}.quote`)}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-red-600/20 rounded-full flex items-center justify-center">
                  <span className="text-red-600 dark:text-red-500 font-bold text-lg">
                    {t(`testimonials.items.${index}.name`).charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-zinc-900 dark:text-white font-semibold">
                    {t(`testimonials.items.${index}.name`)}
                  </p>
                  <p className="text-zinc-600 dark:text-zinc-500 text-xs">
                    {t(`testimonials.items.${index}.company`)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});
