'use client'

import { Star, ArrowRight, Award } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { ItemSummary } from '@/lib/types'
import { ItemCard } from './item-card'
import { SectionReveal } from './section-animations'
import { useLibrary } from './store'

export function EditorsPickSection({ items }: { items: ItemSummary[] }) {
  const setFilterType = useLibrary((s) => s.setFilterType)
  const setSort = useLibrary((s) => s.setSort)
  if (items.length === 0) return null

  const top = items.slice(0, 4)

  return (
    <section id="editors-pick" className="scroll-mt-20 overflow-hidden border-b border-border/60 py-12 sm:py-16">
      {/* ambient glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-violet-500/5 to-transparent" />

      <SectionReveal className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-300">
              <Award className="h-3.5 w-3.5" />
              Editor&apos;s Pick · Hand-Selected
            </div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Featured Prompts & Skills
            </h2>
            <p className="mt-1.5 max-w-2xl text-sm text-muted-foreground">
              Curated by the NexusAI Editorial Team for exceptional quality, real-world impact,
              and 2026 relevance. The best of the best, vetted for professionals.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="shrink-0 rounded-full"
            onClick={() => {
              setFilterType('all')
              setSort('rating')
              setTimeout(() => {
                document.getElementById('library')?.scrollIntoView({ behavior: 'smooth' })
              }, 50)
            }}
          >
            <Star className="mr-1.5 h-3.5 w-3.5" />
            Top Rated
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          {top.map((item, i) => (
            <div key={item.id} className="group/featured relative">
              {/* gradient border glow */}
              <div className="pointer-events-none absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-violet-500/30 via-emerald-500/20 to-amber-500/30 opacity-40 blur-sm transition-opacity duration-300 group-hover/featured:opacity-80" />
              <div className="relative">
                <ItemCard item={item} index={i} />
                <span className="absolute -left-1 -top-2 z-20 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-violet-500 to-emerald-500 px-2 py-0.5 text-[9px] font-bold text-white shadow-lg">
                  <Star className="h-2.5 w-2.5 fill-current" />
                  Featured
                </span>
              </div>
            </div>
          ))}
        </div>
      </SectionReveal>
    </section>
  )
}
