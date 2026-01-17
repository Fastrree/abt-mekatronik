import { motion } from 'framer-motion';
import { useI18n } from '@/lib/i18n';

// Client logos - First row (left to right scroll)
const clientsRow1 = [
  { name: 'Tekstil A.Ş.', industry: 'Tekstil' },
  { name: 'Demir Çelik Ltd.', industry: 'Çelik' },
  { name: 'Lojistik Plus', industry: 'Lojistik' },
  { name: 'Fabrika Pro', industry: 'Üretim' },
  { name: 'Makine Sanayi', industry: 'Makine' },
  { name: 'Endüstri Grup', industry: 'Endüstri' },
];

// Client logos - Second row (right to left scroll)
const clientsRow2 = [
  { name: 'Otomasyon Ltd.', industry: 'Otomasyon' },
  { name: 'Konveyör Pro', industry: 'Konveyör' },
  { name: 'Metal İşleme', industry: 'Metal' },
  { name: 'Tekstil Makine', industry: 'Tekstil' },
  { name: 'Endüstri Plus', industry: 'Endüstri' },
  { name: 'Üretim Grup', industry: 'Üretim' },
];

interface LogoItemProps {
  client: { name: string; industry: string };
}

function LogoItem({ client }: LogoItemProps) {
  return (
    <div className="flex-shrink-0 flex flex-col items-center justify-center px-8 py-6 bg-zinc-800/50 border border-zinc-700/50 rounded-lg hover:border-red-600/50 transition-all duration-300 group min-w-[180px]">
      {/* Placeholder logo - replace with actual images */}
      <div className="w-20 h-20 bg-zinc-700/50 rounded-lg flex items-center justify-center mb-3 group-hover:bg-red-600/20 transition-all duration-300 group-hover:scale-110">
        <span className="text-3xl font-black text-zinc-500 group-hover:text-red-500 transition-colors">
          {client.name.charAt(0)}
        </span>
      </div>
      <span className="text-xs text-zinc-500 uppercase tracking-wider group-hover:text-zinc-400 transition-colors">
        {client.industry}
      </span>
    </div>
  );
}

export function ClientLogos() {
  const { t } = useI18n();

  return (
    <section className="py-16 bg-zinc-800/50 border-y border-zinc-700 overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-zinc-400 text-sm uppercase tracking-widest font-semibold">
            {t('clients.title')}
          </h3>
        </motion.div>

        {/* First Row - Left to Right */}
        <div className="relative mb-6 group/row">
          <div className="flex gap-6 animate-scroll-left group-hover/row:pause-animation">
            {/* First set */}
            {clientsRow1.map((client, index) => (
              <LogoItem key={`row1-set1-${index}`} client={client} />
            ))}
            {/* Duplicate for seamless loop */}
            {clientsRow1.map((client, index) => (
              <LogoItem key={`row1-set2-${index}`} client={client} />
            ))}
            {/* Triple for extra smoothness */}
            {clientsRow1.map((client, index) => (
              <LogoItem key={`row1-set3-${index}`} client={client} />
            ))}
          </div>
        </div>

        {/* Second Row - Right to Left */}
        <div className="relative group/row">
          <div className="flex gap-6 animate-scroll-right group-hover/row:pause-animation">
            {/* First set */}
            {clientsRow2.map((client, index) => (
              <LogoItem key={`row2-set1-${index}`} client={client} />
            ))}
            {/* Duplicate for seamless loop */}
            {clientsRow2.map((client, index) => (
              <LogoItem key={`row2-set2-${index}`} client={client} />
            ))}
            {/* Triple for extra smoothness */}
            {clientsRow2.map((client, index) => (
              <LogoItem key={`row2-set3-${index}`} client={client} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        @keyframes scroll-right {
          0% {
            transform: translateX(-33.333%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .animate-scroll-left {
          animation: scroll-left 30s linear infinite;
        }

        .animate-scroll-right {
          animation: scroll-right 30s linear infinite;
        }

        .pause-animation {
          animation-play-state: paused !important;
        }

        /* Respect user's motion preferences */
        @media (prefers-reduced-motion: reduce) {
          .animate-scroll-left,
          .animate-scroll-right {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
