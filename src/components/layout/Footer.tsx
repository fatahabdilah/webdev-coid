import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui";
import { Instagram, Linkedin } from "@/components/ui/icons";

/* Off-site destinations in one place, so a change lands everywhere at once.

   TODO: fill these in before launch. They are deliberately left empty rather than
   guessed: a made-up handle or phone number renders as a working link and would ship
   unnoticed, while an empty one is visibly unfinished. Links with no destination are
   rendered as plain text below, so nothing pretends to be clickable. */
const INSTAGRAM = "";
const LINKEDIN = "";

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
      /* The old #komitmen section is gone; "Yang selalu kamu dapat" inside #layanan
         carries the same service promises, so the label still tells the truth. */
      { label: "Yang Kamu Dapat", href: "#layanan" },
      { label: "Harga", href: "#harga" },
    ],
  },
  {
    title: "Hubungi",
    links: [
      { label: "Konsultasi Gratis", href: "#konsultasi" },
      { label: "Instagram", href: INSTAGRAM },
      { label: "LinkedIn", href: LINKEDIN },
    ],
  },
];

const socials = [
  { label: "Instagram", icon: Instagram, href: INSTAGRAM },
  { label: "LinkedIn", icon: Linkedin, href: LINKEDIN },
];

export default function Footer() {
  return (
    <footer className="bg-surface text-white">
      <Container className="py-16">
        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div className="max-w-[320px]">
            <Link href="/" aria-label="webdev.co.id" className="relative block h-8 w-38.75">
              <Image src="/brand/logo-white.svg" alt="webdev.co.id" fill className="object-contain object-left" />
            </Link>
            <p className="mt-5 text-[16px] leading-[1.6] font-medium">Agency lokal, standar global.</p>
            <p className="mt-2 text-[14px] leading-[1.55] text-on-dark-body">
              Agensi web development di Indonesia. Kami bantu brand baru, startup, perusahaan, dan institusi
              tampil profesional secara online.
            </p>
            {/* Only rendered once the account exists: an icon that looks tappable and
                does nothing is worse than no icon. */}
            {socials.some((s) => s.href) && (
              <div className="mt-6 flex gap-3">
                {socials
                  .filter((s) => s.href)
                  .map(({ label, icon: Icon, href }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={label}
                      className="flex size-11 items-center justify-center rounded-lg bg-elevated text-on-dark-body transition-colors duration-200 hover:bg-white/10 hover:text-white"
                    >
                      <Icon className="size-5" />
                    </a>
                  ))}
              </div>
            )}
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
                    {link.href ? (
                      <FooterLink href={link.href}>{link.label}</FooterLink>
                    ) : (
                      /* No destination yet: shown, but plainly not a link */
                      <span className="flex min-h-11 items-center text-[14px] leading-[1.55] text-on-dark-muted md:min-h-0">
                        {link.label}
                      </span>
                    )}
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

/* One row in a footer column. External destinations open in a new tab and are marked up
   as such; in-page anchors stay in this tab. The colour change is the only movement:
   fourteen rows sliding on hover would make the footer restless. */
function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  const external = href.startsWith("http");
  const className =
    "flex min-h-11 items-center text-[14px] leading-[1.55] text-on-dark-body transition-colors duration-200 hover:text-white md:min-h-0";

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
