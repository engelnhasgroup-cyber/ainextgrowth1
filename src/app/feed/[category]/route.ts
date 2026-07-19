// Per-category RSS 2.0 feed — supports topical distribution / niche backlinks.
// GET /feed/[category]?category=seo-content-marketing

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'
export const revalidate = 1800

const SITE_URL = 'https://nexusai2026.example.com'

function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

const CAT_NAMES: Record<string, string> = {
  'seo-content-marketing': 'SEO & Content Marketing',
  'software-engineering': 'Software Engineering & DevOps',
  'data-analytics': 'Data & Analytics',
  'business-strategy': 'Business & Strategy',
  'design-creative': 'Design & Creative',
  'sales-growth': 'Sales & Growth',
  'education-research': 'Education & Research',
  'automation-agents': 'Automation & AI Agents',
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ category: string }> }) {
  const { category } = await params
  const cat = await db.category.findUnique({ where: { slug: category } })
  if (!cat) {
    return new NextResponse('Category not found', { status: 404 })
  }

  const items = await db.item.findMany({
    where: { category },
    orderBy: { createdAt: 'desc' },
    take: 30,
    select: { slug: true, title: true, summary: true, type: true, niche: true, createdAt: true },
  })

  const buildDate = new Date().toUTCString()
  const catName = CAT_NAMES[category] || cat.name

  const itemsXml = items
    .map((it) => {
      const link = `${SITE_URL}/?item=${encodeURIComponent(it.slug)}`
      const pubDate =
        it.createdAt instanceof Date ? it.createdAt.toUTCString() : new Date().toUTCString()
      return `    <item>
      <title>${escapeXml(it.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description>${escapeXml(it.summary)}</description>
      <category>${escapeXml(it.niche)}</category>
      <pubDate>${pubDate}</pubDate>
    </item>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>NexusAI 2026 — ${escapeXml(catName)}</title>
    <link>${SITE_URL}/#library</link>
    <atom:link href="${SITE_URL}/feed/${category}" rel="self" type="application/rss+xml" />
    <description>${escapeXml(cat.description)} — Latest ${items.length} items.</description>
    <language>en-us</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <generator>NexusAI 2026 Autonomous Agent</generator>
    <ttl>30</ttl>
${itemsXml}
  </channel>
</rss>`

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600',
    },
  })
}
