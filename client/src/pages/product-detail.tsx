import { useParams, useLocation } from "wouter";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SkipLink } from "@/components/SkipLink";
import { Button } from "@/components/ui/button";
import { smoothScrollToElement } from "@/lib/scroll-utils";
import { 
  ArrowLeft, 
  CheckCircle, 
  Truck, 
  Factory, 
  Layers, 
  Wrench,
  Settings,
  Zap,
  Shield,
  Award,
  TrendingUp,
  Users,
  Phone,
  Mail,
  MapPin
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { productTranslations } from "@/lib/product-translations";
import { OptimizedImage } from "@/components/OptimizedImage";
import { ImageLightbox } from "@/components/ImageLightbox";
import { useCanonical } from "@/hooks/useCanonical";

const productIcons = {
  konveyor: Truck,
  tekstil: Factory,
  celik: Layers,
  ozelMakine: Wrench,
};

const productImages = {
  konveyor: {
    hero: "WhatsApp Image 2026-01-16 at 14.32.03.jpeg",
    gallery: [
      "WhatsApp Image 2026-01-16 at 14.32.03 (1).jpeg",
      "WhatsApp Image 2026-01-16 at 14.32.03 (2).jpeg",
      "WhatsApp Image 2026-01-16 at 14.32.04.jpeg",
      "WhatsApp Image 2026-01-16 at 14.32.03 (3).jpeg",
      "WhatsApp Image 2026-01-16 at 14.32.03 (4).jpeg",
      "WhatsApp Image 2026-01-16 at 14.32.03 (5).jpeg",
    ],
  },
  tekstil: {
    hero: "WhatsApp Image 2026-01-16 at 14.32.04 (3).jpeg",
    gallery: [
      "WhatsApp Image 2026-01-16 at 14.32.04 (4).jpeg",
      "WhatsApp Image 2026-01-16 at 14.32.04 (5).jpeg",
      "WhatsApp Image 2026-01-16 at 14.32.05.jpeg",
      "WhatsApp Image 2026-01-16 at 14.32.04 (6).jpeg",
      "WhatsApp Image 2026-01-16 at 14.32.04 (7).jpeg",
      "WhatsApp Image 2026-01-16 at 14.32.04 (8).jpeg",
    ],
  },
  celik: {
    hero: "WhatsApp Image 2026-01-16 at 14.32.05 (3).jpeg",
    gallery: [
      "WhatsApp Image 2026-01-16 at 14.32.05 (4).jpeg",
      "WhatsApp Image 2026-01-16 at 14.32.06.jpeg",
      "WhatsApp Image 2026-01-16 at 14.32.06 (1).jpeg",
      "WhatsApp Image 2026-01-16 at 14.32.06 (2).jpeg",
      "WhatsApp Image 2026-01-16 at 14.32.06 (3).jpeg",
      "WhatsApp Image 2026-01-16 at 14.32.06 (4).jpeg",
    ],
  },
  ozelMakine: {
    hero: "WhatsApp Image 2026-01-16 at 14.32.06 (5).jpeg",
    gallery: [
      "WhatsApp Image 2026-01-16 at 14.32.07.jpeg",
      "WhatsApp Image 2026-01-16 at 14.32.07 (1).jpeg",
      "WhatsApp Image 2026-01-16 at 14.32.07 (2).jpeg",
      "WhatsApp Image 2026-01-16 at 14.32.07 (3).jpeg",
      "WhatsApp Image 2026-01-16 at 14.32.07 (4).jpeg",
      "WhatsApp Image 2026-01-16 at 14.32.07 (5).jpeg",
    ],
  },
};

type ProductKey = keyof typeof productIcons;

export default function ProductDetail() {
  const params = useParams<{ productKey: string }>();
  const [, setLocation] = useLocation();
  const { language } = useI18n();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  
  const productKey = params.productKey;
  
  // SEO: Set canonical URL for this product page
  useCanonical(`/products/${productKey || ''}`);

  // Validate product key
  useEffect(() => {
    if (!productKey || !(productKey in productIcons)) {
      setLocation("/");
    }
  }, [productKey, setLocation]);

  if (!productKey || !(productKey in productIcons)) {
    return null;
  }

  const key = productKey as ProductKey;
  const IconComponent = productIcons[key];
  const images = productImages[key];
  const translations = productTranslations[language as 'tr' | 'en'][key];
  const heroTranslations = productTranslations[language as 'tr' | 'en'].hero;

  const scrollToContact = () => {
    // Scroll to contact section on current page (Footer)
    smoothScrollToElement('contact');
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setLightboxIndex((prev) => (prev + 1) % images.gallery.length);
  };

  const previousImage = () => {
    setLightboxIndex((prev) => (prev - 1 + images.gallery.length) % images.gallery.length);
  };

  // Prepare gallery images - just filenames, ImageLightbox will add /media/ prefix
  const galleryImages = images.gallery;

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-200 selection:bg-red-900 selection:text-white overflow-x-hidden" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <SkipLink />
      <Navbar />

      {/* HERO SECTION - Full Screen with Parallax Effect */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <OptimizedImage
            src={`/media/${encodeURIComponent(images.hero)}`}
            alt={translations.title}
            className="absolute inset-0 w-full h-full object-cover scale-105 animate-in zoom-in duration-1000"
            loading="eager"
          />
          {/* Gradient Overlay - Stronger for better text contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/95 via-zinc-900/80 to-zinc-900/60 dark:from-black/95 dark:via-black/85 dark:to-black/70" />
          {/* Animated Gradient Accent */}
          <div className="absolute inset-0 bg-gradient-to-t from-red-900/30 via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="relative container mx-auto px-6 z-10 pt-20">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => setLocation("/")}
            className="mb-8 xs:mb-4 text-white hover:text-red-500 hover:bg-white/10 backdrop-blur-sm border border-white/20 hover:border-red-500/50 transition-all group animate-in fade-in slide-in-from-left duration-500"
            aria-label={heroTranslations.backToHome}
          >
            <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" size={20} />
            {heroTranslations.backToHome}
          </Button>

          <div className="max-w-4xl">
            {/* Category Badge */}
            <div className="flex items-center gap-3 xs:gap-2 mb-6 xs:mb-4 animate-in fade-in slide-in-from-left duration-700 delay-100">
              <div className="p-3 xs:p-2 bg-red-600 rounded-lg shadow-[0_0_30px_rgba(220,38,38,0.5)]">
                <IconComponent className="w-8 h-8 xs:w-6 xs:h-6 text-white" />
              </div>
              <span className="text-red-500 dark:text-red-400 font-bold uppercase tracking-[0.2em] text-sm xs:text-xs">
                {translations.subtitle}
              </span>
            </div>

            {/* Main Title */}
            <h1 className="text-5xl xs:text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[0.95] mb-6 xs:mb-4 tracking-tighter animate-in fade-in slide-in-from-left duration-700 delay-200">
              {translations.hero.title}
            </h1>

            {/* Description */}
            <p className="text-xl xs:text-base sm:text-2xl text-zinc-300 dark:text-zinc-300 max-w-2xl mb-8 xs:mb-6 font-light leading-relaxed border-l-4 border-red-500 pl-6 xs:pl-4 animate-in fade-in slide-in-from-left duration-700 delay-300">
              {translations.hero.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 xs:gap-3 animate-in fade-in slide-in-from-left duration-700 delay-400">
              <Button
                onClick={scrollToContact}
                size="lg"
                className="bg-red-600 hover:bg-red-700 text-white font-bold text-base xs:text-sm sm:text-lg px-8 xs:px-6 py-6 xs:py-5 rounded-none skew-x-[-10deg] border-2 border-red-600 hover:shadow-[0_0_30px_rgba(220,38,38,0.5)] transition-all group"
                aria-label="Teklif almak için iletişime geç"
              >
                <span className="skew-x-[10deg] flex items-center gap-2">
                  {heroTranslations.getQuote}
                  <Zap className="w-5 h-5 xs:w-4 xs:h-4 group-hover:rotate-12 transition-transform" />
                </span>
              </Button>
              <Button
                onClick={() => window.open('https://wa.me/905373197281', '_blank')}
                size="lg"
                variant="outline"
                className="border-2 border-white/30 text-white hover:bg-white/10 hover:border-white hover:text-white font-bold text-base xs:text-sm sm:text-lg px-8 xs:px-6 py-6 xs:py-5 rounded-none skew-x-[-10deg] backdrop-blur-sm transition-all group"
                aria-label="WhatsApp ile iletişime geç"
              >
                <span className="skew-x-[10deg] flex items-center gap-2">
                  <Phone className="w-5 h-5 xs:w-4 xs:h-4 group-hover:rotate-12 transition-transform" />
                  WhatsApp
                </span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION - Quick Impact Numbers */}
      <section className="py-16 xs:py-10 bg-gradient-to-r from-red-600 to-red-700 dark:from-red-700 dark:to-red-800 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2" aria-hidden="true" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 xs:gap-4">
            {[
              { icon: Award, value: "15+", label: heroTranslations.stats.yearsExperience },
              { icon: Users, value: "200+", label: heroTranslations.stats.completedProjects },
              { icon: Shield, value: "ISO 9001", label: heroTranslations.stats.qualityCertificate },
              { icon: TrendingUp, value: "%98", label: heroTranslations.stats.customerSatisfaction },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center group animate-in fade-in scale-in duration-500"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 xs:w-12 xs:h-12 bg-white/10 rounded-lg mb-4 xs:mb-2 group-hover:bg-white/20 transition-colors">
                  <stat.icon className="w-8 h-8 xs:w-6 xs:h-6 text-white" />
                </div>
                <div className="text-4xl xs:text-2xl font-black text-white mb-2 xs:mb-1">{stat.value}</div>
                <div className="text-sm xs:text-xs text-white/80 uppercase tracking-wider font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES SECTION - Modern Card Grid */}
      <section className="py-24 xs:py-16 bg-zinc-50 dark:bg-zinc-800 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-zinc-200/30 dark:bg-zinc-700/20 skew-x-12 transform translate-x-20" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 w-64 h-64 border border-zinc-300 dark:border-zinc-600 rounded-full opacity-20 -translate-x-1/2 translate-y-1/2" aria-hidden="true" />
        
        <div className="container mx-auto px-6 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16 xs:mb-10 animate-in fade-in duration-600">
            <p className="text-red-600 dark:text-red-500 font-bold tracking-widest uppercase mb-2 text-sm">
              {heroTranslations.sections.features}
            </p>
            <h2 className="text-4xl xs:text-3xl md:text-5xl font-black text-zinc-900 dark:text-white">
              {translations.features.title}
            </h2>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 xs:gap-4">
            {translations.features.items.map((feature, index) => (
              <div
                key={index}
                className="group relative p-8 xs:p-6 bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-700 dark:to-zinc-800 border-2 border-zinc-200 dark:border-zinc-600 hover:border-red-600 dark:hover:border-red-500 rounded-2xl transition-all duration-300 shadow-lg dark:shadow-none hover:shadow-2xl hover:shadow-red-600/20 hover:-translate-y-2 hover:scale-[1.02] animate-in fade-in slide-up duration-500"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Gradient Accent on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" aria-hidden="true" />
                
                <div className="relative">
                  {/* Icon */}
                  <div className="w-14 h-14 xs:w-12 xs:h-12 bg-red-600/10 dark:bg-red-500/10 rounded-xl flex items-center justify-center mb-6 xs:mb-4 group-hover:bg-red-600 dark:group-hover:bg-red-600 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <CheckCircle className="w-7 h-7 xs:w-6 xs:h-6 text-red-600 dark:text-red-500 group-hover:text-white dark:group-hover:text-white transition-colors" />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl xs:text-lg font-bold text-zinc-900 dark:text-white mb-3 xs:mb-2 group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors">
                    {feature.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed xs:text-sm">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY SECTION - Masonry Style Grid */}
      <section className="py-24 xs:py-16 bg-white dark:bg-zinc-900 relative">
        <div className="container mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16 xs:mb-10 animate-in fade-in duration-600">
            <p className="text-red-600 dark:text-red-500 font-bold tracking-widest uppercase mb-2 text-sm">
              {heroTranslations.sections.gallery}
            </p>
            <h2 className="text-4xl xs:text-3xl md:text-5xl font-black text-zinc-900 dark:text-white">
              {heroTranslations.sections.galleryTitle}
            </h2>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 xs:gap-2">
            {images.gallery.map((image, index) => (
              <div
                key={index}
                onClick={() => openLightbox(index)}
                className="group relative aspect-square overflow-hidden bg-zinc-100 dark:bg-zinc-800 border-2 border-zinc-200 dark:border-zinc-700 hover:border-red-600 dark:hover:border-red-500 rounded-2xl transition-all duration-300 shadow-lg dark:shadow-none hover:shadow-2xl hover:shadow-red-600/20 hover:scale-[1.02] animate-in fade-in scale-in duration-500 cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <OptimizedImage
                  src={`/media/${encodeURIComponent(image)}`}
                  alt={`${translations.title} - ${language === 'tr' ? 'Proje' : 'Project'} ${index + 1}`}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0"
                  loading="lazy"
                />
                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-red-900/80 via-red-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 xs:p-2 rounded-2xl">
                  <span className="text-white font-bold text-sm xs:text-xs uppercase tracking-wider">
                    {heroTranslations.sections.project} {index + 1}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Image Lightbox */}
        {lightboxOpen && (
          <ImageLightbox
            images={galleryImages}
            currentIndex={lightboxIndex}
            onClose={closeLightbox}
            onNext={nextImage}
            onPrevious={previousImage}
          />
        )}
      </section>

      {/* APPLICATIONS SECTION - Two Column Layout */}
      <section className="py-24 xs:py-16 bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-800 dark:to-zinc-900 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-red-600/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" aria-hidden="true" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-600/5 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" aria-hidden="true" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 xs:gap-10 items-center">
            {/* Left: Title and Description */}
            <div className="animate-in fade-in slide-in-from-left duration-700">
              <p className="text-red-600 dark:text-red-500 font-bold tracking-widest uppercase mb-4 text-sm">
                {heroTranslations.sections.applications}
              </p>
              <h2 className="text-4xl xs:text-3xl md:text-5xl font-black text-zinc-900 dark:text-white mb-6 xs:mb-4">
                {translations.applications.title}
              </h2>
              <p className="text-lg xs:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed mb-8 xs:mb-6">
                {heroTranslations.sections.applicationsDescription}
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-2 gap-6 xs:gap-4">
                <div className="p-6 xs:p-4 bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-700 dark:to-zinc-800 border-2 border-red-600/20 dark:border-red-500/20 rounded-2xl hover:border-red-600 hover:shadow-xl hover:shadow-red-600/20 transition-all duration-300 hover:scale-[1.02]">
                  <div className="text-3xl xs:text-2xl font-black text-red-600 dark:text-red-500 mb-2">50+</div>
                  <div className="text-sm xs:text-xs text-zinc-600 dark:text-zinc-300 uppercase tracking-wider font-semibold">
                    {heroTranslations.sections.differentSectors}
                  </div>
                </div>
                <div className="p-6 xs:p-4 bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-700 dark:to-zinc-800 border-2 border-red-600/20 dark:border-red-500/20 rounded-2xl hover:border-red-600 hover:shadow-xl hover:shadow-red-600/20 transition-all duration-300 hover:scale-[1.02]">
                  <div className="text-3xl xs:text-2xl font-black text-red-600 dark:text-red-500 mb-2">200+</div>
                  <div className="text-sm xs:text-xs text-zinc-600 dark:text-zinc-300 uppercase tracking-wider font-semibold">
                    {heroTranslations.sections.successfulProjects}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Applications List */}
            <div className="grid md:grid-cols-2 gap-4 xs:gap-3">
              {translations.applications.items.map((item, index) => (
                <div
                  key={index}
                  className="group flex items-center gap-3 xs:gap-2 p-5 xs:p-4 bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-700 dark:to-zinc-800 border-2 border-zinc-200 dark:border-zinc-600 hover:border-red-600 dark:hover:border-red-600 rounded-2xl transition-all duration-300 shadow-lg dark:shadow-none hover:shadow-xl hover:shadow-red-600/20 hover:-translate-y-1 hover:scale-[1.02] animate-in fade-in slide-in-from-right duration-500"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="shrink-0 w-10 h-10 xs:w-8 xs:h-8 bg-red-600/10 dark:bg-red-500/10 rounded-xl flex items-center justify-center group-hover:bg-red-600 dark:group-hover:bg-red-600 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <CheckCircle className="w-5 h-5 xs:w-4 xs:h-4 text-red-600 dark:text-red-500 group-hover:text-white dark:group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-zinc-900 dark:text-white font-semibold text-sm xs:text-xs group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TECHNICAL SPECS SECTION - Modern Table */}
      <section className="py-24 xs:py-16 bg-white dark:bg-zinc-900 relative">
        <div className="container mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16 xs:mb-10 animate-in fade-in duration-600">
            <p className="text-red-600 dark:text-red-500 font-bold tracking-widest uppercase mb-2 text-sm">
              {heroTranslations.sections.technicalSpecs}
            </p>
            <h2 className="text-4xl xs:text-3xl md:text-5xl font-black text-zinc-900 dark:text-white mb-4">
              {translations.technical.title}
            </h2>
            <p className="text-lg xs:text-base text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto">
              {heroTranslations.sections.technicalSpecsDescription}
            </p>
          </div>

          {/* Specs Grid */}
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xs:gap-3">
              {translations.technical.specs.map((spec, index) => (
                <div
                  key={index}
                  className="group flex flex-col xs:flex-row justify-between xs:items-center p-6 xs:p-4 bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-700 dark:to-zinc-800 border-2 border-zinc-200 dark:border-zinc-600 hover:border-red-600 dark:hover:border-red-500 rounded-2xl transition-all duration-300 shadow-lg dark:shadow-none hover:shadow-xl hover:shadow-red-600/20 hover:scale-[1.02] animate-in fade-in slide-up duration-500"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-center gap-3 xs:gap-2 mb-2 xs:mb-0">
                    <div className="w-2 h-2 bg-red-600 dark:bg-red-500 rounded-full group-hover:scale-150 transition-transform shrink-0" aria-hidden="true" />
                    <span className="font-bold text-zinc-900 dark:text-white text-base xs:text-sm">{spec.label}</span>
                  </div>
                  <span className="text-zinc-600 dark:text-zinc-300 font-semibold text-sm xs:text-xs xs:text-right">{spec.value}</span>
                </div>
              ))}
            </div>

            {/* Additional Info */}
            <div className="mt-8 xs:mt-6 p-6 xs:p-4 bg-gradient-to-r from-red-600/10 to-red-700/10 dark:from-red-700/20 dark:to-red-800/20 border-2 border-red-600/30 dark:border-red-500/30 rounded-2xl animate-in fade-in duration-700 delay-300 hover:border-red-600 hover:shadow-xl hover:shadow-red-600/20 transition-all duration-300">
              <div className="flex items-start gap-4 xs:gap-3">
                <Settings className="w-6 h-6 xs:w-5 xs:h-5 text-red-600 dark:text-red-500 shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-zinc-900 dark:text-white mb-2 xs:mb-1 text-base xs:text-sm">
                    {heroTranslations.sections.customizableTitle}
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-300 text-sm xs:text-xs leading-relaxed">
                    {heroTranslations.sections.customizableDescription}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
