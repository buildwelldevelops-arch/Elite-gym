import React, { useState, useEffect } from 'react';
import { 
  Dumbbell, Home, Sparkles, Clock, Star, CreditCard, 
  MapPin, MessageSquare, ShieldCheck, ChevronRight, X, Phone, Shield, Tag
} from 'lucide-react';
import { gymDetails } from '../data/gymData';
import { getGymBatchStatus } from '../utils/timeHelper';

export default function Sidebar({ isOpen, onClose, onOpenTrialModal, onNavigateToQuiz }) {
  const [status, setStatus] = useState(getGymBatchStatus());
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const interval = setInterval(() => {
      setStatus(getGymBatchStatus());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { id: 'hero', name: 'Home / Overview', icon: Home, href: '#hero' },
    { id: 'offers', name: 'Special Offers', icon: Tag, href: '#offers', badge: 'Active Deals' },
    { id: 'quiz', name: 'Routine Finder', icon: Sparkles, href: '#quiz', highlight: true },
    { id: 'timings', name: 'Timings & Shifts', icon: Clock, href: '#timings', badge: '6-10 AM | 5-10 PM' },
    { id: 'facilities', name: 'Equipment & AC Floor', icon: Dumbbell, href: '#facilities' },
    { id: 'reviews', name: 'Member Reviews', icon: Star, href: '#reviews', rating: '4.7★' },
    { id: 'pricing', name: 'Memberships & Fees', icon: CreditCard, href: '#pricing' },
    { id: 'location', name: 'Location & Contact', icon: MapPin, href: '#location' },
  ];

  const handleNavClick = (href, isQuiz = false) => {
    if (isQuiz) {
      onNavigateToQuiz();
    }
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-white border-r border-purple-100 flex flex-col justify-between transition-transform duration-300 ease-in-out shadow-sm lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        
        {/* Top: Brand Logo & Close button on mobile */}
        <div>
          <div className="p-5 border-b border-purple-100 flex items-center justify-between">
            <a href="#hero" onClick={() => handleNavClick('#hero')} className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-purple-700 flex items-center justify-center text-white shadow-purple-sm transition-transform group-hover:scale-105">
                <Dumbbell className="w-5 h-5 transform -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
              </div>
              <div>
                <span className="text-xl font-black tracking-tight font-heading text-slate-900">
                  ELITE <span className="text-purple-700">GYM</span>
                </span>
                <p className="text-[11px] text-purple-700 font-bold uppercase tracking-wider">Sagar, MP</p>
              </div>
            </a>

            {/* Mobile close button */}
            <button
              onClick={onClose}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Shift Status Pill */}
          <div className="px-4 pt-4">
            <div className="p-3 rounded-2xl bg-purple-50/80 border border-purple-200 flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
              <div className="text-xs">
                <div className="font-extrabold text-purple-950 flex items-center gap-1.5">
                  <span>{status.statusText}</span>
                  <span className="text-purple-300">•</span>
                  <span className="text-purple-800 font-semibold">{status.batchName}</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">{status.timings}</p>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => handleNavClick(item.href, item.id === 'quiz')}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-between transition-all group ${
                    item.highlight
                      ? 'bg-purple-100 text-purple-900 hover:bg-purple-200'
                      : 'text-slate-700 hover:bg-purple-50 hover:text-purple-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${item.highlight ? 'text-purple-700' : 'text-slate-400 group-hover:text-purple-700'}`} />
                    <span>{item.name}</span>
                  </div>

                  {item.rating && (
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                      {item.rating}
                    </span>
                  )}
                  {item.badge && (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white text-slate-500 border border-purple-100 hidden xl:inline">
                      {item.badge}
                    </span>
                  )}
                </a>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions in Sidebar */}
        <div className="p-4 border-t border-purple-100 space-y-3 bg-purple-50/40">
          
          {/* Trial Pass Card */}
          <div className="p-3.5 rounded-2xl bg-white border border-purple-200 shadow-sm space-y-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-bold text-slate-900">1-Day Free VIP Pass</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-tight">
              Test our modern equipment and AC floor on Tili Road for free.
            </p>
            <button
              onClick={() => {
                if (onClose) onClose();
                onOpenTrialModal();
              }}
              className="w-full py-2.5 rounded-xl text-xs font-bold bg-purple-700 hover:bg-purple-800 text-white shadow-purple-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Claim Free Pass</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick WhatsApp Link */}
          <a
            href={`https://wa.me/${gymDetails.contact.whatsapp}?text=Hi%20Elite%20Gym%20Sagar,%20I%20have%20a%20question%20about%20membership.`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
            <span>WhatsApp Us</span>
          </a>

          {/* Location snippet */}
          <div className="text-[11px] text-slate-500 text-center font-medium">
            📍 Sagar, Madhya Pradesh
          </div>

        </div>

      </aside>
    </>
  );
}
