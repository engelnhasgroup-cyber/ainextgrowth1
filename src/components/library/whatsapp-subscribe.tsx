'use client'

import { useState } from 'react'
import { MessageCircle, Send, Check, Loader2, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

const COUNTRY_CODES = [
  { code: '+1', label: '🇺🇸 US', value: '1' },
  { code: '+44', label: '🇬🇧 UK', value: '44' },
  { code: '+1', label: '🇨🇦 CA', value: '1' },
  { code: '+61', label: '🇦🇺 AU', value: '61' },
  { code: '+971', label: '🇦🇪 AE', value: '971' },
  { code: '+966', label: '🇸🇦 SA', value: '966' },
  { code: '+20', label: '🇪🇬 EG', value: '20' },
  { code: '+965', label: '🇰🇼 KW', value: '965' },
  { code: '+974', label: '🇶🇦 QA', value: '974' },
  { code: '+973', label: '🇧🇭 BH', value: '973' },
  { code: '+968', label: '🇴🇲 OM', value: '968' },
  { code: '+212', label: '🇲🇦 MA', value: '212' },
  { code: '+213', label: '🇩🇿 DZ', value: '213' },
  { code: '+216', label: '🇹🇳 TN', value: '216' },
  { code: '+62', label: '🇮🇩 ID', value: '62' },
  { code: '+91', label: '🇮🇳 IN', value: '91' },
  { code: '+55', label: '🇧🇷 BR', value: '55' },
  { code: '+34', label: '🇪🇸 ES', value: '34' },
  { code: '+49', label: '🇩🇪 DE', value: '49' },
  { code: '+33', label: '🇫🇷 FR', value: '33' },
]

export function WhatsAppSubscribe({ source = 'footer' }: { source?: 'footer' | 'floating' }) {
  const [phone, setPhone] = useState('')
  const [countryCode, setCountryCode] = useState('1')
  const [loading, setLoading] = useState(false)
  const [subscribed, setSubscribed] = useState(false)

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
        body: JSON.stringify({
          phone: `${countryCode}${phone}`,
          countryCode,
          source,
        }),
      })
      const data = await res.json()
      if (data.error) {
        throw new Error(data.error)
      }
      setSubscribed(true)
      toast.success(data.message || 'Subscribed to WhatsApp daily prompts!')
      setPhone('')
    } catch (e: any) {
      toast.error(e?.message || 'Subscription failed')
    } finally {
      setLoading(false)
    }
  }

  if (subscribed) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-5 text-center">
        <div className="grid h-12 w-12 place-items-center rounded-full bg-emerald-500/20">
          <Check className="h-6 w-6 text-emerald-400" />
        </div>
        <div>
          <p className="text-sm font-semibold text-emerald-400">You&apos;re in! 🎉</p>
          <p className="mt-1 text-xs text-muted-foreground">
            You&apos;ll receive the top 5 trending AI prompts daily on WhatsApp.
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="mt-1 text-xs text-muted-foreground"
          onClick={() => setSubscribed(false)}
        >
          Subscribe another number
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex gap-2">
        {/* Country code selector */}
        <select
          value={countryCode}
          onChange={(e) => setCountryCode(e.target.value)}
          className="h-11 shrink-0 rounded-lg border border-border/70 bg-background/60 px-2 text-xs font-medium outline-none focus:border-primary/60"
          aria-label="Country code"
        >
          {COUNTRY_CODES.map((c) => (
            <option key={`${c.label}-${c.value}`} value={c.value}>
              {c.label} +{c.value}
            </option>
          ))}
        </select>

        {/* Phone input */}
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
          placeholder="Phone number"
          className="h-11 min-w-0 flex-1 rounded-lg border border-border/70 bg-background/60 px-3 text-sm outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
          aria-label="Phone number"
        />

        {/* Submit */}
        <Button
          type="submit"
          disabled={loading || !phone}
          className="btn-press h-11 shrink-0 rounded-lg bg-emerald-500 px-4 text-white hover:bg-emerald-600"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      </div>
      <p className="text-center text-[10px] text-muted-foreground">
        🔒 We respect your privacy. Unsubscribe anytime. No spam.
      </p>
    </form>
  )
}

// Footer section component — replaces/augments the email newsletter
export function WhatsAppFooterSection() {
  return (
    <div className="mb-6 overflow-hidden rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/8 via-card/40 to-emerald-500/5 p-5 sm:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Left: pitch */}
        <div className="flex-1">
          <div className="mb-2 flex items-center gap-2">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-500/15 text-emerald-400">
              <MessageCircle className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold">WhatsApp Daily Top 5</h3>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-1.5 py-0.5 text-[9px] font-bold text-emerald-400">
                  <Sparkles className="h-2.5 w-2.5" /> 98% Open Rate
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground">
                Get the 5 best trending AI prompts daily on WhatsApp — before everyone else.
              </p>
            </div>
          </div>
        </div>

        {/* Right: subscribe form */}
        <div className="lg:w-[400px]">
          <WhatsAppSubscribe source="footer" />
        </div>
      </div>
    </div>
  )
}
