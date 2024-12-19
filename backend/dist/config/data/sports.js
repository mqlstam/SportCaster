"use strict";
// src/config/data/sports.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.sports = void 0;
exports.sports = [
    {
        name: "Running",
        isOutdoor: true,
        rainSuitable: false,
        windSpeedLimit: 20, // km/h
        minTemp: 5, // °C
        maxTemp: 35, // °C
        duration: {
            min: 30, // minutes
            max: 120, // minutes
        },
        intensity: "medium",
        isTeamSport: false,
        equipment: [
            { item: "Running shoes", required: true, alternatives: ["Trail shoes"] },
            { item: "Sports watch", required: false, alternatives: ["Fitness tracker"] },
        ],
    },
    {
        name: "Tennis",
        isOutdoor: true,
        rainSuitable: false,
        windSpeedLimit: 25,
        minTemp: 10,
        maxTemp: 30,
        duration: {
            min: 60,
            max: 180,
        },
        intensity: "high",
        isTeamSport: false,
        equipment: [
            { item: "Tennis racket", required: true, alternatives: ["Badminton racket"] },
            { item: "Tennis balls", required: true, alternatives: ["Practice balls"] },
            { item: "Sports shoes", required: true, alternatives: ["Court shoes"] },
        ],
    },
    // Add more sports as needed following the same structure
    {
        name: "Cycling",
        isOutdoor: true,
        rainSuitable: true,
        windSpeedLimit: 30,
        minTemp: 10,
        maxTemp: 35,
        duration: {
            min: 45,
            max: 240,
        },
        intensity: "medium",
        isTeamSport: false,
        equipment: [
            { item: "Bicycle", required: true, alternatives: ["Mountain bike"] },
            { item: "Cycling helmet", required: true, alternatives: ["Protective headgear"] },
            { item: "Cycling gloves", required: false, alternatives: ["Fingerless gloves"] },
        ],
    },
    {
        name: "Surfing",
        isOutdoor: true,
        rainSuitable: true,
        windSpeedLimit: 25,
        minTemp: 15,
        maxTemp: 35,
        duration: {
            min: 60,
            max: 180,
        },
        intensity: "high",
        isTeamSport: false,
        equipment: [
            { item: "Surfboard", required: true, alternatives: ["Longboard", "Shortboard"] },
            { item: "Wetsuit", required: true, alternatives: ["Rash guard"] },
            { item: "Leash", required: false, alternatives: ["None"] },
        ],
    },
    {
        name: "Basketball",
        isOutdoor: true,
        rainSuitable: false,
        windSpeedLimit: 20,
        minTemp: 15,
        maxTemp: 35,
        duration: {
            min: 40,
            max: 120,
        },
        intensity: "high",
        isTeamSport: true,
        equipment: [
            { item: "Basketball", required: true, alternatives: ["Practice ball"] },
            { item: "Basketball shoes", required: true, alternatives: ["High-top sneakers"] },
            { item: "Sportswear", required: false, alternatives: ["Compression gear"] },
        ],
    },
    {
        name: "Yoga",
        isOutdoor: false,
        rainSuitable: false,
        windSpeedLimit: 0,
        minTemp: 15,
        maxTemp: 30,
        duration: {
            min: 30,
            max: 90,
        },
        intensity: "low",
        isTeamSport: false,
        equipment: [
            { item: "Yoga mat", required: true, alternatives: ["Exercise mat"] },
            { item: "Yoga blocks", required: false, alternatives: ["Foam blocks"] },
            { item: "Yoga strap", required: false, alternatives: ["Stretch straps"] },
        ],
    },
    {
        name: "Boxing",
        isOutdoor: false,
        rainSuitable: false,
        windSpeedLimit: 0,
        minTemp: 10,
        maxTemp: 30,
        duration: {
            min: 60,
            max: 120,
        },
        intensity: "high",
        isTeamSport: false,
        equipment: [
            { item: "Boxing gloves", required: true, alternatives: ["Leather gloves"] },
            { item: "Hand wraps", required: true, alternatives: ["Cotton wraps"] },
            { item: "Punching bag", required: false, alternatives: ["Speed bag"] },
        ],
    },
    {
        name: "Climbing",
        isOutdoor: true,
        rainSuitable: false,
        windSpeedLimit: 15,
        minTemp: 5,
        maxTemp: 25,
        duration: {
            min: 60,
            max: 180,
        },
        intensity: "high",
        isTeamSport: false,
        equipment: [
            { item: "Climbing shoes", required: true, alternatives: ["Grip-enhanced shoes"] },
            { item: "Harness", required: true, alternatives: ["Adjustable harness"] },
            { item: "Chalk bag", required: false, alternatives: ["Durable chalk bag"] },
        ],
    },
    {
        name: "Martial Arts",
        isOutdoor: false,
        rainSuitable: false,
        windSpeedLimit: 0,
        minTemp: 15,
        maxTemp: 30,
        duration: {
            min: 60,
            max: 120,
        },
        intensity: "high",
        isTeamSport: false,
        equipment: [
            { item: "Martial arts uniform", required: true, alternatives: ["Gi for training"] },
            { item: "Protective gear", required: true, alternatives: ["Headgear and gloves"] },
            { item: "Mouthguard", required: false, alternatives: ["None"] },
        ],
    },
    {
        name: "Skiing",
        isOutdoor: true,
        rainSuitable: false,
        windSpeedLimit: 20,
        minTemp: -10,
        maxTemp: 5,
        duration: {
            min: 60,
            max: 240,
        },
        intensity: "medium",
        isTeamSport: false,
        equipment: [
            { item: "Skis", required: true, alternatives: ["Alpine skis"] },
            { item: "Ski boots", required: true, alternatives: ["Thermal ski boots"] },
            { item: "Helmet", required: true, alternatives: ["Insulated helmet"] },
        ],
    },
    {
        name: "Table Tennis",
        isOutdoor: false,
        rainSuitable: false,
        windSpeedLimit: 0,
        minTemp: 15,
        maxTemp: 30,
        duration: {
            min: 30,
            max: 90,
        },
        intensity: "medium",
        isTeamSport: false,
        equipment: [
            { item: "Table tennis paddle", required: true, alternatives: ["Carbon fiber paddle"] },
            { item: "Table tennis balls", required: true, alternatives: ["High-speed balls"] },
            { item: "Table tennis table", required: false, alternatives: ["Portable table"] },
        ],
    },
    {
        name: "Volleyball",
        isOutdoor: true,
        rainSuitable: false,
        windSpeedLimit: 15,
        minTemp: 18,
        maxTemp: 35,
        duration: {
            min: 30,
            max: 90,
        },
        intensity: "medium",
        isTeamSport: true,
        equipment: [
            { item: "Volleyball", required: true, alternatives: ["Beach volleyball"] },
            { item: "Volleyball shoes", required: false, alternatives: ["Sand-friendly shoes"] },
            { item: "Knee pads", required: false, alternatives: ["Optional knee support"] },
        ],
    },
    {
        name: "Riding",
        isOutdoor: true,
        rainSuitable: false,
        windSpeedLimit: 10,
        minTemp: 10,
        maxTemp: 30,
        duration: {
            min: 30,
            max: 180,
        },
        intensity: "medium",
        isTeamSport: false,
        equipment: [
            { item: "Riding boots", required: true, alternatives: ["Leather riding boots"] },
            { item: "Helmet", required: true, alternatives: ["Equestrian helmet"] },
            { item: "Gloves", required: false, alternatives: ["Breathable riding gloves"] },
        ],
    },
];
