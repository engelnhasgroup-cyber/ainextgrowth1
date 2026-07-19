// Blog article page — SSR with dynamic SEO metadata
import { fetchArticleBySlug, fetchRelatedArticles } from '@/lib/article-queries'
import { BlogArticleClient } from '@/components/library/blog-article-client'
import { getAdminSettings } from '@/lib/admin-settings'
import { notFound } from 'next/navigation'

export const revalidate = 300

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = await fetchArticleBySlug(slug)
  if (!article) return { title: 'Article Not Found' }

  const settings = await getAdminSettings()
  const siteUrl = settings.siteUrl || 'https://nexusai2026.example.com'

  return {
    title: article.title.slice(0, 60),
    description: article.metaDescription.slice(0, 160),
    openGraph: {
      title: article.title,
      description: article.metaDescription,
      url: `${siteUrl}/blog/${article.slug}`,
      type: 'article',
      publishedTime: article.publishedAt,
      authors: [article.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title.slice(0, 60),
      description: article.metaDescription.slice(0, 160),
    },
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = await fetchArticleBySlug(slug)
  if (!article) notFound()
  const related = await fetchRelatedArticles(article, 3)

  return <BlogArticleClient article={article} related={related} />
}
