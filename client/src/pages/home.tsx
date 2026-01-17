import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SkipLink } from "@/components/SkipLink";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, Cog, PenTool, ChevronRight, X, CheckCircle, Truck, Factory, Wrench, Layers } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { OptimizedImage } from "@/components/OptimizedImage";
import { OptimizedVideo } from "@/components/OptimizedVideo";
import { FAQ, Testimonials, ClientLogos, ComponentLoader } from "@/components/LazyComponents";
import { Suspense } from "react";

// Security: Input sanitization - XSS koruması
const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '')
    .trim()
    .slice(0, 1000);
};

// Security: Enhanced validation schema - moved inside component for i18n
// Base schema without messages (messages added dynamically in component)
const createContactSchema = (t: (key: string) => string) => z.object({
  name: z.string()
    .min(2, t('validation.nameMin'))
    .max(100, t('validation.nameMax'))
    .transform(sanitizeInput),
  email: z.string()
    .email(t('validation.emailInvalid'))
    .max(254, t('validation.emailMax'))
    .transform(val => val.toLowerCase().trim()),
  message: z.string()
    .min(10, t('validation.messageMin'))
    .max(2000, t('validation.messageMax'))
    .transform(sanitizeInput),
});

// Product media assets (text content comes from i18n)
const productDetails = {
  konveyor: {
    icon: Truck,
    heroImage: "WhatsApp Image 2026-01-16 at 14.32.03.jpeg",
    gallery: [
      "WhatsApp Image 2026-01-16 at 14.32.03 (1).jpeg",
      "WhatsApp Image 2026-01-16 at 14.32.03 (2).jpeg",
      "WhatsApp Image 2026-01-16 at 14.32.04.jpeg",
    ],
  },
  tekstil: {
    icon: Factory,
    heroImage: "WhatsApp Image 2026-01-16 at 14.32.04 (3).jpeg",
    gallery: [
      "WhatsApp Image 2026-01-16 at 14.32.04 (4).jpeg",
      "WhatsApp Image 2026-01-16 at 14.32.04 (5).jpeg",
      "WhatsApp Image 2026-01-16 at 14.32.05.jpeg",
    ],
  },
  celik: {
    icon: Layers,
    heroImage: "WhatsApp Image 2026-01-16 at 14.32.05 (3).jpeg",
    gallery: [
      "WhatsApp Image 2026-01-16 at 14.32.05 (4).jpeg",
      "WhatsApp Image 2026-01-16 at 14.32.06.jpeg",
      "WhatsApp Image 2026-01-16 at 14.32.06 (1).jpeg",
    ],
  },
  ozelMakine: {
    icon: Wrench,
    heroImage: "WhatsApp Image 2026-01-16 at 14.32.06 (5).jpeg",
    gallery: [
      "WhatsApp Image 2026-01-16 at 14.32.07.jpeg",
      "WhatsApp Image 2026-01-16 at 14.32.07 (1).jpeg",
      "WhatsApp Image 2026-01-16 at 14.32.07 (2).jpeg",
    ],
  }
};

type ProductKey = keyof typeof productDetails;

