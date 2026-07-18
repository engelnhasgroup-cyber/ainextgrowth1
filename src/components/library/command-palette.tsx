'use client'

import { useEffect, useState, useCallback } from 'react'
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from '@/components/ui/command'
import {
  Search, Sparkles, Zap, FileText, TrendingUp, Bot, Info, Mail,
  Shield, FileCheck, Rss, Home, ArrowRight, Flame, Star,
} from 'lucide-react'
import { useLibrary } from './store'
import type { ItemSummary } from '@/lib/types'

export function CommandPalette({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (o: boolean) => void
}) {
  const [items, setItems] = useState<ItemSummary[]>([])
  const [loading, setLoading] = useState(false)
  const { openDetail, setFilterType, setFilterCategory, setSort, openLegal } = useLibrary()

  // Global keyboard shortcut Cmd+K / Ctrl+K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        onOpenChange(!open)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onOpenChange])

  // Fetch items for search (debounced via cmdk's built-in)
  const onSearch = useCallback(async (q: string) => {
    if (!q || q.length < 2) {
      setItems([])
      return
    }
    setLoading(true)
    try {
      const res = await fetch(`/api/items?search=${encodeURIComponent(q)}&limit=8`)
      const data = await res.json()
      setItems(data.items || [])
    } catch {
      setItems([])
    } finally {
      setLoading(false)
    }
  }, [])

  const goLibrary = (type: 'all' | 'prompt' | 'skill' | 'workflow') => {
    setFilterType(type)
    setFilterCategory('all')
    onOpenChange(false)
    setTimeout(() => document.getElementById('library')?.scrollIntoView({ behavior: 'smooth' }), 50)
  }

  const goSort = (sort: 'trending' | 'newest' | 'popular' | 'downloads' | 'rating') => {
    setSort(sort)
    setFilterType('all')
    setFilterCategory('all')
    onOpenChange(false)
    setTimeout(() => document.getElementById('library')?.scrollIntoView({ behavior: 'smooth' }), 50)
  }

  const openItem = (slug: string) => {
    onOpenChange(false)
    setTimeout(() => openDetail(slug), 100)
  }

  const openPage = (page: 'about' | 'contact' | 'privacy' | 'terms') => {
    onOpenChange(false)
    setTimeout(() => openLegal(page), 100)
  }

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search prompts, skills, workflows… or type a command" onValueChange={onSearch} />
      <CommandList>
        <CommandEmpty>{loading ? 'Searching…' : 'No results found.'}</CommandEmpty>

        {/* Search results */}
        {items.length > 0 && (
          <CommandGroup heading="Items" >
            {items.map((item) => (
              <CommandItem
                key={item.id}
                value={`${item.title} ${item.niche} ${item.tags.join(' ')}`}
                onSelect={() => openItem(item.slug)}
                className="gap-2"
              >
                <span
                  className={`grid h-7 w-7 shrink-0 place-items-center rounded-md ${
                    item.type === 'prompt'
                      ? 'bg-emerald-500/15 text-emerald-400'
                      : item.type === 'skill'
                      ? 'bg-violet-500/15 text-violet-300'
                      : 'bg-amber-500/15 text-amber-400'
                  }`}
                >
                  {item.type === 'prompt' ? <Zap className="h-3.5 w-3.5" /> : item.type === 'skill' ? <FileText className="h-3.5 w-3.5" /> : <TrendingUp className="h-3.5 w-3.5" />}
                </span>
                <div className="flex min-w-0 flex-1 flex-col">
                  <span className="truncate text-sm font-medium">{item.title}</span>
                  <span className="truncate text-[10px] text-muted-foreground">{item.niche} · ★ {item.rating.toFixed(1)}</span>
                </div>
                {item.trending && <Flame className="h-3 w-3 shrink-0 text-amber-400" />}
                <ArrowRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        <CommandSeparator />

        {/* Navigation */}
        <CommandGroup heading="Navigate">
          <CommandItem onSelect={() => { onOpenChange(false); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
            <Home className="mr-2 h-4 w-4" /> Home
          </CommandItem>
          <CommandItem onSelect={() => goLibrary('prompt')}>
            <Zap className="mr-2 h-4 w-4 text-emerald-400" /> Browse Prompts
          </CommandItem>
          <CommandItem onSelect={() => goLibrary('skill')}>
            <FileText className="mr-2 h-4 w-4 text-violet-300" /> Browse Skills
          </CommandItem>
          <CommandItem onSelect={() => goLibrary('workflow')}>
            <TrendingUp className="mr-2 h-4 w-4 text-amber-400" /> Browse Workflows
          </CommandItem>
          <CommandItem onSelect={() => { onOpenChange(false); setTimeout(() => document.getElementById('agent')?.scrollIntoView({ behavior: 'smooth' }), 50) }}>
            <Bot className="mr-2 h-4 w-4" /> Meet the AI Agent
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        {/* Quick sort */}
        <CommandGroup heading="Sort Library">
          <CommandItem onSelect={() => goSort('trending')}>
            <Flame className="mr-2 h-4 w-4 text-amber-400" /> Trending
          </CommandItem>
          <CommandItem onSelect={() => goSort('newest')}>
            <Sparkles className="mr-2 h-4 w-4 text-emerald-400" /> Newest
          </CommandItem>
          <CommandItem onSelect={() => goSort('popular')}>
            <Star className="mr-2 h-4 w-4 text-amber-400" /> Most Viewed
          </CommandItem>
          <CommandItem onSelect={() => goSort('downloads')}>
            <FileText className="mr-2 h-4 w-4" /> Most Downloaded
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        {/* Pages */}
        <CommandGroup heading="Pages">
          <CommandItem onSelect={() => openPage('about')}>
            <Info className="mr-2 h-4 w-4" /> About Us
          </CommandItem>
          <CommandItem onSelect={() => openPage('contact')}>
            <Mail className="mr-2 h-4 w-4" /> Contact
          </CommandItem>
          <CommandItem onSelect={() => openPage('privacy')}>
            <Shield className="mr-2 h-4 w-4" /> Privacy Policy
          </CommandItem>
          <CommandItem onSelect={() => openPage('terms')}>
            <FileCheck className="mr-2 h-4 w-4" /> Terms of Service
          </CommandItem>
          <CommandItem onSelect={() => { onOpenChange(false); setTimeout(() => window.open('/rss.xml', '_blank'), 100) }}>
            <Rss className="mr-2 h-4 w-4" /> RSS Feed
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
