// Single article API
import { NextRequest, NextResponse } from 'next/server'
import { fetchArticleBySlug, fetchRelatedArticles } from '@/lib/article-queries'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = await fetchArticleBySlug(slug)
  if (!article) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  const related = await fetchRelatedArticles(article, 3)
  return NextResponse.json({ article, related })
}
