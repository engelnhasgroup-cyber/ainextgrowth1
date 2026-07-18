'use client'

import { useState } from 'react'
import { Star, ThumbsUp, MessageCircle } from 'lucide-react'
import { toast } from 'sonner'

// Interactive rating widget — lets users rate an item and mark as helpful.
// Stores votes in localStorage (no backend needed for engagement signal).
const STORAGE_KEY = 'nexusai-ratings'

function getRatings(): Record<string, { rating: number; helpful: boolean }> {
  if (typeof window === 'undefined') return {}
  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '{}')
  } catch {
    return {}
  }
}

function saveRating(itemId: string, data: { rating?: number; helpful?: boolean }) {
  const all = getRatings()
  const existing = all[itemId] || { rating: 0, helpful: false }
  all[itemId] = {
    rating: data.rating ?? existing.rating,
    helpful: data.helpful ?? existing.helpful,
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(all))
  window.dispatchEvent(new CustomEvent('nexusai-ratings-changed'))
}

export function RatingWidget({
  itemId,
  baseRating,
  downloadCount,
}: {
  itemId: string
  baseRating: number
  downloadCount: number
}) {
  const [userRating, setUserRating] = useState(0)
  const [helpful, setHelpful] = useState(false)
  const [hovered, setHovered] = useState(0)

  // hydrate from localStorage on mount
  useState(() => {
    const all = getRatings()
    const existing = all[itemId]
    if (existing) {
      if (existing.rating) setUserRating(existing.rating)
      if (existing.helpful) setHelpful(existing.helpful)
    }
  })

  const handleRate = (n: number) => {
    setUserRating(n)
    saveRating(itemId, { rating: n })
    toast.success(`Thanks! You rated this ${n} star${n > 1 ? 's' : ''}.`)
  }

  const handleHelpful = () => {
    const next = !helpful
    setHelpful(next)
    saveRating(itemId, { helpful: next })
    toast.success(next ? 'Marked as helpful!' : 'Removed helpful mark')
  }

  const displayRating = userRating > 0 ? ((baseRating * 10 + userRating) / 11).toFixed(1) : baseRating.toFixed(1)

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-xl border border-border/60 bg-card/40 p-3">
      {/* Star rating */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-0.5" onMouseLeave={() => setHovered(0)}>
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              onClick={() => handleRate(n)}
              onMouseEnter={() => setHovered(n)}
              className="transition-transform hover:scale-110"
              aria-label={`Rate ${n} stars`}
            >
              <Star
                className={`h-5 w-5 transition-colors ${
                  (hovered || userRating) >= n
                    ? 'fill-amber-400 text-amber-400'
                    : 'fill-transparent text-muted-foreground/40'
                }`}
              />
            </button>
          ))}
        </div>
        <div className="flex flex-col leading-none">
          <span className="text-sm font-bold text-amber-400">{displayRating}</span>
          <span className="text-[9px] text-muted-foreground">
            {userRating > 0 ? 'your rating' : 'community'}
          </span>
        </div>
      </div>

      <div className="h-6 w-px bg-border/60" />

      {/* Helpful button */}
      <button
        onClick={handleHelpful}
        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
          helpful
            ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400'
            : 'border-border/60 bg-background/40 text-muted-foreground hover:text-foreground'
        }`}
      >
        <ThumbsUp className={`h-3.5 w-3.5 ${helpful ? 'fill-current' : ''}`} />
        {helpful ? 'Helpful' : 'Mark helpful'}
      </button>

      {/* Downloads stat */}
      <div className="ml-auto inline-flex items-center gap-1.5 text-[11px] text-muted-foreground">
        <MessageCircle className="h-3.5 w-3.5" />
        {downloadCount.toLocaleString()} downloads
      </div>
    </div>
  )
}
