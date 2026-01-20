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
              <div className="relative bg-white dark:bg-zinc-800 p-8 border border-zinc-200 dark:border-zinc-700 shadow-2xl">
                <OptimizedImage 
                  src="/media/WhatsApp Image 2026-01-16 at 14.32.07 (3).jpeg"
                  alt="ABT Mekatronik üretim süreci"
                  className="w-full h-96 object-cover mb-6"
                  loading="lazy"
                />
                <div className="grid grid-cols-1 xs:grid-cols-3 gap-4 text-center">
                  <div className="bg-zinc-50 dark:bg-zinc-700 p-4 xs:p-3 rounded-lg">
                    <span className="block text-3xl xs:text-2xl font-black text-red-600 dark:text-red-500 mb-1">15+</span>
                    <span className="text-xs xs:text-[10px] uppercase tracking-wider text-zinc-600 dark:text-zinc-400 leading-tight">{t('about.yearsExperience')}</span>
                  </div>
                  <div className="bg-zinc-50 dark:bg-zinc-700 p-4 xs:p-3 rounded-lg">
                    <span className="block text-3xl xs:text-2xl font-black text-red-600 dark:text-red-500 mb-1">200+</span>
                    <span className="text-xs xs:text-[10px] uppercase tracking-wider text-zinc-600 dark:text-zinc-400 leading-tight">{t('about.completedProjects')}</span>
                  </div>
                  <div className="bg-zinc-50 dark:bg-zinc-700 p-4 xs:p-3 rounded-lg">
                    <span className="block text-3xl xs:text-2xl font-black text-red-600 dark:text-red-500 mb-1">50+</span>
                    <span className="text-xs xs:text-[10px] uppercase tracking-wider text-zinc-600 dark:text-zinc-400 leading-tight">{t('about.happyClients')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES SECTION - Gradient Cards */}
      <section className="py-24 bg-white dark:bg-zinc-800">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-in fade-in duration-600">
            <h3 className="text-red-600 dark:text-red-500 font-bold tracking-widest uppercase mb-2">{t('about.valuesSubtitle')}</h3>
            <h2 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white">{t('about.valuesTitle')}</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Quality */}
            <div className="group relative overflow-hidden bg-gradient-to-br from-red-600 to-red-800 p-8 text-white hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" aria-hidden="true" />
              <Award className="w-12 h-12 mb-4 relative z-10" />
              <h3 className="text-xl font-bold mb-2 relative z-10">{t('about.valueQuality')}</h3>
              <p className="text-sm text-white/90 relative z-10">{t('about.valueQualityDesc')}</p>
            </div>

            {/* Innovation */}
            <div className="group relative overflow-hidden bg-gradient-to-br from-zinc-700 to-zinc-900 p-8 text-white hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" aria-hidden="true" />
              <Zap className="w-12 h-12 mb-4 relative z-10" />
              <h3 className="text-xl font-bold mb-2 relative z-10">{t('about.valueInnovation')}</h3>
              <p className="text-sm text-white/90 relative z-10">{t('about.valueInnovationDesc')}</p>
            </div>

            {/* Customer Focus */}
            <div className="group relative overflow-hidden bg-gradient-to-br from-blue-600 to-blue-800 p-8 text-white hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" aria-hidden="true" />
              <Target className="w-12 h-12 mb-4 relative z-10" />
              <h3 className="text-xl font-bold mb-2 relative z-10">{t('about.valueCustomer')}</h3>
              <p className="text-sm text-white/90 relative z-10">{t('about.valueCustomerDesc')}</p>
            </div>

            {/* Teamwork */}
            <div className="group relative overflow-hidden bg-gradient-to-br from-green-600 to-green-800 p-8 text-white hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" aria-hidden="true" />
              <Users className="w-12 h-12 mb-4 relative z-10" />
              <h3 className="text-xl font-bold mb-2 relative z-10">{t('about.valueTeamwork')}</h3>
              <p className="text-sm text-white/90 relative z-10">{t('about.valueTeamworkDesc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* TIMELINE SECTION */}
      <section className="py-24 bg-zinc-50 dark:bg-zinc-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-in fade-in duration-600">
            <h3 className="text-red-600 dark:text-red-500 font-bold tracking-widest uppercase mb-2">{t('about.timelineSubtitle')}</h3>
            <h2 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white">{t('about.timelineTitle')}</h2>
          </div>

          <div className="max-w-4xl mx-auto">
            {tArray('about.timelineItems').map((item: any, index: number) => (
              <div 
                key={index}
                className="relative pl-8 pb-12 border-l-4 border-red-600 dark:border-red-500 last:pb-0 animate-in slide-in-from-left duration-600"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute -left-3 top-0 w-6 h-6 bg-red-600 dark:bg-red-500 rounded-full border-4 border-white dark:border-zinc-900" />
                <div className="bg-white dark:bg-zinc-800 p-6 border border-zinc-200 dark:border-zinc-700 shadow-lg hover:shadow-xl transition-shadow">
                  <span className="inline-block px-3 py-1 bg-red-600/10 text-red-600 dark:text-red-500 text-sm font-bold mb-2">{item.year}</span>
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">{item.title}</h3>
                  <p className="text-zinc-600 dark:text-zinc-400">{item.description}</p>
                </div>
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
                className="bg-zinc-50 dark:bg-zinc-700 p-8 border border-zinc-200 dark:border-zinc-600 hover:border-red-600 dark:hover:border-red-500 transition-all hover:-translate-y-2 hover:shadow-xl"
              >
                <CheckCircle className="w-12 h-12 text-red-600 dark:text-red-500 mb-4" />
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
                className="bg-white/10 backdrop-blur-sm p-6 border border-white/20 hover:bg-white/20 transition-all"
              >
                <TrendingUp className="w-8 h-8 mb-4" />
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
