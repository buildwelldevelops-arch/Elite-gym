import React from 'react';
import { Check, Star, Zap, Shield, Sparkles, MessageCircle, Flame } from 'lucide-react';
import { gymDetails } from '../data/gymData';
import { supabase } from '../lib/supabase';

export default function PricingPlans({ onOpenTrialModal, offers, settings }) {
  const { pricingPlans } = gymDetails;
  const activeOffer = (offers || []).find(o => o.is_active !== false);

  const getPlanPrice = (plan) => {
    if (plan.id === 'monthly' && settings?.monthlyPrice) return settings.monthlyPrice;
    if (plan.id === 'quarterly' && settings?.quarterlyPrice) return settings.quarterlyPrice;
    if (plan.id === 'annual' && settings?.annualPrice) return settings.annualPrice;
    return plan.price;
  };

  const handleSelectPlan = async (plan) => {
    const finalPrice = getPlanPrice(plan);
    const gymName = settings?.gymName || gymDetails.name;
    try {
      await supabase.from('membership_leads').insert([
        {
          plan_name: plan.name,
          plan_price: finalPrice,
          source: 'pricing_cards'
        }
      ]);
    } catch (err) {
      console.warn('Supabase lead record error:', err);
    }

    const whatsappNum = settings?.whatsapp || gymDetails.contact.whatsapp;
    const text = encodeURIComponent(
      `Hello ${gymName}! I am interested in joining the "${plan.name}" (${finalPrice}) membership. Please share admission details and current offers.`
    );
    window.open(`https://wa.me/${whatsappNum}?text=${text}`, '_blank');
  };

  return (
    <section id="pricing" className="py-20 sm:py-28 relative overflow-hidden bg-dark-900 border-t border-white/5">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold tracking-wider uppercase mb-4">
            <Zap className="w-3.5 h-3.5 text-red-500" />
            <span>Honest & Transparent Memberships</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-heading uppercase">
            Simple, All-Inclusive <span className="text-gradient-red">Membership Plans</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400">
            Full floor access to all morning and evening batches with zero hidden registration fees or lock-ins.
          </p>
        </div>

        {/* Active Special Offer Callout Banner */}
        {activeOffer && (
          <div className="max-w-3xl mx-auto mb-12 p-4 rounded-2xl bg-gradient-to-r from-red-950/60 via-dark-850 to-red-950/40 border border-red-500/30 text-white shadow-card-dark flex flex-col sm:flex-row items-center justify-between gap-4 text-xs backdrop-blur-md">
            <div className="flex items-center gap-3">
              <span className="p-2 rounded-xl bg-red-600 text-white shadow-glow-red shrink-0">
                <Sparkles className="w-4 h-4" />
              </span>
              <div className="text-center sm:text-left">
                <span className="font-black text-red-400 mr-2 uppercase tracking-wide">{activeOffer.discount_tag}</span>
                <span className="font-bold text-white">{activeOffer.title}</span>
                {activeOffer.promo_code && (
                  <span className="ml-2 font-mono text-[11px] bg-black/40 px-2.5 py-0.5 rounded text-cyan-400 border border-cyan-500/30 font-semibold">
                    CODE: {activeOffer.promo_code}
                  </span>
                )}
              </div>
            </div>
            <a
              href="#offers"
              className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold transition-all shrink-0 shadow-glow-red"
            >
              View Offers & Codes
            </a>
          </div>
        )}

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative ${
                plan.popular
                  ? 'bg-gradient-to-b from-dark-850 to-dark-950 border-2 border-red-500 shadow-glow-red md:-translate-y-2'
                  : 'bg-dark-950/90 border border-white/10 text-white shadow-card-dark hover:border-white/20'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-red-600 text-white text-[11px] font-black tracking-wider uppercase shadow-glow-red flex items-center gap-1.5">
                  <Star className="w-3 h-3 fill-white" />
                  <span>{plan.badge}</span>
                </div>
              )}

              <div>
                <h3 className="text-xl font-bold font-heading text-white tracking-wide">
                  {plan.name}
                </h3>
                <p className="text-xs mt-1 text-slate-400">
                  {plan.tagline}
                </p>

                <div className="my-6">
                  <div className="flex items-baseline gap-1 flex-wrap">
                    <span className="text-sm font-semibold text-slate-400">₹</span>
                    <span className="text-2xl sm:text-3xl lg:text-4xl font-black font-heading tracking-tight text-white break-all">
                      {getPlanPrice(plan)}
                    </span>
                    <span className="text-xs font-medium text-slate-400">/{plan.period}</span>
                  </div>
                  {plan.originalPrice && (
                    <span className="text-xs line-through mt-0.5 block text-slate-500">
                      Regular ₹{plan.originalPrice}
                    </span>
                  )}
                </div>

                <div className={`space-y-3 pt-4 border-t ${plan.popular ? 'border-red-500/20' : 'border-white/5'}`}>
                  {plan.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                        plan.popular ? 'bg-red-600 text-white' : 'bg-white/10 text-red-400'
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
                      ? 'bg-red-600 hover:bg-red-500 text-white shadow-glow-red font-black uppercase tracking-wider'
                      : 'bg-white/5 hover:bg-white/10 text-white border border-white/10 font-bold'
                  }`}
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Choose {plan.name}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Guarantee Banner */}
        <div className="mt-12 text-center text-xs text-slate-400 flex flex-wrap items-center justify-center gap-4">
          <div className="flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span>Zero Lock-in Contract</span>
          </div>
          <span className="text-slate-600">•</span>
          <div className="flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-red-500" />
            <span>Full Floor & Cardio Access</span>
          </div>
          <span className="text-slate-600">•</span>
          <div className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-cyan-400" />
            <span>Complimentary Trainer Induction</span>
          </div>
        </div>

      </div>
    </section>
  );
}
