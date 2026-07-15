import React, { useState, useEffect } from "react";
import {
  X,
  Mail,
  Lock,
  User as UserIcon,
  Sparkles,
  Eye,
  EyeOff,
  Fingerprint,
  Award,
  Coffee,
  Music,
  Bed,
  Check,
  ArrowRight,
  ShieldCheck,
  Zap,
  Crown,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function AuthModal({
  onClose,
  onLoginSuccess,
  isGated = false,
}) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("GUEST");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Innovation States
  const [selectedTier, setSelectedTier] = useState("Gold");
  const [preferredBeverage, setPreferredBeverage] = useState("Champagne");
  const [preferredPillow, setPreferredPillow] = useState("Goose Down");
  const [preferredSoundscape, setPreferredSoundscape] = useState("Ocean Waves");
  // Biometric Sandbox states
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState("idle");
  const [scanRole, setScanRole] = useState("GUEST");

  // Sync Tier with form role
  useEffect(() => {
    if (role === "ADMIN") {
      setSelectedTier("Platinum");
    } else {
      setSelectedTier("Gold");
    }
  }, [role]);

  // Real-time password strength estimation themed as "Vault Protection Tier"
  const getPasswordStrength = (pass) => {
    if (!pass)
      return {
        score: 0,
        label: "Vault Open",
        color: "bg-slate-700/50",
        textColor: "text-slate-400",
        width: "w-0",
      };
    if (pass.length < 5)
      return {
        score: 1,
        label: "Standard Keycard",
        color: "bg-red-500/50 border border-red-500/20",
        textColor: "text-red-400",
        width: "w-1/3",
      };
    if (pass.length < 8)
      return {
        score: 2,
        label: "Dual-Factor Encrypted",
        color: "bg-amber-500/50 border border-amber-500/20",
        textColor: "text-amber-400",
        width: "w-2/3",
      };
    return {
      score: 3,
      label: "Quantum Biometric Vault",
      color: "bg-green-500/50 border border-green-500/20",
      textColor: "text-green-400",
      width: "w-full",
    };
  };

  const strength = getPasswordStrength(password);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password || (isSignUp && !fullName)) {
      setError("Please provide all credentials.");
      return;
    }

    if (!email.includes("@")) {
      setError("Kindly enter a valid email address.");
      return;
    }

    // Capture selections in the user object
    const mockUser = {
      id: Math.random().toString(36).substring(2, 9),
      email: email.toLowerCase(),
      fullName: isSignUp
        ? fullName
        : email.toLowerCase().includes("admin")
          ? "Executive Partner"
          : "Vamshi Raghu",
      role: isSignUp
        ? role
        : email.toLowerCase().includes("admin")
          ? "ADMIN"
          : "GUEST",
      loyaltyPoints: role === "GUEST" ? (isSignUp ? 1750 : 1250) : 0, // Extra 500 Welcome bonus if registering!
      loyaltyTier: selectedTier,
      preferredBeverage: isSignUp ? preferredBeverage : "Champagne",
      preferredPillow: isSignUp ? preferredPillow : "Goose Down",
      preferredSoundscape: isSignUp ? preferredSoundscape : "Ocean Waves",
    };

    onLoginSuccess(mockUser);
    onClose?.();
  };

  const handleDemoLogin = (demoRole) => {
    const demoUser = {
      id: demoRole === "GUEST" ? "guest_123" : "admin_123",
      email:
        demoRole === "GUEST" ? "guest@aurahaven.com" : "admin@aurahaven.com",
      fullName:
        demoRole === "GUEST" ? "Sarah Jenkins" : "Michael Vance (Manager)",
      role: demoRole,
      loyaltyPoints: demoRole === "GUEST" ? 3400 : 0,
      loyaltyTier: demoRole === "GUEST" ? "Platinum" : "Gold",
      preferredBeverage: "Matcha",
      preferredPillow: "Goose Down",
      preferredSoundscape: "Sunset Ocean Waves",
    };
    onLoginSuccess(demoUser);
    onClose?.();
  };

  // Simulate ultra-futuristic FaceID / Fingerprint scanning
  const triggerBiometricScan = (roleType) => {
    setScanRole(roleType);
    setIsScanning(true);
    setScanStep("scanning");

    setTimeout(() => {
      setScanStep("success");
      setTimeout(() => {
        const biometricUser = {
          id: roleType === "GUEST" ? "guest_biometric" : "admin_biometric",
          email:
            roleType === "GUEST"
              ? "biometric-guest@aurahaven.com"
              : "biometric-admin@aurahaven.com",
          fullName:
            roleType === "GUEST"
              ? "Sarah Jenkins (Biometric Secure)"
              : "Michael Vance (Manager Scan)",
          role: roleType,
          loyaltyPoints: roleType === "GUEST" ? 4500 : 0,
          loyaltyTier: "Platinum",
          preferredBeverage: "Champagne",
          preferredPillow: "Cooling Gel Memory Foam",
          preferredSoundscape: "Luxury Rooftop Jazz Lofi",
        };
        onLoginSuccess(biometricUser);
        onClose?.();
        setIsScanning(false);
        setScanStep("idle");
      }, 800);
    }, 1800);
  };

  // Luxury perks dynamic lists
  const tierPerks = {
    Silver: [
      "Basic keyless automation entry",
      "Standard high-speed resort Wifi",
      "Complimentary botanical water bottle on arrival",
      "Earn 5% cashback in Aura loyalty points",
    ],
    Gold: [
      "Pre-selected pillow menu comfort",
      "Early access to Lagoon Pool lounges",
      "1x Complimentary luxury cocktail/beverage per day",
      "Late Checkout entitlement (up to 2:00 PM)",
      "Earn 10% cashback in Aura loyalty points",
    ],
    Platinum: [
      "Dedicated elite concierge AI companion",
      "Priority helicopter landing & Tesla Shuttle transport",
      "Full-day spa access & thermal therapy session",
      "Guaranteed suite class room-type upgrades",
      "Unlimited gourmet bar dining selection",
      "Earn 15% cashback in Aura loyalty points",
    ],
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Dark overlay backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={isGated ? undefined : onClose}
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
      />

      {/* Main split-screen panel */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 120 }}
        className="relative glass-panel-dark max-w-4xl w-full rounded-3xl shadow-2xl border border-white/10 overflow-hidden z-10 grid grid-cols-1 md:grid-cols-12 max-h-[90vh] overflow-y-auto"
      >
        {/* Header Close Button */}
        {!isGated && onClose && (
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-slate-100 rounded-full transition-all cursor-pointer border border-white/5 z-20"
            title="Close Portal"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {/* LEFT COLUMN: Bespoke Experience & Interactive Perks Simulator (Takes 5/12 cols) */}
        <div className="md:col-span-5 bg-gradient-to-b from-[#0a0c16]/90 to-[#12152a]/95 p-6 md:p-8 flex flex-col justify-between relative overflow-hidden border-b md:border-b-0 md:border-r border-white/10">
          {/* Constellation overlay */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-amber-500/15 rounded-full blur-3xl" />

          <div className="space-y-6 relative z-10">
            {/* Header Branding */}
            <div>
              <div className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-amber-400 animate-pulse" />
                <span className="font-mono text-[10px] tracking-widest font-bold text-amber-400 uppercase">
                  AURA CONCIERGE NETWORK
                </span>
              </div>
              <h3 className="text-xl font-display font-bold text-white mt-1">
                Aura Membership
              </h3>
              <p className="text-xs text-slate-400 font-light mt-0.5">
                Customize your luxury credentials and unlock automated privilege
                tiers.
              </p>
            </div>

            {/* INTERACTIVE MEMBERSHIP CARD PREVIEW */}
            <motion.div
              whileHover={{ scale: 1.02, rotateY: -2 }}
              className={`relative rounded-2xl p-5 shadow-2xl border flex flex-col justify-between h-44 overflow-hidden transition-all duration-500 ${
                selectedTier === "Silver"
                  ? "bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 border-slate-500/30 text-slate-200"
                  : selectedTier === "Gold"
                    ? "bg-gradient-to-br from-amber-700/80 via-amber-900/90 to-amber-950 border-amber-500/40 text-amber-200"
                    : "bg-gradient-to-br from-slate-900 via-[#161a35] to-[#070912] border-amber-400/30 text-slate-200"
              }`}
            >
              {/* Card micro details */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />

              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[9px] font-bold font-mono uppercase tracking-widest opacity-70">
                    Aura Sanctuary Token
                  </span>
                  <h4 className="text-sm font-semibold tracking-wide text-white mt-0.5">
                    {fullName || "Sarah Jenkins"}
                  </h4>
                </div>
                <div
                  className={`p-1.5 rounded-lg border ${
                    selectedTier === "Silver"
                      ? "bg-slate-800/80 border-slate-600/50 text-slate-300"
                      : selectedTier === "Gold"
                        ? "bg-amber-950/80 border-amber-500/40 text-amber-400"
                        : "bg-amber-500/10 border-amber-500/25 text-amber-400"
                  }`}
                >
                  <Award className="w-5 h-5" />
                </div>
              </div>

              {/* simulated dynamic points indicator */}
              <div>
                <span className="text-[10px] font-mono text-slate-400 block">
                  Introductory Vault Credit
                </span>
                <span className="text-xl font-bold font-mono tracking-tight text-white flex items-center gap-1">
                  {isSignUp ? "+1,750" : "1,250"}{" "}
                  <span className="text-[11px] font-light text-amber-400">
                    Aura Pts
                  </span>
                </span>
                <p className="text-[9px] text-slate-300 font-light mt-0.5 italic">
                  {isSignUp
                    ? "+500 Registration bonus applied"
                    : "Initial booking ledger synced"}
                </p>
              </div>

              {/* bottom chips */}
              <div className="flex justify-between items-center text-[10px] font-mono border-t border-white/10 pt-2 opacity-90">
                <span>TIER: {selectedTier.toUpperCase()}</span>
                <span className="text-amber-400 font-bold uppercase tracking-widest text-[9px]">
                  Verified Sanctuary
                </span>
              </div>
            </motion.div>

            {/* TIER TABS SELECTOR */}
            <div className="space-y-2">
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                Explore Perks by Privilege Level:
              </span>
              <div className="grid grid-cols-3 gap-1 bg-white/5 border border-white/5 p-1 rounded-xl">
                {["Silver", "Gold", "Platinum"].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setSelectedTier(t)}
                    className={`py-1 text-[10px] font-semibold tracking-wider uppercase rounded-lg transition-all cursor-pointer ${
                      selectedTier === t
                        ? "bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-md"
                        : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* SELECTOR FOR BESPOKE WELCOME AMENITIES (Dynamic Registration configuration) */}
            {isSignUp && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="space-y-3.5 bg-white/5 border border-white/5 p-3.5 rounded-2xl relative"
              >
                <div className="absolute top-2 right-2 flex items-center gap-0.5">
                  <Zap className="w-3 h-3 text-amber-400" />
                  <span className="text-[9px] font-mono font-bold text-amber-400">
                    +500 PTS
                  </span>
                </div>
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                  Personalize Your Welcome (Demo):
                </span>

                <div className="space-y-2 text-xs">
                  {/* Drink Selector */}
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Coffee className="w-3.5 h-3.5 text-amber-400" /> Beverage
                    </span>
                    <select
                      value={preferredBeverage}
                      onChange={(e) => setPreferredBeverage(e.target.value)}
                      className="bg-slate-900/60 border border-white/5 rounded-lg px-2 py-1 text-[11px] text-slate-200 focus:outline-none focus:border-amber-500"
                    >
                      <option value="Champagne" className="bg-[#0e101f]">
                        Champagne Bottle
                      </option>
                      <option value="Matcha" className="bg-[#0e101f]">
                        Matcha Ceremonial Tea
                      </option>
                      <option value="Ristretto" className="bg-[#0e101f]">
                        Double Shot Ristretto
                      </option>
                    </select>
                  </div>

                  {/* Pillow Selector */}
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Bed className="w-3.5 h-3.5 text-amber-400" /> Pillow Menu
                    </span>
                    <select
                      value={preferredPillow}
                      onChange={(e) => setPreferredPillow(e.target.value)}
                      className="bg-slate-900/60 border border-white/5 rounded-lg px-2 py-1 text-[11px] text-slate-200 focus:outline-none focus:border-amber-500"
                    >
                      <option value="Goose Down" className="bg-[#0e101f]">
                        Siberian Goose Down
                      </option>
                      <option value="Lavender" className="bg-[#0e101f]">
                        Lavender Infused Sleep
                      </option>
                      <option value="Memory Foam" className="bg-[#0e101f]">
                        Cooling Gel Memory Foam
                      </option>
                    </select>
                  </div>

                  {/* Music Selector */}
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Music className="w-3.5 h-3.5 text-amber-400" />{" "}
                      Soundscape
                    </span>
                    <select
                      value={preferredSoundscape}
                      onChange={(e) => setPreferredSoundscape(e.target.value)}
                      className="bg-slate-900/60 border border-white/5 rounded-lg px-2 py-1 text-[11px] text-slate-200 focus:outline-none focus:border-amber-500"
                    >
                      <option value="Ocean Waves" className="bg-[#0e101f]">
                        Sunset Ocean Waves
                      </option>
                      <option value="Forest" className="bg-[#0e101f]">
                        Ambient Rainforest Rain
                      </option>
                      <option value="Lofi" className="bg-[#0e101f]">
                        Luxury Rooftop Jazz Lofi
                      </option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}

            {/* DYNAMIC PERKS LIST */}
            <div className="space-y-2">
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                Exclusive {selectedTier} Benefits:
              </span>
              <ul className="space-y-1.5 text-[11px] text-slate-300 font-light pl-1">
                {tierPerks[selectedTier].map((perk, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-4 border-t border-white/5 mt-6 relative z-10">
            <span className="block text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest text-center">
              SECURE KEYLESS BOOKING SYSTEM memory v1.4
            </span>
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Registration / Login Form (Takes 7/12 cols) */}
        <div className="md:col-span-7 p-6 md:p-8 flex flex-col justify-between">
          <div className="space-y-5">
            {/* Tab switch navigation */}
            <div className="flex justify-between items-center border-b border-white/5 pb-4">
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsSignUp(false);
                    setError("");
                  }}
                  className={`text-lg font-display font-semibold pb-1 relative transition-all cursor-pointer ${
                    !isSignUp
                      ? "text-white font-bold"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  Sign In
                  {!isSignUp && (
                    <motion.div
                      layoutId="authTabUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-amber-500"
                    />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsSignUp(true);
                    setError("");
                  }}
                  className={`text-lg font-display font-semibold pb-1 relative transition-all cursor-pointer ${
                    isSignUp
                      ? "text-white font-bold"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  Create Profile
                  {isSignUp && (
                    <motion.div
                      layoutId="authTabUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-amber-500"
                    />
                  )}
                </button>
              </div>
              <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md font-mono uppercase">
                {isSignUp ? "REGISTRATION" : "AUTHENTICATION"}
              </span>
            </div>

            {/* Error Panel */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3.5 bg-red-500/10 text-red-400 text-xs rounded-xl font-medium border border-red-500/20"
              >
                {error}
              </motion.div>
            )}

            {/* INNOVATIVE BIOMETRIC / DEMO SIMULATOR PANEL */}
            <div className="p-4 bg-white/5 border border-white/5 rounded-2xl space-y-3.5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-xl pointer-events-none" />
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1.5 text-[10px] font-bold text-amber-400 uppercase tracking-widest font-mono">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                  Instant Biometric & Demo Gateways
                </span>
                <span className="text-[8px] px-1.5 py-0.5 bg-green-500/10 border border-green-500/20 text-green-400 font-mono rounded">
                  SANDBOX
                </span>
              </div>

              {/* BIOMETRIC SCANNING VISUAL ENGINE */}
              <AnimatePresence mode="wait">
                {isScanning ? (
                  <motion.div
                    key="scanning-state"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-6 flex flex-col items-center justify-center space-y-3 bg-[#0a0d18] border border-amber-500/10 rounded-xl relative overflow-hidden"
                  >
                    {/* Laser scanning beam line */}
                    <motion.div
                      animate={{ y: [0, 80, 0] }}
                      transition={{
                        repeat: Infinity,
                        duration: 1.5,
                        ease: "easeInOut",
                      }}
                      className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent shadow-[0_0_15px_rgba(245,158,11,0.8)] z-10"
                    />

                    {/* Pulsing Face ID ring */}
                    <div className="relative w-16 h-16 rounded-full border-2 border-dashed border-amber-500/50 flex items-center justify-center">
                      <motion.div
                        animate={{
                          scale: [1, 1.15, 1],
                          opacity: [0.3, 0.7, 0.3],
                        }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="absolute inset-0 rounded-full border-2 border-amber-500/20"
                      />

                      <Fingerprint className="w-8 h-8 text-amber-400 animate-pulse" />
                    </div>

                    <div className="text-center">
                      <p className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                        {scanStep === "scanning"
                          ? "Scanning Facial Biometrics..."
                          : "Identity Decoded!"}
                      </p>
                      <p className="text-[10px] text-slate-400 font-light mt-0.5">
                        Syncing credentials with encrypted hotel vaults
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="gateways-selectors"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-2"
                  >
                    {/* Simulated Biometric quick login button */}
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => triggerBiometricScan("GUEST")}
                        className="flex items-center justify-center gap-1.5 px-3 py-2 bg-gradient-to-r from-amber-600/15 to-amber-700/10 hover:from-amber-600/25 hover:to-amber-700/20 border border-amber-500/20 text-amber-400 text-xs font-bold rounded-xl transition-all cursor-pointer group"
                      >
                        <Fingerprint className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                        Biometric Guest Sign-In
                      </button>
                      <button
                        type="button"
                        onClick={() => triggerBiometricScan("ADMIN")}
                        className="flex items-center justify-center gap-1.5 px-3 py-2 bg-gradient-to-r from-amber-600/15 to-amber-700/10 hover:from-amber-600/25 hover:to-amber-700/20 border border-amber-500/20 text-amber-400 text-xs font-bold rounded-xl transition-all cursor-pointer group"
                      >
                        <ShieldCheck className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                        Biometric Partner Sign-In
                      </button>
                    </div>

                    {/* Standard demo login credentials */}
                    <div className="flex items-center justify-between gap-2 pt-1">
                      <span className="text-[9px] font-mono text-slate-400 uppercase">
                        Or One-Tap Standard:
                      </span>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => handleDemoLogin("GUEST")}
                          className="px-2.5 py-1 bg-white/5 border border-white/5 text-slate-300 hover:text-white hover:bg-white/10 text-[10px] font-semibold rounded-lg transition-all cursor-pointer"
                        >
                          sarah@guest
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDemoLogin("ADMIN")}
                          className="px-2.5 py-1 bg-white/5 border border-white/5 text-slate-300 hover:text-white hover:bg-white/10 text-[10px] font-semibold rounded-lg transition-all cursor-pointer"
                        >
                          michael@partner
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* TRADITIONAL INPUT FORMS */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 font-mono">
                    Full Identity Name
                  </label>
                  <div className="relative">
                    <UserIcon className="absolute left-3.5 top-2.5. w-4.5 h-4.5 text-slate-500" />
                    <input
                      type="text"
                      placeholder="e.g., Sarah Jenkins"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 text-xs glass-input rounded-xl focus:border-amber-500"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 font-mono">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-2.5 w-4.5 h-4.5 text-slate-500" />
                  <input
                    type="email"
                    placeholder="sarah.jenkins@concierge.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-xs glass-input rounded-xl focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 font-mono">
                  Password Key
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-2.5 w-4.5 h-4.5 text-slate-500" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 text-xs glass-input rounded-xl focus:border-amber-500 font-mono"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-200 cursor-pointer"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* DYNAMIC PASSWORD STRENGTH VISUAL BAR */}
                {password && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-2 space-y-1"
                  >
                    <div className="flex justify-between items-center text-[9px] font-mono">
                      <span className="text-slate-400">
                        Vault Security Level:
                      </span>
                      <span className={`font-bold ${strength.textColor}`}>
                        {strength.label}
                      </span>
                    </div>
                    <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full ${strength.color}`}
                        initial={{ width: 0 }}
                        animate={{
                          width:
                            strength.score === 1
                              ? "33%"
                              : strength.score === 2
                                ? "66%"
                                : "100%",
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </motion.div>
                )}
              </div>

              {/* ACCOUNT ROLE PRE-CONFIG FOR REGISTRATION */}
              {isSignUp && (
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 font-mono">
                    Sanctuary Portal Role
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setRole("GUEST")}
                      className={`py-2 text-[11px] font-semibold rounded-xl border transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        role === "GUEST"
                          ? "bg-amber-500/15 text-amber-400 border-amber-500/30 shadow-md"
                          : "bg-white/5 text-slate-400 border-white/5 hover:bg-white/10 hover:text-slate-200"
                      }`}
                    >
                      <UserIcon className="w-3.5 h-3.5" />
                      Guest Profile
                    </button>
                    <button
                      type="button"
                      onClick={() => setRole("ADMIN")}
                      className={`py-2 text-[11px] font-semibold rounded-xl border transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        role === "ADMIN"
                          ? "bg-amber-500/15 text-amber-400 border-amber-500/30 shadow-md"
                          : "bg-white/5 text-slate-400 border-white/5 hover:bg-white/10 hover:text-slate-200"
                      }`}
                    >
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Partner Admin
                    </button>
                  </div>
                </div>
              )}

              {/* SECURE FORM ACTION */}
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white text-xs font-display font-semibold tracking-widest uppercase rounded-xl shadow-lg shadow-amber-600/15 border border-amber-500/25 transition-all mt-4 cursor-pointer flex items-center justify-center gap-2 group"
              >
                {isSignUp
                  ? "Generate Resort Credentials"
                  : "Request Vault Clearance"}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>

          <div className="text-center pt-4 border-t border-white/5 mt-6">
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError("");
              }}
              className="text-xs font-medium text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
            >
              {isSignUp
                ? "Already have an automated profile? Sign In"
                : "Don't have credentials yet? Create Free Profile"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
