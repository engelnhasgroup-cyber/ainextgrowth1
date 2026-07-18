import { NextResponse } from 'next/server'
import { fetchStats } from '@/lib/queries'

export async function GET() {
  const stats = await fetchStats()
  return NextResponse.json(stats)
}
