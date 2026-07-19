import { LibraryApp } from '@/components/library/library-app'
import { SeoSchema } from '@/components/library/seo-schema'
import {
  fetchStats,
  fetchCategories,
  fetchTrending,
  fetchItems,
  fetchRecent,
  fetchTopWorkflows,
  fetchFeatured,
  fetchTopRated,
} from '@/lib/queries'

// ISR — revalidate every 5 minutes (balances freshness with performance)
export const revalidate = 300

export default async function Home() {
  const [stats, categories, trending, initial, recent, workflows, featured, topRated] = await Promise.all([
    fetchStats(),
    fetchCategories(),
    fetchTrending(8),
    fetchItems({ sort: 'trending', limit: 24, offset: 0 }),
    fetchRecent(4),
    fetchTopWorkflows(4),
    fetchFeatured(4),
    fetchTopRated(4),
  ])

  return (
    <>
      <SeoSchema stats={stats} categories={categories} trending={trending} />
      <LibraryApp
        stats={stats}
        categories={categories}
        trending={trending}
        recent={recent}
        workflows={workflows}
        featured={featured}
        topRated={topRated}
        initialItems={initial.items}
        initialTotal={initial.total}
      />
    </>
  )
}
