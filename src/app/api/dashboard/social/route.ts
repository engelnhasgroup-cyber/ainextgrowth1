// Dashboard — Social Media Command Center API
// GET: returns social integration status
// PUT: update platform settings (connect/disconnect, toggle auto-post)

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

const PLATFORMS = [
  { name: 'twitter', label: 'X (Twitter)', icon: 'Twitter', color: '#1d9bf0' },
  { name: 'linkedin', label: 'LinkedIn', icon: 'Linkedin', color: '#0a66c2' },
  { name: 'reddit', label: 'Reddit', icon: 'MessageSquare', color: '#ff4500' },
  { name: 'telegram', label: 'Telegram', icon: 'Send', color: '#0088cc' },
]

export async function GET() {
  // Ensure all platforms exist in DB
  for (const p of PLATFORMS) {
    await db.socialIntegration.upsert({
      where: { platform: p.name },
      update: {},
      create: { platform: p.name, connected: false, autoPost: true },
    })
  }

  const integrations = await db.socialIntegration.findMany()
  const integrationMap = new Map(integrations.map((i) => [i.platform, i]))

  const platforms = PLATFORMS.map((p) => {
    const integration = integrationMap.get(p.name)
    return {
      ...p,
      connected: integration?.connected || false,
      autoPost: integration?.autoPost ?? true,
      lastPostedAt: integration?.lastPostedAt?.toISOString() || null,
      hasApiKey: !!(integration?.apiKey),
    }
  })

  const connectedCount = platforms.filter((p) => p.connected).length
  const autoPostCount = platforms.filter((p) => p.autoPost).length

  return NextResponse.json({
    platforms,
    summary: {
      total: PLATFORMS.length,
      connected: connectedCount,
      autoPostEnabled: autoPostCount,
    },
  })
}

export async function PUT(req: NextRequest) {
  try {
    const { platform, action, value } = await req.json()

    if (action === 'toggle_auto') {
      await db.socialIntegration.upsert({
        where: { platform },
        update: { autoPost: value },
        create: { platform, autoPost: value },
      })
      return NextResponse.json({ success: true, message: `Auto-post ${value ? 'enabled' : 'disabled'} for ${platform}` })
    }

    if (action === 'connect') {
      const { apiKey, apiSecret, accessToken } = value || {}
      await db.socialIntegration.upsert({
        where: { platform },
        update: {
          connected: true,
          apiKey: apiKey || '',
          apiSecret: apiSecret || '',
          accessToken: accessToken || '',
        },
        create: {
          platform,
          connected: true,
          apiKey: apiKey || '',
          apiSecret: apiSecret || '',
          accessToken: accessToken || '',
          autoPost: true,
        },
      })
      return NextResponse.json({ success: true, message: `${platform} connected` })
    }

    if (action === 'disconnect') {
      await db.socialIntegration.upsert({
        where: { platform },
        update: { connected: false, apiKey: '', apiSecret: '', accessToken: '' },
        create: { platform, connected: false },
      })
      return NextResponse.json({ success: true, message: `${platform} disconnected` })
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Update failed' }, { status: 500 })
  }
}
