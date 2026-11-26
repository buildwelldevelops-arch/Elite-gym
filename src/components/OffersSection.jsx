import React, { useState } from 'react';
import { Tag, Sparkles, Check, Copy, MessageSquare, Clock, ArrowRight, Flame } from 'lucide-react';
import { gymDetails } from '../data/gymData';

export default function OffersSection({ offers, onOpenTrialModal, settings }) {
  const [copiedCode, setCopiedCode] = useState(null);

  const activeOffers = (offers || []).filter(o => o.is_active !== false);

  if (!activeOffers || activeOffers.length === 0) {
    return null;
  }

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const handleClaimOffer = (offer) => {
    const gymName = settings?.gymName || gymDetails.name;
    const whatsappNum = settings?.whatsapp || gymDetails.contact.whatsapp;
    const message = encodeURIComponent(
      `Hello ${gymName}! I would like to claim the special offer: "${offer.title}" (Code: ${offer.promo_code || 'N/A'}). Please share discount details and admission process.`
    );
    window.open(`https://wa.me/${whatsappNum}?text=${message}`, '_blank');
  };

  return (
    <section id="offers" className="py-16 sm:py-20 relative overflow-hidden bg-dark-950 border-y border-white/5">
      {/* Background accents */}
      <div className="absolute top-10 right-10 w-72 h-72 bg-red-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 sm:mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold tracking-wider uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5 text-red-500" />
              <span>Special Admission Offers</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight font-heading uppercase">
              Exclusive <span className="text-gradient-red">Offers & Deals</span>
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-400 max-w-xl">
              Limited-time admission discounts and seasonal vouchers available for new members.
            </p>
          </div>

          <button
            onClick={onOpenTrialModal}
            className="self-start md:self-auto px-4 py-2.5 rounded-xl text-xs font-bold bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-red-500/40 transition-all shadow-sm flex items-center gap-2 cursor-pointer"
          >
            <span>Or Claim 1-Day VIP Pass</span>
            <ArrowRight className="w-3.5 h-3.5 text-red-400" />
          </button>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeOffers.map((offer) => (
            <div
              key={offer.id}
              className="rounded-3xl bg-dark-900/90 border border-white/10 hover:border-red-500/40 p-6 shadow-card-dark hover:shadow-glow-red transition-all duration-300 flex flex-col justify-between relative group backdrop-blur-sm"
            >
              {/* Badge */}
              {offer.badge && (
                <div className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-black uppercase tracking-wider shadow-glow-red">
                  {offer.badge}
                </div>
              )}

              <div>
                {/* Discount Tag */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-red-500/15 border border-red-500/30 text-red-400 font-black text-xs sm:text-sm">
                    <Tag className="w-3.5 h-3.5 text-red-500" />
                    <span>{offer.discount_tag}</span>
                  </div>
                  
                  {offer.valid_until && (
                    <div className="flex items-center gap-1 text-[11px] text-slate-400 font-medium">
                      <Clock className="w-3 h-3 text-cyan-400" />
                      <span>{offer.valid_until}</span>
                    </div>
                  )}
                </div>

                {/* Offer Title */}
                <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors font-heading tracking-wide">
                  {offer.title}
                </h3>

                {/* Description */}
                <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {offer.description}
                </p>
              </div>

              {/* Promo Code & Action */}
              <div className="mt-6 pt-4 border-t border-white/5 space-y-3">
                {offer.promo_code && (
                  <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-black/40 border border-white/5">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-slate-400 uppercase font-semibold">Code:</span>
                      <code className="text-xs font-mono font-bold text-cyan-400">{offer.promo_code}</code>
                    </div>
                    <button
                      onClick={() => handleCopyCode(offer.promo_code)}
                      className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-[11px] font-bold text-slate-300 hover:text-white transition-all flex items-center gap-1 cursor-pointer"
                    >
                      {copiedCode === offer.promo_code ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                )}

                <button
                  onClick={() => handleClaimOffer(offer)}
                  className="w-full py-2.5 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-500 text-white flex items-center justify-center gap-2 transition-all shadow-glow-red cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Claim on WhatsApp</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
