'use client'

import { useState } from 'react'
import { Menu, X, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLibrary } from './store'

interface NavItem {
  label: string
  action: () => void
  badge?: string
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { setFilterType, setFilterCategory, openLegal } = useLibrary()

  const goLibrary = (type: 'all' | 'prompt' | 'skill' | 'workflow') => {
    setFilterType(type)
    setFilterCategory('all')
    setMobileOpen(false)
    setTimeout(() => {
      document.getElementById('library')?.scrollIntoView({ behavior: 'smooth' })
    }, 50)
  }

  const navItems: NavItem[] = [
    { label: 'Home', action: () => { setMobileOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }) } },
    { label: 'Prompts', action: () => goLibrary('prompt') },
    { label: 'Skills', action: () => goLibrary('skill') },
    { label: 'Workflows', action: () => goLibrary('workflow'), badge: 'NEW' },
    { label: 'About', action: () => { openLegal('about'); setMobileOpen(false) } },
    { label: 'Contact', action: () => { openLegal('contact'); setMobileOpen(false) } },
  ]

  return (
    <nav className="sticky top-16 z-30 w-full border-b border-border/40 bg-card/30 backdrop-blur-md">
      <div className="mx-auto flex h-11 max-w-7xl items-center gap-1 px-4 sm:px-6">
        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={item.action}
              className="group relative rounded-full px-3.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
            >
              {item.label}
              {item.badge && (
                <span className="ml-1 rounded-full bg-emerald-500/20 px-1.5 py-0.5 text-[8px] font-bold uppercase text-emerald-400">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="ml-auto hidden items-center gap-3 md:flex">
          <button
            onClick={() => openLegal('privacy')}
            className="text-[11px] text-muted-foreground transition-colors hover:text-foreground"
          >
            Privacy
          </button>
          <button
            onClick={() => openLegal('terms')}
            className="text-[11px] text-muted-foreground transition-colors hover:text-foreground"
          >
            Terms
          </button>
          <a
            href="/rss.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] text-muted-foreground transition-colors hover:text-foreground"
          >
            RSS
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen((o) => !o)}
          className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background/60 px-3 py-1.5 text-xs font-medium md:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-3.5 w-3.5" /> : <Menu className="h-3.5 w-3.5" />}
          Menu
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-border/40 bg-card/80 backdrop-blur-md md:hidden">
          <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
            <div className="grid grid-cols-2 gap-1.5">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={item.action}
                  className="flex items-center justify-between rounded-lg border border-border/50 bg-background/40 px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary/40"
                >
                  {item.label}
                  {item.badge && (
                    <span className="rounded-full bg-emerald-500/20 px-1.5 py-0.5 text-[8px] font-bold uppercase text-emerald-400">
                      {item.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>
            <div className="mt-2 flex items-center justify-center gap-4 border-t border-border/40 pt-3 text-[11px] text-muted-foreground">
              <button onClick={() => { openLegal('privacy'); setMobileOpen(false) }}>Privacy</button>
              <button onClick={() => { openLegal('terms'); setMobileOpen(false) }}>Terms</button>
              <a href="/rss.xml" target="_blank" rel="noopener noreferrer">RSS</a>
              <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer">Sitemap</a>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
