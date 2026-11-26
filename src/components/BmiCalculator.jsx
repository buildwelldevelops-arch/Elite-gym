import React, { useState } from 'react';
import { Calculator, ArrowRight, Activity, Flame, ShieldAlert, CheckCircle2, Sparkles, MessageSquare } from 'lucide-react';
import { gymDetails } from '../data/gymData';

export default function BmiCalculator({ onOpenTrialModal, settings }) {
  const [height, setHeight] = useState('172');
  const [weight, setWeight] = useState('68');
  const [age, setAge] = useState('24');
  const [gender, setGender] = useState('male');
  const [activity, setActivity] = useState('moderate');
  const [calculated, setCalculated] = useState(false);

  const gymName = settings?.gymName || gymDetails.name;
  const whatsappNum = settings?.whatsapp || gymDetails.contact.whatsapp;

  const heightM = parseFloat(height) / 100;
  const weightKg = parseFloat(weight);
  const bmi = (heightM > 0 && weightKg > 0) ? (weightKg / (heightM * heightM)).toFixed(1) : 0;

  let bmr = 10 * weightKg + 6.25 * parseFloat(height) - 5 * parseFloat(age);
  bmr = gender === 'male' ? bmr + 5 : bmr - 161;

  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    very_active: 1.725
  };
  const tdee = Math.round(bmr * (activityMultipliers[activity] || 1.55));
  const fatLossCal = Math.round(tdee - 450);
  const muscleGainCal = Math.round(tdee + 300);

  let bmiCategory = "Normal weight";
  let bmiColor = "text-emerald-700";
  let bmiBg = "bg-emerald-50 border-emerald-200 text-emerald-800";

  if (bmi < 18.5) {
    bmiCategory = "Underweight";
    bmiColor = "text-amber-700";
    bmiBg = "bg-amber-50 border-amber-200 text-amber-800";
  } else if (bmi >= 25 && bmi < 29.9) {
    bmiCategory = "Overweight";
    bmiColor = "text-amber-700";
    bmiBg = "bg-amber-50 border-amber-200 text-amber-800";
  } else if (bmi >= 30) {
    bmiCategory = "Obese";
    bmiColor = "text-rose-700";
    bmiBg = "bg-rose-50 border-rose-200 text-rose-800";
  }

  const handleCalculate = (e) => {
    e.preventDefault();
    setCalculated(true);
  };

  const getWhatsAppMessage = () => {
    const text = encodeURIComponent(
      `Hello ${gymName}! I checked my BMI & Calorie stats on your website:\n\n` +
      `📏 Height: ${height} cm\n` +
      `⚖️ Weight: ${weight} kg\n` +
      `📊 BMI: ${bmi} (${bmiCategory})\n` +
      `🔥 Maintenance Calories: ${tdee} kcal\n` +
      `🎯 Fat Loss: ${fatLossCal} kcal | Muscle Gain: ${muscleGainCal} kcal\n\n` +
      `I want to plan my training split at your gym!`
    );
    return `https://wa.me/${whatsappNum}?text=${text}`;
  };

  return (
    <section className="py-20 sm:py-28 relative overflow-hidden bg-white border-t border-slate-100">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-blue-50 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold tracking-wider uppercase mb-4">
            <Calculator className="w-3.5 h-3.5 text-blue-600" />
            <span>Health & Calorie Estimator</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight font-heading uppercase">
            BMI & Daily <span className="text-gradient-blue">Calorie Calculator</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Check where your metrics stand today and determine the daily nutrition targets needed to achieve your goals.
          </p>
        </div>

        {/* Bento Calculator Card */}
        <div className="rounded-3xl bg-slate-50/80 border border-blue-100 p-6 sm:p-10 shadow-sm">
          <form onSubmit={handleCalculate} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Input Controls (7 Columns) */}
            <div className="lg:col-span-7 space-y-4">
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Gender</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setGender('male')}
                      className={`py-2.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                        gender === 'male'
                          ? 'bg-blue-600 text-white border-blue-600 shadow-blue-sm'
                          : 'bg-white text-slate-600 border-slate-200 hover:border-blue-200'
                      }`}
                    >
                      Male
                    </button>
                    <button
                      type="button"
                      onClick={() => setGender('female')}
                      className={`py-2.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                        gender === 'female'
                          ? 'bg-blue-600 text-white border-blue-600 shadow-blue-sm'
                          : 'bg-white text-slate-600 border-slate-200 hover:border-blue-200'
                      }`}
                    >
                      Female
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Age</label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    min="14"
                    max="80"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs font-semibold focus:outline-none focus:border-blue-600 shadow-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Height (cm)</label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    min="120"
                    max="220"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs font-semibold focus:outline-none focus:border-blue-600 shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Weight (kg)</label>
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    min="35"
                    max="200"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs font-semibold focus:outline-none focus:border-blue-600 shadow-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Activity Level</label>
                <select
                  value={activity}
                  onChange={(e) => setActivity(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs font-semibold focus:outline-none focus:border-blue-600 shadow-sm"
                >
                  <option value="sedentary">Sedentary (Little or no workout)</option>
                  <option value="light">Lightly Active (Workout 1–3 days/wk)</option>
                  <option value="moderate">Moderately Active (Workout 3–5 days/wk)</option>
                  <option value="very_active">Very Active (Heavy training 6–7 days/wk)</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-black uppercase tracking-wider transition-all shadow-blue-sm flex items-center justify-center gap-2 cursor-pointer font-heading"
                >
                  <Calculator className="w-4 h-4" />
                  <span>Calculate Body Metrics</span>
                </button>
              </div>
            </div>

            {/* Results Display (5 Columns) */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-white border border-blue-100 shadow-sm flex flex-col justify-between space-y-6">
              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
                  Calculated Status
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-black font-heading text-slate-900">
                    {bmi}
                  </span>
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${bmiBg}`}>
                    {bmiCategory}
                  </span>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600">Maintenance Calories:</span>
                  <span className="font-bold text-slate-900 font-mono">{tdee} kcal</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600">Fat Loss Target:</span>
                  <span className="font-bold text-emerald-600 font-mono">{fatLossCal} kcal</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600">Muscle Gain Target:</span>
                  <span className="font-bold text-blue-600 font-mono">{muscleGainCal} kcal</span>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={getWhatsAppMessage()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
                  <span>Discuss With Trainer on WhatsApp</span>
                </a>
              </div>
            </div>

          </form>
        </div>

      </div>
    </section>
  );
}
