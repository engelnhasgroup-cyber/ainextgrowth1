// Admin Settings API — GET/PUT
// GET: returns current AdminSetting singleton
// PUT: updates AdminSetting fields

import { NextRequest, NextResponse } from 'next/server'
import { getAdminSettings, updateAdminSettings } from '@/lib/admin-settings'

export const dynamic = 'force-dynamic'

export async function GET() {
  const settings = await getAdminSettings()
  return NextResponse.json(settings)
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json()
    // Whitelist allowed fields
    const allowed: Record<string, any> = {}
    const fields = [
      'googleVerificationCode', 'bingVerificationCode', 'googleAnalyticsId',
      'adsenseClientId', 'aiSystemPrompt', 'aiDailyLimit', 'siteName',
      'siteUrl', 'maintenanceMode',
    ]
    for (const f of fields) {
      if (body[f] !== undefined) allowed[f] = body[f]
    }
    const updated = await updateAdminSettings(allowed)
    return NextResponse.json({ success: true, settings: updated })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Update failed' }, { status: 500 })
  }
}
