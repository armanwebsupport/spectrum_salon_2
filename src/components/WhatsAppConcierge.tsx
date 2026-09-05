import React, { useState } from 'react';
import { SALON_INFO, WHATSAPP_PRESETS } from '../data/salonData';
import { createWhatsAppDirectUrl } from '../utils/helpers';
import { 
  MessageCircle, 
  X, 
  Sparkles, 
  Send, 
  Clock, 
  ShieldCheck, 
  ChevronRight,
  User,
  Heart
} from 'lucide-react';

interface WhatsAppConciergeProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export const WhatsAppConcierge: React.FC<WhatsAppConciergeProps> = ({ isOpen, onClose, onOpen }) => {
  const [selectedPresetId, setSelectedPresetId] = useState(WHATSAPP_PRESETS[0].id);
  const [guestName, setGuestName] = useState('');
  const [customQuery, setCustomQuery] = useState('');

  const selectedPreset = WHATSAPP_PRESETS.find((p) => p.id === selectedPresetId) || WHATSAPP_PRESETS[0];

  const handleLaunchWhatsApp = (presetText?: string) => {
    let finalMessage = presetText || customQuery || selectedPreset.defaultMessage;
    if (guestName.trim()) {
      finalMessage = `Hi! My name is ${guestName.trim()}.\n\n` + finalMessage;
    }
    const url = createWhatsAppDirectUrl(finalMessage);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      {/* Floating Pink-Gold WhatsApp Action Pill */}
      <aside
        aria-label="WhatsApp VIP Concierge"
        className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 pointer-events-auto"
      >
        {!isOpen && (
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#FCD2DF] shadow-md text-xs font-medium text-[#7E1C3C] animate-bounce">
              <span className="w-2 h-2 rounded-full bg-[#25D366]" />
              <span>VIP Concierge Online</span>
            </div>
            
            <button
              id="floating-whatsapp-trigger-btn"
              onClick={onOpen}
              className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-[#128C7E] to-[#25D366] text-white shadow-xl shadow-[#25D366]/30 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer border-2 border-white"
              aria-label="Open WhatsApp Concierge"
            >
              <MessageCircle className="w-7 h-7 text-white transition-transform group-hover:rotate-12" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#DD4C79] text-white rounded-full flex items-center justify-center text-[9px] font-bold border border-white">
                1
              </span>
            </button>
          </div>
        )}
      </aside>

      {/* Floating Concierge Modal Drawer */}
      {isOpen && (
        <div 
          id="whatsapp-concierge-modal"
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:justify-end sm:pr-8 sm:pb-8 bg-black/40 backdrop-blur-xs p-3 transition-opacity"
        >
          <div 
            className="w-full max-w-md rounded-3xl bg-[#FFF9FA] border border-[#FCD2DF] shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-in slide-in-from-bottom-5 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header: Haute Pink & Emerald */}
            <div className="bg-gradient-to-r from-[#4A1426] via-[#6B1E38] to-[#4A1426] text-white p-5 relative">
              <button
                id="whatsapp-close-btn"
                onClick={onClose}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
                aria-label="Close concierge"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full border-2 border-[#E6CA85] overflow-hidden bg-[#FFEAF0]">
                    <img
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80"
                      alt="Valentina Rosé - Concierge"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-[#25D366] border-2 border-[#4A1426]" />
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-luxury-serif text-lg font-semibold text-white">
                      Spectrum VIP Concierge
                    </h3>
                    <Sparkles className="w-3.5 h-3.5 text-[#E6CA85]" />
                  </div>
                  <p className="text-xs text-[#FCD2DF]/80 flex items-center gap-1.5">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#25D366]" />
                    Online · Typical response &lt; 5 minutes
                  </p>
                </div>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-5 overflow-y-auto space-y-4 flex-1">
              
              {/* Welcome card */}
              <div className="rounded-2xl bg-white p-3.5 border border-[#FCD2DF]/70 text-xs text-[#55142B] space-y-1.5 shadow-2xs">
                <p className="font-medium text-[#7E1C3C] flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-[#C22D5E] fill-current" />
                  Welcome to Spectrum: The Family Salon (by pink makeover)
                </p>
                <p className="text-[#55142B]/80 leading-relaxed">
                  How may our team assist you today? Select a consultation topic below to open direct WhatsApp messaging with our Sambalpur salon:
                </p>
              </div>

              {/* Guest name optional */}
              <div>
                <label className="block text-[11px] font-semibold text-[#7E1C3C] uppercase tracking-wider mb-1">
                  Your Name (Optional)
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#C22D5E] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="e.g. Eleanor Vance"
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-white text-xs border border-[#FCD2DF] focus:border-[#C22D5E] focus:outline-none"
                  />
                </div>
              </div>

              {/* Consultation Presets */}
              <div className="space-y-2">
                <label className="block text-[11px] font-semibold text-[#7E1C3C] uppercase tracking-wider">
                  Select Consultation Inquiry
                </label>

                <div className="space-y-1.5">
                  {WHATSAPP_PRESETS.map((preset) => {
                    const isSelected = selectedPresetId === preset.id;
                    return (
                      <button
                        key={preset.id}
                        onClick={() => {
                          setSelectedPresetId(preset.id);
                          setCustomQuery(preset.defaultMessage);
                        }}
                        className={`w-full text-left p-3 rounded-xl border transition-all text-xs cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-[#FFEAF0] border-[#C22D5E] text-[#431221] shadow-2xs'
                            : 'bg-white border-[#FCD2DF]/60 text-[#55142B] hover:bg-[#FFF0F4]'
                        }`}
                      >
                        <div className="pr-2">
                          <div className="flex items-center gap-1.5">
                            <span className="font-semibold text-[#7E1C3C]">{preset.title}</span>
                            {preset.badge && (
                              <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-[#25D366]/15 text-[#0F6F32] font-bold">
                                {preset.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-[#55142B]/70 line-clamp-1 mt-0.5">
                            {preset.description}
                          </p>
                        </div>
                        <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${isSelected ? 'text-[#C22D5E] translate-x-0.5' : 'text-[#55142B]/30'}`} />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Message preview or edit */}
              <div>
                <label className="block text-[11px] font-semibold text-[#7E1C3C] uppercase tracking-wider mb-1">
                  Message Preview (Editable)
                </label>
                <textarea
                  rows={3}
                  value={customQuery || selectedPreset.defaultMessage}
                  onChange={(e) => setCustomQuery(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-white text-xs border border-[#FCD2DF] focus:border-[#C22D5E] focus:outline-none text-[#431221] resize-none leading-relaxed"
                />
              </div>

              {/* Direct Launch Button */}
              <button
                id="whatsapp-launch-direct-btn"
                onClick={() => handleLaunchWhatsApp()}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-gradient-to-r from-[#128C7E] via-[#25D366] to-[#128C7E] text-white font-medium text-sm shadow-md shadow-[#25D366]/30 hover:brightness-105 active:scale-[0.98] transition-all cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 text-white" />
                <span>Launch Direct WhatsApp Chat</span>
              </button>

              <div className="pt-1 flex items-center justify-center gap-2 text-[10px] text-[#55142B]/60">
                <ShieldCheck className="w-3.5 h-3.5 text-[#25D366]" />
                <span>Direct to Spectrum Sambalpur Salon Desk · Closes 9:00 PM</span>
              </div>
            </div>

            {/* Footer Direct Call fallback */}
            <div className="bg-[#FFF0F4] px-5 py-3 border-t border-[#FCD2DF] flex items-center justify-between text-xs text-[#7E1C3C]">
              <span>Direct Phone: <strong>{SALON_INFO.phoneDisplay}</strong></span>
              <button
                onClick={onClose}
                className="text-xs text-[#9E1F49] hover:underline font-medium cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
