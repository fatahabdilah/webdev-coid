"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { Whatsapp } from "@/components/ui/icons";

/* Photos: Pexels (free to use, no attribution required), cropped/compressed to /public/images/showcase.
   site-klinik.webp  https://www.pexels.com/photo/3845810/
   site-kopi.webp    https://www.pexels.com/photo/5619514/
   site-yoga.webp    https://www.pexels.com/photo/39190415/ */

/* A stack of finished websites, one per client brief. The box below is the client's WhatsApp
   message, typed live, because that is literally how a project starts here; the card above is
   the website we built from it. Cards are static so the only motion at any moment is either
   the typing or the card hand-off. State lives in Process.tsx. */

export type Site = {
  /** The client's WhatsApp message that started the project; typed into the box. */
  prompt: string;
  /** Type of website, shown as a small pill on the card. */
  kind: string;
  name: string;
  nav: string[];
  headline: string;
  sub: string;
  cta: string;
  photo: string;
  /** Per-site palette so each card reads as its own brand. */
  wash: string;
  button: string;
};

export type Handoff = { from: number; target: number; phase: "recede" | "park" };

type Props = {
  sites: Site[];
  active: number;
  handoff: Handoff | null;
  /** Number of characters of the active prompt that are visible. */
  typed: number;
};

/* Cards behind peek out by a full header so the stack reads as several sites. */
const DEPTH = [
  { y: "0%", s: 1, o: 1, z: 30 },
  { y: "-10%", s: 0.95, o: 1, z: 20 },
  { y: "-19%", s: 0.9, o: 0.75, z: 10 },
];

const SURFACE = "rounded-xl border border-line bg-white shadow-[0_18px_40px_-22px_rgba(0,52,102,0.3)] md:rounded-2xl";

export default function ProcessShowcase({ sites, active, handoff, typed }: Props) {
  const n = sites.length;
  const site = sites[active];
  const text = site.prompt.slice(0, typed);
  const done = typed >= site.prompt.length;
  const handingOff = handoff !== null;
  /* Most recent card sits just behind the front; the oldest is the one that re-enters from below. */
  const depthOf = (i: number, front: number) => (front - i + n) % n;
  const place = (d: (typeof DEPTH)[number]): CSSProperties => ({
    transform: `translateY(${d.y}) scale(${d.s})`,
    opacity: d.o,
    zIndex: d.z,
  });

  return (
    <div aria-hidden className="relative w-full select-none overflow-hidden">
      {/* Front-card slot; top padding leaves room for the two cards peeking out behind it */}
      <div className="relative mx-[5%] pt-[11%]">
        <div className="relative aspect-video">
          {sites.map((s, i) => {
            const depth = depthOf(i, active);
            const d = DEPTH[Math.min(depth, DEPTH.length - 1)];
            const incoming = handoff?.target === i;
            const parked = incoming && handoff.phase === "park";
            let style: CSSProperties = place(d);
            if (incoming && handoff.phase === "recede") {
              // Stay in the old slot and fade out while the others rearrange
              style = { ...place(DEPTH[Math.min(depthOf(i, handoff.from), DEPTH.length - 1)]), opacity: 0 };
            } else if (parked) {
              style = { transform: "translateY(85%) scale(0.96)", opacity: 0.7, zIndex: d.z };
            }
            return (
              <div
                key={s.name}
                style={style}
                className={`absolute inset-0 origin-top ${
                  parked
                    ? "transition-none"
                    : "transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                }`}
              >
                <SiteCard site={s} />
              </div>
            );
          })}
        </div>
      </div>

      {/* The client's WhatsApp message, typed live. Sits on the card's bottom edge and hides the next card as it rises. */}
      <div className={`relative z-40 mx-[2%] -mt-2 flex items-start gap-3 px-4 py-3.5 md:gap-4 md:px-5 md:py-4 ${SURFACE}`}>
        <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-success/10 text-success md:size-9">
          <Whatsapp className="size-4 md:size-5" />
        </span>
        <div className={`min-w-0 flex-1 transition-opacity duration-300 ${handingOff ? "opacity-0" : "opacity-100"}`}>
          <p className="text-[11px] font-medium text-muted md:text-[12px]">Pesan masuk · WhatsApp</p>
          <p className="mt-0.5 min-h-[2.4em] text-[14px] leading-normal text-ink md:mt-1 md:text-[16px]">
            {text}
            <span className={`ml-0.5 inline-block h-[1em] w-0.5 translate-y-0.5 bg-primary ${done ? "animate-caret" : ""}`} />
          </p>
        </div>
      </div>
    </div>
  );
}

/* One finished website: full-bleed photo, its own colour wash, nav, headline and call to action. */
function SiteCard({ site }: { site: Site }) {
  return (
    <div className={`relative h-full w-full overflow-hidden ${SURFACE}`}>
      <Image src={site.photo} alt="" fill sizes="(max-width: 1024px) 90vw, 560px" className="object-cover" />
      <div className={`absolute inset-0 bg-linear-to-r ${site.wash}`} />
      <div className="absolute inset-0 bg-linear-to-t from-black/35 via-transparent to-transparent" />

      <div className="relative flex h-full flex-col p-4 md:p-6">
        {/* site nav */}
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-semibold tracking-tight text-white md:text-[13px]">{site.name}</span>
          <span className="hidden gap-3 text-[8px] text-white/75 md:flex md:text-[10px]">
            {site.nav.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </span>
          <span className="rounded-full bg-white/15 px-2 py-0.5 text-[8px] font-medium text-white backdrop-blur-sm md:text-[10px]">
            {site.kind}
          </span>
        </div>

        {/* hero copy */}
        <div className="mt-auto max-w-[62%]">
          <p className="text-[16px] font-semibold leading-[1.1] tracking-[-0.02em] text-white [text-wrap:balance] md:text-[26px]">
            {site.headline}
          </p>
          <p className="mt-1.5 hidden text-[10px] leading-normal text-white/80 md:block md:text-[12px]">{site.sub}</p>
          <span
            className={`mt-2 inline-block rounded-full px-3 py-1 text-[9px] font-semibold md:mt-3 md:px-4 md:py-1.5 md:text-[11px] ${site.button}`}
          >
            {site.cta}
          </span>
        </div>
      </div>
    </div>
  );
}
