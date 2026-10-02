"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { ALLERGENS, MENU, formatPrice, type Lang, type MenuItem } from "@/data/menu";
import { BRANCHES, FLAVORS, INSTAGRAM_URL, SETTINGS, whatsappLink } from "@/data/site";
import HeroMedia from "./HeroMedia";
import { ArrowIcon, CloseIcon, InstagramIcon, PhoneIcon, SearchIcon, StarIcon, WhatsAppIcon } from "./Icons";
import OpenStatus from "./OpenStatus";

const T = {
  tr: {
    greet: ["İyi geceler", "Günaydın", "İyi günler", "İyi akşamlar"],
    welcome: "Lezzetlerimizi keşfedin",
    open: "Menüyü Görüntüle",
    back: "Menü",
    search: "Ürün ara…",
    clear: "Aramayı temizle",
    best: "Çok satanlar",
    bestBadge: "Çok satan",
    items: "ürün",
    flavors: "Dondurma çeşitlerimiz",
    empty: "Aramanızla eşleşen ürün yok.",
    note: "Fiyatlar şubeler arasında farklılık gösterebilir.",
    ingredients: "İçindekiler",
    calories: "Enerji",
    perPortion: "kcal / porsiyon",
    allergens: "Alerjenler",
    noInfo: "İçerik ve alerjen bilgisi için lütfen personelimize danışın.",
    options: "Seçenekler",
    ask: "WhatsApp'tan sor",
    close: "Kapat",
    prev: "Önceki ürün",
    next: "Sonraki ürün",
    hours: "Her gün",
    site: "tatpastanesi.com'u ziyaret edin",
  },
  en: {
    greet: ["Good night", "Good morning", "Good afternoon", "Good evening"],
    welcome: "Discover our flavours",
    open: "View the Menu",
    back: "Menu",
    search: "Search…",
    clear: "Clear search",
    best: "Best sellers",
    bestBadge: "Best seller",
    items: "items",
    flavors: "Our ice cream flavours",
    empty: "No items match your search.",
    note: "Prices may vary between branches.",
    ingredients: "Ingredients",
    calories: "Energy",
    perPortion: "kcal / portion",
    allergens: "Allergens",
    noInfo: "Please ask our staff for ingredient and allergen information.",
    options: "Options",
    ask: "Ask on WhatsApp",
    close: "Close",
    prev: "Previous item",
    next: "Next item",
    hours: "Daily",
    site: "Visit tatpastanesi.com",
  },
} as const;

const normalize = (s: string) =>
  s.toLocaleLowerCase("tr").normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/ı/g, "i");

