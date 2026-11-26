export const gymDetails = {
  name: "[Gym Name]",
  tagline: "High-Performance Strength & Conditioning Club",
  heroImage: "/images/gym-hero.jpg",
  address: {
    full: "[Gym Address, Street, City, State, PIN]",
    street: "[Gym Address]",
    city: "[City]",
    state: "[State]",
    pincode: "[PIN Code]",
    landmark: "[Landmark / Facility Location]"
  },
  timings: {
    summary: "[Morning Shift: 6:00 AM – 10:00 AM | Evening Shift: 5:00 PM – 10:00 PM]",
    morningBatch: "[6:00 AM – 10:00 AM]",
    eveningBatch: "[5:00 PM – 10:00 PM]",
    sunday: "[Sunday: 7:00 AM – 10:00 AM (Open Floor)]",
    batches: [
      {
        name: "Morning Shift",
        time: "[6:00 AM – 10:00 AM]",
        startHour: 6,
        endHour: 10,
        highlight: "Peak energy, fasted cardio, and focused strength sets",
        idealFor: "Cardio, metabolic conditioning & heavy lifting",
        badge: "Fresh & Energizing"
      },
      {
        name: "Evening Shift",
        time: "[5:00 PM – 10:00 PM]",
        startHour: 17,
        endHour: 22,
        highlight: "High octane music, coach spotters & post-work pump",
        idealFor: "Hypertrophy, powerlifting & personal coaching",
        badge: "Prime Atmosphere"
      }
    ]
  },
  contact: {
    phone: "[Contact Number]",
    phoneDisplay: "[+91 XXXXX XXXXX]",
    whatsapp: "910000000000",
    email: "contact@[gymdomain].com",
    instagramUrl: "https://instagram.com/[gym_instagram]",
    instagramHandle: "@[gym_handle]",
    googleMapsUrl: "https://maps.google.com/?q=[Gym+Location]"
  },
  reviewsSummary: {
    averageRating: 4.9,
    totalReviews: 120,
    headline: "Engineered for real athletic results and personal transformation.",
    summaryText: "Members praise the modern precision cardio equipment, clean air-conditioned workout floor, motivating coaching staff, and vibrant fitness community.",
    distribution: [
      { stars: 5, percentage: 92, count: 110 },
      { stars: 4, percentage: 6, count: 7 },
      { stars: 3, percentage: 2, count: 3 },
      { stars: 2, percentage: 0, count: 0 },
      { stars: 1, percentage: 0, count: 0 },
    ],
    highlightPills: [
      "Precision Equipment",
      "Spacious AC Floor",
      "Certified Coaches",
      "Welcoming Community",
      "Flexible Batch Times"
    ],
    testimonials: [
      {
        id: 1,
        author: "Member Testimonial",
        role: "Active Member",
        rating: 5,
        time: "Recent Member",
        comment: "Outstanding training environment with smooth German-engineered treadmills and heavy free weights. The air-conditioned floor is always spotless.",
        tag: "Fat Loss & Conditioning"
      },
      {
        id: 2,
        author: "Strength Athlete",
        role: "Evening Batch",
        rating: 5,
        time: "Verified Member",
        comment: "Best equipment in the area. Sturdy squat racks, Olympic barbells, and coaches who actively help with posture and workout form.",
        tag: "Hypertrophy & Strength"
      },
      {
        id: 3,
        author: "Morning Member",
        role: "Morning Shift",
        rating: 5,
        time: "Regular Member",
        comment: "Super clean and safe space. The morning batch allows me to get my full workout completed before work without waiting for machines.",
        tag: "General Fitness"
      }
    ]
  },
  features: [
    {
      title: "Precision Cardio & Treadmills",
      description: "German-designed commercial motorized treadmills, shock-absorbing decks, and high-performance cardio theatre.",
      icon: "Flame"
    },
    {
      title: "Biomechanic Strength Floor",
      description: "Plate-loaded machines, linear leg press, dual cable crossovers, and ergonomic movement arcs.",
      icon: "Dumbbell"
    },
    {
      title: "Clean Air-Conditioned Floor",
      description: "Sanitized daily with industrial air purification, non-slip rubber flooring, and fresh climate control.",
      icon: "Sparkles"
    },
    {
      title: "Flexible Dual Shifts",
      description: "Convenient morning and evening workout slots tailored for professionals, students, and athletes.",
      icon: "Clock"
    },
    {
      title: "Certified Coaching & Form Guidance",
      description: "Experienced trainers on the floor to advise on exercise execution, split blueprints, and progression.",
      icon: "Award"
    },
    {
      title: "Lockers & Chilled Hydration",
      description: "Secure digital member lockers, modern changing rooms, and chilled RO filtered drinking stations.",
      icon: "ShieldCheck"
    }
  ],
  pricingPlans: [
    {
      id: "monthly",
      name: "Monthly Flex Pass",
      tagline: "Total access with complete flexibility",
      price: "[Monthly Fee]",
      period: "per month",
      popular: false,
      features: [
        "Full access to Morning & Evening shifts",
        "Commercial cardio & strength equipment",
        "Free secure locker & changing facilities",
        "Floor trainer assistance & guidance",
        "Customized workout chart"
      ]
    },
    {
      id: "quarterly",
      name: "3-Month Transformation",
      tagline: "Most popular for noticeable strength & fat loss",
      price: "[Quarterly Fee]",
      originalPrice: "[Original Price]",
      period: "for 3 months",
      popular: true,
      badge: "Best Value",
      features: [
        "All Monthly Flex Pass benefits included",
        "Periodic BMI & body composition analysis",
        "Customized AI routine & nutrition guide",
        "Priority spotter & posture checks",
        "Save on multi-month registration"
      ]
    },
    {
      id: "annual",
      name: "Annual VIP Membership",
      tagline: "Commit to year-round peak physical condition",
      price: "[Annual Fee]",
      originalPrice: "[Original Price]",
      period: "per year",
      popular: false,
      badge: "Maximum Savings",
      features: [
        "Unrestricted 365-day floor access",
        "Complimentary 1-on-1 coaching consultations",
        "Personalized macro nutrition plan",
        "Complimentary guest passes",
        "Zero registration fee"
      ]
    }
  ],
  coaches: [
    {
      name: "Lead Strength Coach",
      role: "Head Conditioning Specialist",
      experience: "Certified Trainer",
      specialty: "Hypertrophy, Posture & Strength",
      image: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "Fitness Specialist",
      role: "Cardio & Fat Loss Coach",
      experience: "Functional Coach",
      specialty: "HIIT, Transformation & Endurance",
      image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "Movement & Core Coach",
      role: "Athletic Conditioning Specialist",
      experience: "Certified Coach",
      specialty: "Functional Movement & Stability",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80"
    }
  ]
};
