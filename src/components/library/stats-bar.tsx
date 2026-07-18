export interface Stats {
  totalItems: number
  totalPrompts: number
  totalSkills: number
  totalWorkflows: number
  totalCategories: number
  totalDownloads: number
  todayGenerated: number
  trinityFiles: number
}

export function formatCompact(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M'
  if (n >= 1_000) return (n / 1_000).toFixed(1).replace(/\.0$/, '') + 'K'
  return String(n)
}

import { FileText, Download, Sparkles, Layers } from 'lucide-react'

export function StatsBar({ stats }: { stats: Stats }) {
  const items = [
    { label: 'Prompts, Skills & Workflows', value: formatCompact(stats.totalItems), icon: Sparkles },
    { label: 'Trinity MD Files', value: formatCompact(stats.trinityFiles), icon: FileText },
    { label: 'Total Downloads', value: formatCompact(stats.totalDownloads), icon: Download },
    { label: 'Categories', value: String(stats.totalCategories), icon: Layers },
  ]
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
      {items.map((it) => (
        <div
          key={it.label}
          className="flex items-center gap-2.5 rounded-xl border border-border/60 bg-card/50 px-3 py-2.5"
        >
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
            <it.icon className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <div className="text-base font-bold leading-none sm:text-lg">{it.value}</div>
            <div className="truncate text-[11px] text-muted-foreground">{it.label}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
