'use client'

import { useEffect, useState } from 'react'
import {
  Settings, Save, Loader2, Check, Plus, Trash2, Edit2, X,
  Globe, Bot, Shield, Tag, Database,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { motion } from 'framer-motion'

interface Settings {
  googleVerificationCode: string
  bingVerificationCode: string
  googleAnalyticsId: string
  adsenseClientId: string
  aiSystemPrompt: string
  aiDailyLimit: number
  siteName: string
  siteUrl: string
  maintenanceMode: boolean
}

interface Category {
  id: string
  slug: string
  name: string
  description: string
  icon: string
  color: string
  _count?: { items: number }
}

function Field({
  label, value, onChange, placeholder, type = 'text', icon: Icon,
}: {
  label: string; value: string; onChange: (v: string) => void
  placeholder?: string; type?: string; icon?: any
}) {
  return (
    <div>
      <label className="mb-1 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
        {Icon && <Icon className="h-3 w-3" />} {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-10 w-full rounded-lg border border-border/70 bg-background/60 px-3 text-xs outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
      />
    </div>
  )
}

export function MasterSettings() {
  const [settings, setSettings] = useState<Settings | null>(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    fetch('/api/dashboard/settings').then((r) => r.json()).then(setSettings).catch(() => {})
  }, [])

  const handleSave = async () => {
    setSaving(true)
    try {
      const res = await fetch('/api/dashboard/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setSaved(true)
      toast.success('Settings saved — changes are live!')
      setTimeout(() => setSaved(false), 2000)
    } catch (e: any) {
      toast.error(e?.message || 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  if (!settings) return <div className="py-8 text-center text-xs text-muted-foreground">Loading settings…</div>

  return (
    <div className="space-y-4">
      {/* SEO Verification */}
      <div>
        <p className="mb-2 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
          <Globe className="h-3 w-3" /> SEO Verification
        </p>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <Field label="Google Verification" value={settings.googleVerificationCode}
            onChange={(v) => setSettings({ ...settings, googleVerificationCode: v })}
            placeholder="google-site-verification code" icon={Shield} />
          <Field label="Bing Verification" value={settings.bingVerificationCode}
            onChange={(v) => setSettings({ ...settings, bingVerificationCode: v })}
            placeholder="msvalidate.01 code" icon={Shield} />
        </div>
      </div>

      {/* Analytics & Adsense */}
      <div>
        <p className="mb-2 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
          <Database className="h-3 w-3" /> Analytics & AdSense
        </p>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <Field label="Google Analytics ID" value={settings.googleAnalyticsId}
            onChange={(v) => setSettings({ ...settings, googleAnalyticsId: v })}
            placeholder="G-XXXXXXXXXX" icon={Database} />
          <Field label="AdSense Client ID" value={settings.adsenseClientId}
            onChange={(v) => setSettings({ ...settings, adsenseClientId: v })}
            placeholder="ca-pub-XXXXXXXXXXXX" icon={Database} />
        </div>
      </div>

      {/* AI Agent Control */}
      <div>
        <p className="mb-2 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-violet-300">
          <Bot className="h-3 w-3" /> AI Agent Control
        </p>
        <div className="space-y-2">
          <div>
            <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
              System Prompt (controls agent behavior)
            </label>
            <textarea
              value={settings.aiSystemPrompt}
              onChange={(e) => setSettings({ ...settings, aiSystemPrompt: e.target.value })}
              rows={3}
              className="w-full resize-none rounded-lg border border-border/70 bg-background/60 px-3 py-2 text-xs outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Field label="Daily Generation Limit" type="number" value={String(settings.aiDailyLimit)}
              onChange={(v) => setSettings({ ...settings, aiDailyLimit: Number(v) || 200 })}
              placeholder="200" icon={Bot} />
            <div>
              <label className="mb-1 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                Maintenance Mode
              </label>
              <button
                onClick={() => setSettings({ ...settings, maintenanceMode: !settings.maintenanceMode })}
                className={`flex h-10 w-full items-center justify-between rounded-lg border border-border/70 px-3 text-xs ${settings.maintenanceMode ? 'bg-amber-500/10 text-amber-400' : 'bg-background/60 text-muted-foreground'}`}
              >
                {settings.maintenanceMode ? 'ON' : 'OFF'}
                <span className={`relative h-4 w-7 rounded-full transition-colors ${settings.maintenanceMode ? 'bg-amber-500' : 'bg-muted'}`}>
                  <span className={`absolute top-0.5 h-3 w-3 rounded-full bg-white transition-transform ${settings.maintenanceMode ? 'translate-x-3.5' : 'translate-x-0.5'}`} />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Site Config */}
      <div>
        <p className="mb-2 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
          <Settings className="h-3 w-3" /> Site Configuration
        </p>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <Field label="Site Name" value={settings.siteName}
            onChange={(v) => setSettings({ ...settings, siteName: v })} icon={Globe} />
          <Field label="Site URL" value={settings.siteUrl}
            onChange={(v) => setSettings({ ...settings, siteUrl: v })} icon={Globe} />
        </div>
      </div>

      {/* Save */}
      <Button onClick={handleSave} disabled={saving} className="btn-press w-full rounded-lg">
        {saving ? <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" /> :
         saved ? <Check className="mr-1.5 h-3.5 w-3.5" /> :
         <Save className="mr-1.5 h-3.5 w-3.5" />}
        {saved ? 'Saved!' : 'Save All Settings'}
      </Button>
    </div>
  )
}

export function CategoryManager() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<string | null>(null)
  const [showAdd, setShowAdd] = useState(false)
  const [newCat, setNewCat] = useState({ name: '', slug: '', description: '', icon: 'Search', color: '#10b981' })

  const fetchCats = () => {
    fetch('/api/dashboard/categories').then((r) => r.json()).then((d) => {
      setCategories(d.categories || [])
      setLoading(false)
    }).catch(() => setLoading(false))
  }

  useEffect(() => { fetchCats() }, [])

  const handleAdd = async () => {
    if (!newCat.name || !newCat.slug) { toast.error('Name and slug required'); return }
    try {
      const res = await fetch('/api/dashboard/categories', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCat),
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      toast.success(`Category "${newCat.name}" created!`)
      setNewCat({ name: '', slug: '', description: '', icon: 'Search', color: '#10b981' })
      setShowAdd(false)
      fetchCats()
    } catch (e: any) { toast.error(e?.message || 'Failed') }
  }

  const handleDelete = async (id: string) => {
    try {
      await fetch('/api/dashboard/categories', {
        method: 'DELETE', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      toast.success('Category deleted')
      fetchCats()
    } catch { toast.error('Delete failed') }
  }

  if (loading) return <div className="py-8 text-center text-xs text-muted-foreground">Loading categories…</div>

  return (
    <div className="space-y-3">
      <div className="space-y-1.5">
        {categories.map((cat) => (
          <div key={cat.id} className="flex items-center gap-2 rounded-lg border border-border/40 bg-background/40 px-3 py-2">
            <div className="grid h-7 w-7 shrink-0 place-items-center rounded-md" style={{ backgroundColor: `${cat.color}1f`, color: cat.color }}>
              <Tag className="h-3 w-3" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold">{cat.name}</p>
              <p className="truncate text-[9px] text-muted-foreground">{cat.slug} · {cat._count?.items || 0} items</p>
            </div>
            <button onClick={() => handleDelete(cat.id)} className="rounded p-1 text-muted-foreground hover:bg-rose-500/10 hover:text-rose-400" aria-label="Delete">
              <Trash2 className="h-3 w-3" />
            </button>
          </div>
        ))}
      </div>

      {showAdd ? (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-2 rounded-lg border border-primary/30 bg-primary/5 p-3">
          <div className="grid grid-cols-2 gap-2">
            <input value={newCat.name} onChange={(e) => setNewCat({ ...newCat, name: e.target.value })} placeholder="Name" className="h-9 rounded-md border border-border/60 bg-background/60 px-2.5 text-xs outline-none" />
            <input value={newCat.slug} onChange={(e) => setNewCat({ ...newCat, slug: e.target.value })} placeholder="slug" className="h-9 rounded-md border border-border/60 bg-background/60 px-2.5 text-xs outline-none" />
          </div>
          <input value={newCat.description} onChange={(e) => setNewCat({ ...newCat, description: e.target.value })} placeholder="Description" className="h-9 w-full rounded-md border border-border/60 bg-background/60 px-2.5 text-xs outline-none" />
          <div className="flex gap-2">
            <input value={newCat.color} onChange={(e) => setNewCat({ ...newCat, color: e.target.value })} placeholder="#10b981" className="h-9 flex-1 rounded-md border border-border/60 bg-background/60 px-2.5 text-xs outline-none" />
            <Button size="sm" onClick={handleAdd} className="rounded-md"><Plus className="h-3 w-3" /></Button>
            <Button size="sm" variant="ghost" onClick={() => setShowAdd(false)} className="rounded-md"><X className="h-3 w-3" /></Button>
          </div>
        </motion.div>
      ) : (
        <Button size="sm" variant="outline" onClick={() => setShowAdd(true)} className="w-full rounded-lg">
          <Plus className="mr-1 h-3.5 w-3.5" /> Add Category
        </Button>
      )}
    </div>
  )
}
