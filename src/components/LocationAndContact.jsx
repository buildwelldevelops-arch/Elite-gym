import React, { useState } from 'react';
import { MapPin, Phone, MessageSquare, Clock, Navigation, CheckCircle, Send, Sparkles, Building, Car } from 'lucide-react';
import { gymDetails } from '../data/gymData';
import { supabase } from '../lib/supabase';

export default function LocationAndContact({ onOpenTrialModal }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    batch: 'Evening Batch (5:00 PM – 10:00 PM)',
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
      `Hello Elite Gym Sagar! I submitted an inquiry from your website:\n\n` +
      `👤 Name: ${formData.name}\n` +
      `📞 Phone: ${formData.phone}\n` +
      `⏰ Preferred Batch: ${formData.batch}\n` +
      `🎯 Goal: ${formData.goal}\n\n` +
      `Looking forward to visiting your gym at Tili Road!`
    );
    window.open(`https://wa.me/${gymDetails.contact.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <section id="location" className="py-16 sm:py-24 relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-bold tracking-wider uppercase mb-3">
            <MapPin className="w-3.5 h-3.5 text-purple-700" />
            <span>Prime Sagar Location</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-heading">
            Visit Us on <span className="text-purple-700">Tili Road, Sagar</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Conveniently positioned in Poddar Colony opposite Rozgar Office with dedicated two-wheeler and four-wheeler parking.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Location Details & Interactive Map (7 Columns) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Address Bento Card */}
            <div className="p-6 sm:p-7 rounded-3xl bg-purple-50/50 border border-purple-200 shadow-sm space-y-4">
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-700 flex items-center justify-center text-white shrink-0 shadow-purple-sm">
                  <Building className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">
                    Official Gym Location
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-heading mt-0.5">
                    Elite Gym
                  </h3>
                  <p className="text-sm sm:text-base text-slate-700 mt-1 font-medium leading-relaxed">
                    Tili Rd, in front of Rozgar Office, State Bank Colony, Poddar Colony, Sagar, Madhya Pradesh 470001
                  </p>
                </div>
              </div>

              {/* Landmark Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-purple-200/60 text-xs text-slate-700">
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-purple-100 shadow-sm">
                  <MapPin className="w-4 h-4 text-purple-700 shrink-0" />
                  <span>Landmark: Opposite District Rozgar Office</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-purple-100 shadow-sm">
                  <Car className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Safe Parking for Bikes & Cars</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-purple-100 shadow-sm">
                  <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Morning: 6–10 AM | Evening: 5–10 PM</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-purple-100 shadow-sm">
                  <Phone className="w-4 h-4 text-purple-700 shrink-0" />
                  <span>Front Desk: +91 98260 XXXXX</span>
                </div>
              </div>

              {/* Direction Buttons */}
              <div className="pt-2 flex flex-wrap gap-3">
                <a
                  href={gymDetails.contact.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-2xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs sm:text-sm shadow-purple-sm inline-flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Get Google Maps Directions</span>
                </a>
                
                <a
                  href={`https://wa.me/${gymDetails.contact.whatsapp}?text=Hi%20Elite%20Gym%20Sagar,%20I%20am%20coming%20for%20a%20visit%20at%20Tili%20Road.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-2xl bg-white hover:bg-purple-50 border border-purple-200 text-purple-900 font-bold text-xs sm:text-sm inline-flex items-center gap-2 transition-all cursor-pointer shadow-sm"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  <span>WhatsApp Location</span>
                </a>
              </div>

            </div>

            {/* Embedded Responsive Map */}
            <div className="rounded-3xl overflow-hidden border border-purple-200 shadow-sm h-64 sm:h-80 relative bg-slate-100">
              <iframe
                title="Elite Gym Sagar Location Map"
                src="https://maps.google.com/maps?q=Tili+Rd+Sagar+Madhya+Pradesh+470001&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute bottom-3 left-3 bg-white/95 px-3 py-1.5 rounded-xl border border-purple-200 text-xs text-slate-800 font-bold shadow-md">
                📍 Tili Road, Sagar, MP 470001
              </div>
            </div>

          </div>

          {/* Right Column: Instant Visit & Free Pass Booking Form (5 Columns) */}
          <div className="lg:col-span-5 rounded-3xl bg-white border border-purple-200 p-6 sm:p-8 shadow-soft space-y-5">
            
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-purple-800 bg-purple-100 px-2.5 py-1 rounded-full">
                Quick Enquiry & Pass
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading mt-2">
                Book a Free Visit & Trial Pass
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Drop your details to receive an instant 1-day trial pass to explore our equipment and coaches.
              </p>
            </div>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3 animate-fadeIn">
                <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-lg font-bold text-slate-900 font-heading">Thank You!</h4>
                <p className="text-xs text-slate-600">
                  Your inquiry has been recorded and sent to our front desk on Tili Road. We are opening WhatsApp for your instant pass confirmation.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs font-bold text-purple-700 hover:underline pt-2 inline-block cursor-pointer"
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
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-purple-600 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Mobile / WhatsApp Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 98260 XXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-purple-600 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Preferred Batch Timing</label>
                  <select
                    value={formData.batch}
                    onChange={(e) => setFormData({ ...formData, batch: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-purple-600 transition-colors"
                  >
                    <option value="Morning Batch (6:00 AM – 10:00 AM)">Morning Batch (6:00 AM – 10:00 AM)</option>
                    <option value="Evening Batch (5:00 PM – 10:00 PM)">Evening Batch (5:00 PM – 10:00 PM)</option>
                    <option value="Flexible (Both Morning & Evening)">Flexible (Both Morning & Evening)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Primary Fitness Goal</label>
                  <select
                    value={formData.goal}
                    onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-purple-600 transition-colors"
                  >
                    <option value="Build Muscle & Strength">Build Muscle & Strength</option>
                    <option value="Weight Loss & Fat Shred">Weight Loss & Fat Shred</option>
                    <option value="Stamina & General Athletic Fitness">Stamina & General Athletic Fitness</option>
                    <option value="Post-Rehab / Doctor Recommended">Post-Rehab / Doctor Recommended</option>
                  </select>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-2xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-sm shadow-purple-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
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
