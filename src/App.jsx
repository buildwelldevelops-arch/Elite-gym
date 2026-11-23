import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
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
import TrialModal from './components/TrialModal';

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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

          <FitnessQuiz 
            onOpenTrialModal={handleOpenTrialModal} 
          />

          <TimingsAndBatches 
            onOpenTrialModal={handleOpenTrialModal} 
          />

          <FacilitiesAndEquipment />

          <ReviewSummary />

          <Coaches 
            onOpenTrialModal={handleOpenTrialModal} 
          />

          <BmiCalculator 
            onOpenTrialModal={handleOpenTrialModal} 
          />

          <PricingPlans 
            onOpenTrialModal={handleOpenTrialModal} 
          />

          <LocationAndContact 
            onOpenTrialModal={handleOpenTrialModal} 
          />
        </main>

        {/* Footer */}
        <Footer 
          onOpenTrialModal={handleOpenTrialModal} 
          onNavigateToQuiz={handleNavigateToQuiz} 
        />

      </div>

      {/* Free 1-Day Trial Pass Modal */}
      <TrialModal 
        isOpen={isTrialModalOpen} 
        onClose={handleCloseTrialModal} 
      />
    </div>
  );
}
