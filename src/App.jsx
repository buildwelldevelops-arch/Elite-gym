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
import { gymDetails } from './data/gymData';

const DEFAULT_OFFERS = [
  {
    id: 'offer-1',
    title: 'Student Fitness Booster Pass',
    discount_tag: 'STUDENT DISCOUNT',
    description: 'Valid for all high school and college students with valid student ID. Applies to monthly and multi-month memberships.',
    badge: 'Student Special',
    promo_code: 'STUDENTPASS',
    valid_until: 'Limited Seats',
    is_active: true
  },
  {
    id: 'offer-2',
    title: '90-Day Transformation Combo',
    discount_tag: 'SEASONAL DISCOUNT',
    description: 'Comprehensive guided muscle hypertrophy and fat-loss program with workout split and nutrition blueprint.',
    badge: 'Most Popular',
    promo_code: 'TRANSFORM90',
    valid_until: 'First 25 Registrations',
    is_active: true
  },
  {
    id: 'offer-3',
    title: 'Workout Partner Dual Pass',
    discount_tag: 'BUDDY PASS DISCOUNT',
    description: 'Join together with a friend or workout partner and receive instant admission discounts on quarterly or annual memberships.',
    badge: 'Duo Offer',
    promo_code: 'FITBUDDY',
    valid_until: 'Limited Time',
    is_active: true
  }
];

const DEFAULT_PHOTOS = [
  {
    id: 'photo-1',
    category: 'equipment',
    title: 'State-of-the-Art Commercial Equipment & Cardio Floor',
    image_url: '/images/gym-hero.jpg',
    tag: 'Strength & Cardio',
    specs: 'Commercial motorized treadmills • Multi-level electronic incline • Cushioned decks',
    highlight: 'Advanced shock-absorption running tracks engineered for joint protection and peak cardio burn.'
  },
  {
    id: 'photo-2',
    category: 'equipment',
    title: 'Olympic Free Weights & Heavy Dumbbells',
    image_url: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=700&q=80',
    tag: 'Heavy Lifts',
    specs: 'Dumbbells from 2.5kg to 40kg • Rubber coated hex weights • Olympic barbells',
    highlight: 'Zero bending bars with precision knurling for deadlifts, squats and heavy overhead presses.'
  },
  {
    id: 'photo-3',
    category: 'equipment',
    title: 'Biomechanic Plate-Loaded Resistance Machines',
    image_url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=700&q=80',
    tag: 'Hypertrophy',
    specs: 'Linear 45° Leg Press • Hack Squat • Dual Chest Press & Lat Pulldown',
    highlight: 'Fluid natural arcs of motion reducing joint strain and maximizing muscular hypertrophy.'
  },
  {
    id: 'photo-4',
    category: 'equipment',
    title: 'Dual Multi-Station Cable Crossover',
    image_url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=700&q=80',
    tag: 'Isolation & Pump',
    specs: 'Dual 90kg weight stacks • Multi-grip pull-up handles • Complete attachments',
    highlight: 'Ideal for chest flyes, facepulls, bicep curls, lateral raises, and woodchops.'
  },
  {
    id: 'photo-5',
    category: 'facility',
    title: 'Spacious & Clean Air-Conditioned Training Floor',
    image_url: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=700&q=80',
    tag: 'Spacious & Fresh',
    specs: 'High-power commercial ACs • Industrial air ventilation • Daily sanitization',
    highlight: 'Spotlessly maintained flooring, fresh atmosphere, and hygienic equipment.'
  },
  {
    id: 'photo-6',
    category: 'facility',
    title: 'Member Lockers, Changing Rooms & Hydration Station',
    image_url: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=700&q=80',
    tag: 'Convenience',
    specs: 'Secure member lockers • Clean washrooms & showers • Filtered chilled drinking water',
    highlight: 'Comfortable pre- and post-workout amenities ensuring a seamless training routine.'
  }
];

const DEFAULT_SETTINGS = {
  gymName: gymDetails.name,
  morningBatch: gymDetails.timings.morningBatch,
  eveningBatch: gymDetails.timings.eveningBatch,
  sundayTimings: gymDetails.timings.sunday,
  phone: gymDetails.contact.phone,
  whatsapp: gymDetails.contact.whatsapp,
  address: gymDetails.address.full,
  instagram: gymDetails.contact.instagramUrl,
  googleMaps: gymDetails.contact.googleMapsUrl,
  announcement: 'Welcome to [Gym Name]! Professional athletic training and precision cardio deck.',
  monthlyPrice: '[Monthly Fee]',
  quarterlyPrice: '[Quarterly Fee]',
  annualPrice: '[Annual Fee]'
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
    instagram: data.instagram || DEFAULT_SETTINGS.instagram,
    googleMaps: data.googleMaps || data.google_maps || DEFAULT_SETTINGS.googleMaps,
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
    try {
      const cached = localStorage.getItem('gym_custom_settings') || localStorage.getItem('elite_gym_settings');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed.gymName && parsed.gymName !== 'Elite Gym') {
          return normalizeSettings(parsed);
        }
      }
    } catch (e) {}
    return DEFAULT_SETTINGS;
  });

  const [gymOffers, setGymOffers] = useState(() => {
    try {
      const cached = localStorage.getItem('gym_custom_offers') || localStorage.getItem('elite_gym_offers');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0 && !parsed.some(o => o.promo_code === 'ELITEBUDDY')) {
          return parsed;
        }
      }
    } catch (e) {}
    return DEFAULT_OFFERS;
  });

  const [gymPhotos, setGymPhotos] = useState(() => {
    try {
      const cached = localStorage.getItem('gym_custom_photos') || localStorage.getItem('elite_gym_photos');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.some(p => p.image_url === '/images/gym-hero.jpg')) {
          return parsed;
        }
      }
    } catch (e) {}
    return DEFAULT_PHOTOS;
  });

  // Sync with cloud backend if available
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
          localStorage.setItem('gym_custom_offers', JSON.stringify(offersRes.data));
        }
        if (photosRes.data && photosRes.data.length > 0) {
          setGymPhotos(photosRes.data);
          localStorage.setItem('gym_custom_photos', JSON.stringify(photosRes.data));
        }
        if (settingsRes.data) {
          const norm = normalizeSettings(settingsRes.data);
          setGymSettings(norm);
          localStorage.setItem('gym_custom_settings', JSON.stringify(norm));
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
    localStorage.setItem('gym_custom_settings', JSON.stringify(norm));
    localStorage.setItem('elite_gym_settings', JSON.stringify(norm));
  };

  const handleUpdateOffers = (newOffers) => {
    setGymOffers(newOffers);
    localStorage.setItem('gym_custom_offers', JSON.stringify(newOffers));
    localStorage.setItem('elite_gym_offers', JSON.stringify(newOffers));
  };

  const handleUpdatePhotos = (newPhotos) => {
    setGymPhotos(newPhotos);
    localStorage.setItem('gym_custom_photos', JSON.stringify(newPhotos));
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
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white">
      
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
            settings={gymSettings}
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

          <ReviewSummary 
            settings={gymSettings}
          />

          <Coaches 
            onOpenTrialModal={handleOpenTrialModal} 
          />

          <BmiCalculator 
            onOpenTrialModal={handleOpenTrialModal} 
            settings={gymSettings}
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
        settings={gymSettings}
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
