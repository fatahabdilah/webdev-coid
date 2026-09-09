import Link from "next/link";
import { Container, Section, SectionHeader } from "@/components/ui";
import { ArrowUpRight } from "@/components/ui/icons";

const cards = [
  {
    href: "#harga",
    title: "Layanan & harga",
    desc: "Temukan jenis website yang pas untuk bisnis kamu, dengan harga yang jelas di depan.",
    footer: "mulai Rp750 rb",
    sheen: true,
  },
  {
    href: "#konsultasi",
    title: "Konsultasi gratis",
    desc: "Ceritakan kebutuhanmu, kami bantu carikan solusinya. Nggak perlu ngerti teknis.",
    footer: "Ngobrol dulu, yuk",
    sheen: false,
  },
];

export default function GetStarted() {
  return (
    <Section id="mulai" className="relative overflow-hidden bg-offwhite">
      {/* Thin blue ambient glows, top-left and bottom-right */}
      <div className="pointer-events-none absolute -left-52 -top-32 h-72 w-220 -rotate-30 rounded-full bg-primary/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-52 h-72 w-220 -rotate-30 rounded-full bg-primary/25 blur-3xl" />
      {/* Stronger blue core at the very corners */}
      <div className="pointer-events-none absolute -left-32 -top-32 size-96 rounded-full bg-primary/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 size-96 rounded-full bg-primary/40 blur-3xl" />

      <Container className="relative flex flex-col items-center">
        <SectionHeader
          title={
            <>
              Dari ide jadi website,
              <br />
              <span className="bg-[linear-gradient(90deg,#003466_0%,#0066cb_100%)] bg-clip-text text-transparent">
                mudah dan cepat.
              </span>
            </>
          }
          description="Mau langsung lihat harga, atau ngobrol dulu? Dua-duanya bisa dimulai dari sini."
        />

        <div className="mt-12 grid w-full max-w-225 gap-6 md:grid-cols-2">
          {cards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="group relative flex min-h-44 flex-col justify-between overflow-hidden rounded-2xl bg-primary p-7 text-white shadow-[0_0_0_0_rgba(10,10,10,0)] transition-[background-color,translate,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform hover:-translate-y-1.5 hover:bg-primary-dark hover:shadow-[0_18px_40px_-14px_rgba(10,10,10,0.28)]"
            >
              {/* Two slanted bands flush left as background, first card only */}
              {card.sheen && (
                <>
                  <span className="pointer-events-none absolute inset-y-0 -left-16 w-[calc(38%+4rem)] -skew-x-20 bg-[linear-gradient(180deg,#0066cb_0%,#4094e6_100%)] transition-transform duration-500 ease-out group-hover:translate-x-3" />
                  <span className="pointer-events-none absolute inset-y-0 left-[35%] w-[22%] -skew-x-20 bg-[linear-gradient(0deg,#0066cb_0%,#4094e6_100%)] transition-transform duration-500 ease-out group-hover:translate-x-3" />
                </>
              )}

              <div className="relative flex items-start justify-between gap-6">
                <div>
                  <p className="text-[20px] font-medium leading-[1.3] tracking-[-0.01em]">{card.title}</p>
                  <p className="mt-2 max-w-75 text-[14px] leading-[1.6] text-white/80">{card.desc}</p>
                </div>
                <ArrowUpRight className="size-5 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>
              <p className="relative mt-6 text-[16px] font-medium">{card.footer}</p>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
