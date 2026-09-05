import { AppointmentBooking } from '../types';
import { SALON_INFO } from '../data/salonData';

export function createWhatsAppBookingUrl(booking: AppointmentBooking): string {
  const currencySymbol = booking.serviceCurrency || '₹';
  const message = `✨ *SPECTRUM: THE FAMILY SALON (BY PINK MAKEOVER)* ✨
*Appointment Reservation Request*
📍 _Jewellery World Tower, Sambalpur, Odisha_
────────────────────────
✦ *Booking Ref:* #${booking.referenceCode}
✦ *Guest Name:* ${booking.clientName}
✦ *Contact:* ${booking.clientPhone}
${booking.clientEmail ? `✦ *Email:* ${booking.clientEmail}\n` : ''}
✦ *Service:* ${booking.serviceTitle}
✦ *Category:* ${booking.categoryName}
✦ *Preferred Stylist:* ${booking.stylistName}
✦ *Date:* ${booking.date}
✦ *Time Slot:* ${booking.timeSlot}
✦ *Price / Investment:* ${currencySymbol}${booking.servicePrice.toLocaleString('en-IN')}

${booking.champagnePreference ? `✦ *Welcome Beverage Choice:* ${booking.champagnePreference}\n` : ''}${booking.specialNotes ? `✦ *Special Requests / Notes:* ${booking.specialNotes}\n` : ''}────────────────────────
Kindly confirm my appointment slot at Spectrum Sambalpur. Thank you! 🌸`;

  return `https://wa.me/${SALON_INFO.phoneRaw}?text=${encodeURIComponent(message)}`;
}

export function createWhatsAppDirectUrl(customText?: string): string {
  const text = customText || `✨ Hello Spectrum: The Family Salon (by pink makeover)! I would like to inquire about booking an appointment in Sambalpur.`;
  return `https://wa.me/${SALON_INFO.phoneRaw}?text=${encodeURIComponent(text)}`;
}

// LocalStorage appointments manager
const STORAGE_KEY = 'spectrum_salon_bookings_v1';

export function getStoredBookings(): AppointmentBooking[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to parse stored bookings:', err);
    return [];
  }
}

export function saveBookingToStorage(booking: AppointmentBooking): void {
  try {
    const existing = getStoredBookings();
    const updated = [booking, ...existing.filter((b) => b.id !== booking.id)];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save booking:', err);
  }
}

export function removeBookingFromStorage(id: string): void {
  try {
    const existing = getStoredBookings();
    const filtered = existing.filter((b) => b.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (err) {
    console.error('Failed to remove booking:', err);
  }
}

// Simple Web Audio API Synthesizer for Relaxing Salon Chime
class SalonSoundManager {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private timerId: number | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public playGentleChime() {
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const freqs = [528, 660, 792, 1056]; // Solfeggio love/transformation harmonic tone

      freqs.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.12);

        gain.gain.setValueAtTime(0, now + idx * 0.12);
        gain.gain.linearRampToValueAtTime(0.04, now + idx * 0.12 + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.12 + 2.2);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + idx * 0.12);
        osc.stop(now + idx * 0.12 + 2.3);
      });
    } catch {
      // Ignore audio constraints
    }
  }

  public toggleAmbientMusic(onStateChange: (playing: boolean) => void) {
    if (this.isPlaying) {
      this.stopAmbientMusic();
      onStateChange(false);
    } else {
      this.startAmbientMusic();
      onStateChange(true);
    }
  }

  public startAmbientMusic() {
    this.isPlaying = true;
    this.playGentleChime();
    this.timerId = window.setInterval(() => {
      if (this.isPlaying) {
        this.playGentleChime();
      }
    }, 6000);
  }

  public stopAmbientMusic() {
    this.isPlaying = false;
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }
}

export const salonSound = new SalonSoundManager();
