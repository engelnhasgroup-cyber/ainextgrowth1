'use client'

import { useState, useRef, useEffect, useMemo } from 'react'
import {
  Dialog, DialogContent, DialogTitle, DialogDescription, DialogHeader,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ReactMarkdown from 'react-markdown'
import {
  Download, Eye, Star, Flame, FileText, Workflow, Users, Link2,
  Quote, HelpCircle, Tag, Wrench, ArrowRight, Loader2, Package,
  Bookmark, Check, Sparkles, BadgeCheck, Clock, ChevronLeft, ChevronRight,
} from 'lucide-react'
import { useLibrary } from './store'
import { formatCompact } from './stats-bar'
import { ShareMenu, CopyPromptButton } from './share-menu'
import { useBookmarks } from './use-bookmarks'
import { useScrollProgress } from './use-scroll-progress'
import { TableOfContents, StickyToc, extractToc } from './table-of-contents'
import { RatingWidget } from './rating-widget'

const CAT_COLORS: Record<string, string> = {
  'seo-content-marketing': '#10b981',
  'software-engineering': '#8b5cf6',
  'data-analytics': '#f59e0b',
  'business-strategy': '#f43f5e',
  'design-creative': '#06b6d4',
  'sales-growth': '#fb923c',
  'education-research': '#14b8a6',
  'automation-agents': '#d946ef',
}

function AdSlot({ label, className }: { label: string; className?: string }) {
  return (
    <div
      className={`ad-slot relative grid min-h-[100px] place-items-center overflow-hidden rounded-xl border border-border/60 ${className ?? ''}`}
      aria-label="advertisement"
    >
      <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-md bg-foreground/10 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-foreground/70 backdrop-blur">
        <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
        Sponsored
      </span>
      <div className="px-4 text-center">
        <p className="text-xs font-semibold text-foreground/80">{label}</p>
        <p className="mt-1 text-[9px] text-foreground/60">
          Google AdSense · responsive display unit
        </p>
      </div>
    </div>
  )
}

export function DetailModal() {
  const { detailOpen, detailLoading, selectedItem, relatedItems, prevItem, nextItem, closeDetail, openDetail, openAdGate } =
    useLibrary()
  const [tab, setTab] = useState<'prompt' | 'workflow' | 'audience'>('prompt')
  const scrollRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const progress = useScrollProgress(scrollRef)
  const { has, toggle } = useBookmarks()

  const item = selectedItem
  const color = item ? CAT_COLORS[item.category] || '#10b981' : '#10b981'

  // Reading time estimate (based on all 3 Trinity files)
  const readingTime = item
    ? Math.max(1, Math.ceil((item.promptContent + item.workflowContent + item.audienceContent).split(/\s+/).length / 200))
    : 1
  const wordCount = item
    ? (item.promptContent + item.workflowContent + item.audienceContent).split(/\s+/).length
    : 0

  // Reset tab + scroll when item changes
  useEffect(() => {
    // Resetting view state when a new item opens (legitimate pattern).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTab('prompt')
    if (scrollRef.current) scrollRef.current.scrollTop = 0
  }, [item?.id])

  const currentContent = useMemo(() => {
    if (!item) return ''
    if (tab === 'prompt') return item.promptContent
    if (tab === 'workflow') return item.workflowContent
    return item.audienceContent
  }, [item, tab])

  const toc = useMemo(() => extractToc(currentContent), [currentContent])

  // Track active heading for TOC highlight
  useEffect(() => {
    if (!contentRef.current || toc.length === 0) return
    const headings = contentRef.current.querySelectorAll('h2, h3')
    if (headings.length === 0) return
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        if (visible) {
          const id = (visible.target as HTMLElement).id
          window.dispatchEvent(new CustomEvent('nexusai-toc-active', { detail: id }))
        }
      },
      { root: scrollRef.current, rootMargin: '0px 0px -70% 0px', threshold: 0 }
    )
    headings.forEach((h) => observer.observe(h))
    return () => observer.disconnect()
  }, [toc, tab, item?.id])

  const jumpTo = (id: string) => {
    const el = contentRef.current?.querySelector(`#${CSS.escape(id)}`) as HTMLElement | null
    if (el && scrollRef.current) {
      scrollRef.current.scrollTo({ top: el.offsetTop - 16, behavior: 'smooth' })
    }
  }

  return (
    <Dialog open={detailOpen} onOpenChange={(o) => !o && closeDetail()}>
      <DialogContent className="max-h-[92vh] gap-0 overflow-hidden border-border/70 bg-card p-0 sm:max-w-4xl xl:max-w-5xl">
        {detailLoading || !item ? (
          <div className="grid h-72 place-items-center">
            <Loader2 className="h-7 w-7 animate-spin text-primary" />
          </div>
        ) : (
          <div className="flex max-h-[92vh] flex-col">
            {/* Reading progress bar */}
            <div className="relative h-1 w-full shrink-0 bg-muted/40">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 via-primary to-violet-500 transition-[width] duration-150"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Header */}
            <DialogHeader className="border-b border-border/60 px-5 py-4 sm:px-6">
              <div className="flex items-start justify-between gap-3 pr-8">
                <div className="min-w-0">
                  <div className="mb-2 flex flex-wrap items-center gap-1.5">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
                        item.type === 'prompt'
                          ? 'bg-emerald-500/15 text-emerald-400'
                          : 'bg-violet-500/15 text-violet-300'
                      }`}
                    >
                      {item.type}
                    </span>
                    <span
                      className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium"
                      style={{ backgroundColor: `${color}1f`, color }}
                    >
                      {item.niche}
                    </span>
                    {item.trending && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/15 px-1.5 py-0.5 text-[10px] font-bold text-amber-400">
                        <Flame className="h-3 w-3" /> Trending {item.trendingScore}
                      </span>
                    )}
                    <Badge variant="outline" className="text-[10px]">{item.difficulty}</Badge>
                  </div>
                  <DialogTitle className="text-balance text-lg font-bold leading-tight sm:text-xl">
                    {item.title}
                  </DialogTitle>
                  <DialogDescription className="mt-1 text-sm">
                    {item.summary}
                  </DialogDescription>
                </div>
              </div>

              {/* meta row + actions */}
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-x-3.5 gap-y-1.5 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <Eye className="h-3.5 w-3.5" /> {formatCompact(item.viewCount)}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Download className="h-3.5 w-3.5" /> {formatCompact(item.downloadCount)}
                  </span>
                  <span className="inline-flex items-center gap-1 text-amber-400">
                    <Star className="h-3.5 w-3.5 fill-current" /> {item.rating.toFixed(1)}
                  </span>
                  <span className="inline-flex items-center gap-1" title={`~${wordCount} words`}>
                    <Clock className="h-3.5 w-3.5" /> {readingTime} min read
                  </span>
                  <span className="hidden items-center gap-1 sm:inline-flex">
                    <Wrench className="h-3.5 w-3.5" /> {item.requiredTools.slice(0, 2).join(' · ')}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <TableOfContents toc={toc} onJump={jumpTo} />
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 rounded-full text-xs"
                    onClick={() => toggle(item)}
                    aria-label={has(item.id) ? 'Remove bookmark' : 'Add bookmark'}
                  >
                    {has(item.id) ? (
                      <>
                        <Bookmark className="mr-1.5 h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                        <span className="hidden sm:inline">Saved</span>
                      </>
                    ) : (
                      <>
                        <Bookmark className="mr-1.5 h-3.5 w-3.5" />
                        <span className="hidden sm:inline">Save</span>
                      </>
                    )}
                  </Button>
                  <ShareMenu item={item} />
                </div>
              </div>
            </DialogHeader>

            {/* Body */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto">
              <div className="flex gap-0 px-5 py-5 sm:px-6">
                {/* Main content */}
                <div className="min-w-0 flex-1" ref={contentRef}>
                {/* Top AdSense slot */}
                <AdSlot label="AdSense · Top banner (responsive)" className="mb-4" />

                {/* E-E-A-T: SEO intro (~200 words) — AdSense/SEO requirement */}
                {item.intro && (
                  <div className="mb-5 rounded-2xl border border-border/60 bg-card/40 p-4">
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-primary">
                        <Sparkles className="h-3.5 w-3.5" /> Introduction
                      </div>
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
                        <BadgeCheck className="h-3 w-3" /> {item.reviewedBy}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-foreground/85">{item.intro}</p>
                  </div>
                )}

                {/* Download CTA */}
                <div className="mb-5 overflow-hidden rounded-2xl border border-primary/30 bg-primary/5">
                  <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary">
                        <Package className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold">Trinity Bundle Download</p>
                        <p className="text-xs text-muted-foreground">
                          3 polished Markdown files: prompt + workflow + audience.
                        </p>
                      </div>
                    </div>
                    <Button
                      size="lg"
                      className="w-full shrink-0 rounded-full glow-emerald sm:w-auto"
                      onClick={() => openAdGate(item, 'all')}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download Bundle
                    </Button>
                  </div>
                </div>

                {/* AEO: FAQ */}
                {item.faqQuestion && (
                  <div className="mb-5 rounded-2xl border border-primary/20 bg-primary/5 p-4">
                    <div className="mb-1.5 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-primary">
                      <HelpCircle className="h-3.5 w-3.5" /> Quick Answer
                    </div>
                    <p className="text-sm font-semibold leading-relaxed">{item.faqQuestion}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {item.faqAnswer}
                    </p>
                  </div>
                )}

                {/* GEO: citation */}
                {item.citation && (
                  <div className="mb-5 flex gap-3 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4">
                    <Quote className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                    <p className="text-xs leading-relaxed text-amber-200/90">{item.citation}</p>
                  </div>
                )}

                {/* Trinity Bundle tabs */}
                <Tabs value={tab} onValueChange={(v) => setTab(v as typeof tab)} className="w-full">
                  <TabsList className="grid w-full grid-cols-3 rounded-full">
                    <TabsTrigger value="prompt" className="rounded-full text-xs">
                      <FileText className="mr-1.5 h-3.5 w-3.5" />
                      <span className="hidden sm:inline">The </span>Prompt
                    </TabsTrigger>
                    <TabsTrigger value="workflow" className="rounded-full text-xs">
                      <Workflow className="mr-1.5 h-3.5 w-3.5" />
                      Workflow
                    </TabsTrigger>
                    <TabsTrigger value="audience" className="rounded-full text-xs">
                      <Users className="mr-1.5 h-3.5 w-3.5" />
                      Audience
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="prompt" className="mt-4">
                    <div className="mb-3 flex items-center justify-between gap-2">
                      <h3 className="text-sm font-semibold">File 1 · The {item.type === 'prompt' ? 'Prompt' : 'Skill'}</h3>
                      <div className="flex items-center gap-1.5">
                        <CopyPromptButton item={item} />
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 rounded-full text-xs"
                          onClick={() => openAdGate(item, 'prompt')}
                        >
                          <Download className="mr-1 h-3 w-3" /> .md
                        </Button>
                      </div>
                    </div>
                    <div className="rounded-xl border border-border/60 bg-background/40 p-4">
                      <article className="md-prose">
                        <ReactMarkdown>{item.promptContent}</ReactMarkdown>
                      </article>
                    </div>
                  </TabsContent>

                  <TabsContent value="workflow" className="mt-4">
                    <div className="mb-3 flex items-center justify-between gap-2">
                      <h3 className="text-sm font-semibold">File 2 · Workflow & Execution</h3>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 rounded-full text-xs"
                        onClick={() => openAdGate(item, 'workflow')}
                      >
                        <Download className="mr-1 h-3 w-3" /> .md
                      </Button>
                    </div>
                    <div className="rounded-xl border border-border/60 bg-background/40 p-4">
                      <article className="md-prose">
                        <ReactMarkdown>{item.workflowContent}</ReactMarkdown>
                      </article>
                    </div>
                  </TabsContent>

                  <TabsContent value="audience" className="mt-4">
                    <div className="mb-3 flex items-center justify-between gap-2">
                      <h3 className="text-sm font-semibold">File 3 · Target Audience & Use Cases</h3>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 rounded-full text-xs"
                        onClick={() => openAdGate(item, 'audience')}
                      >
                        <Download className="mr-1 h-3 w-3" /> .md
                      </Button>
                    </div>
                    <div className="rounded-xl border border-border/60 bg-background/40 p-4">
                      <article className="md-prose">
                        <ReactMarkdown>{item.audienceContent}</ReactMarkdown>
                      </article>
                    </div>
                  </TabsContent>
                </Tabs>

                {/* mid AdSense slot */}
                <AdSlot label="AdSense · In-content (responsive)" className="my-5" />

                {/* tags + keywords + use cases */}
                <div className="mb-5 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-border/60 bg-card/40 p-3">
                    <p className="mb-2 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                      <Tag className="h-3 w-3" /> Tags
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {item.tags.map((t) => (
                        <span key={t} className="rounded-md bg-muted/60 px-1.5 py-0.5 text-[10px]">{t}</span>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-xl border border-border/60 bg-card/40 p-3">
                    <p className="mb-2 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                      <Wrench className="h-3 w-3" /> Required Tools
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {item.requiredTools.map((t) => (
                        <span key={t} className="rounded-md bg-primary/10 px-1.5 py-0.5 text-[10px] text-primary">{t}</span>
                      ))}
                    </div>
                    <p className="mb-1.5 mt-3 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                      SEO Keywords
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {item.seoKeywords.map((t) => (
                        <span key={t} className="rounded-md bg-violet-500/10 px-1.5 py-0.5 text-[10px] text-violet-300">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* User engagement: rating widget */}
                <div className="mb-5">
                  <RatingWidget
                    itemId={item.id}
                    baseRating={item.rating}
                    downloadCount={item.downloadCount}
                  />
                </div>

                {/* Internal links — related items */}
                {relatedItems.length > 0 && (
                  <div className="mb-5">
                    <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-primary">
                      <Link2 className="h-3.5 w-3.5" /> Related Prompts & Skills
                    </div>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {relatedItems.map((r) => (
                        <button
                          key={r.id}
                          onClick={() => openDetail(r.slug)}
                          className="group flex items-center gap-2.5 rounded-xl border border-border/60 bg-card/40 p-3 text-left card-hover hover:border-primary/40"
                        >
                          <span
                            className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ${
                              r.type === 'prompt'
                                ? 'bg-emerald-500/15 text-emerald-400'
                                : 'bg-violet-500/15 text-violet-300'
                            }`}
                          >
                            {r.type === 'prompt' ? <FileText className="h-4 w-4" /> : <Workflow className="h-4 w-4" />}
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="line-clamp-1 text-xs font-semibold">{r.title}</p>
                            <p className="truncate text-[10px] text-muted-foreground">{r.niche} · ★ {r.rating.toFixed(1)}</p>
                          </div>
                          <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* bottom AdSense slot */}
                <AdSlot label="AdSense · Footer banner (responsive)" className="mt-2" />
                </div>

                {/* Sticky TOC sidebar (desktop only) */}
                {toc.length > 0 && (
                  <aside className="sticky top-0 hidden h-fit w-48 shrink-0 pl-4 xl:block">
                    <div className="rounded-xl border border-border/60 bg-card/30 p-3">
                      <p className="mb-2 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                        <FileText className="h-3 w-3" /> On this page
                      </p>
                      <StickyToc toc={toc} onJump={jumpTo} />
                    </div>
                  </aside>
                )}
              </div>

              {/* Prev/Next navigation */}
              <div className="flex items-center justify-between gap-2 border-t border-border/60 px-5 py-3 sm:px-6">
                {prevItem ? (
                  <button
                    onClick={() => openDetail(prevItem.slug)}
                    className="group flex min-w-0 flex-1 items-center gap-2 rounded-lg border border-border/50 bg-card/30 px-3 py-2 text-left transition-colors hover:border-primary/40"
                  >
                    <ChevronLeft className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-x-0.5" />
                    <div className="min-w-0">
                      <p className="text-[9px] font-semibold uppercase tracking-wide text-muted-foreground">Previous</p>
                      <p className="line-clamp-1 text-xs font-medium">{prevItem.title}</p>
                    </div>
                  </button>
                ) : (
                  <div className="flex-1" />
                )}
                {nextItem ? (
                  <button
                    onClick={() => openDetail(nextItem.slug)}
                    className="group flex min-w-0 flex-1 items-center justify-end gap-2 rounded-lg border border-border/50 bg-card/30 px-3 py-2 text-right transition-colors hover:border-primary/40"
                  >
                    <div className="min-w-0">
                      <p className="text-[9px] font-semibold uppercase tracking-wide text-muted-foreground">Next</p>
                      <p className="line-clamp-1 text-xs font-medium">{nextItem.title}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                  </button>
                ) : (
                  <div className="flex-1" />
                )}
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
