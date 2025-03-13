import { Router } from "express";
const StaffRoute = Router();

import {
  getAllStaffController,
  getStaffByIdController,
  addNewStaffController,
  updateDetailsController,
  deleteStaffByIdController,
  getAllVolunteerController,
  addShiftController,
  staffNotificationsController,
  volunteerMatchController
} from "../controllers/staff&volun.controllers.js";
import {
  authMiddleware,
  authorizeRoles,
} from "../middlewares/authMiddleware.js";

StaffRoute.route("/staff").get(getAllStaffController);
StaffRoute.route("/staff/:id").get(getStaffByIdController);
StaffRoute.route("/add-staff").post(authMiddleware, addNewStaffController);
StaffRoute.route("/update-staff/:id").put(updateDetailsController);
StaffRoute.route("/delete-staff/:id").delete(authMiddleware , deleteStaffByIdController);
StaffRoute.route("/volunteer").get(getAllVolunteerController);

// unique features
StaffRoute.route("/volunteer/match").get(volunteerMatchController);
StaffRoute.route("/staff/add-shifts/:id").post(authMiddleware,addShiftController);
StaffRoute.route("/staff/notifications").post(staffNotificationsController);

export { StaffRoute };
