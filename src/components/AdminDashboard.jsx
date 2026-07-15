import React, { useState } from "react";
import {
  ShieldCheck,
  Plus,
  Check,
  X,
  DollarSign,
  Users,
  BookOpen,
  Trash,
  Percent,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function AdminDashboard({
  user,
  hotels,
  bookings,
  onUpdateBookingStatus,
  onAddRoom,
  onDeleteRoom,
}) {
  const [selectedHotelId, setSelectedHotelId] = useState(hotels[0]?.id || "");
  const [newRoomNumber, setNewRoomNumber] = useState("");
  const [newRoomType, setNewRoomType] = useState("Premium Deluxe");
  const [newRoomPrice, setNewRoomPrice] = useState("");
  const [newRoomCapacity, setNewRoomCapacity] = useState(2);
  const [showAddRoomModal, setShowAddRoomModal] = useState(false);

  const selectedHotel =
    hotels.find((h) => h.id === selectedHotelId) || hotels[0];

  // Calculations for Admin Analytics Metrics
  const totalRevenue = bookings
    .filter((b) => b.status !== "CANCELLED")
    .reduce((sum, b) => sum + b.totalAmount, 0);

  const totalGuests = bookings
    .filter((b) => b.status !== "CANCELLED")
    .reduce((sum, b) => sum + b.guests, 0);

  const occupancyRate = 78.5; // Simulated key KPI
  const activeBookingsCount = bookings.filter(
    (b) => b.status === "UPCOMING",
  ).length;

  const handleCreateRoomSubmit = (e) => {
    e.preventDefault();
    if (!newRoomNumber || !newRoomPrice) return;

    const newRoom = {
      id: Math.random().toString(36).substring(2, 9),
      number: newRoomNumber,
      type: newRoomType,
      description: `A sophisticated, newly refurbished ${newRoomType} space fitted with bespoke lighting, automated environmental controls, and a fully stocked custom minibar.`,
      price: parseFloat(newRoomPrice),
      maxGuests: newRoomCapacity,
      amenities: [
        "High-speed Wifi",
        "Room Service",
        "Smart Controls",
        "Premium View",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=600",
      isAvailable: true,
    };

    onAddRoom(selectedHotel.id, newRoom);
    setNewRoomNumber("");
    setNewRoomPrice("");
    setShowAddRoomModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-3xl font-display font-bold tracking-tight text-white">
              Partner Control Center
            </h2>
            <span className="px-2 py-0.5 bg-amber-500/10 text-amber-400 text-[10px] font-bold tracking-widest font-mono uppercase rounded-md flex items-center gap-1 border border-amber-500/20">
              <ShieldCheck className="w-3.5 h-3.5" />
              Authorized Administrator
            </span>
          </div>
          <p className="text-sm text-slate-400 font-light mt-1">
            Real-time occupancy metrics, automated room inventory controls, and
            user booking approvals.
          </p>
        </div>

        {/* Selected Hotel Manager Toggle */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-400 uppercase font-mono">
            Managing:
          </span>
          <select
            value={selectedHotelId}
            onChange={(e) => setSelectedHotelId(e.target.value)}
            className="glass-input rounded-xl px-3.5 py-2 text-sm font-semibold text-slate-100 outline-none cursor-pointer [color-scheme:dark]"
          >
            {hotels.map((h) => (
              <option
                key={h.id}
                value={h.id}
                className="bg-[#0e101f] text-slate-100"
              >
                {h.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Analytics Bento Grid cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Metric 1 */}
        <div className="glass-panel rounded-3xl p-6 shadow-xl flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block font-mono">
              Total Revenue
            </span>
            <span className="text-3xl font-bold text-white font-mono">
              ₹{totalRevenue.toLocaleString("en-IN")}
            </span>
            <span className="text-[10px] text-green-400 font-bold bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded-md font-mono inline-block mt-1">
              +12.4% MoM
            </span>
          </div>
          <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center text-amber-400 shadow-md">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 2 */}
        <div className="glass-panel rounded-3xl p-6 shadow-xl flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block font-mono">
              Resort Occupancy
            </span>
            <span className="text-3xl font-bold text-white font-mono">
              {occupancyRate}%
            </span>
            <span className="text-[10px] text-green-400 font-bold bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded-md font-mono inline-block mt-1">
              +3.1% over cap
            </span>
          </div>
          <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center text-amber-400 shadow-md">
            <Percent className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 3 */}
        <div className="glass-panel rounded-3xl p-6 shadow-xl flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block font-mono">
              Guests On-Site
            </span>
            <span className="text-3xl font-bold text-white font-mono">
              {totalGuests}
            </span>
            <span className="text-[10px] text-amber-400 font-bold bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md font-mono inline-block mt-1">
              Dynamic VIP rates
            </span>
          </div>
          <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center text-amber-400 shadow-md">
            <Users className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 4 */}
        <div className="glass-panel rounded-3xl p-6 shadow-xl flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block font-mono">
              Active Bookings
            </span>
            <span className="text-3xl font-bold text-white font-mono">
              {activeBookingsCount}
            </span>
            <span className="text-[10px] text-green-400 font-bold bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded-md font-mono inline-block mt-1">
              Synced with Cloud
            </span>
          </div>
          <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center text-amber-400 shadow-md">
            <BookOpen className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Interactive SVG revenue graph analytics */}
      <div className="glass-panel rounded-3xl p-6 shadow-xl space-y-6">
        <div className="flex justify-between items-center border-b border-white/5 pb-4">
          <div>
            <h4 className="text-lg font-display font-semibold text-white">
              Revenue Analytics Insights
            </h4>
            <p className="text-xs text-slate-400 font-light">
              Real-time occupancy and booking conversion rates.
            </p>
          </div>
          <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-1 rounded-md font-mono uppercase">
            WEEKLY DRILLDOWN
          </span>
        </div>

        {/* Bar/Graph Area */}
        <div className="h-64 flex items-end justify-between gap-4 pt-4 relative">
          {/* Background horizontal guide lines */}
          <div className="absolute inset-x-0 bottom-0 border-b border-white/5 h-0 w-full" />
          <div className="absolute inset-x-0 bottom-16 border-b border-white/5 h-0 w-full" />
          <div className="absolute inset-x-0 bottom-32 border-b border-white/5 h-0 w-full" />
          <div className="absolute inset-x-0 bottom-48 border-b border-white/5 h-0 w-full font-mono text-[9px] text-slate-500 text-right pr-2">
            MAX RANGE
          </div>

          {[
            {
              day: "Mon",
              rev: 350000,
              label: "₹3.5L",
              fill: "bg-amber-600/60",
            },
            {
              day: "Tue",
              rev: 510000,
              label: "₹5.1L",
              fill: "bg-amber-500/80",
            },
            {
              day: "Wed",
              rev: 420000,
              label: "₹4.2L",
              fill: "bg-amber-600/70",
            },
            { day: "Thu", rev: 640000, label: "₹6.4L", fill: "bg-amber-500" },
            { day: "Fri", rev: 820000, label: "₹8.2L", fill: "bg-amber-400" },
            { day: "Sat", rev: 980000, label: "₹9.8L", fill: "bg-amber-300" },
            {
              day: "Sun",
              rev: 790000,
              label: "₹7.9L",
              fill: "bg-amber-400/80",
            },
          ].map((bar, index) => {
            const pct = (bar.rev / 1000000) * 100;
            return (
              <div
                key={index}
                className="flex-1 flex flex-col items-center gap-2 group z-10"
              >
                <div className="text-[10px] font-bold text-white font-mono opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 border border-white/10 px-2 py-0.5 rounded-md -mb-4 z-20 shadow-md">
                  {bar.label}
                </div>
                <div className="w-full bg-white/5 hover:bg-white/10 rounded-t-xl h-48 flex items-end overflow-hidden border border-white/5">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${pct}%` }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className={`w-full rounded-t-lg shadow-sm ${bar.fill} group-hover:brightness-95 transition-all`}
                  />
                </div>
                <span className="text-xs font-semibold text-slate-400 font-mono uppercase">
                  {bar.day}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left column: Live Guest Bookings manager Table (Takes 7/12 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="border-b border-white/5 pb-3 flex justify-between items-center">
            <h4 className="text-lg font-display font-semibold text-white">
              Active Guest Bookings
            </h4>
            <span className="px-2.5 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-bold tracking-wider font-mono rounded-lg">
              {bookings.length} Registered
            </span>
          </div>

          {bookings.length === 0 ? (
            <div className="p-8 glass-panel border-dashed rounded-2xl text-center text-xs text-slate-400">
              No reservation data currently synced in system memory.
            </div>
          ) : (
            <div className="glass-panel rounded-3xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-white/5 text-slate-300 font-bold uppercase tracking-wider border-b border-white/5 font-mono">
                      <th className="p-4">Ticket</th>
                      <th className="p-4">Guest</th>
                      <th className="p-4">Dates</th>
                      <th className="p-4">Suite</th>
                      <th className="p-4 text-right">Paid</th>
                      <th className="p-4 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking) => (
                      <tr
                        key={booking.id}
                        className="border-b border-white/5 last:border-b-0 hover:bg-white/5 transition-colors"
                      >
                        <td className="p-4 font-mono font-bold text-white">
                          {booking.id}
                        </td>
                        <td className="p-4 font-semibold text-slate-200">
                          Guest User
                        </td>
                        <td className="p-4 font-mono text-slate-400 text-[11px]">
                          {booking.checkIn}
                        </td>
                        <td className="p-4 text-slate-300 font-medium font-display">
                          Suite {booking.roomNumber}
                        </td>
                        <td className="p-4 text-right font-bold text-white font-mono">
                          ₹{booking.totalAmount.toLocaleString("en-IN")}
                        </td>
                        <td className="p-4">
                          <div className="flex items-center justify-center gap-1.5">
                            {booking.status === "UPCOMING" ? (
                              <div className="flex gap-1">
                                <button
                                  onClick={() =>
                                    onUpdateBookingStatus(
                                      booking.id,
                                      "COMPLETED",
                                    )
                                  }
                                  className="p-1 bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/20 rounded-md cursor-pointer transition-all"
                                  title="Check In Guest"
                                >
                                  <Check className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() =>
                                    onUpdateBookingStatus(
                                      booking.id,
                                      "CANCELLED",
                                    )
                                  }
                                  className="p-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-md cursor-pointer transition-all"
                                  title="Cancel Booking"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ) : (
                              <span
                                className={`px-2 py-0.5 rounded-md text-[9px] font-mono font-bold uppercase tracking-wider border ${
                                  booking.status === "COMPLETED"
                                    ? "bg-green-500/10 text-green-400 border-green-500/20"
                                    : "bg-red-500/10 text-red-400 border-red-500/20"
                                }`}
                              >
                                {booking.status}
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Right column: Interactive Suite Room Inventory Manager (Takes 5/12 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="border-b border-white/5 pb-3 flex justify-between items-center">
            <h4 className="text-lg font-display font-semibold text-white">
              Room Inventory
            </h4>
            <button
              onClick={() => setShowAddRoomModal(true)}
              className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-lg shadow-amber-600/15 border border-amber-500/25 transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Room
            </button>
          </div>

          <div className="glass-panel rounded-3xl p-5 shadow-xl space-y-3.5">
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
              Configured Suites ({selectedHotel.rooms.length})
            </span>

            <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
              {selectedHotel.rooms.map((room) => (
                <div
                  key={room.id}
                  className="p-3 bg-white/5 border border-white/5 rounded-xl flex items-center justify-between hover:border-white/10 transition-all"
                >
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-bold text-amber-400 font-mono">
                      SUITE {room.number}
                    </span>
                    <h5 className="text-xs font-semibold text-slate-100">
                      {room.type}
                    </h5>
                    <span className="text-[10px] text-slate-400 font-mono">
                      ₹{room.price.toLocaleString("en-IN")}/night
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`px-2 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider rounded-md border ${
                        room.isAvailable
                          ? "bg-green-500/10 text-green-400 border-green-500/20"
                          : "bg-red-500/10 text-red-400 border-red-500/20"
                      }`}
                    >
                      {room.isAvailable ? "Active" : "Occupied"}
                    </span>
                    <button
                      onClick={() => onDeleteRoom(selectedHotel.id, room.id)}
                      className="p-1 hover:bg-red-500/10 text-slate-400 hover:text-red-400 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-red-500/20"
                      title="Decommission Room"
                    >
                      <Trash className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Slide-over Add Room Drawer overlay */}
      <AnimatePresence>
        {showAddRoomModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              onClick={() => setShowAddRoomModal(false)}
              className="absolute inset-0 bg-slate-950/75 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative glass-panel-dark max-w-sm w-full rounded-3xl p-6 shadow-2xl border border-white/10 z-10 space-y-4"
            >
              <button
                onClick={() => setShowAddRoomModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1">
                <h4 className="text-lg font-display font-semibold text-white">
                  Provision Suite
                </h4>
                <p className="text-xs text-slate-400 font-light">
                  Add a new room directly into the live booking database.
                </p>
              </div>

              <form onSubmit={handleCreateRoomSubmit} className="space-y-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 font-mono">
                    Room Number
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 504"
                    value={newRoomNumber}
                    onChange={(e) => setNewRoomNumber(e.target.value)}
                    className="w-full glass-input rounded-xl p-2.5 text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 font-mono">
                    Suite Class Type
                  </label>
                  <select
                    value={newRoomType}
                    onChange={(e) => setNewRoomType(e.target.value)}
                    className="w-full glass-input rounded-xl p-2.5 text-xs cursor-pointer [color-scheme:dark]"
                  >
                    <option
                      value="Presidential Penthouse Suite"
                      className="bg-[#0e101f] text-slate-100"
                    >
                      Presidential Penthouse Suite
                    </option>
                    <option
                      value="Grand Lagoon Villa"
                      className="bg-[#0e101f] text-slate-100"
                    >
                      Grand Lagoon Villa
                    </option>
                    <option
                      value="Premium Skyline Terrace"
                      className="bg-[#0e101f] text-slate-100"
                    >
                      Premium Skyline Terrace
                    </option>
                    <option
                      value="Executive Garden Suite"
                      className="bg-[#0e101f] text-slate-100"
                    >
                      Executive Garden Suite
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 font-mono">
                    Nightly Rate (₹ INR)
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 450"
                    value={newRoomPrice}
                    onChange={(e) => setNewRoomPrice(e.target.value)}
                    className="w-full glass-input rounded-xl p-2.5 text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 font-mono">
                    Max Guest Capacity
                  </label>
                  <select
                    value={newRoomCapacity}
                    onChange={(e) =>
                      setNewRoomCapacity(parseInt(e.target.value))
                    }
                    className="w-full glass-input rounded-xl p-2.5 text-xs cursor-pointer [color-scheme:dark]"
                  >
                    {[1, 2, 3, 4, 6].map((n) => (
                      <option
                        key={n}
                        value={n}
                        className="bg-[#0e101f] text-slate-100"
                      >
                        {n} Guest{n > 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold rounded-xl mt-3 cursor-pointer shadow-lg shadow-amber-600/10 border border-amber-500/25 transition-all"
                >
                  Create & Deploy Suite
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
