import React from 'react';
import { User } from '../types';
import { Hotel, User as UserIcon, LogOut, ShieldAlert, BookOpen } from 'lucide-react';

interface NavigationProps {
  user: User | null;
  onOpenAuth: () => void;
  onLogout: () => void;
  currentTab: 'explore' | 'bookings' | 'admin';
  onChangeTab: (tab: 'explore' | 'bookings' | 'admin') => void;
}

export default function Navigation({
  user,
  onOpenAuth,
  onLogout,
  currentTab,
  onChangeTab,
}: NavigationProps) {
  return (
    <nav className="sticky top-0 z-40 bg-[#070913]/75 backdrop-blur-xl border-b border-white/5 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onChangeTab('explore')}>
            <div className="p-2.5 bg-gradient-to-br from-amber-500 to-amber-700 rounded-xl text-white shadow-lg shadow-amber-600/30">
              <Hotel className="w-6 h-6" />
            </div>
            <span className="text-2xl font-display font-bold tracking-wider bg-gradient-to-r from-white via-amber-200 to-amber-400 bg-clip-text text-transparent">
              AURA HAVEN
            </span>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center space-x-6">
            <button
              onClick={() => onChangeTab('explore')}
              className={`font-display text-sm font-medium tracking-wide transition-all cursor-pointer ${
                currentTab === 'explore'
                  ? 'text-amber-400 font-semibold border-b-2 border-amber-500 pb-1 pt-1'
                  : 'text-slate-300 hover:text-amber-400'
              }`}
            >
              Explore Stays
            </button>

            {user && user.role === 'GUEST' && (
              <button
                onClick={() => onChangeTab('bookings')}
                className={`flex items-center gap-1.5 font-display text-sm font-medium tracking-wide transition-all cursor-pointer ${
                  currentTab === 'bookings'
                    ? 'text-amber-400 font-semibold border-b-2 border-amber-500 pb-1 pt-1'
                    : 'text-slate-300 hover:text-amber-400'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                My Bookings
              </button>
            )}

            {user && user.role === 'ADMIN' && (
              <button
                onClick={() => onChangeTab('admin')}
                className={`flex items-center gap-1.5 font-display text-sm font-medium tracking-wide transition-all cursor-pointer ${
                  currentTab === 'admin'
                    ? 'text-amber-400 font-semibold border-b-2 border-amber-500 pb-1 pt-1'
                    : 'text-slate-300 hover:text-amber-400'
                }`}
              >
                <ShieldAlert className="w-4 h-4" />
                Partner Portal
              </button>
            )}

            {/* Auth Button / User Chip */}
            {user ? (
              <div className="flex items-center gap-4 pl-4 border-l border-white/10">
                <div className="flex flex-col items-end text-right">
                  <span className="text-sm font-medium text-slate-100 font-display">
                    {user.fullName}
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-widest font-mono text-amber-400">
                    {user.role === 'ADMIN' ? 'Partner Admin' : `${user.loyaltyTier} Tier`}
                  </span>
                </div>
                <button
                  onClick={onLogout}
                  className="p-2 bg-white/5 hover:bg-red-500/10 text-slate-400 hover:text-red-400 rounded-xl transition-all cursor-pointer border border-white/5"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-2 px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-white text-sm font-display font-medium tracking-wide rounded-xl shadow-lg shadow-amber-600/10 transition-all cursor-pointer border border-amber-500/20"
              >
                <UserIcon className="w-4 h-4" />
                Guest Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
