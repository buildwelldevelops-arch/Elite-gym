import React from 'react';
import { Check, Star, Zap, Shield, Sparkles, MessageCircle, GraduationCap } from 'lucide-react';
import { gymDetails } from '../data/gymData';
import { supabase } from '../lib/supabase';

export default function PricingPlans({ onOpenTrialModal }) {
  const { pricingPlans } = gymDetails;

  const handleSelectPlan = async (plan) => {
    try {
      await supabase.from('membership_leads').insert([
        {
          plan_name: plan.name,
          plan_price: plan.price,
          source: 'pricing_cards'
        }
      ]);
    } catch (err) {
      console.warn('Supabase lead record error:', err);
    }

    const text = encodeURIComponent(
      `Hello Elite Gym Sagar! I am interested in joining the "${plan.name}" (₹${plan.price}) at your Tili Road branch. Please share admission details and current offers.`
    );
    window.open(`https://wa.me/${gymDetails.contact.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <section id="pricing" className="py-16 sm:py-24 relative overflow-hidden bg-purple-50/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-bold tracking-wider uppercase mb-3">
            <Zap className="w-3.5 h-3.5 text-purple-700" />
            <span>Honest Sagar Memberships</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-heading">
            Simple, Transparent <span className="text-purple-700">Membership Plans</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Full access to both Morning (6–10 AM) & Evening (5–10 PM) shifts with zero hidden registration fees.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative ${
                plan.popular
                  ? 'bg-gradient-to-b from-purple-800 via-purple-900 to-purple-950 text-white shadow-purple-md md:-translate-y-2'
                  : 'bg-white border border-purple-100 text-slate-900 shadow-sm hover:border-purple-300'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-purple-600 text-white text-[11px] font-extrabold tracking-wider uppercase shadow-md flex items-center gap-1">
                  <Star className="w-3 h-3 fill-white" />
                  <span>{plan.badge}</span>
                </div>
              )}

              <div>
                <h3 className={`text-xl font-bold font-heading ${plan.popular ? 'text-white' : 'text-slate-900'}`}>
                  {plan.name}
                </h3>
                <p className={`text-xs mt-1 ${plan.popular ? 'text-purple-200' : 'text-slate-500'}`}>
                  {plan.tagline}
                </p>

                <div className="my-6">
                  <div className="flex items-baseline gap-1">
                    <span className={`text-sm font-semibold ${plan.popular ? 'text-purple-200' : 'text-slate-500'}`}>₹</span>
                    <span className={`text-4xl sm:text-5xl font-black font-heading tracking-tight ${plan.popular ? 'text-white' : 'text-slate-900'}`}>
                      {plan.price}
                    </span>
                    <span className={`text-xs font-medium ${plan.popular ? 'text-purple-200' : 'text-slate-500'}`}>/{plan.period}</span>
                  </div>
                  {plan.originalPrice && (
                    <span className={`text-xs line-through mt-0.5 block ${plan.popular ? 'text-purple-300' : 'text-slate-400'}`}>
                      Regular ₹{plan.originalPrice}
                    </span>
                  )}
                </div>

                <div className={`space-y-3 pt-4 border-t ${plan.popular ? 'border-purple-700/60' : 'border-slate-100'}`}>
                  {plan.features.map((feat, i) => (
                    <div key={i} className={`flex items-start gap-2.5 text-xs sm:text-sm ${plan.popular ? 'text-purple-100' : 'text-slate-700'}`}>
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                        plan.popular ? 'bg-purple-700 text-white' : 'bg-purple-100 text-purple-700'
                      }`}>
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8 mt-6">
                <button
                  onClick={() => handleSelectPlan(plan)}
                  className={`w-full py-3.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    plan.popular
                      ? 'bg-white hover:bg-purple-50 text-purple-900 shadow-md font-extrabold'
                      : 'bg-purple-700 hover:bg-purple-800 text-white shadow-purple-sm'
                  }`}
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Choose {plan.name}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Student Special Discount Banner */}
        <div className="mt-10 p-6 sm:p-7 rounded-3xl bg-white border border-purple-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center shrink-0">
              <GraduationCap className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-800 bg-purple-100 px-2.5 py-0.5 rounded-full">
                  Sagar Student Privilege
                </span>
                <span className="text-xs text-slate-500">Valid with Student ID</span>
              </div>
              <h4 className="text-lg font-bold text-slate-900 mt-1">
                Flat 15% OFF for College & University Students
              </h4>
              <p className="text-xs text-slate-600">
                Dr. Harisingh Gour University (DHSGSU), BTIRT, Gyanodaya & all Sagar college students receive special discounted rates.
              </p>
            </div>
          </div>
          <button
            onClick={onOpenTrialModal}
            className="w-full md:w-auto px-6 py-3 rounded-xl text-xs font-bold bg-purple-700 hover:bg-purple-800 text-white transition-colors shrink-0 shadow-purple-sm cursor-pointer"
          >
            Claim Student Discount Pass
          </button>
        </div>

      </div>
    </section>
  );
}
