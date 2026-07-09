import type { Metadata } from "next";
import { Bodoni_Moda, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import {
  SITE_URL,
  SITE_NAME,
  OG_IMAGE,
  OG_IMAGE_ALT,
} from "@/app/lib/seo";
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

const SITE_DESCRIPTION =
  "The Pick Post curates top-10 lists, roundups and tool picks — the best tools, apps and tactics for SEO, productivity, web development and design, ranked.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "The Pick Post — Curated Top-10 Lists, Roundups & Tool Picks",
    template: "%s | The Pick Post",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "top 10",
    "best tools",
    "roundups",
    "curated lists",
    "reviews",
    "picks",
    "listicles",
    "tool picks",
  ],
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    url: SITE_URL,
    locale: "en_US",
    title: "The Pick Post — Curated Top-10 Lists, Roundups & Tool Picks",
    description: SITE_DESCRIPTION,
    images: [
      { url: OG_IMAGE, width: 1200, height: 630, alt: OG_IMAGE_ALT },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Pick Post — Curated Top-10 Lists, Roundups & Tool Picks",
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
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
