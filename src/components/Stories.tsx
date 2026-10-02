"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { STORIES, type StoryGroup } from "@/data/site";
import { ArrowIcon, CloseIcon } from "./Icons";

type Pos = { group: number; slide: number };

/** Instagram hikâyesi gibi tam ekran afiş gösterici */
export function StoryViewer({ groups, start, onClose }: { groups: StoryGroup[]; start: Pos; onClose: () => void }) {
  const [pos, setPos] = useState(start);
  const [paused, setPaused] = useState(false);
  const press = useRef<{ x: number; y: number; t: number } | null>(null);
  const [dragY, setDragY] = useState(0);
  const group = groups[pos.group];
  const slide = group.slides[pos.slide];

  const next = useCallback(() => {
    if (pos.slide < groups[pos.group].slides.length - 1) setPos({ ...pos, slide: pos.slide + 1 });
    else if (pos.group < groups.length - 1) setPos({ group: pos.group + 1, slide: 0 });
    else onClose();
  }, [pos, groups, onClose]);

  const prev = useCallback(() => {
    if (pos.slide > 0) setPos({ ...pos, slide: pos.slide - 1 });
    else if (pos.group > 0) setPos({ group: pos.group - 1, slide: 0 });
  }, [pos]);

  const jumpGroup = (d: number) => {
    const g = pos.group + d;
    if (g < 0) return;
    if (g >= groups.length) return onClose();
    setPos({ group: g, slide: 0 });
  };

  useEffect(() => {
    const html = document.documentElement;
    const before = html.style.overflow;
    html.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      html.style.overflow = before;
      window.removeEventListener("keydown", onKey);
    };
  }, [next, prev, onClose]);

  const nextSlide = group.slides[pos.slide + 1] ?? groups[pos.group + 1]?.slides[0];

  return createPortal(
    <div role="dialog" aria-modal="true" aria-label={group.title} className="story-in fixed inset-0 z-[90] grid place-items-center bg-black">
      <div
        className="relative h-full w-full touch-none select-none overflow-hidden md:h-[min(92svh,900px)] md:w-auto md:aspect-[9/16] md:rounded-3xl"
        style={dragY ? { transform: `translateY(${dragY}px) scale(${1 - dragY / 2000})`, opacity: 1 - dragY / 600 } : undefined}
        onPointerDown={(e) => {
          press.current = { x: e.clientX, y: e.clientY, t: Date.now() };
          setPaused(true);
        }}
        onPointerMove={(e) => {
          if (!press.current) return;
          const dy = e.clientY - press.current.y;
          if (dy > 0 && Math.abs(dy) > Math.abs(e.clientX - press.current.x)) setDragY(dy);
        }}
        onPointerUp={(e) => {
          const p = press.current;
          press.current = null;
          setPaused(false);
          if (!p) return;
          const dx = e.clientX - p.x;
          const dy = e.clientY - p.y;
          setDragY(0);
          if (dy > 110) return onClose();
          if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)) return jumpGroup(dx < 0 ? 1 : -1);
          if (Date.now() - p.t < 250 && Math.abs(dx) < 10 && Math.abs(dy) < 10) {
            const r = e.currentTarget.getBoundingClientRect();
            if (e.clientX - r.left < r.width / 3) prev();
            else next();
          }
        }}
        onPointerCancel={() => {
          press.current = null;
          setPaused(false);
          setDragY(0);
        }}
      >
        {/* Bulanık arka plan + afişin tamamı */}
        <Image src={slide.image} alt="" fill sizes="30vw" className="scale-110 object-cover opacity-50 blur-2xl" />
        <Image key={slide.image} src={slide.image} alt={group.title} fill priority sizes="(min-width:768px) 520px, 100vw" className="animate-[fade-in_0.3s_ease] object-contain" draggable={false} />
        {nextSlide && <Image src={nextSlide.image} alt="" fill sizes="(min-width:768px) 520px, 100vw" className="pointer-events-none opacity-0" />}

        <div className="absolute inset-x-0 top-0 bg-gradient-to-b from-black/60 to-transparent px-3 pb-10 pt-3">
          <div className="flex gap-1">
            {group.slides.map((_, i) => (
              <span key={i} className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/30">
                {i < pos.slide && <span className="block h-full w-full bg-white" />}
                {i === pos.slide && (
                  <span
                    key={`${pos.group}-${pos.slide}`}
                    className="story-bar block h-full bg-white"
                    style={{ animationPlayState: paused ? "paused" : "running" }}
                    onAnimationEnd={next}
                  />
                )}
              </span>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-3 text-white">
            <span className="relative size-9 overflow-hidden rounded-full ring-2 ring-white/70">
              <Image src={group.cover} alt="" fill sizes="36px" className="object-cover object-[center_60%]" />
            </span>
            <span className="flex-1 text-sm font-bold">{group.title}</span>
            <button
              type="button"
              aria-label="Kapat"
              onPointerDown={(e) => e.stopPropagation()}
              onPointerUp={(e) => e.stopPropagation()}
              onClick={onClose}
              className="grid size-10 place-items-center rounded-full bg-black/30"
            >
              <CloseIcon />
            </button>
          </div>
        </div>
      </div>

      {/* Bilgisayarda ileri / geri okları */}
      <button type="button" aria-label="Önceki" onClick={prev} className="absolute left-6 top-1/2 hidden size-12 -translate-y-1/2 place-items-center rounded-full bg-white/15 text-white hover:bg-white/25 md:grid">
        <ArrowIcon className="rotate-180" />
      </button>
      <button type="button" aria-label="Sonraki" onClick={next} className="absolute right-6 top-1/2 hidden size-12 -translate-y-1/2 place-items-center rounded-full bg-white/15 text-white hover:bg-white/25 md:grid">
        <ArrowIcon />
      </button>
    </div>,
    document.body,
  );
}

/** Yuvarlak "öne çıkanlar" sırası */
export function StoryHighlights({ dark = false, className = "" }: { dark?: boolean; className?: string }) {
  const [open, setOpen] = useState<Pos | null>(null);
  if (!STORIES.length) return null;
  return (
    <>
      <ul className={`no-scrollbar flex gap-4 overflow-x-auto ${className}`}>
        {STORIES.map((g, i) => (
          <li key={g.title + i} className="shrink-0">
            <button type="button" onClick={() => setOpen({ group: i, slide: 0 })} className="group flex w-[4.5rem] flex-col items-center gap-1.5">
              <span className="rounded-full bg-[conic-gradient(from_200deg,#e6c987,#a6192e,#e8475f,#e6c987)] p-[2.5px] transition group-active:scale-95">
                <span className={`block rounded-full p-[2.5px] ${dark ? "bg-cocoa" : "bg-cream"}`}>
                  <span className="relative block size-[3.75rem] overflow-hidden rounded-full">
                    <Image src={g.cover} alt="" fill sizes="64px" className="object-cover object-[center_60%] transition duration-500 group-hover:scale-110" />
                  </span>
                </span>
              </span>
              <span className={`line-clamp-1 text-center text-xs font-semibold ${dark ? "text-cream/85" : "text-ink/80"}`}>{g.title}</span>
            </button>
          </li>
        ))}
      </ul>
      {open && <StoryViewer groups={STORIES} start={open} onClose={() => setOpen(null)} />}
    </>
  );
}

/** Ana sayfa: yana kaydırılan afiş şeridi; dokununca hikâye görünümünde açılır */
export function PosterStrip() {
  const [open, setOpen] = useState<Pos | null>(null);
  const flat = STORIES.flatMap((g, gi) => g.slides.map((s, si) => ({ ...s, title: g.title, pos: { group: gi, slide: si } })));
  return (
    <>
      <ul className="no-scrollbar -mx-5 flex snap-x gap-4 overflow-x-auto px-5 pb-4 md:mx-0 md:px-0">
        {flat.map((s, i) => (
          <li key={s.image + i} className="w-56 shrink-0 snap-start md:w-64">
            <button
              type="button"
              onClick={() => setOpen(s.pos)}
              className="group relative block aspect-[3/4] w-full overflow-hidden rounded-3xl bg-cocoa shadow-[0_20px_40px_-25px_rgba(28,18,14,0.6)]"
            >
              <Image src={s.image} alt={s.title} fill sizes="256px" className="object-cover object-[center_45%] transition duration-700 group-hover:scale-105" />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-cocoa/80 to-transparent p-4 pt-10 text-left text-sm font-bold text-cream">{s.title}</span>
            </button>
          </li>
        ))}
      </ul>
      {open && <StoryViewer groups={STORIES} start={open} onClose={() => setOpen(null)} />}
    </>
  );
}
