import React, { useState } from 'react';
import { PageId } from '../types';
import { SALON_INFO } from '../data/salonData';
import { createWhatsAppDirectUrl } from '../utils/helpers';
import { 
  Sparkles, 
  MessageCircle, 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  Instagram, 
  Heart,
  CheckCircle2,
  Send
} from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  onOpenBooking: () => void;
  onOpenWhatsApp: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenBooking, onOpenWhatsApp }) => {
  const [emailSubscribed, setEmailSubscribed] = useState(false);
  const [emailInput, setEmailInput] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setEmailSubscribed(true);
      setEmailInput('');
    }
  };

  return (
    <footer id="main-footer" className="bg-[#2D0B16] text-[#FDECEF] pt-16 pb-12 border-t border-[#E8A5B8]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top VIP Invitation Card */}
        <div className="rounded-3xl bg-gradient-to-r from-[#4A1426] via-[#631B33] to-[#4A1426] p-8 sm:p-12 mb-16 border border-[#E6CA85]/30 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#DD4C79]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6CA85]/20 text-[#E6CA85] text-xs font-semibold tracking-wider uppercase mb-3 border border-[#E6CA85]/40">
                <Sparkles className="w-3.5 h-3.5" />
                The VIP Sanctuary Club
              </span>
              <h3 className="font-luxury-serif text-3xl sm:text-4xl text-white font-medium mb-3">
                Experience Luxury Pink Salon & Head Spa in Sambalpur
              </h3>
              <p className="text-[#FCD2DF]/80 text-sm sm:text-base leading-relaxed">
                Connect with our dedicated bridal & aesthetic concierges. Book your viral Korean Head Spa, Japanese Head Spa, balayage, or bridal makeover at First Floor, Jewellery World Tower.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
              <button
                id="footer-book-cta-btn"
                onClick={onOpenBooking}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-gradient-to-r from-[#E6CA85] via-[#D8B766] to-[#C5A059] text-[#2D0B16] font-semibold text-sm hover:brightness-110 transition-all shadow-lg shadow-[#C5A059]/20 cursor-pointer"
              >
                Reserve Your Appointment
              </button>

              <button
                id="footer-whatsapp-cta-btn"
                onClick={onOpenWhatsApp}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-[#25D366]/50 bg-[#25D366]/15 text-[#25D366] hover:bg-[#25D366]/25 transition-all text-sm font-semibold cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </button>
            </div>
          </div>
        </div>

        {/* 4-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#E8A5B8]/20">
          
          {/* Col 1: Brand & Philosophy */}
          <div className="space-y-4">
            <div>
              <span className="font-luxury-serif text-2xl tracking-[0.2em] font-semibold text-white block">
                SPECTRUM
              </span>
              <span className="text-xs tracking-[0.2em] text-[#F7ADC2] uppercase font-light">
                The Family Salon (by pink makeover)
              </span>
            </div>
            <p className="text-xs text-[#FCD2DF]/70 leading-relaxed">
              Sambalpur's 5.0 ★ luxury family salon & beauty parlour. Viral Korean Head Spa, Japanese Head Spa & Aqua Spa, bridal transformations, and affordable luxury aesthetics at Jewellery World Tower.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href={createWhatsAppDirectUrl("Hello Spectrum by Pink Makeover!")}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-[#3B0E1E] text-[#25D366] hover:bg-[#25D366]/20 transition-colors border border-[#E8A5B8]/20"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-[#3B0E1E] text-[#F7ADC2] hover:bg-[#F7ADC2]/20 transition-colors border border-[#E8A5B8]/20"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={`tel:${SALON_INFO.phoneRaw}`}
                className="p-2.5 rounded-full bg-[#3B0E1E] text-[#E6CA85] hover:bg-[#E6CA85]/20 transition-colors border border-[#E8A5B8]/20"
                aria-label="Phone"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation & Experiences */}
          <div className="space-y-3">
            <h4 className="font-luxury-serif text-lg text-white font-medium tracking-wide">
              The Sanctuary
            </h4>
            <ul className="space-y-2 text-xs text-[#FCD2DF]/80">
              <li>
                <button 
                  onClick={() => onNavigate('home')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Sanctuary Overview
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('services')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Treatments & Price Menu
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('bridal')} 
                  className="hover:text-white transition-colors cursor-pointer text-[#F7ADC2] font-semibold"
                >
                  Couture Bridal Lounge & Trials
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('interior')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  The Interior & Virtual Gallery
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('artisans')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Master Artists & Colorists
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('contact')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  VIP Concierge & Directions
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Hours & Sanctuary Location */}
          <div className="space-y-3">
            <h4 className="font-luxury-serif text-lg text-white font-medium tracking-wide">
              Private Hours & Location
            </h4>
            <div className="space-y-2.5 text-xs text-[#FCD2DF]/80">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#E6CA85] shrink-0 mt-0.5" />
                <span>{SALON_INFO.address}</span>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#F7ADC2] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p>{SALON_INFO.openingHours.weekdays}</p>
                  <p>{SALON_INFO.openingHours.sunday}</p>
                  <p className="text-[#E6CA85] font-medium">{SALON_INFO.openingHours.monday}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <Phone className="w-4 h-4 text-[#25D366] shrink-0" />
                <span>{SALON_INFO.phoneDisplay}</span>
              </div>
            </div>
          </div>

          {/* Col 4: Newsletter & WhatsApp Privileges */}
          <div className="space-y-3">
            <h4 className="font-luxury-serif text-lg text-white font-medium tracking-wide">
              VIP Gazette
            </h4>
            <p className="text-xs text-[#FCD2DF]/70">
              Be the first to receive invitations for guest masterclasses and seasonal bridal trunk shows.
            </p>

            {emailSubscribed ? (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-[#4A1426] border border-[#E6CA85]/40 text-[#E6CA85] text-xs">
                <CheckCircle2 className="w-4 h-4" />
                <span>You are on our private guest list. Welcome!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#3B0E1E] text-white text-xs border border-[#E8A5B8]/30 placeholder:text-white/40 focus:outline-none focus:border-[#E6CA85]"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-[#C22D5E] text-white hover:bg-[#DD4C79] transition-colors cursor-pointer"
                    aria-label="Subscribe"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[10px] text-[#FCD2DF]/50">
                  Strict privacy observed. No spam, only luxury.
                </p>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FCD2DF]/60">
          <p>© {new Date().getFullYear()} Spectrum by Pink Makeover. All Rights Reserved. Luxury Aesthetic Sanctuary.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-[#F7ADC2]">
              Crafted with <Heart className="w-3 h-3 fill-current text-[#C22D5E]" /> for Haute Aesthetics
            </span>
            <button
              onClick={() => onNavigate('contact')}
              className="hover:underline text-[#E6CA85] cursor-pointer"
            >
              VIP Concierge Support
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
