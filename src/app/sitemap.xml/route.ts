// Dynamic sitemap.xml — generated from the database.
// Lists the homepage + every item as a virtual route (#trending anchors map
// to on-page modal-driven detail views). This maximizes indexable URLs for
// SEO while keeping the single visible `/` route.

import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'
export const revalidate = 3600

const SITE_URL = 'https://nexusai2026.example.com'

export async function GET() {
  const items = await db.item.findMany({
    select: { slug: true, updatedAt: true, type: true, category: true },
    orderBy: { updatedAt: 'desc' },
  })
  const cats = await db.category.findMany({ select: { slug: true } })

  const now = new Date().toISOString()

  const urls: { loc: string; lastmod?: string; changefreq: string; priority: string }[] = [
    { loc: SITE_URL + '/', lastmod: now, changefreq: 'hourly', priority: '1.0' },
    { loc: SITE_URL + '/#trending', changefreq: 'hourly', priority: '0.9' },
    { loc: SITE_URL + '/#library', changefreq: 'hourly', priority: '0.9' },
    { loc: SITE_URL + '/#categories', changefreq: 'daily', priority: '0.8' },
    { loc: SITE_URL + '/#agent', changefreq: 'daily', priority: '0.7' },
    { loc: SITE_URL + '/#how', changefreq: 'weekly', priority: '0.6' },
    // Legal pages (AdSense compliance requirement)
    { loc: SITE_URL + '/?page=about', lastmod: now, changefreq: 'monthly', priority: '0.6' },
    { loc: SITE_URL + '/?page=contact', lastmod: now, changefreq: 'monthly', priority: '0.6' },
    { loc: SITE_URL + '/?page=privacy', lastmod: now, changefreq: 'monthly', priority: '0.6' },
    { loc: SITE_URL + '/?page=terms', lastmod: now, changefreq: 'monthly', priority: '0.6' },
    // Feeds
    { loc: SITE_URL + '/rss.xml', changefreq: 'hourly', priority: '0.6' },
    { loc: SITE_URL + '/sitemap.xml', changefreq: 'daily', priority: '0.5' },
  ]

  // category landing anchors
  for (const c of cats) {
    urls.push({
      loc: `${SITE_URL}/#categories`,
      lastmod: now,
      changefreq: 'daily',
      priority: '0.8',
    })
  }

  // per-item virtual routes (the detail view is modal but URL-addressable)
  for (const it of items) {
    urls.push({
      loc: `${SITE_URL}/?item=${encodeURIComponent(it.slug)}`,
      lastmod: it.updatedAt instanceof Date ? it.updatedAt.toISOString() : now,
      changefreq: 'weekly',
      priority: it.type === 'prompt' ? '0.75' : '0.72',
    })
  }

  // Blog articles
  const articles = await db.article.findMany({
    select: { slug: true, updatedAt: true },
    orderBy: { publishedAt: 'desc' },
  })
  for (const a of articles) {
    urls.push({
      loc: `${SITE_URL}/blog/${encodeURIComponent(a.slug)}`,
      lastmod: a.updatedAt instanceof Date ? a.updatedAt.toISOString() : now,
      changefreq: 'weekly',
      priority: '0.8',
    })
  }
  // Blog list page
  urls.push({ loc: `${SITE_URL}/blog`, lastmod: now, changefreq: 'daily', priority: '0.85' })

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>${u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : ''}
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
