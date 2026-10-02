import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import MenuBoard from "@/components/MenuBoard";
import { MENU } from "@/data/menu";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Menü & Fiyatlar",
  description:
    "Tat Pastanesi güncel menü ve fiyat listesi: dondurma, yaş pasta, sütlü tatlılar, kuru pasta, waffle ve içecekler. İçindekiler ve alerjen bilgisi. Türkçe / English.",
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
      ...(i.calories !== null ? { nutrition: { "@type": "NutritionInformation", calories: `${i.calories} kcal` } } : {}),
    })),
  })),
};

export default function MenuPage() {
  return (
    <>
      <MenuBoard />
      <JsonLd data={jsonLd} />
    </>
  );
}
