import React, { useState } from 'react';
import { Dumbbell, Wind, Sparkles, Activity, ShieldCheck, Heart, Zap, Award } from 'lucide-react';
import { gymDetails } from '../data/gymData';

export default function FacilitiesAndEquipment({ photos }) {
  const [activeTab, setActiveTab] = useState('all');

  const facilityCategories = [
    { id: 'all', name: 'All Equipment' },
    { id: 'strength', name: 'Strength & Free Weights' },
    { id: 'cardio', name: 'Cardio Theatre' },
    { id: 'hygiene', name: 'Cleanliness & AC Floor' }
  ];

  const defaultEquipmentItems = [
    {
      id: 1,
      category: 'strength',
      title: 'Olympic Free Weights & Heavy Dumbbells',
      specs: 'Dumbbells from 2.5kg to 40kg • Rubber coated hex weights • Olympic grade barbells',
      highlight: 'Zero bending bars with precision knurling for deadlifts and heavy presses.',
      image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=700&q=80',
      tag: 'Heavy Lifts'
    },
    {
      id: 2,
      category: 'strength',
      title: 'Biomechanic Plate-Loaded Machines',
      specs: 'Linear 45° Leg Press • Hack Squat • Dual Chest Press & Lat Pulldown',
      highlight: 'Fluid natural arcs of motion reducing joint strain and maximizing muscle activation.',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=700&q=80',
      tag: 'Hypertrophy'
    },
    {
      id: 3,
      category: 'cardio',
      title: 'Commercial Cardio Theatre',
      specs: 'Motorized Incline Treadmills • Cross Trainers • Spin Cycles',
      highlight: 'High shock-absorbing running decks for joint-friendly fat burning and endurance.',
      image: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&w=700&q=80',
      tag: 'Cardio & HIIT'
    },
    {
      id: 4,
      category: 'strength',
      title: 'Dual Multi-Station Cable Crossover',
      specs: 'Dual 90kg weight stacks • Multi-grip pull-up handles • Complete attachment set',
      highlight: 'Bicep curls, tricep pushdowns, cable flyes, facepulls & woodchops.',
      image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=700&q=80',
      tag: 'Isolation & Pump'
    },
    {
      id: 5,
      category: 'hygiene',
      title: 'Spacious & Clean Air-Conditioned Floor',
      specs: 'High-power commercial ACs • Industrial air ventilation • Daily sanitization',
      highlight: 'Consistently praised in Google reviews for pristine cleanliness and fresh environment.',
      image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=700&q=80',
      tag: 'Spacious & Fresh'
    },
    {
      id: 6,
      category: 'hygiene',
      title: 'Lockers, Changing Areas & RO Hydration',
      specs: 'Secure member lockers • Clean washrooms & showers • Filtered chilled drinking water',
      highlight: 'Comfortable pre- and post-workout facilities right on Tili Road.',
      image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=700&q=80',
      tag: 'Convenience'
    }
  ];

  const items = (photos && photos.length > 0)
    ? photos.map(p => ({
        id: p.id,
        category: p.category === 'facility' ? 'hygiene' : (p.category || 'strength'),
        title: p.title,
        specs: p.specs || 'Commercial grade fitness setup',
        highlight: p.highlight || 'Maintained daily for member safety and peak performance.',
        image: p.image_url || p.image,
        tag: p.tag || 'Elite Feature'
      }))
    : defaultEquipmentItems;

  const filteredItems = activeTab === 'all'
    ? items
    : items.filter(item => item.category === activeTab);

  return (
    <section id="facilities" className="py-16 sm:py-24 relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-bold tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-purple-700" />
            <span>Modern Equipment & Clean Environment</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-heading">
            Built for Serious <span className="text-purple-700">Fitness Goals</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            "Modern, top-notch equipment and a spacious, clean environment" — Verified member praise.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none">
          {facilityCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === cat.id
                  ? 'bg-purple-700 text-white shadow-purple-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-purple-50 hover:text-purple-800 border border-transparent'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Grid of Equipment */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <div
              key={item.id}
              className="rounded-3xl bg-white border border-purple-100 hover:border-purple-300 shadow-sm hover:shadow-soft overflow-hidden group transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-100">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 text-[11px] font-bold px-3 py-1 rounded-full bg-purple-700 text-white shadow-md">
                  {item.tag}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-purple-700 transition-colors font-heading">
                    {item.title}
                  </h3>
                  <p className="text-xs text-purple-700 mt-1 font-semibold">
                    {item.specs}
                  </p>
                  <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                    {item.highlight}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                  <span className="flex items-center gap-1 text-emerald-600 font-bold">
                    <ShieldCheck className="w-3.5 h-3.5" /> Commercial Grade
                  </span>
                  <span>Daily Maintained</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
