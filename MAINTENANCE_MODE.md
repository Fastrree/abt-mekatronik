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

## Bakım Sayfası Özellikleri

- ✅ Profesyonel tasarım
- ✅ Marka logosu ve renkleri
- ✅ Açık mesaj: "Bakımdayız"
- ✅ İletişim bilgileri (telefon, email)
- ✅ Responsive (mobil uyumlu)
- ✅ Dark theme

## Önemli Notlar

⚠️ **DİKKAT**: Bakım modu aktifken:
- Tüm sayfalar (ana sayfa, hakkımızda, ihracat, vb.) bakım sayfasına yönlendirilir
- Sadece bakım sayfası görünür
- SEO etkilenmez (geçici durum)
- Analytics çalışmaya devam eder

💡 **İPUCU**: Bakım modunu aktif etmeden önce:
1. Yerel ortamda test edin (`npm run dev`)
2. Bakım sayfasının doğru göründüğünden emin olun
3. İletişim bilgilerinin güncel olduğunu kontrol edin

## Test Etme

Yerel ortamda test etmek için:

1. `client/src/config/maintenance.ts` dosyasında `MAINTENANCE_MODE = true` yap
2. `npm run dev` çalıştır
3. http://localhost:3000 adresine git
4. Bakım sayfasını görmelisin
5. Test bittikten sonra `MAINTENANCE_MODE = false` yap

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

**Soru**: Bakım sayfası çirkin görünüyor?
**Cevap**: `client/src/pages/maintenance.tsx` dosyasını düzenleyerek tasarımı özelleştirebilirsiniz.

**Soru**: İletişim bilgilerini nasıl değiştiririm?
**Cevap**: `client/src/pages/maintenance.tsx` dosyasındaki telefon ve email bilgilerini güncelleyin.

## Dosya Yapısı

```
client/src/
├── config/
│   └── maintenance.ts          # Bakım modu açma/kapama (TEK DOSYA!)
├── pages/
│   └── maintenance.tsx         # Bakım sayfası tasarımı
└── App.tsx                     # Bakım modu kontrolü
```

## Güvenlik

✅ Bakım modu aktifken:
- Hiçbir sayfa erişilebilir değil
- API endpoint'leri çalışmaya devam eder (gerekirse onları da kapatabilirsiniz)
- Vercel Analytics çalışır
- Google Analytics çalışır

---

**SON GÜNCELLEME**: 2026-02-22
**DURUM**: Aktif ve Test Edildi ✅
