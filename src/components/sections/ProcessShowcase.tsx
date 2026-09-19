"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { ChevronRight } from "@/components/ui/icons";

/* Photos: Pexels (free to use, no attribution required), cropped/compressed to /public/images/showcase.
   site-klinik.webp    https://www.pexels.com/photo/3845810/
   site-kopi.webp      https://www.pexels.com/photo/5619514/
   site-yoga.webp      https://www.pexels.com/photo/39190415/
   avatar-klinik.webp  https://www.pexels.com/photo/1181690/
   avatar-kopi.webp    https://www.pexels.com/photo/2379004/
   avatar-yoga.webp    https://www.pexels.com/photo/3778603/ */

/* A stack of finished websites, one per client brief. The box below is the client's WhatsApp
   message, typed live, because that is literally how a project starts here; the card above is
   the website we built from it. Cards are static so the only motion at any moment is either
   the typing or the card hand-off. State lives in Process.tsx. */

export type Site = {
  /** The client's WhatsApp message that started the project; typed into the box. */
  prompt: string;
  /** Who sent it: their photo and name, shown beside the message. */
  avatar: string;
  sender: string;
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
  /** True from the moment the message is complete until the send button is pressed. */
  /** True for the brief instant the send button is pressed, before the card changes. */
  sending: boolean;
};

/* Cards behind peek out by a full header so the stack reads as several sites. */
const DEPTH = [
  { y: "0%", s: 1, o: 1, z: 30 },
  { y: "-10%", s: 0.95, o: 1, z: 20 },
  { y: "-19%", s: 0.9, o: 0.75, z: 10 },
];

const SURFACE = "rounded-xl border border-line bg-white shadow-lift md:rounded-2xl";

export default function ProcessShowcase({ sites, active, handoff, typed, sending }: Props) {
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

      {/* The client's message, typed live, then sent. Sits on the card's bottom edge and hides
          the next card as it rises. Inset more than the card above (5%) so it never outgrows it.
          On send the whole box nudges up and settles back, like a message leaving the thread. */}
      <div
        className={`border-gradient-brand relative z-40 mx-[9%] -mt-4 flex items-center gap-3 rounded-xl bg-white px-4 py-3.5 transition-[translate] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:-mt-5 md:gap-4 md:rounded-2xl md:px-5 md:py-4 ${
          sending ? "-translate-y-2.5" : "translate-y-0"
        }`}
      >
        {/* The client who sent it */}
        <span className="relative size-9 shrink-0 overflow-hidden rounded-full md:size-10">
          <Image
            src={site.avatar}
            alt=""
            fill
            sizes="40px"
            className={`object-cover transition-opacity duration-300 ${handingOff ? "opacity-0" : "opacity-100"}`}
            quality={100}
          />
        </span>

        <div className={`min-w-0 flex-1 transition-opacity duration-300 ${handingOff ? "opacity-0" : "opacity-100"}`}>
          <p className="text-[12px] leading-[1.45] font-medium text-muted">{site.sender}</p>
          {/* Fixed at two lines, so the box keeps one height whatever is being typed */}
          <p className="mt-0.5 line-clamp-2 h-[2.8em] text-[14px] leading-[1.5] text-ink md:mt-1 md:text-[16px]">
            {text}
            <span
              className={`ml-0.5 inline-block h-[1em] w-0.5 translate-y-0.5 bg-primary ${done ? "animate-caret" : ""}`}
            />
          </p>
        </div>

        {/* Send button: blue with a white chevron. On press it darkens and shrinks,
            the way a real button responds under a finger. */}
        <span
          className={`flex size-9 shrink-0 items-center justify-center rounded-lg text-white transition-[background-color,scale] duration-150 ease-out md:size-10 md:rounded-xl ${
            sending ? "scale-90 bg-primary-dark" : "scale-100 bg-primary"
          }`}
        >
          <ChevronRight className="size-5 md:size-6" />
        </span>
      </div>
    </div>
  );
}

/* One finished website: full-bleed photo, its own colour wash, nav, headline and call to action. */
function SiteCard({ site }: { site: Site }) {
  return (
    <div className={`relative h-full w-full overflow-hidden ${SURFACE}`}>
      <Image src={site.photo} alt="" fill sizes="(max-width: 1024px) 90vw, 560px" className="object-cover"
        quality={100}
      />
      <div className={`absolute inset-0 bg-linear-to-r ${site.wash}`} />
      <div className="absolute inset-0 bg-linear-to-t from-black/35 via-transparent to-transparent" />

      {/* Text here keeps raw white alphas rather than the on-dark-* roles: the ground is a
          photograph plus a per-site wash, not a flat brand colour, so it is held higher than
          the roles would put it to stay legible over the lighter patches. */}
      <div className="relative flex h-full flex-col p-4 md:p-6">
        {/* site nav */}
        <div className="flex items-center justify-between gap-2">
          <span className="shrink-0 text-[12px] font-medium leading-[1.5] text-white md:text-[14px]">{site.name}</span>
          {/* Dropped below md, where the name and the pill alone fill the row */}
          <span className="hidden min-w-0 gap-3 overflow-hidden text-[12px] leading-[1.45] whitespace-nowrap text-white/85 md:flex">
            {site.nav.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </span>
          <span className="shrink-0 rounded-full bg-white/15 px-3 py-1 text-[12px] font-medium leading-[1.45] text-white backdrop-blur-sm">
            {site.kind}
          </span>
        </div>

        {/* hero copy */}
        <div className="mt-auto max-w-[62%]">
          <p className="text-[16px] font-medium leading-[1.25] tracking-[-0.03em] text-balance text-white md:text-[26px]">
            {site.headline}
          </p>
          <p className="mt-1.5 hidden text-[12px] leading-[1.45] text-white/80 md:block">{site.sub}</p>
          <span
            className={`mt-2 inline-block rounded-full px-3 py-1 text-[12px] leading-[1.45] font-medium md:mt-3 ${site.button}`}
          >
            {site.cta}
          </span>
        </div>
      </div>
    </div>
  );
}
