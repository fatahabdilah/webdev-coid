import Link from "next/link";
import type { ReactNode } from "react";

/* Layout primitives. Every section uses the same container width and vertical rhythm. */

export function Container({ className = "", children }: { className?: string; children: ReactNode }) {
  return <div className={`mx-auto w-full max-w-[1200px] px-6 lg:px-10 ${className}`}>{children}</div>;
}

export function Section({
  id,
  className = "",
  children,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`py-16 md:py-24 ${className}`}>
      {children}
    </section>
  );
}

export function Eyebrow({ children, tone = "light" }: { children: ReactNode; tone?: "light" | "dark" }) {
  const cls =
    tone === "dark"
      ? "bg-white/10 text-white"
      : "bg-primary/10 text-primary";
  return (
    <span className={`inline-flex items-center rounded-full px-3.5 py-1.5 text-[14px] leading-[1.55] font-medium ${cls}`}>
      {children}
    </span>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "light",
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  tone?: "light" | "dark";
}) {
  const center = align === "center";
  return (
    <div className={`flex flex-col ${center ? "items-center text-center" : "items-start text-left"}`}>
      {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
      <h2
        className={`mt-4 max-w-[680px] text-[26px] font-medium leading-[1.25] tracking-[-0.03em] md:text-[30px] ${
          tone === "dark" ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-4 max-w-[600px] text-base leading-[1.6] ${tone === "dark" ? "text-on-dark-body" : "text-body"}`}>
          {description}
        </p>
      )}
    </div>
  );
}

type ButtonVariant = "primary" | "secondary" | "white" | "outline-white";
type ButtonSize = "md" | "sm";

/* sm exists for the navbar, where a 48px button is too tall for a 72px bar. Same fill,
   radius and hover ring -- only the height, padding and type step down. */
const sizes: Record<ButtonSize, string> = {
  md: "h-12 px-6 text-[16px] leading-[1.6]",
  sm: "h-10 px-4 text-[14px] leading-[1.55]",
};

export function Button({
  href,
  variant = "primary",
  size = "md",
  className = "",
  children,
}: {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
}) {
  /* Filled buttons sit slightly proud of the page (btn-raised: navy-tinted shadow plus a
     highlight along the top edge) and settle into it when pressed. Outlined ones stay flat
     -- there is no face to catch the light -- and lean on colour alone.

     See btn-raised in globals.css for what the layers are doing. */
  const variants: Record<ButtonVariant, string> = {
    primary: "btn-raised active:btn-pressed bg-primary text-white hover:bg-primary-dark",
    secondary: "border border-primary text-primary hover:border-primary-dark hover:bg-primary/10 hover:text-primary-dark",
    white: "btn-raised-light active:btn-pressed bg-white text-ink hover:bg-line",
    "outline-white": "border border-white/40 text-white hover:border-white/70 hover:bg-white/15",
  };
  return (
    <Link
      href={href}
      /* Colour on hover, a small give on press. The press is the same gesture the send
         button in the showcase makes, so the whole page answers a tap the same way. */
      /* rounded-full, matching the pills, avatars and cards that shape the rest of the
         page -- rounded-lg made the buttons the one square thing on it. */
      className={`inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-[background-color,border-color,color,box-shadow,scale] duration-200 ease-out active:scale-[0.97] ${sizes[size]} ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
