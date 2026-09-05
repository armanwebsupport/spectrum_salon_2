import React, { useState } from 'react';
import { PageId, InteriorSpace } from '../types';
import { INTERIOR_SPACES, SALON_INFO } from '../data/salonData';
import { salonSound, createWhatsAppDirectUrl } from '../utils/helpers';
import { 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Check, 
  Maximize2, 
  X, 
  Calendar, 
  MessageCircle,
  Eye,
  Heart
} from 'lucide-react';

interface InteriorViewProps {
  onNavigate: (page: PageId) => void;
  onOpenBooking: () => void;
  onOpenWhatsApp: () => void;
}

export const InteriorView: React.FC<InteriorViewProps> = ({
  onNavigate,
  onOpenBooking,
  onOpenWhatsApp,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activePhotoModal, setActivePhotoModal] = useState<InteriorSpace | null>(null);

  const toggleMusic = () => {
    salonSound.toggleAmbientMusic((playing) => {
      setIsPlayingAudio(playing);
    });
  };

  return (
    <div className="space-y-20 pb-20">
      
      {/* INTERIOR HERO BANNER */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FFEAF0] via-[#FFF5F7] to-[#FFF9FA] border-b border-[#FCD2DF]">
        <div className="max-w-4xl mx-auto text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#FCD2DF] text-xs font-semibold text-[#7E1C3C] tracking-widest uppercase shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#E6CA85]" />
            <span>Architectural Tour · Jewellery World Tower, Sambalpur</span>
          </div>

          <h1 className="font-luxury-serif text-4xl sm:text-6xl font-light text-[#431221] leading-tight">
            The Spectrum Luxury Pink Interior
          </h1>

          <p className="max-w-2xl mx-auto text-xs sm:text-base text-[#55142B]/85 leading-relaxed">
            Conceived as an aesthetic haven in shades of blush, rose quartz, and brushed champagne gold. Explore our viral Korean/Japanese Head Spa suite, family styling floor, acrylic nail bar, and private bridal suite.
          </p>

          {/* Ambient Soundscape Synthesizer Toggle */}
          <div className="pt-2 flex items-center justify-center">
            <button
              onClick={toggleMusic}
              className={`flex items-center gap-2.5 px-5 py-2.5 rounded-full border text-xs font-semibold transition-all cursor-pointer shadow-xs ${
                isPlayingAudio
                  ? 'bg-[#431221] text-[#E6CA85] border-[#E6CA85]'
                  : 'bg-white text-[#7E1C3C] border-[#FCD2DF] hover:bg-[#FFEAF0]'
              }`}
            >
              {isPlayingAudio ? (
                <>
                  <Volume2 className="w-4 h-4 text-[#E6CA85] animate-pulse" />
                  <span>Ambient Sanctuary Sound Playing (Click to Pause)</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4 text-[#C22D5E]" />
                  <span>Listen to Sanctuary Ambience (Web Audio Chimes)</span>
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* ROOM BY ROOM GALLERY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-widest text-[#C22D5E] font-bold">
            Curated Spaces
          </span>
          <h2 className="font-luxury-serif text-3xl sm:text-4xl text-[#431221] font-medium">
            Step Into Each Sanctuary Wing
          </h2>
        </div>

        <div className="space-y-12">
          {INTERIOR_SPACES.map((space, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={space.id}
                className={`bg-white rounded-3xl border border-[#FCD2DF] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 items-center`}
              >
                {/* Image side */}
                <div
                  className={`lg:col-span-7 relative aspect-16/10 lg:aspect-auto lg:h-[400px] overflow-hidden group cursor-pointer ${
                    isEven ? 'lg:order-1' : 'lg:order-2'
                  }`}
                  onClick={() => setActivePhotoModal(space)}
                >
                  <img
                    src={space.image}
                    alt={space.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="p-3 rounded-full bg-white/90 text-[#431221] shadow-lg flex items-center gap-1.5 text-xs font-semibold">
                      <Maximize2 className="w-4 h-4" />
                      Expand Photo
                    </span>
                  </div>

                  <div className="absolute top-4 left-4 bg-[#431221]/80 text-[#E6CA85] text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full backdrop-blur-xs">
                    {space.vibe}
                  </div>
                </div>

                {/* Details side */}
                <div
                  className={`lg:col-span-5 p-6 sm:p-10 space-y-4 ${
                    isEven ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#C22D5E] block">
                    Wing {idx + 1}
                  </span>
                  <h3 className="font-luxury-serif text-2xl sm:text-3xl text-[#431221] font-semibold">
                    {space.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-medium text-[#7E1C3C] italic">
                    {space.subtitle}
                  </p>
                  <p className="text-xs sm:text-sm text-[#55142B]/80 leading-relaxed">
                    {space.description}
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-[#FCD2DF]/70">
                    {space.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-[#431221]">
                        <Sparkles className="w-3.5 h-3.5 text-[#E6CA85] shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 flex items-center gap-3">
                    <button
                      onClick={() => onOpenBooking()}
                      className="px-5 py-2.5 rounded-full bg-[#7E1C3C] text-white text-xs font-semibold hover:bg-[#9E1F49] transition-colors cursor-pointer"
                    >
                      Book a Session in this Wing
                    </button>
                    <button
                      onClick={() => setActivePhotoModal(space)}
                      className="px-4 py-2.5 rounded-full border border-[#FCD2DF] text-xs font-medium text-[#7E1C3C] hover:bg-[#FFEAF0] cursor-pointer"
                    >
                      View Full Resolution
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ARCHITECTURAL MATERIALS HIGHLIGHT */}
      <section className="bg-gradient-to-r from-[#4A1426] via-[#631B33] to-[#4A1426] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#E6CA85] font-bold">
              Materials & Craftsmanship
            </span>
            <h2 className="font-luxury-serif text-3xl sm:text-4xl font-medium">
              Every Touchpoint Considered
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 space-y-2.5">
              <span className="text-[#E6CA85] font-bold text-lg block font-luxury-serif">Italian Blush Velvet</span>
              <p className="text-xs text-[#FCD2DF]/80 leading-relaxed">
                Handcrafted upholstery sourced from Florence, offering ergonomic support during multi-hour bridal transformations and treatments.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 space-y-2.5">
              <span className="text-[#E6CA85] font-bold text-lg block font-luxury-serif">Rose Quartz Crystal Slabs</span>
              <p className="text-xs text-[#FCD2DF]/80 leading-relaxed">
                Genuine Madagascar rose quartz counters infused throughout our esthetics suites, believed to promote serenity and self-love.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 space-y-2.5">
              <span className="text-[#E6CA85] font-bold text-lg block font-luxury-serif">Circadian Vanity Lighting</span>
              <p className="text-xs text-[#FCD2DF]/80 leading-relaxed">
                Custom CRI 98+ museum-grade LED vanities ensuring that hair color tones and makeup look identical under 4K lenses and evening sunlight.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FULL PHOTO MODAL */}
      {activePhotoModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setActivePhotoModal(null)}
        >
          <div
            className="max-w-4xl w-full bg-[#FFF9FA] rounded-3xl overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-16/10">
              <img
                src={activePhotoModal.image}
                alt={activePhotoModal.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setActivePhotoModal(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-luxury-serif text-2xl font-bold text-[#431221]">
                  {activePhotoModal.title}
                </h3>
                <p className="text-xs text-[#7E1C3C]">{activePhotoModal.subtitle}</p>
              </div>

              <button
                onClick={() => {
                  setActivePhotoModal(null);
                  onOpenBooking();
                }}
                className="px-6 py-2.5 rounded-full bg-[#7E1C3C] text-white text-xs font-semibold hover:bg-[#9E1F49] cursor-pointer"
              >
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
