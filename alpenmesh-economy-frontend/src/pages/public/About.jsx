import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Zap, Globe, Shield, TrendingUp, Cpu, ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.45, delay, ease: 'easeOut' },
})

const PRINCIPLES = [
  {
    icon: Globe,
    title: 'Distributed by Design',
    desc: 'AlpenMesh is built from the ground up for distributed infrastructure. Workers run independently, and the economy layer coordinates earnings without a central chokepoint.',
  },
  {
    icon: Shield,
    title: 'Transparent Rewards',
    desc: 'Every inference batch generates a proof. Rewards are calculated deterministically and visible to each worker operator, with no black box payout mechanics.',
  },
  {
    icon: TrendingUp,
    title: 'Provable Compute Contribution',
    desc: 'Workers submit signed proof batches that record inference counts and time windows. This creates a verifiable history of compute contribution on-chain.',
  },
  {
    icon: Cpu,
    title: 'GPU-First Architecture',
    desc: 'The worker and economy systems are optimised for GPU inference workloads. The reward model reflects real compute contributed, not hashrate or staking.',
  },
]

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[var(--accent)] opacity-[0.04] blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-5 relative z-10">
          <motion.div {...fadeUp(0)} className="max-w-3xl">
            <Badge variant="accent" className="mb-5">About the Project</Badge>
            <h1 className="font-display font-bold text-5xl sm:text-6xl text-[var(--text-primary)] mb-6 leading-[1.05]">
              A serious infrastructure project for distributed AI compute
            </h1>
            <p className="text-lg text-[var(--text-muted)] leading-relaxed">
              AlpenMesh Compute is a final year project (FYP) that demonstrates a production-grade, end-to-end decentralized compute economy, from worker registration and proof generation to earnings tracking and wallet settlement.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Vision */}
      <section className="py-16 bg-[var(--bg-subtle)]">
        <div className="max-w-5xl mx-auto px-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeUp(0)}>
              <h2 className="font-display font-bold text-4xl text-[var(--text-primary)] mb-5">The Vision</h2>
              <p className="text-[var(--text-muted)] leading-relaxed mb-4">
                Centralized cloud compute is expensive, opaque, and controlled by a handful of providers. AlpenMesh Compute proposes an alternative: a permissionless participation layer where anyone with a GPU can contribute capacity and earn transparent, provable rewards.
              </p>
              <p className="text-[var(--text-muted)] leading-relaxed mb-4">
                The long-term goal is a full compute marketplace where AI practitioners can submit containerized jobs that execute across a distributed network of verified worker nodes, with trustless settlement on completion.
              </p>
              <p className="text-[var(--text-muted)] leading-relaxed">
                The current release delivers the worker economy foundation: authentication, worker management, wallet linking, earnings tracking, and proof history, with the full marketplace planned for Phase 2.
              </p>
            </motion.div>
            <motion.div {...fadeUp(0.15)} className="grid grid-cols-2 gap-4">
              {[
                { label: 'Backend Language', val: 'Rust' },
                { label: 'Framework', val: 'Oxide / Axum' },
                { label: 'Database', val: 'MongoDB' },
                { label: 'Reward Token', val: 'ALPEN' },
                { label: 'Frontend', val: 'React + Vite' },
                { label: 'Network', val: 'Solana-based' },
              ].map(({ label, val }) => (
                <div key={label} className="p-4 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-md)]">
                  <p className="text-xs text-[var(--text-faint)] mb-1">{label}</p>
                  <p className="font-display font-bold text-[var(--text-primary)]">{val}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-5">
          <motion.div {...fadeUp(0)} className="text-center mb-12">
            <h2 className="font-display font-bold text-4xl text-[var(--text-primary)] mb-4">Design Principles</h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
              Every component of AlpenMesh Compute was built around these core principles.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {PRINCIPLES.map(({ icon: Icon, title, desc }, i) => (
              <motion.div key={title} {...fadeUp(i * 0.07)}>
                <div className="p-6 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-xl)] h-full hover:border-[var(--accent-border)] transition-colors">
                  <div className="w-11 h-11 rounded-xl bg-[var(--accent-dim)] border border-[var(--accent-border)] flex items-center justify-center mb-4">
                    <Icon size={20} className="text-[var(--accent)]" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-[var(--text-primary)] mb-2">{title}</h3>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Future vision */}
      <section className="py-16 bg-[var(--bg-subtle)]">
        <div className="max-w-5xl mx-auto px-5">
          <motion.div {...fadeUp(0)} className="text-center mb-10">
            <Badge variant="phase2" className="mb-4">Future Vision</Badge>
            <h2 className="font-display font-bold text-3xl text-[var(--text-primary)] mb-4">
              Distributed AI job execution
            </h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto leading-relaxed">
              The next phase of AlpenMesh Compute introduces a true compute marketplace: AI practitioners submit jobs, the network matches them to available workers, executes workloads in isolated containers, verifies outputs via proof, and settles payment automatically in ALPEN.
            </p>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-3 opacity-70">
            {[
              'Job submission API', 'Container orchestration', 'Worker capability discovery',
              'Task queue lifecycle', 'Failover & reassignment', 'Trustless execution verification',
              'Artifact management', 'Pay-per-run billing', 'On-chain settlement',
            ].map(tag => (
              <span key={tag} className="px-3 py-1.5 bg-[var(--surface)] border border-dashed border-[var(--border)] rounded-full text-xs text-[var(--text-muted)]">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-5 text-center">
          <motion.div {...fadeUp(0)}>
            <h2 className="font-display font-bold text-4xl text-[var(--text-primary)] mb-5">
              Contribute to the network
            </h2>
            <p className="text-[var(--text-muted)] mb-8">
              Connect your worker and start contributing GPU compute to AlpenMesh. Earn ALPEN rewards for every proven inference batch.
            </p>
            <Link to="/signup">
              <Button size="lg">Get Started <ArrowRight size={16} /></Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
