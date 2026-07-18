'use client'

import { TrendingUp, ArrowRight, Workflow } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { ItemSummary } from '@/lib/types'
import { ItemCard } from './item-card'
import { useLibrary } from './store'

export function WorkflowsSection({ items }: { items: ItemSummary[] }) {
  const setFilterType = useLibrary((s) => s.setFilterType)
  if (items.length === 0) return null

  const top = items.slice(0, 4)

  return (
    <section id="workflows" className="scroll-mt-20 border-b border-border/60 py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-400">
              <Workflow className="h-3.5 w-3.5" />
              End-to-End Agentic Workflows
            </div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Top Workflows for 2026
            </h2>
            <p className="mt-1.5 max-w-2xl text-sm text-muted-foreground">
              Complete orchestration playbooks that chain prompts, skills, and tools to execute
              full real-world tasks — from research to deployment.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="shrink-0 rounded-full"
            onClick={() => {
              setFilterType('workflow')
              setTimeout(() => {
                document.getElementById('library')?.scrollIntoView({ behavior: 'smooth' })
              }, 50)
            }}
          >
            All Workflows
            <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          {top.map((item, i) => (
            <ItemCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
