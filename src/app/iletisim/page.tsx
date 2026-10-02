import type { Metadata } from "next";
import Link from "next/link";
import { ArrowIcon, InstagramIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "@/components/Icons";
import OpenStatus from "@/components/OpenStatus";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { BRANCHES, INSTAGRAM_URL, SETTINGS, SITE, mapsLink, whatsappLink } from "@/data/site";

export const metadata: Metadata = {
  title: "İletişim",
  description: "Tat Pastanesi şubelerinin telefon, WhatsApp, Instagram ve adres bilgileri. Özel siparişleriniz ve sorularınız için bize ulaşın.",
  alternates: { canonical: "/iletisim/" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Bizimle iletişime geçin"
        title={
          <>
            Bir telefon <em className="text-gold-light">kadar</em> yakınız.
          </>
        }
        lead="Özel siparişleriniz, sorularınız ve önerileriniz için size en yakın şubemize ulaşabilirsiniz."
      >
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/ozel-siparis/" className="btn btn-gold">
            Pasta Siparişi Ver <ArrowIcon width={18} height={18} />
          </Link>
          <Link href="/menu/" className="btn btn-ghost text-cream">
            Dijital Menü
          </Link>
        </div>
      </PageHero>

      <section className="py-20 md:py-28">
        <div className="container-x grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {BRANCHES.map((b, i) => (
            <Reveal key={b.slug} delay={(i % 3) * 80} className="flex flex-col rounded-[2rem] bg-cream-2 p-8">
              <div className="flex items-center justify-between gap-3">
                <h2 className="font-display text-3xl font-medium">{b.name}</h2>
                <OpenStatus open={b.open} close={b.close} />
              </div>
              <p className="mt-4 flex gap-2 text-sm leading-relaxed text-muted">
                <PinIcon width={16} height={16} className="mt-0.5 shrink-0" /> {b.address}
              </p>
              <a href={`tel:${b.phone}`} className="mt-6 font-display text-3xl tabular-nums text-brand hover:underline">
                {b.phoneDisplay}
              </a>
              <div className="mt-6 grid grid-cols-2 gap-2 text-sm font-bold">
                <a href={`tel:${b.phone}`} className="flex items-center justify-center gap-2 rounded-full bg-ink py-3 text-cream transition hover:bg-brand">
                  <PhoneIcon width={16} height={16} /> Ara
                </a>
                <a href={whatsappLink(b)} target="_blank" rel="noopener" className="flex items-center justify-center gap-2 rounded-full bg-[#1f9d55] py-3 text-white transition hover:brightness-110">
                  <WhatsAppIcon width={16} height={16} /> WhatsApp
                </a>
                <a href={mapsLink(b)} target="_blank" rel="noopener" className="col-span-2 flex items-center justify-center gap-2 rounded-full py-3 ring-1 ring-ink/15 transition hover:ring-ink">
                  <PinIcon width={16} height={16} /> Yol tarifi
                </a>
              </div>
            </Reveal>
          ))}
          <Reveal delay={160} className="on-dark relative flex flex-col justify-between overflow-hidden rounded-[2rem] bg-brand p-8 text-cream">
            <div>
              <p className="eyebrow">Çalışma saatleri</p>
              <p className="mt-4 font-display text-5xl">
                {BRANCHES[0].open} – {BRANCHES[0].close}
              </p>
              <p className="mt-2 text-cream/80">Tüm şubelerimizde, haftanın her günü.</p>
            </div>
            <div className="mt-10 space-y-3">
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener" className="flex items-center gap-3 rounded-2xl bg-white/10 p-4 transition hover:bg-white/15">
                <InstagramIcon width={22} height={22} />
                <span>
                  <span className="block text-xs uppercase tracking-[0.2em] text-cream/70">Instagram</span>
                  <span className="font-bold">@{SETTINGS.instagram}</span>
                </span>
              </a>
              <a href={SITE.reviewsUrl} target="_blank" rel="noopener" className="inline-flex items-center gap-2 font-bold text-gold-light">
                Bizi Google&apos;da değerlendirin <ArrowIcon width={18} height={18} />
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
