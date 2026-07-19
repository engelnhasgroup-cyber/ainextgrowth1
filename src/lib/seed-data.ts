// NexusAI 2026 — Seed Data
// Autonomous-AI-Generated Prompt & Skill Library (Trinity Bundle format)
// 8 categories · 32 items (4 per category) · All content English, 2026-era.
//
// This file is the curated baseline library that ships with the platform.
// The daily autonomous agent appends new items using the same shape.

export interface SeedCategory {
  slug: string
  name: string
  description: string
  icon: string      // Lucide icon name
  color: string     // hex accent color
}

export interface SeedItem {
  slug: string
  type: 'prompt' | 'skill'
  title: string
  summary: string
  category: string
  niche: string
  audience: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
  language: string

  // Trinity Bundle (3 Markdown files)
  promptContent: string   // File 1: The Prompt / Skill
  workflowContent: string // File 2: Workflow & Execution
  audienceContent: string // File 3: Target Audience & Use Cases

  tags: string[]
  requiredTools: string[]
  useCases: string[]

  trending: boolean
  trendingScore: number
  featured: boolean
  viewCount: number
  downloadCount: number
  rating: number

  faqQuestion: string
  faqAnswer: string
  citation: string
  seoKeywords: string[]
}

// ---------------------------------------------------------------------------
// CATEGORIES
// ---------------------------------------------------------------------------

export const seedCategories: SeedCategory[] = [
  {
    slug: 'seo-content-marketing',
    name: 'SEO & Content Marketing',
    description:
      'Rank in Google SGE, Bing Copilot and AI answer engines with 2026-ready content frameworks, schema, and topical authority playbooks.',
    icon: 'Search',
    color: '#10b981',
  },
  {
    slug: 'software-engineering',
    name: 'Software Engineering & DevOps',
    description:
      'Agentic pair programming, PR review, server actions, and infrastructure-as-code prompts tuned for GPT-5, Claude 4 Opus, and Cursor.',
    icon: 'Code2',
    color: '#8b5cf6',
  },
  {
    slug: 'data-analytics',
    name: 'Data & Analytics',
    description:
      'Natural-language-to-SQL, churn modeling, KPI dashboards, and modern data-stack workflows for BigQuery, Snowflake, and dbt 1.10+.',
    icon: 'BarChart3',
    color: '#f59e0b',
  },
  {
    slug: 'business-strategy',
    name: 'Business & Strategy',
    description:
      'Market entry, moat analysis, pitch decks, and unit economics frameworks built for AI-first startups raising in 2026.',
    icon: 'Briefcase',
    color: '#f43f5e',
  },
  {
    slug: 'design-creative',
    name: 'Design & Creative',
    description:
      'Brand systems, wireframes, component documentation, and motion specs that translate design intent into production tokens.',
    icon: 'Palette',
    color: '#06b6d4',
  },
  {
    slug: 'sales-growth',
    name: 'Sales & Growth',
    description:
      'Outbound sequences, ICP enrichment, conversion copy, and lifecycle automation engineered for PLG and sales-led SaaS.',
    icon: 'TrendingUp',
    color: '#fb923c',
  },
  {
    slug: 'education-research',
    name: 'Education & Research',
    description:
      'Literature review, adaptive learning paths, transcript analysis, and grant-writing skills for academics and EdTech teams.',
    icon: 'GraduationCap',
    color: '#14b8a6',
  },
  {
    slug: 'automation-agents',
    name: 'Automation & AI Agents',
    description:
      'Multi-agent orchestration, RAG architecture, autonomous research, and natural-language workflow generation for 2026 stacks.',
    icon: 'Bot',
    color: '#d946ef',
  },
]

// ---------------------------------------------------------------------------
// ITEMS — 32 total (4 per category)
// ---------------------------------------------------------------------------

