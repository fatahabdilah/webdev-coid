import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui";
import { Instagram, Linkedin, MessageCircle } from "@/components/ui/icons";

const columns: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Layanan",
    links: [
      { label: "Landing Page", href: "#harga" },
      { label: "Company Profile", href: "#harga" },
      { label: "Toko Online", href: "#harga" },
      { label: "Web App / Sistem", href: "#harga" },
      { label: "Redesign Website", href: "#konsultasi" },
    ],
  },
  {
    title: "Jelajahi",
    links: [
      { label: "Portfolio", href: "#portfolio" },
      { label: "Cara Kerja", href: "#cara-kerja" },
      { label: "Komitmen Kami", href: "#komitmen" },
      { label: "Harga", href: "#harga" },
    ],
  },
  {
    title: "Hubungi",
    links: [
      { label: "Konsultasi Gratis", href: "#konsultasi" },
      { label: "WhatsApp", href: "#konsultasi" },
      { label: "Instagram", href: "#" },
      { label: "LinkedIn", href: "#" },
    ],
  },
];

const socials = [
  { label: "WhatsApp", icon: MessageCircle },
  { label: "Instagram", icon: Instagram },
  { label: "LinkedIn", icon: Linkedin },
];

export default function Footer() {
  return (
    <footer className="bg-surface text-white">
      <Container className="py-16">
        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div className="max-w-[320px]">
            <Link href="/" aria-label="webdev.co.id" className="relative block h-8 w-35.5">
              <Image src="/brand/logo-white.svg" alt="webdev.co.id" fill className="object-contain object-left" />
            </Link>
            <p className="mt-5 text-[16px] leading-[1.6] font-medium">Agency lokal, standar global.</p>
            <p className="mt-2 text-[14px] leading-[1.55] text-on-dark-body">
              Agensi web development di Indonesia. Kami bantu brand baru, startup, perusahaan, dan institusi
              tampil profesional secara online.
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map(({ label, icon: Icon }) => (
                <Link
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex size-11 items-center justify-center rounded-lg bg-elevated text-on-dark-body transition-colors hover:bg-white/10 hover:text-white"
                >
                  <Icon className="size-5" />
                </Link>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-[14px] leading-[1.55] font-medium">{col.title}</p>
              {/* Roomier rows on phones: as bare inline text these links were 18px tall
                  and stacked close together, which is a mis-tap waiting to happen. They
                  tighten back up from md, where there is a pointer. */}
              <ul className="mt-2 flex flex-col md:mt-4 md:gap-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="flex min-h-11 items-center text-[14px] leading-[1.55] text-on-dark-body transition-colors hover:text-white md:min-h-0"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-white/10 pt-6 text-[14px] leading-[1.55] text-on-dark-muted md:flex-row md:items-center md:justify-between">
          <p>© 2026 webdev.co.id. Semua hak dilindungi.</p>
          <p>Solusi digital untuk bisnis yang ingin berkembang.</p>
        </div>
      </Container>
    </footer>
  );
}
