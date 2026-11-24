import React, { useState, useEffect } from 'react';
import { Clock, Sun, Moon, CheckCircle2, Flame, Users, Calendar, ArrowRight, Shield } from 'lucide-react';
import { gymDetails } from '../data/gymData';
import { getGymBatchStatus } from '../utils/timeHelper';

export default function TimingsAndBatches({ onOpenTrialModal, settings }) {
  const [liveStatus, setLiveStatus] = useState(getGymBatchStatus());
  const [simulatedHour, setSimulatedHour] = useState(null);

  const morningBatch = settings?.morningBatch || '6:00 AM – 10:00 AM';
  const eveningBatch = settings?.eveningBatch || '5:00 PM – 10:00 PM';
  const sundayTimings = settings?.sundayTimings || '7:00 AM – 10:00 AM';

  useEffect(() => {
    setLiveStatus(getGymBatchStatus(simulatedHour));
  }, [simulatedHour]);

  const batches = gymDetails.timings.batches;

  return (
    <section id="timings" className="py-16 sm:py-24 relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-bold tracking-wider uppercase mb-3">
            <Clock className="w-3.5 h-3.5 text-purple-700" />
            <span>Dual Shift Schedule</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-heading">
            Workout Batches & <span className="text-purple-700">Gym Timings</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Open Monday through Saturday with dedicated morning and evening shifts on Tili Road, Sagar.
          </p>
        </div>

        {/* Live Status Bar Card */}
        <div className="p-5 sm:p-6 rounded-3xl bg-purple-50/60 border border-purple-200 shadow-sm mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="relative">
              <span className="w-4 h-4 rounded-full block bg-emerald-500" />
              <span className="w-4 h-4 rounded-full block bg-emerald-400 absolute inset-0 animate-ping opacity-60" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-black text-slate-900 font-heading">
                  {liveStatus.statusText}
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-white text-purple-800 font-bold border border-purple-200">
                  Tili Rd Floor
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                {liveStatus.subText}
              </p>
            </div>
          </div>

          {/* Quick interactive batch simulator */}
          <div className="flex items-center gap-2 text-xs text-slate-600 bg-white px-3.5 py-2 rounded-2xl border border-purple-200 shadow-sm">
            <span className="hidden sm:inline font-semibold">Test Shift:</span>
            <button
              onClick={() => setSimulatedHour(7)}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                simulatedHour === 7 ? 'bg-purple-700 text-white font-bold' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              Morning (7 AM)
            </button>
            <button
              onClick={() => setSimulatedHour(19)}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                simulatedHour === 19 ? 'bg-purple-700 text-white font-bold' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              Evening (7 PM)
            </button>
            {simulatedHour !== null && (
              <button
                onClick={() => setSimulatedHour(null)}
                className="text-[11px] text-purple-700 font-bold hover:underline ml-1 cursor-pointer"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Batches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Morning Batch */}
          <div className="rounded-3xl bg-white border border-purple-200 p-6 sm:p-8 relative overflow-hidden group hover:border-purple-400 hover:shadow-soft transition-all shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shadow-sm">
                <Sun className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                {batches[0].badge}
              </span>
            </div>

            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {batches[0].name}
            </span>
            <h3 className="text-3xl sm:text-4xl font-black text-slate-900 font-heading mt-1 mb-2">
              {morningBatch}
            </h3>
            <p className="text-sm text-slate-600 mb-6">
              {batches[0].highlight}
            </p>

            <div className="space-y-3 pt-4 border-t border-slate-100">
              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Zero wait times on squat racks, flat benches & cable crossovers</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Ideal for fasted fat burn, high-focus cardio & mental clarity</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Popular with Sagar university students, doctors & morning athletes</span>
              </div>
            </div>

            <div className="mt-8 pt-4 flex items-center justify-between border-t border-slate-100">
              <span className="text-xs font-medium text-slate-500">Monday – Saturday</span>
              <button
                onClick={onOpenTrialModal}
                className="text-xs font-bold text-purple-700 hover:text-purple-900 flex items-center gap-1 group cursor-pointer"
              >
                <span>Book Morning Pass</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Evening Batch */}
          <div className="rounded-3xl bg-gradient-to-br from-purple-900 via-purple-950 to-[#2e1065] text-white p-6 sm:p-8 relative overflow-hidden group shadow-purple-md transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-purple-200 shadow-sm">
                <Moon className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/15 text-purple-100 border border-white/20">
                {batches[1].badge}
              </span>
            </div>

            <span className="text-xs font-bold text-purple-200 uppercase tracking-wider">
              {batches[1].name}
            </span>
            <h3 className="text-3xl sm:text-4xl font-black text-white font-heading mt-1 mb-2">
              {eveningBatch}
            </h3>
            <p className="text-sm text-purple-100 mb-6">
              {batches[1].highlight}
            </p>

            <div className="space-y-3 pt-4 border-t border-white/10">
              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-purple-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0 mt-0.5" />
                <span>Floor coaches actively spotting heavy bench presses & deadlifts</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-purple-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0 mt-0.5" />
                <span>High-energy workout sound system & motivating community vibe</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-purple-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0 mt-0.5" />
                <span>Convenient post-office and evening training window till 10 PM</span>
              </div>
            </div>

            <div className="mt-8 pt-4 flex items-center justify-between border-t border-white/10">
              <span className="text-xs font-medium text-purple-200">Monday – Saturday</span>
              <button
                onClick={onOpenTrialModal}
                className="text-xs font-bold text-white hover:text-purple-200 flex items-center gap-1 group cursor-pointer"
              >
                <span>Book Evening Pass</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

        </div>

        {/* Sunday & Flexibility Policy */}
        <div className="mt-6 p-5 rounded-2xl bg-purple-50/60 border border-purple-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Sunday: {sundayTimings} (Active recovery & open floor)</h4>
              <p className="text-xs text-slate-600">Dual batch membership allows you to attend either Morning or Evening on any weekday.</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-purple-900 font-bold bg-white px-3.5 py-1.5 rounded-full border border-purple-200 shadow-sm">
            <Shield className="w-3.5 h-3.5 text-purple-600" />
            <span>100% Flexible Batch Attendance</span>
          </div>
        </div>

      </div>
    </section>
  );
}
