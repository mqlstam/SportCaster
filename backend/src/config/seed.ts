// src/config/seed.ts

import { connectDB } from "./database";
import { Sport, User } from "../models";
import mongoose from "mongoose";
import { sports } from "./data/sports";
import { users } from "./data/users";

export const seedDatabase = async () => { // Export the function
  try {
    console.log("Connecting to MongoDB...");
    await connectDB();
    console.log("Connected to MongoDB");

    console.log("Clearing existing collections...");
    await Sport.deleteMany({});
    await User.deleteMany({});
    console.log("Collections cleared");

    console.log("Inserting seed data...");
    await Sport.insertMany(sports);
    await User.insertMany(users);
    console.log("Seed data inserted successfully");
  } catch (error) {
    console.error("Database seeding failed:", error);
  } finally {
    await mongoose.connection.close();
    console.log("MongoDB connection closed");
  }
};
