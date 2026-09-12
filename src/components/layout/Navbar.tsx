"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Container } from "@/components/ui";
import { Whatsapp } from "@/components/ui/icons";

const menu = [
  { label: "Beranda", href: "#" },
  { label: "Layanan", href: "#layanan" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Harga", href: "#harga" },
];

/* The bar turns into a floating panel once the page has scrolled past this (px). */
const SCROLLED_AFTER = 24;

/* Floating mode. Nothing resizes: the bar, logo and button keep their dimensions.
   What happens is a shift, the logo sliding right and the button sliding left, and
   then, once they have settled, a glass panel fades in behind them. Scrolling back to
   the top drops the panel at once. The header carries `data-scrolled` and everything
   below reacts through `group-data-scrolled:*`. Classes are written out literally,
   because Tailwind does not read interpolated strings.

   Timing: the shift runs .35s, then the panel and the text colour follow together after
   .25s, over .25s, so the whole change lands in about half a second.

   Geometry: the header is 72px tall; the panel is inset 8px top and bottom (56px), so
   the 40px button sits 8px from its edges. Horizontally it is inset by the container's
   own padding (24px, 40px from lg), so its edges land on the content box and line up
   with every section below. */
/* The glass is two elements. backdrop-filter ignores the opacity of the element that
   carries it, which is why a blur declared here used to smear the hero behind a bar that
   had not appeared yet. It does respect an ANCESTOR's opacity, though: fading this outer
   wrapper takes the blur with it, so the whole bar arrives in one clean fade. */
const PANEL_WRAP =
  "pointer-events-none absolute inset-x-6 inset-y-2 opacity-0 lg:inset-x-10 " +
  "transition-opacity duration-250 ease-out group-data-scrolled:opacity-100 group-data-scrolled:delay-[.25s] motion-reduce:transition-none";

/* rounded-full: the panel is 56px tall, so its left and right ends are true semicircles.
   A lighter fill than before, since the blur now does part of the work. */
const PANEL =
  "absolute inset-0 rounded-full border border-white/55 bg-white/[.62] shadow-[0_12px_40px_rgba(0,20,50,.14),inset_0_1px_0_rgba(255,255,255,.9)] backdrop-blur-xl backdrop-saturate-150";

/* White glass needs dark text on it, and the colour is timed to the panel exactly:
   same .25s delay, same .25s duration, so the text darkens as the glass fills in rather
   than after it. The delay lives inside the data-scrolled variant, not the base rule,
   so it applies on the way down only; scrolling back up drops the panel at once and the
   text follows immediately rather than lingering dark over the hero.

   Only the colour animates. The softer tone is baked into the start colour rather than
   applied through opacity: animating both at once made the text dip pale mid-way, since
   the colour was already grey while the opacity was still climbing. Both ends are plain
   rgb so the interpolation stays in one colour space. */
const INK_WHEN_SCROLLED =
  "text-[#d9d9d9] [transition:color_.25s_ease-out] group-data-scrolled:[transition:color_.25s_ease-out_.25s] " +
  "group-data-scrolled:text-ink motion-reduce:transition-none";

/* Same reasoning for the logo swap, which is a cross-fade rather than a colour change. */
const LOGO_FADE =
  "[transition:opacity_.25s_ease-out] group-data-scrolled:[transition:opacity_.25s_ease-out_.25s] motion-reduce:transition-none";

/* The shift and the colour switch are written as one transition wherever they meet on
   the same element: two separate `transition:` declarations would overwrite each other,
   leaving one property with no animation and the other inheriting the wrong delay. */
const SHIFT = "[transition:translate_.35s_cubic-bezier(.65,0,.35,1)] motion-reduce:transition-none";

/* The CTA both shifts and recolours, so it needs the combined rule: translate runs
   immediately over .6s, while colour and opacity wait .85s for the panel to fill. */
const CTA_TRANSITION =
  "[transition:translate_.35s_cubic-bezier(.65,0,.35,1),color_.25s_ease-out] " +
  "group-data-scrolled:[transition:translate_.35s_cubic-bezier(.65,0,.35,1),color_.25s_ease-out_.25s] motion-reduce:transition-none";
/* The items sit on the panel's edge, so they shift inward to clear the rounded ends.
   The button clears the panel's edge by 8px, matching the 8px above and below. The logo
   sits a little further in: it is a rectangle against a rounded end, so equal numbers
   read as tighter there than they do on the capsule button. */
const LOGO_SHIFT = `translate-x-0 group-data-scrolled:translate-x-4 ${SHIFT}`;
const CTA_SHIFT = "translate-x-0 group-data-scrolled:-translate-x-2";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      setScrolled(window.scrollY > SCROLLED_AFTER);
    };
    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    /* Transparent header over the hero; once the page scrolls, the white glass panel
       below becomes the ground and the logo and text switch to their dark versions. */
    <header className="group fixed inset-x-0 top-0 z-50 text-white" data-scrolled={scrolled ? "" : undefined}>
      <Container className="relative flex h-18 items-center justify-between">
        <span className={PANEL_WRAP} aria-hidden>
          <span className={PANEL} />
        </span>

        <Link href="/" aria-label="webdev.co.id" className={`relative block h-8 w-35.5 ${LOGO_SHIFT}`}>
          {/* Both logos are stacked; the white one fades out and the gradient one fades in
              on the same delay as the panel */}
          <Image
            src="/brand/logo-white.svg"
            alt=""
            fill
            priority
            className={`object-contain group-data-scrolled:opacity-0 ${LOGO_FADE}`}
          />
          <Image
            src="/brand/logo-gradient.svg"
            alt="webdev.co.id"
            fill
            className={`object-contain opacity-0 group-data-scrolled:opacity-100 ${LOGO_FADE}`}
          />
        </Link>

        <nav className={`relative hidden items-center gap-8 text-[14px] leading-[1.55] md:flex ${INK_WHEN_SCROLLED}`}>
          {menu.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              /* No transition of its own: a second `transition` declaration here would
                 override the delayed one inherited from <nav>, which is exactly why these
                 links used to snap dark while the CTA (which has no such rule) did not. */
              className="hover:text-white group-data-scrolled:hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="#konsultasi"
          className={`border-gradient-accent relative inline-flex h-10 items-center gap-2 rounded-full px-4 text-[14px] leading-[1.55] font-medium text-white hover:bg-white/10 group-data-scrolled:text-ink group-data-scrolled:hover:bg-ink/5 ${CTA_TRANSITION} ${CTA_SHIFT}`}
        >
          <Whatsapp className="size-5" />
          Konsultasi Gratis
        </Link>
      </Container>
    </header>
  );
}
