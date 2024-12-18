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
      equipment: [
        {
          item: "Running shoes",
          required: true,
          description: "New running shoes",
        },
        { item: "Sports shoes", description: "Old sneakers" },
      ],
    },
    {
      userName: "jane.doe",
      email: "jane.doe@example.com",
      password: "password456",
      equipment: [
        {
          item: "Tennis racket",
          required: true,
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
        coordinates: { lat: 40.7128, lon: -74.006 },
      },
      equipment: [
        { item: "Cycling helmet", required: true, description: "Lightweight helmet" },
        { item: "Bicycle", required: true, description: "Mountain bike" },
        { item: "Cycling gloves", description: "Comfortable gloves" },
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
      equipment: [
        { item: "Surfboard", required: true, description: "Longboard" },
        { item: "Wetsuit", required: true, description: "Full-length wetsuit" },
        { item: "Leash", description: "Standard leash" },
      ],
    },
    {
      userName: "carol.williams",
      email: "carol.williams@example.com",
      password: "carolPass321",
      equipment: [
        { item: "Yoga mat", required: false, description: "Eco-friendly mat" },
        { item: "Yoga blocks", description: "Foam blocks for support" },
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
      equipment: [
        { item: "Basketball", required: true, description: "Official size" },
        { item: "Basketball shoes", required: true, description: "High-top shoes" },
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
      equipment: [
        { item: "Hiking boots", required: true, description: "Waterproof boots" },
        { item: "Backpack", required: true, description: "50L hiking backpack" },
        { item: "Water bottle", description: "Insulated bottle" },
      ],
    },
    {
      userName: "frank.miller",
      email: "frank.miller@example.com",
      password: "frankPass654",
      equipment: [
        { item: "Boxing gloves", required: true, description: "Leather gloves" },
        { item: "Hand wraps", description: "Cotton wraps" },
      ],
    },
    {
      userName: "grace.wilson",
      email: "grace.wilson@example.com",
      password: "graceSecure987",
      location: {
        city: "Berlin",
        coordinates: { lat: 52.52, lon: 13.405 },
      },
      equipment: [
        { item: "Climbing shoes", required: true, description: "Grip-enhanced shoes" },
        { item: "Harness", required: true, description: "Adjustable harness" },
        { item: "Chalk bag", description: "Durable chalk bag" },
      ],
    },
    {
      userName: "henry.moore",
      email: "henry.moore@example.com",
      password: "henryPass321",
      location: {
        city: "Tokyo",
        coordinates: { lat: 35.6762, lon: 139.6503 },
      },
      equipment: [
        { item: "Martial arts uniform", required: true, description: "Gi for training" },
        { item: "Protective gear", description: "Headgear and gloves" },
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
      equipment: [
        { item: "Skis", required: true, description: "Alpine skis" },
        { item: "Ski boots", required: true, description: "Thermal ski boots" },
        { item: "Helmet", required: true, description: "Insulated helmet" },
      ],
    },
    {
      userName: "jack.anderson",
      email: "jack.anderson@example.com",
      password: "jackSecure654",
      equipment: [
        { item: "Table tennis paddle", required: true, description: "Carbon fiber paddle" },
        { item: "Table tennis balls", required: true, description: "High-speed balls" },
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
      equipment: [
        { item: "Volleyball", required: true, description: "Official beach volleyball" },
        { item: "Volleyball shoes", description: "Sand-friendly shoes" },
      ],
    },
    {
      userName: "leo.jackson",
      email: "leo.jackson@example.com",
      password: "leoStrong123",
      equipment: [
        { item: "Riding boots", required: true, description: "Leather riding boots" },
        { item: "Helmet", required: true, description: "Equestrian helmet" },
        { item: "Gloves", description: "Breathable riding gloves" },
      ],
    },
  ];
  