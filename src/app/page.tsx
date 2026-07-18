import { LibraryApp } from '@/components/library/library-app'
import { SeoSchema } from '@/components/library/seo-schema'
import {
  fetchStats,
  fetchCategories,
  fetchTrending,
  fetchItems,
  fetchRecent,
  fetchTopWorkflows,
} from '@/lib/queries'

// Revalidate frequently so newly-generated agent items appear.
export const revalidate = 60
export const dynamic = 'force-dynamic'

export default async function Home() {
  const [stats, categories, trending, initial, recent, workflows] = await Promise.all([
    fetchStats(),
    fetchCategories(),
    fetchTrending(8),
    fetchItems({ sort: 'trending', limit: 24, offset: 0 }),
    fetchRecent(4),
    fetchTopWorkflows(4),
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
        initialItems={initial.items}
        initialTotal={initial.total}
      />
    </>
  )
}
