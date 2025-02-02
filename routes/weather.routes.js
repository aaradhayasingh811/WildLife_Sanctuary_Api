import { Router } from "express";
const WeatherRoute = Router();

WeatherRoute.route('/weather/current').get()
WeatherRoute.route('/weather/forecast').get()

// unique features
WeatherRoute.route('/weather/climate-tracker').get()
WeatherRoute.route('/weather/wildlife-alerts').get()



export {WeatherRoute}