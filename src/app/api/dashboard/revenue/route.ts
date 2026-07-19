// Dashboard — Revenue Estimator API
// Calculates estimated AdSense revenue based on downloads, views, and assumed CPC/CTR.

import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

// Assumed metrics for high-CPC AI/tech niche (USA/UK/CA/AU markets)
const ASSUMED_CPC = 2.5 // $2.50 per click (AI/tech niche, high-CPC markets)
const ASSUMED_CTR = 0.04 // 4% click-through rate
const AD_SLOTS_PER_PAGE = 3 // average ad slots per item detail page
const DOWNLOAD_TO_VIEW_RATIO = 0.15 // 15% of viewers download

export async function GET() {
  const [totalItems, totalDownloads, totalViewsAgg, todayItems] = await Promise.all([
    db.item.count(),
    db.item.aggregate({ _sum: { downloadCount: true } }),
    db.item.aggregate({ _sum: { viewCount: true } }),
    db.item.count({ where: { runDate: new Date().toISOString().slice(0, 10) } }),
  ])

  const totalViews = totalViewsAgg._sum.viewCount ?? 0
  const totalDownloadsCount = totalDownloads._sum.downloadCount ?? 0

  // Revenue = views × CTR × CPC × ad_slots
  const estimatedClicks = Math.round(totalViews * ASSUMED_CTR * AD_SLOTS_PER_PAGE)
  const estimatedRevenue = estimatedClicks * ASSUMED_CPC

  // Daily potential (based on today's items × average views per item)
  const avgViewsPerItem = totalItems > 0 ? totalViews / totalItems : 0
  const dailyPotentialViews = todayItems * avgViewsPerItem
  const dailyPotentialRevenue = Math.round(dailyPotentialViews * ASSUMED_CTR * AD_SLOTS_PER_PAGE * ASSUMED_CPC)

  // Monthly projection (30 days)
  const monthlyProjection = dailyPotentialRevenue * 30

  // Revenue by type breakdown
  const byType = await db.item.groupBy({
    by: ['type'],
    _sum: { viewCount: true, downloadCount: true },
    _count: { _all: true },
  })

  const revenueByType = byType.map((t) => {
    const views = t._sum.viewCount ?? 0
    const clicks = Math.round(views * ASSUMED_CTR * AD_SLOTS_PER_PAGE)
    return {
      type: t.type,
      items: t._count._all,
      views,
      downloads: t._sum.downloadCount ?? 0,
      estimatedClicks: clicks,
      estimatedRevenue: clicks * ASSUMED_CPC,
    }
  })

  return NextResponse.json({
    metrics: {
      totalItems,
      totalViews,
      totalDownloads: totalDownloadsCount,
      estimatedClicks,
      estimatedRevenue,
      dailyPotentialRevenue,
      monthlyProjection,
      todayItems,
    },
    assumptions: {
      cpc: ASSUMED_CPC,
      ctr: ASSUMED_CTR,
      adSlotsPerPage: AD_SLOTS_PER_PAGE,
      downloadToViewRatio: DOWNLOAD_TO_VIEW_RATIO,
    },
    revenueByType,
    currency: 'USD',
    note: 'Estimates based on high-CPC AI/tech niche (USA/UK/CA/AU markets). Actual revenue depends on real AdSense performance.',
  })
}
