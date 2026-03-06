export type ServiceCategory = 'Hair' | 'Color' | 'Treatment' | 'Beard' | 'Skin'
export type ServiceGender = 'Male' | 'Female' | 'Unisex'
export type GalleryType = 'work' | 'before-after' | 'salon'

// ─── Firestore Types ────────────────────────────────────────────────────────

export interface SalonInfo {
  name: string
  tagline: string
  description: string
  phone: string
  whatsapp: string
  email: string
  address: string
  mapEmbed?: string
  openingHours: {
    monday: string
    tuesday: string
    wednesday: string
    thursday: string
    friday: string
    saturday: string
    sunday: string
  }
  socialLinks: {
    instagram?: string
    facebook?: string
    youtube?: string
  }
  heroImage: string
  logo: string
}

export interface Service {
  id: string
  name: string
  description: string
  price: number
  priceLabel: 'onwards' | 'per session' | 'fixed'
  duration: string
  category: ServiceCategory
  gender: ServiceGender
  isAvailable: boolean
  isFeatured: boolean
  sortOrder: number
}

export interface StaffMember {
  id: string
  name: string
  role: string
  speciality: string
  experience: number
  photo: string
  isVisible: boolean
  sortOrder: number
}

export interface GalleryImage {
  id: string
  url: string
  caption: string
  type: GalleryType
  category: ServiceCategory | 'General'
  sortOrder: number
}

export interface Testimonial {
  id: string
  clientName: string
  comment: string
  rating: number
  service: string
  isVisible: boolean
}

// ─── Demo / Fallback Data ────────────────────────────────────────────────────

export const DEFAULT_SALON: SalonInfo = {
  name: 'The Flair Studio',
  tagline: 'Where Every Cut Tells a Story',
  description:
    'The Flair Studio is a premium unisex hair salon in the heart of Hyderabad. With a team of expert stylists trained in the latest techniques, we offer everything from precision haircuts and global coloring to keratin treatments and beard grooming — all in a relaxed, luxurious setting.',
  phone: '+91 98765 43210',
  whatsapp: '919876543210',
  email: 'hello@theflairsudio.in',
  address: '42, Jubilee Hills Road No. 10, Hyderabad, Telangana - 500033',
  mapEmbed: '',
  openingHours: {
    monday: '10:00 AM – 8:00 PM',
    tuesday: '10:00 AM – 8:00 PM',
    wednesday: '10:00 AM – 8:00 PM',
    thursday: '10:00 AM – 8:00 PM',
    friday: '10:00 AM – 8:00 PM',
    saturday: '10:00 AM – 9:00 PM',
    sunday: '11:00 AM – 7:00 PM',
  },
  socialLinks: {
    instagram: 'https://instagram.com',
    facebook: 'https://facebook.com',
    youtube: 'https://youtube.com',
  },
  heroImage: '/images/hero.jpg',
  logo: '/images/logo.png',
}

