import React, { useState, useEffect } from 'react';
import { Menu, Dumbbell, Clock, Phone, Sparkles, ShieldCheck, Flame, Instagram, MapPin } from 'lucide-react';
import { gymDetails } from '../data/gymData';
import { getGymBatchStatus } from '../utils/timeHelper';

export default function Navbar({ onOpenSidebar, onOpenTrialModal, onNavigateToQuiz, settings }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [status, setStatus] = useState(getGymBatchStatus());

  const gymName = settings?.gymName || gymDetails.name;
  const morningBatch = settings?.morningBatch || gymDetails.timings.morningBatch;
  const eveningBatch = settings?.eveningBatch || gymDetails.timings.eveningBatch;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    const interval = setInterval(() => {
      setStatus(getGymBatchStatus());
    }, 60000);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 ${
      isScrolled 
        ? 'bg-[#070a12]/90 backdrop-blur-md border-b border-white/10 shadow-card-dark py-3' 
        : 'bg-[#070a12]/60 backdrop-blur-sm py-4 border-b border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo & Mobile Trigger */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenSidebar}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 lg:hidden cursor-pointer transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5 text-red-500" />
            </button>

            <a href="#hero" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-red-600 to-red-500 flex items-center justify-center text-white shadow-glow-red group-hover:scale-105 transition-transform">
                <Dumbbell className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-black tracking-tight font-heading text-white flex items-center gap-1">
                  {gymName}
                </span>
                <span className="text-[10px] font-bold tracking-widest text-red-400 uppercase hidden sm:block">
                  High-Performance Training
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation Links (shown on extra large displays when sidebar is open) */}
          <nav className="hidden 2xl:flex items-center gap-5 text-xs font-semibold text-slate-300">
            <a href="#hero" className="hover:text-red-400 transition-colors whitespace-nowrap">Overview</a>
            <a href="#facilities" className="hover:text-red-400 transition-colors whitespace-nowrap">Equipment & Floor</a>
            <a href="#offers" className="hover:text-red-400 transition-colors flex items-center gap-1 text-red-400 whitespace-nowrap">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Offers</span>
            </a>
            <a href="#timings" className="hover:text-red-400 transition-colors whitespace-nowrap">Shift Timings</a>
            <a href="#pricing" className="hover:text-red-400 transition-colors whitespace-nowrap">Memberships</a>
            <a href="#location" className="hover:text-red-400 transition-colors whitespace-nowrap">Location & Hours</a>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Live Shift Pill */}
            <div className="hidden 2xl:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-semibold text-slate-300 whitespace-nowrap">
              <span className={`w-2 h-2 rounded-full ${status.isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
              <span>{status.statusText}</span>
            </div>

            <button
              onClick={onNavigateToQuiz}
              className="hidden md:inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-xl text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer whitespace-nowrap"
            >
              <Flame className="w-3.5 h-3.5 text-red-500" />
              <span>Workout Finder</span>
            </button>

            <button
              onClick={onOpenTrialModal}
              className="text-xs sm:text-sm font-bold px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-white bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 shadow-glow-red transition-all flex items-center gap-1.5 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Claim Free Pass</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
