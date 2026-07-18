// NexusAI 2026 — Seed Runner
// Populates the SQLite database with categories + Trinity Bundle items.
// Run with: bun run scripts/seed.ts

import { db } from '../src/lib/db'
import { seedCategories, seedItems } from '../src/lib/seed-data'
import { expansionItems } from '../src/lib/seed-expansion'

async function main() {
  const allItems = [...seedItems, ...expansionItems]
  console.log('🌱 Seeding NexusAI 2026 database...')

  // Clean existing data
  console.log('  · Cleaning existing data...')
  await db.item.deleteMany()
  await db.category.deleteMany()
  await db.generationLog.deleteMany()

  // Insert categories
  console.log(`  · Inserting ${seedCategories.length} categories...`)
  for (const c of seedCategories) {
    await db.category.create({
      data: {
        slug: c.slug,
        name: c.name,
        description: c.description,
        icon: c.icon,
        color: c.color,
      },
    })
  }

  // Insert items (convert arrays → comma/pipe strings for SQLite)
  console.log(`  · Inserting ${allItems.length} items (Trinity Bundles)...`)
  const today = new Date().toISOString().slice(0, 10)
  let trendingCount = 0
  let promptCount = 0
  let skillCount = 0

  for (const it of allItems) {
    await db.item.create({
      data: {
        slug: it.slug,
        type: it.type,
        title: it.title,
        summary: it.summary,
        category: it.category,
        niche: it.niche,
        audience: it.audience,
        difficulty: it.difficulty,
        language: it.language,
        promptContent: it.promptContent,
        workflowContent: it.workflowContent,
        audienceContent: it.audienceContent,
        tags: it.tags.join(', '),
        requiredTools: it.requiredTools.join(', '),
        useCases: it.useCases.join(' | '),
        trending: it.trending,
        trendingScore: it.trendingScore,
        featured: it.featured,
        viewCount: it.viewCount,
        downloadCount: it.downloadCount,
        rating: it.rating,
        faqQuestion: it.faqQuestion,
        faqAnswer: it.faqAnswer,
        citation: it.citation,
        seoKeywords: it.seoKeywords.join(', '),
        relatedIds: '',
        source: 'seed',
        runDate: today,
      },
    })
    if (it.trending) trendingCount++
    if (it.type === 'prompt') promptCount++
    else skillCount++
  }

  // Compute internal links: for each item, link to 4 others sharing the same
  // category or overlapping tags.
  console.log('  · Computing internal link graph...')
  const dbItems = await db.item.findMany({ select: { id: true, slug: true, category: true, tags: true, type: true } })
  for (const item of dbItems) {
    const myTags = item.tags.split(',').map((t) => t.trim().toLowerCase())
    const candidates = dbItems
      .filter((o) => o.id !== item.id)
      .map((o) => {
        let score = 0
        if (o.category === item.category) score += 3
        const oTags = o.tags.split(',').map((t) => t.trim().toLowerCase())
        const overlap = oTags.filter((t) => myTags.includes(t)).length
        score += overlap
        if (o.type !== item.type) score += 1 // cross-link prompts <-> skills
        return { id: o.id, score }
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 4)
      .map((c) => c.id)
    await db.item.update({ where: { id: item.id }, data: { relatedIds: candidates.join(',') } })
  }

  // Log the seed run as a generation log entry
  await db.generationLog.create({
    data: {
      runDate: today,
      promptsCount: promptCount,
      skillsCount: skillCount,
      status: 'completed',
      note: 'Baseline seed library (curated Trinity Bundles).',
    },
  })

  console.log('\n✅ Seed complete.')
  console.log(`   Categories: ${seedCategories.length}`)
  console.log(`   Items:      ${allItems.length} (${promptCount} prompts, ${skillCount} skills)`)
  console.log(`   Trending:   ${trendingCount}`)
  console.log(`   Trinity files available: ${allItems.length * 3}`)
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })
