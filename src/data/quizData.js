export const quizQuestions = [
  {
    id: 1,
    category: "CHOOSE YOUR GOAL",
    questionNumber: "01",
    totalQuestions: "04",
    type: "Body Goals",
    title: "What do you want to achieve?",
    subtitle: "Select the option that best fits your current motivation or long-term goal.",
    options: [
      {
        id: "lose_weight",
        title: "Lose weight",
        desc: "Feel lighter and healthier",
        icon: "Scale",
        pillColor: "blue"
      },
      {
        id: "build_muscle",
        title: "Build muscle",
        desc: "Strength & definition",
        icon: "BicepsFlexed",
        pillColor: "indigo"
      },
      {
        id: "boost_stamina",
        title: "Boost stamina",
        desc: "Energy & performance",
        icon: "Zap",
        pillColor: "amber"
      },
      {
        id: "be_healthier",
        title: "Be healthier",
        desc: "Feel good, inside and out",
        icon: "Activity",
        pillColor: "emerald"
      },
      {
        id: "reduce_stress",
        title: "Reduce stress",
        desc: "Find balance and calm",
        icon: "Heart",
        pillColor: "rose"
      },
      {
        id: "stay_active",
        title: "Stay active",
        desc: "Keep up with my lifestyle",
        icon: "Sparkles",
        pillColor: "cyan"
      }
    ]
  },
  {
    id: 2,
    category: "FITNESS LEVEL",
    questionNumber: "02",
    totalQuestions: "04",
    type: "Current Baseline",
    title: "Where are you right now?",
    subtitle: "Help us calibrate the exercise intensity and progressive overload for you.",
    options: [
      {
        id: "beginner",
        title: "Complete Beginner",
        desc: "Starting fresh or haven't worked out in 6+ months",
        icon: "Flame"
      },
      {
        id: "intermediate",
        title: "Intermediate Lifter",
        desc: "Familiar with barbell/dumbbell basics and gym machines",
        icon: "Dumbbell"
      },
      {
        id: "advanced",
        title: "Advanced Athlete",
        desc: "Consistent 2+ years lifting, looking for PRs & peak conditioning",
        icon: "Trophy"
      }
    ]
  },
  {
    id: 3,
    category: "BATCH PREFERENCE",
    questionNumber: "03",
    totalQuestions: "04",
    type: "Batch Schedules",
    title: "Which batch fits your daily routine?",
    subtitle: "Dedicated morning and evening shifts giving you full workout flexibility.",
    options: [
      {
        id: "morning",
        title: "Morning Shift (6:00 AM – 10:00 AM)",
        desc: "Fresh early start, calm floor, great for fasted cardio & student lifters",
        icon: "Sun"
      },
      {
        id: "evening",
        title: "Evening Shift (5:00 PM – 10:00 PM)",
        desc: "High energy, post-job workout, motivating gym music & heavy sets",
        icon: "Moon"
      },
      {
        id: "flexible",
        title: "Flexible (Morning or Evening as per schedule)",
        desc: "I want the freedom to visit either batch depending on my daily work",
        icon: "Clock"
      }
    ]
  },
  {
    id: 4,
    category: "GUIDANCE & SUPPORT",
    questionNumber: "04",
    totalQuestions: "04",
    type: "Coaching Mode",
    title: "What style of training do you prefer?",
    subtitle: "Certified coaches provide hands-on assistance, form checks, and spotting.",
    options: [
      {
        id: "trainer_guided",
        title: "Coach Guidance & Posture Correction",
        desc: "Floor trainer checks my form, spots heavy lifts, and sets daily workouts",
        icon: "Users"
      },
      {
        id: "dedicated_pt",
        title: "1-on-1 Personal Training",
        desc: "Private transformation program, customized macro diet & dedicated coach",
        icon: "Award"
      },
      {
        id: "self_paced",
        title: "Self-Paced / Independent",
        desc: "I follow my own workout program and enjoy training in a great atmosphere",
        icon: "Compass"
      }
    ]
  }
];

