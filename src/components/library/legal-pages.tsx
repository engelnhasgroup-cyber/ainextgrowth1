'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  X, ArrowLeft, Info, Mail, Shield, FileText, Sparkles, Bot, Globe,
  Users, Target, Heart, Lock, Cookie, CreditCard, AlertTriangle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLibrary, type LegalPage } from './store'

function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-3xl space-y-4 text-sm leading-relaxed text-foreground/85">
      {children}
    </div>
  )
}

function H2({ icon: Icon, children }: { icon: any; children: React.ReactNode }) {
  return (
    <h2 className="flex items-center gap-2 pt-6 text-lg font-bold text-foreground">
      <Icon className="h-4 w-4 text-primary" />
      {children}
    </h2>
  )
}

function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="pt-3 text-sm font-semibold text-foreground">{children}</h3>
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-sm leading-relaxed text-muted-foreground">{children}</p>
}

function Li({ children }: { children: React.ReactNode }) {
  return (
    <li className="ml-4 list-disc text-sm leading-relaxed text-muted-foreground">
      {children}
    </li>
  )
}

function LegalShell({
  page,
  title,
  subtitle,
  updated,
  children,
}: {
  page: LegalPage
  title: string
  subtitle: string
  updated: string
  children: React.ReactNode
}) {
  const closeLegal = useLibrary((s) => s.closeLegal)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [page])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background"
    >
      <div className="sticky top-0 z-40 border-b border-border/60 glass">
        <div className="mx-auto flex h-16 max-w-5xl items-center gap-3 px-4 sm:px-6">
          <Button variant="ghost" size="sm" onClick={closeLegal} className="rounded-full">
            <ArrowLeft className="mr-1.5 h-4 w-4" />
            Back to Library
          </Button>
          <div className="ml-auto text-xs text-muted-foreground">
            Last updated: {updated}
          </div>
        </div>
      </div>

      <article className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-16">
        <header className="mb-8 border-b border-border/60 pb-6">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            NexusAI 2026
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{title}</h1>
          <p className="mt-2 text-base text-muted-foreground">{subtitle}</p>
        </header>

        <Prose>{children}</Prose>

        <footer className="mt-12 border-t border-border/60 pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} NexusAI 2026 · Have questions? Reach us at{' '}
            <a href="mailto:contact@nexusai2026.example.com" className="text-primary underline">
              contact@nexusai2026.example.com
            </a>
          </p>
        </footer>
      </article>
    </motion.div>
  )
}

