import React, { useState, useEffect } from 'react';
import { Clock, Sun, Moon, CheckCircle2, Flame, Users, Calendar, ArrowRight, Shield } from 'lucide-react';
import { gymDetails } from '../data/gymData';
import { getGymBatchStatus } from '../utils/timeHelper';

export default function TimingsAndBatches({ onOpenTrialModal, settings }) {
  const [liveStatus, setLiveStatus] = useState(getGymBatchStatus());
  const [simulatedHour, setSimulatedHour] = useState(null);

  const morningBatch = settings?.morningBatch || gymDetails.timings.morningBatch;
  const eveningBatch = settings?.eveningBatch || gymDetails.timings.eveningBatch;
  const sundayTimings = settings?.sundayTimings || gymDetails.timings.sunday;

  useEffect(() => {
    setLiveStatus(getGymBatchStatus(simulatedHour));
  }, [simulatedHour]);

  const batches = gymDetails.timings.batches;

  return (
    <section id="timings" className="py-20 sm:py-28 relative overflow-hidden bg-dark-950 border-t border-white/5">
      {/* Background neon glows */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold tracking-wider uppercase mb-4">
            <Clock className="w-3.5 h-3.5 text-red-500" />
            <span>Dual Shift Training Schedule</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-heading uppercase">
            Workout Batches & <span className="text-gradient-red">Gym Timings</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400">
            Engineered dual-shift schedules giving you full flexibility to train without machine queues.
          </p>
        </div>

        {/* Live Status Bar Card */}
        <div className="p-5 sm:p-6 rounded-2xl bg-dark-900/80 border border-white/10 shadow-card-dark mb-10 flex flex-col md:flex-row items-center justify-between gap-4 backdrop-blur-md">
          <div className="flex items-center gap-3.5">
            <div className="relative">
              <span className="w-3.5 h-3.5 rounded-full block bg-emerald-500" />
              <span className="w-3.5 h-3.5 rounded-full block bg-emerald-400 absolute inset-0 animate-ping opacity-60" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <span className="text-base sm:text-lg font-black text-white font-heading">
                  {liveStatus.statusText}
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/5 text-cyan-400 font-semibold border border-cyan-500/20">
                  Live Floor Status
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                {liveStatus.subText}
              </p>
            </div>
          </div>

          {/* Quick interactive batch simulator */}
          <div className="flex items-center gap-2 text-xs text-slate-400 bg-dark-950/80 px-3.5 py-2 rounded-xl border border-white/10">
            <span className="hidden sm:inline font-semibold text-slate-300">Simulate Shift:</span>
            <button
              onClick={() => setSimulatedHour(7)}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer font-medium ${
                simulatedHour === 7 ? 'bg-red-600 text-white font-bold shadow-glow-red' : 'bg-white/5 hover:bg-white/10 text-slate-300'
              }`}
            >
              Morning (7 AM)
            </button>
            <button
              onClick={() => setSimulatedHour(19)}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer font-medium ${
                simulatedHour === 19 ? 'bg-red-600 text-white font-bold shadow-glow-red' : 'bg-white/5 hover:bg-white/10 text-slate-300'
              }`}
            >
              Evening (7 PM)
            </button>
            {simulatedHour !== null && (
              <button
                onClick={() => setSimulatedHour(null)}
                className="text-[11px] text-red-400 font-bold hover:underline ml-1 cursor-pointer"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Batches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          
          {/* Morning Batch */}
          <div className="rounded-3xl bg-dark-900/90 border border-white/10 p-6 sm:p-8 relative overflow-hidden group hover:border-red-500/30 transition-all shadow-card-dark">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Sun className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
                {batches[0]?.badge || "Fresh & Energizing"}
              </span>
            </div>

            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              {batches[0]?.name || "Morning Shift"}
            </span>
            <h3 className="text-3xl sm:text-4xl font-black text-white font-heading mt-1 mb-2 tracking-tight">
              {morningBatch}
            </h3>
            <p className="text-sm text-slate-400 mb-6">
              {batches[0]?.highlight || "Peak energy, fasted cardio, and focused strength sets"}
            </p>

            <div className="space-y-3 pt-4 border-t border-white/5">
              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>Zero wait times on squat racks, flat benches & cardio equipment</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>Prime environment for fasted fat burn, high-focus cardio & mental clarity</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>Dedicated on-floor coaching support for early-bird athletes</span>
              </div>
            </div>

            <div className="mt-8 pt-4 flex items-center justify-between border-t border-white/5">
              <span className="text-xs font-medium text-slate-400">Monday – Saturday</span>
              <button
                onClick={onOpenTrialModal}
                className="text-xs font-bold text-red-400 hover:text-red-300 flex items-center gap-1.5 group cursor-pointer"
              >
                <span>Book Morning Pass</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Evening Batch */}
          <div className="rounded-3xl bg-gradient-to-br from-dark-900 via-dark-850 to-red-950/30 border border-red-500/20 p-6 sm:p-8 relative overflow-hidden group shadow-card-dark transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 shadow-sm">
                <Moon className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-red-500/15 text-red-300 border border-red-500/30">
                {batches[1]?.badge || "Prime Atmosphere"}
              </span>
            </div>

            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              {batches[1]?.name || "Evening Shift"}
            </span>
            <h3 className="text-3xl sm:text-4xl font-black text-white font-heading mt-1 mb-2 tracking-tight">
              {eveningBatch}
            </h3>
            <p className="text-sm text-slate-300 mb-6">
              {batches[1]?.highlight || "High octane music, coach spotters & post-work pump"}
            </p>

            <div className="space-y-3 pt-4 border-t border-white/10">
              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>High-octane workout playlist and full community power</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>Active coach spotters present on heavy bench, squat & deadlift zones</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>Optimal for post-work hypertrophy and progressive overload</span>
              </div>
            </div>

            <div className="mt-8 pt-4 flex items-center justify-between border-t border-white/10">
              <span className="text-xs font-medium text-slate-400">Monday – Saturday</span>
              <button
                onClick={onOpenTrialModal}
                className="text-xs font-bold text-red-400 hover:text-red-300 flex items-center gap-1.5 group cursor-pointer"
              >
                <span>Book Evening Pass</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

        </div>

        {/* Weekend Timings & Guarantee Banner */}
        <div className="mt-8 p-5 sm:p-6 rounded-2xl bg-dark-900/60 border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-white block">Sunday Open Floor Schedule:</span>
              <span>{sundayTimings}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-slate-300">
            <Shield className="w-4 h-4 text-red-500 shrink-0" />
            <span>Both shifts included in standard membership with no extra fees</span>
          </div>
        </div>

      </div>
    </section>
  );
}
