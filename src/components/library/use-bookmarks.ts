'use client'

import { useEffect, useState, useCallback } from 'react'
import type { ItemSummary } from '@/lib/types'

const KEY = 'nexusai-bookmarks'

function read(): Record<string, ItemSummary> {
  if (typeof window === 'undefined') return {}
  try {
    const raw = window.localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function write(map: Record<string, ItemSummary>) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(KEY, JSON.stringify(map))
    // notify other components
    window.dispatchEvent(new CustomEvent('nexusai-bookmarks-changed'))
  } catch {}
}

export function useBookmarks() {
  const [map, setMap] = useState<Record<string, ItemSummary>>({})
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    // Hydrating from localStorage on mount (client-only external system).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMap(read())
    setLoaded(true)
    const onChange = () => setMap(read())
    window.addEventListener('nexusai-bookmarks-changed', onChange)
    window.addEventListener('storage', onChange)
    return () => {
      window.removeEventListener('nexusai-bookmarks-changed', onChange)
      window.removeEventListener('storage', onChange)
    }
  }, [])

  const toggle = useCallback((item: ItemSummary) => {
    setMap((prev) => {
      const next = { ...prev }
      if (next[item.id]) {
        delete next[item.id]
      } else {
        next[item.id] = item
      }
      write(next)
      return next
    })
  }, [])

  const remove = useCallback((id: string) => {
    setMap((prev) => {
      const next = { ...prev }
      delete next[id]
      write(next)
      return next
    })
  }, [])

  const clear = useCallback(() => {
    write({})
    setMap({})
  }, [])

  const has = useCallback((id: string) => !!map[id], [map])
  const list = Object.values(map)

  return { map, list, loaded, toggle, remove, clear, has, count: list.length }
}
