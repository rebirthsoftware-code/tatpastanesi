import type { Metadata } from "next";
import Image from "next/image";
import OrderForm from "@/components/OrderForm";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Özel Sipariş – Tasarım ve Doğum Günü Pastası",
  description:
    "Ankara'da doğum günü, nişan ve kutlamalarınız için tasarım pasta, şeker hamurlu pasta ve tatlı siparişi. Formu doldurun, Tat Pastanesi ustaları size dönsün.",
  alternates: { canonical: "/ozel-siparis/" },
};

const GALLERY = [
  ["/images/robloxp.jpg", "Roblox temalı doğum günü pastası"],
  ["/images/products/sippas.jpg", "Çiçekli katlı tasarım pasta"],
  ["/images/products/sekerpas.jpg", "Şeker hamurlu pasta"],
  ["/images/products/lotusch.jpg", "Lotuslu günlük pasta"],
];

const FAQ = [
  ["Siparişimi ne kadar önceden vermeliyim?", "Tasarım ve şeker hamurlu pastalar için en az 2–3 gün önceden, yoğun dönemlerde (bayram, yılbaşı, mezuniyet) daha erken sipariş vermenizi öneririz."],
  ["Fotoğraflı pasta yapıyor musunuz?", "Evet. Dilediğiniz fotoğrafı ve yazıyı pastanızın üzerine uyguluyoruz; görseli WhatsApp üzerinden iletmeniz yeterli."],
  ["Fiyat nasıl belirleniyor?", "Fiyat; kişi sayısına, seçtiğiniz lezzete ve tasarımın detayına göre değişir. Formu gönderdikten sonra şubemiz size net fiyat bilgisi verir."],
  ["Alerji veya özel isteklerimi belirtebilir miyim?", "Elbette. Notlar alanına yazdığınız tüm bilgileri ustalarımız dikkate alır; içerikler hakkında şubemizden detaylı bilgi alabilirsiniz."],
];

export default function OrderPage() {
  return (
    <>
      <PageHero
        eyebrow="Özel sipariş"
        title={
          <>
            Hayalinizdeki <em className="text-gold-light">pasta</em>, ustalarımızın ellerinde.
          </>
        }
        lead="Doğum günü, nişan, kutlama… Formu doldurun, seçtiğiniz şubemiz tasarımı ve fiyatı sizinle netleştirsin."
        image="/images/products/sippas.jpg"
      />

      <section className="py-20 md:py-28">
        <div className="container-x grid gap-14 lg:grid-cols-[1.4fr_1fr]">
          <Reveal className="rounded-[2rem] bg-cream-2 p-6 md:p-10">
            <h2 className="font-display text-3xl font-medium md:text-4xl">Sipariş formu</h2>
            <p className="mb-8 mt-2 text-muted">Yıldızlı alanlar zorunludur.</p>
            <OrderForm />
          </Reveal>

          <div className="space-y-10">
            <Reveal delay={100} className="grid grid-cols-2 gap-3">
              {GALLERY.map(([src, alt], i) => (
                <div key={src} className={`relative aspect-[3/4] overflow-hidden rounded-3xl bg-cocoa ${i % 2 ? "translate-y-8" : ""}`}>
                  <Image src={src} alt={alt} fill sizes="(min-width:1024px) 18vw, 50vw" className="object-cover" />
                </div>
              ))}
            </Reveal>
            <Reveal delay={150} className="pt-6">
              <h2 className="font-display text-3xl font-medium">Sık sorulanlar</h2>
              <div className="mt-6 divide-y divide-ink/10 border-y border-ink/10">
                {FAQ.map(([q, a]) => (
                  <details key={q} className="group py-5">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold [&::-webkit-details-marker]:hidden">
                      {q}
                      <span className="grid size-8 shrink-0 place-items-center rounded-full bg-cream-2 text-lg transition group-open:rotate-45">+</span>
                    </summary>
                    <p className="mt-3 leading-relaxed text-muted">{a}</p>
                  </details>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
