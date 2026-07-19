'use client'

import { useEffect, useState, useCallback } from 'react'
import type { ItemSummary } from '@/lib/types'

const KEY = 'nexusai-history'
const MAX = 20

function read(): string[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function write(ids: string[]) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(KEY, JSON.stringify(ids.slice(0, MAX)))
    window.dispatchEvent(new CustomEvent('nexusai-history-changed'))
  } catch {}
}

export function useHistory() {
  const [ids, setIds] = useState<string[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    // Hydrating from localStorage on mount (client-only external system).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIds(read())
    setLoaded(true)
    const onChange = () => setIds(read())
    window.addEventListener('nexusai-history-changed', onChange)
    window.addEventListener('storage', onChange)
    return () => {
      window.removeEventListener('nexusai-history-changed', onChange)
      window.removeEventListener('storage', onChange)
    }
  }, [])

  const add = useCallback((id: string) => {
    setIds((prev) => {
      const filtered = prev.filter((x) => x !== id)
      const next = [id, ...filtered].slice(0, MAX)
      write(next)
      return next
    })
  }, [])

  const remove = useCallback((id: string) => {
    setIds((prev) => {
      const next = prev.filter((x) => x !== id)
      write(next)
      return next
    })
  }, [])

  const clear = useCallback(() => {
    write([])
    setIds([])
  }, [])

  return { ids, loaded, add, remove, clear, count: ids.length }
}
