// NexusAI 2026 — Humanized Article Generation Script
// Generates SEO-optimized, human-written-style articles using LLM.
//
// Usage: bun run scripts/generate-articles.ts [count] [concurrency]
//   count: number of articles (default 5, max 30 per run)
//   concurrency: parallel requests (default 1, max 3)

import { db } from '../src/lib/db'
import ZAI from 'z-ai-web-dev-sdk'

const COUNT = Math.min(Number(process.argv[2] || 5), 30)
const CONCURRENCY = Math.min(Number(process.argv[3] || 1), 3)

// 30 highly-searched SEO topics for 2026
const TOPICS = [
  { title: 'How to Use AI Agents for SEO in 2026: A Complete Guide', category: 'SEO', keywords: 'ai agents seo,seo automation 2026,ai search optimization' },
  { title: 'Best Prompt Engineering Techniques for GPT-5', category: 'AI', keywords: 'prompt engineering,gpt-5 prompts,ai prompting techniques' },
  { title: 'Automating Business Workflows with LangGraph 2.0', category: 'Automation', keywords: 'langgraph,workflow automation,ai business automation' },
  { title: 'The Complete Guide to RAG Pipelines in 2026', category: 'AI', keywords: 'rag pipelines,retrieval augmented generation,ai knowledge base' },
  { title: 'How to Win Google SGE with AEO Optimization', category: 'SEO', keywords: 'aeo,answer engine optimization,google sge,ai search' },
  { title: 'Building Autonomous AI Agents with CrewAI', category: 'AI', keywords: 'crewai,autonomous agents,multi-agent systems' },
  { title: 'Neuro-Prompting: The Next Evolution in AI Communication', category: 'AI', keywords: 'neuro-prompting,advanced prompt engineering,ai communication' },
  { title: 'AI Content Marketing Strategy for SaaS Companies in 2026', category: 'Marketing', keywords: 'ai content marketing,saas marketing,content automation' },
  { title: 'How to Optimize for Google AI Overview (SGE) in 2026', category: 'SEO', keywords: 'google ai overview,sge optimization,search generative experience' },
  { title: 'The Future of Programmatic SEO with AI', category: 'SEO', keywords: 'programmatic seo,ai seo,pseo automation' },
  { title: 'Building a RAG Pipeline with pgvector and Next.js', category: 'Development', keywords: 'rag pipeline,pgvector,next.js ai,vector database' },
  { title: 'How AI Agents Are Transforming Customer Support', category: 'AI', keywords: 'ai customer support,autonomous agents,ai support automation' },
  { title: 'GPT-5 vs Claude 4: Which AI Model Wins for Coding?', category: 'AI', keywords: 'gpt-5 vs claude 4,ai coding,ai model comparison' },
  { title: 'The Ultimate Guide to AI-Generated Video in 2026', category: 'AI', keywords: 'ai video generation,sora 2,veo 3,ai content creation' },
  { title: 'How to Build an AI-Powered Content Factory', category: 'Marketing', keywords: 'ai content factory,content automation,scale content production' },
  { title: 'EU AI Act 2026: Compliance Guide for AI Companies', category: 'Business', keywords: 'eu ai act,ai compliance,ai regulation 2026' },
  { title: 'Edge Inference: Running AI Models on the Browser', category: 'Development', keywords: 'edge inference,browser ai,onnx models,ai optimization' },
  { title: 'How to Use AI for Competitor Analysis in 2026', category: 'Business', keywords: 'ai competitor analysis,competitive intelligence,ai market research' },
  { title: 'The Best AI Tools for Developers in 2026', category: 'Development', keywords: 'ai developer tools,coding ai,ai ide,ai development' },
  { title: 'Synthetic Data Generation for Machine Learning', category: 'AI', keywords: 'synthetic data,ai training data,data generation' },
  { title: 'How to Build a Personal AI Assistant in 2026', category: 'AI', keywords: 'personal ai assistant,ai automation,custom ai' },
  { title: 'AI-Powered Financial Forecasting: A Practical Guide', category: 'Business', keywords: 'ai financial forecasting,predictive analytics,ai finance' },
  { title: 'Multimodal AI: Combining Text, Image, and Voice', category: 'AI', keywords: 'multimodal ai,ai vision,ai voice,multimodal models' },
  { title: 'How to Monetize AI Prompts and Skills in 2026', category: 'Business', keywords: 'monetize ai prompts,sell ai content,ai business model' },
  { title: 'Voice AI: Building Real-Time Voice Assistants', category: 'AI', keywords: 'voice ai,speech to text,voice assistant,real-time ai' },
  { title: 'AI for Education: Adaptive Learning in 2026', category: 'Education', keywords: 'ai education,adaptive learning,ai tutoring,personalized learning' },
  { title: 'Computer Vision for Quality Control in Manufacturing', category: 'AI', keywords: 'computer vision,quality control,ai manufacturing,vision inspection' },
  { title: 'Generative UI: The Future of Web Interfaces', category: 'Development', keywords: 'generative ui,ai interfaces,react server components,ai web design' },
  { title: 'How to Build an AI SDR (Sales Development Representative)', category: 'Sales', keywords: 'ai sdr,sales automation,ai outbound,ai sales agent' },
  { title: 'AI Compliance Checklist for 2026 Startups', category: 'Business', keywords: 'ai compliance,ai startup,ai regulation,ai governance' },
]

