// NexusAI 2026 — Chunked Backfill Intros (resilient)
// Processes a small batch of items (default 3) then exits, so it can be run
// repeatedly via cron without hitting sustained rate limits.
//
// Usage: bun run scripts/backfill-chunk.ts [batchSize]
//   batchSize: number of items to process (default 3, max 10)

import { db } from '../src/lib/db'
import ZAI from 'z-ai-web-dev-sdk'
import type { ItemType } from '../src/lib/types'

const BATCH_SIZE = Math.min(Math.max(Number(process.argv[2] || 3), 1), 10)

function typeLabel(t: ItemType): string {
  if (t === 'prompt') return 'prompt'
  if (t === 'skill') return 'skill definition'
  return 'workflow'
}

function buildIntroPrompt(title: string, summary: string, type: ItemType, niche: string, audience: string): string {
  return `You are the NexusAI 2026 Editorial Team. Write a substantive ~200-word SEO introduction for the following ${typeLabel(type)}.

TITLE: ${title}
SUMMARY: ${summary}
NICHE: ${niche}
AUDIENCE: ${audience}

Requirements:
- ~200 words (180-230 words). Substantive, not placeholder.
- Explain WHY this ${typeLabel(type)} matters in 2026 and what specific problem it solves.
- Mention the target audience and use case naturally.
- Include 1-2 references to 2026 trends or tools where relevant.
- Written in professional English, third person.
- No markdown, no headings, just plain prose paragraphs.
- Do NOT start with "This ${typeLabel(type)}..." — vary the opening.`
}

async function backfillOne(item: { id: string; title: string; summary: string; type: string; niche: string; audience: string }): Promise<boolean> {
  const zai = await ZAI.create()
  const completion = await zai.chat.completions.create({
    messages: [
      { role: 'assistant', content: buildIntroPrompt(item.title, item.summary, item.type as ItemType, item.niche, item.audience) },
      { role: 'user', content: `Write the ~200-word SEO intro for "${item.title}".` },
    ],
    thinking: { type: 'disabled' },
  })
  const intro = (completion.choices[0]?.message?.content ?? '').trim()
  if (intro.length < 200) return false
  await db.item.update({ where: { id: item.id }, data: { intro } })
  return true
}

async function main() {
  console.log(`🔧 Chunked backfill (batch size: ${BATCH_SIZE})`)

  const items = await db.item.findMany({
    where: { intro: '' },
    select: { id: true, title: true, summary: true, type: true, niche: true, audience: true },
    take: BATCH_SIZE,
  })

  if (items.length === 0) {
    console.log('   ✅ All items have intros. Nothing to do.')
    return
  }

  console.log(`   Processing ${items.length} items...\n`)

  let ok = 0
  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    const t0 = Date.now()
    try {
      const success = await backfillOne(item)
      if (success) {
        ok++
        const dt = ((Date.now() - t0) / 1000).toFixed(1)
        console.log(`  ✓ [${i + 1}/${items.length}] ${item.type.padEnd(8)} ${item.title.slice(0, 55)}  (${dt}s)`)
      } else {
        console.log(`  ✗ [${i + 1}/${items.length}] too short: ${item.title.slice(0, 55)}`)
      }
    } catch (e: any) {
      const msg = e?.message || 'error'
      if (msg.includes('429')) {
        console.log(`  ⏳ [${i + 1}/${items.length}] rate-limited, waiting 12s...`)
        await new Promise((r) => setTimeout(r, 12000))
        try {
          const success = await backfillOne(item)
          if (success) {
            ok++
            console.log(`  ✓ [${i + 1}/${items.length}] retry succeeded`)
          }
        } catch {
          console.log(`  ✗ [${i + 1}/${items.length}] retry failed`)
        }
      } else {
        console.log(`  ✗ [${i + 1}/${items.length}] ${msg.slice(0, 70)}`)
      }
    }
    if (i + 1 < items.length) await new Promise((r) => setTimeout(r, 3000))
  }

  const remaining = await db.item.count({ where: { intro: '' } })
  console.log(`\n✅ Chunk complete: ${ok}/${items.length} intros generated. ${remaining} items still need intros.`)
}

main()
  .catch((e) => {
    console.error('❌ Chunk failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })
