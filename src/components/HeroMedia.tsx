"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const withBase = (src: string) => (src.startsWith("/") ? `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${src}` : src);

/**
 * Giriş ekranı arka planı: önce fotoğraf görünür; video tanımlıysa ekran yönüne uygun olanı
 * (telefonda dikey, bilgisayarda yatay) yüklenip hazır olduğunda yumuşakça fotoğrafın üstüne gelir.
 * Az hareket veya veri tasarrufu tercih eden ziyaretçilere video yüklenmez.
 */
export default function HeroMedia({
  image,
  videoDesktop,
  videoMobile,
  imageClassName = "",
}: {
  image: string;
  videoDesktop?: string;
  videoMobile?: string;
  imageClassName?: string;
}) {
  const [src, setSrc] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoDesktop && !videoMobile) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (reduce || saveData) return;
    const pick = () => {
      const portrait = window.matchMedia("(max-width: 767px), (orientation: portrait)").matches;
      setSrc((portrait ? videoMobile || videoDesktop : videoDesktop || videoMobile) ?? null);
    };
    pick();
    const mq = window.matchMedia("(orientation: portrait)");
    mq.addEventListener("change", pick);
    return () => mq.removeEventListener("change", pick);
  }, [videoDesktop, videoMobile]);

  useEffect(() => {
    setReady(false);
    ref.current?.load();
  }, [src]);

  return (
    <div aria-hidden className="absolute inset-0 -z-20">
      <Image src={image} alt="" fill priority sizes="(min-width:1024px) 100vw, 60vw" className={`object-cover ${imageClassName}`} />
      {src && (
        <video
          ref={ref}
          src={withBase(src)}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onCanPlay={() => setReady(true)}
          className={`absolute inset-0 size-full object-cover transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`}
        />
      )}
    </div>
  );
}
