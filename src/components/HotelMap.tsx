import React, { useState } from 'react';
import { Hotel } from '../types';
import { MapPin, Compass, Navigation, CloudSun, Wind, Thermometer, Wifi, Radio, HeartPulse, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HotelMapProps {
  hotels: Hotel[];
}

interface MapTarget {
  id: string;
  name: string;
  location: string;
  lat: number;
  lng: number;
  elevation: string;
  iotStats: {
    poolTemp: string;
    domeStatus?: string;
    wifiPing: string;
    ambientHumid: string;
    conciergeQueue: string;
  };
  airportDistance: string;
  weather: string;
}

export default function HotelMap({ hotels }: HotelMapProps) {
  // Advanced coordinate mappings for the luxury resorts
  const mapTargets: MapTarget[] = [
    {
      id: 'resort_bali',
      name: 'The Grand Oasis Resort & Spa',
      location: 'Nusa Dua, Bali, Indonesia',
      lat: -8.7981,
      lng: 115.2244,
      elevation: '5m ASL',
      iotStats: {
        poolTemp: '28.2°C',
        wifiPing: '12ms (5G Ultra)',
        ambientHumid: '78%',
        conciergeQueue: '0 min wait (100% idle)',
      },
      airportDistance: '12.4 km (Ngurah Rai Intl Airport)',
      weather: '29°C, Tropical Breeze',
    },
    {
      id: 'resort_swiss',
      name: 'Aura Chalet Skyline',
      location: 'Zermatt, Switzerland',
      lat: 46.0207,
      lng: 7.7491,
      elevation: '1,620m ASL',
      iotStats: {
        poolTemp: '38.5°C (Thermal)',
        domeStatus: '98% Clear (Stargaze Optimized)',
        wifiPing: '18ms (Fiber Satellite)',
        ambientHumid: '42%',
        conciergeQueue: 'Instant (Drone Delivery Active)',
      },
      airportDistance: '142 km (Zurich Airport via Glacier Express)',
      weather: '-2°C, Crisp Snowfall',
    },
    {
      id: 'resort_tokyo',
      name: 'The Urban Ritz Sanctuary',
      location: 'Shinjuku, Tokyo, Japan',
      lat: 35.6895,
      lng: 139.6917,
      elevation: '240m ASL',
      iotStats: {
        poolTemp: '30.1°C (Infinity Sky)',
        domeStatus: 'Digital Ambient Glass Active',
        wifiPing: '4ms (Quantum Mesh)',
        ambientHumid: '50%',
        conciergeQueue: '0.5 min (Robotic Butler Synced)',
      },
      airportDistance: '18.2 km (Tokyo Haneda)',
      weather: '22°C, Neon Mist',
    },
  ];

  const [activeTarget, setActiveTarget] = useState<MapTarget>(mapTargets[0]);
  const [mapZoom, setMapZoom] = useState<number>(14);

  // Generate OpenStreetMap custom map URL based on coordinates
  const getMapUrl = (target: MapTarget) => {
    // Elegant OpenStreetMap iframe generator using standard coordinates and zoom level
    return `https://maps.google.com/maps?q=${target.lat},${target.lng}&t=k&z=${mapZoom}&ie=UTF8&iwloc=&output=embed`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-8">
      {/* Dynamic Quantum Title with glowing indicators */}
      <div className="glass-panel rounded-3xl p-6 relative overflow-hidden bg-gradient-to-r from-[#0d1020]/80 via-[#070913]/90 to-[#0d1020]/80 border border-white/5 shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/25 rounded-full text-amber-400 text-xs font-bold font-mono tracking-widest uppercase">
              <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '10s' }} />
              Aura Geo-Explorer Grid
            </div>
            <h2 className="text-3xl font-display font-semibold tracking-tight text-white">
              Tactile Satellite Coordinates & Sensory Maps
            </h2>
            <p className="text-xs text-slate-400 font-light max-w-2xl">
              Inspect nearby locations, live weather parameters, precise satellite positioning, and IoT telemetry loops for our elite sanctuaries worldwide.
            </p>
          </div>

          {/* Quick Selectors */}
          <div className="flex flex-wrap gap-2.5">
            {mapTargets.map((target) => (
              <button
                key={target.id}
                onClick={() => setActiveTarget(target)}
                className={`py-2 px-4 rounded-xl text-xs font-semibold font-display tracking-wider transition-all flex items-center gap-2 border cursor-pointer ${
                  activeTarget.id === target.id
                    ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-white border-amber-400 shadow-lg shadow-amber-500/15'
                    : 'bg-white/5 border-white/5 text-slate-400 hover:text-slate-200 hover:bg-white/10'
                }`}
              >
                <MapPin className={`w-3.5 h-3.5 ${activeTarget.id === target.id ? 'text-white' : 'text-slate-500'}`} />
                {target.id === 'resort_bali' ? 'Bali' : target.id === 'resort_swiss' ? 'Zermatt' : 'Tokyo'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Map + Sensory Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Real Interactive Iframe Map (Takes 7/12 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="glass-panel rounded-3xl p-3 shadow-2xl relative overflow-hidden h-[460px] flex flex-col border border-white/10 group">
            {/* Top Bar Map Details */}
            <div className="flex justify-between items-center bg-slate-950/80 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/5 mb-3">
              <div className="flex items-center gap-2">
                <Navigation className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-semibold text-white tracking-wide">{activeTarget.name}</span>
              </div>
              <div className="flex items-center gap-3 font-mono text-[10px] text-slate-400">
                <span>LAT: {activeTarget.lat.toFixed(4)}°</span>
                <span>LNG: {activeTarget.lng.toFixed(4)}°</span>
                {/* Zoom adjustment buttons */}
                <div className="flex gap-1 border-l border-white/10 pl-2.5">
                  <button onClick={() => setMapZoom(prev => Math.min(prev + 1, 18))} className="px-1.5 py-0.5 hover:text-amber-300 transition-colors cursor-pointer">+</button>
                  <button onClick={() => setMapZoom(prev => Math.max(prev - 1, 12))} className="px-1.5 py-0.5 hover:text-amber-300 transition-colors cursor-pointer">-</button>
                </div>
              </div>
            </div>

            {/* Embedded Live Google Satellite Map */}
            <div className="flex-1 rounded-2xl overflow-hidden border border-white/5 relative bg-[#070913]">
              <iframe
                title={`Live Satellite Map - ${activeTarget.name}`}
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                marginHeight={0}
                marginWidth={0}
                src={getMapUrl(activeTarget)}
                style={{ filter: 'contrast(1.05) brightness(0.9)' }}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </div>
        </div>

        {/* Sensory Telemetry Column (Takes 4/12 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Ambient weather conditions */}
          <div className="glass-panel rounded-3xl p-6 shadow-xl relative overflow-hidden bg-gradient-to-br from-amber-500/[0.03] to-indigo-500/[0.03] border border-white/5 space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono border-b border-white/5 pb-2.5 flex items-center justify-between">
              <span>Dynamic Climate Diagnostics</span>
              <Globe className="w-3.5 h-3.5 text-amber-500" />
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-2xl p-4 text-center border border-white/5">
                <Thermometer className="w-6 h-6 text-amber-400 mx-auto mb-1" />
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-mono">Sensory Temp</span>
                <span className="text-base font-bold text-white font-mono">{activeTarget.weather.split(',')[0]}</span>
              </div>
              
              <div className="bg-white/5 rounded-2xl p-4 text-center border border-white/5">
                <Wind className="w-6 h-6 text-indigo-400 mx-auto mb-1" />
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-mono">Atmosphere</span>
                <span className="text-xs font-semibold text-slate-200 mt-1 block truncate">{activeTarget.weather.split(',')[1] || 'Calm'}</span>
              </div>
            </div>

            <div className="bg-[#0a0c16]/80 rounded-xl p-3.5 border border-white/5 space-y-1.5">
              <div className="flex justify-between text-[11px] text-slate-400">
                <span className="font-mono">Geodetic Elevation</span>
                <span className="font-semibold text-white font-mono">{activeTarget.elevation}</span>
              </div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span className="font-mono">Airport Transit Distance</span>
                <span className="font-semibold text-amber-400 text-right max-w-[150px] truncate" title={activeTarget.airportDistance}>
                  {activeTarget.airportDistance}
                </span>
              </div>
            </div>
          </div>

          {/* IoT Telemetry Systems Monitor */}
          <div className="glass-panel rounded-3xl p-6 shadow-xl border border-white/5 space-y-4">
            <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-widest font-mono border-b border-white/5 pb-2.5 flex items-center gap-2">
              <Radio className="w-4 h-4 text-indigo-400 animate-pulse" />
              <span>IoT Network Telemetry</span>
            </h3>

            <div className="space-y-3.5 text-xs font-light">
              <div className="flex items-center justify-between p-2.5 bg-white/5 rounded-xl border border-white/5">
                <div className="flex items-center gap-2">
                  <HeartPulse className="w-3.5 h-3.5 text-rose-400" />
                  <span className="text-slate-300">Sanctuary Thermal Pool</span>
                </div>
                <span className="font-bold text-white font-mono">{activeTarget.iotStats.poolTemp}</span>
              </div>

              {activeTarget.iotStats.domeStatus && (
                <div className="flex items-center justify-between p-2.5 bg-white/5 rounded-xl border border-white/5">
                  <div className="flex items-center gap-2">
                    <CloudSun className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="text-slate-300">Constellation Dome</span>
                  </div>
                  <span className="font-bold text-cyan-400 font-mono text-[10px] text-right">{activeTarget.iotStats.domeStatus}</span>
                </div>
              )}

              <div className="flex items-center justify-between p-2.5 bg-white/5 rounded-xl border border-white/5">
                <div className="flex items-center gap-2">
                  <Wifi className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-slate-300">Core Network Mesh</span>
                </div>
                <span className="font-bold text-white font-mono">{activeTarget.iotStats.wifiPing}</span>
              </div>

              <div className="flex items-center justify-between p-2.5 bg-white/5 rounded-xl border border-white/5">
                <div className="flex items-center gap-2">
                  <Radio className="w-3.5 h-3.5 text-indigo-400" />
                  <span className="text-slate-300">AI Concierge Queue</span>
                </div>
                <span className="font-bold text-green-400 font-mono">{activeTarget.iotStats.conciergeQueue}</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
