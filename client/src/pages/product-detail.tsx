import { useParams, useLocation } from "wouter";
import { useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle, Truck, Factory, Layers, Wrench } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { productTranslations } from "@/lib/product-translations";
import { OptimizedImage } from "@/components/OptimizedImage";

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
    ],
  },
  tekstil: {
    hero: "WhatsApp Image 2026-01-16 at 14.32.04 (3).jpeg",
    gallery: [
      "WhatsApp Image 2026-01-16 at 14.32.04 (4).jpeg",
      "WhatsApp Image 2026-01-16 at 14.32.04 (5).jpeg",
      "WhatsApp Image 2026-01-16 at 14.32.05.jpeg",
    ],
  },
  celik: {
    hero: "WhatsApp Image 2026-01-16 at 14.32.05 (3).jpeg",
    gallery: [
      "WhatsApp Image 2026-01-16 at 14.32.05 (4).jpeg",
      "WhatsApp Image 2026-01-16 at 14.32.06.jpeg",
      "WhatsApp Image 2026-01-16 at 14.32.06 (1).jpeg",
    ],
  },
  ozelMakine: {
    hero: "WhatsApp Image 2026-01-16 at 14.32.06 (5).jpeg",
    gallery: [
      "WhatsApp Image 2026-01-16 at 14.32.07.jpeg",
      "WhatsApp Image 2026-01-16 at 14.32.07 (1).jpeg",
      "WhatsApp Image 2026-01-16 at 14.32.07 (2).jpeg",
    ],
  },
};

type ProductKey = keyof typeof productIcons;

export default function ProductDetail() {
  const params = useParams<{ productKey: string }>();
  const [, setLocation] = useLocation();
  const { language } = useI18n();
  
  const productKey = params.productKey;

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
    setLocation("/#contact");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-200">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative h-[60vh] min-h-[500px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <OptimizedImage
            src={`/media/${encodeURIComponent(images.hero)}`}
            alt={translations.title}
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative container mx-auto px-6 h-full flex flex-col justify-center">
          <Button
            variant="ghost"
            onClick={() => setLocation("/")}
            className="mb-8 text-white hover:text-red-500 w-fit"
          >
            <ArrowLeft className="mr-2" size={20} />
            {heroTranslations.backToHome}
          </Button>

          <div className="flex items-center gap-3 mb-4 animate-in fade-in slide-in-from-left duration-500">
            <div className="p-3 bg-red-600 rounded-lg">
              <IconComponent className="w-8 h-8 text-white" />
            </div>
            <span className="text-red-500 font-bold uppercase tracking-wider">
              {translations.subtitle}
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 animate-in fade-in slide-in-from-left duration-700 delay-100">
            {translations.hero.title}
          </h1>

          <p className="text-xl text-zinc-300 max-w-2xl mb-8 animate-in fade-in slide-in-from-left duration-700 delay-200">
            {translations.hero.description}
          </p>

          <Button
            onClick={scrollToContact}
            className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-6 text-lg w-fit animate-in fade-in slide-in-from-left duration-700 delay-300"
          >
            {heroTranslations.getQuote}
          </Button>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-20 bg-zinc-50 dark:bg-zinc-800">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-black text-zinc-900 dark:text-white mb-12 text-center">
            {translations.features.title}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {translations.features.items.map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-white dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-700 hover:border-red-600 dark:hover:border-red-500 transition-all group animate-in fade-in slide-up duration-500"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 bg-red-600/10 dark:bg-red-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-red-600 dark:group-hover:bg-red-500 transition-colors">
                  <CheckCircle className="w-6 h-6 text-red-600 dark:text-red-500 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section className="py-20 bg-white dark:bg-zinc-900">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6">
            {images.gallery.map((image, index) => (
              <div
                key={index}
                className="relative h-80 overflow-hidden group animate-in fade-in scale-in duration-500"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <OptimizedImage
                  src={`/media/${encodeURIComponent(image)}`}
                  alt={`${translations.title} - ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* APPLICATIONS SECTION */}
      <section className="py-20 bg-zinc-50 dark:bg-zinc-800">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-black text-zinc-900 dark:text-white mb-12 text-center">
            {translations.applications.title}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {translations.applications.items.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 hover:border-red-600 dark:hover:border-red-500 transition-all animate-in fade-in slide-in-from-left duration-500"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CheckCircle className="w-5 h-5 text-red-600 dark:text-red-500 shrink-0" />
                <span className="text-zinc-900 dark:text-white font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TECHNICAL SPECS SECTION */}
      <section className="py-20 bg-white dark:bg-zinc-900">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-black text-zinc-900 dark:text-white mb-12 text-center">
            {translations.technical.title}
          </h2>

          <div className="max-w-3xl mx-auto">
            {translations.technical.specs.map((spec, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-6 border-b border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors animate-in fade-in slide-in-from-right duration-500"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span className="font-bold text-zinc-900 dark:text-white">{spec.label}</span>
                <span className="text-zinc-600 dark:text-zinc-400">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-red-700 dark:from-red-700 dark:to-red-800">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-black text-white mb-6">
            {language === 'tr' ? 'Projeniz İçin Teklif Alın' : 'Get a Quote for Your Project'}
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            {language === 'tr' 
              ? 'Uzman ekibimiz size en uygun çözümü sunmak için hazır'
              : 'Our expert team is ready to provide you with the most suitable solution'}
          </p>
          <Button
            onClick={scrollToContact}
            size="lg"
            className="bg-white text-red-600 hover:bg-zinc-100 font-bold px-8 py-6 text-lg"
          >
            {heroTranslations.getQuote}
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
