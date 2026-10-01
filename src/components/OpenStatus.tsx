"use client";

import { useEffect, useState } from "react";

function minutes(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

/** Şubenin şu an açık olup olmadığını İstanbul saatine göre gösterir. */
export default function OpenStatus({ open, close, dark = false }: { open: string; close: string; dark?: boolean }) {
  const [isOpen, setIsOpen] = useState<boolean | null>(null);

  useEffect(() => {
    const check = () => {
      const parts = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Europe/Istanbul",
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23",
      }).formatToParts(new Date());
      const now = Number(parts.find((p) => p.type === "hour")?.value) * 60 + Number(parts.find((p) => p.type === "minute")?.value);
      const o = minutes(open);
      let c = minutes(close);
      if (c <= o) c += 24 * 60;
      setIsOpen((now >= o && now < c) || (now + 24 * 60 >= o && now + 24 * 60 < c));
    };
    check();
    const id = setInterval(check, 60_000);
    return () => clearInterval(id);
  }, [open, close]);

  if (isOpen === null) return null;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ${
        isOpen
          ? dark ? "bg-emerald-400/15 text-emerald-300" : "bg-emerald-600/10 text-emerald-700"
          : dark ? "bg-white/10 text-white/70" : "bg-ink/5 text-muted"
      }`}
    >
      <span className={`size-1.5 rounded-full ${isOpen ? "bg-emerald-500 animate-pulse" : "bg-current"}`} />
      {isOpen ? "Şu an açık" : "Şu an kapalı"}
    </span>
  );
}
