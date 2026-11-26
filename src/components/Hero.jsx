import React from 'react';
import { 
  Star, ShieldCheck, Dumbbell, Sparkles, Clock, MapPin, 
  ArrowRight, Flame, CheckCircle2, ChevronRight, Activity, Zap
} from 'lucide-react';
import { gymDetails } from '../data/gymData';

export default function Hero({ onOpenTrialModal, onNavigateToQuiz, settings }) {
  const morningBatch = settings?.morningBatch || gymDetails.timings.morningBatch;
  const eveningBatch = settings?.eveningBatch || gymDetails.timings.eveningBatch;
  const announcement = settings?.announcement;
  const gymName = settings?.gymName || gymDetails.name;
  const address = settings?.address || gymDetails.address.full;

  return (
    <section id="hero" className="relative pt-6 sm:pt-12 pb-20 sm:pb-28 overflow-hidden bg-[#070a12]">
      
      {/* Background Graphic Elements & Atmospheric Ambient Lighting */}
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[600px] h-[500px] bg-red-600/15 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[500px] h-[450px] bg-cyan-500/15 rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#070a12] to-transparent pointer-events-none z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Live Announcement Bar (Configurable in Admin) */}
        {announcement && (
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-600/20 text-red-300 border border-red-500/30 text-xs font-bold shadow-glow-red animate-fadeIn">
              <Zap className="w-3.5 h-3.5 text-red-400 shrink-0 animate-bounce" />
              <span>{announcement}</span>
            </div>
          </div>
        )}

        {/* Main Grid: Left Column Copy & CTAs / Right Column User Photo Hero Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Hero Content (7 Columns) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Trust Pill & Location */}
            <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2 p-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>4.9 Member Rating</span>
              </div>
              <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 truncate max-w-xs">
                <MapPin className="w-3 h-3 text-cyan-400 shrink-0" />
                <span className="truncate">{address}</span>
              </div>
            </div>

            {/* Power Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.08] font-heading">
              ELEVATE YOUR <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-400 to-amber-300">
                PHYSIQUE & POWER
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Train with precision German-engineered cardio systems, Olympic free weights, and a clean climate-controlled floor engineered for relentless consistency.
            </p>

            {/* Shift Timings Card */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md max-w-xl mx-auto lg:mx-0 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-slate-200 font-bold">
                <Clock className="w-4 h-4 text-red-500" />
                <span>Dual Workout Shifts:</span>
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                <span className="px-2.5 py-1 rounded-lg bg-red-600/20 border border-red-500/30 text-red-200 font-semibold font-mono">
                  Morning: {morningBatch}
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-cyan-600/20 border border-cyan-500/30 text-cyan-200 font-semibold font-mono">
                  Evening: {eveningBatch}
                </span>
              </div>
            </div>

            {/* CTA Group */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={onOpenTrialModal}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-red-600 via-red-500 to-red-600 hover:from-red-500 hover:to-red-600 text-white font-extrabold text-sm sm:text-base shadow-glow-red transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShieldCheck className="w-5 h-5" />
                <span>Claim Free 1-Day Trial Pass</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={onNavigateToQuiz}
                className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Flame className="w-4 h-4 text-red-400" />
                <span>Find Your Workout Blueprint</span>
              </button>
            </div>

            {/* Feature Bullets */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs text-slate-400 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Zero Registration Fee
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Certified Floor Coaches
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 100% AC Clean Floor
              </span>
            </div>

          </div>

          {/* Right Hero Visual: User Uploaded Gym Photo Display (5 Columns) */}
          <div className="lg:col-span-5 relative">
            
            {/* Glowing Accent Frame */}
            <div className="relative rounded-3xl overflow-hidden border border-white/20 shadow-card-dark group">
              
              {/* The User's Uploaded Gym Photo */}
              <div className="relative h-[440px] sm:h-[540px] w-full overflow-hidden bg-slate-900">
                <img
                  src="/images/gym-hero.jpg"
                  alt="High Performance Gym Floor"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                {/* Subtle dark gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#070a12] via-transparent to-black/30" />
                
                {/* Top Badge on image */}
                <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-red-600/90 backdrop-blur-md text-white text-[11px] font-black tracking-wider uppercase shadow-md flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5" />
                    <span>State-Of-The-Art Equipment</span>
                  </span>
                </div>

                {/* Bottom Floating Stats Overlay on image */}
                <div className="absolute bottom-4 inset-x-4 z-20 p-4 rounded-2xl bg-[#0b0f19]/90 border border-white/10 backdrop-blur-md shadow-lg flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-red-400 tracking-wider block">
                      Cardio & Strength Floor
                    </span>
                    <h4 className="text-sm font-bold text-white font-heading">
                      German Engineered Systems
                    </h4>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-black text-white font-heading block">
                      2 Shifts
                    </span>
                    <span className="text-[10px] text-slate-400">Daily Access</span>
                  </div>
                </div>

              </div>

            </div>

            {/* Decorative Floating Pill */}
            <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 p-3.5 rounded-2xl bg-[#111827]/95 border border-white/15 backdrop-blur-md shadow-glow-cyan hidden sm:flex items-center gap-3 animate-float z-30">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center border border-cyan-500/30">
                <Dumbbell className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <span className="font-extrabold text-white block">Olympic Racks & Weights</span>
                <span className="text-[10px] text-slate-400">Precision Biomechanics</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
