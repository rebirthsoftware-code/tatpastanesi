import Image from "next/image";
import Link from "next/link";
import Counter from "@/components/Counter";
import FlavorBuilder from "@/components/FlavorBuilder";
import { ArrowIcon, HandIcon, HeritageIcon, InstagramIcon, LeafIcon, PinIcon, SparkIcon, StarIcon } from "@/components/Icons";
import OpenStatus from "@/components/OpenStatus";
import HeroMedia from "@/components/HeroMedia";
import IntroCurtain from "@/components/IntroCurtain";
import Reveal from "@/components/Reveal";
import { PosterStrip, StoryHighlights } from "@/components/Stories";
import SplitText from "@/components/SplitText";
import { BRANCHES, CATEGORIES, FLAVORS, INSTAGRAM_URL, REVIEWS, SETTINGS, SITE, STATS, mapsLink } from "@/data/site";

export const metadata = { alternates: { canonical: "/" } };

const HERO_SLIDES = ["/images/neden3.jpg", "/images/products/baklava.jpg", "/images/products/kurupass.jpg", "/images/products/sippas.jpg"];

const MARQUEE = ["%100 Doğal Malzeme", "Günlük Üretim", "El Yapımı", "Tasarım Pastalar", "Katkısız Dondurma", "2001'den Beri"];

const VALUES = [
  {
    icon: HeritageIcon,
    kicker: "Gelenek",
    title: "Kuşaktan kuşağa reçeteler",
    text: "2001'den bu yana aynı özenle uyguladığımız tariflerimizi her gün yeniden, ilk günkü heyecanla hazırlıyoruz.",
    image: "/images/products/kurupass.jpg",
  },
  {
    icon: HandIcon,
    kicker: "Ustalık",
    title: "Usta ellerin dokunuşu",
    text: "Her hamur ustalarımızın elinde şekil bulur, her süsleme tek tek, sabırla yapılır. Seri üretim değil, zanaat.",
    image: "/images/neden1.jpg",
  },
  {
    icon: LeafIcon,
    kicker: "Doğallık",
    title: "Saf ve taze malzeme",
    text: "Günlük taze süt, mevsiminde olgunlaşmış meyveler, gerçek Antep fıstığı. Katkı yok, kestirme yok.",
    image: "/images/neden3.jpg",
  },
];

