"use client";

import Image from "next/image";
import { useState } from "react";
import { AppWindow, Building, LayoutTemplate, ShoppingBag } from "@/components/ui/icons";

const items = [
  { src: "/images/placeholders/hero-landing-page.png", label: "Landing Page", icon: LayoutTemplate, tint: false },
  { src: "/images/placeholders/hero-toko-online.png", label: "Toko Online", icon: ShoppingBag, tint: false },
  { src: "/images/placeholders/hero-company-profile.png", label: "Company Profile", icon: Building, tint: true },
  { src: "/images/placeholders/hero-web-app.png", label: "Web App", icon: AppWindow, tint: true },
];

export default function HeroShowcase() {
  const [active, setActive] = useState(0);

  return (
    <div className="mt-14 w-full md:mt-16">
      {/* Phones: an accordion where the picked row gives way to its card, leaving the
          three still on offer beneath. The row of four only works where there is width
          to spend -- at 390px it left the active card 161px and the other three 54px
          each, too narrow to show any of the website inside. */}
      <div className="flex flex-col gap-2 md:hidden">
        {items.map((item, i) => {
          const isActive = i === active;
          return (
            <div key={item.label}>
              {/* The open one drops its row: the card already shows which it is, and the
                  label underneath it was saying the same thing twice. What stays is the
                  three still to choose from. */}
              {!isActive && (
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  className="flex h-12 w-full items-center gap-2.5 rounded-2xl bg-white/10 px-4 text-[15px] leading-[1.5] font-medium text-white transition-colors duration-200"
                >
                  <item.icon className="size-4 shrink-0" />
                  {item.label}
                </button>
              )}

              {/* Only the open card is mounted: four stacked <Image fill> would each
                  claim their own layer whether shown or not. */}
              {isActive && (
                /* The glass is the outer box and the card sits inside it, rather than the
                   frame reaching 10px beyond the card: outset, its 378px overhung the
                   358px column and came within 6px of the screen edge. */
                <div className="glass-panel mb-2 rounded-[22px] p-2.5">
                  <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl">
                    <Image
                      src={item.src}
                      alt={item.label}
                      fill
                      priority={i === 0}
                      sizes="100vw"
                      className={`object-cover ${item.tint ? "img-brand-tint" : ""}`}
                      quality={100}
                    />
                    {/* Carries the name the hidden row used to, in the same pill the
                        desktop cards use, so nothing has to be inferred from the photo. */}
                    <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/50 px-3 py-1 text-[12px] leading-[1.45] font-medium text-ink backdrop-blur-md">
                      <item.icon className="size-3.5" />
                      {item.label}
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* From md the row of four, which is where it earns its keep. */}
      <div className="hidden w-full gap-4 md:flex">
        {items.map((item, i) => {
          const isActive = i === active;
          return (
            <button
              key={item.label}
              type="button"
              onClick={() => setActive(i)}
              aria-pressed={isActive}
              className={`group relative h-80 min-w-0 cursor-pointer rounded-2xl text-left transition-[flex-grow] duration-500 ease-out ${
                isActive ? "grow-[2.2]" : "grow hover:grow-[1.25]"
              }`}
            >
              {/* Glass fills the button, so it never reaches past the column the way an
                  outset -inset-2.5 did on the first and last card. */}
              <span
                aria-hidden
                className={`glass-panel pointer-events-none absolute inset-0 rounded-[22px] transition-opacity duration-500 ${
                  isActive ? "opacity-100" : "opacity-0"
                }`}
              />
              {/* The card only draws back inside the glass when there is glass to sit in.
                  Held at inset-2.5 throughout, a resting card stopped 10px short of the
                  column while the open one's glass ran to the edge, so whichever end was
                  not the pick looked mis-aligned. */}
              <div
                className={`absolute overflow-hidden rounded-2xl transition-[inset,box-shadow] duration-500 ease-out ${
                  isActive ? "inset-2.5" : "inset-0 ring-1 ring-white/15 group-hover:ring-white/60"
                }`}
              >
                <Image
                  src={item.src}
                  alt={item.label}
                  fill
                  sizes="40vw"
                  className={`object-cover transition-transform duration-500 ease-out ${
                    isActive ? "" : "group-hover:scale-105"
                  } ${item.tint ? "img-brand-tint" : ""}`}
                  quality={100}
                />
                <span
                  /* Also shown on hover, not only when active: without it there is no way to
                     tell what a resting card is before committing to a click. */
                  className={`absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/50 px-3 py-1 text-[12px] leading-[1.45] font-medium text-ink backdrop-blur-md transition-opacity duration-300 ${
                    isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  }`}
                >
                  <item.icon className="size-3.5" />
                  {item.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
