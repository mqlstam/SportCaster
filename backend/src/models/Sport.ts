import mongoose from 'mongoose';

const sportSchema = new mongoose.Schema({
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

export const Sport = mongoose.model('Sport', sportSchema);