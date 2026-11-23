export const gymDetails = {
  name: "Elite Gym",
  tagline: "Sagar's Premier Fitness & Bodybuilding Destination",
  address: {
    full: "Elite gym, Tili Rd, in front of Rozgar Office, State Bank Colony, Poddar Colony, Sagar, Madhya Pradesh 470001",
    street: "Tili Rd, in front of Rozgar Office",
    colony: "State Bank Colony, Poddar Colony",
    city: "Sagar",
    state: "Madhya Pradesh",
    pincode: "470001",
    landmark: "Directly opposite District Rozgar Office (Employment Exchange)"
  },
  timings: {
    summary: "Monday – Saturday: 6:00 AM – 10:00 AM | 5:00 PM – 10:00 PM",
    batches: [
      {
        name: "Morning Batch",
        time: "6:00 AM – 10:00 AM",
        startHour: 6,
        endHour: 10,
        highlight: "Best for early risers, students & cardio-strength kickstart",
        idealFor: "Cardio, Empty-stomach fat burn & peaceful heavy lifts",
        badge: "Fresh & Energizing"
      },
      {
        name: "Evening Batch",
        time: "5:00 PM – 10:00 PM",
        startHour: 17,
        endHour: 22,
        highlight: "High energy, coach-assisted sessions & post-work workout",
        idealFor: "Heavy hypertrophy, powerlifting, spotter support & functional pump",
        badge: "Peak Energy & Music"
      }
    ],
    sunday: "Sunday: 7:00 AM – 10:00 AM (Active recovery & open floor)"
  },
  contact: {
    phone: "+91 98260 00000",
    phoneDisplay: "+91 98260 XXXXX",
    whatsapp: "919826000000",
    email: "contact@elitegymsagar.com",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Elite+gym+Tili+Rd+in+front+of+Rozgar+Office+State+Bank+Colony+Poddar+Colony+Sagar+Madhya+Pradesh+470001"
  },
  reviewsSummary: {
    averageRating: 4.7,
    totalReviews: 52,
    googleReviewText: "People say this gym features modern, top-notch equipment and a spacious, clean environment. They also highlight the friendly and welcoming atmosphere, which helps members stay focused on their fitness goals. Guests mention the professional and motivating coaches provide excellent guidance and personal attention.",
    distribution: [
      { stars: 5, percentage: 84, count: 44 },
      { stars: 4, percentage: 11, count: 6 },
      { stars: 3, percentage: 3, count: 1 },
      { stars: 2, percentage: 1, count: 1 },
      { stars: 1, percentage: 1, count: 0 },
    ],
    highlightPills: [
      "Modern Equipment",
      "Spacious & Clean",
      "Motivating Coaches",
      "Welcoming Atmosphere",
      "Prime Tili Road Location"
    ],
    testimonials: [
      {
        id: 1,
        author: "Aman Sharma",
        role: "Member since 2023",
        rating: 5,
        time: "2 weeks ago",
        comment: "Best gym on Tili Road, Sagar! The atmosphere is unbeatable, machines are completely smooth and well-maintained. Coaches are always on the floor guiding your posture.",
        tag: "Muscle Building"
      },
      {
        id: 2,
        author: "Pooja Patel",
        role: "Morning Batch Member",
        rating: 5,
        time: "1 month ago",
        comment: "Super safe and welcoming environment for women. The 6-10 AM morning slot is fresh, completely hygienic, and the personal training attention is wonderful.",
        tag: "Fat Loss & Tone"
      },
      {
        id: 3,
        author: "Rohit Bundela",
        role: "Powerlifting Enthusiast",
        rating: 5,
        time: "3 months ago",
        comment: "High quality Olympic barbells, sturdy squat racks and plenty of plates. You don't have to wait in line for benches. Elite Gym definitely lives up to its name.",
        tag: "Strength Training"
      },
      {
        id: 4,
        author: "Dr. Vikas Jain",
        role: "Evening Batch Member",
        rating: 4.8,
        time: "Recently",
        comment: "Centrally located right opposite Rozgar Office in Poddar Colony. Perfect evening batch hours (5 PM to 10 PM) that fit right into my clinic schedule.",
        tag: "General Fitness"
      }
    ]
  },
  features: [
    {
      title: "Top-Notch Modern Equipment",
      description: "Bio-mechanically engineered plate-loaded machines, Olympic racks, and imported cardio setups.",
      icon: "Dumbbell"
    },
    {
      title: "Spacious & Clean Environment",
      description: "Fully air-conditioned, sanitised daily, dust-free rubber flooring and ample natural ventilation.",
      icon: "Sparkles"
    },
    {
      title: "Expert & Motivating Coaches",
      description: "Certified trainers offering customized workout split designs, posture corrections and diet advice.",
      icon: "Award"
    },
    {
      title: "Flexible Split Batches",
      description: "Dual convenient slots: 6–10 AM for early birds and 5–10 PM for evening power training.",
      icon: "Clock"
    },
    {
      title: "Prime Sagar Location",
      description: "Located on Tili Road right in front of Rozgar Office with easy bike and car parking.",
      icon: "MapPin"
    },
    {
      title: "Supportive Community",
      description: "A friendly, zero-ego workout vibe that keeps you accountable and motivated every single day.",
      icon: "Users"
    }
  ],
  pricingPlans: [
    {
      id: "monthly",
      name: "Monthly Pass",
      tagline: "Great for testing the waters",
      price: "1,199",
      period: "per month",
      popular: false,
      features: [
        "Full access to Morning & Evening batches",
        "Modern strength & cardio equipment",
        "Free locker & shower facilities",
        "Gym floor trainer assistance",
        "Diet guide & workout chart"
      ]
    },
    {
      id: "quarterly",
      name: "3-Month Transformation",
      tagline: "Most popular for visible muscle & fat loss",
      price: "2,999",
      originalPrice: "3,599",
      period: "for 3 months",
      popular: true,
      badge: "Best Value",
      features: [
        "All Monthly Pass features included",
        "Bi-weekly body composition & BMI review",
        "Customized AI workout split blueprint",
        "Priority spotter & posture checks",
        "Save 17% compared to monthly pass"
      ]
    },
    {
      id: "annual",
      name: "Annual VIP Membership",
      tagline: "For true fitness enthusiasts",
      price: "8,999",
      originalPrice: "14,388",
      period: "per year",
      popular: false,
      badge: "Maximum Savings",
      features: [
        "Unrestricted 365-day access",
        "Complimentary 1-on-1 personal training sessions",
        "Complete personalized nutrition & macro chart",
        "Free guest passes (2 per quarter)",
        "Zero registration fee"
      ]
    }
  ],
  coaches: [
    {
      name: "Vikram Rajput",
      role: "Head Strength & Conditioning Coach",
      experience: "8+ Years Experience",
      specialty: "Hypertrophy, Powerlifting & Biomechanics",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "Sunil Verma",
      role: "Senior Fitness & Fat Loss Specialist",
      experience: "6+ Years Experience",
      specialty: "HIIT, Transformation & Sports Nutrition",
      image: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "Anjali Dubey",
      role: "Women's Wellness & Posture Coach",
      experience: "5+ Years Experience",
      specialty: "Functional Training, Core Stability & Mobility",
      image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80"
    }
  ]
};
