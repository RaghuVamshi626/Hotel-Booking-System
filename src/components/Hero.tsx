import React from 'react';
import { Search, Calendar, Users, Star } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  checkIn: string;
  onCheckInChange: (val: string) => void;
  checkOut: string;
  onCheckOutChange: (val: string) => void;
  guestCount: number;
  onGuestCountChange: (val: number) => void;
  onSearchSubmit: () => void;
}

export default function Hero({
  searchQuery,
  onSearchChange,
  checkIn,
  onCheckInChange,
  checkOut,
  onCheckOutChange,
  guestCount,
  onGuestCountChange,
  onSearchSubmit,
}: HeroProps) {
  return (
    <div className="relative min-h-[480px] flex items-center justify-center bg-gradient-to-b from-[#070913]/30 via-[#0a0c16]/50 to-[#070913] text-white overflow-hidden py-16 px-4 border-b border-white/5">
      {/* Decorative backdrop details */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-600/5 blur-[120px] rounded-full"></div>

      <div className="relative max-w-4xl w-full text-center space-y-8 z-10">
        {/* Editorial Pill */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-400 text-xs font-semibold tracking-wider uppercase font-mono mx-auto shadow-sm"
        >
          <Star className="w-3.5 h-3.5 fill-amber-400" />
          The Art of Fine Living
        </motion.div>

        {/* Catchy headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-4"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-light tracking-tight leading-tight">
            Crafting Unforgettable <br />
            <span className="font-medium font-display bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-clip-text text-transparent italic">Sanctuaries</span> For Connoisseurs
          </h1>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-300 font-light leading-relaxed">
            Discover a curated collection of ultra-luxurious, state-of-the-art retreats offering bespoke experiences, intuitive automation, and unparalleled warmth.
          </p>
        </motion.div>

        {/* Interactive Search Bar / Panel */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-panel text-slate-100 rounded-2xl md:rounded-full shadow-2xl p-4 md:py-3.5 md:px-7 max-w-3xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Search Input */}
            <div className="md:col-span-4 flex items-center gap-2.5 px-3 border-b md:border-b-0 md:border-r border-white/10 pb-3 md:pb-0">
              <Search className="w-5 h-5 text-amber-400 shrink-0" />
              <div className="text-left w-full">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Destination</label>
                <input
                  type="text"
                  placeholder="Where would you like to stay?"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full text-sm font-medium text-slate-100 placeholder-slate-400 bg-transparent border-none outline-none focus:ring-0 p-0"
                />
              </div>
            </div>

            {/* Check In Date */}
            <div className="md:col-span-3 flex items-center gap-2.5 px-3 border-b md:border-b-0 md:border-r border-white/10 pb-3 md:pb-0">
              <Calendar className="w-5 h-5 text-amber-400 shrink-0" />
              <div className="text-left w-full">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Check In</label>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => onCheckInChange(e.target.value)}
                  className="w-full text-sm font-medium text-slate-100 bg-transparent border-none outline-none focus:ring-0 p-0 [color-scheme:dark]"
                />
              </div>
            </div>

            {/* Check Out Date */}
            <div className="md:col-span-3 flex items-center gap-2.5 px-3 pb-3 md:pb-0">
              <Calendar className="w-5 h-5 text-amber-400 shrink-0" />
              <div className="text-left w-full">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Check Out</label>
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => onCheckOutChange(e.target.value)}
                  className="w-full text-sm font-medium text-slate-100 bg-transparent border-none outline-none focus:ring-0 p-0 [color-scheme:dark]"
                />
              </div>
            </div>

            {/* Guests & Search Button */}
            <div className="md:col-span-2 flex items-center justify-between gap-2.5 pl-3">
              <div className="flex items-center gap-1 text-left">
                <Users className="w-5 h-5 text-amber-400 shrink-0" />
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Guests</label>
                  <select
                    value={guestCount}
                    onChange={(e) => onGuestCountChange(parseInt(e.target.value))}
                    className="text-sm font-medium text-slate-100 bg-transparent border-none outline-none focus:ring-0 p-0 cursor-pointer [color-scheme:dark]"
                  >
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <option key={n} value={n} className="bg-[#0e101f] text-slate-100">
                        {n} {n === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                onClick={onSearchSubmit}
                className="w-11 h-11 bg-gradient-to-br from-amber-500 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-white rounded-full flex items-center justify-center shadow-lg shadow-amber-600/30 transition-all shrink-0 cursor-pointer border border-amber-400/20"
                title="Search Stays"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
