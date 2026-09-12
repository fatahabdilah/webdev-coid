import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui";
import { Instagram, Mail, Whatsapp } from "@/components/ui/icons";

/* Off-site destinations in one place, so a change lands everywhere at once.

   TODO: fill these in before launch. They are deliberately left empty rather than
   guessed: a made-up handle, number or address renders as a working link and would ship
   unnoticed, while an empty one is visibly unfinished. Each row below is only rendered
   once its destination exists, so nothing pretends to be clickable.

   WHATSAPP is the number in international form without "+" or spaces (e.g. 6281234567890);
   it is also what every "Konsultasi Gratis" button on the page should eventually point at,
   instead of the #konsultasi anchor they use now. */
const WHATSAPP = "";
const EMAIL = "";
const INSTAGRAM = "";

/* The same four destinations as the navbar, in the same order, so the two agree on what
   the site is made of. Keep this list in step with `menu` in Navbar.tsx. */
const links: { label: string; href: string }[] = [
  { label: "Beranda", href: "#beranda" },
  { label: "Layanan", href: "#layanan" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Harga", href: "#harga" },
];

/* Contact rows: an icon, a label, and the real destination behind it. Shown as text
   rather than bare icons so the number and address can be read without clicking. */
const contacts = [
  { label: "WhatsApp", icon: Whatsapp, href: WHATSAPP ? `https://wa.me/${WHATSAPP}` : "" },
  { label: "Email", icon: Mail, href: EMAIL ? `mailto:${EMAIL}` : "" },
  { label: "Instagram", icon: Instagram, href: INSTAGRAM },
];

export default function Footer() {
  return (
    <footer className="bg-white text-ink">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-[1.6fr_1fr_1fr]">
          <div className="max-w-[320px]">
            <Link href="/" aria-label="webdev.co.id" className="relative block h-8 w-38.75">
              <Image src="/brand/logo-ink.svg" alt="webdev.co.id" fill className="object-contain object-left" />
            </Link>
            <p className="mt-5 text-[16px] leading-[1.6] font-medium">Agency lokal, standar global.</p>
            <p className="mt-2 text-[14px] leading-[1.55] text-body">
              Agensi web development di Indonesia. Kami bantu brand baru, startup, perusahaan, dan institusi
              tampil profesional secara online.
            </p>
          </div>

          <div>
            <p className="text-[14px] leading-[1.55] font-medium">Jelajahi</p>
            {/* Roomier rows on phones: as bare inline text these links were 18px tall and
                stacked close together, which is a mis-tap waiting to happen. They tighten
                back up from md, where there is a pointer. */}
            <ul className="mt-2 flex flex-col md:mt-4 md:gap-3">
              {links.map((link) => (
                <li key={link.label}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[14px] leading-[1.55] font-medium">Hubungi</p>
            <ul className="mt-2 flex flex-col md:mt-4 md:gap-3">
              {contacts.map(({ label, icon: Icon, href }) => (
                <li key={label}>
                  {href ? (
                    <FooterLink href={href}>
                      <Icon className="size-4 shrink-0" />
                      {label}
                    </FooterLink>
                  ) : (
                    /* No destination yet. Shown, but dimmed and inert, so the column does
                       not silently vanish and it stays obvious what is still missing. */
                    <span className="flex min-h-11 items-center gap-2 text-[14px] leading-[1.55] text-muted md:min-h-0">
                      <Icon className="size-4 shrink-0" />
                      {label}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* The second line here used to restate the tagline sitting a few rows above it,
            so only the copyright remains. */}
        <div className="mt-12 border-t border-line pt-6 text-[14px] leading-[1.55] text-muted">
          <p>© 2026 webdev.co.id. Semua hak dilindungi.</p>
        </div>
      </Container>
    </footer>
  );
}

/* One row in a footer column. Off-site destinations open in a new tab; in-page anchors
   stay in this tab. mailto: counts as off-site but must NOT get target="_blank" -- that
   leaves an empty tab behind once the mail client takes over. The colour change is the
   only movement: rows sliding on hover would make the footer restless. */
function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  const newTab = href.startsWith("http");
  const sameTabExternal = href.startsWith("mailto:");
  const className =
    "flex min-h-11 items-center gap-2 text-[14px] leading-[1.55] text-body transition-colors duration-200 hover:text-ink md:min-h-0";

  if (newTab || sameTabExternal) {
    return (
      <a href={href} className={className} {...(newTab && { target: "_blank", rel: "noreferrer" })}>
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
