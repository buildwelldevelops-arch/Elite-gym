import React from 'react';
import { 
  Dumbbell, Home, Sparkles, Clock, Star, CreditCard, 
  MapPin, MessageSquare, ShieldCheck, ChevronRight, X, Phone, Flame, Tag, Instagram
} from 'lucide-react';
import { gymDetails } from '../data/gymData';
import { getGymBatchStatus } from '../utils/timeHelper';

export default function Sidebar({ isOpen, onClose, onOpenTrialModal, onNavigateToQuiz, settings }) {
  const status = getGymBatchStatus();
  const gymName = settings?.gymName || gymDetails.name;
  const address = settings?.address || gymDetails.address.full;
  const whatsapp = settings?.whatsapp || gymDetails.contact.whatsapp;
  const phone = settings?.phone || gymDetails.contact.phone;

  const navItems = [
    { id: 'hero', name: 'Home / Overview', icon: Home, href: '#hero' },
    { id: 'offers', name: 'Special Offers', icon: Tag, href: '#offers', badge: 'Active Deals' },
    { id: 'quiz', name: 'Workout Finder', icon: Flame, href: '#quiz', highlight: true },
    { id: 'timings', name: 'Timings & Shifts', icon: Clock, href: '#timings' },
    { id: 'facilities', name: 'Equipment & AC Floor', icon: Dumbbell, href: '#facilities' },
    { id: 'reviews', name: 'Member Testimonials', icon: Star, href: '#reviews', rating: '4.9★' },
    { id: 'pricing', name: 'Membership Plans', icon: CreditCard, href: '#pricing' },
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
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* Slide-over Drawer */}
      <aside className={`fixed top-0 left-0 bottom-0 z-50 w-72 sm:w-80 bg-[#0b0f19] border-r border-white/10 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:hidden ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        
        {/* Top Header */}
        <div>
          <div className="p-5 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-red-600 to-red-500 flex items-center justify-center text-white shadow-glow-red">
                <Dumbbell className="w-5 h-5" />
              </div>
              <span className="text-lg font-black font-heading text-white">
                {gymName}
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Shift status pill */}
          <div className="px-4 pt-4">
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-2.5">
              <span className={`w-2.5 h-2.5 rounded-full ${status.isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
              <div className="text-xs">
                <span className="font-extrabold text-white block">{status.statusText}</span>
                <span className="text-[11px] text-slate-400">{status.batchName} ({status.timings})</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => handleNavClick(item.href, item.id === 'quiz')}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-between transition-all ${
                    item.highlight 
                      ? 'bg-red-600/20 text-red-400 border border-red-500/30' 
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 text-red-400" />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-600/30 text-red-300 font-bold">
                      {item.badge}
                    </span>
                  )}
                  {item.rating && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold">
                      {item.rating}
                    </span>
                  )}
                </a>
              );
            })}
          </nav>
        </div>

        {/* Bottom Drawer Actions */}
        <div className="p-4 border-t border-white/10 bg-[#070a12] space-y-2.5">
          <button
            onClick={() => {
              onClose();
              onOpenTrialModal();
            }}
            className="w-full py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 text-white shadow-glow-red transition-all flex items-center justify-center gap-1.5"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Claim Free Day Pass</span>
          </button>

          <a
            href={`https://wa.me/${whatsapp}?text=Hello!%20I%20am%20inquiring%20about%20gym%20admission.`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2 rounded-xl text-xs font-bold bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>WhatsApp Front Desk</span>
          </a>

          <div className="text-[11px] text-slate-500 text-center truncate pt-1">
            📍 {address}
          </div>
        </div>

      </aside>
    </>
  );
}
