'use client'

import { Flame, ArrowRight, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { ItemSummary } from '@/lib/types'
import { ItemCard } from './item-card'
import { useLibrary } from './store'

export function TrendingSection({
  trending,
}: {
  trending: ItemSummary[]
}) {
  const setSort = useLibrary((s) => s.setSort)
  if (trending.length === 0) return null

  const top = trending.slice(0, 8)

  return (
    <section id="trending" className="relative scroll-mt-20 overflow-hidden border-b border-border/60 py-12 sm:py-16">
      {/* ambient glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-amber-500/5 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-400" />
              </span>
              <Flame className="h-3.5 w-3.5" />
              Trending Today · Auto-Generated
            </div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Top Trending Prompts & Skills
            </h2>
            <p className="mt-1.5 max-w-2xl text-sm text-muted-foreground">
              Hand-picked by our autonomous agent from today&apos;s 200-item drop. Highest trending
              scores and engagement across the library.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="shrink-0 rounded-full"
            onClick={() => {
              setSort('trending')
              setTimeout(() => {
                document.getElementById('library')?.scrollIntoView({ behavior: 'smooth' })
              }, 50)
            }}
          >
            <TrendingUp className="mr-1.5 h-3.5 w-3.5" />
            View All Trending
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {top.map((item, i) => (
            <ItemCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
