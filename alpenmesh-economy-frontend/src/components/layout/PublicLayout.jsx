import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, Zap } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { ThemeToggle } from './ThemeToggle'
import { Button } from '@/components/ui/Button'

const NAV_LINKS = [
  { to: '/features', label: 'Features' },
  { to: '/how-it-works', label: 'How It Works' },
  { to: '/marketplace', label: 'Marketplace' },
  { to: '/about', label: 'About' },
]

export function PublicLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg)]">
      {/* Navbar */}
      <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--bg)]/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 font-display font-bold text-lg text-[var(--text-primary)] shrink-0">
            <div className="w-8 h-8 rounded-lg bg-[var(--accent)] flex items-center justify-center">
              <Zap size={16} className="text-[#090B0F]" fill="currentColor" />
            </div>
            <span>AlpenMesh <span className="text-[var(--accent)]">Compute</span></span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `px-3.5 py-2 rounded-lg text-sm font-medium transition-colors duration-150
                  ${isActive ? 'text-[var(--accent)] bg-[var(--accent-dim)]' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-raised)]'}`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <div className="hidden md:flex items-center gap-2">
              <Link to="/login">
                <Button variant="ghost" size="sm">Sign In</Button>
              </Link>
              <Link to="/signup">
                <Button size="sm">Get Started</Button>
              </Link>
            </div>
            <button
              className="md:hidden w-8 h-8 flex items-center justify-center rounded-lg text-[var(--text-muted)] hover:bg-[var(--surface-raised)] transition-colors"
              onClick={() => setMobileOpen(v => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden border-t border-[var(--border)] bg-[var(--bg)] px-5 py-4 flex flex-col gap-1"
            >
              {NAV_LINKS.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2.5 rounded-lg text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-raised)] transition-colors"
                >
                  {label}
                </Link>
              ))}
              <div className="border-t border-[var(--border)] mt-2 pt-3 flex flex-col gap-2">
                <Link to="/login" onClick={() => setMobileOpen(false)}>
                  <Button variant="secondary" size="md" className="w-full justify-center">Sign In</Button>
                </Link>
                <Link to="/signup" onClick={() => setMobileOpen(false)}>
                  <Button size="md" className="w-full justify-center">Get Started</Button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Page content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] bg-[var(--bg)] py-12">
        <div className="max-w-7xl mx-auto px-5">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="space-y-2 max-w-xs">
              <Link to="/" className="flex items-center gap-2.5 font-display font-bold text-base text-[var(--text-primary)]">
                <div className="w-6 h-6 rounded-md bg-[var(--accent)] flex items-center justify-center">
                  <Zap size={12} className="text-[#090B0F]" fill="currentColor" />
                </div>
                AlpenMesh Compute
              </Link>
              <p className="text-sm text-[var(--text-muted)]">
                Premium decentralized GPU compute infrastructure. Contribute, earn, and scale.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div className="space-y-2">
                <p className="text-xs font-semibold text-[var(--text-faint)] uppercase tracking-wider">Platform</p>
                {NAV_LINKS.map(({ to, label }) => (
                  <Link key={to} to={to} className="block text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">{label}</Link>
                ))}
              </div>
              <div className="space-y-2">
                <p className="text-xs font-semibold text-[var(--text-faint)] uppercase tracking-wider">Account</p>
                <Link to="/login" className="block text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">Sign In</Link>
                <Link to="/signup" className="block text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">Sign Up</Link>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-semibold text-[var(--text-faint)] uppercase tracking-wider">Status</p>
                <span className="inline-flex items-center gap-1.5 text-sm text-[var(--success)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--success)]" />
                  Network Live
                </span>
              </div>
            </div>
          </div>
          <div className="border-t border-[var(--border)] mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-[var(--text-faint)]">&copy; {new Date().getFullYear()} AlpenMesh Compute. Built for the decentralized era.</p>
            <div className="flex items-center gap-1">
              <span className="text-xs text-[var(--text-faint)]">FYP Project ·</span>
              <span className="text-xs text-[var(--text-faint)]">AlpenMesh Network</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
