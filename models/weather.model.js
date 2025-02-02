import mongoose from "mongoose";
const WeatherSchema = new mongoose.Schema({
    weatherId: {
      type: String,
      unique: true,
      required: true, // Unique weather record ID
    },
    temperature: {
      type: Number,
      required: true, // Temperature in Celsius
    },
    humidity: {
      type: Number,
      required: true, // Humidity percentage
    },
    windSpeed: {
      type: Number,
      required: true, // Wind speed in km/h
    },
    windDirection: {
      type: String, // Wind direction (N, NE, E, SE, etc.)
    },
    rainfall: {
      type: Number,
      required: true, // Rainfall in mm
    },
    airQuality: {
      type: String,
      enum: ['Good', 'Moderate', 'Unhealthy', 'Hazardous'],
      default: 'Good', // Air quality rating
    },
    location: {
      type: [Number], 
      required: true, // Location coordinates [longitude, latitude]
    },
    timestamp: {
      type: Date,
      default: Date.now, // Timestamp of the weather observation
    },
  });

  

const Weather = mongoose.model("Weather",WeatherSchema)
export default Weather