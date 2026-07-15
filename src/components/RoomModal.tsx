import React, { useState, useEffect } from 'react';
import { Hotel, Room, Booking, User } from '../types';
import { X, Calendar, Star, ShieldCheck, Sparkles, Plus, Check, CreditCard, Clock, Coffee, Truck, Wine, QrCode, Smartphone, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface RoomModalProps {
  hotel: Hotel;
  room: Room;
  user: User | null;
  onClose: () => void;
  onBookSuccess: (booking: Booking) => void;
  onOpenAuth: () => void;
  initialCheckIn: string;
  initialCheckOut: string;
}

export default function RoomModal({
  hotel,
  room,
  user,
  onClose,
  onBookSuccess,
  onOpenAuth,
  initialCheckIn,
  initialCheckOut,
}: RoomModalProps) {
  const [checkIn, setCheckIn] = useState(initialCheckIn || '2026-07-20');
  const [checkOut, setCheckOut] = useState(initialCheckOut || '2026-07-24');
  const [guests, setGuests] = useState(1);
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [addons, setAddons] = useState<string[]>([]);
  const [step, setStep] = useState<'DETAILS' | 'PAYMENT' | 'SUCCESS'>('DETAILS');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedBooking, setGeneratedBooking] = useState<Booking | null>(null);

  // UPI Innovative Checkout States
  const [paymentMethod, setPaymentMethod] = useState<'CARD' | 'UPI'>('UPI');
  const [upiTimer, setUpiTimer] = useState(300);
  const [isUpiVerifying, setIsUpiVerifying] = useState(false);
  const [upiStep, setUpiStep] = useState<string>('');

  useEffect(() => {
    let interval: any = null;
    if (step === 'PAYMENT' && paymentMethod === 'UPI' && upiTimer > 0) {
      interval = setInterval(() => {
        setUpiTimer((prev) => (prev > 1 ? prev - 1 : 300));
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [step, paymentMethod, upiTimer]);

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleUpiPaymentConfirm = () => {
    if (!user) return;
    setIsUpiVerifying(true);
    setUpiStep('Establishing gateway handshake with UPI node...');
    
    setTimeout(() => {
      setUpiStep('Pushing billing telemetry to 9182347763@ybl...');
      
      setTimeout(() => {
        setUpiStep('Awaiting secure customer approval signature...');
        
        setTimeout(() => {
          setUpiStep('Authorized! Generating elite resort reservation keys...');
          
          setTimeout(() => {
            const newBooking: Booking = {
              id: 'AH-' + Math.floor(100000 + Math.random() * 900000),
              userId: user.id,
              hotelId: hotel.id,
              hotelName: hotel.name,
              roomNumber: room.number,
              roomType: room.type,
              checkIn,
              checkOut,
              guests,
              totalAmount: total,
              status: 'UPCOMING',
              paymentStatus: 'PAID',
              addons: addons.map((a) => luxuryAddons.find((la) => la.id === a)?.name || a),
            };
            setGeneratedBooking(newBooking);
            setStep('SUCCESS');
            onBookSuccess(newBooking);
            setIsUpiVerifying(false);
          }, 1200);
        }, 1200);
      }, 1200);
    }, 1200);
  };

  // Available luxurious add-ons
  const luxuryAddons = [
    { id: 'breakfast', name: 'Organic Breakfast Buffet', price: 2500, type: 'per_day', icon: <Coffee className="w-4 h-4 text-amber-700" /> },
    { id: 'spa', name: 'Couples Wellness Spa Package', price: 9500, type: 'per_stay', icon: <Wine className="w-4 h-4 text-amber-700" /> },
    { id: 'shuttle', name: 'Airport Private Tesla Shuttle', price: 6000, type: 'per_stay', icon: <Truck className="w-4 h-4 text-amber-700" /> },
    { id: 'late_checkout', name: 'Connoisseur Late Checkout (4 PM)', price: 4000, type: 'per_stay', icon: <Clock className="w-4 h-4 text-amber-700" /> },
  ];

  // Calculate Duration
  const getDays = () => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diff = end.getTime() - start.getTime();
    if (isNaN(diff) || diff <= 0) return 1;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const days = getDays();

  // Calculate Total Cost
  const calculateTotal = () => {
    let base = room.price * days;
    addons.forEach((addonId) => {
      const ad = luxuryAddons.find((a) => a.id === addonId);
      if (ad) {
        base += ad.type === 'per_day' ? ad.price * days : ad.price;
      }
    });
    return base;
  };

  const total = calculateTotal();
  const loyaltyPointsEarned = Math.round(total * 0.1);

  const toggleAddon = (id: string) => {
    if (addons.includes(id)) {
      setAddons(addons.filter((a) => a !== id));
    } else {
      setAddons([...addons, id]);
    }
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      onOpenAuth();
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const newBooking: Booking = {
        id: 'AH-' + Math.floor(100000 + Math.random() * 900000),
        userId: user.id,
        hotelId: hotel.id,
        hotelName: hotel.name,
        roomNumber: room.number,
        roomType: room.type,
        checkIn,
        checkOut,
        guests,
        totalAmount: total,
        status: 'UPCOMING',
        paymentStatus: 'PAID',
        addons: addons.map((a) => luxuryAddons.find((la) => la.id === a)?.name || a),
      };
      setGeneratedBooking(newBooking);
      setStep('SUCCESS');
      onBookSuccess(newBooking);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Background Backdrop */}
      <div onClick={onClose} className="absolute inset-0 bg-slate-950/75 backdrop-blur-md" />

      {/* Main Container */}
      <div className="relative glass-panel-dark max-w-4xl w-full rounded-3xl shadow-2xl border border-white/10 overflow-hidden z-10 grid grid-cols-1 md:grid-cols-12 max-h-[90vh] overflow-y-auto">
        {/* Left Side Info Panel / Receipt (Takes 5/12 cols) */}
        <div className="md:col-span-5 bg-amber-950/40 text-amber-200 p-6 flex flex-col justify-between relative overflow-hidden border-b md:border-b-0 md:border-r border-white/5">
          <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px]" />
          
          <div className="space-y-6 relative z-10">
            {/* Header branding */}
            <div className="flex items-center gap-1.5 pb-4 border-b border-white/5">
              <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
              <span className="font-display font-bold tracking-wider text-xs text-white">RESERVATION SUMMARY</span>
            </div>

            {/* Stay details summary */}
            <div className="space-y-4">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400 font-mono">SANCTUARY</span>
                <h4 className="text-lg font-display text-white font-semibold">{hotel.name}</h4>
                <p className="text-xs font-light text-slate-300">{hotel.location}</p>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400 font-mono">SELECTED SPACE</span>
                <h5 className="text-sm font-semibold text-white mt-0.5">{room.type}</h5>
                <p className="text-xs font-light text-slate-300">Suite {room.number} • Max {room.maxGuests} guests</p>
              </div>

              {/* Price Calculation Break-down */}
              <div className="border-t border-white/5 pt-4 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-300 font-light">{room.type} ({days} nights)</span>
                  <span className="font-mono text-white">₹{(room.price * days).toLocaleString('en-IN')}</span>
                </div>

                {addons.length > 0 && (
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider font-mono">ADD-ONS</span>
                    {addons.map((addonId) => {
                      const ad = luxuryAddons.find((a) => a.id === addonId);
                      if (ad) {
                        return (
                          <div key={addonId} className="flex justify-between pl-2 border-l border-amber-500/20 text-[11px]">
                            <span className="text-slate-400">{ad.name}</span>
                            <span className="font-mono text-white">
                              +₹{(ad.type === 'per_day' ? ad.price * days : ad.price).toLocaleString('en-IN')}
                            </span>
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Pricing Bottom Container */}
          <div className="border-t border-white/5 pt-4 mt-6 space-y-3 relative z-10 text-xs">
            {user && (
              <div className="flex justify-between text-amber-400 text-[11px] font-semibold bg-white/5 px-2.5 py-1.5 rounded-lg border border-white/5">
                <span>Loyalty Credits to Earn:</span>
                <span className="font-mono">+{loyaltyPointsEarned} pts</span>
              </div>
            )}
            <div className="flex justify-between items-baseline pt-1">
              <span className="text-sm font-medium text-white">Total Amount</span>
              <span className="text-3xl font-bold text-amber-400 font-mono">₹{total.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

        {/* Right Side Form Panel (Takes 7/12 cols) */}
        <div className="md:col-span-7 p-6 relative flex flex-col justify-between">
          {/* Header Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 hover:bg-white/5 rounded-lg text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Form Steps */}
          <AnimatePresence mode="wait">
            {step === 'DETAILS' && (
              <motion.div
                key="details"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                className="space-y-5"
              >
                <div>
                  <h3 className="text-xl font-display font-semibold text-white">Customise Stay Parameters</h3>
                  <p className="text-xs text-slate-400 font-light mt-0.5">Select check-in dates, guest counters, and bespoke resort amenities.</p>
                </div>

                {/* Stay Dates Pickers */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 font-mono">CHECK IN</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-2.5 w-4.5 h-4.5 text-amber-400" />
                      <input
                        type="date"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-sm glass-input rounded-xl outline-none [color-scheme:dark]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 font-mono">CHECK OUT</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-2.5 w-4.5 h-4.5 text-amber-400" />
                      <input
                        type="date"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-sm glass-input rounded-xl outline-none [color-scheme:dark]"
                      />
                    </div>
                  </div>
                </div>

                {/* Guest select */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 font-mono">TOTAL GUESTS</label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value))}
                    className="w-full glass-input rounded-xl p-2.5 text-sm outline-none cursor-pointer [color-scheme:dark]"
                  >
                    {Array.from({ length: room.maxGuests }).map((_, i) => (
                      <option key={i + 1} value={i + 1} className="bg-[#0e101f] text-slate-100">
                        {i + 1} Guest{i > 0 ? 's' : ''}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Bespoke Resort Add-ons list */}
                <div className="space-y-3.5">
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Bespoke Guest Privileges</span>
                  <div className="space-y-2">
                    {luxuryAddons.map((addon) => {
                      const isSelected = addons.includes(addon.id);
                      return (
                        <button
                          key={addon.id}
                          onClick={() => toggleAddon(addon.id)}
                          className={`w-full p-3 border rounded-xl flex items-center justify-between text-left transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-amber-500/10 border-amber-500/25 shadow-md'
                              : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-amber-500/10 rounded-lg">
                              {React.cloneElement(addon.icon, { className: 'w-4 h-4 text-amber-400' })}
                            </div>
                            <div>
                              <span className="text-xs font-semibold text-slate-100 block">{addon.name}</span>
                              <span className="text-[10px] text-slate-400 font-light">Bespoke amenity enhancement</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-amber-400 font-mono">
                              +₹{addon.price.toLocaleString('en-IN')}
                              <span className="text-[9px] font-normal text-slate-400">
                                {addon.type === 'per_day' ? '/day' : '/stay'}
                              </span>
                            </span>
                            <div className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                              isSelected ? 'bg-amber-500 border-amber-500 text-white' : 'border-white/10 bg-[#131525]'
                            }`}>
                              {isSelected && <Check className="w-3.5 h-3.5" />}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (!user) {
                      onOpenAuth();
                    } else {
                      setStep('PAYMENT');
                    }
                  }}
                  className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-white text-xs font-display font-semibold tracking-wider rounded-xl shadow-lg shadow-amber-600/15 border border-amber-500/25 transition-all mt-4 cursor-pointer"
                >
                  {user ? 'Proceed to Secure Payment' : 'Guest Sign In to Complete Booking'}
                </button>
              </motion.div>
            )}

            {step === 'PAYMENT' && (
              <motion.div
                key="payment"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-xl font-display font-semibold text-white">Secure Sanctuary Checkout</h3>
                  <p className="text-xs text-slate-400 font-light mt-0.5">Your bespoke luxury stay is guaranteed via sandbox secure channels.</p>
                </div>

                {/* Switcher tabs */}
                <div className="grid grid-cols-2 gap-2 p-1 bg-[#0a0c16]/80 rounded-xl border border-white/5">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('UPI')}
                    className={`py-2 px-3 rounded-lg text-xs font-semibold font-display tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      paymentMethod === 'UPI'
                        ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-white shadow-md shadow-amber-600/15'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                    }`}
                  >
                    <QrCode className="w-3.5 h-3.5" />
                    UPI Fast QR
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('CARD')}
                    className={`py-2 px-3 rounded-lg text-xs font-semibold font-display tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      paymentMethod === 'CARD'
                        ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-white shadow-md shadow-amber-600/15'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                    }`}
                  >
                    <CreditCard className="w-3.5 h-3.5" />
                    Aura Elite Card
                  </button>
                </div>

                {paymentMethod === 'UPI' ? (
                  <div className="space-y-5">
                    {/* UPI QR Code Container */}
                    <div className="relative glass-panel bg-amber-500/5 rounded-2xl p-6 border border-white/5 flex flex-col items-center justify-center overflow-hidden">
                      {/* Scanning laser effect styles */}
                      <style>{`
                        @keyframes qrscan {
                          0%, 100% { top: 8%; opacity: 0.2; }
                          50% { top: 92%; opacity: 1; }
                        }
                      `}</style>
                      
                      {/* Scanning border corners */}
                      <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-amber-400" />
                      <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-amber-400" />
                      <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-amber-400" />
                      <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-amber-400" />

                      <div className="relative p-4 bg-white rounded-2xl shadow-2xl flex items-center justify-center">
                        {/* Real dynamic scannable UPI QR code using standard protocol and free high-reliability generator */}
                        <img 
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(`upi://pay?pa=9182347763@ybl&pn=Aura%20Haven%20Resort&am=${Math.round(total)}&cu=INR`)}`}
                          alt="Real Scan QR Code 9182347763@ybl"
                          className="w-32 h-32 select-none"
                          referrerPolicy="no-referrer"
                        />

                        {/* Scan Line Overlay */}
                        <div 
                          className="absolute left-4 right-4 h-[2px] bg-amber-500 shadow-[0_0_8px_#f59e0b] pointer-events-none animate-pulse"
                          style={{ animation: 'qrscan 3s ease-in-out infinite' }}
                        />
                      </div>

                      {/* Display pricing equivalence */}
                      <div className="mt-4 text-center space-y-1">
                        <span className="text-[10px] font-mono font-bold tracking-widest text-amber-400 block">TOTAL AUTHORIZED AMOUNT</span>
                        <div className="flex items-center justify-center gap-2">
                          <span className="text-2xl font-bold text-white font-mono">₹{total.toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                    </div>

                    {/* VPA and timing details */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/5 border border-white/5 rounded-xl p-3 text-center space-y-0.5">
                        <span className="text-[9px] font-mono font-bold text-slate-400 block uppercase">UPI ID</span>
                        <span className="text-xs font-bold text-amber-400 font-mono tracking-wider select-all">9182347763@ybl</span>
                      </div>
                      <div className="bg-white/5 border border-white/5 rounded-xl p-3 text-center space-y-0.5">
                        <span className="text-[9px] font-mono font-bold text-slate-400 block uppercase">Session Expires</span>
                        <div className="text-xs font-bold text-slate-200 font-mono tracking-wide flex items-center justify-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                          {formatTimer(upiTimer)}
                        </div>
                      </div>
                    </div>

                    {/* Instruction Box */}
                    <div className="p-3 bg-white/5 border border-white/5 rounded-xl flex gap-2.5 items-start text-xs font-light text-slate-300 leading-relaxed">
                      <Smartphone className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-slate-100 block">Fast Automated Booking Gate</span>
                        Scan this QR code using PhonePe, Google Pay, Paytm, or any BHIM UPI mobile application. Once completed inside your banking client, confirm payment execution below.
                      </div>
                    </div>

                    {/* Simulation console status panel */}
                    {isUpiVerifying && (
                      <div className="bg-black/40 border border-amber-500/20 rounded-xl p-3 font-mono text-[10px] text-amber-400/90 space-y-1 bg-gradient-to-br from-amber-500/[0.02] to-transparent">
                        <div className="flex items-center gap-2">
                          <RefreshCw className="w-3 h-3 text-amber-500 animate-spin" />
                          <span className="font-bold text-slate-200 uppercase">Handshake Telemetry Monitor</span>
                        </div>
                        <p className="text-[11px] font-light mt-1 text-slate-300">{upiStep}</p>
                      </div>
                    )}

                    {/* Checkout CTA */}
                    <div className="flex gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setStep('DETAILS')}
                        className="flex-1 py-3 bg-white/5 border border-white/5 text-slate-300 hover:bg-white/10 text-xs font-display font-semibold tracking-wide rounded-xl transition-all cursor-pointer"
                      >
                        Change Add-ons
                      </button>
                      <button
                        type="button"
                        disabled={isUpiVerifying}
                        onClick={handleUpiPaymentConfirm}
                        className="flex-1 py-3 bg-amber-600 hover:bg-amber-500 text-white text-xs font-display font-semibold tracking-wider rounded-xl shadow-lg shadow-amber-600/15 border border-amber-500/25 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        {isUpiVerifying ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Syncing UPI Node...
                          </>
                        ) : (
                          'Verify & Complete Booking'
                        )}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6 animate-fadeIn">
                    {/* Animated credit card preview */}
                    <div className="bg-gradient-to-br from-amber-800 via-amber-900 to-amber-950 text-amber-200 rounded-2xl p-5 shadow-lg relative overflow-hidden h-40 flex flex-col justify-between font-mono border border-white/5">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 blur-xl"></div>
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] font-semibold text-white/50 tracking-widest font-sans uppercase">Aura Haven Black Card</span>
                        <CreditCard className="w-6 h-6 text-amber-400 animate-pulse" />
                      </div>
                      
                      <div className="text-center">
                        <span className="text-sm font-semibold text-white tracking-widest block">
                          {cardNumber || '•••• •••• •••• ••••'}
                        </span>
                      </div>

                      <div className="flex justify-between text-[10px] text-white/70">
                        <div>
                          <span className="text-[8px] text-white/40 block font-sans">CARDHOLDER</span>
                          <span className="font-semibold tracking-wide uppercase">{cardHolder || 'Vamshi Raghu'}</span>
                        </div>
                        <div>
                          <span className="text-[8px] text-white/40 block font-sans">EXPIRES</span>
                          <span className="font-semibold">{cardExpiry || 'MM/YY'}</span>
                        </div>
                        <div>
                          <span className="text-[8px] text-white/40 block font-sans">CVV</span>
                          <span className="font-semibold">{cardCvv || '•••'}</span>
                        </div>
                      </div>
                    </div>

                    <form onSubmit={handleCheckout} className="space-y-4">
                      <div className="space-y-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 font-mono">Cardholder Name</label>
                          <input
                            type="text"
                            required
                            placeholder="Vamshi Raghu"
                            value={cardHolder}
                            onChange={(e) => setCardHolder(e.target.value)}
                            className="w-full glass-input rounded-xl p-2.5 text-xs"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 font-mono">Card Number</label>
                          <input
                            type="text"
                            required
                            maxLength={19}
                            placeholder="4111 2222 3333 4444"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim())}
                            className="w-full glass-input rounded-xl p-2.5 text-xs font-mono"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 font-mono">Expiry Date</label>
                            <input
                               type="text"
                               required
                               maxLength={5}
                               placeholder="08/29"
                               value={cardExpiry}
                               onChange={(e) => setCardExpiry(e.target.value)}
                               className="w-full glass-input rounded-xl p-2.5 text-xs font-mono"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 font-mono">Security Code (CVV)</label>
                            <input
                              type="password"
                              required
                              maxLength={4}
                              placeholder="123"
                              value={cardCvv}
                              onChange={(e) => setCardCvv(e.target.value)}
                              className="w-full glass-input rounded-xl p-2.5 text-xs font-mono"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-3 pt-3">
                        <button
                          type="button"
                          onClick={() => setStep('DETAILS')}
                          className="flex-1 py-3 bg-white/5 border border-white/5 text-slate-300 hover:bg-white/10 text-xs font-display font-semibold tracking-wide rounded-xl transition-all cursor-pointer"
                        >
                          Change Add-ons
                        </button>
                        <button
                          type="submit"
                          disabled={isLoading}
                          className="flex-1 py-3 bg-amber-600 hover:bg-amber-500 text-white text-xs font-display font-semibold tracking-wider rounded-xl shadow-lg shadow-amber-600/15 border border-amber-500/25 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          {isLoading ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              Verifying...
                            </>
                          ) : (
                            `Authorize ₹${total.toLocaleString('en-IN')}`
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </motion.div>
            )}

            {step === 'SUCCESS' && generatedBooking && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6 text-center py-6"
              >
                <div className="w-14 h-14 bg-green-500/10 text-green-400 border border-green-500/25 rounded-full flex items-center justify-center mx-auto shadow-md">
                  <ShieldCheck className="w-8 h-8 animate-bounce" />
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-2xl font-display font-medium text-white">Reservation Confirmed</h3>
                  <p className="text-xs text-slate-400 font-light max-w-xs mx-auto">Your stay metadata has been synced with the resort automated systems.</p>
                </div>

                {/* Printable Ticket Receipt */}
                <div className="bg-white/5 border border-white/5 rounded-2xl p-5 text-left space-y-4 max-w-md mx-auto">
                  <div className="flex justify-between items-center text-xs pb-3 border-b border-white/5">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold block font-mono">TICKET ID</span>
                      <span className="font-bold text-white font-mono">{generatedBooking.id}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 font-bold block font-mono">STATUS</span>
                      <span className="text-green-400 font-bold text-[10px] bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded-md font-mono">PAID</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3.5 text-xs">
                    <div>
                      <span className="text-[9px] text-slate-400 font-bold block font-mono">CHECK IN</span>
                      <span className="font-semibold text-slate-200">{generatedBooking.checkIn}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-400 font-bold block font-mono">CHECK OUT</span>
                      <span className="font-semibold text-slate-200">{generatedBooking.checkOut}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-400 font-bold block font-mono">ROOM DETAILS</span>
                      <span className="font-semibold text-slate-200">Suite {generatedBooking.roomNumber} ({generatedBooking.roomType})</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-400 font-bold block font-mono">GUESTS</span>
                      <span className="font-semibold text-slate-200">{generatedBooking.guests} Adults</span>
                    </div>
                  </div>

                  {generatedBooking.addons.length > 0 && (
                    <div className="pt-3 border-t border-white/5 text-xs">
                      <span className="text-[9px] text-slate-400 font-bold block font-mono">AUTHORIZED AMENITIES</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {generatedBooking.addons.map((ad, idx) => (
                          <span key={idx} className="bg-amber-500/10 border border-amber-500/25 text-amber-300 text-[10px] px-2 py-0.5 rounded-md font-medium">
                            {ad}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="pt-3 border-t border-white/5 flex justify-between items-center text-xs">
                    <span className="font-medium text-slate-400">Total Authorized Amount</span>
                    <span className="text-lg font-bold text-white font-mono">₹{generatedBooking.totalAmount.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div className="flex gap-3 justify-center pt-2">
                  <button
                    onClick={onClose}
                    className="px-6 py-2.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-display font-semibold tracking-wide rounded-xl shadow-md border border-amber-500/20 transition-all cursor-pointer"
                  >
                    Finish Reservation
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
