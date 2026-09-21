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
      {/* Phones: one card at full width, the way the reference hero shows a single
          screen. The row of four only works where there is width to spend -- at 390px
          it left the active card 161px and the other three 54px each, too narrow to
          show anything of the website inside. The labels move below as a picker. */}
      <div className="md:hidden">
        <div className="relative">
          <span aria-hidden className="glass-panel pointer-events-none absolute -inset-2.5 rounded-[22px]" />
          <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl">
            {items.map((item, i) => (
              <Image
                key={item.label}
                src={item.src}
                alt={item.label}
                fill
                priority={i === 0}
                sizes="100vw"
                className={`object-cover transition-opacity duration-500 ease-out ${
                  i === active ? "opacity-100" : "opacity-0"
                } ${item.tint ? "img-brand-tint" : ""}`}
                quality={100}
              />
            ))}
          </div>
        </div>

        {/* The four names, wrapping rather than scrolling: all four fit in two rows at
            390px, and a row that scrolls hides options behind a gesture nobody is told
            about. */}
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {items.map((item, i) => {
            const isActive = i === active;
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={isActive}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-[13px] leading-[1.45] font-medium transition-colors duration-200 ${
                  isActive ? "bg-white text-ink" : "bg-white/10 text-white"
                }`}
              >
                <item.icon className="size-3.5" />
                {item.label}
              </button>
            );
          })}
        </div>
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
              {/* Glass frame sits outside the card, 10px on every side */}
              <span
                aria-hidden
                className={`glass-panel pointer-events-none absolute -inset-2.5 rounded-[22px] transition-opacity duration-500 ${
                  isActive ? "opacity-100" : "opacity-0"
                }`}
              />
              <div
                className={`relative h-full w-full overflow-hidden rounded-2xl transition-shadow duration-300 ${
                  isActive ? "" : "ring-1 ring-white/15 group-hover:ring-white/60"
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
