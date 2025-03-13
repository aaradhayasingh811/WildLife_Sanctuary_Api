import { Router } from 'express';
import { getProducts, placeOrder, getOrder, addReview, getEcoProducts , addProductController , getMyOrderController , getMyOrderSpecificController } from '../controllers/marketplace.controllers.js';
import {authMiddleware , authorizeRoles} from "../middlewares/authMiddleware.js"

const MarketRoute = Router();

MarketRoute.route('/shop/products').get(getProducts);
MarketRoute.route('/shop/place-order').post(authMiddleware,placeOrder);
MarketRoute.route('/shop/get-order').get(getOrder);
MarketRoute.route('/shop/add-review/:id').post(authMiddleware,addReview);
MarketRoute.route('/shop/eco-products').get(getEcoProducts);
// extra
MarketRoute.route('/shop/add-product').post(authMiddleware,addProductController);
MarketRoute.route('/shop/my-order').get(authMiddleware,getMyOrderController);
MarketRoute.route('/shop/my-order/:id').get(authMiddleware,getMyOrderSpecificController);

export { MarketRoute };