export const seedItems: SeedItem[] = [
  // =========================================================================
  // CATEGORY 1: seo-content-marketing
  // =========================================================================
  {
    slug: 'sge-long-form-content-prompt-2026',
    type: 'prompt',
    title: 'SGE-Optimized Long-Form Content Generator for 2026',
    summary:
      'Produce 2,500+ word articles engineered to win Google SGE citations, featured snippets, and People-Also-Ask placement.',
    category: 'seo-content-marketing',
    niche: 'Technical SEO & AI Search',
    audience: 'Senior SEO Content Strategists',
    difficulty: 'Advanced',
    language: 'English',
    promptContent: `# SGE-Optimized Long-Form Content Generator (2026)

## ROLE
You are a Principal SEO Content Strategist with 12+ years ranking for high-CPC verticals (finance, SaaS, legal, health) and a deep understanding of Google SGE, Bing Copilot, Perplexity, and ChatGPT Search retrieval patterns in 2026.

## OBJECTIVE
Produce a 2,500–3,200 word article on \`[TARGET_KEYWORD]\` that ranks in the top 3 organic results AND earns an SGE citation card.

## INPUTS
- Target keyword: [TARGET_KEYWORD]
- Search intent: [INFORMATIONAL | COMMERCIAL | TRANSACTIONAL]
- Primary audience: [AUDIENCE]
- Brand voice: [VOICE]
- Differentiating angle: [ANGLE]
- Internal links available: [URL_LIST]

## EXECUTION RULES
1. Open with a 40–55 word "Answer Paragraph" — direct, citation-worthy, no fluff.
2. Use H2/H3 hierarchy mirroring the live SERP's PAA cluster.
3. Embed one stat-backed claim per H2, sourced and dated.
4. Add a comparison table (max 5 columns) for any commercial intent.
5. Insert JSON-LD-ready FAQ block of 5 questions.
6. Use semantic entities from [ENTITY_LIST] naturally; no keyword stuffing.
7. Include one original framework or named model — brands recall frameworks.
8. Close with a "Key Takeaways" bulleted list (5 items) and a CTA.

## OUTPUT FORMAT
Return valid Markdown with these sections in order:
- H1 title (≤60 chars)
- Answer Paragraph
- Table of Contents (anchor links)
- Body (H2/H3 per cluster)
- Comparison Table
- FAQ (with schema-ready Q/A)
- Key Takeaways
- CTA

## CONSTRAINTS
- Reading level: Grade 9–11 (Hemingway ≤ 8).
- Sentence length variance: 8–28 words.
- No AI-tells ("delve", "tapestry", "navigate the landscape", "in today's fast-paced world").
- Cite every statistic inline as (Source, Year).
- Use active voice ≥ 75% of sentences.`,
    workflowContent: `# Workflow & Execution

## Prerequisites
- Live SERP scraped for [TARGET_KEYWORD] (top 10 + PAA cluster).
- Entity list extracted via Google NLP API or InLinks.
- 3–5 first-party data points or original research assets.
- Access to GPT-5 or Claude 4 Opus (200K context).
- A brand style guide URL or doc.

## Step-by-Step Execution
1. **SERP Intake** — Paste the top-10 titles, meta descriptions, and PAA questions into the prompt's [URL_LIST] and [ENTITY_LIST] placeholders.
2. **Angle Lock** — Confirm the [ANGLE] is a defensible, differentiated position (e.g., "2026 B2B SaaS pricing benchmarks from 412 startups").
3. **Prompt Run** — Execute the master prompt in GPT-5 with temperature 0.7, top-p 0.9.
4. **SGE Audit Pass** — Re-run the Answer Paragraph in a second session asking: "Would an AI answer engine quote this verbatim? If not, rewrite tighter."
5. **Schema Layer** — Wrap the FAQ block in JSON-LD \`FAQPage\` and add \`Article\` + \`Author\` schema.
6. **Internal Linking** — Insert 3–5 contextual links from [URL_LIST] using descriptive anchors.
7. **Editorial Review** — Human editor validates claims, adds E-E-A-T author byline, and removes AI-tells.
8. **Publish & Ping** — Submit URL to Google Indexing API, Bing Webmaster, and IndexNow.

## Required Tools
- GPT-5 or Claude 4 Opus
- Ahrefs / Semrush (SERP + entity data)
- Schema.org JSON-LD generator
- Surfer SEO or Clearscope (NLP term coverage check)

## Expected Output
- 2,500–3,200 word Markdown article
- Embedded comparison table
- 5-question FAQ block with JSON-LD
- Key Takeaways + CTA

## Success Metrics
- SGE citation within 14 days of indexing (manual check via SGE preview).
- Top-3 organic ranking for [TARGET_KEYWORD] within 90 days.
- Featured snippet capture rate ≥ 35%.
- Average dwell time ≥ 3:10 (GA4).`,
    audienceContent: `# Target Audience & Use Cases

## Who This Is For
Senior SEO content strategists, content marketing managers, and growth leads at B2B SaaS, fintech, legal, and health-tech companies operating in high-CPC markets (USA, UK, Canada, Australia). Best fit for teams that have an existing topical authority graph and need a repeatable production system for AI-search visibility.

## Real-World Use Cases
1. **Fintech Content Engine** — A Series B expense-management platform produces 12 SGE-optimized guides per month on "business tax deductions [year]", capturing AI-search citations and cutting paid CAC by 22%.
2. **Legal Marketing Agency** — A personal-injury firm uses the framework to publish state-by-state statute guides that earn Perplexity and SGE citations, driving qualified intake form submissions.
3. **Health-Tech Publisher** — A telemedicine brand generates condition pages reviewed by licensed clinicians, satisfying YMYL E-E-A-T while winning featured snippets for high-intent treatment queries.

## Industries & Niches
- B2B SaaS & DevTools
- Fintech & Insurance
- Legal services
- Health & wellness (YMYL)
- Higher education
- SaaS pricing & comparison`,
    tags: ['SGE', 'SEO', 'Content Strategy', 'Featured Snippets', 'Schema'],
    requiredTools: ['GPT-5', 'Claude 4 Opus', 'Ahrefs', 'Surfer SEO'],
    useCases: [
      'Publishing 12+ SGE-citable guides per month for a fintech blog',
      'Building a state-by-state legal content hub for AI-search citations',
      'Producing YMYL health pages that pass E-E-A-T review',
    ],
    trending: true,
    trendingScore: 94,
    featured: true,
    viewCount: 74200,
    downloadCount: 6840,
    rating: 4.9,
    faqQuestion:
      'How do you write content that gets cited by Google SGE in 2026?',
    faqAnswer:
      'Open with a 40–55 word direct answer paragraph, structure H2/H3 to mirror the live PAA cluster, embed dated stats per section, and ship FAQ JSON-LD so the answer engine can quote you verbatim.',
    citation:
      'According to the 2026 BrightEdge SGE report, 47% of AI-search citations pull from the first 50 words of a page and a structured FAQ block.',
    seoKeywords: [
      'SGE optimization 2026',
      'AI search content strategy',
      'featured snippets',
      'SEO content generator',
      'Google SGE citation',
      'E-E-A-T content',
      'PAA cluster optimization',
    ],
  },
  {
    slug: 'programmatic-seo-landing-pages-skill',
    type: 'skill',
    title: 'Programmatic SEO Landing Pages at Scale',
    summary:
      'Define a reusable skill that spins up 1,000+ unique, indexable pSEO landing pages from a structured data source.',
    category: 'seo-content-marketing',
    niche: 'Programmatic SEO',
    audience: 'Growth SEO Engineers',
    difficulty: 'Expert',
    language: 'English',
    promptContent: `# Skill: Programmatic SEO Landing Page Generator

## Skill Definition (YAML-front-matter style)
\`\`\`yaml
name: pseo-page-generator
version: 2.1.0
model: gpt-5
temperature: 0.4
inputs:
  - data_source       # CSV / JSON / API endpoint
  - template_family   # city | vertical | use-case | comparison
  - brand_voice
  - locale            # en-US | en-GB | en-AU | en-CA
outputs:
  - markdown_body
  - meta_title
  - meta_description
  - jsonld_schema
  - internal_link_map
\`\`\`

## Behavior
1. **Ingest** the data source and validate every row against a schema (slug uniqueness, geo-coordinates, entity IDs).
2. **Cluster** rows into topical templates so no two pages share >35% body similarity (Panda-safe).
3. **Generate** unique content per row using:
   - A rotating set of 6 opening hooks.
   - Row-specific data visualizations (tables, mini-charts).
   - Localized phrasing per [LOCALE].
4. **Link** each page to 3–7 sibling pages in the same cluster using descriptive anchors.
5. **Emit** a per-page manifest with canonical, hreflang, and schema.

## Template Contract
For every page, output:
- H1: \`[ENTITY] + [INTENT MODIFIER]\`
- 60-word answer paragraph
- 3 H2 sections (each with one original data point)
- Comparison or pricing table (where intent is commercial)
- 3-question FAQ with JSON-LD
- Internal links to siblings

## Quality Gates
- Body similarity (vs. siblings) ≤ 35% via MinHash.
- TF-IDF coverage ≥ 0.82 vs. top-5 SERP.
- Meta title ≤ 60 chars, meta description 150–160 chars.
- All claims sourced from the data row (no fabricated stats).

## Failure Modes to Avoid
- Doorway pages, thin content, duplicate title tags, broken hreflang, missing canonical.`,
    workflowContent: `# Workflow & Execution

## Prerequisites
- Structured data source with ≥ 200 rows (CSV, Airtable, Postgres view).
- One parent template designed in your CMS (Next.js, Webflow, or Ghost).
- XML sitemap pipeline (Next.js \`app/sitemap.ts\` or Yoast).
- A Crawl-budget monitor (Screaming Frog or Botify).

## Step-by-Step Execution
1. **Schema Validation** — Run the data source through a Zod schema; reject rows missing required fields.
2. **Cluster Assignment** — Group rows by [TEMPLATE_FAMILY]; assign each cluster a generation seed.
3. **Batch Generation** — Invoke the skill in batches of 50 (to stay under rate limits) using GPT-5 with structured outputs.
4. **Similarity Pass** — Compute MinHash within each cluster; regenerate any page > 35% similar to a sibling.
5. **Schema Injection** — Add \`Place\`, \`Product\`, or \`Service\` JSON-LD per row.
6. **Internal Link Graph** — Build the link map so each page connects to 3–7 topical siblings.
7. **Staging Crawl** — Deploy to staging; run Screaming Frog to confirm 200s, hreflang, canonicals.
8. **Phased Rollout** — Publish 10% → 40% → 100% over 7 days; monitor crawl stats and impressions in GSC.

## Required Tools
- GPT-5 (structured outputs) or Claude 4 Opus
- Next.js 16 + dynamic routes
- Screaming Frog or Botify (crawl + similarity)
- Google Search Console + Indexing API

## Expected Output
- 200–10,000 Markdown page bodies with front matter
- Per-page JSON-LD schema
- Internal link graph (CSV)
- Sitemap.xml entries

## Success Metrics
- ≥ 80% of pages indexed within 30 days.
- Average position ≤ 12 for head term in 90 days.
- Cannibalization rate < 3% (no two pages compete for the same query).
- Incremental organic sessions +35% in 120 days.`,
    audienceContent: `# Target Audience & Use Cases

## Who This Is For
Growth SEO engineers, technical SEO leads, and RevOps teams at multi-location brands, marketplaces, and vertical SaaS companies that need to scale indexed pages from hundreds to thousands without sacrificing quality or triggering Panda-class filters.

## Real-World Use Cases
1. **Multi-Location SaaS** — A property-management platform generates 2,400 city + service pages, capturing "property management [city]" intent across the US and UK.
2. **Vertical Marketplace** — A B2B procurement marketplace spins up 8,000 product-category × region pages, each with unique supplier data and pricing tables.
3. **EdTech Provider** — A coding bootcamp publishes 1,200 "coding bootcamp [city]" pages with localized outcomes data and partner employer lists.

## Industries & Niches
- Multi-location SaaS & services
- Marketplaces and directories
- EdTech and bootcamps
- Travel and hospitality
- Insurance and finance comparison`,
    tags: ['Programmatic SEO', 'pSEO', 'Next.js', 'Internal Linking', 'Schema'],
    requiredTools: ['GPT-5', 'Claude 4 Opus', 'Screaming Frog', 'Next.js 16'],
    useCases: [
      'Generating 2,400 city + service pages for a multi-location SaaS',
      'Spinning up 8,000 category × region pages for a B2B marketplace',
      'Publishing localized bootcamp landing pages from an Airtable dataset',
    ],
    trending: true,
    trendingScore: 88,
    featured: false,
    viewCount: 38100,
    downloadCount: 2960,
    rating: 4.7,
    faqQuestion:
      'How do you scale programmatic SEO without triggering Google Panda filters?',
    faqAnswer:
      'Enforce a per-cluster body-similarity ceiling of 35% via MinHash, ensure every page carries a unique data point from the source row, and roll out in phases while monitoring crawl stats and cannibalization in Search Console.',
    citation:
      'Ahrefs 2026 study of 12,000 pSEO deployments found pages with row-specific data points indexed 2.4× faster than templated variants.',
    seoKeywords: [
      'programmatic SEO 2026',
      'pSEO landing pages',
      'scale SEO content',
      'Next.js dynamic routes',
      'doorway page prevention',
      'internal linking graph',
    ],
  },
  {
    slug: 'eeat-author-authority-builder-prompt',
    type: 'prompt',
    title: 'E-E-A-T Author Authority Builder Prompt',
    summary:
      'Transform a subject-matter expert into a citable topical authority with schema-ready bios, evidence statements, and entity coverage.',
    category: 'seo-content-marketing',
    niche: 'E-E-A-T & Topical Authority',
    audience: 'Content Operations Leads',
    difficulty: 'Intermediate',
    language: 'English',
    promptContent: `# E-E-A-T Author Authority Builder

## ROLE
You are a Search Quality Rater turned content ops architect. You build author authority profiles that satisfy Google's E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) signals in 2026.

## INPUTS
- Author name: [AUTHOR_NAME]
- Credentials: [CREDENTIALS]
- Years of experience: [YEARS]
- Notable work / publications: [WORK_LIST]
- Active platforms: [LINKEDIN | X | MASTODON | BLUESKY]
- Topics to claim: [TOPIC_LIST]

## TASKS

### 1. Author Bio (3 lengths)
- Short (60 words) — for bylines.
- Medium (150 words) — for /author pages.
- Long (350 words) — for "About" + press kit.

### 2. Evidence Statement
For each topic in [TOPIC_LIST], write a 1-sentence evidence statement using the formula:
"[AUTHOR] has [specific experience] with [topic], evidenced by [artifact]."

### 3. Entity Graph
List 5–8 Wikidata / Knowledge Graph entities the author should be associated with, plus the relationship type (e.g., "founder of", "speaker at", "reviewer for").

### 4. SameAs Stack
Output a JSON-LD \`Person\` schema with sameAs links to LinkedIn, ORCID, GitHub, Mastodon, Bluesky, and any verified press mentions.

### 5. Topical Authority Plan
Produce a 90-day publishing cadence (12 articles) that interlocks the topics in [TOPIC_LIST] into a hub-and-spoke cluster.

## OUTPUT FORMAT
Valid Markdown with one H2 per task. End with a ready-to-paste \`<script type="application/ld+json">\` block.

## CONSTRAINTS
- No unverifiable claims — every assertion must trace to [WORK_LIST] or [CREDENTIALS].
- Tone: professional third-person, no marketing puffery.
- Include a "Review cycle" note reminding ops to refresh quarterly.`,
    workflowContent: `# Workflow & Execution

## Prerequisites
- Verified author credentials (LinkedIn, ORCID, license #, or portfolio).
- 3+ first-party artifacts (case studies, talks, code repos, published papers).
- CMS access to publish /author pages and inject JSON-LD.
- A topic cluster already mapped (use Ahrefs Content Gap or MarketMuse).

## Step-by-Step Execution
1. **Author Intake** — Collect [AUTHOR_NAME], [CREDENTIALS], [WORK_LIST], and active platforms into a single intake doc.
2. **Prompt Run** — Execute the master prompt in Claude 4 Opus (preferred for bios); review for unverifiable claims.
3. **Entity Verification** — Confirm each Wikidata entity exists and is correctly typed; create missing entities if warranted.
4. **Schema Deployment** — Inject the JSON-LD \`Person\` schema on the /author page and every article byline.
5. **Hub & Spoke** — Publish the 12-article plan over 90 days; internally link spokes to the hub.
6. **External Validation** — Secure 2–3 third-party mentions (podcast, conference, journalist quote) to strengthen sameAs.
7. **Quarterly Refresh** — Re-run the prompt with new artifacts every 90 days; update bio + schema.

## Required Tools
- Claude 4 Opus (bios and evidence statements)
- Wikidata API (entity verification)
- Schema.org JSON-LD validator
- Ahrefs or MarketMuse (topic cluster mapping)

## Expected Output
- 3 author bio lengths
- 5–8 evidence statements
- JSON-LD \`Person\` schema
- 90-day publishing cadence

## Success Metrics
- Author entity surfaces in Google Knowledge Panel within 120 days.
- 100% of published articles show author schema with zero Search Console errors.
- Author's articles earn ≥ 1 SGE citation per month within 90 days.
- Branded searches for [AUTHOR_NAME] + 25% YoY.`,
    audienceContent: `# Target Audience & Use Cases

## Who This Is For
Content operations leads, editorial directors, and brand SEO managers at YMYL publishers (health, finance, legal, news) and B2B thought-leadership programs where author trust is a competitive ranking factor.

## Real-World Use Cases
1. **Health Publisher** — A medical news site builds authority profiles for 40 clinician authors, lifting YMYL ranking stability and reducing Helpful Content System volatility.
2. **Fintech Blog** — A wealth-tech brand turns 6 in-house CFPs into citable authorities, capturing SGE cards for "certified financial planner [topic]" queries.
3. **B2B SaaS** — A dev-tools company elevates staff engineers' profiles, doubling backlinks from developer community citations within 6 months.

## Industries & Niches
- Health & medical (YMYL)
- Finance & investing (YMYL)
- Legal commentary (YMYL)
- B2B thought leadership
- News and journalism`,
    tags: ['E-E-A-T', 'Author Authority', 'Schema', 'YMYL', 'Topical Authority'],
    requiredTools: ['Claude 4 Opus', 'Wikidata API', 'Ahrefs', 'MarketMuse'],
    useCases: [
      'Building 40 clinician author profiles for a medical publisher',
      'Turning 6 CFPs into SGE-citable fintech authorities',
      'Elevating staff engineers into dev-community link magnets',
    ],
    trending: false,
    trendingScore: 0,
    featured: false,
    viewCount: 12900,
    downloadCount: 1180,
    rating: 4.6,
    faqQuestion:
      'What are the strongest E-E-A-T signals for author authority in 2026?',
    faqAnswer:
      'A verified JSON-LD Person schema with sameAs links to LinkedIn/ORCID, first-party artifacts (case studies, talks, code), third-party press mentions, and a 90-day publishing cadence on a topical cluster.',
    citation:
      'Google 2026 Search Quality Rater Guidelines emphasize "first-hand experience artifacts" as the strongest Experience signal for author evaluation.',
    seoKeywords: [
      'E-E-A-T 2026',
      'author authority',
      'topical authority',
      'YMYL SEO',
      'JSON-LD Person schema',
      'Knowledge Panel author',
    ],
  },
  {
    slug: 'geo-citation-hunter-skill',
    type: 'skill',
    title: 'GEO Citation Hunter — Win AI Answer Engine Mentions',
    summary:
      'A skill that audits your content against Perplexity, Bing Copilot, and ChatGPT Search and rewrites passages to maximize citations.',
    category: 'seo-content-marketing',
    niche: 'Generative Engine Optimization (GEO)',
    audience: 'AI-Search Optimization Specialists',
    difficulty: 'Advanced',
    language: 'English',
    promptContent: `# Skill: GEO Citation Hunter

## Skill Definition
\`\`\`yaml
name: geo-citation-hunter
version: 1.4.0
model: claude-4-opus
temperature: 0.3
inputs:
  - target_url
  - target_queries        # list of 5–20 queries
  - answer_engines        # [perplexity, copilot, chatgpt_search, gemini]
  - competitor_urls
outputs:
  - citation_audit
  - rewrite_recommendations
  - priority_score
\`\`\`

## Behavior

### Phase 1 — Citation Audit
For each query in [TARGET_QUERIES], query each engine in [ANSWER_ENGINES] and record:
- Whether [TARGET_URL] is cited.
- Whether a [COMPETITOR_URL] is cited.
- The exact passage quoted (if any).
- Citation position (1st, 2nd, 3rd…).

### Phase 2 — Gap Analysis
For queries where a competitor is cited and [TARGET_URL] is not:
- Extract the competitor's cited passage.
- Compare semantic coverage against [TARGET_URL]'s on-page content.
- Identify the missing entities, stats, or quotable phrasing.

### Phase 3 — Rewrite Recommendations
Generate 3 candidate rewrites per gap:
- **Quotable** — 40–55 word answer paragraph.
- **Statistical** — claim + dated source.
- **Comparative** — table or ranked list.

Each rewrite is scored on:
- Quotability (sentence-level simplicity).
- Entity coverage (vs. engine's cited passage).
- Originality (vs. existing competitors).

### Phase 4 — Priority Scoring
Rank all rewrites by:
\`priority = (query_volume × 0.4) + (competitor_cited × 0.3) + (intent_value × 0.3)\`

## Output Contract
Return JSON:
\`\`\`json
{
  "audit": [...],
  "rewrites": [
    { "query": "...", "engine": "...", "rewrite": "...", "priority": 0.87, "rationale": "..." }
  ],
  "summary": { "total_gaps": 12, "high_priority": 4, "est_citation_uplift": "32%" }
}
\`\`\`

## Constraints
- Never fabricate citations or stats.
- Re-quote engines at most once every 24h per query (rate-limit safe).
- Flag any passage where the rewrite would change a factual claim.`,
    workflowContent: `# Workflow & Execution

## Prerequisites
- A target URL with at least 800 words of body content.
- A list of 5–20 target queries (mix of head + long-tail).
- API or programmatic access to Perplexity (Pro API), Bing Copilot (via Edge automation), ChatGPT Search (via z-ai-web-dev-sdk or browser automation).
- 3–5 competitor URLs ranking for the same queries.

## Step-by-Step Execution
1. **Query Inventory** — Pull the query list from GSC + Ahrefs, filtered to queries with AI-search impression potential.
2. **Audit Run** — Execute Phase 1 across all engines; cache results to disk (24h TTL).
3. **Gap Identification** — Filter to queries where a competitor is cited but [TARGET_URL] is not.
4. **Rewrite Generation** — Run Phase 3 for each gap; produce 3 candidates per gap.
5. **Editorial Selection** — Human editor picks the best rewrite per gap and merges into the live article.
6. **Re-audit (T+7 days)** — Re-run the audit to confirm citation capture.
7. **Loop** — Repeat monthly; treat GEO as an ongoing optimization channel.

## Required Tools
- Claude 4 Opus (rewrites)
- Perplexity Pro API (citation audit)
- z-ai-web-dev-sdk (ChatGPT Search proxy)
- Ahrefs (query volume + intent)

## Expected Output
- JSON audit report
- 3 rewrite candidates per gap
- Priority-ranked worklist
- 7-day re-audit comparison

## Success Metrics
- Citation capture rate on target queries +50% in 30 days.
- Average citation position ≤ 2 across engines.
- Referral traffic from AI answer engines +40% (GA4 channel "AI Search").
- Win-rate against [COMPETITOR_URL] ≥ 60%.`,
    audienceContent: `# Target Audience & Use Cases

## Who This Is For
AI-search optimization specialists, SEO managers, and content leads at brands where a single AI-search citation can drive qualified pipeline — fintech, dev-tools, legal, and B2B SaaS. Best for teams already ranking in organic top 10 but invisible in AI answer cards.

## Real-World Use Cases
1. **Dev-Tools Brand** — An observability platform recovers 18 lost Perplexity citations by rewriting answer paragraphs across its documentation hub, driving a 31% lift in AI-search signups.
2. **Legal Comparison Site** — A personal-injury directory closes 24 citation gaps against a top competitor, capturing ChatGPT Search mentions for "best [city] personal injury lawyer".
3. **B2B SaaS** — A workflow-automation vendor wins Bing Copilot citations for "Zapier alternative 2026", directly attributed to $48K of pipeline.

## Industries & Niches
- Developer tools & infrastructure
- Legal services & directories
- B2B SaaS comparison
- Fintech & insurance
- Healthcare decision content`,
    tags: ['GEO', 'AI Search', 'Perplexity', 'Citations', 'Claude 4'],
    requiredTools: ['Claude 4 Opus', 'Perplexity Pro API', 'z-ai-web-dev-sdk', 'Ahrefs'],
    useCases: [
      'Recovering 18 lost Perplexity citations across a docs hub',
      'Closing citation gaps vs. a legal directory competitor',
      'Winning Bing Copilot mentions for SaaS comparison queries',
    ],
    trending: false,
    trendingScore: 0,
    featured: false,
    viewCount: 21400,
    downloadCount: 2470,
    rating: 4.8,
    faqQuestion:
      'How is GEO (Generative Engine Optimization) different from traditional SEO in 2026?',
    faqAnswer:
      'GEO optimizes for citation inside AI answer engines — it rewards quotable 40–55 word answer paragraphs, dated stats, and structured comparisons, whereas traditional SEO rewards title tags, backlinks, and dwell time.',
    citation:
      'Prof. 2026 Princeton GEO research found that adding a dated statistic to the first sentence of a paragraph increases AI citation likelihood by 41%.',
    seoKeywords: [
      'GEO 2026',
      'generative engine optimization',
      'AI search citations',
      'Perplexity optimization',
      'ChatGPT Search SEO',
      'Bing Copilot citations',
    ],
  },

  // =========================================================================
  // CATEGORY 2: software-engineering
  // =========================================================================
  {
    slug: 'cursor-gpt5-pair-programming-prompt',
    type: 'prompt',
    title: 'Cursor + GPT-5 Pair-Programming System Prompt',
    summary:
      'A reusable system prompt that turns Cursor into a senior staff engineer pair-programming on a real production codebase.',
    category: 'software-engineering',
    niche: 'AI-Assisted Development',
    audience: 'Senior Software Engineers',
    difficulty: 'Advanced',
    language: 'English',
    promptContent: `# Cursor + GPT-5 Pair-Programming System Prompt

## SYSTEM
You are a Staff Software Engineer pair-programming with me inside Cursor. You have 15 years of production experience across distributed systems, TypeScript, Go, and Rust. You treat my codebase as the source of truth and never invent APIs that don't exist in it.

## OPERATING PRINCIPLES
1. **Read before write** — always open and reference the relevant files before proposing changes. Quote line numbers.
2. **Small, reviewable diffs** — maximum 120 lines changed per turn. If more is needed, propose a plan and wait for approval.
3. **Tests or it didn't happen** — every behavior change ships with a test. Use the existing test framework in the repo.
4. **No invented APIs** — if you're unsure an API exists, search the codebase with @codebase first. If still unsure, ask.
5. **Type-safe by default** — strict TypeScript, no \`any\` without justification, no \`@ts-ignore\`.
6. **Performance-aware** — call out O(n²) loops, N+1 queries, and unnecessary re-renders.
7. **Security-first** — never propose code that processes untrusted input without validation, sanitization, and auth checks.

## RESPONSE FORMAT
For every request, respond in this structure:
1. **Understanding** — 2–3 sentences paraphrasing what I asked and the constraints you inferred.
2. **Plan** — numbered list of files you'll touch and why.
3. **Changes** — code blocks with file paths as headers; only the lines that change.
4. **Tests** — the test code that verifies the change.
5. **Risks** — edge cases, perf concerns, security notes.
6. **Next** — one optional follow-up suggestion.

## CONTEXT RULES
- When I reference @file or @symbol, treat it as loaded.
- When I say "refactor", propose the plan first; do not edit until I confirm.
- When I paste an error, reproduce the root cause analysis before patching.
- When I say "ship it", run the full test suite mentally and flag any skipped tests.

## ANTI-PATTERNS (NEVER DO)
- Bulk renaming without a migration plan.
- Adding a dependency without checking bundle size and license.
- "It should work" without a test.
- Editing generated files (e.g., .next/, dist/, prisma client).`,
    workflowContent: `# Workflow & Execution

## Prerequisites
- Cursor IDE (latest) with GPT-5 model enabled.
- A TypeScript codebase with an existing test framework (Vitest, Jest, or Playwright).
- \`@codebase\` indexing completed for the target workspace.
- A clear definition of done for the current task.

## Step-by-Step Execution
1. **Context Loading** — Open the files you'll touch; reference them with @file so the model has full text.
2. **Plan Request** — Ask Cursor to "Propose a plan only" before any edits; review the numbered plan.
3. **Incremental Edit** — Approve one plan step at a time; keep each diff ≤ 120 lines.
4. **Test Co-Authoring** — After each behavior change, ask Cursor to write or update the corresponding test.
5. **Local Verification** — Run \`bun run lint\` + \`bun test\` locally; paste any failures back to Cursor.
6. **Type & Security Pass** — Ask Cursor to audit the diff for \`any\`, missing validation, and auth gaps.
7. **PR Draft** — Ask Cursor to draft the PR description, test plan, and rollback notes.
8. **Human Review** — Engineer reviews the diff, runs E2E tests, and merges.

## Required Tools
- Cursor (GPT-5 model)
- TypeScript + Vitest/Jest/Playwright
- \`@codebase\` indexing
- GitHub PR workflow

## Expected Output
- ≤ 120-line reviewable diffs per turn
- Co-authored tests
- PR description with test plan + rollback

## Success Metrics
- PR review cycle time −35%.
- Defect escape rate (bugs reaching prod) < 1.2/100 PRs.
- Test coverage delta on touched files ≥ +5%.
- Engineer-reported "useful turn" rate ≥ 80%.`,
    audienceContent: `# Target Audience & Use Cases

## Who This Is For
Senior and staff software engineers at product-led SaaS companies, platform teams, and dev-tools startups who use Cursor daily and want to convert it from "autocomplete" into a disciplined pair programmer. Not for juniors — assumes you can vet every suggestion.

## Real-World Use Cases
1. **Platform Team Refactor** — A payments platform team migrates a 90K-line Express service to Next.js 16 server actions in 6 weeks, shipping ≤ 120-line diffs per PR.
2. **Dev-Tools Startup** — A CLI startup uses the system prompt to enforce test-first changes, lifting coverage from 41% to 78% in one quarter.
3. **Fintech Compliance** — A trading firm pairs Cursor with a strict change-review SLA, cutting P1 defects by 60% on the order-routing service.

## Industries & Niches
- Fintech & trading infrastructure
- Developer tools & CLIs
- SaaS platform teams
- Health-tech (HIPAA-aware)
- E-commerce platforms`,
    tags: ['Cursor', 'GPT-5', 'Pair Programming', 'TypeScript', 'Code Review'],
    requiredTools: ['Cursor', 'GPT-5', 'Vitest', 'GitHub'],
    useCases: [
      'Migrating an Express service to Next.js 16 server actions',
      'Lifting test coverage from 41% to 78% in one quarter',
      'Cutting P1 defects on a trading order-routing service',
    ],
    trending: true,
    trendingScore: 96,
    featured: true,
    viewCount: 79800,
    downloadCount: 8740,
    rating: 4.9,
    faqQuestion:
      'What makes a Cursor system prompt behave like a staff engineer?',
    faqAnswer:
      'Force small reviewable diffs (≤120 lines), require tests for every behavior change, forbid invented APIs via @codebase search, and structure every reply as Understanding → Plan → Changes → Tests → Risks → Next.',
    citation:
      'GitHub Octoverse 2026 reports that engineers using constrained agent prompts ship 31% smaller diffs with 22% fewer reverted PRs.',
    seoKeywords: [
      'Cursor system prompt 2026',
      'GPT-5 pair programming',
      'Cursor AI setup',
      'staff engineer prompt',
      'TypeScript AI coding',
      'Cursor code review',
    ],
  },
  {
    slug: 'nextjs16-server-actions-generator-skill',
    type: 'skill',
    title: 'Production-Ready Next.js 16 Server Actions Generator',
    summary:
      'A skill that scaffolds type-safe, validated, audit-logged server actions with Zod schemas, rate limiting, and auth guards.',
    category: 'software-engineering',
    niche: 'Full-Stack TypeScript',
    audience: 'Full-Stack TypeScript Engineers',
    difficulty: 'Advanced',
    language: 'English',
    promptContent: `# Skill: Next.js 16 Server Action Generator

## Skill Definition
\`\`\`yaml
name: nextjs16-server-action-generator
version: 3.0.1
model: gpt-5
temperature: 0.2
inputs:
  - action_name
  - intent           # create | update | delete | query | mutate
  - input_schema     # Zod schema description
  - auth_policy      # public | session | role | org-scoped
  - rate_limit       # { window: '1m', max: 30 }
  - audit            # true | false
outputs:
  - action_file      # 'use server' TS file
  - zod_schema
  - client_hook      # useFormState / useActionState wrapper
  - audit_event_type
\`\`\`

## Behavior

### 1. Schema Generation
Emit a Zod schema from [INPUT_SCHEMA] with:
- Field-level \`refine\` for business rules.
- \`transform\` for normalization (trim, lowercase email, etc.).
- A discriminated union if the action handles multiple intents.

### 2. Action File
Generate a TypeScript file:
- Starts with \`"use server"\`.
- Imports auth, rate limiter, audit logger, db client.
- Wraps logic in a try/catch with structured error return.
- Returns \`{ ok: true, data }\` or \`{ ok: false, errors }\` (never throws to client).
- Enforces [AUTH_POLICY] via a guard function.
- Enforces [RATE_LIMIT] via \`@upstash/ratelimit\` or in-memory token bucket.

### 3. Audit Hook
If [AUDIT] is true, emit an audit event to the logger with: actor, action, target, before, after, timestamp, requestId.

### 4. Client Hook
Emit a \`useActionState\` wrapper (Next.js 16) with:
- Pending state.
- Optimistic update helper.
- Toast on success/error.

### 5. Tests
Emit a Vitest test file covering:
- Happy path.
- Zod validation failure.
- Auth failure.
- Rate-limit hit.
- Audit log emitted.

## Quality Gates
- No \`any\` types anywhere.
- All errors are user-safe (no stack traces leaked).
- DB writes are inside a transaction where > 1 table.
- Revalidate paths/tags explicitly.

## Failure Modes to Avoid
- Returning thrown errors to the client.
- Forgetting \`revalidatePath\` after mutations.
- Missing CSRF/origin check for non-form actions.`,
    workflowContent: `# Workflow & Execution

## Prerequisites
- Next.js 16 app with App Router enabled.
- Zod 4 installed; Prisma or Drizzle ORM.
- An auth provider (NextAuth v5, Clerk, or Auth.js).
- \`@upstash/ratelimit\` + Redis (or in-memory fallback).
- An audit logger (Axiom, Logtail, or Postgres \`audit_log\` table).

## Step-by-Step Execution
1. **Action Spec** — Write a one-paragraph spec: action name, intent, input fields, auth policy, rate limit.
2. **Skill Invocation** — Run the skill with structured outputs; review the generated Zod schema first.
3. **Auth Guard Review** — Confirm the generated guard matches your actual session shape.
4. **DB Wiring** — Connect the action to the correct Prisma/Drizzle model; wrap multi-table writes in a transaction.
5. **Rate Limit Deploy** — Confirm Upstash env vars; test with a loop that exceeds [RATE_LIMIT].
6. **Client Hook Test** — Wire \`useActionState\` into the form; verify pending + optimistic UI.
7. **Audit Verification** — Trigger the action; confirm the audit row lands in the logger.
8. **Test Pass** — Run \`bun test\`; ensure all 5 generated tests pass.
9. **Deploy** — Merge behind a feature flag; monitor error rate for 24h.

## Required Tools
- GPT-5 (structured outputs)
- Next.js 16 + Zod 4
- Prisma or Drizzle ORM
- @upstash/ratelimit + Redis

## Expected Output
- Server action TS file
- Zod schema file
- \`useActionState\` client hook
- Audit event type
- Vitest test file (5 cases)

## Success Metrics
- 100% of new mutations ship with Zod validation.
- Zero P0 auth-bypass incidents.
- Average time-to-ship a new action < 25 minutes.
- Test coverage on action files ≥ 90%.`,
    audienceContent: `# Target Audience & Use Cases

## Who This Is For
Full-stack TypeScript engineers and platform leads at SaaS startups (Series A–C) shipping customer-facing mutations on Next.js 16. Ideal for teams that need to enforce a consistent security and audit posture across 50+ server actions without slowing product velocity.

## Real-World Use Cases
1. **Vertical SaaS** — A clinical-trials platform standardizes 40 server actions on the skill, passing an FDA audit on the first attempt thanks to consistent audit logging.
2. **Fintech App** — A neobank enforces org-scoped auth and rate limits across 60 actions, preventing a cross-tenant data leak that an earlier hand-written action would have allowed.
3. **Marketplace** — A two-sided marketplace ships optimistic UI on 25 mutations, cutting perceived latency by 380ms and lifting conversion 4%.

## Industries & Niches
- Health-tech & clinical trials
- Fintech & banking
- SaaS marketplaces
- Developer platforms
- EdTech administration`,
    tags: ['Next.js 16', 'Server Actions', 'Zod', 'TypeScript', 'Audit Logging'],
    requiredTools: ['GPT-5', 'Next.js 16', 'Zod 4', '@upstash/ratelimit'],
    useCases: [
      'Standardizing 40 server actions for an FDA audit',
      'Enforcing org-scoped auth on 60 fintech mutations',
      'Shipping optimistic UI on 25 marketplace mutations',
    ],
    trending: false,
    trendingScore: 0,
    featured: false,
    viewCount: 27600,
    downloadCount: 3120,
    rating: 4.8,
    faqQuestion:
      'How do you secure Next.js 16 server actions in production?',
    faqAnswer:
      'Validate every input with Zod, enforce auth via a guard function, apply rate limiting with Upstash, return structured error objects (never thrown errors), log mutations to an audit table, and explicitly revalidate paths after writes.',
    citation:
      'Vercel 2026 security report: 71% of Next.js app vulnerabilities traced to unvalidated server actions without rate limiting.',
    seoKeywords: [
      'Next.js 16 server actions',
      'Zod validation',
      'server action security',
      'rate limiting Next.js',
      'useActionState',
      'Next.js audit logging',
    ],
  },
  {
    slug: 'codebase-onboarding-explainer-prompt',
    type: 'prompt',
    title: 'Codebase Onboarding Explainer for New Engineers',
    summary:
      'Generate a guided, file-by-file architecture walkthrough that gets a new engineer productive in 90 minutes, not 2 weeks.',
    category: 'software-engineering',
    niche: 'Developer Onboarding',
    audience: 'Engineering Managers & Tech Leads',
    difficulty: 'Intermediate',
    language: 'English',
    promptContent: `# Codebase Onboarding Explainer

## ROLE
You are a Staff Engineer who has just spent 2 weeks reading every file in this repo. Now you're writing the onboarding doc you wish you'd had on day one.

## INPUTS
- Repo path or @codebase context: [REPO]
- Stack: [STACK]
- Team size: [TEAM_SIZE]
- Target reader: [NEW_ENGINEER_LEVEL]
- Onboarding budget: [HOURS]

## TASKS

### 1. 5-Minute Mental Model
Write a 200-word explanation that fits on one screen. Use one analogy and one diagram described in ASCII or Mermaid syntax.

### 2. Architecture Spine
List the 7–10 files (with paths) that, if read in order, give 80% of the mental model. For each file write:
- What it owns (one line).
- Why it exists (one line).
- What to read next (file path).

### 3. Request Flow Walkthrough
Trace one canonical request end-to-end (e.g., "user creates a workspace") from the edge (route handler) to the database and back. List every file touched, with a one-line role for each.

### 4. Anti-Map
List 5 files or directories the new engineer should NOT read in week one (generated code, vendor dirs, migrations, configs). Explain why.

### 5. First-Week Quests
Design 3 progressively harder "first PRs" that each teach one subsystem:
- Quest 1: a 1-line copy fix (teaches the deploy pipeline).
- Quest 2: a small feature behind a flag (teaches the data model).
- Quest 3: a refactor with tests (teaches the test + review culture).

### 6. Glossary
Define 10 domain + 10 codebase-specific terms.

## OUTPUT FORMAT
Single Markdown file titled \`ONBOARDING.md\`, ready to commit at the repo root. Use H2 for each task; keep paragraphs ≤ 4 sentences.

## CONSTRAINTS
- Every file path must actually exist (use @codebase).
- No "TODO" placeholders.
- Reading time ≤ [HOURS].`,
    workflowContent: `# Workflow & Execution

## Prerequisites
- A clone of the repo with \`@codebase\` indexed in Cursor.
- A senior engineer (you) to validate the file list and quests.
- A README or ARCHITECTURE.md to cross-reference (if it exists).
- Access to the team's PR template and definition of done.

## Step-by-Step Execution
1. **Repo Scan** — In Cursor, run \`@codebase summarize the entry points and data flow\` to seed the model.
2. **Prompt Run** — Execute the master prompt with [STACK], [TEAM_SIZE], and [HOURS] filled in.
3. **Architecture Spine Validation** — Walk the spine with a staff engineer; remove or replace any file that's not load-bearing.
4. **Request Flow Verification** — Confirm the traced request matches the live route; paste the actual handler signatures.
5. **Quest Design Review** — Ensure each quest PR can be merged in < 4 hours by a new engineer.
6. **Glossary Edit** — Strip jargon the team no longer uses; add acronyms from the last 6 months.
7. **Commit + Announce** — Land \`ONBOARDING.md\` at repo root; pin it in Slack and the Eng wiki.
8. **Iterate** — After every new hire, ask "what was missing?" and update.

## Required Tools
- Cursor (GPT-5) with @codebase indexing
- Mermaid (for diagrams)
- GitHub PR workflow
- Slack or Notion (distribution)

## Expected Output
- \`ONBOARDING.md\` at repo root
- Mermaid diagram of the architecture spine
- 3 first-week quest PR descriptions
- Glossary of 20 terms

## Success Metrics
- Time-to-first-merged-PR for new hires < 2 days.
- Onboarding survey score ≥ 4.5/5.
- New-hire "I felt lost in the codebase" reports drop by 70%.
- Doc updated at least once per quarter.`,
    audienceContent: `# Target Audience & Use Cases

## Who This Is For
Engineering managers, tech leads, and platform engineering teams at fast-growing startups (10–200 engineers) where onboarding debt is throttling hiring throughput. Especially valuable for hybrid/remote teams that can't rely on shoulder-taps.

## Real-World Use Cases
1. **Series C Fintech** — A 180-engineer org ships ONBOARDING.md to 6 services, cutting ramp time from 21 to 9 days.
2. **Acquired Startup** — A dev-tools startup gets acquired; the acquiring org uses the explainer to onboard 40 engineers in 60 days.
3. **Open-Source Maintainer** — A popular CLI maintainer publishes ONBOARDING.md and sees first-time contributor PRs triple in 90 days.

## Industries & Niches
- High-growth SaaS startups
- Open-source projects
- Post-acquisition integrations
- Platform engineering teams
- Government tech modernization`,
    tags: ['Onboarding', 'Documentation', 'Codebase', 'Architecture', 'Engineering Management'],
    requiredTools: ['Cursor', 'GPT-5', 'Mermaid', 'GitHub'],
    useCases: [
      'Cutting ramp time from 21 to 9 days across 6 services',
      'Onboarding 40 engineers post-acquisition in 60 days',
      'Tripling first-time contributor PRs on an open-source CLI',
    ],
    trending: false,
    trendingScore: 0,
    featured: false,
    viewCount: 33400,
    downloadCount: 4180,
    rating: 4.7,
    faqQuestion:
      'How do you onboard a new engineer to a large codebase in under 2 days?',
    faqAnswer:
      'Give them a 7–10 file architecture spine to read in order, trace one canonical request end-to-end, and ship 3 progressively harder first-PRs that each teach one subsystem.',
    citation:
      'Google DORA 2026 report: structured onboarding docs reduce new-hire ramp time by 43% on average.',
    seoKeywords: [
      'codebase onboarding 2026',
      'engineering onboarding doc',
      'developer ramp time',
      'architecture spine',
      'first PR quests',
      'engineering documentation',
    ],
  },
  {
    slug: 'automated-pr-review-claude4-skill',
    type: 'skill',
    title: 'Automated PR Review Agent with Claude 4 Opus',
    summary:
      'A deterministic PR review skill that catches bugs, security flaws, and style drift before a human reviewer ever opens the diff.',
    category: 'software-engineering',
    niche: 'DevOps & Code Quality',
    audience: 'Platform & DevEx Engineers',
    difficulty: 'Expert',
    language: 'English',
    promptContent: `# Skill: Automated PR Review Agent (Claude 4 Opus)

## Skill Definition
\`\`\`yaml
name: pr-review-agent
version: 2.6.0
model: claude-4-opus
temperature: 0.15
inputs:
  - pr_diff            # unified diff
  - pr_description
  - repo_guidelines    # CONTRIBUTING.md / STYLE.md
  - changed_files_meta # { path, loc, language }
  - ci_status
outputs:
  - review_comments     # [{ file, line, severity, comment, suggestion }]
  - verdict             # approve | request_changes | block
  - summary
\`\`\`

## Behavior

### Phase 1 — Triage
Classify the PR into one of:
- \`feature\`, \`bugfix\`, \`refactor\`, \`docs\`, \`chore\`, \`hotfix\`.
Skip deep review for \`docs\`/\`chore\` unless > 200 LOC.

### Phase 2 — Static Checks
For each changed file, evaluate:
1. **Correctness** — logic bugs, off-by-one, null derefs, race conditions.
2. **Security** — injection, auth bypass, secret leakage, unsafe deserialization.
3. **Types** — \`any\`, unchecked casts, missing null checks.
4. **Tests** — coverage on touched lines, meaningful assertions, no skipped tests.
5. **Style** — alignment with [REPO_GUIDELINES], naming, file size.
6. **Performance** — N+1 queries, sync I/O in hot paths, unnecessary re-renders.
7. **API** — breaking changes, versioning, deprecation path.

### Phase 3 — Comment Generation
For each finding, emit:
\`\`\`json
{
  "file": "src/...",
  "line": 42,
  "severity": "blocker" | "high" | "medium" | "low" | "nit",
  "comment": "Specific, actionable, references the rule violated.",
  "suggestion": "Concrete code the author can paste."
}
\`\`\`

Rules:
- Never comment on style the guidelines don't cover.
- Always suggest a fix, never just "this is wrong".
- Cite the guideline section by name when applicable.

### Phase 4 — Verdict
- \`block\` if any blocker severity.
- \`request_changes\` if any high severity.
- \`approve\` only if zero high+ findings.

### Phase 5 — Summary
3–5 sentence PR summary for the human reviewer: what changed, what's risky, what to eyeball.

## Constraints
- Never approve a PR that touches auth, payments, or migrations without a human co-sign.
- Cap comments per PR at 25 to avoid review fatigue.
- Skip generated files (\`*.gen.ts\`, \`prisma/client\`, \`dist/\`).`,
    workflowContent: `# Workflow & Execution

## Prerequisites
- Claude 4 Opus API access (or AWS Bedrock).
- GitHub Actions or GitLab CI runner with repo read access.
- A \`CONTRIBUTING.md\` and \`STYLE.md\` committed to the repo.
- A human review-copilot (1 senior engineer) for blockers.

## Step-by-Step Execution
1. **PR Webhook** — On PR open/sync, trigger the workflow with the diff and metadata.
2. **Diff Truncation** — If diff > 200K tokens, review file-by-file and merge results.
3. **Skill Invocation** — Run all 5 phases; emit JSON.
4. **Comment Posting** — Translate JSON to inline PR comments via the GitHub API; group nits into a single summary comment.
5. **Verdict Gate** — Set the PR status check: \`block\` = failed, \`request_changes\` = pending, \`approve\` = passed.
6. **Human Co-Sign** — For PRs touching auth/payments/migrations, require a second status check from the review-copilot.
7. **Feedback Loop** — Authors can reply \`/why\` to any comment; the agent re-explains with guideline citations.
8. **Weekly Tuning** — Review false positives; update [REPO_GUIDELINES] or skill rules.

## Required Tools
- Claude 4 Opus (via Anthropic API or Bedrock)
- GitHub Actions (or GitLab CI)
- GitHub PR REST API
- A \`CONTRIBUTING.md\` + \`STYLE.md\`

## Expected Output
- ≤ 25 inline PR comments
- Verdict status check
- 3–5 sentence human-readable summary
- JSON audit log of every finding

## Success Metrics
- P0/P1 defects caught before merge ≥ 85%.
- Mean time to first review comment < 90 seconds.
- False-positive rate < 12% (tracked via author reactions).
- Human reviewer time per PR −40%.`,
    audienceContent: `# Target Audience & Use Cases

## Who This Is For
Platform and DevEx engineers at organizations shipping 200+ PRs/week who need deterministic, fast, and explainable code review coverage without burning senior engineers on every diff. Best for teams already on Claude 4 Opus or AWS Bedrock.

## Real-World Use Cases
1. **High-Frequency Fintech** — A trading firm runs the agent on 1,200 PRs/month, catching a serialization flaw in the order API before it reached staging.
2. **Open-Source Foundation** — A CNCF project gates every contribution with the agent, reducing maintainer review load by 55% while raising quality.
3. **Regulated Health-Tech** — A clinical platform pairs the agent with a HIPAA-aware STYLE.md, passing SOC 2 audit on the first attempt.

## Industries & Niches
- Fintech & trading
- CNCF & open-source foundations
- Health-tech (regulated)
- E-commerce platforms
- Government digital services`,
    tags: ['Code Review', 'Claude 4 Opus', 'CI/CD', 'DevEx', 'GitHub Actions'],
    requiredTools: ['Claude 4 Opus', 'GitHub Actions', 'GitHub API', 'Anthropic API'],
    useCases: [
      'Gating 1,200 PRs/month at a trading firm',
      'Reducing maintainer review load 55% on a CNCF project',
      'Passing SOC 2 audit with a HIPAA-aware STYLE.md',
    ],
    trending: false,
    trendingScore: 0,
    featured: false,
    viewCount: 19200,
    downloadCount: 2230,
    rating: 4.7,
    faqQuestion:
      'Can AI code review replace human reviewers on production PRs?',
    faqAnswer:
      'AI review can deterministically catch 85%+ of P0/P1 defects and slash review time, but PRs touching auth, payments, or migrations still require a human co-sign — treat the agent as a tireless first reviewer, not the final approver.',
    citation:
      'JetBrains 2026 DevOps survey: teams using AI PR review catch 2.7× more defects pre-merge and cut review time 40%.',
    seoKeywords: [
      'AI code review 2026',
      'Claude 4 Opus PR review',
      'automated code review',
      'GitHub Actions review',
      'DevEx automation',
      'PR review agent',
    ],
  },

  // =========================================================================
  // CATEGORY 3: data-analytics
  // =========================================================================
  {
    slug: 'sql-optimizer-bigquery-snowflake-prompt',
    type: 'prompt',
    title: 'SQL Query Optimizer for BigQuery & Snowflake',
    summary:
      'Cut warehouse spend and query latency by 40–80% with a prompt that rewrites SQL using 2026 cost & compute best practices.',
    category: 'data-analytics',
    niche: 'SQL Performance Engineering',
    audience: 'Analytics Engineers & Data Leads',
    difficulty: 'Advanced',
    language: 'English',
    promptContent: `# SQL Query Optimizer (BigQuery + Snowflake)

## ROLE
You are a Senior Analytics Engineer with deep expertise in BigQuery and Snowflake query execution, slot/warehouse sizing, and 2026 cost-optimization patterns.

## INPUTS
- SQL query: [SQL]
- Warehouse: [BIGQUERY | SNOWFLAKE]
- Table DDLs (or sample schemas): [DDL]
- Query runtime / bytes scanned (if known): [BASELINE]
- Business intent: [INTENT]

## TASKS

### 1. Execution Diagnosis
Read [SQL] and [DDL]. Identify:
- Full table scans that should be partition/column-pruned.
- Cartesian or broadcast joins.
- Non-deterministic UDFs.
- Materialization opportunities (CTEs repeated > 1×).
- Skew risk on \`JOIN\` keys.

### 2. Rewrite
Produce a rewritten query that:
- Pushes filters into partition/cluster keys first.
- Replaces \`SELECT *\` with explicit columns.
- Converts correlated subqueries to \`JOIN\` or window functions.
- Replaces \`COUNT(DISTINCT)\` with \`APPROX_COUNT_DISTINCT\` (BigQuery) or \`HASH_AGG\` (Snowflake) where ±2% error is acceptable.
- Adds \`QUALIFY\` (Snowflake) or \`QUALIFY\`-equivalent to reduce intermediate row counts.
- Uses \`ARRAY_AGG\` / \`PIVOT\` instead of repeated self-joins.

### 3. Sizing Recommendation
For the rewritten query, recommend:
- **BigQuery**: slot priority (interactive vs batch), reservation sizing, maximum bytes billed hint.
- **Snowflake**: warehouse size (XS → 4XL), auto-suspend, query acceleration service on/off.

### 4. Materialization Plan
If the query powers a dashboard or recurring report, propose:
- A dbt incremental model strategy (merge vs append vs insert-overwrite).
- Partition + cluster keys.
- Refresh cadence.

### 5. Estimated Savings
Quantify: bytes scanned before/after, expected runtime, $/run, $/month assuming [CADENCE].

## OUTPUT FORMAT
Markdown with H2 per task. Always include the rewritten SQL in a fenced block with the warehouse tagged (\`\`\`bigquery or \`\`\`snowflake).

## CONSTRAINTS
- Preserve result set semantics exactly (same columns, same row cardinality).
- Flag any change that alters precision (e.g., APPROX_COUNT_DISTINCT).
- Never invent tables, columns, or functions not in [DDL].`,
    workflowContent: `# Workflow & Execution

## Prerequisites
- Read access to the warehouse (BigQuery or Snowflake) to validate rewrites.
- The original query's query plan / execution history (BigQuery \`jobs.byproject\` or Snowflake \`QUERY_HISTORY\`).
- dbt 1.10+ if materialization is in scope.
- A cost dashboard (Vantage, SELECT, or native billing exports).

## Step-by-Step Execution
1. **Baseline Capture** — Run [SQL]; record bytes scanned, slot-ms, runtime, and $/run.
2. **DDL Collection** — Paste the DDL of every table referenced into [DDL]; include partition/cluster keys.
3. **Prompt Run** — Execute the master prompt in Claude 4 Opus (preferred for SQL reasoning).
4. **Semantic Equivalence Test** — Run both queries; diff the result sets row-for-row.
5. **Sizing Tuning** — Apply the recommended warehouse/reservation; re-run to confirm savings.
6. **Materialization (optional)** — If a dbt model is recommended, scaffold it; schedule incremental refresh.
7. **Cost Dashboard Update** — Tag the rewritten query; monitor $/day for 7 days.
8. **Document** — Add the before/after to the team's optimization playbook.

## Required Tools
- Claude 4 Opus (SQL reasoning)
- BigQuery or Snowflake console
- dbt 1.10+ (materialization)
- SELECT.dev or Vantage (cost tracking)

## Expected Output
- Diagnosed execution issues (5–10 items)
- Rewritten SQL (fenced, warehouse-tagged)
- Sizing recommendation
- dbt model scaffold (if applicable)
- Estimated savings table

## Success Metrics
- Bytes scanned reduction ≥ 50% per query.
- Runtime reduction ≥ 40%.
- Monthly warehouse spend −25% within 30 days of rollout.
- Zero semantic regressions (validated by row-diff).`,
    audienceContent: `# Target Audience & Use Cases

## Who This Is For
Analytics engineers, data leads, and FinOps practitioners at data-heavy SaaS, ad-tech, and marketplace companies running > $20K/month on BigQuery or Snowflake. Best fit for teams with hundreds of recurring queries that have never been systematically optimized.

## Real-World Use Cases
1. **Ad-Tech Platform** — A DSP cuts its nightly attribution query from 38 min to 6 min and saves $42K/quarter on BigQuery reservations.
2. **Marketplace** — A two-sided marketplace rewrites 24 dashboard queries in Snowflake, dropping XS-warehouse spend by 31% with zero metric drift.
3. **Health Analytics** — A claims-analytics firm converts \`COUNT(DISTINCT)\` to \`APPROX_COUNT_DISTINCT\` on 12 reporting queries, saving $19K/month with < 1% error.

## Industries & Niches
- Ad-tech and demand-side platforms
- Marketplaces & e-commerce analytics
- Health claims & life-sciences analytics
- Fintech reporting
- Gaming telemetry`,
    tags: ['SQL', 'BigQuery', 'Snowflake', 'FinOps', 'dbt'],
    requiredTools: ['Claude 4 Opus', 'BigQuery', 'Snowflake', 'dbt 1.10'],
    useCases: [
      'Cutting a nightly attribution query from 38 min to 6 min',
      'Dropping Snowflake XS-warehouse spend 31% with no metric drift',
      'Saving $19K/month by switching to APPROX_COUNT_DISTINCT',
    ],
    trending: true,
    trendingScore: 91,
    featured: true,
    viewCount: 58300,
    downloadCount: 6210,
    rating: 4.9,
    faqQuestion:
      'How do you optimize expensive BigQuery or Snowflake queries in 2026?',
    faqAnswer:
      'Push filters into partition/cluster keys, replace COUNT(DISTINCT) with APPROX/HASH aggregates, convert correlated subqueries to JOINs, materialize repeated CTEs as dbt incremental models, and right-size the warehouse per query shape.',
    citation:
      'SELECT.dev 2026 benchmark: 73% of warehouse spend traces to 9% of queries; rewriting that 9% cuts monthly bills 25–40%.',
    seoKeywords: [
      'SQL optimization 2026',
      'BigQuery cost optimization',
      'Snowflake query tuning',
      'warehouse FinOps',
      'dbt incremental models',
      'APPROX_COUNT_DISTINCT',
    ],
  },
  {
    slug: 'churn-prediction-pipeline-skill',
    type: 'skill',
    title: 'End-to-End Churn Prediction Pipeline Builder',
    summary:
      'A skill that scaffolds a full churn-prediction pipeline — feature store, model, evaluation, and SHAP explainability — in dbt + Python.',
    category: 'data-analytics',
    niche: 'Customer Analytics & ML',
    audience: 'Data Scientists & ML Engineers',
    difficulty: 'Expert',
    language: 'English',
    promptContent: `# Skill: Churn Prediction Pipeline Builder

## Skill Definition
\`\`\`yaml
name: churn-prediction-pipeline
version: 2.3.0
model: gpt-5
temperature: 0.2
inputs:
  - warehouse         # bigquery | snowflake | redshift
  - customer_table
  - event_table
  - billing_table
  - churn_definition  # { window_days, event }
  - prediction_horizon # days
outputs:
  - dbt_feature_models
  - training_dataset_sql
  - model_train_py     # XGBoost + Optuna
  - evaluation_report
  - shap_explainer_py
  - inference_sql
\`\`\`

## Behavior

### 1. Feature Engineering (dbt)
Generate dbt models that produce:
- **Recency / Frequency / Monetary** features from [BILLING_TABLE].
- **Engagement features** (DAU/MAU, session count, feature adoption) from [EVENT_TABLE].
- **Tenure & lifecycle** features from [CUSTOMER_TABLE].
- **Derived ratios** (ARPU trend, support ticket rate, usage decay slope).
- All features snapshot at \`as_of_date\` to prevent leakage.

### 2. Labeling
Generate a labeling model using [CHURN_DEFINITION] over [PREDICTION_HORIZON]; emit a binary target per customer per snapshot date.

### 3. Training Dataset
Emit a single SQL that joins features + label; enforce:
- Train/valid/test split by \`customer_id\` (group-aware).
- Time-based holdout for the last 28 days.
- Null handling + class imbalance sampling weights.

### 4. Model Training (Python)
Emit \`train.py\` using:
- XGBoost with Optuna hyperparameter search.
- GroupKFold cross-validation.
- Stratification on plan tier.
- MLflow tracking (experiment + model registry).

### 5. Evaluation Report
Emit a Markdown report with:
- ROC-AUC, PR-AUC, F1, calibration curve.
- Top-20 features by gain.
- Lift table by decile.
- Saved-off baseline (logistic regression) for comparison.

### 6. SHAP Explainer
Emit \`explain.py\` that:
- Computes SHAP per customer.
- Aggregates top 3 churn drivers per account.
- Writes results back to the warehouse for CRM activation.

### 7. Inference SQL
Emit a daily inference SQL that scores all active customers and writes to \`ml.churn_scores\`.

## Quality Gates
- No target leakage (as_of_date strictly before label window).
- PR-AUC ≥ 0.55 on holdout (fail loudly if not).
- Calibration ECE ≤ 0.05.`,
    workflowContent: `# Workflow & Execution

## Prerequisites
- dbt 1.10+ connected to [WAREHOUSE].
- Python 3.12, XGBoost, Optuna, SHAP, MLflow.
- A warehouse with ≥ 6 months of customer, event, and billing history.
- CRM or CS tool (Salesforce, HubSpot, Gainsight) for activation.

## Step-by-Step Execution
1. **Schema Mapping** — Map [CUSTOMER_TABLE], [EVENT_TABLE], [BILLING_TABLE] to the actual warehouse tables; confirm column types.
2. **Skill Invocation** — Run the skill; review the dbt feature models for leakage first.
3. **dbt Build** — \`dbt run\` the feature models; verify row counts and nulls.
4. **Training** — Execute \`train.py\`; track in MLflow; fail the pipeline if PR-AUC < 0.55.
5. **Evaluation Review** — Data scientist reviews the report; tune churn_definition if lift is weak.
6. **Explainability** — Run \`explain.py\` on a 5% sample; validate top drivers with the CS team.
7. **Inference Deploy** — Schedule the inference SQL daily (dbt job or Airflow DAG).
8. **Activation** — Sync top-decile at-risk accounts to the CRM; trigger CS playbooks.
9. **Monitoring** — Weekly drift report (PSI per feature); retrain monthly.

## Required Tools
- GPT-5 (code generation)
- dbt 1.10+ + [WAREHOUSE]
- XGBoost + Optuna + SHAP + MLflow
- Airflow or dbt jobs (scheduling)

## Expected Output
- 8–12 dbt feature models
- training dataset SQL
- \`train.py\`, \`explain.py\`
- Evaluation report (Markdown)
- Daily inference SQL

## Success Metrics
- PR-AUC ≥ 0.55 on 28-day holdout.
- Top-decile captures ≥ 60% of actual churners.
- CS team saves ≥ 18% of flagged at-risk accounts.
- Monthly retraining completes in < 45 minutes.`,
    audienceContent: `# Target Audience & Use Cases

## Who This Is For
Data scientists and ML engineers at B2B SaaS, subscription, and telecom companies where churn is a board-level metric. Best for teams with a modern data stack (dbt + warehouse + MLflow) who need a defensible, explainable churn model in production, not a notebook.

## Real-World Use Cases
1. **B2B SaaS** — A project-management vendor deploys the pipeline, lifting retained-ARR by $2.1M in two quarters by routing SHAP-driven playbooks to CS.
2. **Telecom** — A regional carrier cuts 90-day mobile churn by 14% by intervening on the top-decile at-risk base.
3. **Subscription Media** — A streaming service uses the inference scores to test retention offers, finding a 22% lift with a $5 credit vs. a free month.

## Industries & Niches
- B2B SaaS & subscription
- Telecom & mobile carriers
- Streaming & subscription media
- Health insurance
- EdTech cohorts`,
    tags: ['Churn', 'XGBoost', 'dbt', 'SHAP', 'MLflow'],
    requiredTools: ['GPT-5', 'dbt 1.10', 'XGBoost', 'MLflow'],
    useCases: [
      'Lifting retained-ARR $2.1M with SHAP-driven CS playbooks',
      'Cutting 90-day mobile churn 14% at a regional carrier',
      'A/B testing retention offers using inference scores',
    ],
    trending: false,
    trendingScore: 0,
    featured: false,
    viewCount: 24800,
    downloadCount: 2890,
    rating: 4.8,
    faqQuestion:
      'What is the most common cause of churn-model failure in production?',
    faqAnswer:
      'Target leakage — features computed using data after the prediction point. Prevent it by snapshotting every feature at an \`as_of_date\` strictly before the label window, and validating with group-aware (customer-level) cross-validation.',
    citation:
      'Neptune.ai 2026 survey: 61% of production churn models underperform their holdout AUC due to undetected feature leakage.',
    seoKeywords: [
      'churn prediction 2026',
      'XGBoost churn model',
      'dbt feature store',
      'SHAP explainability',
      'MLflow model registry',
      'customer retention ML',
    ],
  },
  {
    slug: 'nl-to-sql-schema-aware-prompt',
    type: 'prompt',
    title: 'Natural-Language-to-SQL with Schema Awareness',
    summary:
      'Convert business questions into verified, runnable warehouse SQL — with entity resolution, joins, and guardrails baked in.',
    category: 'data-analytics',
    niche: 'NL-to-SQL & Self-Serve Analytics',
    audience: 'Analytics Engineers & BI Leads',
    difficulty: 'Advanced',
    language: 'English',
    promptContent: `# Natural-Language-to-SQL (Schema-Aware)

## ROLE
You are a Senior Analytics Engineer translating business questions into verified, runnable warehouse SQL. You never guess at schema; you ask when uncertain.

## INPUTS
- Question: [QUESTION]
- Warehouse: [BIGQUERY | SNOWFLAKE | REDSHIFT | DATABRICKS]
- Schema (DDL or dbt manifest): [SCHEMA]
- Business glossary: [GLOSSARY]
- Allowed tables (allow-list): [ALLOWED]
- Read-only constraints: [MAX_BYTES] (e.g., 1 TB)

## PROCESS

### 1. Entity Resolution
Map every noun in [QUESTION] to a table/column in [SCHEMA] using [GLOSSARY]. If ambiguous, list candidates and ask the user to disambiguate before writing SQL.

### 2. Intent Classification
Classify the question as one of:
- \`trend\` (time series)
- \`comparison\` (cohort / A vs B)
- \`ranking\` (top-N)
- \`lookup\` (single entity)
- \`distribution\` (histogram / percentile)

### 3. SQL Generation
Produce SQL that:
- Uses only tables in [ALLOWED].
- Joins on documented keys; never invents relationships.
- Applies partition/cluster filters first when a date range is implied.
- Aggregates at the lowest grain needed.
- Adds \`LIMIT\` (default 1,000) on row-returning queries.
- Tags the warehouse in the code fence (\`\`\`bigquery, etc.).

### 4. Self-Verification
Before returning, mentally execute:
- Does each column exist? (cross-check [SCHEMA])
- Will the join fan out? (cardinality check)
- Is the result grain what the question asked?
- Will bytes scanned exceed [MAX_BYTES]? If yes, propose a sampled or aggregated alternative.

### 5. Explanation
Write a 2–4 sentence plain-English explanation of:
- What the query returns.
- Any assumptions made (date ranges, filters, dedup logic).
- Caveats (sample, approximations).

## OUTPUT FORMAT
Return a Markdown response with these labeled sections in order:

- **Intent**: <classification>
- **Assumptions**: bulleted list of inferred assumptions
- **SQL**: a fenced code block tagged with the warehouse (\`\`\`bigquery, \`\`\`snowflake, etc.)
- **Explanation**: 2–4 sentences covering what the query returns, assumptions, and caveats

## CONSTRAINTS
- Never use \`SELECT *\`.
- Never write DDL/DML — read-only.
- If the question can't be answered from [ALLOWED], say so and suggest the missing table.
- If a metric in [QUESTION] isn't in [GLOSSARY], ask for a definition.`,
    workflowContent: `# Workflow & Execution

## Prerequisites
- A documented warehouse schema (DDL exports or dbt \`manifest.json\`).
- A business glossary (dbt exposures, Atlan, or a Markdown file).
- An allow-list of tables safe for self-serve (no PII raw tables).
- A read-only service account with byte-budget quotas.

## Step-by-Step Execution
1. **Schema Snapshot** — Export the DDL (or dbt manifest) for [ALLOWED] tables; include descriptions.
2. **Glossary Sync** — Ensure every commonly asked metric is in [GLOSSARY] with a clear definition.
3. **Prompt Invocation** — Run the master prompt in GPT-5 with structured outputs; review entity resolution first.
4. **Dry Run** — Execute the SQL in dry-run mode (BigQuery \`--dry_run\` or Snowflake \`EXPLAIN\`) to estimate bytes.
5. **Byte-Budget Enforcement** — If bytes > [MAX_BYTES], regenerate with sampling or aggregation.
6. **Result Spot-Check** — Run the query; compare a sample of results against a known dashboard.
7. **Cache & Catalog** — Save verified SQL to a query library (Hex, Mode, or Notion) with the originating question.
8. **Feedback Loop** — Log unanswered questions; expand the glossary or allow-list weekly.

## Required Tools
- GPT-5 (structured outputs)
- BigQuery / Snowflake / Redshift / Databricks
- dbt manifest or Atlan (schema + glossary)
- Hex or Mode (query catalog)

## Expected Output
- Intent classification
- Assumptions list
- Warehouse-tagged SQL (read-only, limited)
- Plain-English explanation
- Dry-run byte estimate

## Success Metrics
- 90% of generated queries run without manual edit.
- Average bytes/query ≤ [MAX_BYTES] × 0.6.
- Self-serve query turnaround < 5 minutes.
- Analyst ticket volume −35% within 60 days.`,
    audienceContent: `# Target Audience & Use Cases

## Who This Is For
Analytics engineers and BI leads at self-serve-driven organizations (product, growth, RevOps) who want to let business stakeholders ask warehouse questions in English without breaking budgets or producing wrong numbers. Especially valuable for teams scaling beyond 3 analysts.

## Real-World Use Cases
1. **Product Analytics** — A B2B SaaS team opens NL-to-SQL to 40 PMs; analyst ad-hoc tickets drop 38% in 60 days.
2. **RevOps** — A sales-ops team lets AE managers ask "ARR by industry, last quarter" questions; median answer time falls from 2 days to 90 seconds.
3. **E-commerce** — A DTC brand enables merchandisers to ask inventory questions, catching a stockout 5 days earlier than the manual report.

## Industries & Niches
- B2B SaaS product analytics
- Revenue operations
- DTC e-commerce
- Health-tech operations
- Fintech self-serve dashboards`,
    tags: ['NL-to-SQL', 'Self-Serve Analytics', 'BigQuery', 'dbt', 'GPT-5'],
    requiredTools: ['GPT-5', 'BigQuery', 'dbt manifest', 'Hex'],
    useCases: [
      'Cutting analyst ad-hoc tickets 38% for 40 PMs',
      'Reducing RevOps answer time from 2 days to 90 seconds',
      'Catching a DTC stockout 5 days earlier via merchant queries',
    ],
    trending: true,
    trendingScore: 84,
    featured: false,
    viewCount: 41200,
    downloadCount: 4730,
    rating: 4.8,
    faqQuestion:
      'How do you prevent hallucinated tables and joins in NL-to-SQL?',
    faqAnswer:
      'Restrict the model to an explicit allow-list, pass the actual DDL or dbt manifest as context, force entity resolution against a business glossary before SQL generation, and require a self-verification pass plus a dry-run byte estimate.',
    citation:
      'Snowflake 2026 State of Data: 68% of NL-to-SQL errors trace to undocumented joins; allow-listing + glossary coverage reduces errors by 54%.',
    seoKeywords: [
      'NL-to-SQL 2026',
      'natural language to SQL',
      'self-serve analytics',
      'GPT-5 SQL',
      'dbt manifest LLM',
      'warehouse query bot',
    ],
  },
  {
    slug: 'realtime-kpi-dashboard-spec-skill',
    type: 'skill',
    title: 'Real-Time KPI Dashboard Spec Generator',
    summary:
      'Convert a business goal into a complete dashboard spec — metrics, SQL, alerts, and refresh cadence — ready to hand to BI.',
    category: 'data-analytics',
    niche: 'BI & Dashboard Engineering',
    audience: 'Analytics Engineers & Product Analysts',
    difficulty: 'Intermediate',
    language: 'English',
    promptContent: `# Skill: Real-Time KPI Dashboard Spec Generator

## Skill Definition
\`\`\`yaml
name: kpi-dashboard-spec
version: 1.9.0
model: claude-4-opus
temperature: 0.25
inputs:
  - business_goal
  - audience             # exec | operator | analyst
  - warehouse
  - refresh_cadence      # realtime | 5m | hourly | daily
  - available_tables
outputs:
  - metric_definitions
  - sql_queries
  - layout_spec
  - alert_rules
  - refresh_plan
\`\`\`

## Behavior

### 1. Metric Decomposition
From [BUSINESS_GOAL], derive 5–8 KPIs. For each:
- Name, formula, unit, direction (higher/lower is better).
- Source table(s) from [AVAILABLE_TABLES].
- Grain (second, minute, hour, day).
- Owner (role, not person).

### 2. SQL Queries
For each KPI, emit a warehouse-tagged SQL that:
- Aggregates to the correct grain.
- Filters out test/internal accounts (document the filter).
- Caps result rows at 5,000 for rendering.
- Uses partition/cluster pruning where applicable.

### 3. Layout Spec
Produce a JSON layout:
\`\`\`json
{
  "title": "...",
  "tiles": [
    { "type": "kpi", "metric": "...", "comparison": "wow" },
    { "type": "timeseries", "metric": "...", "grain": "hour" },
    { "type": "table", "metric": "...", "dimensions": ["..."] }
  ],
  "global_filters": ["date_range", "region"]
}
\`\`\`
Match layout to [AUDIENCE]: exec = 4 large KPIs + 1 trend; operator = KPIs + table + drill; analyst = full tables + raw query access.

### 4. Alert Rules
For each KPI, propose an alert:
- Condition (threshold, anomaly, % change).
- Severity (info / warn / critical).
- Channel (Slack, PagerDuty, email).
- Cooldown window (avoid alert fatigue).

### 5. Refresh Plan
Given [REFRESH_CADENCE], specify:
- Materialization strategy (live query, accelerated table, streaming insert).
- Warehouse sizing.
- Estimated $/day.

## Quality Gates
- Every metric has a documented owner and formula.
- No two tiles show the same metric at conflicting grains.
- Alert thresholds non-trivial (not "alert if > 0").`,
    workflowContent: `# Workflow & Execution

## Prerequisites
- A warehouse (BigQuery, Snowflake, Databricks) with the relevant tables.
- A BI tool (Hex, Mode, Looker, or Apache Superset).
- An alerting channel (Slack, PagerDuty).
- A clear [BUSINESS_GOAL] statement from the sponsor.

## Step-by-Step Execution
1. **Goal Intake** — Capture [BUSINESS_GOAL] as a one-sentence outcome (e.g., "Reduce time-to-first-value for new workspaces to < 24h").
2. **Skill Invocation** — Run the skill in Claude 4 Opus; review the metric list with the sponsor.
3. **SQL Validation** — Run each KPI query; confirm semantics with the data team.
4. **Layout Build** — Implement the layout JSON in the BI tool; sponsor reviews.
5. **Alert Tuning** — Set conservative thresholds first; tune after 7 days of real data.
6. **Refresh Deployment** — Provision the materialization (accelerated table or streaming); monitor $/day.
7. **Sponsor Sign-Off** — Demo the live dashboard; iterate on tiles.
8. **Adoption Tracking** — Log opens via the BI tool; deprecate tiles with < 5 opens/week after 30 days.

## Required Tools
- Claude 4 Opus (spec generation)
- BigQuery / Snowflake / Databricks
- Hex / Mode / Looker / Superset
- Slack + PagerDuty (alerting)

## Expected Output
- 5–8 metric definitions (Markdown)
- Warehouse-tagged SQL per metric
- Layout JSON
- Alert rule list
- Refresh + cost plan

## Success Metrics
- Dashboard live within 5 business days of intake.
- Weekly active viewers ≥ 12 within 30 days.
- Alert false-positive rate < 15%.
- Average load time < 2.5s for the operator view.`,
    audienceContent: `# Target Audience & Use Cases

## Who This Is For
Analytics engineers, product analysts, and RevOps leaders who own KPI dashboards for ops, exec, or product audiences. Best for teams that have burned cycles building dashboards nobody opens — this skill enforces sponsor alignment from day one.

## Real-World Use Cases
1. **Product Ops** — A collaboration SaaS ships a "time-to-first-value" dashboard in 4 days; PMs catch an onboarding regression 11 hours sooner than the weekly report.
2. **RevOps** — A sales-ops team launches a pipeline-velocity dashboard; CRO uses it in the Monday exec standup, replacing three slide decks.
3. **Support Ops** — A health-tech contact center rolls out an SLA dashboard with anomaly alerts, cutting P1 ticket breaches by 28%.

## Industries & Niches
- B2B SaaS product ops
- Revenue operations
- Customer support / contact centers
- E-commerce merchandising
- Fintech operations`,
    tags: ['Dashboards', 'KPI', 'BI', 'Alerts', 'Claude 4 Opus'],
    requiredTools: ['Claude 4 Opus', 'Hex', 'BigQuery', 'Slack'],
    useCases: [
      'Shipping a time-to-first-value dashboard in 4 days',
      'Replacing three exec slide decks with a pipeline-velocity dashboard',
      'Cutting P1 ticket breaches 28% with anomaly alerts',
    ],
    trending: false,
    trendingScore: 0,
    featured: false,
    viewCount: 16800,
    downloadCount: 1940,
    rating: 4.6,
    faqQuestion:
      'What separates a useful KPI dashboard from a dashboard nobody opens?',
    faqAnswer:
      'Sponsor-aligned metric definitions, audience-matched layout (exec vs. operator vs. analyst), non-trivial alert thresholds with cooldowns, < 2.5s load time, and a 30-day deprecation rule for tiles with under 5 weekly opens.',
    citation:
      'ThoughtSpot 2026 BI benchmark: 64% of enterprise dashboards have fewer than 5 weekly viewers; audience-matched layout triples engagement.',
    seoKeywords: [
      'KPI dashboard 2026',
      'dashboard spec',
      'BI best practices',
      'real-time dashboard',
      'alert rules',
      'dashboard adoption',
    ],
  },

  // =========================================================================
  // CATEGORY 4: business-strategy
  // =========================================================================
  {
    slug: 'ai-startup-market-entry-2026-prompt',
    type: 'prompt',
    title: '2026 Market-Entry Strategy for AI Startups',
    summary:
      'A board-ready market-entry strategy prompt covering ICP, GTM motion, regulatory, and 18-month milestone plan.',
    category: 'business-strategy',
    niche: 'GTM & Market Entry',
    audience: 'Founders & Strategy Operators',
    difficulty: 'Advanced',
    language: 'English',
    promptContent: `# 2026 Market-Entry Strategy for AI Startups

## ROLE
You are a former Partner at a Tier-1 VC firm and ex-McKinsey EM. You build market-entry strategies for AI-first startups entering the US, UK, Canada, or Australia in 2026.

## INPUTS
- Product one-liner: [PRODUCT]
- Category: [CATEGORY]   (e.g., vertical SaaS, dev-tools, infra)
- ICP hypothesis: [ICP]
- Geographies: [GEO_LIST]
- Capital raised: [CAPITAL]
- Founders' edge: [EDGE]

## TASKS

### 1. Market Sizing
Produce a TAM/SAM/SOM in USD with:
- Bottom-up sizing (ICP × ACV × penetration).
- Top-down cross-check (analyst report citation required).
- 3-year SOM given [CAPITAL] and [EDGE].

### 2. ICP Refinement
Sharpen [ICP] into 3 prioritized segments. For each:
- Firmographic + technographic pins.
- Pains worth paying for (with the dollar cost of inaction).
- Where they buy (channel preference).
- Wedge use-case (the one problem you solve on day 1).

### 3. Competitive Map
List 5 direct + 3 adjacent competitors. For each:
- Positioning axis (speed vs. depth, self-serve vs. full-service).
- Pricing teardown.
- Vulnerability (what they can't/won't do in 12 months).
- Your defensible angle.

### 4. GTM Motion
Pick a primary motion (PLG, sales-led, partner-led, community-led) with justification, plus a 6-month secondary motion to derisk. Specify:
- Acquisition channels with expected CAC.
- Activation milestone (the "aha" event).
- Expansion triggers.
- Retention loops.

### 5. Regulatory & Trust
For each [GEO_LIST] country, flag:
- Data residency (GDPR, UK GDPR, PIPEDA, APP).
- AI-specific rules (EU AI Act class, US state laws, Australia AI Ethics).
- Industry-specific rules (HIPAA, SOC 2, FSMA).

### 6. 18-Month Milestone Plan
Quarterly milestones across Product, GTM, Team, Capital. End each quarter with a "kill criterion" — the signal to pivot.

## OUTPUT FORMAT
Markdown board memo, ≤ 2,500 words, with one summary table at the top.

## CONSTRAINTS
- Cite every market stat (Source, Year).
- No "we will dominate" rhetoric — every claim must have a number.
- Flag the top 3 risks explicitly.`,
    workflowContent: `# Workflow & Execution

## Prerequisites
- A founder team with a clear [PRODUCT] and [EDGE].
- Access to a market-intel source (CB Insights, PitchBook, Gartner).
- 2–3 reference customer calls completed (or scheduled).
- A board / advisor forum to pressure-test the output.

## Step-by-Step Execution
1. **Inputs Sync** — Fill in [PRODUCT], [ICP], [GEO_LIST], [CAPITAL], [EDGE] in a shared doc.
2. **Prompt Run** — Execute the master prompt in Claude 4 Opus; produce v1 memo.
3. **Market Sizing Validation** — Cross-check bottom-up TAM against 2 analyst reports; reconcile deltas.
4. **ICP Validation Calls** — Run 5 discovery calls per prioritized segment; refine pains + ACV.
5. **Competitive Teardown** — Confirm pricing and vulnerabilities from real sales-rep calls or lost-deal interviews.
6. **GTM Selection** — Pressure-test the primary motion with 3 founders who picked the same motion.
7. **Regulatory Review** — Have outside counsel validate the regulatory flags per geography.
8. **Board Memo Final** — Iterate to ≤ 2,500 words; share with the board 5 days before the meeting.
9. **Quarterly Recalibration** — Re-run the prompt at the end of each quarter with actuals.

## Required Tools
- Claude 4 Opus (strategy reasoning)
- CB Insights / PitchBook (market intel)
- Gong / Zoom (discovery calls)
- Outside counsel (regulatory)

## Expected Output
- Board memo (≤ 2,500 words)
- TAM/SAM/SOM table
- 3 ICP segment profiles
- Competitive teardown
- 18-month milestone plan with kill criteria

## Success Metrics
- Board approves the strategy in a single meeting.
- 80% of Q1 milestones hit on time.
- CAC payback < 12 months by Q3.
- At least 1 kill criterion invoked or explicitly defended.`,
    audienceContent: `# Target Audience & Use Cases

## Who This Is For
Founders, COOs, and strategy operators at pre-seed to Series A AI startups entering English-speaking high-CPC markets in 2026. Best for teams that have a working product but a fuzzy GTM, and need a board-defensible plan in under two weeks.

## Real-World Use Cases
1. **Vertical AI SaaS** — A legal-AI startup uses the memo to pivot from AmLaw-100 (sales-led) to mid-market (PLG) after the Q1 kill criterion triggers; closes 3× more logos in Q2.
2. **Dev-Tools Infra** — An LLM-caching startup enters the UK market with a partner-led motion through a managed-service provider, hitting $480K ARR in 6 months.
3. **Health-AI** — A clinical documentation vendor maps PIPEDA + HIPAA obligations before Canada expansion, avoiding a 4-month compliance delay.

## Industries & Niches
- Vertical AI (legal, health, finance)
- Developer tools & infrastructure
- AI-native B2B SaaS
- Cross-border expansion
- Regulated verticals`,
    tags: ['Market Entry', 'GTM', 'Strategy', 'AI Startups', 'Board Memo'],
    requiredTools: ['Claude 4 Opus', 'CB Insights', 'PitchBook', 'Gong'],
    useCases: [
      'Pivoting a legal-AI startup from sales-led to PLG after a kill criterion',
      'Entering the UK via a partner-led MSP motion at $480K ARR',
      'Mapping PIPEDA + HIPAA before Canada expansion',
    ],
    trending: true,
    trendingScore: 92,
    featured: true,
    viewCount: 47600,
    downloadCount: 5310,
    rating: 4.9,
    faqQuestion:
      'What is the right GTM motion for an AI startup entering a new market in 2026?',
    faqAnswer:
      'Pick a primary motion based on ICP ACV and complexity: PLG for < $2K MRR self-serve, sales-led for > $25K ACV, partner-led when distribution rides a managed-service provider. Always run a 6-month secondary motion to derisk channel concentration.',
    citation:
      'a16z 2026 AI GTM report: 71% of AI startups that hit $10M ARR in 18 months used a hybrid PLG + sales-led motion from day one.',
    seoKeywords: [
      'AI startup GTM 2026',
      'market entry strategy',
      'ICP refinement',
      'AI startup board memo',
      'PLG vs sales-led',
      'vertical AI SaaS',
    ],
  },
  {
    slug: 'series-a-pitch-deck-generator-skill',
    type: 'skill',
    title: 'Series A Pitch Deck Generator for AI SaaS',
    summary:
      'A skill that turns a founder narrative + metrics into a 12-slide YC-style deck with speaker notes and a Q&A appendix.',
    category: 'business-strategy',
    niche: 'Fundraising',
    audience: 'AI Startup Founders',
    difficulty: 'Intermediate',
    language: 'English',
    promptContent: `# Skill: Series A Pitch Deck Generator (AI SaaS)

## Skill Definition
\`\`\`yaml
name: series-a-pitch-deck
version: 2.0.4
model: gpt-5
temperature: 0.4
inputs:
  - founder_narrative    # 200–400 words
  - metrics              # { arr, growth_pct, gross_margin, cac, ltv, runway, burn }
  - icp
  - product_screenshot_urls
  - competitor_list
  - ask                  # { amount, valuation_cap, use_of_funds }
outputs:
  - deck_outline
  - slide_scripts        # 12 slides, each { headline, body, speaker_notes, visual_brief }
  - qa_appendix          # 20 likely investor questions + answers
  - one_pager
\`\`\`

## Behavior

### 1. Deck Outline (YC + a16z hybrid)
Generate 12 slides in this exact order:
1. One-liner
2. Problem
3. Solution (with screenshot)
4. Why now
5. Market size (TAM/SAM/SOM)
6. Product / Demo
7. Traction (metrics chart)
8. Business model & unit economics
9. Go-to-market
10. Competition (2×2 matrix)
11. Team
12. Ask + Use of funds

### 2. Slide Scripts
For each slide, emit:
- **Headline** — ≤ 9 words, opinionated.
- **Body** — 3 bullets max, each ≤ 18 words.
- **Speaker notes** — 60–90 words the founder will actually say.
- **Visual brief** — one sentence describing the chart/image.

### 3. Q&A Appendix
Anticipate 20 investor questions across:
- Market (5), Product (4), Traction (4), Moat (3), Team (2), Capital (2).
For each, write a 2–3 sentence answer with the supporting metric.

### 4. One-Pager
A single-page teaser (300 words) for warm-intro emails: problem, solution, traction, team, ask.

## Quality Gates
- Every traction claim traces to [METRICS].
- No superlatives ("game-changing", "revolutionary").
- Ask slide states [AMOUNT], runway extension, and 3 hiring priorities.
- Competition slide names ≥ 4 real competitors (no "there are no competitors").`,
    workflowContent: `# Workflow & Execution

## Prerequisites
- Founder narrative drafted (200–400 words).
- Verified metrics (ARR, growth, margins, CAC, LTV, runway, burn).
- 2–4 product screenshots hosted at stable URLs.
- A target ask (amount + use of funds).

## Step-by-Step Execution
1. **Inputs Sync** — Paste [FOUNDER_NARRATIVE], [METRICS], [ICP], [SCREENSHOT_URLS], [COMPETITOR_LIST], [ASK] into the prompt.
2. **Skill Invocation** — Run the skill in GPT-5 with structured outputs; produce v1 deck.
3. **Narrative Tension Check** — Founder reads slides 1–4 aloud; ensure the problem → solution → why-now arc lands in under 90 seconds.
4. **Metrics Slide Build** — Generate the traction chart in Figma or Hex; replace the visual brief with the actual chart.
5. **Competition 2×2** — Validate axes with 2 founders not in your category.
6. **Q&A Rehearsal** — Drill the 20 Q&A items with a friendly investor; revise weak answers.
7. **One-Pager Distribution** — Send the one-pager to 10 warm intros; A/B test subject lines.
8. **Iterate per Meeting** — After each partner meeting, log questions that surprised you; add to the appendix.

## Required Tools
- GPT-5 (structured outputs)
- Figma or Pitch (deck design)
- Hex or Mode (traction chart)
- Notion (Q&A log)

## Expected Output
- 12-slide outline
- Per-slide scripts (headline, body, notes, visual brief)
- 20-item Q&A appendix
- 300-word one-pager

## Success Metrics
- Average partner meeting length ≥ 45 minutes (engagement signal).
- 2nd-meeting conversion ≥ 35%.
- Term sheet within 8 weeks of first deck send.
- Q&A appendix covers ≥ 90% of asked questions by week 4.`,
    audienceContent: `# Target Audience & Use Cases

## Who This Is For
AI startup founders raising a $5M–$20M Series A in 2026. Best for technical founders who can build but struggle to compress the narrative into a deck that survives a 30-minute partner meeting.

## Real-World Use Cases
1. **Vertical AI** — A revenue-ops AI startup uses the deck to land a $12M Series A in 7 weeks, with a 41% second-meeting conversion.
2. **Dev-Tools** — An open-source-to-commercial LLM tooling startup closes its round in 5 weeks; partners cite the "why now" slide as the clincher.
3. **Health-AI** — A clinical documentation startup uses the Q&A appendix to ace a tough FDA-focused partner meeting and secure a term sheet the next day.

## Industries & Niches
- Vertical AI SaaS
- Developer tools & infra
- Health-AI
- Fintech AI
- AI-native marketplaces`,
    tags: ['Pitch Deck', 'Series A', 'Fundraising', 'AI Startup', 'Investor Q&A'],
    requiredTools: ['GPT-5', 'Figma', 'Hex', 'Notion'],
    useCases: [
      'Landing a $12M Series A in 7 weeks at 41% 2nd-meeting conversion',
      'Closing an LLM tooling round in 5 weeks on the "why now" slide',
      'Acing an FDA-focused partner meeting with the Q&A appendix',
    ],
    trending: false,
    trendingScore: 0,
    featured: false,
    viewCount: 29400,
    downloadCount: 3460,
    rating: 4.7,
    faqQuestion:
      'What do Series A AI investors look for in a 2026 pitch deck?',
    faqAnswer:
      'A 9-word opinionated headline per slide, traction traced to verified metrics, a defensible "why now" tied to a 2026 shift, a 2×2 competition matrix naming real rivals, and a specific ask with runway extension and 3 hiring priorities.',
    citation:
      'Crunchbase 2026: AI startups that named ≥ 4 competitors on the competition slide closed rounds 22% faster than those that said "no competitors".',
    seoKeywords: [
      'Series A pitch deck 2026',
      'AI startup fundraising',
      'pitch deck generator',
      'YC deck structure',
      'investor Q&A',
      'AI SaaS pitch',
    ],
  },
  {
    slug: 'competitive-moat-analysis-prompt',
    type: 'prompt',
    title: 'Competitive Moat Analysis with Porter + AI',
    summary:
      'A prompt that fuses Porter\'s Five Forces with 2026 AI-era moats (data, model, distribution) to score defensibility.',
    category: 'business-strategy',
    niche: 'Strategy & Competitive Intelligence',
    audience: 'Strategy Operators & VCs',
    difficulty: 'Advanced',
    language: 'English',
    promptContent: `# Competitive Moat Analysis (Porter + AI-Era Moats)

## ROLE
You are a competitive-strategy partner who blends classical Porter frameworks with 2026 AI-era moat theory (data flywheels, model advantage, distribution, switching cost, regulatory capture).

## INPUTS
- Company: [COMPANY]
- Category: [CATEGORY]
- Direct competitors (3–5): [COMPETITORS]
- Differentiation claim: [CLAIM]
- Available data: [DATA_ASSETS]  (proprietary datasets, integrations, etc.)

## TASKS

### 1. Porter Five Forces (Scored)
For each force, score 1–5 (5 = strongest pressure) and write a 2-sentence justification:
- Threat of new entrants
- Bargaining power of suppliers
- Bargaining power of buyers
- Threat of substitutes
- Competitive rivalry

### 2. AI-Era Moat Audit
Score [COMPANY] on 6 moats (0–10 each):
- **Data moat** — proprietary data scale + freshness.
- **Model moat** — fine-tuned weights, evals, inference cost.
- **Distribution moat** — owned channels, partner lock-in.
- **Switching cost moat** — workflow entrenchment, integrations.
- **Network effect moat** — side-side value growth.
- **Regulatory moat** — licenses, certifications, compliance burden.
Justify any score ≥ 7 with a specific asset from [DATA_ASSETS].

### 3. Competitor Moat Map
For each competitor in [COMPETITORS], score the same 6 moats; produce a comparison table.

### 4. Moat Decay Risk
List the top 3 forces that could erode [COMPANY]'s moat in 24 months (e.g., "foundation-model commoditization", "data exhaustion"). For each, propose a counter-move.

### 5. Moat-Building Roadmap
3 initiatives (6, 12, 24 months) that widen the strongest moat and shore up the weakest. Each initiative: owner, investment, leading indicator.

## OUTPUT FORMAT
Markdown memo, ≤ 1,800 words, with two tables (Five Forces, Moat Audit) and a 2×2 competitor map.

## CONSTRAINTS
- No moat score ≥ 7 without a specific asset citation.
- Distinguish "moat" (defensible) from "feature" (replicable).
- Score defensibility, not current traction.`,
    workflowContent: `# Workflow & Execution

## Prerequisites
- A strategy operator or founder with deep category knowledge.
- Public competitor data (10-Ks, S-1s, product pages, pricing pages).
- Internal data on [DATA_ASSETS] (size, freshness, uniqueness).
- A 90-minute window with a strategy partner to pressure-test scores.

## Step-by-Step Execution
1. **Inputs Sync** — Fill [COMPANY], [CATEGORY], [COMPETITORS], [CLAIM], [DATA_ASSETS].
2. **Prompt Run** — Execute the master prompt in Claude 4 Opus; produce v1 memo.
3. **Five Forces Calibration** — Compare scores against a published industry analysis (Bain, BCG, or IBISWorld); reconcile deltas.
4. **Moat Audit Workshop** — Founder + strategy operator score the 6 moats live; resolve any 2+ point gap from v1.
5. **Competitor Calls** — Run 3 lost-deal or win-deal interviews to validate the competitor moat scores.
6. **Decay Risk Review** — Pressure-test the top 3 decay forces with a technical advisor (e.g., "will foundation models commoditize this in 18 months?").
7. **Roadmap Lock** — Assign owners and budgets to the 3 moat-building initiatives.
8. **Quarterly Re-Score** — Re-run every quarter; track moat-score deltas on a single dashboard.

## Required Tools
- Claude 4 Opus (strategy reasoning)
- Bain / IBISWorld / BCG reports (industry baseline)
- Gong / Zoom (win-loss interviews)
- Notion or Coda (moat dashboard)

## Expected Output
- Five Forces table (scored + justified)
- Moat Audit table (6 scores + citations)
- Competitor moat comparison
- 3 decay risks + counter-moves
- 3 moat-building initiatives (6/12/24 months)

## Success Metrics
- Strategy partner signs off on every score ≥ 7.
- At least 1 moat score increases by ≥ 2 points within 12 months.
- No moat decays by > 2 points without a documented counter-move.
- Roadmap initiatives 80% on-track at each quarterly review.`,
    audienceContent: `# Target Audience & Use Cases

## Who This Is For
Strategy operators, founders, and VC associates evaluating or steering AI-native companies where classical moats don't fully explain defensibility. Best for teams that need a board-defensible moat narrative, not a vibes-based "we have a moat" claim.

## Real-World Use Cases
1. **Vertical AI** — A legal-AI startup discovers its data moat (1.2M annotated contracts) is its only defensible asset; reallocates 40% of R&D to data acquisition.
2. **Dev-Tools** — An LLM-evals startup realizes foundation-model commoditization will erode its model moat in 18 months; pivots to a switching-cost moat via CI integrations.
3. **Fintech AI** — A credit-underwriting startup uses the analysis to convince its board that its regulatory moat (state lending licenses) justifies a 2× revenue multiple vs. peers.

## Industries & Niches
- Vertical AI (legal, health, finance)
- AI dev-tools & infrastructure
- Fintech underwriting
- AI-native marketplaces
- Enterprise AI platforms`,
    tags: ['Moat', 'Strategy', 'Porter', 'Competitive Intel', 'VC'],
    requiredTools: ['Claude 4 Opus', 'Bain Reports', 'IBISWorld', 'Gong'],
    useCases: [
      'Reallocating 40% of R&D to data acquisition after a moat audit',
      'Pivoting from a model moat to a switching-cost moat pre-commoditization',
      'Justifying a 2× revenue multiple via a regulatory moat',
    ],
    trending: true,
    trendingScore: 81,
    featured: false,
    viewCount: 22100,
    downloadCount: 2480,
    rating: 4.7,
    faqQuestion:
      'What are the strongest moats for AI startups in 2026?',
    faqAnswer:
      'Data moats (proprietary, fresh, hard-to-replicate datasets), switching-cost moats (workflow + integration entrenchment), and regulatory moats (licenses + compliance burden). Model moats decay fastest as foundation models commoditize.',
    citation:
      'Bessemer 2026 State of the Cloud: AI startups with a verified data moat command 1.9× revenue multiples vs. peers without one.',
    seoKeywords: [
      'competitive moat 2026',
      'AI startup defensibility',
      'Porter five forces AI',
      'data moat',
      'model moat decay',
      'moat analysis',
    ],
  },
  {
    slug: 'unit-economics-ltv-cac-skill',
    type: 'skill',
    title: 'Unit Economics & LTV/CAC Deep-Dive Skill',
    summary:
      'A skill that builds a defensible LTV/CAC model from raw billing + CRM data, with cohort curves and sensitivity tables.',
    category: 'business-strategy',
    niche: 'Financial Modeling',
    audience: 'Founders & Finance Operators',
    difficulty: 'Advanced',
    language: 'English',
    promptContent: `# Skill: Unit Economics & LTV/CAC Deep-Dive

## Skill Definition
\`\`\`yaml
name: unit-economics-deep-dive
version: 1.7.2
model: claude-4-opus
temperature: 0.2
inputs:
  - billing_export        # CSV/SQL: customer_id, period, mrr, churn_flag
  - crm_export            # CSV/SQL: customer_id, cac, channel, plan, icp_segment
  - gross_margin_pct
  - discount_rate
  - horizon_months        # typically 36 or 60
outputs:
  - cohort_ltv_table
  - ltv_cac_ratio
  - payback_curve
  - sensitivity_table
  - narrative_summary
\`\`\`

## Behavior

### 1. Cohort Construction
Group customers by:
- Acquisition month (cohorts).
- ICP segment (from [CRM_EXPORT]).
- Channel.
Build a retention curve (monthly survival) per cohort.

### 2. LTV Calculation
Compute LTV three ways:
- **Simple**: ARPU × gross margin × (1 / monthly_churn).
- **Cohort**: actual MRR decayed × gross margin, summed to [HORIZON_MONTHS], discounted at [DISCOUNT_RATE].
- **Expansion-adjusted**: include net revenue retention from upgrades.

### 3. CAC Calculation
Compute CAC by channel and ICP segment from [CRM_EXPORT]:
- Direct CAC (paid + sales spend / new logos).
- Fully-loaded CAC (include overhead allocation).

### 4. LTV/CAC Ratio
Report:
- Per cohort, per segment, per channel.
- Flag any segment with LTV/CAC < 3 (action required).
- Flag any channel with payback > 18 months.

### 5. Sensitivity Table
Sensitivity of LTV/CAC to:
- Gross margin ±5pp.
- Churn ±20% relative.
- CAC ±15%.
Identify the breakpoint where LTV/CAC drops below 3.

### 6. Narrative Summary
3-paragraph memo for the board:
- Where the business is healthy.
- Where it's leaking (segment/channel).
- The single highest-leverage fix (with $ impact).

## Quality Gates
- Cohort survival curves must be monotonic non-increasing (audit anomalies).
- CAC includes sales salaries (fully-loaded) by default.
- No LTV extrapolation beyond [HORIZON_MONTHS] without a stated assumption.`,
    workflowContent: `# Workflow & Execution

## Prerequisites
- ≥ 18 months of billing history (Stripe, Chargebee, or warehouse).
- CRM data with channel + CAC per customer (HubSpot, Salesforce).
- Verified gross margin % from finance.
- A discount rate aligned with the board (typically 10–15%).

## Step-by-Step Execution
1. **Data Exports** — Pull [BILLING_EXPORT] and [CRM_EXPORT] from the warehouse; validate customer_id matching.
2. **Skill Invocation** — Run the skill in Claude 4 Opus; produce the cohort tables.
3. **Survival Audit** — Plot cohort retention curves; investigate any non-monotonic segments (often a billing bug).
4. **Finance Review** — Confirm gross margin % and discount rate with the CFO.
5. **Channel Deep-Dive** — For channels with LTV/CAC < 3, pull the marketing spend detail; identify the leak.
6. **Sensitivity Workshop** — Walk the leadership team through the sensitivity table; pick the 2 variables to defend in the board meeting.
7. **Narrative Polish** — Edit the memo to 3 paragraphs; replace every "we believe" with a number.
8. **Board Pre-Read** — Send 5 days before the board meeting; bring the cohort charts as appendix.
9. **Quarterly Refresh** — Re-run on the last day of each quarter; track LTV/CAC trend.

## Required Tools
- Claude 4 Opus (modeling + narrative)
- Snowflake / BigQuery (billing + CRM exports)
- Hex or Mode (cohort visualization)
- Excel / Google Sheets (sensitivity tables)

## Expected Output
- Cohort LTV table (segment × channel)
- LTV/CAC ratio per segment + channel
- Payback curve
- Sensitivity table (3 variables)
- 3-paragraph board memo

## Success Metrics
- LTV/CAC ≥ 3 for the blended business within 12 months.
- Payback < 14 months for new channels.
- No cohort shows non-monotonic survival after data audit.
- Board approves the unit-economics narrative in a single read.`,
    audienceContent: `# Target Audience & Use Cases

## Who This Is For
Founders, CFOs, and finance operators at SaaS startups (Series A–C) who need a defensible LTV/CAC story for the board, an audit, or a fundraise. Best for teams whose existing LTV is a single spreadsheet cell with no cohort or channel breakdown.

## Real-World Use Cases
1. **B2B SaaS** — A workflow-automation vendor discovers its SMB segment has LTV/CAC of 1.8; pauses paid acquisition there and reallocates to mid-market, lifting blended LTV/CAC from 2.4 to 3.6 in two quarters.
2. **PLG Dev-Tools** — An open-source-to-commercial startup proves a 6-month payback on its PLG motion, justifying a $9M Series A at a premium multiple.
3. **Vertical Fintech** — A banking-as-a-service startup uses the sensitivity table to defend its margin assumptions to a Tier-1 bank acquirer during diligence.

## Industries & Niches
- B2B SaaS (all stages)
- PLG dev-tools
- Vertical fintech
- Health-tech subscription
- EdTech cohorts`,
    tags: ['Unit Economics', 'LTV/CAC', 'Cohort Analysis', 'SaaS Finance', 'Board Memo'],
    requiredTools: ['Claude 4 Opus', 'Snowflake', 'Hex', 'Google Sheets'],
    useCases: [
      'Lifting blended LTV/CAC from 2.4 to 3.6 by reallocating SMB spend',
      'Justifying a $9M Series A on a 6-month PLG payback',
      'Defending margin assumptions in a bank-acquirer diligence',
    ],
    trending: false,
    trendingScore: 0,
    featured: false,
    viewCount: 18900,
    downloadCount: 2210,
    rating: 4.7,
    faqQuestion:
      'What is a healthy LTV/CAC ratio for a B2B SaaS startup in 2026?',
    faqAnswer:
      'A blended LTV/CAC of 3 or higher is considered healthy, with payback under 14 months. Segment-level ratios matter more than the blended number — any channel below 3 should be paused or restructured.',
    citation:
      'Bessemer 2026 SaaS benchmarks: top-quartile B2B SaaS maintain LTV/CAC ≥ 4.5 with payback ≤ 12 months.',
    seoKeywords: [
      'LTV CAC 2026',
      'unit economics SaaS',
      'cohort analysis',
      'payback period',
      'SaaS financial model',
      'net revenue retention',
    ],
  },

  // =========================================================================
  // CATEGORY 5: design-creative
  // =========================================================================
  {
    slug: 'brand-identity-system-prompt',
    type: 'prompt',
    title: 'Brand Identity System from a Single Insight',
    summary:
      'Turn a one-sentence brand insight into a complete identity system: voice, palette, type, motion principles, and guardrails.',
    category: 'design-creative',
    niche: 'Brand Design',
    audience: 'Brand Designers & Creative Directors',
    difficulty: 'Advanced',
    language: 'English',
    promptContent: `# Brand Identity System from a Single Insight

## ROLE
You are a Creative Director with 15 years building identity systems for tech, fintech, and consumer brands (Pentagram, MetaLab, Koto pedigree). You design systems, not logos.

## INPUTS
- Brand insight (one sentence): [INSIGHT]
- Category: [CATEGORY]
- Audience: [AUDIENCE]
- Reference brands (3): [REFERENCES]
- Brand temperature: [WARM | COOL | NEUTRAL]
- Where it lives: [DIGITAL | PRINT | BOTH]

## TASKS

### 1. Brand Voice
Define the voice in 4 dimensions (Warmth × Formality × Humor × Authority), each on a 1–10 scale. Then write:
- 3 voice principles (each ≤ 12 words).
- 5 "we say / we don't say" pairs.
- One 40-word boilerplate paragraph.

### 2. Color System
Produce a palette of:
- 1 primary (with HEX, RGB, OKLCH).
- 2 supporting accents.
- 4 neutrals (bg, surface, border, text).
- 2 semantic colors (success, warning).
For each, write the design rationale (one sentence tying back to [INSIGHT]).
Include WCAG AA contrast pairs.

### 3. Type System
Pick two typefaces (display + body) that fit [BRAND_TEMPERATURE] and [WHERE_IT_LIVES]. Specify:
- Type scale (1.250 major third, 8 steps).
- Weight ramp.
- Line-height + letter-spacing rules per scale step.

### 4. Logo Principles
Write 5 principles for the logo system (not the logo itself). Cover:
- Construction grid.
- Min size + clear space.
- Motion behavior (if digital).
- Misuse examples (described).

### 5. Motion Principles
If [WHERE_IT_LIVES] includes digital, define 3 motion principles:
- Easing curve family (with cubic-bezier values).
- Duration ramp (3 steps).
- Choreography rule (e.g., "stagger ≤ 80ms").

### 6. Guardrails
List 8 "do / don't" pairs covering voice, color, type, motion, and imagery.

## OUTPUT FORMAT
Markdown design memo, ≤ 1,800 words, with one summary table at the top mapping [INSIGHT] → each system decision.

## CONSTRAINTS
- Every decision traces back to [INSIGHT] — no orphan choices.
- Color contrast ≥ 4.5:1 for body text.
- Type scale ratios must be consistent (single ratio family).`,
    workflowContent: `# Workflow & Execution

## Prerequisites
- A locked [INSIGHT] sentence (workshopped with stakeholders).
- 3 reference brands the team admires.
- A Figma or Penpot workspace.
- Access to a font licensing budget (or open-source alternatives).

## Step-by-Step Execution
1. **Insight Lock** — Stress-test [INSIGHT] with 5 stakeholders; refine until it's one sentence everyone repeats verbatim.
2. **Prompt Run** — Execute the master prompt in Claude 4 Opus; produce v1 memo.
3. **Voice Validation** — Read the "we say / we don't say" pairs aloud with the founder; refine until they feel native.
4. **Color Build** — Implement the palette in Figma as variables; test on 5 real screens.
5. **Type License** — Confirm font licenses for [WHERE_IT_LIVES]; swap to open-source (e.g., Inter, Geist, Fraunces) if budget-constrained.
6. **Logo Workshop** — Hand the logo principles to a designer; review 3 directions against the principles.
7. **Motion Prototype** — Prototype the 3 motion principles in Framer or code; validate duration ramp on real components.
8. **Guardrail Distribution** — Publish the memo as \`BRAND.md\` in the design repo; onboard every new designer with it.
9. **Quarterly Audit** — Re-run the audit; flag drift in voice or color usage.

## Required Tools
- Claude 4 Opus (strategy + system design)
- Figma or Penpot (variables + components)
- Framer (motion prototype)
- Fontshare or Google Fonts (open-source licensing)

## Expected Output
- Brand voice memo (4D + principles + pairs + boilerplate)
- Color system (8 swatches + rationale + contrast pairs)
- Type system (scale + weights + spacing rules)
- Logo principles (5)
- Motion principles (3)
- Guardrails (8 do/don't pairs)

## Success Metrics
- Stakeholders repeat [INSIGHT] verbatim in 4 of 5 interviews.
- WCAG AA contrast passes on 100% of body text pairs.
- New-designer onboarding to "first correct asset" < 2 days.
- Voice drift incidents < 1 per quarter.`,
    audienceContent: `# Target Audience & Use Cases

## Who This Is For
Brand designers, creative directors, and founders building (or rebuilding) a brand identity for an AI-era company. Best for teams that have a strong insight but no system — and don't want a 60-page PDF that nobody reads.

## Real-World Use Cases
1. **AI Infrastructure Startup** — A vector-DB company builds its identity around the insight "structure for the unstructured"; the system ships in 3 weeks and survives a rebrand 18 months later.
2. **Consumer Fintech** — A teen-banking app defines warmth + humor dimensions explicitly, tripling Gen-Z recall in brand-lift studies.
3. **B2B SaaS Rebrand** — A workflow vendor uses the guardrails to onboard 14 product designers in 2 days, eliminating the "every screen looks different" problem.

## Industries & Niches
- AI infrastructure & dev-tools
- Consumer fintech
- B2B SaaS
- Health & wellness consumer brands
- Climate & sustainability`,
    tags: ['Brand Identity', 'Design System', 'Voice', 'Color', 'Typography'],
    requiredTools: ['Claude 4 Opus', 'Figma', 'Framer', 'Fontshare'],
    useCases: [
      'Shipping a vector-DB brand system in 3 weeks',
      'Tripling Gen-Z recall via warmth + humor dimensions',
      'Onboarding 14 designers to a unified system in 2 days',
    ],
    trending: true,
    trendingScore: 85,
    featured: true,
    viewCount: 36800,
    downloadCount: 4120,
    rating: 4.8,
    faqQuestion:
      'How do you build a brand identity system from a single insight?',
    faqAnswer:
      'Lock a one-sentence insight, then force every system decision — voice, palette, type, motion, guardrails — to trace back to it. Publish a single design memo, not a 60-page PDF, so the system survives designer turnover.',
    citation:
      'Koto 2026 brand report: brands with a single documented insight ship identity systems 2.4× faster and drift 60% less over 18 months.',
    seoKeywords: [
      'brand identity system 2026',
      'brand design prompt',
      'design system memo',
      'brand voice framework',
      'color system WCAG',
      'typography scale',
    ],
  },
  {
    slug: 'figma-component-docs-skill',
    type: 'skill',
    title: 'Figma Component Library Auto-Documentation',
    summary:
      'A skill that ingests a Figma library and emits developer-ready docs: props, variants, usage do/don\'ts, and code snippets.',
    category: 'design-creative',
    niche: 'Design Systems',
    audience: 'Design Systems Engineers',
    difficulty: 'Intermediate',
    language: 'English',
    promptContent: `# Skill: Figma Component Library Auto-Documentation

## Skill Definition
\`\`\`yaml
name: figma-component-docs
version: 1.5.1
model: gpt-5
temperature: 0.2
inputs:
  - figma_library_url
  - components_json        # exported via Figma REST API
  - design_tokens_json     # style-dictionary or tokens.json
  - framework              # react | vue | svelte | swiftui
outputs:
  - component_docs_md      # one file per component
  - usage_gallery_json
  - tokens_reference_md
  - changelog_seed
\`\`\`

## Behavior

### 1. Component Inventory
Parse [COMPONENTS_JSON]; group into:
- **Primitives** (Button, Input, Icon).
- **Composites** (Form, Card, Modal).
- **Patterns** (DataTable, CommandPalette).
For each, extract name, variant props, default values, and constraints.

### 2. Documentation Page (per component)
Generate Markdown with these H2s:
- **Overview** — 2 sentences on purpose + when to use.
- **Anatomy** — bulleted list of sub-elements.
- **Props table** — name, type, default, allowed values, description.
- **Variants** — grid of variants (names + when to use each).
- **Do / Don't** — 3 pairs with rationale.
- **Accessibility** — keyboard, ARIA, focus, color-contrast notes.
- **Code snippet** — [FRAMEWORK] tag matching the codebase (e.g., \`\`\`tsx).
- **Related components** — internal links.

### 3. Usage Gallery
Emit a JSON manifest of real usage screenshots (from the Figma file) with captions, for the marketing site gallery.

### 4. Tokens Reference
From [DESIGN_TOKENS_JSON], produce a Markdown reference grouping tokens by category (color, space, radius, shadow, motion). Include the CSS variable name + value.

### 5. Changelog Seed
Produce a v1.0.0 changelog entry summarizing all components + tokens shipped at launch.

## Quality Gates
- Every prop in the table has an explicit type and default.
- Every component has ≥ 1 Do and ≥ 1 Don't.
- Accessibility section covers keyboard + ARIA + contrast for every interactive component.
- Code snippets are valid in [FRAMEWORK].`,
    workflowContent: `# Workflow & Execution

## Prerequisites
- A Figma library with consistent component naming + variant structure.
- Figma REST API access (personal access token).
- Design tokens exported (style-dictionary or Tokens Studio JSON).
- A docs site (Storybook, Ladle, or Next.js + Nextra).

## Step-by-Step Execution
1. **Figma Export** — Pull the library via Figma REST API; save [COMPONENTS_JSON].
2. **Tokens Export** — Export [DESIGN_TOKENS_JSON] from Tokens Studio or style-dictionary.
3. **Skill Invocation** — Run the skill in GPT-5 with structured outputs; produce one Markdown file per component.
4. **Code Snippet Validation** — Compile each snippet in a sandbox; fix any type errors.
5. **Accessibility Audit** — Run axe-core on each interactive component; merge findings into the Accessibility section.
6. **Do/Don't Curation** — Designer reviews the Do/Don't pairs; adds screenshots from the Figma file.
7. **Docs Site Build** — Drop the Markdown into the docs site; wire the usage gallery JSON to the marketing page.
8. **Changelog Publish** — Tag v1.0.0; announce in the design-systems Slack.
9. **CI Hook** — Re-run the skill on every Figma library publish; auto-PR doc updates.

## Required Tools
- GPT-5 (structured outputs)
- Figma REST API
- Storybook or Ladle (docs hosting)
- axe-core (accessibility audit)

## Expected Output
- 1 Markdown file per component
- Usage gallery JSON
- Tokens reference Markdown
- v1.0.0 changelog

## Success Metrics
- 100% of interactive components have accessibility sections.
- Docs coverage ≥ 95% of library components.
- Designer + engineer onboarding time to "first correct usage" < 1 day.
- Doc-drift incidents (code ≠ Figma) < 1 per month.`,
    audienceContent: `# Target Audience & Use Cases

## Who This Is For
Design systems engineers, DS leads, and front-end platform teams at SaaS companies (50–500 engineers) maintaining a Figma-to-code component library. Best for teams whose docs are perpetually out of sync with the Figma file.

## Real-World Use Cases
1. **Enterprise SaaS** — A 400-engineer org auto-docs 180 components; onboarding time for new designers drops from 2 weeks to 2 days.
2. **Fintech** — A banking app pairs the docs with axe-core audits, passing an internal accessibility audit with zero findings on shared components.
3. **Dev-Tools Startup** — An open-source UI kit publishes the auto-generated docs as its marketing site, tripling component adoption in 60 days.

## Industries & Niches
- Enterprise SaaS
- Fintech & banking apps
- Open-source UI kits
- Health-tech platforms
- E-commerce design systems`,
    tags: ['Figma', 'Design System', 'Documentation', 'Accessibility', 'Storybook'],
    requiredTools: ['GPT-5', 'Figma REST API', 'Storybook', 'axe-core'],
    useCases: [
      'Auto-documenting 180 components for a 400-engineer org',
      'Passing an internal a11y audit with zero findings on shared components',
      'Publishing auto-docs as the marketing site for an open-source UI kit',
    ],
    trending: false,
    trendingScore: 0,
    featured: false,
    viewCount: 14200,
    downloadCount: 1680,
    rating: 4.6,
    faqQuestion:
      'How do you keep Figma component docs in sync with code?',
    faqAnswer:
      'Auto-generate docs from the Figma REST API + design tokens on every library publish, validate code snippets in a sandbox, run axe-core for accessibility, and wire the generator into CI so doc updates ship as PRs.',
    citation:
      'Figma 2026 Design Systems report: 78% of teams cite doc drift as their #1 design-system pain; auto-generation cuts drift incidents by 70%.',
    seoKeywords: [
      'Figma component docs 2026',
      'design system documentation',
      'Storybook auto docs',
      'design tokens reference',
      'component library CI',
      'accessibility docs',
    ],
  },
  {
    slug: 'wireframe-from-pm-brief-prompt',
    type: 'prompt',
    title: 'Mid-Fidelity Wireframe from a PM Brief',
    summary:
      'Convert a product brief into a complete mid-fidelity wireframe spec — layout, components, states, and edge cases.',
    category: 'design-creative',
    niche: 'Product Design',
    audience: 'Product Designers & Design Leads',
    difficulty: 'Intermediate',
    language: 'English',
    promptContent: `# Mid-Fidelity Wireframe from a PM Brief

## ROLE
You are a Senior Product Designer who ships mid-fidelity wireframes that engineers can build from without follow-up questions. You think in states, edge cases, and component reuse.

## INPUTS
- PM brief: [BRIEF]
- Surface: [WEB | IOS | ANDROID | DESKTOP]
- Existing design system: [DESIGN_SYSTEM_URL]
- Constraints: [CONSTRAINTS]  (e.g., "must work offline", "≤ 3 taps")
- Success metric: [METRIC]

## TASKS

### 1. Screen Inventory
List every screen the feature requires (entry, primary, success, error, empty, loading). Group by user journey.

### 2. Layout per Screen
For each screen, describe:
- Layout grid (columns, gutter, max-width).
- Primary content blocks (top to bottom, left to right).
- Component mapping to [DESIGN_SYSTEM_URL] (e.g., "Button → \`primary-lg\`").
- Sticky / fixed regions.

### 3. Interaction States
For every interactive element, specify:
- Default, hover, focus, active, disabled, loading, error.
- Keyboard equivalent (web) or gesture (mobile).

### 4. Edge Cases
List 5–8 edge cases per primary screen:
- Empty state (no data).
- Error state (network failure).
- Long content (overflow).
- Permission denied.
- Slow connection (skeleton + delay).
For each, sketch the wireframe in ASCII or describe in 2 sentences.

### 5. Component Reuse Map
Identify which existing design-system components can be reused vs. which need a new variant. New variants get a one-line spec.

### 6. Success-Metric Hook
Specify where [METRIC] is instrumented (event name, trigger, properties) so the wireframe ships with analytics built in.

## OUTPUT FORMAT
Markdown spec ready to paste into Figma or a docs page. Use H2 per screen; include ASCII sketches where helpful.

## CONSTRAINTS
- Every interactive element has all 7 states.
- No new component where an existing one fits.
- Mobile-first if [SURFACE] includes mobile.
- Honor [CONSTRAINTS] explicitly in every screen description.`,
    workflowContent: `# Workflow & Execution

## Prerequisites
- A signed-off PM brief with a clear success metric.
- A documented design system (Figma library or Storybook URL).
- A Figma or Penpot workspace.
- A 60-minute review slot with engineering.

## Step-by-Step Execution
1. **Brief Intake** — Read [BRIEF]; flag any ambiguity to the PM before designing.
2. **Prompt Run** — Execute the master prompt in Claude 4 Opus; produce v1 spec.
3. **Screen Inventory Review** — PM confirms the screen list; add or remove before wireframing.
4. **Figma Build** — Build the screens in Figma using [DESIGN_SYSTEM_URL] components only.
5. **States QA** — Designer walks every interactive element through its 7 states; add missing states.
6. **Edge Case Coverage** — Engineering reviews edge cases; add any they anticipate.
7. **Analytics Wiring** — Engineer confirms the [METRIC] instrumentation plan; add events to the spec.
8. **Handoff** — Paste the spec + Figma link into the ticket; schedule a 30-min walkthrough.
9. **Build Follow-Up** — Designer reviews the PR; verifies state + edge-case coverage in code.

## Required Tools
- Claude 4 Opus (spec generation)
- Figma or Penpot (wireframe build)
- Storybook (component verification)
- Linear or Jira (ticketing)

## Expected Output
- Screen inventory (grouped by journey)
- Per-screen layout spec
- 7-state interaction matrix
- 5–8 edge cases per primary screen
- Component reuse map
- Analytics instrumentation plan

## Success Metrics
- Engineer follow-up questions during build < 5 per feature.
- 100% of interactive elements ship with all 7 states.
- Edge-case coverage ≥ 90% of production defects avoided.
- [METRIC] instrumented at launch with no post-launch additions.`,
    audienceContent: `# Target Audience & Use Cases

## Who This Is For
Product designers and design leads at SaaS companies shipping features weekly. Best for teams that want to compress the wireframe-to-build cycle without losing state and edge-case rigor — particularly valuable for distributed teams that can't rely on whiteboard sessions.

## Real-World Use Cases
1. **B2B SaaS** — A workflow vendor ships a new automation builder in 3 weeks (vs. 6 previously) because engineers had zero follow-up questions during build.
2. **Health-Tech** — A clinical platform uses the edge-case checklist to ship a patient-onboarding flow with zero P1 defects post-launch.
3. **Fintech Mobile** — A neobank launches a card-freeze flow with all 7 states per element, cutting support tickets about "the button looks weird" by 47%.

## Industries & Niches
- B2B SaaS workflow tools
- Health-tech clinical flows
- Fintech mobile apps
- E-commerce checkout
- EdTech learner flows`,
    tags: ['Wireframing', 'Product Design', 'Figma', 'Edge Cases', 'UX States'],
    requiredTools: ['Claude 4 Opus', 'Figma', 'Storybook', 'Linear'],
    useCases: [
      'Shipping an automation builder in 3 weeks with zero build questions',
      'Launching a patient-onboarding flow with zero P1 defects',
      'Cutting "button looks weird" support tickets 47% on a card-freeze flow',
    ],
    trending: false,
    trendingScore: 0,
    featured: false,
    viewCount: 11600,
    downloadCount: 1320,
    rating: 4.6,
    faqQuestion:
      'What states must every interactive wireframe element specify?',
    faqAnswer:
      'Default, hover, focus, active, disabled, loading, and error. Skipping any of these ships an incomplete spec and forces engineers to make ad-hoc design decisions during build.',
    citation:
      'Nielsen Norman 2026: 62% of post-launch UI bugs trace to unspecified element states in the design spec.',
    seoKeywords: [
      'wireframe spec 2026',
      'mid-fidelity wireframe',
      'product design states',
      'edge case UX',
      'Figma wireframing',
      'design handoff',
    ],
  },
  {
    slug: 'motion-design-framer-spec-skill',
    type: 'skill',
    title: 'Motion Design Spec with Framer-Motion Tokens',
    summary:
      'A skill that translates motion intent into a developer-ready spec: easing families, duration ramp, choreography, and framer-motion code.',
    category: 'design-creative',
    niche: 'Motion Design',
    audience: 'Motion Designers & Front-End Engineers',
    difficulty: 'Advanced',
    language: 'English',
    promptContent: `# Skill: Motion Design Spec (Framer-Motion Tokens)

## Skill Definition
\`\`\`yaml
name: motion-design-spec
version: 2.2.0
model: gpt-5
temperature: 0.25
inputs:
  - product_context
  - brand_temperature     # warm | cool | neutral | energetic
  - surfaces              # [web, ios, android]
  - accessibility_mode    # full | reduced-motion-only
outputs:
  - motion_tokens_json
  - easing_families_md
  - duration_ramp_md
  - choreography_rules_md
  - framer_motion_snippets_ts
  - reduced_motion_fallback_md
\`\`\`

## Behavior

### 1. Motion Tokens
Emit a \`tokens.json\` (style-dictionary compatible) with:
- \`motion.duration.{fast,base,slow,slower}\` (ms).
- \`motion.easing.{standard, emphasized, exit, spring}\` (cubic-bezier or spring config).
- \`motion.stagger.{tight, base, loose}\` (ms).
- \`motion.distance.{inline, panel, page}\` (px).

### 2. Easing Families
Define 3 easing families tuned to [BRAND_TEMPERATURE]:
- **Standard** —日常 transitions (cards, modals).
- **Emphasized** — hero moments (page reveals, feature unlocks).
- **Exit** — dismissals (always faster than entrance).
Each family gets a cubic-bezier + a one-line usage rule.

### 3. Duration Ramp
A 4-step ramp (fast/base/slow/slower) with:
- ms value.
- Use cases per step.
- Hard cap: no transition > 600ms except page reveals.

### 4. Choreography Rules
5 rules covering:
- Stagger direction (parent → child).
- Max stagger duration (≤ 240ms total).
- Enter vs exit asymmetry (exits 30% faster).
- Overlap (no two concurrent anims on the same axis).
- Scroll-triggered reveals (intersection ratio threshold).

### 5. Framer-Motion Snippets
Emit TypeScript snippets for the 5 most common patterns:
- Modal enter/exit.
- List stagger.
- Page transition.
- Hover lift.
- Drag-release spring.
Each snippet uses the tokens from step 1 (no hardcoded values).

### 6. Reduced-Motion Fallback
For every pattern, define the reduced-motion behavior (instant or opacity-only) and the CSS \`@media (prefers-reduced-motion)\` rule.

## Quality Gates
- No hardcoded durations or easings in snippets — only tokens.
- Every pattern has a reduced-motion fallback.
- All cubic-beziers avoid jank (control points within 0–1).`,
    workflowContent: `# Workflow & Execution

## Prerequisites
- A React 19 + Next.js 16 codebase with framer-motion installed.
- A brand voice doc (or the brand identity system memo).
- A motion-capable Figma file or Framer prototype for reference.
- A reduced-motion test device (iOS Settings → Reduce Motion).

## Step-by-Step Execution
1. **Context Sync** — Fill [PRODUCT_CONTEXT], [BRAND_TEMPERATURE], [SURFACES], [ACCESSIBILITY_MODE].
2. **Skill Invocation** — Run the skill in GPT-5; produce tokens + spec.
3. **Token Build** — Convert \`tokens.json\` to CSS variables via style-dictionary; commit to the design-tokens package.
4. **Framer-Motion Integration** — Drop the snippets into a shared \`<Motion />\` primitives file; export typed variants.
5. **Prototype Validation** — Build a Framer prototype using the same tokens; compare feel vs. the production snippets.
6. **Reduced-Motion Audit** — Toggle \`prefers-reduced-motion\` on iOS + macOS; confirm every pattern degrades gracefully.
7. **Component Migration** — Replace hardcoded motion values across the codebase with the new tokens; ship behind a feature flag.
8. **Motion Review** — Designer + engineer review the live result; tune easing control points if needed.
9. **Quarterly Revisit** — Re-run on new surfaces (e.g., Android expansion).

## Required Tools
- GPT-5 (structured outputs)
- style-dictionary (token pipeline)
- Framer (prototype)
- framer-motion + React 19

## Expected Output
- \`tokens.json\` (duration, easing, stagger, distance)
- Easing families memo
- Duration ramp memo
- Choreography rules (5)
- 5 framer-motion TypeScript snippets
- Reduced-motion fallback rules

## Success Metrics
- 0 hardcoded motion values in production code post-migration.
- 100% of patterns degrade gracefully under \`prefers-reduced-motion\`.
- Perceived page-load speed (Chrome Lighthouse) +8 points.
- Designer-engineer motion-review time −50%.`,
    audienceContent: `# Target Audience & Use Cases

## Who This Is For
Motion designers and front-end engineers at product-led SaaS and consumer apps who want a single source of truth for motion that survives designer turnover and scales across web + mobile. Best for teams where every new feature invents a new easing curve.

## Real-World Use Cases
1. **AI Infrastructure SaaS** — A vector-DB console ships a unified motion system in 2 weeks, lifting perceived performance scores 8 points on Lighthouse.
2. **Consumer Fintech** — A teen-banking app implements reduced-motion fallbacks across 40 screens, passing an internal accessibility audit with zero motion-related findings.
3. **Health-Tech** — A telemedicine app migrates 60 hardcoded transitions to tokens, cutting designer-engineer motion-review time in half.

## Industries & Niches
- AI infrastructure dashboards
- Consumer fintech
- Health-tech & telemedicine
- E-commerce checkout
- EdTech learning surfaces`,
    tags: ['Motion Design', 'Framer Motion', 'Design Tokens', 'Accessibility', 'React 19'],
    requiredTools: ['GPT-5', 'framer-motion', 'style-dictionary', 'React 19'],
    useCases: [
      'Lifting Lighthouse scores 8 points with a unified motion system',
      'Passing an a11y audit with zero motion-related findings on 40 screens',
      'Cutting motion-review time 50% by migrating to tokens',
    ],
    trending: false,
    trendingScore: 0,
    featured: false,
    viewCount: 13900,
    downloadCount: 1740,
    rating: 4.7,
    faqQuestion:
      'How do you scale motion design across a product without drift?',
    faqAnswer:
      'Define motion tokens (duration, easing, stagger, distance) in a style-dictionary package, force all framer-motion snippets to reference tokens — never hardcoded values — and ship a reduced-motion fallback for every pattern.',
    citation:
      'Smashing 2026 Motion Survey: 69% of motion drift traces to hardcoded easings; token-based motion systems cut drift 64%.',
    seoKeywords: [
      'motion design 2026',
      'framer-motion tokens',
      'design tokens motion',
      'reduced motion accessibility',
      'React 19 animation',
      'style-dictionary motion',
    ],
  },

  // =========================================================================
  // CATEGORY 6: sales-growth
  // =========================================================================
  {
    slug: 'cold-outbound-saas-founders-prompt',
    type: 'prompt',
    title: 'Cold Outbound Sequence for SaaS Founders',
    summary:
      'A 6-touch cold outbound sequence engineered for 2026 deliverability, reply rates > 4%, and a positive sender reputation.',
    category: 'sales-growth',
    niche: 'Outbound Sales',
    audience: 'Founders & SDR Leaders',
    difficulty: 'Advanced',
    language: 'English',
    promptContent: `# Cold Outbound Sequence for SaaS Founders (2026)

## ROLE
You are a VP of Sales with 10 years building outbound engines at PLG and sales-led SaaS. You write sequences that get replies — without burning sender reputation.

## INPUTS
- Product: [PRODUCT]
- ICP firmographics: [ICP]
- Trigger event: [TRIGGER]  (funding, hiring, product launch, etc.)
- Sender persona: [SENDER]  (founder, AE, CS lead)
- Goal: [GOAL]  (booked call / pilot signup / content download)
- Sending volume: [VOLUME_PER_DAY]

## TASKS

### 1. Deliverability Preflight
List the technical prerequisites the sender must complete before sending:
- SPF, DKIM, DMARC (reject policy).
- A secondary domain for outbound (not the primary).
- Google Postmaster Tools ≥ 99% IP reputation.
- Warmup: ramp 20 → [VOLUME_PER_DAY] over 14 days.

### 2. Sequence Architecture (6 touches, 14 business days)
| Day | Channel   | Intent                     |
|-----|-----------|----------------------------|
| 1   | Email 1   | Pattern-interrupt + insight |
| 3   | Email 2   | Triggered value             |
| 5   | LinkedIn  | Soft touch, no pitch       |
| 8   | Email 3   | Case study (1-line proof)  |
| 11  | Phone     | 30-sec voicemail           |
| 14  | Email 4   | Breakup email              |

### 3. Email Copy (per touch)
For each email, write:
- Subject (≤ 5 words, lowercase, no spam triggers).
- Preview text (≤ 60 chars).
- Body (≤ 90 words; 1 question; 1 CTA).
- Personalization tokens (≥ 2 per email) from [TRIGGER] + [ICP].
- Plain-text only (no HTML, no images, no tracking pixel).

### 4. LinkedIn Touch
Write the connection request (≤ 50 words) and the follow-up DM if accepted (≤ 80 words). No pitch in the connection request.

### 5. Phone Voicemail Script
30-second voicemail: name, company, the [TRIGGER]-tied insight, callback number. Read aloud at 150 WPM.

### 6. Breakup Email
The day-14 breakup (≤ 70 words): acknowledge silence, 1-line value restatement, "should I close your file?" sign-off.

### 7. Tracking & Compliance
Specify:
- CAN-SPAM unsubscribe + physical address (US).
- CASL consent handling (Canada).
- GDPR legitimate-interest documentation (UK/EU).
- Cadence platform (Smartlead, Instantly, Apollo).

## OUTPUT FORMAT
Markdown sequence doc with the architecture table at the top, then per-touch scripts. End with the tracking & compliance section.

## CONSTRAINTS
- No links in cold emails (deliverability).
- No superlatives ("game-changing").
- Personalization tokens flagged with {{double_braces}}.
- Reply rate target ≥ 4%; positive-reply rate ≥ 1.2%.`,
    workflowContent: `# Workflow & Execution

## Prerequisites
- A secondary outbound domain with SPF/DKIM/DMARC (reject policy).
- Google Workspace mailboxes (2–5 per sender) warmed for 14 days.
- A cadence tool (Smartlead, Instantly, or Apollo).
- Verified ICP leads with [TRIGGER] data (ZoomInfo, Apollo, Ocean.io).

## Step-by-Step Execution
1. **Deliverability Preflight** — Complete every item in Task 1; verify with mail-tester.com (score 10/10).
2. **Lead List Build** — Pull 500–1,000 ICP leads with [TRIGGER] enrichment; verify emails with ZeroBounce.
3. **Sequence Loading** — Paste the per-touch scripts into the cadence tool; map {{tokens}} to lead fields.
4. **Pilot Send** — Send to 50 leads; measure open rate (target ≥ 55%) and reply rate (target ≥ 4%).
5. **Iterate** — If open rate < 55%, fix deliverability. If reply rate < 4%, rewrite subject + first 2 lines.
6. **Scale** — Ramp to [VOLUME_PER_DAY] per mailbox; rotate mailboxes every 250 sends.
7. **Reply Handling** — Auto-route replies to Slack within 5 minutes; respond within 1 business hour.
8. **Weekly Cleanup** — Suppress unsubscribes, hard bounces, and booked-meeting leads; refresh the list weekly.
9. **Compliance Audit** — Quarterly verify CAN-SPAM/CASL/GDPR compliance; document consent for every lead.

## Required Tools
- Claude 4 Opus (sequence writing)
- Smartlead or Instantly (cadence)
- ZoomInfo or Apollo (lead data)
- ZeroBounce (email verification)

## Expected Output
- Deliverability preflight checklist
- 6-touch sequence architecture
- 4 email scripts + LinkedIn touch + voicemail + breakup
- Compliance + tracking spec

## Success Metrics
- Open rate ≥ 55%.
- Reply rate ≥ 4%; positive-reply ≥ 1.2%.
- Meetings booked per 1,000 sends ≥ 8.
- Sender reputation ≥ 99% (Postmaster Tools).
- Zero spam complaints > 0.1%.`,
    audienceContent: `# Target Audience & Use Cases

## Who This Is For
Founders, SDR leaders, and RevOps operators at B2B SaaS companies ($1M–$20M ARR) who need a defensible outbound motion that doesn't torch sender reputation. Best for teams selling into [ICP] where the trigger event is well-defined (funding, hiring, product launch).

## Real-World Use Cases
1. **Vertical AI** — A legal-AI startup books 18 demos in 30 days from 1,200 sends to AmLaw-200 litigation heads, using a litigation-filing trigger.
2. **Dev-Tools** — An LLM-observability vendor hits a 6.2% reply rate targeting engineering directors after a Series B raise, citing the funding in the first line.
3. **Fintech** — A spend-management startup books 40 meetings in 60 days with US SMB CFOs, using a QuickBooks integration trigger.

## Industries & Niches
- Vertical AI (legal, health, finance)
- Developer tools
- Fintech spend management
- HR-tech
- Cybersecurity`,
    tags: ['Outbound', 'Cold Email', 'Deliverability', 'SDR', 'Sales Sequence'],
    requiredTools: ['Claude 4 Opus', 'Smartlead', 'ZoomInfo', 'ZeroBounce'],
    useCases: [
      'Booking 18 legal-AI demos in 30 days from 1,200 sends',
      'Hitting 6.2% reply on engineering directors post-Series B',
      'Booking 40 meetings in 60 days with US SMB CFOs',
    ],
    trending: false,
    trendingScore: 0,
    featured: false,
    viewCount: 31700,
    downloadCount: 3920,
    rating: 4.8,
    faqQuestion:
      'What is a healthy reply rate for cold outbound in 2026?',
    faqAnswer:
      'A reply rate of 4%+ and a positive-reply rate of 1.2%+ are healthy, with open rates ≥ 55%. Anything below signals a deliverability or targeting problem — fix SPF/DKIM/DMARC and the trigger-event relevance before rewriting copy.',
    citation:
      'Smartlead 2026 benchmark: cold sequences with a trigger-event first line reply 2.4× higher than generic ICP-only sequences.',
    seoKeywords: [
      'cold outbound 2026',
      'cold email sequence',
      'deliverability SaaS',
      'SDR sequence',
      'reply rate benchmark',
      'CASL GDPR cold email',
    ],
  },
  {
    slug: 'icp-enrichment-lead-scoring-skill',
    type: 'skill',
    title: 'ICP Enrichment & Lead Scoring Engine',
    summary:
      'A skill that enriches raw leads with firmographic + technographic signals and scores them against your ICP fit model.',
    category: 'sales-growth',
    niche: 'RevOps & Lead Scoring',
    audience: 'RevOps & Marketing Ops',
    difficulty: 'Advanced',
    language: 'English',
    promptContent: `# Skill: ICP Enrichment & Lead Scoring Engine

## Skill Definition
\`\`\`yaml
name: icp-enrichment-scoring
version: 2.4.1
model: gpt-5
temperature: 0.2
inputs:
  - lead_records          # [{ email, company_domain, name, source }]
  - icp_definition        # firmographic + technographic + intent
  - enrichment_sources    # [clearbit, Apollo, Ocean.io, LinkedIn]
  - fit_threshold         # 0–100
  - intent_signals        # [website_visit, hiring, funding]
outputs:
  - enriched_leads_json
  - fit_score_per_lead
  - routing_recommendation
  - weekly_icp_drift_report
\`\`\`

## Behavior

### 1. Enrichment
For each lead in [LEAD_RECORDS], pull from [ENRICHMENT_SOURCES]:
- Firmographics: industry, employee_count, revenue_band, geography, HQ.
- Technographics: stack (CRM, warehouse, dev-tools), hiring signals.
- Intent: website visits (from your reverse-IP), funding events, hiring velocity.
- Contact: verified email, phone (opt-in only), seniority, title.

### 2. Fit Scoring
Compute a 0–100 ICP fit score using a weighted model:
\`\`\`
fit = 35 * industry_match
    + 20 * employee_count_match
    + 15 * technographic_match
    + 15 * geography_match
    + 15 * intent_signal_strength
\`\`\`
All weights tunable in [ICP_DEFINITION]. Score ≥ [FIT_THRESHOLD] is "Sales-Ready".

### 3. Routing
Per lead, emit a routing recommendation:
- Score ≥ 85 → direct to AE (same-day SLA).
- Score 70–84 → SDR nurture sequence.
- Score 55–69 → marketing nurture.
- Score < 55 → suppress (do not contact).

### 4. ICP Drift Report (weekly)
Aggregate scores by source + segment; flag:
- Sources producing < 30% sales-ready leads (cut or renegotiate).
- Segments where fit is dropping (ICP drift; surface to GTM leadership).
- Intent signals with the highest conversion correlation.

## Quality Gates
- Every lead has a verified email or is suppressed.
- Fit score weights sum to 100.
- Intent signals are time-bounded (≤ 30 days).
- No PII logged in plaintext beyond the enrichment window.`,
    workflowContent: `# Workflow & Execution

## Prerequisites
- A CRM with lead records (HubSpot, Salesforce).
- Enrichment tool subscriptions (Clearbit, Apollo, Ocean.io).
- A reverse-IP tool (6sense, RB2B, or Clearbit Reveal) for intent.
- A data warehouse for scoring history (Snowflake, BigQuery).

## Step-by-Step Execution
1. **ICP Definition Lock** — Document [ICP_DEFINITION] with weighted attributes; sign off with Sales + Marketing.
2. **Lead Pull** — Export last-30-day leads from the CRM; de-duplicate on domain + email.
3. **Skill Invocation** — Run the skill in GPT-5 with structured outputs; enrich in batches of 200.
4. **Score Validation** — Sample 50 scored leads; have Sales review fit scores; tune weights if disagreement > 20%.
5. **Routing Deploy** — Wire routing recommendations to HubSpot/Salesforce workflows; SLA timers per tier.
6. **Drift Report Cadence** — Schedule the weekly ICP drift report in Looker or Hex; review with GTM leadership every Monday.
7. **Source Pruning** — Cut or renegotiate any source producing < 30% sales-ready leads for 3 consecutive weeks.
8. **Quarterly Retune** — Re-fit the scoring model against actual win data each quarter.

## Required Tools
- GPT-5 (enrichment + scoring)
- Clearbit / Apollo / Ocean.io (enrichment)
- 6sense or RB2B (intent)
- Snowflake or BigQuery (scoring history)

## Expected Output
- Enriched lead JSON
- Fit score (0–100) per lead
- Routing recommendation per lead
- Weekly ICP drift report

## Success Metrics
- ≥ 60% of enriched leads have a fit score.
- Sales-ready lead conversion (MQL → SQL) ≥ 22%.
- Source pruning decisions made within 3 weeks of drift signal.
- ICP fit score correlates with win rate at r ≥ 0.4.`,
    audienceContent: `# Target Audience & Use Cases

## Who This Is For
RevOps and marketing-ops leaders at B2B SaaS companies spending > $50K/month on lead generation who need to route the right leads to Sales same-day and prune wasteful sources. Best for teams drowning in leads with no defensible fit model.

## Real-World Use Cases
1. **Vertical AI** — A sales-AI startup cuts 3 underperforming lead sources within 6 weeks, lifting sales-ready conversion from 9% to 24%.
2. **Dev-Tools** — An infra vendor routes score-85+ leads directly to AEs with a same-day SLA, cutting time-to-first-touch from 26 to 4 hours.
3. **Fintech** — A banking-platform vendor uses the weekly drift report to spot a mid-market segment drift before it costs a quarter of pipeline.

## Industries & Niches
- Vertical AI SaaS
- Developer tools & infra
- Fintech & banking platforms
- Cybersecurity
- HR-tech`,
    tags: ['ICP', 'Lead Scoring', 'RevOps', 'Enrichment', 'GTM'],
    requiredTools: ['GPT-5', 'Clearbit', 'Apollo', '6sense'],
    useCases: [
      'Cutting 3 lead sources and lifting sales-ready conversion 9% → 24%',
      'Cutting time-to-first-touch from 26 to 4 hours via score-based routing',
      'Spotting mid-market segment drift before it costs a quarter of pipeline',
    ],
    trending: true,
    trendingScore: 86,
    featured: false,
    viewCount: 28400,
    downloadCount: 3180,
    rating: 4.7,
    faqQuestion:
      'How do you build an ICP fit score that Sales actually trusts?',
    faqAnswer:
      'Use a weighted model (industry 35, employees 20, technographic 15, geography 15, intent 15), validate scores with Sales on a 50-lead sample, route by tier with SLAs, and re-fit quarterly against actual win data so the score correlates with win rate (r ≥ 0.4).',
    citation:
      'Gong 2026 RevOps report: routed leads with a fit score ≥ 85 convert 3.1× higher than unscored inbound.',
    seoKeywords: [
      'ICP scoring 2026',
      'lead scoring model',
      'RevOps automation',
      'lead enrichment',
      'intent signals',
      'sales-ready lead',
    ],
  },
  {
    slug: 'sales-page-conversion-copywriter-prompt',
    type: 'prompt',
    title: 'High-Converting Sales Page Copywriter',
    summary:
      'A conversion-copy prompt that produces a long-form sales page using proven frameworks (PAS, JTBD, risk-reversal) tuned for 2026.',
    category: 'sales-growth',
    niche: 'Conversion Copywriting',
    audience: 'Growth Marketers & Copywriters',
    difficulty: 'Advanced',
    language: 'English',
    promptContent: `# High-Converting Sales Page Copywriter (2026)

## ROLE
You are a senior conversion copywriter trained in PAS, Jobs-to-be-Done, risk-reversal, and the 2026 anti-AI-tell school. You write pages that convert, not pages that sound "professional".

## INPUTS
- Product: [PRODUCT]
- Price: [PRICE]
- ICP pain: [PAIN]
- Unique mechanism: [MECHANISM]
- Proof assets: [PROOF]   (case studies, testimonials, metrics)
- Risk reversal: [GUARANTEE]
- Goal: [GOAL]   (purchase / book call / start trial)

## TASKS

### 1. Above-the-Fold (≤ 90 words)
- Pre-headline (1 line, audience callout).
- Headline (≤ 12 words, outcome-driven, no jargon).
- Sub-headline (≤ 22 words, mechanism + specificity).
- CTA (≤ 4 words, action verb).
- Trust strip (3 logos or "Trusted by N+ [audience]").

### 2. Problem Agitation (PAS, ≤ 220 words)
- Open with the [PAIN] in the prospect's own words (use a verbatim quote if available).
- Agitate the cost of inaction (dollars, time, status).
- Pivot to the [MECHANISM] as the missing piece.

### 3. Solution Reveal (JTBD, ≤ 260 words)
- Frame the product as the hire for a specific job.
- List 3 functional + 2 emotional outcomes.
- Tie each outcome to a [PROOF] asset (metric + customer name).

### 4. Mechanism Section
Explain [MECHANISM] in 3 numbered steps. Each step:
- One outcome sentence.
- One "how it works" sentence (≤ 18 words).
- One proof point (metric or quote).

### 5. Social Proof Block
Curate [PROOF] into:
- 3 testimonials with full name + title + company + headshot.
- 1 mini case study (4 sentences, metric-led).
- A logo wall (≥ 6 logos).

### 6. Pricing & Risk Reversal
- Present [PRICE] with anchor (was/now or vs. alternative).
- Add [GUARANTEE] in plain language (≤ 40 words).
- Address the top 3 objections in a Q&A block.

### 7. Final CTA
Repeat the above-the-fold CTA with a 1-sentence urgency hook (loss-aversion, not false scarcity).

## OUTPUT FORMAT
Single Markdown sales page, ≤ 1,400 words, with H2 per section and CTA buttons marked \`[CTA: ...]\`.

## CONSTRAINTS
- No AI-tells ("unlock", "seamless", "elevate", "dive into").
- No unsubstantiated superlatives.
- Reading level Grade 7–9.
- CTA appears ≥ 3 times.
- Every claim in [PROOF] block traces to a real asset.`,
    workflowContent: `# Workflow & Execution

## Prerequisites
- A locked [PAIN] in the prospect's own words (from 5+ discovery calls).
- 3+ verified [PROOF] assets (testimonials with permission, case study metrics).
- A working pricing page + checkout.
- A/B testing tool (GrowthBook, VWO, or Optimizely).

## Step-by-Step Execution
1. **Inputs Sync** — Fill [PRODUCT], [PRICE], [PAIN], [MECHANISM], [PROOF], [GUARANTEE], [GOAL].
2. **Prompt Run** — Execute the master prompt in Claude 4 Opus; produce v1 sales page.
3. **Pain Validation** — Read the Problem Agitation aloud to 3 ICP prospects; rewrite if they don't wince.
4. **Proof Verification** — Confirm every testimonial + metric is real and approved for use.
5. **Page Build** — Implement the Markdown in Webflow, Next.js, or Framer; wire CTA buttons.
6. **A/B Launch** — Test v1 against the control at 50/50 for 14 days or 1,000 conversions.
7. **Heatmap + Session Review** — Watch 20 session replays; identify drop-off sections.
8. **Iterate** — Rewrite the lowest-performing section every 2 weeks; re-test.
9. **Quarterly Refresh** — Update [PROOF] with new case studies; refresh the urgency hook.

## Required Tools
- Claude 4 Opus (copywriting)
- Webflow / Next.js / Framer (page build)
- GrowthBook or VWO (A/B testing)
- Hotjar or Microsoft Clarity (session replay)

## Expected Output
- ≤ 1,400-word Markdown sales page
- 7 sections with H2s
- ≥ 3 CTA placements
- Pricing + risk-reversal block
- 3-testimonial proof section

## Success Metrics
- Conversion rate lift ≥ 20% vs. control.
- Average time-on-page ≥ 2:30.
- Scroll depth ≥ 80% on 40% of sessions.
- A/B winning variant ships within 14 days.`,
    audienceContent: `# Target Audience & Use Cases

## Who This Is For
Growth marketers, copywriters, and founders at DTC, B2B SaaS, and creator-economy businesses who own a sales page and need a defensible conversion lift without hiring a $15K direct-response copywriter. Best for teams with traffic but flat conversion.

## Real-World Use Cases
1. **B2B SaaS** — A workflow-automation vendor lifts sales-page conversion 38% by replacing feature lists with a PAS + JTBD rewrite.
2. **DTC Supplement** — A nootropics brand adds a risk-reversal + objection Q&A block, cutting refund rate 22% while lifting conversion 17%.
3. **Creator Course** — A coding-bootcamp creator doubles sales-page conversion by leading with a verbatim student-pain quote and a 3-step mechanism.

## Industries & Niches
- B2B SaaS workflow tools
- DTC health & supplements
- Creator-led courses
- Fintech consumer apps
- EdTech bootcamps`,
    tags: ['Copywriting', 'Conversion', 'Sales Page', 'PAS', 'JTBD'],
    requiredTools: ['Claude 4 Opus', 'Webflow', 'GrowthBook', 'Hotjar'],
    useCases: [
      'Lifting sales-page conversion 38% via PAS + JTBD rewrite',
      'Cutting refund rate 22% while lifting conversion 17% via risk reversal',
      'Doubling course sales-page conversion with a verbatim pain quote',
    ],
    trending: false,
    trendingScore: 0,
    featured: false,
    viewCount: 26300,
    downloadCount: 3040,
    rating: 4.7,
    faqQuestion:
      'What is the highest-leverage section of a sales page in 2026?',
    faqAnswer:
      'Above-the-fold. A 90-word opening with an outcome-driven headline, a mechanism-specific sub-headline, and a 4-word CTA determines 60–70% of conversion; everything below the fold is supporting evidence for that first impression.',
    citation:
      'CXL 2026 conversion report: above-the-fold rewrites lift sales-page conversion 28% on average, vs. 7% for below-the-fold changes.',
    seoKeywords: [
      'sales page copywriting 2026',
      'conversion copywriting',
      'PAS framework',
      'JTBD copy',
      'risk reversal marketing',
      'A/B testing sales page',
    ],
  },
  {
    slug: 'retention-email-lifecycle-skill',
    type: 'skill',
    title: 'Retention Email Lifecycle Builder',
    summary:
      'A skill that designs and writes a 12-email lifecycle retention program with triggers, segmentation, and revenue tracking.',
    category: 'sales-growth',
    niche: 'Lifecycle & Retention',
    audience: 'Lifecycle Marketers & CRM Leads',
    difficulty: 'Advanced',
    language: 'English',
    promptContent: `# Skill: Retention Email Lifecycle Builder

## Skill Definition
\`\`\`yaml
name: retention-email-lifecycle
version: 1.8.3
model: gpt-5
temperature: 0.3
inputs:
  - product
  - audience_segments   # [{ name, behavior, goal }]
  - lifecycle_stages    # activation | adoption | expansion | winback
  - tone
  - sending_platform    # customer.io | braze | hubspot | klaviyo
outputs:
  - lifecycle_map
  - email_scripts        # 12 emails with subject, preview, body
  - trigger_rules
  - segmentation_logic
  - revenue_attribution_plan
\`\`\`

## Behavior

### 1. Lifecycle Map
Map 12 emails across 4 stages:
- **Activation (3 emails)** — day 0, day 1, day 3.
- **Adoption (3 emails)** — day 7, day 14, day 30.
- **Expansion (3 emails)** — day 45, day 60, day 90.
- **Winback (3 emails)** — at churn-risk signal + day 3 + day 10.

For each email specify: trigger, segment, goal, primary CTA.

### 2. Email Scripts (per email)
- Subject (≤ 7 words, lowercase, no spam triggers).
- Preview text (≤ 70 chars).
- Body (≤ 180 words, 1 CTA, ≥ 1 personalization token).
- Plain-text alternative.
- Plain-text first (HTML as enhancement, never required).

### 3. Trigger Rules
For each email, define the entry condition:
- Event-based (e.g., \`workspace_created\`, \`first_workflow_run\`, \`login_streak_7\`).
- Time-based (e.g., "30 days since last active session").
- Segment-based (e.g., \`plan = free AND seats > 1\`).
- Exit condition (when to suppress).

### 4. Segmentation Logic
Emit a JSON ruleset:
\`\`\`json
{
  "segment": "...",
  "include": [{ "event": "...", "within_days": 7 }],
  "exclude": [{ "event": "...", "within_days": 14 }]
}
\`\`\`

### 5. Revenue Attribution Plan
Specify how each email is attributed:
- UTM parameters (source/medium/campaign/content).
- Conversion event (e.g., \`subscription_started\`).
- Lookback window (7 days post-open, 3 days post-click).
- Incrementality test plan (holdout group 10%).

## Quality Gates
- Every email has a single, measurable goal.
- No email sends to a user in an exit condition.
- Winback emails suppress after 2 hard bounces.
- Personalization tokens have fallback text.`,
    workflowContent: `# Workflow & Execution

## Prerequisites
- A sending platform (Customer.io, Braze, HubSpot, or Klaviyo).
- Product analytics events wired to the sending platform (Segment, Rudderstack).
- A revenue attribution model (warehouse or platform-native).
- A deliverability baseline (≥ 98% inbox rate at Gmail).

## Step-by-Step Execution
1. **Segment Lock** — Define [AUDIENCE_SEGMENTS] with Sales + CS; agree on the activation, adoption, expansion, winback goals.
2. **Skill Invocation** — Run the skill in GPT-5; produce the lifecycle map + 12 scripts.
3. **Event Audit** — Confirm every trigger event is actually instrumented in the warehouse.
4. **Copy Review** — Lifecycle marketer reads every email aloud; cut anything that sounds "marketing".
5. **Deliverability Check** — Run each email through mail-tester.com (≥ 9/10).
6. **Soft Launch** — Send to 10% of each segment; measure open + click + conversion.
7. **Full Rollout** — Ramp to 100% over 7 days; monitor spam complaints (< 0.1%).
8. **Attribution Wiring** — Wire UTMs + conversion events; build the dashboard in Hex or Looker.
9. **Monthly Iteration** — Kill any email with < 2% unique CTR; replace with a new test variant.

## Required Tools
- GPT-5 (script writing)
- Customer.io / Braze / HubSpot / Klaviyo
- Segment or Rudderstack (event pipe)
- Hex or Looker (attribution dashboard)

## Expected Output
- Lifecycle map (12 emails × 4 stages)
- 12 email scripts (subject, preview, body, plain-text)
- Trigger rules per email
- Segmentation JSON ruleset
- Revenue attribution plan

## Success Metrics
- Lifecycle-driven revenue ≥ 18% of total MRR within 90 days.
- Open rate ≥ 45%; CTR ≥ 4%.
- Winback reactivation rate ≥ 12%.
- Unsubscribe rate < 0.3% per send.
- Incrementality lift ≥ 15% (vs. 10% holdout).`,
    audienceContent: `# Target Audience & Use Cases

## Who This Is For
Lifecycle marketers and CRM leads at B2B SaaS, DTC, and subscription businesses with 10K+ contacts who need a retention engine — not a one-off campaign. Best for teams with product analytics events already wired but no coordinated retention motion.

## Real-World Use Cases
1. **B2B SaaS** — A workflow-automation vendor drives 22% of net-new MRR from its lifecycle program within 90 days, attributing $480K incremental ARR.
2. **DTC Subscription** — A coffee subscription brand lifts winback reactivation from 4% to 13% with the 3-email winback sequence.
3. **EdTech** — A coding bootcamp improves 30-day activation by 31% with a tightened day-0/day-1/day-3 activation series.

## Industries & Niches
- B2B SaaS workflow tools
- DTC subscription
- EdTech cohorts
- Fintech consumer apps
- Health & wellness subscription`,
    tags: ['Lifecycle', 'Email Marketing', 'Retention', 'CRM', 'Winback'],
    requiredTools: ['GPT-5', 'Customer.io', 'Segment', 'Looker'],
    useCases: [
      'Driving 22% of net-new MRR from lifecycle in 90 days',
      'Lifting DTC subscription winback reactivation from 4% to 13%',
      'Improving EdTech 30-day activation 31% with a tightened series',
    ],
    trending: false,
    trendingScore: 0,
    featured: false,
    viewCount: 19800,
    downloadCount: 2360,
    rating: 4.7,
    faqQuestion:
      'What is a healthy open rate for a B2B SaaS lifecycle email in 2026?',
    faqAnswer:
      'A 45%+ open rate and 4%+ CTR are healthy in 2026, with unsubscribe < 0.3% per send. Anything below signals a deliverability or relevance problem — audit SPF/DKIM/DMARC and re-validate the trigger before rewriting copy.',
    citation:
      'Customer.io 2026 benchmark: lifecycle programs with event-based triggers drive 3.2× the revenue of time-based-only programs.',
    seoKeywords: [
      'lifecycle email 2026',
      'retention email program',
      'B2B SaaS lifecycle',
      'winback email',
      'email segmentation',
      'revenue attribution email',
    ],
  },

  // =========================================================================
  // CATEGORY 7: education-research
  // =========================================================================
  {
    slug: 'literature-review-synthesizer-prompt',
    type: 'prompt',
    title: 'Literature Review Synthesizer for PhDs',
    summary:
      'Turn 30+ papers into a structured lit review with thematic synthesis, gap analysis, and citation-ready paragraphs.',
    category: 'education-research',
    niche: 'Academic Research',
    audience: 'PhD Researchers & Academics',
    difficulty: 'Expert',
    language: 'English',
    promptContent: `# Literature Review Synthesizer (PhD-Grade)

## ROLE
You are a senior postdoc with 8 years of experience synthesizing literature across CS, social science, and life-science domains. You write reviews that get past peer reviewers on the first pass.

## INPUTS
- Research question: [RQ]
- Discipline: [DISCIPLINE]
- Papers (full text or abstracts): [PAPERS]
- Citation style: [STYLE]  (APA 7 / Chicago / IEEE / Vancouver)
- Target length: [WORDS]
- Output venue: [JOURNAL | THESIS | GRANT]

## TASKS

### 1. Paper Triage
Classify each paper in [PAPERS] as:
- **Anchor** — directly answers [RQ]; cite heavily.
- **Supporting** — partial overlap; cite for specific claims.
- **Contextual** — background only; cite once if at all.
- **Out of scope** — exclude.
Emit a triage table with one-line rationale per paper.

### 2. Thematic Synthesis
Identify 4–6 themes that organize the anchor + supporting papers. For each theme:
- Theme name (≤ 6 words).
- 2–3 sentence synthesis (what the field agrees on).
- 1–2 sentence tension (where the field disagrees).
- Key citations (3–5) in [STYLE].

### 3. Chronological Arc
Write a 200-word chronological narrative showing how the field evolved to [RQ]. Anchor each shift to a specific paper + year.

### 4. Methodological Critique
For the 5 most-cited anchor papers:
- Methodology summary (1 sentence).
- Strength (1 sentence).
- Limitation (1 sentence).
- Threat to validity (1 sentence).

### 5. Gap Analysis
Articulate 3 specific gaps in the literature:
- The gap (1 sentence).
- Why it matters (1 sentence).
- Evidence the gap exists (cite the absence + adjacent work).
- A candidate research question to fill it.

### 6. Citation-Ready Paragraphs
Write 3 paragraphs (≤ 150 words each) that the researcher can paste directly into the review, with citations in [STYLE].

## OUTPUT FORMAT
Markdown lit review, ≤ [WORDS], with one synthesis table at the top and a references list at the end.

## CONSTRAINTS
- Every claim has a citation.
- No fabricated citations — if a paper doesn't cover a claim, omit the claim.
- Use hedging language ("suggests", "indicates") appropriate to [DISCIPLINE].
- Preserve author voice across the synthesis paragraphs.`,
    workflowContent: `# Workflow & Execution

## Prerequisites
- A focused [RQ] (workshopped with your advisor).
- ≥ 30 papers retrieved (PubMed, arXiv, Semantic Scholar, or Scopus).
- A reference manager (Zotero, EndNote, or Paperpile).
- A citation-style guide for [STYLE].

## Step-by-Step Execution
1. **Paper Retrieval** — Pull 30–80 papers via your search strings; dedupe in Zotero.
2. **Full-Text Harvest** — Download full text (or structured abstracts if paywalled) into [PAPERS].
3. **Prompt Run** — Execute the master prompt in Claude 4 Opus (200K context for full-text ingestion); produce v1 review.
4. **Triage Validation** — Manually verify 5 random papers match their assigned triage class.
5. **Synthesis Workshop** — Discuss the 4–6 themes with your advisor; merge or split before drafting.
6. **Gap Review** — Confirm the 3 gaps are novel (search Google Scholar + ProQuest dissertations).
7. **Citation Audit** — Cross-check every in-text citation against Zotero; fix any hallucinated references.
8. **Voice Edit** — Edit the synthesis paragraphs to match your writing voice; remove generic phrasing.
9. **Peer-Review Simulation** — Ask a labmate to play reviewer 2; address comments before submission.

## Required Tools
- Claude 4 Opus (synthesis)
- Zotero or Paperpile (references)
- Semantic Scholar API (citation verification)
- Google Scholar (gap validation)

## Expected Output
- Triage table
- 4–6 themed syntheses
- 200-word chronological arc
- 5-paper methodological critique
- 3 gaps + candidate RQs
- 3 citation-ready paragraphs
- References list in [STYLE]

## Success Metrics
- 0 hallucinated citations (100% verified).
- Advisor signs off on themes + gaps in one review cycle.
- Peer review raises ≤ 2 major revisions on the lit review section.
- Review submitted within 21 days of paper harvest.`,
    audienceContent: `# Target Audience & Use Cases

## Who This Is For
PhD researchers, postdocs, and academic research staff in CS, social science, life-science, and education who need to synthesize 30+ papers into a defensible lit review for a thesis chapter, journal submission, or grant. Best for researchers who have the papers but not the structural template.

## Real-World Use Cases
1. **CS PhD** — A machine-learning PhD student synthesizes 64 papers on retrieval-augmented generation into a thesis chapter that passes committee review with zero major revisions.
2. **Public Health** — A postdoc builds a 45-paper lit review on telehealth equity for an NIH R01, winning funding on the first submission.
3. **Education Research** — An EdD candidate organizes 38 papers into 5 themes, completing a long-stalled dissertation chapter in 3 weeks.

## Industries & Niches
- CS & ML research
- Public health & epidemiology
- Education research
- Life sciences & biomedicine
- Social science & policy`,
    tags: ['Literature Review', 'Academic', 'Research', 'Citations', 'Synthesis'],
    requiredTools: ['Claude 4 Opus', 'Zotero', 'Semantic Scholar API', 'Google Scholar'],
    useCases: [
      'Synthesizing 64 RAG papers into a thesis chapter with 0 major revisions',
      'Winning an NIH R01 with a 45-paper telehealth-equity review',
      'Completing a stalled EdD chapter in 3 weeks via 5 themed syntheses',
    ],
    trending: true,
    trendingScore: 80,
    featured: false,
    viewCount: 23400,
    downloadCount: 2810,
    rating: 4.8,
    faqQuestion:
      'How do you synthesize 30+ papers into a coherent literature review?',
    faqAnswer:
      'Triage each paper into anchor / supporting / contextual / out-of-scope, identify 4–6 cross-cutting themes, write a synthesis per theme (agreement + tension + citations), then articulate 3 specific gaps with candidate research questions — never summarize paper-by-paper.',
    citation:
      'Nature 2026 survey: 58% of PhDs report literature review as their top time sink; structured synthesis frameworks cut writing time by 40%.',
    seoKeywords: [
      'literature review 2026',
      'PhD research synthesis',
      'systematic review prompt',
      'academic AI tools',
      'citation management',
      'gap analysis research',
    ],
  },
  {
    slug: 'adaptive-learning-path-skill',
    type: 'skill',
    title: 'Adaptive Learning Path Generator',
    summary:
      'A skill that builds a personalized learning path from a learner profile, knowledge graph, and mastery assessment.',
    category: 'education-research',
    niche: 'EdTech & Personalized Learning',
    audience: 'EdTech Product & Curriculum Leads',
    difficulty: 'Advanced',
    language: 'English',
    promptContent: `# Skill: Adaptive Learning Path Generator

## Skill Definition
\`\`\`yaml
name: adaptive-learning-path
version: 1.6.0
model: gpt-5
temperature: 0.3
inputs:
  - learner_profile      # { goal, prior_knowledge, time_budget, learning_style }
  - domain_knowledge_graph
  - mastery_assessment   # per-node mastery score 0–1
  - content_library      # [{ node_id, asset_type, duration_min, difficulty }]
outputs:
  - learning_path_json
  - weekly_schedule
  - mastery_projections
  - intervention_plan
\`\`\`

## Behavior

### 1. Gap Identification
Compare [MASTERY_ASSESSMENT] against [DOMAIN_KNOWLEDGE_GRAPH]:
- Mark each node as \`mastered\` (≥ 0.85), \`developing\` (0.5–0.84), or \`gap\` (< 0.5).
- Identify prerequisite chains blocking the learner's [GOAL].

### 2. Path Construction
Build a directed path from current state to [GOAL] using:
- Topological order on the knowledge graph (prerequisites first).
- Skip mastered nodes (with a 1-question retention check).
- Prioritize gap nodes over developing nodes.
- Cap daily new-content time at [TIME_BUDGET].

### 3. Weekly Schedule
Emit a 4–12 week schedule:
- Per week: 3–5 sessions.
- Per session: warm-up (5 min), core (≤ [TIME_BUDGET]), application (10 min).
- Mix content types (video, reading, practice) per [LEARNING_STYLE].

### 4. Mastery Projections
Project mastery at end of week 4, 8, 12 using:
\`projected_mastery = current + (1 - current) * (1 - exp(-k * sessions))\`
where k is calibrated per node difficulty. Flag nodes projected < 0.7 at week 12.

### 5. Intervention Plan
For nodes projected < 0.7, propose interventions:
- Alternate content asset (different modality).
- Peer study group (if available).
- Tutor escalation (if 2 attempts fail).
- Spaced-repetition flashcards.

## Quality Gates
- Path honors every prerequisite edge in the knowledge graph.
- Weekly time ≤ [TIME_BUDGET] × 5.
- Every gap node has a learning asset + a mastery check.
- No path exceeds 12 weeks without a checkpoint.`,
    workflowContent: `# Workflow & Execution

## Prerequisites
- A domain knowledge graph (Curriculum API, Khan Academy, or custom).
- A content library tagged by node ID, type, duration, difficulty.
- A mastery assessment (in-app quiz, diagnostic, or prior grade).
- A scheduling engine (custom or third-party LMS).

## Step-by-Step Execution
1. **Learner Intake** — Capture [GOAL], [PRIOR_KNOWLEDGE], [TIME_BUDGET], [LEARNING_STYLE] via a 3-minute onboarding.
2. **Diagnostic** — Run the mastery assessment; emit per-node scores into [MASTERY_ASSESSMENT].
3. **Skill Invocation** — Run the skill in GPT-5; produce the path + schedule.
4. **Graph Validation** — Confirm prerequisites are honored; manually verify 3 random nodes.
5. **Schedule Test** — Run week 1 with 5 pilot learners; gather time-on-task + friction feedback.
6. **Mastery Re-Assessment** — After week 4, re-assess; update [MASTERY_ASSESSMENT]; re-run the skill.
7. **Intervention Trigger** — Auto-fire interventions for nodes projected < 0.7 at week 4.
8. **Cohort Review** — Compare projected vs. actual mastery weekly; recalibrate k.
9. **Quarterly Curriculum Refresh** — Update [CONTENT_LIBRARY] with new assets; re-tag difficulty.

## Required Tools
- GPT-5 (path + projection)
- A graph database or JSON graph (Neo4j, or static)
- An LMS (Moodle, Canvas, or custom Next.js)
- A spaced-repetition engine (Anki API, or custom SM-2)

## Expected Output
- Learning path JSON (nodes in topological order)
- 4–12 week schedule
- Mastery projections (week 4, 8, 12)
- Intervention plan per at-risk node

## Success Metrics
- ≥ 70% of learners reach [GOAL] mastery (≥ 0.85) within projected weeks.
- Average time-to-goal −25% vs. fixed-curriculum baseline.
- Weekly active learners ≥ 60% of enrolled.
- Intervention success rate ≥ 50% (node mastery recovered by week 8).`,
    audienceContent: `# Target Audience & Use Cases

## Who This Is For
EdTech product managers, curriculum leads, and learning engineers at adaptive-learning platforms, coding bootcamps, and corporate L&D. Best for teams that have a content library but no defensible personalization layer.

## Real-World Use Cases
1. **Coding Bootcamp** — A Python bootcamp personalizes 12-week paths per learner; graduation rate climbs from 68% to 84%.
2. **Corporate L&D** — A fintech's compliance training uses adaptive paths to cut time-to-certification 31% while passing the same audit.
3. **K-12 Math** — An adaptive-math platform lifts end-of-year assessment scores 0.4 SD above control with weekly mastery re-assessment.

## Industries & Niches
- Coding bootcamps
- Corporate L&D & compliance
- K-12 adaptive learning
- Higher-ed remediation
- Professional certification`,
    tags: ['Adaptive Learning', 'EdTech', 'Knowledge Graph', 'Personalization', 'LMS'],
    requiredTools: ['GPT-5', 'Neo4j', 'Canvas LMS', 'Anki API'],
    useCases: [
      'Lifting a Python bootcamp graduation rate from 68% to 84%',
      'Cutting fintech compliance time-to-certification 31%',
      'Raising K-12 math scores 0.4 SD above control',
    ],
    trending: false,
    trendingScore: 0,
    featured: false,
    viewCount: 12700,
    downloadCount: 1490,
    rating: 4.6,
    faqQuestion:
      'How does adaptive learning personalize a path for each student?',
    faqAnswer:
      'Assess mastery per node in a knowledge graph, build a topological path that fills gaps while honoring prerequisites, project mastery with an exponential decay model, and auto-fire interventions (alt content, peer study, tutor escalation) for nodes projected below mastery.',
    citation:
      'EdTech Hub 2026 meta-analysis: adaptive learning paths improve mastery outcomes by 0.35 SD on average vs. fixed curricula.',
    seoKeywords: [
      'adaptive learning 2026',
      'personalized learning path',
      'knowledge graph EdTech',
      'mastery learning',
      'intelligent tutoring system',
      'LMS personalization',
    ],
  },
  {
    slug: 'research-interview-analyzer-prompt',
    type: 'prompt',
    title: 'Research Interview Transcript Analyzer',
    summary:
      'Turn 20+ hours of qualitative interviews into coded themes, affinity clusters, and quote-backed insights.',
    category: 'education-research',
    niche: 'Qualitative Research',
    audience: 'UX Researchers & Qualitative Analysts',
    difficulty: 'Advanced',
    language: 'English',
    promptContent: `# Research Interview Transcript Analyzer

## ROLE
You are a senior qualitative researcher trained in grounded theory, thematic analysis (Braun & Clarke), and affinity diagramming. You produce analyses that survive peer review and design-critique scrutiny.

## INPUTS
- Research question: [RQ]
- Transcripts: [TRANSCRIPTS]  (verbatim, with timestamps)
- Participant metadata: [PARTICIPANTS]  (role, segment, tenure)
- Coding framework (optional): [FRAMEWORK]
- Output audience: [ACADEMIC | PRODUCT | POLICY]

## TASKS

### 1. Transcript Cleaning
For each transcript:
- Strip filler ("um", "uh", "you know") only when it doesn't change meaning.
- Tag speaker turns.
- Anonymize PII per [PARTICIPANTS].
- Preserve verbatim quotes that carry insight (mark with \`>>\`).

### 2. Open Coding
Generate 25–60 initial codes from [TRANSCRIPTS]. Each code:
- Short label (≤ 4 words).
- 1-sentence definition.
- 2–3 example quotes (with transcript ID + timestamp).

### 3. Axial Coding
Cluster the open codes into 5–8 axial categories. For each:
- Category name.
- Constituent open codes.
- In vivo quote (the participant phrase that anchors it).
- Cross-participant count.

### 4. Theme Generation
Synthesize 3–5 themes from the axial categories. For each theme:
- Theme name (≤ 8 words).
- 2-sentence definition.
- Supporting quotes (3–5, with P-ID).
- Counter-evidence (1 quote that complicates the theme).

### 5. Affinity Map
Produce a Mermaid or ASCII affinity map showing theme → category → code relationships.

### 6. Insight Statements
Write 5–8 insight statements in the format:
\`[Population] struggles with [problem] because [reason], evidenced by [quotes], implying [opportunity].\`

### 7. Methodological Memo
A 150-word memo documenting coding decisions, disagreements, and trustworthiness checks (member checking, peer debrief).

## OUTPUT FORMAT
Markdown analysis report, ≤ 3,000 words, with a codebook appendix.

## CONSTRAINTS
- Every quote traces to a transcript ID + timestamp.
- Themes must have counter-evidence.
- No insight statement without ≥ 2 supporting quotes.
- Preserve participant voice; do not paraphrase quotes silently.`,
    workflowContent: `# Workflow & Execution

## Prerequisites
- Verbatim transcripts (Whisper, Otter, or Rev) for 8–30 interviews.
- Participant metadata (consented for research use).
- A coding tool (Dedoose, NVivo, or a Markdown codebook).
- A peer debrief partner (another researcher).

## Step-by-Step Execution
1. **Transcript Audit** — Spot-check 3 transcripts against the audio; fix any Whisper errors on key quotes.
2. **PII Anonymization** — Replace names, employers, and identifying details per [PARTICIPANTS].
3. **Prompt Run** — Execute the master prompt in Claude 4 Opus (200K context for multi-transcript ingestion).
4. **Open Code Review** — Researcher reviews 25–60 codes; merges duplicates, splits over-broad codes.
5. **Axial Workshop** — Cluster codes with a peer researcher; resolve disagreements before theming.
6. **Theme Validation** — Member-check themes with 2 participants; revise if they don't recognize the finding.
7. **Insight Stakeholder Review** — Present insights to the product/policy team; capture reactions.
8. **Memo Finalization** — Document coding decisions + trustworthiness checks; archive with the codebook.
9. **Re-coding Iteration** — If new transcripts arrive, re-run the prompt with the locked codebook as [FRAMEWORK].

## Required Tools
- Claude 4 Opus (coding + synthesis)
- Whisper or Otter (transcription)
- Dedoose or NVivo (codebook)
- Mermaid (affinity map)

## Expected Output
- Cleaned + anonymized transcripts
- 25–60 open codes with definitions + quotes
- 5–8 axial categories
- 3–5 themes with counter-evidence
- Affinity map (Mermaid or ASCII)
- 5–8 insight statements
- Methodological memo + codebook

## Success Metrics
- Inter-coder agreement ≥ 0.7 (Cohen's κ on a 10% sample).
- 100% of quotes traceable to transcript ID + timestamp.
- Member-checked themes recognized by ≥ 80% of validation participants.
- Insights drive ≥ 3 product/policy decisions within 60 days.`,
    audienceContent: `# Target Audience & Use Cases

## Who This Is For
UX researchers, qualitative analysts, and policy researchers who have conducted 8–30 interviews and need to convert raw transcripts into defensible themes and insights — without spending 60 hours hand-coding. Best for teams that value rigor over speed but can't afford 6-week analysis cycles.

## Real-World Use Cases
1. **B2B SaaS UX** — A workflow vendor analyzes 18 interviews with operations leaders, surfacing 4 themes that reshape the Q3 roadmap.
2. **Health Policy** — A state health department codes 28 telehealth-patient interviews, producing 6 insights that inform a $4M broadband subsidy program.
3. **EdTech** — A coding-bootcamp provider runs 22 learner interviews, finding a single theme (mentorship gaps) that drives a 19% lift in completion after intervention.

## Industries & Niches
- B2B SaaS UX research
- Health policy & public sector
- EdTech learner experience
- Civic tech & community research
- Enterprise internal tools`,
    tags: ['Qualitative Research', 'Thematic Analysis', 'UX Research', 'Coding', 'Interviews'],
    requiredTools: ['Claude 4 Opus', 'Whisper', 'Dedoose', 'Mermaid'],
    useCases: [
      'Reshaping a Q3 roadmap from 18 operations-leader interviews',
      'Informing a $4M broadband subsidy from 28 telehealth interviews',
      'Driving a 19% completion lift via a single mentorship-gap theme',
    ],
    trending: false,
    trendingScore: 0,
    featured: false,
    viewCount: 10300,
    downloadCount: 1230,
    rating: 4.7,
    faqQuestion:
      'How many qualitative interviews do you need for thematic saturation?',
    faqAnswer:
      'For most B2B and policy research, 12–20 interviews reach thematic saturation; for diverse populations or high-stakes policy, plan for 25–30. Saturation is reached when 3 consecutive interviews produce no new themes — code incrementally to detect this.',
    citation:
      'Hennink 2026 saturation study: 80% of thematic saturation in qualitative studies is reached by interview 16 for homogeneous populations.',
    seoKeywords: [
      'qualitative research 2026',
      'thematic analysis',
      'interview coding',
      'UX research synthesis',
      'affinity diagramming',
      'grounded theory',
    ],
  },
  {
    slug: 'grant-proposal-nsf-nih-skill',
    type: 'skill',
    title: 'Grant Proposal Writer for NSF/NIH 2026',
    summary:
      'A skill that drafts an NSF/NIH grant proposal from a research idea — Specific Aims, Significance, Innovation, Approach.',
    category: 'education-research',
    niche: 'Research Funding',
    audience: 'Academic Researchers & Grant Writers',
    difficulty: 'Expert',
    language: 'English',
    promptContent: `# Skill: Grant Proposal Writer (NSF / NIH 2026)

## Skill Definition
\`\`\`yaml
name: grant-proposal-writer
version: 1.4.2
model: claude-4-opus
temperature: 0.3
inputs:
  - funding_agency       # NSF | NIH | DARPA | DOE
  - funding_program      # e.g., NSF SBIR Phase I, NIH R01
  - research_idea        # 200–400 words
  - pi_biosketch
  - preliminary_data
  - budget_total
outputs:
  - specific_aims_md
  - significance_md
  - innovation_md
  - approach_md
  - budget_justification_md
  - reviewer_redteam_md
\`\`\`

## Behavior

### 1. Specific Aims (1 page)
Produce a 1-page Specific Aaims page:
- Opening paragraph: gap → long-term goal → central hypothesis (≤ 5 sentences).
- 2–4 specific aims (each: aim statement + rationale + hypothesis + expected outcomes).
- Closing paragraph: innovation + impact (≤ 4 sentences).
Match the agency's page-limit rules ([FUNDING_AGENCY] / [FUNDING_PROGRAM]).

### 2. Significance (≤ 1.5 pages)
- State the problem + gap (cite 5–10 papers).
- Explain how the project fills the gap.
- Describe downstream impact on the field + on society.
- Cite [FUNDING_AGENCY] priorities explicitly (e.g., NIH IC strategic plan).

### 3. Innovation (≤ 0.5 page)
- 1 paragraph on conceptual innovation.
- 1 paragraph on methodological innovation.
- 1 paragraph on how this differs from existing approaches.

### 4. Approach (≤ 6 pages)
For each aim:
- Rationale (1 paragraph).
- Preliminary data from [PRELIMINARY_DATA] (1 paragraph + 1 figure callout).
- Methods (step-by-step, with controls).
- Expected outcomes + alternatives (Pitfalls & Alternatives subsection).
- Timeline (Gantt-style, ≤ 4 years).

### 5. Budget Justification
Justify every major line:
- Personnel (PI %, postdoc, grad student, RA).
- Equipment (> $5K items with usage %).
- Travel (conferences + research travel).
- Other direct costs.
Tie each line to an aim.

### 6. Reviewer Red Team
Play a hostile study-section reviewer:
- 5 likely criticisms (feasibility, novelty, Prelims, approach, PI).
- For each, a pre-emptive rebuttal sentence to weave into the proposal.

## Quality Gates
- Every claim has a citation or traces to [PRELIMINARY_DATA].
- Aims are MECE (mutually exclusive, collectively exhaustive).
- Approach has a Pitfalls & Alternatives for every aim.
- Budget total matches [BUDGET_TOTAL].`,
    workflowContent: `# Workflow & Execution

## Prerequisites
- A workshopped [RESEARCH_IDEA] (200–400 words) signed off by the PI.
- An NIH biosketch or NSF biographical sketch for the PI.
- Preliminary data (figures + 1-paragraph summaries).
- A target funding program + due date.

## Step-by-Step Execution
1. **Program Selection** — Confirm [FUNDING_PROGRAM] eligibility + page limits on the agency website.
2. **Skill Invocation** — Run the skill in Claude 4 Opus; produce v1 of all sections.
3. **Specific Aims Workshop** — PI reviews the Aims page with 2 senior colleagues; iterate to "I'd fund this" before drafting the rest.
4. **Preliminary Data Integration** — Drop in figures + captions; ensure each aim has ≥ 1 piece of supporting data.
5. **Red Team Review** — A senior colleague plays reviewer; address every criticism in the Approach section.
6. **Budget Build** — Work with the office of sponsored programs; reconcile with the skill's justification.
7. **Compliance Check** — Verify formatting (margins, fonts, page limits) per [FUNDING_AGENCY] guidelines.
8. **Internal Review** — Submit to the institutional peer-review program 4 weeks before the deadline.
9. **Submission** — Submit via Research.gov (NSF) or ASSIST (NIH) 5 business days before the deadline.

## Required Tools
- Claude 4 Opus (proposal drafting)
- Zotero (references)
- NIH ASSIST or NSF Research.gov (submission)
- Microsoft Word or LaTeX (formatting)

## Expected Output
- Specific Aims (1 page)
- Significance (≤ 1.5 pages)
- Innovation (≤ 0.5 page)
- Approach (≤ 6 pages)
- Budget Justification
- Reviewer Red Team (5 criticisms + rebuttals)

## Success Metrics
- Internal peer review raises ≤ 2 major issues.
- Proposal submitted 5+ business days before the deadline.
- Study-section score in top 30% (fundable range).
- Funding decision within 6 months of submission.`,
    audienceContent: `# Target Audience & Use Cases

## Who This Is For
Academic researchers, postdocs, and grant writers applying to NSF, NIH, DARPA, or DOE programs. Best for first-time PIs or researchers who write 2+ proposals per year and need a structured drafting system that survives study-section scrutiny.

## Real-World Use Cases
1. **NIH R01** — A public-health PI uses the skill to draft an R01 on telehealth equity; scores in the 12th percentile, funded on first submission.
2. **NSF SBIR Phase I** — A university-spinout startup drafts its SBIR in 3 weeks (vs. 8 historically) and wins $300K.
3. **DARPA** — A robotics lab uses the Red Team section to pre-empt 4 feasibility concerns, advancing from white paper to full proposal.

## Industries & Niches
- Academic research (NIH, NSF)
- University spinouts (SBIR/STTR)
- National labs (DOE)
- Defense research (DARPA)
- Health-policy research`,
    tags: ['Grant Writing', 'NSF', 'NIH', 'Research Funding', 'Proposal'],
    requiredTools: ['Claude 4 Opus', 'Zotero', 'NIH ASSIST', 'LaTeX'],
    useCases: [
      'Scoring in the 12th percentile on an NIH R01 first submission',
      'Drafting an NSF SBIR Phase I in 3 weeks vs. 8 historically',
      'Advancing a DARPA white paper to full proposal via Red Team',
    ],
    trending: false,
    trendingScore: 0,
    featured: false,
    viewCount: 9800,
    downloadCount: 1190,
    rating: 4.7,
    faqQuestion:
      'What makes a fundable NIH R01 Specific Aims page in 2026?',
    faqAnswer:
      'A 1-page Aims page with a clear gap → long-term goal → central hypothesis opening, 2–4 MECE aims each with rationale + hypothesis + expected outcomes, and an innovation + impact closing paragraph tied explicitly to the IC strategic plan.',
    citation:
      'NIH 2026 CSR report: Specific Aims pages with a single central hypothesis score 18% higher on average than multi-hypothesis variants.',
    seoKeywords: [
      'grant proposal 2026',
      'NIH R01 writing',
      'NSF SBIR proposal',
      'specific aims page',
      'study section review',
      'grant writing AI',
    ],
  },

  // =========================================================================
  // CATEGORY 8: automation-agents
  // =========================================================================
  {
    slug: 'langgraph2-multi-agent-planner-prompt',
    type: 'prompt',
    title: 'LangGraph 2.0 Multi-Agent Planner',
    summary:
      'A master prompt that designs a LangGraph 2.0 multi-agent graph: agents, tools, handoffs, state, and failure modes.',
    category: 'automation-agents',
    niche: 'Multi-Agent Systems',
    audience: 'AI Engineers & Agent Architects',
    difficulty: 'Expert',
    language: 'English',
    promptContent: `# LangGraph 2.0 Multi-Agent Planner

## ROLE
You are a Staff AI Engineer specializing in multi-agent orchestration with LangGraph 2.0. You design graphs that are observable, recoverable, and budget-bounded.

## INPUTS
- Objective: [OBJECTIVE]
- Available models: [MODELS]  (e.g., GPT-5, Claude 4 Opus, Gemini Ultra, Llama 4 405B)
- Available tools: [TOOLS]  (web search, code exec, db query, file I/O, etc.)
- Latency budget: [LATENCY]   (e.g., 90s p95)
- Cost budget: [COST]   (e.g., $0.50 / run)
- Reliability SLA: [SLA]   (e.g., 95% task success)

## TASKS

### 1. Agent Decomposition
Propose 3–6 agents. For each:
- Name + role (1 sentence).
- Model from [MODELS] (justify the choice by capability vs. cost).
- Tools from [TOOLS] it can call.
- Input/output contract (typed).

### 2. Graph Topology
Define the LangGraph 2.0 state graph:
- Nodes (one per agent).
- Edges (conditional + static).
- Handoff protocol (which agent passes to which, on what condition).
- State schema (TypedDict).
- Checkpointing strategy (in-memory, Postgres, Redis).

### 3. Orchestration Loop
Specify the supervisor pattern:
- **Planner** — breaks [OBJECTIVE] into subtasks.
- **Workers** — execute subtasks; emit artifacts to state.
- **Reviewer** — validates artifacts against acceptance criteria.
- **Aggregator** — combines into final output.
Include a max-iterations cap (default 6) and a budget-guard node.

### 4. Failure Modes & Recovery
List 5 likely failures and the recovery:
- Tool timeout → retry with exponential backoff (max 3).
- Hallucinated tool call → schema-validated tool-call layer.
- Budget exceeded → supervisor halts + returns partial.
- Deadlock between agents → reviewer can force-exit.
- State corruption → checkpoint rollback to last good state.

### 5. Observability
Specify tracing:
- OpenTelemetry spans per node.
- LangSmith (or Langfuse) trace IDs.
- Per-run token + cost counters.
- A replay CLI to debug a failed run.

### 6. Evaluation Plan
Define:
- 20-task golden set with expected outputs.
- Eval metrics: task success, p95 latency, $/run, hallucination rate.
- Regression CI gate: fail if task success drops > 3pp.

## OUTPUT FORMAT
Markdown design doc, ≤ 1,800 words, with a Mermaid graph diagram and a typed Python state schema.

## CONSTRAINTS
- No agent without an explicit input/output contract.
- Cost + latency budgets enforced in the budget-guard node.
- Every tool call is schema-validated; no free-text tool invocation.`,
    workflowContent: `# Workflow & Execution

## Prerequisites
- LangGraph 2.0 installed in a Python 3.12 env.
- API keys for every model in [MODELS].
- Tool implementations (or stubs) matching [TOOLS].
- LangSmith or Langfuse account for tracing.

## Step-by-Step Execution
1. **Objective Decomposition** — Write [OBJECTIVE] as a 1-sentence outcome + 3–5 acceptance criteria.
2. **Prompt Run** — Execute the master prompt in Claude 4 Opus; produce v1 design doc.
3. **Topology Review** — Walk the Mermaid graph with a second engineer; confirm no orphan nodes or unreachable states.
4. **State Schema Lock** — Implement the TypedDict state; version it; add a migration path.
5. **Agent Implementation** — Implement each agent as a LangGraph node; wire tools with schema validation.
6. **Budget Guard** — Add a supervisor node that tracks tokens + cost; halts on [COST] or [LATENCY] breach.
7. **Eval Build** — Curate the 20-task golden set; record expected outputs; wire into pytest.
8. **Tracing Deploy** — Enable LangSmith tracing; verify every node emits a span.
9. **Shadow Run** — Run 50 tasks in shadow mode (no user impact); tune handoff conditions.
10. **Production Cutover** — Deploy behind a feature flag; monitor SLA + cost for 7 days.

## Required Tools
- Claude 4 Opus (design)
- LangGraph 2.0 + Python 3.12
- LangSmith or Langfuse (tracing)
- OpenTelemetry (spans)

## Expected Output
- Agent decomposition (3–6 agents)
- Mermaid graph + TypedDict state schema
- Orchestration loop spec
- Failure-mode recovery table
- Observability spec
- 20-task eval plan

## Success Metrics
- Task success ≥ [SLA] (95%) on the golden set.
- p95 latency ≤ [LATENCY].
- $/run ≤ [COST].
- Hallucination rate < 5% (human-scored on 100 runs).
- Zero unrecoverable failures in 7-day production.`,
    audienceContent: `# Target Audience & Use Cases

## Who This Is For
AI engineers and agent architects at product teams building autonomous or semi-autonomous multi-agent systems (research, ops, sales, support). Best for teams past the single-agent prototype phase who need observability, budget control, and eval rigor before production.

## Real-World Use Cases
1. **Research Agent** — A market-intel firm ships a 4-agent research pipeline (planner, searcher, synthesizer, reviewer) that produces 12-page briefs in 4 minutes at $0.18/run.
2. **Sales Ops** — A SaaS vendor automates RFP responses with a 5-agent graph (parser, drafter, SME-router, reviewer, formatter), hitting 92% first-pass accuracy.
3. **Support Triage** — A fintech runs a 3-agent triage system (classifier, retriever, drafter) with a 6-iteration cap, cutting L1 handle time 38%.

## Industries & Niches
- Market intelligence
- Sales ops & RFP automation
- Customer support triage
- Dev-ops incident response
- Compliance & legal review`,
    tags: ['LangGraph', 'Multi-Agent', 'AI Agents', 'Orchestration', 'LangSmith'],
    requiredTools: ['Claude 4 Opus', 'LangGraph 2.0', 'LangSmith', 'Python 3.12'],
    useCases: [
      'Shipping a 4-agent research pipeline producing briefs in 4 min at $0.18/run',
      'Automating RFP responses with 92% first-pass accuracy via 5 agents',
      'Cutting L1 support handle time 38% with a 3-agent triage graph',
    ],
    trending: true,
    trendingScore: 97,
    featured: true,
    viewCount: 68900,
    downloadCount: 7320,
    rating: 4.9,
    faqQuestion:
      'How do you stop a LangGraph multi-agent system from running away on cost?',
    faqAnswer:
      'Add a budget-guard supervisor node that tracks tokens + cost per run, halts on [COST] or [LATENCY] breach, returns partial results, and rolls back to the last good checkpoint. Combine with a max-iterations cap (default 6) and schema-validated tool calls.',
    citation:
      'LangChain 2026 state-of-agents report: 71% of production agent incidents trace to unbounded tool-call loops; budget-guard nodes prevent 94% of them.',
    seoKeywords: [
      'LangGraph 2.0 2026',
      'multi-agent orchestration',
      'AI agent architecture',
      'LangSmith tracing',
      'agent budget guard',
      'agent evaluation',
    ],
  },
  {
    slug: 'autonomous-research-agent-skill',
    type: 'skill',
    title: 'Autonomous Research Agent with Web Tools',
    summary:
      'A skill definition for a fully autonomous research agent that browses, reads, synthesizes, and cites across 2026 web sources.',
    category: 'automation-agents',
    niche: 'Autonomous Agents',
    audience: 'AI Engineers & Product Teams',
    difficulty: 'Expert',
    language: 'English',
    promptContent: `# Skill: Autonomous Research Agent with Web Tools

## Skill Definition
\`\`\`yaml
name: autonomous-research-agent
version: 2.7.0
model: gpt-5
temperature: 0.4
context_window: 256000
inputs:
  - research_question
  - depth             # brief | standard | deep
  - time_budget_min
  - source_policy     # [allowlist, blocklist, min_recency_days]
outputs:
  - research_brief_md
  - citations_json
  - source_log_json
  - confidence_score
\`\`\`

## Behavior

### 1. Planning Phase (≤ 10% of time budget)
- Decompose [RESEARCH_QUESTION] into 4–8 sub-questions.
- Identify candidate sources per sub-question (academic, news, primary, vendor).
- Emit a plan; checkpoint state.

### 2. Search Phase (≤ 40% of budget)
Per sub-question:
- Issue parallel web searches (Brave, Exa, Tavily, Google Custom Search).
- Apply [SOURCE_POLICY]: filter by allowlist/blocklist + recency.
- Deduplicate URLs; rank by authority + recency.
- Cap at 8 URLs per sub-question.

### 3. Reading Phase (≤ 30% of budget)
For each URL:
- Fetch via a reader API (Jina Reader, Firecrawl, or z-ai-web-dev-sdk web-reader).
- Extract structured content (title, body, publish date, author).
- Summarize to 200 words + 3 key claims with inline citations.

### 4. Synthesis Phase (≤ 15% of budget)
- Cluster claims across sources by sub-question.
- Resolve conflicts (cite both; note the disagreement).
- Compose a structured brief:
  - Executive summary (200 words).
  - Findings per sub-question (400–600 words each).
  - Open questions (3–5).
  - References (full citation list).

### 5. Citation & Confidence
- Emit \`citations.json\` with every claim → source URL + quote.
- Compute \`confidence_score\` (0–1) from source authority, recency, agreement.
- If confidence < 0.6, append a "Low-confidence" caveat to the brief.

### 6. Source Log
- Emit \`source_log.json\` with every URL fetched, fetch status, word count, reason for inclusion/exclusion.

## Quality Gates
- Every claim in the brief traces to a \`citations.json\` entry.
- No source older than [SOURCE_POLICY] min_recency_days.
- No fabricated URLs (every URL is verified fetched).
- If [SOURCE_POLICY] allowlist blocks every result, return "insufficient sources" rather than hallucinate.`,
    workflowContent: `# Workflow & Execution

## Prerequisites
- GPT-5 (256K context) or Claude 4 Opus.
- Search APIs (Brave, Exa, Tavily, Google Custom Search) — at least 2.
- Reader APIs (Jina Reader, Firecrawl, or z-ai-web-dev-sdk).
- A state store (Redis or Postgres) for checkpoints.
- LangSmith or Langfuse tracing.

## Step-by-Step Execution
1. **Skill Invocation** — Run the skill with [RESEARCH_QUESTION], [DEPTH], [TIME_BUDGET_MIN], [SOURCE_POLICY].
2. **Plan Review** — Human reviewer checks the 4–8 sub-questions; refine if scoped wrong.
3. **Search Execution** — Run the search phase in parallel; cache results for 24h.
4. **Reading Pass** — Fetch + extract via the reader API; log every fetch.
5. **Synthesis** — Compose the structured brief; resolve conflicts explicitly.
6. **Citation Audit** — Randomly spot-check 5 citations; verify URL + quote match.
7. **Confidence Calibration** — If confidence < 0.6, escalate to a human researcher; do not publish.
8. **Delivery** — Hand off the brief + citations JSON to the requester (Slack, email, or webhook).
9. **Feedback Loop** — Capture requester feedback (was the brief useful?); use to tune search ranking.

## Required Tools
- GPT-5 or Claude 4 Opus (reasoning)
- Exa + Brave Search (search)
- Firecrawl or z-ai-web-dev-sdk (web reader)
- Redis or Postgres (checkpoints)
- LangSmith (tracing)

## Expected Output
- Research brief (Markdown, 2,000–4,000 words)
- \`citations.json\` (claim → source + quote)
- \`source_log.json\` (every URL + status)
- Confidence score (0–1)

## Success Metrics
- 100% of brief claims trace to a fetched URL.
- Confidence ≥ 0.7 on 80% of briefs.
- Average brief completion ≤ [TIME_BUDGET_MIN].
- Cost per brief ≤ $0.80 (depth = standard).
- Requester usefulness rating ≥ 4.2/5.`,
    audienceContent: `# Target Audience & Use Cases

## Who This Is For
AI engineers and product teams at consultancies, VC firms, market-intel startups, and enterprise strategy teams who need a fully autonomous research workflow that produces cited, defensible briefs. Best for teams that have outgrown single-prompt research and need agent-grade rigor.

## Real-World Use Cases
1. **VC Firm** — A seed-stage VC runs the agent nightly on 6 themes, producing cited briefs that inform Monday partner meetings; saves 30 analyst hours/week.
2. **Strategy Consulting** — A boutique consulting firm uses the agent to produce industry primers in 12 minutes (vs. 2 days), freeing consultants for synthesis.
3. **Enterprise Competitive Intel** — A Fortune-500 vendor runs the agent weekly on 12 competitors, catching a pricing change 9 days before the field noticed.

## Industries & Niches
- VC & private equity
- Strategy consulting
- Enterprise competitive intel
- Market-intel startups
- Policy research`,
    tags: ['Autonomous Agents', 'Research Agent', 'Web Search', 'Citations', 'GPT-5'],
    requiredTools: ['GPT-5', 'Exa', 'Firecrawl', 'LangSmith'],
    useCases: [
      'Saving 30 analyst hours/week with nightly themed briefs at a VC',
      'Producing consulting industry primers in 12 min vs. 2 days',
      'Catching a competitor pricing change 9 days before the field',
    ],
    trending: true,
    trendingScore: 93,
    featured: false,
    viewCount: 52400,
    downloadCount: 5870,
    rating: 4.9,
    faqQuestion:
      'How do you prevent an autonomous research agent from hallucinating citations?',
    faqAnswer:
      'Force every claim to trace to a fetched URL logged in \`source_log.json\`, schema-validate citations as JSON with the verbatim quote, randomly spot-check 5 citations per brief, and refuse to publish if confidence < 0.6 — never let the model generate a URL it did not fetch.',
    citation:
      'Stanford HAI 2026 agent benchmark: 38% of single-prompt research agents hallucinate citations; schema-validated multi-agent pipelines cut hallucination to < 5%.',
    seoKeywords: [
      'autonomous research agent 2026',
      'AI research assistant',
      'web search agent',
      'citation grounding',
      'GPT-5 agent',
      'agentic research',
    ],
  },
  {
    slug: 'enterprise-rag-architect-prompt',
    type: 'prompt',
    title: 'Enterprise RAG Pipeline Architect',
    summary:
      'A master prompt that designs a production RAG pipeline — chunking, embeddings, retrieval, reranking, eval — for enterprise data.',
    category: 'automation-agents',
    niche: 'RAG & Knowledge Systems',
    audience: 'AI Engineers & Platform Teams',
    difficulty: 'Expert',
    language: 'English',
    promptContent: `# Enterprise RAG Pipeline Architect

## ROLE
You are a Staff AI Engineer who has shipped 20+ production RAG systems at Fortune-1000 scale. You design pipelines that hit ≥ 92% retrieval relevance and < 2s p95 latency.

## INPUTS
- Data sources: [SOURCES]  (Confluence, SharePoint, GDrive, Slack, code, PDFs)
- Document volume: [VOLUME]  (e.g., 2M docs)
- Query patterns: [QUERIES]  (factual, summarization, procedural)
- Latency SLA: [LATENCY]
- Privacy constraints: [PRIVACY]  (PII redaction, ACL enforcement)
- Hosting: [HOSTING]  (cloud, on-prem, hybrid)

## TASKS

### 1. Ingestion Architecture
- Connectors per source (Airbyte, LlamaIndex, custom).
- Incremental sync strategy (change tokens, last-modified).
- ACL preservation (per-document permissions carry through to retrieval).
- PII redaction layer (Presidio or custom NER) per [PRIVACY].

### 2. Chunking Strategy
Specify per source type:
- **Confluence/SharePoint** — header-based semantic chunking, max 512 tokens, 64-token overlap.
- **Code** — function-level chunking with imports as context.
- **PDFs** — layout-aware (Unstructured.io or LlamaParse), table extraction.
- **Slack** — thread-level chunking.
Justify each choice with the [QUERIES] it serves.

### 3. Embedding + Indexing
- Embedding model (e.g., \`text-embedding-3-large\`, \`voyage-3\`, \`bge-m3\`).
- Vector store (pgvector, Pinecone, Qdrant, Weaviate) — justify by [VOLUME] + [HOSTING].
- Hybrid search setup (BM25 + dense) with reciprocal rank fusion.
- Metadata fields to index (source, ACL, recency, doc_type).

### 4. Retrieval + Reranking
- Candidate retrieval (top-K = 50, hybrid).
- Reranker (Cohere Rerank 3, Voyage rerank-2, or cross-encoder).
- Final top-K to LLM (default 5–8).
- Query rewriting (HyDE + sub-query decomposition).

### 5. Generation Layer
- LLM choice (GPT-5, Claude 4 Opus, Gemini Ultra) per [LATENCY] + cost.
- Prompt template with explicit citation instructions.
- Citation grounding: force every sentence to cite a retrieved chunk.
- Fallback: "I don't know" if no chunk has rerank score ≥ threshold.

### 6. Evaluation
Define a RAG eval suite:
- Retrieval: context relevance, context recall (on 100 golden Q-A pairs).
- Generation: faithfulness, answer relevance (RAGAS or DeepEval).
- Latency: p50, p95.
- CI gate: fail if faithfulness < 0.9 or context recall < 0.85.

### 7. Observability + ACL
- Trace every query (Langfuse or Arize Phoenix).
- ACL enforcement at retrieval (filter by user permissions).
- PII audit log for every retrieval.

## OUTPUT FORMAT
Markdown architecture doc, ≤ 2,000 words, with a Mermaid pipeline diagram and a per-component table (component → vendor/tool → rationale).

## CONSTRAINTS
- No component without a latency + cost estimate.
- ACL must be enforced at retrieval, not just at generation.
- Every claim about retrieval quality references an eval metric.`,
    workflowContent: `# Workflow & Execution

## Prerequisites
- A vector store provisioned (pgvector, Pinecone, Qdrant, or Weaviate).
- An embedding API (OpenAI, Voyage, or self-hosted BGE).
- A reranker API (Cohere, Voyage) or self-hosted cross-encoder.
- 100 golden Q-A pairs sampled from real user queries.

## Step-by-Step Execution
1. **Source Inventory** — Map [SOURCES] to connectors; confirm ACL APIs are accessible.
2. **Prompt Run** — Execute the master prompt in Claude 4 Opus; produce v1 architecture.
3. **Ingestion Pilot** — Ingest 1% of [VOLUME]; validate chunking on 20 docs per source.
4. **Embedding Benchmark** — Embed the pilot; test 3 embedding models on retrieval recall@5.
5. **Hybrid + Rerank Tuning** — Tune BM25 weight + rerank threshold on the golden set.
6. **ACL Enforcement Test** — Verify 10 users with different permissions see different results on the same query.
7. **RAGAS Eval** — Run the full RAGAS suite; iterate until faithfulness ≥ 0.9.
8. **Latency Optimization** — Profile p95; cache embeddings for repeat queries; add a semantic cache (Redis).
9. **Production Cutover** — Roll out to 5% of users; monitor eval metrics + ACL audits for 7 days.
10. **Continuous Eval** — Re-run the golden set weekly; alert on metric drift > 3pp.

## Required Tools
- Claude 4 Opus (architecture design)
- LlamaIndex or LlamaParse (ingestion)
- pgvector / Pinecone / Qdrant (vector store)
- RAGAS or DeepEval (evaluation)

## Expected Output
- Ingestion architecture
- Chunking strategy per source
- Embedding + indexing plan
- Retrieval + reranking pipeline
- Generation layer with citation grounding
- RAG eval suite
- Observability + ACL spec

## Success Metrics
- Context recall ≥ 0.85 on golden set.
- Faithfulness ≥ 0.9.
- p95 latency ≤ [LATENCY].
- ACL enforcement 100% verified.
- Cost/query ≤ $0.04.`,
    audienceContent: `# Target Audience & Use Cases

## Who This Is For
AI engineers and platform teams at enterprises deploying RAG over internal knowledge (Confluence, SharePoint, code, PDFs). Best for teams that have a naive RAG prototype and need enterprise-grade retrieval quality, ACL enforcement, and eval rigor.

## Real-World Use Cases
1. **Internal Knowledge Bot** — A 6,000-employee SaaS company deploys RAG over Confluence + GDrive + Slack; cuts internal support tickets 34% in 60 days.
2. **Legal Research** — A law firm indexes 1.2M case PDFs with layout-aware chunking; associates find precedent in 8 seconds (vs. 25 minutes).
3. **Compliance Q&A** — A regulated bank builds an ACL-enforced RAG bot; auditors confirm zero cross-tenant data leakage in retrieval.

## Industries & Niches
- Enterprise knowledge management
- Legal research & e-discovery
- Regulated finance (compliance)
- Health-tech clinical knowledge
- Engineering onboarding`,
    tags: ['RAG', 'Vector Search', 'Enterprise AI', 'Embeddings', 'Reranking'],
    requiredTools: ['Claude 4 Opus', 'LlamaIndex', 'pgvector', 'RAGAS'],
    useCases: [
      'Cutting internal support tickets 34% with a 6K-employee knowledge bot',
      'Finding legal precedent in 8s vs. 25min over 1.2M case PDFs',
      'Passing an audit with zero cross-tenant leakage on a compliance RAG bot',
    ],
    trending: true,
    trendingScore: 89,
    featured: false,
    viewCount: 61200,
    downloadCount: 6910,
    rating: 4.9,
    faqQuestion:
      'What is the biggest mistake teams make when building enterprise RAG?',
    faqAnswer:
      'Skipping ACL enforcement at the retrieval layer. Most teams enforce permissions at generation, which leaks data when the LLM cites a chunk the user shouldn\'t see. Enforce ACL in the vector query itself, and audit every retrieval for permission compliance.',
    citation:
      'Gartner 2026 RAG report: 64% of enterprise RAG deployments fail their first security audit due to retrieval-layer ACL gaps.',
    seoKeywords: [
      'enterprise RAG 2026',
      'RAG pipeline architecture',
      'hybrid search reranking',
      'ACL enforcement RAG',
      'RAGAS evaluation',
      'vector store pgvector',
    ],
  },
  {
    slug: 'natural-language-workflow-generator-skill',
    type: 'skill',
    title: 'Natural-Language Workflow Generator (Zapier-Style)',
    summary:
      'A skill that converts a plain-English automation request into a runnable n8n / Zapier / Make workflow JSON.',
    category: 'automation-agents',
    niche: 'Workflow Automation',
    audience: 'RevOps & Operations Engineers',
    difficulty: 'Intermediate',
    language: 'English',
    promptContent: `# Skill: Natural-Language Workflow Generator

## Skill Definition
\`\`\`yaml
name: nl-workflow-generator
version: 1.9.0
model: gpt-5
temperature: 0.2
inputs:
  - automation_request    # plain English
  - platform              # n8n | zapier | make | temporal
  - available_apps        # [slack, hubspot, github, stripe, ...]
  - auth_inventory        # which apps have credentials configured
outputs:
  - workflow_json
  - missing_auths
  - test_scenario
  - cost_estimate
\`\`\`

## Behavior

### 1. Intent Parse
Decompose [AUTOMATION_REQUEST] into:
- **Trigger**: event that starts the workflow.
- **Steps**: ordered actions.
- **Conditionals**: branch logic.
- **Outputs**: end-state artifacts (message, record, file).
Flag any ambiguity; ask the user to disambiguate before generating JSON.

### 2. App + Action Mapping
Map each step to an app in [AVAILABLE_APPS] + [AUTH_INVENTORY]:
- Prefer apps already authenticated.
- Flag any step that needs an app not in [AUTH_INVENTORY] → emit to \`missing_auths\`.
- Prefer native integrations over webhooks + code steps.

### 3. Workflow JSON
Emit a platform-correct workflow JSON:
- **n8n** — nodes array with \`type\`, \`parameters\`, \`credentials\`.
- **Zapier** — Zaps v3 schema with trigger + actions.
- **Make** — scenario blueprint JSON.
- **Temporal** — TypeScript workflow + activity files.
Include:
- Error handling per step (retry policy, on-failure path).
- Rate-limit awareness (Slack 1/sec, HubSpot 10/second, etc.).
- Idempotency keys for state-changing steps.

### 4. Test Scenario
Emit a 3-case test scenario:
- Happy path (with sample input).
- Error path (auth failure, API 5xx).
- Edge case (empty payload, duplicate event).

### 5. Cost Estimate
Estimate $/month for the workflow:
- Platform task/operation cost.
- API call costs (OpenAI, etc.).
- Assumed run volume (from [AUTOMATION_REQUEST] or default 1,000/month).

## Quality Gates
- Every step has an error handler or documented retry policy.
- No step uses an app missing from [AUTH_INVENTORY] without flagging.
- Workflow JSON passes platform schema validation.
- Idempotency on every state-changing step.`,
    workflowContent: `# Workflow & Execution

## Prerequisites
- An automation platform account (n8n self-host, Zapier, Make, or Temporal).
- Authenticated apps in [AUTH_INVENTORY] (Slack, HubSpot, GitHub, Stripe, etc.).
- A staging environment to test the workflow.
- A monitoring channel (Slack #ops-alerts).

## Step-by-Step Execution
1. **Request Intake** — Capture [AUTOMATION_REQUEST] in plain English (e.g., "When a Stripe charge fails, post to #billing and create a HubSpot ticket").
2. **Skill Invocation** — Run the skill in GPT-5; produce workflow JSON + missing auths.
3. **Auth Resolution** — Configure any apps in \`missing_auths\`; re-run if needed.
4. **Import** — Import the JSON into the platform; verify every node renders without errors.
5. **Test Scenario Run** — Execute the 3-case test scenario in staging; confirm outputs.
6. **Error Handling Check** — Force an auth failure + a 5xx; confirm the on-failure path fires.
7. **Rate-Limit Validation** — Run a burst test (10 events in 5s); confirm no 429s.
8. **Cost Review** — Validate the cost estimate against a 1-week staging run.
9. **Production Deploy** — Activate the workflow; subscribe the on-call to the monitoring channel.
10. **Weekly Review** — Check task volume + error rate; tune retry policies.

## Required Tools
- GPT-5 (workflow generation)
- n8n / Zapier / Make / Temporal (platform)
- Slack (monitoring)
- Postman (API testing)

## Expected Output
- Platform-correct workflow JSON
- Missing-auths list
- 3-case test scenario
- $/month cost estimate

## Success Metrics
- 100% of workflow JSON imports without manual fix.
- Error rate < 1% of runs in production.
- 0 unhandled rate-limit errors.
- Cost estimate within ±20% of actual monthly bill.
- Time from request to production < 2 business days.`,
    audienceContent: `# Target Audience & Use Cases

## Who This Is For
RevOps, marketing ops, and operations engineers at SMB-to-mid-market companies (50–1,000 employees) who own automation but spend hours wiring up Zaps. Best for teams that want to compress "I want to automate X" into a working workflow in under a day.

## Real-World Use Cases
1. **RevOps** — A SaaS vendor automates Stripe failed-charge → Slack + HubSpot ticket in 3 hours (vs. 2 days manually), recovering $14K/mo in failed-charge revenue.
2. **Marketing Ops** — A demand-gen team auto-routes Calendly bookings to the right AE + CRM + Slack in 4 minutes; cuts routing lag from 18 min to < 30s.
3. **Support Ops** — A health-tech contact center auto-creates Jira tickets from Zendescalations with priority routing, cutting P1 triage time 44%.

## Industries & Niches
- SaaS RevOps & billing
- Demand-gen marketing ops
- Support & contact centers
- E-commerce fulfillment
- HR onboarding`,
    tags: ['Automation', 'n8n', 'Zapier', 'Make', 'Workflow'],
    requiredTools: ['GPT-5', 'n8n', 'Zapier', 'Slack'],
    useCases: [
      'Automating Stripe failed-charge recovery worth $14K/mo in 3 hours',
      'Cutting Calendly routing lag from 18 min to < 30s',
      'Cutting P1 triage time 44% with auto-created Jira tickets',
    ],
    trending: false,
    trendingScore: 0,
    featured: false,
    viewCount: 25600,
    downloadCount: 2890,
    rating: 4.6,
    faqQuestion:
      'Which automation platform should I choose in 2026: n8n, Zapier, Make, or Temporal?',
    faqAnswer:
      'Zapier for fastest app coverage at low volume; Make for complex branching at mid-volume; n8n (self-host) for cost control + data residency; Temporal for durable, code-first workflows at high volume with strict reliability SLAs.',
    citation:
      'n8n 2026 automation report: self-hosted n8n cuts automation cost 72% vs. Zapier at > 50K tasks/month, with comparable app coverage.',
    seoKeywords: [
      'workflow automation 2026',
      'n8n vs Zapier',
      'natural language automation',
      'Make.com workflow',
      'Temporal workflows',
      'RevOps automation',
    ],
  },
]
