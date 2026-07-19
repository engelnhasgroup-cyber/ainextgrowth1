// Dashboard — Agent Control API
// Returns agent swarm status and allows triggering generation.

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

const AGENTS = [
  { n: 1, role: 'Trend Forecaster', phase: 'Research', status: 'idle' },
  { n: 2, role: 'Niche Strategist', phase: 'Research', status: 'idle' },
  { n: 3, role: 'SEO/AEO Architect', phase: 'Research', status: 'idle' },
  { n: 4, role: 'Neuro-Prompt Engineer', phase: 'Generation', status: 'idle' },
  { n: 5, role: 'Workflow Architect', phase: 'Generation', status: 'idle' },
  { n: 6, role: 'Audience Analyst', phase: 'Generation', status: 'idle' },
  { n: 7, role: 'Internal Link Grapher', phase: 'Generation', status: 'idle' },
  { n: 8, role: 'UI/UX Visionary', phase: 'Frontend', status: 'idle' },
  { n: 9, role: 'Next.js Developer', phase: 'Frontend', status: 'idle' },
  { n: 10, role: 'Mobile Optimizer', phase: 'Frontend', status: 'idle' },
  { n: 11, role: 'AdSense Strategist', phase: 'Frontend', status: 'idle' },
  { n: 12, role: 'Database Architect', phase: 'Backend', status: 'idle' },
  { n: 13, role: 'API & Edge Developer', phase: 'Backend', status: 'idle' },
  { n: 14, role: 'Automation Scheduler', phase: 'Backend', status: 'idle' },
  { n: 15, role: 'Schema Markup Engineer', phase: 'GEO/SEO', status: 'idle' },
  { n: 16, role: 'GEO Citation Optimizer', phase: 'GEO/SEO', status: 'idle' },
  { n: 17, role: 'Backlink Disseminator', phase: 'GEO/SEO', status: 'idle' },
  { n: 18, role: 'CI/CD Master', phase: 'DevOps', status: 'idle' },
  { n: 19, role: 'Site Reliability Engineer', phase: 'DevOps', status: 'idle' },
  { n: 20, role: 'QA & Compliance Tester', phase: 'DevOps', status: 'idle' },
]

export async function GET() {
  const today = new Date().toISOString().slice(0, 10)
  const [todayCount, totalCount, recentLogs] = await Promise.all([
    db.item.count({ where: { runDate: today, source: 'agent' } }),
    db.item.count({ where: { source: 'agent' } }),
    db.generationLog.findMany({ orderBy: { createdAt: 'desc' }, take: 5 }),
  ])

  const dailyTarget = 200
  const dailyProgress = Math.min(100, (todayCount / dailyTarget) * 100)

  return NextResponse.json({
    agents: AGENTS.map((a) => ({
      ...a,
      status: todayCount > 0 ? 'active' : 'idle',
      lastActive: todayCount > 0 ? new Date().toISOString() : null,
    })),
    swarm: {
      totalAgents: AGENTS.length,
      activeAgents: todayCount > 0 ? AGENTS.length : 0,
      dailyTarget,
      todayGenerated: todayCount,
      dailyProgress: Math.round(dailyProgress),
      totalAgentGenerated: totalCount,
      recentRuns: recentLogs,
    },
  })
}

// POST to trigger a generation (delegates to /api/generate)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}))
    const { count = 1, type } = body

    // Forward to the generate endpoint
    const res = await fetch('http://localhost:3000/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ count: Math.min(count, 5), type }),
    })
    const data = await res.json()
    return NextResponse.json(data)
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Failed' }, { status: 500 })
  }
}
