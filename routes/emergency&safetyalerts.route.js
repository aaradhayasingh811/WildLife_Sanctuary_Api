import { Router } from "express";
import {
    reportAlert,
    getAllAlerts,
    resolveAlert,
    aiRiskDetection,
    panicButtonTrigger
} from "../controllers/emergency&safetyalerts.controllers.js";

const AlertRoute = Router();

AlertRoute.route('/alerts/report').post(reportAlert);
AlertRoute.route('/alerts').get(getAllAlerts);
AlertRoute.route('/alerts/resolve/:id').put(resolveAlert);
AlertRoute.route('/alerts/ai-risk-detection').get(aiRiskDetection);
AlertRoute.route('/alerts/panic-buttons').post(panicButtonTrigger);

export { AlertRoute };
