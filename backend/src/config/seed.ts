import { Sport, User } from "../models";
import mongoose from "mongoose";
import { sports } from "./data/sports";
import { users } from "./data/users";

// Seeder function
export const seedDatabase = async () => {
  try {
    console.log("Clearing existing collections...");
    await Sport.deleteMany({});
    await User.deleteMany({});
    console.log("Existing collections cleared.");

    console.log("Inserting sports data...");
    const insertedSports = await Sport.insertMany(sports);
    console.log(`Inserted ${insertedSports.length} sports.`);

    // Create a mapping from sport name to its ObjectId
    const sportNameToIdMap: { [key: string]: mongoose.Types.ObjectId } = {};
    insertedSports.forEach((sport) => {
      sportNameToIdMap[sport.name] = sport._id;
    });

    console.log("Mapping user preferred sports to ObjectIds...");
    const usersPrepared = users.map((user) => {
      const preferredSportsIds = user.preferences.preferredSports.map((sportName: string) => {
        const sportId = sportNameToIdMap[sportName];
        if (!sportId) {
          throw new Error(`Sport "${sportName}" not found in the database.`);
        }
        return sportId;
      });
      return { ...user, preferences: { ...user.preferences, preferredSports: preferredSportsIds } };
    });
    console.log("User preferred sports mapped to ObjectIds.");

    console.log("Inserting users data...");
    await User.insertMany(usersPrepared);
    console.log(`Inserted ${usersPrepared.length} users.`);

    console.log("Database seeding completed successfully!");
  } catch (error) {
    console.error("Database seeding failed:", error);
    throw error; // Re-throw error to be caught in the calling function
  }
};
