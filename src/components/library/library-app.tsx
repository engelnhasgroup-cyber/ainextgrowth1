'use client'

import { useEffect } from 'react'
import type { CategoryInfo, ItemSummary, LibraryStats } from '@/lib/types'
import { Header } from './header'
import { Hero } from './hero'
import { TrendingSection } from './trending-section'
import { CategoriesSection } from './categories-section'
import { HowItWorksSection } from './how-it-works'
import { LibrarySection } from './library-section'
import { AgentPanel } from './agent-panel'
import { Footer } from './footer'
import { DetailModal } from './detail-modal'
import { AdGateModal } from './ad-gate-modal'
import { useLibrary } from './store'

export function LibraryApp({
  stats,
  categories,
  trending,
  initialItems,
  initialTotal,
}: {
  stats: LibraryStats
  categories: CategoryInfo[]
  trending: ItemSummary[]
  initialItems: ItemSummary[]
  initialTotal: number
}) {
  const openDetail = useLibrary((s) => s.openDetail)

  // Deep-link support: /?item=<slug> opens the detail modal on load
  useEffect(() => {
    if (typeof window === 'undefined') return
    const params = new URLSearchParams(window.location.search)
    const itemSlug = params.get('item')
    if (itemSlug) {
      // clean the URL (replace state) then open
      const url = new URL(window.location.href)
      url.searchParams.delete('item')
      window.history.replaceState({}, '', url.toString())
      openDetail(itemSlug)
    }
  }, [openDetail])

  return (
    <div id="top" className="flex min-h-screen flex-col">
      <Header stats={stats} />
      <main className="flex-1">
        <Hero stats={stats} />
        <TrendingSection trending={trending} />
        <CategoriesSection categories={categories} />
        <HowItWorksSection />
        <LibrarySection
          categories={categories}
          initialItems={initialItems}
          initialTotal={initialTotal}
        />
        <AgentPanel
          todayGenerated={stats.todayGenerated}
          onGenerated={() => {
            /* new item handled via openDetail inside panel */
          }}
        />
      </main>
      <Footer categories={categories} totalItems={stats.totalItems} />

      {/* Modals */}
      <DetailModal />
      <AdGateModal />
    </div>
  )
}
