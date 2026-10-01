"use client";

import { useState } from "react";
import { mapsEmbed, type Branch } from "@/data/site";
import { PinIcon } from "./Icons";

/** Google Haritalar'ı yalnızca kullanıcı isteyince yükler (sayfa hızını korur). */
export default function BranchMap({ branch }: { branch: Branch }) {
  const [show, setShow] = useState(false);
  if (show) {
    return (
      <iframe
        title={`${branch.name} şubesi harita`}
        src={mapsEmbed(branch)}
        className="h-full w-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    );
  }
  return (
    <button
      type="button"
      onClick={() => setShow(true)}
      className="group grid h-full w-full place-items-center bg-[radial-gradient(circle_at_center,_#3a2620_0%,_#1c120e_70%)] text-cream"
    >
      <span className="flex flex-col items-center gap-3">
        <span className="grid size-14 place-items-center rounded-full bg-brand transition group-hover:scale-110">
          <PinIcon />
        </span>
        <span className="text-sm font-bold">Haritayı göster</span>
      </span>
    </button>
  );
}
