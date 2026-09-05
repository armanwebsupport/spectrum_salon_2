import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageId, AppointmentBooking } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppConcierge } from './components/WhatsAppConcierge';
import { BookingModal } from './components/BookingModal';
import { MyAppointmentsModal } from './components/MyAppointmentsModal';
import { HomeView } from './views/HomeView';
import { ServicesView } from './views/ServicesView';
import { BridalView } from './views/BridalView';
import { InteriorView } from './views/InteriorView';
import { ArtisansView } from './views/ArtisansView';
import { ContactView } from './views/ContactView';
import { getStoredBookings, removeBookingFromStorage } from './utils/helpers';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [preselectedServiceId, setPreselectedServiceId] = useState<string | undefined>(undefined);
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
  const [isMyAppointmentsOpen, setIsMyAppointmentsOpen] = useState(false);
  const [myBookings, setMyBookings] = useState<AppointmentBooking[]>([]);

  // Load bookings from storage on mount
  useEffect(() => {
    setMyBookings(getStoredBookings());
  }, []);

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenBooking = (serviceId?: string) => {
    setPreselectedServiceId(serviceId);
    setIsBookingModalOpen(true);
  };

  const handleBookingComplete = (newBooking: AppointmentBooking) => {
    setMyBookings((prev) => [newBooking, ...prev.filter((b) => b.id !== newBooking.id)]);
  };

  const handleRemoveBooking = (id: string) => {
    removeBookingFromStorage(id);
    setMyBookings((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF9FA] text-[#2D1A22] selection:bg-[#FCD2DF] selection:text-[#55142B]">
      {/* Luxury Sticky Navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenBooking={handleOpenBooking}
        onOpenWhatsApp={() => setIsWhatsAppOpen(true)}
        onOpenMyAppointments={() => setIsMyAppointmentsOpen(true)}
        myBookings={myBookings}
      />

      {/* Main Multi-Page Content with Luxury Subtle Fade Transition */}
      <main className="flex-1 overflow-x-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            {currentPage === 'home' && (
              <HomeView
                onNavigate={handleNavigate}
                onOpenBooking={handleOpenBooking}
                onOpenWhatsApp={() => setIsWhatsAppOpen(true)}
              />
            )}

            {currentPage === 'services' && (
              <ServicesView
                onOpenBooking={handleOpenBooking}
                onOpenWhatsApp={() => setIsWhatsAppOpen(true)}
              />
            )}

            {currentPage === 'bridal' && (
              <BridalView
                onNavigate={handleNavigate}
                onOpenBooking={handleOpenBooking}
                onOpenWhatsApp={() => setIsWhatsAppOpen(true)}
              />
            )}

            {currentPage === 'interior' && (
              <InteriorView
                onNavigate={handleNavigate}
                onOpenBooking={() => handleOpenBooking()}
                onOpenWhatsApp={() => setIsWhatsAppOpen(true)}
              />
            )}

            {currentPage === 'artisans' && (
              <ArtisansView
                onNavigate={handleNavigate}
                onOpenBooking={() => handleOpenBooking()}
                onOpenWhatsApp={() => setIsWhatsAppOpen(true)}
              />
            )}

            {currentPage === 'contact' && (
              <ContactView
                onNavigate={handleNavigate}
                onOpenBooking={() => handleOpenBooking()}
                onOpenWhatsApp={() => setIsWhatsAppOpen(true)}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Haute Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenBooking={() => handleOpenBooking()}
        onOpenWhatsApp={() => setIsWhatsAppOpen(true)}
      />

      {/* Floating & Modal WhatsApp VIP Concierge */}
      <WhatsAppConcierge
        isOpen={isWhatsAppOpen}
        onClose={() => setIsWhatsAppOpen(false)}
        onOpen={() => setIsWhatsAppOpen(true)}
      />

      {/* Integrated Multi-Step Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => {
          setIsBookingModalOpen(false);
          setPreselectedServiceId(undefined);
        }}
        preselectedServiceId={preselectedServiceId}
        onBookingComplete={handleBookingComplete}
      />

      {/* My Appointments Drawer / Modal */}
      <MyAppointmentsModal
        isOpen={isMyAppointmentsOpen}
        onClose={() => setIsMyAppointmentsOpen(false)}
        bookings={myBookings}
        onRemoveBooking={handleRemoveBooking}
        onNewBookingClick={() => handleOpenBooking()}
      />
    </div>
  );
}
