import React, { useState, useMemo } from 'react';
import { CATEGORIES, SERVICES } from '../data/salonData';
import { SalonService } from '../types';
import { createWhatsAppDirectUrl } from '../utils/helpers';
import { 
  Sparkles, 
  Search, 
  Clock, 
  Check, 
  Calendar, 
  MessageCircle, 
  Scissors, 
  HeartHandshake, 
  Gem, 
  Eye, 
  X,
  Info,
  ChevronRight
} from 'lucide-react';

interface ServicesViewProps {
  onOpenBooking: (serviceId?: string) => void;
  onOpenWhatsApp: () => void;
}

export const ServicesView: React.FC<ServicesViewProps> = ({ onOpenBooking, onOpenWhatsApp }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalService, setActiveModalService] = useState<SalonService | null>(null);

  const filteredServices = useMemo(() => {
    return SERVICES.filter((service) => {
      const matchesCategory = activeCategory === 'all' || service.categoryId === activeCategory;
      const matchesSearch = 
        service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (service.subtitle && service.subtitle.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FFEAF0] text-[#7E1C3C] text-xs font-semibold uppercase tracking-wider border border-[#FCD2DF]">
          <Sparkles className="w-3.5 h-3.5 text-[#E6CA85]" />
          Sambalpur Salon & Spa Menu
        </span>
        <h1 className="font-luxury-serif text-3xl sm:text-5xl font-light text-[#431221]">
          Rituals of Luxury Beauty & Head Spa
        </h1>
        <p className="text-xs sm:text-sm text-[#55142B]/80 leading-relaxed">
          From viral Korean & Japanese Head Spa hydrotherapy to bridal transformations, acrylic nails, and balayage. Transparent pricing and warm hospitality at Jewellery World Tower, Sambalpur.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 scrollbar-none">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-[#7E1C3C] text-white shadow-xs'
                  : 'bg-white border border-[#FCD2DF] text-[#55142B] hover:bg-[#FFEAF0]'
              }`}
            >
              All Rituals ({SERVICES.length})
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#7E1C3C] text-white shadow-xs'
                    : 'bg-white border border-[#FCD2DF] text-[#55142B] hover:bg-[#FFEAF0]'
                }`}
              >
                {categoryIcons[cat.id]}
                <span>{cat.name}</span>
              </button>
            ))}
          </div>

          {/* Search box */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="w-4 h-4 text-[#C22D5E] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search treatments or styling..."
              className="w-full pl-10 pr-4 py-2 rounded-full bg-white border border-[#FCD2DF] text-xs text-[#431221] placeholder:text-[#55142B]/50 focus:outline-none focus:border-[#C22D5E] shadow-2xs"
            />
          </div>
        </div>
      </div>

      {/* Services Grid */}
      {filteredServices.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-[#FCD2DF] p-8 space-y-3">
          <p className="font-semibold text-sm text-[#431221]">No rituals found matching your search.</p>
          <p className="text-xs text-[#55142B]/70">Try searching for "balayage", "bridal", "facial", or "manicure".</p>
          <button
            onClick={() => {
              setActiveCategory('all');
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-full bg-[#FFEAF0] text-[#7E1C3C] text-xs font-semibold hover:bg-[#7E1C3C] hover:text-white transition-colors cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-3xl border border-[#FCD2DF] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-16/10 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 right-3 bg-[#431221]/90 text-[#E6CA85] text-xs font-bold px-3 py-1 rounded-full backdrop-blur-xs">
                    {service.currency || '₹'}{service.price.toLocaleString('en-IN')}
                  </div>
                  {service.popular && (
                    <div className="absolute top-3 left-3 bg-[#C22D5E] text-white text-[9px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                      Signature Ritual
                    </div>
                  )}
                </div>

                <div className="p-5 space-y-2.5">
                  <div className="flex items-center justify-between text-[11px] text-[#55142B]/70">
                    <span className="flex items-center gap-1 font-medium text-[#7E1C3C]">
                      {categoryIcons[service.categoryId]}
                      {CATEGORIES.find((c) => c.id === service.categoryId)?.name}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#C22D5E]" />
                      {service.durationMinutes} mins
                    </span>
                  </div>

                  <h3 className="font-luxury-serif text-xl font-semibold text-[#431221] group-hover:text-[#9E1F49] transition-colors">
                    {service.title}
                  </h3>

                  {service.subtitle && (
                    <p className="text-xs text-[#7E1C3C] font-medium italic">
                      {service.subtitle}
                    </p>
                  )}

                  <p className="text-xs text-[#55142B]/80 leading-relaxed line-clamp-2">
                    {service.description}
                  </p>

                  {/* Perks list */}
                  <div className="space-y-1 pt-1 border-t border-[#FCD2DF]/50">
                    {service.perks.slice(0, 2).map((perk, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-[10px] text-[#55142B]/80">
                        <Check className="w-3 h-3 text-[#25D366] shrink-0" />
                        <span className="truncate">{perk}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-5 pt-0 grid grid-cols-2 gap-2">
                <button
                  onClick={() => setActiveModalService(service)}
                  className="py-2.5 rounded-xl border border-[#FCD2DF] bg-white text-[#7E1C3C] hover:bg-[#FFEAF0] text-xs font-semibold transition-colors cursor-pointer flex items-center justify-center gap-1"
                >
                  <Info className="w-3.5 h-3.5" />
                  <span>Details</span>
                </button>

                <button
                  onClick={() => onOpenBooking(service.id)}
                  className="py-2.5 rounded-xl bg-gradient-to-r from-[#9E1F49] to-[#C22D5E] text-white text-xs font-semibold hover:brightness-110 transition-all cursor-pointer flex items-center justify-center gap-1 shadow-xs"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Now</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* WhatsApp Custom Consult Banner */}
      <div className="rounded-3xl bg-[#FFF0F4] border border-[#FCD2DF] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="font-luxury-serif text-2xl text-[#431221] font-semibold">
            Looking for a Bespoke Package or Group Booking?
          </h3>
          <p className="text-xs sm:text-sm text-[#55142B]/80">
            Our bridal and private salon suites accommodate bespoke arrangements, photoshoots, and celebrity styling teams.
          </p>
        </div>

        <a
          href={createWhatsAppDirectUrl("Hello! I would like to inquire about a custom beauty package at Spectrum by Pink Makeover.")}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 flex items-center gap-2 px-6 py-3 rounded-full bg-[#25D366] text-white font-semibold text-xs sm:text-sm hover:brightness-105 shadow-md shadow-[#25D366]/20 transition-all"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Inquire via WhatsApp</span>
        </a>
      </div>

      {/* Service Detail Modal */}
      {activeModalService && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4"
          onClick={() => setActiveModalService(null)}
        >
          <div
            className="w-full max-w-lg bg-[#FFF9FA] rounded-3xl border border-[#FCD2DF] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-16/9 overflow-hidden">
              <img
                src={activeModalService.image}
                alt={activeModalService.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setActiveModalService(null)}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="absolute bottom-3 left-3 bg-[#431221]/90 text-[#E6CA85] text-xs font-bold px-3 py-1 rounded-full backdrop-blur-xs">
                {(activeModalService.currency || '₹')}{activeModalService.price.toLocaleString('en-IN')}
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <div className="flex items-center gap-2 text-xs text-[#C22D5E] font-semibold mb-1">
                  <span>{CATEGORIES.find((c) => c.id === activeModalService.categoryId)?.name}</span>
                  <span>•</span>
                  <span>{activeModalService.durationMinutes} Minutes</span>
                </div>
                <h3 className="font-luxury-serif text-2xl font-bold text-[#431221]">
                  {activeModalService.title}
                </h3>
                {activeModalService.subtitle && (
                  <p className="text-xs text-[#7E1C3C] italic mt-0.5">{activeModalService.subtitle}</p>
                )}
              </div>

              <p className="text-xs sm:text-sm text-[#55142B]/85 leading-relaxed">
                {activeModalService.description}
              </p>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#7E1C3C] mb-2">
                  What's Included in Your Sanctuary Ritual
                </h4>
                <div className="space-y-1.5">
                  {activeModalService.perks.map((perk, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-[#431221]">
                      <Sparkles className="w-3.5 h-3.5 text-[#E6CA85] shrink-0" />
                      <span>{perk}</span>
                    </div>
                  ))}
                  <div className="flex items-center gap-2 text-xs text-[#431221]">
                    <Sparkles className="w-3.5 h-3.5 text-[#E6CA85] shrink-0" />
                    <span>Complimentary Welcome Refreshment & Scalp Diagnostic Consultation</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={() => {
                    const sid = activeModalService.id;
                    setActiveModalService(null);
                    onOpenBooking(sid);
                  }}
                  className="flex-1 py-3 rounded-full bg-[#7E1C3C] text-white text-xs sm:text-sm font-semibold hover:bg-[#9E1F49] transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book This Ritual</span>
                </button>

                <a
                  href={createWhatsAppDirectUrl(`Hello! I would like to ask some questions about the ${activeModalService.title} (${activeModalService.currency || '₹'}${activeModalService.price.toLocaleString('en-IN')}) treatment.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3 rounded-full border border-[#25D366]/50 bg-[#25D366]/10 text-[#0F6F32] hover:bg-[#25D366]/20 transition-all text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>WhatsApp Q&A</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
