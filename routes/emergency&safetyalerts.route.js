import { Router } from "express";
const AlertRoute = Router();

AlertRoute.route('/alerts/report').post();
AlertRoute.route('/alerts').get();
AlertRoute.route('/alerts/resolve/:id').put();

// unique features
AlertRoute.route('/alerts/ai-risk-detection').get();
AlertRoute.route('/alerts/panic-buttons').post();


export {AlertRoute};