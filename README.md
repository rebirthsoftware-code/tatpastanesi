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

## İçerik güncelleme

Tüm içerik tek dosyada: **`src/data/site.ts`**

- `BRANCHES` – şube adresleri, telefonlar, Instagram, çalışma saatleri
- `CATEGORIES` – ürün kategorileri, ürünler, görseller, dondurma/pasta çeşitleri
- `REVIEWS`, `STATS` – yorumlar ve rakamlar

### Yeni görsel ekleme

Ham (büyük) fotoğrafı `.raw-images/` altına koyup `npm run optimize-images` çalıştırın; optimize edilmiş hali `public/images/` altına yazılır.
`.raw-images/` git'e gönderilmez. Favicon ve paylaşım görselini yeniden üretmek için: `node scripts/make-brand-assets.mjs`.

## Sayfalar

| Yol | İçerik |
| --- | --- |
| `/` | Ana sayfa |
| `/urunlerimiz/` | Kategori menüsü, arama, ürün detay penceresi |
| `/ozel-siparis/` | Tasarım pasta sipariş formu (şubenin WhatsApp hattına hazır mesaj gönderir) |
| `/subelerimiz/` | Şube kartları, anlık açık/kapalı durumu, harita, yol tarifi |
| `/hakkimizda/` | Hikaye, misyon, vizyon |
| `/iletisim/` | Şube iletişim kartları |

Eski sitedeki adresler (sondaki `/` dahil) aynen korunmuştur.
