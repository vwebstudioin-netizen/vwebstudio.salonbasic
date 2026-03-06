'use client'
import { motion } from 'framer-motion'
import { FaWhatsapp } from 'react-icons/fa'
import { FiArrowDown } from 'react-icons/fi'
import type { SalonInfo } from '@/types'

export default function HeroSection({ salon }: { salon: SalonInfo }) {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-dark">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-dark to-primary-light opacity-95" />
      <div className="absolute inset-0 bg-[url('/images/hero.jpg')] bg-cover bg-center opacity-20" />

      {/* Gold accent lines */}
      <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-accent/30 to-transparent ml-16 hidden lg:block" />
      <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-accent/20 to-transparent mr-16 hidden lg:block" />

      <div className="relative container-custom pt-24 pb-20 z-10">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="font-body text-accent text-xs tracking-[5px] uppercase mb-6 flex items-center gap-4">
            <span className="w-10 h-px bg-accent/60" />
            Premium Unisex Salon
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="font-display text-5xl md:text-6xl lg:text-7xl text-white font-normal leading-tight mb-6">
            {salon.tagline}
          </motion.h1>

          <div className="w-12 h-px bg-accent my-7" />

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
            className="font-body text-white/60 text-lg leading-relaxed mb-10 max-w-xl">
            Expert haircuts, coloring, keratin treatments, beard grooming, and skin care — all in one place.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
            className="flex flex-wrap gap-4">
            <a href={`https://wa.me/${salon.whatsapp}?text=Hi%2C+I'd+like+to+book+an+appointment`}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2.5 bg-accent text-dark font-body font-medium text-sm tracking-widest uppercase px-8 py-4 hover:bg-accent-dark hover:text-white transition-all duration-300">
              <FaWhatsapp size={16} />
              Book Appointment
            </a>
            <a href="#services"
              className="flex items-center gap-2.5 border border-white/30 text-white font-body font-medium text-sm tracking-widest uppercase px-8 py-4 hover:border-accent hover:text-accent transition-all duration-300">
              Our Services
            </a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30">
          <span className="font-body text-xs tracking-[3px] uppercase">Scroll</span>
          <FiArrowDown size={16} className="animate-bounce" />
        </motion.div>
      </div>
    </section>
  )
}
