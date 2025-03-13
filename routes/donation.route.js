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




export {donationRoute}