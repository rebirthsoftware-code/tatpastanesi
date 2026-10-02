"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { ALLERGENS, MENU, formatPrice, type Lang, type MenuCategory, type MenuItem } from "@/data/menu";
import { BRANCHES, FLAVORS, INSTAGRAM_URL, SETTINGS, SITE, whatsappLink } from "@/data/site";
import HeroMedia from "./HeroMedia";
import { ArrowIcon, CloseIcon, InstagramIcon, PhoneIcon, SearchIcon, StarIcon, WhatsAppIcon } from "./Icons";
import OpenStatus from "./OpenStatus";

const T = {
  tr: {
    greet: ["İyi geceler", "Günaydın", "İyi günler", "İyi akşamlar"],
    welcome: "Lezzetlerimizi keşfedin",
    sub: "2001'den beri, her gün taze.",
    open: "Menüyü Görüntüle",
    menu: "Menü",
    categories: "Kategoriler",
    pick: "Ne yemek istersiniz?",
    search: "Ürün ara…",
    close: "Kapat",
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
    prev: "Önceki ürün",
    next: "Sonraki ürün",
    hours: "Her gün",
    site: "tatpastanesi.com'u ziyaret edin",
    view: "İncele",
  },
  en: {
    greet: ["Good night", "Good morning", "Good afternoon", "Good evening"],
    welcome: "Discover our flavours",
    sub: "Freshly made every day since 2001.",
    open: "View the Menu",
    menu: "Menu",
    categories: "Categories",
    pick: "What would you like?",
    search: "Search…",
    close: "Close",
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
    prev: "Previous item",
    next: "Next item",
    hours: "Daily",
    site: "Visit tatpastanesi.com",
    view: "View",
  },
} as const;

type Screen = { name: "welcome" } | { name: "categories" } | { name: "category"; slug: string };

const depth = (s: Screen) => (s.name === "welcome" ? 0 : s.name === "categories" ? 1 : 2);
const toHash = (s: Screen) => (s.name === "welcome" ? "" : s.name === "categories" ? "#kategoriler" : `#k-${s.slug}`);
function fromHash(h: string): Screen {
  if (h === "#kategoriler") return { name: "categories" };
  const slug = h.startsWith("#k-") ? h.slice(3) : "";
  if (slug && MENU.some((c) => c.slug === slug)) return { name: "category", slug };
  return { name: "welcome" };
}

const normalize = (s: string) =>
  s.toLocaleLowerCase("tr").normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/ı/g, "i");

