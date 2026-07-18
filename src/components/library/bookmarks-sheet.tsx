'use client'

import { Bookmark, Trash2, X, FileText, Workflow, Download } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useBookmarks } from './use-bookmarks'
import { useLibrary } from './store'
import { formatCompact } from './stats-bar'

export function BookmarksSheet({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (o: boolean) => void
}) {
  const { list, remove, clear, count, loaded } = useBookmarks()
  const openDetail = useLibrary((s) => s.openDetail)

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex w-full flex-col gap-0 border-border/70 bg-card p-0 sm:max-w-md">
        <SheetHeader className="border-b border-border/60 px-5 py-4">
          <div className="flex items-center justify-between pr-6">
            <div className="flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-amber-500/15 text-amber-400">
                <Bookmark className="h-4 w-4 fill-current" />
              </div>
              <div>
                <SheetTitle className="text-base">Your Bookmarks</SheetTitle>
                <SheetDescription className="text-xs">
                  Saved locally in this browser · {count} item{count === 1 ? '' : 's'}
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
                <Trash2 className="mr-1 h-3 w-3" /> Clear all
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
                <Bookmark className="mb-3 h-8 w-8 text-muted-foreground/50" />
                <p className="text-sm font-medium">No bookmarks yet</p>
                <p className="mt-1 max-w-[220px] text-xs text-muted-foreground">
                  Tap the bookmark icon on any prompt or skill to save it here for quick access.
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {list.map((it) => (
                  <div
                    key={it.id}
                    className="group flex items-center gap-2.5 rounded-xl border border-border/60 bg-background/40 p-3 card-hover hover:border-primary/40"
                  >
                    <span
                      className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ${
                        it.type === 'prompt'
                          ? 'bg-emerald-500/15 text-emerald-400'
                          : 'bg-violet-500/15 text-violet-300'
                      }`}
                    >
                      {it.type === 'prompt' ? (
                        <FileText className="h-4 w-4" />
                      ) : (
                        <Workflow className="h-4 w-4" />
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
                        {it.niche} · ★ {it.rating.toFixed(1)} · {formatCompact(it.downloadCount)}{' '}
                        dl
                      </p>
                    </button>
                    <button
                      onClick={() => remove(it.id)}
                      className="shrink-0 rounded-md p-1.5 text-muted-foreground opacity-0 transition hover:bg-destructive/10 hover:text-destructive group-hover:opacity-100"
                      aria-label="Remove bookmark"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </ScrollArea>

        {count > 0 && (
          <div className="border-t border-border/60 p-3">
            <p className="mb-2 text-center text-[10px] text-muted-foreground">
              Bookmarks are stored only in your browser (localStorage).
            </p>
            <div className="flex items-center justify-center gap-1.5 text-[10px] text-muted-foreground">
              <Download className="h-3 w-3" />
              Download each item individually from its detail page
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
