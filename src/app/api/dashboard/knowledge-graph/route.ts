// Dashboard — Knowledge Graph API
// Returns internal link graph data for visualization.

import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET() {
  const items = await db.item.findMany({
    select: {
      id: true,
      slug: true,
      title: true,
      type: true,
      category: true,
      niche: true,
      relatedIds: true,
      tags: true,
    },
    take: 100, // limit for performance
  })

  // Build nodes
  const nodes = items.map((item) => ({
    id: item.id,
    label: item.title.slice(0, 40),
    type: item.type,
    category: item.category,
    niche: item.niche,
  }))

  // Build edges from relatedIds
  const edges: { source: string; target: string; strength: number }[] = []
  const seen = new Set<string>()

  for (const item of items) {
    if (!item.relatedIds) continue
    const relatedIds = item.relatedIds.split(',').filter(Boolean)
    for (const rid of relatedIds) {
      const key = [item.id, rid].sort().join('-')
      if (seen.has(key)) continue
      seen.add(key)
      // Only add edge if target exists in our limited set
      if (items.find((i) => i.id === rid)) {
        edges.push({ source: item.id, target: rid, strength: 1 })
      }
    }
  }

  // Also add edges based on shared tags (weaker connection)
  const tagMap = new Map<string, string[]>()
  for (const item of items) {
    if (!item.tags) continue
    const tags = item.tags.split(',').map((t) => t.trim().toLowerCase())
    for (const tag of tags) {
      if (!tagMap.has(tag)) tagMap.set(tag, [])
      tagMap.get(tag)!.push(item.id)
    }
  }

  for (const [, ids] of tagMap) {
    if (ids.length < 2 || ids.length > 10) continue // skip very common tags
    for (let i = 0; i < ids.length; i++) {
      for (let j = i + 1; j < ids.length; j++) {
        const key = [ids[i], ids[j]].sort().join('-')
        if (seen.has(key)) continue
        seen.add(key)
        if (items.find((it) => it.id === ids[i]) && items.find((it) => it.id === ids[j])) {
          edges.push({ source: ids[i], target: ids[j], strength: 0.5 })
        }
      }
    }
  }

  return NextResponse.json({
    nodes,
    edges,
    stats: {
      totalNodes: nodes.length,
      totalEdges: edges.length,
      avgConnections: nodes.length > 0 ? (edges.length / nodes.length).toFixed(1) : '0',
    },
  })
}
