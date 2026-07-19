import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { getAdminSettings } from "@/lib/admin-settings";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getAdminSettings();
  const siteUrl = settings.siteUrl || "https://ainextgrowth.com";
  const siteName = settings.siteName || "ainextgrowth";

  const other: Record<string, string> = {};
  if (settings.adsenseClientId) other["google-adsense-account"] = settings.adsenseClientId;
  if (settings.googleVerificationCode) other["google-site-verification"] = settings.googleVerificationCode;
  if (settings.bingVerificationCode) other["msvalidate.01"] = settings.bingVerificationCode;

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: `${siteName} — The 2026 Autonomous AI Prompt & Skill Ecosystem`,
      template: `%s | ${siteName}`,
    },
    description:
      "ainextgrowth is the world's largest autonomous AI Prompt & Skill Ecosystem for 2026. 200 fresh trending prompts, skills & workflows generated daily by an AI agent swarm. Download Trinity Bundles as Markdown. Built for SEO, GEO & AEO.",
    keywords: [
      "ainextgrowth", "AI prompts 2026", "prompt engineering library",
      "AI skills library", "ChatGPT prompts", "Claude prompts", "GPT-5 prompts",
      "agentic workflow prompts", "AI agent skills", "neuro-prompting",
    ],
    authors: [{ name: "ainextgrowth Team" }],
    creator: siteName,
    publisher: siteName,
    robots: {
      index: true, follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
    },
    alternates: {
      canonical: "/",
      types: { 'application/rss+xml': `${siteUrl}/rss.xml` },
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    openGraph: {
      title: `${siteName} — The 2026 Autonomous AI Prompt & Skill Ecosystem`,
      description: "200 trending prompts & skills generated daily. Download Trinity Bundles. SEO + GEO + AEO optimized.",
      url: siteUrl, siteName, type: "website", locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: `${siteName} — AI Prompt & Skill Ecosystem`,
      description: "200 trending AI prompts & skills generated daily. Trinity Bundles as Markdown.",
    },
    category: "technology",
    other: Object.keys(other).length > 0 ? other : undefined,
    icons: {
      icon: "/favicon.svg",
      apple: "/favicon.svg",
    },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0f" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const settings = await getAdminSettings();

  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        {settings.adsenseClientId && settings.adsenseClientId !== 'ca-pub-XXXXXXXXXXXXXXXX' && (
          <script async src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${settings.adsenseClientId}`} crossOrigin="anonymous" />
        )}
        {settings.googleAnalyticsId && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${settings.googleAnalyticsId}`} />
            <script dangerouslySetInnerHTML={{ __html: `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '${settings.googleAnalyticsId}');` }} />
          </>
        )}
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground min-h-screen`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
