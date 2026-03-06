'use client'
import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { FiGrid, FiScissors, FiUsers, FiImage, FiStar, FiSettings, FiLogOut, FiMenu, FiX } from 'react-icons/fi'

const NAV = [
  { href: '/admin', label: 'Dashboard', icon: FiGrid },
  { href: '/admin/services', label: 'Services', icon: FiScissors },
  { href: '/admin/staff', label: 'Staff', icon: FiUsers },
  { href: '/admin/gallery', label: 'Gallery', icon: FiImage },
  { href: '/admin/reviews', label: 'Reviews', icon: FiStar },
  { href: '/admin/settings', label: 'Settings', icon: FiSettings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    if (pathname === '/admin/login') { setLoading(false); return }
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) router.push('/admin/login')
      else setLoading(false)
    })
    return () => unsub()
  }, [pathname, router])

  if (pathname === '/admin/login') return <>{children}</>
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-cream">
      <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return (
    <div className="min-h-screen bg-cream flex">
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-20 md:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-60 bg-dark flex flex-col z-30 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-6 border-b border-white/5">
          <h2 className="font-display text-white text-lg font-normal">Admin Panel</h2>
          <p className="font-body text-white/30 text-xs mt-0.5 tracking-wider">The Flair Studio</p>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {NAV.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 font-body text-sm transition-all ${pathname === href ? 'bg-accent text-dark font-medium' : 'text-white/50 hover:bg-white/5 hover:text-white'}`}>
              <Icon size={16} /> {label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-white/5">
          <button onClick={() => { signOut(auth); router.push('/admin/login') }}
            className="flex items-center gap-3 px-4 py-3 font-body text-sm text-white/40 hover:text-white w-full transition-colors">
            <FiLogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 md:ml-60 min-h-screen flex flex-col">
        <header className="bg-white border-b border-gray-100 px-5 py-4 flex items-center gap-4 sticky top-0 z-10">
          <button onClick={() => setSidebarOpen(true)} className="md:hidden text-dark">
            {sidebarOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
          <p className="font-body text-xs text-muted tracking-wider flex-1">
            {NAV.find((n) => n.href === pathname)?.label ?? 'Admin'}
          </p>
          <Link href="/" target="_blank" className="font-body text-xs text-accent hover:underline">
            View Site →
          </Link>
        </header>
        <main className="flex-1 p-5 md:p-8">{children}</main>
      </div>
    </div>
  )
}
