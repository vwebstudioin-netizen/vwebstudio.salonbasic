'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import type { Testimonial } from '@/types'

export default function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  const [index, setIndex] = useState(0)
  if (testimonials.length === 0) return null

  const prev = () => setIndex((i) => (i === 0 ? testimonials.length - 1 : i - 1))
  const next = () => setIndex((i) => (i === testimonials.length - 1 ? 0 : i + 1))
  const t = testimonials[index]

  return (
    <section className="section bg-dark">
      <div className="container-custom max-w-3xl">
        <div className="text-center mb-14">
          <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="section-label">Kind Words</motion.span>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="font-display text-3xl md:text-4xl lg:text-5xl text-white font-normal">
            Client Reviews
          </motion.h2>
          <div className="gold-divider" />
        </div>

        <div className="relative">
          {/* Large quote mark */}
          <div className="absolute -top-4 left-0 font-display text-8xl text-accent/15 leading-none select-none">"</div>

          <AnimatePresence mode="wait">
            <motion.div key={index}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}
              className="text-center px-8">
              {/* Stars */}
              <div className="flex justify-center gap-1 mb-8">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className={`text-lg ${i < t.rating ? 'text-accent' : 'text-white/10'}`}>★</span>
                ))}
              </div>

              {/* Review */}
              <blockquote className="font-display text-white/90 text-xl md:text-2xl font-normal leading-relaxed mb-8 italic">
                &ldquo;{t.comment}&rdquo;
              </blockquote>

              {/* Client info */}
              <div>
                <div className="w-10 h-px bg-accent mx-auto mb-4" />
                <p className="font-body text-white font-medium">{t.clientName}</p>
                <p className="font-body text-accent/70 text-xs tracking-widest uppercase mt-1">{t.service}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          {testimonials.length > 1 && (
            <div className="flex items-center justify-center gap-6 mt-10">
              <button onClick={prev}
                className="w-10 h-10 border border-white/20 text-white/60 hover:border-accent hover:text-accent flex items-center justify-center transition-all duration-200">
                <FiChevronLeft size={18} />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button key={i} onClick={() => setIndex(i)}
                    className={`transition-all duration-200 ${i === index ? 'w-8 h-1.5 bg-accent' : 'w-2 h-2 rounded-full bg-white/20 hover:bg-white/40'}`} />
                ))}
              </div>
              <button onClick={next}
                className="w-10 h-10 border border-white/20 text-white/60 hover:border-accent hover:text-accent flex items-center justify-center transition-all duration-200">
                <FiChevronRight size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
