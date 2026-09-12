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

export function Button({
  href,
  variant = "primary",
  className = "",
  children,
}: {
  href: string;
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
}) {
  /* Hover has to be visible, not merely present: white to off-white is three points out
     of 255, which reads as nothing happening. Each variant now moves far enough to be
     felt, and the shadow lets the button lift rather than only change colour. */
  const variants: Record<ButtonVariant, string> = {
    primary: "bg-primary text-white hover:bg-primary-dark hover:shadow-[0_8px_20px_-8px_rgb(0_52_102/0.55)]",
    secondary: "border border-primary text-primary hover:border-primary-dark hover:bg-primary/10 hover:text-primary-dark",
    white: "bg-white text-ink hover:bg-[#e9eef6] hover:shadow-[0_8px_20px_-8px_rgb(0_20_50/0.45)]",
    "outline-white": "border border-white/40 text-white hover:border-white/70 hover:bg-white/15",
  };
  return (
    <Link
      href={href}
      /* Colour and a small lift on hover, a give on press. The press is the same gesture
         the send button in the showcase makes, so the whole page answers a tap the same
         way. -translate-y-px is the entire lift: any more and a row of buttons jitters. */
      className={`inline-flex h-12 items-center justify-center gap-2 rounded-lg px-6 text-[16px] leading-[1.6] font-semibold transition-[background-color,border-color,color,box-shadow,translate,scale] duration-200 ease-out hover:-translate-y-px active:translate-y-0 active:scale-[0.97] ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
