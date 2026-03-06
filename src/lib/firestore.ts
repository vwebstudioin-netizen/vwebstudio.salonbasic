import {
  doc, getDoc, getDocs, collection, query, orderBy, where,
  setDoc, addDoc, updateDoc, deleteDoc, serverTimestamp,
} from 'firebase/firestore'
import { db as _db } from './firebase'

// Fall back gracefully if Firebase is not configured
const db = _db!
const isReady = () => !!_db
import type { SalonInfo, Service, StaffMember, GalleryImage, Testimonial } from '@/types'

// ─── Salon Info ───────────────────────────────────────────────────

export async function getSalonInfo(): Promise<SalonInfo | null> {
  if (!isReady()) return null
  try {
    const snap = await getDoc(doc(db, 'salon', 'info'))
    return snap.exists() ? (snap.data() as SalonInfo) : null
  } catch { return null }
}
export async function saveSalonInfo(data: Partial<SalonInfo>) {
  await setDoc(doc(db, 'salon', 'info'), { ...data, updatedAt: serverTimestamp() }, { merge: true })
}

// ─── Services ─────────────────────────────────────────────────────

export async function getAvailableServices(): Promise<Service[]> {
  if (!isReady()) return []
  try {
    const q = query(collection(db, 'services'), where('isAvailable', '==', true), orderBy('sortOrder'))
    const snap = await getDocs(q)
    return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Service))
  } catch { return [] }
}
export async function getAllServices(): Promise<Service[]> {
  if (!isReady()) return []
  try {
    const q = query(collection(db, 'services'), orderBy('sortOrder'))
    const snap = await getDocs(q)
    return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Service))
  } catch { return [] }
}
export async function addService(data: Omit<Service, 'id'>) {
  return (await addDoc(collection(db, 'services'), { ...data, createdAt: serverTimestamp() })).id
}
export async function updateService(id: string, data: Partial<Service>) {
  await updateDoc(doc(db, 'services', id), data)
}
export async function deleteService(id: string) { await deleteDoc(doc(db, 'services', id)) }

// ─── Staff ────────────────────────────────────────────────────────

export async function getVisibleStaff(): Promise<StaffMember[]> {
  if (!isReady()) return []
  try {
    const q = query(collection(db, 'staff'), where('isVisible', '==', true), orderBy('sortOrder'))
    const snap = await getDocs(q)
    return snap.docs.map((d) => ({ id: d.id, ...d.data() } as StaffMember))
  } catch { return [] }
}
export async function getAllStaff(): Promise<StaffMember[]> {
  if (!isReady()) return []
  try {
    const q = query(collection(db, 'staff'), orderBy('sortOrder'))
    const snap = await getDocs(q)
    return snap.docs.map((d) => ({ id: d.id, ...d.data() } as StaffMember))
  } catch { return [] }
}
export async function addStaffMember(data: Omit<StaffMember, 'id'>) {
  return (await addDoc(collection(db, 'staff'), { ...data, createdAt: serverTimestamp() })).id
}
export async function updateStaffMember(id: string, data: Partial<StaffMember>) {
  await updateDoc(doc(db, 'staff', id), data)
}
export async function deleteStaffMember(id: string) { await deleteDoc(doc(db, 'staff', id)) }

// ─── Gallery ──────────────────────────────────────────────────────

export async function getGalleryImages(): Promise<GalleryImage[]> {
  if (!isReady()) return []
  try {
    const q = query(collection(db, 'gallery'), orderBy('sortOrder'))
    const snap = await getDocs(q)
    return snap.docs.map((d) => ({ id: d.id, ...d.data() } as GalleryImage))
  } catch { return [] }
}
export async function addGalleryImage(data: Omit<GalleryImage, 'id'>) {
  return (await addDoc(collection(db, 'gallery'), { ...data, createdAt: serverTimestamp() })).id
}
export async function deleteGalleryImage(id: string) { await deleteDoc(doc(db, 'gallery', id)) }

// ─── Testimonials ──────────────────────────────────────────────────

export async function getVisibleTestimonials(): Promise<Testimonial[]> {
  if (!isReady()) return []
  try {
    const q = query(collection(db, 'testimonials'), where('isVisible', '==', true))
    const snap = await getDocs(q)
    return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Testimonial))
  } catch { return [] }
}
export async function getAllTestimonials(): Promise<Testimonial[]> {
  if (!isReady()) return []
  try {
    const snap = await getDocs(collection(db, 'testimonials'))
    return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Testimonial))
  } catch { return [] }
}
export async function addTestimonial(data: Omit<Testimonial, 'id'>) {
  return (await addDoc(collection(db, 'testimonials'), { ...data, createdAt: serverTimestamp() })).id
}
export async function updateTestimonial(id: string, data: Partial<Testimonial>) {
  await updateDoc(doc(db, 'testimonials', id), data)
}
export async function deleteTestimonial(id: string) { await deleteDoc(doc(db, 'testimonials', id)) }
