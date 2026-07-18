'use client'

import { useState } from 'react'
import {
  Dialog, DialogContent, DialogTitle, DialogDescription, DialogHeader,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import ReactMarkdown from 'react-markdown'
import {
  Download, Eye, Star, Flame, FileText, Workflow, Users, Link2,
  Quote, HelpCircle, Tag, Wrench, ArrowRight, Loader2, Package,
} from 'lucide-react'
import { useLibrary } from './store'
import { formatCompact } from './stats-bar'

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
      className={`relative grid min-h-[90px] place-items-center overflow-hidden rounded-xl border border-dashed border-border/60 bg-background/40 ${className ?? ''}`}
    >
      <span className="absolute right-2 top-2 rounded bg-muted/70 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-muted-foreground">
        Ad
      </span>
      <span className="text-[11px] text-muted-foreground">{label}</span>
    </div>
  )
}

export function DetailModal() {
  const { detailOpen, detailLoading, selectedItem, relatedItems, closeDetail, openDetail, openAdGate } =
    useLibrary()
  const [tab, setTab] = useState('prompt')

  const item = selectedItem
  const color = item ? CAT_COLORS[item.category] || '#10b981' : '#10b981'

  return (
    <Dialog open={detailOpen} onOpenChange={(o) => !o && closeDetail()}>
      <DialogContent className="max-h-[92vh] overflow-hidden border-border/70 bg-card p-0 sm:max-w-3xl">
        {detailLoading || !item ? (
          <div className="grid h-72 place-items-center">
            <Loader2 className="h-7 w-7 animate-spin text-primary" />
          </div>
        ) : (
          <div className="flex max-h-[92vh] flex-col">
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

              {/* meta row */}
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <Eye className="h-3.5 w-3.5" /> {formatCompact(item.viewCount)} views
                </span>
                <span className="inline-flex items-center gap-1">
                  <Download className="h-3.5 w-3.5" /> {formatCompact(item.downloadCount)} downloads
                </span>
                <span className="inline-flex items-center gap-1 text-amber-400">
                  <Star className="h-3.5 w-3.5 fill-current" /> {item.rating.toFixed(1)}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Tag className="h-3.5 w-3.5" /> {item.tags.length} tags
                </span>
                <span className="inline-flex items-center gap-1">
                  <Wrench className="h-3.5 w-3.5" /> {item.requiredTools.join(' · ')}
                </span>
              </div>
            </DialogHeader>

            {/* Body */}
            <ScrollArea className="flex-1 overflow-y-auto">
              <div className="px-5 py-5 sm:px-6">
                {/* Top AdSense slot */}
                <AdSlot label="AdSense · Top banner (responsive)" className="mb-5" />

                {/* Download CTA */}
                <div className="mb-5 rounded-2xl border border-primary/30 bg-primary/5 p-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                      <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/15 text-primary">
                        <Package className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold">Trinity Bundle Download</p>
                        <p className="text-xs text-muted-foreground">
                          Get 3 polished Markdown files: prompt + workflow + audience.
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
                  <div className="mb-5 rounded-2xl border border-border/60 bg-card/50 p-4">
                    <div className="mb-1.5 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-primary">
                      <HelpCircle className="h-3.5 w-3.5" /> Quick Answer
                    </div>
                    <p className="text-sm font-semibold">{item.faqQuestion}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{item.faqAnswer}</p>
                  </div>
                )}

                {/* GEO: citation */}
                {item.citation && (
                  <div className="mb-5 flex gap-3 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4">
                    <Quote className="h-4 w-4 shrink-0 text-amber-400" />
                    <p className="text-xs leading-relaxed text-amber-200/90">{item.citation}</p>
                  </div>
                )}

                {/* Trinity Bundle tabs */}
                <Tabs value={tab} onValueChange={setTab} className="w-full">
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
                    <div className="mb-3 flex items-center justify-between">
                      <h3 className="text-sm font-semibold">File 1 · The {item.type === 'prompt' ? 'Prompt' : 'Skill'}</h3>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 rounded-full text-xs"
                        onClick={() => openAdGate(item, 'prompt')}
                      >
                        <Download className="mr-1 h-3 w-3" /> .md
                      </Button>
                    </div>
                    <div className="rounded-xl border border-border/60 bg-background/40 p-4">
                      <article className="md-prose">
                        <ReactMarkdown>{item.promptContent}</ReactMarkdown>
                      </article>
                    </div>
                  </TabsContent>

                  <TabsContent value="workflow" className="mt-4">
                    <div className="mb-3 flex items-center justify-between">
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
                    <div className="mb-3 flex items-center justify-between">
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

                {/* tags + keywords */}
                <div className="mb-5 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-border/60 bg-card/40 p-3">
                    <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Tags</p>
                    <div className="flex flex-wrap gap-1">
                      {item.tags.map((t) => (
                        <span key={t} className="rounded-md bg-muted/60 px-1.5 py-0.5 text-[10px]">{t}</span>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-xl border border-border/60 bg-card/40 p-3">
                    <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">SEO Keywords</p>
                    <div className="flex flex-wrap gap-1">
                      {item.seoKeywords.map((t) => (
                        <span key={t} className="rounded-md bg-primary/10 px-1.5 py-0.5 text-[10px] text-primary">{t}</span>
                      ))}
                    </div>
                  </div>
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
                <AdSlot label="AdSense · Footer banner (responsive)" />
              </div>
            </ScrollArea>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
