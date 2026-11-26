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
    <section id="hero" className="relative pt-6 sm:pt-12 pb-20 sm:pb-28 overflow-hidden bg-gradient-to-b from-blue-50/70 via-white to-slate-50">
      
      {/* Background Graphic Accents & Blue Ambient Lighting */}
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[600px] h-[500px] bg-blue-200/35 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[500px] h-[450px] bg-sky-200/30 rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Live Announcement Bar (Configurable in Admin) */}
        {announcement && (
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-900 border border-blue-200 text-xs font-bold shadow-sm animate-fadeIn">
              <Zap className="w-3.5 h-3.5 text-blue-600 shrink-0 animate-bounce" />
              <span>{announcement}</span>
            </div>
          </div>
        )}

        {/* Main Grid: Left Column Copy & CTAs / Right Column Modern Gym Equipment Hero Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Hero Content (7 Columns) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Trust Pill & Location */}
            <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2 p-1 rounded-full bg-white border border-blue-100 shadow-sm text-xs font-semibold">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                <span>4.9 Member Rating</span>
              </div>
              <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-100 truncate max-w-xs">
                <MapPin className="w-3 h-3 text-blue-600 shrink-0" />
                <span className="truncate">{address}</span>
              </div>
            </div>

            {/* Power Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 leading-[1.08] font-heading uppercase">
              ELEVATE YOUR <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-600 to-sky-500">
                PHYSIQUE & POWER
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              State-of-the-art strength machines, Olympic free weights, precision cardio systems, and a clean climate-controlled floor built for consistent athletic results.
            </p>

            {/* Shift Timings Card */}
            <div className="p-4 rounded-2xl bg-white border border-blue-100 shadow-sm max-w-xl mx-auto lg:mx-0 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-slate-800 font-bold">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>Dual Workout Shifts:</span>
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                <span className="px-2.5 py-1 rounded-lg bg-blue-50 border border-blue-200 text-blue-800 font-semibold font-mono">
                  Morning: {morningBatch}
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-sky-50 border border-sky-200 text-sky-800 font-semibold font-mono">
                  Evening: {eveningBatch}
                </span>
              </div>
            </div>

            {/* CTA Group */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={onOpenTrialModal}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm sm:text-base shadow-blue-md transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer font-heading tracking-wide"
              >
                <ShieldCheck className="w-5 h-5" />
                <span>Claim Free 1-Day Trial Pass</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={onNavigateToQuiz}
                className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Flame className="w-4 h-4 text-blue-600" />
                <span>Find Your Workout Blueprint</span>
              </button>
            </div>

            {/* Feature Bullets */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs text-slate-600 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Zero Registration Fee
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Certified Floor Coaches
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 100% AC Clean Floor
              </span>
            </div>

          </div>

          {/* Right Hero Visual: Modern Gym Equipment Facility Card (5 Columns) */}
          <div className="lg:col-span-5 relative">
            
            {/* Elegant White & Blue Card Frame */}
            <div className="relative rounded-3xl overflow-hidden border border-blue-100 shadow-card group bg-white">
              
              {/* Gym Equipment & Facility Image */}
              <div className="relative h-[440px] sm:h-[540px] w-full overflow-hidden bg-slate-100">
                <img
                  src="/images/gym-hero.jpg"
                  alt="Modern Gym Facility & Equipment Floor"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                {/* Clean gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-black/20" />
                
                {/* Top Badge on image */}
                <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                  <span className="px-3.5 py-1.5 rounded-full bg-blue-600 text-white text-[11px] font-black tracking-wider uppercase shadow-blue-sm flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5" />
                    <span>State-Of-The-Art Equipment</span>
                  </span>
                </div>

                {/* Bottom Floating Stats Overlay on image */}
                <div className="absolute bottom-4 inset-x-4 z-20 p-4 rounded-2xl bg-white/95 border border-blue-100 backdrop-blur-md shadow-lg flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-blue-600 tracking-wider block">
                      Cardio & Strength Floor
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 font-heading">
                      Precision Biomechanics
                    </h4>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-black text-slate-900 font-heading block">
                      2 Shifts
                    </span>
                    <span className="text-[10px] text-slate-500">Daily Access</span>
                  </div>
                </div>

              </div>

            </div>

            {/* Decorative Floating Pill */}
            <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 p-3.5 rounded-2xl bg-white border border-blue-100 shadow-card hidden sm:flex items-center gap-3 z-30">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
                <Dumbbell className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <span className="font-extrabold text-slate-900 block">Olympic Racks & Weights</span>
                <span className="text-[10px] text-slate-500">Linear Resistance Systems</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
