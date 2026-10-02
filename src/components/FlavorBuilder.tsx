"use client";

import { useState } from "react";
import { CATEGORIES, FLAVOR_COLORS } from "@/data/site";

const FLAVORS = CATEGORIES[0].varieties!.list;
const MAX = 3;

/** Ziyaretçinin 3 topa kadar çeşit seçip külahını canlı olarak gördüğü küçük oyun. */
export default function FlavorBuilder() {
  const [picked, setPicked] = useState<string[]>(() =>
    ["Antep Fıstıklı", "Vişne"].filter((f) => FLAVORS.includes(f)).slice(0, MAX),
  );

  const toggle = (f: string) =>
    setPicked((p) => (p.includes(f) ? p.filter((x) => x !== f) : p.length >= MAX ? [...p.slice(1), f] : [...p, f]));

  return (
    <div className="grid items-center gap-10 rounded-[2rem] bg-white/5 p-6 ring-1 ring-white/10 md:grid-cols-[220px_1fr] md:p-10">
      <div className="mx-auto w-44 md:w-full" aria-live="polite">
        <svg viewBox="0 0 200 300" className="w-full drop-shadow-[0_20px_30px_rgba(0,0,0,0.45)]" role="img" aria-label={picked.length ? `Külahınız: ${picked.join(", ")}` : "Boş külah"}>
          <defs>
            <pattern id="waffle" width="16" height="16" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <rect width="16" height="16" fill="#d9a35b" />
              <path d="M0 0H16M0 0V16" stroke="#b07a35" strokeWidth="3" />
            </pattern>
          </defs>
          <path d="M42 150 L100 292 L158 150 Z" fill="url(#waffle)" />
          <path d="M38 146 H162 L156 162 H44 Z" fill="#c48a43" />
          {picked.map((f, i) => {
            const cy = 130 - i * 40;
            const color = FLAVOR_COLORS[f] ?? "#f6eedc";
            return (
              <g key={f} className="animate-[scoop_0.5s_cubic-bezier(0.3,1.5,0.5,1)_both]" style={{ transformOrigin: `100px ${cy}px` }}>
                <circle cx="100" cy={cy} r="46" fill={color} />
                <path d={`M54 ${cy + 10} q11.5 16 23 0 q11.5 16 23 0 q11.5 16 23 0 q11.5 16 23 0`} fill={color} />
                <ellipse cx="82" cy={cy - 18} rx="12" ry="7" fill="#fff" opacity="0.28" />
              </g>
            );
          })}
        </svg>
      </div>
      <div>
        <p className="eyebrow">Külahını oluştur</p>
        <h3 className="mt-3 font-display text-3xl md:text-4xl">
          {picked.length ? picked.join(" · ") : "3 top seçin"}
        </h3>
        <p className="mt-2 text-sm text-cream/60">En fazla {MAX} top. Seçtiklerinize dokunarak çıkarabilirsiniz.</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {FLAVORS.map((f) => {
            const on = picked.includes(f);
            return (
              <button
                key={f}
                type="button"
                aria-pressed={on}
                onClick={() => toggle(f)}
                className={`flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm transition ${
                  on ? "bg-cream font-semibold text-ink" : "text-cream/85 ring-1 ring-white/15 hover:ring-gold-light"
                }`}
              >
                <span className="size-3 rounded-full ring-1 ring-white/40" style={{ background: FLAVOR_COLORS[f] }} />
                {f}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
