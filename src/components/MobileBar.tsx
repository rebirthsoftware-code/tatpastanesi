import Link from "next/link";
import { SITE } from "@/data/site";
import CallMenu from "./CallMenu";
import { MenuBookIcon, PinIcon } from "./Icons";

/** Mobilde ekranın altında sabit duran hızlı erişim çubuğu. */
export default function MobileBar() {
  const item = "flex flex-1 flex-col items-center justify-center gap-1 py-2.5 text-[11px] font-bold";
  return (
    <div className="fixed inset-x-3 bottom-3 z-40 md:hidden" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
      <div className="flex items-stretch overflow-visible rounded-2xl bg-cocoa/95 p-1 text-cream shadow-2xl shadow-cocoa/40 ring-1 ring-white/10 backdrop-blur-xl">
        <CallMenu placement="top" align="left" wrapperClassName="flex flex-1" className={`${item} w-full`} label="Ara" />
        <CallMenu kind="whatsapp" placement="top" align="left" wrapperClassName="flex flex-1" className={`${item} w-full`} label="WhatsApp" />
        <Link href="/subelerimiz/" className={item}>
          <PinIcon width={18} height={18} /> Şubeler
        </Link>
        <a href={SITE.menuUrl} target="_blank" rel="noopener" className={`${item} rounded-xl bg-brand`}>
          <MenuBookIcon width={18} height={18} /> Menü
        </a>
      </div>
    </div>
  );
}
