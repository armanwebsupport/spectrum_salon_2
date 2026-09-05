import React from 'react';
import { AppointmentBooking } from '../types';
import { createWhatsAppBookingUrl } from '../utils/helpers';
import { 
  X, 
  Bookmark, 
  Calendar, 
  Clock, 
  User, 
  MessageCircle, 
  Trash2, 
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface MyAppointmentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: AppointmentBooking[];
  onRemoveBooking: (id: string) => void;
  onNewBookingClick: () => void;
}

export const MyAppointmentsModal: React.FC<MyAppointmentsModalProps> = ({
  isOpen,
  onClose,
  bookings,
  onRemoveBooking,
  onNewBookingClick,
}) => {
  if (!isOpen) return null;

  return (
    <div
      id="my-appointments-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4"
      onClick={onClose}
    >
      <div
        id="my-appointments-card"
        className="w-full max-w-lg bg-[#FFF9FA] rounded-3xl border border-[#FCD2DF] shadow-2xl overflow-hidden flex flex-col max-h-[85vh] text-[#2D1A22] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#4A1426] via-[#631B33] to-[#4A1426] text-white p-5 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2 text-xs text-[#E6CA85] uppercase tracking-widest font-semibold mb-1">
            <Bookmark className="w-3.5 h-3.5" />
            <span>VIP Client Sanctuary Record</span>
          </div>
          <h3 className="font-luxury-serif text-2xl font-medium">My Scheduled Appointments</h3>
          <p className="text-xs text-[#FCD2DF]/80 mt-0.5">
            View details and re-send to WhatsApp concierge anytime
          </p>
        </div>

        {/* Content list */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          {bookings.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#FFEAF0] text-[#C22D5E] flex items-center justify-center mx-auto">
                <Calendar className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-[#431221]">No scheduled bookings yet</p>
              <p className="text-xs text-[#55142B]/70 max-w-xs mx-auto">
                Indulge in our bespoke bridal, hair, or skin sanctuary treatments today.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onNewBookingClick();
                }}
                className="mt-2 px-5 py-2 rounded-full bg-[#7E1C3C] text-white text-xs font-semibold hover:bg-[#9E1F49] cursor-pointer"
              >
                Book a Treatment Now
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-white rounded-2xl border border-[#FCD2DF] p-4 space-y-3 shadow-2xs relative"
                >
                  <div className="flex items-start justify-between gap-2 border-b border-[#FCD2DF]/60 pb-2.5">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#E6CA85] tracking-wider bg-[#4A1426] px-2 py-0.5 rounded-full">
                        #{booking.referenceCode}
                      </span>
                      <h4 className="font-bold text-sm text-[#431221] mt-1.5">{booking.serviceTitle}</h4>
                      <p className="text-[11px] text-[#7E1C3C]">{booking.categoryName}</p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="font-luxury-serif text-lg font-bold text-[#7E1C3C]">
                        {booking.serviceCurrency || '₹'}{booking.servicePrice.toLocaleString('en-IN')}
                      </span>
                      <button
                        onClick={() => onRemoveBooking(booking.id)}
                        className="block mt-1 text-gray-400 hover:text-red-500 transition-colors p-1 ml-auto cursor-pointer"
                        title="Remove record"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs text-[#55142B]">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#C22D5E]" />
                      <span>{booking.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#C22D5E]" />
                      <span>{booking.timeSlot}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#C22D5E]" />
                      <span className="truncate">{booking.stylistName}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#E6CA85]" />
                      <span className="truncate">{booking.clientName}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-1 flex items-center justify-between gap-2">
                    <span className="text-[10px] text-gray-400">
                      Booked {new Date(booking.createdAt).toLocaleDateString()}
                    </span>

                    <a
                      href={createWhatsAppBookingUrl(booking)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#25D366]/10 text-[#0F6F32] hover:bg-[#25D366]/20 border border-[#25D366]/30 text-xs font-semibold transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                      <span>Open in WhatsApp</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-[#FFF0F4] px-5 py-3 border-t border-[#FCD2DF] flex items-center justify-between">
          <button
            onClick={() => {
              onClose();
              onNewBookingClick();
            }}
            className="text-xs font-semibold text-[#7E1C3C] hover:underline cursor-pointer"
          >
            + Add Another Appointment
          </button>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-full bg-[#4A1426] text-white text-xs font-medium cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
