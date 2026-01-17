import { motion } from 'framer-motion';
import { Shield, Award, CheckCircle, BadgeCheck } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

const certifications = [
  { icon: Shield, key: 'iso9001' },
  { icon: Award, key: 'tse' },
  { icon: CheckCircle, key: 'ce' },
  { icon: BadgeCheck, key: 'quality' },
];

export function Certifications() {
  const { t } = useI18n();

  return (
    <section className="py-12 bg-zinc-50 dark:bg-zinc-800 border-y border-zinc-200 dark:border-zinc-700">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {certifications.map((cert, index) => {
            const IconComponent = cert.icon;
            return (
              <motion.div
                key={cert.key}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center gap-2 group"
              >
                <div className="w-16 h-16 bg-white dark:bg-zinc-700 border border-zinc-300 dark:border-zinc-600 rounded-lg flex items-center justify-center group-hover:border-red-600/50 group-hover:bg-red-600/10 transition-all shadow-lg dark:shadow-none">
                  <IconComponent className="w-8 h-8 text-zinc-600 dark:text-zinc-400 group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors" />
                </div>
                <span className="text-xs text-zinc-600 dark:text-zinc-500 uppercase tracking-wider font-semibold">
                  {t(`certifications.${cert.key}`)}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
