import type { Metadata } from "next";
import { Bodoni_Moda, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Roundup — Curated Top-10 Lists & Tool Picks",
  description:
    "Hand-picked, ranked listicles: the best tools, apps and tactics for SEO, productivity, web development and design. The shortlist, done for you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bodoni.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-paper text-ink">
        {/* Full white background, wide centered content — no framed margin. */}
        <div className="mx-auto w-full max-w-[88rem]">{children}</div>
        <Analytics />
      </body>
    </html>
  );
}
