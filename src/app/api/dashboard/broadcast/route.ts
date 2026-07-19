// Dashboard — Broadcast Commander API
// POST: sends a custom message to all email and/or WhatsApp subscribers.

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { logError } from '@/lib/cron-utils'

export const dynamic = 'force-dynamic'

const SITE_URL = 'https://nexusai2026.example.com'

export async function POST(req: NextRequest) {
  try {
    const { message, channels } = await req.json()

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    const targetChannels = channels || ['email', 'whatsapp'] // default to both
    let emailSent = 0
    let whatsappSent = 0

    // Email broadcast
    if (targetChannels.includes('email')) {
      const emailSubs = await db.lead.findMany({
        where: {
          subscribed: true,
          OR: [{ channel: 'email' }, { channel: 'both' }],
          NOT: { email: null },
        },
        select: { email: true },
      })

      // Mock Resend send
      for (const sub of emailSubs) {
        console.log(`[Broadcast Commander] Email to ${sub.email}: ${message.slice(0, 50)}...`)
        emailSent++
      }
    }

    // WhatsApp broadcast
    if (targetChannels.includes('whatsapp')) {
      const waSubs = await db.lead.findMany({
        where: {
          subscribed: true,
          OR: [{ channel: 'whatsapp' }, { channel: 'both' }],
          NOT: { phone: null },
        },
        select: { phone: true },
      })

      const waMessage = `📢 *NexusAI 2026 Broadcast*\n\n${message}\n\n— NexusAI Team\nUnsubscribe: ${SITE_URL}/?unsubscribe=whatsapp`

      // Mock Twilio send
      for (const sub of waSubs) {
        console.log(`[Broadcast Commander] WhatsApp to +${sub.phone}`)
        whatsappSent++
      }
    }

    return NextResponse.json({
      success: true,
      emailSent,
      whatsappSent,
      totalSent: emailSent + whatsappSent,
      message: `Broadcast sent: ${emailSent} emails, ${whatsappSent} WhatsApp messages (mock)`,
      timestamp: new Date().toISOString(),
    })
  } catch (e: any) {
    await logError('api', '/api/dashboard/broadcast', e?.message || 'Unknown error')
    return NextResponse.json({ error: e?.message }, { status: 500 })
  }
}
