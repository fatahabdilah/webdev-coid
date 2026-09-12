"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { PenLine, ShieldCheck } from "@/components/ui/icons";

/* The two secondary cards. Exactly one preview is up at a time: the first card's
   preview rests up by default, and hovering the other card hands it over.

   The data lives here rather than in the parent because icons are components,
   and components cannot cross the server/client boundary as props. */

const extras = [
  {
    href: "#konsultasi",
    icon: PenLine,
    title: "Sudah punya website?",
    desc: "Kami bantu perbarui tampilan atau perbaiki yang bermasalah.",
    preview: "/images/types/preview-redesign.webp",
  },
  {
    href: "#konsultasi",
    icon: ShieldCheck,
    title: "Perlu dirawat rutin?",
    desc: "Pembaruan konten, backup, dan pemantauan tiap bulan.",
    preview: "/images/types/preview-maintenance.webp",
  },
];

export default function ExtraCards() {
  /* Which card currently shows its preview. The first card is the resting state:
     hovering another hands the preview over, leaving hands it straight back. */
  const [shown, setShown] = useState(0);

  return (
    <div className="mt-6 grid gap-4 md:grid-cols-2">
      {extras.map(({ href, icon: Icon, title, desc, preview }, i) => (
        <Link
          key={title}
          href={href}
          onMouseEnter={() => setShown(i)}
          onMouseLeave={() => setShown(0)}
          onFocus={() => setShown(i)}
          onBlur={() => setShown(0)}
          className="group relative flex min-h-37.5 flex-col justify-between rounded-2xl bg-offwhite p-6 transition-colors duration-200 hover:bg-primary/5"
        >
          {/* Clipping frame: the screen never leaves the card, it just rises inside it */}
          <span aria-hidden className="pointer-events-none absolute inset-0 hidden overflow-hidden rounded-2xl sm:block">
            {/* Parked below the card, sliding up when this card is the one shown */}
            <span
              className={`absolute -right-6 top-full block w-60 rotate-[-8deg] transition-[translate] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                shown === i ? "-translate-y-[calc(100%-0.5rem)]" : "translate-y-6"
              }`}
            >
              <span className="block overflow-hidden rounded-lg shadow-lift">
                <Image src={preview} alt="" width={520} height={325} className="block h-auto w-full object-cover" />
              </span>
            </span>
          </span>

          <span className="relative flex items-start">
            <Icon className="size-6 text-ink" />
          </span>
          {/* The 62% clearance is for the preview screen, which only exists from sm up;
              below that the text has the card to itself. */}
          <span className="relative mt-6 block sm:max-w-[62%]">
            <span className="block text-[18px] leading-[1.5] font-medium text-ink">{title}</span>
            <span className="mt-1 block text-[14px] leading-[1.55] text-body">{desc}</span>
          </span>
        </Link>
      ))}
    </div>
  );
}
