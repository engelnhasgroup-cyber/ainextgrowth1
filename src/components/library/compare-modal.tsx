'use client'

import { useEffect, useState } from 'react'
import {
  Dialog, DialogContent, DialogTitle, DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { X, GitCompare, Loader2, Download, Eye, Star, Flame, Check, ArrowRight } from 'lucide-react'
import { useLibrary } from './store'
import type { ItemDetail } from '@/lib/types'
import { formatCompact } from './stats-bar'

async function fetchItemDetail(id: string): Promise<ItemDetail | null> {
  try {
    // We don't have a by-id API, but we can use the items list endpoint and find by id.
    // Better: fetch all and filter — but that's heavy. Use the slug-based endpoint instead.
    // Since we only have IDs, let's fetch a large batch and find by id.
    const res = await fetch(`/api/items?limit=100&offset=0`)
    const data = await res.json()
    const found = (data.items || []).find((i: any) => i.id === id)
    if (!found) return null
    // Fetch full detail by slug
    const detailRes = await fetch(`/api/items/${found.slug}`)
    const detailData = await detailRes.json()
    return detailData.item || null
  } catch {
    return null
  }
}

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

export function CompareModal() {
  const { compareOpen, setCompareOpen, compareIds, clearCompare, openDetail, openAdGate } = useLibrary()
  const [items, setItems] = useState<ItemDetail[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!compareOpen || compareIds.length === 0) {
      // Clearing items when modal closes (legitimate pattern).
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setItems([])
      return
    }
    setLoading(true)
    Promise.all(compareIds.map((id) => fetchItemDetail(id)))
      .then((results) => {
        setItems(results.filter(Boolean) as ItemDetail[])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [compareOpen, compareIds])

  const rows: { label: string; render: (item: ItemDetail) => React.ReactNode }[] = [
    { label: 'Type', render: (i) => <Badge variant="outline" className="capitalize">{i.type}</Badge> },
    { label: 'Category', render: (i) => <span style={{ color: CAT_COLORS[i.category] }}>{i.niche}</span> },
    { label: 'Difficulty', render: (i) => <span className="text-foreground">{i.difficulty}</span> },
    { label: 'Audience', render: (i) => <span className="text-foreground">{i.audience}</span> },
    { label: 'Views', render: (i) => <span className="inline-flex items-center gap-1"><Eye className="h-3 w-3" />{formatCompact(i.viewCount)}</span> },
    { label: 'Downloads', render: (i) => <span className="inline-flex items-center gap-1"><Download className="h-3 w-3" />{formatCompact(i.downloadCount)}</span> },
    { label: 'Rating', render: (i) => <span className="inline-flex items-center gap-1 text-amber-400"><Star className="h-3 w-3 fill-current" />{i.rating.toFixed(1)}</span> },
    { label: 'Trending', render: (i) => i.trending ? <span className="inline-flex items-center gap-1 text-amber-400"><Flame className="h-3 w-3" />{i.trendingScore}</span> : <span className="text-muted-foreground">—</span> },
    { label: 'Tools', render: (i) => <span className="text-foreground">{i.requiredTools.join(', ')}</span> },
    { label: 'Tags', render: (i) => <span className="text-foreground">{i.tags.slice(0, 4).join(', ')}</span> },
  ]

  return (
    <Dialog open={compareOpen} onOpenChange={(o) => !o && setCompareOpen(false)}>
      <DialogContent className="max-h-[92vh] gap-0 overflow-hidden border-border/70 bg-card p-0 sm:max-w-5xl">
        {/* Header */}
        <div className="border-b border-border/60 px-5 py-4">
          <div className="flex items-center justify-between gap-3 pr-8">
            <div className="flex items-center gap-2.5">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-violet-500/15 text-violet-300">
                <GitCompare className="h-4 w-4" />
              </div>
              <div>
                <DialogTitle className="text-base font-bold">Compare Items</DialogTitle>
                <DialogDescription className="text-xs">
                  Side-by-side comparison of {compareIds.length} item{compareIds.length === 1 ? '' : 's'} (max 3)
                </DialogDescription>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={clearCompare} className="rounded-full text-xs">
              Clear all
            </Button>
          </div>
        </div>

        {/* Body */}
        <div className="max-h-[calc(92vh-80px)] overflow-y-auto">
          {loading ? (
            <div className="grid h-48 place-items-center">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : items.length === 0 ? (
            <div className="grid h-48 place-items-center text-center">
              <div>
                <GitCompare className="mx-auto mb-3 h-8 w-8 text-muted-foreground/50" />
                <p className="text-sm font-medium">No items to compare</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Use the compare button on item cards to add items here.
                </p>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="sticky top-0 bg-card">
                  <tr className="border-b border-border/60">
                    <th className="w-32 p-3 text-left text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                      Attribute
                    </th>
                    {items.map((item) => (
                      <th key={item.id} className="min-w-[200px] p-3 text-left align-top">
                        <div className="space-y-2">
                          <div className="flex items-start justify-between gap-1">
                            <span
                              className={`inline-flex items-center rounded-full px-2 py-0.5 text-[9px] font-bold uppercase ${
                                item.type === 'prompt'
                                  ? 'bg-emerald-500/15 text-emerald-400'
                                  : item.type === 'skill'
                                  ? 'bg-violet-500/15 text-violet-300'
                                  : 'bg-amber-500/15 text-amber-400'
                              }`}
                            >
                              {item.type}
                            </span>
                            <button
                              onClick={() => useLibrary.getState().toggleCompare(item.id)}
                              className="rounded p-0.5 text-muted-foreground hover:bg-muted hover:text-foreground"
                              aria-label="Remove from compare"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                          <button
                            onClick={() => {
                              setCompareOpen(false)
                              setTimeout(() => openDetail(item.slug), 100)
                            }}
                            className="block w-full text-left text-xs font-semibold leading-tight transition-colors hover:text-primary"
                          >
                            {item.title}
                          </button>
                          <p className="line-clamp-2 text-[10px] text-muted-foreground">{item.summary}</p>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, idx) => (
                    <tr key={row.label} className={idx % 2 === 0 ? 'bg-muted/20' : ''}>
                      <td className="p-3 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                        {row.label}
                      </td>
                      {items.map((item) => (
                        <td key={item.id} className="p-3 text-xs">
                          {row.render(item)}
                        </td>
                      ))}
                    </tr>
                  ))}
                  {/* Action row */}
                  <tr className="border-t border-border/60">
                    <td className="p-3 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                      Actions
                    </td>
                    {items.map((item) => (
                      <td key={item.id} className="p-3">
                        <div className="flex flex-col gap-1.5">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 rounded-full text-[11px]"
                            onClick={() => {
                              setCompareOpen(false)
                              setTimeout(() => openDetail(item.slug), 100)
                            }}
                          >
                            View Details
                            <ArrowRight className="ml-1 h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            className="h-7 rounded-full text-[11px]"
                            onClick={() => {
                              setCompareOpen(false)
                              setTimeout(() => openAdGate(item, 'all'), 100)
                            }}
                          >
                            <Download className="mr-1 h-3 w-3" />
                            Download
                          </Button>
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Floating compare bar (shows when items are selected)
export function CompareBar() {
  const { compareIds, setCompareOpen, clearCompare, toggleCompare } = useLibrary()

  if (compareIds.length === 0) return null

  return (
    <div className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2">
      <div className="flex items-center gap-2 rounded-full border border-border/60 bg-card/95 px-3 py-2 shadow-2xl backdrop-blur">
        <div className="flex items-center gap-1.5">
          <div className="grid h-6 w-6 place-items-center rounded-full bg-violet-500/15 text-violet-300">
            <GitCompare className="h-3 w-3" />
          </div>
          <span className="text-xs font-semibold">
            {compareIds.length} selected
          </span>
        </div>
        <div className="h-4 w-px bg-border/60" />
        <Button
          size="sm"
          className="h-8 rounded-full text-xs"
          onClick={() => setCompareOpen(true)}
          disabled={compareIds.length < 1}
        >
          Compare Now
        </Button>
        <button
          onClick={clearCompare}
          className="rounded-full p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
          aria-label="Clear compare"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  )
}
