import React from 'react';
import { Star, ShieldCheck, Dumbbell, Sparkles, Clock, MapPin, ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react';
import { gymDetails } from '../data/gymData';

export default function Hero({ onOpenTrialModal, onNavigateToQuiz }) {
  return (
    <section id="hero" className="relative pt-28 sm:pt-36 pb-16 sm:pb-24 overflow-hidden bg-gradient-to-b from-purple-50/70 via-white to-purple-50/30">
      
      {/* Delicate ambient purple accents */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[700px] h-[380px] bg-purple-200/40 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute top-64 right-10 w-80 h-80 bg-purple-100/50 rounded-full blur-[90px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          
          {/* Top trust badges */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-full bg-white border border-purple-200 shadow-sm">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-xs sm:text-sm font-semibold">
              <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
              <span>4.7 on Google</span>
              <span className="text-slate-500 font-normal">({gymDetails.reviewsSummary.totalReviews} reviews)</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-800 text-xs sm:text-sm font-semibold">
              <MapPin className="w-3.5 h-3.5 text-purple-600" />
              <span>Tili Rd, Sagar (Opp. Rozgar Office)</span>
            </div>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1] font-heading">
            Sagar's Premier <br />
            <span className="text-purple-700">Strength & Fitness</span> Facility
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
            Featuring <span className="text-slate-900 font-semibold">modern, top-notch equipment</span>, a 
            <span className="text-slate-900 font-semibold"> spacious & clean AC environment</span>, and 
            <span className="text-purple-700 font-semibold"> professional motivating coaches</span> dedicated to your daily consistency.
          </p>

          {/* Timing & Batch Pills */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm text-slate-700 py-2.5 px-4 rounded-2xl bg-white border border-purple-200 shadow-sm">
            <span className="flex items-center gap-1.5 text-purple-900 font-bold">
              <Clock className="w-4 h-4 text-purple-600" /> Two Daily Shifts:
            </span>
            <span className="bg-purple-50 text-purple-900 border border-purple-100 px-3 py-1 rounded-lg font-semibold">
              Morning: 6:00 AM – 10:00 AM
            </span>
            <span className="bg-purple-50 text-purple-900 border border-purple-100 px-3 py-1 rounded-lg font-semibold">
              Evening: 5:00 PM – 10:00 PM
            </span>
          </div>

          {/* CTA Group */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-4">
            <button
              onClick={onOpenTrialModal}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-base shadow-purple-md transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="w-5 h-5" />
              <span>Claim Free 1-Day Trial Pass</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={onNavigateToQuiz}
              className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white hover:bg-purple-50 text-purple-900 font-bold text-base border-2 border-purple-200 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <Sparkles className="w-5 h-5 text-purple-600" />
              <span>Personal Routine Finder</span>
            </button>
          </div>

          {/* Feature Bento Cards Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-10 text-left">
            <div className="p-5 rounded-2xl bg-white border border-purple-100 shadow-soft hover:border-purple-300 transition-all">
              <div className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">4.7 / 5.0</div>
              <div className="flex items-center gap-1 text-amber-500 my-1.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-3.5 h-3.5 ${i < 4 ? 'fill-amber-400' : 'fill-amber-400/50'}`} />
                ))}
              </div>
              <p className="text-xs text-slate-500">52 Verified Google Reviews</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-purple-100 shadow-soft hover:border-purple-300 transition-all">
              <div className="text-2xl sm:text-3xl font-black text-purple-700 font-heading">100% AC</div>
              <p className="text-xs text-slate-800 font-bold my-1">Spacious & Clean Floor</p>
              <p className="text-xs text-slate-500">Daily sanitised & ventilated</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-purple-100 shadow-soft hover:border-purple-300 transition-all">
              <div className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">Top-Notch</div>
              <p className="text-xs text-slate-800 font-bold my-1">Biomechanic Machines</p>
              <p className="text-xs text-slate-500">Cardio + Plate-Loaded Units</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-purple-100 shadow-soft hover:border-purple-300 transition-all">
              <div className="text-2xl sm:text-3xl font-black text-purple-700 font-heading">Coaching</div>
              <p className="text-xs text-slate-800 font-bold my-1">Always on Floor</p>
              <p className="text-xs text-slate-500">Daily posture checks & spots</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
