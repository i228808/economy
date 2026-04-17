import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay, ease: 'easeOut' },
})

const STEPS = [
  {
    n: '01',
    title: 'Create your account',
    desc: 'Sign up free in a few minutes. You can add a payout wallet whenever you are ready to receive ALPEN.',
  },
  {
    n: '02',
    title: 'Connect your worker',
    desc: 'Link the AlpenMesh worker on your machine to your profile so your contribution is credited to you.',
  },
  {
    n: '03',
    title: 'Add your payout wallet',
    desc: 'Choose where you want rewards sent. Use a wallet you control that works with the network.',
  },
  {
    n: '04',
    title: 'Earn as you go',
    desc: 'Your GPU helps run real AI workloads. Your dashboard shows what you have earned and what is still settling.',
  },
]

const FEATURES = [
  {
    title: 'Straightforward onboarding',
    desc: 'Clear steps to register your node and tie it to your profile, with no guesswork.',
    live: true,
  },
  {
    title: 'Wallet linking',
    desc: 'Connect payout details at the account level or per node, whichever fits your setup.',
    live: true,
  },
  {
    title: 'Activity & proof history',
    desc: 'See batches of work and their status over time, so nothing feels hidden.',
    live: true,
  },
  {
    title: 'Earnings overview',
    desc: 'Track totals and what is still settling versus already credited.',
    live: true,
  },
  {
    title: 'Compute marketplace',
    desc: 'Rent distributed GPU capacity for your own jobs when the marketplace launches.',
    live: false,
  },
  {
    title: 'Container-style jobs',
    desc: 'Run packaged workloads with resource targets, planned for a future release.',
    live: false,
  },
]

/** Set to true when you want the platform grid and future-phase teaser back on the home page. */
const SHOW_LANDING_PLATFORM_GRID = false
const SHOW_LANDING_FUTURE_PHASE = false

const TRUST_PILLARS = [
  {
    kicker: 'Transparency',
    line: 'See contribution and reward history in one place.',
  },
  {
    kicker: 'You stay in control',
    line: 'Your hardware runs on your terms; you choose what to connect.',
  },
  {
    kicker: 'Built for real workloads',
    line: 'Designed around GPU-backed AI inference, not speculation.',
  },
]

/** Landing-only platform overview (distinct from gated FEATURES grid). */
const PLATFORM_OVERVIEW = [
  {
    wide: true,
    title: 'Your contributor console',
    body: 'One place for your profile, the workers you have linked, and a clear read on how your participation is performing.',
  },
  {
    title: 'Workers on your terms',
    body: 'Register a machine, claim it to your account, and label each node so a growing fleet never turns into a spreadsheet problem.',
  },
  {
    title: 'Wallets that match how you work',
    body: 'Route rewards through a wallet on your profile or set payouts per worker when different destinations make more sense.',
  },
  {
    title: 'A trail you can actually read',
    body: 'Proof batches surface with statuses you can follow, so nothing about your contribution feels opaque or hand-wavy.',
  },
  {
    title: 'Context across the network',
    body: 'Dashboard summaries help you sense how your GPUs sit in the broader picture, not just what happened on one box yesterday.',
  },
  {
    wide: true,
    title: 'Accounts you can start now',
    body: 'Sign up, sign in, and move through onboarding without mystery steps or hidden prerequisites.',
  },
]

const FAQS = [
  {
    q: 'What is AlpenMesh Compute?',
    a: 'It is a platform for contributing GPU capacity to a distributed network and earning rewards in ALPEN for the work your machine performs. The focus is transparent accounting and a clear path from contribution to payout.',
  },
  {
    q: 'What do I need to participate?',
    a: 'A compatible GPU and the AlpenMesh worker software. Requirements depend on the workloads the network assigns; check the documentation for current guidance.',
  },
  {
    q: 'How do rewards work?',
    a: 'Rewards reflect verified contribution over time. You can see pending versus settled amounts in your dashboard so you always know where things stand.',
  },
  {
    q: 'When can I rent GPU from others?',
    a: 'A marketplace for buyers and renters is planned for a later phase. Today the product is centered on contributors: connecting nodes, linking wallets, and tracking earnings.',
  },
  {
    q: 'Is this production-ready?',
    a: 'The platform is built for real sign-up, wallet linking, and earnings visibility. Features that are still in development are labeled clearly so expectations stay honest.',
  },
]

