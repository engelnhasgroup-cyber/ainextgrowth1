// NexusAI 2026 — Autonomous AI Agent (Trinity Bundle Generator)
// Uses z-ai-web-dev-sdk (LLM) to generate fresh prompts/skills with the
// Trinity Bundle format, then persists them to the database.
//
// POST /api/generate
// Body: { category?: string, type?: 'prompt'|'skill', topic?: string, count?: number(1-3) }
// Returns: { items: ItemDetail[] }

import { NextRequest, NextResponse } from 'next/server'
import ZAI from 'z-ai-web-dev-sdk'
import { db } from '@/lib/db'
import { toDetail } from '@/lib/queries'
import type { ItemType } from '@/lib/types'

interface GenInput {
  category?: string
  type?: ItemType
  topic?: string
  count?: number
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 70)
}

function uniqueSlug(base: string): string {
  const suffix = Math.random().toString(36).slice(2, 7)
  return `${base}-${suffix}`
}

const CATEGORY_SLUGS = [
  'seo-content-marketing',
  'software-engineering',
  'data-analytics',
  'business-strategy',
  'design-creative',
  'sales-growth',
  'education-research',
  'automation-agents',
]

const TRENDING_TOPICS_2026 = [
  'GPT-5 agentic reasoning pipelines',
  'Google SGE / Search Generative Experience optimization',
  'LangGraph 2.0 multi-agent orchestration',
  'Retrieval-augmented generation (RAG) with vector databases',
  'AI-generated video pipelines (Sora 2, Veo 3)',
  'Synthetic data generation for fine-tuning',
  'Autonomous SDR agents for outbound sales',
  'Real-time voice AI for customer support',
  'Computer-vision quality control in manufacturing',
  'AI compliance with EU AI Act 2026',
  'Personalized learning tutors with adaptive curriculum',
  'Generative UI with React Server Components',
  'Edge inference with quantized small language models',
  'AI-powered financial forecasting and anomaly detection',
  'Neuro-prompting with tree-of-thoughts for complex reasoning',
]

function buildSystemPrompt(category: string, type: ItemType, topic: string) {
  return `You are the NexusAI 2026 Autonomous Content Agent — an expert multi-agent orchestrator producing a single ${type} for the world's largest AI Prompt & Skill Library.

You output STRICT, VALID JSON only (no markdown fences, no commentary). The JSON must conform to this TypeScript interface:

{
  "title": string,                 // compelling, SEO-optimized, may reference 2026/tech
  "summary": string,               // 120-180 char hook
  "category": "${category}",       // must be exactly this slug
  "niche": string,                 // specific sub-field
  "audience": string,              // who it is for
  "difficulty": "Beginner"|"Intermediate"|"Advanced"|"Expert",
  "language": "English",
  "promptContent": string,         // FILE 1 (Markdown): the full master prompt or skill definition. Use modern 2026 techniques (role, system instructions, constraints, [BRACKET] variables, output format). 150-350 words.
  "workflowContent": string,       // FILE 2 (Markdown): ## Prerequisites, ## Step-by-Step Execution, ## Required Tools, ## Expected Output, ## Success Metrics
  "audienceContent": string,       // FILE 3 (Markdown): ## Who This Is For, ## Real-World Use Cases (3 numbered), ## Industries & Niches
  "tags": string[],                // 4-6 tags
  "requiredTools": string[],       // 2-4 tools (e.g. GPT-5, Claude 4 Opus, LangGraph 2.0)
  "useCases": string[],            // 3 short scenarios
  "trending": boolean,
  "trendingScore": number,         // 60-98
  "faqQuestion": string,           // AEO question this answers
  "faqAnswer": string,             // concise 1-3 sentence answer
  "citation": string,              // GEO-style stat/citation sentence
  "seoKeywords": string[]          // 5-8 keywords
}

Topic for this generation: ${topic}

Rules:
- All content in English, professional, 2026-era.
- The promptContent must be a REAL usable ${type}, not a placeholder.
- trending should be true ~60% of the time.
- Output ONLY the JSON object.`;
}

