// NexusAI 2026 — Batch Generation Script
// Generates a target number of prompts + skills + workflows via the LLM agent,
// with concurrency control and delays to avoid rate limits.
//
// Usage:
//   bun run scripts/generate-batch.ts                    # default: 20 items
//   bun run scripts/generate-batch.ts 60                 # 60 items
//   bun run scripts/generate-batch.ts 60 5               # 60 items, 5 concurrent
//
// The script calls the internal generation logic directly (not via HTTP) to
// avoid dev-server overhead, and logs progress to the console.

import { db } from '../src/lib/db'
import {
  generateOne,
  persistItem,
  CATEGORY_SLUGS,
  TRENDING_TOPICS_2026,
} from '../src/app/api/generate/route'
import type { ItemType } from '../src/lib/types'

const CONCURRENCY = Number(process.argv[4] || 5)
const TOTAL = Number(process.argv[2] || 20)
const today = new Date().toISOString().slice(0, 10)

// Even distribution across the 3 types
function planTypes(total: number): ItemType[] {
  const plan: ItemType[] = []
  for (let i = 0; i < total; i++) {
    const mod = i % 3
    plan.push(mod === 0 ? 'prompt' : mod === 1 ? 'skill' : 'workflow')
  }
  return plan
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

async function genOne(label: string, type: ItemType): Promise<number> {
  const category = pick(CATEGORY_SLUGS)
  const topic = pick(TRENDING_TOPICS_2026)
  const t0 = Date.now()

  // retry with exponential backoff on rate-limit errors
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const gen = await generateOne(category, type, topic)
      const detail = await persistItem(gen, category, type, topic, today)

      // link to peers
      const peers = await db.item.findMany({
        where: { category, NOT: { id: detail.id } },
        orderBy: { trendingScore: 'desc' },
        take: 4,
        select: { id: true },
      })
      await db.item.update({
        where: { id: detail.id },
        data: { relatedIds: peers.map((p) => p.id).join(',') },
      })

      const dt = ((Date.now() - t0) / 1000).toFixed(1)
      console.log(`  ✓ [${label}] ${type.padEnd(8)} ${(detail.title).slice(0, 60)}  (${dt}s)`)
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

async function runBatch(items: { label: string; type: ItemType }[]): Promise<number> {
  let ok = 0
  // run in concurrency-limited chunks
  for (let i = 0; i < items.length; i += CONCURRENCY) {
    const chunk = items.slice(i, i + CONCURRENCY)
    const results = await Promise.all(
      chunk.map((c) => genOne(c.label, c.type))
    )
    ok += results.reduce((a, b) => a + b, 0)
    // small delay between chunks to be gentle on the API
    if (i + CONCURRENCY < items.length) {
      await new Promise((r) => setTimeout(r, 1500))
    }
  }
  return ok
}

async function main() {
  const plan = planTypes(TOTAL)
  const items = plan.map((type, i) => ({ label: `${i + 1}/${TOTAL}`, type }))

  console.log(`\n🤖 NexusAI Batch Generation`)
  console.log(`   Target: ${TOTAL} items (${plan.filter((t) => t === 'prompt').length} prompts, ${plan.filter((t) => t === 'skill').length} skills, ${plan.filter((t) => t === 'workflow').length} workflows)`)
  console.log(`   Concurrency: ${CONCURRENCY}`)
  console.log(`   Estimated time: ~${Math.ceil(TOTAL / CONCURRENCY * 15)}s\n`)

  const t0 = Date.now()
  const ok = await runBatch(items)
  const dt = ((Date.now() - t0) / 1000).toFixed(1)

  // log the batch
  await db.generationLog.create({
    data: {
      runDate: today,
      promptsCount: plan.filter((t) => t === 'prompt').length,
      skillsCount: plan.filter((t) => t === 'skill').length,
      status: ok > 0 ? 'completed' : 'failed',
      note: `Batch script: ${ok}/${TOTAL} succeeded in ${dt}s`,
    },
  })

  console.log(`\n✅ Batch complete: ${ok}/${TOTAL} items generated in ${dt}s`)

  const finalStats = await db.item.count()
  console.log(`   Library total: ${finalStats} items`)
}

main()
  .catch((e) => {
    console.error('❌ Batch failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })
