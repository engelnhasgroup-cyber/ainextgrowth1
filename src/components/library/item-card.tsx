'use client'

import { Flame, Eye, Download, Star, FileText, Bookmark } from 'lucide-react'
import { motion } from 'framer-motion'
import type { ItemSummary } from '@/lib/types'
import { useLibrary } from './store'
import { formatCompact } from './stats-bar'
import { useBookmarks } from './use-bookmarks'

const CAT_COLORS: Record<string, string> = {
  'seo-content-marketing': '#10b981',
  'software-engineering': '#8b5cf6',
  'data-analytics': '#f59e0b',
  'business-strategy': '#f43f5e',
  'design-creative': '#06b6d4',
  'sales-growth': '#fb923c',
  'education-research': '#14b8a6',
  'automation-agents': '#d946ef',
}

export function typeLabel(type: string) {
  return type === 'prompt' ? 'Prompt' : 'Skill'
}

export function ItemCard({ item, index = 0 }: { item: ItemSummary; index?: number }) {
  const openDetail = useLibrary((s) => s.openDetail)
  const { has, toggle } = useBookmarks()
  const color = CAT_COLORS[item.category] || '#10b981'
  const isPrompt = item.type === 'prompt'
  const saved = has(item.id)

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.03, 0.3) }}
      className="group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card/60 p-4 text-left card-hover hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5"
    >
      <button
        onClick={() => openDetail(item.slug)}
        className="flex h-full w-full flex-col text-left"
        aria-label={`Open ${item.title}`}
      >
        {/* top row */}
        <div className="mb-2.5 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <span
              className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                isPrompt
                  ? 'bg-emerald-500/15 text-emerald-400'
                  : 'bg-violet-500/15 text-violet-300'
              }`}
            >
              {isPrompt ? 'Prompt' : 'Skill'}
            </span>
            <span
              className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium"
              style={{ backgroundColor: `${color}1f`, color }}
            >
              {item.niche}
            </span>
          </div>
          {item.trending && (
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/15 px-1.5 py-0.5 text-[10px] font-bold text-amber-400">
              <Flame className="h-3 w-3" />
              {item.trendingScore}
            </span>
          )}
        </div>

        {/* title */}
        <h3 className="line-clamp-2 text-[15px] font-semibold leading-snug transition-colors group-hover:text-primary">
          {item.title}
        </h3>

        {/* summary */}
        <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
          {item.summary}
        </p>

        {/* tags */}
        <div className="mt-3 flex flex-wrap gap-1">
          {item.tags.slice(0, 3).map((t) => (
            <span
              key={t}
              className="rounded-md bg-muted/60 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>

        {/* footer */}
        <div className="mt-auto flex items-center justify-between gap-2 pt-3 text-[11px] text-muted-foreground">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center gap-1">
              <Eye className="h-3 w-3" />
              {formatCompact(item.viewCount)}
            </span>
            <span className="inline-flex items-center gap-1">
              <Download className="h-3 w-3" />
              {formatCompact(item.downloadCount)}
            </span>
            <span className="inline-flex items-center gap-1 text-amber-400">
              <Star className="h-3 w-3 fill-current" />
              {item.rating.toFixed(1)}
            </span>
          </div>
          <span className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-1.5 py-0.5 font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
            <FileText className="h-3 w-3" />
            Trinity
          </span>
        </div>
      </button>

      {/* bookmark button */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          toggle(item)
        }}
        className="absolute right-2 top-2 z-10 grid h-7 w-7 place-items-center rounded-full bg-background/80 backdrop-blur transition-all hover:bg-background"
        aria-label={saved ? 'Remove bookmark' : 'Add bookmark'}
      >
        <Bookmark
          className={`h-3.5 w-3.5 transition-colors ${
            saved ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground hover:text-foreground'
          }`}
        />
      </button>

      {/* difficulty accent bar */}
      <span
        className="absolute left-0 top-0 h-1 w-full origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
        style={{ backgroundColor: color }}
      />
    </motion.div>
  )
}

export function ItemCardSkeleton() {
  return (
    <div className="h-52 animate-pulse rounded-2xl border border-border/60 bg-card/40 p-4">
      <div className="mb-3 h-4 w-24 rounded bg-muted/60" />
      <div className="mb-2 h-4 w-3/4 rounded bg-muted/60" />
      <div className="mb-4 h-3 w-full rounded bg-muted/40" />
      <div className="h-3 w-1/2 rounded bg-muted/40" />
    </div>
  )
}
