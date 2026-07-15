import React, { useState } from 'react';
import { User, Booking, Review } from '../types';
import { Award, Calendar, CheckCircle2, AlertCircle, Compass, Star, FileText, Send, Trash2, Heart, Coffee, Bed, Music, Sliders, Sparkles, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface GuestDashboardProps {
  user: User;
  bookings: Booking[];
  onCancelBooking: (id: string) => void;
  onSubmitReview: (bookingId: string, rating: number, comment: string) => void;
}

export default function GuestDashboard({
  user,
  bookings,
  onCancelBooking,
  onSubmitReview,
}: GuestDashboardProps) {
  const [reviewBookingId, setReviewBookingId] = useState<string | null>(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState<string | null>(null);

  // Dynamic Room Preferences State
  const [preferredBeverage, setPreferredBeverage] = useState(user.preferredBeverage || 'Champagne');
  const [preferredPillow, setPreferredPillow] = useState(user.preferredPillow || 'Goose Down');
  const [preferredSoundscape, setPreferredSoundscape] = useState(user.preferredSoundscape || 'Sunset Ocean Waves');
  const [syncStatus, setSyncStatus] = useState<'synced' | 'syncing'>('synced');

  const handleUpdatePreference = (type: 'beverage' | 'pillow' | 'soundscape', value: string) => {
    if (type === 'beverage') setPreferredBeverage(value);
    if (type === 'pillow') setPreferredPillow(value);
    if (type === 'soundscape') setPreferredSoundscape(value);

    setSyncStatus('syncing');
    setTimeout(() => {
      setSyncStatus('synced');
    }, 1200);
  };

  const activeBookings = bookings.filter((b) => b.status === 'UPCOMING');
  const pastBookings = bookings.filter((b) => b.status === 'COMPLETED');
  const cancelledBookings = bookings.filter((b) => b.status === 'CANCELLED');

  const getPointsProgress = () => {
    if (user.loyaltyPoints < 1000) return { next: 'Gold', current: 'Silver', progress: (user.loyaltyPoints / 1000) * 100 };
    if (user.loyaltyPoints < 3000) return { next: 'Platinum', current: 'Gold', progress: ((user.loyaltyPoints - 1000) / 2000) * 100 };
    return { next: 'Elite Ambassador', current: 'Platinum', progress: 100 };
  };

  const loyalty = getPointsProgress();

  const handleReviewSubmit = (bookingId: string) => {
    if (!comment) return;
    onSubmitReview(bookingId, rating, comment);
    setReviewSubmitted(bookingId);
    setTimeout(() => {
      setReviewBookingId(null);
      setComment('');
      setReviewSubmitted(null);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Welcome & Loyalty Status block */}
      <div className="glass-panel text-white rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden bg-gradient-to-br from-indigo-950/20 to-amber-950/20">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px]" />
        
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Guest Greeting */}
          <div className="md:col-span-5 space-y-3.5">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-300 text-xs font-semibold font-mono uppercase tracking-wider">
              <Award className="w-4 h-4 text-amber-400 fill-amber-500/20" />
              {user.loyaltyTier} Loyalty Status
            </div>
            <div>
              <h2 className="text-3xl font-display font-light text-slate-100">Welcome back,</h2>
              <h3 className="text-3xl font-display font-bold text-amber-400">{user.fullName}</h3>
            </div>
            <p className="text-xs text-slate-300 font-light leading-relaxed">
              You are recognized as an esteemed Guest. Enjoy automated room controls, early check-in privileges, and premium travel advisor concierge services.
            </p>
          </div>

          {/* Loyalty Tracker */}
          <div className="md:col-span-7 bg-white/5 border border-white/5 rounded-2xl p-6 space-y-4">
            <div className="flex justify-between items-baseline">
              <div>
                <span className="text-[10px] text-amber-300 font-bold uppercase tracking-widest font-mono">REWARD POINTS BALANCES</span>
                <span className="text-3xl font-bold block mt-0.5 font-mono">{user.loyaltyPoints} <span className="text-xs font-normal font-sans text-gray-300">Credits</span></span>
              </div>
              <div className="text-right">
                <span className="text-[9px] text-gray-400 font-bold block font-mono">NEXT TIER LEVEL</span>
                <span className="text-xs font-semibold text-white uppercase tracking-wider">{loyalty.next}</span>
              </div>
            </div>

            {/* Points bar */}
            <div className="space-y-1.5">
              <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-400 h-full rounded-full" style={{ width: `${loyalty.progress}%` }}></div>
              </div>
              <div className="flex justify-between text-[10px] font-semibold text-gray-300 uppercase tracking-wider font-mono">
                <span>{loyalty.current}</span>
                <span>{Math.round(loyalty.progress)}% Tier Progress</span>
                <span>{loyalty.next}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: Active / Upcoming reservations (Takes 2/3 cols) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="border-b border-white/5 pb-3 flex justify-between items-center">
            <h4 className="text-lg font-display font-semibold text-white">Your Upcoming Retreats</h4>
            <span className="px-2.5 py-1.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[11px] font-bold uppercase tracking-wider font-mono rounded-lg">
              {activeBookings.length} Active Stays
            </span>
          </div>

          {activeBookings.length === 0 ? (
            <div className="glass-panel border-dashed border-white/10 rounded-2xl p-10 text-center space-y-3">
              <Compass className="w-10 h-10 text-slate-400 mx-auto animate-pulse" />
              <span className="text-slate-100 font-display font-semibold block">No Bookings Registered</span>
              <p className="text-xs text-slate-400 max-w-xs mx-auto font-light">Explore our curated collections of stays to start earning luxury loyalty rewards.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {activeBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="glass-panel rounded-3xl p-5 shadow-lg flex flex-col sm:flex-row justify-between gap-4 border border-white/5 hover:border-white/10 transition-all"
                >
                  <div className="space-y-3.5">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-xs text-amber-400 font-bold font-mono uppercase tracking-wide">
                        <Calendar className="w-4 h-4 text-amber-400" />
                        {booking.checkIn} — {booking.checkOut}
                      </div>
                      <h5 className="text-lg font-display font-semibold text-white">{booking.hotelName}</h5>
                      <p className="text-xs font-semibold text-slate-300">Suite {booking.roomNumber} ({booking.roomType})</p>
                    </div>

                    {booking.addons.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {booking.addons.map((add, idx) => (
                          <span key={idx} className="bg-amber-500/10 border border-amber-500/25 text-amber-300 text-[10px] px-2 py-0.5 rounded-md font-semibold">
                            {add}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-row sm:flex-col items-start sm:items-end justify-between sm:justify-center gap-4 border-t sm:border-t-0 pt-4 sm:pt-0 border-white/5">
                    <div className="text-left sm:text-right">
                      <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest block font-mono">AUTHORIZED TOTAL</span>
                      <span className="text-lg font-bold text-white font-mono">₹{booking.totalAmount.toLocaleString('en-IN')}</span>
                    </div>

                    <button
                      onClick={() => onCancelBooking(booking.id)}
                      className="px-3.5 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/25 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Cancel Stay
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Past Bookings / Experiences Section */}
          <div className="border-b border-white/5 pb-3 pt-4">
            <h4 className="text-lg font-display font-semibold text-white">Your Historic Escapes</h4>
          </div>

          {pastBookings.length === 0 ? (
            <p className="text-xs text-slate-400 italic">No past reservations recorded.</p>
          ) : (
            <div className="space-y-4">
              {pastBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="glass-panel border-white/5 rounded-3xl p-5 flex flex-col justify-between gap-4 shadow-md"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="space-y-1">
                      <h5 className="text-sm font-display font-semibold text-slate-100">{booking.hotelName}</h5>
                      <p className="text-xs text-slate-400 font-mono">Suite {booking.roomNumber} • Completed Stay</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-green-400 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded-md font-bold font-mono">COMPLETED</span>
                    </div>
                  </div>

                  {/* Write Feedback Trigger */}
                  <div className="flex justify-between items-center border-t border-white/5 pt-3">
                    <span className="text-xs font-mono text-slate-300">Cost: ₹{booking.totalAmount.toLocaleString('en-IN')}</span>
                    <button
                      onClick={() => setReviewBookingId(booking.id)}
                      className="flex items-center gap-1 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-100 text-xs font-semibold rounded-lg transition-all"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      Write Resort Review
                    </button>
                  </div>

                  {/* Expand Review Form */}
                  <AnimatePresence>
                    {reviewBookingId === booking.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-[#0e101f]/80 border border-white/5 rounded-2xl p-5 mt-2 space-y-4 overflow-hidden"
                      >
                        {reviewSubmitted === booking.id ? (
                          <div className="text-center py-4 text-green-400 text-xs font-semibold flex items-center justify-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4" />
                            Review submitted! Thank you for your feedback.
                          </div>
                        ) : (
                          <>
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-semibold text-slate-200">Rate your experience:</span>
                              <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <button
                                    key={star}
                                    type="button"
                                    onClick={() => setRating(star)}
                                    className="p-0.5 text-amber-400 hover:scale-110 transition-transform cursor-pointer"
                                  >
                                    <Star className={`w-4 h-4 ${rating >= star ? 'fill-amber-400' : 'text-white/10'}`} />
                                  </button>
                                ))}
                              </div>
                            </div>

                            <div className="space-y-1.5">
                              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Comment</label>
                              <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Tell us what you loved, or areas of improvement..."
                                className="w-full glass-input focus:ring-0 rounded-xl p-2.5 text-xs h-20"
                              />
                            </div>

                            <button
                              onClick={() => handleReviewSubmit(booking.id)}
                              className="w-full py-2 bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-1 cursor-pointer border border-amber-500/20"
                            >
                              <Send className="w-3.5 h-3.5" />
                              Publish Review
                            </button>
                          </>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Quick info panel (Takes 1/3 col) */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-panel rounded-3xl p-6 shadow-xl space-y-4">
            <h5 className="font-display font-semibold text-sm uppercase tracking-wider text-amber-400 border-b border-white/5 pb-3">
              Bespoke Guest Privileges
            </h5>
            
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-amber-500/10 border border-amber-500/25 rounded-lg flex items-center justify-center shrink-0 text-amber-400">
                  <Award className="w-4.5 h-4.5" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-200 block">Complimentary Late Checkout</span>
                  <p className="text-[10px] text-slate-400 leading-relaxed">Request late departures up to 4 PM on your check-out date.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 bg-amber-500/10 border border-amber-500/25 rounded-lg flex items-center justify-center shrink-0 text-amber-400">
                  <CheckCircle2 className="w-4.5 h-4.5" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-200 block">Room Upgrades Queue</span>
                  <p className="text-[10px] text-slate-400 leading-relaxed">Automatic prioritised placement on our suite upgrade waitlist.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 bg-amber-500/10 border border-amber-500/25 rounded-lg flex items-center justify-center shrink-0 text-amber-400">
                  <Heart className="w-4.5 h-4.5" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-200 block">VIP Amenity Arrival Gift</span>
                  <p className="text-[10px] text-slate-400 leading-relaxed">A custom, gourmet welcome basket delivered to your room.</p>
                </div>
              </div>
            </div>
          </div>

          {/* INTERACTIVE SUITE PREFERENCES & IOT SYNC */}
          <div className="glass-panel rounded-3xl p-6 shadow-xl space-y-4 bg-gradient-to-br from-amber-500/5 via-transparent to-transparent border border-white/5 relative overflow-hidden">
            <div className="absolute top-3 right-3 flex items-center gap-1.5">
              <span className={`w-1.5 h-1.5 rounded-full ${syncStatus === 'synced' ? 'bg-green-500 animate-pulse' : 'bg-amber-500 animate-spin'}`} />
              <span className="text-[9px] font-mono font-bold text-slate-400 uppercase">
                {syncStatus === 'synced' ? 'In-Suite IoT Synced' : 'Syncing IoT...'}
              </span>
            </div>

            <div>
              <h5 className="font-display font-semibold text-sm uppercase tracking-wider text-amber-400">
                Suite Customization
              </h5>
              <p className="text-[10px] text-slate-400 mt-0.5">Configure your automated room's sensory systems live.</p>
            </div>

            <div className="space-y-4 pt-2">
              {/* Beverage Selector */}
              <div className="space-y-1">
                <label className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                  <Coffee className="w-3.5 h-3.5 text-amber-400" /> Arrival Beverage
                </label>
                <select
                  value={preferredBeverage}
                  onChange={(e) => handleUpdatePreference('beverage', e.target.value)}
                  className="w-full bg-[#0a0c16]/50 hover:bg-[#0a0c16]/80 border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500/50 transition-all cursor-pointer font-sans"
                >
                  <option value="Champagne" className="bg-[#0e101f]">Dom Pérignon Champagne</option>
                  <option value="Matcha" className="bg-[#0e101f]">Ceremonial Matcha Green Tea</option>
                  <option value="Ristretto" className="bg-[#0e101f]">Double Shot Ristretto</option>
                </select>
              </div>

              {/* Bedding Pillow Selector */}
              <div className="space-y-1">
                <label className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                  <Bed className="w-3.5 h-3.5 text-amber-400" /> Pillow Selection
                </label>
                <select
                  value={preferredPillow}
                  onChange={(e) => handleUpdatePreference('pillow', e.target.value)}
                  className="w-full bg-[#0a0c16]/50 hover:bg-[#0a0c16]/80 border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500/50 transition-all cursor-pointer font-sans"
                >
                  <option value="Goose Down" className="bg-[#0e101f]">Siberian Goose Down</option>
                  <option value="Lavender" className="bg-[#0e101f]">Lavender-Infused Relax</option>
                  <option value="Memory Foam" className="bg-[#0e101f]">Gel-Cooled Contour Foam</option>
                </select>
              </div>

              {/* Soundscape Selector */}
              <div className="space-y-1">
                <label className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                  <Music className="w-3.5 h-3.5 text-amber-400" /> Sensory Soundscape
                </label>
                <select
                  value={preferredSoundscape}
                  onChange={(e) => handleUpdatePreference('soundscape', e.target.value)}
                  className="w-full bg-[#0a0c16]/50 hover:bg-[#0a0c16]/80 border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500/50 transition-all cursor-pointer font-sans"
                >
                  <option value="Sunset Ocean Waves" className="bg-[#0e101f]">Sunset Ocean Waves</option>
                  <option value="Ambient Rainforest" className="bg-[#0e101f]">Ambient Rainforest</option>
                  <option value="Luxury Rooftop Jazz Lofi" className="bg-[#0e101f]">Luxury Rooftop Jazz Lofi</option>
                </select>
              </div>

              {/* IoT status indicator */}
              <div className="pt-2">
                <div className="p-2.5 bg-amber-500/5 border border-amber-500/10 rounded-xl flex items-start gap-2 text-[10px] text-slate-300 leading-relaxed font-light">
                  <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    Your preferred <strong>{preferredBeverage}</strong>, <strong>{preferredPillow}</strong>, and <strong>{preferredSoundscape}</strong> acoustic track will be prepared by our automation suite immediately when you enter.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Cancelled Bookings history if any */}
          {cancelledBookings.length > 0 && (
            <div className="glass-panel border-white/5 rounded-2xl p-5 space-y-3 shadow-md">
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Cancelled Reservations</span>
              <div className="space-y-2">
                {cancelledBookings.map((b) => (
                  <div key={b.id} className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 line-through truncate max-w-[120px]">{b.hotelName}</span>
                    <span className="text-[9px] text-red-400 bg-red-500/10 border border-red-500/20 px-1.5 py-0.5 rounded-md font-mono">CANCELLED</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
