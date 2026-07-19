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

// Dynamic metadata — fetches AdminSetting from DB for verification codes
export async function generateMetadata(): Promise<Metadata> {
  const settings = await getAdminSettings();
  const siteUrl = settings.siteUrl || "https://nexusai2026.example.com";
  const siteName = settings.siteName || "NexusAI 2026";

  const other: Record<string, string> = {};
  if (settings.adsenseClientId) {
    other["google-adsense-account"] = settings.adsenseClientId;
  }
  if (settings.googleVerificationCode) {
    other["google-site-verification"] = settings.googleVerificationCode;
  }
  if (settings.bingVerificationCode) {
    other["msvalidate.01"] = settings.bingVerificationCode;
  }

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: `${siteName} — The Largest AI Prompt & Skill Library (Trinity Bundles)`,
      template: `%s | ${siteName}`,
    },
    description:
      "The world's largest autonomous AI Prompt & Skill Library for 2026. 200 fresh trending prompts & skills generated daily by an AI agent. Download the Trinity Bundle (Prompt + Workflow + Audience) as Markdown. Built for SEO, GEO & AEO.",
    keywords: [
      "AI prompts 2026", "prompt engineering library", "AI skills library",
      "ChatGPT prompts", "Claude prompts", "GPT-5 prompts",
      "agentic workflow prompts", "prompt download markdown",
      "AI agent skills", "neuro-prompting", "SEO prompts", "marketing AI prompts",
    ],
    authors: [{ name: `${siteName} Team` }],
    creator: siteName,
    publisher: siteName,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true, follow: true,
        "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1,
      },
    },
    alternates: {
      canonical: "/",
      types: { 'application/rss+xml': `${siteUrl}/rss.xml` },
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    openGraph: {
      title: `${siteName} — The Largest AI Prompt & Skill Library`,
      description: "Autonomous AI agent generates 200 trending prompts & skills daily. Download Trinity Bundles as Markdown. Optimized for SEO, GEO & AEO.",
      url: siteUrl, siteName, type: "website", locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: `${siteName} — AI Prompt & Skill Library`,
      description: "200 trending AI prompts & skills generated daily. Trinity Bundles as Markdown. SEO + GEO + AEO optimized.",
    },
    category: "technology",
    other: Object.keys(other).length > 0 ? other : undefined,
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getAdminSettings();

  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Google AdSense loader — dynamic client ID from AdminSetting */}
        {settings.adsenseClientId && settings.adsenseClientId !== 'ca-pub-XXXXXXXXXXXXXXXX' && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${settings.adsenseClientId}`}
            crossOrigin="anonymous"
          />
        )}
        {/* Google Analytics — dynamic ID from AdminSetting */}
        {settings.googleAnalyticsId && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${settings.googleAnalyticsId}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '${settings.googleAnalyticsId}');`,
              }}
            />
          </>
        )}
        {/* Bing verification */}
        {settings.bingVerificationCode && (
          <meta name="msvalidate.01" content={settings.bingVerificationCode} />
        )}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground min-h-screen`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
