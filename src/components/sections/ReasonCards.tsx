"use client";

import Image from "next/image";
import { useRef, useState } from "react";

/* Four reasons in a row. Height, gap and grow ratio match HeroShowcase so the two rows on
   the page behave identically; the copy sits under the photo here, and only the
   description is held back until that card is the active one.

   These are statements, not destinations -- "Bukan template.", "Tanpa biaya
   tersembunyi." -- so they are plain cards. They used to be links, three of them to the
   same #harga, which promised a place to go that did not exist. */

export type Reason = {
  photo: string;
  title: string;
  desc: string;
};

export default function ReasonCards({ reasons }: { reasons: Reason[] }) {
  const [active, setActive] = useState<number | null>(null);
  /* Which card the phone row has landed on, for the dots. Read from scroll position
     rather than tracked on tap, since the row is dragged, not clicked. */
  const [current, setCurrent] = useState(0);
  const rowRef = useRef<HTMLDivElement>(null);

  const onScroll = () => {
    const el = rowRef.current;
    if (!el) return;
    const card = el.scrollWidth / reasons.length;
    setCurrent(Math.round(el.scrollLeft / card));
  };

  return (
    <>
      {/* Phones drag the row sideways instead of stacking it: four cards down the page is
          a lot of scrolling for four short statements, and a card cut off at the right
          edge says there is more without a control to explain.

          The negative margin lets the row start and end at the screen edge while the page
          keeps its gutter, so the first card lines up with everything above it and the
          last one can still be dragged clear of the edge. */}
      <div
      ref={rowRef}
      onScroll={onScroll}
      className="no-scrollbar mt-10 -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:flex"
      onMouseLeave={() => setActive(null)}
    >
      {reasons.map(({ photo, title, desc }, i) => {
        const isActive = active === i;
        return (
          <div
            key={title}
            onMouseEnter={() => setActive(i)}
            /* basis-0 so the whole row is shared out by grow, letting the active card widen */
            className={`group block w-4/5 shrink-0 snap-start sm:w-auto sm:shrink transition-[flex-grow] duration-500 ease-out lg:min-w-0 lg:basis-0 ${
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
                quality={100}
              />
            </span>

            <span className="mt-4 block text-[16px] leading-[1.6] text-ink">{title}</span>
            {/* Held back until the card is active. Always shown below lg, where there is no
                hover to reveal it. */}
            <span
              className={`mt-1 block text-[14px] leading-[1.55] text-body transition-[opacity,translate] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] lg:truncate ${
                isActive ? "lg:translate-y-0 lg:opacity-100" : "lg:translate-y-1 lg:opacity-0"
              }`}
            >
              {desc}
            </span>
          </div>
        );
      })}
    </div>

    {/* Dots only where the row scrolls. They report position rather than offer one: the
        row is dragged, so a dot to tap would be a second way to do what the finger
        already does. */}
    <div className="mt-6 flex justify-center gap-1.5 sm:hidden">
      {reasons.map(({ title }, i) => (
        <span
          key={title}
          className={`h-1.5 rounded-full transition-[width,background-color] duration-300 ease-out motion-reduce:transition-none ${
            i === current ? "w-5 bg-ink" : "w-1.5 bg-line"
          }`}
        />
      ))}
    </div>
    </>
  );
}
