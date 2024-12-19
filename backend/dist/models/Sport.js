"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sport = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const sportSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    isOutdoor: {
        type: Boolean,
        required: true
    },
    rainSuitable: {
        type: Boolean,
        default: false
    },
    windSpeedLimit: {
        type: Number
    },
    minTemp: {
        type: Number
    },
    maxTemp: {
        type: Number
    },
    duration: {
        min: { type: Number, required: true },
        max: { type: Number, required: true }
    },
    intensity: {
        type: String,
        enum: ['low', 'medium', 'high'],
        required: true
    },
    isTeamSport: {
        type: Boolean,
        default: false
    },
    equipment: [{
            item: { type: String, required: true },
            required: { type: Boolean, default: true },
            alternatives: [{ type: String }]
        }]
});
exports.Sport = mongoose_1.default.model('Sport', sportSchema);
