import { motion } from 'framer-motion';
import { useI18n } from '@/lib/i18n';

// Placeholder logos - replace with actual client logos
const clients = [
  { name: 'Tekstil A.Ş.', industry: 'Tekstil' },
  { name: 'Demir Çelik Ltd.', industry: 'Çelik' },
  { name: 'Lojistik Plus', industry: 'Lojistik' },
  { name: 'Fabrika Pro', industry: 'Üretim' },
  { name: 'Makine Sanayi', industry: 'Makine' },
  { name: 'Endüstri Grup', industry: 'Endüstri' },
];

export function ClientLogos() {
  const { t } = useI18n();

  return (
    <section className="py-16 bg-zinc-800/50 border-y border-zinc-700">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h3 className="text-zinc-400 text-sm uppercase tracking-widest font-semibold">
            {t('clients.title')}
          </h3>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {clients.map((client, index) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center justify-center p-6 bg-zinc-800 border border-zinc-700 rounded-lg hover:border-red-600/50 transition-colors group"
            >
              {/* Placeholder logo - replace with actual images */}
              <div className="w-16 h-16 bg-zinc-700 rounded-lg flex items-center justify-center mb-3 group-hover:bg-red-600/20 transition-colors">
                <span className="text-2xl font-black text-zinc-500 group-hover:text-red-500 transition-colors">
                  {client.name.charAt(0)}
                </span>
              </div>
              <span className="text-xs text-zinc-500 uppercase tracking-wider">
                {client.industry}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
