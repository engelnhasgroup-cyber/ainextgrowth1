'use client'

import { useEffect, useState } from 'react'
import { Twitter, Linkedin, MessageSquare, Send, RefreshCw, Power, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

const PLATFORM_ICONS: Record<string, any> = {
  twitter: Twitter,
  linkedin: Linkedin,
  reddit: MessageSquare,
  telegram: Send,
}

const PLATFORM_COLORS: Record<string, string> = {
  twitter: '#1d9bf0',
  linkedin: '#0a66c2',
  reddit: '#ff4500',
  telegram: '#0088cc',
}

interface Platform {
  name: string
  label: string
  connected: boolean
  autoPost: boolean
  lastPostedAt: string | null
  hasApiKey: boolean
}

export function SocialCommandCenter() {
  const [platforms, setPlatforms] = useState<Platform[]>([])
  const [loading, setLoading] = useState(true)

  const fetchData = () => {
    setLoading(true)
    fetch('/api/dashboard/social').then((r) => r.json()).then((d) => {
      setPlatforms(d.platforms || [])
      setLoading(false)
    }).catch(() => setLoading(false))
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchData()
  }, [])

  const toggleAutoPost = async (platform: string, currentValue: boolean) => {
    try {
      await fetch('/api/dashboard/social', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ platform, action: 'toggle_auto', value: !currentValue }),
      })
      toast.success(`Auto-post ${!currentValue ? 'enabled' : 'disabled'} for ${platform}`)
      fetchData()
    } catch { toast.error('Failed to toggle') }
  }

  const toggleConnect = async (platform: string, currentlyConnected: boolean) => {
    try {
      await fetch('/api/dashboard/social', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ platform, action: currentlyConnected ? 'disconnect' : 'connect', value: {} }),
      })
      toast.success(`${platform} ${currentlyConnected ? 'disconnected' : 'connected (mock)'}`)
      fetchData()
    } catch { toast.error('Failed') }
  }

  if (loading) {
    return (
      <div className="space-y-2">
        {[1,2,3,4].map((i) => (
          <div key={i} className="h-12 animate-pulse rounded-lg border border-border/40 bg-muted/20" />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <div className="space-y-2">
        {platforms.map((p) => {
          const Icon = PLATFORM_ICONS[p.name] || Zap
          const color = PLATFORM_COLORS[p.name] || '#10b981'
          return (
            <div key={p.name} className="flex items-center gap-2 rounded-lg border border-border/40 bg-background/40 px-3 py-2">
              <div className="grid h-7 w-7 shrink-0 place-items-center rounded-md" style={{ backgroundColor: `${color}1f`, color }}>
                <Icon className="h-3.5 w-3.5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-xs font-semibold">{p.label}</p>
                  <span className={`inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[8px] font-bold ${
                    p.connected ? 'bg-emerald-500/15 text-emerald-400' : 'bg-muted/60 text-muted-foreground'
                  }`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${p.connected ? 'bg-emerald-500' : 'bg-muted-foreground'}`} />
                    {p.connected ? 'Connected' : 'Not connected'}
                  </span>
                </div>
                <p className="text-[9px] text-muted-foreground">
                  {p.lastPostedAt ? `Last posted: ${new Date(p.lastPostedAt).toLocaleString()}` : 'Never posted'}
                </p>
              </div>
              {/* Auto-post toggle */}
              <button
                onClick={() => toggleAutoPost(p.name, p.autoPost)}
                disabled={!p.connected}
                className={`relative h-5 w-9 rounded-full transition-colors disabled:opacity-30 ${p.autoPost && p.connected ? 'bg-emerald-500' : 'bg-muted'}`}
                aria-label={`Toggle auto-post for ${p.label}`}
              >
                <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${p.autoPost && p.connected ? 'translate-x-4' : 'translate-x-0.5'}`} />
              </button>
              {/* Connect/disconnect */}
              <button
                onClick={() => toggleConnect(p.name, p.connected)}
                className={`grid h-7 w-7 place-items-center rounded-md transition-colors ${
                  p.connected ? 'bg-rose-500/10 text-rose-400 hover:bg-rose-500/20' : 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20'
                }`}
                aria-label={p.connected ? `Disconnect ${p.label}` : `Connect ${p.label}`}
              >
                <Power className="h-3 w-3" />
              </button>
            </div>
          )
        })}
      </div>

      {/* Manual broadcast trigger */}
      <Button
        size="sm"
        variant="outline"
        className="w-full rounded-lg text-xs"
        onClick={async () => {
          toast.info('Triggering social broadcast...')
          try {
            const res = await fetch('/api/cron/social-broadcast')
            const data = await res.json()
            if (data.success) {
              toast.success(`Broadcast sent to ${data.sentTo} platforms (mock)`)
            } else {
              toast.error('Broadcast failed')
            }
          } catch { toast.error('Failed to trigger') }
        }}
      >
        <RefreshCw className="mr-1.5 h-3 w-3" />
        Trigger Broadcast Now
      </Button>

      <p className="text-center text-[9px] text-muted-foreground">
        Mock mode — plug in real API tokens via Dashboard → Master Settings to go live.
        Add cron: <code className="text-primary">/api/cron/social-broadcast</code> daily at 9 AM.
      </p>
    </div>
  )
}
