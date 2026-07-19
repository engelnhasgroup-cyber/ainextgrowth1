'use client'

import { useState, useEffect } from 'react'
import { History, Trash2, X, FileText, Workflow, TrendingUp, Eye, ArrowRight } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useHistory } from './use-history'
import { useLibrary } from './store'
import { formatCompact } from './stats-bar'
import type { ItemSummary } from '@/lib/types'

export function HistorySheet({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (o: boolean) => void
}) {
  const { ids, clear, count, loaded } = useHistory()
  const openDetail = useLibrary((s) => s.openDetail)
  const [items, setItems] = useState<ItemSummary[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!open || ids.length === 0) {
      // Clearing items when drawer closes (legitimate pattern).
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setItems([])
      return
    }
    setLoading(true)
    fetch(`/api/items?limit=100`)
      .then((r) => r.json())
      .then((data) => {
        const all: ItemSummary[] = data.items || []
        // preserve history order
        const ordered = ids
          .map((id) => all.find((i) => i.id === id))
          .filter(Boolean) as ItemSummary[]
        setItems(ordered)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [open, ids])

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex w-full flex-col gap-0 border-border/70 bg-card p-0 sm:max-w-md">
        <SheetHeader className="border-b border-border/60 px-5 py-4">
          <div className="flex items-center justify-between pr-6">
            <div className="flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-cyan-500/15 text-cyan-400">
                <History className="h-4 w-4" />
              </div>
              <div>
                <SheetTitle className="text-base">Recently Viewed</SheetTitle>
                <SheetDescription className="text-xs">
                  Stored locally · {count} item{count === 1 ? '' : 's'}
                </SheetDescription>
              </div>
            </div>
            {count > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="h-7 rounded-full text-xs text-muted-foreground hover:text-destructive"
                onClick={clear}
              >
                <Trash2 className="mr-1 h-3 w-3" /> Clear
              </Button>
            )}
          </div>
        </SheetHeader>

        <ScrollArea className="flex-1">
          <div className="p-4">
            {!loaded ? (
              <div className="grid h-32 place-items-center text-xs text-muted-foreground">
                Loading…
              </div>
            ) : count === 0 ? (
              <div className="grid place-items-center rounded-xl border border-dashed border-border/60 py-16 text-center">
                <History className="mb-3 h-8 w-8 text-muted-foreground/50" />
                <p className="text-sm font-medium">No history yet</p>
                <p className="mt-1 max-w-[220px] text-xs text-muted-foreground">
                  Items you view will appear here for quick access.
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {items.map((it, idx) => (
                  <div
                    key={it.id}
                    className="group flex items-center gap-2.5 rounded-xl border border-border/60 bg-background/40 p-3 card-hover hover:border-primary/40"
                  >
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-muted/60 text-[10px] font-bold text-muted-foreground">
                      {idx + 1}
                    </span>
                    <span
                      className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ${
                        it.type === 'prompt'
                          ? 'bg-emerald-500/15 text-emerald-400'
                          : it.type === 'skill'
                          ? 'bg-violet-500/15 text-violet-300'
                          : 'bg-amber-500/15 text-amber-400'
                      }`}
                    >
                      {it.type === 'prompt' ? (
                        <FileText className="h-4 w-4" />
                      ) : it.type === 'skill' ? (
                        <Workflow className="h-4 w-4" />
                      ) : (
                        <TrendingUp className="h-4 w-4" />
                      )}
                    </span>
                    <button
                      onClick={() => {
                        openDetail(it.slug)
                        onOpenChange(false)
                      }}
                      className="min-w-0 flex-1 text-left"
                    >
                      <p className="line-clamp-1 text-xs font-semibold leading-tight">
                        {it.title}
                      </p>
                      <p className="mt-0.5 truncate text-[10px] text-muted-foreground">
                        {it.niche} · ★ {it.rating.toFixed(1)} · {formatCompact(it.viewCount)} views
                      </p>
                    </button>
                    <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </ScrollArea>

        {count > 0 && (
          <div className="border-t border-border/60 p-3 text-center">
            <p className="text-[10px] text-muted-foreground">
              History is stored only in your browser (localStorage). Max 20 items.
            </p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
