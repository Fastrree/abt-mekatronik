import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SkipLink } from "@/components/SkipLink";
import { useI18n } from "@/lib/i18n";
import { OptimizedImage } from "@/components/OptimizedImage";
import { Award, Target, Users, Zap, CheckCircle, TrendingUp } from "lucide-react";
import { useState, useCallback } from "react";
import { aboutTranslations } from "@/lib/about-translations";

type ProductKey = 'konveyor' | 'tekstil' | 'celik' | 'ozelMakine';

export default function About() {
  const { language } = useI18n();

  // Custom translation function for about page
  const t = (key: string): string => {
    const aboutData = aboutTranslations[language as keyof typeof aboutTranslations] || aboutTranslations.en;
    const keys = key.replace('about.', '').split('.');
    let value: any = aboutData;
    for (const k of keys) {
      value = value?.[k];
    }
    return (typeof value === 'string' ? value : key);
  };

  // Custom array translation for about page
  const tArray = (key: string): any[] => {
    const aboutData = aboutTranslations[language as keyof typeof aboutTranslations] || aboutTranslations.en;
    const keys = key.replace('about.', '').split('.');
    let value: any = aboutData;
    for (const k of keys) {
      value = value?.[k];
    }
    return (Array.isArray(value) ? value : []);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-200 selection:bg-red-900 selection:text-white overflow-x-hidden" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <SkipLink />
      <Navbar />

      {/* HERO SECTION - Parallax Effect */}
      <section 
        id="about-hero" 
        className="relative h-[70vh] flex items-center justify-center overflow-hidden"
        aria-labelledby="about-hero-title"
      >
        <div className="absolute inset-0 z-0">
          <OptimizedImage 
            src="/media/img1.jpeg"
            alt="ABT Mekatronik fabrika görünümü"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: 'center 40%' }}
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/90 via-zinc-900/70 to-zinc-900/50 dark:from-zinc-900/95 dark:via-zinc-900/85 dark:to-zinc-900/70" aria-hidden="true" />
        </div>

        <div className="container mx-auto px-6 relative z-10 pt-20">
          <div className="max-w-4xl animate-in fade-in-left duration-800">
            <div className="inline-block mb-4 px-3 py-1 bg-red-600/20 border border-red-600/50 text-red-500 font-bold text-xs tracking-widest uppercase rounded-sm backdrop-blur-sm">
              {t('about.badge')}
            </div>
            <h1 id="about-hero-title" className="text-4xl xs:text-3xl sm:text-6xl md:text-7xl font-black text-white leading-[0.9] mb-6 tracking-tighter">
              {t('about.heroTitle1')} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">{t('about.heroTitle2')}</span>
            </h1>
            <p className="text-lg xs:text-base sm:text-xl text-gray-200 max-w-2xl font-light leading-relaxed border-l-4 border-red-500 pl-6">
              {t('about.heroDescription')}
            </p>
          </div>
        </div>
      </section>

      {/* COMPANY STORY SECTION */}
      <section className="py-24 bg-zinc-50 dark:bg-zinc-900">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-in fade-in duration-600">
              <h3 className="text-red-600 dark:text-red-500 font-bold tracking-widest uppercase mb-4">{t('about.storySubtitle')}</h3>
              <h2 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white mb-8">{t('about.storyTitle')}</h2>
              <div className="space-y-6 text-zinc-600 dark:text-zinc-400 leading-relaxed">
                <p>{t('about.storyParagraph1')}</p>
                <p>{t('about.storyParagraph2')}</p>
                <p>{t('about.storyParagraph3')}</p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -top-8 -left-8 w-64 h-64 bg-red-600/10 rounded-full blur-3xl" aria-hidden="true" />
              <div className="relative bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-700 dark:to-zinc-800 p-8 border-2 border-zinc-200 dark:border-zinc-600 rounded-2xl shadow-2xl hover:shadow-red-600/20 hover:border-red-600 transition-all duration-300">
                <OptimizedImage 
                  src="/media/WhatsApp Image 2026-01-16 at 14.32.07 (3).jpeg"
                  alt="ABT Mekatronik üretim süreci"
                  className="w-full h-96 object-cover mb-6 rounded-xl"
                  loading="lazy"
                />
                
                {/* Stats Cards */}
                <div className="grid grid-cols-1 xs:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-700 dark:to-zinc-800 p-6 border-2 border-zinc-200 dark:border-zinc-600 rounded-2xl text-center hover:border-red-600 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                    <div className="text-4xl font-black text-red-600 dark:text-red-500 mb-2">15+</div>
                    <div className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">{t('about.yearsExperience')}</div>
                  </div>
                  <div className="bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-700 dark:to-zinc-800 p-6 border-2 border-zinc-200 dark:border-zinc-600 rounded-2xl text-center hover:border-red-600 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                    <div className="text-4xl font-black text-red-600 dark:text-red-500 mb-2">200+</div>
                    <div className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">{t('about.completedProjects')}</div>
                  </div>
                  <div className="bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-700 dark:to-zinc-800 p-6 border-2 border-zinc-200 dark:border-zinc-600 rounded-2xl text-center hover:border-red-600 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                    <div className="text-4xl font-black text-red-600 dark:text-red-500 mb-2">50+</div>
                    <div className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">{t('about.happyClients')}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes grid-move {
          0% { transform: translateY(0); }
          100% { transform: translateY(20px); }
        }
      `}</style>

      {/* VALUES SECTION - Gradient Cards */}
      <section className="py-24 bg-white dark:bg-zinc-800">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-in fade-in duration-600">
            <h3 className="text-red-600 dark:text-red-500 font-bold tracking-widest uppercase mb-2">{t('about.valuesSubtitle')}</h3>
            <h2 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white">{t('about.valuesTitle')}</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Quality */}
            <div className="group relative overflow-hidden bg-gradient-to-br from-red-600 to-red-800 p-8 text-white rounded-2xl hover:shadow-2xl hover:shadow-red-600/30 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" aria-hidden="true" />
              <Award className="w-12 h-12 mb-4 relative z-10 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-2 relative z-10">{t('about.valueQuality')}</h3>
              <p className="text-sm text-white/90 relative z-10">{t('about.valueQualityDesc')}</p>
            </div>

            {/* Innovation */}
            <div className="group relative overflow-hidden bg-gradient-to-br from-zinc-700 to-zinc-900 p-8 text-white rounded-2xl hover:shadow-2xl hover:shadow-zinc-600/30 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" aria-hidden="true" />
              <Zap className="w-12 h-12 mb-4 relative z-10 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-2 relative z-10">{t('about.valueInnovation')}</h3>
              <p className="text-sm text-white/90 relative z-10">{t('about.valueInnovationDesc')}</p>
            </div>

            {/* Customer Focus */}
            <div className="group relative overflow-hidden bg-gradient-to-br from-blue-600 to-blue-800 p-8 text-white rounded-2xl hover:shadow-2xl hover:shadow-blue-600/30 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" aria-hidden="true" />
              <Target className="w-12 h-12 mb-4 relative z-10 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-2 relative z-10">{t('about.valueCustomer')}</h3>
              <p className="text-sm text-white/90 relative z-10">{t('about.valueCustomerDesc')}</p>
            </div>

            {/* Teamwork */}
            <div className="group relative overflow-hidden bg-gradient-to-br from-green-600 to-green-800 p-8 text-white rounded-2xl hover:shadow-2xl hover:shadow-green-600/30 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" aria-hidden="true" />
              <Users className="w-12 h-12 mb-4 relative z-10 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-2 relative z-10">{t('about.valueTeamwork')}</h3>
              <p className="text-sm text-white/90 relative z-10">{t('about.valueTeamworkDesc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* TIMELINE SECTION - ULTRA MODERN */}
      <section className="py-24 bg-zinc-50 dark:bg-zinc-900 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16 animate-in fade-in duration-600">
            <h3 className="text-red-600 dark:text-red-500 font-bold tracking-widest uppercase mb-2">{t('about.timelineSubtitle')}</h3>
            <h2 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white">{t('about.timelineTitle')}</h2>
          </div>

          <div className="max-w-4xl mx-auto">
            {tArray('about.timelineItems').map((item: any, index: number) => (
              <div 
                key={index}
                className="group relative pl-12 pb-16 border-l-4 border-red-600 dark:border-red-500 last:pb-0 animate-in slide-in-from-left duration-600 hover:border-red-400 transition-colors"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Animated Timeline Dot */}
                <div className="absolute -left-4 top-0 w-8 h-8 bg-gradient-to-br from-red-500 to-red-700 rounded-full border-4 border-white dark:border-zinc-900 shadow-lg group-hover:scale-125 group-hover:shadow-red-500/50 transition-all duration-300">
                  <div className="absolute inset-0 bg-red-400 rounded-full animate-ping opacity-75" />
                </div>

                {/* Connecting Line Glow */}
                <div className="absolute left-0 top-8 bottom-0 w-1 bg-gradient-to-b from-red-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Modern Card */}
                <div className="relative bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-700 dark:to-zinc-800 p-8 border-2 border-zinc-200 dark:border-zinc-600 rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-red-600/20 hover:border-red-600 hover:scale-[1.03] hover:-translate-y-2 transition-all duration-500 overflow-hidden">
                  {/* Holographic Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  
                  {/* Animated Grid Background */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{ 
                      backgroundImage: 'linear-gradient(rgba(220,38,38,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(220,38,38,0.3) 1px, transparent 1px)',
                      backgroundSize: '30px 30px',
                      animation: 'grid-move 20s linear infinite'
                    }} />
                  </div>

                  {/* Year Badge */}
                  <div className="relative inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white text-sm font-black mb-4 rounded-xl shadow-lg group-hover:shadow-red-600/50 group-hover:scale-110 transition-all duration-300">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    {item.year}
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                  </div>

                  {/* Title with Gradient */}
                  <h3 className="relative text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-zinc-900 to-red-600 dark:from-white dark:to-red-400 mb-3 group-hover:scale-105 transition-transform duration-300">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="relative text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Corner Accents */}
                  <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-red-400/30 rounded-tr-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-red-400/30 rounded-bl-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Floating Particles */}
                <div className="absolute -right-4 top-1/2 w-3 h-3 bg-red-400 rounded-full blur-sm opacity-0 group-hover:opacity-60 group-hover:animate-bounce transition-opacity duration-300" />
                <div className="absolute -right-8 top-1/3 w-2 h-2 bg-red-300 rounded-full blur-sm opacity-0 group-hover:opacity-40 group-hover:animate-ping transition-opacity duration-300" style={{ animationDelay: '0.2s' }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS SECTION */}
      <section className="py-24 bg-white dark:bg-zinc-800">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-in fade-in duration-600">
            <h3 className="text-red-600 dark:text-red-500 font-bold tracking-widest uppercase mb-2">{t('about.certificationsSubtitle')}</h3>
            <h2 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white">{t('about.certificationsTitle')}</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {tArray('about.certifications').map((cert: any, index: number) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-700 dark:to-zinc-800 p-8 border-2 border-zinc-200 dark:border-zinc-600 rounded-2xl hover:border-red-600 hover:shadow-xl hover:shadow-red-600/20 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] group"
              >
                <CheckCircle className="w-12 h-12 text-red-600 dark:text-red-500 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">{cert.name}</h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm">{cert.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US SECTION */}
      <section className="py-24 bg-gradient-to-br from-red-600 to-red-800 text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6">{t('about.whyChooseTitle')}</h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">{t('about.whyChooseDescription')}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tArray('about.whyChooseReasons').map((reason: any, index: number) => (
              <div 
                key={index}
                className="bg-white/10 backdrop-blur-sm p-6 border-2 border-white/20 rounded-2xl hover:bg-white/20 hover:border-white/40 hover:scale-[1.02] hover:shadow-xl transition-all duration-300 group"
              >
                <TrendingUp className="w-8 h-8 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-bold mb-2">{reason.title}</h3>
                <p className="text-sm text-white/90">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