function slugify(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-').replace(/-+/g, '-').slice(0, 80)
}

function uniqueSlug(base: string): string {
  return `${base}-${Math.random().toString(36).slice(2, 6)}`
}

function buildHumanizedPrompt(topic: { title: string; category: string; keywords: string }): string {
  return `You are a senior content writer at NexusAI 2026, the world's largest AI Prompt & Skill Library. You write with the expertise of someone who has spent 10,000+ hours working with AI models, prompts, and automation workflows.

Write a comprehensive, human-like article about: "${topic.title}"

CRITICAL WRITING RULES (MUST FOLLOW):
1. HUMAN TONE: Write in a conversational, authoritative tone. Use first-person plural ("we", "our", "us"). Write as if explaining to a colleague over coffee. Be warm but professional.
2. NO AI TELLS: NEVER use these phrases: "In conclusion", "As an AI language model", "It's important to note", "In today's rapidly evolving", "In the world of", "Let's dive in", "Let's explore". 
3. FORMATTING: Use Markdown with:
   - ## H2 headings for main sections (3-5 sections)
   - ### H3 headings for sub-sections
   - **Bold** for key concepts and important terms
   - - Bullet points for lists
   - > Blockquotes for important callouts
4. STRUCTURE:
   - Catchy intro: Hook the reader with a surprising fact or relatable problem, then state what they'll learn (not "In this article we will...")
   - ## Table of Contents (just list the H2 headings as links)
   - 3-5 deep-dive sections with real, actionable advice
   - Practical examples mentioning "NexusAI's Trinity Bundles" as a solution (naturally, not forced)
   - ## FAQ section with 3 questions and concise answers
   - A strong closing that encourages action (not "In conclusion")
5. LENGTH: 1500-2000 words. Be specific. Use real numbers, tool names, and examples.
6. E-E-A-T: Show expertise. Mention specific tools (GPT-5, Claude 4 Opus, LangGraph 2.0, Cursor). Reference real data points.
7. KEYWORDS: Naturally integrate: ${topic.keywords}

Output the article as a JSON object with this structure:
{
  "title": "${topic.title}",
  "metaDescription": "A compelling 150-character meta description",
  "content": "The full article in Markdown (1500-2000 words)",
  "faqs": [{"question": "...", "answer": "..."}, ...],
  "tableOfContents": [{"id": "slug-of-heading", "text": "Heading Text", "level": 2}, ...],
  "readingTime": 8
}

Output ONLY the JSON object. No markdown fences, no commentary.`
}

