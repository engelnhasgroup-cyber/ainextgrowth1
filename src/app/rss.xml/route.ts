// Global RSS 2.0 feed — latest prompts & skills across all categories.
// Supports backlink/distribution strategy (feed readers, IFTTT, GitHub READMEs).

import { NextResponse } from 'next/server'
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

export async function GET() {
  const items = await db.item.findMany({
    orderBy: { createdAt: 'desc' },
    take: 50,
    select: {
      slug: true,
      title: true,
      summary: true,
      type: true,
      category: true,
      niche: true,
      tags: true,
      createdAt: true,
    },
  })

  const buildDate = new Date().toUTCString()

  const itemsXml = items
    .map((it) => {
      const link = `${SITE_URL}/?item=${encodeURIComponent(it.slug)}`
      const pubDate =
        it.createdAt instanceof Date ? it.createdAt.toUTCString() : new Date().toUTCString()
      const tags = it.tags
        ? it.tags
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean)
            .slice(0, 5)
        : []
      return `    <item>
      <title>${escapeXml(it.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description>${escapeXml(it.summary)}</description>
      <category>${escapeXml(it.niche)}</category>
      <category>${escapeXml(it.type)}</category>
      ${tags.map((t) => `<category>${escapeXml(t)}</category>`).join('\n      ')}
      <pubDate>${pubDate}</pubDate>
    </item>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>NexusAI 2026 — AI Prompt &amp; Skill Library</title>
    <link>${SITE_URL}/</link>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <description>The largest autonomous AI Prompt &amp; Skill Library for 2026. 200 trending prompts &amp; skills generated daily as Trinity Bundles.</description>
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
