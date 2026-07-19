'use client'

import { useEffect, useState } from 'react'

// Tracks the scroll progress (0–100) of a scroll container by ref.
export function useScrollProgress(ref: React.RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const { scrollTop, scrollHeight, clientHeight } = el
        const max = scrollHeight - clientHeight
        setProgress(max > 0 ? Math.min(100, (scrollTop / max) * 100) : 0)
      })
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      el.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [ref])

  return progress
}
