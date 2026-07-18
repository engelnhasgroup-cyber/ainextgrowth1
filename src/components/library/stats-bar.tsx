'use client'

import { useEffect, useRef, useState } from 'react'
import { FileText, Download, Sparkles, Layers } from 'lucide-react'

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

// Animated counter that eases from 0 to target when scrolled into view.
function useCountUp(target: number, duration = 1200): { ref: React.RefObject<HTMLDivElement | null>; value: number } {
  const ref = useRef<HTMLDivElement>(null)
  const [value, setValue] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true
          const start = performance.now()
          const tick = (now: number) => {
            const t = Math.min(1, (now - start) / duration)
            // easeOutExpo
            const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
            setValue(Math.round(target * eased))
            if (t < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration])

  return { ref, value }
}

function StatCard({
  icon: Icon,
  value,
  label,
  color,
  delay = 0,
}: {
  icon: any
  value: number
  label: string
  color: string
  delay?: number
}) {
  const { ref, value: animated } = useCountUp(value)
  return (
    <div
      ref={ref}
      className="group relative flex items-center gap-2.5 overflow-hidden rounded-xl border border-border/60 bg-card/50 px-3 py-2.5 transition-colors hover:border-primary/40"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div
        className="grid h-9 w-9 shrink-0 place-items-center rounded-lg transition-transform group-hover:scale-110"
        style={{ backgroundColor: `${color}1f`, color }}
      >
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0">
        <div className="text-base font-bold leading-none tabular-nums sm:text-lg">
          {formatCompact(animated)}
        </div>
        <div className="truncate text-[11px] text-muted-foreground">{label}</div>
      </div>
      <span
        className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
        style={{ backgroundColor: color }}
      />
    </div>
  )
}

export function StatsBar({ stats }: { stats: Stats }) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
      <StatCard
        icon={Sparkles}
        value={stats.totalItems}
        label="Prompts, Skills & Workflows"
        color="#10b981"
        delay={0}
      />
      <StatCard
        icon={FileText}
        value={stats.trinityFiles}
        label="Trinity MD Files"
        color="#8b5cf6"
        delay={100}
      />
      <StatCard
        icon={Download}
        value={stats.totalDownloads}
        label="Total Downloads"
        color="#f59e0b"
        delay={200}
      />
      <StatCard
        icon={Layers}
        value={stats.totalCategories}
        label="Categories"
        color="#06b6d4"
        delay={300}
      />
    </div>
  )
}