/** İstanbul saatine göre: 0 gece, 1 sabah, 2 öğlen, 3 akşam */
function dayPart() {
  const h = Number(new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Istanbul", hour: "2-digit", hourCycle: "h23" }).format(new Date()));
  return h < 5 ? 0 : h < 12 ? 1 : h < 18 ? 2 : 3;
}

const stagger = (i: number) => ({ "--d": `${Math.min(i, 10) * 70}ms` }) as React.CSSProperties;

function PriceLine({ item, lang, big = false }: { item: MenuItem; lang: Lang; big?: boolean }) {
  if (!item.variants.length)
    return <span className={`font-display font-semibold tabular-nums text-brand ${big ? "text-3xl" : "text-xl"}`}>{formatPrice(item.price, lang)}</span>;
  return (
    <span className="flex flex-wrap gap-2">
      {item.variants.map((v) => (
        <span key={v.key} className="whitespace-nowrap rounded-full bg-cream-2 px-3 py-1 text-sm">
          <span className="text-muted">{v.label[lang]}</span>{" "}
          <span className="font-display font-semibold tabular-nums text-brand">{formatPrice(v.price, lang)}</span>
        </span>
      ))}
    </span>
  );
}

function LangToggle({ lang, onChange, dark = false }: { lang: Lang; onChange: (l: Lang) => void; dark?: boolean }) {
  return (
    <div
      role="group"
      aria-label="Dil / Language"
      className={`flex rounded-full p-1 text-xs font-bold backdrop-blur ${dark ? "bg-black/25 ring-1 ring-white/15" : "bg-cream-2"}`}
    >
      {(["tr", "en"] as const).map((l) => (
        <button
          key={l}
          type="button"
          aria-pressed={lang === l}
          onClick={() => onChange(l)}
          className={`rounded-full px-3 py-1.5 transition ${
            lang === l ? (dark ? "bg-cream text-ink" : "bg-ink text-cream") : dark ? "text-cream/80" : "text-muted"
          }`}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

export default function MenuBoard() {
  const [lang, setLang] = useState<Lang>("tr");
  const [part, setPart] = useState<number | null>(null);
  const [screen, setScreen] = useState<Screen>({ name: "welcome" });
  const [dir, setDir] = useState<"fwd" | "back">("fwd");
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<{ item: MenuItem; list: MenuItem[] } | null>(null);
  const [drag, setDrag] = useState(0);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const screenRef = useRef(screen);
  const t = T[lang];

  // ───── Ekranlar arası geçiş (telefonun geri tuşu da çalışır) ─────
  const show = useCallback((next: Screen) => {
    const prev = screenRef.current;
    const forward = depth(next) >= depth(prev);
    const apply = () => {
      screenRef.current = next;
      setDir(forward ? "fwd" : "back");
      setScreen(next);
      window.scrollTo(0, 0);
    };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown };
    document.documentElement.classList.toggle("has-vt", !!doc.startViewTransition);
    if (doc.startViewTransition && !reduce) {
      document.documentElement.dataset.menuDir = forward ? "fwd" : "back";
      doc.startViewTransition(() => flushSync(apply));
    } else apply();
  }, []);

  const go = (next: Screen) => {
    const hash = toHash(next);
    if (hash === location.hash || (!hash && !location.hash)) return;
    history.pushState({ menu: true }, "", hash || location.pathname);
    show(next);
  };

  useEffect(() => {
    setPart(dayPart());
    try {
      const saved = localStorage.getItem("tat-lang");
      if (saved === "en" || saved === "tr") setLang(saved);
    } catch {}
    const initial = fromHash(location.hash);
    screenRef.current = initial;
    setScreen(initial);
    const onPop = () => {
      setSelected(null);
      show(fromHash(location.hash));
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [show]);

  const changeLang = (l: Lang) => {
    setLang(l);
    document.documentElement.lang = l;
    try {
      localStorage.setItem("tat-lang", l);
    } catch {}
  };

  // ───── Ürün detayı ─────
  const open = (item: MenuItem, list: MenuItem[]) => setSelected({ item, list });
  const step = (d: number) =>
    setSelected((s) => {
      if (!s) return s;
      const i = s.list.findIndex((x) => x.key === s.item.key);
      return { ...s, item: s.list[(i + d + s.list.length) % s.list.length] };
    });

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
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  // ───── Arama ─────
  const q = normalize(query.trim());
  const results = useMemo(
    () => (q ? MENU.flatMap((c) => c.items).filter((i) => normalize(i.name.tr).includes(q) || normalize(i.name.en).includes(q)) : []),
    [q],
  );

  const category = screen.name === "category" ? MENU.find((c) => c.slug === screen.slug) : undefined;
  const sel = selected?.item;
  const hasDetails = (i: MenuItem) => i.ingredients[lang] || i.calories !== null || i.allergens.length > 0;

  const TopBar = ({ title, back }: { title: string; back: Screen }) => (
    <div className="sticky top-0 z-30 border-b border-ink/10 bg-cream/90 backdrop-blur-xl">
      <div className="container-x flex h-16 items-center gap-2">
        <button
          type="button"
          onClick={() => (history.state?.menu ? history.back() : go(back))}
          aria-label={back.name === "welcome" ? t.menu : t.categories}
          className="flex shrink-0 items-center gap-1.5 rounded-full bg-ink py-2.5 pl-3 pr-4 text-sm font-bold text-cream"
        >
          <ArrowIcon width={16} height={16} className="rotate-180" /> {back.name === "welcome" ? t.menu : t.categories}
        </button>
        <p className="min-w-0 flex-1 truncate text-center font-display text-xl max-sm:invisible">{title}</p>
        <button type="button" aria-label={t.search} onClick={() => setSearchOpen(true)} className="grid size-10 shrink-0 place-items-center rounded-full bg-cream-2">
          <SearchIcon width={18} height={18} />
        </button>
        <LangToggle lang={lang} onChange={changeLang} />
      </div>
    </div>
  );

  return (
    <div className={`menu-screen min-h-svh bg-cream ${dir === "fwd" ? "screen-fwd" : "screen-back"}`} key={toHash(screen) || "welcome"}>
      {/* ═════════ 1 · GİRİŞ ═════════ */}
      {screen.name === "welcome" && (
        <section className="on-dark relative isolate flex h-svh min-h-[560px] flex-col overflow-hidden bg-cocoa text-cream">
          <div className="welcome-zoom absolute inset-0 -z-20">
            <HeroMedia image={SETTINGS.menu_background || "/images/menu/16.jpg"} videoDesktop={SETTINGS.hero_video_desktop} videoMobile={SETTINGS.hero_video_mobile} />
          </div>
          <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-cocoa via-cocoa/50 to-cocoa/20" />

          <div className="container-x flex items-center justify-between pt-5">
            <span />
            <LangToggle lang={lang} onChange={changeLang} dark />
          </div>

          <div className="container-x flex flex-1 flex-col items-center justify-center text-center">
            <Image src="/images/tat-logo.png" alt="Tat Dondurma & Pastanesi" width={900} height={649} priority className="rise h-auto w-40 drop-shadow-2xl md:w-52" style={stagger(1)} />
          </div>

          <div className="container-x pb-10 text-center md:pb-16">
            <p className="rise eyebrow justify-center" style={stagger(3)}>
              {part !== null ? t.greet[part] : " "}
            </p>
            <h1 className="rise mt-4 font-display text-5xl font-medium leading-[1.02] md:text-7xl" style={stagger(4)}>
              {t.welcome}
            </h1>
            <p className="rise mt-3 text-cream/75" style={stagger(5)}>
              {t.sub}
            </p>
            <button
              type="button"
              onClick={() => go({ name: "categories" })}
              className="rise cta-glow btn btn-gold mx-auto mt-8 w-full max-w-md !py-5 text-lg"
              style={stagger(6)}
            >
              {t.open} <ArrowIcon width={20} height={20} />
            </button>
          </div>
        </section>
      )}

      {/* ═════════ 2 · KATEGORİLER ═════════ */}
      {screen.name === "categories" && (
        <>
          <TopBar title={t.menu} back={{ name: "welcome" }} />
          <div className="container-x pb-10 pt-8">
            <p className="rise eyebrow" style={stagger(0)}>
              {t.categories}
            </p>
            <h1 className="rise mt-3 font-display text-4xl font-medium md:text-5xl" style={stagger(1)}>
              {t.pick}
            </h1>
            <ul className="mt-8 grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-3">
              {MENU.map((c, i) => (
                <li key={c.slug} className="rise" style={stagger(i + 2)}>
                  <button
                    type="button"
                    onClick={() => go({ name: "category", slug: c.slug })}
                    className="group relative block aspect-[4/5] w-full overflow-hidden rounded-3xl bg-cocoa text-left text-cream shadow-[0_24px_50px_-28px_rgba(28,18,14,0.6)] md:aspect-[4/3] md:rounded-[2rem]"
                  >
                    <Image
                      src={c.cover}
                      alt=""
                      fill
                      priority={i < 2}
                      sizes="(min-width:1024px) 33vw, 50vw"
                      className="object-cover transition duration-700 group-hover:scale-105 group-active:scale-105"
                      style={{ viewTransitionName: `cat-${c.slug}` }}
                    />
                    <span className="absolute inset-0 bg-gradient-to-t from-cocoa/90 via-cocoa/20 to-transparent" />
                    <span className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-cream/95 text-ink shadow transition group-hover:bg-gold md:right-5 md:top-5 md:size-11">
                      <ArrowIcon width={16} height={16} />
                    </span>
                    <span className="absolute inset-x-3.5 bottom-3.5 md:inset-x-5 md:bottom-5">
                      <span className="block font-display text-[1.6rem] leading-[1.05] md:text-4xl" style={{ viewTransitionName: `cat-title-${c.slug}` }}>
                        {c.name[lang]}
                      </span>
                      <span className="mt-1.5 block text-xs font-semibold text-cream/75 md:text-sm">
                        {c.items.length} {t.items}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
            <MenuFooter lang={lang} />
          </div>
        </>
      )}

      {/* ═════════ 3 · KATEGORİ: ÜRÜNLER ═════════ */}
      {screen.name === "category" && category && (
        <>
          <TopBar title={category.name[lang]} back={{ name: "categories" }} />
          <section className="relative isolate h-[34svh] min-h-60 overflow-hidden bg-cocoa text-cream md:h-[42svh]">
            <Image src={category.cover} alt="" fill priority sizes="100vw" className="-z-10 object-cover" style={{ viewTransitionName: `cat-${category.slug}` }} />
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-cocoa/90 via-cocoa/25 to-transparent" />
            <div className="container-x flex h-full flex-col justify-end pb-6">
              <h1 className="font-display text-5xl leading-none md:text-7xl" style={{ viewTransitionName: `cat-title-${category.slug}` }}>
                {category.name[lang]}
              </h1>
              <p className="mt-2 text-sm font-semibold text-cream/75">
                {category.items.length} {t.items}
              </p>
            </div>
          </section>

          <CategorySwitcher current={category.slug} lang={lang} onPick={(slug) => go({ name: "category", slug })} />

          <div className="container-x pb-10 pt-6">
            <ul className="grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-4">
              {category.items.map((item, i) => (
                <li key={item.key} className="rise" style={stagger(i)}>
                  <ProductCard item={item} lang={lang} badge={t.bestBadge} onOpen={() => open(item, category.items)} priority={i < 2} />
                </li>
              ))}
            </ul>

            {category.slug === "dondurma" && FLAVORS.length > 0 && (
              <div className="rise mt-10 rounded-[2rem] bg-cream-2 p-6" style={stagger(category.items.length + 1)}>
                <h2 className="font-display text-2xl font-semibold">
                  {t.flavors} <span className="font-sans text-sm font-normal text-muted">({FLAVORS.length})</span>
                </h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {FLAVORS.map((f) => (
                    <li key={f.name} className="flex items-center gap-2 rounded-full bg-cream px-3.5 py-2 text-sm font-medium">
                      <span className="size-3.5 rounded-full ring-1 ring-ink/15" style={{ background: f.color }} />
                      {f.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <NextCategory current={category.slug} lang={lang} onPick={(slug) => go({ name: "category", slug })} />
          </div>
        </>
      )}

      {/* ═════════ ARAMA ═════════ */}
      {searchOpen && (
        <div className="fixed inset-0 z-40 overflow-y-auto bg-cream" role="dialog" aria-label={t.search}>
          <div className="container-x sticky top-0 flex h-16 items-center gap-2 border-b border-ink/10 bg-cream">
            <SearchIcon className="shrink-0 text-muted" />
            <input
              autoFocus
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.search}
              className="h-full flex-1 bg-transparent text-lg outline-none placeholder:text-muted"
            />
            <button
              type="button"
              aria-label={t.close}
              onClick={() => {
                setSearchOpen(false);
                setQuery("");
              }}
              className="grid size-10 place-items-center rounded-full bg-cream-2"
            >
              <CloseIcon />
            </button>
          </div>
          <div className="container-x py-5">
            {q && results.length === 0 && <p className="py-16 text-center font-display text-2xl text-muted">{t.empty}</p>}
            <ul className="divide-y divide-ink/10">
              {results.map((item) => (
                <li key={item.key}>
                  <button type="button" onClick={() => open(item, results)} className="flex w-full items-center gap-4 py-3 text-left">
                    <span className="relative size-16 shrink-0 overflow-hidden rounded-2xl bg-cream-2">
                      <Image src={item.image} alt="" fill sizes="64px" className="object-cover" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-display text-lg font-semibold">{item.name[lang]}</span>
                      <span className="block text-sm text-muted">{MENU.find((c) => c.slug === item.category)?.name[lang]}</span>
                    </span>
                    <span className="font-display text-lg font-semibold tabular-nums text-brand">{formatPrice(item.price, lang)}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* ═════════ ÜRÜN DETAYI: telefonda alttan açılan kart ═════════ */}
      <dialog
        ref={dialogRef}
        onClose={() => setSelected(null)}
        onClick={(e) => e.target === e.currentTarget && setSelected(null)}
        className="menu-sheet bg-cream p-0 text-ink shadow-2xl backdrop:bg-cocoa/70"
        style={drag ? { transform: `translateY(${drag}px)`, transition: "none" } : undefined}
      >
        {sel && (
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
                else if (Math.abs(dx) > 50 && drag < 20) step(dx < 0 ? 1 : -1);
                setDrag(0);
                touch.current = null;
              }}
            >
              <Image
                key={sel.key}
                src={sel.image}
                alt={sel.name[lang]}
                fill
                sizes="(min-width:768px) 480px, 100vw"
                placeholder={sel.blur ? "blur" : "empty"}
                blurDataURL={sel.blur || undefined}
                className="animate-[fade-in_0.35s_ease] object-cover"
              />
              <span aria-hidden className="absolute left-1/2 top-2.5 h-1.5 w-12 -translate-x-1/2 rounded-full bg-white/80 shadow md:hidden" />
              {selected && selected.list.length > 1 && (
                <>
                  <button type="button" onClick={() => step(-1)} aria-label={t.prev} className="absolute left-3 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-cream/90 shadow-lg">
                    <ArrowIcon width={16} height={16} className="rotate-180" />
                  </button>
                  <button type="button" onClick={() => step(1)} aria-label={t.next} className="absolute right-3 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-cream/90 shadow-lg">
                    <ArrowIcon width={16} height={16} />
                  </button>
                </>
              )}
              <button type="button" onClick={() => setSelected(null)} aria-label={t.close} className="absolute right-3 top-3 grid size-10 place-items-center rounded-full bg-cream/90 shadow-lg">
                <CloseIcon />
              </button>
            </div>
            <div className="flex flex-col p-6 md:p-9">
              <h3 className="font-display text-3xl font-medium leading-tight md:text-4xl">{sel.name[lang]}</h3>
              {sel.desc[lang] && <p className="mt-2 leading-relaxed text-muted">{sel.desc[lang]}</p>}

              {sel.variants.length ? (
                <div className="mt-5">
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted">{t.options}</p>
                  <ul className="mt-2 divide-y divide-ink/10 rounded-2xl border border-ink/10">
                    {sel.variants.map((v) => (
                      <li key={v.key} className="flex items-center justify-between px-4 py-3">
                        <span className="font-semibold">{v.label[lang]}</span>
                        <span className="font-display text-xl tabular-nums text-brand">{formatPrice(v.price, lang)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="mt-4">
                  <PriceLine item={sel} lang={lang} big />
                </p>
              )}

              <div className="mt-5 space-y-4 rounded-2xl bg-cream-2 p-5 text-sm">
                {hasDetails(sel) ? (
                  <>
                    {sel.ingredients[lang] && (
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted">{t.ingredients}</p>
                        <p className="mt-1 leading-relaxed">{sel.ingredients[lang]}</p>
                      </div>
                    )}
                    {sel.calories !== null && (
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted">{t.calories}</p>
                        <p className="mt-1 font-semibold tabular-nums">
                          {sel.calories} {t.perPortion}
                        </p>
                      </div>
                    )}
                    {sel.allergens.length > 0 && (
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted">{t.allergens}</p>
                        <ul className="mt-2 flex flex-wrap gap-1.5">
                          {sel.allergens.map((a) => (
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
                href={whatsappLink(BRANCHES[0], `Merhaba, ${sel.name.tr} hakkında bilgi almak istiyorum.`)}
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

/** Büyük fotoğraflı ürün kartı */
function ProductCard({ item, lang, badge, onOpen, priority }: { item: MenuItem; lang: Lang; badge: string; onOpen: () => void; priority: boolean }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group flex h-full w-full flex-col overflow-hidden rounded-3xl bg-cream text-left shadow-[0_18px_40px_-28px_rgba(28,18,14,0.55)] ring-1 ring-ink/5"
    >
      <span className="relative block aspect-square overflow-hidden bg-cream-2">
        <Image
          src={item.image}
          alt={item.name[lang]}
          fill
          priority={priority}
          sizes="(min-width:1024px) 25vw, 50vw"
          placeholder={item.blur ? "blur" : "empty"}
          blurDataURL={item.blur || undefined}
          className="object-cover transition duration-700 group-hover:scale-105 group-active:scale-[1.03]"
        />
        {item.featured && (
          <span className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-cream/95 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-brand shadow md:text-[11px]">
            <StarIcon width={9} height={9} /> {badge}
          </span>
        )}
        {!item.variants.length && (
          <span className="absolute bottom-2 right-2 rounded-full bg-cream px-2.5 py-1 font-display text-sm font-semibold tabular-nums text-brand shadow-lg md:text-lg">
            {formatPrice(item.price, lang)}
          </span>
        )}
      </span>
      <span className="flex flex-1 flex-col p-3 md:p-4">
        <span className="block font-display text-[1.05rem] font-semibold leading-tight md:text-xl">{item.name[lang]}</span>
        {item.desc[lang] && <span className="mt-1 line-clamp-2 block text-xs leading-snug text-muted md:text-sm">{item.desc[lang]}</span>}
        {item.variants.length > 0 && (
          <span className="mt-auto space-y-0.5 pt-2">
            {item.variants.map((v) => (
              <span key={v.key} className="flex items-baseline justify-between gap-2 text-xs">
                <span className="text-muted">{v.label[lang]}</span>
                <span className="font-display text-sm font-semibold tabular-nums text-brand md:text-base">{formatPrice(v.price, lang)}</span>
              </span>
            ))}
          </span>
        )}
      </span>
    </button>
  );
}

/** Kategori ekranında diğer kategorilere hızlı geçiş */
function CategorySwitcher({ current, lang, onPick }: { current: string; lang: Lang; onPick: (slug: string) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const nav = ref.current;
    const chip = nav?.querySelector<HTMLElement>(`[data-slug="${current}"]`);
    if (nav && chip) nav.scrollLeft = chip.offsetLeft - nav.clientWidth / 2 + chip.clientWidth / 2;
  }, [current]);
  return (
    <div ref={ref} className="no-scrollbar container-x relative flex gap-2 overflow-x-auto py-4">
      {MENU.map((c: MenuCategory) => (
        <button
          key={c.slug}
          type="button"
          data-slug={c.slug}
          onClick={() => c.slug !== current && onPick(c.slug)}
          aria-current={c.slug === current ? "page" : undefined}
          className={`flex shrink-0 items-center gap-2 rounded-full py-1.5 pl-1.5 pr-4 text-sm font-bold transition ${
            c.slug === current ? "bg-brand text-cream" : "bg-cream-2 text-ink"
          }`}
        >
          <span className="relative size-8 overflow-hidden rounded-full">
            <Image src={c.cover} alt="" fill sizes="32px" className="object-cover" />
          </span>
          {c.name[lang]}
        </button>
      ))}
    </div>
  );
}

/** Kategori sonunda: sıradaki kategoriye büyük geçiş kartı */
function NextCategory({ current, lang, onPick }: { current: string; lang: Lang; onPick: (slug: string) => void }) {
  const i = MENU.findIndex((c) => c.slug === current);
  const next = MENU[(i + 1) % MENU.length];
  if (!next || next.slug === current) return null;
  return (
    <button
      type="button"
      onClick={() => onPick(next.slug)}
      className="group relative mt-12 block aspect-[21/9] w-full overflow-hidden rounded-[2rem] bg-cocoa text-left text-cream"
    >
      <Image src={next.cover} alt="" fill sizes="100vw" className="object-cover opacity-70 transition duration-700 group-hover:scale-105" style={{ viewTransitionName: `cat-${next.slug}` }} />
      <span className="absolute inset-0 bg-gradient-to-r from-cocoa/90 to-transparent" />
      <span className="absolute inset-y-0 left-6 flex flex-col justify-center">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold-light">{lang === "tr" ? "Sıradaki" : "Next"}</span>
        <span className="mt-1 flex items-center gap-3 font-display text-3xl md:text-4xl" style={{ viewTransitionName: `cat-title-${next.slug}` }}>
          {next.name[lang]} <ArrowIcon width={24} height={24} />
        </span>
      </span>
    </button>
  );
}

/** Menü sonu: şubeler, saatler, Instagram */
function MenuFooter({ lang }: { lang: Lang }) {
  const t = T[lang];
  return (
    <footer className="mt-14 rounded-[2rem] bg-cocoa p-6 text-cream md:p-10">
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
        <a href={SITE.url} className="flex items-center gap-2 rounded-full px-4 py-2.5 ring-1 ring-white/20">
          {t.site} <ArrowIcon width={16} height={16} />
        </a>
      </div>
    </footer>
  );
}
