'use client'

import { useEffect } from 'react'
import type { CategoryInfo, ItemSummary, LibraryStats } from '@/lib/types'
import { Header } from './header'
import { Navbar } from './navbar'
import { Hero } from './hero'
import { TrendingSection } from './trending-section'
import { CategoriesSection } from './categories-section'
import { HowItWorksSection } from './how-it-works'
import { LibrarySection } from './library-section'
import { AgentPanel } from './agent-panel'
import { Footer } from './footer'
import { DetailModal } from './detail-modal'
import { AdGateModal } from './ad-gate-modal'
import { LegalPages } from './legal-pages'
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
  const { openDetail, openLegal, legalPage } = useLibrary()

  // Deep-link support: /?item=<slug> or /?page=<legal> on load
  useEffect(() => {
    if (typeof window === 'undefined') return
    const params = new URLSearchParams(window.location.search)
    const itemSlug = params.get('item')
    const page = params.get('page')
    if (itemSlug) {
      const url = new URL(window.location.href)
      url.searchParams.delete('item')
      window.history.replaceState({}, '', url.toString())
      openDetail(itemSlug)
    } else if (page && ['about', 'contact', 'privacy', 'terms'].includes(page)) {
      const url = new URL(window.location.href)
      url.searchParams.delete('page')
      window.history.replaceState({}, '', url.toString())
      openLegal(page as any)
    }
  }, [openDetail, openLegal])

  // Hide main content when a legal page is open (full-screen view)
  if (legalPage) {
    return (
      <div id="top" className="flex min-h-screen flex-col">
        <Header stats={stats} />
        <LegalPages />
      </div>
    )
  }

  return (
    <div id="top" className="flex min-h-screen flex-col">
      <Header stats={stats} />
      <Navbar />
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

      {/* Modals & overlays */}
      <DetailModal />
      <AdGateModal />
    </div>
  )
}