export default function Home() {
  const favorites = CATEGORIES.find((c) => c.slug === "sutlu-tatlilar")!.items.slice(0, 8);

  return (
    <>
      {/* ───────────── HERO ───────────── */}
      <IntroCurtain />
      <section className="has-intro on-dark relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-cocoa text-cream">
        {/* Arka plan: panelden video eklendiyse video, yoksa yavaşça değişen ürün fotoğrafları */}
        {SETTINGS.hero_video_desktop || SETTINGS.hero_video_mobile ? (
          <HeroMedia
            image={SETTINGS.hero_poster || HERO_SLIDES[0]}
            videoDesktop={SETTINGS.hero_video_desktop}
            videoMobile={SETTINGS.hero_video_mobile}
          />
        ) : (
          <div aria-hidden className="hero-scroll-bg absolute inset-0 -z-20">
            {HERO_SLIDES.map((src, i) => (
              <div key={src} className="hero-slide absolute inset-0" style={{ "--i": i } as React.CSSProperties}>
                <Image src={src} alt="" fill priority={i === 0} loading={i === 0 ? undefined : "lazy"} fetchPriority={i === 0 ? "high" : "low"} sizes="(min-width:1024px) 100vw, 60vw" className="object-cover" />
              </div>
            ))}
          </div>
        )}
        <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(28,18,14,0.66)_0%,rgba(28,18,14,0.9)_62%,#1c120e_100%)]" />
        <Image
          src="/images/splash.png"
          alt=""
          width={900}
          height={900}
          sizes="(min-width:768px) 26rem, 18rem"
          className="pointer-events-none absolute -right-24 -top-24 -z-10 w-72 animate-float opacity-80 md:w-[26rem]"
        />

        <div className="hero-scroll-out container-x flex flex-1 flex-col items-center justify-center pb-16 pt-36 text-center">
          <p className="fade-up flex items-center gap-4 text-xs font-bold uppercase tracking-[0.35em] text-gold-light" style={{ "--start": "0ms" } as React.CSSProperties}>
            <span className="h-px w-10 bg-gold-light/60" />
            Kuruluş {SITE.founded}
            <span className="h-px w-10 bg-gold-light/60" />
          </p>
          <h1 className="mt-8 font-display font-medium leading-[0.9]">
            <SplitText text="Ustalıkla" start={150} className="block text-4xl font-light text-cream/90 sm:text-6xl md:text-7xl" />
            <span className="mt-2 block text-[3.9rem] sm:text-8xl md:text-[9rem] xl:text-[10.5rem]">
              <SplitText text="Tatlı" start={500} className="text-gold-light" />{" "}
              <SplitText text="Sanatı" start={800} className="italic text-[#e8475f]" />
            </span>
          </h1>
          <p className="fade-up mt-8 max-w-xl text-lg leading-relaxed text-cream/75 md:text-xl" style={{ "--start": "1300ms" } as React.CSSProperties}>
            Geleneksel lezzetleri modern ve zarif dokunuşlarla yeniden yorumluyoruz. Her dilimde {new Date().getFullYear() - SITE.founded} yılın tecrübesi var.
          </p>
          <div className="fade-up mt-10 flex flex-wrap justify-center gap-3" style={{ "--start": "1550ms" } as React.CSSProperties}>
            <Link href="/urunlerimiz/" className="btn btn-gold">
              Lezzetlerimizi Keşfet <ArrowIcon width={18} height={18} />
            </Link>
            <Link href="/ozel-siparis/" className="btn btn-ghost text-cream">
              Pasta Siparişi Ver
            </Link>
          </div>
        </div>

        <div className="fade-up container-x pb-8" style={{ "--start": "1800ms" } as React.CSSProperties}>
          <div className="flex items-end justify-between gap-6 border-t border-white/10 pt-6 text-sm text-cream/70">
            <a href={SITE.reviewsUrl} target="_blank" rel="noopener" className="group flex items-center gap-3">
              <span className="flex gap-0.5 text-gold-light">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} width={14} height={14} />
                ))}
              </span>
              <span className="transition group-hover:text-cream">Google yorumları</span>
            </a>
            <a href="#vitrin" aria-label="Aşağı kaydır" className="hidden flex-col items-center gap-2 md:flex">
              <span className="relative h-9 w-5 rounded-full border border-cream/40">
                <span className="scroll-dot absolute left-1/2 top-1.5 size-1.5 -translate-x-1/2 rounded-full bg-cream" />
              </span>
            </a>
            <span className="hidden sm:block">{BRANCHES.length} şube · {FLAVORS.length} çeşit dondurma · Her gün taze</span>
          </div>
        </div>
      </section>

      {/* ───────────── MARQUEE ───────────── */}
      <div className="overflow-hidden bg-brand py-5 text-cream" aria-hidden>
        <div className="flex w-max animate-marquee items-center gap-10 whitespace-nowrap">
          {[...MARQUEE, ...MARQUEE, ...MARQUEE, ...MARQUEE].map((t, i) => (
            <span key={i} className="flex items-center gap-10 font-display text-2xl italic">
              {t}
              <SparkIcon width={14} height={14} className="text-gold-light" />
            </span>
          ))}
        </div>
      </div>

      {/* ───────────── KATEGORİLER ───────────── */}
      <section id="vitrin" className="scroll-mt-20 py-24 md:py-32">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <Reveal variant="mask">
              <p className="eyebrow">Vitrinimizden</p>
              <h2 className="mt-4 max-w-xl font-display text-4xl font-medium leading-tight md:text-6xl">
                Her damak için <em className="text-brand">bir lezzet</em>
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <Link href="/urunlerimiz/" className="group inline-flex items-center gap-2 font-bold text-brand">
                Tüm ürünleri gör <ArrowIcon width={18} height={18} className="transition group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>

          <div className="mt-14 grid auto-rows-[260px] gap-4 sm:grid-cols-2 lg:auto-rows-[300px] lg:grid-cols-4">
            {CATEGORIES.map((c, i) => {
              const span = ["lg:col-span-2 lg:row-span-2", "lg:row-span-2", "", "", "lg:col-span-2", "lg:col-span-2"][i];
              return (
                <Reveal key={c.slug} delay={i * 90} className={span} variant="card">
                  <Link href={`/urunlerimiz/#${c.slug}`} className="img-wipe group relative block h-full overflow-hidden rounded-3xl bg-cocoa text-cream">
                    <Image
                      src={c.cover}
                      alt={c.name}
                      fill
                      sizes={i === 0 ? "(min-width:1024px) 50vw, 100vw" : "(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"}
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-cocoa/90 via-cocoa/20 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-light">{c.tagline}</p>
                        <h3 className={`mt-1 font-display font-medium ${i === 0 ? "text-4xl md:text-5xl" : "text-3xl"}`}>{c.name}</h3>
                      </div>
                      <span className="grid size-11 shrink-0 place-items-center rounded-full bg-cream text-ink transition group-hover:bg-gold">
                        <ArrowIcon width={18} height={18} className="-rotate-45" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───────────── İMZA LEZZET ───────────── */}
      <section className="overflow-hidden bg-cream-2 py-24 md:py-32">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2">
          <Reveal className="relative min-w-0">
            <div className="img-wipe parallax relative mx-auto aspect-square max-w-lg overflow-hidden rounded-full ring-[14px] ring-cream">
              <Image src="/images/menu/16.jpg" alt="Tat Pastanesi Rumeli Çileklisi" fill sizes="(min-width:1024px) 40vw, 90vw" className="object-cover" />
            </div>
            <div className="absolute -bottom-2 right-0 max-w-[16rem] rounded-2xl bg-cocoa p-5 text-cream shadow-xl md:right-6">
              <div className="flex gap-0.5 text-gold-light">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} width={13} height={13} />
                ))}
              </div>
              <p className="mt-2 text-sm leading-relaxed">“Uzun zamandır dışarıda yediğim en iyi tatlıydı.”</p>
              <p className="mt-2 text-xs text-cream/60">— {REVIEWS[0].author}, Google</p>
            </div>
          </Reveal>
          <Reveal delay={120} className="min-w-0">
            <p className="eyebrow">İmza lezzetimiz</p>
            <h2 className="mt-4 font-display text-5xl font-medium leading-[1.02] md:text-7xl">
              Rumeli <em className="text-brand">Çileklisi</em>
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
              Hafif kreması, taze çilekleri ve yumuşacık dokusuyla misafirlerimizin en çok sorduğu tatlı. Yanında; magnolyalar, profiterol,
              trileçe ve günlük taze sütlü tatlılarımız sizi bekliyor.
            </p>
            <div className="no-scrollbar -mx-5 mt-10 flex snap-x gap-3 overflow-x-auto px-5 pb-2">
              {favorites.map((p) => (
                <Link key={p.name} href="/urunlerimiz/#sutlu-tatlilar" className="group w-36 shrink-0 snap-start">
                  <div className="relative aspect-square overflow-hidden rounded-2xl bg-cocoa">
                    <Image src={p.image} alt={p.name} fill sizes="144px" className="object-cover transition duration-500 group-hover:scale-110" />
                  </div>
                  <p className="mt-2 text-sm font-semibold leading-tight">{p.name}</p>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────────── DONDURMA ───────────── */}
      <section className="on-dark relative isolate overflow-hidden bg-cocoa py-24 text-cream md:py-32">
        <div className="pointer-events-none absolute right-0 top-0 -z-10 size-[500px] rounded-full glow-brand" />
        <div className="container-x grid items-center gap-14 lg:grid-cols-[1fr_1.1fr]">
          <Reveal variant="mask">
            <p className="eyebrow">Tat Dondurma</p>
            <h2 className="mt-4 font-display text-5xl font-medium leading-[1.02] md:text-7xl">
              {FLAVORS.length} çeşit,
              <br />
              <em className="text-gold-light">%100 doğal.</em>
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-cream/70">
              Gerçek meyve, gerçek fıstık, gerçek kakao. Her gün taze üretilen dondurmalarımızı külah, kâğıt helva, cup ya da paket
              olarak dilediğiniz gibi seçin.
            </p>
            <a href="#kulah" className="btn btn-gold mt-8">
              Kendi külahını oluştur
            </a>
          </Reveal>
          <Reveal delay={120} className="grid grid-cols-2 gap-4">
            <div className="img-wipe parallax relative aspect-[3/5] overflow-hidden rounded-t-full rounded-b-3xl">
              <Image src="/images/neden3.jpg" alt="Böğürtlenli ve portakallı dondurmalar" fill sizes="(min-width:1024px) 25vw, 50vw" className="object-cover" />
            </div>
            <div className="img-wipe parallax relative mt-16 aspect-[3/5] overflow-hidden rounded-b-full rounded-t-3xl">
              <Image src="/images/neden1.jpg" alt="Paket dondurma hazırlanırken" fill sizes="(min-width:1024px) 25vw, 50vw" className="object-cover" />
            </div>
          </Reveal>
        </div>
        <div id="kulah" className="container-x relative mt-16 scroll-mt-24">
          <Reveal variant="card">
            <FlavorBuilder />
          </Reveal>
        </div>
      </section>

      {/* ───────────── TASARIM PASTA ───────────── */}
      <section className="py-24 md:py-32">
        <div className="container-x">
          <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_1fr]">
            <Reveal className="grid grid-cols-3 gap-3 md:gap-4">
              {[
                ["/images/robloxp.jpg", "Roblox temalı doğum günü pastası"],
                ["/images/products/sekerpas.jpg", "Şeker hamurlu tasarım pasta"],
                ["/images/products/sippas.jpg", "Çiçekli katlı tasarım pasta"],
              ].map(([src, alt], i) => (
                <div key={src} className={`img-wipe parallax relative aspect-[3/5] overflow-hidden rounded-3xl bg-cocoa ${i === 1 ? "translate-y-10" : ""}`}>
                  <Image src={src} alt={alt} fill sizes="(min-width:1024px) 18vw, 33vw" className="object-cover" />
                </div>
              ))}
            </Reveal>
            <Reveal delay={120}>
              <p className="eyebrow">Özel günleriniz için</p>
              <h2 className="mt-4 font-display text-5xl font-medium leading-[1.02] md:text-6xl">
                Hayalinizdeki pastayı <em className="text-brand">birlikte</em> tasarlayalım.
              </h2>
              <ol className="mt-10 space-y-6">
                {[
                  ["Fikrinizi paylaşın", "Model fotoğrafı, tema, yazı ve kişi sayısını bize iletin."],
                  ["Birlikte netleştirelim", "Ustalarımız tasarımı, lezzeti ve teslim gününü sizinle belirlesin."],
                  ["Mutluluğu teslim alın", "Pastanız, seçtiğiniz şubede taptaze hazır olsun."],
                ].map(([t, d], i) => (
                  <li key={t} className="flex gap-5">
                    <span className="grid size-11 shrink-0 place-items-center rounded-full bg-brand font-display text-lg text-cream">{i + 1}</span>
                    <div>
                      <p className="font-display text-xl font-semibold">{t}</p>
                      <p className="mt-1 text-muted">{d}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <Link href="/ozel-siparis/" className="btn btn-primary mt-10">
                Sipariş Formunu Doldur <ArrowIcon width={18} height={18} />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────────── DEĞERLER ───────────── */}
      <section className="bg-cream-2 py-24 md:py-32">
        <div className="container-x">
          <Reveal variant="mask" className="text-center">
            <p className="font-display text-5xl italic text-brand md:text-7xl">Sanatın</p>
            <h2 className="font-display text-[3.4rem] font-normal uppercase leading-none tracking-[0.06em] sm:text-8xl md:text-[9rem]">Zirvesi</h2>
            <p className="mt-6 text-xs font-bold uppercase tracking-[0.4em] text-muted md:text-sm">Bizi biz yapanlar</p>
          </Reveal>
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {VALUES.map((v, i) => (
              <Reveal key={v.kicker} delay={i * 120} variant="card" className="group overflow-hidden rounded-3xl bg-cream shadow-[0_20px_60px_-30px_rgba(28,18,14,0.35)]">
                <div className="img-wipe parallax relative h-56 overflow-hidden">
                  <Image src={v.image} alt="" fill sizes="(min-width:768px) 33vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-3 text-brand">
                    <v.icon width={22} height={22} />
                    <span className="text-xs font-bold uppercase tracking-[0.2em]">{v.kicker}</span>
                  </div>
                  <h3 className="mt-4 font-display text-2xl font-semibold">{v.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-20 grid grid-cols-2 gap-y-10 border-t border-ink/10 pt-14 md:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-display text-5xl font-medium text-brand md:text-6xl">
                  <Counter to={s.value} prefix={s.prefix} suffix={s.suffix} />
                </p>
                <p className="mt-2 text-sm font-semibold uppercase tracking-[0.15em] text-muted">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── ÖNE ÇIKANLAR (Instagram afişleri) ───────────── */}
      <section className="overflow-hidden bg-cream-2 py-24 md:py-32">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <Reveal variant="mask">
              <p className="eyebrow">Instagram&apos;dan</p>
              <h2 className="mt-4 font-display text-4xl font-medium leading-tight md:text-6xl">
                Tat&apos;tan <em className="text-brand">kareler</em>
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener" className="btn btn-ghost text-ink">
                <InstagramIcon width={18} height={18} /> @{SETTINGS.instagram}
              </a>
            </Reveal>
          </div>
          <Reveal className="mt-10">
            <StoryHighlights className="-mx-5 px-5 md:mx-0 md:px-0" />
          </Reveal>
          <Reveal className="mt-8 min-w-0" variant="card">
            <PosterStrip />
          </Reveal>
        </div>
      </section>

      {/* ───────────── YORUMLAR ───────────── */}
      <section className="py-24 md:py-32">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <Reveal variant="mask">
              <p className="eyebrow">Misafirlerimiz ne diyor?</p>
              <h2 className="mt-4 font-display text-4xl font-medium leading-tight md:text-6xl">
                Tatlı sözler <em className="text-brand">için</em> teşekkürler.
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <a href={SITE.reviewsUrl} target="_blank" rel="noopener" className="btn btn-ghost text-ink">
                Tüm Google yorumları <ArrowIcon width={18} height={18} />
              </a>
            </Reveal>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {REVIEWS.map((r, i) => (
              <Reveal key={r.author} delay={i * 120} variant="card" as="figure" className="flex h-full flex-col rounded-3xl border border-ink/10 bg-cream p-8">
                <div className="flex gap-0.5 text-gold">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <StarIcon key={k} width={16} height={16} />
                  ))}
                </div>
                <blockquote className="mt-6 flex-1 font-display text-xl leading-relaxed">“{r.text}”</blockquote>
                <figcaption className="mt-8 flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-full bg-brand font-bold text-cream">{r.author[0]}</span>
                  <span>
                    <span className="block font-semibold">{r.author}</span>
                    <span className="text-sm text-muted">Google yorumu</span>
                  </span>
                </figcaption>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── ŞUBELER ───────────── */}
      <section className="on-dark relative overflow-hidden bg-cocoa-2 py-24 text-cream md:py-32">
        <div className="container-x relative">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <Reveal variant="mask">
              <p className="eyebrow">5 şube, aynı lezzet</p>
              <h2 className="mt-4 font-display text-4xl font-medium leading-tight md:text-6xl">
                Size en yakın <em className="text-gold-light">Tat</em>
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <Link href="/subelerimiz/" className="group inline-flex items-center gap-2 font-bold text-gold-light">
                Tüm şube bilgileri <ArrowIcon width={18} height={18} className="transition group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {BRANCHES.map((b, i) => (
              <Reveal key={b.slug} delay={i * 80} variant="card" className="flex flex-col rounded-3xl bg-white/5 p-6 ring-1 ring-white/10 transition hover:bg-white/10">
                <div className="flex items-start justify-between gap-2">
                  <PinIcon className="text-gold-light" />
                  <OpenStatus open={b.open} close={b.close} dark />
                </div>
                <h3 className="mt-6 font-display text-2xl">{b.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-cream/60">{b.address}</p>
                <div className="mt-6 flex gap-2 text-sm font-bold">
                  <a href={`tel:${b.phone}`} className="flex-1 rounded-full bg-cream py-2.5 text-center text-ink transition hover:bg-gold-light">
                    Ara
                  </a>
                  <a href={mapsLink(b)} target="_blank" rel="noopener" className="flex-1 rounded-full py-2.5 text-center ring-1 ring-white/25 transition hover:ring-white">
                    Yol tarifi
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
