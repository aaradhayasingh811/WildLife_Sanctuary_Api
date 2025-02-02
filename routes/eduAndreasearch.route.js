import { Router } from "express";
const EduRoute = Router();

EduRoute.route('/education/articles').get();
EduRoute.route('/education/articles/:id').get();
EduRoute.route('/education/add-articles').post();
EduRoute.route('/research/publications').get();

// unique features
EduRoute.route('/education/live-cam').get();



export  {EduRoute}