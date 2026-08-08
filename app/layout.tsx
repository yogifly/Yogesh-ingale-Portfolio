import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { LenisProvider } from "@/components/providers/lenis-provider";
import { Cursor } from "@/components/effects/cursor";
import { NoiseOverlay } from "@/components/effects/noise-overlay";
import { GridBackground } from "@/components/effects/grid-background";
import { ScrollProgress } from "@/components/effects/scroll-progress";
import { BackToTop } from "@/components/effects/back-to-top";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { LoadingScreen } from "@/components/effects/loading-screen";
import { CommandPalette } from "@/components/command-palette";
import { ShortcutsManager } from "@/components/shortcuts-manager";
import { siteConfig } from "@/lib/content";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  weight: ["400", "500", "600"],
});

const sans = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "500", "600"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains",
  weight: ["400", "500"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://yogeshingle1502.me";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteConfig.name} — ${siteConfig.role}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.tagline,
  keywords: [
    "Software Developer",
    "Backend Engineer",
    "AI/ML Engineer",
    "Python",
    "FastAPI",
    "LangChain",
    "RAG",
    "portfolio",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: `${siteConfig.name} — ${siteConfig.role}`,
    description: siteConfig.tagline,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.role}`,
    description: siteConfig.tagline,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#050816",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-[#050816] text-white antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-[#0EA5E9] focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <ThemeProvider>
          <LenisProvider>
            <LoadingScreen />
            <NoiseOverlay />
            <GridBackground />
            <Cursor />
            <ScrollProgress />
            <SiteHeader />
            <main id="main" className="relative">
              {children}
            </main>
            <SiteFooter />
            <BackToTop />
            <CommandPalette />
            <ShortcutsManager />
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}