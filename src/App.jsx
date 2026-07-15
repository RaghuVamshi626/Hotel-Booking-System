import React, { useState } from "react";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import AuthModal from "./components/AuthModal";
import HotelCatalog from "./components/HotelCatalog";
import RoomModal from "./components/RoomModal";
import HotelMap from "./components/HotelMap";
import GuestDashboard from "./components/GuestDashboard";
import AdminDashboard from "./components/AdminDashboard";
import AIChatConcierge from "./components/AIChatConcierge";
import { initialHotels } from "./data";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [user, setUser] = useState(null);

  const [hotels, setHotels] = useState(initialHotels);

  const [bookings, setBookings] = useState([
    {
      id: "AH-883921",
      userId: "guest_123",
      hotelId: "resort_bali",
      hotelName: "The Grand Oasis Resort & Spa",
      roomNumber: "101",
      roomType: "Grand Lagoon Villa",
      checkIn: "2026-07-20",
      checkOut: "2026-07-24",
      guests: 2,
      totalAmount: 1280,
      status: "UPCOMING",
      paymentStatus: "PAID",
      addons: ["Organic Breakfast Buffet", "Airport Private Tesla Shuttle"],
    },
    {
      id: "AH-472911",
      userId: "guest_123",
      hotelId: "resort_tokyo",
      hotelName: "The Urban Ritz Sanctuary",
      roomNumber: "4201",
      roomType: "Skyline Deluxe Studio",
      checkIn: "2026-06-12",
      checkOut: "2026-06-15",
      guests: 2,
      totalAmount: 1500,
      status: "COMPLETED",
      paymentStatus: "PAID",
      addons: ["Connoisseur Late Checkout (4 PM)"],
    },
  ]);

  const [currentTab, setCurrentTab] = useState("explore");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  // Search/Hero Input States
  const [searchQuery, setSearchQuery] = useState("");
  const [checkIn, setCheckIn] = useState("2026-07-20");
  const [checkOut, setCheckOut] = useState("2026-07-24");
  const [guestCount, setGuestCount] = useState(2);

  const handleLoginSuccess = (loggedInUser) => {
    setUser(loggedInUser);
    if (loggedInUser.role === "ADMIN") {
      setCurrentTab("admin");
    } else {
      setCurrentTab("explore");
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentTab("explore");
  };

  const handleSearchSubmit = () => {
    // Scroll down to the hotel listings catalog smoothly
    const catalogElement = document.getElementById("stay-catalog");
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSelectRoom = (hotel, room) => {
    setSelectedRoom({ hotel, room });
  };

  const handleBookSuccess = (newBooking) => {
    setBookings((prev) => [newBooking, ...prev]);

    // Update guest loyalty points on success
    if (user && user.role === "GUEST") {
      const ptsToEarn = Math.round(newBooking.totalAmount * 0.1);
      setUser({
        ...user,
        loyaltyPoints: user.loyaltyPoints + ptsToEarn,
        loyaltyTier:
          user.loyaltyPoints + ptsToEarn > 3000 ? "Platinum" : "Gold",
      });
    }

    // Mark the selected room as unavailable in catalog state
    setHotels((prevHotels) =>
      prevHotels.map((h) => {
        if (h.id === newBooking.hotelId) {
          return {
            ...h,
            rooms: h.rooms.map((r) => {
              if (r.number === newBooking.roomNumber) {
                return { ...r, isAvailable: false };
              }
              return r;
            }),
          };
        }
        return h;
      }),
    );
  };

  const handleCancelBooking = (bookingId) => {
    // Retrieve booking details to reinstate room availability
    const bookingToCancel = bookings.find((b) => b.id === bookingId);
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id === bookingId) {
          return { ...b, status: "CANCELLED", paymentStatus: "REFUNDED" };
        }
        return b;
      }),
    );

    if (bookingToCancel) {
      setHotels((prevHotels) =>
        prevHotels.map((h) => {
          if (h.id === bookingToCancel.hotelId) {
            return {
              ...h,
              rooms: h.rooms.map((r) => {
                if (r.number === bookingToCancel.roomNumber) {
                  return { ...r, isAvailable: true };
                }
                return r;
              }),
            };
          }
          return h;
        }),
      );
    }
  };

  const handleAddRoom = (hotelId, newRoom) => {
    setHotels((prev) =>
      prev.map((h) => {
        if (h.id === hotelId) {
          return { ...h, rooms: [...h.rooms, newRoom] };
        }
        return h;
      }),
    );
  };

  const handleDeleteRoom = (hotelId, roomId) => {
    setHotels((prev) =>
      prev.map((h) => {
        if (h.id === hotelId) {
          return { ...h, rooms: h.rooms.filter((r) => r.id !== roomId) };
        }
        return h;
      }),
    );
  };

  const handleUpdateBookingStatus = (bookingId, status) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id === bookingId) {
          return { ...b, status };
        }
        return b;
      }),
    );
  };

  const handleSubmitReview = (bookingId, rating, comment) => {
    const targetBooking = bookings.find((b) => b.id === bookingId);
    if (!targetBooking) return;

    const newReview = {
      id: Math.random().toString(36).substring(2, 9),
      guestName: user?.fullName || "Anonymous",
      rating,
      comment,
      date: new Date().toISOString().split("T")[0],
    };

    setHotels((prevHotels) =>
      prevHotels.map((h) => {
        if (h.id === targetBooking.hotelId) {
          const updatedReviews = [newReview, ...h.reviews];
          const newAvgRating =
            updatedReviews.reduce((sum, r) => sum + r.rating, 0) /
            updatedReviews.length;
          return {
            ...h,
            reviews: updatedReviews,
            rating: parseFloat(newAvgRating.toFixed(2)),
          };
        }
        return h;
      }),
    );
  };

  // Filter hotels listed dynamically by Hero inputs
  const displayedHotels = hotels.filter((h) => {
    const matchesSearch =
      searchQuery === "" ||
      h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  if (!user) {
    return (
      <div className="min-h-screen bg-[#070913] flex items-center justify-center relative p-4 overflow-y-auto selection:bg-amber-100 selection:text-amber-900">
        {/* Ambient background blur circles */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />

        <AuthModal onLoginSuccess={handleLoginSuccess} isGated={true} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 flex flex-col justify-between font-sans selection:bg-amber-100 selection:text-amber-900">
      <div className="w-full">
        {/* Navigation Bar */}
        <Navigation
          user={user}
          onOpenAuth={() => setShowAuthModal(true)}
          onLogout={handleLogout}
          currentTab={currentTab}
          onChangeTab={(tab) => setCurrentTab(tab)}
        />

        {/* Content Tabs */}
        <AnimatePresence mode="wait">
          {currentTab === "explore" && (
            <motion.div
              key="explore"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Hero Banner with Booking Parameters */}
              <Hero
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                checkIn={checkIn}
                onCheckInChange={setCheckIn}
                checkOut={checkOut}
                onCheckOutChange={setCheckOut}
                guestCount={guestCount}
                onGuestCountChange={setGuestCount}
                onSearchSubmit={handleSearchSubmit}
              />

              {/* Real Satellite Coordinate Maps & Sensory Telemetry */}
              <HotelMap hotels={hotels} />

              {/* Hotels Catalog & Listings */}
              <div id="stay-catalog">
                <HotelCatalog
                  hotels={displayedHotels}
                  onSelectRoom={handleSelectRoom}
                />
              </div>
            </motion.div>
          )}

          {currentTab === "bookings" && user && (
            <motion.div
              key="bookings"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <GuestDashboard
                user={user}
                bookings={bookings}
                onCancelBooking={handleCancelBooking}
                onSubmitReview={handleSubmitReview}
              />
            </motion.div>
          )}

          {currentTab === "admin" && user && user.role === "ADMIN" && (
            <motion.div
              key="admin"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <AdminDashboard
                user={user}
                hotels={hotels}
                bookings={bookings}
                onUpdateBookingStatus={handleUpdateBookingStatus}
                onAddRoom={handleAddRoom}
                onDeleteRoom={handleDeleteRoom}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating AI Travel Concierge Assistant */}
      <AIChatConcierge hotels={hotels} />

      {/* Pop-up Modals & Overlays */}
      <AnimatePresence>
        {showAuthModal && (
          <AuthModal
            onClose={() => setShowAuthModal(false)}
            onLoginSuccess={handleLoginSuccess}
          />
        )}

        {selectedRoom && (
          <RoomModal
            hotel={selectedRoom.hotel}
            room={selectedRoom.room}
            user={user}
            onClose={() => setSelectedRoom(null)}
            onBookSuccess={handleBookSuccess}
            onOpenAuth={() => {
              setSelectedRoom(null);
              setShowAuthModal(true);
            }}
            initialCheckIn={checkIn}
            initialCheckOut={checkOut}
          />
        )}
      </AnimatePresence>

      {/* Footer Branding section */}
      <footer className="bg-white border-t border-gray-100 py-8 text-center text-xs text-gray-400 font-light font-display">
        <p>© 2026 Aura Haven Luxury Resort Sanctuaries. All rights reserved.</p>
        <p className="mt-1 font-mono text-[10px] text-gray-300">
          INTELLIGENT RESORT AUTOMATION SUITE
        </p>
      </footer>
    </div>
  );
}
