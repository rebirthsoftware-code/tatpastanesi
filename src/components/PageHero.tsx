import Image from "next/image";
import type { ReactNode } from "react";

/** Alt sayfaların üst bölümü: koyu zemin, büyük başlık, opsiyonel arka plan görseli. */
export default function PageHero({
  eyebrow,
  title,
  lead,
  image,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: string;
  image?: string;
  children?: ReactNode;
}) {
  return (
    <section className="on-dark grain relative isolate overflow-hidden bg-cocoa pb-20 pt-40 text-cream md:pb-28 md:pt-48">
      {image && (
        <>
          <Image src={image} alt="" fill priority sizes="100vw" className="-z-10 object-cover opacity-35" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-cocoa/70 via-cocoa/60 to-cocoa" />
        </>
      )}
      <div className="pointer-events-none absolute -right-40 -top-40 -z-10 size-[520px] rounded-full bg-brand/30 blur-[120px]" />
      <div className="container-x relative">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-6 max-w-4xl font-display text-5xl font-medium leading-[1.02] md:text-7xl lg:text-8xl">{title}</h1>
        {lead && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-cream/75 md:text-xl">{lead}</p>}
        {children}
      </div>
    </section>
  );
}
