'use client'

import { Flame, ArrowRight } from 'lucide-react'
import { useLibrary } from './store'

const TOPICS = [
  'GPT-5 Agentic Reasoning',
  'Google SGE Optimization',
  'LangGraph 2.0 Orchestration',
  'Enterprise RAG Pipelines',
  'AI-Generated Video (Sora 2)',
  'Synthetic Data Generation',
  'Autonomous SDR Agents',
  'EU AI Act Compliance',
  'Neuro-Prompting',
  'Programmatic SEO 2026',
  'Voice AI Support',
  'Generative UI / RSC',
  'Edge Inference / Quantized LLMs',
  'Computer Vision QC',
  'Adaptive Learning Tutors',
]

export function TrendingTicker() {
  const setSearch = useLibrary((s) => s.setSearch)

  const go = (topic: string) => {
    setSearch(topic)
    setTimeout(() => {
      document.getElementById('library')?.scrollIntoView({ behavior: 'smooth' })
    }, 50)
  }

  // duplicate for seamless marquee loop
  const loop = [...TOPICS, ...TOPICS]

  return (
    <div className="relative overflow-hidden border-y border-border/40 bg-card/30 py-2.5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-background to-transparent" />
      <div className="flex items-center gap-2">
        <div className="z-20 flex shrink-0 items-center gap-1.5 rounded-full bg-amber-500/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-amber-400">
          <Flame className="h-3 w-3" />
          <span className="hidden sm:inline">Trending Topics</span>
          <span className="sm:hidden">Trending</span>
        </div>
        <div className="relative flex-1 overflow-hidden">
          <div className="flex w-max animate-[ticker_40s_linear_infinite] items-center gap-2">
            {loop.map((t, i) => (
              <button
                key={i}
                onClick={() => go(t)}
                className="group inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border/50 bg-background/50 px-3 py-1 text-[11px] font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                {t}
                <ArrowRight className="h-2.5 w-2.5 opacity-0 transition-opacity group-hover:opacity-100" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
