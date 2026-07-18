'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { Search, SlidersHorizontal, X, Loader2, LayoutGrid, List } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { CategoryInfo, ItemSummary, ItemType } from '@/lib/types'
import { useLibrary } from './store'
import { ItemCard, ItemCardSkeleton } from './item-card'
import { ItemListItem } from './item-list-item'
import { motion } from 'framer-motion'

const SORT_OPTIONS = [
  { value: 'trending', label: 'Trending' },
  { value: 'newest', label: 'Newest' },
  { value: 'popular', label: 'Most Viewed' },
  { value: 'downloads', label: 'Most Downloaded' },
  { value: 'rating', label: 'Top Rated' },
] as const

export function LibrarySection({
  categories,
  initialItems,
  initialTotal,
}: {
  categories: CategoryInfo[]
  initialItems: ItemSummary[]
  initialTotal: number
}) {
  const { search, filterType, filterCategory, sort, setSearch, setFilterType, setFilterCategory, setSort } =
    useLibrary()
  const [items, setItems] = useState<ItemSummary[]>(initialItems)
  const [total, setTotal] = useState(initialTotal)
  const [loading, setLoading] = useState(false)
  const [offset, setOffset] = useState(initialItems.length)
  const [searchInput, setSearchInput] = useState(search)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const reqId = useRef(0)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const buildQuery = useCallback(
    (reset: boolean, off: number) => {
      const p = new URLSearchParams()
      p.set('type', filterType)
      p.set('category', filterCategory)
      p.set('sort', sort)
      p.set('limit', '24')
      p.set('offset', String(reset ? 0 : off))
      if (search.trim()) p.set('search', search.trim())
      return p.toString()
    },
    [filterType, filterCategory, sort, search]
  )

  // Reset & refetch on filter changes
  useEffect(() => {
    const id = ++reqId.current
    // Loading flag for an async fetch on dependency change (legitimate pattern).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true)
    setOffset(0)
    fetch(`/api/items?${buildQuery(true, 0)}`)
      .then((r) => r.json())
      .then((data) => {
        if (id !== reqId.current) return
        setItems(data.items || [])
        setTotal(data.total || 0)
        setOffset((data.items || []).length)
        setLoading(false)
      })
      .catch(() => {
        if (id !== reqId.current) return
        setLoading(false)
      })
  }, [filterType, filterCategory, sort, search, buildQuery])

  // Debounced search input
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      if (searchInput !== search) setSearch(searchInput)
    }, 350)
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [searchInput, search, setSearch])

  const loadMore = useCallback(async () => {
    if (loading) return
    setLoading(true)
    const id = ++reqId.current
    const data = await fetch(`/api/items?${buildQuery(false, offset)}`).then((r) => r.json())
    if (id !== reqId.current) {
      setLoading(false)
      return
    }
    setItems((prev) => [...prev, ...(data.items || [])])
    setOffset((prev) => prev + (data.items || []).length)
    setTotal(data.total || total)
    setLoading(false)
  }, [loading, offset, buildQuery, total])

  const activeFilters =
    (filterType !== 'all' ? 1 : 0) + (filterCategory !== 'all' ? 1 : 0)

  const clearFilters = () => {
    setFilterType('all')
    setFilterCategory('all')
    setSort('trending')
    setSearchInput('')
    setSearch('')
  }

  return (
    <section id="library" className="scroll-mt-20 border-b border-border/60 py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            The Full Library
          </h2>
          <p className="mt-1.5 max-w-2xl text-sm text-muted-foreground">
            Browse, filter, and download Trinity Bundles. Each item renders its full content on-page
            for SEO/AEO, then downloads as 3 polished Markdown files.
          </p>
        </div>

        {/* Filters bar */}
        <div className="mb-6 space-y-3">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            {/* type toggle */}
            <div className="inline-flex rounded-full border border-border/70 bg-card/50 p-1">
              {(['all', 'prompt', 'skill', 'workflow'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setFilterType(t)}
                  className={`relative rounded-full px-3 py-1.5 text-xs font-semibold capitalize transition-colors ${
                    filterType === t
                      ? 'bg-primary text-primary-foreground shadow'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {t === 'all' ? 'All' : t === 'workflow' ? 'Workflows' : t + 's'}
                </button>
              ))}
            </div>

            {/* search */}
            <div className="relative flex-1 lg:max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search titles, tags, niches…"
                className="h-10 w-full rounded-full border border-border/70 bg-background/60 pl-10 pr-9 text-sm outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
                aria-label="Search library"
              />
              {searchInput && (
                <button
                  onClick={() => setSearchInput('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* sort + view toggle */}
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as typeof sort)}
                className="h-10 rounded-full border border-border/70 bg-background/60 px-3 pr-8 text-xs font-medium outline-none focus:border-primary/60"
                aria-label="Sort by"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              {/* view mode toggle */}
              <div className="inline-flex rounded-full border border-border/70 bg-card/50 p-0.5">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`grid h-9 w-9 place-items-center rounded-full transition-colors ${
                    viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                  }`}
                  aria-label="Grid view"
                >
                  <LayoutGrid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`grid h-9 w-9 place-items-center rounded-full transition-colors ${
                    viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                  }`}
                  aria-label="List view"
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* category chips */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setFilterCategory('all')}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                filterCategory === 'all'
                  ? 'bg-primary text-primary-foreground'
                  : 'border border-border/60 bg-card/40 text-muted-foreground hover:text-foreground'
              }`}
            >
              All Categories
              <span className={`rounded-full px-1.5 py-0.5 text-[9px] font-bold ${
                filterCategory === 'all' ? 'bg-primary-foreground/20' : 'bg-muted/60'
              }`}>
                {categories.reduce((sum, c) => sum + (c.itemCount || 0), 0)}
              </span>
            </button>
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setFilterCategory(c.slug)}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  filterCategory === c.slug
                    ? 'bg-primary text-primary-foreground'
                    : 'border border-border/60 bg-card/40 text-muted-foreground hover:text-foreground'
                }`}
              >
                {c.name}
                {c.itemCount != null && (
                  <span className={`rounded-full px-1.5 py-0.5 text-[9px] font-bold ${
                    filterCategory === c.slug ? 'bg-primary-foreground/20' : 'bg-muted/60'
                  }`}>
                    {c.itemCount}
                  </span>
                )}
              </button>
            ))}
            {activeFilters > 0 && (
              <button
                onClick={clearFilters}
                className="ml-1 inline-flex items-center gap-1 rounded-full border border-border/60 px-2.5 py-1 text-xs text-muted-foreground hover:text-foreground"
              >
                <X className="h-3 w-3" />
                Clear
              </button>
            )}
          </div>

          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>
              <Badge variant="secondary" className="mr-1.5">{total}</Badge>
              items found
            </span>
            {loading && (
              <span className="inline-flex items-center gap-1.5">
                <Loader2 className="h-3 w-3 animate-spin" />
                Loading…
              </span>
            )}
          </div>
        </div>

        {/* grid / list */}
        {items.length === 0 && !loading ? (
          <div className="grid place-items-center rounded-2xl border border-dashed border-border/70 bg-card/20 py-20 text-center">
            <div className="max-w-sm">
              <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-muted/40">
                <Search className="h-7 w-7 text-muted-foreground/60" />
              </div>
              <p className="text-base font-semibold">No items match your filters</p>
              <p className="mt-1.5 text-sm text-muted-foreground">
                Try clearing filters, using a different keyword, or browsing all categories.
              </p>
              <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
                <Button variant="default" size="sm" className="rounded-full" onClick={clearFilters}>
                  Reset filters
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full"
                  asChild
                >
                  <a href="#categories">Browse categories</a>
                </Button>
              </div>
            </div>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((item, i) => (
              <ItemCard key={item.id} item={item} index={i} />
            ))}
            {loading &&
              Array.from({ length: 4 }).map((_, i) => <ItemCardSkeleton key={`s-${i}`} />)}
          </div>
        ) : (
          <div className="space-y-2">
            {items.map((item, i) => (
              <ItemListItem key={item.id} item={item} index={i} />
            ))}
            {loading &&
              Array.from({ length: 3 }).map((_, i) => (
                <div key={`s-${i}`} className="h-20 animate-pulse rounded-xl border border-border/60 bg-card/40" />
              ))}
          </div>
        )}

        {/* load more */}
        {!loading && items.length < total && (
          <div className="mt-8 flex justify-center">
            <Button variant="outline" size="lg" className="rounded-full" onClick={loadMore}>
              Load more ({total - items.length} remaining)
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
