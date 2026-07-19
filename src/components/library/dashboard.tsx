'use client'

import { useEffect, useState } from 'react'
import {
  ArrowLeft, DollarSign, TrendingUp, Bot, Activity, Database,
  CheckCircle2, Clock, AlertCircle, Zap, Eye, Download, Star,
  RefreshCw, ExternalLink, Cpu, Network, Shield, Sparkles,
  MessageCircle, Send, Users, Mail, Tag,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { motion } from 'framer-motion'
import { MasterSettings, CategoryManager } from './admin-settings'

interface RevenueData {
  metrics: {
    totalItems: number
    totalViews: number
    totalDownloads: number
    estimatedClicks: number
    estimatedRevenue: number
    dailyPotentialRevenue: number
    monthlyProjection: number
    todayItems: number
  }
  assumptions: { cpc: number; ctr: number; adSlotsPerPage: number }
  revenueByType: { type: string; items: number; views: number; downloads: number; estimatedClicks: number; estimatedRevenue: number }[]
}

interface HealthData {
  metrics: {
    totalItems: number
    totalPrompts: number
    totalSkills: number
    totalWorkflows: number
    totalCategories: number
    totalDownloads: number
    totalViews: number
    trinityFiles: number
    trendingCount: number
    featuredCount: number
    itemsWithIntro: number
    itemsWithFaq: number
  }
  quality: { introCoverage: number; faqCoverage: number; qualityScore: number }
  performance: { dbLatencyMs: number; status: string }
  adsenseReadiness: { checklist: { label: string; status: string }[]; score: number; ready: boolean }
}

interface TrendsData {
  summary: { todayGenerated: number; indexed: number; pending: number; notSubmitted: number }
  todayItems: { id: string; slug: string; title: string; type: string; niche: string; trendingScore: number; viewCount: number; downloadCount: number; indexingStatus: string }[]
  recentRuns: { id: string; runDate: string; promptsCount: number; skillsCount: number; status: string; note: string; createdAt: string }[]
}

interface AgentsData {
  agents: { n: number; role: string; phase: string; status: string }[]
  swarm: { totalAgents: number; activeAgents: number; dailyTarget: number; todayGenerated: number; dailyProgress: number; totalAgentGenerated: number }
}

function BentoCard({
  title,
  icon: Icon,
  children,
  className = '',
  delay = 0,
}: {
  title: string
  icon: any
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={`relative overflow-hidden rounded-2xl border border-border/60 bg-card/40 backdrop-blur-xl p-5 ${className}`}
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary/15 text-primary">
            <Icon className="h-4 w-4" />
          </div>
          <h3 className="text-sm font-semibold">{title}</h3>
        </div>
      </div>
      {children}
    </motion.div>
  )
}

function StatPill({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="rounded-xl border border-border/40 bg-background/40 p-3">
      <div className="text-lg font-bold tabular-nums" style={{ color }}>{value}</div>
      <div className="truncate text-[10px] text-muted-foreground">{label}</div>
    </div>
  )
}

// Cron Health Monitor sub-component
function CronHealthMonitor() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/dashboard/cron-health').then((r) => r.json()).then((d) => {
      setData(d)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  if (loading) return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-2">
        <div className="h-14 animate-pulse rounded-xl border border-border/40 bg-muted/20" />
        <div className="h-14 animate-pulse rounded-xl border border-border/40 bg-muted/20" />
        <div className="h-14 animate-pulse rounded-xl border border-border/40 bg-muted/20" />
      </div>
      <div className="space-y-2">
        {[1,2,3,4].map((i) => (
          <div key={i} className="h-12 animate-pulse rounded-lg border border-border/40 bg-muted/20" />
        ))}
      </div>
    </div>
  )
  if (!data) return <div className="py-8 text-center text-xs text-muted-foreground">Failed to load cron data. Check ErrorLog.</div>

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-2">
        <StatPill label="Cron Jobs" value={String(data.summary.totalJobs)} color="#8b5cf6" />
        <StatPill label="Healthy" value={String(data.summary.healthyJobs)} color="#10b981" />
        <StatPill label="Errors" value={String(data.summary.errorCount)} color="#f43f5e" />
      </div>
      <div className="space-y-2">
        {data.jobs.map((job: any) => (
          <div key={job.name} className="rounded-lg border border-border/40 bg-background/40 px-3 py-2">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-semibold">{job.label}</p>
                <p className="truncate text-[9px] text-muted-foreground">{job.schedule}</p>
              </div>
              <span className={`inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[8px] font-bold ${
                !job.lastRun ? 'bg-muted/60 text-muted-foreground' :
                job.lastRun.status === 'completed' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-rose-500/15 text-rose-400'
              }`}>
                {!job.lastRun ? 'Never run' : job.lastRun.status}
              </span>
            </div>
            {job.lastRun && (
              <div className="mt-1 flex items-center gap-3 text-[9px] text-muted-foreground">
                <span>{new Date(job.lastRun.timestamp).toLocaleString()}</span>
                {job.lastRun.itemsAffected > 0 && <span>· {job.lastRun.itemsAffected} items</span>}
                <span>· {job.stats.successRate}% success</span>
              </div>
            )}
          </div>
        ))}
      </div>
      {data.recentErrors.length > 0 && (
        <div>
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Recent Errors</p>
          <div className="space-y-1">
            {data.recentErrors.slice(0, 3).map((err: any) => (
              <div key={err.id} className="flex items-center gap-2 rounded-lg border border-rose-500/20 bg-rose-500/5 px-2.5 py-1.5">
                <AlertCircle className="h-3 w-3 shrink-0 text-rose-400" />
                <span className="min-w-0 flex-1 truncate text-[10px] text-rose-300/80">{err.message}</span>
                <span className="text-[8px] text-muted-foreground">{new Date(err.createdAt).toLocaleTimeString()}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// Broadcast Commander sub-component
function BroadcastCommander() {
  const [message, setMessage] = useState('')
  const [channels, setChannels] = useState({ email: true, whatsapp: true })
  const [sending, setSending] = useState(false)

  const handleSend = async () => {
    if (!message.trim()) {
      toast.error('Enter a message first')
      return
    }
    setSending(true)
    try {
      const targetChannels: string[] = []
      if (channels.email) targetChannels.push('email')
      if (channels.whatsapp) targetChannels.push('whatsapp')

      const res = await fetch('/api/dashboard/broadcast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, channels: targetChannels }),
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      toast.success(data.message)
      setMessage('')
    } catch (e: any) {
      toast.error(e?.message || 'Broadcast failed')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="space-y-3">
      <div>
        <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Custom Message</p>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a custom message to broadcast to all subscribers…"
          rows={3}
          className="w-full resize-none rounded-lg border border-border/70 bg-background/60 px-3 py-2 text-xs outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
        />
      </div>
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-1.5 text-xs">
          <input
            type="checkbox"
            checked={channels.email}
            onChange={(e) => setChannels({ ...channels, email: e.target.checked })}
            className="h-3.5 w-3.5 rounded"
          />
          <Mail className="h-3 w-3 text-primary" />
          Email
        </label>
        <label className="flex items-center gap-1.5 text-xs">
          <input
            type="checkbox"
            checked={channels.whatsapp}
            onChange={(e) => setChannels({ ...channels, whatsapp: e.target.checked })}
            className="h-3.5 w-3.5 rounded"
          />
          <MessageCircle className="h-3 w-3 text-emerald-400" />
          WhatsApp
        </label>
      </div>
      <Button
        onClick={handleSend}
        disabled={sending || !message.trim() || (!channels.email && !channels.whatsapp)}
        size="sm"
        className="btn-press w-full rounded-lg"
      >
        {sending ? (
          <RefreshCw className="mr-1.5 h-3.5 w-3.5 animate-spin" />
        ) : (
          <Send className="mr-1.5 h-3.5 w-3.5" />
        )}
        Broadcast Now
      </Button>
      <p className="text-center text-[9px] text-muted-foreground">
        Bypasses daily automation — sends immediately to selected channels (mock mode).
      </p>
    </div>
  )
}

interface WhatsAppData {
  stats: { totalSubscribers: number; activeSubscribers: number; todaySubscribers: number; unsubscribed: number }
  bySource: { source: string; count: number }[]
  recent: { id: string; phone: string; source: string; subscribed: boolean; createdAt: string }[]
  autoDailyEnabled: boolean
}

export function Dashboard({ onClose }: { onClose: () => void }) {
  const [revenue, setRevenue] = useState<RevenueData | null>(null)
  const [health, setHealth] = useState<HealthData | null>(null)
  const [trends, setTrends] = useState<TrendsData | null>(null)
  const [agents, setAgents] = useState<AgentsData | null>(null)
  const [whatsapp, setWhatsapp] = useState<WhatsAppData | null>(null)
  const [broadcastMsg, setBroadcastMsg] = useState('')
  const [broadcasting, setBroadcasting] = useState(false)
  const [autoDaily, setAutoDaily] = useState(true)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const fetchAll = async () => {
    setRefreshing(true)
    try {
      const [rev, hel, trd, agt, wa] = await Promise.all([
        fetch('/api/dashboard/revenue').then((r) => r.json()),
        fetch('/api/dashboard/health').then((r) => r.json()),
        fetch('/api/dashboard/trends').then((r) => r.json()),
        fetch('/api/dashboard/agents').then((r) => r.json()),
        fetch('/api/dashboard/whatsapp').then((r) => r.json()),
      ])
      setRevenue(rev)
      setHealth(hel)
      setTrends(trd)
      setAgents(agt)
      setWhatsapp(wa)
      setAutoDaily(wa?.autoDailyEnabled ?? true)
    } catch (e) {
      console.error('Dashboard fetch error:', e)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchAll()
  }, [])

  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center">
        <div className="text-center">
          <RefreshCw className="mx-auto mb-3 h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading dashboard…</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-40 border-b border-border/60 glass">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={onClose} className="rounded-full">
              <ArrowLeft className="mr-1.5 h-4 w-4" />
              Back to Library
            </Button>
            <div className="h-6 w-px bg-border/60" />
            <div className="flex items-center gap-2">
              <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-emerald-500 to-violet-600">
                <Cpu className="h-4 w-4 text-white" />
              </div>
              <div>
                <h1 className="text-sm font-bold">NexusAI Control Center</h1>
                <p className="text-[10px] text-muted-foreground">Admin Dashboard</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {health && (
              <Badge variant="outline" className="hidden sm:inline-flex">
                <span className={`mr-1 h-1.5 w-1.5 rounded-full ${health.performance.status === 'excellent' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                {health.performance.dbLatencyMs}ms
              </Badge>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={fetchAll}
              disabled={refreshing}
              className="rounded-full"
            >
              <RefreshCw className={`mr-1.5 h-3.5 w-3.5 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>
      </div>

      {/* Bento Grid */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Revenue Estimator — large card */}
          <BentoCard title="Revenue Estimator" icon={DollarSign} className="md:col-span-2" delay={0}>
            {revenue && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <StatPill label="Est. Total Revenue" value={`$${revenue.metrics.estimatedRevenue.toLocaleString()}`} color="#10b981" />
                  <StatPill label="Daily Potential" value={`$${revenue.metrics.dailyPotentialRevenue.toLocaleString()}`} color="#8b5cf6" />
                  <StatPill label="Monthly Projection" value={`$${revenue.metrics.monthlyProjection.toLocaleString()}`} color="#f59e0b" />
                  <StatPill label="Est. Clicks" value={revenue.metrics.estimatedClicks.toLocaleString()} color="#06b6d4" />
                </div>
                <div className="flex flex-wrap items-center gap-3 text-[10px] text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    CPC: ${revenue.assumptions.cpc}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
                    CTR: {(revenue.assumptions.ctr * 100).toFixed(0)}%
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                    Ad slots/page: {revenue.assumptions.adSlotsPerPage}
                  </span>
                </div>
                {/* Revenue by type */}
                <div className="space-y-2">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Revenue by Type</p>
                  {revenue.revenueByType.map((r) => (
                    <div key={r.type} className="flex items-center justify-between rounded-lg border border-border/40 bg-background/40 px-3 py-2">
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[9px] font-bold uppercase ${
                          r.type === 'prompt' ? 'bg-emerald-500/15 text-emerald-400' : r.type === 'skill' ? 'bg-violet-500/15 text-violet-300' : 'bg-amber-500/15 text-amber-400'
                        }`}>{r.type}</span>
                        <span className="text-xs text-muted-foreground">{r.items} items</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs">
                        <span className="text-muted-foreground">{r.views.toLocaleString()} views</span>
                        <span className="font-semibold text-emerald-400">${r.estimatedRevenue.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </BentoCard>

          {/* AdSense Readiness */}
          <BentoCard title="AdSense Readiness" icon={Shield} delay={0.1}>
            {health && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold" style={{ color: health.adsenseReadiness.ready ? '#10b981' : '#f59e0b' }}>
                      {health.adsenseReadiness.score}%
                    </div>
                    <div className="text-[10px] text-muted-foreground">{health.adsenseReadiness.ready ? 'Ready to apply' : 'Not ready'}</div>
                  </div>
                  <CheckCircle2 className={`h-10 w-10 ${health.adsenseReadiness.ready ? 'text-emerald-500' : 'text-amber-500'}`} />
                </div>
                <div className="space-y-1">
                  {health.adsenseReadiness.checklist.slice(0, 6).map((c) => (
                    <div key={c.label} className="flex items-center gap-2 text-[10px]">
                      <CheckCircle2 className="h-3 w-3 shrink-0 text-emerald-500" />
                      <span className="truncate text-muted-foreground">{c.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </BentoCard>

          {/* Content Quality */}
          <BentoCard title="Content Quality" icon={Activity} delay={0.15}>
            {health && (
              <div className="space-y-3">
                <div className="text-3xl font-bold text-primary">{health.quality.qualityScore}%</div>
                <div className="space-y-2">
                  <div>
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="text-muted-foreground">Intro Coverage</span>
                      <span className="font-semibold">{health.quality.introCoverage}%</span>
                    </div>
                    <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                      <div className="h-full rounded-full bg-emerald-500" style={{ width: `${health.quality.introCoverage}%` }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="text-muted-foreground">FAQ Coverage</span>
                      <span className="font-semibold">{health.quality.faqCoverage}%</span>
                    </div>
                    <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                      <div className="h-full rounded-full bg-violet-500" style={{ width: `${health.quality.faqCoverage}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </BentoCard>

          {/* Library Stats */}
          <BentoCard title="Library Overview" icon={Database} delay={0.2}>
            {health && (
              <div className="grid grid-cols-2 gap-2">
                <StatPill label="Total Items" value={String(health.metrics.totalItems)} color="#10b981" />
                <StatPill label="Prompts" value={String(health.metrics.totalPrompts)} color="#10b981" />
                <StatPill label="Skills" value={String(health.metrics.totalSkills)} color="#8b5cf6" />
                <StatPill label="Workflows" value={String(health.metrics.totalWorkflows)} color="#f59e0b" />
                <StatPill label="Trinity Files" value={String(health.metrics.trinityFiles)} color="#06b6d4" />
                <StatPill label="Categories" value={String(health.metrics.totalCategories)} color="#f43f5e" />
              </div>
            )}
          </BentoCard>

          {/* Engagement */}
          <BentoCard title="Engagement" icon={Eye} delay={0.25}>
            {health && (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <StatPill label="Total Views" value={health.metrics.totalViews.toLocaleString()} color="#06b6d4" />
                  <StatPill label="Downloads" value={health.metrics.totalDownloads.toLocaleString()} color="#10b981" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <StatPill label="Trending" value={String(health.metrics.trendingCount)} color="#f59e0b" />
                  <StatPill label="Featured" value={String(health.metrics.featuredCount)} color="#8b5cf6" />
                </div>
              </div>
            )}
          </BentoCard>

          {/* Agent Swarm */}
          <BentoCard title="Agent Swarm" icon={Bot} className="md:col-span-2" delay={0.3}>
            {agents && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl font-bold text-violet-400">{agents.swarm.totalAgents}</div>
                    <div>
                      <div className="text-xs font-semibold">Coordinated Agents</div>
                      <div className="text-[10px] text-muted-foreground">{agents.swarm.activeAgents} active</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-emerald-400">{agents.swarm.todayGenerated}</div>
                    <div className="text-[10px] text-muted-foreground">/ {agents.swarm.dailyTarget} daily target</div>
                  </div>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-emerald-500" style={{ width: `${agents.swarm.dailyProgress}%` }} />
                </div>
                {/* Agent grid */}
                <div className="grid grid-cols-5 gap-1 sm:grid-cols-10">
                  {agents.agents.map((a) => (
                    <div
                      key={a.n}
                      className="group relative grid h-8 place-items-center rounded-md border text-[9px] font-bold transition-colors"
                      style={{
                        borderColor: a.status === 'active' ? 'oklch(0.78 0.19 162 / 0.4)' : 'oklch(1 0 0 / 0.1)',
                        backgroundColor: a.status === 'active' ? 'oklch(0.78 0.19 162 / 0.1)' : 'transparent',
                        color: a.status === 'active' ? 'oklch(0.78 0.19 162)' : 'oklch(0.5 0 0)',
                      }}
                      title={`${a.n}. ${a.role} (${a.phase})`}
                    >
                      {a.n}
                    </div>
                  ))}
                </div>
                <div className="text-[10px] text-muted-foreground">
                  Total agent-generated items: <span className="font-semibold text-foreground">{agents.swarm.totalAgentGenerated}</span>
                </div>
              </div>
            )}
          </BentoCard>

          {/* Trend Radar — Today's Generated */}
          <BentoCard title="Trend Radar · Today" icon={TrendingUp} className="md:col-span-2" delay={0.35}>
            {trends && (
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-2">
                  <StatPill label="Indexed" value={String(trends.summary.indexed)} color="#10b981" />
                  <StatPill label="Pending" value={String(trends.summary.pending)} color="#f59e0b" />
                  <StatPill label="Not Submitted" value={String(trends.summary.notSubmitted)} color="#f43f5e" />
                </div>
                <div className="max-h-48 space-y-1 overflow-y-auto">
                  {trends.todayItems.slice(0, 8).map((item) => (
                    <div key={item.id} className="flex items-center gap-2 rounded-lg border border-border/40 bg-background/40 px-2.5 py-1.5">
                      <span className={`inline-flex items-center rounded-full px-1.5 py-0.5 text-[8px] font-bold uppercase ${
                        item.type === 'prompt' ? 'bg-emerald-500/15 text-emerald-400' : item.type === 'skill' ? 'bg-violet-500/15 text-violet-300' : 'bg-amber-500/15 text-amber-400'
                      }`}>{item.type}</span>
                      <span className="min-w-0 flex-1 truncate text-[11px] font-medium">{item.title}</span>
                      <span className={`inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[8px] font-bold ${
                        item.indexingStatus === 'indexed' ? 'bg-emerald-500/15 text-emerald-400' : item.indexingStatus === 'pending' ? 'bg-amber-500/15 text-amber-400' : 'bg-rose-500/15 text-rose-400'
                      }`}>
                        {item.indexingStatus === 'indexed' ? <CheckCircle2 className="h-2.5 w-2.5" /> : item.indexingStatus === 'pending' ? <Clock className="h-2.5 w-2.5" /> : <AlertCircle className="h-2.5 w-2.5" />}
                        {item.indexingStatus}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </BentoCard>

          {/* Recent Generation Runs */}
          <BentoCard title="Recent Agent Runs" icon={Zap} className="md:col-span-2" delay={0.4}>
            {trends && (
              <div className="max-h-48 space-y-1 overflow-y-auto">
                {trends.recentRuns.slice(0, 6).map((run) => (
                  <div key={run.id} className="flex items-center gap-2 rounded-lg border border-border/40 bg-background/40 px-2.5 py-1.5">
                    <span className={`h-1.5 w-1.5 rounded-full ${run.status === 'completed' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                    <span className="min-w-0 flex-1 truncate text-[11px] text-muted-foreground">{run.note}</span>
                    <span className="text-[9px] text-muted-foreground">{new Date(run.createdAt).toLocaleTimeString()}</span>
                  </div>
                ))}
              </div>
            )}
          </BentoCard>
        </div>

        {/* WhatsApp Community — full width row */}
        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
          {/* WhatsApp Stats + Broadcast */}
          <BentoCard title="WhatsApp Community" icon={MessageCircle} className="lg:col-span-2" delay={0.45}>
            {whatsapp && (
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-2">
                  <StatPill label="Subscribers" value={String(whatsapp.stats.totalSubscribers)} color="#10b981" />
                  <StatPill label="Active" value={String(whatsapp.stats.activeSubscribers)} color="#8b5cf6" />
                  <StatPill label="Today" value={String(whatsapp.stats.todaySubscribers)} color="#f59e0b" />
                </div>

                {/* Auto-daily toggle */}
                <div className="flex items-center justify-between rounded-xl border border-border/40 bg-background/40 px-3 py-2.5">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
                    <div>
                      <p className="text-xs font-semibold">Daily Auto-Broadcast</p>
                      <p className="text-[10px] text-muted-foreground">Agent sends top 5 prompts daily at 9 AM</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      const next = !autoDaily
                      setAutoDaily(next)
                      toast.success(next ? 'Auto-daily broadcast enabled' : 'Auto-daily broadcast disabled')
                    }}
                    className={`relative h-6 w-11 rounded-full transition-colors ${autoDaily ? 'bg-emerald-500' : 'bg-muted'}`}
                    aria-label="Toggle auto-daily broadcast"
                  >
                    <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${autoDaily ? 'translate-x-[22px]' : 'translate-x-0.5'}`} />
                  </button>
                </div>

                {/* Manual broadcast */}
                <div>
                  <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Manual Broadcast</p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={broadcastMsg}
                      onChange={(e) => setBroadcastMsg(e.target.value)}
                      placeholder="Type a message to send to all subscribers…"
                      className="h-10 min-w-0 flex-1 rounded-lg border border-border/70 bg-background/60 px-3 text-xs outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
                    />
                    <Button
                      onClick={async () => {
                        if (!broadcastMsg.trim()) {
                          toast.error('Enter a message first')
                          return
                        }
                        setBroadcasting(true)
                        try {
                          const res = await fetch('/api/dashboard/whatsapp', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ message: broadcastMsg }),
                          })
                          const data = await res.json()
                          if (data.error) throw new Error(data.error)
                          toast.success(`Broadcast sent to ${data.sentTo} subscribers (mock)`)
                          setBroadcastMsg('')
                        } catch (e: any) {
                          toast.error(e?.message || 'Broadcast failed')
                        } finally {
                          setBroadcasting(false)
                        }
                      }}
                      disabled={broadcasting || !broadcastMsg.trim()}
                      size="sm"
                      className="btn-press h-10 shrink-0 rounded-lg bg-emerald-500 px-4 text-white hover:bg-emerald-600"
                    >
                      {broadcasting ? (
                        <RefreshCw className="h-4 w-4 animate-spin" />
                      ) : (
                        <>
                          <Send className="mr-1 h-3.5 w-3.5" /> Send
                        </>
                      )}
                    </Button>
                  </div>
                  <p className="mt-1 text-[9px] text-muted-foreground">
                    Mock mode — plug in Twilio WhatsApp API key for real delivery.
                  </p>
                </div>

                {/* Recent subscribers */}
                {whatsapp.recent.length > 0 && (
                  <div>
                    <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Recent Subscribers</p>
                    <div className="space-y-1">
                      {whatsapp.recent.map((sub) => (
                        <div key={sub.id} className="flex items-center gap-2 rounded-lg border border-border/40 bg-background/40 px-2.5 py-1.5">
                          <MessageCircle className="h-3 w-3 shrink-0 text-emerald-400" />
                          <span className="min-w-0 flex-1 truncate text-[11px] font-medium">+{sub.phone}</span>
                          <span className="rounded-full bg-muted/60 px-1.5 py-0.5 text-[8px] font-medium text-muted-foreground">{sub.source}</span>
                          <span className="text-[9px] text-muted-foreground">{new Date(sub.createdAt).toLocaleDateString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </BentoCard>

          {/* Subscriber Sources */}
          <BentoCard title="Acquisition Sources" icon={Users} delay={0.5}>
            {whatsapp && (
              <div className="space-y-2">
                {whatsapp.bySource.length > 0 ? (
                  whatsapp.bySource.map((s) => (
                    <div key={s.source} className="flex items-center justify-between rounded-lg border border-border/40 bg-background/40 px-3 py-2">
                      <span className="text-xs font-medium capitalize">{s.source}</span>
                      <span className="text-sm font-bold text-emerald-400">{s.count}</span>
                    </div>
                  ))
                ) : (
                  <div className="py-4 text-center text-[11px] text-muted-foreground">
                    No subscribers yet. The floating button and footer form will capture leads.
                  </div>
                )}
                <div className="mt-3 rounded-lg bg-emerald-500/10 p-3 text-center">
                  <p className="text-[10px] text-emerald-300/80">
                    💡 WhatsApp has a 98% open rate vs 20% for email. Every subscriber is worth ~5x an email lead.
                  </p>
                </div>
              </div>
            )}
          </BentoCard>
        </div>

        {/* Automation Health Monitor + Broadcast Commander */}
        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <BentoCard title="Automation Health" icon={Zap} delay={0.55}>
            <CronHealthMonitor />
          </BentoCard>
          <BentoCard title="Broadcast Commander" icon={Send} delay={0.6}>
            <BroadcastCommander />
          </BentoCard>
        </div>

        {/* God-Mode: Master Settings + Category Management */}
        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <BentoCard title="Master Settings (God-Mode)" icon={Shield} delay={0.65}>
            <MasterSettings />
          </BentoCard>
          <BentoCard title="Category Management" icon={Tag} delay={0.7}>
            <CategoryManager />
          </BentoCard>
        </div>

        {/* Footer note */}
        <div className="mt-6 text-center">
          <p className="text-[10px] text-muted-foreground">
            Dashboard data is read-only and fetched from live database. Revenue estimates are projections based on high-CPC AI/tech niche assumptions.
          </p>
        </div>
      </div>
    </div>
  )
}