/** İstanbul saatine göre: 0 gece, 1 sabah, 2 öğlen, 3 akşam */
function dayPart() {
  const h = Number(new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Istanbul", hour: "2-digit", hourCycle: "h23" }).format(new Date()));
  return h < 5 ? 0 : h < 12 ? 1 : h < 18 ? 2 : 3;
}

function PriceLine({ item, lang, big = false }: { item: MenuItem; lang: Lang; big?: boolean }) {
  if (!item.variants.length)
    return <span className={`font-display font-semibold tabular-nums text-brand ${big ? "text-3xl" : "text-lg"}`}>{formatPrice(item.price, lang)}</span>;
  return (
    <span className="flex flex-wrap gap-x-3 gap-y-0.5">
      {item.variants.map((v) => (
        <span key={v.key} className="whitespace-nowrap text-sm">
          <span className="text-muted">{v.label[lang]}</span>{" "}
          <span className="font-display text-base font-semibold tabular-nums text-brand">{formatPrice(v.price, lang)}</span>
        </span>
      ))}
    </span>
  );
}

export default function MenuBoard() {
  const [lang, setLang] = useState<Lang>("tr");
  const [part, setPart] = useState<number | null>(null);
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [active, setActive] = useState(MENU[0].slug);
  const [inMenu, setInMenu] = useState(false);
  const [selected, setSelected] = useState<MenuItem | null>(null);
  const [drag, setDrag] = useState(0);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const t = T[lang];

  useEffect(() => {
    setPart(dayPart());
    try {
      const saved = localStorage.getItem("tat-lang");
      if (saved === "en" || saved === "tr") setLang(saved);
    } catch {}
  }, []);
  const changeLang = (l: Lang) => {
    setLang(l);
    document.documentElement.lang = l;
    try {
      localStorage.setItem("tat-lang", l);
    } catch {}
  };

  const q = normalize(query.trim());
  const filtered = useMemo(
    () =>
      MENU.map((c) => ({
        ...c,
        items: q ? c.items.filter((i) => normalize(i.name.tr).includes(q) || normalize(i.name.en).includes(q)) : c.items,
      })).filter((c) => c.items.length),
    [q],
  );
  const featured = useMemo(() => MENU.flatMap((c) => c.items.filter((i) => i.featured)), []);
  const flat = useMemo(() => filtered.flatMap((c) => c.items), [filtered]);
  const index = selected ? flat.findIndex((i) => i.key === selected.key) : -1;
  const go = (d: number) => index >= 0 && setSelected(flat[(index + d + flat.length) % flat.length]);

  // Aktif kategori ve üst çubuğun "menü içinde" durumu
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const v = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (v[0]) setActive(v[0].target.id.replace("m-", ""));
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    filtered.forEach((c) => {
      const el = document.getElementById(`m-${c.slug}`);
      if (el) io.observe(el);
    });
    const hero = document.getElementById("menu-giris");
    const hio = new IntersectionObserver(([e]) => setInMenu(!e.isIntersecting), { rootMargin: "-80px 0px 0px 0px" });
    if (hero) hio.observe(hero);
    return () => {
      io.disconnect();
      hio.disconnect();
    };
  }, [filtered]);

  useEffect(() => {
    // Yalnızca sekme çubuğunu yatay kaydır; scrollIntoView sayfanın tamamını da kaydırabiliyor
    const nav = navRef.current;
    const chip = nav?.querySelector<HTMLElement>(`[data-slug="${active}"]`);
    if (nav && chip) nav.scrollTo({ left: chip.offsetLeft - nav.clientWidth / 2 + chip.clientWidth / 2, behavior: "smooth" });
  }, [active]);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (selected && !d.open) d.showModal();
    if (!selected && d.open) d.close();
    setDrag(0);
  }, [selected]);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  const jump = (slug: string) => {
    const el = document.getElementById(`m-${slug}`);
    if (!el) return;
    const bar = document.getElementById("menu-bar")?.offsetHeight ?? 0;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - bar - 8, behavior: "smooth" });
  };

  const hasDetails = (i: MenuItem) => i.ingredients[lang] || i.calories !== null || i.allergens.length > 0;

  return (
    <div className="min-h-svh bg-cream pb-10">
      {/* ───── Giriş ───── */}
      <section id="menu-giris" className="on-dark relative isolate flex min-h-[86svh] flex-col overflow-hidden bg-cocoa text-cream">
        <HeroMedia image={SETTINGS.menu_background || "/images/menu/16.jpg"} videoDesktop={SETTINGS.hero_video_desktop} videoMobile={SETTINGS.hero_video_mobile} />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-cocoa via-cocoa/55 to-cocoa/30" />
        <div className="container-x flex items-center justify-between pt-5">
          <Image src="/images/tat-logo.png" alt="Tat Dondurma & Pastanesi" width={900} height={649} priority className="h-auto w-24" />
          <div role="group" aria-label="Dil / Language" className="flex rounded-full bg-black/25 p-1 text-xs font-bold ring-1 ring-white/15 backdrop-blur">
            {(["tr", "en"] as const).map((l) => (
              <button
                key={l}
                type="button"
                aria-pressed={lang === l}
                onClick={() => changeLang(l)}
                className={`rounded-full px-3.5 py-1.5 transition ${lang === l ? "bg-cream text-ink" : "text-cream/80"}`}
              >
                {l === "tr" ? "Türkçe" : "English"}
              </button>
            ))}
          </div>
        </div>
        <div className="container-x mt-auto pb-10">
          <p className="eyebrow min-h-4">{part !== null ? t.greet[part] : " "}</p>
          <h1 className="mt-4 font-display text-5xl font-medium leading-[1.02] md:text-7xl">{t.welcome}</h1>
          <button type="button" onClick={() => jump(MENU[0].slug)} className="btn btn-gold mt-8 w-full !py-5 text-lg sm:w-auto">
            {t.open} <ArrowIcon width={20} height={20} className="rotate-90" />
          </button>
        </div>
      </section>

      {/* ───── Üst çubuk: geri, kategoriler, arama ───── */}
      <div id="menu-bar" className="sticky top-0 z-30 border-b border-ink/10 bg-cream/95 shadow-[0_10px_30px_-20px_rgba(28,18,14,0.35)] backdrop-blur-xl">
        <div className="container-x flex h-14 items-center gap-2">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex shrink-0 items-center gap-1.5 rounded-full bg-ink py-2 pl-3 pr-4 text-sm font-bold text-cream"
          >
            <ArrowIcon width={16} height={16} className="rotate-180" /> {t.back}
          </button>
          {searchOpen ? (
            <label className="relative flex-1">
              <span className="sr-only">{t.search}</span>
              <input
                ref={searchRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.search}
                className="w-full rounded-full border border-ink/15 bg-cream py-2 pl-4 pr-10 text-base outline-none focus:border-brand"
              />
              <button
                type="button"
                aria-label={t.clear}
                onClick={() => {
                  setQuery("");
                  setSearchOpen(false);
                }}
                className="absolute right-1.5 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full text-muted"
              >
                <CloseIcon width={16} height={16} />
              </button>
            </label>
          ) : (
            <>
              <p className="min-w-0 flex-1 truncate text-center font-display text-lg">
                {inMenu ? MENU.find((c) => c.slug === active)?.name[lang] : ""}
              </p>
              <button type="button" aria-label={t.search} onClick={() => setSearchOpen(true)} className="grid size-10 shrink-0 place-items-center rounded-full bg-cream-2">
                <SearchIcon width={18} height={18} />
              </button>
              <button
                type="button"
                onClick={() => changeLang(lang === "tr" ? "en" : "tr")}
                className="grid h-10 shrink-0 place-items-center rounded-full bg-cream-2 px-3 text-xs font-bold"
                aria-label={lang === "tr" ? "Switch to English" : "Türkçeye geç"}
              >
                {lang === "tr" ? "EN" : "TR"}
              </button>
            </>
          )}
        </div>
        <div ref={navRef} className="no-scrollbar container-x relative flex gap-1 overflow-x-auto pb-2 md:justify-center">
          {filtered.map((c) => {
            const on = active === c.slug;
            return (
              <button
                key={c.slug}
                type="button"
                data-slug={c.slug}
                onClick={() => jump(c.slug)}
                className="flex w-[5.25rem] shrink-0 flex-col items-center gap-1 rounded-2xl px-0.5 py-1.5"
              >
                <span className={`relative size-12 overflow-hidden rounded-full ring-2 transition ${on ? "ring-brand" : "ring-transparent"}`}>
                  <Image src={c.cover} alt="" fill sizes="48px" className="object-cover" />
                </span>
                <span className={`line-clamp-2 min-h-[2em] text-center text-[11px] font-bold leading-tight ${on ? "text-brand" : "text-ink/70"}`}>{c.name[lang]}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="container-x">
        {!q && featured.length > 0 && (
          <section aria-labelledby="best" className="pt-8">
            <h2 id="best" className="flex items-center gap-2 font-display text-2xl font-medium">
              <StarIcon className="text-gold" /> {t.best}
            </h2>
            <ul className="no-scrollbar -mx-5 mt-4 flex snap-x gap-3 overflow-x-auto px-5 pb-2">
              {featured.map((i) => (
                <li key={i.key} className="w-44 shrink-0 snap-start md:w-56">
                  <button type="button" onClick={() => setSelected(i)} className="group block w-full text-left">
                    <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-cream-2">
                      <Image src={i.image} alt={i.name[lang]} fill sizes="224px" placeholder={i.blur ? "blur" : "empty"} blurDataURL={i.blur || undefined} className="object-cover transition duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-cocoa/85 via-transparent to-transparent" />
                      <span className="absolute right-2.5 top-2.5 rounded-full bg-cream px-2.5 py-1 text-xs font-bold tabular-nums text-brand shadow">
                        {formatPrice(i.price, lang)}
                      </span>
                      <p className="absolute inset-x-3 bottom-3 font-display text-lg leading-tight text-cream">{i.name[lang]}</p>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </section>
        )}

        {filtered.length === 0 && <p className="py-20 text-center font-display text-2xl text-muted">{t.empty}</p>}

        {filtered.map((c) => (
          <section key={c.slug} id={`m-${c.slug}`} className="pt-10">
            <div className="flex items-baseline justify-between gap-4 border-b border-ink/15 pb-3">
              <h2 className="font-display text-3xl font-medium md:text-4xl">{c.name[lang]}</h2>
              <span className="text-xs font-semibold text-muted">
                {c.items.length} {t.items}
              </span>
            </div>
            <ul className="mt-5 grid grid-cols-2 gap-x-3 gap-y-6 md:grid-cols-3 lg:grid-cols-4">
              {c.items.map((i) => (
                <li key={i.key}>
                  <button type="button" onClick={() => setSelected(i)} className="group flex h-full w-full flex-col text-left">
                    <span className="relative block aspect-square w-full overflow-hidden rounded-3xl bg-cream-2">
                      <Image
                        src={i.image}
                        alt=""
                        fill
                        sizes="(min-width:1024px) 25vw, (min-width:768px) 33vw, 50vw"
                        placeholder={i.blur ? "blur" : "empty"}
                        blurDataURL={i.blur || undefined}
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                      {i.featured && (
                        <span className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-cream/95 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-brand">
                          <StarIcon width={10} height={10} /> {t.bestBadge}
                        </span>
                      )}
                    </span>
                    <span className="mt-2.5 block font-display text-[1.05rem] font-semibold leading-snug">{i.name[lang]}</span>
                    {i.desc[lang] && <span className="mt-0.5 line-clamp-2 block text-[13px] leading-snug text-muted">{i.desc[lang]}</span>}
                    <span className="mt-auto block pt-1.5">
                      <PriceLine item={i} lang={lang} />
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            {c.slug === "dondurma" && !q && FLAVORS.length > 0 && (
              <div className="mt-8 rounded-3xl bg-cream-2 p-5">
                <h3 className="font-display text-xl font-semibold">
                  {t.flavors} <span className="font-sans text-sm font-normal text-muted">({FLAVORS.length})</span>
                </h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {FLAVORS.map((f) => (
                    <li key={f.name} className="flex items-center gap-2 rounded-full bg-cream px-3 py-1.5 text-sm font-medium">
                      <span className="size-3 rounded-full ring-1 ring-ink/15" style={{ background: f.color }} />
                      {f.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        ))}

        {/* ───── Menü sonu: şubeler ───── */}
        <footer className="mt-16 rounded-[2rem] bg-cocoa p-6 text-cream md:p-10">
          <Image src="/images/tat-logo.png" alt="Tat Dondurma & Pastanesi" width={900} height={649} className="h-auto w-24" />
          <p className="mt-4 text-sm text-cream/70">
            {t.note} {t.noInfo}
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {BRANCHES.map((b) => (
              <li key={b.slug} className="flex items-center justify-between gap-3 rounded-2xl bg-white/5 p-4">
                <span>
                  <span className="block font-display text-lg">{b.name}</span>
                  <span className="text-xs text-cream/60">
                    {t.hours} {b.open} – {b.close}
                  </span>
                </span>
                <span className="flex items-center gap-2">
                  <OpenStatus open={b.open} close={b.close} dark />
                  <a href={`tel:${b.phone}`} aria-label={`${b.name} ara`} className="grid size-10 place-items-center rounded-full bg-cream text-ink">
                    <PhoneIcon width={16} height={16} />
                  </a>
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-3 text-sm font-bold">
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener" className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2.5">
              <InstagramIcon width={16} height={16} /> @{SETTINGS.instagram}
            </a>
            <Link href="/" className="flex items-center gap-2 rounded-full px-4 py-2.5 ring-1 ring-white/20">
              {t.site} <ArrowIcon width={16} height={16} />
            </Link>
          </div>
        </footer>
      </div>

      {/* ───── Ürün detayı: telefonda alttan açılan kart, bilgisayarda pencere ───── */}
      <dialog
        ref={dialogRef}
        onClose={() => setSelected(null)}
        onClick={(e) => e.target === e.currentTarget && setSelected(null)}
        className="menu-sheet bg-cream p-0 text-ink shadow-2xl backdrop:bg-cocoa/70"
        style={drag ? { transform: `translateY(${drag}px)`, transition: "none" } : undefined}
      >
        {selected && (
          <div className="grid md:grid-cols-[1.05fr_1fr]">
            <div
              className="relative aspect-[4/3] w-full bg-cream-2 md:aspect-auto md:min-h-[520px]"
              onTouchStart={(e) => (touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY })}
              onTouchMove={(e) => {
                if (!touch.current) return;
                const dy = e.touches[0].clientY - touch.current.y;
                const dx = e.touches[0].clientX - touch.current.x;
                if (dy > 0 && Math.abs(dy) > Math.abs(dx)) setDrag(dy);
              }}
              onTouchEnd={(e) => {
                if (!touch.current) return;
                const dx = e.changedTouches[0].clientX - touch.current.x;
                if (drag > 110) setSelected(null);
                else if (Math.abs(dx) > 50 && drag < 20) go(dx < 0 ? 1 : -1);
                setDrag(0);
                touch.current = null;
              }}
            >
              <Image
                key={selected.key}
                src={selected.image}
                alt={selected.name[lang]}
                fill
                sizes="(min-width:768px) 480px, 100vw"
                placeholder={selected.blur ? "blur" : "empty"}
                blurDataURL={selected.blur || undefined}
                className="animate-[fade-in_0.35s_ease] object-cover"
              />
              <span aria-hidden className="absolute left-1/2 top-2.5 h-1.5 w-12 -translate-x-1/2 rounded-full bg-white/80 shadow md:hidden" />
              <button type="button" onClick={() => go(-1)} aria-label={t.prev} className="absolute left-3 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-cream/90 shadow-lg">
                <ArrowIcon width={16} height={16} className="rotate-180" />
              </button>
              <button type="button" onClick={() => go(1)} aria-label={t.next} className="absolute right-3 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-cream/90 shadow-lg">
                <ArrowIcon width={16} height={16} />
              </button>
              <button type="button" onClick={() => setSelected(null)} aria-label={t.close} className="absolute right-3 top-3 grid size-10 place-items-center rounded-full bg-cream/90 shadow-lg">
                <CloseIcon />
              </button>
            </div>
            <div className="flex flex-col p-6 md:p-9">
              <h3 className="font-display text-3xl font-medium leading-tight md:text-4xl">{selected.name[lang]}</h3>
              {selected.desc[lang] && <p className="mt-2 leading-relaxed text-muted">{selected.desc[lang]}</p>}

              {selected.variants.length ? (
                <div className="mt-5">
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted">{t.options}</p>
                  <ul className="mt-2 divide-y divide-ink/10 rounded-2xl border border-ink/10">
                    {selected.variants.map((v) => (
                      <li key={v.key} className="flex items-center justify-between px-4 py-3">
                        <span className="font-semibold">{v.label[lang]}</span>
                        <span className="font-display text-xl tabular-nums text-brand">{formatPrice(v.price, lang)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="mt-4">
                  <PriceLine item={selected} lang={lang} big />
                </p>
              )}

              <div className="mt-5 space-y-4 rounded-2xl bg-cream-2 p-5 text-sm">
                {hasDetails(selected) ? (
                  <>
                    {selected.ingredients[lang] && (
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted">{t.ingredients}</p>
                        <p className="mt-1 leading-relaxed">{selected.ingredients[lang]}</p>
                      </div>
                    )}
                    {selected.calories !== null && (
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted">{t.calories}</p>
                        <p className="mt-1 font-semibold tabular-nums">
                          {selected.calories} {t.perPortion}
                        </p>
                      </div>
                    )}
                    {selected.allergens.length > 0 && (
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted">{t.allergens}</p>
                        <ul className="mt-2 flex flex-wrap gap-1.5">
                          {selected.allergens.map((a) => (
                            <li key={a} className="rounded-full bg-brand/10 px-3 py-1 font-semibold text-brand-dark">
                              {ALLERGENS[a]?.[lang] ?? a}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </>
                ) : (
                  <p className="leading-relaxed text-muted">{t.noInfo}</p>
                )}
              </div>

              <a
                href={whatsappLink(BRANCHES[0], `Merhaba, ${selected.name.tr} hakkında bilgi almak istiyorum.`)}
                target="_blank"
                rel="noopener"
                className="btn mt-6 self-start bg-[#1f9d55] text-white hover:brightness-110"
              >
                <WhatsAppIcon width={18} height={18} /> {t.ask}
              </a>
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}
