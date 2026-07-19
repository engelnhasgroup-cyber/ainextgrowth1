// NexusAI 2026 — Admin Settings helper
// Singleton pattern: get or create the single AdminSetting row.

import { db } from '@/lib/db'

export interface AdminSettings {
  id: string
  googleVerificationCode: string
  bingVerificationCode: string
  googleAnalyticsId: string
  adsenseClientId: string
  aiSystemPrompt: string
  aiDailyLimit: number
  siteName: string
  siteUrl: string
  maintenanceMode: boolean
}

const DEFAULTS: AdminSettings = {
  id: 'singleton',
  googleVerificationCode: '',
  bingVerificationCode: '',
  googleAnalyticsId: '',
  adsenseClientId: 'ca-pub-XXXXXXXXXXXXXXXX',
  aiSystemPrompt: 'You are the NexusAI 2026 Autonomous Content Agent. Generate professional, 2026-era AI prompts, skills, and workflows with full Trinity Bundles.',
  aiDailyLimit: 200,
  siteName: 'NexusAI 2026',
  siteUrl: 'https://nexusai2026.example.com',
  maintenanceMode: false,
}

export async function getAdminSettings(): Promise<AdminSettings> {
  try {
    const row = await db.adminSetting.findUnique({ where: { id: 'singleton' } })
    if (row) return row as AdminSettings
    // Create singleton on first access
    const created = await db.adminSetting.create({ data: { id: 'singleton' } })
    return { ...DEFAULTS, ...created } as AdminSettings
  } catch {
    return DEFAULTS
  }
}

export async function updateAdminSettings(data: Partial<AdminSettings>): Promise<AdminSettings> {
  try {
    const row = await db.adminSetting.upsert({
      where: { id: 'singleton' },
      update: data,
      create: { id: 'singleton', ...data },
    })
    return row as AdminSettings
  } catch (e) {
    throw e
  }
}
