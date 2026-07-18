'use client'

import { useState } from 'react'
import { Sparkles, Search, Github, Bookmark, Rss } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import { useLibrary } from './store'
import { useBookmarks } from './use-bookmarks'
import { BookmarksSheet } from './bookmarks-sheet'
import { Stats } from './stats-bar'

export function Header({ stats }: { stats: Stats }) {
  const setSearch = useLibrary((s) => s.setSearch)
  const { count } = useBookmarks()
  const [bookmarksOpen, setBookmarksOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-border/60 glass">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-2 px-3 sm:gap-3 sm:px-6">
          <a href="#top" className="flex shrink-0 items-center gap-2.5">
            <div className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-emerald-500 to-violet-600 shadow-lg shadow-emerald-500/20">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div className="hidden flex-col leading-none sm:flex">
              <span className="text-sm font-bold tracking-tight">
                Nexus<span className="text-gradient">AI</span>
              </span>
              <span className="text-[10px] font-medium text-muted-foreground">
                2026 Library
              </span>
            </div>
          </a>

          <div className="mx-auto max-w-md flex-1">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                document.getElementById('library')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="relative"
            >
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search prompts & skills…"
                onChange={(e) => setSearch(e.target.value)}
                className="h-10 w-full rounded-full border border-border/70 bg-background/70 pl-10 pr-4 text-sm outline-none transition placeholder:text-foreground/50 focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
                aria-label="Search the library"
              />
            </form>
          </div>

          <div className="hidden items-center gap-2 text-xs text-muted-foreground md:flex">
            <div className="flex items-center gap-1.5 rounded-full border border-border/60 bg-background/50 px-3 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="font-medium text-foreground">{stats.todayGenerated}+ new today</span>
            </div>
          </div>

          {/* Bookmarks */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setBookmarksOpen(true)}
            className="relative h-9 w-9 rounded-full border border-border/60 bg-background/60 backdrop-blur"
            aria-label="Open bookmarks"
          >
            <Bookmark className="h-4 w-4" />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-amber-500 px-1 text-[9px] font-bold text-white">
                {count}
              </span>
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="hidden h-9 w-9 rounded-full border border-border/60 bg-background/60 backdrop-blur sm:inline-flex"
            asChild
          >
            <a href="/rss.xml" aria-label="RSS feed" target="_blank" rel="noopener noreferrer">
              <Rss className="h-4 w-4" />
            </a>
          </Button>

          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="hidden h-9 w-9 rounded-full border border-border/60 bg-background/60 backdrop-blur sm:inline-flex"
            asChild
          >
            <a href="#agent" aria-label="AI Agent">
              <Github className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </header>

      <BookmarksSheet open={bookmarksOpen} onOpenChange={setBookmarksOpen} />
    </>
  )
}
