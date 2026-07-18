// Shared types for NexusAI 2026

export type ItemType = 'prompt' | 'skill' | 'workflow'
export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'

export interface ItemSummary {
  id: string
  slug: string
  type: ItemType
  title: string
  summary: string
  category: string
  niche: string
  audience: string
  difficulty: Difficulty
  tags: string[]
  requiredTools: string[]
  trending: boolean
  trendingScore: number
  featured: boolean
  viewCount: number
  downloadCount: number
  rating: number
  runDate: string
  source: string
  reviewedBy: string
  createdAt: string
}

export interface ItemDetail extends ItemSummary {
  language: string
  intro: string
  promptContent: string
  workflowContent: string
  audienceContent: string
  useCases: string[]
  faqQuestion: string
  faqAnswer: string
  citation: string
  seoKeywords: string[]
  relatedIds: string[]
}

export interface CategoryInfo {
  id: string
  slug: string
  name: string
  description: string
  icon: string
  color: string
  itemCount?: number
}

export interface LibraryStats {
  totalItems: number
  totalPrompts: number
  totalSkills: number
  totalWorkflows: number
  totalCategories: number
  totalDownloads: number
  todayGenerated: number
  trinityFiles: number
}

export interface ItemsQuery {
  type?: ItemType | 'all'
  category?: string
  search?: string
  trending?: boolean
  featured?: boolean
  sort?: 'trending' | 'newest' | 'popular' | 'downloads' | 'rating'
  limit?: number
  offset?: number
}

export interface ItemsResponse {
  items: ItemSummary[]
  total: number
  hasMore: boolean
}
