import { connectDB } from "./database";
import { Sport, User } from "../models";

const sports = [
  {
    name: "Running",
    isOutdoor: true,
    rainSuitable: false,
    windSpeedLimit: null,
    minTemp: 5,
    maxTemp: 30,
    duration: { min: 20, max: 90 },
    intensity: "medium",
    isTeamSport: false,
    equipment: [{ item: "Running shoes", required: true }],
  },
  {
    name: "Swimming",
    isOutdoor: false,
    duration: { min: 30, max: 120 },
    intensity: "medium",
    isTeamSport: false,
    equipment: [{ item: "Swimming goggles", required: false }],
  },
  {
    name: "Tennis",
    isOutdoor: true,
    rainSuitable: false,
    windSpeedLimit: 20,
    minTemp: 10,
    maxTemp: 35,
    duration: { min: 60, max: 120 },
    intensity: "medium",
    isTeamSport: true,
    equipment: [
      { item: "Tennis racket", required: true },
      {
        item: "Tennis shoes",
        required: true,
        alternatives: ["Sports shoes", "Sneakers"],
      },
      { item: "Tennis balls", required: false },
    ],
  },
  {
    name: "Football",
    isOutdoor: true,
    rainSuitable: true,
    windSpeedLimit: null,
    minTemp: 0,
    maxTemp: 35,
    duration: { min: 90, max: 120 },
    intensity: "high",
    isTeamSport: true,
    equipment: [{ item: "Football boots", required: true }],
  },
  {
    name: "Yoga",
    isOutdoor: true,
    rainSuitable: true,
    windSpeedLimit: null,
    minTemp: 10,
    maxTemp: 35,
    duration: { min: 20, max: 60 },
    intensity: "low",
    isTeamSport: false,
    equipment: [{ item: "Yoga mat", required: false }],
  },
];

const users = [
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
];

const seed = async () => {
  try {
    await connectDB();
    await Sport.deleteMany({});
    await User.deleteMany({});
    await Sport.insertMany(sports);
    await User.insertMany(users);
    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Database seeding failed", error);
  }
};
seed();
