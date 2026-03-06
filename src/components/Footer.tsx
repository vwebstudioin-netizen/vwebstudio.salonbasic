import { FaInstagram, FaFacebook, FaYoutube, FaWhatsapp } from 'react-icons/fa'
import type { SalonInfo } from '@/types'

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Our Team', href: '#team' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Footer({ salon }: { salon: SalonInfo }) {
  return (
    <footer className="bg-dark border-t border-white/5">
      <div className="container-custom py-14">
        <div className="grid md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <h3 className="font-display text-2xl text-white font-normal mb-3">{salon.name}</h3>
            <p className="font-body text-white/40 text-sm italic mb-6">{salon.tagline}</p>
            <div className="flex gap-3">
              {salon.socialLinks.instagram && (
                <a href={salon.socialLinks.instagram} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 border border-white/10 flex items-center justify-center text-white/40 hover:border-accent hover:text-accent transition-all">
                  <FaInstagram size={15} />
                </a>
              )}
              {salon.socialLinks.facebook && (
                <a href={salon.socialLinks.facebook} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 border border-white/10 flex items-center justify-center text-white/40 hover:border-accent hover:text-accent transition-all">
                  <FaFacebook size={15} />
                </a>
              )}
              {salon.socialLinks.youtube && (
                <a href={salon.socialLinks.youtube} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 border border-white/10 flex items-center justify-center text-white/40 hover:border-accent hover:text-accent transition-all">
                  <FaYoutube size={15} />
                </a>
              )}
              <a href={`https://wa.me/${salon.whatsapp}`} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 border border-white/10 flex items-center justify-center text-white/40 hover:border-green-500 hover:text-green-400 transition-all">
                <FaWhatsapp size={15} />
              </a>
            </div>
          </div>

          {/* Quick nav */}
          <div>
            <h4 className="font-body text-white/40 text-xs tracking-[3px] uppercase mb-5">Navigation</h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href}
                    className="font-body text-sm text-white/50 hover:text-accent transition-colors duration-200">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-body text-white/40 text-xs tracking-[3px] uppercase mb-5">Contact</h4>
            <div className="space-y-3 font-body text-sm text-white/50">
              <p>{salon.address}</p>
              <a href={`tel:${salon.phone}`} className="block hover:text-accent transition-colors">{salon.phone}</a>
              <a href={`mailto:${salon.email}`} className="block hover:text-accent transition-colors">{salon.email}</a>
              <p className="text-white/30 text-xs pt-2">
                {salon.openingHours.monday.split('–')[0].trim()} – {salon.openingHours.friday.split('–')[1]?.trim()} (Mon–Fri)
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="container-custom py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="font-body text-xs text-white/20">
            © {new Date().getFullYear()} {salon.name}. All rights reserved.
          </p>
          <p className="font-body text-xs text-white/20">
            Designed &amp; Developed by <span className="text-accent/60">VwebStudio</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
