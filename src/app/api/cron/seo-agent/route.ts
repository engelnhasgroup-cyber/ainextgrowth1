// SEO/AEO/GEO Autonomous Agent — Cron Endpoint
// Analyzes content gaps, optimizes FAQs for AEO, and suggests GEO citations.
// Triggered via cron job (weekly recommended).
//
// Security: requires Bearer token (CRON_SECRET env var) or dev mode.

import { NextRequest, NextResponse } from 'next/server'
import ZAI from 'z-ai-web-dev-sdk'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

const TRENDING_KEYWORDS_2026 = [
  'AI agents 2026',
  'neuro-prompting',
  'quantum AI skills',
  'agentic workflows',
  'GPT-5 prompts',
  'Claude 4 Opus',
  'LangGraph 2.0',
  'RAG pipelines',
  'multimodal AI',
  'AI compliance EU AI Act',
  'synthetic data generation',
  'edge inference',
  'autonomous SDR agents',
  'voice AI support',
  'computer vision QC',
  'generative UI',
  'programmatic SEO',
  'AI financial forecasting',
  'adaptive learning tutors',
  'AI content personalization',
]

export async function GET(req: NextRequest) {
  // Auth check (skip in dev for testing)
  const authHeader = req.headers.get('authorization')
  const isDev = process.env.NODE_ENV === 'development'
  if (!isDev && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  try {
    const zai = await ZAI.create()

    // Fetch current items to identify gaps
    const existingItems = await db.item.findMany({
      select: { title: true, niche: true, tags: true, faqQuestion: true, faqAnswer: true },
      take: 50,
      orderBy: { createdAt: 'desc' },
    })

    const existingTitles = existingItems.map((i) => i.title).join('\n')
    const existingFaqs = existingItems
      .filter((i) => i.faqQuestion)
      .slice(0, 10)
      .map((i) => `${i.faqQuestion}: ${i.faqAnswer}`)
      .join('\n')

    // Generate SEO/AEO/GEO plan
    const completion = await zai.chat.completions.create({
      messages: [
        {
          role: 'assistant',
          content: `You are the NexusAI 2026 Master SEO/AEO/GEO Agent. Analyze the current content library and generate an optimization plan.

Current trending keywords: ${TRENDING_KEYWORDS_2026.join(', ')}

Existing items (last 50):
${existingTitles}

Existing FAQs:
${existingFaqs}

Generate a JSON plan with:
1. "contentGaps": 5 trending prompt/skill ideas we are missing (titles only).
2. "faqOptimizations": 3 existing FAQs rewritten to be perfectly extractable by Google SGE (concise 40-word answers, AEO-optimized).
3. "geoCitations": 3 statistical citations to add for GEO (with source + year).
4. "keywordOpportunities": 5 long-tail keywords to target.

Output STRICT JSON only, no markdown fences.`,
        },
        {
          role: 'user',
          content: 'Generate the SEO/AEO/GEO optimization plan for this week.',
        },
      ],
      thinking: { type: 'disabled' },
    })

    const raw = completion.choices[0]?.message?.content ?? ''
    const cleaned = raw.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```\s*$/i, '').trim()
    const plan = JSON.parse(cleaned)

    // Log the SEO agent run
    await db.generationLog.create({
      data: {
        runDate: new Date().toISOString().slice(0, 10),
        promptsCount: 0,
        skillsCount: 0,
        status: 'completed',
        note: `SEO/AEO/GEO agent run: ${plan.contentGaps?.length || 0} gaps, ${plan.faqOptimizations?.length || 0} FAQ optimizations, ${plan.geoCitations?.length || 0} citations`,
      },
    })

    return NextResponse.json({
      success: true,
      plan,
      timestamp: new Date().toISOString(),
      nextRun: 'Scheduled weekly',
    })
  } catch (e: any) {
    console.error('SEO agent error:', e)
    return NextResponse.json(
      { success: false, error: e?.message || 'SEO agent failed' },
      { status: 500 }
    )
  }
}
