import React from 'react';
import { Dumbbell, MapPin, Clock, Phone, Mail, MessageSquare, Star, Heart, ExternalLink, Shield, Instagram } from 'lucide-react';
import { gymDetails } from '../data/gymData';

export default function Footer({ onOpenTrialModal, onNavigateToQuiz, onOpenAdmin, settings }) {
  const morningBatch = settings?.morningBatch || gymDetails.timings.morningBatch;
  const eveningBatch = settings?.eveningBatch || gymDetails.timings.eveningBatch;
  const sundayTimings = settings?.sundayTimings || gymDetails.timings.sunday;
  const address = settings?.address || gymDetails.address.full;
  const phone = settings?.phone || gymDetails.contact.phone;
  const whatsapp = settings?.whatsapp || gymDetails.contact.whatsapp;
  const gymName = settings?.gymName || gymDetails.name;
  const instagramUrl = settings?.instagram || gymDetails.contact.instagramUrl;
  const googleMapsUrl = settings?.googleMaps || gymDetails.contact.googleMapsUrl;

  return (
    <footer className="pt-16 pb-24 border-t border-white/10 bg-dark-950 text-slate-400 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Brand Info (2 Columns) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center text-white shadow-glow-red">
                <Dumbbell className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-black tracking-tight font-heading text-white uppercase">
                {gymName}
              </span>
            </div>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              High-performance strength & conditioning facility equipped with German-engineered treadmills, Olympic free weights, and certified coaches.
            </p>

            <div className="flex items-center gap-2 pt-1 text-amber-400">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-xs font-bold text-white">4.9 / 5.0</span>
              <span className="text-xs text-slate-500">(Verified Google Reviews)</span>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenTrialModal}
                className="px-4 py-2.5 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-500 text-white transition-all shadow-glow-red inline-flex items-center gap-2 cursor-pointer uppercase tracking-wider"
              >
                Claim Free 1-Day Trial Pass
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-heading">
              Explore
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a href="#hero" className="hover:text-white transition-colors">Overview</a>
              </li>
              <li>
                <button onClick={onNavigateToQuiz} className="hover:text-white transition-colors text-left text-red-400 font-bold">
                  Personal Routine Finder
                </button>
              </li>
              <li>
                <a href="#timings" className="hover:text-white transition-colors">Morning & Evening Batches</a>
              </li>
              <li>
                <a href="#facilities" className="hover:text-white transition-colors">Cardio Deck & Floor</a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-white transition-colors">Member Reviews (4.9★)</a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-white transition-colors">Membership Fees</a>
              </li>
            </ul>
          </div>

          {/* Hours & Batches */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-heading">
              Batch Schedules
            </h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="p-3 rounded-xl bg-dark-900 border border-white/5">
                <span className="font-bold text-red-400 block">Morning Shift:</span>
                <span className="text-white font-bold">{morningBatch}</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">Monday to Saturday</span>
              </div>
              <div className="p-3 rounded-xl bg-dark-900 border border-white/5">
                <span className="font-bold text-red-400 block">Evening Shift:</span>
                <span className="text-white font-bold">{eveningBatch}</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">Monday to Saturday</span>
              </div>
              <p className="text-[11px] text-slate-400">Sunday: {sundayTimings}</p>
            </div>
          </div>

          {/* Location & Contact */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-heading">
              Facility Info
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>{address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                <a 
                  href={`https://wa.me/${whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-emerald-400 font-bold"
                >
                  WhatsApp Help Desk
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Instagram className="w-4 h-4 text-pink-400 shrink-0" />
                <a 
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-slate-300 font-medium"
                >
                  Instagram Channel
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} {gymName}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <p className="flex items-center gap-1 font-medium text-slate-400">
              High-Performance Fitness & Training Center
            </p>
            <button
              onClick={onOpenAdmin}
              className="text-slate-300 hover:text-white transition-all flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-dark-900 hover:bg-dark-850 border border-white/10 text-xs font-semibold cursor-pointer shadow-sm hover:border-red-500/50"
              title="Admin Portal - Manage Batches, Inquiries, Settings & Photos"
            >
              <Shield className="w-3.5 h-3.5 text-red-400" />
              <span>Admin Portal</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
