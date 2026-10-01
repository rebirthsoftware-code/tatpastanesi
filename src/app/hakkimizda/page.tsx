import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Counter from "@/components/Counter";
import { ArrowIcon } from "@/components/Icons";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { STATS } from "@/data/site";

export const metadata: Metadata = {
  title: "Hakkımızda – 2001'den Beri Lezzet ve Kalite",
  description:
    "Tat Dondurma & Pastaneleri 2001'den bu yana geleneksel pastane kültürünü modern dokunuşlarla birleştirerek Ankara'da hizmet veriyor. Hikayemiz, misyonumuz ve vizyonumuz.",
  alternates: { canonical: "/hakkimizda/" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Hikayemiz"
        title={
          <>
            Lezzet ve kalitenin <em className="text-gold-light">zirvesi</em>
          </>
        }
        lead="2001'den bu yana aynı özen, aynı tutku ve kuşaktan kuşağa aktarılan reçetelerle."
        image="/images/batikent.jpg"
      />

      <section className="py-24 md:py-32">
        <div className="container-x grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <Reveal className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-t-full rounded-b-[2rem] bg-cocoa">
              <Image src="/images/neden1.jpg" alt="Ustalarımız dondurma hazırlarken" fill sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" />
            </div>
            <div className="absolute -bottom-8 -right-2 rounded-3xl bg-brand px-8 py-6 text-cream shadow-2xl md:-right-8">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-light">Kuruluş</p>
              <p className="font-display text-5xl">2001</p>
            </div>
          </Reveal>
          <Reveal delay={120} className="space-y-6 text-lg leading-relaxed text-muted">
            <p className="font-display text-3xl leading-snug text-ink md:text-4xl">
              “Amacımız yalnızca tatlı sunmak değil; keyifle vakit geçirebileceğiniz sıcak ve samimi bir buluşma noktası olmak.”
            </p>
            <p>
              Tat Dondurma &amp; Pastaneleri, 2001 yılından bu yana lezzet ve kaliteyi bir araya getirerek misafirlerine hizmet veren bir
              markadır. Kurulduğumuz ilk günden itibaren amacımız; misafirlerimize yalnızca tatlı ürünler sunmak değil, aynı zamanda
              keyifle vakit geçirebilecekleri sıcak ve samimi bir ortam oluşturmaktır.
            </p>
            <p>
              Yıllar içinde edindiğimiz tecrübe ve ustalıkla, geleneksel pastane kültürünü modern dokunuşlarla birleştiriyoruz.
              Pastalarımız, dondurmalarımız ve tatlılarımız; tazelik, kalite ve özen anlayışıyla, hem göze hem damağa hitap edecek
              şekilde hazırlanıyor.
            </p>
            <p>
              Misafirlerimizin güveni ve memnuniyetiyle büyüyen Tat, bugün Ankara&apos;da beş şubesiyle aynı özen ve kalite anlayışıyla
              hizmet vermeye devam ediyor.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="on-dark grain relative overflow-hidden bg-cocoa py-24 text-cream md:py-32">
        <div className="pointer-events-none absolute -left-32 top-0 size-[460px] rounded-full bg-brand/30 blur-[130px]" />
        <div className="container-x relative grid gap-6 md:grid-cols-2">
          {[
            [
              "Misyonumuz",
              "Kaliteli malzemeler, hijyenik üretim ve ustalıkla hazırlanan ürünlerle misafirlerimize her zaman taze ve lezzetli seçenekler sunmak. Geleneksel pastane kültürünü modern sunumlarla birleştirerek güvenilir ve kaliteli bir buluşma noktası olmak.",
            ],
            [
              "Vizyonumuz",
              "Lezzet, kalite ve müşteri memnuniyetini temel alarak pastane sektöründe güvenilir ve tercih edilen markalar arasında yer almak; hizmet anlayışımızı sürekli geliştirerek daha geniş kitlelere ulaşan güçlü bir marka olmak.",
            ],
          ].map(([t, d], i) => (
            <Reveal key={t} delay={i * 120} className="rounded-[2rem] bg-white/5 p-10 ring-1 ring-white/10 md:p-12">
              <span className="font-display text-7xl italic text-gold-light/80">{t[0]}</span>
              <h2 className="mt-4 font-display text-4xl">{t}</h2>
              <p className="mt-4 text-lg leading-relaxed text-cream/70">{d}</p>
            </Reveal>
          ))}
        </div>
        <div className="container-x relative mt-20 grid grid-cols-2 gap-y-10 md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-display text-5xl text-gold-light md:text-6xl">
                <Counter to={s.value} prefix={s.prefix} suffix={s.suffix} />
              </p>
              <p className="mt-2 text-sm font-semibold uppercase tracking-[0.15em] text-cream/60">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow">Özel günlerinizde</p>
            <h2 className="mt-4 font-display text-5xl font-medium leading-tight md:text-6xl">
              Tatlı <em className="text-brand">anılar</em> biriktirin.
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
              Doğum günlerinden nişanlara, küçük kutlamalardan büyük organizasyonlara; sevdiklerinizle paylaşacağınız her anı, size
              özel hazırlanan lezzetlerle taçlandırıyoruz.
            </p>
            <Link href="/ozel-siparis/" className="btn btn-primary mt-10">
              Özel Sipariş Ver <ArrowIcon width={18} height={18} />
            </Link>
          </Reveal>
          <Reveal delay={120} className="grid grid-cols-2 gap-4">
            <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-cocoa">
              <Image src="/images/robloxp.jpg" alt="Doğum günü pastası" fill sizes="(min-width:1024px) 25vw, 50vw" className="object-cover" />
            </div>
            <div className="relative mt-12 aspect-[3/4] overflow-hidden rounded-3xl bg-cocoa">
              <Image src="/images/products/sippas.jpg" alt="Katlı tasarım pasta" fill sizes="(min-width:1024px) 25vw, 50vw" className="object-cover" />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