export default function Home() {
  const { toast } = useToast();
  const { t, tArray } = useI18n();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductKey | null>(null);

  // Create schema with translated messages
  const contactSchema = createContactSchema(t);

  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(_data: z.infer<typeof contactSchema>) {
    setIsSubmitting(true);
    setTimeout(() => {
      toast({
        title: t('contact.successTitle'),
        description: t('contact.successDesc'),
      });
      form.reset();
      setIsSubmitting(false);
    }, 500);
  }

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const openProductModal = (productKey: ProductKey) => {
    const cardElement = document.getElementById(`product-card-${productKey}`);
    
    if (cardElement) {
      const rect = cardElement.getBoundingClientRect();
      const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;
      
      if (isVisible) {
        // Kart zaten görünüyorsa direkt modal aç
        setSelectedProduct(productKey);
        document.body.style.overflow = 'hidden';
      } else {
        // Kart görünmüyorsa scroll yap, sonra modal aç
        cardElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => {
          setSelectedProduct(productKey);
          document.body.style.overflow = 'hidden';
        }, 350);
      }
    } else {
      setSelectedProduct(productKey);
      document.body.style.overflow = 'hidden';
    }
  };

  const closeProductModal = () => {
    setSelectedProduct(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-200 selection:bg-red-900 selection:text-white overflow-x-hidden transition-colors duration-300">
      <SkipLink />
      <Navbar onOpenProduct={openProductModal} />

      {/* PRODUCT DETAIL MODAL */}
      <AnimatePresence mode="wait">
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 dark:bg-black/85"
            onClick={closeProductModal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-modal-title"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-600 rounded-lg shadow-2xl will-change-transform"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeProductModal}
                className="absolute top-4 right-4 z-10 p-2 bg-zinc-100 dark:bg-zinc-700 hover:bg-red-600 rounded-full transition-colors"
                aria-label={t('products.close')}
              >
                <X size={24} className="text-zinc-900 dark:text-white" />
              </button>

              {(() => {
                const product = productDetails[selectedProduct];
                const IconComponent = product.icon;
                return (
                  <>
                    {/* Hero Image */}
                    <div className="relative h-64 md:h-80 overflow-hidden bg-zinc-100 dark:bg-zinc-700">
                      <OptimizedImage 
                        src={`/media/${encodeURIComponent(product.heroImage)}`}
                        alt={t(`productItems.${selectedProduct}.title`)}
                        className="w-full h-full object-cover"
                        loading="eager"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent dark:from-zinc-800 dark:via-zinc-800/50 dark:to-transparent" />
                      <div className="absolute bottom-6 left-6 right-6">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 bg-red-600 rounded-lg" aria-hidden="true">
                            <IconComponent className="w-6 h-6 text-white" />
                          </div>
                          <span className="text-red-600 dark:text-red-400 font-semibold uppercase tracking-wider text-sm">
                            {t(`productItems.${selectedProduct}.modalSubtitle`)}
                          </span>
                        </div>
                        <h2 id="product-modal-title" className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-white">
                          {t(`productItems.${selectedProduct}.title`)}
                        </h2>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 md:p-8">
                      {/* Description */}
                      <div className="prose prose-invert dark:prose-invert prose-slate max-w-none mb-8">
                        {t(`productItems.${selectedProduct}.description`).split('\n\n').map((paragraph, idx) => {
                          if (paragraph.startsWith('**')) {
                            const title = paragraph.match(/\*\*(.*?)\*\*/)?.[1];
                            const content = paragraph.replace(/\*\*.*?\*\*\n?/, '');
                            return (
                              <div key={idx} className="mb-4">
                                <h3 className="text-lg font-bold text-red-600 dark:text-red-500 mb-2">{title}</h3>
                                <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed whitespace-pre-line">{content}</p>
                              </div>
                            );
                          }
                          return <p key={idx} className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4">{paragraph}</p>;
                        })}
                      </div>

                      {/* Gallery */}
                      <div className="mb-8">
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">{t('products.gallery')}</h3>
                        <div className="grid grid-cols-3 gap-3">
                          {product.gallery.map((img, idx) => (
                            <div key={idx} className="aspect-square overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-600">
                              <OptimizedImage
                                src={`/media/${encodeURIComponent(img)}`}
                                alt={`${t(`productItems.${selectedProduct}.title`)} ${idx + 1}`}
                                className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
                                loading="lazy"
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Features & Why Us */}
                      <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-zinc-50 dark:bg-zinc-700/50 p-6 rounded-lg border border-zinc-200 dark:border-zinc-600">
                          <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
                            <Settings className="w-5 h-5 text-red-600 dark:text-red-500" />
                            {t('products.features')}
                          </h3>
                          <ul className="space-y-2">
                            {tArray(`productItems.${selectedProduct}.features`).map((feature, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-zinc-700 dark:text-zinc-300">
                                <CheckCircle className="w-4 h-4 text-green-500 mt-1 shrink-0" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-red-600/10 p-6 rounded-lg border border-red-600/30">
                          <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-red-600 dark:text-red-500" />
                            {t('products.whyUs')}
                          </h3>
                          <ul className="space-y-2">
                            {tArray(`productItems.${selectedProduct}.whyUs`).map((reason, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-zinc-700 dark:text-zinc-300">
                                <ChevronRight className="w-4 h-4 text-red-600 dark:text-red-500 mt-1 shrink-0" />
                                <span>{reason}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* CTA */}
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button
                          onClick={() => {
                            closeProductModal();
                            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-6"
                        >
                          {t('products.getQuote')}
                        </Button>
                        <Button
                          variant="outline"
                          className="flex-1 border-zinc-400 dark:border-zinc-500 text-zinc-900 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700 py-6"
                          onClick={() => window.open('https://wa.me/905373197281', '_blank')}
                        >
                          {t('products.whatsappContact')}
                        </Button>
                      </div>
                    </div>
                  </>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <section 
        id="hero" 
        className="relative h-screen flex items-center justify-center overflow-hidden"
        aria-labelledby="hero-title"
      >
        <div className="absolute inset-0 z-0">
          <video 
            autoPlay 
            muted 
            loop 
            playsInline
            className="w-full h-full object-cover"
            poster="/media/img1.jpeg"
            aria-label="ABT Mekatronik üretim tesisi video arka planı"
          >
            <source src="/media/video1.mp4" type="video/mp4" />
            Tarayıcınız video etiketini desteklemiyor.
          </video>
          {/* Light theme: NO blur, just subtle overlay. Dark theme: stronger overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-transparent dark:from-zinc-900/90 dark:via-zinc-900/70 dark:to-zinc-900/40" aria-hidden="true" />
        </div>

        <div className="container mx-auto px-6 relative z-10 pt-20">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="inline-block mb-4 px-3 py-1 bg-red-600/20 border border-red-600/50 text-red-600 dark:text-red-500 font-bold text-xs tracking-widest uppercase rounded-sm backdrop-blur-sm">
              {t('hero.badge')}
            </div>
            <h1 id="hero-title" className="text-5xl md:text-7xl lg:text-8xl font-black text-zinc-900 dark:text-white leading-[0.9] mb-8 tracking-tighter">
              {t('hero.title1')} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-600 to-zinc-400 dark:from-gray-100 dark:to-gray-500">{t('hero.title2')}</span> <br />
              <span className="text-red-600">{t('hero.title3')}</span> {t('hero.title4')}
            </h1>
            <p className="text-xl md:text-2xl text-zinc-700 dark:text-zinc-300 max-w-2xl mb-10 font-light leading-relaxed border-l-4 border-red-600 pl-6">
              {t('hero.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4" role="group" aria-label="Ana eylem butonları">
              <Button 
                size="lg" 
                className="bg-red-600 hover:bg-red-700 text-white font-bold text-lg px-8 py-6 rounded-none skew-x-[-10deg] border-2 border-red-600 hover:shadow-[0_0_30px_rgba(220,38,38,0.5)] transition-all"
                onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                aria-label="Çözümlerimizi keşfedin"
              >
                <span className="skew-x-[10deg]">{t('hero.solutions')}</span>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-zinc-400 dark:border-zinc-400 text-zinc-900 dark:text-zinc-200 hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-700 dark:hover:text-white font-bold text-lg px-8 py-6 rounded-none skew-x-[-10deg] backdrop-blur-sm"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                aria-label="Projelerimizi görüntüleyin"
              >
                <span className="skew-x-[10deg]">{t('hero.projects')}</span>
              </Button>
            </div>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-zinc-900/50 dark:text-white/50 flex flex-col items-center gap-2"
          aria-hidden="true"
        >
          <span className="text-[10px] uppercase tracking-[0.3em]">{t('hero.scroll')}</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-red-600 to-transparent"></div>
        </motion.div>
      </section>

      {/* PRODUCTS SECTION - 4 Ürün Grubu */}
      <section 
        id="products" 
        className="py-24 bg-zinc-50 dark:bg-zinc-900 relative"
        aria-labelledby="products-title"
      >
        <div className="container mx-auto px-6">
          <motion.div 
            {...fadeIn}
            className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
          >
            <div>
              <p className="text-red-600 dark:text-red-500 font-bold tracking-widest uppercase mb-2">{t('products.subtitle')}</p>
              <h2 id="products-title" className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white">{t('products.title')}</h2>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 max-w-md text-right md:text-left leading-relaxed">
              {t('products.description')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" role="list" aria-label="Ürün kategorileri">
            {/* Konveyör Sistemleri */}
            <motion.article 
              id="product-card-konveyor"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              onClick={() => openProductModal('konveyor')}
              className="group relative h-[450px] overflow-hidden bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 hover:border-red-600/50 transition-colors cursor-pointer shadow-lg dark:shadow-none"
              role="listitem"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  openProductModal('konveyor');
                }
              }}
              aria-label={`${t('productItems.konveyor.title')} - Detayları görüntülemek için tıklayın`}
            >
              <div className="absolute inset-0 bg-white/20 dark:bg-zinc-800/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
              <OptimizedImage 
                src={`/media/${encodeURIComponent("WhatsApp Image 2026-01-16 at 14.32.03.jpeg")}`}
                alt={t('productItems.konveyor.title')} 
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-50/60 to-transparent dark:from-zinc-900 dark:via-zinc-900/60 dark:to-transparent opacity-90 z-20" />
              
              <div className="absolute bottom-0 left-0 p-6 z-30 w-full pointer-events-none">
                <div className="flex items-center gap-2 mb-3">
                  <Truck className="w-5 h-5 text-red-600 dark:text-red-500" />
                  <span className="text-xs text-red-600 dark:text-red-400 uppercase tracking-wider font-semibold">{t('productItems.konveyor.subtitle')}</span>
                </div>
                <div className="w-10 h-1 bg-red-600 mb-3 transition-all duration-300 group-hover:w-16"></div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2 group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors">{t('productItems.konveyor.title')}</h3>
                <p className="text-zinc-700 dark:text-zinc-400 text-sm mb-4 line-clamp-2">{t('productItems.konveyor.shortDesc')}</p>
                <span className="inline-flex items-center text-zinc-900 dark:text-white font-semibold text-sm uppercase tracking-wider group-hover:translate-x-2 transition-transform">
                  {t('products.viewDetails')} <ChevronRight className="ml-1 w-4 h-4 text-red-600 dark:text-red-500" />
                </span>
              </div>
            </motion.article>

            {/* Tekstil Makinaları */}
            <motion.article 
              id="product-card-tekstil"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              onClick={() => openProductModal('tekstil')}
              className="group relative h-[450px] overflow-hidden bg-white dark:bg-zinc-800 border-t-4 border-red-600 cursor-pointer shadow-lg dark:shadow-none"
              role="listitem"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  openProductModal('tekstil');
                }
              }}
              aria-label={`${t('productItems.tekstil.title')} - Detayları görüntülemek için tıklayın`}
            >
              <div className="absolute inset-0 bg-white/20 dark:bg-zinc-800/20 group-hover:bg-transparent transition-colors duration-500 z-10" aria-hidden="true" />
              <OptimizedImage 
                src={`/media/${encodeURIComponent("WhatsApp Image 2026-01-16 at 14.32.04 (3).jpeg")}`}
                alt={`${t('productItems.tekstil.title')} - ${t('productItems.tekstil.shortDesc')}`} 
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-50/60 to-transparent dark:from-zinc-900 dark:via-zinc-900/60 dark:to-transparent opacity-90 z-20" aria-hidden="true" />
              
              <div className="absolute bottom-0 left-0 p-6 z-30 w-full pointer-events-none">
                <div className="flex items-center gap-2 mb-3">
                  <Factory className="w-5 h-5 text-red-600 dark:text-red-500" aria-hidden="true" />
                  <span className="text-xs text-red-600 dark:text-red-400 uppercase tracking-wider font-semibold">{t('productItems.tekstil.subtitle')}</span>
                </div>
                <div className="w-10 h-1 bg-red-600 mb-3 transition-all duration-300 group-hover:w-16" aria-hidden="true"></div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2 group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors">{t('productItems.tekstil.title')}</h3>
                <p className="text-zinc-700 dark:text-zinc-400 text-sm mb-4 line-clamp-2">{t('productItems.tekstil.shortDesc')}</p>
                <span className="inline-flex items-center text-zinc-900 dark:text-white font-semibold text-sm uppercase tracking-wider group-hover:translate-x-2 transition-transform">
                  {t('products.viewDetails')} <ChevronRight className="ml-1 w-4 h-4 text-red-600 dark:text-red-500" aria-hidden="true" />
                </span>
              </div>
            </motion.article>

            {/* Çelik Konstrüksiyon */}
            <motion.article 
              id="product-card-celik"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              onClick={() => openProductModal('celik')}
              className="group relative h-[450px] overflow-hidden bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 hover:border-red-600/50 transition-colors cursor-pointer shadow-lg dark:shadow-none"
              role="listitem"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  openProductModal('celik');
                }
              }}
              aria-label={`${t('productItems.celik.title')} - Detayları görüntülemek için tıklayın`}
            >
              <div className="absolute inset-0 bg-white/20 dark:bg-zinc-800/20 group-hover:bg-transparent transition-colors duration-500 z-10" aria-hidden="true" />
              <OptimizedImage 
                src={`/media/${encodeURIComponent("WhatsApp Image 2026-01-16 at 14.32.05 (3).jpeg")}`}
                alt={`${t('productItems.celik.title')} - ${t('productItems.celik.shortDesc')}`} 
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-50/60 to-transparent dark:from-zinc-900 dark:via-zinc-900/60 dark:to-transparent opacity-90 z-20" aria-hidden="true" />
              
              <div className="absolute bottom-0 left-0 p-6 z-30 w-full pointer-events-none">
                <div className="flex items-center gap-2 mb-3">
                  <Layers className="w-5 h-5 text-red-600 dark:text-red-500" aria-hidden="true" />
                  <span className="text-xs text-red-600 dark:text-red-400 uppercase tracking-wider font-semibold">{t('productItems.celik.subtitle')}</span>
                </div>
                <div className="w-10 h-1 bg-red-600 mb-3 transition-all duration-300 group-hover:w-16" aria-hidden="true"></div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2 group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors">{t('productItems.celik.title')}</h3>
                <p className="text-zinc-700 dark:text-zinc-400 text-sm mb-4 line-clamp-2">{t('productItems.celik.shortDesc')}</p>
                <span className="inline-flex items-center text-zinc-900 dark:text-white font-semibold text-sm uppercase tracking-wider group-hover:translate-x-2 transition-transform">
                  {t('products.viewDetails')} <ChevronRight className="ml-1 w-4 h-4 text-red-600 dark:text-red-500" aria-hidden="true" />
                </span>
              </div>
            </motion.article>

            {/* Özel Makine Tasarımı */}
            <motion.article 
              id="product-card-ozelMakine"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              onClick={() => openProductModal('ozelMakine')}
              className="group relative h-[450px] overflow-hidden bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 hover:border-red-600/50 transition-colors cursor-pointer shadow-lg dark:shadow-none"
              role="listitem"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  openProductModal('ozelMakine');
                }
              }}
              aria-label={`${t('productItems.ozelMakine.title')} - Detayları görüntülemek için tıklayın`}
            >
              <div className="absolute inset-0 bg-white/20 dark:bg-zinc-800/20 group-hover:bg-transparent transition-colors duration-500 z-10" aria-hidden="true" />
              <OptimizedImage 
                src={`/media/${encodeURIComponent("WhatsApp Image 2026-01-16 at 14.32.06 (5).jpeg")}`}
                alt={`${t('productItems.ozelMakine.title')} - ${t('productItems.ozelMakine.shortDesc')}`} 
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-50/60 to-transparent dark:from-zinc-900 dark:via-zinc-900/60 dark:to-transparent opacity-90 z-20" aria-hidden="true" />
              
              <div className="absolute bottom-0 left-0 p-6 z-30 w-full pointer-events-none">
                <div className="flex items-center gap-2 mb-3">
                  <Wrench className="w-5 h-5 text-red-600 dark:text-red-500" aria-hidden="true" />
                  <span className="text-xs text-red-600 dark:text-red-400 uppercase tracking-wider font-semibold">{t('productItems.ozelMakine.subtitle')}</span>
                </div>
                <div className="w-10 h-1 bg-red-600 mb-3 transition-all duration-300 group-hover:w-16" aria-hidden="true"></div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2 group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors">{t('productItems.ozelMakine.title')}</h3>
                <p className="text-zinc-700 dark:text-zinc-400 text-sm mb-4 line-clamp-2">{t('productItems.ozelMakine.shortDesc')}</p>
                <span className="inline-flex items-center text-zinc-900 dark:text-white font-semibold text-sm uppercase tracking-wider group-hover:translate-x-2 transition-transform">
                  {t('products.viewDetails')} <ChevronRight className="ml-1 w-4 h-4 text-red-600 dark:text-red-500" aria-hidden="true" />
                </span>
              </div>
            </motion.article>
          </div>
        </div>
      </section>

      {/* ENGINEERING / ABOUT SECTION */}
      <section id="engineering" className="py-24 bg-zinc-50 dark:bg-zinc-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-zinc-200/30 dark:bg-zinc-700/20 skew-x-12 transform translate-x-20"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 border border-zinc-300 dark:border-zinc-600 rounded-full opacity-20 -translate-x-1/2 translate-y-1/2"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeIn}>
              <h3 className="text-red-600 dark:text-red-500 font-bold tracking-widest uppercase mb-4">{t('engineering.subtitle')}</h3>
              <h2 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white mb-8">{t('engineering.title')} <br />{t('engineering.title2')}</h2>
              
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-red-600/10 border border-red-600/30 flex items-center justify-center shrink-0">
                    <Settings className="text-red-600 dark:text-red-500" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">{t('engineering.customDesign')}</h4>
                    <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {t('engineering.customDesignDesc')}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-red-600/10 border border-red-600/30 flex items-center justify-center shrink-0">
                    <Cog className="text-red-600 dark:text-red-500" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">{t('engineering.precision')}</h4>
                    <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {t('engineering.precisionDesc')}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-red-600/10 border border-red-600/30 flex items-center justify-center shrink-0">
                    <PenTool className="text-red-600 dark:text-red-500" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">{t('engineering.turnkey')}</h4>
                    <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {t('engineering.turnkeyDesc')}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
               <motion.div 
                 initial={{ opacity: 0, scale: 0.9 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 transition={{ duration: 0.5 }}
                 className="space-y-4 mt-8"
               >
                 <div className="bg-zinc-700 p-2 rounded-lg border border-zinc-600">
                    <OptimizedImage src={`/media/${encodeURIComponent("WhatsApp Image 2026-01-16 at 14.32.07 (3).jpeg")}`} alt="Engineering Site" className="w-full h-48 object-cover rounded shadow-lg opacity-80 hover:opacity-100 transition-opacity" loading="lazy" />
                 </div>
                 <div className="bg-zinc-700 p-4 rounded-lg border border-zinc-600 text-center">
                    <span className="block text-3xl font-black text-white">15+</span>
                    <span className="text-xs uppercase tracking-wider text-zinc-400">{t('engineering.experience')}</span>
                 </div>
               </motion.div>
               <motion.div 
                 initial={{ opacity: 0, scale: 0.9 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 transition={{ duration: 0.5, delay: 0.2 }}
                 className="space-y-4"
               >
                 <div className="bg-red-600 p-4 rounded-lg text-center shadow-[0_0_30px_rgba(220,38,38,0.3)]">
                    <span className="block text-3xl font-black text-white">200+</span>
                    <span className="text-xs uppercase tracking-wider text-white/80">{t('engineering.completedProjects')}</span>
                 </div>
                 <div className="bg-zinc-700 p-2 rounded-lg border border-zinc-600">
                    <OptimizedImage src={`/media/${encodeURIComponent("WhatsApp Image 2026-01-16 at 14.32.08.jpeg")}`} alt="Automation Detail" className="w-full h-64 object-cover rounded shadow-lg opacity-80 hover:opacity-100 transition-opacity" loading="lazy" />
                 </div>
               </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS / GALLERY SECTION */}
      <section id="projects" className="py-24 bg-white dark:bg-zinc-900">
        <div className="container mx-auto px-6">
          <motion.div 
            {...fadeIn}
            className="text-center mb-16"
          >
            <h3 className="text-red-600 dark:text-red-500 font-bold tracking-widest uppercase mb-2">{t('projectsSection.subtitle')}</h3>
            <h2 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white">{t('projectsSection.title')}</h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              "WhatsApp Image 2026-01-16 at 14.32.03 (3).jpeg",
              "WhatsApp Image 2026-01-16 at 14.32.03 (4).jpeg",
              "WhatsApp Image 2026-01-16 at 14.32.04 (1).jpeg",
              "WhatsApp Image 2026-01-16 at 14.32.04 (2).jpeg",
              "WhatsApp Image 2026-01-16 at 14.32.05 (1).jpeg",
              "WhatsApp Image 2026-01-16 at 14.32.05 (2).jpeg",
              "WhatsApp Image 2026-01-16 at 14.32.06 (2).jpeg",
              "WhatsApp Image 2026-01-16 at 14.32.06 (3).jpeg",
              "WhatsApp Image 2026-01-16 at 14.32.06 (4).jpeg",
              "WhatsApp Image 2026-01-16 at 14.32.07 (4).jpeg",
              "WhatsApp Image 2026-01-16 at 14.32.07 (5).jpeg",
              "WhatsApp Image 2026-01-16 at 14.32.08 (1).jpeg",
            ].map((img, index) => (
              <motion.div
                key={img}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group relative aspect-square overflow-hidden bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-lg dark:shadow-none"
              >
                <OptimizedImage 
                  src={`/media/${encodeURIComponent(img)}`}
                  alt="ABT Mekatronik Proje" 
                  loading="lazy"
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent dark:from-zinc-900/60 dark:via-transparent dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </div>

          {/* Video Showcase */}
          <motion.div 
            {...fadeIn}
            className="mt-16"
          >
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-8 text-center">{t('projectsSection.videoGallery')}</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                "WhatsApp Video 2026-01-16 at 14.32.04.mp4",
                "WhatsApp Video 2026-01-16 at 14.32.05.mp4",
                "WhatsApp Video 2026-01-16 at 14.32.07.mp4",
                "WhatsApp Video 2026-01-16 at 14.32.08.mp4",
              ].map((video, idx) => (
                <div key={video} className="relative aspect-video bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg overflow-hidden group shadow-lg dark:shadow-none">
                  <OptimizedVideo 
                    src={`/media/${encodeURIComponent(video)}`}
                    poster={`/media/${encodeURIComponent(`WhatsApp Image 2026-01-16 at 14.32.0${4 + idx}.jpeg`)}`}
                    className="w-full h-full"
                    controls
                    muted
                    aria-label={`ABT Mekatronik proje videosu ${idx + 1}`}
                  />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-24 bg-white dark:bg-zinc-900">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div {...fadeIn}>
              <h3 className="text-red-500 dark:text-red-500 font-bold tracking-widest uppercase mb-4">{t('contact.subtitle')}</h3>
              <h2 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white mb-8">{t('contact.title')} <br />{t('contact.title2')}</h2>
              <p className="text-zinc-600 dark:text-zinc-400 mb-8 max-w-lg">
                {t('contact.description')}
              </p>
              
              <div className="bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 p-8 rounded-lg relative overflow-hidden shadow-lg dark:shadow-none">
                <div className="absolute top-0 right-0 w-24 h-24 bg-red-600/10 rounded-bl-full -mr-4 -mt-4"></div>
                <div className="relative z-10">
                    <h4 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">{t('contact.whatsappTitle')}</h4>
                    <Button 
                      className="bg-[#25D366] hover:bg-[#20bd5a] text-white w-full py-6 font-bold text-lg"
                      onClick={() => window.open('https://wa.me/905373197281', '_blank')}
                    >
                        {t('contact.whatsappButton')}
                    </Button>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-slate-50 dark:bg-zinc-800 p-8 md:p-10 border border-slate-200 dark:border-zinc-700 shadow-xl dark:shadow-2xl"
            >
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6 border-b border-slate-200 dark:border-zinc-700 pb-4">{t('contact.formTitle')}</h3>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-zinc-700 dark:text-zinc-400">{t('contact.name')}</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder={t('contact.namePlaceholder')} 
                            {...field} 
                            className="bg-white dark:bg-zinc-900 border-slate-300 dark:border-zinc-700 focus:border-red-600 h-12"
                            maxLength={100}
                            autoComplete="name"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-zinc-700 dark:text-zinc-400">{t('contact.email')}</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder={t('contact.emailPlaceholder')} 
                            type="email"
                            {...field} 
                            className="bg-white dark:bg-zinc-900 border-slate-300 dark:border-zinc-700 focus:border-red-600 h-12"
                            maxLength={254}
                            autoComplete="email"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-zinc-700 dark:text-zinc-400">{t('contact.message')}</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder={t('contact.messagePlaceholder')} 
                            {...field} 
                            className="bg-white dark:bg-zinc-900 border-slate-300 dark:border-zinc-700 focus:border-red-600 min-h-[120px]"
                            maxLength={2000}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit" 
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold h-12 uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? t('contact.submitting') : t('contact.submit')}
                  </Button>
                </form>
              </Form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq">
        <Suspense fallback={<ComponentLoader />}>
          <FAQ />
        </Suspense>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section id="testimonials">
        <Suspense fallback={<ComponentLoader />}>
          <Testimonials />
        </Suspense>
      </section>

      {/* CLIENT LOGOS / PARTNERS SECTION */}
      <section id="partners" className="scroll-mt-24">
        <Suspense fallback={<ComponentLoader />}>
          <ClientLogos />
        </Suspense>
      </section>

      <Footer onOpenProduct={openProductModal} />
    </div>
  );
}
