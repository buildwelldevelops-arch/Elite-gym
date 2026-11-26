import React, { useState } from 'react';
import { X, Dumbbell, ShieldCheck, Check, Sparkles, MapPin, Clock, Calendar, Share2 } from 'lucide-react';
import { gymDetails } from '../data/gymData';
import confetti from 'canvas-confetti';
import { supabase } from '../lib/supabase';

export default function TrialModal({ isOpen, onClose, settings }) {
  if (!isOpen) return null;

  const gymName = settings?.gymName || gymDetails.name;
  const address = settings?.address || gymDetails.address.full;
  const whatsappNum = settings?.whatsapp || gymDetails.contact.whatsapp;
  const morningBatch = settings?.morningBatch || gymDetails.timings.morningBatch;
  const eveningBatch = settings?.eveningBatch || gymDetails.timings.eveningBatch;

  const [step, setStep] = useState(1);
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userBatch, setUserBatch] = useState(`Evening Shift (${eveningBatch})`);
  const [passCode, setPassCode] = useState('');

  const handleGenerate = async (e) => {
    e.preventDefault();
    const code = 'VIP-' + Math.floor(1000 + Math.random() * 9000);
    setPassCode(code);
    setStep(2);

    try {
      await supabase.from('trial_passes').insert([
        {
          pass_code: code,
          name: userName,
          phone: userPhone,
          batch: userBatch,
          status: 'active'
        }
      ]);
    } catch (err) {
      console.warn('Supabase pass sync error:', err);
    }

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.5 }
      });
    } catch (e) {}
  };

  const getWhatsAppConfirmLink = () => {
    const text = encodeURIComponent(
      `Hello ${gymName}! I generated my 1-Day Free VIP Pass:\n\n` +
      `🎟️ Pass ID: ${passCode}\n` +
      `👤 Name: ${userName}\n` +
      `⏰ Batch: ${userBatch}\n` +
      `📍 Location: ${address}\n\n` +
      `Please confirm my trial pass. Thank you!`
    );
    return `https://wa.me/${whatsappNum}?text=${text}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-lg rounded-3xl bg-white border border-blue-100 p-6 sm:p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 1 ? (
          <div>
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 mb-3 border border-blue-200 shadow-sm">
                <Dumbbell className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 font-heading uppercase tracking-wide">
                Claim 1-Day Free VIP Pass
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Experience {gymName}'s modern equipment and training floor with zero obligation.
              </p>
            </div>

            <form onSubmit={handleGenerate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aman Sharma"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-blue-600 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Phone / WhatsApp Number</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +91 XXXXX XXXXX"
                  value={userPhone}
                  onChange={(e) => setUserPhone(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-blue-600 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Which Batch Will You Visit?</label>
                <select
                  value={userBatch}
                  onChange={(e) => setUserBatch(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-blue-600 transition-colors"
                >
                  <option value={`Morning Shift (${morningBatch})`}>Morning Shift ({morningBatch})</option>
                  <option value={`Evening Shift (${eveningBatch})`}>Evening Shift ({eveningBatch})</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-sm uppercase tracking-wider shadow-blue-sm transition-all flex items-center justify-center gap-2 cursor-pointer font-heading"
                >
                  <Sparkles className="w-4 h-4 text-white" />
                  <span>Generate Free VIP Pass</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>100% Free • No Credit Card • Zero Obligation</span>
              </div>
            </form>
          </div>
        ) : (
          /* Generated Pass Badge */
          <div className="space-y-5 animate-fadeIn">
            
            <div className="text-center">
              <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Pass Confirmed
              </span>
              <h3 className="text-2xl font-black text-slate-900 font-heading mt-2 uppercase tracking-wide">
                VIP 1-Day Trial Pass
              </h3>
              <p className="text-xs text-slate-600">
                Show this digital card at the front desk when you arrive.
              </p>
            </div>

            {/* Pass Card in Sapphire Blue */}
            <div className="rounded-2xl p-6 bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-950 text-white border border-blue-400/40 relative overflow-hidden shadow-blue-md">
              <div className="flex items-center justify-between pb-3 border-b border-white/20">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-white text-blue-900 flex items-center justify-center font-bold shadow-sm">
                    <Dumbbell className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-white font-heading uppercase">{gymName}</h4>
                    <span className="text-[10px] text-sky-200 font-bold uppercase tracking-wider">VIP ACCESS</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-blue-200 uppercase block font-semibold">Pass ID</span>
                  <span className="text-xs font-mono font-bold text-sky-200">{passCode}</span>
                </div>
              </div>

              <div className="py-4 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-blue-100">Guest Name:</span>
                  <span className="font-bold text-white">{userName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-100">Valid Batch:</span>
                  <span className="font-bold text-amber-300">{userBatch}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-100">Location:</span>
                  <span className="text-white text-right font-medium max-w-[200px] truncate">{address}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-100">Access:</span>
                  <span className="text-white font-semibold">Full Floor & Cardio Deck</span>
                </div>
              </div>

              <div className="pt-3 border-t border-white/20 flex items-center justify-between text-[11px] text-blue-100">
                <span>Valid for 48 Hours</span>
                <span className="text-emerald-300 flex items-center gap-1 font-bold">
                  <Check className="w-3.5 h-3.5 stroke-[3]" /> Entry Guaranteed
                </span>
              </div>
            </div>

            {/* Pass Actions */}
            <div className="space-y-2 pt-2">
              <a
                href={getWhatsAppConfirmLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer font-heading"
              >
                <Share2 className="w-4 h-4" />
                <span>Confirm Pass on WhatsApp</span>
              </a>

              <button
                onClick={onClose}
                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
              >
                Close & Return to Website
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
