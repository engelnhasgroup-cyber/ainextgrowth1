// ainextgrowth — Dynamic OG Image Generator
// Generates a branded Open Graph image for each item (1200×630 SVG).
// GET /og/[slug] — returns image/svg+xml

import { NextRequest, NextResponse } from 'next/server'
import { fetchBySlug } from '@/lib/queries'

export const dynamic = 'force-dynamic'
export const revalidate = 3600

function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function truncate(s: string, max: number): string {
  if (s.length <= max) return s
  return s.slice(0, max - 1) + '…'
}

const TYPE_COLORS: Record<string, string> = {
  prompt: '#10b981',
  skill: '#8b5cf6',
  workflow: '#f59e0b',
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const item = await fetchBySlug(slug)

  if (!item) {
    return new NextResponse('Not found', { status: 404 })
  }

  const typeColor = TYPE_COLORS[item.type] || '#10b981'
  const title = escapeXml(truncate(item.title, 70))
  const summary = escapeXml(truncate(item.summary, 120))
  const niche = escapeXml(item.niche)
  const audience = escapeXml(truncate(item.audience, 40))

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0a0a0f"/>
      <stop offset="50%" stop-color="#12121f"/>
      <stop offset="100%" stop-color="#0a0a0f"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#10b981"/>
      <stop offset="100%" stop-color="#8b5cf6"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.5" cy="0" r="0.6">
      <stop offset="0%" stop-color="${typeColor}" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="${typeColor}" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="400" fill="url(#glow)"/>

  <!-- Grid pattern -->
  <g opacity="0.04" stroke="#ffffff" stroke-width="1">
    <line x1="0" y1="100" x2="1200" y2="100"/>
    <line x1="0" y1="200" x2="1200" y2="200"/>
    <line x1="0" y1="300" x2="1200" y2="300"/>
    <line x1="0" y1="400" x2="1200" y2="400"/>
    <line x1="0" y1="500" x2="1200" y2="500"/>
    <line x1="200" y1="0" x2="200" y2="630"/>
    <line x1="400" y1="0" x2="400" y2="630"/>
    <line x1="600" y1="0" x2="600" y2="630"/>
    <line x1="800" y1="0" x2="800" y2="630"/>
    <line x1="1000" y1="0" x2="1000" y2="630"/>
  </g>

  <!-- Top accent bar -->
  <rect x="0" y="0" width="1200" height="4" fill="url(#accent)"/>

  <!-- Brand -->
  <g transform="translate(60, 50)">
    <rect width="32" height="32" rx="8" fill="url(#accent)"/>
    <text x="48" y="22" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="700" fill="#ffffff">ainextgrowth</text>
    <text x="48" y="40" font-family="system-ui, -apple-system, sans-serif" font-size="11" fill="#999999">AI Prompt &amp; Skill Library</text>
  </g>

  <!-- Type badge -->
  <g transform="translate(60, 140)">
    <rect width="${item.type.length * 9 + 24}" height="28" rx="14" fill="${typeColor}" fill-opacity="0.15"/>
    <text x="12" y="19" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="${typeColor}" text-transform="uppercase">${item.type.toUpperCase()}</text>
  </g>

  <!-- Niche badge -->
  <g transform="translate(${60 + item.type.length * 9 + 36}, 140)">
    <rect width="${niche.length * 7 + 20}" height="28" rx="14" fill="#ffffff" fill-opacity="0.08"/>
    <text x="10" y="19" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="500" fill="#cccccc">${niche}</text>
  </g>

  <!-- Title -->
  <text x="60" y="230" font-family="system-ui, -apple-system, sans-serif" font-size="42" font-weight="800" fill="#ffffff" letter-spacing="-1">
    <tspan x="60" dy="0">${title.length > 35 ? title.slice(0, 35) : title}</tspan>
    ${title.length > 35 ? `<tspan x="60" dy="50" font-size="38">${title.slice(35)}</tspan>` : ''}
  </text>

  <!-- Summary -->
  <text x="60" y="380" font-family="system-ui, -apple-system, sans-serif" font-size="18" fill="#aaaaaa" font-weight="400">
    <tspan x="60" dy="0">${summary.length > 60 ? summary.slice(0, 60) : summary}</tspan>
    ${summary.length > 60 ? `<tspan x="60" dy="26">${summary.slice(60)}</tspan>` : ''}
  </text>

  <!-- Stats row -->
  <g transform="translate(60, 490)">
    <text x="0" y="0" font-family="system-ui, -apple-system, sans-serif" font-size="14" fill="#666666">Target audience:</text>
    <text x="0" y="22" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="600" fill="#ffffff">${audience}</text>
  </g>

  <!-- Stats badges -->
  <g transform="translate(700, 490)">
    <rect width="80" height="32" rx="16" fill="#ffffff" fill-opacity="0.05"/>
    <text x="40" y="21" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="600" fill="#ffffff">★ ${item.rating.toFixed(1)}</text>
  </g>
  <g transform="translate(790, 490)">
    <rect width="100" height="32" rx="16" fill="#ffffff" fill-opacity="0.05"/>
    <text x="50" y="21" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="600" fill="#ffffff">${item.downloadCount.toLocaleString()} DL</text>
  </g>
  <g transform="translate(900, 490)">
    <rect width="120" height="32" rx="16" fill="${typeColor}" fill-opacity="0.15"/>
    <text x="60" y="21" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="600" fill="${typeColor}">Trinity Bundle</text>
  </g>

  <!-- Bottom gradient line -->
  <rect x="0" y="626" width="1200" height="4" fill="url(#accent)" opacity="0.5"/>
</svg>`

  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
