import { NextRequest, NextResponse } from 'next/server'
import { fetchFeatured } from '@/lib/queries'

export async function GET(req: NextRequest) {
  const limit = Number(req.nextUrl.searchParams.get('limit') ?? 8)
  const items = await fetchFeatured(limit)
  return NextResponse.json({ items })
}
