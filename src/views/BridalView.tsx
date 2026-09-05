import React from 'react';
import { PageId } from '../types';
import { SERVICES } from '../data/salonData';
import { createWhatsAppDirectUrl } from '../utils/helpers';
import { 
  Sparkles, 
  Crown, 
  Heart, 
  Calendar, 
  MessageCircle, 
  Check, 
  ShieldCheck, 
  ArrowRight,
  GlassWater,
  Star,
  Users
} from 'lucide-react';

interface BridalViewProps {
  onNavigate: (page: PageId) => void;
  onOpenBooking: (serviceId?: string) => void;
  onOpenWhatsApp: () => void;
}

export const BridalView: React.FC<BridalViewProps> = ({
  onNavigate,
  onOpenBooking,
  onOpenWhatsApp,
}) => {
  const bridalServices = SERVICES.filter((s) => s.categoryId === 'bridal');

  const bridalSteps = [
    {
      num: '01',
      title: 'Haute Bridal Consultation',
      description: 'Private 1-on-1 meeting with Pink Makeover bridal specialists to review wedding attire fabrics, lehenga color, veil placement, jewelry, and skin undertones.',
    },
    {
      num: '02',
      title: 'The Trial & Look Finalization',
      description: 'A comprehensive session testing makeup radiance, HD airbrush matching, and hairstyle draping to ensure long-lasting elegance throughout rituals.',
    },
    {
      num: '03',
      title: 'Pre-Wedding Skin & Scalp Spa',
      description: 'Days before the wedding: our signature hydra facial, Korean scalp detox, and hair spa ensuring your natural canvas is luminous, bouncy, and hydrated.',
    },
    {
      num: '04',
      title: 'The Royal Wedding Day',
      description: 'Unwind in our pink aesthetic bridal suite with your family and bridesmaids, enjoying welcoming refreshments and complete dedicated attention.',
    },
  ];

  return (
    <div className="space-y-20 pb-20 overflow-hidden">
      
      {/* BRIDAL HERO BANNER */}
      <section className="relative min-h-[70vh] flex items-center justify-center pt-10 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FFEAF0] via-[#FFF5F7] to-[#FFF9FA] border-b border-[#FCD2DF]">
        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#E6CA85]/60 text-xs font-semibold text-[#7E1C3C] tracking-widest uppercase shadow-xs">
            <Crown className="w-3.5 h-3.5 text-[#E6CA85]" />
            <span>The Royal Bridal & Couture Makeover Lounge · Sambalpur</span>
          </div>

          <h1 className="font-luxury-serif text-4xl sm:text-6xl font-light text-[#431221] leading-tight">
            An Unforgettable Vision on Your <br />
            <span className="italic font-medium text-[#C22D5E]">Most Cherished Day</span>
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-[#55142B]/85 leading-relaxed font-light">
            Step into our private Sambalpur bridal sanctuary at Jewellery World Tower. Draped in blush velvet and gold accents, our master bridal artists craft ethereal, tear-resistant wedding glamour.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onOpenBooking('serv-bridal-royal')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-[#9E1F49] via-[#C22D5E] to-[#DD4C79] text-white font-medium text-xs sm:text-sm shadow-lg shadow-[#C22D5E]/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Reserve Bridal Experience</span>
            </button>

            <a
              href={createWhatsAppDirectUrl("🌸 Hello Spectrum Bridal Concierge! I would like to inquire about wedding date availability and private bridal suite reservation.")}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full border border-[#25D366]/40 bg-white hover:bg-[#25D366]/10 text-[#0F6F32] font-semibold text-xs sm:text-sm shadow-xs transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>WhatsApp Bridal Concierge</span>
            </a>
          </div>
        </div>
      </section>

      {/* BRIDAL SUITE HIGHLIGHT STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center bg-white rounded-3xl border border-[#FCD2DF] p-6 sm:p-10 shadow-xs">
          <div className="relative rounded-2xl overflow-hidden aspect-4/3 shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80"
              alt="Private Velvet Bridal Suite"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#431221]/80 via-transparent to-transparent p-5 flex flex-col justify-end text-white">
              <span className="text-[10px] uppercase font-bold text-[#E6CA85] tracking-wider">Sambalpur Sanctuary Wing</span>
              <h3 className="font-luxury-serif text-xl font-medium">The Royal Bridal Parlour</h3>
            </div>
          </div>

          <div className="space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#C22D5E] font-bold">
              Private En-Suite Amenities
            </span>
            <h2 className="font-luxury-serif text-3xl sm:text-4xl text-[#431221] font-medium">
              A Private Haven Just for You & Your Family
            </h2>
            <p className="text-xs sm:text-sm text-[#55142B]/80 leading-relaxed">
              No shared salon chaos. On your wedding day, our dedicated private bridal parlour is reserved entirely for you and your entourage.
            </p>

            <div className="space-y-2.5 pt-2">
              <div className="flex items-start gap-2.5 text-xs text-[#431221]">
                <Sparkles className="w-4 h-4 text-[#E6CA85] shrink-0 mt-0.5" />
                <span><strong>Three-Way Gilded Vanity Mirrors</strong> with professional daylight and evening illumination.</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-[#431221]">
                <Sparkles className="w-4 h-4 text-[#E6CA85] shrink-0 mt-0.5" />
                <span><strong>Complimentary Hospitality Bar:</strong> Fresh rose sharbat, signature hot beverages, and confectionery.</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-[#431221]">
                <Sparkles className="w-4 h-4 text-[#E6CA85] shrink-0 mt-0.5" />
                <span><strong>Full Dressing & Draping Studio:</strong> Steaming service, jewelry mounting assistance, and dupatta/saree structural setting.</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onNavigate('interior')}
                className="text-xs font-semibold text-[#7E1C3C] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Take a Virtual Tour of the Bridal Suite</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4-STEP BRIDAL TIMELINE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-widest text-[#C22D5E] font-bold">
            The Haute Process
          </span>
          <h2 className="font-luxury-serif text-3xl sm:text-4xl text-[#431221] font-medium">
            Your Bespoke Bridal Journey
          </h2>
          <p className="text-xs sm:text-sm text-[#55142B]/80">
            Engineered precision, stress-free luxury, and radiant photographic perfection.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {bridalSteps.map((step) => (
            <div
              key={step.num}
              className="bg-white rounded-3xl border border-[#FCD2DF] p-6 space-y-3 shadow-2xs relative group hover:border-[#C22D5E] transition-all"
            >
              <span className="font-luxury-serif text-4xl font-light text-[#F7ADC2] group-hover:text-[#C22D5E] transition-colors block">
                {step.num}
              </span>
              <h3 className="font-luxury-serif text-lg font-semibold text-[#431221]">
                {step.title}
              </h3>
              <p className="text-xs text-[#55142B]/80 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* BRIDAL PACKAGES PRICING CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-widest text-[#E6CA85] font-bold bg-[#431221] px-3 py-1 rounded-full">
            VIP Tiered Curations
          </span>
          <h2 className="font-luxury-serif text-3xl sm:text-4xl text-[#431221] font-medium">
            Bridal Packages & Investment
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {bridalServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-3xl border border-[#FCD2DF] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-16/10 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-[#431221]/90 text-[#E6CA85] text-xs font-bold px-3 py-1 rounded-full backdrop-blur-xs">
                    {service.currency || '₹'}{service.price.toLocaleString('en-IN')}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="font-luxury-serif text-xl font-bold text-[#431221]">
                    {service.title}
                  </h3>
                  {service.subtitle && (
                    <p className="text-xs text-[#7E1C3C] italic font-medium">{service.subtitle}</p>
                  )}
                  <p className="text-xs text-[#55142B]/80 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="pt-2 border-t border-[#FCD2DF]/60 space-y-1.5">
                    {service.perks.map((perk, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-[#431221]">
                        <Check className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
                        <span>{perk}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 space-y-2">
                <button
                  onClick={() => onOpenBooking(service.id)}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#9E1F49] to-[#C22D5E] text-white text-xs font-semibold hover:brightness-110 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Reserve Package</span>
                </button>

                <a
                  href={createWhatsAppDirectUrl(`Hello Spectrum! I am inquiring about the ${service.title} (${service.currency || '₹'}${service.price.toLocaleString('en-IN')}) bridal package.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl border border-[#25D366]/40 text-[#0F6F32] hover:bg-[#25D366]/10 text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                  <span>WhatsApp Inquiries</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DESTINATION WEDDING CALLOUT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#431221] text-white p-8 sm:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <span className="text-xs uppercase tracking-widest text-[#E6CA85] font-bold">
              Sambalpur · Jharsuguda · Rourkela · Bhubaneswar & All-India
            </span>
            <h3 className="font-luxury-serif text-3xl font-medium">
              Destination & On-Location Bridal Glamour
            </h3>
            <p className="text-xs sm:text-sm text-[#FCD2DF]/80 leading-relaxed">
              Our dedicated bridal team travels throughout Odisha and across India for palace weddings, destination resorts, and multi-day celebrations. Inquire for bespoke travel packages.
            </p>
          </div>

          <a
            href={createWhatsAppDirectUrl("🌸 Hello Pink Makeover & Spectrum Concierge! I would like to inquire about destination/on-location bridal bookings.")}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-8 py-4 rounded-full bg-[#E6CA85] text-[#431221] font-bold text-xs sm:text-sm hover:brightness-110 transition-all shadow-lg flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4 text-[#431221]" />
            <span>Consult for Destination Wedding</span>
          </a>
        </div>
      </section>

    </div>
  );
};
