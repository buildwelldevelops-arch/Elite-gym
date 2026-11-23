import React, { useState, useEffect } from 'react';
import { Dumbbell, MapPin, Clock, Phone, Menu, X, Sparkles, ChevronRight } from 'lucide-react';
import { gymDetails } from '../data/gymData';
import { getGymBatchStatus } from '../utils/timeHelper';

export default function Navbar({ onOpenTrialModal, onNavigateToQuiz }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [status, setStatus] = useState(getGymBatchStatus());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    const interval = setInterval(() => {
      setStatus(getGymBatchStatus());
    }, 60000);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  const navLinks = [
    { name: "Overview", href: "#hero" },
    { name: "Personal Plan Quiz", href: "#quiz", special: true },
    { name: "Timings & Batches", href: "#timings" },
    { name: "Equipment & Floor", href: "#facilities" },
    { name: "Member Reviews (4.7★)", href: "#reviews" },
    { name: "Memberships", href: "#pricing" },
    { name: "Location", href: "#location" },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md border-b border-purple-100 shadow-sm py-3' : 'bg-white/80 backdrop-blur-sm py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-purple-700 flex items-center justify-center text-white shadow-purple-sm transition-transform group-hover:scale-105">
              <Dumbbell className="w-5 h-5 sm:w-6 sm:h-6 transform -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-black tracking-tight font-heading text-slate-900">
                  ELITE <span className="text-purple-700">GYM</span>
                </span>
                <span className="hidden md:inline-flex items-center gap-1 text-[11px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
                  <MapPin className="w-3 h-3" /> Sagar, MP
                </span>
              </div>
            </div>
          </a>

          {/* Desktop Live Status indicator */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium bg-purple-50/70 border-purple-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-purple-950 font-bold">{status.statusText}</span>
            <span className="text-purple-300">•</span>
            <span className="text-purple-800">{status.batchName} ({status.timings})</span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm font-semibold transition-colors hover:text-purple-700 ${
                  link.special 
                    ? 'text-purple-700 flex items-center gap-1.5 bg-purple-100/70 hover:bg-purple-200/70 px-3 py-1 rounded-full' 
                    : 'text-slate-600'
                }`}
              >
                {link.special && <Sparkles className="w-3.5 h-3.5 text-purple-600" />}
                {link.name}
              </a>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onNavigateToQuiz}
              className="text-xs sm:text-sm font-bold px-3.5 sm:px-4 py-2.5 rounded-xl text-purple-800 bg-purple-50 hover:bg-purple-100 border border-purple-200 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>Workout Finder</span>
            </button>
            <button
              onClick={onOpenTrialModal}
              className="text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl text-white bg-purple-700 hover:bg-purple-800 shadow-purple-sm transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-1.5 cursor-pointer"
            >
              <span>Free Day Pass</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 sm:hidden">
            <button
              onClick={onOpenTrialModal}
              className="text-xs font-bold px-3 py-2 rounded-lg text-white bg-purple-700"
            >
              Free Pass
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-purple-50 border border-purple-200 text-purple-900"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden mt-3 p-4 rounded-2xl bg-white border border-purple-100 shadow-xl space-y-3 animate-fadeIn">
            <div className="p-3 rounded-xl bg-purple-50 border border-purple-200 flex items-center gap-2.5 text-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <div>
                <span className="font-bold text-purple-950">{status.statusText}: </span>
                <span className="text-purple-800">{status.batchName} ({status.timings})</span>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2.5 rounded-xl text-sm font-medium flex items-center justify-between ${
                    link.special
                      ? 'bg-purple-100 text-purple-800 font-bold'
                      : 'text-slate-700 hover:bg-purple-50'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {link.special && <Sparkles className="w-4 h-4 text-purple-600" />}
                    {link.name}
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </a>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigateToQuiz();
                }}
                className="w-full py-2.5 rounded-xl text-xs font-bold text-center bg-purple-50 text-purple-800 border border-purple-200 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-purple-600" />
                Find My Workout Split
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTrialModal();
                }}
                className="w-full py-2.5 rounded-xl text-xs font-bold text-center bg-purple-700 text-white shadow-purple-sm flex items-center justify-center gap-2"
              >
                Claim Free 1-Day Trial Pass
              </button>
            </div>
          </div>
        )}

      </div>
    </header>
  );
}
