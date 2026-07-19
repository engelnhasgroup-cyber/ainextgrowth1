'use client'

import { useState, useRef, useEffect, useMemo } from 'react'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import {
  ArrowLeft, Clock, Copy, Check, Link2, ChevronRight,
  BookOpen, FileText, Sparkles,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { ArticleDetail, ArticleSummary } from '@/lib/article-queries'

// Window scroll progress hook (for article page)
function useWindowScrollProgress() {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const handler = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0)
    }
    window.addEventListener('scroll', handler, { passive: true })
    handler()
    return () => window.removeEventListener('scroll', handler)
  }, [])
  return progress
}

// AdSlot component — renders a professional ad placeholder
function AdSlot({ label }: { label: string }) {
  return (
    <div className="ad-slot relative my-6 grid min-h-[100px] place-items-center overflow-hidden rounded-xl border border-border/60">
      <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-md bg-foreground/10 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-foreground/70 backdrop-blur">
        <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
        Sponsored
      </span>
      <div className="px-4 text-center">
        <p className="text-xs font-semibold text-foreground/80">{label}</p>
        <p className="mt-1 text-[9px] text-foreground/60">Google AdSense · responsive display unit</p>
      </div>
    </div>
  )
}

// Parse markdown and inject AdSlots at strategic positions
function renderContentWithAds(content: string) {
  const lines = content.split('\n')
  const result: { type: 'md' | 'ad'; content: string; label: string }[] = []
  let currentChunk = ''
  let h2Count = 0
  let introDone = false
  let beforeFaq = false

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    // After intro paragraph (first blank line after first paragraph)
    if (!introDone && line === '' && currentChunk.length > 100) {
      result.push({ type: 'md', content: currentChunk, label: '' })
      currentChunk = ''
      result.push({ type: 'ad', content: '', label: 'AdSense · After intro (responsive)' })
      introDone = true
      continue
    }

    // After 3rd H2
    if (line.startsWith('## ') && !line.startsWith('### ')) {
      h2Count++
      if (h2Count === 3) {
        result.push({ type: 'md', content: currentChunk + line, label: '' })
        currentChunk = ''
        result.push({ type: 'ad', content: '', label: 'AdSense · In-content (responsive)' })
        continue
      }
    }

    // Before FAQ section
    if (line.toLowerCase().includes('## faq') || line.toLowerCase().includes('## frequently asked')) {
      beforeFaq = true
      result.push({ type: 'md', content: currentChunk, label: '' })
      currentChunk = ''
      result.push({ type: 'ad', content: '', label: 'AdSense · Before FAQ (responsive)' })
    }

    currentChunk += line + '\n'
  }

  if (currentChunk.trim()) {
    result.push({ type: 'md', content: currentChunk, label: '' })
  }

  return result
}

