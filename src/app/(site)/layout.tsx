import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MobileBar from "@/components/MobileBar";
import WhatsAppFab from "@/components/WhatsAppFab";

/** Sitenin sayfaları: üst menü, alt bilgi ve hızlı erişim çubukları. (QR menü bunları kullanmaz.) */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a href="#icerik" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-cream focus:px-4 focus:py-2 focus:text-ink">
        İçeriğe geç
      </a>
      <Header />
      <main id="icerik">{children}</main>
      <Footer />
      <MobileBar />
      <WhatsAppFab />
    </>
  );
}
