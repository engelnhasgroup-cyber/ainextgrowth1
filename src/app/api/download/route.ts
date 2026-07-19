import { NextRequest, NextResponse } from 'next/server'
import { incrementDownload } from '@/lib/queries'

// Records a download event (called after the Ad-Gate countdown completes).
export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json()
    if (!id || typeof id !== 'string') {
      return NextResponse.json({ error: 'Missing id' }, { status: 400 })
    }
    incrementDownload(id)
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 })
  }
}
