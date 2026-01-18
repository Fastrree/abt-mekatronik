import { memo } from 'react';
import { useI18n } from '@/lib/i18n';

// Client logos - First row (left to right scroll)
const clientsRow1 = [
  { name: 'Tekstil A.Ş.', industry: 'Tekstil' },
  { name: 'Demir Çelik Ltd.', industry: 'Çelik' },
  { name: 'Lojistik Plus', industry: 'Lojistik' },
  { name: 'Fabrika Pro', industry: 'Üretim' },
  { name: 'Makine Sanayi', industry: 'Makine' },
  { name: 'Endüstri Grup', industry: 'Endüstri' },
  { name: 'Otomasyon A.Ş.', industry: 'Otomasyon' },
  { name: 'Konveyör Ltd.', industry: 'Konveyör' },
  { name: 'Metal Sanayi', industry: 'Metal' },
  { name: 'Tekstil Makine', industry: 'Tekstil' },
];

// Client logos - Second row (right to left scroll)
const clientsRow2 = [
  { name: 'Otomasyon Ltd.', industry: 'Otomasyon' },
  { name: 'Konveyör Pro', industry: 'Konveyör' },
  { name: 'Metal İşleme', industry: 'Metal' },
  { name: 'Tekstil Makine', industry: 'Tekstil' },
  { name: 'Endüstri Plus', industry: 'Endüstri' },
  { name: 'Üretim Grup', industry: 'Üretim' },
  { name: 'Çelik Yapı', industry: 'Çelik' },
  { name: 'Lojistik Pro', industry: 'Lojistik' },
  { name: 'Fabrika Grup', industry: 'Üretim' },
  { name: 'Makine Ltd.', industry: 'Makine' },
];

interface LogoItemProps {
  client: { name: string; industry: string };
}

function LogoItem({ client }: LogoItemProps) {
  return (
    <div className="flex-shrink-0 flex flex-col items-center justify-center px-8 py-6 bg-white/80 dark:bg-zinc-800/50 border border-zinc-300 dark:border-zinc-700/50 rounded-lg hover:border-red-600/50 transition-all duration-300 group min-w-[180px] shadow-lg dark:shadow-none">
      {/* Placeholder logo - replace with actual images */}
      <div className="w-20 h-20 bg-zinc-100 dark:bg-zinc-700/50 rounded-lg flex items-center justify-center mb-3 group-hover:bg-red-600/20 transition-all duration-300 group-hover:scale-110">
        <span className="text-3xl font-black text-zinc-700 dark:text-zinc-500 group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors">
          {client.name.charAt(0)}
        </span>
      </div>
      <span className="text-xs text-zinc-600 dark:text-zinc-500 uppercase tracking-wider group-hover:text-zinc-700 dark:group-hover:text-zinc-400 transition-colors">
        {client.industry}
      </span>
    </div>
  );
}

export const ClientLogos = memo(function ClientLogos() {
  const { t, language } = useI18n();
  const isRTL = language === 'ar';

  return (
    <section className="relative py-16 bg-zinc-50 dark:bg-zinc-800/50 border-y border-zinc-200 dark:border-zinc-700 overflow-hidden">
      <div className="container mx-auto px-6 mb-12">
        <div className="text-center animate-in slide-in-from-bottom duration-500">
          <h3 className="text-zinc-600 dark:text-zinc-400 text-sm uppercase tracking-widest font-semibold">
            {t('clients.title')}
          </h3>
        </div>
      </div>

      {/* First Row - Left to Right - Full Width */}
      <div className="relative mb-6 group/row">
        {/* Tunnel fade effect - Left */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-zinc-50 via-zinc-50/50 to-transparent dark:from-zinc-800/50 dark:via-zinc-800/30 dark:to-transparent z-10 pointer-events-none" />
        
        {/* Tunnel fade effect - Right */}
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-zinc-50 via-zinc-50/50 to-transparent dark:from-zinc-800/50 dark:via-zinc-800/30 dark:to-transparent z-10 pointer-events-none" />
        
        <div className={`flex gap-4 group-hover/row:pause-animation will-change-transform ${isRTL ? 'animate-scroll-right' : 'animate-scroll-left'}`}>
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
          {/* Fourth set for ultra-smooth loop */}
          {clientsRow1.map((client, index) => (
            <LogoItem key={`row1-set4-${index}`} client={client} />
          ))}
          {/* Fifth set for no gaps */}
          {clientsRow1.map((client, index) => (
            <LogoItem key={`row1-set5-${index}`} client={client} />
          ))}
        </div>
      </div>

      {/* Second Row - Right to Left - Full Width */}
      <div className="relative group/row">
        {/* Tunnel fade effect - Left */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-zinc-50 via-zinc-50/50 to-transparent dark:from-zinc-800/50 dark:via-zinc-800/30 dark:to-transparent z-10 pointer-events-none" />
        
        {/* Tunnel fade effect - Right */}
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-zinc-50 via-zinc-50/50 to-transparent dark:from-zinc-800/50 dark:via-zinc-800/30 dark:to-transparent z-10 pointer-events-none" />
        
        <div className={`flex gap-4 group-hover/row:pause-animation will-change-transform ${isRTL ? 'animate-scroll-left' : 'animate-scroll-right'}`}>
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
          {/* Fourth set for ultra-smooth loop */}
          {clientsRow2.map((client, index) => (
            <LogoItem key={`row2-set4-${index}`} client={client} />
          ))}
          {/* Fifth set for no gaps */}
          {clientsRow2.map((client, index) => (
            <LogoItem key={`row2-set5-${index}`} client={client} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-20%);
          }
        }

        @keyframes scroll-right {
          0% {
            transform: translateX(-20%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .animate-scroll-left {
          animation: scroll-left 10s linear infinite;
          will-change: transform;
        }

        .animate-scroll-right {
          animation: scroll-right 10s linear infinite;
          will-change: transform;
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
});
