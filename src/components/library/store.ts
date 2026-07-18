'use client'

import { create } from 'zustand'
import type { ItemDetail, ItemSummary } from '@/lib/types'

interface LibraryState {
  // Detail modal
  selectedItem: ItemDetail | null
  relatedItems: ItemSummary[]
  detailOpen: boolean
  detailLoading: boolean
  openDetail: (slug: string) => Promise<void>
  closeDetail: () => void

  // Ad-Gate
  adGateOpen: boolean
  adGateTarget: ItemDetail | null
  adGateFile: 'all' | 'prompt' | 'workflow' | 'audience'
  openAdGate: (item: ItemDetail, file: 'all' | 'prompt' | 'workflow' | 'audience') => void
  closeAdGate: () => void

  // Library filters
  search: string
  filterType: 'all' | 'prompt' | 'skill'
  filterCategory: string
  sort: 'trending' | 'newest' | 'popular' | 'downloads' | 'rating'
  setSearch: (s: string) => void
  setFilterType: (t: 'all' | 'prompt' | 'skill') => void
  setFilterCategory: (c: string) => void
  setSort: (s: 'trending' | 'newest' | 'popular' | 'downloads' | 'rating') => void
}

export const useLibrary = create<LibraryState>((set, get) => ({
  selectedItem: null,
  relatedItems: [],
  detailOpen: false,
  detailLoading: false,

  openDetail: async (slug: string) => {
    set({ detailOpen: true, detailLoading: true, selectedItem: null, relatedItems: [] })
    try {
      const res = await fetch(`/api/items/${slug}`)
      if (!res.ok) throw new Error('not found')
      const data = await res.json()
      set({ selectedItem: data.item, relatedItems: data.related || [], detailLoading: false })
    } catch {
      set({ detailLoading: false, detailOpen: false })
    }
  },

  closeDetail: () => set({ detailOpen: false, selectedItem: null, relatedItems: [] }),

  // Ad-Gate
  adGateOpen: false,
  adGateTarget: null,
  adGateFile: 'all',
  openAdGate: (item, file) =>
    set({ adGateOpen: true, adGateTarget: item, adGateFile: file }),
  closeAdGate: () => set({ adGateOpen: false, adGateTarget: null, adGateFile: 'all' }),

  // Filters
  search: '',
  filterType: 'all',
  filterCategory: 'all',
  sort: 'trending',
  setSearch: (s) => set({ search: s }),
  setFilterType: (t) => set({ filterType: t }),
  setFilterCategory: (c) => set({ filterCategory: c }),
  setSort: (s) => set({ sort: s }),
}))
