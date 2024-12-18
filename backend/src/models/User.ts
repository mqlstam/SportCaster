import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
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
      type: mongoose.Schema.Types.ObjectId, 
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

export const User = mongoose.model('User', userSchema);