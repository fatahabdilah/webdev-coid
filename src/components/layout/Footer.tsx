import Image from "next/image";
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
      <Container className="py-10">
        {/* The CTA section above already makes the argument, so the footer signs off and
            stays reachable: who we are on the left, where to go and how to reach us in two
            columns on the right. */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
          {/* The description rides with the wordmark rather than sitting in its own block:
              it says who we are, which belongs next to the name, not above the nav. */}
          <div className="max-w-[340px] shrink-0">
            <Link href="#beranda" aria-label="webdev.co.id" className="relative block h-7 w-34.25">
              <Image src="/brand/logo-ink.svg" alt="webdev.co.id" fill className="object-contain object-left" />
            </Link>
            <p className="mt-4 text-[14px] leading-[1.55] text-body">
              Agensi web development di Indonesia. Kami bantu brand baru, startup, perusahaan, dan institusi
              tampil profesional secara online.
            </p>
          </div>

          {/* Two stacked columns. Roomier rows on phones: as bare inline text these links
              were 18px tall and stacked close together, which is a mis-tap waiting to
              happen. They tighten back up from lg, where there is a pointer. */}
          <div className="flex flex-col gap-8 sm:flex-row sm:gap-16 lg:gap-20">
            <div>
              <p className="text-[14px] leading-[1.55] font-medium">Jelajahi</p>
              <ul className="mt-1 flex flex-col lg:mt-3 lg:gap-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <FooterLink href={link.href}>{link.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-[14px] leading-[1.55] font-medium">Hubungi</p>
              <ul className="mt-1 flex flex-col lg:mt-3 lg:gap-2">
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
              </ul>
            </div>
          </div>
        </div>

        <p className="mt-8 border-t border-line pt-6 text-[14px] leading-[1.55] text-muted">
          © 2026 webdev.co.id. Semua hak dilindungi.
        </p>
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
