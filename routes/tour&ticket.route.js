import { Router } from "express";
import {authMiddleware , authorizeRoles} from "../middlewares/authMiddleware.js"
const TourRoute = Router();
import {
    getAllTourController,
    bookTourController,
    getMyBookingController,
    rescheduleTourController,
    cancelTourController,
    getReviewByIdController,
    addReviewController
}

from "../controllers/tour.controllers.js"

TourRoute.route('/tours').get(getAllTourController)
TourRoute.route('/tours/book').post(authMiddleware,bookTourController)
TourRoute.route('/tours/my-bookings').get(authMiddleware,getMyBookingController)
TourRoute.route('/tours/reschedule/:tourId').put(rescheduleTourController)
TourRoute.route('/tours/cancel/:tourId').delete(cancelTourController)
TourRoute.route('/tours/reviews/:tourId').get(getReviewByIdController)
TourRoute.route('/tours/add-reviews/:tourId').post(authMiddleware,addReviewController)


// unique features
TourRoute.route('/tours/ai-recommendations').get()
TourRoute.route('/tours/virtual-tour').get()
TourRoute.route('/tours/smart-guide/:id').get()



export {TourRoute}