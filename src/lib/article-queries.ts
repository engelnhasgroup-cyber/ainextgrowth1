// NexusAI 2026 — Article queries

import { db } from '@/lib/db'

export interface ArticleSummary {
  id: string
  slug: string
  title: string
  metaDescription: string
  category: string
  author: string
  readingTime: number
  featured: boolean
  publishedAt: string
  createdAt: string
}

export interface ArticleDetail extends ArticleSummary {
  keywords: string[]
  content: string
  tableOfContents: { id: string; text: string; level: number }[]
  faqs: { question: string; answer: string }[]
}

export function toSummary(a: any): ArticleSummary {
  return {
    id: a.id,
    slug: a.slug,
    title: a.title,
    metaDescription: a.metaDescription,
    category: a.category,
    author: a.author,
    readingTime: a.readingTime,
    featured: !!a.featured,
    publishedAt: a.publishedAt instanceof Date ? a.publishedAt.toISOString() : String(a.publishedAt ?? ''),
    createdAt: a.createdAt instanceof Date ? a.createdAt.toISOString() : String(a.createdAt ?? ''),
  }
}

export function toDetail(a: any): ArticleDetail {
  let toc: any[] = []
  let faqs: any[] = []
  try { toc = JSON.parse(a.tableOfContents || '[]') } catch {}
  try { faqs = JSON.parse(a.faqs || '[]') } catch {}
  return {
    ...toSummary(a),
    keywords: (a.keywords || '').split(',').map((k: string) => k.trim()).filter(Boolean),
    content: a.content || '',
    tableOfContents: toc,
    faqs,
  }
}

export async function fetchArticles(limit = 12, offset = 0): Promise<{ articles: ArticleSummary[]; total: number }> {
  const [rows, total] = await Promise.all([
    db.article.findMany({ orderBy: { publishedAt: 'desc' }, take: limit, skip: offset }),
    db.article.count(),
  ])
  return { articles: rows.map(toSummary), total }
}

export async function fetchFeaturedArticles(limit = 3): Promise<ArticleSummary[]> {
  const rows = await db.article.findMany({
    where: { featured: true },
    orderBy: { publishedAt: 'desc' },
    take: limit,
  })
  return rows.map(toSummary)
}

export async function fetchArticleBySlug(slug: string): Promise<ArticleDetail | null> {
  const row = await db.article.findUnique({ where: { slug } })
  if (!row) return null
  return toDetail(row)
}

export async function fetchRelatedArticles(article: ArticleDetail, limit = 3): Promise<ArticleSummary[]> {
  // Find articles in same category, excluding current
  const rows = await db.article.findMany({
    where: { category: article.category, NOT: { id: article.id } },
    orderBy: { publishedAt: 'desc' },
    take: limit,
  })
  if (rows.length >= limit) return rows.map(toSummary)
  // Fallback: any articles
  const more = await db.article.findMany({
    where: { NOT: { id: article.id } },
    orderBy: { publishedAt: 'desc' },
    take: limit - rows.length,
  })
  return [...rows, ...more].map(toSummary)
}
