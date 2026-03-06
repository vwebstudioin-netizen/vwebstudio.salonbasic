'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import type { StaffMember } from '@/types'

export default function StaffSection({ staff }: { staff: StaffMember[] }) {
  if (staff.length === 0) return null

  return (
    <section id="team" className="section bg-dark">
      <div className="container-custom">
        <div className="text-center mb-14">
          <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="section-label">The People</motion.span>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="font-display text-3xl md:text-4xl lg:text-5xl text-white font-normal leading-tight">
            Meet Our Stylists
          </motion.h2>
          <div className="gold-divider" />
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="font-body text-white/50 text-lg mt-4 max-w-xl mx-auto">
            Trained professionals passionate about making you look and feel your best.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {staff.map((member, i) => (
            <motion.div key={member.id}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="group text-center">
              {/* Photo */}
              <div className="relative w-44 h-44 mx-auto mb-5 overflow-hidden rounded-full border-2 border-white/10 group-hover:border-accent transition-colors duration-300">
                {member.photo && member.photo.startsWith('http') ? (
                  <Image src={member.photo} alt={member.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full bg-white/5 flex items-center justify-center">
                    <span className="font-display text-4xl text-accent/40 font-normal">{member.name[0]}</span>
                  </div>
                )}
              </div>

              {/* Info */}
              <h3 className="font-display text-xl text-white font-normal mb-1">{member.name}</h3>
              <p className="font-body text-accent text-xs tracking-widest uppercase mb-2">{member.role}</p>
              <p className="font-body text-white/40 text-sm">{member.speciality}</p>
              <p className="font-body text-white/30 text-xs mt-2">{member.experience} yrs experience</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
