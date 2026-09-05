export type PageId = 'home' | 'services' | 'bridal' | 'interior' | 'artisans' | 'booking' | 'contact';

export interface ServiceCategory {
  id: string;
  name: string;
  tagline: string;
  iconName: string;
  description: string;
  image: string;
}

export interface SalonService {
  id: string;
  categoryId: string;
  title: string;
  subtitle?: string;
  description: string;
  durationMinutes: number;
  price: number;
  currency: string;
  popular?: boolean;
  vipOnly?: boolean;
  perks: string[];
  image: string;
}

export interface ArtisanStylist {
  id: string;
  name: string;
  role: string;
  experience: string;
  specialties: string[];
  bio: string;
  rating: number;
  reviewCount: number;
  avatar: string;
  instagramHandle?: string;
}

export interface InteriorSpace {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  features: string[];
  vibe: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  occasion: string;
  service: string;
  comment: string;
  rating: number;
  date: string;
  avatar?: string;
}

export interface AppointmentBooking {
  id: string;
  serviceId: string;
  serviceTitle: string;
  servicePrice: number;
  serviceCurrency?: string;
  categoryName: string;
  stylistId: string;
  stylistName: string;
  date: string;
  timeSlot: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  specialNotes?: string;
  champagnePreference?: string;
  createdAt: string;
  status: 'Confirmed' | 'Pending WhatsApp' | 'Completed';
  referenceCode: string;
}

export interface WhatsAppQueryPreset {
  id: string;
  title: string;
  description: string;
  defaultMessage: string;
  badge?: string;
}
