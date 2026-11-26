import React from 'react';
import { Award, CheckCircle, Shield, Sparkles, Flame, ArrowRight } from 'lucide-react';
import { gymDetails } from '../data/gymData';

export default function Coaches({ onOpenTrialModal }) {
  const { coaches } = gymDetails;

  return (
    <section className="py-20 sm:py-28 relative overflow-hidden bg-slate-50 border-t border-slate-100">
      {/* Background glow */}
      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-blue-100/40 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold tracking-wider uppercase mb-4">
            <Award className="w-3.5 h-3.5 text-blue-600" />
            <span>Certified Performance Coaches</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight font-heading uppercase">
            Professional & <span className="text-gradient-blue">Motivating Trainers</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Certified coaches who provide hands-on posture guidance, safe spotting, and goal-driven programming.
          </p>
        </div>

        {/* Coaches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {coaches.map((coach, index) => (
            <div
              key={index}
              className="rounded-3xl bg-white border border-blue-100 hover:border-blue-300 shadow-sm hover:shadow-card transition-all flex flex-col justify-between overflow-hidden"
            >
              <div className="relative h-64 sm:h-72 overflow-hidden bg-slate-100">
                <img
                  src={coach.image}
                  alt={coach.name}
                  loading="lazy"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 right-3 text-xs font-bold px-3 py-1 rounded-full bg-white/90 text-blue-900 border border-blue-100 backdrop-blur-md shadow-sm">
                  {coach.experience}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 font-heading tracking-wide">
                    {coach.name}
                  </h3>
                  <p className="text-xs font-bold text-blue-600 mt-0.5 uppercase tracking-wider">
                    {coach.role}
                  </p>
                  <p className="text-xs text-slate-600 mt-3 flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Specialty: {coach.specialty}</span>
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 font-medium">On floor daily</span>
                  <button
                    onClick={onOpenTrialModal}
                    className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1 group/btn cursor-pointer"
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
        <div className="mt-10 p-6 sm:p-7 rounded-3xl bg-white border border-blue-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center shrink-0">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900">
                Active Spotting & Safe Lifting Guarantee
              </h4>
              <p className="text-xs text-slate-600 mt-0.5">
                Whether you are starting your first day of training or testing a heavy 1RM, our coaches are always available on the floor to spot you safely.
              </p>
            </div>
          </div>
          <button
            onClick={onOpenTrialModal}
            className="w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white transition-all shrink-0 cursor-pointer shadow-blue-sm uppercase tracking-wider font-heading"
          >
            Meet the Coaches
          </button>
        </div>

      </div>
    </section>
  );
}
