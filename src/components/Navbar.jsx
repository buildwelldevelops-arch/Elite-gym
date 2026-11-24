import React, { useState, useEffect } from 'react';
import { Menu, Dumbbell, ShieldCheck, Sparkles, MapPin, Phone } from 'lucide-react';
import { gymDetails } from '../data/gymData';
import { getGymBatchStatus } from '../utils/timeHelper';

export default function Navbar({ onOpenSidebar, onOpenTrialModal, onNavigateToQuiz, settings }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [status, setStatus] = useState(getGymBatchStatus());

  const gymName = settings?.gymName || 'ELITE';
  const morningBatch = settings?.morningBatch || '6:00 AM – 10:00 AM';
  const eveningBatch = settings?.eveningBatch || '5:00 PM – 10:00 PM';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
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
    <header className={`sticky top-0 z-30 transition-all duration-200 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md border-b border-purple-100 shadow-sm py-3' : 'bg-white/80 backdrop-blur-sm py-3.5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Left: Mobile Hamburger Toggle & Brand (Mobile only) / Sagar Tagline (Desktop) */}
          <div className="flex items-center gap-3">
            {/* Hamburger Button for Mobile */}
            <button
              onClick={onOpenSidebar}
              className="p-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 lg:hidden cursor-pointer"
              aria-label="Open navigation sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Mobile Brand Name */}
            <div className="flex items-center gap-2 lg:hidden">
              <div className="w-8 h-8 rounded-lg bg-purple-700 flex items-center justify-center text-white">
                <Dumbbell className="w-4 h-4 transform -rotate-45" />
              </div>
              <span className="text-lg font-black tracking-tight font-heading text-slate-900">
                ELITE <span className="text-purple-700">GYM</span>
              </span>
            </div>

            {/* Desktop Clean Breadcrumb / Welcome Tagline */}
            <div className="hidden lg:flex items-center gap-2 text-xs font-semibold text-slate-600">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-purple-950 font-bold">{status.statusText}:</span>
              <span className="text-slate-700">{status.batchName} ({status.timings})</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-500">Tili Rd, Sagar (Opp. Rozgar Office)</span>
            </div>
          </div>

          {/* Right: Clean Action Buttons (Both Desktop & Mobile) */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onNavigateToQuiz}
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-xl text-purple-900 bg-purple-50 hover:bg-purple-100 border border-purple-200 transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-700" />
              <span>Routine Finder</span>
            </button>

            <button
              onClick={onOpenTrialModal}
              className="text-xs sm:text-sm font-bold px-4 py-2 rounded-xl text-white bg-purple-700 hover:bg-purple-800 shadow-purple-sm transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Free Day Pass</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
