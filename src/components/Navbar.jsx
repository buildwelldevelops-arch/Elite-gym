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
        ? 'bg-white/95 backdrop-blur-md border-b border-blue-100 shadow-soft py-3' 
        : 'bg-white/80 backdrop-blur-sm py-4 border-b border-slate-100'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo & Mobile Trigger */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenSidebar}
              className="p-2 rounded-xl bg-slate-100 hover:bg-blue-50 text-slate-700 border border-slate-200 lg:hidden cursor-pointer transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5 text-blue-600" />
            </button>

            <a href="#hero" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-blue-700 to-blue-600 flex items-center justify-center text-white shadow-blue-sm group-hover:scale-105 transition-transform">
                <Dumbbell className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-black tracking-tight font-heading text-slate-900 flex items-center gap-1">
                  {gymName}
                </span>
                <span className="text-[10px] font-bold tracking-widest text-blue-600 uppercase hidden sm:block">
                  Modern Fitness & Strength
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden 2xl:flex items-center gap-5 text-xs font-semibold text-slate-600">
            <a href="#hero" className="hover:text-blue-600 transition-colors whitespace-nowrap">Overview</a>
            <a href="#facilities" className="hover:text-blue-600 transition-colors whitespace-nowrap">Equipment & Floor</a>
            <a href="#offers" className="hover:text-blue-600 transition-colors flex items-center gap-1 text-blue-600 whitespace-nowrap font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Offers</span>
            </a>
            <a href="#timings" className="hover:text-blue-600 transition-colors whitespace-nowrap">Shift Timings</a>
            <a href="#pricing" className="hover:text-blue-600 transition-colors whitespace-nowrap">Memberships</a>
            <a href="#location" className="hover:text-blue-600 transition-colors whitespace-nowrap">Location & Hours</a>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Live Shift Pill */}
            <div className="hidden 2xl:flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[11px] font-semibold text-blue-900 whitespace-nowrap">
              <span className={`w-2 h-2 rounded-full ${status.isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
              <span>{status.statusText}</span>
            </div>

            <button
              onClick={onNavigateToQuiz}
              className="hidden md:inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-xl text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors cursor-pointer whitespace-nowrap"
            >
              <Flame className="w-3.5 h-3.5 text-blue-600" />
              <span>Workout Finder</span>
            </button>

            <button
              onClick={onOpenTrialModal}
              className="text-xs sm:text-sm font-bold px-4 py-2 sm:py-2.5 rounded-xl text-white bg-blue-600 hover:bg-blue-700 shadow-blue-sm transition-all flex items-center gap-1.5 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap font-heading tracking-wide"
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
