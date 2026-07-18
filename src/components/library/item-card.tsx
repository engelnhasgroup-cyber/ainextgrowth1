'use client'

import { Flame, Eye, Download, Star, FileText, Bookmark, Zap, TrendingUp } from 'lucide-react'
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

const TYPE_META: Record<string, { label: string; bg: string; text: string; icon: any }> = {
  prompt: { label: 'Prompt', bg: 'bg-emerald-500/15', text: 'text-emerald-400', icon: Zap },
  skill: { label: 'Skill', bg: 'bg-violet-500/15', text: 'text-violet-300', icon: FileText },
  workflow: { label: 'Workflow', bg: 'bg-amber-500/15', text: 'text-amber-400', icon: TrendingUp },
}

const DIFFICULTY_DOTS: Record<string, number> = {
  Beginner: 1,
  Intermediate: 2,
  Advanced: 3,
  Expert: 4,
}

export function typeLabel(type: string) {
  return TYPE_META[type]?.label || type
}

export function ItemCard({ item, index = 0 }: { item: ItemSummary; index?: number }) {
  const openDetail = useLibrary((s) => s.openDetail)
  const { has, toggle } = useBookmarks()
  const color = CAT_COLORS[item.category] || '#10b981'
  const saved = has(item.id)
  const typeMeta = TYPE_META[item.type] || TYPE_META.prompt
  const TypeIcon = typeMeta.icon
  const dots = DIFFICULTY_DOTS[item.difficulty] || 2

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.03, 0.3) }}
      className="group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card/60 p-4 text-left transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10"
      style={{ ['--cat' as any]: color }}
    >
      {/* gradient glow on hover */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(120% 80% at 50% 0%, ${color}14, transparent 60%)`,
        }}
      />

      <button
        onClick={() => openDetail(item.slug)}
        className="relative flex h-full w-full flex-col text-left"
        aria-label={`Open ${item.title}`}
      >
        {/* top row: type badge + trending */}
        <div className="mb-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${typeMeta.bg} ${typeMeta.text}`}
            >
              <TypeIcon className="h-2.5 w-2.5" />
              {typeMeta.label}
            </span>
            <span
              className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium"
              style={{ backgroundColor: `${color}1f`, color }}
            >
              {item.niche}
            </span>
          </div>
          {item.trending && (
            <span className="relative inline-flex items-center gap-1 rounded-full bg-amber-500/15 px-1.5 py-0.5 text-[10px] font-bold text-amber-400">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber-400" />
              </span>
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
              className="rounded-md border border-border/40 bg-muted/30 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground transition-colors group-hover:border-border/60"
            >
              {t}
            </span>
          ))}
        </div>

        {/* footer: stats + difficulty */}
        <div className="mt-auto flex items-center justify-between gap-2 pt-3 text-[11px] text-muted-foreground">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center gap-1" title="Views">
              <Eye className="h-3 w-3" />
              {formatCompact(item.viewCount)}
            </span>
            <span className="inline-flex items-center gap-1" title="Downloads">
              <Download className="h-3 w-3" />
              {formatCompact(item.downloadCount)}
            </span>
            <span className="inline-flex items-center gap-1 text-amber-400" title="Rating">
              <Star className="h-3 w-3 fill-current" />
              {item.rating.toFixed(1)}
            </span>
          </div>
          {/* difficulty dots */}
          <div className="flex items-center gap-0.5" title={`Difficulty: ${item.difficulty}`}>
            {Array.from({ length: 4 }).map((_, i) => (
              <span
                key={i}
                className="h-1 w-1 rounded-full"
                style={{
                  backgroundColor: i < dots ? color : 'oklch(1 0 0 / 0.15)',
                }}
              />
            ))}
          </div>
        </div>

        {/* hover CTA hint */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-center gap-1.5 bg-gradient-to-t from-card via-card/90 to-transparent pb-3 pt-8 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="inline-flex items-center gap-1 rounded-full bg-primary/15 px-3 py-1 text-[10px] font-semibold text-primary">
            <FileText className="h-3 w-3" />
            View Trinity Bundle
          </span>
        </div>
      </button>

      {/* bookmark button */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          toggle(item)
        }}
        className={`absolute right-2 top-2 z-10 grid h-7 w-7 place-items-center rounded-full backdrop-blur transition-all hover:scale-110 ${
          saved ? 'bg-amber-500/20' : 'bg-background/80 opacity-0 group-hover:opacity-100'
        }`}
        aria-label={saved ? 'Remove bookmark' : 'Add bookmark'}
      >
        <Bookmark
          className={`h-3.5 w-3.5 transition-colors ${
            saved ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground hover:text-foreground'
          }`}
        />
      </button>

      {/* left accent bar */}
      <span
        className="absolute left-0 top-0 h-full w-[3px] origin-top scale-y-0 transition-transform duration-300 group-hover:scale-y-100"
        style={{ backgroundColor: color }}
      />
    </motion.div>
  )
}

export function ItemCardSkeleton() {
  return (
    <div className="h-52 animate-pulse rounded-2xl border border-border/60 bg-card/40 p-4">
      <div className="mb-3 flex gap-2">
        <div className="h-4 w-16 rounded bg-muted/60" />
        <div className="h-4 w-20 rounded bg-muted/40" />
      </div>
      <div className="mb-2 h-4 w-3/4 rounded bg-muted/60" />
      <div className="mb-4 h-3 w-full rounded bg-muted/40" />
      <div className="h-3 w-1/2 rounded bg-muted/40" />
    </div>
  )
}
