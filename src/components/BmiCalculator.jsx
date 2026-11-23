import React, { useState } from 'react';
import { Calculator, ArrowRight, Activity, Flame, ShieldAlert, CheckCircle2, Sparkles } from 'lucide-react';
import { gymDetails } from '../data/gymData';

export default function BmiCalculator({ onOpenTrialModal }) {
  const [height, setHeight] = useState('172');
  const [weight, setWeight] = useState('68');
  const [age, setAge] = useState('24');
  const [gender, setGender] = useState('male');
  const [activity, setActivity] = useState('moderate');
  const [calculated, setCalculated] = useState(false);

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
      `Hello Elite Gym Sagar! I checked my BMI & Calorie stats on your website:\n\n` +
      `📏 Height: ${height} cm\n` +
      `⚖️ Weight: ${weight} kg\n` +
      `📊 BMI: ${bmi} (${bmiCategory})\n` +
      `🔥 Maintenance Calories: ${tdee} kcal\n` +
      `🎯 Fat Loss: ${fatLossCal} kcal | Muscle Gain: ${muscleGainCal} kcal\n\n` +
      `I want to plan my workout split at your Tili Road branch!`
    );
    return `https://wa.me/${gymDetails.contact.whatsapp}?text=${text}`;
  };

  return (
    <section className="py-16 sm:py-24 relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-bold tracking-wider uppercase mb-3">
            <Calculator className="w-3.5 h-3.5 text-purple-700" />
            <span>Health & Calorie Estimator</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-heading">
            BMI & Daily <span className="text-purple-700">Calorie Calculator</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Check where your numbers stand today and calculate the daily calories needed to reach your target physique.
          </p>
        </div>

        {/* Bento Calculator Card */}
        <div className="rounded-3xl bg-purple-50/40 border border-purple-200 p-6 sm:p-9 shadow-soft">
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
                      className={`py-2.5 rounded-xl text-xs font-bold transition-all border ${
                        gender === 'male'
                          ? 'bg-purple-700 text-white border-purple-700 shadow-purple-sm'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      Male
                    </button>
                    <button
                      type="button"
                      onClick={() => setGender('female')}
                      className={`py-2.5 rounded-xl text-xs font-bold transition-all border ${
                        gender === 'female'
                          ? 'bg-purple-700 text-white border-purple-700 shadow-purple-sm'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      Female
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Age (Years)</label>
                  <input
                    type="number"
                    min="14"
                    max="80"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-purple-600 transition-colors shadow-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Height (cm)</label>
                  <input
                    type="number"
                    min="100"
                    max="220"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-purple-600 transition-colors shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Current Weight (kg)</label>
                  <input
                    type="number"
                    min="30"
                    max="180"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-purple-600 transition-colors shadow-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Weekly Activity Level</label>
                <select
                  value={activity}
                  onChange={(e) => setActivity(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-purple-600 transition-colors shadow-sm"
                >
                  <option value="sedentary">Sedentary (Little or no workout)</option>
                  <option value="light">Lightly Active (1-3 gym days/week)</option>
                  <option value="moderate">Moderately Active (3-5 workouts/week)</option>
                  <option value="very_active">Very Active (Heavy training 6-7 days/week)</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-sm shadow-purple-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-purple-200" />
                  <span>Calculate Daily Targets</span>
                </button>
              </div>

            </div>

            {/* Results Display (5 Columns) */}
            <div className="lg:col-span-5 rounded-2xl bg-white border border-purple-200 p-6 space-y-4 shadow-sm">
              
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Your Body Metrics
                </span>
                <span className={`text-xs font-bold px-3 py-1 rounded-full border ${bmiBg}`}>
                  {bmiCategory}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-xl bg-purple-50/50 border border-purple-100">
                  <span className="text-[11px] text-slate-500 block font-medium">BMI Score</span>
                  <div className={`text-3xl font-black font-heading ${bmiColor}`}>
                    {bmi}
                  </div>
                  <span className="text-[10px] text-slate-400">Normal: 18.5 – 24.9</span>
                </div>

                <div className="p-4 rounded-xl bg-purple-50/50 border border-purple-100">
                  <span className="text-[11px] text-slate-500 block font-medium">Maintenance TDEE</span>
                  <div className="text-3xl font-black font-heading text-slate-900">
                    {tdee} <span className="text-xs font-normal text-slate-500">kcal</span>
                  </div>
                  <span className="text-[10px] text-slate-400">To maintain weight</span>
                </div>
              </div>

              {/* Target Nutrition Goals */}
              <div className="space-y-2 pt-1">
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-emerald-900">Fat Loss Target:</span>
                    <p className="text-[11px] text-emerald-700">450 kcal steady deficit</p>
                  </div>
                  <span className="text-lg font-black text-emerald-800 font-heading">
                    {fatLossCal} kcal
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-purple-950">Lean Muscle Building:</span>
                    <p className="text-[11px] text-purple-700">Calorie surplus for hypertrophy</p>
                  </div>
                  <span className="text-lg font-black text-purple-900 font-heading">
                    {muscleGainCal} kcal
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={getWhatsAppMessage()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-200 text-xs font-bold text-center text-purple-900 flex items-center justify-center gap-1.5 transition-all"
                >
                  <span>Share Numbers with Elite Gym Coach</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>

          </form>
        </div>

      </div>
    </section>
  );
}
