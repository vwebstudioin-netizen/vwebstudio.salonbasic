'use client'
import { useState, useEffect } from 'react'
import {
  getAllServices, addService, updateService, deleteService,
  getAllStaff, addStaffMember, updateStaffMember, deleteStaffMember,
  getGalleryImages, addGalleryImage, deleteGalleryImage,
  getAllTestimonials, addTestimonial, updateTestimonial, deleteTestimonial,
  getSalonInfo, saveSalonInfo,
} from '@/lib/firestore'
import type { Service, StaffMember, GalleryImage, Testimonial, ServiceCategory, ServiceGender } from '@/types'
import { DEFAULT_SALON } from '@/types'
import { FiScissors, FiUsers, FiImage, FiStar, FiInfo, FiPlus, FiTrash2, FiEye, FiEyeOff, FiSave } from 'react-icons/fi'

type Tab = 'overview' | 'services' | 'staff' | 'gallery' | 'reviews'

const SERVICE_CATEGORIES: ServiceCategory[] = ['Hair', 'Color', 'Treatment', 'Beard', 'Skin']
const SERVICE_GENDERS: ServiceGender[] = ['Male', 'Female', 'Unisex']

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('overview')
  const [salon, setSalon] = useState(DEFAULT_SALON)
  const [services, setServices] = useState<Service[]>([])
  const [staff, setStaff] = useState<StaffMember[]>([])
  const [gallery, setGallery] = useState<GalleryImage[]>([])
  const [reviews, setReviews] = useState<Testimonial[]>([])
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  // New item forms
  const [newService, setNewService] = useState<Omit<Service, 'id'>>({ name: '', description: '', price: 0, priceLabel: 'onwards', duration: '', category: 'Hair', gender: 'Unisex', isAvailable: true, isFeatured: false, sortOrder: 0 })
  const [newStaff, setNewStaff] = useState<Omit<StaffMember, 'id'>>({ name: '', role: '', speciality: '', experience: 0, photo: '', isVisible: true, sortOrder: 0 })
  const [newGallery, setNewGallery] = useState<Omit<GalleryImage, 'id'>>({ url: '', caption: '', type: 'work', category: 'Hair', sortOrder: 0 })
  const [newReview, setNewReview] = useState<Omit<Testimonial, 'id'>>({ clientName: '', comment: '', rating: 5, service: '', isVisible: true })

  useEffect(() => {
    Promise.all([getSalonInfo(), getAllServices(), getAllStaff(), getGalleryImages(), getAllTestimonials()])
      .then(([s, sv, st, g, r]) => {
        if (s) setSalon(s)
        setServices(sv); setStaff(st); setGallery(g); setReviews(r)
      })
  }, [])

  const showMsg = (msg: string) => { setMessage(msg); setTimeout(() => setMessage(''), 3000) }

  // ─── Salon ─────────────────────────────────────────────────────
  const handleSaveSalon = async () => {
    setSaving(true); await saveSalonInfo(salon); setSaving(false); showMsg('Settings saved!')
  }

  // ─── Services ──────────────────────────────────────────────────
  const handleAddService = async () => {
    if (!newService.name) return
    const id = await addService(newService)
    setServices((s) => [...s, { ...newService, id }])
    setNewService({ name: '', description: '', price: 0, priceLabel: 'onwards', duration: '', category: 'Hair', gender: 'Unisex', isAvailable: true, isFeatured: false, sortOrder: 0 })
    showMsg('Service added!')
  }
  const toggleService = async (id: string, val: boolean) => {
    await updateService(id, { isAvailable: !val })
    setServices((s) => s.map((sv) => sv.id === id ? { ...sv, isAvailable: !val } : sv))
  }
  const removeService = async (id: string) => {
    if (!confirm('Delete?')) return
    await deleteService(id); setServices((s) => s.filter((sv) => sv.id !== id)); showMsg('Deleted.')
  }

  // ─── Staff ─────────────────────────────────────────────────────
  const handleAddStaff = async () => {
    if (!newStaff.name) return
    const id = await addStaffMember(newStaff)
    setStaff((s) => [...s, { ...newStaff, id }])
    setNewStaff({ name: '', role: '', speciality: '', experience: 0, photo: '', isVisible: true, sortOrder: 0 })
    showMsg('Staff member added!')
  }
  const toggleStaff = async (id: string, val: boolean) => {
    await updateStaffMember(id, { isVisible: !val })
    setStaff((s) => s.map((m) => m.id === id ? { ...m, isVisible: !val } : m))
  }
  const removeStaff = async (id: string) => {
    if (!confirm('Delete?')) return
    await deleteStaffMember(id); setStaff((s) => s.filter((m) => m.id !== id)); showMsg('Deleted.')
  }

  // ─── Gallery ───────────────────────────────────────────────────
  const handleAddGallery = async () => {
    if (!newGallery.url) return
    const id = await addGalleryImage(newGallery)
    setGallery((g) => [...g, { ...newGallery, id }])
    setNewGallery({ url: '', caption: '', type: 'work', category: 'Hair', sortOrder: 0 })
    showMsg('Image added!')
  }
  const removeGallery = async (id: string) => {
    if (!confirm('Delete?')) return
    await deleteGalleryImage(id); setGallery((g) => g.filter((img) => img.id !== id)); showMsg('Deleted.')
  }

  // ─── Reviews ───────────────────────────────────────────────────
  const handleAddReview = async () => {
    if (!newReview.clientName || !newReview.comment) return
    const id = await addTestimonial(newReview)
    setReviews((r) => [...r, { ...newReview, id }])
    setNewReview({ clientName: '', comment: '', rating: 5, service: '', isVisible: true })
    showMsg('Review added!')
  }
  const toggleReview = async (id: string, val: boolean) => {
    await updateTestimonial(id, { isVisible: !val })
    setReviews((r) => r.map((rv) => rv.id === id ? { ...rv, isVisible: !val } : rv))
  }
  const removeReview = async (id: string) => {
    if (!confirm('Delete?')) return
    await deleteTestimonial(id); setReviews((r) => r.filter((rv) => rv.id !== id)); showMsg('Deleted.')
  }

  const TABS: { key: Tab; label: string; icon: React.ElementType; count?: number }[] = [
    { key: 'overview', label: 'Salon Info', icon: FiInfo },
    { key: 'services', label: `Services (${services.length})`, icon: FiScissors },
    { key: 'staff', label: `Staff (${staff.length})`, icon: FiUsers },
    { key: 'gallery', label: `Gallery (${gallery.length})`, icon: FiImage },
    { key: 'reviews', label: `Reviews (${reviews.length})`, icon: FiStar },
  ]

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-3xl text-dark font-normal">Dashboard</h1>
        <p className="font-body text-muted text-sm mt-1">Manage your salon content</p>
      </div>

      {message && (
        <div className="mb-4 bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3 font-body text-sm">{message}</div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Services', value: services.length, icon: '✂️' },
          { label: 'Staff', value: staff.length, icon: '👤' },
          { label: 'Gallery', value: gallery.length, icon: '📷' },
          { label: 'Reviews', value: reviews.length, icon: '⭐' },
        ].map((stat) => (
          <div key={stat.label} className="admin-card flex items-center gap-3">
            <span className="text-2xl">{stat.icon}</span>
            <div>
              <p className="font-display text-2xl text-dark font-normal">{stat.value}</p>
              <p className="font-body text-xs text-muted">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap mb-6">
        {TABS.map(({ key, label, icon: Icon }) => (
          <button key={key} onClick={() => setActiveTab(key)}
            className={`flex items-center gap-2 px-4 py-2 font-body text-sm transition-all ${activeTab === key ? 'bg-dark text-white' : 'bg-white text-dark border border-gray-200 hover:border-accent hover:text-accent'}`}>
            <Icon size={15} /> {label}
          </button>
        ))}
      </div>

      {/* ─── Salon Info ─── */}
      {activeTab === 'overview' && (
        <div className="admin-card space-y-5">
          <h2 className="font-display text-xl text-dark font-normal">Salon Information</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[{ label: 'Salon Name', key: 'name' }, { label: 'Tagline', key: 'tagline' }, { label: 'Phone', key: 'phone' }, { label: 'WhatsApp (numbers only)', key: 'whatsapp' }, { label: 'Email', key: 'email' }].map((f) => (
              <div key={f.key}>
                <label className="block font-body text-xs text-muted tracking-wider uppercase mb-1.5">{f.label}</label>
                <input value={(salon as Record<string, string>)[f.key]} onChange={(e) => setSalon({ ...salon, [f.key]: e.target.value })} className="input-field" />
              </div>
            ))}
            <div className="md:col-span-2">
              <label className="block font-body text-xs text-muted tracking-wider uppercase mb-1.5">Address</label>
              <input value={salon.address} onChange={(e) => setSalon({ ...salon, address: e.target.value })} className="input-field" />
            </div>
            <div className="md:col-span-2">
              <label className="block font-body text-xs text-muted tracking-wider uppercase mb-1.5">About Description</label>
              <textarea value={salon.description} onChange={(e) => setSalon({ ...salon, description: e.target.value })} rows={3} className="input-field resize-none" />
            </div>
          </div>
          <h3 className="font-display text-lg text-dark font-normal pt-2">Opening Hours</h3>
          <div className="grid md:grid-cols-2 gap-3">
            {(['monday','tuesday','wednesday','thursday','friday','saturday','sunday'] as const).map((day) => (
              <div key={day}>
                <label className="block font-body text-xs text-muted capitalize mb-1.5">{day}</label>
                <input value={salon.openingHours[day]} onChange={(e) => setSalon({ ...salon, openingHours: { ...salon.openingHours, [day]: e.target.value } })} className="input-field" />
              </div>
            ))}
          </div>
          <button onClick={handleSaveSalon} disabled={saving} className="flex items-center gap-2 bg-accent text-dark font-body font-medium text-xs tracking-widest uppercase px-6 py-3 hover:bg-accent-dark hover:text-white transition-all disabled:opacity-50">
            <FiSave size={14} /> {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      )}

      {/* ─── Services ─── */}
      {activeTab === 'services' && (
        <div className="space-y-6">
          <div className="admin-card">
            <h2 className="font-display text-xl text-dark font-normal mb-4">Add New Service</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div><label className="block font-body text-xs text-muted uppercase tracking-wider mb-1.5">Service Name *</label><input value={newService.name} onChange={(e) => setNewService({ ...newService, name: e.target.value })} className="input-field" /></div>
              <div><label className="block font-body text-xs text-muted uppercase tracking-wider mb-1.5">Category</label><select value={newService.category} onChange={(e) => setNewService({ ...newService, category: e.target.value as ServiceCategory })} className="input-field">{SERVICE_CATEGORIES.map((c) => <option key={c}>{c}</option>)}</select></div>
              <div><label className="block font-body text-xs text-muted uppercase tracking-wider mb-1.5">Gender</label><select value={newService.gender} onChange={(e) => setNewService({ ...newService, gender: e.target.value as ServiceGender })} className="input-field">{SERVICE_GENDERS.map((g) => <option key={g}>{g}</option>)}</select></div>
              <div><label className="block font-body text-xs text-muted uppercase tracking-wider mb-1.5">Duration</label><input value={newService.duration} onChange={(e) => setNewService({ ...newService, duration: e.target.value })} placeholder="45 min" className="input-field" /></div>
              <div><label className="block font-body text-xs text-muted uppercase tracking-wider mb-1.5">Price (₹)</label><input type="number" value={newService.price} onChange={(e) => setNewService({ ...newService, price: Number(e.target.value) })} className="input-field" /></div>
              <div><label className="block font-body text-xs text-muted uppercase tracking-wider mb-1.5">Price Label</label><select value={newService.priceLabel} onChange={(e) => setNewService({ ...newService, priceLabel: e.target.value as Service['priceLabel'] })} className="input-field"><option value="onwards">onwards</option><option value="per session">per session</option><option value="fixed">fixed</option></select></div>
              <div className="md:col-span-2"><label className="block font-body text-xs text-muted uppercase tracking-wider mb-1.5">Description</label><textarea value={newService.description} onChange={(e) => setNewService({ ...newService, description: e.target.value })} rows={2} className="input-field resize-none" /></div>
            </div>
            <button onClick={handleAddService} className="flex items-center gap-2 bg-dark text-white font-body text-xs tracking-widest uppercase px-5 py-3 mt-4 hover:bg-accent hover:text-dark transition-all">
              <FiPlus size={14} /> Add Service
            </button>
          </div>
          <div className="admin-card">
            <h2 className="font-display text-xl text-dark font-normal mb-4">All Services ({services.length})</h2>
            <div className="space-y-3">
              {services.map((s) => (
                <div key={s.id} className="flex items-start justify-between gap-4 p-4 bg-cream border border-gray-100">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-0.5">
                      <span className="font-body font-medium text-dark text-sm">{s.name}</span>
                      <span className="badge-category">{s.category}</span>
                      <span className={s.gender === 'Male' ? 'badge-male' : s.gender === 'Female' ? 'badge-female' : 'badge-unisex'}>{s.gender}</span>
                      {!s.isAvailable && <span className="font-body text-xs text-muted bg-gray-100 px-2 py-0.5">Hidden</span>}
                    </div>
                    <p className="font-body text-xs text-muted">₹{s.price} {s.priceLabel} · {s.duration}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => toggleService(s.id, s.isAvailable)} className={`p-2 transition-colors ${s.isAvailable ? 'text-green-600 bg-green-50' : 'text-muted bg-gray-100'}`}>{s.isAvailable ? <FiEye size={14} /> : <FiEyeOff size={14} />}</button>
                    <button onClick={() => removeService(s.id)} className="p-2 text-red-400 bg-red-50 hover:bg-red-100 transition-colors"><FiTrash2 size={14} /></button>
                  </div>
                </div>
              ))}
              {services.length === 0 && <p className="text-center font-body text-muted text-sm py-8">No services yet.</p>}
            </div>
          </div>
        </div>
      )}

      {/* ─── Staff ─── */}
      {activeTab === 'staff' && (
        <div className="space-y-6">
          <div className="admin-card">
            <h2 className="font-display text-xl text-dark font-normal mb-4">Add Staff Member</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div><label className="block font-body text-xs text-muted uppercase tracking-wider mb-1.5">Full Name *</label><input value={newStaff.name} onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })} className="input-field" /></div>
              <div><label className="block font-body text-xs text-muted uppercase tracking-wider mb-1.5">Role / Title</label><input value={newStaff.role} onChange={(e) => setNewStaff({ ...newStaff, role: e.target.value })} placeholder="Senior Stylist" className="input-field" /></div>
              <div><label className="block font-body text-xs text-muted uppercase tracking-wider mb-1.5">Speciality</label><input value={newStaff.speciality} onChange={(e) => setNewStaff({ ...newStaff, speciality: e.target.value })} placeholder="Balayage & Hair Coloring" className="input-field" /></div>
              <div><label className="block font-body text-xs text-muted uppercase tracking-wider mb-1.5">Experience (Years)</label><input type="number" value={newStaff.experience} onChange={(e) => setNewStaff({ ...newStaff, experience: Number(e.target.value) })} className="input-field" /></div>
              <div className="md:col-span-2"><label className="block font-body text-xs text-muted uppercase tracking-wider mb-1.5">Photo URL (Firebase Storage)</label><input value={newStaff.photo} onChange={(e) => setNewStaff({ ...newStaff, photo: e.target.value })} placeholder="https://firebasestorage..." className="input-field" /></div>
            </div>
            <button onClick={handleAddStaff} className="flex items-center gap-2 bg-dark text-white font-body text-xs tracking-widest uppercase px-5 py-3 mt-4 hover:bg-accent hover:text-dark transition-all">
              <FiPlus size={14} /> Add Staff Member
            </button>
          </div>
          <div className="admin-card grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {staff.map((m) => (
              <div key={m.id} className="p-4 bg-cream border border-gray-100 text-center">
                <div className="w-14 h-14 rounded-full bg-accent-50 flex items-center justify-center mx-auto mb-3 border-2 border-accent/20">
                  <span className="font-display text-accent text-xl">{m.name[0]}</span>
                </div>
                <p className="font-body font-medium text-dark text-sm">{m.name}</p>
                <p className="font-body text-xs text-accent mt-0.5">{m.role}</p>
                <p className="font-body text-xs text-muted mt-1 mb-3">{m.experience} yrs exp</p>
                <div className="flex gap-2 justify-center">
                  <button onClick={() => toggleStaff(m.id, m.isVisible)} className={`p-2 flex-1 flex justify-center transition-colors ${m.isVisible ? 'text-green-600 bg-green-50' : 'text-muted bg-gray-100'}`}>{m.isVisible ? <FiEye size={14} /> : <FiEyeOff size={14} />}</button>
                  <button onClick={() => removeStaff(m.id)} className="p-2 flex-1 flex justify-center text-red-400 bg-red-50 hover:bg-red-100 transition-colors"><FiTrash2 size={14} /></button>
                </div>
              </div>
            ))}
            {staff.length === 0 && <p className="col-span-full text-center font-body text-muted text-sm py-8">No staff members yet.</p>}
          </div>
        </div>
      )}

      {/* ─── Gallery ─── */}
      {activeTab === 'gallery' && (
        <div className="space-y-6">
          <div className="admin-card">
            <h2 className="font-display text-xl text-dark font-normal mb-4">Add Gallery Image</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="md:col-span-2"><label className="block font-body text-xs text-muted uppercase tracking-wider mb-1.5">Image URL *</label><input value={newGallery.url} onChange={(e) => setNewGallery({ ...newGallery, url: e.target.value })} placeholder="https://firebasestorage..." className="input-field" /></div>
              <div><label className="block font-body text-xs text-muted uppercase tracking-wider mb-1.5">Caption</label><input value={newGallery.caption} onChange={(e) => setNewGallery({ ...newGallery, caption: e.target.value })} placeholder="Balayage Transformation" className="input-field" /></div>
              <div><label className="block font-body text-xs text-muted uppercase tracking-wider mb-1.5">Type</label><select value={newGallery.type} onChange={(e) => setNewGallery({ ...newGallery, type: e.target.value as GalleryImage['type'] })} className="input-field"><option value="work">Our Work</option><option value="before-after">Before & After</option><option value="salon">The Studio</option></select></div>
            </div>
            <button onClick={handleAddGallery} className="flex items-center gap-2 bg-dark text-white font-body text-xs tracking-widest uppercase px-5 py-3 mt-4 hover:bg-accent hover:text-dark transition-all">
              <FiPlus size={14} /> Add Image
            </button>
          </div>
          <div className="admin-card">
            <h2 className="font-display text-xl text-dark font-normal mb-4">Gallery ({gallery.length})</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {gallery.map((img) => (
                <div key={img.id} className="relative aspect-square bg-cream border border-gray-100 group overflow-hidden">
                  {img.url && <img src={img.url} alt={img.caption} className="w-full h-full object-cover" />}
                  <div className="absolute inset-0 bg-dark/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button onClick={() => removeGallery(img.id)} className="p-2 bg-red-500 text-white hover:bg-red-600 transition-colors"><FiTrash2 size={14} /></button>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-dark/70 px-2 py-1">
                    <p className="font-body text-white text-xs truncate">{img.caption || img.type}</p>
                  </div>
                </div>
              ))}
              {gallery.length === 0 && <p className="col-span-full text-center font-body text-muted text-sm py-8">No images yet.</p>}
            </div>
          </div>
        </div>
      )}

      {/* ─── Reviews ─── */}
      {activeTab === 'reviews' && (
        <div className="space-y-6">
          <div className="admin-card">
            <h2 className="font-display text-xl text-dark font-normal mb-4">Add Client Review</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div><label className="block font-body text-xs text-muted uppercase tracking-wider mb-1.5">Client Name *</label><input value={newReview.clientName} onChange={(e) => setNewReview({ ...newReview, clientName: e.target.value })} className="input-field" /></div>
              <div><label className="block font-body text-xs text-muted uppercase tracking-wider mb-1.5">Service</label><input value={newReview.service} onChange={(e) => setNewReview({ ...newReview, service: e.target.value })} placeholder="Balayage" className="input-field" /></div>
              <div><label className="block font-body text-xs text-muted uppercase tracking-wider mb-1.5">Rating</label><select value={newReview.rating} onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })} className="input-field">{[5,4,3,2,1].map((r) => <option key={r} value={r}>{r} Stars</option>)}</select></div>
              <div className="md:col-span-2"><label className="block font-body text-xs text-muted uppercase tracking-wider mb-1.5">Review *</label><textarea value={newReview.comment} onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })} rows={3} className="input-field resize-none" /></div>
            </div>
            <button onClick={handleAddReview} className="flex items-center gap-2 bg-dark text-white font-body text-xs tracking-widest uppercase px-5 py-3 mt-4 hover:bg-accent hover:text-dark transition-all">
              <FiPlus size={14} /> Add Review
            </button>
          </div>
          <div className="admin-card space-y-3">
            <h2 className="font-display text-xl text-dark font-normal mb-4">All Reviews ({reviews.length})</h2>
            {reviews.map((r) => (
              <div key={r.id} className="flex items-start justify-between gap-4 p-4 bg-cream border border-gray-100">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="font-body font-medium text-dark text-sm">{r.clientName}</span>
                    <span className="text-accent text-sm">{'★'.repeat(r.rating)}</span>
                    {!r.isVisible && <span className="font-body text-xs text-muted bg-gray-100 px-2 py-0.5">Hidden</span>}
                  </div>
                  <p className="font-body text-xs text-muted mb-1">{r.service}</p>
                  <p className="font-body text-sm text-dark/70 line-clamp-2">{r.comment}</p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button onClick={() => toggleReview(r.id, r.isVisible)} className={`p-2 transition-colors ${r.isVisible ? 'text-green-600 bg-green-50' : 'text-muted bg-gray-100'}`}>{r.isVisible ? <FiEye size={14} /> : <FiEyeOff size={14} />}</button>
                  <button onClick={() => removeReview(r.id)} className="p-2 text-red-400 bg-red-50 hover:bg-red-100 transition-colors"><FiTrash2 size={14} /></button>
                </div>
              </div>
            ))}
            {reviews.length === 0 && <p className="text-center font-body text-muted text-sm py-8">No reviews yet.</p>}
          </div>
        </div>
      )}
    </div>
  )
}
