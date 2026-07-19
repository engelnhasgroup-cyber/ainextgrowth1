// Email Digest Cron — sends daily top 5 trending items to email/BOTH subscribers.
// Uses Resend API (mock — structured for real API key plugin).
// GET /api/cron/send-email-digest

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { checkCronAuth, unauthorizedResponse, logCronJob, logError, getTopTrendingItems } from '@/lib/cron-utils'

export const dynamic = 'force-dynamic'
export const maxDuration = 120

const SITE_URL = 'https://nexusai2026.example.com'
const PHYSICAL_ADDRESS = 'NexusAI 2026, 100 Market Street, Suite 400, San Francisco, CA 94105'

function buildEmailHTML(items: { title: string; slug: string; niche: string; summary: string; type: string }[]) {
  const itemCards = items.map((item, i) => `
    <div style="margin-bottom: 20px; padding: 16px; background: #1a1a2e; border-radius: 12px; border: 1px solid #2a2a4a;">
      <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
        <span style="background: ${item.type === 'prompt' ? '#10b98120' : item.type === 'skill' ? '#8b5cf620' : '#f59e0b20'}; color: ${item.type === 'prompt' ? '#10b981' : item.type === 'skill' ? '#8b5cf6' : '#f59e0b'}; padding: 2px 8px; border-radius: 4px; font-size: 10px; font-weight: bold; text-transform: uppercase;">${item.type}</span>
        <span style="color: #999; font-size: 11px;">${item.niche}</span>
      </div>
      <h3 style="color: #fff; font-size: 15px; margin: 0 0 6px 0;">${i + 1}. ${item.title}</h3>
      <p style="color: #aaa; font-size: 12px; margin: 0 0 12px 0; line-height: 1.5;">${item.summary}</p>
      <a href="${SITE_URL}/?item=${item.slug}" style="display: inline-block; background: linear-gradient(135deg, #10b981, #8b5cf6); color: #fff; text-decoration: none; padding: 8px 16px; border-radius: 8px; font-size: 12px; font-weight: 600;">Download Trinity Bundle →</a>
    </div>
  `).join('')

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background: #0a0a0f; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
    <!-- Header -->
    <div style="text-align: center; margin-bottom: 24px;">
      <div style="display: inline-block; padding: 8px 16px; background: linear-gradient(135deg, #10b98120, #8b5cf620); border-radius: 8px; border: 1px solid #2a2a4a;">
        <span style="color: #10b981; font-size: 12px; font-weight: bold;">🔥 NexusAI 2026 — Daily Top 5</span>
      </div>
      <h1 style="color: #fff; font-size: 22px; margin: 16px 0 4px 0;">Today's Trending Prompts</h1>
      <p style="color: #888; font-size: 13px; margin: 0;">Fresh from our autonomous AI agent — ${new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
    </div>

    <!-- Items -->
    ${itemCards}

    <!-- CTA -->
    <div style="text-align: center; margin: 24px 0;">
      <a href="${SITE_URL}/#trending" style="display: inline-block; background: linear-gradient(135deg, #10b981, #8b5cf6); color: #fff; text-decoration: none; padding: 12px 32px; border-radius: 24px; font-size: 14px; font-weight: 700;">Explore Full Library →</a>
    </div>

    <!-- Footer (compliance) -->
    <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #2a2a4a; text-align: center;">
      <p style="color: #666; font-size: 10px; margin: 0 0 4px 0;">You're receiving this because you subscribed to NexusAI 2026 daily digest.</p>
      <p style="color: #666; font-size: 10px; margin: 0 0 8px 0;">${PHYSICAL_ADDRESS}</p>
      <a href="${SITE_URL}/?unsubscribe=email" style="color: #999; font-size: 11px;">Unsubscribe</a>
      <span style="color: #444; font-size: 10px; margin: 0 8px;">·</span>
      <a href="${SITE_URL}/?page=privacy" style="color: #999; font-size: 11px;">Privacy Policy</a>
      <span style="color: #444; font-size: 10px; margin: 0 8px;">·</span>
      <a href="${SITE_URL}/?page=terms" style="color: #999; font-size: 11px;">Terms</a>
    </div>
  </div>
</body>
</html>`
}

export async function GET(req: NextRequest) {
  if (!checkCronAuth(req)) return unauthorizedResponse()

  const t0 = Date.now()

  try {
    const items = await getTopTrendingItems(5)

    if (items.length === 0) {
      return NextResponse.json({ success: true, message: 'No items to send' })
    }

    // Get email/BOTH subscribers
    const subscribers = await db.lead.findMany({
      where: {
        subscribed: true,
        OR: [{ channel: 'email' }, { channel: 'both' }],
        NOT: { email: null },
      },
      select: { id: true, email: true },
    })

    if (subscribers.length === 0) {
      const duration = Date.now() - t0
      await logCronJob('send-email-digest', 'completed', duration, 0, 'No email subscribers')
      return NextResponse.json({ success: true, message: 'No email subscribers to send to', sentTo: 0 })
    }

    const html = buildEmailHTML(items)
    const subject = `🔥 Top 5 Trending AI Prompts — ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`

    // Mock Resend API call — in production:
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.emails.send({
    //   from: 'NexusAI 2026 <digest@nexusai2026.example.com>',
    //   to: subscriber.email,
    //   subject,
    //   html,
    // })

    let sentCount = 0
    for (const sub of subscribers) {
      // Mock send
      console.log(`[Email Digest] Sending to ${sub.email}: ${subject}`)
      sentCount++
    }

    const duration = Date.now() - t0
    await logCronJob('send-email-digest', 'completed', duration, sentCount, `Sent to ${sentCount} subscribers`)

    return NextResponse.json({
      success: true,
      sentTo: sentCount,
      totalSubscribers: subscribers.length,
      subject,
      durationMs: duration,
      timestamp: new Date().toISOString(),
    })
  } catch (e: any) {
    const duration = Date.now() - t0
    await logError('cron', '/api/cron/send-email-digest', e?.message || 'Unknown error', e?.stack || '')
    await logCronJob('send-email-digest', 'failed', duration, 0, e?.message || 'Unknown error')
    return NextResponse.json({ success: false, error: e?.message }, { status: 500 })
  }
}
