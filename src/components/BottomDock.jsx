import React from 'react';
import { Home, Sparkles, Clock, Star, MessageSquare, Phone, MapPin, Dumbbell } from 'lucide-react';
import { gymDetails } from '../data/gymData';

export default function BottomDock({ onNavigateToQuiz, onOpenTrialModal, settings }) {
  const gymName = settings?.gymName || gymDetails.name;
  const whatsappNum = settings?.whatsapp || gymDetails.contact.whatsapp;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-auto max-w-[95vw] px-2">
      <div className="flex items-center gap-1 sm:gap-2 px-3.5 py-2.5 rounded-2xl bg-dark-900/90 border border-white/10 backdrop-blur-xl shadow-card-dark text-white">
        
        {/* Brand Icon */}
        <a 
          href="#hero" 
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 transition-all text-xs font-bold"
          title="Top of page"
        >
          <Dumbbell className="w-4 h-4 text-red-500" />
          <span className="hidden sm:inline uppercase">{gymName}</span>
        </a>

        <div className="w-[1px] h-4 bg-white/10 hidden sm:block" />

        {/* Home */}
        <a 
          href="#hero" 
          className="p-2 sm:px-2.5 sm:py-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all text-xs font-semibold flex items-center gap-1"
          title="Home"
        >
          <Home className="w-4 h-4 text-slate-400" />
          <span className="hidden md:inline">Home</span>
        </a>

        {/* Routine Finder / Quiz */}
        <button
          onClick={onNavigateToQuiz}
          className="px-3.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white shadow-glow-red transition-all text-xs font-bold flex items-center gap-1.5 hover:scale-105 active:scale-95 cursor-pointer"
          title="Take Fitness Quiz"
        >
          <Sparkles className="w-3.5 h-3.5 text-white" />
          <span>Routine Finder</span>
        </button>

        {/* Timings */}
        <a 
          href="#timings" 
          className="p-2 sm:px-2.5 sm:py-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all text-xs font-semibold flex items-center gap-1"
          title="Morning & Evening Shifts"
        >
          <Clock className="w-4 h-4 text-slate-400" />
          <span className="hidden md:inline">Shifts</span>
        </a>

        {/* Reviews */}
        <a 
          href="#reviews" 
          className="p-2 sm:px-2.5 sm:py-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all text-xs font-semibold flex items-center gap-1"
          title="4.9 Google Reviews"
        >
          <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
          <span className="hidden md:inline">4.9★</span>
        </a>

        {/* Location */}
        <a 
          href="#location" 
          className="p-2 sm:px-2.5 sm:py-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all text-xs font-semibold flex items-center gap-1"
          title="Location"
        >
          <MapPin className="w-4 h-4 text-slate-400" />
          <span className="hidden md:inline">Location</span>
        </a>

        <div className="w-[1px] h-4 bg-white/10" />

        {/* WhatsApp Fast Action */}
        <a
          href={`https://wa.me/${whatsappNum}?text=Hi%20${encodeURIComponent(gymName)},%20I%20want%20to%20know%20more%20about%20gym%20membership.`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 transition-all text-xs font-bold flex items-center gap-1"
          title="WhatsApp Chat"
        >
          <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
          <span className="hidden sm:inline">WhatsApp</span>
        </a>

      </div>
    </div>
  );
}
