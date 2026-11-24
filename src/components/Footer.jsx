import React from 'react';
import { Dumbbell, MapPin, Clock, Phone, Mail, MessageSquare, Star, Heart, ExternalLink, Shield } from 'lucide-react';
import { gymDetails } from '../data/gymData';

export default function Footer({ onOpenTrialModal, onNavigateToQuiz, onOpenAdmin }) {
  return (
    <footer className="pt-16 pb-28 border-t border-purple-900 bg-[#250d44] text-purple-200 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Brand Info (2 Columns) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-700 flex items-center justify-center text-white shadow-purple-sm">
                <Dumbbell className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-black tracking-tight font-heading text-white">
                ELITE <span className="text-purple-300">GYM</span>
              </span>
            </div>

            <p className="text-purple-100 text-xs sm:text-sm leading-relaxed max-w-sm">
              Sagar's premier fitness & training center featuring modern top-notch equipment, clean AC floors, and certified coaches. Rated 4.7★ by 52+ members on Google.
            </p>

            <div className="flex items-center gap-2 pt-1 text-amber-400">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-xs font-bold text-white">4.7 / 5.0</span>
              <span className="text-xs text-purple-300">(52 Google Reviews)</span>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenTrialModal}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-white text-purple-950 hover:bg-purple-100 transition-all shadow-md inline-flex items-center gap-1.5 cursor-pointer"
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
            <ul className="space-y-2 text-xs text-purple-200">
              <li>
                <a href="#hero" className="hover:text-white transition-colors">Overview</a>
              </li>
              <li>
                <button onClick={onNavigateToQuiz} className="hover:text-white transition-colors text-left text-purple-300 font-bold">
                  Personal Routine Finder
                </button>
              </li>
              <li>
                <a href="#timings" className="hover:text-white transition-colors">Morning & Evening Batches</a>
              </li>
              <li>
                <a href="#facilities" className="hover:text-white transition-colors">Equipment & Clean Floor</a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-white transition-colors">Google Reviews (4.7★)</a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-white transition-colors">Membership Fees & Student Pass</a>
              </li>
            </ul>
          </div>

          {/* Hours & Batches */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-heading">
              Batch Timings
            </h4>
            <div className="space-y-2.5 text-xs text-purple-100">
              <div className="p-3 rounded-xl bg-purple-900/60 border border-purple-800">
                <span className="font-bold text-purple-200 block">Morning Shift:</span>
                <span className="text-white font-bold">6:00 AM – 10:00 AM</span>
                <span className="text-[10px] text-purple-300 block mt-0.5">Monday to Saturday</span>
              </div>
              <div className="p-3 rounded-xl bg-purple-900/60 border border-purple-800">
                <span className="font-bold text-purple-200 block">Evening Shift:</span>
                <span className="text-white font-bold">5:00 PM – 10:00 PM</span>
                <span className="text-[10px] text-purple-300 block mt-0.5">Monday to Saturday</span>
              </div>
              <p className="text-[11px] text-purple-300">Sunday: 7:00 AM – 10:00 AM</p>
            </div>
          </div>

          {/* Location & Contact */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-heading">
              Sagar Facility
            </h4>
            <div className="space-y-2 text-xs text-purple-200">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-purple-300 shrink-0 mt-0.5" />
                <span>Tili Rd, in front of Rozgar Office, State Bank Colony, Poddar Colony, Sagar, MP 470001</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-purple-300 shrink-0" />
                <span>+91 98260 XXXXX</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                <a 
                  href={`https://wa.me/${gymDetails.contact.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-emerald-400 font-bold"
                >
                  WhatsApp Help Desk
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 border-t border-purple-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-purple-300">
          <p>
            © {new Date().getFullYear()} Elite Gym Sagar. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <p className="flex items-center gap-1 font-medium">
              Elite Gym • Sagar, Madhya Pradesh 470001
            </p>
            <button
              onClick={onOpenAdmin}
              className="text-purple-200 hover:text-white transition-all flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-900/70 hover:bg-purple-800 border border-purple-700/70 text-xs font-semibold cursor-pointer shadow-sm hover:border-purple-500"
              title="Admin Portal - Manage Batches, Inquiries, Settings & GitHub Sync"
            >
              <Shield className="w-3.5 h-3.5 text-purple-400" />
              <span>Admin Portal</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
