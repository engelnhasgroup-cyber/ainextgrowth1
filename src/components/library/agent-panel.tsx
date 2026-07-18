'use client'

import { useState } from 'react'
import { Bot, Sparkles, Loader2, CheckCircle2, Cpu, Network, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import type { ItemSummary } from '@/lib/types'
import { useLibrary } from './store'

const AGENTS = [
  { n: 1, role: 'Trend Forecaster', phase: 'Research', color: '#10b981' },
  { n: 2, role: 'Niche Strategist', phase: 'Research', color: '#10b981' },
  { n: 3, role: 'SEO/AEO Architect', phase: 'Research', color: '#10b981' },
  { n: 4, role: 'Neuro-Prompt Engineer', phase: 'Generation', color: '#8b5cf6' },
  { n: 5, role: 'Workflow Architect', phase: 'Generation', color: '#8b5cf6' },
  { n: 6, role: 'Audience Analyst', phase: 'Generation', color: '#8b5cf6' },
  { n: 7, role: 'Internal Link Grapher', phase: 'Generation', color: '#8b5cf6' },
  { n: 8, role: 'UI/UX Visionary', phase: 'Frontend', color: '#06b6d4' },
  { n: 9, role: 'Next.js Developer', phase: 'Frontend', color: '#06b6d4' },
  { n: 10, role: 'Mobile Optimizer', phase: 'Frontend', color: '#06b6d4' },
  { n: 11, role: 'AdSense Strategist', phase: 'Frontend', color: '#06b6d4' },
  { n: 12, role: 'Database Architect', phase: 'Backend', color: '#f59e0b' },
  { n: 13, role: 'API & Edge Developer', phase: 'Backend', color: '#f59e0b' },
  { n: 14, role: 'Automation Scheduler', phase: 'Backend', color: '#f59e0b' },
  { n: 15, role: 'Schema Markup Engineer', phase: 'GEO/SEO', color: '#d946ef' },
  { n: 16, role: 'GEO Citation Optimizer', phase: 'GEO/SEO', color: '#d946ef' },
  { n: 17, role: 'Backlink Disseminator', phase: 'GEO/SEO', color: '#d946ef' },
  { n: 18, role: 'CI/CD Master', phase: 'DevOps', color: '#f43f5e' },
  { n: 19, role: 'Site Reliability Engineer', phase: 'DevOps', color: '#f43f5e' },
  { n: 20, role: 'QA & Compliance Tester', phase: 'DevOps', color: '#f43f5e' },
]

const PHASES = ['Research', 'Generation', 'Frontend', 'Backend', 'GEO/SEO', 'DevOps']

export function AgentPanel({
  todayGenerated,
  onGenerated,
}: {
  todayGenerated: number
  onGenerated?: (items: ItemSummary[]) => void
}) {
  const [busy, setBusy] = useState(false)
  const [lastRun, setLastRun] = useState<string | null>(null)
  const openDetail = useLibrary((s) => s.openDetail)

  const runAgent = async () => {
    setBusy(true)
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ count: 1 }),
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      const items = (data.items || []) as ItemSummary[]
      setLastRun(`Generated ${items.length} new ${data.type} in “${data.category}” about ${data.topic}`)
      toast.success(`Agent generated ${items.length} new item!`)
      if (items.length && onGenerated) onGenerated(items)
      if (items.length) openDetail(items[0].slug)
    } catch (e: any) {
      toast.error(e?.message || 'Agent failed to generate')
    } finally {
      setBusy(false)
    }
  }

  return (
    <section id="agent" className="scroll-mt-20 border-b border-border/60 py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          {/* Left: explainer */}
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-300">
              <Bot className="h-3.5 w-3.5" />
              Autonomous Multi-Agent Swarm
            </div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              A 20-Agent Swarm Writes the Library Daily
            </h2>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">
              The NexusAI orchestrator runs a coordinated crew of 20 specialized AI agents. Each
              day they forecast trends, engineer neuro-prompts, author workflows, map audiences,
              wire internal links, inject schema markup, and ship — producing 100 trending prompts
              and 100 trending skills with full Trinity Bundles.
            </p>

            <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
              <div className="rounded-xl border border-border/60 bg-card/50 p-3">
                <Cpu className="mb-1.5 h-4 w-4 text-primary" />
                <p className="text-lg font-bold leading-none">{todayGenerated}</p>
                <p className="text-[11px] text-muted-foreground">Generated today</p>
              </div>
              <div className="rounded-xl border border-border/60 bg-card/50 p-3">
                <Calendar className="mb-1.5 h-4 w-4 text-primary" />
                <p className="text-lg font-bold leading-none">200</p>
                <p className="text-[11px] text-muted-foreground">Daily target</p>
              </div>
              <div className="rounded-xl border border-border/60 bg-card/50 p-3">
                <Network className="mb-1.5 h-4 w-4 text-primary" />
                <p className="text-lg font-bold leading-none">20</p>
                <p className="text-[11px] text-muted-foreground">Coordinated agents</p>
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center">
              <Button onClick={runAgent} disabled={busy} size="lg" className="btn-press rounded-full glow-violet">
                {busy ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Agents working…
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" /> Generate a new item now
                  </>
                )}
              </Button>
              {lastRun && (
                <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400">
                  <CheckCircle2 className="h-3.5 w-3.5" /> {lastRun}
                </span>
              )}
            </div>

            {/* Live generation progress animation */}
            {busy && (
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-500" />
                    </span>
                    Agent swarm processing…
                  </span>
                  <span className="tabular-nums">~15s</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-gradient-to-r from-violet-500 via-emerald-500 to-violet-500 bg-[length:200%_100%] [animation:gradient-shift_2s_ease_infinite]" style={{ width: '70%' }} />
                </div>
                <div className="grid grid-cols-6 gap-1">
                  {['Research', 'Generate', 'Frontend', 'Backend', 'SEO', 'DevOps'].map((phase, i) => (
                    <div key={phase} className="flex flex-col items-center gap-1">
                      <div
                        className="grid h-7 w-full place-items-center rounded-md border text-[8px] font-bold transition-colors"
                        style={{
                          borderColor: i <= 2 ? 'oklch(0.78 0.19 162 / 0.4)' : 'oklch(1 0 0 / 0.1)',
                          backgroundColor: i <= 2 ? 'oklch(0.78 0.19 162 / 0.1)' : 'transparent',
                          color: i <= 2 ? 'oklch(0.78 0.19 162)' : 'oklch(0.5 0 0)',
                        }}
                      >
                        {i + 1}
                      </div>
                      <span className="text-[7px] text-muted-foreground">{phase}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <p className="mt-2 text-[11px] text-muted-foreground">
              Triggers the live agent (LLM) to author a fresh Trinity Bundle and opens it instantly.
            </p>
          </div>

          {/* Right: agent grid */}
          <div className="rounded-2xl border border-border/60 bg-card/40 p-4 sm:p-5">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Swarm Topology
              </p>
              <div className="flex flex-wrap gap-1">
                {PHASES.map((p) => (
                  <Badge key={p} variant="outline" className="text-[9px]">{p}</Badge>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
              {AGENTS.map((a, i) => (
                <motion.div
                  key={a.n}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.2, delay: i * 0.015 }}
                  className="flex items-center gap-2 rounded-lg border border-border/50 bg-background/40 px-2 py-1.5"
                >
                  <span
                    className="grid h-6 w-6 shrink-0 place-items-center rounded text-[10px] font-bold text-white"
                    style={{ backgroundColor: a.color }}
                  >
                    {a.n}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-[11px] font-semibold leading-tight">{a.role}</p>
                    <p className="text-[9px] text-muted-foreground">{a.phase}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
