import { Router } from "express";
const WildlifeRoute = Router();
import {
  authMiddleware,
} from "../middlewares/authMiddleware.js";
import {
  getAllAnimalsController,
  getAnimalByIdController,
  updateAnimalDetailsController,
  addAnimalController,
  deleteAnimalController,
  allEndangeredController,
  filterbyEndangeredStatusController,
  getGpsTrackingController,
  getPopulationStatsController,
  healthCheckController,
  getPaginatedAnimalsController
} from "../controllers/wildlife.controllers.js";

WildlifeRoute.route("/wildlife").get(getAllAnimalsController);
WildlifeRoute.route("/wildlife/:animalId").get(getAnimalByIdController);
WildlifeRoute.route("/add-wildlife").post(authMiddleware, addAnimalController);
WildlifeRoute.route("/update-wildlife/:animalId").put(authMiddleware, updateAnimalDetailsController);
WildlifeRoute.route("/delete-wildlife/:animalId").delete(authMiddleware, deleteAnimalController);
WildlifeRoute.route("/wildlife/endangered").get(allEndangeredController);
WildlifeRoute.route("/wildlife/filter/:endangeredStatus").get(filterbyEndangeredStatusController);
WildlifeRoute.route("/wildlife/gps-tracking/:animalId").get(getGpsTrackingController);
WildlifeRoute.route("/wildlife/population-stats").get(getPopulationStatsController);
WildlifeRoute.route("/wildlife/health-check").post(authMiddleware, healthCheckController);
WildlifeRoute.route("/wildlife/paginated").get(getPaginatedAnimalsController);

export { WildlifeRoute };