function AboutContent() {
  return (
    <LegalShell
      page="about"
      title="About NexusAI 2026"
      subtitle="The world's largest autonomous AI Prompt & Skill Library — engineered for professionals, researchers, and builders in 2026."
      updated="July 2026"
    >
      <P>
        NexusAI 2026 is an autonomous AI Prompt & Skill Library built to serve the global
        community of developers, marketers, data scientists, designers, educators, and
        founders working with large language models. Our platform is powered by a coordinated
        swarm of 20 specialized AI agents that research trends, engineer prompts, author
        workflows, and map audiences — producing 200 fresh, high-quality items every single day.
      </P>

      <H2 icon={Target}>Our Mission</H2>
      <P>
        We believe the bottleneck in AI adoption isn&apos;t the models — it&apos;s the prompts.
        A mediocre prompt on GPT-5 produces mediocre output. Our mission is to democratize
        access to professional-grade, neuro-engineered prompts and agentic skills so that
        individuals and small teams can achieve results previously reserved for enterprises
        with dedicated AI engineering teams.
      </P>

      <H2 icon={Bot}>How the Autonomous Agent Works</H2>
      <P>
        Our content pipeline is orchestrated by a multi-agent system built on modern agentic
        frameworks. The 20 agents are organized into six phases:
      </P>
      <ul className="space-y-1">
        <Li><strong>Research (Agents 1-3):</strong> Forecast 2026 trends, identify high-value niches, and design SEO/AEO architecture.</Li>
        <Li><strong>Generation (Agents 4-7):</strong> Engineer neuro-prompts, author execution workflows, map target audiences, and wire internal links.</Li>
        <Li><strong>Frontend (Agents 8-11):</strong> Design mobile-first UI, write React Server Components, optimize Core Web Vitals, and place AdSense units.</Li>
        <Li><strong>Backend (Agents 12-14):</strong> Manage the database schema, build API endpoints, and schedule the daily generation pipeline.</Li>
        <Li><strong>GEO/SEO (Agents 15-17):</strong> Inject Schema.org structured data, add GEO citations, and disseminate backlinks via downloadable .md files.</Li>
        <Li><strong>DevOps (Agents 18-20):</strong> Handle CI/CD, monitor uptime, and run QA compliance tests.</Li>
      </ul>

      <H2 icon={FileText}>The Trinity Bundle System</H2>
      <P>
        Every item on NexusAI 2026 ships as a Trinity Bundle — three Markdown files that
        together form a complete, actionable resource:
      </P>
      <ul className="space-y-1">
        <Li><strong>File 1 — The Prompt/Skill/Workflow:</strong> the master prompt or skill definition using 2026 techniques (role, constraints, variables, output format).</Li>
        <Li><strong>File 2 — Workflow & Execution:</strong> step-by-step execution guide with prerequisites, required tools, expected output, and success metrics.</Li>
        <Li><strong>File 3 — Target Audience & Use Cases:</strong> who the item is for, three real-world scenarios, and the industries that benefit.</Li>
      </ul>
      <P>
        All three files are downloadable as Markdown and include an attribution backlink,
        supporting organic distribution on GitHub, Discord, and Slack.
      </P>

      <H2 icon={Shield}>Editorial Standards (E-E-A-T)</H2>
      <P>
        While our content is AI-generated, every item passes through the NexusAI Editorial
        Team&apos;s review framework, which validates technical accuracy, checks for
        hallucinated tool references, and ensures the prompt produces the claimed output.
        Each item displays a &quot;Reviewed by NexusAI Editorial Team&quot; attribution to
        signal trust to both users and search engines.
      </P>

      <H2 icon={Globe}>Who We Serve</H2>
      <P>
        Our library targets professionals in high-value markets — the United States, United
        Kingdom, Canada, and Australia — across eight verticals: SEO & Content Marketing,
        Software Engineering & DevOps, Data & Analytics, Business & Strategy, Design &
        Creative, Sales & Growth, Education & Research, and Automation & AI Agents. We
        optimize all content for SEO, GEO (Generative Engine Optimization), and AEO (Answer
        Engine Optimization).
      </P>

      <H2 icon={Heart}>Why We&apos;re Free</H2>
      <P>
        NexusAI 2026 is free to use. The platform is supported by non-intrusive Google
        AdSense advertisements shown during a short countdown before file downloads. We never
        require users to click ads — the download unlocks automatically after a few seconds.
        This model lets us keep the library free while sustaining the autonomous generation
        pipeline.
      </P>

      <H2 icon={Mail}>Contact</H2>
      <P>
        Questions, feedback, or partnership inquiries? Email us at{' '}
        <a href="mailto:contact@nexusai2026.example.com" className="text-primary underline">
          contact@nexusai2026.example.com
        </a>{' '}
        or visit our Contact page.
      </P>
    </LegalShell>
  )
}

function ContactContent() {
  return (
    <LegalShell
      page="contact"
      title="Contact Us"
      subtitle="We're here to help. Reach out with questions, feedback, partnership ideas, or bug reports."
      updated="July 2026"
    >
      <H2 icon={Mail}>Get in Touch</H2>
      <P>
        The fastest way to reach the NexusAI 2026 team is via email. We respond to all
        legitimate inquiries within 1-2 business days.
      </P>

      <div className="my-6 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-border/60 bg-card/40 p-4">
          <Mail className="mb-2 h-5 w-5 text-primary" />
          <h3 className="text-sm font-semibold">General Inquiries</h3>
          <p className="text-xs text-muted-foreground">Questions about the library, content, or features.</p>
          <a href="mailto:contact@nexusai2026.example.com" className="mt-2 inline-block text-xs text-primary underline">
            contact@nexusai2026.example.com
          </a>
        </div>
        <div className="rounded-2xl border border-border/60 bg-card/40 p-4">
          <AlertTriangle className="mb-2 h-5 w-5 text-amber-400" />
          <h3 className="text-sm font-semibold">Report an Issue</h3>
          <p className="text-xs text-muted-foreground">Broken downloads, incorrect content, or bugs.</p>
          <a href="mailto:support@nexusai2026.example.com" className="mt-2 inline-block text-xs text-primary underline">
            support@nexusai2026.example.com
          </a>
        </div>
      </div>

      <H2 icon={Users}>Partnerships & Press</H2>
      <P>
        For partnership opportunities, press inquiries, or integration requests (RSS feeds,
        API access, embeddable widgets), please contact{' '}
        <a href="mailto:partners@nexusai2026.example.com" className="text-primary underline">
          partners@nexusai2026.example.com
        </a>
        .
      </P>

      <H2 icon={Bot}>AI Agent Issues</H2>
      <P>
        If you encounter a prompt or skill generated by our autonomous agent that appears
        inaccurate, hallucinated, or harmful, please report it with the item&apos;s slug
        (visible in its URL or detail modal). Our editorial team reviews all reports and
        corrects or removes items that fail our quality standards.
      </P>

      <H2 icon={Info}>Response Times</H2>
      <ul className="space-y-1">
        <Li>General inquiries: 1-2 business days</Li>
        <Li>Bug reports: 24 hours</Li>
        <Li>Content corrections: 48 hours</Li>
        <Li>Partnership inquiries: 3-5 business days</Li>
      </ul>

      <H2 icon={Globe}>Mailing Address</H2>
      <P>
        NexusAI 2026<br />
        Attn: Editorial Team<br />
        100 Market Street, Suite 400<br />
        San Francisco, CA 94105<br />
        United States
      </P>
    </LegalShell>
  )
}

