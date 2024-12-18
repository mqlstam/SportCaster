// src/config/data/users.ts

export const users = [
    {
      userName: "john.doe",
      email: "john.doe@example.com",
      password: "password123",
      location: {
        city: "Amsterdam",
        coordinates: { lat: 52.3676, lon: 4.9041 },
      },
      preferences: {
        preferredSports: ["Running", "Cycling"],
        preferredIntensity: 'medium',
        preferredDuration: 60, // minutes
      },
      equipment: [
        {
          item: "Running shoes",
          description: "New running shoes",
        },
        { 
          item: "Sports shoes", 
          description: "Old sneakers" 
        },
      ],
    },
    {
      userName: "jane.doe",
      email: "jane.doe@example.com",
      password: "password456",
      location: {
        city: "Berlin",
        coordinates: { lat: 52.52, lon: 13.405 },
      },
      preferences: {
        preferredSports: ["Tennis"],
        preferredIntensity: 'high',
        preferredDuration: 45,
      },
      equipment: [
        {
          item: "Tennis racket",
          description: "Pro tennis racket",
        },
      ],
    },
    // Additional Users
    {
      userName: "alice.smith",
      email: "alice.smith@example.com",
      password: "alicePass789",
      location: {
        city: "New York",
        coordinates: { lat: 40.7128, lon: -74.0060 },
      },
      preferences: {
        preferredSports: ["Cycling"],
        preferredIntensity: 'low',
        preferredDuration: 30,
      },
      equipment: [
        { 
          item: "Cycling helmet", 
          description: "Lightweight helmet" 
        },
        { 
          item: "Bicycle", 
          description: "Mountain bike" 
        },
        { 
          item: "Cycling gloves", 
          description: "Comfortable gloves" 
        },
      ],
    },
    {
      userName: "bob.johnson",
      email: "bob.johnson@example.com",
      password: "bobSecure456",
      location: {
        city: "Sydney",
        coordinates: { lat: -33.8688, lon: 151.2093 },
      },
      preferences: {
        preferredSports: ["Surfing"],
        preferredIntensity: 'high',
        preferredDuration: 90,
      },
      equipment: [
        { 
          item: "Surfboard", 
          description: "Longboard" 
        },
        { 
          item: "Wetsuit", 
          description: "Full-length wetsuit" 
        },
        { 
          item: "Leash", 
          description: "Standard leash" 
        },
      ],
    },
    {
      userName: "carol.williams",
      email: "carol.williams@example.com",
      password: "carolPass321",
      location: {
        city: "Tokyo",
        coordinates: { lat: 35.6762, lon: 139.6503 },
      },
      preferences: {
        preferredSports: ["Yoga", "Martial Arts"],
        preferredIntensity: 'medium',
        preferredDuration: 60,
      },
      equipment: [
        { 
          item: "Yoga mat", 
          description: "Eco-friendly mat" 
        },
        { 
          item: "Yoga blocks", 
          description: "Foam blocks for support" 
        },
      ],
    },
    {
      userName: "david.brown",
      email: "david.brown@example.com",
      password: "davidStrong123",
      location: {
        city: "Toronto",
        coordinates: { lat: 43.6532, lon: -79.3832 },
      },
      preferences: {
        preferredSports: ["Basketball"],
        preferredIntensity: 'high',
        preferredDuration: 120,
      },
      equipment: [
        { 
          item: "Basketball", 
          description: "Official size" 
        },
        { 
          item: "Basketball shoes", 
          description: "High-top shoes" 
        },
      ],
    },
    {
      userName: "emma.davis",
      email: "emma.davis@example.com",
      password: "emmaFit789",
      location: {
        city: "London",
        coordinates: { lat: 51.5074, lon: -0.1278 },
      },
      preferences: {
        preferredSports: ["Yoga"], // Adjusted to existing sports
        preferredIntensity: 'low',
        preferredDuration: 30,
      },
      equipment: [
        { 
          item: "Yoga mat", 
          description: "Eco-friendly mat" 
        },
        { 
          item: "Backpack", 
          description: "50L hiking backpack" 
        },
        { 
          item: "Water bottle", 
          description: "Insulated bottle" 
        },
      ],
    },
    {
      userName: "frank.miller",
      email: "frank.miller@example.com",
      password: "frankPass654",
      location: {
        city: "Madrid",
        coordinates: { lat: 40.4168, lon: -3.7038 },
      },
      preferences: {
        preferredSports: ["Boxing", "Climbing"],
        preferredIntensity: 'medium',
        preferredDuration: 75,
      },
      equipment: [
        { 
          item: "Boxing gloves", 
          description: "Leather gloves" 
        },
        { 
          item: "Hand wraps", 
          description: "Cotton wraps" 
        },
      ],
    },
    {
      userName: "grace.wilson",
      email: "grace.wilson@example.com",
      password: "graceSecure987",
      location: {
        city: "Berlin",
        coordinates: { lat: 52.5200, lon: 13.4050 },
      },
      preferences: {
        preferredSports: ["Climbing", "Table Tennis"],
        preferredIntensity: 'high',
        preferredDuration: 90,
      },
      equipment: [
        { 
          item: "Climbing shoes", 
          description: "Grip-enhanced shoes" 
        },
        { 
          item: "Harness", 
          description: "Adjustable harness" 
        },
        { 
          item: "Chalk bag", 
          description: "Durable chalk bag" 
        },
      ],
    },
    {
      userName: "henry.moore",
      email: "henry.moore@example.com",
      password: "henryPass321",
      location: {
        city: "Los Angeles",
        coordinates: { lat: 34.0522, lon: -118.2437 },
      },
      preferences: {
        preferredSports: ["Martial Arts", "Cycling"],
        preferredIntensity: 'low',
        preferredDuration: 45,
      },
      equipment: [
        { 
          item: "Martial arts uniform", 
          description: "Gi for training" 
        },
        { 
          item: "Protective gear", 
          description: "Headgear and gloves" 
        },
      ],
    },
    {
      userName: "isabella.taylor",
      email: "isabella.taylor@example.com",
      password: "bellaFit456",
      location: {
        city: "Paris",
        coordinates: { lat: 48.8566, lon: 2.3522 },
      },
      preferences: {
        preferredSports: ["Skiing", "Running", "Table Tennis"],
        preferredIntensity: 'high',
        preferredDuration: 120,
      },
      equipment: [
        { 
          item: "Skis", 
          description: "Alpine skis" 
        },
        { 
          item: "Ski boots", 
          description: "Thermal ski boots" 
        },
        { 
          item: "Helmet", 
          description: "Insulated helmet" 
        },
      ],
    },
    {
      userName: "jack.anderson",
      email: "jack.anderson@example.com",
      password: "jackSecure654",
      location: {
        city: "Chicago",
        coordinates: { lat: 41.8781, lon: -87.6298 },
      },
      preferences: {
        preferredSports: ["Table Tennis", "Cycling"],
        preferredIntensity: 'medium',
        preferredDuration: 60,
      },
      equipment: [
        { 
          item: "Table tennis paddle", 
          description: "Carbon fiber paddle" 
        },
        { 
          item: "Table tennis balls", 
          description: "High-speed balls" 
        },
      ],
    },
    {
      userName: "karen.thomas",
      email: "karen.thomas@example.com",
      password: "karenFit789",
      location: {
        city: "San Francisco",
        coordinates: { lat: 37.7749, lon: -122.4194 },
      },
      preferences: {
        preferredSports: ["Volleyball"],
        preferredIntensity: 'low',
        preferredDuration: 30,
      },
      equipment: [
        { 
          item: "Volleyball", 
          description: "Official beach volleyball" 
        },
        { 
          item: "Volleyball shoes", 
          description: "Sand-friendly shoes" 
        },
      ],
    },
    {
      userName: "leo.jackson",
      email: "leo.jackson@example.com",
      password: "leoStrong123",
      location: {
        city: "Houston",
        coordinates: { lat: 29.7604, lon: -95.3698 },
      },
      preferences: {
        preferredSports: ["Riding", "Table Tennis"],
        preferredIntensity: 'high',
        preferredDuration: 75,
      },
      equipment: [
        { 
          item: "Riding boots", 
          description: "Leather riding boots" 
        },
        { 
          item: "Helmet", 
          description: "Equestrian helmet" 
        },
        { 
          item: "Gloves", 
          description: "Breathable riding gloves" 
        },
      ],
    },
  ];
  