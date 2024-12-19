"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedDatabase = void 0;
const models_1 = require("../models");
const sports_1 = require("./data/sports");
const users_1 = require("./data/users");
// Seeder function
const seedDatabase = async () => {
    try {
        console.log("Clearing existing collections...");
        await models_1.Sport.deleteMany({});
        await models_1.User.deleteMany({});
        console.log("Existing collections cleared.");
        console.log("Inserting sports data...");
        const insertedSports = await models_1.Sport.insertMany(sports_1.sports);
        console.log(`Inserted ${insertedSports.length} sports.`);
        // Create a mapping from sport name to its ObjectId
        const sportNameToIdMap = {};
        insertedSports.forEach((sport) => {
            sportNameToIdMap[sport.name] = sport._id;
        });
        console.log("Mapping user preferred sports to ObjectIds...");
        const usersPrepared = users_1.users.map((user) => {
            const preferredSportsIds = user.preferences.preferredSports.map((sportName) => {
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
        await models_1.User.insertMany(usersPrepared);
        console.log(`Inserted ${usersPrepared.length} users.`);
        console.log("Database seeding completed successfully!");
    }
    catch (error) {
        console.error("Database seeding failed:", error);
        throw error; // Re-throw error to be caught in the calling function
    }
};
exports.seedDatabase = seedDatabase;
