import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { exportsTranslations } from './exports-translations';

export type Language = 'tr' | 'en' | 'de' | 'fr' | 'es' | 'ar' | 'ru';

// Flag images as small inline SVGs for Windows compatibility
const flagSvgs: Record<Language, string> = {
  tr: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800"><rect fill="#E30A17" width="1200" height="800"/><circle fill="#fff" cx="425" cy="400" r="200"/><circle fill="#E30A17" cx="475" cy="400" r="160"/><polygon fill="#fff" points="583,400 764,458 656,340 656,460 764,342"/></svg>`,
  en: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30"><clipPath id="a"><path d="M0 0v30h60V0z"/></clipPath><clipPath id="b"><path d="M30 15h30v15zv15H0zH0V0zV0h30z"/></clipPath><g clip-path="url(#a)"><path d="M0 0v30h60V0z" fill="#012169"/><path d="M0 0l60 30m0-30L0 30" stroke="#fff" stroke-width="6"/><path d="M0 0l60 30m0-30L0 30" clip-path="url(#b)" stroke="#C8102E" stroke-width="4"/><path d="M30 0v30M0 15h60" stroke="#fff" stroke-width="10"/><path d="M30 0v30M0 15h60" stroke="#C8102E" stroke-width="6"/></g></svg>`,
  de: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 3"><rect fill="#000" width="5" height="3"/><rect fill="#D00" y="1" width="5" height="2"/><rect fill="#FFCE00" y="2" width="5" height="1"/></svg>`,
  fr: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2"><rect fill="#002395" width="1" height="2"/><rect fill="#fff" x="1" width="1" height="2"/><rect fill="#ED2939" x="2" width="1" height="2"/></svg>`,
  es: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 500"><rect fill="#c60b1e" width="750" height="500"/><rect fill="#ffc400" y="125" width="750" height="250"/></svg>`,
  ar: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600"><rect fill="#007A3D" width="900" height="600"/><rect fill="#FFF" width="900" height="400"/><rect fill="#000" width="900" height="200"/><polygon fill="#CE1126" points="0,0 0,600 300,300"/></svg>`,
  ru: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9 6"><rect fill="#fff" width="9" height="3"/><rect fill="#0039A6" y="2" width="9" height="2"/><rect fill="#D52B1E" y="4" width="9" height="2"/></svg>`,
};

export const languages: { code: Language; name: string; flag: string }[] = [
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ru', name: 'Русский', flag: '��' },
  { code: 'ar', name: 'العربية', flag: '��' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', name: 'Français', flag: '��' },
  { code: 'es', name: 'Español', flag: '��' },
];

// Get flag as data URL for img src
export const getFlagSrc = (code: Language): string => {
  return `data:image/svg+xml,${encodeURIComponent(flagSvgs[code])}`;
};

// SEO Meta data for each language
const seoMeta: Record<Language, { title: string; description: string; keywords: string; ogTitle: string; ogDescription: string }> = {
  tr: {
    title: 'ABT MEKATRONİK | Konveyör Sistemleri, Tekstil Makineleri, Çelik Konstrüksiyon',
    description: 'ABT Mekatronik - Türkiye\'nin lider endüstriyel çözüm ortağı. Konveyör sistemleri, tekstil makineleri, çelik konstrüksiyon ve özel makine tasarımı. 15+ yıl tecrübe.',
    keywords: 'konveyör sistemleri, tekstil makineleri, çelik konstrüksiyon, özel makine tasarımı, endüstriyel otomasyon, Türkiye',
    ogTitle: 'ABT MEKATRONİK | Endüstriyel Üretim Çözümleri',
    ogDescription: 'Konveyör sistemleri, tekstil makineleri, çelik konstrüksiyon. 15+ yıl tecrübe ile Türkiye genelinde hizmet.',
  },
  en: {
    title: 'ABT MECHATRONICS | Conveyor Systems, Textile Machinery, Steel Construction',
    description: 'ABT Mechatronics - Turkey\'s leading industrial solutions partner. Conveyor systems, textile machinery, steel construction and custom machine design. 15+ years experience.',
    keywords: 'conveyor systems, textile machinery, steel construction, custom machine design, industrial automation, Turkey',
    ogTitle: 'ABT MECHATRONICS | Industrial Production Solutions',
    ogDescription: 'Conveyor systems, textile machinery, steel construction. Serving Turkey-wide with 15+ years of experience.',
  },
  de: {
    title: 'ABT MECHATRONICS | Fördersysteme, Textilmaschinen, Stahlkonstruktion',
    description: 'ABT Mechatronics - Türkeis führender Partner für Industrielösungen. Fördersysteme, Textilmaschinen, Stahlkonstruktion und Sondermaschinenbau. 15+ Jahre Erfahrung.',
    keywords: 'Fördersysteme, Textilmaschinen, Stahlkonstruktion, Sondermaschinenbau, industrielle Automatisierung, Türkei',
    ogTitle: 'ABT MECHATRONICS | Industrielle Produktionslösungen',
    ogDescription: 'Fördersysteme, Textilmaschinen, Stahlkonstruktion. Türkeiweiter Service mit 15+ Jahren Erfahrung.',
  },
  fr: {
    title: 'ABT MECHATRONICS | Systèmes de Convoyage, Machines Textiles, Construction Métallique',
    description: 'ABT Mechatronics - Le partenaire leader de solutions industrielles en Turquie. Systèmes de convoyage, machines textiles, construction métallique. 15+ ans d\'expérience.',
    keywords: 'systèmes de convoyage, machines textiles, construction métallique, conception de machines sur mesure, automatisation industrielle, Turquie',
    ogTitle: 'ABT MECHATRONICS | Solutions de Production Industrielle',
    ogDescription: 'Systèmes de convoyage, machines textiles, construction métallique. Service dans toute la Turquie avec 15+ ans d\'expérience.',
  },
  es: {
    title: 'ABT MECHATRONICS | Sistemas de Transporte, Maquinaria Textil, Construcción de Acero',
    description: 'ABT Mechatronics - El socio líder de soluciones industriales de Turquía. Sistemas de transporte, maquinaria textil, construcción de acero. 15+ años de experiencia.',
    keywords: 'sistemas de transporte, maquinaria textil, construcción de acero, diseño de máquinas personalizadas, automatización industrial, Turquía',
    ogTitle: 'ABT MECHATRONICS | Soluciones de Producción Industrial',
    ogDescription: 'Sistemas de transporte, maquinaria textil, construcción de acero. Servicio en toda Turquía con 15+ años de experiencia.',
  },
  ar: {
    title: 'ABT MECHATRONICS | أنظمة النقل، آلات النسيج، البناء الفولاذي',
    description: 'ABT Mechatronics - الشريك الرائد للحلول الصناعية في تركيا. أنظمة النقل، آلات النسيج، البناء الفولاذي وتصميم الآلات المخصصة. خبرة أكثر من 15 عامًا.',
    keywords: 'أنظمة النقل، آلات النسيج، البناء الفولاذي، تصميم الآلات المخصصة، الأتمتة الصناعية، تركيا',
    ogTitle: 'ABT MECHATRONICS | حلول الإنتاج الصناعي',
    ogDescription: 'أنظمة النقل، آلات النسيج، البناء الفولاذي. خدمة في جميع أنحاء تركيا مع خبرة أكثر من 15 عامًا.',
  },
  ru: {
    title: 'ABT MECHATRONICS | Конвейерные Системы, Текстильное Оборудование, Стальные Конструкции',
    description: 'ABT Mechatronics - ведущий партнер промышленных решений в Турции. Конвейерные системы, текстильное оборудование, стальные конструкции и индивидуальное проектирование машин. Опыт 15+ лет.',
    keywords: 'конвейерные системы, текстильное оборудование, стальные конструкции, индивидуальное проектирование машин, промышленная автоматизация, Турция',
    ogTitle: 'ABT MECHATRONICS | Промышленные Производственные Решения',
    ogDescription: 'Конвейерные системы, текстильное оборудование, стальные конструкции. Обслуживание по всей Турции с опытом 15+ лет.',
  },
};

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  tArray: (key: string) => string[];
}

const I18nContext = createContext<I18nContextType | null>(null);

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error('useI18n must be used within I18nProvider');
  return context;
}

interface I18nProviderProps {
  children: ReactNode;
}

export function I18nProvider({ children }: I18nProviderProps) {
  // Detect browser language
  const detectBrowserLanguage = (): Language => {
    if (typeof window === 'undefined') return 'tr';
    
    // Get browser language (e.g., 'tr-TR', 'en-US', 'de-DE')
    const browserLang = navigator.language || (navigator as any).userLanguage;
    const langCode = browserLang.split('-')[0].toLowerCase();
    
    // Map browser language to supported languages
    const supportedLanguages: Language[] = ['tr', 'en', 'de', 'fr', 'es', 'ar', 'ru'];
    
    // Check if browser language is supported
    if (supportedLanguages.includes(langCode as Language)) {
      return langCode as Language;
    }
    
    // Default to Turkish
    return 'tr';
  };

  // Initialize language from localStorage or browser language
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      // First check localStorage (user preference)
      const savedLanguage = localStorage.getItem('abt-language');
      if (savedLanguage && ['tr', 'en', 'de', 'fr', 'es', 'ar', 'ru'].includes(savedLanguage)) {
        return savedLanguage as Language;
      }
      
      // If no saved preference, detect browser language
      return detectBrowserLanguage();
    }
    return 'tr';
  });

  // Wrapper function to save language to localStorage
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('abt-language', lang);
    }
  };

  // Update SEO meta tags when language changes
  useEffect(() => {
    const meta = seoMeta[language];
    
    // Update title
    document.title = meta.title;
    
    // Update meta description
    const descMeta = document.querySelector('meta[name="description"]');
    if (descMeta) descMeta.setAttribute('content', meta.description);
    
    // Update meta keywords
    const keywordsMeta = document.querySelector('meta[name="keywords"]');
    if (keywordsMeta) keywordsMeta.setAttribute('content', meta.keywords);
    
    // Update Open Graph
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', meta.ogTitle);
    
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', meta.ogDescription);
    
    // Update Twitter
    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) twTitle.setAttribute('content', meta.ogTitle);
    
    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) twDesc.setAttribute('content', meta.ogDescription);
    
    // Update html lang attribute
    document.documentElement.lang = language === 'tr' ? 'tr' : language === 'de' ? 'de' : language === 'fr' ? 'fr' : language === 'es' ? 'es' : language === 'ru' ? 'ru' : language === 'ar' ? 'ar' : 'en';
    
  }, [language]);

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: unknown = translations[language];
    for (const k of keys) {
      value = (value as Record<string, unknown>)?.[k];
    }
    return (value as string) || key;
  };

  const tArray = (key: string): string[] => {
    const keys = key.split('.');
    let value: unknown = translations[language];
    for (const k of keys) {
      value = (value as Record<string, unknown>)?.[k];
    }
    return Array.isArray(value) ? value : [];
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t, tArray }}>
      {children}
    </I18nContext.Provider>
  );
}


