'use client'
import { motion } from 'framer-motion'
import { FiMapPin, FiPhone, FiMail, FiClock } from 'react-icons/fi'
import { FaWhatsapp, FaInstagram, FaFacebook } from 'react-icons/fa'
import type { SalonInfo } from '@/types'

const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] as const

export default function ContactSection({ salon }: { salon: SalonInfo }) {
  return (
    <section id="contact" className="section-cream">
      <div className="container-custom">
        <div className="text-center mb-14">
          <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="section-label">Find Us</motion.span>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.1 }} className="section-title">
            Get in Touch
          </motion.h2>
          <div className="gold-divider" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left — Contact Info */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}>
            <h3 className="font-display text-2xl text-dark mb-8">Visit The Studio</h3>

            <div className="space-y-5 mb-8">
              <div className="flex gap-4">
                <FiMapPin className="text-accent mt-0.5 flex-shrink-0" size={18} />
                <p className="font-body text-muted text-sm leading-relaxed">{salon.address}</p>
              </div>
              <a href={`tel:${salon.phone}`} className="flex gap-4 hover:text-accent transition-colors group">
                <FiPhone className="text-accent mt-0.5 flex-shrink-0" size={18} />
                <span className="font-body text-muted text-sm group-hover:text-accent transition-colors">{salon.phone}</span>
              </a>
              <a href={`mailto:${salon.email}`} className="flex gap-4 hover:text-accent transition-colors group">
                <FiMail className="text-accent mt-0.5 flex-shrink-0" size={18} />
                <span className="font-body text-muted text-sm group-hover:text-accent transition-colors">{salon.email}</span>
              </a>
            </div>

            {/* Opening hours */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <FiClock className="text-accent" size={18} />
                <h4 className="font-display text-lg text-dark">Opening Hours</h4>
              </div>
              <div className="space-y-2">
                {DAYS.map((day) => (
                  <div key={day} className="flex justify-between font-body text-sm">
                    <span className="text-dark capitalize">{day}</span>
                    <span className="text-muted">{salon.openingHours[day]}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Social + Book CTA */}
            <div className="flex flex-wrap gap-3">
              <a href={`https://wa.me/${salon.whatsapp}?text=Hi%2C+I'd+like+to+book+an+appointment`}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 bg-green-500 text-white font-body font-medium text-xs tracking-widest uppercase px-5 py-3 hover:bg-green-600 transition-colors">
                <FaWhatsapp size={15} /> Book on WhatsApp
              </a>
              {salon.socialLinks.instagram && (
                <a href={salon.socialLinks.instagram} target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 border border-gray-200 flex items-center justify-center text-muted hover:border-accent hover:text-accent transition-all">
                  <FaInstagram size={16} />
                </a>
              )}
              {salon.socialLinks.facebook && (
                <a href={salon.socialLinks.facebook} target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 border border-gray-200 flex items-center justify-center text-muted hover:border-accent hover:text-accent transition-all">
                  <FaFacebook size={16} />
                </a>
              )}
            </div>
          </motion.div>

          {/* Right — Map */}
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <div className="w-full h-80 bg-gray-100 overflow-hidden">
              {salon.mapEmbed ? (
                <iframe src={salon.mapEmbed} width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" title="Salon Location" />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-accent-50">
                  <FiMapPin className="text-accent mb-3" size={36} />
                  <p className="font-body text-muted text-sm text-center px-6">{salon.address}</p>
                  <a href={`https://maps.google.com/?q=${encodeURIComponent(salon.address)}`}
                    target="_blank" rel="noopener noreferrer"
                    className="mt-4 font-body text-xs text-accent underline tracking-wider">
                    Open in Google Maps
                  </a>
                </div>
              )}
            </div>

            {/* Quick book card */}
            <div className="bg-dark p-6 mt-4">
              <h4 className="font-display text-white text-lg mb-2">Ready to Book?</h4>
              <p className="font-body text-white/50 text-sm mb-4">Message us on WhatsApp and we'll confirm your slot within minutes.</p>
              <a href={`https://wa.me/${salon.whatsapp}?text=Hi%2C+I'd+like+to+book+an+appointment+at+${encodeURIComponent(salon.name)}`}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 bg-accent text-dark font-body font-medium text-xs tracking-widest uppercase px-5 py-3 hover:bg-accent-dark hover:text-white transition-all duration-300 w-full justify-center">
                <FaWhatsapp size={15} />
                Chat with Us — {salon.phone}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
