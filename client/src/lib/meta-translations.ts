/**
 * SEO Meta Tags Translations
 * 
 * Professional translations for meta tags across all pages and languages
 * Languages: TR, EN, DE, FR, ES, AR, RU
 * Pages: Home, About, Exports, Product Details (4 products)
 * 
 * NOTE: Keywords meta tag removed - Google doesn't use it since 2009
 * Focus on Title and Description for SEO
 */

export interface PageMeta {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  twitterTitle: string;
  twitterDescription: string;
}

export interface ProductMeta {
  konveyor: PageMeta;
  tekstil: PageMeta;
  celik: PageMeta;
  ozelMakine: PageMeta;
}

export interface MetaTranslations {
  home: PageMeta;
  about: PageMeta;
  exports: PageMeta;
  products: ProductMeta;
}

export const metaTranslations: Record<string, MetaTranslations> = {
  // ============================================
  // TURKISH (TR) - Professional Translation (from i18n.tsx)
  // ============================================
  tr: {
    home: {
      title: 'ABT MEKATRONİK | Konveyör Sistemleri, Tekstil Makineleri, Çelik Konstrüksiyon',
      description: 'ABT MEKATRONİK önderliğinde; konveyör sistemlerinden tekstil makinelerine, endüstriyel geleceği inşa ediyoruz. Güçlü mühendislik, kusursuz gelecek. 15+ yıl tecrübe, 200+ proje.',
      ogTitle: 'ABT MEKATRONİK | Endüstriyel Üretim Çözümleri',
      ogDescription: 'Konveyör sistemleri, tekstil makineleri, çelik konstrüksiyon ve özel makine tasarımı. Yüksek hassasiyet, güçlü mühendislik.',
      twitterTitle: 'ABT MEKATRONİK | Endüstriyel Çözümler',
      twitterDescription: 'Konveyör sistemleri, tekstil makineleri, çelik konstrüksiyon. Türkiye\'nin güvenilir endüstriyel çözüm ortağı.',
    },
    about: {
      title: 'Hakkımızda | ABT MEKATRONİK - 15+ Yıl Endüstriyel Tecrübe',
      description: 'ABT Mekatronik hakkında bilgi edinin. 15+ yıllık tecrübe, 200+ tamamlanmış proje, ISO 9001 kalite belgesi. Türkiye\'nin güvenilir endüstriyel çözüm ortağı.',
      ogTitle: 'Hakkımızda | ABT MEKATRONİK',
      ogDescription: '15+ yıllık tecrübe, 200+ proje, ISO 9001 kalite belgesi. Türkiye\'nin lider endüstriyel çözüm ortağı.',
      twitterTitle: 'Hakkımızda | ABT MEKATRONİK',
      twitterDescription: '15+ yıl tecrübe, 200+ proje. Türkiye\'nin güvenilir endüstriyel çözüm ortağı.',
    },
    exports: {
      title: 'İhracatlarımız | ABT MEKATRONİK - 5+ Ülkeye İhracat',
      description: 'ABT Mekatronik ihracat ağı: Türkiye, Özbekistan, Mısır, Tacikistan, Kazakistan, Türkmenistan. 500+ makine ihracatı, uluslararası kalite standartları.',
      ogTitle: 'İhracatlarımız | ABT MEKATRONİK',
      ogDescription: '5+ ülkeye ihracat, 500+ makine, uluslararası kalite standartları.',
      twitterTitle: 'İhracatlarımız | ABT MEKATRONİK',
      twitterDescription: '5+ ülkeye ihracat, 500+ makine ihracatı.',
    },
    products: {
      konveyor: {
        title: 'Konveyör Sistemleri | ABT MEKATRONİK - Bant Konveyör Çözümleri',
        description: 'Endüstriyel konveyör sistemleri: Bant konveyör, paletli konveyör, zincirli konveyör. Özelleştirilebilir tasarım, yüksek kapasite, uzun ömür. ISO 9001 kalitesi.',
        ogTitle: 'Konveyör Sistemleri | ABT MEKATRONİK',
        ogDescription: 'Endüstriyel konveyör sistemleri. Özelleştirilebilir tasarım, yüksek kapasite, ISO 9001 kalitesi.',
        twitterTitle: 'Konveyör Sistemleri | ABT MEKATRONİK',
        twitterDescription: 'Bant konveyör, paletli konveyör, zincirli konveyör çözümleri.',
      },
      tekstil: {
        title: 'Tekstil Makineleri | ABT MEKATRONİK - Denim ve Kumaş İşleme',
        description: 'Tekstil makineleri: Denim yıkama, kumaş işleme, boyama makineleri. Yüksek verimlilik, enerji tasarrufu, otomatik kontrol sistemleri.',
        ogTitle: 'Tekstil Makineleri | ABT MEKATRONİK',
        ogDescription: 'Denim yıkama, kumaş işleme, boyama makineleri. Yüksek verimlilik, enerji tasarrufu.',
        twitterTitle: 'Tekstil Makineleri | ABT MEKATRONİK',
        twitterDescription: 'Denim ve kumaş işleme makineleri.',
      },
      celik: {
        title: 'Çelik Konstrüksiyon | ABT MEKATRONİK - Endüstriyel Çelik Yapılar',
        description: 'Çelik konstrüksiyon: Fabrika binaları, depo yapıları, çelik platformlar, merdiven sistemleri. Statik hesaplama, deprem yönetmeliğine uygun, hızlı montaj.',
        ogTitle: 'Çelik Konstrüksiyon | ABT MEKATRONİK',
        ogDescription: 'Fabrika binaları, depo yapıları, çelik platformlar. Statik hesaplama, deprem yönetmeliğine uygun.',
        twitterTitle: 'Çelik Konstrüksiyon | ABT MEKATRONİK',
        twitterDescription: 'Endüstriyel çelik yapılar ve platformlar.',
      },
      ozelMakine: {
        title: 'Özel Makine Tasarımı | ABT MEKATRONİK - Proje Bazlı Çözümler',
        description: 'Özel makine tasarımı ve imalatı: İhtiyaca özel mühendislik çözümleri, proje bazlı üretim, otomasyon entegrasyonu. 200+ özel proje tecrübesi.',
        ogTitle: 'Özel Makine Tasarımı | ABT MEKATRONİK',
        ogDescription: 'İhtiyaca özel mühendislik çözümleri, proje bazlı üretim, otomasyon entegrasyonu.',
        twitterTitle: 'Özel Makine Tasarımı | ABT MEKATRONİK',
        twitterDescription: 'Proje bazlı özel makine çözümleri.',
      },
    },
  },

  // ============================================
  // ENGLISH (EN) - Professional Translation (from i18n.tsx)
  // ============================================
  en: {
    home: {
      title: 'ABT MECHATRONICS | Conveyor Systems, Textile Machinery, Steel Construction',
      description: 'Under the leadership of ABT MECHATRONICS; from conveyor systems to textile machinery, we build the industrial future. Powerful engineering, flawless future. 15+ years experience, 200+ projects.',
      ogTitle: 'ABT MECHATRONICS | Industrial Production Solutions',
      ogDescription: 'Conveyor systems, textile machinery, steel construction and custom machine design. High precision, strong engineering.',
      twitterTitle: 'ABT MECHATRONICS | Industrial Solutions',
      twitterDescription: 'Conveyor systems, textile machinery, steel construction. Turkey\'s reliable industrial solutions partner.',
    },
    about: {
      title: 'About Us | ABT MECHATRONICS - 15+ Years Industrial Experience',
      description: 'Learn about ABT Mechatronics. 15+ years experience, 200+ completed projects, ISO 9001 quality certificate. Turkey\'s reliable industrial solutions partner.',
      ogTitle: 'About Us | ABT MECHATRONICS',
      ogDescription: '15+ years experience, 200+ projects, ISO 9001 quality certificate. Turkey\'s leading industrial solutions partner.',
      twitterTitle: 'About Us | ABT MECHATRONICS',
      twitterDescription: '15+ years experience, 200+ projects. Turkey\'s reliable industrial solutions partner.',
    },
    exports: {
      title: 'Our Exports | ABT MECHATRONICS - Exporting to 5+ Countries',
      description: 'ABT Mechatronics export network: Turkey, Uzbekistan, Egypt, Tajikistan, Kazakhstan, Turkmenistan. 500+ machine exports, international quality standards.',
      ogTitle: 'Our Exports | ABT MECHATRONICS',
      ogDescription: 'Exporting to 5+ countries, 500+ machines, international quality standards.',
      twitterTitle: 'Our Exports | ABT MECHATRONICS',
      twitterDescription: 'Exporting to 5+ countries, 500+ machine exports.',
    },
    products: {
      konveyor: {
        title: 'Conveyor Systems | ABT MECHATRONICS - Belt Conveyor Solutions',
        description: 'Industrial conveyor systems: Belt conveyor, pallet conveyor, chain conveyor. Customizable design, high capacity, long life. ISO 9001 quality.',
        ogTitle: 'Conveyor Systems | ABT MECHATRONICS',
        ogDescription: 'Industrial conveyor systems. Customizable design, high capacity, ISO 9001 quality.',
        twitterTitle: 'Conveyor Systems | ABT MECHATRONICS',
        twitterDescription: 'Belt conveyor, pallet conveyor, chain conveyor solutions.',
      },
      tekstil: {
        title: 'Textile Machinery | ABT MECHATRONICS - Denim and Fabric Processing',
        description: 'Textile machinery: Denim washing, fabric processing, dyeing machines. High efficiency, energy saving, automatic control systems.',
        ogTitle: 'Textile Machinery | ABT MECHATRONICS',
        ogDescription: 'Denim washing, fabric processing, dyeing machines. High efficiency, energy saving.',
        twitterTitle: 'Textile Machinery | ABT MECHATRONICS',
        twitterDescription: 'Denim and fabric processing machinery.',
      },
      celik: {
        title: 'Steel Construction | ABT MECHATRONICS - Industrial Steel Structures',
        description: 'Steel construction: Factory buildings, warehouse structures, steel platforms, stair systems. Static calculation, earthquake regulation compliant, fast assembly.',
        ogTitle: 'Steel Construction | ABT MECHATRONICS',
        ogDescription: 'Factory buildings, warehouse structures, steel platforms. Static calculation, earthquake regulation compliant.',
        twitterTitle: 'Steel Construction | ABT MECHATRONICS',
        twitterDescription: 'Industrial steel structures and platforms.',
      },
      ozelMakine: {
        title: 'Custom Machine Design | ABT MECHATRONICS - Project-Based Solutions',
        description: 'Custom machine design and manufacturing: Custom engineering solutions, project-based production, automation integration. 200+ custom project experience.',
        ogTitle: 'Custom Machine Design | ABT MECHATRONICS',
        ogDescription: 'Custom engineering solutions, project-based production, automation integration.',
        twitterTitle: 'Custom Machine Design | ABT MECHATRONICS',
        twitterDescription: 'Project-based custom machine solutions.',
      },
    },
  },

  // ============================================
  // GERMAN (DE) - Professional Translation (from i18n.tsx)
  // ============================================
  de: {
    home: {
      title: 'ABT MECHATRONIK | Fördersysteme, Textilmaschinen, Stahlkonstruktion',
      description: 'Unter der Führung von ABT MECHATRONIK; von Fördersystemen bis zu Textilmaschinen bauen wir die industrielle Zukunft. Starke Technik, makellose Zukunft. 15+ Jahre Erfahrung, 200+ Projekte.',
      ogTitle: 'ABT MECHATRONIK | Industrielle Produktionslösungen',
      ogDescription: 'Fördersysteme, Textilmaschinen, Stahlkonstruktion und kundenspezifisches Maschinendesign. Hohe Präzision, starke Technik.',
      twitterTitle: 'ABT MECHATRONIK | Industrielle Lösungen',
      twitterDescription: 'Fördersysteme, Textilmaschinen, Stahlkonstruktion. Türkeis zuverlässiger Partner für industrielle Lösungen.',
    },
    about: {
      title: 'Über Uns | ABT MECHATRONIK - 15+ Jahre Industrieerfahrung',
      description: 'Erfahren Sie mehr über ABT Mechatronik. 15+ Jahre Erfahrung, 200+ abgeschlossene Projekte, ISO 9001 Qualitätszertifikat. Türkeis zuverlässiger Partner für industrielle Lösungen.',
      ogTitle: 'Über Uns | ABT MECHATRONIK',
      ogDescription: '15+ Jahre Erfahrung, 200+ Projekte, ISO 9001 Qualitätszertifikat. Türkeis führender Partner für industrielle Lösungen.',
      twitterTitle: 'Über Uns | ABT MECHATRONIK',
      twitterDescription: '15+ Jahre Erfahrung, 200+ Projekte. Türkeis zuverlässiger Partner für industrielle Lösungen.',
    },
    exports: {
      title: 'Unsere Exporte | ABT MECHATRONIK - Export in 5+ Länder',
      description: 'ABT Mechatronik Exportnetzwerk: Türkei, Usbekistan, Ägypten, Tadschikistan, Kasachstan, Turkmenistan. 500+ Maschinenexporte, internationale Qualitätsstandards.',
      ogTitle: 'Unsere Exporte | ABT MECHATRONIK',
      ogDescription: 'Export in 5+ Länder, 500+ Maschinen, internationale Qualitätsstandards.',
      twitterTitle: 'Unsere Exporte | ABT MECHATRONIK',
      twitterDescription: 'Export in 5+ Länder, 500+ Maschinenexporte.',
    },
    products: {
      konveyor: {
        title: 'Fördersysteme | ABT MECHATRONIK - Bandförderer-Lösungen',
        description: 'Industrielle Fördersysteme: Bandförderer, Palettenförderer, Kettenförderer. Anpassbares Design, hohe Kapazität, lange Lebensdauer. ISO 9001 Qualität.',
        ogTitle: 'Fördersysteme | ABT MECHATRONIK',
        ogDescription: 'Industrielle Fördersysteme. Anpassbares Design, hohe Kapazität, ISO 9001 Qualität.',
        twitterTitle: 'Fördersysteme | ABT MECHATRONIK',
        twitterDescription: 'Bandförderer, Palettenförderer, Kettenförderer-Lösungen.',
      },
      tekstil: {
        title: 'Textilmaschinen | ABT MECHATRONIK - Denim- und Stoffverarbeitung',
        description: 'Textilmaschinen: Denim-Wäsche, Stoffverarbeitung, Färbemaschinen. Hohe Effizienz, Energieeinsparung, automatische Steuerungssysteme.',
        ogTitle: 'Textilmaschinen | ABT MECHATRONIK',
        ogDescription: 'Denim-Wäsche, Stoffverarbeitung, Färbemaschinen. Hohe Effizienz, Energieeinsparung.',
        twitterTitle: 'Textilmaschinen | ABT MECHATRONIK',
        twitterDescription: 'Denim- und Stoffverarbeitungsmaschinen.',
      },
      celik: {
        title: 'Stahlkonstruktion | ABT MECHATRONIK - Industrielle Stahlstrukturen',
        description: 'Stahlkonstruktion: Fabrikgebäude, Lagerstrukturen, Stahlplattformen, Treppensysteme. Statische Berechnung, erdbebensicher, schnelle Montage.',
        ogTitle: 'Stahlkonstruktion | ABT MECHATRONIK',
        ogDescription: 'Fabrikgebäude, Lagerstrukturen, Stahlplattformen. Statische Berechnung, erdbebensicher.',
        twitterTitle: 'Stahlkonstruktion | ABT MECHATRONIK',
        twitterDescription: 'Industrielle Stahlstrukturen und Plattformen.',
      },
      ozelMakine: {
        title: 'Kundenspezifisches Maschinendesign | ABT MECHATRONIK - Projektbasierte Lösungen',
        description: 'Kundenspezifisches Maschinendesign und -fertigung: Maßgeschneiderte Ingenieurlösungen, projektbasierte Produktion, Automatisierungsintegration. 200+ kundenspezifische Projekterfahrung.',
        ogTitle: 'Kundenspezifisches Maschinendesign | ABT MECHATRONIK',
        ogDescription: 'Maßgeschneiderte Ingenieurlösungen, projektbasierte Produktion, Automatisierungsintegration.',
        twitterTitle: 'Kundenspezifisches Maschinendesign | ABT MECHATRONIK',
        twitterDescription: 'Projektbasierte kundenspezifische Maschinenlösungen.',
      },
    },
  },

  // ============================================
  // FRENCH (FR) - Professional Translation (from i18n.tsx)
  // ============================================
  fr: {
    home: {
      title: 'ABT MÉCATRONIQUE | Systèmes de Convoyage, Machines Textiles, Construction Métallique',
      description: 'Sous la direction d\'ABT MECHATRONICS; des systèmes de convoyage aux machines textiles, nous construisons l\'avenir industriel. Ingénierie puissante, avenir parfait. 15+ ans d\'expérience, 200+ projets.',
      ogTitle: 'ABT MÉCATRONIQUE | Solutions de Production Industrielle',
      ogDescription: 'Systèmes de convoyage, machines textiles, construction métallique et conception de machines sur mesure. Haute précision, ingénierie puissante.',
      twitterTitle: 'ABT MÉCATRONIQUE | Solutions Industrielles',
      twitterDescription: 'Systèmes de convoyage, machines textiles, construction métallique. Partenaire fiable en solutions industrielles de Turquie.',
    },
    about: {
      title: 'À Propos | ABT MÉCATRONIQUE - 15+ Ans d\'Expérience Industrielle',
      description: 'Découvrez ABT Mécatronique. 15+ ans d\'expérience, 200+ projets réalisés, certificat de qualité ISO 9001. Partenaire fiable en solutions industrielles de Turquie.',
      ogTitle: 'À Propos | ABT MÉCATRONIQUE',
      ogDescription: '15+ ans d\'expérience, 200+ projets, certificat de qualité ISO 9001. Partenaire leader en solutions industrielles de Turquie.',
      twitterTitle: 'À Propos | ABT MÉCATRONIQUE',
      twitterDescription: '15+ ans d\'expérience, 200+ projets. Partenaire fiable en solutions industrielles de Turquie.',
    },
    exports: {
      title: 'Nos Exportations | ABT MÉCATRONIQUE - Exportation vers 5+ Pays',
      description: 'Réseau d\'exportation ABT Mécatronique: Turquie, Ouzbékistan, Égypte, Tadjikistan, Kazakhstan, Turkménistan. 500+ exportations de machines, normes de qualité internationales.',
      ogTitle: 'Nos Exportations | ABT MÉCATRONIQUE',
      ogDescription: 'Exportation vers 5+ pays, 500+ machines, normes de qualité internationales.',
      twitterTitle: 'Nos Exportations | ABT MÉCATRONIQUE',
      twitterDescription: 'Exportation vers 5+ pays, 500+ exportations de machines.',
    },
    products: {
      konveyor: {
        title: 'Systèmes de Convoyage | ABT MÉCATRONIQUE - Solutions de Convoyeur à Bande',
        description: 'Systèmes de convoyage industriels: Convoyeur à bande, convoyeur à palettes, convoyeur à chaîne. Conception personnalisable, haute capacité, longue durée de vie. Qualité ISO 9001.',
        ogTitle: 'Systèmes de Convoyage | ABT MÉCATRONIQUE',
        ogDescription: 'Systèmes de convoyage industriels. Conception personnalisable, haute capacité, qualité ISO 9001.',
        twitterTitle: 'Systèmes de Convoyage | ABT MÉCATRONIQUE',
        twitterDescription: 'Solutions de convoyeur à bande, à palettes, à chaîne.',
      },
      tekstil: {
        title: 'Machines Textiles | ABT MÉCATRONIQUE - Traitement Denim et Tissu',
        description: 'Machines textiles: Lavage denim, traitement de tissu, machines de teinture. Haute efficacité, économie d\'énergie, systèmes de contrôle automatiques.',
        ogTitle: 'Machines Textiles | ABT MÉCATRONIQUE',
        ogDescription: 'Lavage denim, traitement de tissu, machines de teinture. Haute efficacité, économie d\'énergie.',
        twitterTitle: 'Machines Textiles | ABT MÉCATRONIQUE',
        twitterDescription: 'Machines de traitement denim et tissu.',
      },
      celik: {
        title: 'Construction Métallique | ABT MÉCATRONIQUE - Structures Métalliques Industrielles',
        description: 'Construction métallique: Bâtiments d\'usine, structures d\'entrepôt, plateformes métalliques, systèmes d\'escaliers. Calcul statique, conforme aux normes sismiques, assemblage rapide.',
        ogTitle: 'Construction Métallique | ABT MÉCATRONIQUE',
        ogDescription: 'Bâtiments d\'usine, structures d\'entrepôt, plateformes métalliques. Calcul statique, conforme aux normes sismiques.',
        twitterTitle: 'Construction Métallique | ABT MÉCATRONIQUE',
        twitterDescription: 'Structures et plateformes métalliques industrielles.',
      },
      ozelMakine: {
        title: 'Conception de Machines Sur Mesure | ABT MÉCATRONIQUE - Solutions Basées sur Projet',
        description: 'Conception et fabrication de machines sur mesure: Solutions d\'ingénierie personnalisées, production basée sur projet, intégration d\'automatisation. 200+ projets personnalisés d\'expérience.',
        ogTitle: 'Conception de Machines Sur Mesure | ABT MÉCATRONIQUE',
        ogDescription: 'Solutions d\'ingénierie personnalisées, production basée sur projet, intégration d\'automatisation.',
        twitterTitle: 'Conception de Machines Sur Mesure | ABT MÉCATRONIQUE',
        twitterDescription: 'Solutions de machines personnalisées basées sur projet.',
      },
    },
  },

  // ============================================
  // SPANISH (ES) - Professional Translation (from i18n.tsx)
  // ============================================
  es: {
    home: {
      title: 'ABT MECATRÓNICA | Sistemas de Transporte, Maquinaria Textil, Construcción de Acero',
      description: 'Bajo el liderazgo de ABT MECHATRONICS; desde sistemas de transporte hasta maquinaria textil, construimos el futuro industrial. Ingeniería poderosa, futuro perfecto. 15+ años de experiencia, 200+ proyectos.',
      ogTitle: 'ABT MECATRÓNICA | Soluciones de Producción Industrial',
      ogDescription: 'Sistemas de transporte, maquinaria textil, construcción de acero y diseño de máquinas personalizadas. Alta precisión, ingeniería poderosa.',
      twitterTitle: 'ABT MECATRÓNICA | Soluciones Industriales',
      twitterDescription: 'Sistemas de transporte, maquinaria textil, construcción de acero. Socio confiable en soluciones industriales de Turquía.',
    },
    about: {
      title: 'Sobre Nosotros | ABT MECATRÓNICA - 15+ Años de Experiencia Industrial',
      description: 'Conozca ABT Mecatrónica. 15+ años de experiencia, 200+ proyectos completados, certificado de calidad ISO 9001. Socio confiable en soluciones industriales de Turquía.',
      ogTitle: 'Sobre Nosotros | ABT MECATRÓNICA',
      ogDescription: '15+ años de experiencia, 200+ proyectos, certificado de calidad ISO 9001. Socio líder en soluciones industriales de Turquía.',
      twitterTitle: 'Sobre Nosotros | ABT MECATRÓNICA',
      twitterDescription: '15+ años de experiencia, 200+ proyectos. Socio confiable en soluciones industriales de Turquía.',
    },
    exports: {
      title: 'Nuestras Exportaciones | ABT MECATRÓNICA - Exportación a 5+ Países',
      description: 'Red de exportación ABT Mecatrónica: Turquía, Uzbekistán, Egipto, Tayikistán, Kazajstán, Turkmenistán. 500+ exportaciones de máquinas, estándares de calidad internacionales.',
      ogTitle: 'Nuestras Exportaciones | ABT MECATRÓNICA',
      ogDescription: 'Exportación a 5+ países, 500+ máquinas, estándares de calidad internacionales.',
      twitterTitle: 'Nuestras Exportaciones | ABT MECATRÓNICA',
      twitterDescription: 'Exportación a 5+ países, 500+ exportaciones de máquinas.',
    },
    products: {
      konveyor: {
        title: 'Sistemas de Transporte | ABT MECATRÓNICA - Soluciones de Transportador de Banda',
        description: 'Sistemas de transporte industriales: Transportador de banda, transportador de paletas, transportador de cadena. Diseño personalizable, alta capacidad, larga vida útil. Calidad ISO 9001.',
        ogTitle: 'Sistemas de Transporte | ABT MECATRÓNICA',
        ogDescription: 'Sistemas de transporte industriales. Diseño personalizable, alta capacidad, calidad ISO 9001.',
        twitterTitle: 'Sistemas de Transporte | ABT MECATRÓNICA',
        twitterDescription: 'Soluciones de transportador de banda, paletas, cadena.',
      },
      tekstil: {
        title: 'Maquinaria Textil | ABT MECATRÓNICA - Procesamiento de Denim y Tela',
        description: 'Maquinaria textil: Lavado de denim, procesamiento de tela, máquinas de teñido. Alta eficiencia, ahorro de energía, sistemas de control automáticos.',
        ogTitle: 'Maquinaria Textil | ABT MECATRÓNICA',
        ogDescription: 'Lavado de denim, procesamiento de tela, máquinas de teñido. Alta eficiencia, ahorro de energía.',
        twitterTitle: 'Maquinaria Textil | ABT MECATRÓNICA',
        twitterDescription: 'Maquinaria de procesamiento de denim y tela.',
      },
      celik: {
        title: 'Construcción de Acero | ABT MECATRÓNICA - Estructuras de Acero Industriales',
        description: 'Construcción de acero: Edificios de fábrica, estructuras de almacén, plataformas de acero, sistemas de escaleras. Cálculo estático, cumplimiento de normas sísmicas, montaje rápido.',
        ogTitle: 'Construcción de Acero | ABT MECATRÓNICA',
        ogDescription: 'Edificios de fábrica, estructuras de almacén, plataformas de acero. Cálculo estático, cumplimiento de normas sísmicas.',
        twitterTitle: 'Construcción de Acero | ABT MECATRÓNICA',
        twitterDescription: 'Estructuras y plataformas de acero industriales.',
      },
      ozelMakine: {
        title: 'Diseño de Máquinas Personalizadas | ABT MECATRÓNICA - Soluciones Basadas en Proyectos',
        description: 'Diseño y fabricación de máquinas personalizadas: Soluciones de ingeniería personalizadas, producción basada en proyectos, integración de automatización. 200+ proyectos personalizados de experiencia.',
        ogTitle: 'Diseño de Máquinas Personalizadas | ABT MECATRÓNICA',
        ogDescription: 'Soluciones de ingeniería personalizadas, producción basada en proyectos, integración de automatización.',
        twitterTitle: 'Diseño de Máquinas Personalizadas | ABT MECATRÓNICA',
        twitterDescription: 'Soluciones de máquinas personalizadas basadas en proyectos.',
      },
    },
  },

  // ============================================
  // ARABIC (AR) - Professional Translation (from i18n.tsx)
  // ============================================
  ar: {
    home: {
      title: 'ABT ميكاترونيك | أنظمة النقل، آلات النسيج، البناء الفولاذي',
      description: 'تحت قيادة ABT MECHATRONICS؛ من أنظمة النقل إلى آلات النسيج، نبني المستقبل الصناعي. هندسة قوية، مستقبل مثالي. خبرة أكثر من 15 عامًا، أكثر من 200 مشروع.',
      ogTitle: 'ABT ميكاترونيك | حلول الإنتاج الصناعي',
      ogDescription: 'أنظمة النقل، آلات النسيج، البناء الفولاذي وتصميم الآلات المخصصة. دقة عالية، هندسة قوية.',
      twitterTitle: 'ABT ميكاترونيك | الحلول الصناعية',
      twitterDescription: 'أنظمة النقل، آلات النسيج، البناء الفولاذي. شريك تركيا الموثوق في الحلول الصناعية.',
    },
    about: {
      title: 'من نحن | ABT ميكاترونيك - خبرة صناعية أكثر من 15 عامًا',
      description: 'تعرف على ABT ميكاترونيك. خبرة أكثر من 15 عامًا، أكثر من 200 مشروع مكتمل، شهادة جودة ISO 9001. شريك تركيا الموثوق في الحلول الصناعية.',
      ogTitle: 'من نحن | ABT ميكاترونيك',
      ogDescription: 'خبرة أكثر من 15 عامًا، أكثر من 200 مشروع، شهادة جودة ISO 9001. الشريك الرائد في الحلول الصناعية في تركيا.',
      twitterTitle: 'من نحن | ABT ميكاترونيك',
      twitterDescription: 'خبرة أكثر من 15 عامًا، أكثر من 200 مشروع. شريك تركيا الموثوق في الحلول الصناعية.',
    },
    exports: {
      title: 'صادراتنا | ABT ميكاترونيك - التصدير إلى أكثر من 5 دول',
      description: 'شبكة تصدير ABT ميكاترونيك: تركيا، أوزبكستان، مصر، طاجيكستان، كازاخستان، تركمانستان. أكثر من 500 صادرات آلات، معايير الجودة الدولية.',
      ogTitle: 'صادراتنا | ABT ميكاترونيك',
      ogDescription: 'التصدير إلى أكثر من 5 دول، أكثر من 500 آلة، معايير الجودة الدولية.',
      twitterTitle: 'صادراتنا | ABT ميكاترونيك',
      twitterDescription: 'التصدير إلى أكثر من 5 دول، أكثر من 500 صادرات آلات.',
    },
    products: {
      konveyor: {
        title: 'أنظمة النقل | ABT ميكاترونيك - حلول ناقل الحزام',
        description: 'أنظمة النقل الصناعية: ناقل الحزام، ناقل البليت، ناقل السلسلة. تصميم قابل للتخصيص، سعة عالية، عمر طويل. جودة ISO 9001.',
        ogTitle: 'أنظمة النقل | ABT ميكاترونيك',
        ogDescription: 'أنظمة النقل الصناعية. تصميم قابل للتخصيص، سعة عالية، جودة ISO 9001.',
        twitterTitle: 'أنظمة النقل | ABT ميكاترونيك',
        twitterDescription: 'حلول ناقل الحزام، البليت، السلسلة.',
      },
      tekstil: {
        title: 'آلات النسيج | ABT ميكاترونيك - معالجة الدنيم والقماش',
        description: 'آلات النسيج: غسيل الدنيم، معالجة القماش، آلات الصباغة. كفاءة عالية، توفير الطاقة، أنظمة التحكم الأوتوماتيكية.',
        ogTitle: 'آلات النسيج | ABT ميكاترونيك',
        ogDescription: 'غسيل الدنيم، معالجة القماش، آلات الصباغة. كفاءة عالية، توفير الطاقة.',
        twitterTitle: 'آلات النسيج | ABT ميكاترونيك',
        twitterDescription: 'آلات معالجة الدنيم والقماش.',
      },
      celik: {
        title: 'البناء الفولاذي | ABT ميكاترونيك - الهياكل الفولاذية الصناعية',
        description: 'البناء الفولاذي: مباني المصانع، هياكل المستودعات، منصات فولاذية، أنظمة السلالم. حساب ثابت، متوافق مع لوائح الزلازل، تجميع سريع.',
        ogTitle: 'البناء الفولاذي | ABT ميكاترونيك',
        ogDescription: 'مباني المصانع، هياكل المستودعات، منصات فولاذية. حساب ثابت، متوافق مع لوائح الزلازل.',
        twitterTitle: 'البناء الفولاذي | ABT ميكاترونيك',
        twitterDescription: 'الهياكل والمنصات الفولاذية الصناعية.',
      },
      ozelMakine: {
        title: 'تصميم الآلات المخصصة | ABT ميكاترونيك - حلول قائمة على المشاريع',
        description: 'تصميم وتصنيع الآلات المخصصة: حلول هندسية مخصصة، إنتاج قائم على المشاريع، تكامل الأتمتة. 200+ مشروع مخصص من الخبرة.',
        ogTitle: 'تصميم الآلات المخصصة | ABT ميكاترونيك',
        ogDescription: 'حلول هندسية مخصصة، إنتاج قائم على المشاريع، تكامل الأتمتة.',
        twitterTitle: 'تصميم الآلات المخصصة | ABT ميكاترونيك',
        twitterDescription: 'حلول الآلات المخصصة القائمة على المشاريع.',
      },
    },
  },

  // ============================================
  // RUSSIAN (RU) - Professional Translation (from i18n.tsx)
  // ============================================
  ru: {
    home: {
      title: 'ABT МЕХАТРОНИКА | Конвейерные Системы, Текстильное Оборудование, Стальные Конструкции',
      description: 'Под руководством ABT MECHATRONICS; от конвейерных систем до текстильного оборудования, мы строим промышленное будущее. Мощная инженерия, безупречное будущее. Опыт 15+ лет, 200+ проектов.',
      ogTitle: 'ABT МЕХАТРОНИКА | Промышленные Производственные Решения',
      ogDescription: 'Конвейерные системы, текстильное оборудование, стальные конструкции и индивидуальное проектирование машин. Высокая точность, мощная инженерия.',
      twitterTitle: 'ABT МЕХАТРОНИКА | Промышленные Решения',
      twitterDescription: 'Конвейерные системы, текстильное оборудование, стальные конструкции. Надежный партнер Турции по промышленным решениям.',
    },
    about: {
      title: 'О Нас | ABT МЕХАТРОНИКА - Промышленный Опыт 15+ Лет',
      description: 'Узнайте о ABT Мехатроника. Опыт 15+ лет, 200+ завершенных проектов, сертификат качества ISO 9001. Надежный партнер Турции по промышленным решениям.',
      ogTitle: 'О Нас | ABT МЕХАТРОНИКА',
      ogDescription: 'Опыт 15+ лет, 200+ проектов, сертификат качества ISO 9001. Ведущий партнер Турции по промышленным решениям.',
      twitterTitle: 'О Нас | ABT МЕХАТРОНИКА',
      twitterDescription: 'Опыт 15+ лет, 200+ проектов. Надежный партнер Турции по промышленным решениям.',
    },
    exports: {
      title: 'Наш Экспорт | ABT МЕХАТРОНИКА - Экспорт в 5+ Стран',
      description: 'Экспортная сеть ABT Мехатроника: Турция, Узбекистан, Египет, Таджикистан, Казахстан, Туркменистан. 500+ экспортов оборудования, международные стандарты качества.',
      ogTitle: 'Наш Экспорт | ABT МЕХАТРОНИКА',
      ogDescription: 'Экспорт в 5+ стран, 500+ машин, международные стандарты качества.',
      twitterTitle: 'Наш Экспорт | ABT МЕХАТРОНИКА',
      twitterDescription: 'Экспорт в 5+ стран, 500+ экспортов оборудования.',
    },
    products: {
      konveyor: {
        title: 'Конвейерные Системы | ABT МЕХАТРОНИКА - Решения Ленточных Конвейеров',
        description: 'Промышленные конвейерные системы: ленточный конвейер, паллетный конвейер, цепной конвейер. Настраиваемый дизайн, высокая производительность, долгий срок службы. Качество ISO 9001.',
        ogTitle: 'Конвейерные Системы | ABT МЕХАТРОНИКА',
        ogDescription: 'Промышленные конвейерные системы. Настраиваемый дизайн, высокая производительность, качество ISO 9001.',
        twitterTitle: 'Конвейерные Системы | ABT МЕХАТРОНИКА',
        twitterDescription: 'Решения ленточных, паллетных, цепных конвейеров.',
      },
      tekstil: {
        title: 'Текстильное Оборудование | ABT МЕХАТРОНИКА - Обработка Денима и Ткани',
        description: 'Текстильное оборудование: стирка денима, обработка ткани, красильные машины. Высокая эффективность, энергосбережение, автоматические системы управления.',
        ogTitle: 'Текстильное Оборудование | ABT МЕХАТРОНИКА',
        ogDescription: 'Стирка денима, обработка ткани, красильные машины. Высокая эффективность, энергосбережение.',
        twitterTitle: 'Текстильное Оборудование | ABT МЕХАТРОНИКА',
        twitterDescription: 'Оборудование для обработки денима и ткани.',
      },
      celik: {
        title: 'Стальные Конструкции | ABT МЕХАТРОНИКА - Промышленные Стальные Сооружения',
        description: 'Стальные конструкции: заводские здания, складские сооружения, стальные платформы, лестничные системы. Статический расчет, соответствие сейсмическим нормам, быстрая сборка.',
        ogTitle: 'Стальные Конструкции | ABT МЕХАТРОНИКА',
        ogDescription: 'Заводские здания, складские сооружения, стальные платформы. Статический расчет, соответствие сейсмическим нормам.',
        twitterTitle: 'Стальные Конструкции | ABT МЕХАТРОНИКА',
        twitterDescription: 'Промышленные стальные сооружения и платформы.',
      },
      ozelMakine: {
        title: 'Индивидуальное Проектирование Машин | ABT МЕХАТРОНИКА - Проектные Решения',
        description: 'Индивидуальное проектирование и производство машин: индивидуальные инженерные решения, проектное производство, интеграция автоматизации. 200+ индивидуальных проектов опыта.',
        ogTitle: 'Индивидуальное Проектирование Машин | ABT МЕХАТРОНИКА',
        ogDescription: 'Индивидуальные инженерные решения, проектное производство, интеграция автоматизации.',
        twitterTitle: 'Индивидуальное Проектирование Машин | ABT МЕХАТРОНИКА',
        twitterDescription: 'Проектные индивидуальные решения для машин.',
      },
    },
  },
};
