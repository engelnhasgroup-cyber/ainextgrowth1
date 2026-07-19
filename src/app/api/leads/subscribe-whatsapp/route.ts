// WhatsApp Lead Subscription API
// POST /api/leads/subscribe-whatsapp
// Body: { phone: string, countryCode?: string, source?: string }

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

function sanitizePhone(phone: string): string {
  // Remove all non-digit characters
  return phone.replace(/\D/g, '')
}

function validatePhone(phone: string): boolean {
  const cleaned = sanitizePhone(phone)
  // International format: 8-15 digits (E.164 standard)
  return cleaned.length >= 8 && cleaned.length <= 15
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}))
    const { phone, countryCode = '', source = 'footer' } = body

    if (!phone) {
      return NextResponse.json(
        { error: 'Phone number is required' },
        { status: 400 }
      )
    }

    const cleanedPhone = sanitizePhone(phone)
    if (!validatePhone(cleanedPhone)) {
      return NextResponse.json(
        { error: 'Invalid phone number. Must be 8-15 digits.' },
        { status: 400 }
      )
    }

    // Check if already exists
    const existing = await db.lead.findUnique({
      where: { phone: cleanedPhone },
    })

    if (existing) {
      if (existing.subscribed) {
        return NextResponse.json({
          success: true,
          message: 'Already subscribed!',
          lead: { id: existing.id, phone: existing.phone, subscribed: existing.subscribed },
        })
      }
      // Resubscribe
      const updated = await db.lead.update({
        where: { id: existing.id },
        data: { subscribed: true, source, countryCode },
      })
      return NextResponse.json({
        success: true,
        message: 'Welcome back! You are resubscribed.',
        lead: { id: updated.id, phone: updated.phone, subscribed: updated.subscribed },
      })
    }

    // Create new lead
    const lead = await db.lead.create({
      data: {
        phone: cleanedPhone,
        channel: 'whatsapp',
        subscribed: true,
        countryCode,
        source,
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to WhatsApp daily prompts!',
      lead: { id: lead.id, phone: lead.phone, subscribed: lead.subscribed },
    })
  } catch (e: any) {
    console.error('Subscribe error:', e)
    return NextResponse.json(
      { error: e?.message || 'Subscription failed' },
      { status: 500 }
    )
  }
}

// GET — returns subscriber count (public, for display)
export async function GET() {
  const count = await db.lead.count({
    where: { subscribed: true, channel: 'whatsapp' },
  })
  return NextResponse.json({ count })
}
