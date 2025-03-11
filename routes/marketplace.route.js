import { Router } from 'express';
import { getProducts, placeOrder, getOrder, addReview, getEcoProducts } from '../controllers/marketController.js';

const MarketRoute = Router();

MarketRoute.route('/shop/products').get(getProducts);
MarketRoute.route('/shop/place-order').post(placeOrder);
MarketRoute.route('/shop/get-order').get(getOrder);
MarketRoute.route('/shop/add-review/:id').post(addReview);
MarketRoute.route('/shop/eco-products').get(getEcoProducts);

export { MarketRoute };