const tr = {
  nav: {
    home: 'Ana Sayfa',
    about: 'Hakkımızda',
    products: 'Ürünler',
    engineering: 'Mühendislik',
    projects: 'Projeler',
    exports: 'İhracatlarımız',
    contact: 'İletişim',
    quickAccess: 'Hızlı Erişim',
    selectLanguage: 'Dil',
    faq: 'SSS',
    testimonials: 'Referanslar',
    partners: 'Ortaklarımız',
    viewAll: 'Tümünü Gör',
  },
  hero: {
    badge: 'Endüstriyel Mükemmellik',
    title1: 'GÜÇLÜ',
    title2: 'MÜHENDİSLİK',
    title3: 'KUSURSUZ',
    title4: 'GELECEK',
    description: 'ABT MEKATRONİK önderliğinde; konveyör sistemlerinden tekstil makinelerine, endüstriyel geleceği inşa ediyoruz.',
    solutions: 'ÇÖZÜMLERİMİZ',
    projects: 'PROJELERİMİZ',
    scroll: 'Kaydır',
  },
  cta: {
    quickContact: {
      title: 'Projenizi Konuşalım',
      description: '15 dakikalık ücretsiz danışmanlık ile projeniz için en uygun çözümü birlikte belirleyelim.',
    },
    getQuote: 'Hemen Teklif Al',
    whatsapp: 'WhatsApp ile Yaz',
  },
  trust: {
    subtitle: 'GÜVENİLİRLİK',
    title: 'Kalite ve Tecrübe',
    years: 'Yıllık Tecrübe',
    projects: 'Tamamlanan Proje',
    clients: 'Mutlu Müşteri',
  },
  products: {
    subtitle: 'Ürün Gruplarımız',
    title: 'ÜRETİM ALANLARI',
    description: 'Yüksek kapasiteli tesisler için özel olarak tasarlanmış, dayanıklı ve verimli endüstriyel çözümler.',
    viewDetails: 'Detayları İncele',
    getQuote: 'TEKLİF AL',
    whatsappContact: 'WhatsApp ile İletişim',
    features: 'Özellikler',
    whyUs: 'Neden Biz?',
    gallery: 'Galeri',
    close: 'Kapat',
  },
  productItems: {
    konveyor: {
      title: 'Konveyör Sistemleri',
      subtitle: 'Taşıma Sistemleri',
      shortDesc: 'Ağır hizmet tipi bant konveyörler, zincirli sistemler ve otomatik yükleme hatları.',
      modalSubtitle: 'Endüstriyel Taşıma Çözümleri',
      description: `Konveyör sistemleri, malzemelerin bir noktadan diğerine otomatik olarak taşınmasını sağlayan mekanik sistemlerdir. Fabrikalardan lojistik merkezlerine kadar her sektörde kullanılır.

**Ne İşe Yarar?**
Ürünleri, hammaddeleri veya paketleri manuel taşıma ihtiyacını ortadan kaldırır. İş gücünden tasarruf sağlar, üretim hızını artırır ve iş güvenliğini yükseltir.

**Nasıl Çalışır?**
Motorlu bir sistem, bant veya rulolar üzerindeki malzemeleri sürekli hareket ettirir. Sensörler ve kontrol üniteleri ile akıllı yönlendirme yapılabilir.

**Kullanım Alanları:**
• Fabrika içi üretim hatları
• Depo ve lojistik merkezleri  
• Havalimanı bagaj sistemleri
• Maden ve taş ocakları
• Gıda işleme tesisleri`,
      features: [
        'Ağır yük kapasitesi (500kg - 50 ton)',
        'Modüler tasarım - kolay genişletme',
        'PLC kontrollü akıllı sistemler',
        'Düşük bakım maliyeti',
        '7/24 kesintisiz çalışma',
        'Özel bant seçenekleri (ısıya, yağa, aşınmaya dayanıklı)'
      ],
      whyUs: [
        '15+ yıllık saha tecrübesi',
        'Yerinde keşif ve ücretsiz projelendirme',
        'Türkiye geneli montaj ekibi',
        '2 yıl garanti + ömür boyu teknik destek',
        'Yedek parça garantisi'
      ]
    },
    tekstil: {
      title: 'Tekstil Makinaları',
      subtitle: 'Kumaş İşleme',
      shortDesc: 'Denim dok silindirleri, kumaş açma makineleri ve gergi sistemleri.',
      modalSubtitle: 'Kumaş İşleme Teknolojileri',
      description: `Tekstil makinaları, ham kumaşın işlenerek kullanıma hazır hale getirilmesini sağlayan özel ekipmanlardır. Denim, pamuk, polyester gibi her türlü kumaş için çözümler sunarız.

**Ne İşe Yarar?**
Kumaş açma, germe, sarma, kesme ve kalite kontrol işlemlerini otomatikleştirir. Manuel işçiliği minimize eder, üretim kalitesini standartlaştırır.

**Nasıl Çalışır?**
Dok silindirleri kumaşı düzgün şekilde açar, gergi sistemleri kırışıklıkları giderir, sensörler hata tespiti yapar. Tüm süreç PLC ile kontrol edilir.

**Kullanım Alanları:**
• Denim fabrikaları
• Kumaş boyahaneleri
• Konfeksiyon atölyeleri
• Tekstil ihracatçıları
• Ev tekstili üreticileri`,
      features: [
        'Denim dok silindirleri (özel kaplama)',
        'Otomatik kumaş açma makineleri',
        'Gergi ve düzeltme sistemleri',
        'Kalite kontrol sensörleri',
        'Yüksek hız (120m/dk)',
        'Hassas gerilim kontrolü'
      ],
      whyUs: [
        "Türkiye'nin önde gelen tekstil firmalarına hizmet",
        'Denim sektöründe uzmanlaşmış ekip',
        'Hızlı arıza müdahalesi (24 saat içinde)',
        'Orijinal yedek parça stoğu',
        'Eğitim ve operatör desteği'
      ]
    },
    celik: {
      title: 'Çelik Konstrüksiyon',
      subtitle: 'Yapı Sistemleri',
      shortDesc: 'Fabrika yapıları, depo sistemleri ve endüstriyel çelik iskeletler.',
      modalSubtitle: 'Endüstriyel Yapı Sistemleri',
      description: `Çelik konstrüksiyon, fabrika binaları, depolar ve endüstriyel tesisler için taşıyıcı iskelet sistemleridir.

**Ne İşe Yarar?**
Büyük açıklıklı alanları kolonlarla bölmeden kapatır. Vinç yolları, platform sistemleri ve makine şaseleri için ideal altyapı sağlar.

**Nasıl Çalışır?**
Çelik profiller kaynak ve cıvata ile birleştirilerek rijit bir iskelet oluşturur. Statik hesaplamalar ile deprem ve rüzgar yüklerine dayanıklı tasarlanır.

**Kullanım Alanları:**
• Fabrika ve üretim tesisleri
• Lojistik depoları
• Tarımsal yapılar
• Spor salonları
• Alışveriş merkezleri`,
      features: [
        'Depreme dayanıklı tasarım',
        'Hızlı montaj (betonarmeye göre %60 daha hızlı)',
        'Geniş açıklıklar (30m+ kolon aralığı)',
        'Modüler genişleme imkanı',
        'Uzun ömür (50+ yıl)',
        'Geri dönüştürülebilir malzeme'
      ],
      whyUs: [
        'Statik proje dahil anahtar teslim',
        'TSE belgeli malzeme kullanımı',
        'Kendi üretim tesisimiz',
        'Deneyimli montaj ekipleri',
        'Rekabetçi fiyatlandırma'
      ]
    },
    ozelMakine: {
      title: 'Özel Makine Tasarımı',
      subtitle: 'Ar-Ge & Tasarım',
      shortDesc: 'Sıfırdan mühendislik, prototip üretimi ve otomasyon çözümleri.',
      modalSubtitle: 'Sıfırdan Mühendislik Çözümleri',
      description: `Özel makine tasarımı, standart çözümlerin yetersiz kaldığı durumlarda sıfırdan geliştirilen mühendislik projelerdir.

**Ne İşe Yarar?**
Piyasada bulunmayan veya mevcut makinelerin karşılayamadığı özel üretim ihtiyaçlarını çözer.

**Nasıl Çalışır?**
İhtiyaç analizi → Konsept tasarım → 3D modelleme → Prototip → Test → Seri üretim.

**Kullanım Alanları:**
• Otomasyon sistemleri
• Paketleme makineleri
• Test ve ölçüm cihazları
• Montaj hatları
• Robotik uygulamalar`,
      features: [
        '3D CAD tasarım (SolidWorks)',
        'FEA analizi (mukavemet hesabı)',
        'Prototip üretimi',
        'PLC programlama',
        'HMI arayüz tasarımı',
        'CE belgelendirme desteği'
      ],
      whyUs: [
        'Fikir aşamasından üretime tam destek',
        'Gizlilik sözleşmesi ile fikri mülkiyet koruması',
        'Ar-Ge teşviklerinde danışmanlık',
        'Revizyon garantisi',
        'Uzaktan izleme ve destek'
      ]
    }
  },
  engineering: {
    subtitle: 'Mühendislik Vizyonu',
    title: 'ÖZEL MAKİNE TASARIMI &',
    title2: 'MEKATRONİK ENTEGRASYON',
    customDesign: 'Özel Tasarım Çözümler',
    customDesignDesc: 'İhtiyaca yönelik projelendirme ve üretim süreçlerinde tam özelleştirme.',
    precision: 'Yüksek Hassasiyet',
    precisionDesc: 'Mikron seviyesinde hassasiyet gerektiren mekanik parçalar ve montaj kalitesi.',
    turnkey: 'Anahtar Teslim Projeler',
    turnkeyDesc: 'Tasarım aşamasından montaj ve devreye almaya kadar uçtan uca proje yönetimi.',
    experience: 'Yıllık Tecrübe',
    completedProjects: 'Tamamlanan Proje',
  },
  projectsSection: {
    subtitle: 'Projelerimiz',
    title: 'ÇALIŞMALARIMIZDAN KARELER',
    videoGallery: 'Video Galeri',
  },
  contact: {
    subtitle: 'Bize Ulaşın',
    title: 'PROJENİZİ',
    title2: 'BİRLİKTE TASARLAYALIM',
    description: 'Endüstriyel ihtiyaçlarınız için profesyonel çözümler sunuyoruz. Teklif almak veya detaylı bilgi için formu doldurun.',
    whatsappTitle: 'WhatsApp Destek Hattı',
    whatsappButton: 'WhatsApp ile Hızlı İletişim',
    formTitle: 'Teklif Formu',
    name: 'Ad Soyad',
    namePlaceholder: 'Adınız Soyadınız',
    email: 'E-Posta',
    emailPlaceholder: 'ornek@sirket.com',
    message: 'Mesajınız',
    messagePlaceholder: 'Proje detayları veya talebiniz...',
    submit: 'GÖNDER',
    submitting: 'GÖNDERİLİYOR...',
    successTitle: 'Mesajınız Alındı',
    successDesc: 'En kısa sürede sizinle iletişime geçeceğiz.',
  },
  footer: {
    description: 'ABT MEKATRONİK önderliğinde; endüstriyel üretim teknolojilerinde geleceği inşa ediyoruz. Yüksek hassasiyet, güçlü mühendislik.',
    quickAccess: 'Hızlı Erişim',
    productGroups: 'Ürün Grupları',
    contactTitle: 'İletişim',
    contactSubtitle: 'Bize ulaşın, size en iyi hizmeti sunalım.',
    address: 'Adres',
    phone: 'Telefon',
    email: 'E-posta',
    whatsappButton: 'WhatsApp ile Bize Ulaşın',
    openInMaps: 'Google Maps\'te Aç',
    copyright: '© 2026 ABT MEKATRONİK SAN. TİC. LTD. ŞTİ. Tüm hakları saklıdır.',
  },
  validation: {
    nameMin: 'İsim en az 2 karakter olmalıdır',
    nameMax: 'İsim en fazla 100 karakter olabilir',
    emailInvalid: 'Geçerli bir email adresi giriniz',
    emailMax: 'Email adresi çok uzun',
    messageMin: 'Mesajınız en az 10 karakter olmalıdır',
    messageMax: 'Mesajınız en fazla 2000 karakter olabilir',
  },
  notFound: {
    title: 'Sayfa Bulunamadı',
    description: 'Aradığınız sayfa mevcut değil veya taşınmış olabilir.',
    homeButton: 'Ana Sayfaya Dön',
    backButton: 'Geri Git',
    contactButton: 'İletişim',
  },
  errorBoundary: {
    title: 'Bir Şeyler Yanlış Gitti',
    description: 'Üzgünüz, beklenmeyen bir hata oluştu. Teknik ekibimiz bilgilendirildi.',
    retryButton: 'Tekrar Dene',
    homeButton: 'Ana Sayfaya Dön',
  },
  cookie: {
    title: 'Çerez Politikası',
    message: 'Bu web sitesi, deneyiminizi geliştirmek için çerezleri kullanmaktadır.',
    details: 'Çerezler, web sitemizin düzgün çalışması ve analitik veriler için kullanılır. Gizliliğinize saygı duyuyoruz.',
    accept: 'Kabul Et',
    decline: 'Reddet',
    close: 'Kapat',
    learnMore: 'Daha Fazla Bilgi',
  },
  whatsapp: {
    tooltip: 'WhatsApp ile yazın',
  },
  exitPopup: {
    badge: '🎁 Özel Teklif',
    title: 'Bekleyin!',
    subtitle: 'Size özel bir teklifimiz var',
    description: 'Projeleriniz için ücretsiz keşif ve fiyat teklifi almak ister misiniz?',
    whatsappButton: 'WhatsApp ile Ulaşın',
    contactButton: 'İletişim Formu',
    dismiss: 'Hayır, teşekkürler',
  },
  testimonials: {
    subtitle: 'Müşteri Yorumları',
    title: 'REFERANSLARIMIZ',
    items: [
      { quote: 'Konveyör sistemimizi zamanında ve kaliteli bir şekilde teslim ettiler. Profesyonel ekip.', name: 'Ahmet Yılmaz', company: 'Tekstil A.Ş.' },
      { quote: 'Çelik konstrüksiyon projemizde mükemmel iş çıkardılar. Kesinlikle tavsiye ederim.', name: 'Mehmet Demir', company: 'Lojistik Plus' },
      { quote: 'Özel makine tasarımında beklentilerimizin üzerinde bir sonuç aldık.', name: 'Fatma Kaya', company: 'Endüstri Grup' },
    ],
  },
  certifications: {
    iso9001: 'ISO 9001',
    tse: 'TSE Belgeli',
    ce: 'CE Uyumlu',
    quality: 'Kalite Garantisi',
  },
  clients: {
    title: 'Güvenilir İş Ortaklarımız',
    viewAll: 'Tüm Ortaklarımızı Gör',
    industries: {
      tekstil: 'TEKSTİL',
      celik: 'ÇELİK',
      lojistik: 'LOJİSTİK',
      uretim: 'ÜRETİM',
      makine: 'MAKİNE',
      endustri: 'ENDÜSTRİ',
      otomasyon: 'OTOMASYON',
      konveyor: 'KONVEYÖR',
      metal: 'METAL',
    },
  },
  newsletter: {
    title: 'Bültenimize Abone Olun',
    description: 'Yeni projeler ve kampanyalardan haberdar olun.',
    placeholder: 'E-posta adresiniz',
    button: 'Abone Ol',
    success: 'Başarıyla abone oldunuz!',
  },
  home: {
    certifications: {
      subtitle: 'Kalite Güvencesi',
      title: 'Sertifikalarımız',
    },
  },
  faq: {
    subtitle: 'Sıkça Sorulan Sorular',
    title: 'MERAK EDİLENLER',
    items: [
      { question: 'Proje teslim süresi ne kadar?', answer: 'Proje büyüklüğüne göre değişmekle birlikte, standart projeler 4-8 hafta içinde teslim edilmektedir. Acil projeler için özel planlama yapılabilir.' },
      { question: 'Garanti süresi ne kadar?', answer: 'Tüm ürünlerimiz 2 yıl garanti kapsamındadır. Ayrıca ömür boyu teknik destek ve yedek parça garantisi sunuyoruz.' },
      { question: 'Türkiye genelinde hizmet veriyor musunuz?', answer: 'Evet, Türkiye\'nin her yerine montaj ve servis hizmeti veriyoruz. Deneyimli ekiplerimiz sahada çalışmaktadır.' },
      { question: 'Ücretsiz keşif yapıyor musunuz?', answer: 'Evet, tüm projeler için ücretsiz yerinde keşif ve projelendirme hizmeti sunuyoruz.' },
    ],
  },
  exports: exportsTranslations.tr,
};


