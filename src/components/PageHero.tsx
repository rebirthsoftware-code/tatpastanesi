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
    <section className="on-dark relative isolate overflow-hidden bg-cocoa pb-20 pt-40 text-cream md:pb-28 md:pt-48">
      {image && (
        <>
          <Image src={image} alt="" fill priority sizes="(min-width:1024px) 100vw, 60vw" className="-z-10 object-cover opacity-35" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-cocoa/70 via-cocoa/60 to-cocoa" />
        </>
      )}
      <div className="pointer-events-none absolute -right-40 -top-40 -z-10 size-[520px] rounded-full glow-brand" />
      <div className="container-x relative">
        <p className="eyebrow fade-up">{eyebrow}</p>
        <h1 className="fade-up mt-6 max-w-4xl font-display text-5xl font-medium leading-[1.02] md:text-7xl lg:text-8xl" style={{ "--start": "120ms" } as React.CSSProperties}>
          {title}
        </h1>
        {lead && <p style={{ "--start": "260ms" } as React.CSSProperties} className="fade-up mt-6 max-w-2xl text-lg leading-relaxed text-cream/75 md:text-xl">{lead}</p>}
        <div className="fade-up" style={{ "--start": "380ms" } as React.CSSProperties}>
          {children}
        </div>
      </div>
    </section>
  );
}
