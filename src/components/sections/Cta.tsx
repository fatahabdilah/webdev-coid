import Image from "next/image";
import { Button, Container, Section } from "@/components/ui";
import { Whatsapp } from "@/components/ui/icons";
import { waLink } from "@/lib/contact";

export default function Cta() {
  return (
    /* A card on the page rather than a full-bleed band: rounded, inset by the container's
       own gutter, with the figure breaking out over its top edge. The section itself does
       not clip, which is what lets the photo overhang.

       bg-offwhite matches the pricing section above it, so the two read as one stretch of
       page with a card sitting on it rather than as two different grounds. */
    <Section id="konsultasi" className="bg-offwhite">
      <Container>
        <div className="relative rounded-3xl bg-navy text-white">
          {/* The art is a smooth gradient, which is exactly what shows banding when
              stretched. It is stored at 1600px with fine dither baked in; `sizes` keeps the
              browser from picking a small variant and re-introducing the steps.

              Clipped by its own rounded wrapper rather than by the card, so the corners
              stay round while the photo above remains free to overhang. */}
          <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
            <Image
              src="/images/cta-bg.webp"
              alt=""
              fill
              sizes="100vw"
              quality={100}
              className="object-cover object-bottom"
            />
          </span>

          <Portrait />

          <div className="relative px-8 py-12 text-center md:px-12 md:py-14 lg:grid lg:grid-cols-[1fr_300px] lg:gap-10 lg:text-left xl:grid-cols-[1fr_340px]">
            <div>
              <h2 className="text-[26px] font-medium leading-[1.25] tracking-[-0.03em] text-balance md:text-[30px]">
                Sudah kebayang websitenya?
                <br />
                Yuk, wujudkan sekarang.
              </h2>
              <Button href={waLink("Halo, saya mau konsultasi soal website.")} variant="white" className="mt-8">
                <Whatsapp className="size-5" />
                Konsultasi Gratis
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* Someone reading a message on their phone -- the moment the button leads to. Decorative,
   so it carries an empty alt.

   Flush to the card's right edge and taller than the card, so the head rises past the top
   edge the way it does in the design. The wrapper rounds off its bottom corners to match
   the card, so the figure's feet follow the card's curve instead of cutting across it.

   Height is set from the overhang, not copied from the design: Figma's card is 211px to
   ours at ~297px, since our copy runs longer. There the figure clears the top edge by 18%
   of its own height, and 440px put ours at 33% -- towering rather than leaning in.

   shrink-0 matters: the wrapper is a flex row, and without it the image is stretched to
   the row's cross size, which distorted the figure the moment the source's aspect ratio
   changed.

   The grid beside it reserves the column, so the copy never runs underneath. */
function Portrait() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 hidden justify-end overflow-hidden rounded-b-3xl lg:flex">
      <Image
        src="/images/cta-orang.webp"
        alt=""
        width={281}
        height={329}
        sizes="(max-width: 1024px) 0px, 340px"
        className="block h-[360px] w-auto shrink-0 xl:h-[380px]"
        quality={100}
      />
    </div>
  );
}
