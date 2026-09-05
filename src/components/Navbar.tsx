import React, { useState } from 'react';
import { PageId, AppointmentBooking } from '../types';
import { SALON_INFO } from '../data/salonData';
import { createWhatsAppDirectUrl } from '../utils/helpers';
import { 
  Sparkles, 
  Calendar, 
  MessageCircle, 
  Menu, 
  X, 
  Clock, 
  Bookmark, 
  Phone,
  Compass
} from 'lucide-react';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenBooking: (preselectedServiceId?: string) => void;
  onOpenWhatsApp: () => void;
  onOpenMyAppointments: () => void;
  myBookings: AppointmentBooking[];
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenBooking,
  onOpenWhatsApp,
  onOpenMyAppointments,
  myBookings,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: PageId; label: string; tag?: string }[] = [
    { id: 'home', label: 'Sanctuary' },
    { id: 'services', label: 'Treatments & Menu' },
    { id: 'bridal', label: 'Couture Bridal', tag: 'VIP' },
    { id: 'interior', label: 'The Interior' },
    { id: 'artisans', label: 'Artisans' },
    { id: 'contact', label: 'Concierge & Hours' },
  ];

  const handleNavClick = (id: PageId) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Haute Privilege Bar */}
      <div id="top-announcement-bar" className="bg-[#431221] text-[#FDECEF] py-1.5 px-4 text-xs tracking-wider border-b border-[#E8A5B8]/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="flex items-center gap-1.5 font-medium text-[#F7ADC2]">
              <Sparkles className="w-3.5 h-3.5 text-[#E6CA85]" />
              5.0 ★ (167 Google Reviews)
            </span>
            <span className="hidden md:inline text-white/50">|</span>
            <span className="hidden md:inline text-white/90">
              First Floor, Jewellery World Tower, Veer Surendra Sai Marg, Sambalpur · Closes 9 PM
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs shrink-0">
            <a 
              id="top-bar-whatsapp-link"
              href={createWhatsAppDirectUrl("Hello Concierge! I'd like to check today's appointment availability.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[#FCD2DF] hover:text-white transition-colors"
            >
              <MessageCircle className="w-3 h-3 text-[#25D366]" />
              <span className="hidden sm:inline">WhatsApp Line:</span> {SALON_INFO.phoneDisplay}
            </a>

            {myBookings.length > 0 && (
              <button
                id="top-bar-my-bookings-btn"
                onClick={onOpenMyAppointments}
                className="flex items-center gap-1 text-[#E6CA85] hover:underline cursor-pointer"
              >
                <Bookmark className="w-3 h-3" />
                <span>My Appointments ({myBookings.length})</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Luxury Navigation */}
      <header id="main-header" className="sticky top-0 z-40 bg-[#FFF9FA]/90 backdrop-blur-md border-b border-[#FCD2DF]/70 shadow-xs transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Logo */}
          <button 
            id="brand-logo-btn"
            onClick={() => handleNavClick('home')}
            className="text-left group cursor-pointer focus:outline-none"
          >
            <div className="flex flex-col">
              <span className="font-luxury-serif text-2xl sm:text-3xl tracking-[0.2em] font-semibold text-[#431221] group-hover:text-[#9E1F49] transition-colors">
                SPECTRUM
              </span>
              <span className="text-[10px] sm:text-xs tracking-[0.18em] text-[#C22D5E] uppercase font-light -mt-1 flex items-center gap-1.5">
                <span className="w-3 h-px bg-[#C22D5E]/40 inline-block"></span>
                The Family Salon (by pink makeover)
                <span className="w-3 h-px bg-[#C22D5E]/40 inline-block"></span>
              </span>
            </div>
          </button>

          {/* Desktop Links */}
          <nav id="desktop-nav" className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  id={`nav-link-${link.id}`}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3.5 py-2 text-sm font-medium rounded-full transition-all duration-200 relative cursor-pointer ${
                    isActive
                      ? 'text-[#7E1C3C] bg-[#FFEAF0] shadow-2xs font-semibold'
                      : 'text-[#55142B]/80 hover:text-[#7E1C3C] hover:bg-[#FFF0F4]'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.tag && (
                    <span className="ml-1.5 text-[9px] uppercase px-1.5 py-0.5 rounded-full bg-[#E6CA85]/30 text-[#7E1C3C] font-semibold border border-[#D8B766]/40">
                      {link.tag}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#C22D5E] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* WhatsApp Quick Trigger */}
            <button
              id="nav-whatsapp-trigger-btn"
              onClick={onOpenWhatsApp}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-[#25D366]/40 bg-[#25D366]/10 text-[#0F6F32] hover:bg-[#25D366]/20 transition-colors text-xs font-semibold cursor-pointer"
              title="Instant WhatsApp Concierge Support"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span className="hidden md:inline">WhatsApp Concierge</span>
            </button>

            {/* My Appointments Pill (if exists) */}
            {myBookings.length > 0 && (
              <button
                id="nav-my-bookings-btn"
                onClick={onOpenMyAppointments}
                className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-full border border-[#F7ADC2] bg-white text-[#7E1C3C] text-xs font-medium hover:bg-[#FFEAF0] transition-colors cursor-pointer"
              >
                <Bookmark className="w-3.5 h-3.5 text-[#C22D5E]" />
                <span>Bookings ({myBookings.length})</span>
              </button>
            )}

            {/* Main Booking Button */}
            <button
              id="nav-book-appointment-btn"
              onClick={() => onOpenBooking()}
              className="flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full bg-gradient-to-r from-[#9E1F49] via-[#C22D5E] to-[#DD4C79] text-white text-xs sm:text-sm font-medium shadow-md shadow-[#C22D5E]/20 hover:shadow-lg hover:shadow-[#C22D5E]/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#55142B] hover:bg-[#FFEAF0] lg:hidden cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Menu */}
        {mobileMenuOpen && (
          <div id="mobile-navigation-drawer" className="lg:hidden border-t border-[#FCD2DF] bg-[#FFF5F7] px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top duration-200">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  id={`mobile-nav-link-${link.id}`}
                  onClick={() => handleNavClick(link.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left text-sm font-medium transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#FFEAF0] text-[#7E1C3C] font-semibold border-l-4 border-[#C22D5E]'
                      : 'text-[#431221] hover:bg-[#FFF0F4]'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.tag && (
                    <span className="text-[10px] uppercase px-2 py-0.5 rounded-full bg-[#E6CA85]/30 text-[#7E1C3C] font-bold">
                      {link.tag}
                    </span>
                  )}
                </button>
              );
            })}

            <div className="pt-3 border-t border-[#FCD2DF]/80 space-y-2">
              <button
                id="mobile-whatsapp-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenWhatsApp();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-[#25D366]/40 bg-[#25D366]/10 text-[#0F6F32] font-semibold text-sm cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>WhatsApp VIP Concierge</span>
              </button>

              {myBookings.length > 0 && (
                <button
                  id="mobile-my-bookings-btn"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenMyAppointments();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-[#F7ADC2] bg-white text-[#7E1C3C] font-semibold text-sm cursor-pointer"
                >
                  <Bookmark className="w-4 h-4 text-[#C22D5E]" />
                  <span>My Appointments ({myBookings.length})</span>
                </button>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
};
