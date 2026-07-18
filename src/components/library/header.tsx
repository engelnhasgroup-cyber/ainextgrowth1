'use client'

import { Sparkles, Search, Github, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import { useLibrary } from './store'
import { Stats } from './stats-bar'

export function Header({ stats }: { stats: Stats }) {
  const setSearch = useLibrary((s) => s.setSearch)

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 glass">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6">
        <a href="#top" className="flex items-center gap-2.5 shrink-0">
          <div className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-emerald-500 to-violet-600 shadow-lg shadow-emerald-500/20">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div className="hidden sm:flex flex-col leading-none">
            <span className="text-sm font-bold tracking-tight">
              Nexus<span className="text-gradient">AI</span>
            </span>
            <span className="text-[10px] text-muted-foreground font-medium">2026 Library</span>
          </div>
        </a>

        <div className="flex-1 max-w-md mx-auto">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              const el = document.getElementById('library')
              el?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="relative"
          >
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search 2M+ prompts & skills…"
              onChange={(e) => setSearch(e.target.value)}
              className="h-10 w-full rounded-full border border-border/70 bg-background/70 pl-10 pr-4 text-sm outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
              aria-label="Search the library"
            />
          </form>
        </div>

        <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5 rounded-full border border-border/60 bg-background/50 px-3 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="font-medium text-foreground">{stats.todayGenerated}+ new today</span>
          </div>
        </div>

        <ThemeToggle />
        <Button
          variant="ghost"
          size="icon"
          className="hidden sm:inline-flex"
          asChild
        >
          <a href="#agent" aria-label="AI Agent">
            <Github className="h-4 w-4" />
          </a>
        </Button>
        <Button variant="ghost" size="icon" className="md:hidden" aria-label="Menu">
          <Menu className="h-4 w-4" />
        </Button>
      </div>
    </header>
  )
}
