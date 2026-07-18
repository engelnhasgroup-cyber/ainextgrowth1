'use client'

import {
  Search, Code2, BarChart3, Briefcase, Palette, TrendingUp,
  GraduationCap, Bot, Layers, type LucideIcon,
} from 'lucide-react'
import type { CategoryInfo } from '@/lib/types'
import { motion } from 'framer-motion'
import { useLibrary } from './store'

const ICON_MAP: Record<string, LucideIcon> = {
  Search,
  Code2,
  BarChart3,
  Briefcase,
  Palette,
  TrendingUp,
  GraduationCap,
  Bot,
}

export function CategoriesSection({
  categories,
}: {
  categories: CategoryInfo[]
}) {
  const setFilterCategory = useLibrary((s) => s.setFilterCategory)
  const setFilterType = useLibrary((s) => s.setFilterType)

  const selectCategory = (slug: string) => {
    setFilterCategory(slug)
    setFilterType('all')
    setTimeout(() => {
      document.getElementById('library')?.scrollIntoView({ behavior: 'smooth' })
    }, 50)
  }

  return (
    <section id="categories" className="scroll-mt-20 border-b border-border/60 py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-7">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <Layers className="h-3.5 w-3.5" />
            8 High-Value Verticals
          </div>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Browse by Category
          </h2>
          <p className="mt-1.5 max-w-2xl text-sm text-muted-foreground">
            Eight high-value verticals engineered for the highest AdSense CPC markets. Each
            category links prompts to skills via a semantic internal-link graph.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((cat, i) => {
            const Icon = ICON_MAP[cat.icon] || Search
            return (
              <motion.button
                key={cat.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25, delay: i * 0.04 }}
                onClick={() => selectCategory(cat.slug)}
                className="group relative flex flex-col gap-3 overflow-hidden rounded-2xl border border-border/60 bg-card/50 p-4 text-left transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl"
                style={{ ['--cat' as any]: cat.color }}
              >
                {/* hover glow */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: `radial-gradient(120% 80% at 50% 0%, ${cat.color}12, transparent 60%)` }}
                />
                <div className="relative flex items-center justify-between">
                  <div
                    className="grid h-11 w-11 place-items-center rounded-xl transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${cat.color}1f`, color: cat.color }}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="rounded-full bg-muted/60 px-2 py-0.5 text-[10px] font-bold text-muted-foreground">
                    {cat.itemCount ?? 0} items
                  </span>
                </div>
                <div className="relative">
                  <h3 className="text-sm font-semibold leading-tight">{cat.name}</h3>
                  <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-muted-foreground">
                    {cat.description}
                  </p>
                </div>
                <span
                  className="absolute -bottom-px left-0 h-0.5 w-full origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
                  style={{ backgroundColor: cat.color }}
                />
              </motion.button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
