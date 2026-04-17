import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Zap, Cpu, Wallet, FileCheck, TrendingUp, ArrowRight,
  ChevronDown, CheckCircle2, Globe, Shield, Clock
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay, ease: 'easeOut' },
})

const STEPS = [
  { n: '01', title: 'Create Account', desc: 'Sign up for free. No crypto wallet needed to get started.', icon: Shield },
  { n: '02', title: 'Connect Worker', desc: 'Register your local AlpenMesh worker ID and link it to your account.', icon: Cpu },
  { n: '03', title: 'Link Wallet', desc: 'Attach your Solana-compatible payout wallet to receive ALPEN rewards.', icon: Wallet },
  { n: '04', title: 'Earn Rewards', desc: 'Your worker contributes GPU inferences. Proofs are batched and rewards flow in.', icon: TrendingUp },
]

const FEATURES = [
  { icon: Cpu, title: 'Worker Onboarding', desc: 'Register and connect workers in minutes with your worker ID and secret.', live: true },
  { icon: Wallet, title: 'Wallet Linking', desc: 'Attach a payout wallet to your account or per-worker for flexible reward routing.', live: true },
  { icon: FileCheck, title: 'Proof Visibility', desc: 'Every inference batch generates a proof. Track chain lifecycle in real time.', live: true },
  { icon: TrendingUp, title: 'Earnings Dashboard', desc: 'Monitor total, pending, and submitted reward status across all connected workers.', live: true },
  { icon: Globe, title: 'Job Marketplace', desc: 'Rent distributed GPU compute for your own AI workloads.', live: false },
  { icon: Zap, title: 'Containerized Jobs', desc: 'Submit Docker-based workloads with GPU specs and output destinations.', live: false },
]

