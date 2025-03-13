import axios from "axios";
import dotenv from "dotenv";
import Weather from "../models/weather.model.js";

dotenv.config();
const API_KEY = process.env.WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

// Function to fetch real-time weather data
const fetchWeatherData = async (lat, lon) => {
    try {
        const response = await axios.get(`${BASE_URL}/weather`, {
            params: { lat, lon, appid: API_KEY, units: "metric" },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        throw new Error("Failed to fetch real-time weather data");
    }
};

// Get current weather
export const getCurrentWeather = async (req, res) => {
    try {
        const { lat, lon } = req.query;
        if (!lat || !lon) return res.status(400).json({ message: "Latitude and Longitude are required" });

        const realTimeData = await fetchWeatherData(lat, lon);
        const weatherData = {
            weatherId: realTimeData.id.toString(),
            temperature: realTimeData.main.temp,
            humidity: realTimeData.main.humidity,
            windSpeed: realTimeData.wind.speed,
            windDirection: realTimeData.wind.deg.toString(),
            rainfall: realTimeData.rain ? realTimeData.rain["1h"] || 0 : 0,
            airQuality: "Moderate",
            location: [lon, lat],
            timestamp: new Date(),
        };

        await Weather.create(weatherData);
        res.json(weatherData);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get weather forecast
export const getWeatherForecast = async (req, res) => {
    try {
        const { lat, lon } = req.query;
        if (!lat || !lon) return res.status(400).json({ message: "Latitude and Longitude are required" });

        const response = await axios.get(`${BASE_URL}/forecast`, {
            params: { lat, lon, appid: API_KEY, units: "metric" },
        });

        const forecastData = response.data.list.map((item) => ({
            timestamp: item.dt_txt,
            temperature: item.main.temp,
            humidity: item.main.humidity,
            windSpeed: item.wind.speed,
            condition: item.weather[0].description,
        }));

        res.json(forecastData);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Climate tracker
export const getClimateTracker = async (req, res) => {
    try {
        const climateStats = {
            averageTemperature: 25,
            rainfallTrend: "Increasing",
            humidityLevels: "Stable",
        };
        res.json(climateStats);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Wildlife alerts
export const getWildlifeAlerts = async (req, res) => {
    try {
        const alerts = [
            { species: "Deer", location: [78.5, 12.3], alert: "Crossing highway" },
            { species: "Bear", location: [77.9, 12.5], alert: "Near hiking trail" },
        ];
        res.json(alerts);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