export const DEFAULT_SERVICES: Service[] = [
  // Hair
  { id: '1', name: 'Hair Cut & Styling', description: 'Precision haircut tailored to your face shape, finished with a professional blow-dry and styling.', price: 299, priceLabel: 'onwards', duration: '45 min', category: 'Hair', gender: 'Unisex', isAvailable: true, isFeatured: true, sortOrder: 1 },
  { id: '2', name: 'Kids Hair Cut', description: 'Gentle and fun haircut experience for children, with a soft finish.', price: 199, priceLabel: 'fixed', duration: '30 min', category: 'Hair', gender: 'Unisex', isAvailable: true, isFeatured: false, sortOrder: 2 },
  { id: '3', name: 'Blow Dry & Finish', description: 'Professional blow-dry with heat protectant, leaving hair smooth, shiny, and bouncy.', price: 349, priceLabel: 'onwards', duration: '30 min', category: 'Hair', gender: 'Female', isAvailable: true, isFeatured: false, sortOrder: 3 },
  // Color
  { id: '4', name: 'Global Hair Color', description: 'Full head coverage with premium color brands (Loreal, Wella). Includes toner and conditioning treatment.', price: 999, priceLabel: 'onwards', duration: '90 min', category: 'Color', gender: 'Unisex', isAvailable: true, isFeatured: true, sortOrder: 4 },
  { id: '5', name: 'Highlights', description: 'Create dimension and depth with foil or balayage highlights. Choose from subtle to bold.', price: 1499, priceLabel: 'onwards', duration: '120 min', category: 'Color', gender: 'Female', isAvailable: true, isFeatured: true, sortOrder: 5 },
  { id: '6', name: 'Balayage & Ombre', description: 'Hand-painted color technique for a natural, sun-kissed gradient effect. Low-maintenance and stunning.', price: 2499, priceLabel: 'onwards', duration: '150 min', category: 'Color', gender: 'Female', isAvailable: true, isFeatured: false, sortOrder: 6 },
  { id: '7', name: 'Root Touch-Up', description: 'Refresh your existing color at the roots with a perfectly matched shade.', price: 699, priceLabel: 'onwards', duration: '60 min', category: 'Color', gender: 'Unisex', isAvailable: true, isFeatured: false, sortOrder: 7 },
  // Treatment
  { id: '8', name: 'Keratin Treatment', description: 'Smooth, frizz-free hair for up to 5 months. Eliminates 95% of frizz and makes hair shine.', price: 2999, priceLabel: 'onwards', duration: '180 min', category: 'Treatment', gender: 'Unisex', isAvailable: true, isFeatured: true, sortOrder: 8 },
  { id: '9', name: 'Hair Smoothening', description: 'Relaxes curly or wavy hair into a sleek, manageable style that lasts 4–6 months.', price: 3499, priceLabel: 'onwards', duration: '210 min', category: 'Treatment', gender: 'Unisex', isAvailable: true, isFeatured: false, sortOrder: 9 },
  { id: '10', name: 'Hair Spa', description: 'Deep conditioning treatment with steam to restore moisture, shine, and health to damaged hair.', price: 799, priceLabel: 'onwards', duration: '60 min', category: 'Treatment', gender: 'Unisex', isAvailable: true, isFeatured: true, sortOrder: 10 },
  { id: '11', name: 'Scalp Treatment', description: 'Targeted treatment for dandruff, dryness, or oily scalp. Includes scalp massage and serum application.', price: 999, priceLabel: 'per session', duration: '45 min', category: 'Treatment', gender: 'Unisex', isAvailable: true, isFeatured: false, sortOrder: 11 },
  // Beard
  { id: '12', name: 'Beard Trim & Shape', description: 'Expert beard shaping and trimming to define your jawline and style.', price: 199, priceLabel: 'fixed', duration: '20 min', category: 'Beard', gender: 'Male', isAvailable: true, isFeatured: true, sortOrder: 12 },
  { id: '13', name: 'Clean Shave', description: 'Classic straight razor shave with hot towel, pre-shave oil, and soothing after-shave balm.', price: 299, priceLabel: 'fixed', duration: '30 min', category: 'Beard', gender: 'Male', isAvailable: true, isFeatured: false, sortOrder: 13 },
  { id: '14', name: 'Beard Color', description: 'Natural-looking beard color to cover greys or create a fresh look. Lasts 4–6 weeks.', price: 499, priceLabel: 'onwards', duration: '30 min', category: 'Beard', gender: 'Male', isAvailable: true, isFeatured: false, sortOrder: 14 },
  // Skin
  { id: '15', name: 'Basic Clean-Up', description: 'Deep cleansing facial to remove impurities, unclog pores, and brighten skin.', price: 499, priceLabel: 'onwards', duration: '45 min', category: 'Skin', gender: 'Unisex', isAvailable: true, isFeatured: true, sortOrder: 15 },
  { id: '16', name: 'D-Tan Pack', description: 'Remove tan and restore even skin tone with a specialized de-tanning treatment.', price: 399, priceLabel: 'fixed', duration: '30 min', category: 'Skin', gender: 'Unisex', isAvailable: true, isFeatured: false, sortOrder: 16 },
  { id: '17', name: 'Threading', description: 'Precise eyebrow and facial threading for a clean, defined look.', price: 80, priceLabel: 'onwards', duration: '15 min', category: 'Skin', gender: 'Female', isAvailable: true, isFeatured: false, sortOrder: 17 },
]

export const DEFAULT_STAFF: StaffMember[] = [
  { id: '1', name: 'Priya Sharma', role: 'Creative Director & Senior Stylist', speciality: 'Balayage, Hair Coloring & Keratin', experience: 9, photo: '/images/staff/priya.jpg', isVisible: true, sortOrder: 1 },
  { id: '2', name: 'Rahul Verma', role: 'Senior Hair Stylist', speciality: 'Precision Cuts, Men\'s Grooming & Beard Styling', experience: 7, photo: '/images/staff/rahul.jpg', isVisible: true, sortOrder: 2 },
  { id: '3', name: 'Sneha Reddy', role: 'Color Specialist', speciality: 'Highlights, Ombre & Global Coloring', experience: 5, photo: '/images/staff/sneha.jpg', isVisible: true, sortOrder: 3 },
  { id: '4', name: 'Amir Khan', role: 'Grooming Expert', speciality: 'Barbering, Hot Towel Shaves & Scalp Treatments', experience: 6, photo: '/images/staff/amir.jpg', isVisible: true, sortOrder: 4 },
]

export const DEFAULT_TESTIMONIALS: Testimonial[] = [
  { id: '1', clientName: 'Ananya Krishnan', comment: 'Got my balayage done by Priya and I\'m absolutely obsessed! The colour is perfect and the whole experience was so relaxing. Will definitely be back!', rating: 5, service: 'Balayage', isVisible: true },
  { id: '2', clientName: 'Vikram Nair', comment: 'Best beard trim I\'ve ever had. Rahul knows exactly what he\'s doing — clean, precise, and the hot towel shave was amazing. My go-to salon now.', rating: 5, service: 'Beard Trim & Hot Towel Shave', isVisible: true },
  { id: '3', clientName: 'Meghna Patel', comment: 'The keratin treatment has changed my life! No more frizz, hair feels silky smooth. Sneha was so professional and explained everything clearly.', rating: 5, service: 'Keratin Treatment', isVisible: true },
  { id: '4', clientName: 'Rohan Mehta', comment: 'Great atmosphere, very clean, and the stylists are all super skilled. Got a haircut and hair spa — both were excellent. Reasonable pricing too!', rating: 4, service: 'Haircut + Hair Spa', isVisible: true },
]
