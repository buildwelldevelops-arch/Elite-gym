import React, { useState } from 'react';
import { Sparkles, Check, ArrowRight, RotateCcw, Flame, Dumbbell, Activity, Heart, ShieldCheck } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function FitnessQuiz({ onOpenTrialModal }) {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    goal: 'Build Muscle & Hypertrophy',
    experience: 'Beginner (0 – 6 months)',
    preferredShift: 'Evening Shift (Post-work pump & coaching)',
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
    <section id="quiz" className="py-20 relative overflow-hidden bg-slate-50 border-t border-slate-100">
      
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-blue-100/50 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Personalized Workout Blueprint</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight font-heading uppercase">
            FIND YOUR <span className="text-gradient-blue">PERFECT PLAN</span>
          </h2>
          <p className="mt-3 text-sm text-slate-600">
            Answer 3 quick questions to discover your optimal workout split and batch schedule.
          </p>
        </div>

        {/* Interactive Bento Quiz Container */}
        <div className="rounded-3xl bg-white border border-blue-100 p-6 sm:p-10 shadow-card">
          
          {!submitted ? (
            <div className="space-y-8">
              
              {/* Step Indicators */}
              <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600">
                  Question 0{step} of 03
                </span>
                <div className="flex items-center gap-2">
                  {[1, 2, 3].map((s) => (
                    <span 
                      key={s} 
                      className={`h-2 rounded-full transition-all ${
                        step >= s ? 'w-8 bg-blue-600' : 'w-3 bg-slate-200'
                      }`} 
                    />
                  ))}
                </div>
              </div>

              {/* Step 1: Fitness Goal */}
              {step === 1 && (
                <div className="space-y-4">
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
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
                              ? 'bg-blue-50/80 border-blue-500 shadow-blue-sm text-blue-950'
                              : 'bg-white border-slate-200 hover:border-blue-200 text-slate-700'
                          }`}
                        >
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                            isSelected ? 'bg-blue-600 text-white shadow-blue-sm' : 'bg-slate-100 text-slate-500'
                          }`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="font-bold text-slate-900 block text-sm">{g.label}</span>
                            <span className="text-xs text-slate-500 mt-0.5 block">{g.desc}</span>
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
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
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
                            ? 'bg-blue-50/80 border-blue-500 text-blue-950 font-bold shadow-sm'
                            : 'bg-white border-slate-200 hover:border-blue-200 text-slate-700'
                        }`}
                      >
                        <span className="font-bold text-sm">{exp}</span>
                        {answers.experience === exp && <Check className="w-5 h-5 text-blue-600" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Preferred Shift */}
              {step === 3 && (
                <div className="space-y-4">
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
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
                            ? 'bg-blue-50/80 border-blue-500 text-blue-950 font-bold shadow-sm'
                            : 'bg-white border-slate-200 hover:border-blue-200 text-slate-700'
                        }`}
                      >
                        <span className="font-bold text-sm">{shift}</span>
                        {answers.preferredShift === shift && <Check className="w-5 h-5 text-blue-600" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Bottom Navigation Buttons */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 cursor-pointer"
                  >
                    Back
                  </button>
                ) : <div />}

                {step < 3 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step + 1)}
                    className="px-6 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-blue-sm flex items-center gap-2 cursor-pointer font-heading tracking-wide"
                  >
                    <span>Next</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleFinishQuiz}
                    className="px-8 py-3 rounded-xl text-xs sm:text-sm font-extrabold bg-blue-600 hover:bg-blue-700 text-white shadow-blue-md flex items-center gap-2 cursor-pointer font-heading tracking-wide"
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
              <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto shadow-blue-md">
                <ShieldCheck className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                  Recommended Routine Generated
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading mt-3 uppercase">
                  Tailored Blueprint for {answers.goal}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto mt-2">
                  Based on your {answers.experience} background and {answers.preferredShift} selection, here is your roadmap:
                </p>
              </div>

              {/* Blueprint Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto text-left">
                <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100 shadow-sm">
                  <span className="text-[10px] font-bold text-blue-700 uppercase">Training Split</span>
                  <span className="font-extrabold text-slate-900 block text-sm mt-1">4-Day Upper / Lower</span>
                  <p className="text-[11px] text-slate-500 mt-1">Optimal muscle recovery & progressive volume.</p>
                </div>
                <div className="p-4 rounded-2xl bg-sky-50/50 border border-sky-100 shadow-sm">
                  <span className="text-[10px] font-bold text-sky-700 uppercase">Cardio Protocol</span>
                  <span className="font-extrabold text-slate-900 block text-sm mt-1">15-min Post Workout</span>
                  <p className="text-[11px] text-slate-500 mt-1">Low-impact treadmill incline walking.</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
                  <span className="text-[10px] font-bold text-slate-700 uppercase">Coaching Advice</span>
                  <span className="font-extrabold text-slate-900 block text-sm mt-1">Form & Spotter Checks</span>
                  <p className="text-[11px] text-slate-500 mt-1">Free posture assistance from floor coaches.</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                <button
                  onClick={onOpenTrialModal}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-blue-md transition-all cursor-pointer font-heading tracking-wide"
                >
                  Claim 1-Day Trial to Test This Routine
                </button>
                <button
                  onClick={handleReset}
                  className="px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
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
