import React, { useState } from 'react';
import { Tag, Sparkles, Check, Copy, MessageSquare, Clock, ArrowRight, ShieldCheck } from 'lucide-react';
import { gymDetails } from '../data/gymData';

export default function OffersSection({ offers, onOpenTrialModal }) {
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
    const message = encodeURIComponent(
      `Hello Elite Gym Sagar! I would like to claim the special offer: "${offer.title}" (Code: ${offer.promo_code || 'N/A'}). Please share discount details and admission process.`
    );
    window.open(`https://wa.me/${gymDetails.contact.whatsapp}?text=${message}`, '_blank');
  };

  return (
    <section id="offers" className="py-12 sm:py-16 relative overflow-hidden bg-gradient-to-b from-purple-50/50 via-white to-purple-50/30 border-y border-purple-100">
      
      {/* Background accents */}
      <div className="absolute top-10 right-10 w-72 h-72 bg-purple-200/30 rounded-full blur-[80px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-purple-100/40 rounded-full blur-[80px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-bold tracking-wider uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5 text-purple-700" />
              <span>Special Membership Deals</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
              Exclusive <span className="text-purple-700">Offers & Discounts</span>
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-xl">
              Limited-time discounts for Sagar residents, college students, and gym partners on Tili Road.
            </p>
          </div>

          <button
            onClick={onOpenTrialModal}
            className="self-start md:self-auto px-4 py-2 rounded-xl text-xs font-bold bg-white text-purple-800 border border-purple-200 hover:bg-purple-50 hover:border-purple-300 transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
          >
            <span>Or Claim 1-Day Free Trial</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeOffers.map((offer) => (
            <div
              key={offer.id}
              className="rounded-3xl bg-white border border-purple-200/80 hover:border-purple-400 p-6 shadow-sm hover:shadow-soft transition-all duration-300 flex flex-col justify-between relative group"
            >
              {/* Badge */}
              {offer.badge && (
                <div className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-purple-700 text-white text-[10px] font-extrabold uppercase tracking-wider shadow-sm">
                  {offer.badge}
                </div>
              )}

              <div>
                {/* Discount Tag */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-purple-100 text-purple-900 font-extrabold text-xs sm:text-sm">
                    <Tag className="w-3.5 h-3.5 text-purple-700" />
                    <span>{offer.discount_tag}</span>
                  </div>
                  
                  {offer.valid_until && (
                    <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
                      <Clock className="w-3 h-3 text-purple-500" />
                      <span>{offer.valid_until}</span>
                    </div>
                  )}
                </div>

                {/* Offer Title */}
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-purple-700 transition-colors font-heading">
                  {offer.title}
                </h3>

                {/* Description */}
                <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {offer.description}
                </p>
              </div>

              {/* Bottom Actions */}
              <div className="mt-6 pt-4 border-t border-purple-100 space-y-3">
                {/* Promo Code Copy */}
                {offer.promo_code && (
                  <div className="flex items-center justify-between gap-2 p-2 rounded-xl bg-purple-50/70 border border-purple-200/60">
                    <div className="text-[11px] font-mono text-purple-900 font-bold px-1">
                      CODE: <span className="underline decoration-purple-400">{offer.promo_code}</span>
                    </div>
                    <button
                      onClick={() => handleCopyCode(offer.promo_code)}
                      className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-white text-purple-800 border border-purple-200 hover:bg-purple-100 transition-all flex items-center gap-1 cursor-pointer"
                      title="Copy promo code"
                    >
                      {copiedCode === offer.promo_code ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span className="text-emerald-700">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 text-purple-600" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                )}

                {/* WhatsApp Claim Button */}
                <button
                  onClick={() => handleClaimOffer(offer)}
                  className="w-full py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs shadow-purple-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Claim Offer on WhatsApp</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
