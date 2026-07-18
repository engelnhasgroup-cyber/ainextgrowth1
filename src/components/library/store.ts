'use client'

import { create } from 'zustand'
import type { ItemDetail, ItemSummary } from '@/lib/types'

export type LegalPage = 'about' | 'contact' | 'privacy' | 'terms' | null

interface LibraryState {
  // Detail modal
  selectedItem: ItemDetail | null
  relatedItems: ItemSummary[]
  prevItem: { slug: string; title: string } | null
  nextItem: { slug: string; title: string } | null
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

  // Legal pages view-state (rendered within the single `/` route)
  legalPage: LegalPage
  openLegal: (page: LegalPage) => void
  closeLegal: () => void

  // Bookmarks drawer
  bookmarksOpen: boolean
  setBookmarksOpen: (o: boolean) => void

  // History drawer
  historyOpen: boolean
  setHistoryOpen: (o: boolean) => void

  // Compare feature
  compareIds: string[]
  toggleCompare: (id: string) => void
  clearCompare: () => void
  compareOpen: boolean
  setCompareOpen: (o: boolean) => void

  // Library filters
  search: string
  filterType: 'all' | 'prompt' | 'skill' | 'workflow'
  filterCategory: string
  sort: 'trending' | 'newest' | 'popular' | 'downloads' | 'rating'
  setSearch: (s: string) => void
  setFilterType: (t: 'all' | 'prompt' | 'skill' | 'workflow') => void
  setFilterCategory: (c: string) => void
  setSort: (s: 'trending' | 'newest' | 'popular' | 'downloads' | 'rating') => void
}

export const useLibrary = create<LibraryState>((set, get) => ({
  selectedItem: null,
  relatedItems: [],
  prevItem: null,
  nextItem: null,
  detailOpen: false,
  detailLoading: false,

  openDetail: async (slug: string) => {
    set({ detailOpen: true, detailLoading: true, selectedItem: null, relatedItems: [], prevItem: null, nextItem: null })
    try {
      const res = await fetch(`/api/items/${slug}`)
      if (!res.ok) throw new Error('not found')
      const data = await res.json()
      set({
        selectedItem: data.item,
        relatedItems: data.related || [],
        prevItem: data.prev || null,
        nextItem: data.next || null,
        detailLoading: false,
      })
    } catch {
      set({ detailLoading: false, detailOpen: false })
    }
  },

  closeDetail: () => set({ detailOpen: false, selectedItem: null, relatedItems: [], prevItem: null, nextItem: null }),

  // Ad-Gate
  adGateOpen: false,
  adGateTarget: null,
  adGateFile: 'all',
  openAdGate: (item, file) =>
    set({ adGateOpen: true, adGateTarget: item, adGateFile: file }),
  closeAdGate: () => set({ adGateOpen: false, adGateTarget: null, adGateFile: 'all' }),

  // Legal pages
  legalPage: null,
  openLegal: (page) => set({ legalPage: page }),
  closeLegal: () => set({ legalPage: null }),

  // Bookmarks
  bookmarksOpen: false,
  setBookmarksOpen: (o) => set({ bookmarksOpen: o }),

  // History
  historyOpen: false,
  setHistoryOpen: (o) => set({ historyOpen: o }),

  // Compare (max 3 items)
  compareIds: [],
  toggleCompare: (id) =>
    set((state) => {
      if (state.compareIds.includes(id)) {
        return { compareIds: state.compareIds.filter((x) => x !== id) }
      }
      if (state.compareIds.length >= 3) {
        return { compareIds: [...state.compareIds.slice(1), id] }
      }
      return { compareIds: [...state.compareIds, id] }
    }),
  clearCompare: () => set({ compareIds: [], compareOpen: false }),
  compareOpen: false,
  setCompareOpen: (o) => set({ compareOpen: o }),

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
