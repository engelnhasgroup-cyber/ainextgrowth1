// Dashboard — Trend Radar API
// Returns today's generated items + indexing status simulation.

import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET() {
  const today = new Date().toISOString().slice(0, 10)

  const [todayItems, recentLogs, trendingTopics] = await Promise.all([
    db.item.findMany({
      where: { runDate: today },
      orderBy: { createdAt: 'desc' },
      take: 100,
      select: {
        id: true,
        slug: true,
        title: true,
        type: true,
        category: true,
        niche: true,
        trendingScore: true,
        viewCount: true,
        downloadCount: true,
        createdAt: true,
        source: true,
      },
    }),
    db.generationLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: 20,
    }),
    db.item.findMany({
      where: { trending: true },
      orderBy: { trendingScore: 'desc' },
      take: 10,
      select: { id: true, title: true, type: true, niche: true, trendingScore: true, viewCount: true },
    }),
  ])

  // Simulate indexing status (in production, this would check Google Search Console API)
  const itemsWithStatus = todayItems.map((item, i) => ({
    ...item,
    indexingStatus: i < 3 ? 'indexed' : i < 7 ? 'pending' : 'not_submitted',
    sitemapUrl: `https://nexusai2026.example.com/?item=${item.slug}`,
  }))

  const summary = {
    todayGenerated: todayItems.length,
    indexed: itemsWithStatus.filter((i) => i.indexingStatus === 'indexed').length,
    pending: itemsWithStatus.filter((i) => i.indexingStatus === 'pending').length,
    notSubmitted: itemsWithStatus.filter((i) => i.indexingStatus === 'not_submitted').length,
  }

  return NextResponse.json({
    summary,
    todayItems: itemsWithStatus,
    recentRuns: recentLogs,
    trendingTopics,
  })
}
