import { NextRequest, NextResponse } from 'next/server'
import { fetchTrending } from '@/lib/queries'

export async function GET(req: NextRequest) {
  const limit = Number(req.nextUrl.searchParams.get('limit') ?? 20)
  const items = await fetchTrending(limit)
  return NextResponse.json({ items })
}