function parseTOC(content: string): { id: string; text: string; level: number }[] {
  const lines = content.split('\n')
  const toc: { id: string; text: string; level: number }[] = []
  let inFence = false
  for (const line of lines) {
    if (line.trim().startsWith('```')) { inFence = !inFence; continue }
    if (inFence) continue
    const m = line.match(/^(#{2,3})\s+(.*)/)
    if (m) {
      const text = m[2].replace(/[*_`~]/g, '').trim()
      const id = text.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-')
      toc.push({ id, text, level: m[1].length })
    }
  }
  return toc
}

async function generateOne(topic: { title: string; category: string; keywords: string }, index: number): Promise<number> {
  const t0 = Date.now()
  try {
    const zai = await ZAI.create()
    const completion = await zai.chat.completions.create({
      messages: [
        { role: 'assistant', content: buildHumanizedPrompt(topic) },
        { role: 'user', content: `Write the article: "${topic.title}"` },
      ],
      thinking: { type: 'disabled' },
    })
    const raw = completion.choices[0]?.message?.content ?? ''
    const cleaned = raw.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```\s*$/i, '').trim()
    const article = JSON.parse(cleaned)

    const slug = uniqueSlug(slugify(article.title || topic.title))
    const toc = article.tableOfContents?.length > 0 ? article.tableOfContents : parseTOC(article.content || '')
    const wordCount = (article.content || '').split(/\s+/).length
    const readingTime = article.readingTime || Math.max(3, Math.ceil(wordCount / 200))

    await db.article.create({
      data: {
        slug,
        title: String(article.title || topic.title).slice(0, 200),
        metaDescription: String(article.metaDescription || '').slice(0, 160),
        keywords: topic.keywords,
        category: topic.category,
        content: String(article.content || ''),
        tableOfContents: JSON.stringify(toc),
        author: 'NexusAI Editorial Team',
        readingTime,
        faqs: JSON.stringify(article.faqs || []),
        featured: index < 3,
        publishedAt: new Date(),
      },
    })

    const dt = ((Date.now() - t0) / 1000).toFixed(1)
    console.log(`  ✓ [${index + 1}] ${topic.category.padEnd(12)} ${article.title?.slice(0, 55) || topic.title.slice(0, 55)}  (${wordCount}w, ${dt}s)`)
    return 1
  } catch (e: any) {
    const msg = e?.message || 'error'
    if (msg.includes('429')) {
      console.log(`  ⏳ [${index + 1}] rate-limited, waiting 10s...`)
      await new Promise((r) => setTimeout(r, 10000))
      try {
        const zai = await ZAI.create()
        const completion = await zai.chat.completions.create({
          messages: [
            { role: 'assistant', content: buildHumanizedPrompt(topic) },
            { role: 'user', content: `Write the article: "${topic.title}"` },
          ],
          thinking: { type: 'disabled' },
        })
        const raw = completion.choices[0]?.message?.content ?? ''
        const cleaned = raw.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```\s*$/i, '').trim()
        const article = JSON.parse(cleaned)
        const slug = uniqueSlug(slugify(article.title || topic.title))
        const toc = parseTOC(article.content || '')
        const wordCount = (article.content || '').split(/\s+/).length
        await db.article.create({
          data: {
            slug, title: String(article.title || topic.title).slice(0, 200),
            metaDescription: String(article.metaDescription || '').slice(0, 160),
            keywords: topic.keywords, category: topic.category,
            content: String(article.content || ''), tableOfContents: JSON.stringify(toc),
            author: 'NexusAI Editorial Team',
            readingTime: Math.max(3, Math.ceil(wordCount / 200)),
            faqs: JSON.stringify(article.faqs || []), featured: index < 3,
            publishedAt: new Date(),
          },
        })
        console.log(`  ✓ [${index + 1}] retry succeeded (${wordCount}w)`)
        return 1
      } catch {
        console.log(`  ✗ [${index + 1}] retry failed`)
        return 0
      }
    }
    console.error(`  ✗ [${index + 1}] ${msg.slice(0, 80)}`)
    return 0
  }
}

async function main() {
  console.log(`\n📝 NexusAI Article Generation`)
  console.log(`   Target: ${COUNT} articles from ${TOPICS.length} topics`)
  console.log(`   Concurrency: ${CONCURRENCY}\n`)

  // Select topics (cycle through if count > topics)
  const selected: { title: string; category: string; keywords: string }[] = []
  for (let i = 0; i < COUNT; i++) {
    selected.push(TOPICS[i % TOPICS.length])
  }

  let ok = 0
  for (let i = 0; i < selected.length; i += CONCURRENCY) {
    const chunk = selected.slice(i, i + CONCURRENCY)
    const results = await Promise.all(chunk.map((t, j) => generateOne(t, i + j)))
    ok += results.reduce((a, b) => a + b, 0)
    if (i + CONCURRENCY < selected.length) await new Promise((r) => setTimeout(r, 5000))
  }

  const total = await db.article.count()
  console.log(`\n✅ Generation complete: ${ok}/${COUNT} articles generated. Total in DB: ${total}`)
}

main().catch((e) => { console.error('❌ Failed:', e); process.exit(1) }).finally(async () => { await db.$disconnect() })
