import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Cpu, Wallet, FileCheck, TrendingUp, Globe, Zap, Shield, Container, ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.45, delay, ease: 'easeOut' },
})

const LIVE_FEATURES = [
  {
    icon: Cpu,
    title: 'Worker Onboarding',
    desc: 'Register your worker with a unique ID and secret. The registration flow stores a hashed secret in the network registry, then lets you claim the worker under your account.',
    bullets: ['Worker ID + secret registration', 'Claim worker to user account', 'Custom label per worker', 'Multi-worker support'],
  },
  {
    icon: Wallet,
    title: 'Wallet Linking',
    desc: 'Link a Solana-compatible payout wallet at the account level, or bind individual payout wallets per worker for fine-grained reward routing.',
    bullets: ['Account-level wallet linking', 'Per-worker payout wallets', 'Network selection support', 'Update wallet any time'],
  },
  {
    icon: FileCheck,
    title: 'Proof Visibility',
    desc: 'Every inference batch generates a signed proof record. Track each proof from queued through submitted and confirmed, with chain signature metadata.',
    bullets: ['Proof batch records', 'Chain status lifecycle', 'Chain signature display', 'Latest-first history'],
  },
  {
    icon: TrendingUp,
    title: 'Earnings Dashboard',
    desc: 'A real-time earnings dashboard shows total, pending, and submitted reward breakdowns across all your connected workers and across the entire network.',
    bullets: ['Network-wide summary', 'Per-worker earnings', 'Submitted vs pending split', 'Inference count tracking'],
  },
]

const PHASE2_FEATURES = [
  {
    icon: Globe,
    title: 'Compute Marketplace',
    desc: 'Browse and rent distributed GPU compute from verified AlpenMesh workers. Select by VRAM tier, uptime rating, and compute class.',
  },
  {
    icon: Container,
    title: 'Containerized Job Submission',
    desc: 'Submit Docker-based workloads with custom entrypoints, GPU requirements, and output destinations. Budget cap supported.',
  },
  {
    icon: Zap,
    title: 'Real-time Job Monitoring',
    desc: 'Track your submitted jobs from queued through running, completed, and settled. Failover and reassignment handled automatically.',
  },
  {
    icon: Shield,
    title: 'Trustless Proof Verification',
    desc: 'Extended proof verification layer that anchors execution results on-chain and verifies them independently of the worker.',
  },
]

export default function Features() {
  return (
    <div>
      {/* Hero */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-5 relative z-10">
          <motion.div {...fadeUp(0)} className="max-w-2xl">
            <Badge variant="accent" className="mb-4">Platform Features</Badge>
            <h1 className="font-display font-bold text-5xl text-[var(--text-primary)] mb-5">
              What AlpenMesh Compute delivers today
            </h1>
            <p className="text-[var(--text-muted)] text-lg leading-relaxed">
              Live features are fully integrated with the Rust backend. Phase 2 capabilities are clearly marked and planned for the next release cycle.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Live features */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-5">
          <motion.div {...fadeUp(0)} className="flex items-center gap-3 mb-10">
            <h2 className="font-display font-bold text-3xl text-[var(--text-primary)]">Live Features</h2>
            <Badge variant="live">Active</Badge>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {LIVE_FEATURES.map(({ icon: Icon, title, desc, bullets }, i) => (
              <motion.div key={title} {...fadeUp(i * 0.07)}>
                <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-xl)] p-7 h-full hover:border-[var(--accent-border)] transition-colors">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-11 h-11 rounded-xl bg-[var(--accent-dim)] border border-[var(--accent-border)] flex items-center justify-center">
                      <Icon size={20} className="text-[var(--accent)]" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-lg text-[var(--text-primary)]">{title}</h3>
                      <Badge variant="live" className="text-[10px]">Live</Badge>
                    </div>
                  </div>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-4">{desc}</p>
                  <ul className="space-y-1.5">
                    {bullets.map(b => (
                      <li key={b} className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Phase 2 features */}
      <section className="py-16 bg-[var(--bg-subtle)]">
        <div className="max-w-7xl mx-auto px-5">
          <motion.div {...fadeUp(0)} className="flex items-center gap-3 mb-10">
            <h2 className="font-display font-bold text-3xl text-[var(--text-primary)]">Phase 2 Features</h2>
            <Badge variant="phase2">Coming Next</Badge>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {PHASE2_FEATURES.map(({ icon: Icon, title, desc }, i) => (
              <motion.div key={title} {...fadeUp(i * 0.06)}>
                <div className="bg-[var(--surface)] border border-dashed border-[var(--border)] rounded-[var(--radius-xl)] p-6 h-full opacity-75">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-[var(--surface-raised)] border border-[var(--border)] flex items-center justify-center">
                      <Icon size={18} className="text-[var(--text-faint)]" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-[var(--text-primary)]">{title}</h3>
                      <Badge variant="phase2" className="text-[10px]">Phase 2</Badge>
                    </div>
                  </div>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">{desc}</p>
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
            <h2 className="font-display font-bold text-4xl text-[var(--text-primary)] mb-5">
              Start with what's live today
            </h2>
            <p className="text-[var(--text-muted)] mb-8">Connect your worker, link your wallet, and watch your ALPEN rewards grow.</p>
            <Link to="/signup">
              <Button size="lg">Get Started <ArrowRight size={16} /></Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
