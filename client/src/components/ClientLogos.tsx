import { memo } from 'react';
import { useI18n } from '@/lib/i18n';

// Client logos - First row (left to right scroll)
const clientsRow1 = [
  { name: 'Tekstil A.Ş.', industryKey: 'tekstil' },
  { name: 'Demir Çelik Ltd.', industryKey: 'celik' },
  { name: 'Lojistik Plus', industryKey: 'lojistik' },
  { name: 'Fabrika Pro', industryKey: 'uretim' },
  { name: 'Makine Sanayi', industryKey: 'makine' },
  { name: 'Endüstri Grup', industryKey: 'endustri' },
  { name: 'Otomasyon A.Ş.', industryKey: 'otomasyon' },
  { name: 'Konveyör Ltd.', industryKey: 'konveyor' },
  { name: 'Metal Sanayi', industryKey: 'metal' },
  { name: 'Tekstil Makine', industryKey: 'tekstil' },
];

// Client logos - Second row (right to left scroll)
const clientsRow2 = [
  { name: 'Otomasyon Ltd.', industryKey: 'otomasyon' },
  { name: 'Konveyör Pro', industryKey: 'konveyor' },
  { name: 'Metal İşleme', industryKey: 'metal' },
  { name: 'Tekstil Makine', industryKey: 'tekstil' },
  { name: 'Endüstri Plus', industryKey: 'endustri' },
  { name: 'Üretim Grup', industryKey: 'uretim' },
  { name: 'Çelik Yapı', industryKey: 'celik' },
  { name: 'Lojistik Pro', industryKey: 'lojistik' },
  { name: 'Fabrika Grup', industryKey: 'uretim' },
  { name: 'Makine Ltd.', industryKey: 'makine' },
];

interface LogoItemProps {
  client: { name: string; industryKey: string };
}

function LogoItem({ client }: LogoItemProps) {
  const { t } = useI18n();
  
  return (
    <div className="flex-shrink-0 flex flex-col items-center justify-center px-8 py-6 bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-700 dark:to-zinc-800 border-2 border-zinc-200 dark:border-zinc-600 rounded-2xl hover:border-red-600 hover:scale-[1.02] hover:shadow-xl hover:shadow-red-600/20 transition-all duration-300 group min-w-[180px]">
      {/* Placeholder logo - replace with actual images */}
      <div className="w-20 h-20 bg-white dark:bg-zinc-600 rounded-xl flex items-center justify-center mb-3 group-hover:bg-red-50 dark:group-hover:bg-red-900/20 transition-all duration-300 group-hover:scale-110 shadow-md">
        <span className="text-3xl font-black text-zinc-700 dark:text-zinc-300 group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors">
          {client.name.charAt(0)}
        </span>
      </div>
      <span className="text-xs text-zinc-600 dark:text-zinc-400 uppercase tracking-wider font-semibold group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors">
        {t(`clients.industries.${client.industryKey}`)}
      </span>
    </div>
  );
}

export const ClientLogos = memo(function ClientLogos() {
  const { t } = useI18n();

  // Show only first 8 partners on home page (teaser)
  const featuredClients = clientsRow1.slice(0, 8);

  return (
    <section className="relative py-16 bg-zinc-50 dark:bg-zinc-800/50 border-y border-zinc-200 dark:border-zinc-700 overflow-hidden" dir="ltr">
      {/* Title Section - With Container */}
      <div className="container mx-auto px-6 mb-12">
        <div className="text-center animate-in slide-in-from-bottom duration-500">
          <h3 className="text-zinc-600 dark:text-zinc-400 text-sm uppercase tracking-widest font-semibold mb-2">
            {t('clients.title')}
          </h3>
          <p className="text-zinc-500 dark:text-zinc-500 text-xs">
            Türkiye'nin önde gelen firmaları ile çalışıyoruz
          </p>
        </div>
      </div>

      {/* Infinite Scrolling Partners - Full Width */}
      <div className="w-full mb-12">
        {/* Gradient Overlays for smooth fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-zinc-50 dark:from-zinc-800/50 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-zinc-50 dark:from-zinc-800/50 to-transparent z-10 pointer-events-none" />
        
        {/* Scrolling Container */}
        <div className="flex gap-6 animate-scroll-left">
          {/* First set of logos */}
          {featuredClients.map((client, index) => (
            <div 
              key={`first-${index}`}
              className="flex-shrink-0 flex flex-col items-center justify-center px-6 py-6 bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-700 dark:to-zinc-800 border-2 border-zinc-200 dark:border-zinc-600 rounded-2xl hover:border-red-600 hover:scale-[1.02] hover:shadow-xl hover:shadow-red-600/20 transition-all duration-300 group min-w-[180px]"
            >
              <div className="w-20 h-20 bg-white dark:bg-zinc-600 rounded-xl flex items-center justify-center mb-3 group-hover:bg-red-50 dark:group-hover:bg-red-900/20 transition-all duration-300 group-hover:scale-110 shadow-md">
                <span className="text-3xl font-black text-zinc-700 dark:text-zinc-300 group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors">
                  {client.name.charAt(0)}
                </span>
              </div>
              <span className="text-xs text-zinc-600 dark:text-zinc-400 uppercase tracking-wider font-semibold group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors text-center">
                {t(`clients.industries.${client.industryKey}`)}
              </span>
            </div>
          ))}
          
          {/* Duplicate set for seamless loop */}
          {featuredClients.map((client, index) => (
            <div 
              key={`second-${index}`}
              className="flex-shrink-0 flex flex-col items-center justify-center px-6 py-6 bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-700 dark:to-zinc-800 border-2 border-zinc-200 dark:border-zinc-600 rounded-2xl hover:border-red-600 hover:scale-[1.02] hover:shadow-xl hover:shadow-red-600/20 transition-all duration-300 group min-w-[180px]"
            >
              <div className="w-20 h-20 bg-white dark:bg-zinc-600 rounded-xl flex items-center justify-center mb-3 group-hover:bg-red-50 dark:group-hover:bg-red-900/20 transition-all duration-300 group-hover:scale-110 shadow-md">
                <span className="text-3xl font-black text-zinc-700 dark:text-zinc-300 group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors">
                  {client.name.charAt(0)}
                </span>
              </div>
              <span className="text-xs text-zinc-600 dark:text-zinc-400 uppercase tracking-wider font-semibold group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors text-center">
                {t(`clients.industries.${client.industryKey}`)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Button - With Container */}
      <div className="container mx-auto px-6">
        <div className="text-center animate-in fade-in duration-600" style={{ animationDelay: '400ms' }}>
          <a 
            href="/exports#ortaklarimiz"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold text-base rounded-xl transition-all shadow-xl hover:shadow-2xl hover:scale-105 group"
          >
            <span>{t('clients.viewAll')}</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>

      <style>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll-left {
          animation: scroll-left 30s linear infinite;
        }
        
        .animate-scroll-left:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
});
