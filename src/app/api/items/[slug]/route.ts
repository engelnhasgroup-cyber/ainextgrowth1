import { NextRequest, NextResponse } from 'next/server'
import { fetchBySlug, fetchRelated, incrementView } from '@/lib/queries'

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const item = await fetchBySlug(slug)
  if (!item) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
  // fire-and-forget view increment
  incrementView(item.id)
  const related = await fetchRelated(item, 4)
  return NextResponse.json({ item, related })
}
