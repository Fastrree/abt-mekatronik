# 🔧 BAKIM MODU (MAINTENANCE MODE)

## Nedir?

Bakım modu, sitenin tüm sayfalarını geçici olarak kapatıp profesyonel bir "Bakımdayız" sayfası göstermenizi sağlar.

## Neden Gerekli?

- Sahte/test verileri içeren siteyi geçici olarak kapatmak
- Gerçek müşteri verilerini eklerken siteyi gizlemek
- Büyük güncellemeler sırasında kullanıcıları bilgilendirmek
- Acil durumlarda siteyi hızlıca kapatmak

## Nasıl Kullanılır?

### ✅ Bakım Modunu Aktif Etme (Siteyi Kapatma)

1. Dosyayı aç: `client/src/config/maintenance.ts`
2. Değiştir:
   ```typescript
   export const MAINTENANCE_MODE = false;
   ```
   Şuna:
   ```typescript
   export const MAINTENANCE_MODE = true;
   ```
3. Commit ve push yap:
   ```bash
   git add client/src/config/maintenance.ts
   git commit -m "feat: Enable maintenance mode"
   git push
   ```
4. Vercel otomatik deploy edecek (2-3 dakika)
5. Site artık bakım modunda! ✅

### ❌ Bakım Modunu Kapatma (Siteyi Açma)

1. Dosyayı aç: `client/src/config/maintenance.ts`
2. Değiştir:
   ```typescript
   export const MAINTENANCE_MODE = true;
   ```
   Şuna:
   ```typescript
   export const MAINTENANCE_MODE = false;
   ```
3. Commit ve push yap:
   ```bash
   git add client/src/config/maintenance.ts
   git commit -m "feat: Disable maintenance mode"
   git push
   ```
4. Site tekrar açık! ✅

## 🎨 Bakım Sayfası Özellikleri

### Temel Özellikler
- ✅ **Modern ve Profesyonel Tasarım**: Gradient backgrounds, shadows, animations
- ✅ **Marka Kimliği**: 
  - Türkçe: "ABT MEKATRONİK"
  - Diğer diller: "ABT MECHATRONICS"
- ✅ **Responsive Design**: 320px - 4K arası tüm ekranlarda mükemmel görünüm
- ✅ **Dark/Light Theme**: Kullanıcı tercihine göre tema değiştirme
- ✅ **7 Dil Desteği**: 🇹🇷 TR, 🇬🇧 EN, 🇩🇪 DE, 🇫🇷 FR, 🇪🇸 ES, 🇸🇦 AR, 🇷🇺 RU
- ✅ **RTL Desteği**: Arapça için sağdan sola metin yönü
- ✅ **Erişilebilirlik**: WCAG AA uyumlu (48px touch targets, contrast ratios)

### Görsel Özellikler
- 🎨 Gradient backgrounds (slate-based, NO pure white)
- 🌓 Dark/Light theme toggle
  - **Desktop**: Ayrı buton (sağ üst)
  - **Mobile**: "..." menüsü içinde
- 🌍 Modern dil seçici (bayraklarla, dropdown)
  - **Desktop**: Dropdown menü (hover/click)
  - **Mobile**: "..." menüsü içinde (7 dil)
- 📱 **Mobile Menu**: Tek "..." butonu (MoreVertical icon)
  - Minimal tasarım (40x40px, sağ üstte)
  - Tıklayınca açılır menü
  - Tema + Dil seçenekleri
  - Backdrop overlay
- ⚡ Smooth animations ve transitions
- 📱 Touch-friendly mobile design
- 🔔 Status badge: "Sistem Bakımda" (7 dilde)

### İletişim Bilgileri
- 📞 Telefon: +90 537 319 72 81 (tıklanabilir)
- 📧 Email: info@abtmekatronik.com (tıklanabilir)
- 🎨 Gradient butonlar (hover effects)