function timeAgo(dateStr: string): string {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export function BlogArticleClient({
  article,
  related,
}: {
  article: ArticleDetail
  related: ArticleSummary[]
}) {
  const [copied, setCopied] = useState(false)
  const progress = useWindowScrollProgress()
  const contentRef = useRef<HTMLDivElement>(null)

  // Copy link
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {}
  }

  // Parse content with ads
  const contentParts = useMemo(() => renderContentWithAds(article.content), [article.content])

  // JSON-LD for Article + FAQ
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.metaDescription,
    author: { '@type': 'Organization', name: article.author },
    publisher: { '@type': 'Organization', name: 'ainextgrowth' },
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
  }

  const faqSchema = article.faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: article.faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  } : null

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: '/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: '/blog' },
      { '@type': 'ListItem', position: 3, name: article.title, item: `/blog/${article.slug}` },
    ],
  }

  return (
    <div className="min-h-screen">
      {/* JSON-LD schemas */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Reading progress bar */}
      <div className="fixed left-0 top-0 z-50 h-1 w-full bg-transparent">
        <div className="h-full bg-gradient-to-r from-emerald-500 via-primary to-violet-500 transition-[width] duration-150" style={{ width: `${progress}%` }} />
      </div>

      {/* Breadcrumb */}
      <div className="border-b border-border/60 bg-card/30">
        <div className="mx-auto flex max-w-4xl items-center gap-1.5 px-4 py-3 text-xs text-muted-foreground sm:px-6">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/blog" className="hover:text-foreground">Blog</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="truncate font-medium text-foreground">{article.title.slice(0, 40)}</span>
        </div>
      </div>

      {/* Article layout */}
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="flex gap-8">
          {/* Main content */}
          <article className="min-w-0 flex-1" ref={contentRef}>
            {/* Header */}
            <header className="mb-6">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <Badge variant="outline" className="text-[10px]">{article.category}</Badge>
                <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground">
                  <Clock className="h-3 w-3" /> {article.readingTime} min read
                </span>
                <span className="text-[10px] text-muted-foreground">·</span>
                <span className="text-[10px] text-muted-foreground">{timeAgo(article.publishedAt)}</span>
                <span className="text-[10px] text-muted-foreground">·</span>
                <span className="text-[10px] text-muted-foreground">By {article.author}</span>
              </div>
              <h1 className="text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl lg:text-4xl">
                {article.title}
              </h1>
              <p className="mt-3 text-sm text-muted-foreground sm:text-base">{article.metaDescription}</p>
              <div className="mt-4 flex items-center gap-2">
                <Button variant="outline" size="sm" className="rounded-full text-xs" asChild>
                  <Link href="/blog"><ArrowLeft className="mr-1.5 h-3.5 w-3.5" /> Back to Blog</Link>
                </Button>
                <Button variant="outline" size="sm" className="rounded-full text-xs" onClick={copyLink}>
                  {copied ? <Check className="mr-1.5 h-3.5 w-3.5 text-emerald-400" /> : <Copy className="mr-1.5 h-3.5 w-3.5" />}
                  {copied ? 'Copied!' : 'Copy Link'}
                </Button>
              </div>
            </header>

            {/* Content with dynamic ad injection */}
            <div className="md-prose">
              {contentParts.map((part, i) => {
                if (part.type === 'ad') {
                  return <AdSlot key={`ad-${i}`} label={part.label} />
                }
                return <ReactMarkdown key={`md-${i}`}>{part.content}</ReactMarkdown>
              })}
            </div>

            {/* Keywords */}
            {article.keywords.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-1.5">
                {article.keywords.map((k) => (
                  <span key={k} className="rounded-md bg-muted/60 px-2 py-0.5 text-[10px] font-medium text-muted-foreground">{k}</span>
                ))}
              </div>
            )}

            {/* CTA */}
            <div className="mt-8 rounded-2xl border border-primary/30 bg-primary/5 p-5 text-center">
              <Sparkles className="mx-auto mb-2 h-6 w-6 text-primary" />
              <h3 className="text-sm font-bold">Ready to put this into practice?</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Download our Trinity Bundle (Prompt + Workflow + Audience) and start implementing today.
              </p>
              <Button size="sm" className="mt-3 rounded-full" asChild>
                <Link href="/#trending">Browse Prompts & Skills</Link>
              </Button>
            </div>
          </article>

          {/* Sticky TOC sidebar (desktop) */}
          {article.tableOfContents.length > 0 && (
            <aside className="sticky top-8 hidden h-fit w-56 shrink-0 lg:block">
              <div className="rounded-xl border border-border/60 bg-card/30 p-3">
                <p className="mb-2 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                  <BookOpen className="h-3 w-3" /> Table of Contents
                </p>
                <nav className="space-y-0.5">
                  {article.tableOfContents.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`block truncate border-l-2 py-1 pl-2.5 text-[11px] transition-colors hover:border-foreground/30 hover:text-foreground ${
                        item.level === 3 ? 'pl-5' : ''
                      } border-border/40 text-muted-foreground`}
                    >
                      {item.text}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>
          )}
        </div>

        {/* Related articles */}
        {related.length > 0 && (
          <section className="mt-12 border-t border-border/60 pt-8">
            <h2 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-primary">
              <Link2 className="h-4 w-4" /> Related Articles
            </h2>
            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-3">
              {related.map((r, i) => (
                <Link key={r.id} href={`/blog/${r.slug}`} className="group">
                  <div className="rounded-xl border border-border/60 bg-card/40 p-3 transition-all hover:border-primary/40 hover:shadow-lg">
                    <Badge variant="outline" className="mb-1.5 text-[9px]">{r.category}</Badge>
                    <h3 className="line-clamp-2 text-xs font-semibold transition-colors group-hover:text-primary">{r.title}</h3>
                    <p className="mt-1 line-clamp-1 text-[10px] text-muted-foreground">{r.metaDescription}</p>
                    <div className="mt-1.5 flex items-center gap-1 text-[9px] text-muted-foreground">
                      <Clock className="h-2.5 w-2.5" /> {r.readingTime} min
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
