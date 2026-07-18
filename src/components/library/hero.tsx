'use client'

import { Sparkles, ArrowRight, Zap, Bot, ShieldCheck, FileText, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { StatsBar, type Stats } from './stats-bar'
import { TrendingTicker } from './trending-ticker'
import { motion } from 'framer-motion'

const FLOATING_BADGES = [
  { icon: FileText, label: 'Prompt', color: '#10b981', top: '12%', left: '6%', delay: 0 },
  { icon: Sparkles, label: 'Skill', color: '#8b5cf6', top: '68%', left: '4%', delay: 0.4 },
  { icon: Download, label: 'Workflow', color: '#f59e0b', top: '20%', left: '90%', delay: 0.2 },
  { icon: ShieldCheck, label: 'E-E-A-T', color: '#06b6d4', top: '74%', left: '92%', delay: 0.6 },
]

export function Hero({ stats }: { stats: Stats }) {
  return (
    <section className="relative overflow-hidden border-b border-border/60">
      <div className="absolute inset-0 bg-grid opacity-60" />
      <div className="absolute inset-0 bg-radial-glow" />

      {/* Animated gradient orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 60, 0],
            y: [0, -40, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -50, 0],
            y: [0, 30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute -right-20 top-40 h-80 w-80 rounded-full bg-violet-500/10 blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, 40, 0],
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
          className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-amber-500/8 blur-3xl"
        />
      </div>

      {/* Floating decorative badges (desktop only) */}
      <div className="pointer-events-none absolute inset-0 hidden lg:block">
        {FLOATING_BADGES.map((b, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 + b.delay }}
            className="absolute flex items-center gap-1.5 rounded-full border border-border/60 bg-card/70 px-3 py-1.5 text-[11px] font-semibold backdrop-blur"
            style={{ top: b.top, left: b.left }}
          >
            <motion.span
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3 + i, repeat: Infinity, ease: 'easeInOut', delay: b.delay }}
              className="flex items-center gap-1.5"
            >
              <b.icon className="h-3 w-3" style={{ color: b.color }} />
              <span style={{ color: b.color }}>{b.label}</span>
            </motion.span>
          </motion.div>
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/60 px-3.5 py-1.5 text-xs font-medium backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Autonomous AI Agent live · 200 fresh items generated daily
          </div>

          <h1 className="text-balance text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            The Largest <span className="text-gradient">AI Prompt &amp; Skill</span>
            <br className="hidden sm:block" /> Library for{' '}
            <span className="text-gradient-amber">2026</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">
            Millions of neuro-engineered prompts and agentic skills — curated and generated daily
            by an autonomous 20-agent swarm. Every item ships as a{' '}
            <strong className="text-foreground">Trinity Bundle</strong>: the prompt, the workflow,
            and the target audience — downloadable as Markdown.
          </p>

          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" className="btn-press h-12 rounded-full px-7 text-base glow-emerald" asChild>
              <a href="#trending">
                <Zap className="mr-2 h-4 w-4" />
                Explore Trending Today
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="btn-press h-12 rounded-full px-7 text-base"
              asChild
            >
              <a href="#agent">
                <Bot className="mr-2 h-4 w-4" />
                Meet the AI Agent
              </a>
            </Button>
          </div>

          {/* Trust indicators row */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[11px] text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              SEO · GEO · AEO Optimized
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
              Reviewed by Editorial Team
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              USA · UK · CA · AU Markets
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mx-auto mt-10 max-w-4xl"
        >
          <StatsBar stats={stats} />
        </motion.div>
      </div>

      <TrendingTicker />
    </section>
  )
}
