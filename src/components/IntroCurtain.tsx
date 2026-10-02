import Image from "next/image";

/** Ana sayfaya ilk girişte logolu kısa açılış. Aynı oturumda tekrar gösterilmez (bkz. layout'taki intro-seen betiği). */
export default function IntroCurtain() {
  return (
    <div aria-hidden className="intro-curtain pointer-events-none fixed inset-0 z-[60] grid place-items-center bg-cocoa">
      <Image src="/images/tat-logo.png" alt="" width={900} height={649} priority className="intro-logo h-auto w-48 md:w-64" />
    </div>
  );
}
