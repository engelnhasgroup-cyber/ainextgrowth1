// Category CRUD API — GET/POST/PUT/DELETE
// Manages site categories dynamically from the Dashboard.

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET() {
  const categories = await db.category.findMany({
    orderBy: { name: 'asc' },
  })
  // Get item counts separately
  const counts = await db.item.groupBy({
    by: ['category'],
    _count: { _all: true },
  })
  const countMap = new Map(counts.map((c) => [c.category, c._count._all]))
  const categoriesWithCounts = categories.map((c) => ({
    ...c,
    _count: { items: countMap.get(c.slug) ?? 0 },
  }))
  return NextResponse.json({ categories: categoriesWithCounts })
}

export async function POST(req: NextRequest) {
  try {
    const { name, slug, description, icon, color } = await req.json()
    if (!name || !slug) {
      return NextResponse.json({ error: 'name and slug required' }, { status: 400 })
    }
    const category = await db.category.create({
      data: {
        name,
        slug: slug.toLowerCase().replace(/\s+/g, '-'),
        description: description || '',
        icon: icon || 'Search',
        color: color || '#10b981',
      },
    })
    return NextResponse.json({ success: true, category })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Create failed' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id, ...data } = await req.json()
    if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })
    if (data.slug) data.slug = data.slug.toLowerCase().replace(/\s+/g, '-')
    const category = await db.category.update({ where: { id }, data })
    return NextResponse.json({ success: true, category })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Update failed' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json()
    if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })
    await db.category.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Delete failed' }, { status: 500 })
  }
}
