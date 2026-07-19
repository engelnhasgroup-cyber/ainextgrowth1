// Daily Content Generation Cron
// Triggers the 20-Agent Swarm to generate items daily.
// Protected by CRON_SECRET (bypassed in dev).
// GET /api/cron/daily-generation?count=10  (default 10 items per run to avoid timeouts)

import { NextRequest, NextResponse } from 'next/server'
import { generateOne, persistItem, CATEGORY_SLUGS, TRENDING_TOPICS_2026 } from '@/app/api/generate/route'
import { db } from '@/lib/db'
import { checkCronAuth, unauthorizedResponse, logCronJob, logError } from '@/lib/cron-utils'
import type { ItemType } from '@/lib/types'

export const dynamic = 'force-dynamic'
export const maxDuration = 300 // 5 minutes max

export async function GET(req: NextRequest) {
  if (!checkCronAuth(req)) return unauthorizedResponse()

  const t0 = Date.now()
  const count = Math.min(Number(req.nextUrl.searchParams.get('count') || 10), 20)
  const today = new Date().toISOString().slice(0, 10)

  try {
    const types: ItemType[] = ['prompt', 'skill', 'workflow']
    let successCount = 0

    for (let i = 0; i < count; i++) {
      try {
        const type = types[i % 3]
        const category = CATEGORY_SLUGS[Math.floor(Math.random() * CATEGORY_SLUGS.length)]
        const topic = TRENDING_TOPICS_2026[Math.floor(Math.random() * TRENDING_TOPICS_2026.length)]

        const gen = await generateOne(category, type, topic)
        const detail = await persistItem(gen, category, type, topic, today)

        // Link to peers
        const peers = await db.item.findMany({
          where: { category, NOT: { id: detail.id } },
          orderBy: { trendingScore: 'desc' },
          take: 4,
          select: { id: true },
        })
        await db.item.update({
          where: { id: detail.id },
          data: { relatedIds: peers.map((p) => p.id).join(',') },
        })

        successCount++
      } catch (e: any) {
        // Rate limit — wait and retry once
        if (e?.message?.includes('429')) {
          await new Promise((r) => setTimeout(r, 8000))
          try {
            const type = types[i % 3]
            const category = CATEGORY_SLUGS[Math.floor(Math.random() * CATEGORY_SLUGS.length)]
            const topic = TRENDING_TOPICS_2026[Math.floor(Math.random() * TRENDING_TOPICS_2026.length)]
            const gen = await generateOne(category, type, topic)
            await persistItem(gen, category, type, topic, today)
            successCount++
          } catch {
            // skip
          }
        }
      }
      // small delay between items
      if (i + 1 < count) await new Promise((r) => setTimeout(r, 2000))
    }

    const duration = Date.now() - t0
    await logCronJob('daily-generation', 'completed', duration, successCount, `Generated ${successCount}/${count} items`)

    return NextResponse.json({
      success: true,
      generated: successCount,
      total: count,
      durationMs: duration,
      timestamp: new Date().toISOString(),
    })
  } catch (e: any) {
    const duration = Date.now() - t0
    await logError('cron', '/api/cron/daily-generation', e?.message || 'Unknown error', e?.stack || '')
    await logCronJob('daily-generation', 'failed', duration, 0, e?.message || 'Unknown error')
    return NextResponse.json({ success: false, error: e?.message }, { status: 500 })
  }
}
