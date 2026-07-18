'use client'

import { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Download, ShieldCheck, FileText, CheckCircle2, Loader2 } from 'lucide-react'
import { useLibrary } from './store'
import { downloadBundle, type DownloadChoice } from './download-utils'
import type { ItemDetail } from '@/lib/types'

const COUNTDOWN_SECONDS = 6

function AdGateContent({
  item,
  file,
  onClose,
  closeDetail,
}: {
  item: ItemDetail
  file: 'all' | 'prompt' | 'workflow' | 'audience'
  onClose: () => void
  closeDetail: () => void
}) {
  const [remaining, setRemaining] = useState(COUNTDOWN_SECONDS)
  const [ready, setReady] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const t = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          clearInterval(t)
          setReady(true)
          return 0
        }
        return r - 1
      })
    }, 1000)
    return () => clearInterval(t)
  }, [])

  const handleDownload = async () => {
    if (!ready) return
    setDownloading(true)
    await downloadBundle(item, file as DownloadChoice)
    setTimeout(() => {
      setDownloading(false)
      setDone(true)
    }, 800)
  }

  const handleClose = () => {
    onClose()
    if (done) closeDetail()
  }

  const fileLabel =
    file === 'all'
      ? 'Trinity Bundle (3 .md files)'
      : file === 'prompt'
      ? 'The Prompt (.md)'
      : file === 'workflow'
      ? 'Workflow & Execution (.md)'
      : 'Target Audience (.md)'

  return (
    <DialogContent className="max-w-lg overflow-hidden border-border/70 bg-card p-0">
      <DialogTitle className="sr-only">Download gate</DialogTitle>
      <DialogDescription className="sr-only">
        A short sponsor message appears before your download is unlocked.
      </DialogDescription>

      {/* Header */}
      <div className="border-b border-border/60 bg-gradient-to-r from-emerald-500/10 via-transparent to-violet-500/10 px-5 py-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-emerald-400" />
          <h3 className="text-sm font-bold">
            {done ? 'Download started' : 'Sponsor message · Download unlocks shortly'}
          </h3>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          To keep our autonomous agent generating 200 free items daily, this library is supported
          by ads. Your file unlocks automatically — no clicks required.
        </p>
      </div>

      {/* AdSense placeholder (policy-compliant: real ad unit slot) */}
      <div className="px-5 py-4">
        <div className="relative grid min-h-[180px] place-items-center overflow-hidden rounded-xl border border-dashed border-border/70 bg-background/60">
          <div className="absolute right-2 top-2 rounded bg-muted/70 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-muted-foreground">
            Ad
          </div>
          <div className="text-center">
            <div className="mb-2 inline-grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-br from-emerald-500/20 to-violet-500/20">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <p className="text-sm font-semibold">Sponsored content area</p>
            <p className="mt-1 text-[11px] text-muted-foreground">
              Google AdSense responsive display unit
            </p>
            <code className="mt-2 inline-block rounded bg-muted/60 px-2 py-0.5 text-[10px] text-muted-foreground">
              &lt;ins class=&quot;adsbygoogle&quot; data-ad-slot=&quot;…&quot;&gt;
            </code>
          </div>
        </div>
      </div>

      {/* Action */}
      <div className="border-t border-border/60 px-5 py-4">
        <div className="mb-3 flex items-center justify-between gap-2 text-xs">
          <span className="text-muted-foreground">
            Unlocking: <strong className="text-foreground">{fileLabel}</strong>
          </span>
          {done ? (
            <span className="inline-flex items-center gap-1 font-semibold text-emerald-400">
              <CheckCircle2 className="h-3.5 w-3.5" /> Complete
            </span>
          ) : ready ? (
            <span className="font-semibold text-emerald-400">Ready</span>
          ) : (
            <span className="inline-flex items-center gap-1.5 font-semibold text-amber-400">
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              {remaining}s…
            </span>
          )}
        </div>

        {/* progress */}
        <div className="mb-4 h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-violet-500 transition-all duration-1000 ease-linear"
            style={{ width: `${((COUNTDOWN_SECONDS - remaining) / COUNTDOWN_SECONDS) * 100}%` }}
          />
        </div>

        <div className="flex gap-2">
          <Button
            onClick={handleDownload}
            disabled={!ready || downloading || done}
            className="flex-1 rounded-full"
            size="lg"
          >
            {done ? (
              <>
                <CheckCircle2 className="mr-2 h-4 w-4" /> Downloaded
              </>
            ) : downloading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Preparing files…
              </>
            ) : ready ? (
              <>
                <Download className="mr-2 h-4 w-4" /> Download {fileLabel}
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" /> Please wait {remaining}s
              </>
            )}
          </Button>
          <Button variant="ghost" size="lg" className="rounded-full" onClick={handleClose}>
            {done ? 'Close' : 'Cancel'}
          </Button>
        </div>

        <p className="mt-3 text-center text-[10px] text-muted-foreground">
          Files include a small attribution footer with a backlink to support the project.
        </p>
      </div>
    </DialogContent>
  )
}

export function AdGateModal() {
  const { adGateOpen, adGateTarget, adGateFile, closeAdGate, closeDetail } = useLibrary()

  return (
    <Dialog open={adGateOpen} onOpenChange={(o) => !o && closeAdGate()}>
      {adGateOpen && adGateTarget ? (
        <AdGateContent
          key={adGateTarget.id + String(adGateFile)}
          item={adGateTarget}
          file={adGateFile}
          onClose={closeAdGate}
          closeDetail={closeDetail}
        />
      ) : null}
    </Dialog>
  )
}
