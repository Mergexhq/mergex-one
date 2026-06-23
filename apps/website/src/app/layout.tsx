import type { Metadata } from "next";
import {
  Manrope,
  Playfair_Display,
  Roboto,
} from "next/font/google";

import "./globals.css";
import LayoutShell from "@/components/LayoutShell";

/* ─────────────────────────────────────────────────────────────────────
   Fonts
   Note: Great Vibes is decorative - keep here only if used globally.
   If only used in one component, move it there to avoid loading it
   on every page unnecessarily.
───────────────────────────────────────────────────────────────────── */
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
  display: "swap",
});

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
});

/* ─────────────────────────────────────────────────────────────────────
   Site URL
   Uses env variable in staging/preview - falls back to production.
   Set NEXT_PUBLIC_SITE_URL in your .env.local for local dev if needed.
───────────────────────────────────────────────────────────────────── */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://mergex.in";

/* ─────────────────────────────────────────────────────────────────────
   Metadata
   OG image must be a public URL path - never a local disk path.
   Place og-cover.jpg inside /public/ and reference as "/og-cover.jpg".
───────────────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "The MergeX Company",
    template: "%s - The MergeX Company",
  },

  description:
    "MergeX identifies and fixes the exact factor stopping business growth. A consulting-first scaling company.",

  keywords: [
    "MergeX",
    "The MergeX Company",
    "Business Scaling",
    "Diagnostic Consulting",
    "Scaling Systems",
    "Business Infrastructure",
    "Operational Clarity",
    "S.C.A.L.E Methodology",
    "Brand Systems",
    "Technology Systems",
    "Sales Systems",
  ],

  authors: [{ name: "The MergeX Company", url: siteUrl }],
  creator: "The MergeX Company",
  publisher: "The MergeX Company",

  /* ── Open Graph ──────────────────────────────────────────────────
     Used by LinkedIn, WhatsApp, Facebook, Slack previews.
     og-cover.jpg must be in /public/og-cover.jpg - 1200×630px.
  ─────────────────────────────────────────────────────────────── */
  openGraph: {
    title: "The MergeX Company",
    description:
      "Most businesses don't fail from lack of effort. They fail because they're solving the wrong problem.",
    url: siteUrl,
    siteName: "The MergeX Company",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-cover.jpg",       // → resolves to https://mergex.in/og-cover.jpg
        width: 1200,
        height: 630,
        alt: "The MergeX Company | Diagnosis before everything.",
      },
    ],
  },

  /* ── Twitter / X Card ────────────────────────────────────────── */
  twitter: {
    card: "summary_large_image",
    title: "The MergeX Company",
    description:
      "Most businesses don't fail from lack of effort. They fail because they're solving the wrong problem.",
    images: ["/og-cover.jpg"],
  },

  /* ── Robots ─────────────────────────────────────────────────── */
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  /* ── Canonical ───────────────────────────────────────────────── */
  alternates: {
    canonical: siteUrl,
  },

  /* ── Favicons ────────────────────────────────────────────────── */
  icons: {
    icon: [
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "manifest", url: "/favicon/site.webmanifest" },
    ],
  },
};

/* ─────────────────────────────────────────────────────────────────────
   Root Layout
───────────────────────────────────────────────────────────────────── */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning            // ← prevents hydration mismatch from theme systems
      className={`
        ${manrope.variable}
        ${playfair.variable}
        ${roboto.variable}
        h-full
        scroll-smooth
        antialiased
      `}
    >
      <head>
        {/* Clash Display - not on Google Fonts, loaded via Fontshare CDN */}
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://api.fontshare.com" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap"
        />

        {/* Theme color - matches your background token for mobile browser chrome */}
        <meta name="theme-color" content="#080808" />
      </head>

      <body
        className="
          min-h-full
          bg-background
          font-body
          text-foreground
          overflow-x-hidden
          selection:bg-purple-500/20
          selection:text-foreground
        "
      >
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
