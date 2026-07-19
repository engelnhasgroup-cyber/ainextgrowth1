'use client'

import { useState, useCallback } from 'react'
import { Clock, ArrowRight, Loader2, BookOpen, Star, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'
import type { ArticleSummary } from '@/lib/article-queries'
import Link from 'next/link'

function timeAgo(dateStr: string): string {
  const d = new Date(dateStr)
  const diff = Date.now() - d.getTime()
  const days = Math.floor(diff / 86400000)
  if (days < 1) return 'today'
  if (days < 7) return `${days}d ago`
  if (days < 30) return `${Math.floor(days / 7)}w ago`
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function ArticleCard({ article, index }: { article: ArticleSummary; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.3) }}
    >
      <Link href={`/blog/${article.slug}`} className="group block h-full">
        <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card/60 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl">
          <div className="mb-3 flex items-center justify-between gap-2">
            <Badge variant="outline" className="text-[10px]">{article.category}</Badge>
            <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
              <Clock className="h-3 w-3" />
              {article.readingTime} min
              <span>·</span>
              {timeAgo(article.publishedAt)}
            </div>
          </div>
          <h3 className="line-clamp-2 text-base font-semibold leading-snug transition-colors group-hover:text-primary">
            {article.title}
          </h3>
          <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-muted-foreground">
            {article.metaDescription}
          </p>
          <div className="mt-auto flex items-center gap-1.5 pt-4 text-[11px] text-primary opacity-0 transition-opacity group-hover:opacity-100">
            Read article
            <ArrowRight className="h-3 w-3" />
          </div>
          {article.featured && (
            <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-amber-500/15 px-2 py-0.5 text-[9px] font-bold text-amber-400">
              <Star className="h-2.5 w-2.5 fill-current" /> Featured
            </span>
          )}
        </div>
      </Link>
    </motion.div>
  )
}

export function BlogListClient({
  initialArticles,
  initialTotal,
  featured,
}: {
  initialArticles: ArticleSummary[]
  initialTotal: number
  featured: ArticleSummary[]
}) {
  const [articles, setArticles] = useState(initialArticles)
  const [total, setTotal] = useState(initialTotal)
  const [loading, setLoading] = useState(false)

  const loadMore = useCallback(async () => {
    setLoading(true)
    const res = await fetch(`/api/articles?limit=9&offset=${articles.length}`)
    const data = await res.json()
    setArticles((prev) => [...prev, ...(data.articles || [])])
    setTotal(data.total || total)
    setLoading(false)
  }, [articles.length, total])

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/60 py-12">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <BookOpen className="h-3.5 w-3.5" />
            NexusAI Blog · Expert Insights
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            AI Prompt Engineering <span className="text-gradient">Insights</span> for 2026
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground">
            Deep-dive articles on prompt engineering, agentic workflows, and AI automation strategies.
            Written by the NexusAI Editorial Team with real-world examples and Trinity Bundle solutions.
          </p>
        </div>
      </section>

      {/* Featured */}
      {featured.length > 0 && (
        <section className="border-b border-border/60 py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <h2 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-amber-400">
              <Sparkles className="h-4 w-4" /> Featured Articles
            </h2>
            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-3">
              {featured.map((a, i) => <ArticleCard key={a.id} article={a} index={i} />)}
            </div>
          </div>
        </section>
      )}

      {/* All articles */}
      <section className="flex-1 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((a, i) => <ArticleCard key={a.id} article={a} index={i} />)}
          </div>
          {articles.length < total && (
            <div className="mt-8 flex justify-center">
              <Button variant="outline" size="lg" onClick={loadMore} disabled={loading} className="rounded-full">
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Load more ({total - articles.length} remaining)
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
