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
    <section id="location" className="py-20 sm:py-28 relative overflow-hidden bg-white border-t border-slate-100">
      {/* Background ambient lighting */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-blue-100/40 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold tracking-wider uppercase mb-4">
            <MapPin className="w-3.5 h-3.5 text-blue-600" />
            <span>Prime Location & Contact</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight font-heading uppercase">
            Visit Us & <span className="text-gradient-blue">Start Training</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Conveniently located facility with ample parking, top-tier cardio machines, and welcoming staff.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Location Details & Interactive Map (7 Columns) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Address Bento Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-blue-50/60 border border-blue-100 shadow-sm space-y-5">
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shrink-0 shadow-blue-sm">
                  <Building className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
                    Official Facility Address
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-heading mt-0.5">
                    {gymName}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-700 mt-1 font-medium leading-relaxed">
                    {address}
                  </p>
                </div>
              </div>

              {/* Facility Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-blue-100 text-xs text-slate-700">
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-blue-100 shadow-sm">
                  <Car className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Dedicated Vehicle Parking Area</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-blue-100 shadow-sm">
                  <Clock className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Dual Shifts: Morning & Evening</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-blue-100 shadow-sm">
                  <Phone className="w-4 h-4 text-sky-600 shrink-0" />
                  <span>Front Desk: {phone}</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-blue-100 shadow-sm">
                  <Instagram className="w-4 h-4 text-pink-600 shrink-0" />
                  <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-700 font-medium">
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
                  className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-blue-sm inline-flex items-center gap-2 transition-all cursor-pointer font-heading"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Open Google Maps</span>
                </a>
                
                <a
                  href={`https://wa.me/${whatsapp}?text=Hi%20${encodeURIComponent(gymName)},%20I%20am%20interested%20in%20visiting%20your%20gym.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-bold text-xs sm:text-sm inline-flex items-center gap-2 transition-all cursor-pointer shadow-sm"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>

            </div>

            {/* Responsive Map Embed */}
            <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-sm h-64 sm:h-80 relative bg-slate-100">
              <iframe
                title={`${gymName} Location Map`}
                src="https://maps.google.com/maps?q=Fitness+Center+Gym&t=&z=14&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute bottom-3 left-3 bg-white/95 px-3.5 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-800 font-bold shadow-md backdrop-blur-md">
                📍 {address}
              </div>
            </div>

          </div>

          {/* Right Column: Inquiry Form (5 Columns) */}
          <div className="lg:col-span-5 rounded-3xl bg-white border border-blue-100 p-6 sm:p-8 shadow-card space-y-5">
            
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-full">
                Quick Inquiry & Pass
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-heading mt-3 uppercase tracking-wide">
                Book a Free Visit & Trial Pass
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Drop your contact details to receive an instant 1-day pass to explore our equipment, floor, and coaches.
              </p>
            </div>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3 animate-fadeIn">
                <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-lg font-bold text-slate-900 font-heading">Inquiry Received!</h4>
                <p className="text-xs text-slate-600">
                  Your pass request has been sent to our front desk. We are opening WhatsApp for your instant pass confirmation.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs font-bold text-blue-600 hover:underline pt-2 inline-block cursor-pointer"
                >
                  Submit another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sen"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-blue-600 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Mobile / WhatsApp Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 XXXXX XXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-blue-600 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Preferred Batch Timing</label>
                  <select
                    value={formData.batch}
                    onChange={(e) => setFormData({ ...formData, batch: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-blue-600 transition-colors"
                  >
                    <option value={`Morning Batch (${morningBatch})`}>Morning Batch ({morningBatch})</option>
                    <option value={`Evening Batch (${eveningBatch})`}>Evening Batch ({eveningBatch})</option>
                    <option value="Flexible (Both Morning & Evening)">Flexible (Both Morning & Evening)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Primary Fitness Goal</label>
                  <select
                    value={formData.goal}
                    onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-blue-600 transition-colors"
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
                    className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-blue-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer font-heading"
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
