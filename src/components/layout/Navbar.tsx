"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Container } from "@/components/ui";
import { Whatsapp } from "@/components/ui/icons";

const menu = [
  { label: "Beranda", href: "#" },
  { label: "Layanan", href: "#layanan" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Harga", href: "#harga" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,color,box-shadow,backdrop-filter] duration-300 ${
        scrolled
          ? "bg-white/95 text-ink shadow-[0_1px_0_0_var(--color-line)] backdrop-blur-md"
          : "bg-transparent text-white"
      }`}
    >
      <Container className="flex h-18 items-center justify-between">
        <Link href="/" aria-label="webdev.co.id" className="relative block h-8 w-35.5">
          <Image
            src="/brand/logo-white.svg"
            alt=""
            fill
            priority
            className={`object-contain transition-opacity duration-300 ${scrolled ? "opacity-0" : "opacity-100"}`}
          />
          <Image
            src="/brand/logo-gradient.svg"
            alt="webdev.co.id"
            fill
            className={`object-contain transition-opacity duration-300 ${scrolled ? "opacity-100" : "opacity-0"}`}
          />
        </Link>

        <nav
          className={`hidden items-center gap-8 text-[14px] font-medium md:flex ${
            scrolled ? "text-ink" : "text-white/85"
          }`}
        >
          {menu.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`transition-colors ${scrolled ? "hover:text-primary" : "hover:text-white"}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="#konsultasi"
          className={`border-gradient-accent inline-flex h-10 items-center gap-2 rounded-full px-4 text-[14px] font-medium ${
            scrolled ? "hover:bg-ink/5" : "hover:bg-black/20"
          }`}
        >
          <Whatsapp className="size-5" />
          Konsultasi Gratis
        </Link>
      </Container>
    </header>
  );
}
