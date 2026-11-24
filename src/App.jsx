import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import OffersSection from './components/OffersSection';
import FitnessQuiz from './components/FitnessQuiz';
import TimingsAndBatches from './components/TimingsAndBatches';
import FacilitiesAndEquipment from './components/FacilitiesAndEquipment';
import ReviewSummary from './components/ReviewSummary';
import Coaches from './components/Coaches';
import BmiCalculator from './components/BmiCalculator';
import PricingPlans from './components/PricingPlans';
import LocationAndContact from './components/LocationAndContact';
import Footer from './components/Footer';
import TrialModal from './components/TrialModal';
import AdminPanel from './components/AdminPanel';
import { supabase } from './lib/supabase';

const DEFAULT_OFFERS = [
  {
    id: 'offer-1',
    title: 'Student Fitness Booster Pass',
    discount_tag: '₹200 OFF',
    description: 'Valid for all college and school students with valid ID card. Applies to Monthly and 3-Month memberships.',
    badge: 'Student Special',
    promo_code: 'STUDENT200',
    valid_until: 'Active for 2026 Batch',
    is_active: true
  },
  {
    id: 'offer-2',
    title: '3-Month Transformation Combo',
    discount_tag: 'SAVE 17% + FREE SHAKER',
    description: 'Join our 90-day guided muscle & fat-loss program. Includes customized diet blueprint and 2 free guest passes.',
    badge: 'Most Popular',
    promo_code: 'TRANSFORM90',
    valid_until: 'First 25 Registrations',
    is_active: true
  },
  {
    id: 'offer-3',
    title: 'Buddy Workout Dual Pass',
    discount_tag: 'FLAT ₹500 OFF',
    description: 'Join with a workout partner or friend and both get ₹250 instant discount on 3-month or annual admissions.',
    badge: 'Duo Offer',
    promo_code: 'ELITEBUDDY',
    valid_until: 'Limited Time',
    is_active: true
  }
];

const DEFAULT_PHOTOS = [
  {
    id: 'photo-1',
    category: 'equipment',
    title: 'Olympic Free Weights & Heavy Dumbbells',
    image_url: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=700&q=80',
    tag: 'Heavy Lifts',
    specs: 'Dumbbells from 2.5kg to 40kg • Rubber coated hex weights • Olympic barbells',
    highlight: 'Zero bending bars with precision knurling for deadlifts and heavy presses.'
  },
  {
    id: 'photo-2',
    category: 'equipment',
    title: 'Biomechanic Plate-Loaded Machines',
    image_url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=700&q=80',
    tag: 'Hypertrophy',
    specs: 'Linear 45° Leg Press • Hack Squat • Dual Chest Press & Lat Pulldown',
    highlight: 'Fluid natural arcs of motion reducing joint strain and maximizing muscle activation.'
  },
  {
    id: 'photo-3',
    category: 'equipment',
    title: 'Commercial Cardio Theatre',
    image_url: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&w=700&q=80',
    tag: 'Cardio & HIIT',
    specs: 'Motorized Incline Treadmills • Cross Trainers • Spin Cycles',
    highlight: 'High shock-absorbing running decks for joint-friendly fat burning and endurance.'
  },
  {
    id: 'photo-4',
    category: 'equipment',
    title: 'Dual Multi-Station Cable Crossover',
    image_url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=700&q=80',
    tag: 'Isolation & Pump',
    specs: 'Dual 90kg weight stacks • Multi-grip pull-up handles • Complete attachments',
    highlight: 'Bicep curls, tricep pushdowns, cable flyes, facepulls & woodchops.'
  },
  {
    id: 'photo-5',
    category: 'facility',
    title: 'Spacious & Clean Air-Conditioned Floor',
    image_url: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=700&q=80',
    tag: 'Spacious & Fresh',
    specs: 'High-power commercial ACs • Industrial air ventilation • Daily sanitization',
    highlight: 'Consistently praised in Google reviews for pristine cleanliness and fresh environment.'
  },
  {
    id: 'photo-6',
    category: 'facility',
    title: 'Lockers, Changing Areas & RO Hydration',
    image_url: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=700&q=80',
    tag: 'Convenience',
    specs: 'Secure member lockers • Clean washrooms & showers • Filtered chilled drinking water',
    highlight: 'Comfortable pre- and post-workout facilities right on Tili Road.'
  }
];

