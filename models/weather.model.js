import mongoose from "mongoose";

const WeatherSchema = new mongoose.Schema({
    weatherId: { type: String, unique: true, required: true },
    temperature: { type: Number, required: true },
    humidity: { type: Number, required: true },
    windSpeed: { type: Number, required: true },
    windDirection: { type: String },
    rainfall: { type: Number, required: true },
    airQuality: { type: String, enum: ['Good', 'Moderate', 'Unhealthy', 'Hazardous'], default: 'Good' },
    location: { type: [Number], required: true },
    timestamp: { type: Date, default: Date.now },
});

const Weather = mongoose.model("Weather", WeatherSchema);
export default Weather;
