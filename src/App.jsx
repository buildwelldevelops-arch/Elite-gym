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

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTrialModalOpen, setIsTrialModalOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [gymSettings, setGymSettings] = useState(null);

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
          setGymSettings(settingsRes.data);
        }
      } catch (err) {
        console.warn('Initial cloud data fetch:', err);
      }
    };
    loadCloudData();
  }, []);

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
      />

      {/* Main Content Area (Offset by sidebar width on desktop) */}
      <div className="lg:pl-72 flex flex-col min-h-screen transition-all">
        
        {/* Minimal, Clean Top Header */}
        <Navbar 
          onOpenSidebar={() => setIsSidebarOpen(true)}
          onOpenTrialModal={handleOpenTrialModal}
          onNavigateToQuiz={handleNavigateToQuiz}
        />

        {/* Home & Content Sections */}
        <main className="flex-1">
          <Hero 
            onOpenTrialModal={handleOpenTrialModal} 
            onNavigateToQuiz={handleNavigateToQuiz} 
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
            onOpenTrialModal={handleOpenTrialModal} 
          />

          <LocationAndContact 
            onOpenTrialModal={handleOpenTrialModal} 
          />
        </main>

        {/* Footer with Admin Panel Access */}
        <Footer 
          onOpenTrialModal={handleOpenTrialModal} 
          onNavigateToQuiz={handleNavigateToQuiz} 
          onOpenAdmin={() => setIsAdminOpen(true)}
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
        onUpdateSettings={(newSettings) => setGymSettings(newSettings)}
        gymOffers={gymOffers}
        onUpdateOffers={(newOffers) => setGymOffers(newOffers)}
        gymPhotos={gymPhotos}
        onUpdatePhotos={(newPhotos) => setGymPhotos(newPhotos)}
      />
    </div>
  );
}
