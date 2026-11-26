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
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm lg:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* Slide-over Drawer */}
      <aside className={`fixed top-0 left-0 bottom-0 z-50 w-72 sm:w-80 bg-white border-r border-blue-100 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:hidden shadow-2xl ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        
        {/* Top Header */}
        <div>
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-700 to-blue-600 flex items-center justify-center text-white shadow-blue-sm">
                <Dumbbell className="w-5 h-5" />
              </div>
              <span className="text-lg font-black font-heading text-slate-900">
                {gymName}
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Shift status pill */}
          <div className="px-4 pt-4">
            <div className="p-3 rounded-2xl bg-blue-50/80 border border-blue-100 flex items-center gap-2.5">
              <span className={`w-2.5 h-2.5 rounded-full ${status.isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
              <div className="text-xs">
                <span className="font-extrabold text-blue-950 block">{status.statusText}</span>
                <span className="text-[11px] text-blue-700 font-medium">{status.batchName} ({status.timings})</span>
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
                      ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-sm' 
                      : 'text-slate-700 hover:bg-slate-50 hover:text-blue-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 text-blue-600" />
                    <span>{item.name}</span>
                  </div>

                  {item.badge && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold">
                      {item.badge}
                    </span>
                  )}
                  {item.rating && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 font-bold border border-amber-200">
                      {item.rating}
                    </span>
                  )}
                </a>
              );
            })}
          </nav>
        </div>

        {/* Bottom Drawer Actions */}
        <div className="p-4 border-t border-slate-100 space-y-2.5 bg-slate-50/50">
          <button
            onClick={() => {
              if (onClose) onClose();
              onOpenTrialModal();
            }}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-blue-sm transition-all flex items-center justify-center gap-2 cursor-pointer font-heading tracking-wide"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Book Free 1-Day Trial Pass</span>
          </button>

          <a
            href={`https://wa.me/${whatsapp}?text=Hi%20${encodeURIComponent(gymName)},%20I%20want%20to%20know%20more%20about%20gym%20membership.`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
          >
            <MessageSquare className="w-4 h-4 text-emerald-600" />
            <span>WhatsApp Front Desk</span>
          </a>
        </div>

      </aside>
    </>
  );
}