function PlatformOverviewSection() {
  const reduceMotion = useReducedMotion()

  const itemMotion = (delay = 0) => ({
    initial: { opacity: 0, y: reduceMotion ? 0 : 22 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-40px' },
    transition: {
      duration: reduceMotion ? 0.12 : 0.48,
      delay: reduceMotion ? 0 : delay,
      ease: [0.22, 1, 0.36, 1],
    },
  })

  return (
    <section className="relative border-t border-[var(--border)] overflow-hidden">
      {/* Atmosphere: depth without competing with content */}
      <div className="absolute inset-0 bg-[var(--bg)]" aria-hidden />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.55] [mask-image:linear-gradient(180deg,black,transparent_85%)]"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 90% 55% at 100% -10%, rgba(232,168,68,0.14), transparent 50%), radial-gradient(ellipse 70% 45% at 0% 100%, rgba(232,168,68,0.06), transparent 45%)',
        }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-grid opacity-[0.2] pointer-events-none" aria-hidden />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/50 to-transparent" aria-hidden />
      <div className="absolute -right-24 top-1/4 w-[min(55vw,28rem)] aspect-square rounded-full border border-[var(--accent-border)] opacity-30 pointer-events-none" aria-hidden />
      <div className="absolute -left-16 bottom-0 w-72 h-72 rounded-full bg-[var(--accent)] opacity-[0.03] blur-3xl pointer-events-none" aria-hidden />

      <div className="relative max-w-7xl mx-auto w-full px-5 py-20 md:py-28">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Editorial column */}
          <motion.div {...itemMotion(0)} className="lg:col-span-5 lg:sticky lg:top-28">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--accent)] mb-5">
              Platform overview
            </p>
            <h2 className="font-display font-bold text-[clamp(2rem,4vw,3.25rem)] leading-[1.08] text-[var(--text-primary)] mb-6 text-balance">
              Everything the product is{' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-[var(--accent)]">designed to prove</span>
                <span
                  className="absolute -bottom-1 left-0 right-0 h-2.5 bg-[var(--accent)]/15 -rotate-1 rounded-sm -z-0"
                  aria-hidden
                />
              </span>
              {' '}about your GPUs.
            </h2>
            <p className="text-base sm:text-lg text-[var(--text-muted)] leading-relaxed mb-8 max-w-md text-pretty">
              AlpenMesh Compute is built around contributors first: honest visibility, deliberate pacing, and surfaces
              that respect the fact that you are running real machines, not clicking through another generic dashboard.
            </p>
            <Link
              to="/features"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors"
            >
              Full feature tour
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </motion.div>

          {/* Bento-style feature mosaic */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
            {PLATFORM_OVERVIEW.map((item, i) => (
              <motion.article
                key={item.title}
                {...itemMotion(0.06 + i * 0.05)}
                className={`
                  group relative rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)]/90 backdrop-blur-sm
                  p-6 md:p-7 transition-[border-color,box-shadow,transform] duration-300 ease-out
                  hover:border-[var(--accent-border)] hover:shadow-[0_20px_50px_-24px_rgba(0,0,0,0.55)]
                  ${item.wide ? 'sm:col-span-2' : ''}
                  ${!item.wide && i % 2 === 1 ? 'md:translate-y-5' : ''}
                `}
              >
                <div
                  className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  aria-hidden
                />
                <div className="flex items-start justify-between gap-4 mb-4">
                  <span className="font-mono text-[11px] font-medium tracking-widest text-[var(--accent)]/90 tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)] opacity-60 group-hover:opacity-100 group-hover:shadow-[0_0_12px_var(--accent)] transition-all duration-300"
                    aria-hidden
                  />
                </div>
                <h3 className="font-display font-bold text-lg md:text-xl text-[var(--text-primary)] mb-2.5 leading-snug text-balance">
                  {item.title}
                </h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed text-pretty">{item.body}</p>
                {item.wide && (
                  <div
                    className="mt-6 flex flex-wrap gap-2 text-[10px] font-medium uppercase tracking-wider text-[var(--text-faint)]"
                    aria-hidden
                  >
                    {['Portfolio', 'Workers', 'Proofs', 'Wallets', 'Dashboard'].map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-[var(--border)] bg-[var(--surface-raised)] px-2.5 py-1 text-[var(--text-muted)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      className="border border-[var(--border)] rounded-[var(--radius-md)] overflow-hidden cursor-pointer hover:border-[var(--accent-border)] transition-colors"
      onClick={() => setOpen(v => !v)}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && setOpen(v => !v)}
    >
      <div className="flex items-center justify-between px-5 py-4 gap-4">
        <p className="font-medium text-[var(--text-primary)] text-sm">{q}</p>
        <ChevronDown
          size={16}
          className={`text-[var(--text-muted)] shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </div>
      {open && (
        <div className="px-5 pb-4 border-t border-[var(--border)]">
          <p className="text-sm text-[var(--text-muted)] leading-relaxed pt-3">{a}</p>
        </div>
      )}
    </div>
  )
}

export default function Landing() {
  return (
    <div>
      {/* Hero: one viewport below sticky nav (4rem), centered, responsive */}
      <section className="relative overflow-hidden min-h-[calc(100dvh-4rem)] flex flex-col justify-center">
        <div className="absolute inset-0 bg-grid opacity-[0.35] pointer-events-none" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(100%,52rem)] h-[min(70vh,36rem)] rounded-[50%] bg-[var(--accent)] opacity-[0.045] blur-[100px] pointer-events-none" />
        <div className="absolute inset-0 noise opacity-50 pointer-events-none" aria-hidden />
        <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 md:h-40 bg-gradient-to-t from-[var(--bg)] to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-5 py-8 sm:py-12 md:py-16 relative z-10 w-full">
          <motion.div {...fadeUp(0)} className="max-w-3xl w-full">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-faint)] mb-4">
              Distributed GPU for AI
            </p>

            <h1 className="font-display font-bold text-[clamp(1.875rem,4.5vw+0.5rem,3.5rem)] sm:text-[clamp(2.25rem,5vw,3.75rem)] text-[var(--text-primary)] leading-[1.08] mb-5 sm:mb-6">
              Put your GPU to work on{' '}
              <span className="text-[var(--accent)]">real AI infrastructure</span> and get paid in ALPEN.
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-[var(--text-muted)] leading-relaxed mb-8 sm:mb-10 max-w-2xl">
              AlpenMesh Compute connects contributors who run GPU nodes with a network built for transparent rewards.
              Create an account, link your node and payout wallet, and track earnings as you contribute, not as a side
              project pitch, but as a product you can actually use.
            </p>

            <div className="flex flex-wrap gap-3 mb-8 sm:mb-12 md:mb-14">
              <Link to="/signup">
                <Button variant="cta" size="xl">
                  Get started <ArrowRight size={18} />
                </Button>
              </Link>
              <Link to="/how-it-works">
                <Button variant="secondary" size="xl">
                  See how it works
                </Button>
              </Link>
            </div>

            {/* Trust pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 pt-4 sm:pt-6 border-t border-[var(--border-subtle)]">
              {TRUST_PILLARS.map(({ kicker, line }) => (
                <div key={kicker}>
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-[var(--accent)] mb-2">
                    {kicker}
                  </p>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">{line}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* How it works — width matches PublicLayout nav: max-w-7xl + px-5 */}
      <section className="py-24 bg-[var(--bg-subtle)]">
        <div className="max-w-7xl mx-auto w-full px-5">
          <motion.div {...fadeUp(0)} className="text-center max-w-2xl mx-auto mb-14">
            <Badge variant="accent" className="mb-4">
              How it works
            </Badge>
            <h2 className="font-display font-bold text-4xl text-[var(--text-primary)] mb-4">
              Here is how you get started
            </h2>
            <p className="text-[var(--text-muted)]">
              Four steps you can finish today. We keep the language simple so you always know what to do next.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {STEPS.map(({ n, title, desc }, i) => (
              <motion.div key={n} {...fadeUp(i * 0.08)} className="h-full">
                <div
                  className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-md)] p-7 sm:p-8 min-h-[260px] sm:min-h-[280px] lg:min-h-[300px] h-full hover:border-[var(--accent-border)] transition-colors relative overflow-hidden flex flex-col"
                >
                  <div className="relative z-10 flex-1 pr-2 sm:pr-3 pb-16">
                    <h3 className="font-display font-bold text-[var(--text-primary)] mb-3 text-balance">{title}</h3>
                    <p className="text-sm text-[var(--text-muted)] leading-relaxed text-pretty">{desc}</p>
                  </div>
                  <span
                    className="absolute bottom-2 right-3 sm:bottom-3 sm:right-4 text-[4.25rem] sm:text-[4.75rem] font-display font-bold leading-none text-[var(--accent)] select-none pointer-events-none opacity-[0.38] sm:opacity-[0.45]"
                    aria-hidden
                  >
                    {n}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {SHOW_LANDING_PLATFORM_GRID && (
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-5">
            <motion.div {...fadeUp(0)} className="text-center max-w-2xl mx-auto mb-14">
              <Badge variant="accent" className="mb-4">
                Platform
              </Badge>
              <h2 className="font-display font-bold text-4xl text-[var(--text-primary)] mb-4">
                What you can do today
              </h2>
              <p className="text-[var(--text-muted)]">
                Everything listed as available is live in the product. Anything marked as a future phase is labeled so you
                are never misled.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {FEATURES.map(({ title, desc, live }, i) => (
                <motion.div key={title} {...fadeUp(i * 0.06)}>
                  <div
                    className={`rounded-[var(--radius-xl)] p-6 h-full border pl-5 transition-colors ${
                      live
                        ? 'bg-[var(--surface)] border-[var(--border)] border-l-4 border-l-[var(--accent)] hover:border-[var(--accent-border)]'
                        : 'bg-[var(--surface)] border border-dashed border-[var(--border)] border-l-4 border-l-[var(--border)] opacity-80'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <h3 className="font-display font-bold text-[var(--text-primary)]">{title}</h3>
                      {live ? <Badge variant="live">Available</Badge> : <Badge variant="phase2">Coming later</Badge>}
                    </div>
                    <p className="text-sm text-[var(--text-muted)] leading-relaxed">{desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {SHOW_LANDING_FUTURE_PHASE && (
        <section className="py-20 bg-[var(--bg-subtle)]">
          <div className="max-w-7xl mx-auto px-5">
            <motion.div {...fadeUp(0)} className="max-w-3xl mx-auto text-center">
              <Badge variant="phase2" className="mb-6">
                Coming in a later phase
              </Badge>
              <h2 className="font-display font-bold text-4xl text-[var(--text-primary)] mb-4">
                Rent GPU when the marketplace opens
              </h2>
              <p className="text-[var(--text-muted)] text-lg mb-10 leading-relaxed">
                We are building a way for teams to buy compute from the network, not just contribute it. When that layer
                ships, you will be able to submit jobs, set resource expectations and pay in ALPEN. It is not live yet;
                this page will stay explicit about that.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
                {[
                  { title: 'Submit jobs', desc: 'Define what you want to run and what you are willing to spend.' },
                  { title: 'Track runs', desc: 'Follow status from queue through completion.' },
                  { title: 'Settle fairly', desc: 'Pricing and settlement designed around verifiable work.' },
                ].map(({ title, desc }) => (
                  <div
                    key={title}
                    className="p-5 bg-[var(--surface)] border border-dashed border-[var(--border)] rounded-[var(--radius-lg)]"
                  >
                    <h4 className="font-semibold text-[var(--text-primary)] text-sm mb-1">{title}</h4>
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      <PlatformOverviewSection />

      {/* FAQ */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-5">
          <motion.div {...fadeUp(0)} className="text-center mb-12">
            <h2 className="font-display font-bold text-4xl text-[var(--text-primary)] mb-4">
              Questions, answered plainly
            </h2>
            <p className="text-[var(--text-muted)]">Straight answers, no hype, no hidden roadmap fiction.</p>
          </motion.div>
          <div className="flex flex-col gap-3">
            {FAQS.map((faq, i) => (
              <motion.div key={i} {...fadeUp(i * 0.04)}>
                <FaqItem {...faq} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(100%,36rem)] h-[min(50vh,18rem)] rounded-full bg-[var(--accent)] opacity-[0.06] blur-[80px] pointer-events-none" />
        <div className="max-w-3xl mx-auto px-5 text-center relative z-10">
          <motion.div {...fadeUp(0)}>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-[var(--text-primary)] mb-5">
              Ready to contribute?
            </h2>
            <p className="text-[var(--text-muted)] text-lg mb-8">
              Open an account, connect your node when you are ready, and keep your payout path under your control.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link to="/signup">
                <Button size="xl">
                  Create free account <ArrowRight size={18} />
                </Button>
              </Link>
              <Link to="/features">
                <Button variant="secondary" size="xl">
                  Explore features
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
