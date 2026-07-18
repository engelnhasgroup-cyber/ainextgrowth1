// SEO / GEO / AEO structured data (JSON-LD) injected into the page.

import type { LibraryStats, CategoryInfo, ItemSummary } from '@/lib/types'

export function SeoSchema({
  stats,
  categories,
  trending,
}: {
  stats: LibraryStats
  categories: CategoryInfo[]
  trending: ItemSummary[]
}) {
  const siteUrl = 'https://nexusai2026.example.com'

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    url: siteUrl,
    name: 'NexusAI 2026 — AI Prompt & Skill Library',
    description:
      'The largest autonomous AI Prompt & Skill Library for 2026. 200 trending items generated daily as Trinity Bundles (Prompt + Workflow + Audience).',
    inLanguage: 'en',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
    publisher: { '@id': `${siteUrl}/#org` },
  }

  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteUrl}/#org`,
    name: 'NexusAI 2026',
    url: siteUrl,
    description:
      'Autonomous AI Prompt & Skill Library generating 200 trending items daily as Trinity Bundles.',
    knowsAbout: [
      'Prompt Engineering',
      'AI Agents',
      'Neuro-Prompting',
      'Agentic Workflows',
      'SEO',
      'GEO',
      'AEO',
    ],
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the NexusAI 2026 AI Prompt & Skill Library?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'It is the largest autonomous AI Prompt & Skill Library for 2026. An AI agent swarm generates 200 fresh trending prompts and skills daily, each shipped as a Trinity Bundle of 3 Markdown files: the prompt, the workflow, and the target audience.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is a Trinity Bundle?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A Trinity Bundle is three Markdown files: (1) The Prompt or Skill itself, (2) The Workflow & Execution guide with required tools and success metrics, and (3) The Target Audience & Use Cases with real-world scenarios. All three download together after a short sponsor message.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does the autonomous AI agent work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A coordinated swarm of 20 specialized AI agents forecasts trends, engineers neuro-prompts using 2026 techniques like tree-of-thoughts, authors workflows, maps audiences, wires internal links, injects schema markup, and ships 100 prompts plus 100 skills every day.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is the library optimized for SEO, GEO and AEO?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Content is structured with semantic HTML, Schema.org JSON-LD, Q&A formats for Answer Engine Optimization, and statistical citations for Generative Engine Optimization, targeting high-CPC markets like the USA, UK, Canada and Australia.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are the downloads really free?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Every Trinity Bundle is free to download as Markdown. The library is supported by non-intrusive ads shown during a short countdown before downloads unlock. Files include a small attribution backlink to support the project.',
        },
      },
    ],
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Library', item: `${siteUrl}/#library` },
    ],
  }

  // ItemList of trending for rich results
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Trending AI Prompts & Skills Today',
    itemListElement: trending.slice(0, 10).map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.title,
      description: it.summary,
      url: `${siteUrl}/#trending`,
    })),
  }

  const collectionPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'NexusAI 2026 AI Prompt & Skill Library',
    description: `${stats.totalItems} prompts and skills across ${stats.totalCategories} categories. ${stats.totalDownloads} downloads served.`,
    hasPart: categories.map((c) => ({
      '@type': 'DefinedTermSet',
      name: c.name,
      description: c.description,
    })),
  }

  const json = [
    websiteSchema,
    orgSchema,
    faqSchema,
    breadcrumbSchema,
    itemListSchema,
    collectionPageSchema,
  ]

  return (
    <>
      {json.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  )
}