const en = {
  nav: {
    home: 'Home',
    about: 'About',
    products: 'Products',
    engineering: 'Engineering',
    projects: 'Projects',
    exports: 'Our Exports',
    contact: 'Contact',
    quickAccess: 'Quick Access',
    selectLanguage: 'Language',
    faq: 'FAQ',
    testimonials: 'Testimonials',
    partners: 'Partners',
    viewAll: 'View All',
  },
  hero: {
    badge: 'Industrial Excellence',
    title1: 'POWERFUL',
    title2: 'ENGINEERING',
    title3: 'FLAWLESS',
    title4: 'FUTURE',
    description: 'Under the leadership of ABT MECHATRONICS; from conveyor systems to textile machinery, we build the industrial future.',
    solutions: 'OUR SOLUTIONS',
    projects: 'OUR PROJECTS',
    scroll: 'Scroll',
  },
  cta: {
    quickContact: {
      title: 'Let\'s Discuss Your Project',
      description: 'Let\'s determine the most suitable solution for your project together with a 15-minute free consultation.',
    },
    getQuote: 'Get Quote Now',
    whatsapp: 'Message on WhatsApp',
  },
  trust: {
    subtitle: 'RELIABILITY',
    title: 'Quality and Experience',
    years: 'Years of Experience',
    projects: 'Completed Projects',
    clients: 'Happy Clients',
  },
  products: {
    subtitle: 'Our Product Groups',
    title: 'PRODUCTION AREAS',
    description: 'Durable and efficient industrial solutions specially designed for high-capacity facilities.',
    viewDetails: 'View Details',
    getQuote: 'GET QUOTE',
    whatsappContact: 'Contact via WhatsApp',
    features: 'Features',
    whyUs: 'Why Us?',
    gallery: 'Gallery',
    close: 'Close',
  },
  productItems: {
    konveyor: {
      title: 'Conveyor Systems',
      subtitle: 'Transport Systems',
      shortDesc: 'Heavy-duty belt conveyors, chain systems and automatic loading lines.',
      modalSubtitle: 'Industrial Transport Solutions',
      description: `Conveyor systems are mechanical systems that automatically transport materials from one point to another. Used in every sector from factories to logistics centers.

**What Does It Do?**
Eliminates the need for manual transport of products, raw materials or packages. Saves labor, increases production speed and improves workplace safety.

**How Does It Work?**
A motorized system continuously moves materials on belts or rollers. Smart routing can be done with sensors and control units.

**Application Areas:**
• In-factory production lines
• Warehouse and logistics centers
• Airport baggage systems
• Mines and quarries
• Food processing facilities`,
      features: [
        'Heavy load capacity (500kg - 50 tons)',
        'Modular design - easy expansion',
        'PLC controlled smart systems',
        'Low maintenance cost',
        '24/7 uninterrupted operation',
        'Special belt options (heat, oil, wear resistant)'
      ],
      whyUs: [
        '15+ years of field experience',
        'On-site survey and free project design',
        'Turkey-wide assembly team',
        '2 year warranty + lifetime technical support',
        'Spare parts guarantee'
      ]
    },
    tekstil: {
      title: 'Textile Machinery',
      subtitle: 'Fabric Processing',
      shortDesc: 'Denim dock cylinders, fabric opening machines and tension systems.',
      modalSubtitle: 'Fabric Processing Technologies',
      description: `Textile machinery are special equipment that process raw fabric into ready-to-use condition. We offer solutions for all types of fabric including denim, cotton, polyester.

**What Does It Do?**
Automates fabric opening, stretching, winding, cutting and quality control processes. Minimizes manual labor, standardizes production quality.

**How Does It Work?**
Dock cylinders open the fabric evenly, tension systems remove wrinkles, sensors detect defects. The entire process is controlled by PLC.

**Application Areas:**
• Denim factories
• Fabric dyehouses
• Garment workshops
• Textile exporters
• Home textile manufacturers`,
      features: [
        'Denim dock cylinders (special coating)',
        'Automatic fabric opening machines',
        'Tension and correction systems',
        'Quality control sensors',
        'High speed (120m/min)',
        'Precise tension control'
      ],
      whyUs: [
        'Serving Turkey\'s leading textile companies',
        'Team specialized in denim sector',
        'Fast fault response (within 24 hours)',
        'Original spare parts stock',
        'Training and operator support'
      ]
    },
    celik: {
      title: 'Steel Construction',
      subtitle: 'Building Systems',
      shortDesc: 'Factory buildings, warehouse systems and industrial steel frames.',
      modalSubtitle: 'Industrial Building Systems',
      description: `Steel construction is the load-bearing frame system for factory buildings, warehouses and industrial facilities.

**What Does It Do?**
Covers large span areas without dividing with columns. Provides ideal infrastructure for crane tracks, platform systems and machine chassis.

**How Does It Work?**
Steel profiles are joined by welding and bolts to form a rigid frame. Designed to withstand earthquake and wind loads with static calculations.

**Application Areas:**
• Factories and production facilities
• Logistics warehouses
• Agricultural structures
• Sports halls
• Shopping centers`,
      features: [
        'Earthquake resistant design',
        'Fast assembly (60% faster than reinforced concrete)',
        'Wide spans (30m+ column spacing)',
        'Modular expansion capability',
        'Long life (50+ years)',
        'Recyclable material'
      ],
      whyUs: [
        'Turnkey including static project',
        'TSE certified material use',
        'Our own production facility',
        'Experienced assembly teams',
        'Competitive pricing'
      ]
    },
    ozelMakine: {
      title: 'Custom Machine Design',
      subtitle: 'R&D & Design',
      shortDesc: 'Engineering from scratch, prototype production and automation solutions.',
      modalSubtitle: 'Engineering Solutions from Scratch',
      description: `Custom machine design is engineering projects developed from scratch when standard solutions are insufficient.

**What Does It Do?**
Solves special production needs that are not available in the market or cannot be met by existing machines.

**How Does It Work?**
Needs analysis → Concept design → 3D modeling → Prototype → Test → Serial production.

**Application Areas:**
• Automation systems
• Packaging machines
• Test and measurement devices
• Assembly lines
• Robotic applications`,
      features: [
        '3D CAD design (SolidWorks)',
        'FEA analysis (strength calculation)',
        'Prototype production',
        'PLC programming',
        'HMI interface design',
        'CE certification support'
      ],
      whyUs: [
        'Full support from idea to production',
        'Intellectual property protection with NDA',
        'R&D incentive consultancy',
        'Revision guarantee',
        'Remote monitoring and support'
      ]
    }
  },
  engineering: {
    subtitle: 'Engineering Vision',
    title: 'CUSTOM MACHINE DESIGN &',
    title2: 'MECHATRONICS INTEGRATION',
    customDesign: 'Custom Design Solutions',
    customDesignDesc: 'Full customization in project design and production processes according to needs.',
    precision: 'High Precision',
    precisionDesc: 'Mechanical parts and assembly quality requiring micron-level precision.',
    turnkey: 'Turnkey Projects',
    turnkeyDesc: 'End-to-end project management from design to assembly and commissioning.',
    experience: 'Years of Experience',
    completedProjects: 'Completed Projects',
  },
  projectsSection: {
    subtitle: 'Our Projects',
    title: 'SNAPSHOTS FROM OUR WORK',
    videoGallery: 'Video Gallery',
  },
  contact: {
    subtitle: 'Contact Us',
    title: 'LET\'S DESIGN',
    title2: 'YOUR PROJECT TOGETHER',
    description: 'We offer professional solutions for your industrial needs. Fill out the form to get a quote or detailed information.',
    whatsappTitle: 'WhatsApp Support Line',
    whatsappButton: 'Quick Contact via WhatsApp',
    formTitle: 'Quote Form',
    name: 'Full Name',
    namePlaceholder: 'Your Full Name',
    email: 'E-Mail',
    emailPlaceholder: 'example@company.com',
    message: 'Your Message',
    messagePlaceholder: 'Project details or your request...',
    submit: 'SEND',
    submitting: 'SENDING...',
    successTitle: 'Message Received',
    successDesc: 'We will contact you as soon as possible.',
  },
  footer: {
    description: 'Under the leadership of ABT MECHATRONICS; we build the future in industrial production technologies. High precision, strong engineering.',
    quickAccess: 'Quick Access',
    productGroups: 'Product Groups',
    contactTitle: 'Contact',
    contactSubtitle: 'Contact us, let us provide you with the best service.',
    address: 'Address',
    phone: 'Phone',
    email: 'E-Mail',
    whatsappButton: 'Contact Us via WhatsApp',
    openInMaps: 'Open in Google Maps',
    copyright: '© 2026 ABT MECHATRONICS IND. TRADE CO. LTD. All rights reserved.',
  },
  validation: {
    nameMin: 'Name must be at least 2 characters',
    nameMax: 'Name can be maximum 100 characters',
    emailInvalid: 'Please enter a valid email address',
    emailMax: 'Email address is too long',
    messageMin: 'Your message must be at least 10 characters',
    messageMax: 'Your message can be maximum 2000 characters',
  },
  notFound: {
    title: 'Page Not Found',
    description: 'The page you are looking for does not exist or may have been moved.',
    homeButton: 'Go to Homepage',
    backButton: 'Go Back',
    contactButton: 'Contact',
  },
  errorBoundary: {
    title: 'Something Went Wrong',
    description: 'Sorry, an unexpected error occurred. Our technical team has been notified.',
    retryButton: 'Try Again',
    homeButton: 'Go to Homepage',
  },
  cookie: {
    title: 'Cookie Policy',
    message: 'This website uses cookies to enhance your experience.',
    details: 'Cookies are used for proper website functionality and analytics. We respect your privacy.',
    accept: 'Accept',
    decline: 'Decline',
    close: 'Close',
    learnMore: 'Learn More',
  },
  whatsapp: {
    tooltip: 'Chat on WhatsApp',
  },
  exitPopup: {
    badge: '🎁 Special Offer',
    title: 'Wait!',
    subtitle: 'We have a special offer for you',
    description: 'Would you like to get a free site survey and quote for your projects?',
    whatsappButton: 'Contact via WhatsApp',
    contactButton: 'Contact Form',
    dismiss: 'No, thanks',
  },
  testimonials: {
    subtitle: 'Customer Reviews',
    title: 'TESTIMONIALS',
    items: [
      { quote: 'They delivered our conveyor system on time and with quality. Professional team.', name: 'Ahmet Yilmaz', company: 'Textile Inc.' },
      { quote: 'They did an excellent job on our steel construction project. Highly recommended.', name: 'Mehmet Demir', company: 'Logistics Plus' },
      { quote: 'We got results beyond our expectations in custom machine design.', name: 'Fatma Kaya', company: 'Industry Group' },
    ],
  },
  certifications: {
    iso9001: 'ISO 9001',
    tse: 'TSE Certified',
    ce: 'CE Compliant',
    quality: 'Quality Guarantee',
  },
  clients: {
    title: 'Our Trusted Partners',
    viewAll: 'View All Partners',
    industries: {
      tekstil: 'TEXTILE',
      celik: 'STEEL',
      lojistik: 'LOGISTICS',
      uretim: 'PRODUCTION',
      makine: 'MACHINE',
      endustri: 'INDUSTRY',
      otomasyon: 'AUTOMATION',
      konveyor: 'CONVEYOR',
      metal: 'METAL',
    },
  },
  newsletter: {
    title: 'Subscribe to Our Newsletter',
    description: 'Stay updated on new projects and campaigns.',
    placeholder: 'Your email address',
    button: 'Subscribe',
    success: 'Successfully subscribed!',
  },
  home: {
    certifications: {
      subtitle: 'Quality Assurance',
      title: 'Our Certificates',
    },
  },
  faq: {
    subtitle: 'Frequently Asked Questions',
    title: 'FAQ',
    items: [
      { question: 'What is the project delivery time?', answer: 'Depending on project size, standard projects are delivered within 4-8 weeks. Special planning can be made for urgent projects.' },
      { question: 'What is the warranty period?', answer: 'All our products are covered by a 2-year warranty. We also offer lifetime technical support and spare parts guarantee.' },
      { question: 'Do you serve throughout Turkey?', answer: 'Yes, we provide assembly and service throughout Turkey. Our experienced teams work on-site.' },
      { question: 'Do you offer free site surveys?', answer: 'Yes, we offer free on-site survey and project design services for all projects.' },
    ],
  },
  exports: exportsTranslations.en,
};


