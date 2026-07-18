'use client'

import { Flame, Eye, Download, Star, Bookmark, ArrowRight, Zap, FileText, TrendingUp } from 'lucide-react'
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

export function ItemListItem({ item, index = 0 }: { item: ItemSummary; index?: number }) {
  const openDetail = useLibrary((s) => s.openDetail)
  const { has, toggle } = useBookmarks()
  const color = CAT_COLORS[item.category] || '#10b981'
  const saved = has(item.id)
  const typeMeta = TYPE_META[item.type] || TYPE_META.prompt
  const TypeIcon = typeMeta.icon

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.25, delay: Math.min(index * 0.02, 0.2) }}
      className="group relative flex items-center gap-3 overflow-hidden rounded-xl border border-border/60 bg-card/50 p-3 transition-all hover:border-primary/40 hover:bg-card/70"
    >
      {/* left accent */}
      <span
        className="absolute left-0 top-0 h-full w-[3px] origin-top scale-y-0 transition-transform duration-300 group-hover:scale-y-100"
        style={{ backgroundColor: color }}
      />

      <button
        onClick={() => openDetail(item.slug)}
        className="flex min-w-0 flex-1 items-center gap-3 text-left"
        aria-label={`Open ${item.title}`}
      >
        {/* type icon block */}
        <span
          className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg ${typeMeta.bg} ${typeMeta.text}`}
        >
          <TypeIcon className="h-4 w-4" />
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase ${typeMeta.bg} ${typeMeta.text}`}>
              {typeMeta.label}
            </span>
            <span
              className="inline-flex items-center rounded-full px-1.5 py-0.5 text-[9px] font-medium"
              style={{ backgroundColor: `${color}1f`, color }}
            >
              {item.niche}
            </span>
            {item.trending && (
              <span className="inline-flex items-center gap-0.5 rounded-full bg-amber-500/15 px-1.5 py-0.5 text-[9px] font-bold text-amber-400">
                <Flame className="h-2.5 w-2.5" />
                {item.trendingScore}
              </span>
            )}
          </div>
          <h3 className="mt-1 line-clamp-1 text-sm font-semibold transition-colors group-hover:text-primary">
            {item.title}
          </h3>
          <p className="mt-0.5 line-clamp-1 text-[11px] text-muted-foreground">
            {item.summary}
          </p>
        </div>

        {/* stats */}
        <div className="hidden shrink-0 items-center gap-3 text-[11px] text-muted-foreground sm:flex">
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

        <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
      </button>

      {/* bookmark */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          toggle(item)
        }}
        className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-all hover:scale-110 ${
          saved ? 'bg-amber-500/20' : 'hover:bg-muted'
        }`}
        aria-label={saved ? 'Remove bookmark' : 'Add bookmark'}
      >
        <Bookmark
          className={`h-3.5 w-3.5 transition-colors ${
            saved ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground'
          }`}
        />
      </button>
    </motion.div>
  )
}
