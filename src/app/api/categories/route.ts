import { NextResponse } from 'next/server'
import { fetchCategories } from '@/lib/queries'

export async function GET() {
  const categories = await fetchCategories()
  return NextResponse.json({ categories })
}
