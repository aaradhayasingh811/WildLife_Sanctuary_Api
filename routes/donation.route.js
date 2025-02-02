import { Router } from "express";
const donationRoute = Router();

donationRoute.route('/donations').get();
donationRoute.route('/donations/make').post();
donationRoute.route('/donations/my-donations').get();

// unique features
donationRoute.route('/donations/utilization').get(); 
// this to have real time fund utilization


export {donationRoute}