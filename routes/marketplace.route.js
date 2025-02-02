import { Router } from "express";
const MarketRoute = Router();


MarketRoute.route('/shop/products').get();
MarketRoute.route('/shop/place-order').post();
MarketRoute.route('/shop/get-order').get();
MarketRoute.route('/shop/add-review/:id').post();

// unique features
MarketRoute.route('/shop/eco-products').get(); //view sustainable prod




export {MarketRoute}