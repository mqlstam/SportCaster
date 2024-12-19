"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    location: {
        city: { type: String },
        coordinates: {
            lat: { type: Number },
            lon: { type: Number }
        }
    },
    preferences: {
        preferredSports: [{
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: 'Sport'
            }],
        preferredIntensity: {
            type: String,
            enum: ['low', 'medium', 'high']
        },
        preferredDuration: { type: Number }
    },
    equipment: [{
            item: { type: String, required: true },
            description: { type: String }
        }]
});
exports.User = mongoose_1.default.model('User', userSchema);
