import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Sparkles, ChevronRight, ChevronLeft, Check, Scale, 
  BicepsFlexed, Zap, Activity, Heart, Flame, Dumbbell, 
  Trophy, Sun, Moon, Clock, Users, Award, Compass, RefreshCw,
  Share2, ArrowRight
} from 'lucide-react';
import { quizQuestions, generatePlanResult } from '../data/quizData';
import { gymDetails } from '../data/gymData';
import { supabase } from '../lib/supabase';

export default function FitnessQuiz({ onOpenTrialModal }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({
    1: 'build_muscle',
    2: 'intermediate',
    3: 'evening',
    4: 'trainer_guided'
  });
  const [isCompleted, setIsCompleted] = useState(false);

  const activeQuestion = quizQuestions[currentStep];

  const handleSelectOption = (questionId, optionId) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionId
    }));
  };

  const handleNext = () => {
    if (currentStep < quizQuestions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      triggerCompletion();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const triggerCompletion = async () => {
    setIsCompleted(true);
    const plan = generatePlanResult(selectedAnswers);

    try {
      await supabase.from('quiz_submissions').insert([
        {
          goal: selectedAnswers[1],
          level: selectedAnswers[2],
          batch: selectedAnswers[3],
          plan_name: plan.name
        }
      ]);
    } catch (err) {
      console.warn('Supabase quiz sync error:', err);
    }

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // safe fallback
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsCompleted(false);
  };

  const planResult = generatePlanResult(selectedAnswers);

  const renderOptionIcon = (iconName, isSelected) => {
    const iconProps = {
      className: `w-5 h-5 ${isSelected ? 'text-purple-700' : 'text-slate-500'}`
    };
    switch (iconName) {
      case 'Scale': return <Scale {...iconProps} />;
      case 'BicepsFlexed': return <BicepsFlexed {...iconProps} />;
      case 'Zap': return <Zap {...iconProps} />;
      case 'Activity': return <Activity {...iconProps} />;
      case 'Heart': return <Heart {...iconProps} />;
      case 'Flame': return <Flame {...iconProps} />;
      case 'Dumbbell': return <Dumbbell {...iconProps} />;
      case 'Trophy': return <Trophy {...iconProps} />;
      case 'Sun': return <Sun {...iconProps} />;
      case 'Moon': return <Moon {...iconProps} />;
      case 'Clock': return <Clock {...iconProps} />;
      case 'Users': return <Users {...iconProps} />;
      case 'Award': return <Award {...iconProps} />;
      case 'Compass': return <Compass {...iconProps} />;
      default: return <Sparkles {...iconProps} />;
    }
  };

  const selectedGoalName = quizQuestions[0].options.find(o => o.id === selectedAnswers[1])?.title || "Build muscle";
  const selectedLevelName = quizQuestions[1].options.find(o => o.id === selectedAnswers[2])?.title || "Intermediate";
  const selectedBatchName = quizQuestions[2].options.find(o => o.id === selectedAnswers[3])?.title?.split(' ')[0] || "Evening Batch";

  const getWhatsAppShareLink = () => {
    const text = encodeURIComponent(
      `Hello Elite Gym Sagar! I completed the Fitness Assessment on your website.\n\n` +
      `🎯 Goal: ${selectedGoalName}\n` +
      `📊 Level: ${selectedLevelName}\n` +
      `⏰ Preferred Batch: ${selectedBatchName}\n` +
      `📋 Routine: ${planResult.name}\n\n` +
      `I'd like to book my free 1-day trial pass at Tili Road!`
    );
    return `https://wa.me/${gymDetails.contact.whatsapp}?text=${text}`;
  };

  return (
    <section id="quiz" className="py-16 sm:py-24 relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-bold tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-purple-700" />
            <span>Interactive Fitness Assessment</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-heading">
            Your Goals. <span className="text-purple-700">Our Plan.</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Tailored specifically for Sagar fitness members, university students, and busy professionals.
          </p>
        </div>

        {/* Master Bento Container in Purple & White */}
        <div className="rounded-3xl p-3 sm:p-6 bg-purple-50/50 border border-purple-200 shadow-soft relative overflow-hidden">
          
          {!isCompleted ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              
              {/* Left Side: Quiz Questions & Options (7 Columns) */}
              <div className="lg:col-span-7 flex flex-col space-y-4">
                
                {/* Top Info Bento Cards */}
                <div className="grid grid-cols-12 gap-3">
                  
                  {/* Card 1: Quiz Title */}
                  <div className="col-span-12 sm:col-span-6 p-5 rounded-2xl bg-white border border-purple-100 shadow-sm flex flex-col justify-between">
                    <div>
                      <span className="text-[11px] font-bold tracking-wider text-purple-700 uppercase bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200">
                        FITNESS QUIZ
                      </span>
                      <h3 className="text-xl font-black text-slate-900 mt-2.5 font-heading tracking-tight">
                        Find your <span className="text-purple-700">perfect plan</span>
                      </h3>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">Answer 4 quick questions to calibrate your routine.</p>
                  </div>

                  {/* Card 2: Question Progress */}
                  <div className="col-span-6 sm:col-span-3 p-5 rounded-2xl bg-white border border-purple-100 shadow-sm flex flex-col justify-between">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Question
                    </span>
                    <div>
                      <div className="text-3xl font-black text-purple-700 font-heading tracking-tight">
                        {activeQuestion.questionNumber}
                      </div>
                      <span className="text-xs text-slate-500 font-medium">of {activeQuestion.totalQuestions}</span>
                    </div>
                  </div>

                  {/* Card 3: Question Category */}
                  <div className="col-span-6 sm:col-span-3 p-5 rounded-2xl bg-white border border-purple-100 shadow-sm flex flex-col justify-between">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Category
                    </span>
                    <div>
                      <div className="text-base sm:text-lg font-bold text-slate-900 truncate font-heading">
                        {activeQuestion.type}
                      </div>
                      <span className="text-xs font-semibold text-purple-700">Customized</span>
                    </div>
                  </div>

                </div>

                {/* Main Interactive Question Card */}
                <div className="p-6 sm:p-8 rounded-2xl bg-white border border-purple-100 shadow-sm flex-1 flex flex-col justify-between">
                  
                  <div>
                    <span className="text-[11px] font-bold text-purple-700 uppercase tracking-wider block mb-1">
                      {activeQuestion.category}
                    </span>
                    <h4 className="text-2xl font-black text-slate-900 tracking-tight font-heading">
                      {activeQuestion.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-md">
                      {activeQuestion.subtitle}
                    </p>

                    {/* Options Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-6">
                      {activeQuestion.options.map((option) => {
                        const isSelected = selectedAnswers[activeQuestion.id] === option.id;
                        return (
                          <button
                            key={option.id}
                            type="button"
                            onClick={() => handleSelectOption(activeQuestion.id, option.id)}
                            className={`p-4 rounded-2xl text-left transition-all relative flex flex-col justify-between cursor-pointer border ${
                              isSelected
                                ? 'bg-purple-50/90 border-purple-600 shadow-purple-sm ring-2 ring-purple-600/20'
                                : 'bg-white border-slate-200 hover:border-purple-300 hover:bg-purple-50/30'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-3">
                              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                                isSelected ? 'bg-purple-200 text-purple-900' : 'bg-slate-100 text-slate-600'
                              }`}>
                                {renderOptionIcon(option.icon, isSelected)}
                              </div>
                              <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                                isSelected 
                                  ? 'bg-purple-700 border-purple-700 text-white' 
                                  : 'border-slate-300 bg-white'
                              }`}>
                                {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                              </div>
                            </div>
                            
                            <div>
                              <div className={`text-sm font-bold tracking-tight ${isSelected ? 'text-purple-950 font-black' : 'text-slate-800'}`}>
                                {option.title}
                              </div>
                              <p className={`text-[11px] mt-1 leading-snug ${isSelected ? 'text-purple-800' : 'text-slate-500'}`}>
                                {option.desc}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Navigation controls */}
                  <div className="flex items-center justify-between pt-6 mt-6 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={triggerCompletion}
                      className="text-xs sm:text-sm font-semibold text-slate-500 hover:text-purple-800 transition-colors cursor-pointer"
                    >
                      Skip quiz
                    </button>

                    <div className="flex items-center gap-2.5">
                      {currentStep > 0 && (
                        <button
                          type="button"
                          onClick={handleBack}
                          className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all flex items-center gap-1 cursor-pointer"
                        >
                          <ChevronLeft className="w-4 h-4" />
                          <span>Back</span>
                        </button>
                      )}
                      
                      <button
                        type="button"
                        onClick={handleNext}
                        className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-purple-700 hover:bg-purple-800 text-white shadow-purple-sm transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>{currentStep === quizQuestions.length - 1 ? 'Show My Plan' : 'Next'}</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                </div>

              </div>

              {/* Right Side: Deep Royal Purple Contrast Panel (5 Columns) */}
              <div className="lg:col-span-5 rounded-2xl bg-gradient-to-br from-purple-900 via-purple-950 to-[#2e1065] text-white p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden shadow-purple-md">
                
                {/* Subtle lighting overlay */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-purple-200">
                    <Sparkles className="w-4 h-4 text-purple-300" />
                    <span>Calibrating for Elite Gym Sagar</span>
                  </div>

                  <div className="pt-2">
                    <span className="text-[10px] font-bold tracking-widest text-purple-200 uppercase bg-white/10 px-3 py-1 rounded-full border border-white/20">
                      FIND YOUR BALANCE
                    </span>
                    <h3 className="text-3xl sm:text-4xl font-black text-white mt-3 font-heading tracking-tight leading-tight">
                      Your goals. <br />
                      <span className="text-purple-300">Our plan.</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-purple-100 mt-2 leading-relaxed">
                      Take this quick assessment to get a personalized training program built for your daily routine on Tili Road.
                    </p>
                  </div>
                </div>

                {/* Progress Indicator */}
                <div className="my-6 py-6 border-y border-white/10 relative z-10">
                  <div className="flex items-center justify-between text-xs text-purple-200 mb-2 font-medium">
                    <span>Program Setup</span>
                    <span className="text-white font-bold">{Math.round(((currentStep + 1) / quizQuestions.length) * 100)}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/20 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-purple-400 to-white transition-all duration-500 rounded-full"
                      style={{ width: `${((currentStep + 1) / quizQuestions.length) * 100}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-purple-200 mt-3 font-medium">
                    <span>Facility: Elite Gym Sagar</span>
                    <span className="text-emerald-300 font-bold">Dual Batches Active</span>
                  </div>
                </div>

                {/* 3 Frosted Pills matching Reference Image */}
                <div className="grid grid-cols-3 gap-2 relative z-10">
                  
                  <div className="p-3 rounded-xl bg-white/10 border border-white/15 backdrop-blur-md">
                    <div className="flex items-center gap-1.5 text-purple-200 mb-1">
                      <Scale className="w-3.5 h-3.5" />
                      <span className="text-[11px] font-bold text-white">Goal</span>
                    </div>
                    <p className="text-[10px] text-purple-100 line-clamp-2">
                      {selectedGoalName}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-white/10 border border-white/15 backdrop-blur-md">
                    <div className="flex items-center gap-1.5 text-purple-200 mb-1">
                      <Trophy className="w-3.5 h-3.5" />
                      <span className="text-[11px] font-bold text-white">Level</span>
                    </div>
                    <p className="text-[10px] text-purple-100 line-clamp-2">
                      {selectedLevelName}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-white/10 border border-white/15 backdrop-blur-md">
                    <div className="flex items-center gap-1.5 text-purple-200 mb-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span className="text-[11px] font-bold text-white">Batch</span>
                    </div>
                    <p className="text-[10px] text-purple-100 line-clamp-2">
                      {selectedBatchName}
                    </p>
                  </div>

                </div>

              </div>

            </div>
          ) : (
            /* Completed Routine State */
            <div className="p-6 sm:p-10 space-y-6 bg-white rounded-2xl border border-purple-200 shadow-sm animate-fadeIn">
              
              <div className="text-center max-w-2xl mx-auto">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-purple-100 text-purple-800 mb-4">
                  <Sparkles className="w-7 h-7" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-purple-700 block mb-1">
                  Your Customized Blueprint
                </span>
                <h3 className="text-2xl sm:text-4xl font-black text-slate-900 font-heading">
                  {planResult.name}
                </h3>
                <p className="text-sm text-slate-600 mt-2">
                  {planResult.target}
                </p>
              </div>

              {/* Generated Plan Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                
                <div className="p-5 rounded-2xl bg-purple-50/60 border border-purple-100">
                  <div className="flex items-center gap-2 text-purple-700 mb-2">
                    <Dumbbell className="w-5 h-5" />
                    <span className="text-xs font-bold uppercase tracking-wider text-purple-900">Workout Split</span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900">{planResult.split}</h4>
                  <p className="text-xs text-slate-500 mt-1">{planResult.keyFocus}</p>
                </div>

                <div className="p-5 rounded-2xl bg-purple-50/60 border border-purple-100">
                  <div className="flex items-center gap-2 text-purple-700 mb-2">
                    <Activity className="w-5 h-5" />
                    <span className="text-xs font-bold uppercase tracking-wider text-purple-900">Nutrition Guidance</span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900">{planResult.calorieAdvice}</h4>
                  <p className="text-xs text-slate-500 mt-1">Free diet plan provided upon joining</p>
                </div>

                <div className="p-5 rounded-2xl bg-purple-50/60 border border-purple-100">
                  <div className="flex items-center gap-2 text-purple-700 mb-2">
                    <Clock className="w-5 h-5" />
                    <span className="text-xs font-bold uppercase tracking-wider text-purple-900">Ideal Sagar Batch</span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900">{planResult.recommendedBatch}</h4>
                  <p className="text-xs text-slate-500 mt-1">{planResult.selectedBatchText}</p>
                </div>

                <div className="p-5 rounded-2xl bg-purple-50/60 border border-purple-100">
                  <div className="flex items-center gap-2 text-purple-700 mb-2">
                    <Award className="w-5 h-5" />
                    <span className="text-xs font-bold uppercase tracking-wider text-purple-900">Recommended Coach</span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900">{planResult.coachAssigned}</h4>
                  <p className="text-xs text-slate-500 mt-1">Available on floor for posture & spots</p>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={getWhatsAppShareLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Send Routine to Gym WhatsApp</span>
                </a>

                <button
                  onClick={onOpenTrialModal}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-sm shadow-purple-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span>Claim 1-Day Trial For This Plan</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto px-4 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Retake Assessment</span>
                </button>
              </div>

              <p className="text-center text-xs text-slate-500">
                📍 {gymDetails.address.full}
              </p>

            </div>
          )}

        </div>

      </div>
    </section>
  );
}
