import dotenv from "dotenv"
dotenv.config({
    path: './.env'
})
import express from 'express'
const app = express();
import cookieParser from 'cookie-parser';
import cors from 'cors'
import { donationRoute } from "./routes/donation.route.js";
import { EduRoute } from "./routes/eduAndreasearch.route.js";
import { AlertRoute } from "./routes/emergency&safetyalerts.route.js";
import { MarketRoute } from "./routes/marketplace.route.js";
import { StaffRoute } from "./routes/staff&volunteer.route.js";
import { TourRoute } from "./routes/tour&ticket.route.js";
import { UserRoute } from "./routes/user.route.js";
import { WeatherRoute } from "./routes/weather.routes.js";
import { WildlifeRoute } from "./routes/wildlife.route.js";
import {apiLimiter} from "./middlewares/rateLimitMiddleware.js"

// middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE","PATCH"],
    credentials: true,
}))
// app.use('/api/v1', apiLimiter)
// routes
app.use('/api/v1',donationRoute);
app.use('/api/v1',EduRoute);
app.use('/api/v1',AlertRoute);
app.use('/api/v1',MarketRoute);
app.use('/api/v1',StaffRoute);
app.use('/api/v1',TourRoute);
app.use('/api/v1',UserRoute);
app.use('/api/v1',WeatherRoute);
app.use('/api/v1',WildlifeRoute);




export {app}