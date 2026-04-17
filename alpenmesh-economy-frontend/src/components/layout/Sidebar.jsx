import { Link, NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, Cpu, Wallet, FileCheck, User,
  Briefcase, Store, Code2, X, ChevronRight
} from 'lucide-react'
import { Badge } from '@/components/ui/Badge'

const NAV_ITEMS = [
  {
    group: 'Overview',
    items: [
      { to: '/app/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    ]
  },
  {
    group: 'My Resources',
    items: [
      { to: '/app/workers', label: 'Workers', icon: Cpu },
      { to: '/app/wallets', label: 'Wallets & Rewards', icon: Wallet },
      { to: '/app/proofs', label: 'Proofs', icon: FileCheck },
    ]
  },
  {
    group: 'Compute Market',
    items: [
      { to: '/app/jobs', label: 'Jobs', icon: Briefcase, phase2: true },
      { to: '/app/marketplace', label: 'Marketplace', icon: Store, phase2: true },
      { to: '/app/api-docs', label: 'API Docs', icon: Code2, phase2: true },
    ]
  },
  {
    group: 'Account',
    items: [
      { to: '/app/profile', label: 'Profile', icon: User },
    ]
  },
]

export function Sidebar({ collapsed, onClose, isMobile }) {
  return (
    <aside
      className={`
        flex flex-col h-full bg-[var(--surface)] border-r border-[var(--border)]
        transition-all duration-300 ease-in-out
        ${collapsed && !isMobile ? 'w-[60px]' : 'w-[220px]'}
      `}
    >
      {/* Logo */}
      <div className="h-16 flex items-center gap-3 px-4 border-b border-[var(--border)] shrink-0">
        <AnimatePresence initial={false}>
          {(!collapsed || isMobile) && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              className="font-display font-bold text-sm text-[var(--text-primary)] whitespace-nowrap overflow-hidden"
            >
              AlpenMesh <span className="text-[var(--accent)]">Compute</span>
            </motion.span>
          )}
        </AnimatePresence>
        {isMobile && (
          <button
            onClick={onClose}
            className="ml-auto w-7 h-7 flex items-center justify-center rounded-lg text-[var(--text-muted)] hover:bg-[var(--surface-raised)] transition-colors"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 flex flex-col gap-4">
        {NAV_ITEMS.map(({ group, items }) => (
          <div key={group}>
            <AnimatePresence initial={false}>
              {(!collapsed || isMobile) && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-[10px] font-semibold text-[var(--text-faint)] uppercase tracking-widest px-2 mb-1"
                >
                  {group}
                </motion.p>
              )}
            </AnimatePresence>
            {items.map(({ to, label, icon: Icon, phase2 }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) => `
                  flex items-center gap-2.5 px-2.5 py-2 rounded-lg mb-0.5 text-sm font-medium transition-colors duration-150 group relative
                  ${isActive
                    ? 'bg-[var(--accent-dim)] text-[var(--accent)] border border-[var(--accent-border)]'
                    : `text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-raised)] ${phase2 ? 'opacity-60' : ''}`}
                `}
              >
                <Icon size={16} className="shrink-0" />
                <AnimatePresence initial={false}>
                  {(!collapsed || isMobile) && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      className="flex-1 overflow-hidden whitespace-nowrap flex items-center gap-1.5"
                    >
                      {label}
                      {phase2 && <Badge variant="phase2" className="text-[9px] px-1.5 py-0">P2</Badge>}
                    </motion.span>
                  )}
                </AnimatePresence>
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      {/* Version tag */}
      <AnimatePresence initial={false}>
        {(!collapsed || isMobile) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="px-4 py-3 border-t border-[var(--border)] shrink-0"
          >
            <p className="text-[10px] text-[var(--text-faint)]">AlpenMesh Compute v0.1.0</p>
            <p className="text-[10px] text-[var(--text-faint)]">Economy Backend Active</p>
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  )
}
