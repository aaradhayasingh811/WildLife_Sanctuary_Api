import { Router } from "express";
const WildlifeRoute = Router();
import {
  authMiddleware,
  authorizeRoles,
} from "../middlewares/authMiddleware.js";
import {
  getAllAnimalsController,
  getAnimalByIdController,
  updateAnimalDetailsController,
  addAnimalController,
  deleteAnimalController,
  allEndangeredController,
  filterbyEndangeredStatusController
} from "../controllers/wildlife.controllers.js";

WildlifeRoute.route("/wildlife").get(getAllAnimalsController);
WildlifeRoute.route("/wildlife/:animalId").get(getAnimalByIdController);
WildlifeRoute.route("/add-wildlife").post(authMiddleware, addAnimalController);
WildlifeRoute.route("/update-wildlife/:animalId").put(
  authMiddleware,
  updateAnimalDetailsController
);
WildlifeRoute.route("/delete-wildlife/:animalId").delete(
  authMiddleware,
  deleteAnimalController
);

// unique feature endpoint gps
WildlifeRoute.route("/wildlife/gps-tracking/:animalId").get();  //gps tracking
WildlifeRoute.route("/wildlife/population-stats").get();      //Get population trends of species
WildlifeRoute.route("/wildlife/health-check").post();       //ai based health check up
WildlifeRoute.route("/wildlife/endangered").get(allEndangeredController);
WildlifeRoute.route("/wildlife/filter/:endangeredStatus").get(filterbyEndangeredStatusController);      //filter
WildlifeRoute.route("/wildlife/paginated").get();

export { WildlifeRoute };
