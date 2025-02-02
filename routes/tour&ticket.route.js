import { Router } from "express";
const TourRoute = Router();

TourRoute.route('/tours').get()
TourRoute.route('/tours/book').post()
TourRoute.route('/tours/my-bookings').get()
TourRoute.route('/tours/reschedule/:id').put()
TourRoute.route('/tours/cancel/:id').delete()
TourRoute.route('/tours/reviews/:id').get()
TourRoute.route('/tours/add-reviews/:id').post()


// unique features
TourRoute.route('/tours/ai-recommendations').get()
TourRoute.route('/tours/virtual-tour').get()
TourRoute.route('/tours/smart-guide/:id').get()



export {TourRoute}