import Image from "next/image";
import { Container, Section, SectionHeader } from "@/components/ui";
import Reviews from "./Reviews";
import WorkRow, { type Work } from "./WorkRow";

/* Portfolio: an endless marquee of the work, with a row of client quotes beneath it.

   Cards are labelled with the domain rather than the business name: it is the thing we
   actually delivered, and it doubles as proof the site is live.

   arifsyauqi.com is real. The rest are still examples, consistent with the Cara Kerja
   showcase, so their domains are invented too and must not be linked anywhere.

   TODO: replace the remaining placeholders with real client work before launch. Real
   entries link to the live site; placeholders point back at the section so nothing leads
   somewhere that does not exist. */

const works: Work[] = [
  {
    href: "https://arifsyauqi.com",
    client: "arifsyauqi.com",
    photoWide: "/images/work/w169-arif.webp",
    photoSquare: "/images/work/w11-arif.webp",
  },
  {
    href: "#portfolio",
    client: "kliniksenyum.co.id",
    photoWide: "/images/work/w169-klinik.webp",
    photoSquare: "/images/work/w11-klinik.webp",
  },
  {
    href: "#portfolio",
    client: "kopisudut.com",
    photoWide: "/images/work/w169-kopi.webp",
    photoSquare: "/images/work/w11-kopi.webp",
  },
  {
    href: "#portfolio",
    client: "ruangasana.com",
    photoWide: "/images/work/w169-yoga.webp",
    photoSquare: "/images/work/w11-yoga.webp",
  },
  {
    href: "#portfolio",
    client: "panentani.co.id",
    photoWide: "/images/work/w169-tani.webp",
    photoSquare: "/images/work/w11-tani.webp",
  },
  {
    href: "#portfolio",
    client: "rasanusantara.com",
    photoWide: "/images/work/w169-resto.webp",
    photoSquare: "/images/work/w11-resto.webp",
  },
];

export default function Segments() {
  return (
    /* The clip lives on the background image rather than on the section, so the marquee
       inside can be wider than the window. With overflow-hidden here the strip was pinned
       to the viewport and its ends could never move off screen, which is what the fade
       keys off. The section still hides its own horizontal overflow via the wrapper the
       strip sits in. */
    <Section id="portfolio" className="relative bg-black text-white">
      <span className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* `object-cover` keeps the art's proportions (object-fill would squash it). Anchored
            top-right, the darkest part of the image, so the heading sits on near-black while the
            blue glow stays down in the corner. */}
        <Image src="/images/porto-bg.webp" alt="" fill className="object-cover object-top-right" />
      </span>
      <Container className="relative">
        <SectionHeader tone="dark" title="Karya yang sudah tayang" />
      </Container>

      {/* The marquee sits outside the Container because it caps and pads itself, so it can
          line its cards up with the heading while still clipping and fading at that edge. */}
      <div className="relative mt-12">
        <WorkRow works={works} />
      </div>

      <Container className="relative mt-16 md:mt-20">
        <Reviews />
      </Container>
    </Section>
  );
}
