'use client'

import { useEffect, useState } from 'react'
import { List, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'

interface TocItem {
  id: string
  text: string
  level: number
}

// Extracts H2/H3 headings from a markdown string into a TOC.
export function extractToc(markdown: string): TocItem[] {
  if (!markdown) return []
  const lines = markdown.split('\n')
  const items: TocItem[] = []
  let inFence = false
  for (const line of lines) {
    if (line.trim().startsWith('```')) {
      inFence = !inFence
      continue
    }
    if (inFence) continue
    const m = line.match(/^(#{2,3})\s+(.*)/)
    if (m) {
      const text = m[2].replace(/[*_`~]/g, '').trim()
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
      items.push({ id, text, level: m[1].length })
    }
  }
  return items
}

export function TableOfContents({
  toc,
  onJump,
}: {
  toc: TocItem[]
  onJump: (id: string) => void
}) {
  const [activeId, setActiveId] = useState<string>('')

  // Track which heading is in view (called by parent via ref)
  useEffect(() => {
    const handler = (e: Event) => {
      setActiveId((e as CustomEvent).detail as string)
    }
    window.addEventListener('nexusai-toc-active', handler)
    return () => window.removeEventListener('nexusai-toc-active', handler)
  }, [])

  if (toc.length === 0) return null

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 rounded-full text-xs">
          <List className="mr-1.5 h-3.5 w-3.5" />
          Contents
          <span className="ml-1 rounded-full bg-muted px-1.5 text-[9px] font-bold">
            {toc.length}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-0" align="end">
        <div className="border-b border-border/60 px-3 py-2">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
            On this page
          </p>
        </div>
        <ScrollArea className="max-h-72">
          <div className="p-2">
            {toc.map((item) => (
              <button
                key={item.id}
                onClick={() => onJump(item.id)}
                className={`block w-full truncate rounded-md px-2 py-1.5 text-left text-[11px] transition-colors ${
                  activeId === item.id
                    ? 'bg-primary/10 font-medium text-primary'
                    : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                } ${item.level === 3 ? 'pl-5' : ''}`}
              >
                {item.text}
              </button>
            ))}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  )
}

// Always-visible sticky TOC for the detail modal sidebar (desktop).
export function StickyToc({
  toc,
  onJump,
}: {
  toc: TocItem[]
  onJump: (id: string) => void
}) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const handler = (e: Event) => {
      setActiveId((e as CustomEvent).detail as string)
    }
    window.addEventListener('nexusai-toc-active', handler)
    return () => window.removeEventListener('nexusai-toc-active', handler)
  }, [])

  if (toc.length === 0) return null

  return (
    <nav className="space-y-0.5">
      {toc.map((item) => (
        <button
          key={item.id}
          onClick={() => onJump(item.id)}
          className={`block w-full truncate border-l-2 py-1 pl-2.5 text-left text-[11px] transition-colors ${
            activeId === item.id
              ? 'border-primary font-medium text-primary'
              : 'border-border/40 text-muted-foreground hover:border-foreground/30 hover:text-foreground'
          } ${item.level === 3 ? 'pl-5' : ''}`}
        >
          {item.text}
        </button>
      ))}
    </nav>
  )
}
