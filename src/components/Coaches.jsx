import React from 'react';
import { Award, CheckCircle, Shield, Sparkles, Flame, ArrowRight } from 'lucide-react';
import { gymDetails } from '../data/gymData';

export default function Coaches({ onOpenTrialModal }) {
  const { coaches } = gymDetails;

  return (
    <section className="py-20 sm:py-28 relative overflow-hidden bg-dark-950 border-t border-white/5">
      {/* Background glow */}
      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-red-600/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold tracking-wider uppercase mb-4">
            <Award className="w-3.5 h-3.5 text-red-500" />
            <span>Certified Performance Coaches</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-heading uppercase">
            Professional & <span className="text-gradient-red">Motivating Trainers</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400">
            Certified coaches who provide hands-on posture guidance, safe spotting, and goal-driven programming.
          </p>
        </div>

        {/* Coaches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {coaches.map((coach, index) => (
            <div
              key={index}
              className="rounded-3xl bg-dark-900/90 border border-white/10 overflow-hidden group hover:border-red-500/30 shadow-card-dark transition-all flex flex-col justify-between backdrop-blur-sm"
            >
              <div className="relative h-64 sm:h-72 overflow-hidden bg-dark-950">
                <img
                  src={coach.image}
                  alt={coach.name}
                  loading="lazy"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent" />
                <span className="absolute top-3 right-3 text-xs font-bold px-3 py-1 rounded-full bg-dark-950/80 text-white border border-white/10 backdrop-blur-md shadow-sm">
                  {coach.experience}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white font-heading tracking-wide">
                    {coach.name}
                  </h3>
                  <p className="text-xs font-bold text-red-400 mt-0.5 uppercase tracking-wider">
                    {coach.role}
                  </p>
                  <p className="text-xs text-slate-400 mt-3 flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>Specialty: {coach.specialty}</span>
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 font-medium">On floor daily</span>
                  <button
                    onClick={onOpenTrialModal}
                    className="text-xs font-bold text-red-400 hover:text-red-300 transition-colors flex items-center gap-1 group/btn cursor-pointer"
                  >
                    <span>Request Session</span>
                    <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Floor Promise Banner */}
        <div className="mt-10 p-6 sm:p-7 rounded-3xl bg-dark-900/80 border border-white/10 shadow-card-dark flex flex-col sm:flex-row items-center justify-between gap-6 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-red-600/10 border border-red-500/20 text-red-400 flex items-center justify-center shrink-0">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white">
                Active Spotting & Safe Lifting Guarantee
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Whether you are starting your first day of training or testing a heavy 1RM, our coaches are always available on the floor to spot you safely.
              </p>
            </div>
          </div>
          <button
            onClick={onOpenTrialModal}
            className="w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-500 text-white transition-all shrink-0 cursor-pointer shadow-glow-red uppercase tracking-wider"
          >
            Meet the Coaches
          </button>
        </div>

      </div>
    </section>
  );
}
