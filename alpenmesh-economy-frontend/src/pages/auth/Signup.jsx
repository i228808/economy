import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, User } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Alert } from '@/components/ui/Alert'
import { useAuth } from '@/hooks/useAuth'

export default function Signup() {
  const { signup } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '', display_name: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    setLoading(true)
    const result = await signup(form)
    setLoading(false)
    if (result.ok) {
      navigate('/app/dashboard')
    } else {
      setError(result.error)
    }
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] bg-grid flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-[var(--accent)] opacity-5 blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-block font-display font-bold text-xl text-[var(--text-primary)]">
            AlpenMesh <span className="text-[var(--accent)]">Compute</span>
          </Link>
          <p className="text-sm text-[var(--text-muted)] mt-3">Start contributing GPU power today</p>
        </div>

        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-xl)] p-8 shadow-[var(--shadow-lg)]">
          <h1 className="font-display font-bold text-2xl text-[var(--text-primary)] mb-1">Create your account</h1>
          <p className="text-sm text-[var(--text-muted)] mb-6">Free to join. Start earning ALPEN from your worker.</p>

          {error && (
            <div className="mb-5">
              <Alert variant="error" message={error} onDismiss={() => setError('')} />
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              label="Display Name"
              name="display_name"
              type="text"
              placeholder="Your name or handle"
              value={form.display_name}
              onChange={handleChange}
              icon={User}
              required
            />
            <Input
              label="Email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              icon={Mail}
              required
              autoComplete="email"
            />
            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="Min. 6 characters"
              value={form.password}
              onChange={handleChange}
              icon={Lock}
              required
              autoComplete="new-password"
            />
            <Button type="submit" loading={loading} size="lg" className="w-full justify-center mt-2">
              Create Account
            </Button>
          </form>

          <p className="text-center text-sm text-[var(--text-muted)] mt-5">
            Already have an account?{' '}
            <Link to="/login" className="text-[var(--accent)] hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </div>

        <p className="text-center text-xs text-[var(--text-faint)] mt-6">
          <Link to="/" className="hover:text-[var(--text-muted)] transition-colors">← Back to AlpenMesh Compute</Link>
        </p>
      </motion.div>
    </div>
  )
}
