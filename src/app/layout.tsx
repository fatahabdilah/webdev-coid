import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  /* Medium is the heaviest weight for headings and copy; SemiBold exists only for
     the Button primitive, so calls to action carry more weight than the text around them */
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "webdev.co.id | Agency lokal, standar global",
  description:
    "Website profesional untuk bisnis yang ingin berkembang. Kami bikin website cepat dan berkualitas, dirancang khusus sesuai kebutuhan bisnis kamu.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className={`${dmSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
