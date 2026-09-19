import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui";
import { INSTAGRAM, WHATSAPP } from "@/lib/contact";
import { Instagram, Whatsapp } from "@/components/ui/icons";

/* Every way to reach us in one list -- the social profile sits alongside WhatsApp rather
   than in a column of its own, since both answer the same question. Labels carry the real
   number or handle, so they can be read without clicking.

   The number is shown in local form: 6282... is what wa.me needs, but 0822... is what an
   Indonesian reader recognises as a phone number. */
const contacts = [
  { label: "0822 5809 6886", icon: Whatsapp, href: `https://wa.me/${WHATSAPP}` },
  { label: "@webdev.co.id", icon: Instagram, href: INSTAGRAM },
];

/* In-page destinations, matching the navbar. Keep in step with `menu` in Navbar.tsx. */
const links: { label: string; href: string }[] = [
  { label: "Beranda", href: "#beranda" },
  { label: "Layanan", href: "#layanan" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Harga", href: "#harga" },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-white text-ink">
      <Container className="py-14">
        {/* Brand on the left, then the page links, then every way to reach us in one
            column -- socials and contacts read as one list, since both answer "how do I
            get hold of them". */}
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1.2fr] md:gap-12">
          <div className="max-w-[320px]">
            <Link href="#beranda" aria-label="webdev.co.id" className="relative block h-7 w-34.25">
              <Image src="/brand/logo-ink.svg" alt="webdev.co.id" fill className="object-contain object-left" />
            </Link>
            <p className="mt-5 text-[14px] leading-[1.55] text-body">
              Agensi web development di Indonesia. Kami bantu bisnis tampil profesional secara online, dari desain
              sampai tayang.
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
                    /* No destination yet. Shown, but plainly inert, so the row does not
                       silently vanish and it stays obvious what is still missing. */
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
