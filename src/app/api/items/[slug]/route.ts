import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { fetchBySlug, fetchRelated, incrementView, toSummary } from '@/lib/queries'

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const item = await fetchBySlug(slug)
  if (!item) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
  // fire-and-forget view increment
  incrementView(item.id)
  const related = await fetchRelated(item, 4)

  // Prev/Next navigation (by createdAt)
  const [prevRow, nextRow] = await Promise.all([
    db.item.findFirst({
      where: { createdAt: { lt: new Date(item.createdAt) } },
      orderBy: { createdAt: 'desc' },
      select: { id: true, slug: true, title: true, type: true, niche: true },
    }),
    db.item.findFirst({
      where: { createdAt: { gt: new Date(item.createdAt) } },
      orderBy: { createdAt: 'asc' },
      select: { id: true, slug: true, title: true, type: true, niche: true },
    }),
  ])

  return NextResponse.json({
    item,
    related,
    prev: prevRow || null,
    next: nextRow || null,
  })
}