const de = {
  nav: {
    home: 'Startseite',
    about: 'Über uns',
    products: 'Produkte',
    engineering: 'Technik',
    projects: 'Projekte',
    exports: 'Unsere Exporte',
    contact: 'Kontakt',
    quickAccess: 'Schnellzugriff',
    selectLanguage: 'Sprache',
    faq: 'FAQ',
    testimonials: 'Referenzen',
    partners: 'Partner',
    viewAll: 'Alle Anzeigen',
  },
  hero: {
    badge: 'Industrielle Exzellenz',
    title1: 'STARKE',
    title2: 'TECHNIK',
    title3: 'MAKELLOSE',
    title4: 'ZUKUNFT',
    description: 'Unter der Führung von ABT MECHATRONICS; von Fördersystemen bis zu Textilmaschinen bauen wir die industrielle Zukunft.',
    solutions: 'UNSERE LÖSUNGEN',
    projects: 'UNSERE PROJEKTE',
    scroll: 'Scrollen',
  },
  cta: {
    quickContact: {
      title: 'Lassen Sie uns über Ihr Projekt sprechen',
      description: 'Lassen Sie uns gemeinsam die am besten geeignete Lösung für Ihr Projekt mit einer 15-minütigen kostenlosen Beratung bestimmen.',
    },
    getQuote: 'Jetzt Angebot erhalten',
    whatsapp: 'Nachricht auf WhatsApp',
  },
  trust: {
    subtitle: 'ZUVERLÄSSIGKEIT',
    title: 'Qualität und Erfahrung',
    years: 'Jahre Erfahrung',
    projects: 'Abgeschlossene Projekte',
    clients: 'Zufriedene Kunden',
  },
  products: {
    subtitle: 'Unsere Produktgruppen',
    title: 'PRODUKTIONSBEREICHE',
    description: 'Langlebige und effiziente Industrielösungen, speziell für Hochleistungsanlagen entwickelt.',
    viewDetails: 'Details ansehen',
    getQuote: 'ANGEBOT ANFORDERN',
    whatsappContact: 'Kontakt über WhatsApp',
    features: 'Eigenschaften',
    whyUs: 'Warum wir?',
    gallery: 'Galerie',
    close: 'Schließen',
  },
  productItems: {
    konveyor: {
      title: 'Fördersysteme',
      subtitle: 'Transportsysteme',
      shortDesc: 'Schwerlast-Bandförderer, Kettensysteme und automatische Beladungslinien.',
      modalSubtitle: 'Industrielle Transportlösungen',
      description: `Fördersysteme sind mechanische Systeme, die Materialien automatisch von einem Punkt zum anderen transportieren.

**Was macht es?**
Eliminiert den Bedarf an manuellem Transport von Produkten, Rohstoffen oder Paketen.

**Wie funktioniert es?**
Ein motorisiertes System bewegt Materialien kontinuierlich auf Bändern oder Rollen.

**Anwendungsbereiche:**
• Produktionslinien in Fabriken
• Lager- und Logistikzentren
• Flughafen-Gepäcksysteme
• Bergwerke und Steinbrüche
• Lebensmittelverarbeitungsanlagen`,
      features: [
        'Schwerlastkapazität (500kg - 50 Tonnen)',
        'Modulares Design - einfache Erweiterung',
        'SPS-gesteuerte intelligente Systeme',
        'Niedrige Wartungskosten',
        '24/7 unterbrechungsfreier Betrieb',
        'Spezielle Bandoptionen (hitze-, öl-, verschleißbeständig)'
      ],
      whyUs: [
        '15+ Jahre Felderfahrung',
        'Vor-Ort-Besichtigung und kostenlose Projektplanung',
        'Türkeiweites Montageteam',
        '2 Jahre Garantie + lebenslanger technischer Support',
        'Ersatzteilgarantie'
      ]
    },
    tekstil: {
      title: 'Textilmaschinen',
      subtitle: 'Stoffverarbeitung',
      shortDesc: 'Denim-Dockzylinder, Stofföffnungsmaschinen und Spannsysteme.',
      modalSubtitle: 'Stoffverarbeitungstechnologien',
      description: `Textilmaschinen sind Spezialgeräte, die Rohstoffe zu gebrauchsfertigen Stoffen verarbeiten.

**Was macht es?**
Automatisiert Stofföffnung, Dehnung, Wicklung, Schneiden und Qualitätskontrolle.

**Wie funktioniert es?**
Dockzylinder öffnen den Stoff gleichmäßig, Spannsysteme entfernen Falten, Sensoren erkennen Fehler.

**Anwendungsbereiche:**
• Denim-Fabriken
• Stofffärbereien
• Bekleidungswerkstätten
• Textilexporteure
• Heimtextilhersteller`,
      features: ['Denim-Dockzylinder', 'Automatische Stofföffnungsmaschinen', 'Spann- und Korrektursysteme', 'Qualitätskontrollsensoren', 'Hohe Geschwindigkeit (120m/min)', 'Präzise Spannungskontrolle'],
      whyUs: ['Führende türkische Textilfirmen bedienen', 'Auf Denim spezialisiertes Team', 'Schnelle Fehlerreaktion (innerhalb 24 Stunden)', 'Original-Ersatzteillager', 'Schulung und Bedienerunterstützung']
    },
    celik: {
      title: 'Stahlkonstruktion',
      subtitle: 'Bausysteme',
      shortDesc: 'Fabrikgebäude, Lagersysteme und industrielle Stahlrahmen.',
      modalSubtitle: 'Industrielle Bausysteme',
      description: `Stahlkonstruktion ist das tragende Rahmensystem für Fabrikgebäude, Lagerhäuser und Industrieanlagen.

**Was macht es?**
Überdeckt große Spannweiten ohne Säulen. Bietet ideale Infrastruktur für Kranbahnen und Plattformsysteme.

**Anwendungsbereiche:**
• Fabriken und Produktionsanlagen
• Logistiklager
• Landwirtschaftliche Strukturen
• Sporthallen
• Einkaufszentren`,
      features: ['Erdbebensicheres Design', 'Schnelle Montage', 'Große Spannweiten (30m+)', 'Modulare Erweiterung', 'Lange Lebensdauer (50+ Jahre)', 'Recycelbares Material'],
      whyUs: ['Schlüsselfertig inkl. Statikprojekt', 'TSE-zertifiziertes Material', 'Eigene Produktionsanlage', 'Erfahrene Montageteams', 'Wettbewerbsfähige Preise']
    },
    ozelMakine: {
      title: 'Sondermaschinenbau',
      subtitle: 'F&E & Design',
      shortDesc: 'Engineering von Grund auf, Prototypenfertigung und Automatisierungslösungen.',
      modalSubtitle: 'Engineering-Lösungen von Grund auf',
      description: `Sondermaschinenbau sind Ingenieurprojekte, die von Grund auf entwickelt werden, wenn Standardlösungen nicht ausreichen.

**Was macht es?**
Löst spezielle Produktionsanforderungen, die auf dem Markt nicht verfügbar sind.

**Anwendungsbereiche:**
• Automatisierungssysteme
• Verpackungsmaschinen
• Test- und Messgeräte
• Montagelinien
• Robotikanwendungen`,
      features: ['3D-CAD-Design (SolidWorks)', 'FEA-Analyse', 'Prototypenfertigung', 'SPS-Programmierung', 'HMI-Schnittstellendesign', 'CE-Zertifizierungsunterstützung'],
      whyUs: ['Volle Unterstützung von der Idee bis zur Produktion', 'Geistiges Eigentum mit NDA geschützt', 'F&E-Förderberatung', 'Revisionsgarantie', 'Fernüberwachung und Support']
    }
  },
  engineering: {
    subtitle: 'Engineering-Vision',
    title: 'SONDERMASCHINENBAU &',
    title2: 'MECHATRONIK-INTEGRATION',
    customDesign: 'Maßgeschneiderte Designlösungen',
    customDesignDesc: 'Vollständige Anpassung in Projektdesign und Produktionsprozessen.',
    precision: 'Hohe Präzision',
    precisionDesc: 'Mechanische Teile und Montagequalität mit Mikrometer-Präzision.',
    turnkey: 'Schlüsselfertige Projekte',
    turnkeyDesc: 'End-to-End-Projektmanagement vom Design bis zur Inbetriebnahme.',
    experience: 'Jahre Erfahrung',
    completedProjects: 'Abgeschlossene Projekte',
  },
  projectsSection: { subtitle: 'Unsere Projekte', title: 'EINBLICKE IN UNSERE ARBEIT', videoGallery: 'Videogalerie' },
  contact: {
    subtitle: 'Kontaktieren Sie uns',
    title: 'LASSEN SIE UNS',
    title2: 'IHR PROJEKT GEMEINSAM GESTALTEN',
    description: 'Wir bieten professionelle Lösungen für Ihre industriellen Anforderungen.',
    whatsappTitle: 'WhatsApp-Support',
    whatsappButton: 'Schnellkontakt über WhatsApp',
    formTitle: 'Angebotsformular',
    name: 'Vollständiger Name',
    namePlaceholder: 'Ihr vollständiger Name',
    email: 'E-Mail',
    emailPlaceholder: 'beispiel@firma.com',
    message: 'Ihre Nachricht',
    messagePlaceholder: 'Projektdetails oder Ihre Anfrage...',
    submit: 'SENDEN',
    submitting: 'WIRD GESENDET...',
    successTitle: 'Nachricht erhalten',
    successDesc: 'Wir werden Sie so schnell wie möglich kontaktieren.',
  },
  footer: {
    description: 'Unter der Führung von ABT MECHATRONICS bauen wir die Zukunft der industriellen Produktionstechnologien.',
    quickAccess: 'Schnellzugriff',
    productGroups: 'Produktgruppen',
    contactTitle: 'Kontakt',
    contactSubtitle: 'Kontaktieren Sie uns, wir bieten Ihnen den besten Service.',
    address: 'Adresse',
    phone: 'Telefon',
    email: 'E-Mail',
    whatsappButton: 'Kontaktieren Sie uns über WhatsApp',
    openInMaps: 'In Google Maps öffnen',
    copyright: '© 2026 ABT MECHATRONICS IND. TRADE CO. LTD. Alle Rechte vorbehalten.',
  },
  validation: {
    nameMin: 'Name muss mindestens 2 Zeichen haben',
    nameMax: 'Name kann maximal 100 Zeichen haben',
    emailInvalid: 'Bitte geben Sie eine gültige E-Mail-Adresse ein',
    emailMax: 'E-Mail-Adresse ist zu lang',
    messageMin: 'Ihre Nachricht muss mindestens 10 Zeichen haben',
    messageMax: 'Ihre Nachricht kann maximal 2000 Zeichen haben',
  },
  notFound: {
    title: 'Seite nicht gefunden',
    description: 'Die gesuchte Seite existiert nicht oder wurde verschoben.',
    homeButton: 'Zur Startseite',
    backButton: 'Zurück',
    contactButton: 'Kontakt',
  },
  errorBoundary: {
    title: 'Etwas ist schief gelaufen',
    description: 'Entschuldigung, ein unerwarteter Fehler ist aufgetreten. Unser technisches Team wurde benachrichtigt.',
    retryButton: 'Erneut versuchen',
    homeButton: 'Zur Startseite',
  },
  cookie: {
    title: 'Cookie-Richtlinie',
    message: 'Diese Website verwendet Cookies, um Ihre Erfahrung zu verbessern.',
    details: 'Cookies werden für die ordnungsgemäße Funktion der Website und Analysen verwendet. Wir respektieren Ihre Privatsphäre.',
    accept: 'Akzeptieren',
    decline: 'Ablehnen',
    close: 'Schließen',
    learnMore: 'Mehr erfahren',
  },
  whatsapp: {
    tooltip: 'Auf WhatsApp schreiben',
  },
  exitPopup: {
    badge: '🎁 Sonderangebot',
    title: 'Warten Sie!',
    subtitle: 'Wir haben ein Sonderangebot für Sie',
    description: 'Möchten Sie eine kostenlose Besichtigung und ein Angebot für Ihre Projekte erhalten?',
    whatsappButton: 'Kontakt über WhatsApp',
    contactButton: 'Kontaktformular',
    dismiss: 'Nein, danke',
  },
  testimonials: {
    subtitle: 'Kundenbewertungen',
    title: 'REFERENZEN',
    items: [
      { quote: 'Sie haben unser Fördersystem pünktlich und qualitativ hochwertig geliefert. Professionelles Team.', name: 'Ahmet Yilmaz', company: 'Textil AG' },
      { quote: 'Sie haben bei unserem Stahlbauprojekt hervorragende Arbeit geleistet. Sehr empfehlenswert.', name: 'Mehmet Demir', company: 'Logistik Plus' },
      { quote: 'Wir haben beim Sondermaschinenbau Ergebnisse über unseren Erwartungen erzielt.', name: 'Fatma Kaya', company: 'Industrie Gruppe' },
    ],
  },
  certifications: {
    iso9001: 'ISO 9001',
    tse: 'TSE Zertifiziert',
    ce: 'CE Konform',
    quality: 'Qualitätsgarantie',
  },
  clients: {
    title: 'Unsere vertrauenswürdigen Partner',
    viewAll: 'Alle Partner Ansehen',
    industries: {
      tekstil: 'TEXTIL',
      celik: 'STAHL',
      lojistik: 'LOGISTIK',
      uretim: 'PRODUKTION',
      makine: 'MASCHINE',
      endustri: 'INDUSTRIE',
      otomasyon: 'AUTOMATISIERUNG',
      konveyor: 'FÖRDERER',
      metal: 'METALL',
    },
  },
  newsletter: {
    title: 'Newsletter abonnieren',
    description: 'Bleiben Sie über neue Projekte und Aktionen informiert.',
    placeholder: 'Ihre E-Mail-Adresse',
    button: 'Abonnieren',
    success: 'Erfolgreich abonniert!',
  },
  home: {
    certifications: {
      subtitle: 'Qualitätssicherung',
      title: 'Unsere Zertifikate',
    },
  },
  faq: {
    subtitle: 'Häufig gestellte Fragen',
    title: 'FAQ',
    items: [
      { question: 'Wie lange dauert die Projektlieferung?', answer: 'Je nach Projektgröße werden Standardprojekte innerhalb von 4-8 Wochen geliefert. Für dringende Projekte kann eine Sonderplanung erfolgen.' },
      { question: 'Wie lange ist die Garantiezeit?', answer: 'Alle unsere Produkte haben 2 Jahre Garantie. Wir bieten auch lebenslangen technischen Support und Ersatzteilgarantie.' },
      { question: 'Bieten Sie Service in der ganzen Türkei an?', answer: 'Ja, wir bieten Montage und Service in der gesamten Türkei an. Unsere erfahrenen Teams arbeiten vor Ort.' },
      { question: 'Bieten Sie kostenlose Besichtigungen an?', answer: 'Ja, wir bieten kostenlose Vor-Ort-Besichtigung und Projektplanung für alle Projekte an.' },
    ],
  },
  exports: exportsTranslations.de,
};


