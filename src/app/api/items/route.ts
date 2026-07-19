import { NextRequest, NextResponse } from 'next/server'
import { fetchItems } from '@/lib/queries'
import type { ItemsQuery, ItemType } from '@/lib/types'

export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams
  const query: ItemsQuery = {
    type: (sp.get('type') as ItemType | 'all' | undefined) ?? 'all',
    category: sp.get('category') ?? 'all',
    search: sp.get('search') ?? undefined,
    trending: sp.get('trending') === 'true',
    featured: sp.get('featured') === 'true',
    sort: (sp.get('sort') as ItemsQuery['sort']) ?? 'trending',
    limit: sp.get('limit') ? Number(sp.get('limit')) : 24,
    offset: sp.get('offset') ? Number(sp.get('offset')) : 0,
  }
  const data = await fetchItems(query)
  return NextResponse.json(data)
}