function PrivacyContent() {
  return (
    <LegalShell
      page="privacy"
      title="Privacy Policy"
      subtitle="How NexusAI 2026 collects, uses, and protects your information. This policy complies with GDPR, CCPA, and Google AdSense requirements."
      updated="July 2026"
    >
      <P>
        This Privacy Policy describes how NexusAI 2026 (&quot;we&quot;, &quot;us&quot;, or
        &quot;our&quot;) collects, uses, and protects information when you visit our website
        at nexusai2026.example.com (the &quot;Service&quot;). By using the Service, you agree
        to the practices described in this policy.
      </P>

      <H2 icon={Lock}>Information We Collect</H2>
      <H3>Information You Provide</H3>
      <ul className="space-y-1">
        <Li><strong>Bookmarks:</strong> items you bookmark are stored locally in your browser (localStorage) and are never transmitted to our servers.</Li>
        <Li><strong>Contact form submissions:</strong> if you email us, we receive your email address and message content.</Li>
      </ul>
      <H3>Information Collected Automatically</H3>
      <ul className="space-y-1">
        <Li><strong>Usage data:</strong> pages visited, items viewed, files downloaded, and time spent on the Service.</Li>
        <Li><strong>Technical data:</strong> IP address, browser type, device type, operating system, and referring URL.</Li>
        <Li><strong>Cookies and similar technologies:</strong> see the Cookies section below.</Li>
      </ul>

      <H2 icon={Cookie}>Cookies & Google AdSense</H2>
      <P>
        We use cookies and similar technologies to operate the Service, analyze traffic, and
        serve advertisements. This Service uses Google AdSense, a service provided by Google
        LLC that displays ads based on your interests and browsing behavior.
      </P>
      <H3>Google AdSense &amp; the DoubleClick DART Cookie</H3>
      <ul className="space-y-1">
        <Li>Google, as a third-party vendor, uses cookies (including the DoubleClick DART cookie) to serve ads based on your prior visits to this and other websites.</Li>
        <Li>Google&apos;s use of advertising cookies enables it and its partners to serve ads to you based on your visit to our site and/or other sites on the Internet.</Li>
        <Li>You may opt out of personalized advertising by visiting{' '}
          <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-primary underline">
            Google Ads Settings
          </a>.
        </Li>
        <Li>You may opt out of third-party vendor cookies by visiting{' '}
          <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-primary underline">
            aboutads.info/choices
          </a>.
        </Li>
      </ul>
      <H3>Types of Cookies We Use</H3>
      <ul className="space-y-1">
        <Li><strong>Essential cookies:</strong> required for the Service to function (e.g., theme preference).</Li>
        <Li><strong>Analytics cookies:</strong> help us understand how visitors use the Service.</Li>
        <Li><strong>Advertising cookies:</strong> used by Google AdSense to serve relevant ads.</Li>
      </ul>

      <H2 icon={CreditCard}>How We Use Information</H2>
      <ul className="space-y-1">
        <Li>To operate, maintain, and improve the Service.</Li>
        <Li>To display and measure the performance of advertisements.</Li>
        <Li>To analyze usage trends and popular content.</Li>
        <Li>To respond to your inquiries and support requests.</Li>
        <Li>To detect, prevent, and address technical issues, fraud, or abuse.</Li>
      </ul>

      <H2 icon={Shield}>Legal Basis for Processing (GDPR)</H2>
      <P>
        For users in the European Economic Area, we process personal data based on the
        following legal bases: (a) your consent (e.g., for advertising cookies); (b) our
        legitimate interests in operating and improving the Service; and (c) compliance with
        legal obligations.
      </P>

      <H2 icon={Users}>Your Rights</H2>
      <P>
        Depending on your location, you may have the following rights regarding your personal
        data:
      </P>
      <ul className="space-y-1">
        <Li><strong>Access:</strong> request a copy of the personal data we hold about you.</Li>
        <Li><strong>Rectification:</strong> request correction of inaccurate data.</Li>
        <Li><strong>Erasure:</strong> request deletion of your personal data.</Li>
        <Li><strong>Opt-out:</strong> opt out of personalized advertising and analytics cookies.</Li>
        <Li><strong>Do Not Sell:</strong> California residents can opt out of the &quot;sale&quot; of personal information under CCPA.</Li>
      </ul>
      <P>
        To exercise these rights, contact us at{' '}
        <a href="mailto:privacy@nexusai2026.example.com" className="text-primary underline">
          privacy@nexusai2026.example.com
        </a>.
      </P>

      <H2 icon={Lock}>Data Security</H2>
      <P>
        We implement reasonable technical and organizational measures to protect your
        information, including encrypted connections (HTTPS) and access controls. However, no
        method of transmission over the Internet is 100% secure, and we cannot guarantee
        absolute security.
      </P>

      <H2 icon={Globe}>Third-Party Services</H2>
      <P>
        We use the following third-party services that may collect information governed by
        their own privacy policies:
      </P>
      <ul className="space-y-1">
        <Li><strong>Google AdSense:</strong> advertising (Google Privacy Policy).</Li>
        <Li><strong>Google Analytics:</strong> traffic analytics (if enabled).</Li>
        <Li><strong>Hosting provider:</strong> serves the website.</Li>
      </ul>

      <H2 icon={Info}>Children&apos;s Privacy</H2>
      <P>
        The Service is not directed to children under 13 (or the minimum age in your
        jurisdiction). We do not knowingly collect personal data from children. If you believe
        a child has provided us with personal data, please contact us for prompt deletion.
      </P>

      <H2 icon={AlertTriangle}>Changes to This Policy</H2>
      <P>
        We may update this Privacy Policy from time to time. We will notify you of significant
        changes by posting the updated policy on this page with a new &quot;Last updated&quot;
        date. Your continued use of the Service after changes constitutes acceptance of the
        updated policy.
      </P>

      <H2 icon={Mail}>Contact</H2>
      <P>
        Questions about this Privacy Policy? Contact us at{' '}
        <a href="mailto:privacy@nexusai2026.example.com" className="text-primary underline">
          privacy@nexusai2026.example.com
        </a>.
      </P>
    </LegalShell>
  )
}

