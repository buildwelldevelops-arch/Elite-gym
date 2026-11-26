import React, { useState } from 'react';
import { Dumbbell, Sparkles, ShieldCheck, Flame, Zap, Wind } from 'lucide-react';
import { gymDetails } from '../data/gymData';

export default function FacilitiesAndEquipment({ photos }) {
  const [activeTab, setActiveTab] = useState('all');

  const facilityCategories = [
    { id: 'all', name: 'All Facilities' },
    { id: 'cardio', name: 'Cardio & Endurance' },
    { id: 'strength', name: 'Strength & Free Weights' },
    { id: 'facility', name: 'Cleanliness & AC Floor' }
  ];

  const defaultEquipmentItems = [
    {
      id: 'eq-1',
      category: 'cardio',
      title: 'Precision Commercial Incline Treadmills',
      specs: 'Shock-absorbing decks • Motorized incline • Precision metric displays',
      highlight: 'Featured in our main cardio theatre. Low-impact, high-calorie burn engineered for endurance.',
      image: '/images/gym-hero.jpg',
      tag: 'Cardio Theatre'
    },
    {
      id: 'eq-2',
      category: 'strength',
      title: 'Olympic Free Weights & Heavy Dumbbells',
      specs: 'Complete dumbbell sets from 2.5kg to 40kg • Olympic barbells • Bumper plates',
      highlight: 'Precision knurling on zero-flex bars built for heavy deadlifts, bench presses, and cleans.',
      image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=700&q=80',
      tag: 'Heavy Lifts'
    },
    {
      id: 'eq-3',
      category: 'strength',
      title: 'Biomechanic Plate-Loaded Machines',
      specs: '45° Linear Leg Press • Hack Squat • Dual Chest Press & Lat Pulldown',
      highlight: 'Fluid biomechanical arcs that maximize muscle tension while protecting joints.',
      image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=700&q=80',
      tag: 'Hypertrophy'
    },
    {
      id: 'eq-4',
      category: 'strength',
      title: 'Multi-Station Cable Crossover',
      specs: 'Dual 90kg weight stacks • Multi-grip pullup station • Complete attachments',
      highlight: 'Total exercise variety for bicep curls, face pulls, cable flyes, and tricep pushdowns.',
      image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=700&q=80',
      tag: 'Functional Pump'
    },
    {
      id: 'eq-5',
      category: 'facility',
      title: 'Spacious & Pristine AC Training Floor',
      specs: 'Industrial air purifiers • High-power climate AC • Sanitized daily',
      highlight: 'Pristine, dust-free non-slip rubber floors with modern overhead LED illumination.',
      image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=700&q=80',
      tag: 'Clean & Fresh'
    },
    {
      id: 'eq-6',
      category: 'facility',
      title: 'Member Lockers & Chilled Hydration',
      specs: 'Secure member lockers • Clean washrooms • Filtered chilled drinking water',
      highlight: 'Comfortable pre-workout preparation and post-workout freshening amenities.',
      image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=700&q=80',
      tag: 'Convenience'
    }
  ];

  const items = (photos && photos.length > 0)
    ? photos.map(p => ({
        id: p.id,
        category: p.category || 'strength',
        title: p.title,
        specs: p.specs || 'Commercial grade fitness setup',
        highlight: p.highlight || 'Maintained daily for member safety and peak performance.',
        image: p.image_url || p.image || '/images/gym-hero.jpg',
        tag: p.tag || 'Gym Feature'
      }))
    : defaultEquipmentItems;

  const filteredItems = activeTab === 'all'
    ? items
    : items.filter(item => item.category === activeTab);

  return (
    <section id="facilities" className="py-20 relative overflow-hidden bg-slate-50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>High-End Equipment & Clean Environment</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight font-heading uppercase">
            BUILT FOR <span className="text-gradient-blue">SERIOUS ATHLETES</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Engineered with modern equipment, high air-filtration standards, and spacious workout zones.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-center gap-2 mb-12 overflow-x-auto pb-2 scrollbar-none">
          {facilityCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === cat.id
                  ? 'bg-blue-600 text-white shadow-blue-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-100 hover:text-blue-700 border border-slate-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Equipment Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <div
              key={item.id}
              className="rounded-3xl bg-white border border-blue-100 hover:border-blue-300 shadow-sm hover:shadow-card overflow-hidden group transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative h-52 overflow-hidden bg-slate-100">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-80" />
                <span className="absolute top-3 left-3 text-[11px] font-extrabold px-3 py-1 rounded-full bg-blue-600 text-white shadow-sm">
                  {item.tag}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors font-heading">
                    {item.title}
                  </h3>
                  <p className="text-xs text-blue-600 mt-1.5 font-semibold">
                    {item.specs}
                  </p>
                  <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                    {item.highlight}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                  <span className="flex items-center gap-1 text-emerald-600 font-bold">
                    <ShieldCheck className="w-3.5 h-3.5" /> Commercial Grade
                  </span>
                  <span>Daily Sanitized</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
