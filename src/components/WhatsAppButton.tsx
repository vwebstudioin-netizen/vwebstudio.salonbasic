'use client'
import { useState } from 'react'
import { FaWhatsapp } from 'react-icons/fa'

export default function WhatsAppButton({ whatsapp }: { whatsapp: string }) {
  const [hovered, setHovered] = useState(false)

  return (
    <a href={`https://wa.me/${whatsapp}?text=Hi%2C+I'd+like+to+book+an+appointment`}
      target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
      style={{ borderRadius: hovered ? '28px' : '50%', width: hovered ? 'auto' : '56px', height: '56px', padding: hovered ? '0 20px' : '0', justifyContent: 'center' }}>
      <FaWhatsapp size={24} className="flex-shrink-0" />
      {hovered && (
        <span className="font-body font-medium text-sm whitespace-nowrap">Book Now</span>
      )}
    </a>
  )
}
