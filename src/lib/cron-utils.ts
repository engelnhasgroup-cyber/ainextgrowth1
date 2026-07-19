// NexusAI 2026 — Cron utilities
// Shared helpers for cron job authentication, logging, and error tracking.

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// Auth check — bypasses in dev mode, requires Bearer token in production
export function checkCronAuth(req: NextRequest): boolean {
  if (process.env.NODE_ENV === 'development') return true
  const authHeader = req.headers.get('authorization')
  return authHeader === `Bearer ${process.env.CRON_SECRET}`
}

export function unauthorizedResponse() {
  return new NextResponse('Unauthorized', { status: 401 })
}

// Log a cron job execution to the CronJobLog table
export async function logCronJob(
  jobName: string,
  status: 'completed' | 'failed' | 'running',
  durationMs: number,
  itemsAffected: number,
  message: string
) {
  try {
    await db.cronJobLog.create({
      data: { jobName, status, duration: durationMs, itemsAffected, message },
    })
  } catch (e) {
    console.error('Failed to log cron job:', e)
  }
}

// Log an error to the ErrorLog table
export async function logError(
  source: string,
  endpoint: string,
  message: string,
  stack: string = '',
  severity: 'error' | 'warn' | 'info' = 'error'
) {
  try {
    await db.errorLog.create({
      data: { source, endpoint, message, stack, severity },
    })
  } catch (e) {
    console.error('Failed to log error:', e)
  }
}

// Fetch the top 5 trending items from the last 24 hours
export async function getTopTrendingItems(limit = 5) {
  const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000)
  const items = await db.item.findMany({
    where: { createdAt: { gte: yesterday } },
    orderBy: [{ trendingScore: 'desc' }, { viewCount: 'desc' }],
    take: limit,
    select: {
      id: true,
      slug: true,
      title: true,
      type: true,
      niche: true,
      summary: true,
      trendingScore: true,
    },
  })

  // If not enough items in last 24h, fall back to all-time top trending
  if (items.length < limit) {
    const fallback = await db.item.findMany({
      orderBy: [{ trendingScore: 'desc' }, { viewCount: 'desc' }],
      take: limit,
      select: {
        id: true,
        slug: true,
        title: true,
        type: true,
        niche: true,
        summary: true,
        trendingScore: true,
      },
    })
    return fallback
  }

  return items
}

const SITE_URL = 'https://nexusai2026.example.com'

// Build the WhatsApp message content
export function buildWhatsAppMessage(items: { title: string; slug: string; niche: string }[]) {
  let msg = `🔥 *Top ${items.length} Trending AI Prompts Today*\n\n`
  items.forEach((item, i) => {
    msg += `${i + 1}. *${item.title}*\n`
    msg += `   📂 ${item.niche}\n`
    msg += `   🔗 ${SITE_URL}/?item=${item.slug}\n\n`
  })
  msg += `— *NexusAI 2026*\n`
  msg += `The Largest AI Prompt & Skill Library\n`
  msg += `Unsubscribe: ${SITE_URL}/?unsubscribe=whatsapp`
  return msg
}
