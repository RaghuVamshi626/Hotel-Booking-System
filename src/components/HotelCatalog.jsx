import React, { useState } from "react";
import {
  Star,
  MapPin,
  Coffee,
  Wifi,
  Dumbbell,
  Sparkles,
  SlidersHorizontal,
  ChevronRight,
} from "lucide-react";

export default function HotelCatalog({ hotels, onSelectRoom }) {
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [minRating, setMinRating] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [selectedAmenity, setSelectedAmenity] = useState("All");

  // Gather unique amenities for filter drop-down
  const allAmenities = [
    "All",
    "Spa",
    "Pool",
    "Fitness Center",
    "Michelin Restaurant",
    "Valet Parking",
    "Private Beach",
  ];

  // Apply Catalog Filters
  const filteredHotels = hotels.filter((hotel) => {
    const matchesRating = hotel.rating >= minRating;
    const matchesPrice = hotel.basePrice <= maxPrice;
    const matchesAmenity =
      selectedAmenity === "All" || hotel.amenities.includes(selectedAmenity);
    return matchesRating && matchesPrice && matchesAmenity;
  });

  const getAmenityIcon = (name) => {
    switch (name.toLowerCase()) {
      case "breakfast":
      case "michelin restaurant":
        return <Coffee className="w-3.5 h-3.5 text-amber-400" />;
      case "free wifi":
      case "high-speed wifi":
        return <Wifi className="w-3.5 h-3.5 text-amber-400" />;
      case "fitness center":
      case "gym":
        return <Dumbbell className="w-3.5 h-3.5 text-amber-400" />;
      default:
        return <Sparkles className="w-3.5 h-3.5 text-amber-400" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Search Header / Breadcrumbs */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-display font-bold tracking-tight text-white">
            {selectedHotel ? selectedHotel.name : "Curated Luxury Collections"}
          </h2>
          <p className="text-sm text-slate-400 font-light mt-1">
            {selectedHotel
              ? `Exploring premium room offerings and bespoke spaces in ${selectedHotel.location}`
              : "Immersive stays, customizable options, and dynamic loyalty integrations."}
          </p>
        </div>

        {selectedHotel && (
          <button
            onClick={() => setSelectedHotel(null)}
            className="px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-slate-100 text-sm font-display rounded-xl transition-all cursor-pointer"
          >
            ← Back to All Hotels
          </button>
        )}
      </div>

      {!selectedHotel ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Side Filters */}
          <div className="lg:col-span-1 glass-panel rounded-2xl p-6 shadow-xl space-y-6 h-fit sticky top-24">
            <div className="flex items-center gap-2 text-amber-400 border-b border-white/5 pb-3">
              <SlidersHorizontal className="w-4.5 h-4.5" />
              <span className="font-display font-medium text-sm uppercase tracking-wider">
                Refine Escapes
              </span>
            </div>

            {/* Price Filter */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider">
                <span>Max Base Price</span>
                <span className="text-amber-400 font-mono">
                  ₹{maxPrice.toLocaleString("en-IN")}
                </span>
              </div>
              <input
                type="range"
                min="10000"
                max="100000"
                step="5000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                className="w-full accent-amber-500 bg-white/10 rounded-lg cursor-pointer h-1.5"
              />
            </div>

            {/* Rating Filter */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                Minimum Rating
              </label>
              <div className="flex gap-1.5">
                {[0, 4, 4.5, 4.8].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => setMinRating(rating)}
                    className={`flex-1 py-1.5 border text-xs font-medium rounded-lg transition-all cursor-pointer ${
                      minRating === rating
                        ? "bg-amber-600 border-amber-500 text-white shadow-lg shadow-amber-500/20"
                        : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
                    }`}
                  >
                    {rating === 0 ? "Any" : `${rating}★`}
                  </button>
                ))}
              </div>
            </div>

            {/* Amenity Filter */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                Essential Amenity
              </label>
              <div className="flex flex-wrap gap-1.5">
                {allAmenities.map((amenity) => (
                  <button
                    key={amenity}
                    onClick={() => setSelectedAmenity(amenity)}
                    className={`px-2.5 py-1.5 border text-[11px] font-semibold rounded-lg transition-all cursor-pointer ${
                      selectedAmenity === amenity
                        ? "bg-amber-600 border-amber-500 text-white shadow-lg shadow-amber-500/20"
                        : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
                    }`}
                  >
                    {amenity}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Hotel Grid List */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredHotels.length === 0 ? (
              <div className="col-span-full bg-amber-500/5 border border-dashed border-amber-500/25 rounded-2xl p-12 text-center">
                <span className="text-amber-400 font-display font-medium text-lg">
                  No Sanctuaries Match Filters
                </span>
                <p className="text-sm text-slate-400 font-light mt-1">
                  Try expanding your price cap or rating parameters.
                </p>
              </div>
            ) : (
              filteredHotels.map((hotel) => (
                <div
                  key={hotel.id}
                  className="group glass-panel rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:border-white/15 transition-all flex flex-col h-full"
                >
                  {/* Photo Container */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={hotel.imageUrl}
                      alt={hotel.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    <div className="absolute top-3 right-3 bg-slate-950/75 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span className="text-xs font-semibold text-slate-100">
                        {hotel.rating.toFixed(1)}
                      </span>
                    </div>
                  </div>

                  {/* Info Section */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center text-amber-400 text-xs font-semibold gap-1 font-mono uppercase tracking-wide">
                        <MapPin className="w-3.5 h-3.5" />
                        {hotel.location}
                      </div>
                      <h3 className="text-xl font-display font-medium text-slate-100 group-hover:text-amber-300 transition-colors">
                        {hotel.name}
                      </h3>
                      <p className="text-xs text-slate-400 font-light line-clamp-2">
                        {hotel.description}
                      </p>
                    </div>

                    {/* Features Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {hotel.amenities.slice(0, 3).map((amenity, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-500/10 border border-amber-500/20 rounded-lg text-amber-300 text-[10px] font-semibold"
                        >
                          {getAmenityIcon(amenity)}
                          {amenity}
                        </span>
                      ))}
                    </div>

                    {/* Booking Prompt */}
                    <div className="border-t border-white/5 pt-4 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block font-mono">
                          From
                        </span>
                        <span className="text-lg font-bold text-white font-mono">
                          ₹{hotel.basePrice.toLocaleString("en-IN")}
                          <span className="text-xs font-normal text-slate-400 font-sans">
                            {" "}
                            / night
                          </span>
                        </span>
                      </div>

                      <button
                        onClick={() => setSelectedHotel(hotel)}
                        className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-br from-amber-500 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-white text-xs font-display font-medium tracking-wide rounded-xl shadow-lg shadow-amber-600/15 transition-all cursor-pointer border border-amber-400/20"
                      >
                        Explore Rooms
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      ) : (
        /* Rooms view inside selected hotel */
        <div className="space-y-8">
          {/* Selected Hotel Overview Block */}
          <div className="glass-panel rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8 items-center shadow-xl">
            <div className="w-full md:w-1/3 h-56 rounded-2xl overflow-hidden shadow-lg border border-white/5">
              <img
                src={selectedHotel.imageUrl}
                alt={selectedHotel.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full md:w-2/3 space-y-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-1 text-amber-400 text-xs font-bold font-mono uppercase tracking-wider">
                  <MapPin className="w-4 h-4" />
                  {selectedHotel.location}
                </div>
                <h3 className="text-2xl md:text-3xl font-display font-semibold text-white">
                  {selectedHotel.name}
                </h3>
                <div className="flex items-center gap-1.5">
                  <div className="flex text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-slate-300">
                    ({selectedHotel.rating.toFixed(1)} Guest Rating)
                  </span>
                </div>
              </div>
              <p className="text-sm text-slate-300 font-light leading-relaxed">
                {selectedHotel.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {selectedHotel.amenities.map((amenity, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/5 text-xs font-medium text-slate-200 rounded-xl shadow-xs"
                  >
                    {getAmenityIcon(amenity)}
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <h4 className="text-xl font-display font-semibold text-white border-b border-white/5 pb-3">
            Select Your Preferred Luxury Suite
          </h4>

          {/* Rooms Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {selectedHotel.rooms.map((room) => (
              <div
                key={room.id}
                className="glass-panel rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:border-white/15 transition-all flex flex-col"
              >
                {/* Room Photo */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={room.imageUrl}
                    alt={room.type}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />

                  {!room.isAvailable && (
                    <div className="absolute inset-0 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center">
                      <span className="px-4 py-1.5 bg-red-600/90 border border-red-500/30 text-white text-xs font-bold uppercase tracking-wider rounded-lg">
                        Fully Booked
                      </span>
                    </div>
                  )}
                  <div className="absolute bottom-3 left-3 bg-slate-950/75 backdrop-blur-md px-2.5 py-1 rounded-lg text-white text-[10px] font-semibold tracking-wider font-mono">
                    SUITE {room.number}
                  </div>
                </div>

                {/* Room Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start gap-2">
                      <h5 className="text-lg font-display font-semibold text-white leading-tight">
                        {room.type}
                      </h5>
                      <span className="text-xs font-semibold text-amber-300 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md font-mono">
                        Max {room.maxGuests} Guests
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 font-light leading-relaxed line-clamp-3">
                      {room.description}
                    </p>
                  </div>

                  {/* Room Amenities */}
                  <div className="flex flex-wrap gap-1">
                    {room.amenities.map((am, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-medium bg-white/5 text-slate-300 border border-white/5 px-2 py-0.5 rounded-md"
                      >
                        {am}
                      </span>
                    ))}
                  </div>

                  {/* Reservation Action */}
                  <div className="border-t border-white/5 pt-4 flex items-center justify-between">
                    <div>
                      <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block font-mono">
                        Per Night
                      </span>
                      <span className="text-lg font-bold text-white font-mono">
                        ₹{room.price.toLocaleString("en-IN")}
                      </span>
                    </div>

                    <button
                      onClick={() => onSelectRoom(selectedHotel, room)}
                      disabled={!room.isAvailable}
                      className={`px-4 py-2 text-xs font-display font-semibold rounded-xl tracking-wide transition-all cursor-pointer ${
                        room.isAvailable
                          ? "bg-gradient-to-br from-amber-500 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-white shadow-lg shadow-amber-600/15 border border-amber-400/20"
                          : "bg-white/5 text-slate-500 cursor-not-allowed border border-white/5"
                      }`}
                    >
                      {room.isAvailable ? "Reserve Suite" : "Unavailable"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
