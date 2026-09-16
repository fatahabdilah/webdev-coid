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
    <div className="mt-14 flex w-full gap-3 md:mt-16 md:gap-4">
      {items.map((item, i) => {
        const isActive = i === active;
        return (
          <button
            key={item.label}
            type="button"
            onClick={() => setActive(i)}
            aria-pressed={isActive}
            /* The active card takes far more of the row on phones: sharing 342px four ways
               left the resting cards 59px wide, too narrow to show anything of the site
               inside them. From md there is room for the gentler 2.2 ratio. */
            className={`group relative h-56 min-w-0 cursor-pointer rounded-2xl text-left transition-[flex-grow] duration-500 ease-out md:h-80 ${
              isActive ? "grow-3 md:grow-[2.2]" : "grow hover:grow-[1.25]"
            }`}
          >
            {/* Glass frame sits outside the card, 10px on every side */}
            <span
              aria-hidden
              className={`pointer-events-none absolute -inset-2.5 rounded-[22px] border border-white/25 bg-white/10 backdrop-blur-md transition-opacity duration-500 ${
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
                priority={i === 0}
                sizes="(max-width: 768px) 60vw, 40vw"
                className={`object-cover transition-transform duration-500 ease-out ${
                  isActive ? "" : "group-hover:scale-105"
                } ${item.tint ? "img-brand-tint" : ""}`}
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
  );
}
