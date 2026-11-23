import React from 'react';
import { Home, Sparkles, Clock, Star, MessageSquare, Phone, MapPin, Dumbbell } from 'lucide-react';
import { gymDetails } from '../data/gymData';

export default function BottomDock({ onNavigateToQuiz, onOpenTrialModal }) {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-auto max-w-[95vw] px-2">
      <div className="flex items-center gap-1 sm:gap-2 px-3.5 py-2.5 rounded-2xl bg-white/95 border border-purple-200 backdrop-blur-xl shadow-xl">
        
        {/* Brand Icon */}
        <a 
          href="#hero" 
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-slate-700 hover:text-purple-700 hover:bg-purple-50 transition-all text-xs font-bold"
          title="Top of page"
        >
          <Dumbbell className="w-4 h-4 text-purple-700" />
          <span className="hidden sm:inline">Elite Gym</span>
        </a>

        <div className="w-[1px] h-4 bg-purple-100 hidden sm:block" />

        {/* Home */}
        <a 
          href="#hero" 
          className="p-2 sm:px-2.5 sm:py-1.5 rounded-xl text-slate-600 hover:text-purple-700 hover:bg-purple-50 transition-all text-xs font-semibold flex items-center gap-1"
          title="Home"
        >
          <Home className="w-4 h-4 text-slate-500" />
          <span className="hidden md:inline">Home</span>
        </a>

        {/* Routine Finder / Quiz (Highlighted) */}
        <button
          onClick={onNavigateToQuiz}
          className="px-3.5 py-1.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white shadow-purple-sm transition-all text-xs font-bold flex items-center gap-1.5 hover:scale-105 active:scale-95 cursor-pointer"
          title="Take Fitness Quiz"
        >
          <Sparkles className="w-3.5 h-3.5 text-purple-200" />
          <span>Routine Finder</span>
        </button>

        {/* Timings */}
        <a 
          href="#timings" 
          className="p-2 sm:px-2.5 sm:py-1.5 rounded-xl text-slate-600 hover:text-purple-700 hover:bg-purple-50 transition-all text-xs font-semibold flex items-center gap-1"
          title="Morning & Evening Batches"
        >
          <Clock className="w-4 h-4 text-slate-500" />
          <span className="hidden md:inline">Batches</span>
        </a>

        {/* Reviews */}
        <a 
          href="#reviews" 
          className="p-2 sm:px-2.5 sm:py-1.5 rounded-xl text-slate-600 hover:text-purple-700 hover:bg-purple-50 transition-all text-xs font-semibold flex items-center gap-1"
          title="4.7 Google Reviews"
        >
          <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
          <span className="hidden md:inline">4.7★</span>
        </a>

        {/* Location */}
        <a 
          href="#location" 
          className="p-2 sm:px-2.5 sm:py-1.5 rounded-xl text-slate-600 hover:text-purple-700 hover:bg-purple-50 transition-all text-xs font-semibold flex items-center gap-1"
          title="Location on Tili Road"
        >
          <MapPin className="w-4 h-4 text-slate-500" />
          <span className="hidden md:inline">Location</span>
        </a>

        <div className="w-[1px] h-4 bg-purple-100" />

        {/* WhatsApp Fast Action */}
        <a
          href={`https://wa.me/${gymDetails.contact.whatsapp}?text=Hi%20Elite%20Gym%20Sagar,%20I%20want%20to%20know%20more%20about%20gym%20membership.`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 hover:bg-emerald-100 transition-all text-xs font-bold flex items-center gap-1"
          title="WhatsApp Chat"
        >
          <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
          <span className="hidden sm:inline">WhatsApp</span>
        </a>

      </div>
    </div>
  );
}
