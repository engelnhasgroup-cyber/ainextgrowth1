'use client'

import { useEffect, useState } from 'react'
import type { CategoryInfo, ItemSummary, LibraryStats } from '@/lib/types'
import { Header } from './header'
import { Navbar } from './navbar'
import { Hero } from './hero'
import { TrendingSection } from './trending-section'
import { RecentSection } from './recent-section'
import { CategoriesSection } from './categories-section'
import { HowItWorksSection } from './how-it-works'
import { WorkflowsSection } from './workflows-section'
import { EditorsPickSection } from './editors-pick-section'
import { TopRatedSection } from './top-rated-section'
import { LibrarySection } from './library-section'
import { AgentPanel } from './agent-panel'
import { Footer } from './footer'
import { DetailModal } from './detail-modal'
import { AdGateModal } from './ad-gate-modal'
import { LegalPages } from './legal-pages'
import { CommandPalette } from './command-palette'
import { BackToTop } from './back-to-top'
import { CompareModal, CompareBar } from './compare-modal'
import { HistorySheet } from './history-sheet'
import { ShortcutsHelp, useShortcutsHelpTrigger } from './shortcuts-help'
import { useGKeyNavigation } from './use-gkeys'
import { Dashboard } from './dashboard'
import { FloatingWhatsApp } from './floating-whatsapp'
import { useLibrary } from './store'
import { useHistory } from './use-history'

export function LibraryApp({
  stats,
  categories,
  trending,
  recent,
  workflows,
  featured,
  topRated,
  initialItems,
  initialTotal,
}: {
  stats: LibraryStats
  categories: CategoryInfo[]
  trending: ItemSummary[]
  recent: ItemSummary[]
  workflows: ItemSummary[]
  featured: ItemSummary[]
  topRated: ItemSummary[]
  initialItems: ItemSummary[]
  initialTotal: number
}) {
  const { openDetail, openLegal, legalPage, historyOpen, setHistoryOpen, dashboardOpen, setDashboardOpen } = useLibrary()
  const { add: addHistory } = useHistory()
  const { open: shortcutsOpen, setOpen: setShortcutsOpen } = useShortcutsHelpTrigger()
  useGKeyNavigation()
  const [cmdOpen, setCmdOpen] = useState(false)

  // Track detail opens for history
  const selectedItem = useLibrary((s) => s.selectedItem)
  useEffect(() => {
    if (selectedItem?.id) {
      addHistory(selectedItem.id)
    }
  }, [selectedItem?.id, addHistory])

  // Deep-link support: /?item=<slug>, /?page=<legal>, /?unsubscribe=<channel>
  useEffect(() => {
    if (typeof window === 'undefined') return
    const params = new URLSearchParams(window.location.search)
    const itemSlug = params.get('item')
    const page = params.get('page')
    const unsubChannel = params.get('unsubscribe')

    if (unsubChannel) {
      // Redirect to unsubscribe API endpoint (handles HTML response)
      const identifier = params.get('identifier') || params.get('email') || params.get('phone') || ''
      window.location.href = `/api/leads/unsubscribe?channel=${unsubChannel}&identifier=${encodeURIComponent(identifier)}`
      return
    }

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

  // Dashboard view (full-screen)
  if (dashboardOpen) {
    return (
      <div id="top" className="flex min-h-screen flex-col">
        <Header stats={stats} />
        <Dashboard onClose={() => setDashboardOpen(false)} />
      </div>
    )
  }

  // Hide main content when a legal page is open (full-screen view)
  if (legalPage) {
    return (
      <div id="top" className="flex min-h-screen flex-col">
        <Header stats={stats} />
        <Navbar onOpenSearch={() => setCmdOpen(true)} />
        <LegalPages />
        <CommandPalette open={cmdOpen} onOpenChange={setCmdOpen} />
      </div>
    )
  }

  return (
    <div id="top" className="flex min-h-screen flex-col">
      <Header stats={stats} />
      <Navbar onOpenSearch={() => setCmdOpen(true)} />
      <main className="flex-1">
        <Hero stats={stats} />
        <TrendingSection trending={trending} />
        <RecentSection items={recent} />
        <CategoriesSection categories={categories} />
        <EditorsPickSection items={featured} />
        <TopRatedSection items={topRated} />
        <WorkflowsSection items={workflows} />
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
      <Footer categories={categories} totalItems={stats.totalItems} totalDownloads={stats.totalDownloads} />

      {/* Modals & overlays */}
      <DetailModal />
      <AdGateModal />
      <CommandPalette open={cmdOpen} onOpenChange={setCmdOpen} />
      <CompareModal />
      <CompareBar />
      <HistorySheet open={historyOpen} onOpenChange={setHistoryOpen} />
      <ShortcutsHelp open={shortcutsOpen} onOpenChange={setShortcutsOpen} />
      <FloatingWhatsApp />
      <BackToTop />
    </div>
  )
}
