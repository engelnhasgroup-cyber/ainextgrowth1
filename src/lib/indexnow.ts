// NexusAI 2026 — IndexNow API utility
// Pings Bing/Yandex/IndexNow with new URLs for instant indexing.
// https://www.bing.com/indexnow

import { getAdminSettings } from '@/lib/admin-settings'

const INDEXNOW_API = 'https://api.indexnow.org/IndexNow'

export async function pingIndexNow(urls: string[]): Promise<{ success: boolean; message: string }> {
  if (urls.length === 0) return { success: false, message: 'No URLs provided' }

  try {
    const settings = await getAdminSettings()
    const siteUrl = settings.siteUrl || 'https://ainextgrowth.com'

    // Full URLs
    const fullUrls = urls.map((u) => u.startsWith('http') ? u : `${siteUrl}${u}`)

    const body = {
      host: new URL(siteUrl).host,
      key: 'ainextgrowth2026key', // IndexNow key (should be hosted at /{key}.txt)
      keyLocation: `${siteUrl}/ainextgrowth2026key.txt`,
      urlList: fullUrls,
    }

    // Mock the API call (in production, uncomment the fetch):
    // const res = await fetch(INDEXNOW_API, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(body),
    // })
    // if (res.status === 200) return { success: true, message: `Pinged ${fullUrls.length} URLs` }

    console.log(`[IndexNow] Pinging ${fullUrls.length} URLs:`, fullUrls.slice(0, 3))
    return { success: true, message: `Pinged ${fullUrls.length} URLs (mock)` }
  } catch (e: any) {
    console.error('[IndexNow] Error:', e?.message)
    return { success: false, message: e?.message || 'IndexNow ping failed' }
  }
}

// Helper for pinging a single new item URL
export async function pingItemCreated(slug: string) {
  return pingIndexNow([`/?item=${slug}`])
}

// Helper for pinging a new blog article URL
export async function pingArticleCreated(slug: string) {
  return pingIndexNow([`/blog/${slug}`])
}
