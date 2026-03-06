import type { Metadata } from 'next'
import { Playfair_Display, DM_Sans } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-playfair',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'The Flair Studio | Unisex Salon',
  description:
    'Premium unisex hair salon offering haircuts, coloring, keratin treatments, beard grooming, and skin care. Book your appointment on WhatsApp.',
  keywords: ['salon', 'hair salon', 'unisex salon', 'haircut', 'hair color', 'keratin', 'beard grooming'],
  openGraph: {
    title: 'The Flair Studio | Unisex Salon',
    description: 'Premium unisex salon — haircuts, coloring, keratin, beard & skin care.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  )
}
