// Dashboard — Cron Health Monitor API
// Returns status of all cron jobs (last run, next run, success/error).

import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

const CRON_JOBS = [
  {
    name: 'daily-generation',
    label: 'Daily Content Generation',
    schedule: '1:00 AM UTC daily',
    endpoint: '/api/cron/daily-generation',
    description: '20-Agent Swarm generates new prompts, skills & workflows',
  },
  {
    name: 'seo-agent',
    label: 'SEO/AEO/GEO Agent',
    schedule: '3:00 AM UTC every Sunday',
    endpoint: '/api/cron/seo-agent',
    description: 'Scans content gaps, optimizes FAQs, injects GEO citations',
  },
  {
    name: 'send-email-digest',
    label: 'Email Digest Broadcast',
    schedule: '8:00 AM UTC daily',
    endpoint: '/api/cron/send-email-digest',
    description: 'Sends top 5 trending items to email subscribers',
  },
  {
    name: 'send-whatsapp-digest',
    label: 'WhatsApp Digest Broadcast',
    schedule: '8:00 AM UTC daily',
    endpoint: '/api/cron/send-whatsapp-digest',
    description: 'Sends top 5 trending items to WhatsApp subscribers',
  },
]

export async function GET() {
  // Get latest log for each cron job
  const jobsWithStatus = await Promise.all(
    CRON_JOBS.map(async (job) => {
      const lastRun = await db.cronJobLog.findFirst({
        where: { jobName: job.name },
        orderBy: { createdAt: 'desc' },
      })

      const runCount = await db.cronJobLog.count({
        where: { jobName: job.name },
      })

      const successCount = await db.cronJobLog.count({
        where: { jobName: job.name, status: 'completed' },
      })

      const failCount = await db.cronJobLog.count({
        where: { jobName: job.name, status: 'failed' },
      })

      return {
        ...job,
        lastRun: lastRun
          ? {
              status: lastRun.status,
              duration: lastRun.duration,
              itemsAffected: lastRun.itemsAffected,
              message: lastRun.message,
              timestamp: lastRun.createdAt.toISOString(),
            }
          : null,
        stats: {
          totalRuns: runCount,
          successCount,
          failCount,
          successRate: runCount > 0 ? Math.round((successCount / runCount) * 100) : 0,
        },
      }
    })
  )

  // Recent errors
  const recentErrors = await db.errorLog.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
    select: { id: true, source: true, endpoint: true, message: true, severity: true, createdAt: true },
  })

  // Calculate next run times (approximate)
  const now = new Date()
  const nextRuns = CRON_JOBS.map((job) => {
    const next = new Date(now)
    if (job.name === 'seo-agent') {
      // Next Sunday 3:00 AM
      const dayOfWeek = now.getDay()
      const daysUntilSunday = (7 - dayOfWeek) % 7 || 7
      next.setDate(now.getDate() + daysUntilSunday)
      next.setHours(3, 0, 0, 0)
    } else {
      // Next day at 1:00 AM or 8:00 AM
      const hour = job.name === 'daily-generation' ? 1 : 8
      if (now.getHours() >= hour) {
        next.setDate(now.getDate() + 1)
      }
      next.setHours(hour, 0, 0, 0)
    }
    return { jobName: job.name, nextRun: next.toISOString() }
  })

  return NextResponse.json({
    jobs: jobsWithStatus,
    nextRuns,
    recentErrors,
    summary: {
      totalJobs: CRON_JOBS.length,
      healthyJobs: jobsWithStatus.filter((j) => !j.lastRun || j.lastRun.status === 'completed').length,
      errorCount: recentErrors.length,
    },
  })
}
