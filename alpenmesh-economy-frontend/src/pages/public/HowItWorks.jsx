import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Shield, Cpu, Wallet, TrendingUp, Globe, Container, ArrowRight, CheckCircle2 } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.45, delay, ease: 'easeOut' },
})

const LIVE_STEPS = [
  {
    n: '01', icon: Shield, title: 'Create Your Account',
    desc: 'Sign up with email and display name. Your account is provisioned immediately — no wallet required at this stage.',
    details: [
      'Email + password authentication',
      'Session-based auth with server-side token rotation',
      'Secure SHA-256 password hashing on the backend',
    ],
  },
  {
    n: '02', icon: Cpu, title: 'Register & Connect a Worker',
    desc: 'First, register your local AlpenMesh worker using its unique worker ID and secret. Then claim it to your account.',
    details: [
      'Worker registration stores a hashed secret in the network registry',
      'Claiming links the worker to your account',
      'Optionally add a human-readable label',
      'Multiple workers can be connected to one account',
    ],
  },
  {
    n: '03', icon: Wallet, title: 'Link Your Payout Wallet',
    desc: 'Attach a Solana-compatible wallet to receive ALPEN reward payouts. You can also bind separate wallets per worker.',
    details: [
      'Account-level wallet for global payout routing',
      'Per-worker wallet overrides for granular control',
      'Network label stored alongside address',
    ],
  },
  {
    n: '04', icon: TrendingUp, title: 'Track Proofs & Earnings',
    desc: 'Your worker automatically submits inference proof batches to the network. Track each batch and your earned ALPEN.',
    details: [
      'Proof batches include window time, inference count, and reward',
      'Chain status transitions: queued → submitted → confirmed',
      'Pending and submitted reward breakdown per worker',
      'Network-wide and per-worker earnings dashboard',
    ],
  },
]

const PHASE2_STEPS = [
  {
    n: '05', icon: Globe, title: 'Submit Your Own Compute Jobs (Phase 2)',
    desc: 'In Phase 2, you\'ll be able to submit containerized AI workloads to the network and pay in ALPEN for distributed GPU compute.',
  },
  {
    n: '06', icon: Container, title: 'Docker-Based Workloads (Phase 2)',
    desc: 'Workloads may include Docker image URLs, custom entrypoints, GPU VRAM requirements, and runtime limits. Settlement is automatic on completion.',
  },
]

export default function HowItWorks() {
  return (
    <div>
      {/* Hero */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-5 relative z-10">
          <motion.div {...fadeUp(0)} className="max-w-2xl">
            <Badge variant="accent" className="mb-4">How It Works</Badge>
            <h1 className="font-display font-bold text-5xl text-[var(--text-primary)] mb-5">
              Technically accurate. Start to finish.
            </h1>
            <p className="text-[var(--text-muted)] text-lg leading-relaxed">
              A step-by-step walkthrough of the AlpenMesh Compute economy system — from account creation to proof settlement.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Live steps */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-5">
          <motion.div {...fadeUp(0)} className="flex items-center gap-3 mb-10">
            <h2 className="font-display font-bold text-2xl text-[var(--text-primary)]">Live Today</h2>
            <Badge variant="live">Active</Badge>
          </motion.div>
          <div className="relative flex flex-col gap-0">
            {/* Timeline line */}
            <div className="absolute left-6 top-12 bottom-12 w-px bg-[var(--border)] hidden sm:block" />
            {LIVE_STEPS.map(({ n, icon: Icon, title, desc, details }, i) => (
              <motion.div key={n} {...fadeUp(i * 0.07)} className="flex gap-6 pb-12 last:pb-0">
                {/* Step number */}
                <div className="shrink-0 flex flex-col items-center gap-2 hidden sm:flex">
                  <div className="w-12 h-12 rounded-full bg-[var(--accent)] flex items-center justify-center z-10 relative shadow-lg">
                    <Icon size={20} className="text-[#090B0F]" />
                  </div>
                </div>
                {/* Content */}
                <div className="flex-1 pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold font-mono text-[var(--text-faint)]">STEP {n}</span>
                  </div>
                  <h3 className="font-display font-bold text-xl text-[var(--text-primary)] mb-2">{title}</h3>
                  <p className="text-[var(--text-muted)] mb-4 leading-relaxed">{desc}</p>
                  <ul className="space-y-2">
                    {details.map(d => (
                      <li key={d} className="flex items-start gap-2.5 text-sm text-[var(--text-muted)]">
                        <CheckCircle2 size={14} className="text-[var(--success)] shrink-0 mt-0.5" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Phase 2 steps */}
      <section className="py-12 bg-[var(--bg-subtle)]">
        <div className="max-w-4xl mx-auto px-5">
          <motion.div {...fadeUp(0)} className="flex items-center gap-3 mb-8">
            <h2 className="font-display font-bold text-2xl text-[var(--text-primary)]">Coming in Phase 2</h2>
            <Badge variant="phase2">Planned</Badge>
          </motion.div>
          <div className="flex flex-col gap-5">
            {PHASE2_STEPS.map(({ n, icon: Icon, title, desc }, i) => (
              <motion.div key={n} {...fadeUp(i * 0.06)}>
                <div className="flex gap-5 p-6 bg-[var(--surface)] border border-dashed border-[var(--border)] rounded-[var(--radius-xl)] opacity-70">
                  <div className="w-11 h-11 rounded-xl bg-[var(--surface-raised)] border border-[var(--border)] flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-[var(--text-faint)]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <h3 className="font-display font-semibold text-[var(--text-primary)]">{title}</h3>
                    </div>
                    <p className="text-sm text-[var(--text-muted)] leading-relaxed">{desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-5 text-center">
          <motion.div {...fadeUp(0)}>
            <h2 className="font-display font-bold text-4xl text-[var(--text-primary)] mb-5">Ready to get started?</h2>
            <p className="text-[var(--text-muted)] mb-8">Create your account, connect your worker, and start earning today.</p>
            <Link to="/signup"><Button size="lg">Get Started <ArrowRight size={16} /></Button></Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
