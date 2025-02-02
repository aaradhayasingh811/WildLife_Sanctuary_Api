import { Router } from "express";
const WildlifeRoute = Router();


WildlifeRoute.route('/wildlife').get()
WildlifeRoute.route('/wildlife/:id').get()
WildlifeRoute.route('/add-wildlife').post()
WildlifeRoute.route('/update-wildlife/:id').put()
WildlifeRoute.route('/delete-wildlife/:id').delete()

// unique feature endpoint gps
WildlifeRoute.route('/wildlife/gps-tracking/:id').get()
WildlifeRoute.route('/wildlife/population-stats').get()
WildlifeRoute.route('/wildlife/health-check').post()
WildlifeRoute.route('/wildlife/endangered').get()
WildlifeRoute.route('/wildlife/filter').get()
WildlifeRoute.route('/wildlife/paginated').get()






export {WildlifeRoute}