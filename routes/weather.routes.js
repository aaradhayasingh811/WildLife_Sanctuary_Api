import { Router } from "express";
import { 
    getCurrentWeather, 
    getWeatherForecast, 
    getClimateTracker, 
    getWildlifeAlerts 
} from "../controllers/weather.controller.js";

const WeatherRoute = Router();

WeatherRoute.route("/weather/current").get(getCurrentWeather);
WeatherRoute.route("/weather/forecast").get(getWeatherForecast);
WeatherRoute.route("/weather/climate-tracker").get(getClimateTracker);
WeatherRoute.route("/weather/wildlife-alerts").get(getWildlifeAlerts);

export default WeatherRoute;
