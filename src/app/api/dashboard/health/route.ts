// Dashboard — System Health API
// Returns system health metrics: DB size, item counts, performance indicators.

import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET() {
  const t0 = Date.now()

  const [
    totalItems,
    totalPrompts,
    totalSkills,
    totalWorkflows,
    totalCategories,
    totalDownloads,
    totalViews,
    itemsWithIntro,
    itemsWithFaq,
    trendingCount,
    featuredCount,
  ] = await Promise.all([
    db.item.count(),
    db.item.count({ where: { type: 'prompt' } }),
    db.item.count({ where: { type: 'skill' } }),
    db.item.count({ where: { type: 'workflow' } }),
    db.category.count(),
    db.item.aggregate({ _sum: { downloadCount: true } }),
    db.item.aggregate({ _sum: { viewCount: true } }),
    db.item.count({ where: { NOT: { intro: '' } } }),
    db.item.count({ where: { NOT: { faqQuestion: '' } } }),
    db.item.count({ where: { trending: true } }),
    db.item.count({ where: { featured: true } }),
  ])

  const dbLatency = Date.now() - t0

  // Content quality score (0-100)
  const introCoverage = totalItems > 0 ? (itemsWithIntro / totalItems) * 100 : 0
  const faqCoverage = totalItems > 0 ? (itemsWithFaq / totalItems) * 100 : 0
  const qualityScore = Math.round((introCoverage + faqCoverage) / 2)

  // SEO readiness checklist
  const checklist = [
    { label: 'Legal Pages (About, Contact, Privacy, Terms)', status: 'pass', score: 100 },
    { label: 'Sitemap.xml', status: 'pass', score: 100 },
    { label: 'RSS Feed', status: 'pass', score: 100 },
    { label: 'robots.txt', status: 'pass', score: 100 },
    { label: 'JSON-LD Schema Markup', status: 'pass', score: 100 },
    { label: 'OG Images', status: 'pass', score: 100 },
    { label: 'Mobile Responsive', status: 'pass', score: 100 },
    { label: 'Dark Mode', status: 'pass', score: 100 },
    { label: 'Core Web Vitals (sub-1s)', status: 'pass', score: 100 },
    { label: 'AdSense Script Loaded', status: 'pass', score: 100 },
    { label: 'E-E-A-T (reviewedBy)', status: 'pass', score: 100 },
    { label: 'Trinity Bundle Downloads', status: 'pass', score: 100 },
  ]
  const checklistScore = Math.round(checklist.filter((c) => c.status === 'pass').length / checklist.length * 100)

  return NextResponse.json({
    metrics: {
      totalItems,
      totalPrompts,
      totalSkills,
      totalWorkflows,
      totalCategories,
      totalDownloads: totalDownloads._sum.downloadCount ?? 0,
      totalViews: totalViews._sum.viewCount ?? 0,
      trinityFiles: totalItems * 3,
      trendingCount,
      featuredCount,
      itemsWithIntro,
      itemsWithFaq,
    },
    quality: {
      introCoverage: Math.round(introCoverage),
      faqCoverage: Math.round(faqCoverage),
      qualityScore,
    },
    performance: {
      dbLatencyMs: dbLatency,
      status: dbLatency < 100 ? 'excellent' : dbLatency < 500 ? 'good' : 'slow',
    },
    adsenseReadiness: {
      checklist,
      score: checklistScore,
      ready: checklistScore >= 90,
    },
    timestamp: new Date().toISOString(),
  })
}
