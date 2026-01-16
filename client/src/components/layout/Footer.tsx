import { MapPin, Phone, Mail, Linkedin, Instagram, Facebook, Truck, Factory, Layers, Wrench } from "lucide-react";
import { useI18n } from "@/lib/i18n";

type ProductKey = 'konveyor' | 'tekstil' | 'celik' | 'ozelMakine';

interface FooterProps {
  onOpenProduct?: (productKey: ProductKey) => void;
}

export function Footer({ onOpenProduct }: FooterProps) {
  const { t } = useI18n();
  
  const productLinks: { key: ProductKey; icon: typeof Truck }[] = [
    { key: "konveyor", icon: Truck },
    { key: "tekstil", icon: Factory },
    { key: "celik", icon: Layers },
    { key: "ozelMakine", icon: Wrench },
  ];

  const handleProductClick = (key: ProductKey) => {
    if (onOpenProduct) {
      onOpenProduct(key);
    }
  };

  return (
    <footer className="bg-zinc-900 text-zinc-400 border-t border-zinc-800 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <h2 className="text-2xl font-black text-white mb-6">ABT <span className="text-primary">MEKATRONİK</span></h2>
            <p className="text-sm leading-relaxed mb-6">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <Linkedin size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <Facebook size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold uppercase tracking-wider mb-6">{t('footer.quickAccess')}</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#hero" className="hover:text-primary transition-colors">{t('nav.home')}</a></li>
              <li><a href="#products" className="hover:text-primary transition-colors">{t('nav.products')}</a></li>
              <li><a href="#engineering" className="hover:text-primary transition-colors">{t('nav.engineering')}</a></li>
              <li><a href="#projects" className="hover:text-primary transition-colors">{t('nav.projects')}</a></li>
              <li><a href="#testimonials" className="hover:text-primary transition-colors">{t('nav.testimonials')}</a></li>
              <li><a href="#faq" className="hover:text-primary transition-colors">{t('nav.faq')}</a></li>
              <li><a href="#contact" className="hover:text-primary transition-colors">{t('nav.contact')}</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold uppercase tracking-wider mb-6">{t('footer.productGroups')}</h3>
            <ul className="space-y-3 text-sm">
              {productLinks.map((product) => {
                const IconComponent = product.icon;
                return (
                  <li key={product.key}>
                    <button
                      onClick={() => handleProductClick(product.key)}
                      className="flex items-center gap-2 hover:text-primary transition-colors text-left"
                    >
                      <IconComponent size={14} className="text-red-500" />
                      {t(`productItems.${product.key}.title`)}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold uppercase tracking-wider mb-6">{t('footer.contactTitle')}</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="text-primary shrink-0 mt-1" size={18} />
                <span>Burhan Topal İnşaat Mekatronik</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-primary shrink-0" size={18} />
                <a href="tel:+905373197281" className="hover:text-primary transition-colors">0 537 319 72 81</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-primary shrink-0" size={18} />
                <a href="mailto:info@abtmekatronik.com" className="hover:text-primary transition-colors">info@abtmekatronik.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-800 pt-8 text-center text-xs uppercase tracking-widest font-medium">
          <p>{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
}
