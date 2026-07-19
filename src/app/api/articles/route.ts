// Articles list API
import { NextRequest, NextResponse } from 'next/server'
import { fetchArticles, fetchFeaturedArticles } from '@/lib/article-queries'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const limit = Math.min(Number(req.nextUrl.searchParams.get('limit') || 12), 50)
  const offset = Number(req.nextUrl.searchParams.get('offset') || 0)
  const featured = req.nextUrl.searchParams.get('featured') === 'true'

  if (featured) {
    const articles = await fetchFeaturedArticles(3)
    return NextResponse.json({ articles })
  }

  const { articles, total } = await fetchArticles(limit, offset)
  return NextResponse.json({ articles, total, hasMore: offset + limit < total })
}
