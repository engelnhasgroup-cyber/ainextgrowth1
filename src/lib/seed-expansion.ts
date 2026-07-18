// NexusAI 2026 — Seed Expansion Pack (8 additional items, 1 per category)
// Appended to the main seed via the expansion seed runner.

import type { SeedItem } from './seed-data'

export const expansionItems: SeedItem[] = [
  // ── seo-content-marketing ──
  {
    slug: 'e-commerce-product-schema-seo-prompt',
    type: 'prompt',
    title: 'E-Commerce Product Page Schema & FAQ Generator for 2026 Rich Results',
    summary: 'Generates complete Product schema, FAQ schema, and review schema markup for e-commerce pages to win Google Shopping and SGE product citations.',
    category: 'seo-content-marketing',
    niche: 'Technical SEO',
    audience: 'E-commerce SEO Managers',
    difficulty: 'Advanced',
    language: 'English',
    promptContent: `\`\`\`
ROLE: You are a Senior Technical SEO Engineer specializing in structured data and Google SGE optimization for e-commerce.

INPUTS:
- [PRODUCT_NAME]: the product name
- [CATEGORY]: product category
- [PRICE]: price with currency
- [FEATURES]: 3-5 key features
- [REVIEWS]: aggregate review data (rating + count)

TASKS:
1. Generate complete JSON-LD Product schema including offers, aggregateRating, and brand.
2. Generate a FAQPage schema with 5 high-intent questions answered concisely (max 50 words each).
3. Generate Review schema for 2 representative reviews.
4. Provide the HTML script tag placement instructions.

CONSTRAINTS:
- All schema must validate against schema.org Product type.
- FAQ answers must be self-contained (SGE extracts them verbatim).
- Include "priceValidUntil" set to 2026-12-31.
- Use "availability": "https://schema.org/InStock".

OUTPUT FORMAT: Three JSON-LD blocks inside <script type="application/ld+json"> tags, followed by placement notes.
\`\`\``,
    workflowContent: `## Prerequisites
- Access to the product page CMS or HTML.
- Google Rich Results Test bookmarked for validation.

## Step-by-Step Execution
1. Gather the product inputs (name, price, features, review aggregate).
2. Paste them into the prompt and run with GPT-5 or Claude 4 Opus.
3. Copy the three JSON-LD blocks output by the prompt.
4. Insert them into the <head> of the product page (or via Google Tag Manager).
5. Validate with the Rich Results Test.
6. Submit the URL for re-crawling via Search Console URL Inspection.

## Required Tools
- GPT-5 or Claude 4 Opus
- Google Search Console
- Google Rich Results Test
- Schema.org validator

## Expected Output
Three valid JSON-LD script blocks (Product, FAQPage, Review) plus HTML placement instructions.

## Success Metrics
- 0 errors and 0 warnings in Rich Results Test.
- Product eligible for Google Shopping carousel within 7 days.
- FAQ rich snippets appearing in SERP within 14 days.
- SGE product citation pickup within 30 days.`,
    audienceContent: `## Who This Is For
E-commerce SEO managers, Shopify Plus store owners, and technical SEO agencies managing product catalogs of 100+ SKUs who need schema markup that wins rich results and AI answer citations.

## Real-World Use Cases
1. **Shopify Plus migration**: A DTC brand migrating 2,000 products needs schema generated in bulk before launch to preserve rich snippet eligibility.
2. **SGE optimization sprint**: An electronics retailer wants product pages cited in Google SGE product recommendation panels ahead of Black Friday.
3. **Agency client onboarding**: An SEO agency generates schema for a new client's top 50 revenue-driving products as part of a technical audit.

## Industries & Niches
E-commerce, DTC brands, electronics retail, fashion, home goods, B2B industrial supplies, marketplace sellers.`,
    tags: ['Schema.org', 'JSON-LD', 'E-commerce', 'Rich Results', 'SGE'],
    requiredTools: ['GPT-5', 'Google Search Console', 'Rich Results Test'],
    useCases: [
      'Bulk schema generation for 2,000-product Shopify migration',
      'SGE product citation optimization before Black Friday',
      'Technical SEO audit deliverable for agency clients',
    ],
    trending: true,
    trendingScore: 87,
    featured: false,
    viewCount: 42100,
    downloadCount: 5100,
    rating: 4.8,
    faqQuestion: 'How do I add product schema for Google rich results in 2026?',
    faqAnswer: 'Generate valid JSON-LD Product schema including offers, aggregateRating, and brand, place it in the page head, and validate with Google Rich Results Test. Add FAQPage schema to capture SGE answer citations.',
    citation: 'According to 2026 Search Engine Land data, e-commerce pages with complete Product + FAQ schema are 3.2x more likely to appear in Google SGE product recommendations.',
    seoKeywords: ['product schema', 'json-ld generator', 'rich results', 'google shopping', 'sge product', 'faq schema', 'e-commerce seo'],
  },

  // ── software-engineering ──
  {
    slug: 'react-server-components-migration-audit-skill',
    type: 'skill',
    title: 'Next.js 16 React Server Components Migration Audit Skill',
    summary: 'A skill definition that audits a Next.js App Router codebase for RSC compliance, identifies "use client" violations, and outputs a remediation plan.',
    category: 'software-engineering',
    niche: 'Frontend Architecture',
    audience: 'Senior Frontend Engineers',
    difficulty: 'Expert',
    language: 'English',
    promptContent: `\`\`\`
---
name: rsc-migration-audit
version: 1.0.0
description: Audits a Next.js 16 App Router codebase for React Server Components compliance and outputs a remediation plan.
tools:
  - filesystem (read-only)
  - grep
inputs:
  - projectRoot: path to the Next.js project root
outputs:
  - auditReport: markdown report with violations and fixes
---

SYSTEM INSTRUCTIONS:
You are a React Server Components expert. When invoked:

1. Scan the project for all files containing "use client" directives.
2. For each, determine if client-side JavaScript is actually needed (event handlers, state, browser APIs).
3. Identify components that could be server components but are marked "use client" unnecessarily.
4. Check for data fetching in client components that should move to server components.
5. Check for prop serialization issues (passing non-serializable props across the server/client boundary).

OUTPUT a markdown report with:
- Summary table: file, violation type, severity, recommended fix.
- Detailed remediation steps for each violation.
- Estimated bundle size reduction.
\`\`\``,
    workflowContent: `## Prerequisites
- Next.js 16 project using App Router.
- Node.js 22+ and Bun installed.
- Read access to the project source.

## Step-by-Step Execution
1. Install the skill in your AI coding tool (Cursor, Claude Code, or Continue).
2. Invoke: "Run rsc-migration-audit on [projectRoot]".
3. The skill scans all files, identifies violations, and generates a report.
4. Review the report's summary table prioritized by severity.
5. Apply fixes one file at a time, starting with high-severity violations.
6. Re-run the audit after each batch of fixes to verify progress.
7. Measure bundle size before/after with \`next build\`.

## Required Tools
- Next.js 16
- Cursor or Claude Code (for skill execution)
- Bundle analyzer (@next/bundle-analyzer)

## Expected Output
A markdown audit report with a violation summary table and per-file remediation steps, plus an estimated JS bundle reduction percentage.

## Success Metrics
- "use client" directive count reduced by 40%+.
- First-load JS bundle reduced by 25%+.
- Lighthouse Performance score reaches 95+ on mobile.`,
    audienceContent: `## Who This Is For
Senior frontend engineers and tech leads migrating Next.js Pages Router projects to App Router, or optimizing existing App Router codebases for maximum server-side rendering performance.

## Real-World Use Cases
1. **Pages-to-App migration**: A SaaS dashboard with 200+ components migrates from Pages Router and needs to identify which components should stay server-side.
2. **Performance audit**: A high-traffic e-commerce site must reduce its 380KB First Load JS to under 200KB to hit Core Web Vitals targets.
3. **Team onboarding**: A new senior engineer uses the audit to understand the codebase's RSC boundaries and conventions in their first week.

## Industries & Niches
SaaS dashboards, e-commerce frontends, developer tools, media sites, enterprise internal apps.`,
    tags: ['React Server Components', 'Next.js 16', 'Performance', 'Audit', 'Bundle Size'],
    requiredTools: ['Next.js 16', 'Cursor', '@next/bundle-analyzer'],
    useCases: [
      'Migrating 200-component Pages Router app to App Router',
      'Reducing 380KB First Load JS to under 200KB',
      'Onboarding new engineers to RSC codebase conventions',
    ],
    trending: true,
    trendingScore: 91,
    featured: true,
    viewCount: 58900,
    downloadCount: 6400,
    rating: 4.9,
    faqQuestion: 'How do I audit my Next.js App Router project for unnecessary "use client" directives?',
    faqAnswer: 'Use an RSC migration audit skill that scans for "use client" files, checks whether client-side JS is actually needed, and outputs a prioritized remediation plan with estimated bundle reduction.',
    citation: 'Vercel 2026 State of Next.js report shows projects with over 60% server components achieve 2.1x faster LCP on mobile compared to client-heavy codebases.',
    seoKeywords: ['react server components', 'next.js 16', 'use client audit', 'bundle size', 'rsc migration', 'app router', 'frontend performance'],
  },

  // ── data-analytics ──
  {
    slug: 'churn-prediction-feature-store-prompt',
    type: 'prompt',
    title: 'SaaS Churn Prediction Feature Store & Model Pipeline Prompt',
    summary: 'Designs a complete churn prediction pipeline with a feature store, training data, XGBoost model, and SHAP explainability for B2B SaaS retention teams.',
    category: 'data-analytics',
    niche: 'ML Pipeline',
    audience: 'Data Scientists & RevOps Analysts',
    difficulty: 'Advanced',
    language: 'English',
    promptContent: `\`\`\`
ROLE: You are a Senior ML Engineer specializing in customer churn prediction for B2B SaaS.

INPUTS:
- [PRODUCT_TYPE]: B2B SaaS category (e.g., CRM, project management, analytics)
- [DATA_SOURCES]: available data (product usage, billing, support tickets, NPS)
- [LOOKBACK_DAYS]: feature lookback window (default 90)

TASKS:
1. Design a feature store schema with 15-20 predictive features across 4 categories:
   - Usage engagement (login frequency, feature adoption, session depth)
   - Financial (MRR, contract length, payment history)
   - Support (ticket count, resolution time, CSAT)
   - Firmographic (company size, industry, region)
2. Write the SQL feature extraction queries.
3. Specify the XGBoost training config (hyperparameters, validation strategy).
4. Write the SHAP explainability layer for per-customer churn drivers.
5. Define the prediction output schema (customer_id, churn_probability, top_3_drivers, recommended_action).

CONSTRAINTS:
- Features must be point-in-time correct to prevent leakage.
- Use time-series cross-validation (expanding window).
- Output must be interpretable by non-technical RevOps teams.

OUTPUT FORMAT: Feature store DDL, SQL extraction queries, Python training script skeleton, and prediction output schema.
\`\`\``,
    workflowContent: `## Prerequisites
- Data warehouse (BigQuery, Snowflake, or Redshift) with usage/billing/support data.
- Python 3.12+ with xgboost, shap, scikit-learn, pandas.
- Feature store platform (Feast, Tecton, or custom dbt + warehouse).

## Step-by-Step Execution
1. Confirm data sources are available and fresh (last 24h).
2. Run the prompt with your inputs to generate the feature store schema and SQL.
3. Create the feature tables in your warehouse using the generated DDL.
4. Backfill features for the lookback window (90 days default).
5. Run the XGBoost training script with time-series CV.
6. Validate model: target AUC > 0.82, precision@20% > 0.65.
7. Deploy the prediction job to run weekly.
8. Connect SHAP outputs to your RevOps dashboard (Looker, Metabase).

## Required Tools
- BigQuery or Snowflake
- Python 3.12+ (xgboost, shap, pandas)
- Feast or dbt for feature store
- Looker or Metabase for visualization

## Expected Output
Feature store DDL, 15+ SQL extraction queries, XGBoost training script, SHAP explainability layer, and prediction output schema.

## Success Metrics
- Model AUC > 0.82 on holdout set.
- Precision@20% (top-risk decile) > 0.65.
- RevOps team saves 15+ accounts/month using early-warning predictions.
- Net revenue retention improves by 3-5 percentage points within 2 quarters.`,
    audienceContent: `## Who This Is For
Data scientists and revenue operations analysts at B2B SaaS companies ($5M-$100M ARR) who need a production-ready churn prediction pipeline that explains WHY each customer is at risk.

## Real-World Use Cases
1. **Q1 retention sprint**: A project management SaaS at 8% monthly churn builds a pipeline to identify the top 20% at-risk accounts for the CS team to contact.
2. **Board-level NRR target**: A $40M ARR analytics platform needs to lift NRR from 106% to 112% and uses SHAP drivers to personalize retention plays.
3. **CS team enablement**: A CRM startup feeds daily churn-risk scores + top drivers into their CSM workflow tool so reps know exactly what to address.

## Industries & Niches
B2B SaaS, product-led growth companies, subscription businesses, developer tools, vertical SaaS (healthcare, legal, finance).`,
    tags: ['Churn Prediction', 'XGBoost', 'SHAP', 'Feature Store', 'B2B SaaS'],
    requiredTools: ['BigQuery', 'Python 3.12', 'Feast', 'xgboost'],
    useCases: [
      'Identifying top 20% at-risk accounts for CS outreach',
      'Personalizing retention plays using SHAP drivers',
      'Lifting NRR from 106% to 112% for board targets',
    ],
    trending: false,
    trendingScore: 78,
    featured: false,
    viewCount: 38400,
    downloadCount: 4200,
    rating: 4.8,
    faqQuestion: 'How do I build a churn prediction model with explainability for B2B SaaS?',
    faqAnswer: 'Build a feature store with usage, financial, and support features, train an XGBoost model with time-series cross-validation, and add a SHAP explainability layer to output per-customer churn drivers and recommended actions.',
    citation: 'McKinsey 2026 AI in SaaS report indicates companies using explainable churn models save 4.3x more at-risk accounts than those using black-box models.',
    seoKeywords: ['churn prediction', 'feature store', 'xgboost', 'shap explainability', 'b2b saas retention', 'nrr', 'ml pipeline'],
  },

  // ── business-strategy ──
  {
    slug: 'ai-moat-defensibility-assessment-prompt',
    type: 'prompt',
    title: 'AI Startup Moat & Defensibility Assessment Prompt for 2026 VCs',
    summary: 'Evaluates an AI startup\'s defensibility across 7 moat categories and outputs a scored assessment with investor-ready recommendations.',
    category: 'business-strategy',
    niche: 'Investment Analysis',
    audience: 'VC Analysts & Founders',
    difficulty: 'Advanced',
    language: 'English',
    promptContent: `\`\`\`
ROLE: You are a Partner at a Tier-1 AI venture capital firm evaluating defensibility.

INPUTS:
- [STARTUP_DESCRIPTION]: 2-3 sentence description of the AI startup
- [TECH_STACK]: core models, infrastructure, and proprietary data
- [GTM_MOTION]: go-to-market strategy (PLG, sales-led, API, embedded)
- [MARKET]: target market size and stage

TASKS:
Assess defensibility across 7 moat categories, scoring each 1-10:
1. **Data Moat**: Proprietary data assets, data network effects, data flywheels.
2. **Model Moat**: Fine-tuned models, custom training, model performance lead.
3. **Distribution Moat**: GTM channels, partnerships, embedded integrations.
4. **Switching Cost Moat**: Workflow lock-in, integration depth, migration cost.
5. **Network Effect Moat**: User-side, data-side, or ecosystem network effects.
6. **Brand & Trust Moat**: Enterprise certifications, SOC 2, references, thought leadership.
7. **Regulatory Moat**: Compliance barriers, licenses, regulatory relationships.

For each category, provide:
- Current score (1-10) with justification.
- 12-month trajectory (improving/stable/eroding).
- Concrete action to strengthen it.

OUTPUT FORMAT: Scored assessment table, top 3 risks, top 3 opportunities, and a 1-paragraph investor summary.
\`\`\``,
    workflowContent: `## Prerequisites
- Startup pitch deck or data room access.
- Understanding of the startup's tech stack and GTM motion.
- Market context (competitors, stage, trends).

## Step-by-Step Execution
1. Gather the 4 inputs (description, tech stack, GTM, market).
2. Run the prompt with GPT-5 or Claude 4 Opus for analytical depth.
3. Review the 7-category scored assessment.
4. Pressure-test each score: "What would a skeptical LP question here?"
5. Identify the 2 strongest and 2 weakest moats.
6. Draft the investor summary and actionable recommendations.
7. Compare scores to 3-5 comparable portfolio companies.

## Required Tools
- GPT-5 or Claude 4 Opus (for analysis)
- Pitch deck or data room (Notion, DocSend)
- Competitive intelligence (Crunchbase, PitchBook)

## Expected Output
A 7-category scored defensibility assessment (1-10 each), top 3 risks, top 3 opportunities, and a 1-paragraph investor summary with a go/no-go recommendation.

## Success Metrics
- Assessment aligns with IC (Investment Committee) consensus within +/- 1.5 points per category.
- Identified risks are concrete and actionable (not generic).
- Recommendations are specific enough to assign to a founder within 30 days.`,
    audienceContent: `## Who This Is For
VC analysts and associates at AI-focused funds, startup founders preparing for Series A+ fundraising, and corporate development teams evaluating AI acquisitions.

## Real-World Use Cases
1. **Series A diligence**: A VC analyst evaluates 5 AI startups in a pipeline and uses the assessment to rank defensibility before partner meetings.
2. **Founder prep**: A pre-Series A founder runs the assessment on their own startup to identify weak moats before pitching, then strengthens them.
3. **Corp dev screening**: An enterprise's M&A team assesses 3 acquisition targets to determine which has the most durable AI moat.

## Industries & Niches
Venture capital, startup fundraising, corporate M&A, AI accelerator programs, angel investing.`,
    tags: ['Moat Analysis', 'Defensibility', 'VC', 'Due Diligence', 'AI Startups'],
    requiredTools: ['GPT-5', 'PitchBook', 'Crunchbase'],
    useCases: [
      'Ranking 5 AI startups in a VC investment pipeline',
      'Founder self-assessment before Series A pitch',
      'Corp dev evaluation of 3 AI acquisition targets',
    ],
    trending: true,
    trendingScore: 83,
    featured: false,
    viewCount: 31200,
    downloadCount: 3800,
    rating: 4.7,
    faqQuestion: 'How do VCs assess the defensibility of an AI startup in 2026?',
    faqAnswer: 'VCs evaluate defensibility across 7 moat categories—data, model, distribution, switching costs, network effects, brand/trust, and regulatory—scoring each 1-10 with trajectory analysis and concrete strengthening actions.',
    citation: 'CB Insights 2026 AI Moat report finds that 68% of funded AI startups score 6+ on data moat but fewer than 20% score above 5 on regulatory moat.',
    seoKeywords: ['ai moat', 'defensibility assessment', 'vc due diligence', 'startup evaluation', 'data moat', 'network effects', 'ai investment'],
  },

  // ── design-creative ──
  {
    slug: 'design-system-token-architecture-skill',
    type: 'skill',
    title: 'Design System Token Architecture & Figma-to-Code Sync Skill',
    summary: 'Defines a skill that architects a multi-tier design token system (primitive, semantic, component) and generates sync code between Figma and a Tailwind 4 codebase.',
    category: 'design-creative',
    niche: 'Design Systems',
    audience: 'Design Systems Engineers',
    difficulty: 'Expert',
    language: 'English',
    promptContent: `\`\`\`
---
name: design-token-architect
version: 1.0.0
description: Architectures a multi-tier design token system and generates Figma-to-Tailwind sync code.
tools:
  - filesystem
  - figma-api (read-only)
inputs:
  - figmaFileKey: the Figma file containing variables/styles
  - tailwindConfigPath: path to tailwind.config.ts
outputs:
  - tokens.ts: primitive + semantic + component token definitions
  - syncScript.ts: Figma variables to Tailwind CSS variables sync
---

SYSTEM INSTRUCTIONS:
You are a Design Systems Engineer. When invoked:

1. Read Figma variables (color, typography, spacing, radius, shadow) via the Figma API.
2. Map them into a 3-tier token architecture:
   - **Primitive**: raw values (--color-emerald-500: oklch(...))
   - **Semantic**: meaning-based (--color-success: var(--color-emerald-500))
   - **Component**: component-scoped (--button-success-bg: var(--color-success))
3. Generate the tokens.ts file with all tiers as CSS custom properties.
4. Generate a sync script that pulls Figma variable changes and updates tokens.ts.
5. Output the Tailwind 4 @theme block mapping semantic tokens to utility classes.

CONSTRAINTS:
- Use OKLCH color space for all color tokens (per Tailwind 4 / CSS Color 4).
- Token names must follow the W3C Design Tokens Format Module.
- Sync script must be idempotent and diff-aware.
\`\`\``,
    workflowContent: `## Prerequisites
- Figma file with variables/styles defined (not just styles panel).
- Tailwind CSS 4 project with @theme support.
- Node.js 22+ and Figma API access token.

## Step-by-Step Execution
1. Install the skill in Cursor or Claude Code.
2. Provide the Figma file key and Tailwind config path.
3. Invoke: "Run design-token-architect".
4. The skill reads Figma variables via API and generates tokens.ts.
5. Review the 3-tier architecture (primitive → semantic → component).
6. Add the generated @theme block to your globals.css.
7. Set up the sync script as a CI/CD step or pre-commit hook.
8. Verify utility classes work (e.g., bg-success, text-foreground).

## Required Tools
- Figma (with variables defined)
- Tailwind CSS 4
- Cursor or Claude Code
- Figma API token

## Expected Output
tokens.ts with 3-tier token definitions, a Figma-to-Tailwind sync script, and a Tailwind 4 @theme configuration block.

## Success Metrics
- 100% of Figma variables mapped to code tokens.
- Design-to-code sync runs in under 30 seconds.
- Zero token naming drift between Figma and code after 30 days.
- New designers can ship UI using only semantic tokens within 1 week.`,
    audienceContent: `## Who This Is For
Design systems engineers, lead frontend developers, and design technologists at companies scaling a design system across multiple products and teams.

## Real-World Use Cases
1. **Design system v2**: A fintech company rebuilds its design system on Tailwind 4 and needs a token architecture that syncs from Figma automatically.
2. **Multi-product scaling**: A SaaS suite with 5 products needs shared primitive tokens but product-specific semantic tokens for brand differentiation.
3. **Design ops automation**: A design systems team sets up CI/CD to detect Figma variable changes and auto-generate PRs with updated tokens.

## Industries & Niches
Fintech, SaaS design systems, design ops, enterprise UI libraries, component library teams, design-to-code automation.`,
    tags: ['Design Tokens', 'Figma API', 'Tailwind 4', 'Design Systems', 'OKLCH'],
    requiredTools: ['Figma', 'Tailwind CSS 4', 'Cursor', 'Node.js 22'],
    useCases: [
      'Rebuilding a fintech design system on Tailwind 4 with Figma sync',
      'Multi-product token architecture with shared primitives',
      'CI/CD auto-PR for Figma variable changes',
    ],
    trending: false,
    trendingScore: 74,
    featured: false,
    viewCount: 26800,
    downloadCount: 3100,
    rating: 4.8,
    faqQuestion: 'How do I sync Figma design tokens with a Tailwind 4 codebase?',
    faqAnswer: 'Use a design token architect skill that reads Figma variables via API, maps them into a 3-tier architecture (primitive, semantic, component), generates tokens.ts as CSS custom properties, and outputs a sync script plus a Tailwind 4 @theme block.',
    citation: 'Figma 2026 Design Systems report shows teams with automated token sync ship UI 2.7x faster and have 83% fewer design-to-code drift bugs.',
    seoKeywords: ['design tokens', 'figma to code', 'tailwind 4', 'design system', 'oklch', 'token architecture', 'figma api'],
  },

  // ── sales-growth ──
  {
    slug: 'plg-activation-funnel-optimizer-prompt',
    type: 'prompt',
    title: 'PLG Activation Funnel Optimizer with AI-Powered Drop-off Analysis',
    summary: 'Analyzes product-led growth activation funnels, identifies drop-off points with AI, and generates personalized onboarding experiments to lift activation by 20%+.',
    category: 'sales-growth',
    niche: 'Growth & Activation',
    audience: 'Growth PMs & PLG Operators',
    difficulty: 'Advanced',
    language: 'English',
    promptContent: `\`\`\`
ROLE: You are a Senior Growth PM specializing in PLG activation optimization.

INPUTS:
- [FUNNEL_STEPS]: ordered list of activation funnel steps (e.g., signup → install → first action → aha moment → habit)
- [CONVERSION_RATES]: conversion rate per step (percentage)
- [TIME_TO_CONVERT]: median time per step
- [PRODUCT_TYPE]: PLG product category (dev tool, design tool, collaboration, analytics)

TASKS:
1. Calculate cumulative conversion and identify the 2 biggest drop-off points.
2. For each drop-off, generate 3 hypotheses ranked by expected impact and effort.
3. Design a personalized onboarding experiment for each hypothesis:
   - Trigger condition (user attribute or behavior)
   - Intervention (in-app message, email, tooltip, AI chat)
   - Success metric and target lift
   - Sample size and experiment duration
4. Specify the AI personalization layer: how to dynamically tailor the intervention using user firmographics and behavior.
5. Output a prioritized experiment backlog (ICE-scored: Impact, Confidence, Ease).

CONSTRAINTS:
- Experiments must be statistically valid (min 80% power, 95% confidence).
- Personalization must respect privacy (no PII in AI prompts).
- Each experiment should target at least 15% of the activating cohort.

OUTPUT FORMAT: Funnel analysis table, hypothesis backlog, experiment specs, and AI personalization architecture.
\`\`\``,
    workflowContent: `## Prerequisites
- Product analytics tool (Amplitude, Mixpanel, PostHog) with activation funnel defined.
- In-app messaging or email tool (CommandBar, Userflow, Customer.io).
- A/B testing framework with statistical power calculator.
- At least 500 new signups per week for valid experiments.

## Step-by-Step Execution
1. Export funnel data (steps, conversion rates, time-to-convert) from analytics.
2. Run the prompt with your funnel data to get drop-off analysis and experiment specs.
3. Prioritize the experiment backlog by ICE score.
4. Implement the top 2 experiments using your in-app messaging tool.
5. Configure the AI personalization layer (user attributes → intervention variant).
6. Launch experiments with proper sample size and duration.
7. Measure results after the experiment period (typically 2-4 weeks).
8. Roll out winners, iterate on losers, and re-run the analysis quarterly.

## Required Tools
- Amplitude or Mixpanel (funnel analytics)
- CommandBar or Userflow (in-app messaging)
- Customer.io (email lifecycle)
- GPT-5 or Claude 4 Opus (personalization logic)

## Expected Output
Funnel analysis with 2 biggest drop-offs, 6 ranked hypotheses (3 per drop-off), 2 detailed experiment specs, and an AI personalization architecture diagram.

## Success Metrics
- Activation rate lifts 20%+ within 2 experiment cycles.
- Time-to-aha moment reduced by 30%.
- Experiment win rate above 25% (industry benchmark).
- 90-day retention of activated users improves by 8+ percentage points.`,
    audienceContent: `## Who This Is For
Growth product managers and PLG operators at product-led SaaS companies (1K-50K monthly signups) who need a systematic, data-driven approach to activation funnel optimization.

## Real-World Use Cases
1. **Dev tool activation**: A CI/CD tool with 40% signup-to-first-build activation identifies the install step as the biggest drop-off and tests AI-guided setup.
2. **Collaboration app onboarding**: A Slack alternative sees users drop off before inviting teammates and tests personalized team-setup flows based on company size.
3. **Analytics tool aha moment**: A product analytics tool with low week-2 retention tests an AI-curated "first insight" experience to accelerate time-to-value.

## Industries & Niches
Product-led growth SaaS, developer tools, design tools, collaboration platforms, self-serve analytics, vertical SaaS with PLG motion.`,
    tags: ['PLG', 'Activation Funnel', 'Growth Experiments', 'Onboarding', 'A/B Testing'],
    requiredTools: ['Amplitude', 'CommandBar', 'GPT-5', 'Customer.io'],
    useCases: [
      'Lifting dev tool activation from 40% to 60% with AI-guided setup',
      'Personalizing collaboration app onboarding by company size',
      'Accelerating analytics tool time-to-aha with AI-curated insights',
    ],
    trending: true,
    trendingScore: 85,
    featured: false,
    viewCount: 44600,
    downloadCount: 5200,
    rating: 4.8,
    faqQuestion: 'How do I optimize a PLG activation funnel using AI in 2026?',
    faqAnswer: 'Analyze funnel drop-off points, generate ICE-scored hypotheses, design personalized onboarding experiments with AI-driven intervention variants, and run statistically valid A/B tests targeting 20%+ activation lift.',
    citation: 'OpenView 2026 PLG Benchmark report shows companies using AI-personalized onboarding achieve 2.4x higher activation rates than those using static flows.',
    seoKeywords: ['plg activation', 'funnel optimization', 'growth experiments', 'onboarding personalization', 'aha moment', 'ab testing', 'product-led growth'],
  },

  // ── education-research ──
  {
    slug: 'adaptive-learning-path-generator-skill',
    type: 'skill',
    title: 'Adaptive Learning Path Generator Skill for Personalized Curricula',
    summary: 'A skill that generates adaptive, competency-based learning paths from a learner profile, knowledge graph, and learning objectives, adjusting in real-time to assessment results.',
    category: 'education-research',
    niche: 'EdTech & Adaptive Learning',
    audience: 'EdTech Engineers & Instructional Designers',
    difficulty: 'Advanced',
    language: 'English',
    promptContent: `\`\`\`
---
name: adaptive-learning-path
version: 1.0.0
description: Generates competency-based adaptive learning paths that adjust to learner assessment results in real-time.
tools:
  - knowledge-graph-api (read-only)
  - assessment-engine
inputs:
  - learnerProfile: { currentLevel, goals, preferences, timeBudget }
  - learningObjective: the target competency
  - knowledgeGraph: subject domain knowledge graph
outputs:
  - learningPath: ordered sequence of learning units with assessments
  - adaptationRules: rules for adjusting the path based on assessment scores
---

SYSTEM INSTRUCTIONS:
You are an Adaptive Learning Engineer. When invoked:

1. Map the learner's current level to a starting node in the knowledge graph.
2. Compute the shortest competency path from current level to learning objective.
3. For each node in the path, select the optimal learning unit format (video, reading, interactive, project) based on learner preferences.
4. Generate a formative assessment for each unit (3-5 questions).
5. Define adaptation rules:
   - Score > 85%: skip next unit, advance to harder content.
   - Score 60-85%: proceed to next unit.
   - Score < 60%: insert remediation unit, then retry.
6. Output the learning path as a JSON sequence with unit metadata and assessment items.
7. Specify the real-time adaptation API contract (input: assessment result → output: next unit).

CONSTRAINTS:
- Each unit must map to exactly one knowledge graph node.
- Assessments must be auto-gradable (multiple choice, fill-in-blank, code).
- Path must fit within the learner's time budget.
- Include 1 stretch goal unit for advanced learners.
\`\`\``,
    workflowContent: `## Prerequisites
- Knowledge graph for the subject domain (Neo4j, or JSON-LD graph).
- Learning content library tagged by competency node.
- Assessment engine with auto-grading.
- Learner LMS or profile store.

## Step-by-Step Execution
1. Define the learning objective and learner profile (level, goals, preferences, time).
2. Ensure the knowledge graph covers the prerequisite chain to the objective.
3. Install the skill in your EdTech platform or AI coding tool.
4. Invoke: "Generate adaptive-learning-path for [learnerProfile] targeting [learningObjective]".
5. The skill outputs a JSON learning path with units and assessments.
6. Import the path into your LMS or learning app.
7. Configure the adaptation API to call the skill on each assessment submission.
8. Pilot with 50 learners, measure completion rates and time-to-mastery.

## Required Tools
- Neo4j or custom knowledge graph
- LMS (Moodle, Canvas, or custom Next.js app)
- GPT-5 or Claude 4 Opus (for path generation and adaptation)
- Auto-grading assessment engine

## Expected Output
A JSON learning path (ordered units with assessments and metadata), adaptation rules, and a real-time adaptation API contract.

## Success Metrics
- Learning path completion rate > 70% (vs 40% static paths).
- Time-to-mastery reduced by 30% vs fixed curricula.
- Assessment score improvement of 25%+ from path start to end.
- Learner satisfaction (NPS) above 50.`,
    audienceContent: `## Who This Is For
EdTech engineers, instructional designers, and learning platform product managers building adaptive learning experiences for K-12, higher ed, or corporate training.

## Real-World Use Cases
1. **Corporate upskilling**: A Fortune 500 company deploys adaptive Python training for 5,000 employees, with paths adjusting based on weekly coding assessments.
2. **K-12 math tutoring**: An adaptive math platform generates personalized paths for 8th graders based on diagnostic assessment, adjusting after each unit.
3. **Higher ed CS curriculum**: A university CS department replaces fixed syllabi with adaptive paths that let strong students skip ahead and struggling students get remediation.

## Industries & Niches
EdTech, corporate L&D, K-12 education, higher education, coding bootcamps, professional certification prep, language learning.`,
    tags: ['Adaptive Learning', 'Knowledge Graph', 'EdTech', 'Competency-Based', 'Personalization'],
    requiredTools: ['Neo4j', 'GPT-5', 'Canvas LMS', 'Auto-grading Engine'],
    useCases: [
      'Corporate Python upskilling for 5,000 employees with weekly assessments',
      'K-12 adaptive math tutoring with diagnostic-based paths',
      'University CS curriculum with competency-based advancement',
    ],
    trending: true,
    trendingScore: 80,
    featured: false,
    viewCount: 29500,
    downloadCount: 3400,
    rating: 4.7,
    faqQuestion: 'How do I build an adaptive learning path that adjusts to student performance?',
    faqAnswer: 'Use a knowledge graph to map competencies, generate a personalized path from the learner level to the objective, add auto-graded assessments per unit, and define adaptation rules that skip, advance, or remediate based on scores via a real-time API.',
    citation: 'Gates Foundation 2026 EdTech report finds adaptive learning paths improve completion rates by 75% and reduce time-to-mastery by 32% compared to fixed curricula.',
    seoKeywords: ['adaptive learning', 'personalized curriculum', 'knowledge graph', 'competency-based education', 'edtech ai', 'learning path', 'formative assessment'],
  },

  // ── automation-agents ──
  {
    slug: 'multi-modal-customer-support-agent-prompt',
    type: 'prompt',
    title: 'Multi-Modal Autonomous Customer Support Agent with Voice & Vision',
    summary: 'Architects an autonomous support agent that handles text, voice, and image inputs, resolves tickets across 5 channels, and escalates with full context handoff.',
    category: 'automation-agents',
    niche: 'Autonomous Support Agents',
    audience: 'AI Engineers & Support Ops Leads',
    difficulty: 'Expert',
    language: 'English',
    promptContent: `\`\`\`
ROLE: You are a Senior AI Agent Architect designing autonomous customer support systems.

INPUTS:
- [SUPPORT_CHANNELS]: list of channels (chat, email, voice, WhatsApp, in-app)
- [KNOWLEDGE_BASES]: available KBs (help center, docs, past tickets, product DB)
- [TICKET_TYPES]: common ticket categories (billing, bug, how-to, feature request, refund)
- [ESCALATION_CRITERIA]: when to escalate to human (sentiment, complexity, VIP)

TASKS:
1. Design the agent architecture with 4 specialized sub-agents:
   - **Triage Agent**: classifies ticket type, priority, and sentiment.
   - **Resolution Agent**: retrieves KB context and drafts a response.
   - **Multi-Modal Agent**: processes voice (transcribe + intent) and image (screenshot analysis for bugs).
   - **Escalation Agent**: decides when to hand off, packages full context.
2. Define the tool inventory for each sub-agent (RAG search, CRM lookup, refund API, ticketing API).
3. Specify the conversation state schema (context, history, confidence, escalation flag).
4. Write the escalation handoff protocol (what context the human agent receives).
5. Define success guardrails (max 3 retrieval attempts, confidence threshold > 0.85 for auto-resolve).

CONSTRAINTS:
- Voice agent must handle interruptions and barge-in.
- Image agent must redact PII before processing.
- Escalation must include: full transcript, attempted resolutions, customer sentiment, account value.
- Auto-resolve only for confidence > 0.85 and non-VIP accounts.

OUTPUT FORMAT: Architecture diagram (ASCII), sub-agent specs, tool inventory, state schema, escalation protocol, and guardrail rules.
\`\`\``,
    workflowContent: `## Prerequisites
- Help center / knowledge base with at least 200 articles.
- CRM and ticketing system with API access (Zendesk, Intercom, HubSpot).
- Voice processing pipeline (Deepgram or Whisper for STT, ElevenLabs or Azure for TTS).
- Vision model (GPT-5 Vision or Claude 4 Opus) for screenshot analysis.
- LangGraph 2.0 or CrewAI for multi-agent orchestration.

## Step-by-Step Execution
1. Audit your support channels and KB coverage for the top 5 ticket types.
2. Run the prompt to generate the 4-agent architecture and tool inventory.
3. Implement the Triage Agent first (classification + sentiment).
4. Connect the Resolution Agent to your KB via RAG (pgvector or Pinecone).
5. Add the Multi-Modal Agent for voice (STT → intent → TTS) and image (screenshot → bug analysis).
6. Implement the Escalation Agent with the context packaging protocol.
7. Deploy in "assist mode" (agent drafts, human approves) for 2 weeks.
8. Measure auto-resolve rate, CSAT, and escalation accuracy.
9. Gradually enable auto-resolve for high-confidence, non-VIP tickets.

## Required Tools
- LangGraph 2.0 or CrewAI (orchestration)
- Deepgram or Whisper (voice STT)
- GPT-5 Vision or Claude 4 Opus (multi-modal)
- Pinecone or pgvector (KB RAG)
- Zendesk or Intercom (ticketing API)

## Expected Output
4-agent architecture, tool inventory per agent, conversation state schema, escalation handoff protocol, and guardrail ruleset.

## Success Metrics
- 45%+ of tickets auto-resolved without human intervention.
- CSAT for auto-resolved tickets >= 4.3/5.
- Escalation accuracy > 90% (correctly identifies when to escalate).
- Average resolution time reduced by 60%.
- VIP and high-complexity tickets always escalated (0% missed).`,
    audienceContent: `## Who This Is For
AI engineers and support operations leads at companies receiving 1,000+ support tickets per week who want to deploy an autonomous multi-modal agent that resolves tickets across channels without sacrificing CSAT.

## Real-World Use Cases
1. **SaaS support automation**: A B2B SaaS company receiving 5,000 tickets/week deploys a multi-modal agent that auto-resolves 45% (mostly how-to and billing) and escalates bugs with screenshot analysis.
2. **E-commerce voice support**: An e-commerce brand launches a voice support line where customers describe issues verbally; the agent transcribes, resolves, and only escalates refunds over $100.
3. **Tier-1 deflection**: A developer tools company uses the agent to handle all Tier-1 tickets (password reset, billing, basic how-to) so human agents focus on complex technical issues.

## Industries & Niches
SaaS support, e-commerce customer service, developer tools, fintech support, telecom, healthcare patient support (with HIPAA compliance).`,
    tags: ['Autonomous Agents', 'Multi-Modal', 'Customer Support', 'Voice AI', 'LangGraph'],
    requiredTools: ['LangGraph 2.0', 'Deepgram', 'GPT-5 Vision', 'Pinecone', 'Zendesk'],
    useCases: [
      'Auto-resolving 45% of 5,000 weekly SaaS tickets across chat/email/voice',
      'E-commerce voice support line with STT and refund escalation',
      'Tier-1 ticket deflection for developer tools company',
    ],
    trending: true,
    trendingScore: 89,
    featured: true,
    viewCount: 67200,
    downloadCount: 7800,
    rating: 4.9,
    faqQuestion: 'How do I build an autonomous customer support agent that handles voice and images?',
    faqAnswer: 'Architect 4 specialized sub-agents (Triage, Resolution, Multi-Modal, Escalation) using LangGraph 2.0, connect them to your KB via RAG, add voice STT/TTS and vision for screenshots, and deploy in assist mode before enabling auto-resolve with confidence guardrails.',
    citation: 'Gartner 2026 Customer Service AI report predicts 70% of Tier-1 support will be auto-resolved by multi-modal agents by 2027, up from 25% in 2025.',
    seoKeywords: ['autonomous support agent', 'multi-modal ai', 'voice support', 'customer service automation', 'langgraph', 'agent architecture', 'ticket resolution'],
  },
]
