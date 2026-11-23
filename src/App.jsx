import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FitnessQuiz from './components/FitnessQuiz';
import TimingsAndBatches from './components/TimingsAndBatches';
import FacilitiesAndEquipment from './components/FacilitiesAndEquipment';
import ReviewSummary from './components/ReviewSummary';
import Coaches from './components/Coaches';
import BmiCalculator from './components/BmiCalculator';
import PricingPlans from './components/PricingPlans';
import LocationAndContact from './components/LocationAndContact';
import Footer from './components/Footer';
import BottomDock from './components/BottomDock';
import TrialModal from './components/TrialModal';

export default function App() {
  const [isTrialModalOpen, setIsTrialModalOpen] = useState(false);

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
    <div className="min-h-screen bg-white text-slate-900 flex flex-col selection:bg-purple-600 selection:text-white">
      {/* Top Fixed Navigation */}
      <Navbar 
        onOpenTrialModal={handleOpenTrialModal} 
        onNavigateToQuiz={handleNavigateToQuiz} 
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero 
          onOpenTrialModal={handleOpenTrialModal} 
          onNavigateToQuiz={handleNavigateToQuiz} 
        />

        {/* Reference Image 2: Interactive Fitness Quiz & Plan Finder */}
        <FitnessQuiz 
          onOpenTrialModal={handleOpenTrialModal} 
        />

        {/* User Required Timings: Monday, 6–10 AM, 5–10 PM */}
        <TimingsAndBatches 
          onOpenTrialModal={handleOpenTrialModal} 
        />

        {/* Facilities & Modern Equipment */}
        <FacilitiesAndEquipment />

        {/* Reference Image 1: Google Reviews 4.7★ Summary Card */}
        <ReviewSummary />

        {/* Professional & Motivating Coaches */}
        <Coaches 
          onOpenTrialModal={handleOpenTrialModal} 
        />

        {/* Interactive BMI & Daily Calorie Calculator */}
        <BmiCalculator 
          onOpenTrialModal={handleOpenTrialModal} 
        />

        {/* Membership Plans & Student Discounts */}
        <PricingPlans 
          onOpenTrialModal={handleOpenTrialModal} 
        />

        {/* Exact Sagar Location & Direction Embed */}
        <LocationAndContact 
          onOpenTrialModal={handleOpenTrialModal} 
        />
      </main>

      {/* Footer */}
      <Footer 
        onOpenTrialModal={handleOpenTrialModal} 
        onNavigateToQuiz={handleNavigateToQuiz} 
      />

      {/* Floating Bottom Navigation Bar (Dock) */}
      <BottomDock 
        onNavigateToQuiz={handleNavigateToQuiz} 
        onOpenTrialModal={handleOpenTrialModal} 
      />

      {/* Free 1-Day Trial Pass Modal */}
      <TrialModal 
        isOpen={isTrialModalOpen} 
        onClose={handleCloseTrialModal} 
      />
    </div>
  );
}
