"use client";

import { useRef, useState } from "react";
import { Star } from "@/components/ui/icons";

/* Three short quotes under the portfolio marquee.

   These are plain cards, not links: there is no project page to send a reader to, and an
   arrow on something that does not navigate is a promise the page cannot keep.

   TODO: placeholder testimonials, written to match the example projects. Replace with
   real client words, with their permission, before launch. */

const reviews = [
  {
    name: "Rina",
    business: "Klinik Senyum",
    quote:
      "Booking online-nya langsung dipakai pasien sejak hari pertama tayang. Jadwal dokter juga bisa kami ubah sendiri tanpa minta bantuan.",
  },
  {
    name: "Bagas",
    business: "Kopi Sudut",
    quote:
      "Pesanan langganan bulanan naik setelah websitenya jalan. Prosesnya jelas dari awal, dan kami selalu tahu progresnya sampai mana.",
  },
  {
    name: "Damar",
    business: "Ruang Asana",
    quote:
      "Halamannya ringan dibuka dari HP, dan pendaftaran kelas percobaan masuk terus. Timnya sabar menjelaskan hal teknis ke saya.",
  },
];

export default function Reviews() {
  /* Which quote the phone row has landed on, for the dots. Read from scroll position
     rather than tracked on tap, since the row is dragged, not clicked. */
  const [current, setCurrent] = useState(0);
  const rowRef = useRef<HTMLDivElement>(null);

  const onScroll = () => {
    const el = rowRef.current;
    if (!el) return;
    const card = el.scrollWidth / reviews.length;
    setCurrent(Math.round(el.scrollLeft / card));
  };

  return (
    <>
      {/* Dragged sideways on phones, like the reason cards: three quotes stacked is a lot
          of column for something read one at a time, and a card cut off at the right edge
          says there is another without a control to explain it.

          The negative margin lets the row reach the screen edge while the section keeps
          its gutter; scroll-px-4 keeps the first card off it, since snap points align to
          the container edge and would otherwise ignore the padding. */}
      <div
        ref={rowRef}
        onScroll={onScroll}
        className="no-scrollbar -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0"
      >
      {reviews.map(({ name, business, quote }) => (
        <figure
          key={business}
          className="glass-panel w-4/5 shrink-0 snap-start rounded-2xl p-5 md:w-auto md:shrink"
        >
          <figcaption>
            <span className="block text-[14px] leading-[1.55] font-medium text-white">{name}</span>
            <span className="mt-0.5 block text-[12px] leading-[1.45] text-on-dark-muted">{business}</span>
          </figcaption>

          <span className="mt-3 flex gap-0.5" aria-label="Lima dari lima bintang">
            {Array.from({ length: 5 }, (_, i) => (
              <Star key={i} className="size-3.5 text-success" aria-hidden />
            ))}
          </span>

          <blockquote className="mt-3 text-[14px] leading-[1.55] text-on-dark-body">{quote}</blockquote>
        </figure>
      ))}
      </div>

      {/* Hidden from md up, where the grid returns and nothing scrolls. White at 40%
          rather than the 30% that matched the light row: on black that measured 2.5:1,
          under the 3:1 a non-text graphic needs to be made out. */}
      <div className="mt-6 flex justify-center gap-1.5 md:hidden">
        {reviews.map(({ business }, i) => (
          <span
            key={business}
            className={`h-1.5 rounded-full transition-[width,background-color] duration-300 ease-out motion-reduce:transition-none ${
              i === current ? "w-5 bg-white" : "w-1.5 bg-white/40"
            }`}
          />
        ))}
      </div>
    </>
  );
}
