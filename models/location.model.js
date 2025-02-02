import mongoose from "mongoose";

const LocationSchema = new mongoose.Schema({
    locationId: {
      type: String,
      unique: true,
      required: true, // Unique location ID
    },
    name: {
      type: String,
      required: true, // Name of the location (e.g., forest area)
    },
    type: {
      type: String,
      enum: ['Forest', 'Grassland', 'Wetland', 'Mountain'],
      required: true, // Type of the sanctuary area
    },
    description: {
      type: String, 
      required: true, // Detailed description of the location
    },
    coordinates: {
      type: [Number], // Coordinates of the location [longitude, latitude]
      required: true,
    },
    animalSpecies: [{
      speciesId: {
        type: String, // ID of the species residing here
      },
      count: {
        type: Number, // Count of the species in the location
      },
    }],
    createdAt: {
      type: Date,
      default: Date.now, // Location record creation timestamp
    },
    updatedAt: {
      type: Date,
      default: Date.now, // Last updated timestamp
    },
  });

  
const Location = mongoose.model("Location",LocationSchema)
export default Location