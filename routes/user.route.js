import { Router } from "express";
const UserRoute = Router();
import {authMiddleware , authorizeRoles} from "../middlewares/authMiddleware.js"
import {registerController , loginController , profileController,updateProfileController,deleteController , logoutController} from "../controllers/user.controllers.js"

UserRoute.route('/register').post(registerController)
UserRoute.route('/login').post(loginController)
UserRoute.route('/profile').get(authMiddleware,profileController)
UserRoute.route('/update-profile').put(authMiddleware,updateProfileController)
UserRoute.route('/delete-account').delete(authMiddleware,deleteController)
UserRoute.route('/logout').post(logoutController)


export {UserRoute}