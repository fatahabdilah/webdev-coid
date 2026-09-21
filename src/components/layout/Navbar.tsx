"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button, Container } from "@/components/ui";
import { Close, Menu, Whatsapp } from "@/components/ui/icons";
import { waLink } from "@/lib/contact";

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
  "bg-transparent " +
  "transition-[background-color,box-shadow] duration-300 ease-out " +
  "data-scrolled:bg-white " +
  "motion-reduce:transition-none";

/* A shadow only once the bar has a white ground to cast it: over the hero the bar is
   transparent, and a shadow there would hang in mid-air with nothing above it. It does
   the separating on its own, with no bottom border, so the edge stays soft rather than
   drawing a hard line across the page.

   The two states are exclusive rather than one cancelling the other: `shadow-none` and
   this sat in the class list together and the winner came down to which Tailwind had
   written first -- shadow-none, as it turned out, so the shadow never appeared at all. */
const BAR_SHADOW = "shadow-[0_2px_8px_rgba(10,10,10,0.10)]";

/* White ground needs dark text. The softer resting tone is baked into the start colour
   rather than applied through opacity: animating both at once made the text dip pale
   mid-way, since the colour was already grey while the opacity was still climbing. Both
   ends are plain rgb so the interpolation stays in one colour space. */
const INK_WHEN_SCROLLED =
  "text-[#d9d9d9] transition-colors duration-300 ease-out group-data-scrolled:text-ink motion-reduce:transition-none";

/* Same reasoning for the logo swap, which is a cross-fade rather than a colour change. */
/* Same 300ms as the bar and the panel: the ground, the text, the logo and the panel
   are one change, and three clocks made them look like separate events. */
const LOGO_FADE = "transition-opacity duration-300 ease-out motion-reduce:transition-none";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  /* Escape closes it, and so does growing past md: the panel is md:hidden, so past that
     width `open` would stay true with nothing on screen and the page still locked. */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    /* The panel covers the bar, so the page behind it should hold still: scrolling it
       would slide the hero out from under something that is not moving. */
    document.body.style.overflow = "hidden";
    const wide = window.matchMedia("(min-width: 48rem)");
    const onWide = () => wide.matches && setOpen(false);
    onWide();
    wide.addEventListener("change", onWide);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      wide.removeEventListener("change", onWide);
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
      className={`group fixed inset-x-0 top-0 z-50 text-white ${BAR} ${scrolled ? BAR_SHADOW : "shadow-none"}`}
      data-scrolled={scrolled ? "" : undefined}
    >
      <Container className="relative flex h-18 items-center justify-between">
        <Link href="/" aria-label="webdev.co.id" className="relative block h-8 w-39">
          {/* Both logos are stacked; the white one fades out and the black one fades in
              as the bar turns white */}
          <Image
            src="/brand/logo-white.svg"
            alt=""
            fill
            priority
            className={`object-contain group-data-scrolled:opacity-0 ${LOGO_FADE}`}
            quality={100}
          />
          <Image
            src="/brand/logo-ink.svg"
            alt="webdev.co.id"
            fill
            className={`object-contain opacity-0 group-data-scrolled:opacity-100 ${LOGO_FADE}`}
            quality={100}
          />
        </Link>

        {/* Centred on the bar rather than left in the flow: with a button back on the
            right, justify-between would spread logo, menu and button to three corners and
            leave the menu stranded mid-gap. */}
        <nav
          className={`absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 text-[14px] leading-[1.55] md:flex ${INK_WHEN_SCROLLED}`}
        >
          {menu.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              /* Fades rather than recolours, so one rule covers both the dark hero and the
                 white bar. Its own transition is safe here because it names opacity only:
                 the colour switch stays with <nav>, so the two never overwrite each other
                 the way an unscoped `transition` on the link once did. */
              className="opacity-100 transition-opacity duration-200 ease-out hover:opacity-75 motion-reduce:transition-none"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* The same button every other consultation CTA uses, shrunk to sit in a 72px bar:
            h-10 and the smaller type, but the same fill, radius and hover ring, so it reads
            as one family. Solid blue works over the hero too, which is navy.

            Below md it gives way to the menu button -- at 390px the two together left the
            logo no room -- and the sheet carries the same action inside. */}
        {/* Hidden on a wrapper rather than on the Button: the component's own `inline-flex`
            comes after `hidden` in the class list and wins, so the button stayed visible at
            390px. */}
        <span className="relative hidden md:block">
          <Button href={waLink("Halo, saya mau konsultasi soal website.")} size="sm">
            <Whatsapp className="size-4" />
            Konsultasi Gratis
          </Button>
        </span>

        {/* Opens only: the panel lies over this bar and carries its own close in the
            same spot, so this one is never the button being tapped to shut it. */}
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

      <MobileSheet open={open} onClose={() => setOpen(false)} onToggle={() => setOpen((v) => !v)} />
    </header>
  );
}

/* One panel carrying its own bar, laid over the real one rather than hung beneath it.

   The bar underneath is left alone: it does not turn white, and nothing has to be timed
   against it, because while this is up it is not the thing being looked at. That is what
   the earlier versions kept getting wrong -- a white sheet arriving under a bar that was
   still going white read as two surfaces however closely the clocks were matched.

   Links are 48px tall -- the bare text in the footer measured 18px, which is a miss
   waiting to happen on a touch screen. */
function MobileSheet({
  open,
  onClose,
  onToggle,
}: {
  open: boolean;
  onClose: () => void;
  onToggle: () => void;
}) {
  return (
    <>
      {/* Takes the page back so the panel is clearly what is in front, and closes on a tap */}
      <div
        onClick={onClose}
        aria-hidden
        className={`fixed inset-0 z-40 bg-ink/40 transition-opacity duration-300 ease-out md:hidden motion-reduce:transition-none ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Kept mounted so it can animate both ways; inert to pointer and keyboard when shut */}
      <div
        className={`fixed inset-x-0 top-0 z-50 bg-white shadow-[0_2px_8px_rgba(10,10,10,0.10)] transition-opacity duration-300 ease-out md:hidden motion-reduce:transition-none ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!open}
      >
        {/* Its own bar, matching the real one's height so the logo and the button land
            where they already were and nothing appears to jump on open. */}
        <Container className="flex h-18 items-center justify-between">
          <Link href="/" onClick={onClose} aria-label="webdev.co.id" className="relative block h-8 w-39">
            <Image src="/brand/logo-ink.svg" alt="webdev.co.id" fill className="object-contain" quality={100} />
          </Link>
          <button
            type="button"
            onClick={onToggle}
            aria-label="Tutup menu"
            aria-expanded={open}
            className="-mr-2 inline-flex size-11 items-center justify-center rounded-full text-ink transition-[scale] duration-150 ease-out active:scale-90"
          >
            <Close className="size-6" />
          </button>
        </Container>

        <Container className="pb-4">
          <nav className="flex flex-col">
            {menu.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={onClose}
                className="flex h-12 items-center rounded-2xl text-[16px] leading-[1.5] text-ink transition-colors duration-200 active:bg-offwhite"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* The page's own button, so the one action looks the same here as everywhere. */}
          <Button href={waLink("Halo, saya mau konsultasi soal website.")} onClick={onClose} className="mt-2 w-full">
            <Whatsapp className="size-5" />
            Konsultasi Gratis
          </Button>
        </Container>
      </div>
    </>
  );
}