const DEFAULT_SETTINGS = {
  gymName: 'Elite Gym',
  morningBatch: '6:00 AM – 10:00 AM',
  eveningBatch: '5:00 PM – 10:00 PM',
  sundayTimings: '7:00 AM – 10:00 AM',
  phone: '+91 98260 00000',
  whatsapp: '919826000000',
  address: 'Elite gym, Tili Rd, in front of Rozgar Office, State Bank Colony, Poddar Colony, Sagar, Madhya Pradesh 470001',
  announcement: 'Welcome to Elite Gym Sagar! Dual batches open daily.',
  monthlyPrice: '1,199',
  quarterlyPrice: '2,999',
  annualPrice: '8,999'
};

const normalizeSettings = (data) => {
  if (!data) return DEFAULT_SETTINGS;
  return {
    gymName: data.gym_name || data.gymName || DEFAULT_SETTINGS.gymName,
    morningBatch: data.morning_batch || data.morningBatch || DEFAULT_SETTINGS.morningBatch,
    eveningBatch: data.evening_batch || data.eveningBatch || DEFAULT_SETTINGS.eveningBatch,
    sundayTimings: data.sunday_timings || data.sundayTimings || DEFAULT_SETTINGS.sundayTimings,
    phone: data.phone || DEFAULT_SETTINGS.phone,
    whatsapp: data.whatsapp || DEFAULT_SETTINGS.whatsapp,
    address: data.address || DEFAULT_SETTINGS.address,
    announcement: data.announcement || DEFAULT_SETTINGS.announcement,
    monthlyPrice: data.monthly_price || data.monthlyPrice || DEFAULT_SETTINGS.monthlyPrice,
    quarterlyPrice: data.quarterly_price || data.quarterlyPrice || DEFAULT_SETTINGS.quarterlyPrice,
    annualPrice: data.annual_price || data.annualPrice || DEFAULT_SETTINGS.annualPrice,
  };
};

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTrialModalOpen, setIsTrialModalOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const [gymSettings, setGymSettings] = useState(() => {
    const cached = localStorage.getItem('elite_gym_settings');
    return cached ? normalizeSettings(JSON.parse(cached)) : DEFAULT_SETTINGS;
  });

  const [gymOffers, setGymOffers] = useState(() => {
    const cached = localStorage.getItem('elite_gym_offers');
    return cached ? JSON.parse(cached) : DEFAULT_OFFERS;
  });

  const [gymPhotos, setGymPhotos] = useState(() => {
    const cached = localStorage.getItem('elite_gym_photos');
    return cached ? JSON.parse(cached) : DEFAULT_PHOTOS;
  });

  // Sync with Supabase on mount
  useEffect(() => {
    const loadCloudData = async () => {
      try {
        const [offersRes, photosRes, settingsRes] = await Promise.all([
          supabase.from('gym_offers').select('*').order('display_order', { ascending: true }),
          supabase.from('gym_photos').select('*').order('display_order', { ascending: true }),
          supabase.from('gym_settings').select('*').eq('id', 'default').single()
        ]);
        if (offersRes.data && offersRes.data.length > 0) {
          setGymOffers(offersRes.data);
          localStorage.setItem('elite_gym_offers', JSON.stringify(offersRes.data));
        }
        if (photosRes.data && photosRes.data.length > 0) {
          setGymPhotos(photosRes.data);
          localStorage.setItem('elite_gym_photos', JSON.stringify(photosRes.data));
        }
        if (settingsRes.data) {
          const norm = normalizeSettings(settingsRes.data);
          setGymSettings(norm);
          localStorage.setItem('elite_gym_settings', JSON.stringify(norm));
        }
      } catch (err) {
        console.warn('Initial cloud data fetch:', err);
      }
    };
    loadCloudData();
  }, []);

  const handleUpdateSettings = (newSettings) => {
    const norm = normalizeSettings(newSettings);
    setGymSettings(norm);
    localStorage.setItem('elite_gym_settings', JSON.stringify(norm));
  };

  const handleUpdateOffers = (newOffers) => {
    setGymOffers(newOffers);
    localStorage.setItem('elite_gym_offers', JSON.stringify(newOffers));
  };

  const handleUpdatePhotos = (newPhotos) => {
    setGymPhotos(newPhotos);
    localStorage.setItem('elite_gym_photos', JSON.stringify(newPhotos));
  };

  const handleOpenTrialModal = () => {
    setIsTrialModalOpen(true);
  };

  const handleCloseTrialModal = () => {
    setIsTrialModalOpen(false);
  };

  const handleNavigateToQuiz = () => {
    const quizElement = document.getElementById('quiz');
    if (quizElement) {
      quizElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-purple-600 selection:text-white">
      
      {/* Sleek Left Sidebar Navigation */}
      <Sidebar 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onOpenTrialModal={handleOpenTrialModal}
        onNavigateToQuiz={handleNavigateToQuiz}
        settings={gymSettings}
      />

      {/* Main Content Area (Offset by sidebar width on desktop) */}
      <div className="lg:pl-72 flex flex-col min-h-screen transition-all">
        
        {/* Minimal, Clean Top Header */}
        <Navbar 
          onOpenSidebar={() => setIsSidebarOpen(true)}
          onOpenTrialModal={handleOpenTrialModal}
          onNavigateToQuiz={handleNavigateToQuiz}
          settings={gymSettings}
        />

        {/* Home & Content Sections */}
        <main className="flex-1">
          <Hero 
            onOpenTrialModal={handleOpenTrialModal} 
            onNavigateToQuiz={handleNavigateToQuiz} 
            settings={gymSettings}
          />

          {/* Dynamic Special Offers Section */}
          <OffersSection 
            offers={gymOffers}
            onOpenTrialModal={handleOpenTrialModal}
          />

          <FitnessQuiz 
            onOpenTrialModal={handleOpenTrialModal} 
          />

          <TimingsAndBatches 
            onOpenTrialModal={handleOpenTrialModal} 
            settings={gymSettings}
          />

          <FacilitiesAndEquipment 
            photos={gymPhotos}
          />

          <ReviewSummary />

          <Coaches 
            onOpenTrialModal={handleOpenTrialModal} 
          />

          <BmiCalculator 
            onOpenTrialModal={handleOpenTrialModal} 
          />

          <PricingPlans 
            offers={gymOffers}
            settings={gymSettings}
            onOpenTrialModal={handleOpenTrialModal} 
          />

          <LocationAndContact 
            onOpenTrialModal={handleOpenTrialModal} 
            settings={gymSettings}
          />
        </main>

        {/* Footer with Admin Panel Access */}
        <Footer 
          onOpenTrialModal={handleOpenTrialModal} 
          onNavigateToQuiz={handleNavigateToQuiz} 
          onOpenAdmin={() => setIsAdminOpen(true)}
          settings={gymSettings}
        />

      </div>

      {/* Free 1-Day Trial Pass Modal */}
      <TrialModal 
        isOpen={isTrialModalOpen} 
        onClose={handleCloseTrialModal} 
      />

      {/* Admin Panel Portal Modal */}
      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        currentSettings={gymSettings}
        onUpdateSettings={handleUpdateSettings}
        gymOffers={gymOffers}
        onUpdateOffers={handleUpdateOffers}
        gymPhotos={gymPhotos}
        onUpdatePhotos={handleUpdatePhotos}
      />
    </div>
  );
}
