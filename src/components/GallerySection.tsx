'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import type { GalleryImage } from '@/types'

const FILTERS: { key: string; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'work', label: 'Our Work' },
  { key: 'before-after', label: 'Before & After' },
  { key: 'salon', label: 'The Studio' },
]

const PLACEHOLDER_GALLERY: GalleryImage[] = [
  { id: '1', url: '', caption: 'Balayage Transformation', type: 'before-after', category: 'Color', sortOrder: 1 },
  { id: '2', url: '', caption: 'Precision Cut', type: 'work', category: 'Hair', sortOrder: 2 },
  { id: '3', url: '', caption: 'Keratin Smoothening', type: 'work', category: 'Treatment', sortOrder: 3 },
  { id: '4', url: '', caption: 'Beard Styling', type: 'work', category: 'Beard', sortOrder: 4 },
  { id: '5', url: '', caption: 'Hair Color Makeover', type: 'before-after', category: 'Color', sortOrder: 5 },
  { id: '6', url: '', caption: 'The Studio Interior', type: 'salon', category: 'General', sortOrder: 6 },
]

export default function GallerySection({ images }: { images: GalleryImage[] }) {
  const [activeFilter, setActiveFilter] = useState('all')
  const displayImages = images.length > 0 ? images : PLACEHOLDER_GALLERY

  const filtered = activeFilter === 'all'
    ? displayImages
    : displayImages.filter((img) => img.type === activeFilter)

  return (
    <section id="gallery" className="section">
      <div className="container-custom">
        <div className="text-center mb-14">
          <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="section-label">Our Work</motion.span>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.1 }} className="section-title">
            Gallery
          </motion.h2>
          <div className="gold-divider" />
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="section-subtitle mt-4 max-w-xl mx-auto">
            Real transformations by our team. See the magic we create every day.
          </motion.p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {FILTERS.map((f) => (
            <button key={f.key} onClick={() => setActiveFilter(f.key)}
              className={`font-body text-xs tracking-widest uppercase px-5 py-2.5 transition-all duration-200 ${
                activeFilter === f.key
                  ? 'bg-accent text-dark'
                  : 'bg-white text-dark/60 border border-gray-200 hover:border-accent hover:text-accent'
              }`}>
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {filtered.map((image, i) => (
            <motion.div key={image.id}
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }} transition={{ delay: i * 0.06 }}
              className="relative aspect-square bg-gray-50 overflow-hidden group">
              {image.url && image.url.startsWith('http') ? (
                <Image src={image.url} alt={image.caption} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-accent-50 to-cream flex flex-col items-center justify-center gap-2">
                  <span className="font-body text-accent/40 text-xs tracking-widest uppercase">{image.type}</span>
                  <span className="font-display text-dark/20 text-lg">{image.caption}</span>
                </div>
              )}
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-dark/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <p className="font-body text-white text-sm p-4">{image.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <p className="font-body text-muted text-sm">
            Follow us on Instagram for daily updates →{' '}
            <a href="#contact" className="text-accent hover:underline">@theflairsudio</a>
          </p>
        </div>
      </div>
    </section>
  )
}
