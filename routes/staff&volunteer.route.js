import { Router } from "express";
const StaffRoute = Router();

StaffRoute.route('/staff').get();
StaffRoute.route('/staff/:id').get();
StaffRoute.route('/add-staff').post();
StaffRoute.route('/update-staff/:id').put();
StaffRoute.route('/delete-staff/:id').delete();
StaffRoute.route('/volunteer-apply').post();
StaffRoute.route('/volunteer').get();


// unique features
StaffRoute.route('/volunteer/match').get();
StaffRoute.route('/staff/shifts').get();
StaffRoute.route('/staff/notifications').post();










export {StaffRoute}