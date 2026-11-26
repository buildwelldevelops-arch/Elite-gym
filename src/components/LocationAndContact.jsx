import React, { useState } from 'react';
import { MapPin, Phone, MessageSquare, Clock, Navigation, CheckCircle, Send, Sparkles, Building, Car, Instagram } from 'lucide-react';
import { gymDetails } from '../data/gymData';
import { supabase } from '../lib/supabase';

export default function LocationAndContact({ onOpenTrialModal, settings }) {
  const [submitted, setSubmitted] = useState(false);
  const gymName = settings?.gymName || gymDetails.name;
  const address = settings?.address || gymDetails.address.full;
  const phone = settings?.phone || gymDetails.contact.phone;
  const whatsapp = settings?.whatsapp || gymDetails.contact.whatsapp;
  const morningBatch = settings?.morningBatch || gymDetails.timings.morningBatch;
  const eveningBatch = settings?.eveningBatch || gymDetails.timings.eveningBatch;
  const googleMapsUrl = settings?.googleMaps || gymDetails.contact.googleMapsUrl;
  const instagramUrl = settings?.instagram || gymDetails.contact.instagramUrl;

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    batch: `Evening Batch (${eveningBatch})`,
    goal: 'Build Muscle & Strength'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    try {
      await supabase.from('inquiries').insert([
        {
          name: formData.name,
          phone: formData.phone,
          batch: formData.batch,
          goal: formData.goal
        }
      ]);
    } catch (err) {
      console.warn('Supabase inquiry sync error:', err);
    }

    const text = encodeURIComponent(
      `Hello ${gymName}! I submitted an inquiry from your website:\n\n` +
      `👤 Name: ${formData.name}\n` +
      `📞 Phone: ${formData.phone}\n` +
      `⏰ Preferred Batch: ${formData.batch}\n` +
      `🎯 Goal: ${formData.goal}\n\n` +
      `Looking forward to visiting your gym!`
    );
    window.open(`https://wa.me/${whatsapp}?text=${text}`, '_blank');
  };

  return (
    <section id="location" className="py-20 sm:py-28 relative overflow-hidden bg-dark-950 border-t border-white/5">
      {/* Background glow */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold tracking-wider uppercase mb-4">
            <MapPin className="w-3.5 h-3.5 text-red-500" />
            <span>Prime Location & Contact</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-heading uppercase">
            Visit Us & <span className="text-gradient-red">Start Training</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400">
            Conveniently located facility with ample parking, top-tier cardio machines, and welcoming staff.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Location Details & Interactive Map (7 Columns) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Address Bento Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-dark-900/90 border border-white/10 shadow-card-dark space-y-5 backdrop-blur-md">
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-400 shrink-0 shadow-glow-red">
                  <Building className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold text-red-400 uppercase tracking-wider">
                    Official Facility Address
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white font-heading mt-0.5">
                    {gymName}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-300 mt-1 font-medium leading-relaxed">
                    {address}
                  </p>
                </div>
              </div>

              {/* Facility Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-white/5 text-xs text-slate-300">
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-dark-950/80 border border-white/5">
                  <Car className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Dedicated Vehicle Parking Area</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-dark-950/80 border border-white/5">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Dual Shifts: Morning & Evening</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-dark-950/80 border border-white/5">
                  <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Desk: {phone}</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-dark-950/80 border border-white/5">
                  <Instagram className="w-4 h-4 text-pink-400 shrink-0" />
                  <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    Follow on Instagram
                  </a>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap gap-3">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs sm:text-sm shadow-glow-red inline-flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Open Google Maps</span>
                </a>
                
                <a
                  href={`https://wa.me/${whatsapp}?text=Hi%20${encodeURIComponent(gymName)},%20I%20am%20interested%20in%20visiting%20your%20gym.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xs sm:text-sm inline-flex items-center gap-2 transition-all cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>

            </div>

            {/* Responsive Map Embed */}
            <div className="rounded-3xl overflow-hidden border border-white/10 shadow-card-dark h-64 sm:h-80 relative bg-dark-900">
              <iframe
                title={`${gymName} Location Map`}
                src="https://maps.google.com/maps?q=Fitness+Center+Gym&t=&z=14&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute bottom-3 left-3 bg-dark-950/90 px-3.5 py-1.5 rounded-xl border border-white/10 text-xs text-white font-bold shadow-md backdrop-blur-md">
                📍 {address}
              </div>
            </div>

          </div>

          {/* Right Column: Inquiry Form (5 Columns) */}
          <div className="lg:col-span-5 rounded-3xl bg-dark-900/90 border border-white/10 p-6 sm:p-8 shadow-card-dark space-y-5 backdrop-blur-md">
            
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-red-400 bg-red-500/10 border border-red-500/20 px-2.5 py-1 rounded-full">
                Quick Inquiry & Pass
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white font-heading mt-3 uppercase tracking-wide">
                Book a Free Visit & Trial Pass
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Drop your contact details to receive an instant 1-day pass to explore our equipment, track, and coaches.
              </p>
            </div>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-dark-950 border border-emerald-500/30 text-center space-y-3 animate-fadeIn">
                <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-lg font-bold text-white font-heading">Inquiry Received!</h4>
                <p className="text-xs text-slate-400">
                  Your pass request has been sent to our front desk. We are opening WhatsApp for your instant pass confirmation.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs font-bold text-red-400 hover:underline pt-2 inline-block cursor-pointer"
                >
                  Submit another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sen"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-dark-950 border border-white/10 text-white text-sm focus:outline-none focus:border-red-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Mobile / WhatsApp Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 XXXXX XXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-dark-950 border border-white/10 text-white text-sm focus:outline-none focus:border-red-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Preferred Batch Timing</label>
                  <select
                    value={formData.batch}
                    onChange={(e) => setFormData({ ...formData, batch: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-dark-950 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-red-500 transition-colors"
                  >
                    <option value={`Morning Batch (${morningBatch})`}>Morning Batch ({morningBatch})</option>
                    <option value={`Evening Batch (${eveningBatch})`}>Evening Batch ({eveningBatch})</option>
                    <option value="Flexible (Both Morning & Evening)">Flexible (Both Morning & Evening)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Primary Fitness Goal</label>
                  <select
                    value={formData.goal}
                    onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-dark-950 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-red-500 transition-colors"
                  >
                    <option value="Build Muscle & Strength">Build Muscle & Strength</option>
                    <option value="Weight Loss & Fat Shred">Weight Loss & Fat Shred</option>
                    <option value="Cardio & Endurance">Cardio & Endurance</option>
                    <option value="General Athletic Conditioning">General Athletic Conditioning</option>
                  </select>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs sm:text-sm shadow-glow-red uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Get Free Pass & Visit Info</span>
                  </button>
                </div>

                <p className="text-[11px] text-center text-slate-500 font-medium">
                  🔒 No spam guaranteed. We only contact you regarding your trial pass.
                </p>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