### Minimal Özellikler (Gizlilik Odaklı)
- ❌ Çerez banner'ı YOK
- ❌ WhatsApp butonu YOK
- ❌ Analytics YOK (bakım modunda)
- ❌ 404 sayfası YOK
- ✅ Sadece: Dil değiştirme + Tema değiştirme

## Önemli Notlar

⚠️ **DİKKAT**: Bakım modu aktifken:
- Tüm sayfalar (ana sayfa, hakkımızda, ihracat, vb.) bakım sayfasına yönlendirilir
- Sadece bakım sayfası görünür
- Çerez banner'ı, WhatsApp butonu, analytics ÇALIŞMAZ
- SEO etkilenmez (geçici durum)

💡 **İPUCU**: Bakım modunu aktif etmeden önce:
1. Yerel ortamda test edin (`npm run dev`)
2. Bakım sayfasının doğru göründüğünden emin olun
3. İletişim bilgilerinin güncel olduğunu kontrol edin
4. Tüm dillerde test edin (7 dil)
5. Dark/Light theme'de test edin

## Test Etme

Yerel ortamda test etmek için:

1. `client/src/config/maintenance.ts` dosyasında `MAINTENANCE_MODE = true` yap
2. `npm run dev` çalıştır
3. http://localhost:3000 adresine git
4. Bakım sayfasını görmelisin
5. **Test Checklist**:
   - [x] Tüm 7 dilde test et (bayraklar görünüyor mu?) ✅
   - [x] Dark/Light theme değiştir (çalışıyor mu?) ✅
   - [x] Mobile'da test et (320px - 768px) ✅
   - [x] Tablet'te test et (768px - 1024px) ✅
   - [x] Desktop'ta test et (1024px+) ✅
   - [x] Telefon ve email linkleri çalışıyor mu? ✅
   - [x] Arapça'da RTL düzgün çalışıyor mu? ✅
   - [x] Mobile menü "..." butonu çalışıyor mu? ✅
   - [x] Butonlar şirket adını kapatmıyor mu? ✅
   - [x] Otomatik dil tespiti çalışıyor mu? ✅
6. Test bittikten sonra `MAINTENANCE_MODE = false` yap

## Acil Durum Prosedürü

Eğer acil olarak siteyi kapatman gerekiyorsa:

1. GitHub'a git: https://github.com/[username]/[repo]
2. `client/src/config/maintenance.ts` dosyasını bul
3. "Edit" butonuna tıkla
4. `MAINTENANCE_MODE = true` yap
5. "Commit changes" butonuna tıkla
6. 2-3 dakika bekle (Vercel otomatik deploy eder)
7. Site kapalı! ✅

## Sorun Giderme

**Soru**: Bakım modunu aktif ettim ama site hala açık?
**Cevap**: Vercel deploy'unu bekleyin (2-3 dakika). Vercel dashboard'dan deploy durumunu kontrol edin.

**Soru**: Bayraklar görünmüyor?
**Cevap**: Bayraklar SVG olarak yükleniyor. Browser cache'ini temizleyin (Ctrl+Shift+R).

**Soru**: Dil değiştirince butonlar yer değiştiriyor?
**Cevap**: Bu düzeltildi. Butonlar artık RTL modunda bile sabit konumda kalıyor.

**Soru**: Bakım sayfası çirkin görünüyor?
**Cevap**: `client/src/pages/maintenance.tsx` dosyasını düzenleyerek tasarımı özelleştirebilirsiniz.

**Soru**: İletişim bilgilerini nasıl değiştiririm?
**Cevap**: `client/src/pages/maintenance.tsx` dosyasındaki telefon ve email bilgilerini güncelleyin.

**Soru**: Çevirileri nasıl değiştiririm?
**Cevap**: `client/src/lib/i18n.tsx` dosyasında `maintenance` bölümünü düzenleyin (7 dil için).

