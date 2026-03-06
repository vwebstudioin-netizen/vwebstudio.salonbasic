import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import ServicesSection from '@/components/ServicesSection'
import StaffSection from '@/components/StaffSection'
import GallerySection from '@/components/GallerySection'
import AboutSection from '@/components/AboutSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import {
  getSalonInfo, getAvailableServices, getVisibleStaff,
  getGalleryImages, getVisibleTestimonials,
} from '@/lib/firestore'
import {
  DEFAULT_SALON, DEFAULT_SERVICES, DEFAULT_STAFF, DEFAULT_TESTIMONIALS,
} from '@/types'

export const revalidate = 60

export default async function Home() {
  const [salonData, servicesData, staffData, galleryData, testimonialsData] = await Promise.all([
    getSalonInfo(),
    getAvailableServices(),
    getVisibleStaff(),
    getGalleryImages(),
    getVisibleTestimonials(),
  ])

  const salon = salonData ?? DEFAULT_SALON
  const services = servicesData.length > 0 ? servicesData : DEFAULT_SERVICES
  const staff = staffData.length > 0 ? staffData : DEFAULT_STAFF
  const testimonials = testimonialsData.length > 0 ? testimonialsData : DEFAULT_TESTIMONIALS

  return (
    <main>
      <Navbar salonName={salon.name} whatsapp={salon.whatsapp} />
      <HeroSection salon={salon} />
      <ServicesSection services={services} />
      <StaffSection staff={staff} />
      <GallerySection images={galleryData} />
      <AboutSection salon={salon} />
      <TestimonialsSection testimonials={testimonials} />
      <ContactSection salon={salon} />
      <Footer salon={salon} />
      <WhatsAppButton whatsapp={salon.whatsapp} />
    </main>
  )
}
