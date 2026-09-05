import React from 'react';
import { PageId } from '../types';
import { ARTISANS } from '../data/salonData';
import { createWhatsAppDirectUrl } from '../utils/helpers';
import { 
  Sparkles, 
  Star, 
  Calendar, 
  MessageCircle, 
  Instagram, 
  Award, 
  Heart,
  Scissors
} from 'lucide-react';

interface ArtisansViewProps {
  onNavigate: (page: PageId) => void;
  onOpenBooking: () => void;
  onOpenWhatsApp: () => void;
}

export const ArtisansView: React.FC<ArtisansViewProps> = ({
  onNavigate,
  onOpenBooking,
  onOpenWhatsApp,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FFEAF0] text-[#7E1C3C] text-xs font-semibold uppercase tracking-wider border border-[#FCD2DF]">
          <Award className="w-3.5 h-3.5 text-[#E6CA85]" />
          Master Artisans & Colorists
        </span>
        <h1 className="font-luxury-serif text-3xl sm:text-5xl font-light text-[#431221]">
          The Hands Behind the Haute Transformation
        </h1>
        <p className="text-xs sm:text-sm text-[#55142B]/80 leading-relaxed">
          Trained in master bridal academies and modern aesthetics, our team brings specialized expertise in Korean Head Spa hydrotherapy, bridal makeover couture, family styling, and creative nail artistry directly to you in Sambalpur.
        </p>
      </div>

      {/* Artisans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {ARTISANS.map((artisan) => (
          <div
            key={artisan.id}
            className="bg-white rounded-3xl border border-[#FCD2DF] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row items-center p-6 sm:p-8 gap-6 group"
          >
            {/* Avatar image */}
            <div className="relative shrink-0">
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-3xl overflow-hidden border-2 border-[#E6CA85] shadow-md">
                <img
                  src={artisan.avatar}
                  alt={artisan.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-[#431221] text-[#E6CA85] text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5 shadow-sm">
                <Star className="w-3 h-3 fill-current text-[#E6CA85]" />
                <span>{artisan.rating}</span>
              </div>
            </div>

            {/* Info */}
            <div className="space-y-3 flex-1 text-center sm:text-left">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#C22D5E] tracking-wider">
                  {artisan.experience}
                </span>
                <h3 className="font-luxury-serif text-2xl font-bold text-[#431221] mt-0.5">
                  {artisan.name}
                </h3>
                <p className="text-xs text-[#7E1C3C] font-semibold">{artisan.role}</p>
              </div>

              <p className="text-xs text-[#55142B]/80 leading-relaxed">
                {artisan.bio}
              </p>

              {/* Specialties badges */}
              <div className="flex flex-wrap gap-1.5 justify-center sm:justify-start">
                {artisan.specialties.map((spec, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-medium bg-[#FFEAF0] text-[#7E1C3C] px-2 py-0.5 rounded-md border border-[#FCD2DF]"
                  >
                    {spec}
                  </span>
                ))}
              </div>

              {/* Action buttons */}
              <div className="pt-2 flex items-center gap-3 justify-center sm:justify-start">
                <button
                  onClick={() => onOpenBooking()}
                  className="px-4 py-2 rounded-xl bg-[#7E1C3C] hover:bg-[#9E1F49] text-white text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book with {artisan.name.split(' ')[0]}</span>
                </button>

                <a
                  href={createWhatsAppDirectUrl(`Hello! I would like to consult with ${artisan.name} (${artisan.role}) regarding an appointment.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl border border-[#25D366]/40 text-[#0F6F32] hover:bg-[#25D366]/10 text-xs font-semibold transition-colors"
                  title="Inquire on WhatsApp"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Guest Masterclass Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-[#FFEAF0] via-[#FFF5F7] to-[#FFEAF0] border border-[#FCD2DF] p-8 text-center space-y-4 max-w-4xl mx-auto">
        <Sparkles className="w-8 h-8 text-[#E6CA85] mx-auto" />
        <h3 className="font-luxury-serif text-2xl sm:text-3xl font-medium text-[#431221]">
          Interested in Private Masterclasses & Bridal Pro Certifications?
        </h3>
        <p className="text-xs sm:text-sm text-[#55142B]/80 max-w-xl mx-auto">
          Valentina Rosé and our senior directors offer seasonal 1-on-1 intensive makeup and hair masterclasses for professional artists and brides.
        </p>
        <a
          href={createWhatsAppDirectUrl("Hello! I am interested in inquiring about Pink Makeover masterclasses.")}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#431221] text-white text-xs font-semibold hover:bg-[#631B33] transition-colors"
        >
          <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
          <span>Inquire via WhatsApp</span>
        </a>
      </div>

    </div>
  );
};
