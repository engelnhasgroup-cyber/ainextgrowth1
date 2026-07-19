// Blog list page — SSR with pagination
import { fetchArticles, fetchFeaturedArticles } from '@/lib/article-queries'
import { BlogListClient } from '@/components/library/blog-list-client'

export const revalidate = 300

export const metadata = {
  title: 'Blog — AI Prompt Engineering Insights for 2026',
  description: 'Expert articles on AI prompt engineering, agentic workflows, and automation strategies for 2026. Learn from the NexusAI Editorial Team.',
}

export default async function BlogPage() {
  const [{ articles, total }, featured] = await Promise.all([
    fetchArticles(9, 0),
    fetchFeaturedArticles(3),
  ])

  return <BlogListClient initialArticles={articles} initialTotal={total} featured={featured} />
}
