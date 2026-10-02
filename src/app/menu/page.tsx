import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import MenuBoard from "@/components/MenuBoard";
import PageHero from "@/components/PageHero";
import { MENU } from "@/data/menu";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Menü & Fiyatlar",
  description:
    "Tat Pastanesi güncel menü ve fiyat listesi: dondurma, yaş pasta, sütlü tatlılar, kuru pasta, waffle ve içecekler. Türkçe / English.",
  alternates: { canonical: "/menu/" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Menu",
  name: `${SITE.name} Menü`,
  url: `${SITE.url}/menu/`,
  inLanguage: ["tr", "en"],
  hasMenuSection: MENU.map((c) => ({
    "@type": "MenuSection",
    name: c.name.tr,
    hasMenuItem: c.items.map((i) => ({
      "@type": "MenuItem",
      name: i.name.tr,
      description: i.desc.tr,
      image: `${SITE.url}${i.image}`,
      offers: { "@type": "Offer", price: i.price, priceCurrency: "TRY" },
    })),
  })),
};

export default function MenuPage() {
  return (
    <>
      <PageHero
        eyebrow="Dijital menü"
        title={
          <>
            Menü <em className="text-gold-light">&amp;</em> fiyatlar
          </>
        }
        lead="Vitrinimizdeki lezzetler ve güncel fiyatları. Bir ürüne dokunarak büyük fotoğrafını görün."
        image="/images/menu/16.jpg"
      />
      <MenuBoard />
      <JsonLd data={jsonLd} />
    </>
  );
}
