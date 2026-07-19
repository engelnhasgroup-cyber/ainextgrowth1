// Unsubscribe API — handles ?unsubscribe=email|whatsapp
// POST /api/leads/unsubscribe  Body: { channel: 'email'|'whatsapp', identifier: string }
// Also works via GET with query params for email link clicks.

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { logError } from '@/lib/cron-utils'

export const dynamic = 'force-dynamic'

async function unsubscribe(channel: string, identifier: string) {
  if (channel === 'email') {
    const lead = await db.lead.findUnique({ where: { email: identifier } })
    if (!lead) return { success: false, message: 'Email not found' }
    await db.lead.update({ where: { id: lead.id }, data: { subscribed: false } })
    return { success: true, message: 'You have been unsubscribed from email digests.' }
  } else if (channel === 'whatsapp') {
    const lead = await db.lead.findUnique({ where: { phone: identifier } })
    if (!lead) return { success: false, message: 'Phone number not found' }
    await db.lead.update({ where: { id: lead.id }, data: { subscribed: false } })
    return { success: true, message: 'You have been unsubscribed from WhatsApp messages.' }
  }
  return { success: false, message: 'Invalid channel' }
}

export async function POST(req: NextRequest) {
  try {
    const { channel, identifier } = await req.json()
    if (!channel || !identifier) {
      return NextResponse.json({ error: 'channel and identifier required' }, { status: 400 })
    }
    const result = await unsubscribe(channel, identifier)
    return NextResponse.json(result, { status: result.success ? 200 : 404 })
  } catch (e: any) {
    await logError('api', '/api/leads/unsubscribe', e?.message || 'Unknown error')
    return NextResponse.json({ error: e?.message }, { status: 500 })
  }
}

// GET handler for link clicks (?channel=email&identifier=...)
export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams
  const channel = sp.get('channel') || sp.get('unsubscribe') || ''
  const identifier = sp.get('identifier') || sp.get('email') || sp.get('phone') || ''

  if (!channel || !identifier) {
    return NextResponse.json({ error: 'channel and identifier required' }, { status: 400 })
  }

  try {
    const result = await unsubscribe(channel, identifier)
    // Return a simple HTML page for browser clicks
    return new NextResponse(
      `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Unsubscribed</title><style>
        body{font-family:system-ui,sans-serif;background:#0a0a0f;color:#fff;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0}
        .card{max-width:400px;padding:32px;text-align:center;background:#1a1a2e;border-radius:16px;border:1px solid #2a2a4a}
        h1{color:${result.success ? '#10b981' : '#f43f5e'};font-size:20px;margin:0 0 8px}
        p{color:#aaa;font-size:14px;margin:0 0 16px}
        a{color:#10b981;font-size:13px;text-decoration:none}
      </style></head><body><div class="card">
        <h1>${result.success ? '✅ Unsubscribed' : '❌ Not Found'}</h1>
        <p>${result.message}</p>
        <a href="https://nexusai2026.example.com/">← Back to NexusAI 2026</a>
      </div></body></html>`,
      { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
    )
  } catch (e: any) {
    await logError('api', '/api/leads/unsubscribe', e?.message || 'Unknown error')
    return NextResponse.json({ error: e?.message }, { status: 500 })
  }
}