**Soru**: Mobilde "..." butonu nerede?
**Cevap**: Sağ üst köşede, minimal bir buton (40x40px). Tıklayınca tema ve dil seçenekleri açılır.

**Soru**: Otomatik dil tespiti nasıl çalışıyor?
**Cevap**: Sayfa ilk açıldığında browser dilinizi algılar ve desteklenen dillere otomatik geçer. Manuel olarak da değiştirebilirsiniz.

## Dosya Yapısı

```
client/src/
├── config/
│   └── maintenance.ts          # Bakım modu açma/kapama (TEK DOSYA!)
├── pages/
│   └── maintenance.tsx         # Bakım sayfası tasarımı
├── lib/
│   └── i18n.tsx               # Çeviriler (maintenance.* keys)
└── App.tsx                     # Bakım modu kontrolü
```

## Çeviri Anahtarları (i18n)

Bakım sayfası için kullanılan çeviri anahtarları:

```typescript
maintenance: {
  title: 'Bakımdayız',                    // Başlık
  description: 'Web sitemiz...',          // Açıklama
  contactText: 'Acil durumlar için...',   // İletişim metni
  thankYou: 'Anlayışınız için...',        // Teşekkür mesajı
  statusBadge: 'Sistem Bakımda',          // Status badge
}
```

Tüm 7 dilde mevcut: TR, EN, DE, FR, ES, AR, RU

## Güvenlik

✅ Bakım modu aktifken:
- Hiçbir sayfa erişilebilir değil
- API endpoint'leri çalışmaya devam eder (gerekirse onları da kapatabilirsiniz)
- Analytics ÇALIŞMAZ (gizlilik odaklı)
- Çerez banner'ı ÇALIŞMAZ
- WhatsApp butonu ÇALIŞMAZ

## Design System Compliance

Bakım sayfası **Design System Excellence** protokolüne uygun olarak tasarlanmıştır:

- ✅ Gradient backgrounds (slate-based)
- ✅ Enhanced shadows ve hover effects
- ✅ 48px minimum touch targets (desktop)
- ✅ 40px minimum touch targets (mobile - "..." butonu)
- ✅ WCAG AA contrast ratios
- ✅ Smooth animations (300ms transitions)
- ✅ Responsive breakpoints (320px - 4K)
- ✅ Modern component patterns
- ✅ Accessibility-first approach
- ✅ Mobile-first design (hamburger menu pattern)
- ✅ RTL support (Arabic)
- ✅ Auto language detection (browser language)

## Teknik Detaylar

### Mobile Menu Sistemi
- **Icon**: MoreVertical (3 nokta dikey)
- **Boyut**: 40x40px (touch-friendly)
- **Pozisyon**: `fixed top-4 right-2` (sağ üstte, kenara yakın)
- **Animasyon**: Scale effect (active:scale-95)
- **Backdrop**: Blur overlay (mobile'da)
- **Kapatma**: X icon veya backdrop tıklama

### Desktop vs Mobile
| Özellik | Desktop | Mobile |
|---------|---------|--------|
| Tema Butonu | Ayrı buton | "..." menüsü içinde |
| Dil Seçici | Dropdown | "..." menüsü içinde |
| Buton Sayısı | 2 adet | 1 adet |
| Buton Boyutu | 48x48px | 40x40px |
| Pozisyon | `top-6 right-6` | `top-4 right-2` |

### Otomatik Dil Tespiti
1. Browser dilini algıla (`navigator.language`)
2. Desteklenen dillere map et (TR, EN, DE, FR, ES, AR, RU)
3. Eşleşme yoksa Türkçe varsayılan
4. localStorage'a kaydet (sonraki ziyaretler için)
5. Manuel değişiklik localStorage'ı override eder

---

**SON GÜNCELLEME**: 2026-02-22
**DURUM**: Aktif ve Test Edildi ✅
**VERSİYON**: 2.1 (Mobile Menu + Auto Language Detection)
**TEST STATUS**: Tüm testler başarılı ✅
