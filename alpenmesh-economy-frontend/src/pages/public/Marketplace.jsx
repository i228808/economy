import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Store, Cpu, Zap, Shield, Clock, DollarSign, Globe } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.45, delay, ease: 'easeOut' },
})

const TIERS = [
  {
    icon: Cpu,
    name: 'Standard Compute',
    vram: '8 GB VRAM',
    class: 'GPU Tier 1',
    price: '~0.08 ALPEN / hr',
    features: ['NVIDIA RTX class', 'Standard inference', 'Batch workloads'],
  },
  {
    icon: Zap,
    name: 'High Performance',
    vram: '24 GB VRAM',
    class: 'GPU Tier 2',
    price: '~0.24 ALPEN / hr',
    features: ['Large model inference', 'Higher throughput', 'Priority queue'],
    highlight: true,
  },
  {
    icon: Shield,
    name: 'Multi-GPU Node',
    vram: '80+ GB VRAM',
    class: 'GPU Tier 3',
    price: '~0.80 ALPEN / hr',
    features: ['Multi-GPU nodes', 'Distributed jobs', 'Enterprise SLA'],
  },
]

export default function Marketplace() {
  return (
    <div>
      {/* Hero */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-[var(--warning)] opacity-[0.04] blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-5 relative z-10 text-center">
          <motion.div {...fadeUp(0)}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--warning-dim)] border border-[var(--warning-dim)] mb-6">
              <Clock size={12} className="text-[var(--warning)]" />
              <span className="text-xs font-medium text-[var(--warning)]">Coming in next phase (not yet available)</span>
            </div>
            <h1 className="font-display font-bold text-5xl sm:text-6xl text-[var(--text-primary)] mb-5">
              Compute Marketplace
            </h1>
            <p className="text-[var(--text-muted)] text-lg max-w-2xl mx-auto leading-relaxed">
              A conceptual preview of the Phase 2 marketplace, where you'll be able to rent distributed GPU compute from verified AlpenMesh workers. All pricing and tiers shown are illustrative.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tier cards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-5">
          <motion.div {...fadeUp(0)} className="text-center mb-12">
            <Badge variant="phase2" className="mb-4">Phase 2 Preview</Badge>
            <h2 className="font-display font-bold text-3xl text-[var(--text-primary)] mb-3">Planned Compute Tiers</h2>
            <p className="text-[var(--text-muted)]">Illustrative tier breakdown. Actual pricing will be determined by network conditions and worker availability.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 opacity-75">
            {TIERS.map(({ icon: Icon, name, vram, class: cls, price, features, highlight }, i) => (
              <motion.div key={name} {...fadeUp(i * 0.07)}>
                <div className={`p-7 rounded-[var(--radius-xl)] h-full border ${highlight ? 'border-[var(--accent-border)] bg-[var(--accent-dim)]' : 'bg-[var(--surface)] border-[var(--border)]'}`}>
                  <div className="w-11 h-11 rounded-xl bg-[var(--surface-raised)] border border-[var(--border)] flex items-center justify-center mb-5">
                    <Icon size={20} className="text-[var(--text-muted)]" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-[var(--text-primary)] mb-1">{name}</h3>
                  <p className="text-sm text-[var(--text-muted)] mb-1">{vram} · {cls}</p>
                  <p className="text-2xl font-display font-bold text-[var(--accent)] mb-5">{price}</p>
                  <ul className="space-y-2 mb-5">
                    {features.map(f => (
                      <li key={f} className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--border)] shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button disabled className="w-full py-2.5 rounded-lg border border-dashed border-[var(--border)] text-xs text-[var(--text-faint)] cursor-not-allowed">
                    Coming in Phase 2
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Planned billing */}
      <section className="py-16 bg-[var(--bg-subtle)]">
        <div className="max-w-5xl mx-auto px-5">
          <motion.div {...fadeUp(0)} className="text-center mb-10">
            <h2 className="font-display font-bold text-3xl text-[var(--text-primary)] mb-3">Planned Billing Model</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 opacity-80">
            {[
              { icon: DollarSign, title: 'Pay-per-run', desc: 'Pay a flat ALPEN fee for each completed job execution.' },
              { icon: Clock, title: 'Pay-per-hour', desc: 'Reserve GPU time billed hourly for long-running workloads.' },
              { icon: Globe, title: 'Trustless settlement', desc: 'Automatic on-chain settlement after proof verification.' },
            ].map(({ icon: Icon, title, desc }, i) => (
              <motion.div key={title} {...fadeUp(i * 0.06)}>
                <div className="p-5 bg-[var(--surface)] border border-dashed border-[var(--border)] rounded-[var(--radius-lg)]">
                  <Icon size={18} className="text-[var(--text-faint)] mb-3" />
                  <h3 className="font-semibold text-[var(--text-primary)] mb-1.5">{title}</h3>
                  <p className="text-sm text-[var(--text-muted)]">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA to live features */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-5 text-center">
          <motion.div {...fadeUp(0)}>
            <h2 className="font-display font-bold text-3xl text-[var(--text-primary)] mb-4">
              Live features are available now
            </h2>
            <p className="text-[var(--text-muted)] mb-8">
              While the marketplace is planned for Phase 2, you can connect your worker and start earning rewards today.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link to="/signup"><Button size="lg">Connect Your Worker</Button></Link>
              <Link to="/features"><Button variant="secondary" size="lg">See Live Features</Button></Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