async function generateOne(category: string, type: ItemType, topic: string): Promise<any> {
  const zai = await ZAI.create()
  const completion = await zai.chat.completions.create({
    messages: [
      { role: 'assistant', content: buildSystemPrompt(category, type, topic) },
      { role: 'user', content: `Generate one high-quality ${type} about: "${topic}" for category "${category}". Return JSON only.` },
    ],
    thinking: { type: 'disabled' },
  })
  const raw = completion.choices[0]?.message?.content ?? ''
  // strip code fences if present
  const cleaned = raw.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```\s*$/i, '').trim()
  const json = JSON.parse(cleaned)
  return json
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json().catch(() => ({}))) as GenInput
    const category = body.category && CATEGORY_SLUGS.includes(body.category)
      ? body.category
      : CATEGORY_SLUGS[Math.floor(Math.random() * CATEGORY_SLUGS.length)]
    const type: ItemType = body.type === 'skill' ? 'skill' : body.type === 'prompt' ? 'prompt' : (Math.random() > 0.5 ? 'prompt' : 'skill')
    const topic = body.topic?.trim() || TRENDING_TOPICS_2026[Math.floor(Math.random() * TRENDING_TOPICS_2026.length)]
    const count = Math.min(Math.max(body.count ?? 1, 1), 3)

    const created: any[] = []
    const today = new Date().toISOString().slice(0, 10)

    for (let i = 0; i < count; i++) {
      try {
        const gen = await generateOne(category, type, topic)
        const slug = uniqueSlug(slugify(gen.title || `${category}-${type}-${Date.now()}`))
        const row = await db.item.create({
          data: {
            slug,
            type,
            title: String(gen.title || 'Untitled').slice(0, 200),
            summary: String(gen.summary || '').slice(0, 400),
            category,
            niche: String(gen.niche || '').slice(0, 200),
            audience: String(gen.audience || '').slice(0, 200),
            difficulty: String(gen.difficulty || 'Intermediate').slice(0, 30),
            language: 'English',
            promptContent: String(gen.promptContent || ''),
            workflowContent: String(gen.workflowContent || ''),
            audienceContent: String(gen.audienceContent || ''),
            tags: Array.isArray(gen.tags) ? gen.tags.join(', ') : '',
            requiredTools: Array.isArray(gen.requiredTools) ? gen.requiredTools.join(', ') : '',
            useCases: Array.isArray(gen.useCases) ? gen.useCases.join(' | ') : '',
            trending: !!gen.trending,
            trendingScore: Number(gen.trendingScore ?? 70),
            featured: false,
            viewCount: Math.floor(Math.random() * 2000) + 100,
            downloadCount: Math.floor(Math.random() * 400) + 20,
            rating: 4.4 + Math.random() * 0.5,
            faqQuestion: String(gen.faqQuestion || ''),
            faqAnswer: String(gen.faqAnswer || ''),
            citation: String(gen.citation || ''),
            seoKeywords: Array.isArray(gen.seoKeywords) ? gen.seoKeywords.join(', ') : '',
            relatedIds: '',
            source: 'agent',
            runDate: today,
          },
        })
        created.push(toDetail(row))
      } catch (e) {
        // skip a failed generation but continue
        console.error('generate-one failed:', e)
      }
    }

    // recompute internal links for the newly created items (link to same category)
    for (const item of created) {
      const peers = await db.item.findMany({
        where: { category: item.category, NOT: { id: item.id } },
        orderBy: { trendingScore: 'desc' },
        take: 4,
        select: { id: true },
      })
      await db.item.update({
        where: { id: item.id },
        data: { relatedIds: peers.map((p) => p.id).join(',') },
      })
    }

    // update generation log
    const prompts = created.filter((c) => c.type === 'prompt').length
    const skills = created.filter((c) => c.type === 'skill').length
    await db.generationLog.create({
      data: {
        runDate: today,
        promptsCount: prompts,
        skillsCount: skills,
        status: created.length > 0 ? 'completed' : 'failed',
        note: `Agent-generated batch (${created.length} item(s)) for ${category} / ${topic.slice(0, 60)}`,
      },
    })

    return NextResponse.json({ items: created, count: created.length, category, type, topic })
  } catch (e: any) {
    console.error('generate error:', e)
    return NextResponse.json({ error: e?.message || 'Generation failed' }, { status: 500 })
  }
}

export async function GET() {
  // Lightweight status / recent generations
  const today = new Date().toISOString().slice(0, 10)
  const [todayItems, recentLogs] = await Promise.all([
    db.item.count({ where: { runDate: today, source: 'agent' } }),
    db.generationLog.findMany({ orderBy: { createdAt: 'desc' }, take: 10 }),
  ])
  return NextResponse.json({
    todayGeneratedByAgent: todayItems,
    recentRuns: recentLogs,
    trendingTopics: TRENDING_TOPICS_2026,
  })
}