const fr = {
  nav: { 
    home: 'Accueil', 
    about: 'À propos',
    products: 'Produits', 
    engineering: 'Ingénierie', 
    projects: 'Projets', 
    exports: 'Nos Exportations',
    contact: 'Contact', 
    quickAccess: 'Accès rapide', 
    selectLanguage: 'Langue', 
    faq: 'FAQ', 
    testimonials: 'Avis', 
    partners: 'Partenaires', 
    viewAll: 'Voir Tout' 
  },
  hero: {
    badge: 'Excellence Industrielle',
    title1: 'INGÉNIERIE',
    title2: 'PUISSANTE',
    title3: 'AVENIR',
    title4: 'PARFAIT',
    description: 'Sous la direction d\'ABT MECHATRONICS; des systèmes de convoyage aux machines textiles, nous construisons l\'avenir industriel.',
    solutions: 'NOS SOLUTIONS',
    projects: 'NOS PROJETS',
    scroll: 'Défiler',
  },
  cta: {
    quickContact: {
      title: 'Discutons de votre projet',
      description: 'Déterminons ensemble la solution la plus adaptée à votre projet avec une consultation gratuite de 15 minutes.',
    },
    getQuote: 'Obtenir un devis maintenant',
    whatsapp: 'Message sur WhatsApp',
  },
  trust: {
    subtitle: 'FIABILITÉ',
    title: 'Qualité et Expérience',
    years: 'Années d\'expérience',
    projects: 'Projets terminés',
    clients: 'Clients satisfaits',
  },
  products: {
    subtitle: 'Nos Groupes de Produits',
    title: 'DOMAINES DE PRODUCTION',
    description: 'Solutions industrielles durables et efficaces spécialement conçues pour les installations haute capacité.',
    viewDetails: 'Voir les détails',
    getQuote: 'DEMANDER UN DEVIS',
    whatsappContact: 'Contact via WhatsApp',
    features: 'Caractéristiques',
    whyUs: 'Pourquoi nous?',
    gallery: 'Galerie',
    close: 'Fermer',
  },
  productItems: {
    konveyor: {
      title: 'Systèmes de Convoyage',
      subtitle: 'Systèmes de Transport',
      shortDesc: 'Convoyeurs à bande lourds, systèmes à chaîne et lignes de chargement automatiques.',
      modalSubtitle: 'Solutions de Transport Industriel',
      description: `Les systèmes de convoyage sont des systèmes mécaniques qui transportent automatiquement les matériaux d'un point à un autre.

**À quoi ça sert?**
Élimine le besoin de transport manuel des produits, matières premières ou colis.

**Comment ça fonctionne?**
Un système motorisé déplace continuellement les matériaux sur des bandes ou des rouleaux.

**Domaines d'application:**
• Lignes de production en usine
• Centres logistiques et entrepôts
• Systèmes de bagages d'aéroport
• Mines et carrières
• Installations de transformation alimentaire`,
      features: ['Capacité de charge lourde (500kg - 50 tonnes)', 'Conception modulaire', 'Systèmes intelligents contrôlés par PLC', 'Faible coût de maintenance', 'Fonctionnement 24/7', 'Options de bande spéciales'],
      whyUs: ['15+ ans d\'expérience', 'Visite sur site et conception gratuite', 'Équipe de montage nationale', '2 ans de garantie + support technique à vie', 'Garantie pièces détachées']
    },
    tekstil: {
      title: 'Machines Textiles',
      subtitle: 'Traitement des Tissus',
      shortDesc: 'Cylindres dock denim, machines d\'ouverture de tissu et systèmes de tension.',
      modalSubtitle: 'Technologies de Traitement des Tissus',
      description: `Les machines textiles sont des équipements spéciaux qui transforment les tissus bruts en produits prêts à l'emploi.

**À quoi ça sert?**
Automatise l'ouverture, l'étirement, l'enroulement, la coupe et le contrôle qualité des tissus.

**Domaines d'application:**
• Usines de denim
• Teintureries
• Ateliers de confection
• Exportateurs textiles`,
      features: ['Cylindres dock denim', 'Machines d\'ouverture automatiques', 'Systèmes de tension', 'Capteurs de contrôle qualité', 'Haute vitesse (120m/min)', 'Contrôle de tension précis'],
      whyUs: ['Service aux principales entreprises textiles', 'Équipe spécialisée denim', 'Réponse rapide aux pannes', 'Stock de pièces d\'origine', 'Formation et support opérateur']
    },
    celik: {
      title: 'Construction Métallique',
      subtitle: 'Systèmes de Construction',
      shortDesc: 'Bâtiments industriels, systèmes d\'entrepôt et structures en acier.',
      modalSubtitle: 'Systèmes de Construction Industrielle',
      description: `La construction métallique est le système de structure portante pour les bâtiments industriels et les entrepôts.

**À quoi ça sert?**
Couvre de grandes portées sans colonnes. Infrastructure idéale pour les chemins de grue.

**Domaines d'application:**
• Usines et installations de production
• Entrepôts logistiques
• Structures agricoles
• Salles de sport
• Centres commerciaux`,
      features: ['Conception antisismique', 'Montage rapide', 'Grandes portées (30m+)', 'Extension modulaire', 'Longue durée de vie (50+ ans)', 'Matériau recyclable'],
      whyUs: ['Clé en main avec projet statique', 'Matériau certifié TSE', 'Notre propre usine', 'Équipes de montage expérimentées', 'Prix compétitifs']
    },
    ozelMakine: {
      title: 'Conception de Machines Sur Mesure',
      subtitle: 'R&D & Conception',
      shortDesc: 'Ingénierie à partir de zéro, production de prototypes et solutions d\'automatisation.',
      modalSubtitle: 'Solutions d\'Ingénierie Sur Mesure',
      description: `La conception de machines sur mesure sont des projets d'ingénierie développés à partir de zéro.

**À quoi ça sert?**
Résout les besoins de production spéciaux non disponibles sur le marché.

**Domaines d'application:**
• Systèmes d'automatisation
• Machines d'emballage
• Appareils de test et mesure
• Lignes d'assemblage
• Applications robotiques`,
      features: ['Conception CAO 3D (SolidWorks)', 'Analyse FEA', 'Production de prototypes', 'Programmation PLC', 'Conception interface HMI', 'Support certification CE'],
      whyUs: ['Support complet de l\'idée à la production', 'Protection PI avec NDA', 'Conseil en subventions R&D', 'Garantie de révision', 'Surveillance et support à distance']
    }
  },
  engineering: {
    subtitle: 'Vision Ingénierie',
    title: 'CONCEPTION DE MACHINES &',
    title2: 'INTÉGRATION MÉCATRONIQUE',
    customDesign: 'Solutions de Conception Sur Mesure',
    customDesignDesc: 'Personnalisation complète dans la conception et les processus de production.',
    precision: 'Haute Précision',
    precisionDesc: 'Pièces mécaniques et qualité d\'assemblage nécessitant une précision micrométrique.',
    turnkey: 'Projets Clé en Main',
    turnkeyDesc: 'Gestion de projet de bout en bout, de la conception à la mise en service.',
    experience: 'Années d\'Expérience',
    completedProjects: 'Projets Réalisés',
  },
  projectsSection: { subtitle: 'Nos Projets', title: 'APERÇUS DE NOTRE TRAVAIL', videoGallery: 'Galerie Vidéo' },
  contact: {
    subtitle: 'Contactez-nous',
    title: 'CONCEVONS',
    title2: 'VOTRE PROJET ENSEMBLE',
    description: 'Nous offrons des solutions professionnelles pour vos besoins industriels.',
    whatsappTitle: 'Support WhatsApp',
    whatsappButton: 'Contact Rapide via WhatsApp',
    formTitle: 'Formulaire de Devis',
    name: 'Nom Complet',
    namePlaceholder: 'Votre nom complet',
    email: 'E-Mail',
    emailPlaceholder: 'exemple@entreprise.com',
    message: 'Votre Message',
    messagePlaceholder: 'Détails du projet ou votre demande...',
    submit: 'ENVOYER',
    submitting: 'ENVOI EN COURS...',
    successTitle: 'Message Reçu',
    successDesc: 'Nous vous contacterons dès que possible.',
  },
  footer: {
    description: 'Sous la direction d\'ABT MECHATRONICS, nous construisons l\'avenir des technologies de production industrielle.',
    quickAccess: 'Accès Rapide',
    productGroups: 'Groupes de Produits',
    contactTitle: 'Contact',
    contactSubtitle: 'Contactez-nous, nous vous offrons le meilleur service.',
    address: 'Adresse',
    phone: 'Téléphone',
    email: 'E-Mail',
    whatsappButton: 'Contactez-nous via WhatsApp',
    openInMaps: 'Ouvrir dans Google Maps',
    copyright: '© 2026 ABT MECHATRONICS IND. TRADE CO. LTD. Tous droits réservés.',
  },
  validation: {
    nameMin: 'Le nom doit contenir au moins 2 caractères',
    nameMax: 'Le nom peut contenir maximum 100 caractères',
    emailInvalid: 'Veuillez entrer une adresse e-mail valide',
    emailMax: 'L\'adresse e-mail est trop longue',
    messageMin: 'Votre message doit contenir au moins 10 caractères',
    messageMax: 'Votre message peut contenir maximum 2000 caractères',
  },
  notFound: {
    title: 'Page non trouvée',
    description: 'La page que vous recherchez n\'existe pas ou a été déplacée.',
    homeButton: 'Retour à l\'accueil',
    backButton: 'Retour',
    contactButton: 'Contact',
  },
  errorBoundary: {
    title: 'Quelque chose s\'est mal passé',
    description: 'Désolé, une erreur inattendue s\'est produite. Notre équipe technique a été informée.',
    retryButton: 'Réessayer',
    homeButton: 'Retour à l\'accueil',
  },
  cookie: {
    title: 'Politique de Cookies',
    message: 'Ce site utilise des cookies pour améliorer votre expérience.',
    details: 'Les cookies sont utilisés pour le bon fonctionnement du site et les analyses. Nous respectons votre vie privée.',
    accept: 'Accepter',
    decline: 'Refuser',
    close: 'Fermer',
    learnMore: 'En savoir plus',
  },
  whatsapp: {
    tooltip: 'Écrire sur WhatsApp',
  },
  exitPopup: {
    badge: '🎁 Offre Spéciale',
    title: 'Attendez!',
    subtitle: 'Nous avons une offre spéciale pour vous',
    description: 'Souhaitez-vous obtenir une visite gratuite et un devis pour vos projets?',
    whatsappButton: 'Contact via WhatsApp',
    contactButton: 'Formulaire de contact',
    dismiss: 'Non, merci',
  },
  testimonials: {
    subtitle: 'Avis Clients',
    title: 'TÉMOIGNAGES',
    items: [
      { quote: 'Ils ont livré notre système de convoyage à temps et avec qualité. Équipe professionnelle.', name: 'Ahmet Yilmaz', company: 'Textile SA' },
      { quote: 'Ils ont fait un excellent travail sur notre projet de construction métallique. Fortement recommandé.', name: 'Mehmet Demir', company: 'Logistique Plus' },
      { quote: 'Nous avons obtenu des résultats au-delà de nos attentes en conception de machines sur mesure.', name: 'Fatma Kaya', company: 'Groupe Industrie' },
    ],
  },
  certifications: {
    iso9001: 'ISO 9001',
    tse: 'Certifié TSE',
    ce: 'Conforme CE',
    quality: 'Garantie Qualité',
  },
  clients: {
    title: 'Nos partenaires de confiance',
    viewAll: 'Voir Tous Les Partenaires',
    industries: {
      tekstil: 'TEXTILE',
      celik: 'ACIER',
      lojistik: 'LOGISTIQUE',
      uretim: 'PRODUCTION',
      makine: 'MACHINE',
      endustri: 'INDUSTRIE',
      otomasyon: 'AUTOMATISATION',
      konveyor: 'CONVOYEUR',
      metal: 'MÉTAL',
    },
  },
  newsletter: {
    title: 'Abonnez-vous à notre newsletter',
    description: 'Restez informé des nouveaux projets et campagnes.',
    placeholder: 'Votre adresse e-mail',
    button: "S'abonner",
    success: 'Abonnement réussi!',
  },
  home: {
    certifications: {
      subtitle: 'Assurance Qualité',
      title: 'Nos Certificats',
    },
  },
  faq: {
    subtitle: 'Questions Fréquentes',
    title: 'FAQ',
    items: [
      { question: 'Quel est le délai de livraison du projet?', answer: 'Selon la taille du projet, les projets standard sont livrés dans un délai de 4 à 8 semaines. Une planification spéciale peut être faite pour les projets urgents.' },
      { question: 'Quelle est la période de garantie?', answer: 'Tous nos produits sont couverts par une garantie de 2 ans. Nous offrons également un support technique à vie et une garantie de pièces détachées.' },
      { question: 'Offrez-vous des services dans toute la Turquie?', answer: 'Oui, nous fournissons des services de montage et de maintenance dans toute la Turquie. Nos équipes expérimentées travaillent sur site.' },
      { question: 'Offrez-vous des visites gratuites?', answer: 'Oui, nous offrons des services gratuits de visite sur site et de conception de projet pour tous les projets.' },
    ],
  },
  exports: exportsTranslations.fr,
};


const es = {
  nav: { 
    home: 'Inicio', 
    about: 'Acerca de',
    products: 'Productos', 
    engineering: 'Ingeniería', 
    projects: 'Proyectos', 
    exports: 'Nuestras Exportaciones',
    contact: 'Contacto', 
    quickAccess: 'Acceso Rápido', 
    selectLanguage: 'Idioma', 
    faq: 'FAQ', 
    testimonials: 'Referencias', 
    partners: 'Socios', 
    viewAll: 'Ver Todo' 
  },
  hero: {
    badge: 'Excelencia Industrial',
    title1: 'INGENIERÍA',
    title2: 'PODEROSA',
    title3: 'FUTURO',
    title4: 'PERFECTO',
    description: 'Bajo el liderazgo de ABT MECHATRONICS; desde sistemas de transporte hasta maquinaria textil, construimos el futuro industrial.',
    solutions: 'NUESTRAS SOLUCIONES',
    projects: 'NUESTROS PROYECTOS',
    scroll: 'Desplazar',
  },
  cta: {
    quickContact: {
      title: 'Hablemos de su proyecto',
      description: 'Determinemos juntos la solución más adecuada para su proyecto con una consulta gratuita de 15 minutos.',
    },
    getQuote: 'Obtener cotización ahora',
    whatsapp: 'Mensaje en WhatsApp',
  },
  trust: {
    subtitle: 'CONFIABILIDAD',
    title: 'Calidad y Experiencia',
    years: 'Años de experiencia',
    projects: 'Proyectos completados',
    clients: 'Clientes satisfechos',
  },
  products: {
    subtitle: 'Nuestros Grupos de Productos',
    title: 'ÁREAS DE PRODUCCIÓN',
    description: 'Soluciones industriales duraderas y eficientes diseñadas especialmente para instalaciones de alta capacidad.',
    viewDetails: 'Ver Detalles',
    getQuote: 'SOLICITAR PRESUPUESTO',
    whatsappContact: 'Contacto por WhatsApp',
    features: 'Características',
    whyUs: '¿Por qué nosotros?',
    gallery: 'Galería',
    close: 'Cerrar',
  },
  productItems: {
    konveyor: {
      title: 'Sistemas de Transporte',
      subtitle: 'Sistemas de Transporte',
      shortDesc: 'Transportadores de banda pesada, sistemas de cadena y líneas de carga automáticas.',
      modalSubtitle: 'Soluciones de Transporte Industrial',
      description: `Los sistemas de transporte son sistemas mecánicos que transportan materiales automáticamente de un punto a otro.

**¿Para qué sirve?**
Elimina la necesidad de transporte manual de productos, materias primas o paquetes.

**¿Cómo funciona?**
Un sistema motorizado mueve continuamente los materiales sobre bandas o rodillos.

**Áreas de aplicación:**
• Líneas de producción en fábrica
• Centros logísticos y almacenes
• Sistemas de equipaje de aeropuerto
• Minas y canteras
• Instalaciones de procesamiento de alimentos`,
      features: ['Capacidad de carga pesada (500kg - 50 toneladas)', 'Diseño modular', 'Sistemas inteligentes controlados por PLC', 'Bajo costo de mantenimiento', 'Operación 24/7', 'Opciones de banda especiales'],
      whyUs: ['15+ años de experiencia', 'Visita in situ y diseño gratuito', 'Equipo de montaje nacional', '2 años de garantía + soporte técnico de por vida', 'Garantía de repuestos']
    },
    tekstil: {
      title: 'Maquinaria Textil',
      subtitle: 'Procesamiento de Telas',
      shortDesc: 'Cilindros dock denim, máquinas de apertura de tela y sistemas de tensión.',
      modalSubtitle: 'Tecnologías de Procesamiento de Telas',
      description: `Las máquinas textiles son equipos especiales que procesan telas crudas en productos listos para usar.

**¿Para qué sirve?**
Automatiza la apertura, estiramiento, enrollado, corte y control de calidad de telas.

**Áreas de aplicación:**
• Fábricas de denim
• Tintorerías
• Talleres de confección
• Exportadores textiles`,
      features: ['Cilindros dock denim', 'Máquinas de apertura automáticas', 'Sistemas de tensión', 'Sensores de control de calidad', 'Alta velocidad (120m/min)', 'Control de tensión preciso'],
      whyUs: ['Servicio a empresas textiles líderes', 'Equipo especializado en denim', 'Respuesta rápida a fallas', 'Stock de repuestos originales', 'Capacitación y soporte al operador']
    },
    celik: {
      title: 'Construcción de Acero',
      subtitle: 'Sistemas de Construcción',
      shortDesc: 'Edificios industriales, sistemas de almacén y estructuras de acero.',
      modalSubtitle: 'Sistemas de Construcción Industrial',
      description: `La construcción de acero es el sistema de estructura portante para edificios industriales y almacenes.

**¿Para qué sirve?**
Cubre grandes luces sin columnas. Infraestructura ideal para vías de grúa.

**Áreas de aplicación:**
• Fábricas e instalaciones de producción
• Almacenes logísticos
• Estructuras agrícolas
• Gimnasios
• Centros comerciales`,
      features: ['Diseño antisísmico', 'Montaje rápido', 'Grandes luces (30m+)', 'Expansión modular', 'Larga vida útil (50+ años)', 'Material reciclable'],
      whyUs: ['Llave en mano con proyecto estático', 'Material certificado TSE', 'Nuestra propia fábrica', 'Equipos de montaje experimentados', 'Precios competitivos']
    },
    ozelMakine: {
      title: 'Diseño de Máquinas Personalizadas',
      subtitle: 'I+D y Diseño',
      shortDesc: 'Ingeniería desde cero, producción de prototipos y soluciones de automatización.',
      modalSubtitle: 'Soluciones de Ingeniería Personalizadas',
      description: `El diseño de máquinas personalizadas son proyectos de ingeniería desarrollados desde cero.

**¿Para qué sirve?**
Resuelve necesidades de producción especiales no disponibles en el mercado.

**Áreas de aplicación:**
• Sistemas de automatización
• Máquinas de embalaje
• Dispositivos de prueba y medición
• Líneas de ensamblaje
• Aplicaciones robóticas`,
      features: ['Diseño CAD 3D (SolidWorks)', 'Análisis FEA', 'Producción de prototipos', 'Programación PLC', 'Diseño de interfaz HMI', 'Soporte de certificación CE'],
      whyUs: ['Soporte completo de la idea a la producción', 'Protección PI con NDA', 'Consultoría en subvenciones I+D', 'Garantía de revisión', 'Monitoreo y soporte remoto']
    }
  },
  engineering: {
    subtitle: 'Visión de Ingeniería',
    title: 'DISEÑO DE MÁQUINAS &',
    title2: 'INTEGRACIÓN MECATRÓNICA',
    customDesign: 'Soluciones de Diseño Personalizado',
    customDesignDesc: 'Personalización completa en diseño y procesos de producción.',
    precision: 'Alta Precisión',
    precisionDesc: 'Piezas mecánicas y calidad de ensamblaje que requieren precisión micrométrica.',
    turnkey: 'Proyectos Llave en Mano',
    turnkeyDesc: 'Gestión de proyectos de principio a fin, desde el diseño hasta la puesta en marcha.',
    experience: 'Años de Experiencia',
    completedProjects: 'Proyectos Completados',
  },
  projectsSection: { subtitle: 'Nuestros Proyectos', title: 'INSTANTÁNEAS DE NUESTRO TRABAJO', videoGallery: 'Galería de Videos' },
  contact: {
    subtitle: 'Contáctenos',
    title: 'DISEÑEMOS',
    title2: 'SU PROYECTO JUNTOS',
    description: 'Ofrecemos soluciones profesionales para sus necesidades industriales.',
    whatsappTitle: 'Soporte WhatsApp',
    whatsappButton: 'Contacto Rápido por WhatsApp',
    formTitle: 'Formulario de Presupuesto',
    name: 'Nombre Completo',
    namePlaceholder: 'Su nombre completo',
    email: 'Correo Electrónico',
    emailPlaceholder: 'ejemplo@empresa.com',
    message: 'Su Mensaje',
    messagePlaceholder: 'Detalles del proyecto o su solicitud...',
    submit: 'ENVIAR',
    submitting: 'ENVIANDO...',
    successTitle: 'Mensaje Recibido',
    successDesc: 'Nos pondremos en contacto con usted lo antes posible.',
  },
  footer: {
    description: 'Bajo el liderazgo de ABT MECHATRONICS, construimos el futuro de las tecnologías de producción industrial.',
    quickAccess: 'Acceso Rápido',
    productGroups: 'Grupos de Productos',
    contactTitle: 'Contacto',
    contactSubtitle: 'Contáctenos, le ofrecemos el mejor servicio.',
    address: 'Dirección',
    phone: 'Teléfono',
    email: 'Correo Electrónico',
    whatsappButton: 'Contáctenos por WhatsApp',
    openInMaps: 'Abrir en Google Maps',
    copyright: '© 2026 ABT MECHATRONICS IND. TRADE CO. LTD. Todos los derechos reservados.',
  },
  validation: {
    nameMin: 'El nombre debe tener al menos 2 caracteres',
    nameMax: 'El nombre puede tener máximo 100 caracteres',
    emailInvalid: 'Por favor ingrese una dirección de correo válida',
    emailMax: 'La dirección de correo es demasiado larga',
    messageMin: 'Su mensaje debe tener al menos 10 caracteres',
    messageMax: 'Su mensaje puede tener máximo 2000 caracteres',
  },
  notFound: {
    title: 'Página no encontrada',
    description: 'La página que busca no existe o ha sido movida.',
    homeButton: 'Ir al inicio',
    backButton: 'Volver',
    contactButton: 'Contacto',
  },
  errorBoundary: {
    title: 'Algo salió mal',
    description: 'Lo sentimos, ocurrió un error inesperado. Nuestro equipo técnico ha sido notificado.',
    retryButton: 'Intentar de nuevo',
    homeButton: 'Ir al inicio',
  },
  cookie: {
    title: 'Política de Cookies',
    message: 'Este sitio web utiliza cookies para mejorar su experiencia.',
    details: 'Las cookies se utilizan para el correcto funcionamiento del sitio web y análisis. Respetamos su privacidad.',
    accept: 'Aceptar',
    decline: 'Rechazar',
    close: 'Cerrar',
    learnMore: 'Más información',
  },
  whatsapp: {
    tooltip: 'Escribir en WhatsApp',
  },
  exitPopup: {
    badge: '🎁 Oferta Especial',
    title: '¡Espere!',
    subtitle: 'Tenemos una oferta especial para usted',
    description: '¿Le gustaría obtener una visita gratuita y un presupuesto para sus proyectos?',
    whatsappButton: 'Contacto por WhatsApp',
    contactButton: 'Formulario de contacto',
    dismiss: 'No, gracias',
  },
  testimonials: {
    subtitle: 'Opiniones de Clientes',
    title: 'TESTIMONIOS',
    items: [
      { quote: 'Entregaron nuestro sistema de transporte a tiempo y con calidad. Equipo profesional.', name: 'Ahmet Yilmaz', company: 'Textil SA' },
      { quote: 'Hicieron un excelente trabajo en nuestro proyecto de construcción de acero. Muy recomendado.', name: 'Mehmet Demir', company: 'Logística Plus' },
      { quote: 'Obtuvimos resultados más allá de nuestras expectativas en diseño de máquinas personalizadas.', name: 'Fatma Kaya', company: 'Grupo Industrial' },
    ],
  },
  certifications: {
    iso9001: 'ISO 9001',
    tse: 'Certificado TSE',
    ce: 'Conforme CE',
    quality: 'Garantía de Calidad',
  },
  clients: {
    title: 'Nuestros socios de confianza',
    viewAll: 'Ver Todos Los Socios',
    industries: {
      tekstil: 'TEXTIL',
      celik: 'ACERO',
      lojistik: 'LOGÍSTICA',
      uretim: 'PRODUCCIÓN',
      makine: 'MÁQUINA',
      endustri: 'INDUSTRIA',
      otomasyon: 'AUTOMATIZACIÓN',
      konveyor: 'TRANSPORTADOR',
      metal: 'METAL',
    },
  },
  newsletter: {
    title: 'Suscríbase a nuestro boletín',
    description: 'Manténgase informado sobre nuevos proyectos y campañas.',
    placeholder: 'Su dirección de correo',
    button: 'Suscribirse',
    success: '¡Suscripción exitosa!',
  },
  home: {
    certifications: {
      subtitle: 'Garantía de Calidad',
      title: 'Nuestros Certificados',
    },
  },
  faq: {
    subtitle: 'Preguntas Frecuentes',
    title: 'FAQ',
    items: [
      { question: '¿Cuál es el tiempo de entrega del proyecto?', answer: 'Dependiendo del tamaño del proyecto, los proyectos estándar se entregan en 4-8 semanas. Se puede hacer una planificación especial para proyectos urgentes.' },
      { question: '¿Cuál es el período de garantía?', answer: 'Todos nuestros productos tienen una garantía de 2 años. También ofrecemos soporte técnico de por vida y garantía de repuestos.' },
      { question: '¿Ofrecen servicios en toda Turquía?', answer: 'Sí, proporcionamos servicios de montaje y mantenimiento en toda Turquía. Nuestros equipos experimentados trabajan en el sitio.' },
      { question: '¿Ofrecen visitas gratuitas?', answer: 'Sí, ofrecemos servicios gratuitos de visita en sitio y diseño de proyectos para todos los proyectos.' },
    ],
  },
  exports: exportsTranslations.es,
};


const ar = {
  nav: {
    home: 'الرئيسية',
    about: 'من نحن',
    products: 'المنتجات',
    engineering: 'الهندسة',
    projects: 'المشاريع',
    exports: 'صادراتنا',
    contact: 'اتصل بنا',
    quickAccess: 'الوصول السريع',
    selectLanguage: 'اللغة',
    faq: 'الأسئلة الشائعة',
    testimonials: 'المراجع',
    partners: 'الشركاء',
    viewAll: 'عرض الكل',
  },
  hero: {
    badge: 'التميز الصناعي',
    title1: 'هندسة',
    title2: 'قوية',
    title3: 'مستقبل',
    title4: 'مثالي',
    description: 'تحت قيادة ABT MECHATRONICS؛ من أنظمة النقل إلى آلات النسيج، نبني المستقبل الصناعي.',
    solutions: 'حلولنا',
    projects: 'مشاريعنا',
    scroll: 'مرر',
  },
  cta: {
    quickContact: {
      title: 'لنناقش مشروعك',
      description: 'دعنا نحدد معًا الحل الأنسب لمشروعك من خلال استشارة مجانية لمدة 15 دقيقة.',
    },
    getQuote: 'احصل على عرض أسعار الآن',
    whatsapp: 'رسالة على واتساب',
  },
  trust: {
    subtitle: 'الموثوقية',
    title: 'الجودة والخبرة',
    years: 'سنوات من الخبرة',
    projects: 'المشاريع المكتملة',
    clients: 'العملاء السعداء',
  },
  products: {
    subtitle: 'مجموعات منتجاتنا',
    title: 'مجالات الإنتاج',
    description: 'حلول صناعية متينة وفعالة مصممة خصيصًا للمنشآت عالية السعة.',
    viewDetails: 'عرض التفاصيل',
    getQuote: 'احصل على عرض سعر',
    whatsappContact: 'تواصل عبر واتساب',
    features: 'المميزات',
    whyUs: 'لماذا نحن؟',
    gallery: 'المعرض',
    close: 'إغلاق',
  },
  productItems: {
    konveyor: {
      title: 'أنظمة النقل',
      subtitle: 'أنظمة النقل',
      shortDesc: 'ناقلات حزام ثقيلة، أنظمة سلسلة وخطوط تحميل أوتوماتيكية.',
      modalSubtitle: 'حلول النقل الصناعي',
      description: `أنظمة النقل هي أنظمة ميكانيكية تنقل المواد تلقائيًا من نقطة إلى أخرى. تُستخدم في كل قطاع من المصانع إلى مراكز اللوجستيات.

**ما الذي تفعله؟**
تلغي الحاجة إلى النقل اليدوي للمنتجات أو المواد الخام أو الطرود. توفر العمالة، تزيد سرعة الإنتاج وتحسن سلامة مكان العمل.

**كيف تعمل؟**
نظام بمحرك يحرك المواد باستمرار على الأحزمة أو البكرات. يمكن التوجيه الذكي باستخدام المستشعرات ووحدات التحكم.

**مجالات التطبيق:**
• خطوط الإنتاج في المصانع
• مراكز المستودعات واللوجستيات
• أنظمة الأمتعة في المطارات
• المناجم والمحاجر
• منشآت تصنيع الأغذية`,
      features: [
        'سعة حمولة ثقيلة (500 كجم - 50 طن)',
        'تصميم معياري - توسيع سهل',
        'أنظمة ذكية يتحكم فيها PLC',
        'تكلفة صيانة منخفضة',
        'تشغيل 24/7 بدون انقطاع',
        'خيارات حزام خاصة (مقاومة للحرارة والزيت والتآكل)'
      ],
      whyUs: [
        'أكثر من 15 عامًا من الخبرة الميدانية',
        'مسح في الموقع وتصميم مشروع مجاني',
        'فريق تركيب في جميع أنحاء تركيا',
        'ضمان سنتين + دعم فني مدى الحياة',
        'ضمان قطع الغيار'
      ]
    },
    tekstil: {
      title: 'آلات النسيج',
      subtitle: 'معالجة الأقمشة',
      shortDesc: 'أسطوانات رصيف الدنيم، آلات فتح القماش وأنظمة الشد.',
      modalSubtitle: 'تقنيات معالجة الأقمشة',
      description: `آلات النسيج هي معدات خاصة تعالج القماش الخام إلى حالة جاهزة للاستخدام. نقدم حلولاً لجميع أنواع الأقمشة بما في ذلك الدنيم والقطن والبوليستر.

**ما الذي تفعله؟**
تؤتمت عمليات فتح القماش والشد واللف والقطع ومراقبة الجودة. تقلل العمل اليدوي وتوحد جودة الإنتاج.

**كيف تعمل؟**
تفتح أسطوانات الرصيف القماش بالتساوي، وتزيل أنظمة الشد التجاعيد، وتكتشف المستشعرات العيوب. يتم التحكم في العملية بأكملها بواسطة PLC.

**مجالات التطبيق:**
• مصانع الدنيم
• مصابغ الأقمشة
• ورش الملابس
• مصدرو المنسوجات
• مصنعو المنسوجات المنزلية`,
      features: [
        'أسطوانات رصيف الدنيم (طلاء خاص)',
        'آلات فتح القماش الأوتوماتيكية',
        'أنظمة الشد والتصحيح',
        'مستشعرات مراقبة الجودة',
        'سرعة عالية (120 م/دقيقة)',
        'تحكم دقيق في الشد'
      ],
      whyUs: [
        'خدمة شركات النسيج الرائدة في تركيا',
        'فريق متخصص في قطاع الدنيم',
        'استجابة سريعة للأعطال (خلال 24 ساعة)',
        'مخزون قطع غيار أصلية',
        'تدريب ودعم المشغل'
      ]
    },
    celik: {
      title: 'الإنشاءات الفولاذية',
      subtitle: 'أنظمة البناء',
      shortDesc: 'مباني المصانع، أنظمة المستودعات والهياكل الفولاذية الصناعية.',
      modalSubtitle: 'أنظمة البناء الصناعي',
      description: `الإنشاءات الفولاذية هي نظام الهيكل الحامل لمباني المصانع والمستودعات والمنشآت الصناعية.

**ما الذي تفعله؟**
تغطي مساحات واسعة بدون تقسيم بالأعمدة. توفر بنية تحتية مثالية لمسارات الرافعات وأنظمة المنصات وهياكل الآلات.

**كيف تعمل؟**
يتم ربط الملفات الفولاذية باللحام والمسامير لتشكيل هيكل صلب. مصممة لتحمل أحمال الزلازل والرياح بحسابات ثابتة.

**مجالات التطبيق:**
• المصانع ومنشآت الإنتاج
• مستودعات اللوجستيات
• الهياكل الزراعية
• الصالات الرياضية
• مراكز التسوق`,
      features: [
        'تصميم مقاوم للزلازل',
        'تركيب سريع (أسرع بنسبة 60% من الخرسانة المسلحة)',
        'فتحات واسعة (تباعد أعمدة 30 م+)',
        'إمكانية التوسع المعياري',
        'عمر طويل (50+ سنة)',
        'مواد قابلة لإعادة التدوير'
      ],
      whyUs: [
        'تسليم مفتاح بما في ذلك المشروع الثابت',
        'استخدام مواد معتمدة من TSE',
        'منشأة إنتاج خاصة بنا',
        'فرق تركيب ذات خبرة',
        'أسعار تنافسية'
      ]
    },
    ozelMakine: {
      title: 'تصميم الآلات المخصصة',
      subtitle: 'البحث والتطوير والتصميم',
      shortDesc: 'هندسة من الصفر، إنتاج النماذج الأولية وحلول الأتمتة.',
      modalSubtitle: 'حلول هندسية من الصفر',
      description: `تصميم الآلات المخصصة هو مشاريع هندسية تُطور من الصفر عندما تكون الحلول القياسية غير كافية.

**ما الذي تفعله؟**
تحل احتياجات الإنتاج الخاصة غير المتوفرة في السوق أو التي لا تستطيع الآلات الموجودة تلبيتها.

**كيف تعمل؟**
تحليل الاحتياجات ← تصميم المفهوم ← النمذجة ثلاثية الأبعاد ← النموذج الأولي ← الاختبار ← الإنتاج التسلسلي.

**مجالات التطبيق:**
• أنظمة الأتمتة
• آلات التعبئة والتغليف
• أجهزة الاختبار والقياس
• خطوط التجميع
• التطبيقات الروبوتية`,
      features: [
        'تصميم CAD ثلاثي الأبعاد (SolidWorks)',
        'تحليل FEA (حساب القوة)',
        'إنتاج النماذج الأولية',
        'برمجة PLC',
        'تصميم واجهة HMI',
        'دعم شهادة CE'
      ],
      whyUs: [
        'دعم كامل من الفكرة إلى الإنتاج',
        'حماية الملكية الفكرية مع اتفاقية عدم الإفصاح',
        'استشارات حوافز البحث والتطوير',
        'ضمان المراجعة',
        'المراقبة والدعم عن بُعد'
      ]
    }
  },
  engineering: {
    subtitle: 'رؤية الهندسة',
    title: 'تصميم الآلات المخصصة و',
    title2: 'تكامل الميكاترونيك',
    customDesign: 'حلول التصميم المخصص',
    customDesignDesc: 'تخصيص كامل في تصميم المشروع وعمليات الإنتاج وفقًا للاحتياجات.',
    precision: 'دقة عالية',
    precisionDesc: 'أجزاء ميكانيكية وجودة تجميع تتطلب دقة على مستوى الميكرون.',
    turnkey: 'مشاريع تسليم مفتاح',
    turnkeyDesc: 'إدارة المشروع من البداية إلى النهاية من التصميم إلى التجميع والتشغيل.',
    experience: 'سنوات الخبرة',
    completedProjects: 'المشاريع المنجزة',
  },
  projectsSection: {
    subtitle: 'مشاريعنا',
    title: 'لقطات من أعمالنا',
    videoGallery: 'معرض الفيديو',
  },
  contact: {
    subtitle: 'اتصل بنا',
    title: 'لنصمم',
    title2: 'مشروعك معًا',
    description: 'نقدم حلولاً احترافية لاحتياجاتك الصناعية. املأ النموذج للحصول على عرض أسعار أو معلومات مفصلة.',
    whatsappTitle: 'خط دعم واتساب',
    whatsappButton: 'تواصل سريع عبر واتساب',
    formTitle: 'نموذج عرض الأسعار',
    name: 'الاسم الكامل',
    namePlaceholder: 'اسمك الكامل',
    email: 'البريد الإلكتروني',
    emailPlaceholder: 'example@company.com',
    message: 'رسالتك',
    messagePlaceholder: 'تفاصيل المشروع أو طلبك...',
    submit: 'إرسال',
    submitting: 'جارٍ الإرسال...',
    successTitle: 'تم استلام الرسالة',
    successDesc: 'سنتواصل معك في أقرب وقت ممكن.',
  },
  footer: {
    description: 'تحت قيادة ABT MECHATRONICS؛ نبني المستقبل في تقنيات الإنتاج الصناعي. دقة عالية، هندسة قوية.',
    quickAccess: 'الوصول السريع',
    productGroups: 'مجموعات المنتجات',
    contactTitle: 'اتصل بنا',
    contactSubtitle: 'اتصل بنا، دعنا نقدم لك أفضل خدمة.',
    address: 'العنوان',
    phone: 'الهاتف',
    email: 'البريد الإلكتروني',
    whatsappButton: 'اتصل بنا عبر واتساب',
    openInMaps: 'افتح في خرائط جوجل',
    copyright: '© 2026 ABT ميكاترونيك للصناعة والتجارة المحدودة. جميع الحقوق محفوظة.',
  },
  validation: {
    nameMin: 'يجب أن يكون الاسم حرفين على الأقل',
    nameMax: 'يمكن أن يكون الاسم 100 حرف كحد أقصى',
    emailInvalid: 'يرجى إدخال عنوان بريد إلكتروني صالح',
    emailMax: 'عنوان البريد الإلكتروني طويل جدًا',
    messageMin: 'يجب أن تكون رسالتك 10 أحرف على الأقل',
    messageMax: 'يمكن أن تكون رسالتك 2000 حرف كحد أقصى',
  },
  notFound: {
    title: 'الصفحة غير موجودة',
    description: 'الصفحة التي تبحث عنها غير موجودة أو ربما تم نقلها.',
    homeButton: 'العودة للرئيسية',
    backButton: 'رجوع',
    contactButton: 'اتصل بنا',
  },
  errorBoundary: {
    title: 'حدث خطأ ما',
    description: 'عذراً، حدث خطأ غير متوقع. تم إبلاغ فريقنا التقني.',
    retryButton: 'حاول مرة أخرى',
    homeButton: 'العودة للرئيسية',
  },
  cookie: {
    title: 'سياسة ملفات تعريف الارتباط',
    message: 'يستخدم هذا الموقع ملفات تعريف الارتباط لتحسين تجربتك.',
    details: 'تُستخدم ملفات تعريف الارتباط لضمان عمل الموقع بشكل صحيح والتحليلات. نحن نحترم خصوصيتك.',
    accept: 'قبول',
    decline: 'رفض',
    close: 'إغلاق',
    learnMore: 'معرفة المزيد',
  },
  whatsapp: {
    tooltip: 'تحدث على واتساب',
  },
  exitPopup: {
    badge: '🎁 عرض خاص',
    title: 'انتظر!',
    subtitle: 'لدينا عرض خاص لك',
    description: 'هل ترغب في الحصول على زيارة موقع مجانية وعرض أسعار لمشاريعك؟',
    whatsappButton: 'تواصل عبر واتساب',
    contactButton: 'نموذج الاتصال',
    dismiss: 'لا، شكرًا',
  },
  testimonials: {
    subtitle: 'آراء العملاء',
    title: 'المراجع',
    items: [
      { quote: 'قاموا بتسليم نظام النقل الخاص بنا في الوقت المحدد وبجودة عالية. فريق محترف.', name: 'أحمد يلماز', company: 'شركة النسيج' },
      { quote: 'قاموا بعمل ممتاز في مشروع الإنشاءات الفولاذية الخاص بنا. أوصي بهم بشدة.', name: 'محمد دمير', company: 'لوجستيك بلس' },
      { quote: 'حصلنا على نتائج تفوق توقعاتنا في تصميم الآلات المخصصة.', name: 'فاطمة كايا', company: 'مجموعة الصناعة' },
    ],
  },
  certifications: {
    iso9001: '9001 ISO',
    tse: 'معتمد TSE',
    ce: 'متوافق CE',
    quality: 'ضمان الجودة',
  },
  clients: {
    title: 'شركاؤنا الموثوقون',
    viewAll: 'عرض جميع الشركاء',
    industries: {
      tekstil: 'النسيج',
      celik: 'الصلب',
      lojistik: 'اللوجستيات',
      uretim: 'الإنتاج',
      makine: 'الآلات',
      endustri: 'الصناعة',
      otomasyon: 'الأتمتة',
      konveyor: 'الناقل',
      metal: 'المعادن',
    },
  },
  newsletter: {
    title: 'اشترك في نشرتنا الإخبارية',
    description: 'ابق على اطلاع بالمشاريع والحملات الجديدة.',
    placeholder: 'عنوان بريدك الإلكتروني',
    button: 'اشترك',
    success: 'تم الاشتراك بنجاح!',
  },
  home: {
    certifications: {
      subtitle: 'ضمان الجودة',
      title: 'شهاداتنا',
    },
  },
  faq: {
    subtitle: 'الأسئلة الشائعة',
    title: 'الأسئلة المتكررة',
    items: [
      { question: 'ما هو وقت تسليم المشروع؟', answer: 'حسب حجم المشروع، يتم تسليم المشاريع القياسية خلال 4-8 أسابيع. يمكن إجراء تخطيط خاص للمشاريع العاجلة.' },
      { question: 'ما هي فترة الضمان؟', answer: 'جميع منتجاتنا مشمولة بضمان سنتين. كما نقدم دعمًا فنيًا مدى الحياة وضمان قطع الغيار.' },
      { question: 'هل تقدمون خدمات في جميع أنحاء تركيا؟', answer: 'نعم، نقدم خدمات التركيب والصيانة في جميع أنحاء تركيا. فرقنا ذات الخبرة تعمل في الموقع.' },
      { question: 'هل تقدمون زيارات موقع مجانية؟', answer: 'نعم، نقدم خدمات زيارة الموقع وتصميم المشروع مجانًا لجميع المشاريع.' },
    ],
  },
  exports: exportsTranslations.ar,
};


