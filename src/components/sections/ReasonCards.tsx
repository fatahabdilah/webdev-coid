"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

/* Four reasons in a row. Height, gap and grow ratio match HeroShowcase so the two
   rows on the page behave identically; the copy sits under the photo here, and only
   the description is held back until that card is the active one. */

export type Reason = {
  href: string;
  photo: string;
  title: string;
  desc: string;
};

export default function ReasonCards({ reasons }: { reasons: Reason[] }) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:flex lg:gap-4" onMouseLeave={() => setActive(null)}>
      {reasons.map(({ href, photo, title, desc }, i) => {
        const isActive = active === i;
        return (
          <Link
            key={title}
            href={href}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onBlur={() => setActive(null)}
            /* basis-0 so the whole row is shared out by grow, letting the active card widen */
            className={`group block transition-[flex-grow] duration-500 ease-out lg:min-w-0 lg:basis-0 ${
              isActive ? "lg:grow-[2.2]" : "lg:grow"
            }`}
          >
            {/* Fixed height on lg, so the row keeps one height while the active card widens */}
            <span className="relative block aspect-square overflow-hidden rounded-2xl bg-offwhite lg:aspect-auto lg:h-80">
              <Image
                src={photo}
                alt=""
                fill
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 40vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
            </span>

            <span className="mt-4 block text-[16px] leading-[1.6] text-ink">{title}</span>
            {/* Held back until the card is active. Always shown below lg, where there is no hover. */}
            <span
              className={`mt-1 block text-[14px] leading-[1.55] text-body transition-[opacity,translate] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] lg:truncate ${
                isActive ? "lg:translate-y-0 lg:opacity-100" : "lg:translate-y-1 lg:opacity-0"
              }`}
            >
              {desc}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
