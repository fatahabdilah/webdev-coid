"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Container } from "@/components/ui";
import { Close, Menu, Whatsapp } from "@/components/ui/icons";

const menu = [
  /* An anchor, not "/": clicking Beranda should glide back to the top like the other
     items do, not reload the page. */
  { label: "Beranda", href: "#beranda" },
  { label: "Layanan", href: "#layanan" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Harga", href: "#harga" },
];

/* The bar gains its white background once the page has scrolled past this (px). */
const SCROLLED_AFTER = 24;

/* A plain full-width bar. Over the hero it is transparent with white text; once the page
   scrolls it becomes a solid white bar with dark text and a hairline along the bottom.
   Nothing moves or resizes -- only the background, the text colour and the logo change,
   all on the same .25s so the bar turns over as one piece.

   The header carries `data-scrolled` and everything below reacts through
   `group-data-scrolled:*`. Classes are written out literally, because Tailwind does not
   read interpolated strings. */
/* data-scrolled:, not group-data-scrolled:, because the attribute sits on this very
   element; the group-* variants only look at ancestors, so they never matched here. */
const BAR =
  "border-b border-transparent bg-transparent " +
  "transition-[background-color,border-color] duration-250 ease-out " +
  "data-scrolled:border-line data-scrolled:bg-white motion-reduce:transition-none";

/* White ground needs dark text. The softer resting tone is baked into the start colour
   rather than applied through opacity: animating both at once made the text dip pale
   mid-way, since the colour was already grey while the opacity was still climbing. Both
   ends are plain rgb so the interpolation stays in one colour space. */
const INK_WHEN_SCROLLED =
  "text-[#d9d9d9] transition-colors duration-250 ease-out group-data-scrolled:text-ink motion-reduce:transition-none";

/* Same reasoning for the logo swap, which is a cross-fade rather than a colour change. */
const LOGO_FADE = "transition-opacity duration-250 ease-out motion-reduce:transition-none";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  /* The sheet is the page's only scrollable thing while it is open, and Escape closes it. */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

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
    /* Transparent over the hero; once the page scrolls the bar itself turns white and the
       logo and text switch to their dark versions. */
    <header
      className={`group fixed inset-x-0 top-0 z-50 text-white ${BAR}`}
      data-scrolled={scrolled ? "" : undefined}
    >
      <Container className="relative flex h-18 items-center justify-between">
        <Link href="/" aria-label="webdev.co.id" className="relative block h-8 w-35.5">
          {/* Both logos are stacked; the white one fades out and the gradient one fades in
              as the bar turns white */}
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
                 override the one inherited from <nav>, which is exactly why these links
                 used to snap dark while the CTA (which has no such rule) did not. */
              className="hover:text-white group-data-scrolled:hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Below md the CTA gives way to the menu button: at 390px the two together left
            the logo no room, and the same action waits inside the sheet anyway. */}
        <Link
          href="#konsultasi"
          className={`border-gradient-accent relative hidden h-10 items-center gap-2 rounded-full px-4 text-[14px] leading-[1.55] font-medium text-white transition-colors duration-250 ease-out hover:bg-white/10 group-data-scrolled:text-ink group-data-scrolled:hover:bg-ink/5 md:inline-flex motion-reduce:transition-none`}
        >
          <Whatsapp className="size-5" />
          Konsultasi Gratis
        </Link>

        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Buka menu"
          aria-expanded={open}
          className={`relative -mr-2 inline-flex size-11 items-center justify-center rounded-full transition-[scale] duration-150 ease-out active:scale-90 md:hidden ${INK_WHEN_SCROLLED}`}
        >
          <Menu className="size-6" />
        </button>
      </Container>

      <MobileSheet open={open} onClose={() => setOpen(false)} />
    </header>
  );
}

/* Full-screen menu for phones. Navy rather than glass: it covers the page outright, so
   there is nothing behind it worth blurring, and navy keeps it unmistakably ours.
   Links are 48px tall — the bare text in the footer measured 18px, which is a miss
   waiting to happen on a touch screen. */
function MobileSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <div
      /* Kept mounted so it can animate both ways; inert to pointer and keyboard when shut. */
      className={`fixed inset-0 z-50 bg-navy transition-opacity duration-300 ease-out md:hidden motion-reduce:transition-none ${
        open ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      aria-hidden={!open}
    >
      <Container className="flex h-18 items-center justify-between">
        <span className="relative block h-8 w-35.5">
          <Image src="/brand/logo-white.svg" alt="webdev.co.id" fill className="object-contain" />
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup menu"
          className="-mr-2 inline-flex size-11 items-center justify-center rounded-full text-white transition-[scale] duration-150 ease-out active:scale-90"
        >
          <Close className="size-6" />
        </button>
      </Container>

      <Container className="mt-4 flex flex-col">
        {menu.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            onClick={onClose}
            className="flex h-12 items-center border-b border-white/10 text-[18px] leading-[1.5] text-white transition-colors duration-200 active:text-on-dark-body"
          >
            {item.label}
          </Link>
        ))}

        <Link
          href="#konsultasi"
          onClick={onClose}
          className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white text-[16px] leading-[1.6] font-semibold text-navy transition-[scale] duration-200 ease-out active:scale-[0.97]"
        >
          <Whatsapp className="size-5" />
          Konsultasi Gratis
        </Link>
      </Container>
    </div>
  );
}
