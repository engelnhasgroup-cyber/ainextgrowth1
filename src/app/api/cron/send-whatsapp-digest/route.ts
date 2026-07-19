// WhatsApp Digest Cron — sends daily top 5 trending items to WhatsApp/BOTH subscribers.
// Uses Twilio API (mock — structured for real API key plugin).
// GET /api/cron/send-whatsapp-digest

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { checkCronAuth, unauthorizedResponse, logCronJob, logError, getTopTrendingItems, buildWhatsAppMessage } from '@/lib/cron-utils'

export const dynamic = 'force-dynamic'
export const maxDuration = 120

export async function GET(req: NextRequest) {
  if (!checkCronAuth(req)) return unauthorizedResponse()

  const t0 = Date.now()

  try {
    const items = await getTopTrendingItems(5)

    if (items.length === 0) {
      return NextResponse.json({ success: true, message: 'No items to send' })
    }

    // Get WhatsApp/BOTH subscribers
    const subscribers = await db.lead.findMany({
      where: {
        subscribed: true,
        OR: [{ channel: 'whatsapp' }, { channel: 'both' }],
        NOT: { phone: null },
      },
      select: { id: true, phone: true },
    })

    if (subscribers.length === 0) {
      const duration = Date.now() - t0
      await logCronJob('send-whatsapp-digest', 'completed', duration, 0, 'No WhatsApp subscribers')
      return NextResponse.json({ success: true, message: 'No WhatsApp subscribers to send to', sentTo: 0 })
    }

    const message = buildWhatsAppMessage(items)

    // Mock Twilio API call — in production:
    // const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
    // for (const sub of subscribers) {
    //   await client.messages.create({
    //     from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
    //     to: `whatsapp:+${sub.phone}`,
    //     body: message,
    //   })
    // }

    let sentCount = 0
    for (const sub of subscribers) {
      // Mock send
      console.log(`[WhatsApp Digest] Sending to +${sub.phone}`)
      sentCount++
      // Small delay to avoid rate limits
      await new Promise((r) => setTimeout(r, 100))
    }

    const duration = Date.now() - t0
    await logCronJob('send-whatsapp-digest', 'completed', duration, sentCount, `Sent to ${sentCount} subscribers`)

    return NextResponse.json({
      success: true,
      sentTo: sentCount,
      totalSubscribers: subscribers.length,
      messagePreview: message.slice(0, 100),
      durationMs: duration,
      timestamp: new Date().toISOString(),
    })
  } catch (e: any) {
    const duration = Date.now() - t0
    await logError('cron', '/api/cron/send-whatsapp-digest', e?.message || 'Unknown error', e?.stack || '')
    await logCronJob('send-whatsapp-digest', 'failed', duration, 0, e?.message || 'Unknown error')
    return NextResponse.json({ success: false, error: e?.message }, { status: 500 })
  }
}
