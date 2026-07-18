'use client'

import { useEffect, useRef } from 'react'
import { useLibrary } from './store'

interface GKeyAction {
  key: string
  action: () => void
  label: string
}

// Hook that implements G+key keyboard navigation sequences.
// Press 'G' then a second key within 1.5s to trigger an action.
export function useGKeyNavigation() {
  const {
    setFilterType,
    setFilterCategory,
    setBookmarksOpen,
    setCompareOpen,
    setHistoryOpen,
    openLegal,
  } = useLibrary()
  const waitingForSecondKey = useRef(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const goLibrary = (type: 'all' | 'prompt' | 'skill' | 'workflow') => {
      setFilterType(type)
      setFilterCategory('all')
      setTimeout(() => document.getElementById('library')?.scrollIntoView({ behavior: 'smooth' }), 50)
    }

    const actions: Record<string, () => void> = {
      h: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
      p: () => goLibrary('prompt'),
      s: () => goLibrary('skill'),
      w: () => goLibrary('workflow'),
      b: () => setBookmarksOpen(true),
      c: () => setCompareOpen(true),
      r: () => setHistoryOpen(true),
      a: () => openLegal('about'),
    }

    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) return
      if (e.metaKey || e.ctrlKey || e.altKey) return

      const key = e.key.toLowerCase()

      if (waitingForSecondKey.current) {
        // Clear the timeout
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        waitingForSecondKey.current = false

        if (actions[key]) {
          e.preventDefault()
          actions[key]()
        }
        return
      }

      if (key === 'g') {
        e.preventDefault()
        waitingForSecondKey.current = true
        // Auto-cancel after 1.5s
        timeoutRef.current = setTimeout(() => {
          waitingForSecondKey.current = false
        }, 1500)
      }
    }

    window.addEventListener('keydown', handler)
    return () => {
      window.removeEventListener('keydown', handler)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [
    setFilterType,
    setFilterCategory,
    setBookmarksOpen,
    setCompareOpen,
    setHistoryOpen,
    openLegal,
  ])
}
