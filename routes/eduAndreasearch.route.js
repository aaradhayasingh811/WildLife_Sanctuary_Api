import { Router } from "express";
import {
    getAllArticles,
    getArticleById,
    createArticle,
    addComment,
    getAllResearch,
    getResearchById,
    createResearch,
    getAllQuizzes,
    getRandomQuiz,
    createQuiz,
    getAllLiveCams,
    getLiveCamById,
    createLiveCam
} from "../controllers/eduAndreasearch.controllers.js";
import { authMiddleware, authorizeRoles } from "../middlewares/authMiddleware.js";

const EduRoute = Router();

// Articles
EduRoute.get('/education/articles', getAllArticles);
EduRoute.get('/education/articles/:id', getArticleById);
EduRoute.post('/education/articles', authMiddleware, createArticle);
EduRoute.post('/education/articles/:id/comment', authMiddleware, addComment);

// Research
EduRoute.get('/research/publications', getAllResearch);
EduRoute.get('/research/publications/:id', getResearchById);
EduRoute.post('/research/publications', authMiddleware, createResearch);

// Quizzes
EduRoute.get('/education/quizzes', getAllQuizzes);
EduRoute.get('/education/quiz/random', getRandomQuiz);
EduRoute.post('/education/quizzes', authMiddleware, createQuiz);

// Live Cams
EduRoute.get('/education/live-cams', getAllLiveCams);
EduRoute.get('/education/live-cams/:id', getLiveCamById);
EduRoute.post('/education/live-cams', authMiddleware, createLiveCam);

export {EduRoute};