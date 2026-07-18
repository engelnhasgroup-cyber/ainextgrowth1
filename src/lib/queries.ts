// NexusAI 2026 — Server-side data access layer
import { db } from '@/lib/db'
import type {
  ItemSummary,
  ItemDetail,
  CategoryInfo,
  LibraryStats,
  ItemsQuery,
  ItemsResponse,
  ItemType,
} from '@/lib/types'

function splitList(s: string | null | undefined): string[] {
  if (!s) return []
  return s
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean)
}

function splitPipes(s: string | null | undefined): string[] {
  if (!s) return []
  return s
    .split('|')
    .map((t) => t.trim())
    .filter(Boolean)
}

export function toSummary(i: any): ItemSummary {
  return {
    id: i.id,
    slug: i.slug,
    type: i.type as ItemType,
    title: i.title,
    summary: i.summary,
    category: i.category,
    niche: i.niche,
    audience: i.audience,
    difficulty: i.difficulty,
    tags: splitList(i.tags),
    requiredTools: splitList(i.requiredTools),
    trending: !!i.trending,
    trendingScore: i.trendingScore ?? 0,
    featured: !!i.featured,
    viewCount: i.viewCount ?? 0,
    downloadCount: i.downloadCount ?? 0,
    rating: i.rating ?? 0,
    runDate: i.runDate ?? '',
    source: i.source ?? 'seed',
    reviewedBy: i.reviewedBy ?? 'NexusAI Editorial Team',
    createdAt: i.createdAt instanceof Date ? i.createdAt.toISOString() : String(i.createdAt ?? ''),
  }
}

export function toDetail(i: any): ItemDetail {
  return {
    ...toSummary(i),
    language: i.language ?? 'English',
    intro: i.intro ?? '',
    promptContent: i.promptContent ?? '',
    workflowContent: i.workflowContent ?? '',
    audienceContent: i.audienceContent ?? '',
    useCases: splitPipes(i.useCases),
    faqQuestion: i.faqQuestion ?? '',
    faqAnswer: i.faqAnswer ?? '',
    citation: i.citation ?? '',
    seoKeywords: splitList(i.seoKeywords),
    relatedIds: splitList(i.relatedIds),
  }
}

export async function fetchItems(query: ItemsQuery): Promise<ItemsResponse> {
  const limit = Math.min(Math.max(query.limit ?? 24, 1), 100)
  const offset = Math.max(query.offset ?? 0, 0)

  const where: any = {}
  if (query.type && query.type !== 'all') where.type = query.type
  if (query.category && query.category !== 'all') where.category = query.category
  if (query.trending) where.trending = true
  if (query.featured) where.featured = true
  if (query.search && query.search.trim()) {
    const s = query.search.trim()
    where.OR = [
      { title: { contains: s } },
      { summary: { contains: s } },
      { niche: { contains: s } },
      { audience: { contains: s } },
      { tags: { contains: s } },
      { seoKeywords: { contains: s } },
    ]
  }

  let orderBy: any = { createdAt: 'desc' }
  switch (query.sort) {
    case 'trending':
      orderBy = [{ trending: 'desc' }, { trendingScore: 'desc' }, { viewCount: 'desc' }]
      break
    case 'newest':
      orderBy = { createdAt: 'desc' }
      break
    case 'popular':
      orderBy = { viewCount: 'desc' }
      break
    case 'downloads':
      orderBy = { downloadCount: 'desc' }
      break
    case 'rating':
      orderBy = { rating: 'desc' }
      break
  }

  const [rows, total] = await Promise.all([
    db.item.findMany({
      where,
      orderBy,
      take: limit,
      skip: offset,
    }),
    db.item.count({ where }),
  ])

  return {
    items: rows.map(toSummary),
    total,
    hasMore: offset + limit < total,
  }
}

export async function fetchTrending(limit = 20): Promise<ItemSummary[]> {
  const rows = await db.item.findMany({
    where: { trending: true },
    orderBy: [{ trendingScore: 'desc' }, { viewCount: 'desc' }],
    take: Math.min(Math.max(limit, 1), 100),
  })
  return rows.map(toSummary)
}

