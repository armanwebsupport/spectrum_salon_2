import React, { useState } from 'react';
import { PageId } from '../types';
import { SALON_INFO } from '../data/salonData';
import { createWhatsAppDirectUrl } from '../utils/helpers';
import { 
  Sparkles, 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  MessageCircle, 
  Calendar, 
  Car, 
  ShieldCheck, 
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Send,
  CheckCircle2
} from 'lucide-react';

interface ContactViewProps {
  onNavigate: (page: PageId) => void;
  onOpenBooking: () => void;
  onOpenWhatsApp: () => void;
}

export const ContactView: React.FC<ContactViewProps> = ({
  onNavigate,
  onOpenBooking,
  onOpenWhatsApp,
}) => {
  // Inquiry form
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Bridal & Wedding Inquiries');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // FAQ accordion
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does the online appointment booking and WhatsApp confirmation work?',
      a: 'You can reserve your preferred treatment, specialist, and private time slot directly on our website. Once selected, our system generates a unique VIP reference code and redirects you straight to WhatsApp with pre-filled details. Our Sambalpur salon concierge desk immediately confirms the slot and details with you.',
    },
    {
      q: 'What complimentary amenities are included with my visit?',
      a: 'All guests are welcomed with our signature chilled Rose Sharbat with rose petals (or hot Kashmiri Kahwa / Lime Cooler) and a personalized diagnostic consultation before treatment begins.',
    },
    {
      q: 'How far in advance should I book my Couture Bridal Makeover?',
      a: 'For peak wedding seasons, we recommend booking your bridal suite date 1 to 4 months in advance. We also offer emergency and short-notice reservations depending on availability.',
    },
    {
      q: 'Is parking available at the salon?',
      a: 'Yes, convenient parking is available at Jewellery World Tower on Veer Surendra Sai Marg for all salon guests.',
    },
    {
      q: 'What is your cancellation and rescheduling policy?',
      a: 'We understand schedules change. We kindly request advance notice if you need to adjust your timing. You can reschedule easily with one tap via our WhatsApp desk.',
    },
  ];

  const handleSendInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const formattedMessage = `🌸 *SPECTRUM VIP INQUIRY* 🌸
Guest Name: ${name.trim()}
Phone: ${phone.trim() || 'N/A'}
Topic: ${subject}
Message: ${message.trim()}

Sent via Spectrum: The Family Salon (by pink makeover) Sambalpur Concierge Portal.`;

    const url = createWhatsAppDirectUrl(formattedMessage);
    window.open(url, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FFEAF0] text-[#7E1C3C] text-xs font-semibold uppercase tracking-wider border border-[#FCD2DF]">
          <Sparkles className="w-3.5 h-3.5 text-[#E6CA85]" />
          VIP Concierge & Sambalpur Location
        </span>
        <h1 className="font-luxury-serif text-3xl sm:text-5xl font-light text-[#431221]">
          We Await Your Arrival
        </h1>
        <p className="text-xs sm:text-sm text-[#55142B]/80 leading-relaxed">
          Located at First Floor, Jewellery World Tower, Veer Surendra Sai Marg, Sakhipara, Sambalpur. Connect directly with our front desk for Korean Head Spa slots, bridal makeover consultations, or styling appointments.
        </p>
      </div>

      {/* 2-Column Info & Form Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Col: Contact Info & Hours */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl border border-[#FCD2DF] p-6 sm:p-8 space-y-6 shadow-xs">
            
            <div>
              <span className="text-[10px] uppercase font-bold text-[#C22D5E] tracking-wider">
                Sanctuary Address
              </span>
              <div className="flex items-start gap-3 mt-2">
                <MapPin className="w-5 h-5 text-[#E6CA85] shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-[#431221]">{SALON_INFO.address}</p>
                  <p className="text-xs text-[#55142B]/70 mt-0.5">First Floor, Jewellery World Tower, Veer Surendra Sai Marg, Sakhipara</p>
                </div>
              </div>
            </div>

            <div className="border-t border-[#FCD2DF]/70 pt-4">
              <span className="text-[10px] uppercase font-bold text-[#C22D5E] tracking-wider">
                Direct Lines & Concierge
              </span>
              <div className="space-y-3 mt-2 text-xs text-[#431221]">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#C22D5E] shrink-0" />
                  <span>{SALON_INFO.phoneDisplay}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                  <a
                    href={createWhatsAppDirectUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0F6F32] font-semibold hover:underline flex items-center gap-1"
                  >
                    <span>Instant WhatsApp VIP Desk</span>
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#E6CA85] shrink-0" />
                  <span>{SALON_INFO.email}</span>
                </div>
              </div>
            </div>

            <div className="border-t border-[#FCD2DF]/70 pt-4">
              <span className="text-[10px] uppercase font-bold text-[#C22D5E] tracking-wider">
                Private Sanctuary Hours
              </span>
              <div className="space-y-2 mt-2 text-xs text-[#55142B]">
                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-[#C22D5E] shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p>{SALON_INFO.openingHours.weekdays}</p>
                    <p>{SALON_INFO.openingHours.sunday}</p>
                    <p className="text-[#A88340] font-semibold">{SALON_INFO.openingHours.monday}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#9E1F49] to-[#C22D5E] text-white text-xs font-semibold hover:brightness-110 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Open Online Booking System</span>
              </button>
            </div>

          </div>

          {/* Parking Info Pill */}
          <div className="bg-[#FFF0F4] rounded-2xl border border-[#FCD2DF] p-4 flex items-center gap-3 text-xs text-[#7E1C3C]">
            <Car className="w-5 h-5 text-[#C22D5E] shrink-0" />
            <div>
              <strong>Parking Notice:</strong> Dedicated customer parking is available at Jewellery World Tower on Veer Surendra Sai Marg for all salon guests.
            </div>
          </div>
        </div>

        {/* Right Col: Instant WhatsApp Inquiry Form */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-3xl border border-[#FCD2DF] p-6 sm:p-8 space-y-6 shadow-xs">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#E6CA85] font-bold bg-[#431221] px-2.5 py-0.5 rounded-full">
                Direct WhatsApp Concierge Dispatch
              </span>
              <h3 className="font-luxury-serif text-2xl font-bold text-[#431221] mt-2">
                Send a Dedicated Inquiry
              </h3>
              <p className="text-xs text-[#55142B]/80 mt-1">
                Fill in your query details below. It will automatically formulate and open in WhatsApp for immediate response from our desk.
              </p>
            </div>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-[#FFEAF0] border border-[#FCD2DF] text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-[#25D366] mx-auto" />
                <h4 className="font-bold text-sm text-[#431221]">Inquiry Formulated & WhatsApp Dispatched</h4>
                <p className="text-xs text-[#55142B]/80 max-w-sm mx-auto">
                  Your details have been forwarded to our Sambalpur desk. If your WhatsApp window didn't open, click the button below:
                </p>
                <a
                  href={createWhatsAppDirectUrl(message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366] text-white text-xs font-semibold hover:brightness-105"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Open WhatsApp Again</span>
                </a>
              </div>
            ) : (
              <form onSubmit={handleSendInquiry} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#7E1C3C] uppercase tracking-wider mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Priya Sharma"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#FCD2DF] text-xs text-[#431221] focus:border-[#C22D5E] focus:outline-none bg-[#FFF9FA]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#7E1C3C] uppercase tracking-wider mb-1">
                      Phone or WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#FCD2DF] text-xs text-[#431221] focus:border-[#C22D5E] focus:outline-none bg-[#FFF9FA]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#7E1C3C] uppercase tracking-wider mb-1">
                    Inquiry Topic
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#FCD2DF] text-xs text-[#431221] focus:border-[#C22D5E] focus:outline-none bg-[#FFF9FA]"
                  >
                    <option value="Korean & Japanese Head Spa Booking">Viral Korean & Japanese Head Spa</option>
                    <option value="Bridal Makeover & Entourage Package">Bridal Makeover & Entourage Package</option>
                    <option value="Hair Cut, Styling & Balayage">Hair Cut, Styling & Balayage</option>
                    <option value="Acrylic Nails & Extension Bar">Acrylic Nails & Extension Bar</option>
                    <option value="Hydra Facial & Skin Whitening Glow">Hydra Facial & Skin Whitening Glow</option>
                    <option value="Reschedule Existing Appointment">Reschedule Existing Appointment</option>
                    <option value="General Salon Questions">General Salon Questions</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#7E1C3C] uppercase tracking-wider mb-1">
                    Your Message or Special Request *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your event, wedding date, preferred date/time, or hair & skin desires..."
                    className="w-full p-3 rounded-xl border border-[#FCD2DF] text-xs text-[#431221] focus:border-[#C22D5E] focus:outline-none bg-[#FFF9FA] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#128C7E] via-[#25D366] to-[#128C7E] text-white font-semibold text-xs sm:text-sm hover:brightness-105 active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md shadow-[#25D366]/20"
                >
                  <MessageCircle className="w-4 h-4 text-white" />
                  <span>Send Message Directly via WhatsApp</span>
                </button>
              </form>
            )}

          </div>
        </div>

      </div>

      {/* FAQ Accordion Section */}
      <div className="bg-white rounded-3xl border border-[#FCD2DF] p-6 sm:p-10 space-y-6 shadow-xs max-w-4xl mx-auto">
        <div className="text-center space-y-1">
          <span className="text-xs uppercase tracking-widest text-[#C22D5E] font-bold">
            Frequently Asked
          </span>
          <h3 className="font-luxury-serif text-2xl sm:text-3xl font-medium text-[#431221]">
            Sanctuary Etiquette & Guidance
          </h3>
        </div>

        <div className="space-y-3 pt-2">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="border border-[#FCD2DF] rounded-2xl overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between gap-3 text-xs sm:text-sm font-semibold text-[#431221] hover:bg-[#FFEAF0]/50 cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-[#C22D5E] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#55142B]/40 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="p-4 pt-0 text-xs text-[#55142B]/80 leading-relaxed border-t border-[#FCD2DF]/50 bg-[#FFF9FA]">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
