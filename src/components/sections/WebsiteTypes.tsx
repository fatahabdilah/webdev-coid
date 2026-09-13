import { Container, Section, SectionHeader } from "@/components/ui";
import ExtraCards from "./ExtraCards";
import ReasonCards, { type Reason } from "./ReasonCards";

/* Layout follows the Figma frame 575:367: two wide cards for the secondary asks,
   then a centred heading over a row of image cards.

   The row says what a client gets, not which kinds of website we build, because
   the hero showcase and the pricing table already cover those.

   Photos: Pexels (free to use, no attribution required), cropped to /public/images/types.
   work-klinik.webp  https://www.pexels.com/photo/3845810/
   work-kopi.webp    https://www.pexels.com/photo/5619514/
   work-yoga.webp    https://www.pexels.com/photo/39190415/
   work-studio.webp  https://www.pexels.com/photo/6615092/ */

const reasons: Reason[] = [
  {
    href: "#harga",
    photo: "/images/types/work-klinik.webp",
    title: "Dirancang khusus",
    desc: "Bukan template.",
  },
  {
    href: "#harga",
    photo: "/images/types/work-studio.webp",
    title: "Satu pintu",
    desc: "Domain, hosting, maintenance, kami urus.",
  },
  {
    href: "#harga",
    photo: "/images/types/work-kopi.webp",
    title: "Harga jelas di awal",
    desc: "Tanpa biaya tersembunyi.",
  },
  {
    href: "#konsultasi",
    photo: "/images/types/work-yoga.webp",
    title: "Klien langsung terhubung",
    desc: "Masuk ke WhatsApp dan email.",
  },
];

export default function WebsiteTypes() {
  return (
    <Section id="lainnya">
      <Container>
        {/* Two secondary routes, for people whose need is not a new build */}
        <h2 className="text-[20px] font-medium leading-[1.3] tracking-[-0.02em] text-ink md:text-[24px]">
          Butuhnya bukan website baru?
        </h2>
        <ExtraCards />

        {/* What working with us actually gets you, four reasons in one row */}
        <div className="mt-20 flex flex-col items-center">
          <SectionHeader title="Yang selalu kamu dapat" />
        </div>

        <ReasonCards reasons={reasons} />
      </Container>
    </Section>
  );
}
