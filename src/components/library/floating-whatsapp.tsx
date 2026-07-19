'use client'

import { useState, useEffect } from 'react'
import { MessageCircle, X, Send, Loader2, Check, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

const COUNTRY_CODES = [
  { code: '+1', label: '🇺🇸 US', value: '1' },
  { code: '+44', label: '🇬🇧 UK', value: '44' },
  { code: '+971', label: '🇦🇪 AE', value: '971' },
  { code: '+966', label: '🇸🇦 SA', value: '966' },
  { code: '+20', label: '🇪🇬 EG', value: '20' },
  { code: '+965', label: '🇰🇼 KW', value: '965' },
  { code: '+974', label: '🇶🇦 QA', value: '974' },
  { code: '+62', label: '🇮🇩 ID', value: '62' },
  { code: '+91', label: '🇮🇳 IN', value: '91' },
  { code: '+55', label: '🇧🇷 BR', value: '55' },
]

export function FloatingWhatsApp() {
  const [open, setOpen] = useState(false)
  const [phone, setPhone] = useState('')
  const [countryCode, setCountryCode] = useState('1')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [visible, setVisible] = useState(false)

  // Show after scroll
  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', handler, { passive: true })
    handler()
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!phone || phone.length < 7) {
      toast.error('Please enter a valid phone number')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/leads/subscribe-whatsapp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: `${countryCode}${phone}`, countryCode, source: 'floating' }),
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setDone(true)
      toast.success('Subscribed! Check your WhatsApp soon 🎉')
    } catch (e: any) {
      toast.error(e?.message || 'Subscription failed')
    } finally {
      setLoading(false)
    }
  }

  if (!visible) return null

  return (
    <>
      {/* Floating button — positioned to avoid back-to-top (bottom-right) */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 left-6 z-40 grid h-14 w-14 place-items-center rounded-full bg-emerald-500 text-white shadow-2xl shadow-emerald-500/30 transition-transform hover:scale-110"
        aria-label="Subscribe to WhatsApp"
      >
        {!open && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-[8px] font-bold">
              5
            </span>
          </span>
        )}
        {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-6 w-6" />}
      </motion.button>

      {/* Expandable panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 left-6 z-40 w-80 overflow-hidden rounded-2xl border border-border/70 bg-card/95 shadow-2xl backdrop-blur-xl"
          >
            {/* Header */}
            <div className="flex items-center gap-2.5 border-b border-border/60 bg-emerald-500/10 px-4 py-3">
              <div className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-500/20 text-emerald-400">
                <MessageCircle className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-bold">Daily Top 5 Prompts</p>
                <p className="text-[9px] text-muted-foreground">98% open rate · No spam</p>
              </div>
            </div>

            {/* Body */}
            <div className="p-4">
              {done ? (
                <div className="flex flex-col items-center gap-2 py-4 text-center">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-emerald-500/20">
                    <Check className="h-5 w-5 text-emerald-400" />
                  </div>
                  <p className="text-sm font-semibold text-emerald-400">You&apos;re in! 🎉</p>
                  <p className="text-[10px] text-muted-foreground">
                    Top 5 trending prompts arrive on WhatsApp daily.
                  </p>
                </div>
              ) : (
                <>
                  <div className="mb-3 flex items-center gap-1.5 rounded-lg bg-amber-500/10 px-2.5 py-1.5">
                    <Sparkles className="h-3 w-3 shrink-0 text-amber-400" />
                    <p className="text-[10px] text-amber-200/90">
                      Get tomorrow&apos;s trending prompts before everyone else
                    </p>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-2">
                    <div className="flex gap-1.5">
                      <select
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        className="h-10 shrink-0 rounded-lg border border-border/70 bg-background/60 px-1.5 text-[10px] font-medium outline-none focus:border-primary/60"
                        aria-label="Country code"
                      >
                        {COUNTRY_CODES.map((c) => (
                          <option key={`${c.label}-${c.value}`} value={c.value}>
                            {c.label}
                          </option>
                        ))}
                      </select>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                        placeholder="Your WhatsApp number"
                        className="h-10 min-w-0 flex-1 rounded-lg border border-border/70 bg-background/60 px-3 text-xs outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
                        aria-label="Phone number"
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={loading || !phone}
                      className="btn-press h-10 w-full rounded-lg bg-emerald-500 text-white hover:bg-emerald-600"
                    >
                      {loading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <>
                          <Send className="mr-1.5 h-3.5 w-3.5" />
                          Get Daily Prompts
                        </>
                      )}
                    </Button>
                  </form>
                  <p className="pt-1 text-center text-[9px] text-muted-foreground">
                    🔒 We respect your privacy. Unsubscribe anytime.
                  </p>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
