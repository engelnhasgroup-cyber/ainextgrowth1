'use client'

import { useEffect, useState } from 'react'
import {
  Dialog, DialogContent, DialogTitle, DialogDescription,
} from '@/components/ui/dialog'
import { Keyboard, Search, Home, Zap, FileText, TrendingUp, Bookmark, ArrowUp, ArrowDown, GitCompare, History, X } from 'lucide-react'

const SHORTCUTS = [
  { keys: ['⌘', 'K'], label: 'Open command palette', icon: Search, group: 'Global' },
  { keys: ['?'], label: 'Show keyboard shortcuts', icon: Keyboard, group: 'Global' },
  { keys: ['Esc'], label: 'Close modal / dialog', icon: X, group: 'Global' },
  { keys: ['G', 'H'], label: 'Go to Home', icon: Home, group: 'Navigation' },
  { keys: ['G', 'P'], label: 'Browse Prompts', icon: Zap, group: 'Navigation' },
  { keys: ['G', 'S'], label: 'Browse Skills', icon: FileText, group: 'Navigation' },
  { keys: ['G', 'W'], label: 'Browse Workflows', icon: TrendingUp, group: 'Navigation' },
  { keys: ['G', 'B'], label: 'Open Bookmarks', icon: Bookmark, group: 'Navigation' },
  { keys: ['G', 'C'], label: 'Open Compare', icon: GitCompare, group: 'Navigation' },
  { keys: ['G', 'R'], label: 'Recently viewed', icon: History, group: 'Navigation' },
  { keys: ['↑'], label: 'Scroll up', icon: ArrowUp, group: 'Scroll' },
  { keys: ['↓'], label: 'Scroll down', icon: ArrowDown, group: 'Scroll' },
]

export function ShortcutsHelp({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (o: boolean) => void
}) {
  const groups = ['Global', 'Navigation', 'Scroll']

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg gap-0 border-border/70 bg-card p-0">
        <div className="border-b border-border/60 px-5 py-4">
          <div className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary/15 text-primary">
              <Keyboard className="h-4 w-4" />
            </div>
            <div>
              <DialogTitle className="text-base font-bold">Keyboard Shortcuts</DialogTitle>
              <DialogDescription className="text-xs">
                Navigate faster with these shortcuts
              </DialogDescription>
            </div>
          </div>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-4">
          {groups.map((group) => (
            <div key={group} className="mb-4 last:mb-0">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                {group}
              </p>
              <div className="space-y-1">
                {SHORTCUTS.filter((s) => s.group === group).map((s) => (
                  <div
                    key={s.label}
                    className="flex items-center justify-between gap-3 rounded-lg px-2 py-1.5 hover:bg-muted/30"
                  >
                    <div className="flex items-center gap-2">
                      <s.icon className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-xs text-foreground">{s.label}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {s.keys.map((k, i) => (
                        <kbd
                          key={i}
                          className="rounded border border-border/60 bg-muted/60 px-1.5 py-0.5 text-[10px] font-semibold text-foreground"
                        >
                          {k}
                        </kbd>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Hook to listen for ? key
export function useShortcutsHelpTrigger() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Only trigger if not typing in an input
      const target = e.target as HTMLElement
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) return

      if (e.key === '?' && !e.metaKey && !e.ctrlKey) {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return { open, setOpen }
}
