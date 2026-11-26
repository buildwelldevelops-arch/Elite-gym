import React, { useState } from 'react';
import { Sparkles, Check, ArrowRight, RotateCcw, Flame, Dumbbell, Activity, Heart, ShieldCheck } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function FitnessQuiz({ onOpenTrialModal }) {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    goal: 'Build Muscle',
    experience: 'Beginner (0-6 months)',
    preferredShift: 'Evening Shift',
    focusArea: 'Full Body Transformation'
  });
  const [submitted, setSubmitted] = useState(false);

  const goals = [
    { id: 'muscle', label: 'Build Muscle & Hypertrophy', desc: 'Focus on progressive overload & volume', icon: Dumbbell },
    { id: 'fatloss', label: 'Lose Fat & Conditioning', desc: 'High intensity cardio & circuit splits', icon: Flame },
    { id: 'strength', label: 'Heavy Strength & Power', desc: 'Compound lifts & Olympic barbell sets', icon: Activity },
    { id: 'stamina', label: 'Active Health & Longevity', desc: 'Mobility, endurance & stress relief', icon: Heart }
  ];

  const experiences = [
    'Beginner (0 – 6 months)',
    'Intermediate (1 – 3 years)',
    'Advanced (3+ years lifting)'
  ];

  const shifts = [
    'Morning Shift (Early cardio & lifts)',
    'Evening Shift (Post-work pump & coaching)',
    'Flexible (Alternating between shifts)'
  ];

  const handleFinishQuiz = async () => {
    setSubmitted(true);
    try {
      await supabase.from('quiz_submissions').insert([
        {
          name: 'Prospective Member',
          goal: answers.goal,
          experience_level: answers.experience,
          preferred_shift: answers.preferredShift,
          focus_area: answers.focusArea
        }
      ]);
    } catch (e) {
      console.warn('Quiz submission error:', e);
    }
  };

  const handleReset = () => {
    setStep(1);
    setSubmitted(false);
  };

  return (
    <section id="quiz" className="py-20 relative overflow-hidden bg-[#070a12] border-t border-white/10">
      
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-red-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-xs font-bold tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Personalized Workout Blueprint</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-heading">
            FIND YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-400">PERFECT PLAN</span>
          </h2>
          <p className="mt-3 text-sm text-slate-400">
            Answer 3 quick questions to discover your optimal workout split and batch schedule.
          </p>
        </div>

        {/* Interactive Bento Quiz Container */}
        <div className="rounded-3xl bg-[#0f172a]/95 border border-white/15 p-6 sm:p-10 shadow-card-dark">
          
          {!submitted ? (
            <div className="space-y-8">
              
              {/* Step Indicators */}
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <span className="text-xs font-extrabold uppercase tracking-wider text-red-400">
                  Question 0{step} of 03
                </span>
                <div className="flex items-center gap-2">
                  {[1, 2, 3].map((s) => (
                    <span 
                      key={s} 
                      className={`h-1.5 rounded-full transition-all ${
                        step >= s ? 'w-8 bg-red-500' : 'w-3 bg-white/20'
                      }`} 
                    />
                  ))}
                </div>
              </div>

              {/* Step 1: Fitness Goal */}
              {step === 1 && (
                <div className="space-y-4">
                  <h3 className="text-xl sm:text-2xl font-black text-white font-heading">
                    What is your primary fitness aspiration?
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    {goals.map((g) => {
                      const Icon = g.icon;
                      const isSelected = answers.goal === g.label;
                      return (
                        <button
                          key={g.id}
                          type="button"
                          onClick={() => setAnswers({ ...answers, goal: g.label })}
                          className={`p-4 rounded-2xl border text-left transition-all flex items-start gap-3.5 cursor-pointer ${
                            isSelected
                              ? 'bg-red-600/20 border-red-500 shadow-glow-red'
                              : 'bg-white/5 border-white/10 hover:border-white/30 text-slate-300'
                          }`}
                        >
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                            isSelected ? 'bg-red-500 text-white' : 'bg-white/10 text-slate-300'
                          }`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="font-bold text-white block text-sm">{g.label}</span>
                            <span className="text-xs text-slate-400 mt-0.5 block">{g.desc}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 2: Experience */}
              {step === 2 && (
                <div className="space-y-4">
                  <h3 className="text-xl sm:text-2xl font-black text-white font-heading">
                    What is your gym lifting background?
                  </h3>
                  <div className="grid grid-cols-1 gap-3 pt-2">
                    {experiences.map((exp) => (
                      <button
                        key={exp}
                        type="button"
                        onClick={() => setAnswers({ ...answers, experience: exp })}
                        className={`p-4 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                          answers.experience === exp
                            ? 'bg-red-600/20 border-red-500 text-white'
                            : 'bg-white/5 border-white/10 hover:border-white/30 text-slate-300'
                        }`}
                      >
                        <span className="font-bold text-sm">{exp}</span>
                        {answers.experience === exp && <Check className="w-5 h-5 text-red-400" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Preferred Shift */}
              {step === 3 && (
                <div className="space-y-4">
                  <h3 className="text-xl sm:text-2xl font-black text-white font-heading">
                    Which workout shift fits your daily lifestyle?
                  </h3>
                  <div className="grid grid-cols-1 gap-3 pt-2">
                    {shifts.map((shift) => (
                      <button
                        key={shift}
                        type="button"
                        onClick={() => setAnswers({ ...answers, preferredShift: shift })}
                        className={`p-4 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                          answers.preferredShift === shift
                            ? 'bg-red-600/20 border-red-500 text-white'
                            : 'bg-white/5 border-white/10 hover:border-white/30 text-slate-300'
                        }`}
                      >
                        <span className="font-bold text-sm">{shift}</span>
                        {answers.preferredShift === shift && <Check className="w-5 h-5 text-red-400" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Bottom Navigation Buttons */}
              <div className="flex items-center justify-between pt-6 border-t border-white/10">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-300 hover:text-white bg-white/5 border border-white/10 cursor-pointer"
                  >
                    Back
                  </button>
                ) : <div />}

                {step < 3 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step + 1)}
                    className="px-6 py-2.5 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-500 text-white shadow-glow-red flex items-center gap-2 cursor-pointer"
                  >
                    <span>Next</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleFinishQuiz}
                    className="px-8 py-3 rounded-xl text-xs sm:text-sm font-extrabold bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 text-white shadow-glow-red flex items-center gap-2 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Generate Custom Blueprint</span>
                  </button>
                )}
              </div>

            </div>
          ) : (
            /* Results Screen */
            <div className="text-center py-6 space-y-6 animate-fadeIn">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-red-600 to-red-500 text-white flex items-center justify-center mx-auto shadow-glow-red">
                <ShieldCheck className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-red-400 bg-red-600/10 px-3 py-1 rounded-full border border-red-500/20">
                  Recommended Routine Generated
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white font-heading mt-3">
                  Tailored Blueprint for {answers.goal}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto mt-2">
                  Based on your {answers.experience} background and {answers.preferredShift} selection, here is your roadmap:
                </p>
              </div>

              {/* Blueprint Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto text-left">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-[10px] font-bold text-red-400 uppercase">Training Split</span>
                  <span className="font-extrabold text-white block text-sm mt-1">4-Day Upper / Lower</span>
                  <p className="text-[11px] text-slate-400 mt-1">Optimal muscle recovery & progressive volume.</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-[10px] font-bold text-cyan-400 uppercase">Cardio Protocol</span>
                  <span className="font-extrabold text-white block text-sm mt-1">15-min Post Workout</span>
                  <p className="text-[11px] text-slate-400 mt-1">Low-impact treadmill incline walking.</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-[10px] font-bold text-amber-400 uppercase">Coaching Advice</span>
                  <span className="font-extrabold text-white block text-sm mt-1">Form & Spotter Checks</span>
                  <p className="text-[11px] text-slate-400 mt-1">Free posture assistance from floor coaches.</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                <button
                  onClick={onOpenTrialModal}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 text-white font-bold text-xs sm:text-sm shadow-glow-red transition-all cursor-pointer"
                >
                  Claim 1-Day Trial to Test This Routine
                </button>
                <button
                  onClick={handleReset}
                  className="px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Quiz</span>
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
}
