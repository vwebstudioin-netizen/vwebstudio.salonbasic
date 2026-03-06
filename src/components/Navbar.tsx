'use client'
import { useState, useEffect } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Our Team', href: '#team' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

interface NavbarProps {
  salonName: string
  whatsapp: string
}

export default function Navbar({ salonName, whatsapp }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${scrolled ? 'bg-white shadow-sm' : 'bg-transparent'}`}>
      <nav className="container-custom flex items-center justify-between py-5">
        {/* Logo */}
        <a href="#home" className={`font-display text-xl font-medium tracking-wide transition-colors ${scrolled ? 'text-dark' : 'text-white'}`}>
          {salonName}
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href}
              className={`font-body text-sm tracking-wider transition-colors duration-200 ${scrolled ? 'text-dark/70 hover:text-accent' : 'text-white/70 hover:text-white'}`}>
              {link.label}
            </a>
          ))}
          <a href={`https://wa.me/${whatsapp}?text=Hi%2C+I'd+like+to+book+an+appointment`}
            target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 bg-accent text-dark font-body font-medium text-xs tracking-widest uppercase px-5 py-2.5 hover:bg-accent-dark hover:text-white transition-all duration-300">
            <FaWhatsapp size={14} />
            Book Now
          </a>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setMenuOpen(!menuOpen)}
          className={`md:hidden p-2 transition-colors ${scrolled ? 'text-dark' : 'text-white'}`}>
          {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="container-custom py-5 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-body text-sm text-dark/70 hover:text-accent tracking-wider py-3 border-b border-gray-50 transition-colors">
                {link.label}
              </a>
            ))}
            <a href={`https://wa.me/${whatsapp}?text=Hi%2C+I'd+like+to+book+an+appointment`}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-accent text-dark font-body font-medium text-xs tracking-widest uppercase px-5 py-3 mt-3 hover:bg-accent-dark transition-all">
              <FaWhatsapp size={14} /> Book Now on WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
