'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiClock } from 'react-icons/fi'
import type { Service, ServiceCategory } from '@/types'

const CATEGORIES: { key: ServiceCategory | 'All'; label: string }[] = [
  { key: 'All', label: 'All Services' },
  { key: 'Hair', label: 'Hair' },
  { key: 'Color', label: 'Color' },
  { key: 'Treatment', label: 'Treatments' },
  { key: 'Beard', label: 'Beard' },
  { key: 'Skin', label: 'Skin' },
]

const GENDER_LABELS = {
  Male: { label: 'Men', cls: 'badge-male' },
  Female: { label: 'Women', cls: 'badge-female' },
  Unisex: { label: 'Unisex', cls: 'badge-unisex' },
}

export default function ServicesSection({ services }: { services: Service[] }) {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory | 'All'>('All')

  const filtered = activeCategory === 'All'
    ? services
    : services.filter((s) => s.category === activeCategory)

  return (
    <section id="services" className="section-cream">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="section-label">What We Offer</motion.span>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.1 }} className="section-title">
            Our Services
          </motion.h2>
          <div className="gold-divider" />
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="section-subtitle mt-4 max-w-xl mx-auto">
            From everyday grooming to complete transformations — we do it all.
          </motion.p>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {CATEGORIES.map((cat) => (
            <button key={cat.key} onClick={() => setActiveCategory(cat.key)}
              className={`font-body text-xs tracking-widest uppercase px-5 py-2.5 transition-all duration-200 ${
                activeCategory === cat.key
                  ? 'bg-dark text-white'
                  : 'bg-white text-dark/60 border border-gray-200 hover:border-accent hover:text-accent'
              }`}>
              {cat.label}
            </button>
          ))}
        </div>

        {/* Services grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((service, i) => (
            <motion.div key={service.id}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              className="bg-white group hover:shadow-lg transition-all duration-300 p-6 relative overflow-hidden">
              {/* Gold top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

              {/* Category & gender */}
              <div className="flex items-center justify-between mb-4">
                <span className="badge-category">{service.category}</span>
                <span className={GENDER_LABELS[service.gender].cls}>
                  {GENDER_LABELS[service.gender].label}
                </span>
              </div>

              {/* Name */}
              <h3 className="font-display text-lg text-dark font-normal mb-2 group-hover:text-accent transition-colors">
                {service.name}
              </h3>

              {/* Description */}
              <p className="font-body text-muted text-sm leading-relaxed mb-5 line-clamp-2">
                {service.description}
              </p>

              {/* Price & Duration */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div>
                  <span className="font-display text-xl text-dark">₹{service.price}</span>
                  <span className="font-body text-xs text-muted ml-1">{service.priceLabel}</span>
                </div>
                <div className="flex items-center gap-1.5 font-body text-xs text-muted">
                  <FiClock size={12} className="text-accent" />
                  {service.duration}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center font-body text-muted py-12">No services in this category.</p>
        )}

        {/* Book CTA */}
        <div className="text-center mt-12">
          <p className="font-body text-muted text-sm mb-4">Ready to treat yourself?</p>
          <a href="#contact" className="btn-primary">Book via WhatsApp</a>
        </div>
      </div>
    </section>
  )
}
