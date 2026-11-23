import React from 'react';
import { Award, CheckCircle, Shield, Sparkles } from 'lucide-react';
import { gymDetails } from '../data/gymData';

export default function Coaches({ onOpenTrialModal }) {
  const { coaches } = gymDetails;

  return (
    <section className="py-16 sm:py-24 relative overflow-hidden bg-purple-50/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-bold tracking-wider uppercase mb-3">
            <Award className="w-3.5 h-3.5 text-purple-700" />
            <span>Certified Fitness Coaches</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-heading">
            Professional & <span className="text-purple-700">Motivating Trainers</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            "Professional and motivating coaches provide excellent guidance and personal attention."
          </p>
        </div>

        {/* Coaches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {coaches.map((coach, index) => (
            <div
              key={index}
              className="rounded-3xl bg-white border border-purple-100 overflow-hidden group hover:border-purple-300 hover:shadow-soft transition-all flex flex-col justify-between shadow-sm"
            >
              <div className="relative h-64 sm:h-72 overflow-hidden bg-slate-100">
                <img
                  src={coach.image}
                  alt={coach.name}
                  loading="lazy"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 right-3 text-xs font-bold px-3 py-1 rounded-full bg-white/90 text-purple-900 border border-purple-200 backdrop-blur-md shadow-sm">
                  {coach.experience}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 font-heading">
                    {coach.name}
                  </h3>
                  <p className="text-xs font-bold text-purple-700 mt-0.5">
                    {coach.role}
                  </p>
                  <p className="text-xs text-slate-600 mt-2.5 flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Specialty: {coach.specialty}</span>
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 font-medium">On floor daily</span>
                  <button
                    onClick={onOpenTrialModal}
                    className="text-xs font-bold text-purple-700 hover:text-purple-900 transition-colors cursor-pointer"
                  >
                    Request Session →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Floor Promise Banner */}
        <div className="mt-8 p-6 sm:p-7 rounded-3xl bg-white border border-purple-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center shrink-0">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900">
                Active Spotting & Posture Guidance Guarantee
              </h4>
              <p className="text-xs text-slate-600 mt-0.5">
                Whether you are starting your very first workout or pushing for a heavy lift, our coaches are always on the floor to spot you safely.
              </p>
            </div>
          </div>
          <button
            onClick={onOpenTrialModal}
            className="w-full sm:w-auto px-5 py-3 rounded-xl text-xs font-bold bg-purple-700 text-white hover:bg-purple-800 transition-all shrink-0 cursor-pointer shadow-purple-sm"
          >
            Meet the Trainers in Person
          </button>
        </div>

      </div>
    </section>
  );
}
