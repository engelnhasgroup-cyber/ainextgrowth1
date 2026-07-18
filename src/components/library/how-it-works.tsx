'use client'

import { FileText, Workflow, Users, Download, Link2, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

const STEPS = [
  {
    icon: FileText,
    title: '1 · The Prompt / Skill',
    desc: 'A neuro-engineered master prompt or skill definition using 2026 techniques — role, constraints, [BRACKET] variables, output format.',
    color: '#10b981',
  },
  {
    icon: Workflow,
    title: '2 · Workflow & Execution',
    desc: 'Step-by-step execution guide with prerequisites, required tools (GPT-5, Claude 4, LangGraph 2.0), expected output and success metrics.',
    color: '#8b5cf6',
  },
  {
    icon: Users,
    title: '3 · Target Audience',
    desc: 'Exactly who needs this, three real-world use cases, and the industries that benefit — written for AEO answer engines.',
    color: '#06b6d4',
  },
  {
    icon: Download,
    title: '4 · Download as Markdown',
    desc: 'A short, policy-compliant sponsor message unlocks the bundle. You get 3 polished .md files with an attribution backlink.',
    color: '#f59e0b',
  },
]

export function HowItWorksSection() {
  return (
    <section id="how" className="scroll-mt-20 border-b border-border/60 py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-8 text-center">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            The Trinity Bundle System
          </div>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Every Item Ships as Three Files
          </h2>
          <p className="mx-auto mt-1.5 max-w-2xl text-sm text-muted-foreground">
            Not just a prompt. Each download is a complete, actionable bundle engineered for
            professionals — and fully rendered on-page for search &amp; answer engines.
          </p>
        </div>

        <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.06 }}
              className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/50 p-5"
            >
              <div
                className="mb-3 grid h-11 w-11 place-items-center rounded-xl"
                style={{ backgroundColor: `${s.color}1f`, color: s.color }}
              >
                <s.icon className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold">{s.title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{s.desc}</p>
              <span
                className="absolute -bottom-px left-0 h-0.5 w-full origin-left scale-x-0 transition-transform duration-300 hover:scale-x-100"
                style={{ backgroundColor: s.color }}
              />
            </motion.div>
          ))}
        </div>

        {/* internal linking callout */}
        <div className="mt-6 flex flex-col items-start gap-3 rounded-2xl border border-border/60 bg-gradient-to-r from-emerald-500/5 to-violet-500/5 p-5 sm:flex-row sm:items-center">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary">
            <Link2 className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm font-semibold">Semantic internal-link graph</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Every prompt is auto-linked to related skills and same-audience items. The agent
              cross-wires prompts ↔ skills so a single visit can cascade through 5–10 pages —
              maximizing session depth and ad revenue per visitor.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
