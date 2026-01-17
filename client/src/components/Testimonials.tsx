import { Star, Quote } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

export function Testimonials() {
  const { t, tArray } = useI18n();
  const testimonials = tArray('testimonials.items');

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
              className="bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 p-6 rounded-lg relative shadow-lg dark:shadow-none animate-in slide-up duration-600"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <Quote className="absolute top-4 right-4 w-8 h-8 text-red-600/20" />
              
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-zinc-700 dark:text-zinc-300 mb-6 leading-relaxed">
                "{t(`testimonials.items.${index}.quote`)}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-600/20 rounded-full flex items-center justify-center">
                  <span className="text-red-600 dark:text-red-500 font-bold">
                    {t(`testimonials.items.${index}.name`).charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-zinc-900 dark:text-white font-semibold text-sm">
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
}
