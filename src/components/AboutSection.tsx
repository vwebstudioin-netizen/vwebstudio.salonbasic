'use client'
import { motion } from 'framer-motion'
import { FiCheckCircle } from 'react-icons/fi'
import type { SalonInfo } from '@/types'

const WHY_US = [
  'Trained stylists updated on the latest global trends',
  'Premium product brands — Loreal, Wella, Kerastase',
  'Hygienic tools sterilized between every client',
  'Comfortable, relaxing studio ambience',
  'Transparent pricing — no hidden charges',
  'Walk-ins welcome, appointments preferred',
]

export default function AboutSection({ salon }: { salon: SalonInfo }) {
  return (
    <section id="about" className="section-cream">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Visual side */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="relative">
            <div className="aspect-[4/5] bg-dark overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-dark via-dark to-accent/20 flex items-center justify-center">
                <span className="font-display text-7xl text-accent/10">✂</span>
              </div>
            </div>
            {/* Floating stat card */}
            <div className="absolute -bottom-6 -right-6 bg-accent p-6 text-center shadow-xl">
              <p className="font-display text-4xl text-dark font-medium">10+</p>
              <p className="font-body text-dark/70 text-xs tracking-widest uppercase mt-1">Years of Excellence</p>
            </div>
          </motion.div>

          {/* Content side */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
            <span className="section-label">Our Story</span>
            <h2 className="section-title mb-5">About {salon.name}</h2>
            <div className="w-10 h-px bg-accent mb-6" />
            <p className="font-body text-muted text-base leading-relaxed mb-6">
              {salon.description}
            </p>
            <p className="font-body text-muted text-base leading-relaxed mb-8">
              Every client who walks through our doors deserves a personalised experience. We listen, advise, and deliver — ensuring you leave feeling confident and refreshed.
            </p>

            <h3 className="font-display text-lg text-dark mb-5">Why Choose Us</h3>
            <ul className="space-y-3 mb-8">
              {WHY_US.map((item) => (
                <li key={item} className="flex items-start gap-3 font-body text-sm text-dark/80">
                  <FiCheckCircle className="text-accent mt-0.5 flex-shrink-0" size={16} />
                  {item}
                </li>
              ))}
            </ul>

            <a href="#contact" className="btn-primary">Visit Us Today</a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