const FAQS = [
  {
    q: 'What is AlpenMesh Compute?',
    a: 'AlpenMesh Compute is a decentralized GPU compute participation platform. Workers contribute GPU power, earn ALPEN rewards per inference batch, and contribute to a distributed AI compute network.',
  },
  {
    q: 'What hardware do I need to run a worker?',
    a: 'Any NVIDIA or compatible GPU with sufficient VRAM can run an AlpenMesh worker. The local worker software handles inference batching and proof generation automatically.',
  },
  {
    q: 'How are rewards calculated?',
    a: 'Rewards are calculated per inference batch submitted as proof to the network. The amount depends on the number of inferences completed and the network reward rate at settlement time.',
  },
  {
    q: 'When is the compute marketplace available?',
    a: 'The marketplace is planned for Phase 2. Currently, the platform focuses on worker contribution, earnings tracking, and proof visibility.',
  },
  {
    q: 'Is this a real product?',
    a: 'Yes — the worker backend, auth, earnings, proof, and wallet systems are all live. This is a final year project (FYP) demonstrating a production-grade decentralized compute economy.',
  },
]

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      className="border border-[var(--border)] rounded-[var(--radius-md)] overflow-hidden cursor-pointer hover:border-[var(--accent-border)] transition-colors"
      onClick={() => setOpen(v => !v)}
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
      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="relative overflow-hidden min-h-[88vh] flex items-center">
        {/* Background layers */}
        <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full bg-[var(--accent)] opacity-[0.04] blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--bg)] to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-5 py-24 relative z-10">
          <motion.div {...fadeUp(0)} className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--accent-dim)] border border-[var(--accent-border)] mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
              <span className="text-xs font-medium text-[var(--accent)]">Economy Backend Live · Worker Network Active</span>
            </div>

            <h1 className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl text-[var(--text-primary)] leading-[1.05] mb-6">
              Contribute GPU.{' '}
              <span className="text-[var(--accent)]">Earn ALPEN.</span>
            </h1>
            <p className="text-lg text-[var(--text-muted)] leading-relaxed mb-8 max-w-xl">
              AlpenMesh Compute is a premium decentralized GPU marketplace. Connect your worker node, contribute inference compute, and earn transparent, provable rewards.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/signup">
                <Button size="xl">
                  Start Contributing <ArrowRight size={18} />
                </Button>
              </Link>
              <Link to="/how-it-works">
                <Button variant="secondary" size="xl">
                  How It Works
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-5 mt-10 text-sm text-[var(--text-muted)]">
              <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-[var(--success)]" /> Free to join</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-[var(--success)]" /> Live reward tracking</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-[var(--success)]" /> On-chain proof visibility</span>
            </div>
          </motion.div>

          {/* Floating stats card */}
          <motion.div
            {...fadeUp(0.25)}
            className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl"
          >
            {[
              { label: 'Proof Batches', val: 'On-chain' },
              { label: 'Reward Currency', val: 'ALPEN' },
              { label: 'Backend', val: 'Rust / Axum' },
              { label: 'Database', val: 'MongoDB' },
            ].map(({ label, val }) => (
              <div key={label} className="bg-[var(--surface)]/80 border border-[var(--border)] rounded-[var(--radius-md)] px-4 py-3 backdrop-blur-sm">
                <p className="text-lg font-display font-bold text-[var(--text-primary)]">{val}</p>
                <p className="text-xs text-[var(--text-faint)] mt-0.5">{label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── How It Works ──────────────────────────────────────── */}
      <section className="py-24 bg-[var(--bg-subtle)]">
        <div className="max-w-7xl mx-auto px-5">
          <motion.div {...fadeUp(0)} className="text-center max-w-2xl mx-auto mb-14">
            <Badge variant="accent" className="mb-4">How it works</Badge>
            <h2 className="font-display font-bold text-4xl text-[var(--text-primary)] mb-4">
              Earn rewards in four steps
            </h2>
            <p className="text-[var(--text-muted)]">
              No complex setup. No opaque reward mechanics. Your worker earns ALPEN per proven inference batch.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {STEPS.map(({ n, title, desc, icon: Icon }, i) => (
              <motion.div key={n} {...fadeUp(i * 0.08)}>
                <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-xl)] p-6 h-full hover:border-[var(--accent-border)] transition-colors group">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-[var(--text-faint)] font-mono">{n}</span>
                    <div className="w-9 h-9 rounded-lg bg-[var(--accent-dim)] border border-[var(--accent-border)] flex items-center justify-center group-hover:bg-[var(--accent)] group-hover:border-[var(--accent)] transition-colors">
                      <Icon size={16} className="text-[var(--accent)] group-hover:text-[#090B0F] transition-colors" />
                    </div>
                  </div>
                  <h3 className="font-display font-bold text-[var(--text-primary)] mb-2">{title}</h3>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ──────────────────────────────────────────── */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-5">
          <motion.div {...fadeUp(0)} className="text-center max-w-2xl mx-auto mb-14">
            <Badge variant="accent" className="mb-4">Platform features</Badge>
            <h2 className="font-display font-bold text-4xl text-[var(--text-primary)] mb-4">
              Everything your worker needs
            </h2>
            <p className="text-[var(--text-muted)]">
              Live features are fully integrated with the backend. Phase 2 features are clearly marked.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map(({ icon: Icon, title, desc, live }, i) => (
              <motion.div key={title} {...fadeUp(i * 0.06)}>
                <div className={`bg-[var(--surface)] border rounded-[var(--radius-xl)] p-6 h-full transition-colors ${live ? 'border-[var(--border)] hover:border-[var(--accent-border)]' : 'border-dashed border-[var(--border)] opacity-70'}`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[var(--surface-raised)] border border-[var(--border)] flex items-center justify-center">
                      <Icon size={18} className="text-[var(--text-muted)]" />
                    </div>
                    {live ? <Badge variant="live">Live</Badge> : <Badge variant="phase2">Phase 2</Badge>}
                  </div>
                  <h3 className="font-display font-bold text-[var(--text-primary)] mb-2">{title}</h3>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Phase 2 Teaser ────────────────────────────────────── */}
      <section className="py-20 bg-[var(--bg-subtle)]">
        <div className="max-w-7xl mx-auto px-5">
          <motion.div {...fadeUp(0)} className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--warning-dim)] border border-[var(--warning-dim)] mb-6">
              <Clock size={12} className="text-[var(--warning)]" />
              <span className="text-xs font-medium text-[var(--warning)]">Coming in Next Phase</span>
            </div>
            <h2 className="font-display font-bold text-4xl text-[var(--text-primary)] mb-4">
              Rent distributed GPU compute
            </h2>
            <p className="text-[var(--text-muted)] text-lg mb-8">
              Phase 2 introduces a full compute marketplace — submit Docker-based workloads, specify GPU requirements, and run AI inference at scale across the AlpenMesh worker network.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left opacity-70">
              {[
                { title: 'Submit Jobs', desc: 'Container images, GPU specs, budget caps' },
                { title: 'Monitor Execution', desc: 'Real-time job lifecycle and status' },
                { title: 'Settle Payments', desc: 'ALPEN-denominated trustless billing' },
              ].map(({ title, desc }) => (
                <div key={title} className="p-4 bg-[var(--surface)] border border-dashed border-[var(--border)] rounded-[var(--radius-lg)]">
                  <h4 className="font-semibold text-[var(--text-primary)] text-sm mb-1">{title}</h4>
                  <p className="text-xs text-[var(--text-muted)]">{desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────── */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-5">
          <motion.div {...fadeUp(0)} className="text-center mb-12">
            <h2 className="font-display font-bold text-4xl text-[var(--text-primary)] mb-4">
              Frequently asked questions
            </h2>
            <p className="text-[var(--text-muted)]">Everything you need to know about AlpenMesh Compute.</p>
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

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-[var(--accent)] opacity-[0.06] blur-[80px] pointer-events-none" />
        <div className="max-w-3xl mx-auto px-5 text-center relative z-10">
          <motion.div {...fadeUp(0)}>
            <h2 className="font-display font-bold text-5xl text-[var(--text-primary)] mb-5">
              Ready to earn from your GPU?
            </h2>
            <p className="text-[var(--text-muted)] text-lg mb-8">
              Connect your worker, link your wallet, and start earning ALPEN rewards from real AI inference compute.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link to="/signup">
                <Button size="xl">
                  Get Started Free <ArrowRight size={18} />
                </Button>
              </Link>
              <Link to="/features">
                <Button variant="secondary" size="xl">Explore Features</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
