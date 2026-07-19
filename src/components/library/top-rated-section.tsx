'use client'

import { Star, ArrowRight, Trophy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { ItemSummary } from '@/lib/types'
import { ItemCard } from './item-card'
import { SectionReveal } from './section-animations'
import { useLibrary } from './store'

export function TopRatedSection({ items }: { items: ItemSummary[] }) {
  const setSort = useLibrary((s) => s.setSort)
  const setFilterType = useLibrary((s) => s.setFilterType)
  if (items.length === 0) return null

  const top = items.slice(0, 4)

  return (
    <section id="top-rated" className="scroll-mt-20 overflow-hidden border-b border-border/60 py-12 sm:py-16">
      {/* ambient glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-amber-500/5 to-transparent" />

      <SectionReveal className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-400">
              <Trophy className="h-3.5 w-3.5" />
              Top Rated · Community Favorites
            </div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Highest Rated Prompts & Skills
            </h2>
            <p className="mt-1.5 max-w-2xl text-sm text-muted-foreground">
              The best of the best — items with the highest community ratings and download counts.
              Proven, tested, and loved by professionals.
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
            View All Rated
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          {top.map((item, i) => (
            <div key={item.id} className="relative">
              <ItemCard item={item} index={i} />
              <span className="absolute -left-1 -top-2 z-20 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-2 py-0.5 text-[9px] font-bold text-white shadow-lg">
                <Star className="h-2.5 w-2.5 fill-current" />
                {item.rating.toFixed(1)}
              </span>
            </div>
          ))}
        </div>
      </SectionReveal>
    </section>
  )
}