export async function fetchFeatured(limit = 8): Promise<ItemSummary[]> {
  const rows = await db.item.findMany({
    where: { featured: true },
    orderBy: [{ trendingScore: 'desc' }, { rating: 'desc' }],
    take: Math.min(Math.max(limit, 1), 50),
  })
  return rows.map(toSummary)
}

export async function fetchRecent(limit = 8): Promise<ItemSummary[]> {
  const rows = await db.item.findMany({
    orderBy: { createdAt: 'desc' },
    take: Math.min(Math.max(limit, 1), 50),
  })
  return rows.map(toSummary)
}

export async function fetchTopWorkflows(limit = 4): Promise<ItemSummary[]> {
  const rows = await db.item.findMany({
    where: { type: 'workflow' },
    orderBy: [{ trendingScore: 'desc' }, { viewCount: 'desc' }],
    take: Math.min(Math.max(limit, 1), 20),
  })
  return rows.map(toSummary)
}

export async function fetchBySlug(slug: string): Promise<ItemDetail | null> {
  const row = await db.item.findUnique({ where: { slug } })
  if (!row) return null
  return toDetail(row)
}

export async function fetchById(id: string): Promise<ItemDetail | null> {
  const row = await db.item.findUnique({ where: { id } })
  if (!row) return null
  return toDetail(row)
}

export async function fetchRelated(item: ItemDetail, limit = 4): Promise<ItemSummary[]> {
  const ids = item.relatedIds.slice(0, limit)
  if (ids.length === 0) {
    // fallback: same category
    const rows = await db.item.findMany({
      where: { category: item.category, NOT: { id: item.id } },
      orderBy: { trendingScore: 'desc' },
      take: limit,
    })
    return rows.map(toSummary)
  }
  const rows = await db.item.findMany({ where: { id: { in: ids } }, take: limit })
  // preserve order
  const map = new Map(rows.map((r) => [r.id, r]))
  return ids.map((id) => map.get(id)).filter(Boolean).map(toSummary)
}

export async function fetchByCategorySlug(slug: string, limit = 12): Promise<ItemSummary[]> {
  const rows = await db.item.findMany({
    where: { category: slug },
    orderBy: [{ trendingScore: 'desc' }, { viewCount: 'desc' }],
    take: Math.min(Math.max(limit, 1), 100),
  })
  return rows.map(toSummary)
}

export async function fetchCategories(): Promise<CategoryInfo[]> {
  const cats = await db.category.findMany({ orderBy: { name: 'asc' } })
  const counts = await db.item.groupBy({
    by: ['category'],
    _count: { _all: true },
  })
  const countMap = new Map(counts.map((c) => [c.category, c._count._all]))
  return cats.map((c) => ({
    id: c.id,
    slug: c.slug,
    name: c.name,
    description: c.description,
    icon: c.icon,
    color: c.color,
    itemCount: countMap.get(c.slug) ?? 0,
  }))
}

export async function fetchStats(): Promise<LibraryStats> {
  const today = new Date().toISOString().slice(0, 10)
  const [total, prompts, skills, workflows, cats, downloadsAgg, todayItems] = await Promise.all([
    db.item.count(),
    db.item.count({ where: { type: 'prompt' } }),
    db.item.count({ where: { type: 'skill' } }),
    db.item.count({ where: { type: 'workflow' } }),
    db.category.count(),
    db.item.aggregate({ _sum: { downloadCount: true } }),
    db.item.count({ where: { runDate: today } }),
  ])
  return {
    totalItems: total,
    totalPrompts: prompts,
    totalSkills: skills,
    totalWorkflows: workflows,
    totalCategories: cats,
    totalDownloads: downloadsAgg._sum.downloadCount ?? 0,
    todayGenerated: todayItems,
    trinityFiles: total * 3,
  }
}

export async function incrementView(id: string) {
  try {
    await db.item.update({ where: { id }, data: { viewCount: { increment: 1 } } })
  } catch {}
}

export async function incrementDownload(id: string) {
  try {
    await db.item.update({ where: { id }, data: { downloadCount: { increment: 1 } } })
  } catch {}
}
