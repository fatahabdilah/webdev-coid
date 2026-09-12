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
    <footer className="border-t border-line bg-white text-ink">
      <Container className="py-10">
        {/* One band rather than a block of columns: the CTA section above already makes
            the argument, so the footer signs off and stays reachable. Everything sits on
            one line from lg, and stacks in reading order below that. */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
          {/* The description rides with the wordmark rather than sitting in its own block:
              it says who we are, which belongs next to the name, not above the nav. */}
          <div className="max-w-[340px] shrink-0">
            <Link href="#beranda" aria-label="webdev.co.id" className="relative block h-7 w-33.5">
              <Image src="/brand/logo-ink.svg" alt="webdev.co.id" fill className="object-contain object-left" />
            </Link>
            <p className="mt-4 text-[14px] leading-[1.55] text-body">
              Agensi web development di Indonesia. Kami bantu brand baru, startup, perusahaan, dan institusi
              tampil profesional secara online.
            </p>
          </div>

          {/* Roomier rows on phones: as bare inline text these links were 18px tall and
              stacked close together, which is a mis-tap waiting to happen. They tighten
              back up from lg, where there is a pointer and they sit on one line. */}
          <ul className="flex flex-col lg:flex-row lg:items-center lg:gap-8 lg:pt-1">
            {links.map((link) => (
              <li key={link.label}>
                <FooterLink href={link.href}>{link.label}</FooterLink>
              </li>
            ))}
          </ul>

          <ul className="flex flex-wrap gap-x-3 gap-y-2 lg:shrink-0 lg:justify-end">
            {contacts.map(({ label, icon: Icon, href }) =>
              href ? (
                <li key={label}>
                  <ContactPill href={href}>
                    <Icon className="size-4 shrink-0" />
                    {label}
                  </ContactPill>
                </li>
              ) : (
                /* No destination yet. Shown, but plainly inert, so the row does not
                   silently vanish and it stays obvious what is still missing. */
                <li
                  key={label}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-4 text-[14px] leading-[1.55] text-muted lg:min-h-0 lg:py-2"
                >
                  <Icon className="size-4 shrink-0" />
                  {label}
                </li>
              ),
            )}
          </ul>
        </div>

        <p className="mt-8 border-t border-line pt-6 text-[14px] leading-[1.55] text-muted">
          © 2026 webdev.co.id. Semua hak dilindungi.
        </p>
      </Container>
    </footer>
  );
}

/* A contact as a pill rather than a list row: there are only ever a few, and set side by
   side they read as the one thing to act on instead of a second column of links. */
function ContactPill({ href, children }: { href: string; children: React.ReactNode }) {
  const newTab = href.startsWith("http");
  return (
    <a
      href={href}
      className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-4 text-[14px] leading-[1.55] text-ink transition-colors duration-200 hover:border-ink hover:bg-offwhite md:min-h-0 md:py-2"
      {...(newTab && { target: "_blank", rel: "noreferrer" })}
    >
      {children}
    </a>
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
