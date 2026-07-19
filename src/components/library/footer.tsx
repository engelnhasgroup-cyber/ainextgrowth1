'use client'

import { useState } from 'react'
import { Sparkles, Heart, Globe, Search, Bot, FileText, Link2, Mail, TrendingUp, Users, Download, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { WhatsAppFooterSection } from './whatsapp-subscribe'
import { toast } from 'sonner'
import type { CategoryInfo } from '@/lib/types'
import { useLibrary } from './store'
import { formatCompact } from './stats-bar'

export function Footer({
  categories,
  totalItems,
  totalDownloads,
}: {
  categories: CategoryInfo[]
  totalItems: number
  totalDownloads?: number
}) {
  const setFilterCategory = useLibrary((s) => s.setFilterCategory)
  const setFilterType = useLibrary((s) => s.setFilterType)
  const openLegal = useLibrary((s) => s.openLegal)
  const setDashboardOpen = useLibrary((s) => s.setDashboardOpen)
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const goCategory = (slug: string) => {
    setFilterCategory(slug)
    setFilterType('all')
    setTimeout(() => document.getElementById('library')?.scrollIntoView({ behavior: 'smooth' }), 50)
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email')
      return
    }
    setSubscribed(true)
    toast.success('Subscribed! You\'ll get weekly trending prompts.')
    setEmail('')
    setTimeout(() => setSubscribed(false), 3000)
  }

  const socialStats = [
    { icon: FileText, label: 'Prompts & Skills', value: formatCompact(totalItems) },
    { icon: Download, label: 'Downloads', value: formatCompact(totalDownloads || 0) },
    { icon: TrendingUp, label: 'Daily Generated', value: '200' },
    { icon: Users, label: 'Categories', value: String(categories.length) },
  ]

  return (
    <footer className="mt-auto border-t border-border/60 bg-card/40">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        {/* SEO content block */}
        <div className="mb-10 grid gap-8 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="mb-3 flex items-center gap-2.5">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-emerald-500 to-violet-600">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="text-base font-bold">
                Nexus<span className="text-gradient">AI</span> 2026
              </span>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              The world&apos;s largest autonomous AI Prompt &amp; Skill Library. An AI agent swarm
              generates 200 fresh, trending items daily — each shipped as a Trinity Bundle
              (Prompt + Workflow + Audience) downloadable as Markdown. Built for{' '}
              <strong className="text-foreground">SEO</strong>,{' '}
              <strong className="text-foreground">GEO</strong> (Generative Engine Optimization),
              and <strong className="text-foreground">AEO</strong> (Answer Engine Optimization).
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {['SEO','GEO','AEO','SGE','E-E-A-T','Core Web Vitals','Mobile-First','Schema.org'].map((t) => (
                <span key={t} className="rounded-md bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">{t}</span>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-foreground">
              <Globe className="h-3.5 w-3.5" /> Categories
            </p>
            <ul className="space-y-1.5 text-sm">
              {categories.map((c) => (
                <li key={c.id}>
                  <button
                    onClick={() => goCategory(c.slug)}
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    {c.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-foreground">
              <Search className="h-3.5 w-3.5" /> Explore
            </p>
            <ul className="space-y-1.5 text-sm">
              <li><a href="#trending" className="text-muted-foreground hover:text-primary">Trending Today</a></li>
              <li><a href="#library" className="text-muted-foreground hover:text-primary">Full Library</a></li>
              <li><a href="#agent" className="text-muted-foreground hover:text-primary">AI Agent Swarm</a></li>
              <li><a href="#categories" className="text-muted-foreground hover:text-primary">All Categories</a></li>
            </ul>
          </div>

          <div>
            <p className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-foreground">
              <FileText className="h-3.5 w-3.5" /> Resources
            </p>
            <ul className="space-y-1.5 text-sm">
              <li><button onClick={() => openLegal('about')} className="text-muted-foreground transition-colors hover:text-primary">About Us</button></li>
              <li><button onClick={() => openLegal('privacy')} className="text-muted-foreground transition-colors hover:text-primary">Privacy Policy</button></li>
              <li><button onClick={() => openLegal('terms')} className="text-muted-foreground transition-colors hover:text-primary">Terms of Service</button></li>
              <li><button onClick={() => openLegal('contact')} className="text-muted-foreground transition-colors hover:text-primary">Contact</button></li>
              <li><button onClick={() => setDashboardOpen(true)} className="text-muted-foreground transition-colors hover:text-primary">Dashboard</button></li>
              <li><a href="/rss.xml" target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-colors hover:text-primary">RSS Feed</a></li>
              <li><a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-colors hover:text-primary">Sitemap</a></li>
            </ul>
          </div>
        </div>

        {/* WhatsApp Newsletter + social proof */}
        <WhatsAppFooterSection />

        {/* Social proof stats */}
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {socialStats.map((s) => (
            <div key={s.label} className="rounded-xl border border-border/40 bg-background/40 p-2.5 text-center">
              <s.icon className="mx-auto mb-1 h-3.5 w-3.5 text-primary" />
              <div className="text-base font-bold tabular-nums">{s.value}</div>
              <div className="truncate text-[9px] text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>

        {/* backlink / GEO strategy note */}
        <div className="mb-6 rounded-2xl border border-border/60 bg-background/40 p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <Link2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <div>
                <p className="text-sm font-semibold">Backlink Strategy</p>
                <p className="text-xs text-muted-foreground">
                  Every downloaded .md file includes an attribution footer linking back to ainextgrowth.
                  Share bundles on GitHub, Discord &amp; Slack to grow organic high-DA backlinks.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Bot className="h-3.5 w-3.5 text-primary" />
              {totalItems.toLocaleString()} indexed items
            </div>
          </div>
        </div>

        {/* bottom bar */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-border/60 pt-6 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} ainextgrowth. All prompts &amp; skills are free to download
            and distribute with attribution.
          </p>
          <p className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            Built with <Heart className="h-3 w-3 fill-rose-500 text-rose-500" /> using Next.js 16 ·
            Tailwind CSS · Prisma · z-ai-web-dev-sdk
          </p>
        </div>
      </div>
    </footer>
  )
}
