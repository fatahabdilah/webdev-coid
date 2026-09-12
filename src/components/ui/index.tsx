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
  const variants: Record<ButtonVariant, string> = {
    primary: "bg-primary text-white hover:bg-primary-dark",
    secondary: "border border-primary text-primary hover:bg-primary/5",
    white: "bg-white text-ink hover:bg-offwhite",
    "outline-white": "border border-white/40 text-white hover:bg-white/10",
  };
  return (
    <Link
      href={href}
      className={`inline-flex h-12 items-center justify-center gap-2 rounded-lg px-6 text-[16px] leading-[1.6] font-semibold transition-colors ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
