"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "@/components/ui/icons";

/* Portfolio as a marquee that never stops. The list is rendered twice and the track is
   translated by exactly half its width, so the moment the first copy scrolls out the
   second is already in its place and the loop is seamless.

   Cards alternate between 16:9 and 1:1 at a single height, so the strip has a rhythm
   rather than reading as one long ribbon of identical tiles.

   The track pauses on hover so a card can be read and clicked, and stops entirely for
   anyone who asked for reduced motion. */

export type Work = {
  href: string;
  client: string;
  /** Two crops of the same screen: the strip alternates between them. */
  photoWide: string;
  photoSquare: string;
};

export default function WorkRow({ works }: { works: Work[] }) {
  const boxRef = useRef<HTMLDivElement>(null);
  /* The fade is the strip's own edge, so each side is drawn only while that edge sits
     inside the window. Zoomed out the whole strip fits on screen and both ends want
     softening; zoom in and the ends push out to the window edge, where there is nothing
     left to fade. The two sides are tracked separately: one end can reach the edge of the
     screen while the other is still inside it. */
  const [fade, setFade] = useState({ left: false, right: false });

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;

    const measure = () => {
      /* An end that has been pushed out to the window edge has nothing beyond it to fade,
         so only an end still inside the viewport gets a soft edge. A small tolerance keeps
         sub-pixel layout from flickering the mask on and off. */
      const r = box.getBoundingClientRect();
      const TOL = 2;
      const next = {
        left: r.left > TOL,
        right: r.right < window.innerWidth - TOL,
      };
      setFade((prev) =>
        prev.left === next.left && prev.right === next.right ? prev : next,
      );
    };

    measure();
    /* Zoom does not change the box's size in CSS pixels, so a ResizeObserver alone never
       fires for it and the first measurement would stick. Re-read once the first layout
       has settled, and keep a light poll so browser zoom (which emits no dedicated event)
       is picked up too. */
    const raf = requestAnimationFrame(measure);
    const poll = window.setInterval(measure, 500);
    const ro = new ResizeObserver(measure);
    ro.observe(box);
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, { passive: true });
    window.visualViewport?.addEventListener("resize", measure);
    window.visualViewport?.addEventListener("scroll", measure);
    return () => {
      cancelAnimationFrame(raf);
      window.clearInterval(poll);
      ro.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure);
      window.visualViewport?.removeEventListener("resize", measure);
      window.visualViewport?.removeEventListener("scroll", measure);
    };
  }, []);

  /* Built as one gradient so the two stops stay in a single mask; a side that is off
     screen simply starts opaque instead of transparent. */
  const maskImage = `linear-gradient(to right, ${
    fade.left ? "transparent 0, black 4rem" : "black 0"
  }, ${fade.right ? "black calc(100% - 4rem), transparent 100%" : "black 100%"})`;

  return (
    /* This wrapper is the one that clips, so the strip can be wider than the window
       without the page gaining a horizontal scrollbar. Centring is done with flex because
       auto margins stop working once the child overflows its parent. */
    <div className="flex justify-center overflow-hidden">
      {/* The fade lives on this box because the track inside is several screens wide, so a
          mask on the track would put its soft edge far off-screen where nobody would see it. */}
      <div
        ref={boxRef}
        className="w-full max-w-[2000px] overflow-hidden"
        style={fade.left || fade.right ? { maskImage, WebkitMaskImage: maskImage } : undefined}
      >
        {/* Two sibling groups rather than one long row of duplicated cards: the gap between
            the groups equals the gap inside them, so half the track is exactly one group
            plus one gap and the -50% travel is seamless. */}
        <div className="group flex w-max animate-marquee gap-4 hover:[animation-play-state:paused] motion-reduce:animate-none">
          <Pass works={works} />
          {/* The second pass is decorative: it repeats work the reader has already met. */}
          <Pass works={works} ariaHidden />
        </div>
      </div>
    </div>
  );
}

function Pass({ works, ariaHidden = false }: { works: Work[]; ariaHidden?: boolean }) {
  return (
    <div className="flex shrink-0 gap-4" aria-hidden={ariaHidden || undefined}>
      {works.map((work, i) => (
        /* Ratio keyed to the work's own position, so both passes render identically. */
        <Card key={work.client} work={work} wide={i % 2 === 0} ariaHidden={ariaHidden} />
      ))}
    </div>
  );
}

function Card({
  work,
  wide,
  ariaHidden = false,
}: {
  work: Work;
  wide: boolean;
  ariaHidden?: boolean;
}) {
  /* Live client sites open in a new tab; the placeholder anchors stay in this one. */
  const external = work.href.startsWith("http");
  return (
    <Link
      href={work.href}
      tabIndex={ariaHidden ? -1 : undefined}
      {...(external && { target: "_blank", rel: "noreferrer" })}
      /* One height for the whole strip; only the width changes between the two ratios. */
      className={`group/card relative block h-56 shrink-0 overflow-hidden rounded-2xl md:h-64 ${
        wide ? "w-[24.9rem] md:w-[28.4rem]" : "w-56 md:w-64"
      }`}
    >
      <Image
        src={wide ? work.photoWide : work.photoSquare}
        alt=""
        fill
        sizes={wide ? "(max-width: 768px) 400px, 456px" : "(max-width: 768px) 224px, 256px"}
        className="object-cover transition-transform duration-700 ease-out group-hover/card:scale-[1.04]"
        quality={100}
      />

      <span
        aria-hidden
        className="absolute inset-0 bg-linear-to-t from-black/85 via-black/25 to-black/10 transition-colors duration-200 group-hover/card:via-black/15 group-hover/card:to-transparent"
      />

      <ArrowUpRight className="absolute right-4 top-4 size-5 translate-y-1 text-white opacity-0 transition-[opacity,translate] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:translate-y-0 group-hover/card:opacity-100 motion-reduce:transition-none" />

      <span className="absolute inset-x-4 bottom-4 block text-[16px] leading-[1.6] font-medium text-white">
        {work.client}
      </span>
    </Link>
  );
}
