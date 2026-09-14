import Link from "next/link";
import { Container } from "@/components/ui";
import { EMAIL, INSTAGRAM, WHATSAPP } from "@/lib/contact";
import { Instagram, Mail, Whatsapp } from "@/components/ui/icons";

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
      <Container className="py-14">
        {/* The columns and the copyright share one block, centred on the page as a group.
            Gathered rather than spread to the edges: the footer holds very little, and
            pushing the two groups apart would leave a lap of empty white between them. */}
        <div className="mx-auto w-fit">
          <div className="flex flex-col gap-10 sm:flex-row sm:gap-20 lg:gap-28">
            <FooterColumn title="Jelajahi">
            {links.map((link) => (
              <li key={link.label}>
                <FooterLink href={link.href}>{link.label}</FooterLink>
              </li>
            ))}
            </FooterColumn>

            <FooterColumn title="Hubungi">
            {contacts.map(({ label, icon: Icon, href }) => (
              <li key={label}>
                {href ? (
                  <FooterLink href={href}>
                    <Icon className="size-4 shrink-0" />
                    {label}
                  </FooterLink>
                ) : (
                  /* No destination yet. Shown, but plainly inert, so the row does not
                     silently vanish and it stays obvious what is still missing. */
                  <span className="flex min-h-11 items-center gap-2 text-[14px] leading-[1.55] text-muted lg:min-h-0">
                    <Icon className="size-4 shrink-0" />
                    {label}
                  </span>
                )}
              </li>
            ))}
            </FooterColumn>
          </div>

          {/* Left-aligned with the columns above rather than centred under them, so the
              footer keeps one left edge. */}
          <p className="mt-14 text-[14px] leading-[1.55] text-muted">© 2026 webdev.co.id. Semua hak dilindungi.</p>
        </div>
      </Container>
    </footer>
  );
}

/* A titled column. The heading is muted and the rows are ink -- the reverse of the usual
   weight, which keeps the label out of the way of the things you can actually click. */
function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[14px] leading-[1.55] text-muted">{title}</p>
      {/* Roomier rows on phones: as bare inline text these links were 18px tall and stacked
          close together, which is a mis-tap waiting to happen. They tighten back up from
          lg, where there is a pointer. */}
      <ul className="mt-1 flex flex-col lg:mt-3 lg:gap-2">{children}</ul>
    </div>
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
    "flex min-h-11 items-center gap-2 text-[14px] leading-[1.55] text-ink transition-opacity duration-200 ease-out hover:opacity-60 md:min-h-0";

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