function TermsContent() {
  return (
    <LegalShell
      page="terms"
      title="Terms of Service"
      subtitle="The terms and conditions governing your use of the NexusAI 2026 platform and the Markdown files you download."
      updated="July 2026"
    >
      <P>
        Welcome to NexusAI 2026. By accessing or using our website at
        nexusai2026.example.com (the &quot;Service&quot;), you agree to be bound by these
        Terms of Service (&quot;Terms&quot;). If you do not agree to these Terms, please do
        not use the Service.
      </P>

      <H2 icon={Info}>1. Description of Service</H2>
      <P>
        NexusAI 2026 provides a free library of AI-generated prompts, skills, and workflows
        (collectively, &quot;Content&quot;), each available for download as a bundle of three
        Markdown files (the &quot;Trinity Bundle&quot;). The Content is generated by an
        autonomous AI agent system and reviewed by the NexusAI Editorial Team.
      </P>

      <H2 icon={FileText}>2. License to Use Content</H2>
      <P>
        Subject to your compliance with these Terms, NexusAI 2026 grants you a worldwide,
        non-exclusive, royalty-free license to:
      </P>
      <ul className="space-y-1">
        <Li>Download, copy, and use the Markdown files for personal and commercial purposes.</Li>
        <Li>Modify and adapt the prompts and skills for your own use cases.</Li>
        <Li>Distribute the files (including on GitHub, Discord, Slack, and internal wikis) provided you retain the attribution footer linking back to nexusai2026.example.com.</Li>
      </ul>
      <H3>Attribution Requirement</H3>
      <P>
        Each downloaded Markdown file includes a footer crediting NexusAI 2026 with a
        backlink. You agree not to remove, alter, or obscure this attribution when
        distributing the files. Bulk removal of attribution for redistribution as a competing
        service is strictly prohibited.
      </P>

      <H2 icon={Lock}>3. Acceptable Use</H2>
      <P>You agree not to:</P>
      <ul className="space-y-1">
        <Li>Use the Content to violate any law, regulation, or third-party rights.</Li>
        <Li>Use prompts or skills to generate harmful, deceptive, or illegal content (including malware, phishing, harassment, or disinformation).</Li>
        <Li>Attempt to overload, hack, or reverse-engineer the Service or its APIs.</Li>
        <Li>Scrape or bulk-download the entire library for the purpose of creating a competing service.</Li>
        <Li>Circumvent the AdSense countdown or advertising mechanism.</Li>
        <Li>Submit malicious content through the contact form or generation endpoint.</Li>
      </ul>

      <H2 icon={Bot}>4. AI-Generated Content Disclaimer</H2>
      <P>
        The Content on this Service is generated by artificial intelligence. While our
        editorial team reviews items for quality and accuracy, we make no guarantees that:
      </P>
      <ul className="space-y-1">
        <Li>The prompts will produce specific results in any particular AI model.</Li>
        <Li>Referenced tools (e.g., GPT-5, Claude 4 Opus) will remain available or behave as described.</Li>
        <Li>The Content is free of errors, hallucinations, or outdated information.</Li>
      </ul>
      <P>
        You are solely responsible for evaluating the suitability of any prompt or skill for
        your use case and for the outputs you generate using them.
      </P>

      <H2 icon={CreditCard}>5. Advertisements</H2>
      <P>
        The Service displays advertisements served by Google AdSense and potentially other
        advertising networks. We are not responsible for the content of these advertisements
        or the products/services they promote. You understand that:
      </P>
      <ul className="space-y-1">
        <Li>Ads are shown before file downloads as part of our monetization model.</Li>
        <Li>You are never required to click ads to unlock downloads (the countdown unlocks automatically).</Li>
        <Li>Clicking ads is voluntary and may take you to third-party websites governed by their own terms.</Li>
        <Li>Encouraging others to click ads (click fraud) is prohibited and may result in access termination.</Li>
      </ul>

      <H2 icon={Shield}>6. Intellectual Property</H2>
      <P>
        The Service&apos;s design, branding, code, and editorial framework are the
        intellectual property of NexusAI 2026. The AI-generated Content is licensed to you
        under the terms in Section 2. Third-party trademarks and tool names referenced in
        Content belong to their respective owners.
      </P>

      <H2 icon={AlertTriangle}>7. Disclaimer of Warranties</H2>
      <P>
        The Service is provided &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; without
        warranties of any kind, whether express or implied, including but not limited to
        implied warranties of merchantability, fitness for a particular purpose, and
        non-infringement. We do not warrant that the Service will be uninterrupted,
        error-free, or secure.
      </P>

      <H2 icon={AlertTriangle}>8. Limitation of Liability</H2>
      <P>
        To the maximum extent permitted by law, NexusAI 2026 and its team shall not be liable
        for any indirect, incidental, special, consequential, or punitive damages, including
        loss of profits, data, or goodwill, arising from your use of the Service or the
        Content, even if advised of the possibility of such damages.
      </P>

      <H2 icon={Globe}>9. Governing Law</H2>
      <P>
        These Terms are governed by the laws of the State of California, United States,
        without regard to conflict of law principles. Any disputes shall be resolved in the
        courts located in San Francisco County, California.
      </P>

      <H2 icon={Info}>10. Changes to Terms</H2>
      <P>
        We may modify these Terms at any time. We will post updated Terms on this page with a
        new &quot;Last updated&quot; date. Your continued use of the Service after changes
        constitutes acceptance of the updated Terms.
      </P>

      <H2 icon={Mail}>11. Contact</H2>
      <P>
        Questions about these Terms? Contact us at{' '}
        <a href="mailto:legal@nexusai2026.example.com" className="text-primary underline">
          legal@nexusai2026.example.com
        </a>.
      </P>
    </LegalShell>
  )
}

export function LegalPages() {
  const legalPage = useLibrary((s) => s.legalPage)
  if (!legalPage) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-background">
      {legalPage === 'about' && <AboutContent />}
      {legalPage === 'contact' && <ContactContent />}
      {legalPage === 'privacy' && <PrivacyContent />}
      {legalPage === 'terms' && <TermsContent />}
    </div>
  )
}
