import type { Metadata } from "next";
import Image from "next/image";
import BranchMap from "@/components/BranchMap";
import { ClockIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "@/components/Icons";
import OpenStatus from "@/components/OpenStatus";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { BRANCHES, mapsLink, whatsappLink } from "@/data/site";

export const metadata: Metadata = {
  title: "Şubelerimiz – Batıkent, Çakırlar, Bağlıca, Eryaman",
  description:
    "Tat Pastanesi şubeleri: Batıkent, Çakırlar, Bağlıca, Eryaman Concept ve Eryaman Rada Park. Adres, telefon, çalışma saatleri ve yol tarifi.",
  alternates: { canonical: "/subelerimiz/" },
};

export default function BranchesPage() {
  return (
    <>
      <PageHero
        eyebrow="Mekanlarımız"
        title={
          <>
            Size en yakın <em className="text-gold-light">lezzet</em> noktası
          </>
        }
        lead={`Ankara'da ${BRANCHES.length} şubemizle her gün ${BRANCHES[0].open} – ${BRANCHES[0].close} arası hizmetinizdeyiz.`}
        image="/images/baglica.jpg"
      >
        <nav aria-label="Şubeler" className="mt-10 flex flex-wrap gap-2">
          {BRANCHES.map((b) => (
            <a key={b.slug} href={`#${b.slug}`} className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold ring-1 ring-white/15 backdrop-blur transition hover:bg-cream hover:text-ink">
              {b.name}
            </a>
          ))}
        </nav>
      </PageHero>

      <div className="container-x space-y-10 py-20 md:py-28">
        {BRANCHES.map((b, i) => (
          <Reveal
            key={b.slug}
            id={b.slug}
            as="article"
            className="grid scroll-mt-28 overflow-hidden rounded-[2rem] bg-cream-2 lg:grid-cols-[1fr_1.1fr_1fr]"
          >
            <div className="relative min-h-64 bg-cocoa">
              {b.image ? (
                <Image src={b.image} alt={`Tat Pastanesi ${b.name} şubesi`} fill sizes="(min-width:1024px) 33vw, 100vw" className="object-cover" />
              ) : (
                <div className="on-dark absolute inset-0 grid place-items-center bg-[radial-gradient(circle_at_30%_20%,_#a6192e_0%,_#1c120e_65%)] p-8 text-center text-cream">
                  <div>
                    <p className="font-display text-6xl italic">Tat</p>
                    <p className="mt-2 text-xs font-bold uppercase tracking-[0.25em] text-gold-light">{b.name}</p>
                  </div>
                </div>
              )}
              <span className="absolute left-4 top-4 rounded-full bg-cream px-3 py-1 font-display text-sm text-ink">0{i + 1}</span>
            </div>

            <div className="flex flex-col p-8 md:p-10">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="font-display text-4xl font-medium">{b.name}</h2>
                <OpenStatus open={b.open} close={b.close} />
              </div>
              <p className="mt-1 text-sm font-semibold uppercase tracking-[0.15em] text-muted">{b.district} / Ankara</p>
              <dl className="mt-8 space-y-4 text-[15px]">
                <div className="flex gap-3">
                  <dt><PinIcon className="mt-0.5 text-brand" /><span className="sr-only">Adres</span></dt>
                  <dd className="leading-relaxed">{b.address}</dd>
                </div>
                <div className="flex gap-3">
                  <dt><PhoneIcon className="mt-0.5 text-brand" /><span className="sr-only">Telefon</span></dt>
                  <dd><a href={`tel:${b.phone}`} className="font-semibold tabular-nums hover:text-brand">{b.phoneDisplay}</a></dd>
                </div>
                <div className="flex gap-3">
                  <dt><ClockIcon className="mt-0.5 text-brand" /><span className="sr-only">Çalışma saatleri</span></dt>
                  <dd>Her gün {b.open} – {b.close}</dd>
                </div>
              </dl>
              <div className="mt-auto flex flex-wrap gap-2 pt-8">
                <a href={mapsLink(b)} target="_blank" rel="noopener" className="btn btn-primary !px-5 !py-3 text-sm">
                  Yol Tarifi Al
                </a>
                <a href={`tel:${b.phone}`} className="btn btn-ghost !px-5 !py-3 text-sm">
                  <PhoneIcon width={16} height={16} /> Ara
                </a>
                <a href={whatsappLink(b)} target="_blank" rel="noopener" className="btn btn-ghost !px-5 !py-3 text-sm" aria-label={`${b.name} şubesine WhatsApp'tan yaz`}>
                  <WhatsAppIcon width={16} height={16} /> WhatsApp
                </a>
              </div>
            </div>

            <div className="min-h-72 lg:min-h-full">
              <BranchMap branch={b} />
            </div>
          </Reveal>
        ))}
      </div>
    </>
  );
}
