import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://nexusai2026.example.com";
const SITE_NAME = "NexusAI 2026";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "NexusAI 2026 — The Largest AI Prompt & Skill Library (Trinity Bundles)",
    template: "%s | NexusAI 2026",
  },
  description:
    "The world's largest autonomous AI Prompt & Skill Library for 2026. 200 fresh trending prompts & skills generated daily by an AI agent. Download the Trinity Bundle (Prompt + Workflow + Audience) as Markdown. Built for SEO, GEO & AEO.",
  keywords: [
    "AI prompts 2026",
    "prompt engineering library",
    "AI skills library",
    "ChatGPT prompts",
    "Claude prompts",
    "GPT-5 prompts",
    "agentic workflow prompts",
    "prompt download markdown",
    "AI agent skills",
    "neuro-prompting",
    "SEO prompts",
    "marketing AI prompts",
  ],
  authors: [{ name: "NexusAI Team" }],
  creator: "NexusAI 2026",
  publisher: "NexusAI 2026",
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
  alternates: {
    canonical: "/",
    types: {
      'application/rss+xml': "https://nexusai2026.example.com/rss.xml",
    },
  },
  sitemap: "https://nexusai2026.example.com/sitemap.xml",
  openGraph: {
    title: "NexusAI 2026 — The Largest AI Prompt & Skill Library",
    description:
      "Autonomous AI agent generates 200 trending prompts & skills daily. Download Trinity Bundles as Markdown. Optimized for SEO, GEO & AEO.",
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "NexusAI 2026 — AI Prompt & Skill Library",
    description:
      "200 trending AI prompts & skills generated daily. Trinity Bundles as Markdown. SEO + GEO + AEO optimized.",
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0f" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
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