export const generatePlanResult = (answers) => {
  const goalId = answers[1] || "build_muscle";
  const levelId = answers[2] || "beginner";
  const batchId = answers[3] || "evening";
  const guidanceId = answers[4] || "trainer_guided";

  const goalMap = {
    lose_weight: {
      name: "Metabolic Shred & Tone Blueprint",
      target: "Burn 3-5 kg fat in 60 days while retaining lean muscle",
      split: "4-Day Upper/Lower + 15 min Post-Workout Cardio HIIT",
      calorieAdvice: "Slight deficit (300-500 kcal) with 1.6g protein per kg",
      keyFocus: "Compound movements, incline treadmill walks & high volume sets",
      recommendedBatch: batchId === "morning" ? "Morning 6:00 AM (Optimal for fat mobilization)" : "Evening 5:00 PM - 10:00 PM"
    },
    build_muscle: {
      name: "Progressive Hypertrophy & Mass Blueprint",
      target: "Pack on 2-4 kg lean mass with progressive overload",
      split: "5-Day Push / Pull / Legs / Rest / Upper / Lower Split",
      calorieAdvice: "Clean surplus (+250 kcal) with 1.8g-2.0g protein per kg",
      keyFocus: "Heavy compound lifts, mechanical tension & hypertrophy machines",
      recommendedBatch: batchId === "evening" ? "Evening 6:30 PM (Peak glycogen & strength)" : "Morning 7:00 AM"
    },
    boost_stamina: {
      name: "Athletic Endurance & Conditioning",
      target: "Double cardiovascular capacity, lung volume and energy",
      split: "Functional Cross-Training + Zone 2 Cardio + Kettlebells",
      calorieAdvice: "Balanced complex carbs, hydration electrolytes & steady proteins",
      keyFocus: "High-intensity circuits, rowers, assault bikes & functional cardio",
      recommendedBatch: "Morning 6:00 AM – 8:00 AM"
    },
    be_healthier: {
      name: "Vitality & Full-Body Longevity",
      target: "Improve joint mobility, posture, cardiovascular health & mood",
      split: "3-Day Full Body Functional Strength + Daily 8k steps",
      calorieAdvice: "Whole foods, anti-inflammatory nutrition & proper hydration",
      keyFocus: "Core stability, posture alignment & light dumbbell conditioning",
      recommendedBatch: batchId === "morning" ? "Morning 7:30 AM" : "Evening 5:30 PM"
    },
    reduce_stress: {
      name: "Mind-Body Decompression & Flow",
      target: "Lower cortisol, enhance sleep quality and relieve tension",
      split: "Moderate resistance training + active mobility & cool-down stretching",
      calorieAdvice: "Magnesium-rich foods, antioxidant fruits & timely meals",
      keyFocus: "Controlled tempo lifting, deep breathing & steady-state cardio",
      recommendedBatch: "Evening 7:00 PM (Wind down after workday)"
    },
    stay_active: {
      name: "Everyday Fitness & Vital Energy",
      target: "Consistent physical fitness to stay sharp and energized",
      split: "4-Day Hybrid Strength & Mobility routine",
      calorieAdvice: "Calorie maintenance with balanced macronutrients",
      keyFocus: "Full body workouts, core training & enjoyable machine exercises",
      recommendedBatch: "Flexible (Morning or Evening as per schedule)"
    }
  };

  const plan = goalMap[goalId] || goalMap.build_muscle;

  return {
    ...plan,
    levelName: levelId === "beginner" ? "Foundation Phase (Form & Habit)" : levelId === "intermediate" ? "Hypertrophy Phase (Progressive Overload)" : "Peak Performance Phase",
    coachAssigned: guidanceId === "dedicated_pt" ? "Certified Personal Coach (1-on-1)" : "On-Floor Strength & Conditioning Team",
    selectedBatchText: batchId === "morning" ? "Morning Shift (6:00 AM – 10:00 AM)" : batchId === "evening" ? "Evening Shift (5:00 PM – 10:00 PM)" : "Flexible Access (Both Morning & Evening)",
    locationNotice: "Valid for full facility access across all shifts."
  };
};
