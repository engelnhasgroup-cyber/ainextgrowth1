// Dashboard — WhatsApp Community API
// GET: returns subscriber stats
// POST: broadcasts a message to all subscribers (mock Twilio)

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET() {
  const [totalSubscribers, activeSubscribers, todaySubscribers, bySource] = await Promise.all([
    db.lead.count({ where: { channel: 'whatsapp' } }),
    db.lead.count({ where: { channel: 'whatsapp', subscribed: true } }),
    db.lead.count({
      where: {
        channel: 'whatsapp',
        createdAt: { gte: new Date(new Date().setHours(0, 0, 0, 0)) },
      },
    }),
    db.lead.groupBy({
      by: ['source'],
      _count: { _all: true },
      where: { channel: 'whatsapp' },
    }),
  ])

  // Recent subscribers
  const recent = await db.lead.findMany({
    where: { channel: 'whatsapp' },
    orderBy: { createdAt: 'desc' },
    take: 5,
    select: { id: true, phone: true, source: true, subscribed: true, createdAt: true },
  })

  return NextResponse.json({
    stats: {
      totalSubscribers,
      activeSubscribers,
      todaySubscribers,
      unsubscribed: totalSubscribers - activeSubscribers,
    },
    bySource: bySource.map((s) => ({ source: s.source, count: s._count._all })),
    recent,
    autoDailyEnabled: true, // mock — in production this would be a setting
  })
}

// POST — broadcast message (mock Twilio API)
export async function POST(req: NextRequest) {
  try {
    const { message, topPrompts } = await req.json().catch(() => ({}))

    if (!message && !topPrompts) {
      return NextResponse.json(
        { error: 'Message or topPrompts required' },
        { status: 400 }
      )
    }

    // Get all active subscribers
    const subscribers = await db.lead.findMany({
      where: { channel: 'whatsapp', subscribed: true },
      select: { phone: true },
    })

    if (subscribers.length === 0) {
      return NextResponse.json({
        success: false,
        message: 'No active subscribers to broadcast to',
      })
    }

    // Mock Twilio API call — in production, replace with actual Twilio WhatsApp API:
    //
    // const twilio = require('twilio')
    // const client = twilio(accountSid, authToken)
    // for (const sub of subscribers) {
    //   await client.messages.create({
    //     from: 'whatsapp:+14155238886',
    //     to: `whatsapp:+${sub.phone}`,
    //     body: message,
    //   })
    // }

    // Build the message content
    let broadcastContent = message
    if (topPrompts && Array.isArray(topPrompts) && topPrompts.length > 0) {
      broadcastContent = `🔥 Top ${topPrompts.length} Trending Prompts Today:\n\n`
      topPrompts.forEach((p: { title: string; slug: string }, i: number) => {
        broadcastContent += `${i + 1}. ${p.title}\n   https://nexusai2026.example.com/?item=${p.slug}\n\n`
      })
      broadcastContent += `— NexusAI 2026`
    }

    // Log the broadcast (mock success)
    console.log(`[WhatsApp Broadcast] Sending to ${subscribers.length} subscribers:`)
    console.log(`[WhatsApp Broadcast] Content: ${broadcastContent.slice(0, 100)}...`)

    return NextResponse.json({
      success: true,
      broadcastId: `bc_${Date.now()}`,
      sentTo: subscribers.length,
      contentPreview: broadcastContent.slice(0, 200),
      message: `Broadcast sent to ${subscribers.length} subscribers (mock — plug in Twilio API key for real delivery)`,
      timestamp: new Date().toISOString(),
    })
  } catch (e: any) {
    console.error('Broadcast error:', e)
    return NextResponse.json(
      { error: e?.message || 'Broadcast failed' },
      { status: 500 }
    )
  }
}
