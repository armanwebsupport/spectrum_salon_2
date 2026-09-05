import React, { useState, useEffect } from 'react';
import { 
  CATEGORIES, 
  SERVICES, 
  ARTISANS, 
  TIME_SLOTS, 
  SALON_INFO 
} from '../data/salonData';
import { AppointmentBooking } from '../types';
import { 
  createWhatsAppBookingUrl, 
  saveBookingToStorage 
} from '../utils/helpers';
import confetti from 'canvas-confetti';
import { 
  X, 
  Calendar, 
  Clock, 
  Check, 
  Sparkles, 
  User, 
  Phone, 
  Mail, 
  MessageCircle, 
  GlassWater, 
  Scissors, 
  ChevronRight, 
  ChevronLeft, 
  Copy, 
  CheckCircle2, 
  HeartHandshake,
  Gem,
  Eye,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedServiceId?: string;
  onBookingComplete: (booking: AppointmentBooking) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedServiceId,
  onBookingComplete,
}) => {
  // Wizard steps: 1: Service, 2: Artist, 3: Date/Time, 4: Guest Details, 5: Confirmed + WhatsApp Redirect
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  // Selections
  const [selectedCategory, setSelectedCategory] = useState<string>('head-spa');
  const [selectedServiceId, setSelectedServiceId] = useState<string>('');
  const [selectedStylistId, setSelectedStylistId] = useState<string>('any');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');

  // Guest details
  const [clientName, setClientName] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [champagnePreference, setChampagnePreference] = useState<string>('Signature Rose Sharbat & Petal Mocktail');
  const [specialNotes, setSpecialNotes] = useState<string>('');

  // Completed booking state
  const [completedBooking, setCompletedBooking] = useState<AppointmentBooking | null>(null);
  const [copiedSummary, setCopiedSummary] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  // Initialize preselected service if passed
  useEffect(() => {
    if (preselectedServiceId) {
      const match = SERVICES.find((s) => s.id === preselectedServiceId);
      if (match) {
        setSelectedCategory(match.categoryId);
        setSelectedServiceId(match.id);
        setStep(2); // Jump directly to Artist selection
      }
    } else if (!selectedServiceId && SERVICES.length > 0) {
      // Default to the royal bridal or popular service
      setSelectedServiceId(SERVICES[0].id);
    }
  }, [preselectedServiceId, isOpen]);

  // Generate date choices for the next 14 days
  const availableDates = Array.from({ length: 14 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1); // Starting tomorrow
    return {
      dateString: d.toISOString().split('T')[0],
      dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
      dayNumber: d.getDate(),
      monthName: d.toLocaleDateString('en-US', { month: 'short' }),
    };
  });

  // Selected entities
  const currentService = SERVICES.find((s) => s.id === selectedServiceId) || SERVICES[0];
  const currentStylist = selectedStylistId === 'any'
    ? { id: 'any', name: 'First Available Master Artist', role: 'Senior Salon Specialist' }
    : ARTISANS.find((a) => a.id === selectedStylistId) || { id: 'any', name: 'First Available Master Artist', role: 'Senior Salon Specialist' };

  if (!isOpen) return null;

  // Validation
  const validateStep4 = (): boolean => {
    const errors: { [key: string]: string } = {};
    if (!clientName.trim()) errors.name = 'Please provide your full name.';
    if (!clientPhone.trim() || clientPhone.length < 7) errors.phone = 'Please provide a valid phone or WhatsApp number.';
    if (!clientEmail.trim() || !clientEmail.includes('@')) errors.email = 'Please provide a valid email address.';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCompleteBooking = () => {
    if (!validateStep4()) return;

    const refCode = `SPECTRUM-${Math.floor(1000 + Math.random() * 9000)}`;
    const newBooking: AppointmentBooking = {
      id: `booking-${Date.now()}`,
      serviceId: currentService.id,
      serviceTitle: currentService.title,
      servicePrice: currentService.price,
      serviceCurrency: currentService.currency || '₹',
      categoryName: CATEGORIES.find((c) => c.id === currentService.categoryId)?.name || 'Beauty Treatment',
      stylistId: currentStylist.id,
      stylistName: currentStylist.name,
      date: selectedDate || availableDates[0].dateString,
      timeSlot: selectedTimeSlot || TIME_SLOTS[1],
      clientName: clientName.trim(),
      clientPhone: clientPhone.trim(),
      clientEmail: clientEmail.trim(),
      champagnePreference,
      specialNotes: specialNotes.trim(),
      createdAt: new Date().toISOString(),
      status: 'Pending WhatsApp',
      referenceCode: refCode,
    };

    saveBookingToStorage(newBooking);
    setCompletedBooking(newBooking);
    onBookingComplete(newBooking);
    setStep(5);

    // Trigger luxury rose and gold confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#E6CA85', '#DD4C79', '#FCD2DF', '#9E1F49', '#FFF'],
      });
    } catch {
      // Ignore if confetti blocked
    }
  };

  const handleWhatsAppRedirect = (booking: AppointmentBooking) => {
    const url = createWhatsAppBookingUrl(booking);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCopySummary = () => {
    if (!completedBooking) return;
    const curr = completedBooking.serviceCurrency || '₹';
    const summary = `Spectrum: The Family Salon (by pink makeover)\nBooking Ref: #${completedBooking.referenceCode}\nLocation: 1st Floor, Jewellery World Tower, Sambalpur\nService: ${completedBooking.serviceTitle}\nPrice: ${curr}${completedBooking.servicePrice.toLocaleString('en-IN')}\nDate: ${completedBooking.date} at ${completedBooking.timeSlot}\nStylist: ${completedBooking.stylistName}\nGuest: ${completedBooking.clientName} (${completedBooking.clientPhone})`;
    navigator.clipboard.writeText(summary);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 3000);
  };

  const categoryIcons: { [key: string]: React.ReactNode } = {
    'head-spa': <Sparkles className="w-4 h-4 text-[#E6CA85]" />,
    bridal: <Sparkles className="w-4 h-4" />,
    hair: <Scissors className="w-4 h-4" />,
    braids: <Sparkles className="w-4 h-4" />,
    facials: <HeartHandshake className="w-4 h-4" />,
    nails: <Gem className="w-4 h-4" />,
    'lash-brow': <Eye className="w-4 h-4" />,
  };

  return (
    <div 
      id="booking-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        id="booking-modal-card"
        className="w-full max-w-2xl bg-[#FFF9FA] rounded-3xl border border-[#FCD2DF] shadow-2xl overflow-hidden flex flex-col my-auto max-h-[95vh] text-[#2D1A22] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#4A1426] via-[#631B33] to-[#4A1426] text-white p-5 sm:p-6 relative">
          <button
            id="close-booking-modal-btn"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-xs text-[#E6CA85] uppercase tracking-widest font-semibold mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Online VIP Reservation System</span>
          </div>

          <h2 className="font-luxury-serif text-2xl sm:text-3xl font-medium tracking-wide">
            {step === 5 ? 'Reservation Confirmed' : 'Bespoke Sanctuary Booking'}
          </h2>
          <p className="text-xs sm:text-sm text-[#FCD2DF]/80 mt-1">
            {step === 1 && 'Step 1: Select your haute treatment or couture bridal package'}
            {step === 2 && 'Step 2: Choose your master artisan or colorist'}
            {step === 3 && 'Step 3: Choose your preferred date and private time slot'}
            {step === 4 && 'Step 4: Provide client details & celebratory beverage choice'}
            {step === 5 && 'Instant WhatsApp confirmation ready'}
          </p>

          {/* Stepper pills */}
          {step < 5 && (
            <div className="flex items-center gap-1.5 sm:gap-2 mt-4">
              {[1, 2, 3, 4].map((s) => (
                <div
                  key={s}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    s === step
                      ? 'w-10 bg-[#E6CA85]'
                      : s < step
                      ? 'w-6 bg-[#25D366]'
                      : 'w-4 bg-white/20'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* STEP 1: SERVICE SELECTION */}
          {step === 1 && (
            <div className="space-y-4">
              {/* Category tabs */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      selectedCategory === cat.id
                        ? 'bg-[#7E1C3C] text-white shadow-xs'
                        : 'bg-white border border-[#FCD2DF] text-[#55142B] hover:bg-[#FFEAF0]'
                    }`}
                  >
                    {categoryIcons[cat.id]}
                    <span>{cat.name}</span>
                  </button>
                ))}
              </div>

              {/* Service Cards List */}
              <div className="space-y-3">
                {SERVICES.filter((s) => s.categoryId === selectedCategory).map((service) => {
                  const isSelected = selectedServiceId === service.id;
                  return (
                    <div
                      key={service.id}
                      onClick={() => setSelectedServiceId(service.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer relative ${
                        isSelected
                          ? 'border-[#C22D5E] bg-[#FFEAF0]/80 shadow-md ring-1 ring-[#C22D5E]'
                          : 'border-[#FCD2DF] bg-white hover:border-[#EE7D9F] hover:bg-[#FFF5F7]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="font-semibold text-sm sm:text-base text-[#431221]">
                              {service.title}
                            </h4>
                            {service.popular && (
                              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-[#DD4C79]/15 text-[#9E1F49]">
                                Signature
                              </span>
                            )}
                            {service.vipOnly && (
                              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-[#E6CA85]/30 text-[#7E1C3C] border border-[#D8B766]/40">
                                VIP Suite
                              </span>
                            )}
                          </div>
                          {service.subtitle && (
                            <p className="text-xs text-[#7E1C3C] font-medium italic">
                              {service.subtitle}
                            </p>
                          )}
                          <p className="text-xs text-[#55142B]/80 leading-relaxed pt-1">
                            {service.description}
                          </p>
                          
                          {/* Perks */}
                          <div className="flex flex-wrap gap-1.5 pt-2">
                            {service.perks.slice(0, 2).map((perk, i) => (
                              <span key={i} className="inline-flex items-center gap-1 text-[10px] text-[#7E1C3C] bg-white px-2 py-0.5 rounded-md border border-[#FCD2DF]">
                                <Sparkles className="w-2.5 h-2.5 text-[#E6CA85]" />
                                {perk}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Price & Duration */}
                        <div className="text-right shrink-0">
                          <span className="font-luxury-serif text-xl sm:text-2xl font-bold text-[#7E1C3C] block">
                            {service.currency || '₹'}{service.price.toLocaleString('en-IN')}
                          </span>
                          <span className="text-[11px] text-[#55142B]/70 flex items-center justify-end gap-1 mt-0.5">
                            <Clock className="w-3 h-3 text-[#C22D5E]" />
                            {service.durationMinutes} mins
                          </span>

                          <div className={`mt-3 w-6 h-6 rounded-full border flex items-center justify-center ml-auto ${
                            isSelected ? 'bg-[#C22D5E] border-[#C22D5E] text-white' : 'border-[#FCD2DF] text-transparent'
                          }`}>
                            <Check className="w-3.5 h-3.5" />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: ARTISAN SELECTION */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="bg-white p-3 rounded-xl border border-[#FCD2DF] flex items-center justify-between text-xs">
                <span className="text-[#55142B]">Selected Treatment:</span>
                <span className="font-semibold text-[#7E1C3C]">{currentService.title} (${currentService.price})</span>
              </div>

              <label className="block text-xs font-semibold text-[#7E1C3C] uppercase tracking-wider">
                Select Your Stylist or Aesthetic Director
              </label>

              {/* Any available master artist option */}
              <div
                onClick={() => setSelectedStylistId('any')}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  selectedStylistId === 'any'
                    ? 'border-[#C22D5E] bg-[#FFEAF0] shadow-2xs ring-1 ring-[#C22D5E]'
                    : 'border-[#FCD2DF] bg-white hover:bg-[#FFF5F7]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#7E1C3C] text-[#FDECEF] flex items-center justify-center font-bold text-xs">
                    VIP
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#431221]">First Available Master Artist</h4>
                    <p className="text-xs text-[#55142B]/70">Best for immediate slot matching with our top senior staff</p>
                  </div>
                </div>
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                  selectedStylistId === 'any' ? 'bg-[#C22D5E] border-[#C22D5E] text-white' : 'border-[#FCD2DF]'
                }`}>
                  <Check className="w-3 h-3" />
                </div>
              </div>

              {/* Specific Artisans */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ARTISANS.map((artisan) => {
                  const isSelected = selectedStylistId === artisan.id;
                  return (
                    <div
                      key={artisan.id}
                      onClick={() => setSelectedStylistId(artisan.id)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'border-[#C22D5E] bg-[#FFEAF0] ring-1 ring-[#C22D5E]'
                          : 'border-[#FCD2DF] bg-white hover:bg-[#FFF5F7]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={artisan.avatar}
                          alt={artisan.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-[#E6CA85]"
                        />
                        <div>
                          <h4 className="font-semibold text-xs text-[#431221]">{artisan.name}</h4>
                          <p className="text-[11px] text-[#C22D5E] font-medium leading-tight">{artisan.role}</p>
                          <span className="text-[10px] text-[#55142B]/60 block">{artisan.experience}</span>
                        </div>
                      </div>
                      <div className="pt-2 flex items-center justify-between border-t border-[#FCD2DF]/50 mt-2 text-[10px]">
                        <span className="text-[#A88340] font-semibold flex items-center gap-0.5">
                          ★ {artisan.rating} ({artisan.reviewCount})
                        </span>
                        <span className={`text-[11px] font-semibold ${isSelected ? 'text-[#C22D5E]' : 'text-gray-400'}`}>
                          {isSelected ? 'Selected' : 'Select'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: DATE & TIME SLOT */}
          {step === 3 && (
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-[#7E1C3C] uppercase tracking-wider mb-2">
                  Select Date (Next 14 Days)
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                  {availableDates.map((item) => {
                    const isSelected = selectedDate === item.dateString || (!selectedDate && item === availableDates[0]);
                    return (
                      <button
                        key={item.dateString}
                        onClick={() => setSelectedDate(item.dateString)}
                        className={`p-2.5 rounded-xl border flex flex-col items-center justify-center transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#7E1C3C] text-white border-[#7E1C3C] shadow-sm'
                            : 'bg-white border-[#FCD2DF] text-[#431221] hover:bg-[#FFEAF0]'
                        }`}
                      >
                        <span className="text-[10px] uppercase font-medium opacity-80">{item.dayName}</span>
                        <span className="text-lg font-bold my-0.5">{item.dayNumber}</span>
                        <span className="text-[10px] opacity-70">{item.monthName}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#7E1C3C] uppercase tracking-wider mb-2">
                  Select Private Appointment Time
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {TIME_SLOTS.map((slot) => {
                    const isSelected = selectedTimeSlot === slot || (!selectedTimeSlot && slot === TIME_SLOTS[1]);
                    return (
                      <button
                        key={slot}
                        onClick={() => setSelectedTimeSlot(slot)}
                        className={`py-2.5 px-3 rounded-xl border text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                          isSelected
                            ? 'bg-[#C22D5E] text-white border-[#C22D5E] shadow-sm'
                            : 'bg-white border-[#FCD2DF] text-[#55142B] hover:bg-[#FFEAF0]'
                        }`}
                      >
                        <Clock className="w-3.5 h-3.5" />
                        <span>{slot}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FFF0F4] border border-[#FCD2DF] text-xs text-[#7E1C3C] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#E6CA85] shrink-0" />
                <span>
                  Please arrive 10 minutes before your slot to indulge in your welcome rose beverage & olfactory profile.
                </span>
              </div>
            </div>
          )}

          {/* STEP 4: GUEST & VIP AMENITIES */}
          {step === 4 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold text-[#7E1C3C] uppercase tracking-wider mb-1">
                    Guest Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#C22D5E] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="e.g. Lady Genevieve Stirling"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white border border-[#FCD2DF] text-xs text-[#431221] focus:border-[#C22D5E] focus:outline-none"
                    />
                  </div>
                  {formErrors.name && (
                    <p className="text-[10px] text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {formErrors.name}
                    </p>
                  )}
                </div>

                {/* Phone / WhatsApp */}
                <div>
                  <label className="block text-xs font-semibold text-[#7E1C3C] uppercase tracking-wider mb-1">
                    WhatsApp Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#25D366] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder="e.g. +1 (310) 555-0199"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white border border-[#FCD2DF] text-xs text-[#431221] focus:border-[#C22D5E] focus:outline-none"
                    />
                  </div>
                  {formErrors.phone && (
                    <p className="text-[10px] text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {formErrors.phone}
                    </p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-[#7E1C3C] uppercase tracking-wider mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#C22D5E] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="e.g. genevieve@stirling.com"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white border border-[#FCD2DF] text-xs text-[#431221] focus:border-[#C22D5E] focus:outline-none"
                  />
                </div>
                {formErrors.email && (
                  <p className="text-[10px] text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {formErrors.email}
                  </p>
                )}
              </div>

              {/* Welcome Beverage Choice */}
              <div>
                <label className="block text-xs font-semibold text-[#7E1C3C] uppercase tracking-wider mb-1">
                  Complimentary Welcome Beverage Preference
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    'Signature Rose Sharbat & Petal Mocktail',
                    'Aromatic Kashmiri Kahwa',
                    'Chilled Sparkling Lime Cooler',
                  ].map((bev) => (
                    <button
                      key={bev}
                      type="button"
                      onClick={() => setChampagnePreference(bev)}
                      className={`p-2.5 rounded-xl border text-xs text-left transition-all cursor-pointer flex items-center gap-2 ${
                        champagnePreference === bev
                          ? 'border-[#C22D5E] bg-[#FFEAF0] text-[#7E1C3C] font-semibold'
                          : 'border-[#FCD2DF] bg-white text-[#55142B] hover:bg-[#FFF5F7]'
                      }`}
                    >
                      <GlassWater className="w-3.5 h-3.5 text-[#E6CA85] shrink-0" />
                      <span className="text-[11px] leading-tight">{bev}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Special Notes or Bridal Entourage requests */}
              <div>
                <label className="block text-xs font-semibold text-[#7E1C3C] uppercase tracking-wider mb-1">
                  Special Notes, Hair/Skin Preferences or Wedding Date (Optional)
                </label>
                <textarea
                  rows={2}
                  value={specialNotes}
                  onChange={(e) => setSpecialNotes(e.target.value)}
                  placeholder="e.g. Wedding date, hair length, scalp sensitivity, or private suite request..."
                  className="w-full p-2.5 rounded-xl bg-white border border-[#FCD2DF] text-xs text-[#431221] focus:border-[#C22D5E] focus:outline-none resize-none"
                />
              </div>

              {/* Summary recap */}
              <div className="p-3.5 rounded-2xl bg-white border border-[#FCD2DF] text-xs space-y-1 text-[#55142B]">
                <div className="flex justify-between">
                  <span>Treatment:</span>
                  <strong className="text-[#7E1C3C]">{currentService.title}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Artist:</span>
                  <span className="font-medium">{currentStylist.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Date & Time:</span>
                  <span className="font-medium">{selectedDate || availableDates[0].dateString} at {selectedTimeSlot || TIME_SLOTS[1]}</span>
                </div>
                <div className="flex justify-between border-t border-[#FCD2DF]/60 pt-1 text-sm">
                  <span className="font-bold text-[#431221]">Total Sanctuary Investment:</span>
                  <span className="font-bold text-[#C22D5E]">{currentService.currency || '₹'}{currentService.price.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: BOOKING CONFIRMED & WHATSAPP REDIRECT */}
          {step === 5 && completedBooking && (
            <div className="space-y-6 text-center py-2">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#128C7E] to-[#25D366] text-white flex items-center justify-center mx-auto shadow-xl shadow-[#25D366]/30">
                <Check className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <span className="text-xs uppercase tracking-widest text-[#E6CA85] font-bold">
                  Ref Code: #{completedBooking.referenceCode}
                </span>
                <h3 className="font-luxury-serif text-2xl sm:text-3xl text-[#431221] font-semibold">
                  Your Sanctuary Reservation is Queued!
                </h3>
                <p className="text-xs sm:text-sm text-[#55142B]/80 max-w-md mx-auto">
                  Click the button below to instantly forward your reservation details to our WhatsApp VIP Concierge desk.
                </p>
              </div>

              {/* Booking Ticket Card */}
              <div className="max-w-md mx-auto bg-white rounded-3xl border-2 border-dashed border-[#F7ADC2] p-5 text-left space-y-3 shadow-xs">
                <div className="flex items-center justify-between border-b border-[#FCD2DF] pb-3">
                  <div>
                    <span className="text-[10px] text-[#C22D5E] font-semibold uppercase tracking-wider">
                      Spectrum Sanctuary Ticket
                    </span>
                    <h4 className="font-bold text-sm text-[#431221]">{completedBooking.serviceTitle}</h4>
                  </div>
                  <span className="font-luxury-serif text-xl font-bold text-[#7E1C3C]">
                    {(completedBooking.serviceCurrency || '₹')}{completedBooking.servicePrice.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-[#55142B]">
                  <div>
                    <span className="text-[10px] text-gray-500 block">Artisan</span>
                    <strong className="text-[#431221]">{completedBooking.stylistName}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 block">Date & Time</span>
                    <strong className="text-[#431221]">{completedBooking.date} · {completedBooking.timeSlot}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 block">Guest</span>
                    <strong className="text-[#431221]">{completedBooking.clientName}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 block">Beverage Choice</span>
                    <strong className="text-[#431221] truncate block">{completedBooking.champagnePreference}</strong>
                  </div>
                </div>
              </div>

              {/* High Priority WhatsApp Button */}
              <div className="space-y-2.5 max-w-md mx-auto">
                <button
                  id="confirm-whatsapp-redirect-btn"
                  onClick={() => handleWhatsAppRedirect(completedBooking)}
                  className="w-full flex items-center justify-center gap-2.5 py-4 px-6 rounded-2xl bg-gradient-to-r from-[#128C7E] via-[#25D366] to-[#128C7E] text-white font-bold text-base shadow-xl shadow-[#25D366]/35 hover:brightness-105 active:scale-[0.98] transition-all cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5 text-white" />
                  <span>Confirm & Open in WhatsApp</span>
                </button>

                <p className="text-[11px] text-[#55142B]/70 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#25D366]" />
                  <span>Pre-fills booking details automatically on WhatsApp for rapid confirmation.</span>
                </p>

                <div className="flex items-center justify-center gap-3 pt-2">
                  <button
                    id="copy-booking-summary-btn"
                    onClick={handleCopySummary}
                    className="flex items-center gap-1 text-xs text-[#7E1C3C] hover:underline cursor-pointer"
                  >
                    {copiedSummary ? <CheckCircle2 className="w-3.5 h-3.5 text-[#25D366]" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedSummary ? 'Copied to Clipboard!' : 'Copy Summary'}</span>
                  </button>

                  <span className="text-gray-300">|</span>

                  <button
                    id="booking-done-close-btn"
                    onClick={onClose}
                    className="text-xs text-gray-600 hover:text-gray-900 cursor-pointer font-medium"
                  >
                    Done & Return to Site
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Navigation Footer (Steps 1 to 4) */}
        {step < 5 && (
          <div className="bg-[#FFF0F4] px-5 sm:px-6 py-4 border-t border-[#FCD2DF] flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((step - 1) as 1 | 2 | 3 | 4)}
                className="flex items-center gap-1 text-xs font-semibold text-[#7E1C3C] hover:text-[#431221] cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            <div className="flex items-center gap-3">
              {step < 4 ? (
                <button
                  type="button"
                  id={`booking-next-step-${step}-btn`}
                  onClick={() => {
                    if (step === 1 && !selectedServiceId) {
                      setSelectedServiceId(SERVICES[0].id);
                    }
                    if (step === 3 && !selectedDate) {
                      setSelectedDate(availableDates[0].dateString);
                    }
                    if (step === 3 && !selectedTimeSlot) {
                      setSelectedTimeSlot(TIME_SLOTS[1]);
                    }
                    setStep((step + 1) as 2 | 3 | 4);
                  }}
                  className="flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-[#7E1C3C] text-white text-xs font-semibold hover:bg-[#9E1F49] transition-colors cursor-pointer"
                >
                  <span>Continue</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  id="booking-submit-btn"
                  onClick={handleCompleteBooking}
                  className="flex items-center gap-1.5 px-7 py-3 rounded-full bg-gradient-to-r from-[#9E1F49] via-[#C22D5E] to-[#DD4C79] text-white text-xs font-bold shadow-md shadow-[#C22D5E]/30 hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#E6CA85]" />
                  <span>Reserve & Generate WhatsApp</span>
                </button>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
