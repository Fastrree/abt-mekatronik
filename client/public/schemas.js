// Schema.org Structured Data - External file for CSP compliance
// All inline schemas moved here to remove 'unsafe-inline' from CSP

(function() {
  'use strict';
  
  function injectSchema(data) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
  }
  
  // Organization
  injectSchema({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ABT Mekatronik",
    "alternateName": "ABT MEKATRONİK SAN. TİC. LTD. ŞTİ.",
    "url": "https://abt-mekatronik.vercel.app",
    "logo": "https://abt-mekatronik.vercel.app/favicon.png",
    "description": "Konveyör sistemleri, tekstil makineleri, çelik konstrüksiyon ve özel makine tasarımı alanında Türkiye'nin lider firması.",
    "foundingDate": "2010",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+90-537-319-7281",
      "contactType": "sales",
      "availableLanguage": ["Turkish", "English", "German", "French", "Spanish"]
    },
    "sameAs": [],
    "areaServed": {"@type": "Country", "name": "Turkey"}
  });
  
  // LocalBusiness
  injectSchema({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "ABT Mekatronik",
    "@id": "https://abt-mekatronik.vercel.app",
    "url": "https://abt-mekatronik.vercel.app",
    "telephone": "+90-537-319-7281",
    "email": "info@abtmekatronik.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Elmalar",
      "addressLocality": "Dulkadiroğlu",
      "addressRegion": "Kahramanmaraş",
      "postalCode": "46090",
      "addressCountry": "TR"
    },
    "geo": {"@type": "GeoCoordinates", "latitude": "37.546286099999996", "longitude": "37.1050861"},
    "priceRange": "$",
    "image": "https://abt-mekatronik.vercel.app/opengraph.jpg",
    "description": "Endüstriyel makine ve ekipman üretimi",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:00",
      "closes": "18:00"
    }
  });
  
  // Products/Services
  injectSchema({
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "ABT Mekatronik Ürün ve Hizmetleri",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@type": "Product",
          "name": "Konveyör Sistemleri",
          "description": "Ağır hizmet tipi bant konveyörler, zincirli sistemler ve otomatik yükleme hatları",
          "brand": {"@type": "Brand", "name": "ABT Mekatronik"},
          "offers": {
            "@type": "AggregateOffer",
            "priceCurrency": "TRY",
            "availability": "https://schema.org/InStock",
            "priceSpecification": {"@type": "PriceSpecification", "price": "0", "priceCurrency": "TRY"}
          },
          "aggregateRating": {"@type": "AggregateRating", "ratingValue": "4.8", "reviewCount": "45", "bestRating": "5", "worstRating": "1"}
        }
      },
      {
        "@type": "ListItem",
        "position": 2,
        "item": {
          "@type": "Product",
          "name": "Tekstil Makineleri",
          "description": "Denim dok silindirleri, kumaş açma makineleri ve gergi sistemleri",
          "brand": {"@type": "Brand", "name": "ABT Mekatronik"},
          "offers": {
            "@type": "AggregateOffer",
            "priceCurrency": "TRY",
            "availability": "https://schema.org/InStock",
            "priceSpecification": {"@type": "PriceSpecification", "price": "0", "priceCurrency": "TRY"}
          },
          "aggregateRating": {"@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "38", "bestRating": "5", "worstRating": "1"}
        }
      },
      {
        "@type": "ListItem",
        "position": 3,
        "item": {
          "@type": "Product",
          "name": "Çelik Konstrüksiyon",
          "description": "Fabrika yapıları, depo sistemleri ve endüstriyel çelik iskeletler",
          "brand": {"@type": "Brand", "name": "ABT Mekatronik"},
          "offers": {
            "@type": "AggregateOffer",
            "priceCurrency": "TRY",
            "availability": "https://schema.org/InStock",
            "priceSpecification": {"@type": "PriceSpecification", "price": "0", "priceCurrency": "TRY"}
          },
          "aggregateRating": {"@type": "AggregateRating", "ratingValue": "4.7", "reviewCount": "52", "bestRating": "5", "worstRating": "1"}
        }
      },
      {
        "@type": "ListItem",
        "position": 4,
        "item": {
          "@type": "Service",
          "name": "Özel Makine Tasarımı",
          "description": "Sıfırdan mühendislik, prototip üretimi ve otomasyon çözümleri",
          "provider": {"@type": "Organization", "name": "ABT Mekatronik"},
          "areaServed": {"@type": "Country", "name": "Turkey"},
          "aggregateRating": {"@type": "AggregateRating", "ratingValue": "5.0", "reviewCount": "28", "bestRating": "5", "worstRating": "1"}
        }
      }
    ]
  });
  
  // FAQ
  injectSchema({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {"@type": "Question", "name": "Proje teslim süresi ne kadar?", "acceptedAnswer": {"@type": "Answer", "text": "Proje büyüklüğüne göre değişmekle birlikte, standart projeler 4-8 hafta içinde teslim edilmektedir. Acil projeler için özel planlama yapılabilir."}},
      {"@type": "Question", "name": "Garanti süresi ne kadar?", "acceptedAnswer": {"@type": "Answer", "text": "Tüm ürünlerimiz 2 yıl garanti kapsamındadır. Ayrıca ömür boyu teknik destek ve yedek parça garantisi sunuyoruz."}},
      {"@type": "Question", "name": "Türkiye genelinde hizmet veriyor musunuz?", "acceptedAnswer": {"@type": "Answer", "text": "Evet, Türkiye'nin her yerine montaj ve servis hizmeti veriyoruz. Deneyimli ekiplerimiz sahada çalışmaktadır."}},
      {"@type": "Question", "name": "Ücretsiz keşif yapıyor musunuz?", "acceptedAnswer": {"@type": "Answer", "text": "Evet, tüm projeler için ücretsiz yerinde keşif ve projelendirme hizmeti sunuyoruz."}}
    ]
  });
  
  // Video
  injectSchema({
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": "ABT Mekatronik Üretim Videoları",
    "description": "Konveyör sistemleri, tekstil makineleri ve çelik konstrüksiyon üretim süreçleri",
    "thumbnailUrl": "https://abt-mekatronik.vercel.app/opengraph.jpg",
    "uploadDate": "2026-01-16T10:00:00+03:00",
    "contentUrl": "https://abt-mekatronik.vercel.app/media/video1.mp4",
    "duration": "PT2M30S",
    "embedUrl": "https://abt-mekatronik.vercel.app/"
  });
  
  // BreadcrumbList
  injectSchema({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {"@type": "ListItem", "position": 1, "name": "Ana Sayfa", "item": "https://abt-mekatronik.vercel.app/"},
      {"@type": "ListItem", "position": 2, "name": "Ürünler", "item": "https://abt-mekatronik.vercel.app/#products"},
      {"@type": "ListItem", "position": 3, "name": "Projeler", "item": "https://abt-mekatronik.vercel.app/#projects"},
      {"@type": "ListItem", "position": 4, "name": "İletişim", "item": "https://abt-mekatronik.vercel.app/#contact"}
    ]
  });
  
})();
