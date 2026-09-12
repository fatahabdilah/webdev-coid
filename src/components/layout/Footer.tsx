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

/* One column, not three. The old "Layanan" column listed five services that all led to
   the same two anchors -- twelve rows for five destinations -- which is padding, not
   navigation. On a single-page site the footer only needs to name the sections. */
const links: { label: string; href: string }[] = [
  { label: "Cara Kerja", href: "#cara-kerja" },
  { label: "Layanan", href: "#layanan" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Harga", href: "#harga" },
  { label: "Konsultasi Gratis", href: "#konsultasi" },
];

const socials = [
  { label: "Instagram", icon: Instagram, href: INSTAGRAM },
  { label: "LinkedIn", icon: Linkedin, href: LINKEDIN },
];

export default function Footer() {
  return (
    <footer className="bg-surface text-white">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-[1.6fr_1fr]">
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

          {/* Roomier rows on phones: as bare inline text these links were 18px tall and
              stacked close together, which is a mis-tap waiting to happen. They tighten
              back up from md, where there is a pointer. */}
          <ul className="flex flex-col md:gap-3">
            {links.map((link) => (
              <li key={link.label}>
                <FooterLink href={link.href}>{link.label}</FooterLink>
              </li>
            ))}
          </ul>
        </div>

        {/* The second line here used to restate the tagline sitting a few rows above it,
            so only the copyright remains. */}
        <div className="mt-12 border-t border-white/10 pt-6 text-[14px] leading-[1.55] text-on-dark-muted">
          <p>© 2026 webdev.co.id. Semua hak dilindungi.</p>
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
