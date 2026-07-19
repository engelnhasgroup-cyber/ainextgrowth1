// NexusAI 2026 — Mass Generation Script (Enhanced)
// Generates items across 10 niches with even type distribution.
// Resilient to rate limits with retry + backoff.
//
// Usage:
//   bun run scripts/generate-mass.ts 30        # 30 items
//   bun run scripts/generate-mass.ts 30 2      # 30 items, 2 concurrent

import { db } from '../src/lib/db'
import {
  generateOne,
  persistItem,
  CATEGORY_SLUGS,
  TRENDING_TOPICS_2026,
} from '../src/app/api/generate/route'
import type { ItemType } from '../src/lib/types'

const CONCURRENCY = Number(process.argv[4] || 2)
const TOTAL = Number(process.argv[2] || 30)
const today = new Date().toISOString().slice(0, 10)

// 10 niches mapped to our 8 categories (some overlap)
const NICHES: { category: string; topic: string }[] = [
  { category: 'seo-content-marketing', topic: 'AI-powered content marketing strategy for SaaS' },
  { category: 'software-engineering', topic: 'GPT-5 pair programming and code review automation' },
  { category: 'data-analytics', topic: 'Natural language to SQL with schema awareness' },
  { category: 'business-strategy', topic: 'AI startup moat and defensibility assessment' },
  { category: 'design-creative', topic: 'Design system token architecture for 2026' },
  { category: 'sales-growth', topic: 'PLG activation funnel optimization with AI personalization' },
  { category: 'education-research', topic: 'Adaptive learning path generation for EdTech' },
  { category: 'automation-agents', topic: 'Multi-modal autonomous customer support agents' },
  { category: 'seo-content-marketing', topic: 'Programmatic SEO at scale with AI generation' },
  { category: 'software-engineering', topic: 'DevOps automation with AI agents and IaC' },
]

function planTypes(total: number): ItemType[] {
  const plan: ItemType[] = []
  for (let i = 0; i < total; i++) {
    const mod = i % 3
    plan.push(mod === 0 ? 'prompt' : mod === 1 ? 'skill' : 'workflow')
  }
  return plan
}

async function genOne(label: string, type: ItemType, niche: { category: string; topic: string }): Promise<number> {
  const t0 = Date.now()
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const gen = await generateOne(niche.category, type, niche.topic)
      const detail = await persistItem(gen, niche.category, type, niche.topic, today)

      const peers = await db.item.findMany({
        where: { category: niche.category, NOT: { id: detail.id } },
        orderBy: { trendingScore: 'desc' },
        take: 4,
        select: { id: true },
      })
      await db.item.update({
        where: { id: detail.id },
        data: { relatedIds: peers.map((p) => p.id).join(',') },
      })

      const dt = ((Date.now() - t0) / 1000).toFixed(1)
      console.log(`  ✓ [${label}] ${type.padEnd(8)} ${(detail.title).slice(0, 55)}  (${dt}s)`)
      return 1
    } catch (e: any) {
      const msg = e?.message || 'error'
      if (msg.includes('429') && attempt < 3) {
        const wait = attempt * 8000
        console.log(`  ⏳ [${label}] ${type} rate-limited, retry ${attempt}/3 in ${wait / 1000}s…`)
        await new Promise((r) => setTimeout(r, wait))
        continue
      }
      console.error(`  ✗ [${label}] ${type} failed: ${msg.slice(0, 80)}`)
      return 0
    }
  }
  return 0
}

async function runBatch(items: { label: string; type: ItemType; niche: { category: string; topic: string } }[]): Promise<number> {
  let ok = 0
  for (let i = 0; i < items.length; i += CONCURRENCY) {
    const chunk = items.slice(i, i + CONCURRENCY)
    const results = await Promise.all(chunk.map((c) => genOne(c.label, c.type, c.niche)))
    ok += results.reduce((a, b) => a + b, 0)
    if (i + CONCURRENCY < items.length) {
      await new Promise((r) => setTimeout(r, 2000))
    }
  }
  return ok
}

async function main() {
  const plan = planTypes(TOTAL)
  const items = plan.map((type, i) => ({
    label: `${i + 1}/${TOTAL}`,
    type,
    niche: NICHES[i % NICHES.length],
  }))

  const prompts = plan.filter((t) => t === 'prompt').length
  const skills = plan.filter((t) => t === 'skill').length
  const workflows = plan.filter((t) => t === 'workflow').length

  console.log(`\n🚀 NexusAI Mass Generation`)
  console.log(`   Target: ${TOTAL} items (${prompts} prompts, ${skills} skills, ${workflows} workflows)`)
  console.log(`   Niches: ${NICHES.length} categories`)
  console.log(`   Concurrency: ${CONCURRENCY}`)
  console.log(`   Estimated time: ~${Math.ceil(TOTAL / CONCURRENCY * 15)}s\n`)

  const t0 = Date.now()
  const ok = await runBatch(items)
  const dt = ((Date.now() - t0) / 1000).toFixed(1)

  await db.generationLog.create({
    data: {
      runDate: today,
      promptsCount: prompts,
      skillsCount: skills,
      status: ok > 0 ? 'completed' : 'failed',
      note: `Mass generation: ${ok}/${TOTAL} succeeded in ${dt}s`,
    },
  })

  console.log(`\n✅ Mass generation complete: ${ok}/${TOTAL} items generated in ${dt}s`)
  const finalStats = await db.item.count()
  console.log(`   Library total: ${finalStats} items`)
}

main()
  .catch((e) => {
    console.error('❌ Mass generation failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })
