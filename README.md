# Tat Dondurma & Pastanesi — tatpastanesi.com

Next.js 16 (App Router) + Tailwind CSS 4 ile yazılmış, tamamen statik üretilen kurumsal site.

## Geliştirme

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # üretim derlemesi
```

## Vercel'e yayınlama

1. Vercel → **Add New → Project** → bu GitHub reposunu seçin. Framework otomatik "Next.js" algılanır; ayar değiştirmeye gerek yok.
2. **Deploy**'a basın.
3. **Settings → Domains** bölümünden `tatpastanesi.com` ve `www.tatpastanesi.com` ekleyin, Vercel'in verdiği DNS kayıtlarını alan adı sağlayıcınıza girin
   (`www` asıl adres, kök alan adı `www`'ye yönlensin — site haritası ve canonical adresler `https://www.tatpastanesi.com` üzerine kurulu).
4. QR menü için aynı projeye `menu.tatpastanesi.com` alan adını da ekleyin (DNS: `menu` için Vercel'in verdiği CNAME).
   Bu adres doğrudan `/menu/` sayfasını açar; eski QR kodların adresleri (`menu.php`, `category.php` vb.) menüye yönlendirilir.
   Ayar `next.config.ts` içindeki `MENU_HOST` değişkenindedir.

> Not: Vercel'in ücretsiz **Hobby** planı yalnızca kişisel, ticari olmayan kullanım içindir. İşletme sitesi için **Pro** plan gerekir
> (https://vercel.com/docs/limits/fair-use-guidelines#commercial-usage).

## Yönetim paneli

Adres: **`/admin/`** (önizlemede: https://rebirthsoftware-code.github.io/tatpastanesi/admin/)

Panelden düzenlenebilenler:

- **Menü Ürünleri** — ad (TR/EN), kategori, fiyat, fotoğraf, açıklama, içindekiler, kalori, alerjenler,
  "çok satanlarda göster" ve "menüde göster" (ürünü silmeden gizlemek için)
- **Dondurma Çeşitleri** — ad ve menüdeki renk
- **Şubeler** — adres, telefon, açılış/kapanış saati, fotoğraf
- **Site Ayarları** — Instagram hesabı, ana sayfa videosu (bilgisayar/telefon ayrı), QR menü giriş fotoğrafı

Her kayıt GitHub'a kaydedilir; site 1–2 dakika içinde kendiliğinden güncellenir. Yüklenen fotoğraflar
otomatik küçültülür. Sunucu ve veritabanı yoktur, bu yüzden panel "çökmez".

### Panele giriş

1. Panelde **"Sign In Using Access Token"** seçin. (“Sign In with GitHub” ek kurulum gerektirir, kullanmayın.)
2. Açılan pencerede verilen bağlantıdan GitHub'da anahtar oluşturun: yalnızca bu depo, **Contents: Read and write** yetkisi.
3. Anahtarı yapıştırın. Tarayıcı anahtarı hatırlar; bir dahaki sefere doğrudan girersiniz.

Anahtarı kimseyle paylaşmayın; panelde değişiklik yapabilen herkesin kendi anahtarı olmalıdır.

## İçerik dosyaları

Panelin düzenlediği dosyalar `content/` klasöründedir (`content/menu/*.json`, `flavors.json`, `branches.json`, `settings.json`).
Derleme sırasında `scripts/build-content.mjs` bunları doğrular (boş ad, hatalı fiyat, bilinmeyen kategori derlemeyi durdurur).

Ürünlerimiz sayfasının kategori metinleri `src/data/site.ts` içindedir; menüde karşılığı olan ürünler fiyatını ve fotoğrafını menüden alır.

### Yeni görsel ekleme (geliştirici)

Ham (büyük) fotoğrafı `.raw-images/` altına koyup `npm run optimize-images` çalıştırın; optimize edilmiş hali `public/images/` altına yazılır.
`.raw-images/` git'e gönderilmez. Favicon ve paylaşım görselini yeniden üretmek için: `node scripts/make-brand-assets.mjs`.

## Alan adı ve SSL

SSL sertifikası satın almaya gerek yoktur; GitHub Pages, Vercel ve Cloudflare Pages ücretsiz ve otomatik SSL verir.
GitHub Pages'te alan adı bağlamak için: DNS'te `www` için `rebirthsoftware-code.github.io` adresine CNAME kaydı ekleyin,
depo ayarlarında **Settings → Pages → Custom domain** alanına alan adını yazın ve
**Settings → Secrets and variables → Actions → Variables** altında `CUSTOM_DOMAIN` değişkenini (örn. `www.tatpastanesi.com`) tanımlayın.

## Sayfalar

| Yol | İçerik |
| --- | --- |
| `/` | Ana sayfa |
| `/urunlerimiz/` | Kategori menüsü, arama, ürün detay penceresi |
| `/menu/` | QR menü: fiyatlar, TR/EN, içindekiler, kalori, alerjenler |
| `/ozel-siparis/` | Tasarım pasta sipariş formu (şubenin WhatsApp hattına hazır mesaj gönderir) |
| `/subelerimiz/` | Şube kartları, anlık açık/kapalı durumu, harita, yol tarifi |
| `/hakkimizda/` | Hikaye, misyon, vizyon |
| `/iletisim/` | Şube iletişim kartları |

Eski sitedeki adresler (sondaki `/` dahil) aynen korunmuştur.
