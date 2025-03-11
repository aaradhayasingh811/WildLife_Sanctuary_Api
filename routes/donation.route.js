import { Router } from "express";
const donationRoute = Router();
import {
    getAllDonationController,
    addnewDonationController,
    getMyDonationController,
    getDonationUtilization
}

from "../controllers/donations.controllers.js"

import {
    authMiddleware,
    authorizeRoles,
  } from "../middlewares/authMiddleware.js";
  

donationRoute.route('/donations').get(getAllDonationController);
donationRoute.route('/donations/make').post(authMiddleware,addnewDonationController);
donationRoute.route('/donations/my-donations/:donationId').get(getMyDonationController);

// unique features
donationRoute.route('/donations/utilization').get(getDonationUtilization); 
// this to have real time fund utilization


export {donationRoute}