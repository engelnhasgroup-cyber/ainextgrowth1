'use client'

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import { Flame, Eye, Download, Star, Clock, Wrench, ArrowRight, Zap, FileText, TrendingUp } from 'lucide-react'
import type { ItemSummary } from '@/lib/types'
import { formatCompact } from './stats-bar'

const TYPE_META: Record<string, { label: string; bg: string; text: string; icon: any }> = {
  prompt: { label: 'Prompt', bg: 'bg-emerald-500/15', text: 'text-emerald-400', icon: Zap },
  skill: { label: 'Skill', bg: 'bg-violet-500/15', text: 'text-violet-300', icon: FileText },
  workflow: { label: 'Workflow', bg: 'bg-amber-500/15', text: 'text-amber-400', icon: TrendingUp },
}

export function QuickPreview({
  item,
  children,
}: {
  item: ItemSummary
  children: React.ReactNode
}) {
  const typeMeta = TYPE_META[item.type] || TYPE_META.prompt
  const TypeIcon = typeMeta.icon
  const readingTime = Math.max(1, Math.ceil((item.title + item.summary).split(/\s+/).length / 200))

  return (
    <HoverCard openDelay={400} closeDelay={150}>
      <HoverCardTrigger asChild>{children}</HoverCardTrigger>
      <HoverCardContent
        side="top"
        align="center"
        className="w-80 border-border/70 bg-card p-0 shadow-2xl"
        sideOffset={8}
      >
        <div className="space-y-3 p-4">
          {/* header */}
          <div className="flex items-center gap-1.5">
            <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase ${typeMeta.bg} ${typeMeta.text}`}>
              <TypeIcon className="h-2.5 w-2.5" />
              {typeMeta.label}
            </span>
            <span className="text-[10px] text-muted-foreground">{item.niche}</span>
            {item.trending && (
              <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-amber-500/15 px-1.5 py-0.5 text-[9px] font-bold text-amber-400">
                <Flame className="h-2.5 w-2.5" />
                {item.trendingScore}
              </span>
            )}
          </div>

          {/* title + summary */}
          <div>
            <h4 className="text-sm font-semibold leading-snug">{item.title}</h4>
            <p className="mt-1 line-clamp-3 text-xs leading-relaxed text-muted-foreground">
              {item.summary}
            </p>
          </div>

          {/* tags */}
          <div className="flex flex-wrap gap-1">
            {item.tags.slice(0, 4).map((t) => (
              <span key={t} className="rounded-md border border-border/40 bg-muted/30 px-1.5 py-0.5 text-[9px] font-medium text-muted-foreground">
                {t}
              </span>
            ))}
          </div>

          {/* tools */}
          {item.requiredTools.length > 0 && (
            <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
              <Wrench className="h-3 w-3" />
              <span className="truncate">{item.requiredTools.slice(0, 3).join(' · ')}</span>
            </div>
          )}

          {/* stats row */}
          <div className="flex items-center gap-3 border-t border-border/40 pt-2.5 text-[10px] text-muted-foreground">
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
            <span className="ml-auto inline-flex items-center gap-1 text-primary">
              View details
              <ArrowRight className="h-3 w-3" />
            </span>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
