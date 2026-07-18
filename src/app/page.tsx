import { LibraryApp } from '@/components/library/library-app'
import { SeoSchema } from '@/components/library/seo-schema'
import {
  fetchStats,
  fetchCategories,
  fetchTrending,
  fetchItems,
} from '@/lib/queries'

// Revalidate frequently so newly-generated agent items appear.
export const revalidate = 60
export const dynamic = 'force-dynamic'

export default async function Home() {
  const [stats, categories, trending, initial] = await Promise.all([
    fetchStats(),
    fetchCategories(),
    fetchTrending(8),
    fetchItems({ sort: 'trending', limit: 24, offset: 0 }),
  ])

  return (
    <>
      <SeoSchema stats={stats} categories={categories} trending={trending} />
      <LibraryApp
        stats={stats}
        categories={categories}
        trending={trending}
        initialItems={initial.items}
        initialTotal={initial.total}
      />
    </>
  )
}
