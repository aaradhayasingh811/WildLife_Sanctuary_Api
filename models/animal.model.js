import mongoose from "mongoose";

const AnimalSchema = new mongoose.Schema({
    animalId: {
      type: String,
      unique: true,
      required: true, // Unique animal ID
    },
    species: {
      type: String,
      required: true, // Species name
    },
    commonName: {
      type: String,
      required: true, // Common name
    },
    age: {
      type: Number,
      required: true, // Age in years
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Unknown'],
      required: true, // Gender
    },
    healthStatus: {
      type: String,
      enum: ['Healthy', 'Injured', 'Ill', 'Recovering'],
      required: true, // Health condition
    },
    habitat: {
      type: String,
      required: true, // Habitat details (forest, grassland, etc.)
    },
    endangeredStatus: {
      type: String,
      enum: [
        'Least Concern',
        'Near Threatened',
        'Vulnerable',
        'Endangered',
        'Critically Endangered',
      ],
      default: 'Least Concern', // Endangered status
    },
    gpsLocation: {
      type: [Number],
      // required: true, // GPS coordinates [longitude, latitude]
    },
    populationStats: {
      type: Object,
      default: {}, // Population statistics (trend, last census)
    },
    imageUrls: [{
      type: String, // Array of image URLs
    }],
    createdAt: {
      type: Date,
      default: Date.now, // Animal record creation timestamp
    },
    updatedAt: {
      type: Date,
      default: Date.now, // Last updated timestamp
    },
  });

 const Animal = mongoose.model("Animal",AnimalSchema)
 export default Animal