'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi'

export default function AdminLogin() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setError('')
    try {
      await signInWithEmailAndPassword(auth, email, password)
      router.push('/admin')
    } catch { setError('Invalid email or password.') }
    finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center p-4">
      {/* Gold line top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />

      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl text-white font-normal mb-2">Admin Login</h1>
          <div className="w-8 h-px bg-accent mx-auto" />
          <p className="font-body text-white/40 text-sm mt-3">The Flair Studio — Management</p>
        </div>

        <div className="bg-white/5 border border-white/10 p-8">
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block font-body text-xs text-white/50 tracking-widest uppercase mb-2">Email</label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={14} />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@salon.com"
                  className="w-full bg-white/5 border border-white/10 px-4 py-3 pl-10 font-body text-sm text-white placeholder-white/20 focus:outline-none focus:border-accent transition-colors" required />
              </div>
            </div>
            <div>
              <label className="block font-body text-xs text-white/50 tracking-widest uppercase mb-2">Password</label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={14} />
                <input type={showPw ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 px-4 py-3 pl-10 pr-10 font-body text-sm text-white placeholder-white/20 focus:outline-none focus:border-accent transition-colors" required />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white">
                  {showPw ? <FiEyeOff size={14} /> : <FiEye size={14} />}
                </button>
              </div>
            </div>
            {error && <p className="font-body text-xs text-red-400 bg-red-500/10 px-4 py-3">{error}</p>}
            <button type="submit" disabled={loading}
              className="w-full bg-accent text-dark font-body font-medium text-xs tracking-widest uppercase py-3.5 hover:bg-accent-dark hover:text-white transition-all duration-300 disabled:opacity-50">
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
        <p className="text-center font-body text-xs text-white/20 mt-4">Admin access only.</p>
      </div>
    </div>
  )
}
