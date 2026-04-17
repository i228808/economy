import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Alert } from '@/components/ui/Alert'
import { useAuth } from '@/hooks/useAuth'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const result = await login(form)
    setLoading(false)
    if (result.ok) {
      navigate('/app/dashboard')
    } else {
      setError(result.error)
    }
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] bg-grid flex items-center justify-center p-4 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-[var(--accent)] opacity-5 blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block font-display font-bold text-xl text-[var(--text-primary)]">
            AlpenMesh <span className="text-[var(--accent)]">Compute</span>
          </Link>
          <p className="text-sm text-[var(--text-muted)] mt-3">Sign in to your worker console</p>
        </div>

        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-xl)] p-8 shadow-[var(--shadow-lg)]">
          <h1 className="font-display font-bold text-2xl text-[var(--text-primary)] mb-6">Welcome back</h1>

          {error && (
            <div className="mb-5">
              <Alert variant="error" message={error} onDismiss={() => setError('')} />
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
              placeholder="Your password"
              value={form.password}
              onChange={handleChange}
              icon={Lock}
              required
              autoComplete="current-password"
            />
            <Button type="submit" loading={loading} size="lg" className="w-full justify-center mt-2">
              Sign In
            </Button>
          </form>

          <p className="text-center text-sm text-[var(--text-muted)] mt-5">
            Don't have an account?{' '}
            <Link to="/signup" className="text-[var(--accent)] hover:underline font-medium">
              Sign up free
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