const ru = {
  nav: {
    home: 'Главная',
    about: 'О нас',
    products: 'Продукция',
    engineering: 'Инжиниринг',
    projects: 'Проекты',
    exports: 'Наш экспорт',
    contact: 'Контакты',
    quickAccess: 'Быстрый доступ',
    selectLanguage: 'Язык',
    faq: 'FAQ',
    testimonials: 'Отзывы',
    partners: 'Партнёры',
    viewAll: 'Посмотреть все',
  },
  hero: {
    badge: 'Промышленное Совершенство',
    title1: 'МОЩНАЯ',
    title2: 'ИНЖЕНЕРИЯ',
    title3: 'БЕЗУПРЕЧНОЕ',
    title4: 'БУДУЩЕЕ',
    description: 'Под руководством ABT MECHATRONICS; от конвейерных систем до текстильного оборудования, мы строим промышленное будущее.',
    solutions: 'НАШИ РЕШЕНИЯ',
    projects: 'НАШИ ПРОЕКТЫ',
    scroll: 'Прокрутить',
  },
  cta: {
    quickContact: {
      title: 'Давайте обсудим ваш проект',
      description: 'Давайте вместе определим наиболее подходящее решение для вашего проекта с помощью 15-минутной бесплатной консультации.',
    },
    getQuote: 'Получить предложение сейчас',
    whatsapp: 'Сообщение в WhatsApp',
  },
  trust: {
    subtitle: 'НАДЕЖНОСТЬ',
    title: 'Качество и Опыт',
    years: 'Лет опыта',
    projects: 'Завершенных проектов',
    clients: 'Довольных клиентов',
  },
  products: {
    subtitle: 'Наши Группы Продукции',
    title: 'ПРОИЗВОДСТВЕННЫЕ ОБЛАСТИ',
    description: 'Долговечные и эффективные промышленные решения, специально разработанные для высокопроизводительных объектов.',
    viewDetails: 'Подробнее',
    getQuote: 'ПОЛУЧИТЬ ПРЕДЛОЖЕНИЕ',
    whatsappContact: 'Связаться через WhatsApp',
    features: 'Характеристики',
    whyUs: 'Почему мы?',
    gallery: 'Галерея',
    close: 'Закрыть',
  },
  productItems: {
    konveyor: {
      title: 'Конвейерные Системы',
      subtitle: 'Транспортные Системы',
      shortDesc: 'Тяжелые ленточные конвейеры, цепные системы и автоматические линии загрузки.',
      modalSubtitle: 'Промышленные Транспортные Решения',
      description: `Конвейерные системы - это механические системы, которые автоматически транспортируют материалы из одной точки в другую. Используются во всех секторах от заводов до логистических центров.

**Для чего это нужно?**
Устраняет необходимость ручной транспортировки продукции, сырья или упаковок. Экономит рабочую силу, увеличивает скорость производства и повышает безопасность труда.

**Как это работает?**
Моторизованная система непрерывно перемещает материалы по лентам или роликам. Интеллектуальная маршрутизация может осуществляться с помощью датчиков и блоков управления.

**Области применения:**
• Производственные линии на заводах
• Складские и логистические центры
• Системы багажа в аэропортах
• Шахты и карьеры
• Предприятия пищевой промышленности`,
      features: [
        'Грузоподъёмность (500кг - 50 тонн)',
        'Модульная конструкция - лёгкое расширение',
        'Интеллектуальные системы с ПЛК',
        'Низкие затраты на обслуживание',
        'Непрерывная работа 24/7',
        'Специальные ленты (термостойкие, маслостойкие, износостойкие)'
      ],
      whyUs: [
        '15+ лет опыта работы',
        'Выезд на объект и бесплатное проектирование',
        'Монтажная команда по всей Турции',
        '2 года гарантии + пожизненная техподдержка',
        'Гарантия запчастей'
      ]
    },
    tekstil: {
      title: 'Текстильное Оборудование',
      subtitle: 'Обработка Тканей',
      shortDesc: 'Док-цилиндры для денима, машины для раскрытия ткани и системы натяжения.',
      modalSubtitle: 'Технологии Обработки Тканей',
      description: `Текстильное оборудование - это специальное оборудование, которое обрабатывает сырую ткань до готового к использованию состояния. Мы предлагаем решения для всех типов тканей, включая деним, хлопок, полиэстер.

**Для чего это нужно?**
Автоматизирует процессы раскрытия, растяжения, намотки, резки и контроля качества ткани. Минимизирует ручной труд, стандартизирует качество производства.

**Как это работает?**
Док-цилиндры равномерно раскрывают ткань, системы натяжения устраняют складки, датчики обнаруживают дефекты. Весь процесс контролируется ПЛК.

**Области применения:**
• Фабрики денима
• Красильни тканей
• Швейные мастерские
• Экспортёры текстиля
• Производители домашнего текстиля`,
      features: [
        'Док-цилиндры для денима (специальное покрытие)',
        'Автоматические машины раскрытия ткани',
        'Системы натяжения и коррекции',
        'Датчики контроля качества',
        'Высокая скорость (120м/мин)',
        'Точный контроль натяжения'
      ],
      whyUs: [
        'Обслуживание ведущих текстильных компаний Турции',
        'Команда, специализирующаяся на дениме',
        'Быстрое реагирование на неисправности (в течение 24 часов)',
        'Склад оригинальных запчастей',
        'Обучение и поддержка операторов'
      ]
    },
    celik: {
      title: 'Стальные Конструкции',
      subtitle: 'Строительные Системы',
      shortDesc: 'Заводские здания, складские системы и промышленные стальные каркасы.',
      modalSubtitle: 'Промышленные Строительные Системы',
      description: `Стальные конструкции - это несущая каркасная система для заводских зданий, складов и промышленных объектов.

**Для чего это нужно?**
Перекрывает большие пролёты без разделения колоннами. Обеспечивает идеальную инфраструктуру для крановых путей, платформенных систем и станин оборудования.

**Как это работает?**
Стальные профили соединяются сваркой и болтами, образуя жёсткий каркас. Проектируется с учётом сейсмических и ветровых нагрузок на основе статических расчётов.

**Области применения:**
• Заводы и производственные объекты
• Логистические склады
• Сельскохозяйственные сооружения
• Спортивные залы
• Торговые центры`,
      features: [
        'Сейсмостойкая конструкция',
        'Быстрый монтаж (на 60% быстрее железобетона)',
        'Большие пролёты (30м+ между колоннами)',
        'Возможность модульного расширения',
        'Долгий срок службы (50+ лет)',
        'Перерабатываемый материал'
      ],
      whyUs: [
        'Под ключ включая статический проект',
        'Использование материалов с сертификатом TSE',
        'Собственное производственное предприятие',
        'Опытные монтажные бригады',
        'Конкурентные цены'
      ]
    },
    ozelMakine: {
      title: 'Индивидуальное Проектирование Машин',
      subtitle: 'НИОКР и Проектирование',
      shortDesc: 'Инжиниринг с нуля, производство прототипов и решения по автоматизации.',
      modalSubtitle: 'Инженерные Решения с Нуля',
      description: `Индивидуальное проектирование машин - это инженерные проекты, разработанные с нуля, когда стандартные решения недостаточны.

**Для чего это нужно?**
Решает специальные производственные потребности, которые недоступны на рынке или не могут быть удовлетворены существующими машинами.

**Как это работает?**
Анализ потребностей → Концептуальное проектирование → 3D-моделирование → Прототип → Тестирование → Серийное производство.

**Области применения:**
• Системы автоматизации
• Упаковочные машины
• Испытательное и измерительное оборудование
• Сборочные линии
• Робототехнические приложения`,
      features: [
        '3D CAD проектирование (SolidWorks)',
        'FEA анализ (расчёт прочности)',
        'Производство прототипов',
        'Программирование ПЛК',
        'Проектирование HMI интерфейса',
        'Поддержка сертификации CE'
      ],
      whyUs: [
        'Полная поддержка от идеи до производства',
        'Защита интеллектуальной собственности с NDA',
        'Консультации по стимулам НИОКР',
        'Гарантия доработки',
        'Удалённый мониторинг и поддержка'
      ]
    }
  },
  engineering: {
    subtitle: 'Инженерное Видение',
    title: 'ИНДИВИДУАЛЬНОЕ ПРОЕКТИРОВАНИЕ МАШИН &',
    title2: 'МЕХАТРОННАЯ ИНТЕГРАЦИЯ',
    customDesign: 'Индивидуальные Проектные Решения',
    customDesignDesc: 'Полная кастомизация в проектировании и производственных процессах в соответствии с потребностями.',
    precision: 'Высокая Точность',
    precisionDesc: 'Механические детали и качество сборки, требующие микронной точности.',
    turnkey: 'Проекты Под Ключ',
    turnkeyDesc: 'Комплексное управление проектом от проектирования до монтажа и ввода в эксплуатацию.',
    experience: 'Лет Опыта',
    completedProjects: 'Завершённых Проектов',
  },
  projectsSection: {
    subtitle: 'Наши Проекты',
    title: 'КАДРЫ ИЗ НАШЕЙ РАБОТЫ',
    videoGallery: 'Видеогалерея',
  },
  contact: {
    subtitle: 'Свяжитесь с Нами',
    title: 'ДАВАЙТЕ СПРОЕКТИРУЕМ',
    title2: 'ВАШ ПРОЕКТ ВМЕСТЕ',
    description: 'Мы предлагаем профессиональные решения для ваших промышленных потребностей. Заполните форму, чтобы получить предложение или подробную информацию.',
    whatsappTitle: 'Линия Поддержки WhatsApp',
    whatsappButton: 'Быстрая Связь через WhatsApp',
    formTitle: 'Форма Запроса Предложения',
    name: 'Полное Имя',
    namePlaceholder: 'Ваше полное имя',
    email: 'Эл. Почта',
    emailPlaceholder: 'primer@kompaniya.com',
    message: 'Ваше Сообщение',
    messagePlaceholder: 'Детали проекта или ваш запрос...',
    submit: 'ОТПРАВИТЬ',
    submitting: 'ОТПРАВКА...',
    successTitle: 'Сообщение Получено',
    successDesc: 'Мы свяжемся с вами в ближайшее время.',
  },
  footer: {
    description: 'Под руководством ABT MECHATRONICS; мы строим будущее в промышленных производственных технологиях. Высокая точность, мощная инженерия.',
    quickAccess: 'Быстрый Доступ',
    productGroups: 'Группы Продукции',
    contactTitle: 'Контакты',
    contactSubtitle: 'Свяжитесь с нами, мы предоставим вам лучший сервис.',
    address: 'Адрес',
    phone: 'Телефон',
    email: 'Эл. Почта',
    whatsappButton: 'Свяжитесь с нами через WhatsApp',
    openInMaps: 'Открыть в Google Maps',
    copyright: '© 2026 ABT MECHATRONICS IND. TRADE CO. LTD. Все права защищены.',
  },
  validation: {
    nameMin: 'Имя должно содержать минимум 2 символа',
    nameMax: 'Имя может содержать максимум 100 символов',
    emailInvalid: 'Пожалуйста, введите действительный адрес электронной почты',
    emailMax: 'Адрес электронной почты слишком длинный',
    messageMin: 'Ваше сообщение должно содержать минимум 10 символов',
    messageMax: 'Ваше сообщение может содержать максимум 2000 символов',
  },
  notFound: {
    title: 'Страница Не Найдена',
    description: 'Страница, которую вы ищете, не существует или была перемещена.',
    homeButton: 'На Главную',
    backButton: 'Назад',
    contactButton: 'Контакты',
  },
  errorBoundary: {
    title: 'Что-то пошло не так',
    description: 'Извините, произошла непредвиденная ошибка. Наша техническая команда была уведомлена.',
    retryButton: 'Попробовать снова',
    homeButton: 'На Главную',
  },
  cookie: {
    title: 'Политика использования файлов cookie',
    message: 'Этот веб-сайт использует файлы cookie для улучшения вашего опыта.',
    details: 'Файлы cookie используются для правильной работы сайта и аналитики. Мы уважаем вашу конфиденциальность.',
    accept: 'Принять',
    decline: 'Отклонить',
    close: 'Закрыть',
    learnMore: 'Узнать Больше',
  },
  whatsapp: {
    tooltip: 'Написать в WhatsApp',
  },
  exitPopup: {
    badge: '🎁 Специальное Предложение',
    title: 'Подождите!',
    subtitle: 'У нас есть специальное предложение для вас',
    description: 'Хотите получить бесплатный выезд на объект и предложение для ваших проектов?',
    whatsappButton: 'Связаться через WhatsApp',
    contactButton: 'Контактная Форма',
    dismiss: 'Нет, спасибо',
  },
  testimonials: {
    subtitle: 'Отзывы Клиентов',
    title: 'РЕКОМЕНДАЦИИ',
    items: [
      { quote: 'Они доставили нашу конвейерную систему вовремя и с качеством. Профессиональная команда.', name: 'Ахмет Йылмаз', company: 'Текстиль ООО' },
      { quote: 'Они проделали отличную работу над нашим проектом стальных конструкций. Настоятельно рекомендую.', name: 'Мехмет Демир', company: 'Логистика Плюс' },
      { quote: 'Мы получили результаты, превосходящие наши ожидания в индивидуальном проектировании машин.', name: 'Фатма Кая', company: 'Индустриальная Группа' },
    ],
  },
  certifications: {
    iso9001: 'ISO 9001',
    tse: 'Сертифицировано TSE',
    ce: 'Соответствует CE',
    quality: 'Гарантия Качества',
  },
  clients: {
    title: 'Наши Надёжные Партнёры',
    viewAll: 'Посмотреть Всех Партнёров',
    industries: {
      tekstil: 'ТЕКСТИЛЬ',
      celik: 'СТАЛЬ',
      lojistik: 'ЛОГИСТИКА',
      uretim: 'ПРОИЗВОДСТВО',
      makine: 'МАШИНЫ',
      endustri: 'ПРОМЫШЛЕННОСТЬ',
      otomasyon: 'АВТОМАТИЗАЦИЯ',
      konveyor: 'КОНВЕЙЕРЫ',
      metal: 'МЕТАЛЛ',
    },
  },
  newsletter: {
    title: 'Подпишитесь на Нашу Рассылку',
    description: 'Будьте в курсе новых проектов и акций.',
    placeholder: 'Ваш адрес электронной почты',
    button: 'Подписаться',
    success: 'Успешно подписаны!',
  },
  home: {
    certifications: {
      subtitle: 'Гарантия Качества',
      title: 'Наши Сертификаты',
    },
  },
  faq: {
    subtitle: 'Часто Задаваемые Вопросы',
    title: 'FAQ',
    items: [
      { question: 'Каков срок сдачи проекта?', answer: 'В зависимости от размера проекта, стандартные проекты сдаются в течение 4-8 недель. Для срочных проектов может быть составлен специальный план.' },
      { question: 'Каков гарантийный срок?', answer: 'Вся наша продукция имеет 2-летнюю гарантию. Мы также предлагаем пожизненную техническую поддержку и гарантию на запчасти.' },
      { question: 'Вы обслуживаете по всей Турции?', answer: 'Да, мы предоставляем услуги монтажа и обслуживания по всей Турции. Наши опытные команды работают на объектах.' },
      { question: 'Вы предлагаете бесплатные выезды на объект?', answer: 'Да, мы предлагаем бесплатные услуги выезда на объект и проектирования для всех проектов.' },
    ],
  },
  exports: exportsTranslations.ru,
};


// TRANSLATIONS OBJECT - must be after all language definitions
const translations: Record<Language, typeof tr> = { tr, en, de, fr, es, ar, ru };
