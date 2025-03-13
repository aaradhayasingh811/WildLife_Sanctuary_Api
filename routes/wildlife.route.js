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
  PopulationStatsController,
  healthCheckController,
  getAllEndagnered
} from "../controllers/wildlife.controllers.js";

WildlifeRoute.route("/wildlife").get(getAllAnimalsController);
WildlifeRoute.route("/wildlife/:animalId").get(getAnimalByIdController);
WildlifeRoute.route("/add-wildlife").post(authMiddleware, addAnimalController);
WildlifeRoute.route("/update-wildlife/:animalId").put(authMiddleware, updateAnimalDetailsController);
WildlifeRoute.route("/delete-wildlife/:animalId").delete(authMiddleware, deleteAnimalController);
WildlifeRoute.route("/wildlife/filter/:endangeredStatus").get(filterbyEndangeredStatusController);
WildlifeRoute.route("/wildlife/gps-tracking/:animalId").get(getGpsTrackingController);
// not working
WildlifeRoute.route("/wildlife/population-stats").get(PopulationStatsController);
WildlifeRoute.route("/wildlife/health-check").post(authMiddleware, healthCheckController);


export { WildlifeRoute };
