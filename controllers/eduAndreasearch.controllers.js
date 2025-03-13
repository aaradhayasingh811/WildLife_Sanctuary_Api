import Article from "../models/article.model.js"
import Research from "../models/research.model.js"
import Quiz from "../models/eduQuiz.js"
import LiveCam from "../models/livecam.js"
import User from "../models/user.model.js";
// Get all articles
const getAllArticles = async (req, res) => {
    try {
        const articles = await Article.find().populate('author', 'name email');
        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json({ message: "Error fetching articles", error });
    }
};

// Get a specific article
const getArticleById = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id).populate('author', 'name email');
        if (!article) return res.status(404).json({ message: "Article not found" });

        article.views += 1; // Increment views
        await article.save();
        res.status(200).json(article);
    } catch (error) {
        res.status(500).json({ message: "Error fetching article", error });
    }
};

// Create a new article (Only Staff/Admin)
const createArticle = async (req, res) => {
    try {
        const {userId} = req.user;
        const user = await User.findOne({
            userId
        })
        if (user.role !== 'Staff' && user.role !== 'Admin') {
            return res.status(403).json({ message: "Access denied" });
        }

        const newArticle = new Article({ ...req.body });
        await newArticle.save();
        res.status(201).json(newArticle);
    } catch (error) {
        res.status(500).json({ message: "Error creating article", error });
    }
};

// Add a comment to an article
const addComment = async (req, res) => {
    try {
        const {userId} = req.user;
        const article = await Article.findById(req.params.id);
        if (!article) return res.status(404).json({ message: "Article not found" });

        article.comments.push({ userId, comment: req.body.comment });
        await article.save();
        res.status(200).json({ message: "Comment added", article });
    } catch (error) {
        res.status(500).json({ message: "Error adding comment", error });
    }
};


// Get all research publications
const getAllResearch = async (req, res) => {
    try {
        const research = await Research.find();
        res.status(200).json(research);
    } catch (error) {
        res.status(500).json({ message: "Error fetching research publications", error });
    }
};

// Get a specific research publication
const getResearchById = async (req, res) => {
    try {
        const research = await Research.findById(req.params.id);
        if (!research) return res.status(404).json({ message: "Research not found" });

        research.views += 1;
        await research.save();
        res.status(200).json(research);
    } catch (error) {
        res.status(500).json({ message: "Error fetching research", error });
    }
};

// Create a new research publication (Only Staff/Admin)
const createResearch = async (req, res) => {
    try {
        const {userId} = req.user;
        const user = await User.findOne({
            userId
        })
        if (user.role !== 'Staff' && user.role !== 'Admin') {
            return res.status(403).json({ message: "Access denied" });
        }

        const newResearch = new Research(req.body);
        await newResearch.save();
        res.status(201).json(newResearch);
    } catch (error) {
        res.status(500).json({ message: "Error adding research publication", error });
    }
};


// Get all quiz questions
const getAllQuizzes = async (req, res) => {
    try {
        const quizzes = await Quiz.find();
        res.status(200).json(quizzes);
    } catch (error) {
        res.status(500).json({ message: "Error fetching quizzes", error });
    }
};

// Get a random quiz question
const getRandomQuiz = async (req, res) => {
    try {
        const count = await Quiz.countDocuments();
        const randomIndex = Math.floor(Math.random() * count);
        const randomQuiz = await Quiz.findOne().skip(randomIndex);
        
        if (!randomQuiz) return res.status(404).json({ message: "No quiz found" });

        res.status(200).json(randomQuiz);
    } catch (error) {
        res.status(500).json({ message: "Error fetching quiz", error });
    }
};

// Add a new quiz question (Only Admin)
const createQuiz = async (req, res) => {
    try {
        const {userId} = req.user;
        const user = await User.findOne({
            userId
        })
        if (user.role !== 'Admin') {
            return res.status(403).json({ message: "Access denied" });
        }

        const newQuiz = new Quiz(req.body);
        await newQuiz.save();
        res.status(201).json(newQuiz);
    } catch (error) {
        res.status(500).json({ message: "Error adding quiz question", error });
    }
};

// Get all active live cams
const getAllLiveCams = async (req, res) => {
    try {
        const liveCams = await LiveCam.find({ isActive: true });
        res.status(200).json(liveCams);
    } catch (error) {
        res.status(500).json({ message: "Error fetching live cams", error });
    }
};

// Get a specific live cam by ID
const getLiveCamById = async (req, res) => {
    try {
        const liveCam = await LiveCam.findById(req.params.id);
        if (!liveCam) return res.status(404).json({ message: "Live cam not found" });

        res.status(200).json(liveCam);
    } catch (error) {
        res.status(500).json({ message: "Error fetching live cam", error });
    }
};

// Add a new live cam (Only Admin)
const createLiveCam = async (req, res) => {
    try {
        const {userId} = req.user;
        const user = await User.findOne({
            userId
        })
        if (user.role !== 'Admin') {
            return res.status(403).json({ message: "Access denied" });
        }

        const newLiveCam = new LiveCam(req.body);
        await newLiveCam.save();
        res.status(201).json(newLiveCam);
    } catch (error) {
        res.status(500).json({ message: "Error adding live cam", error });
    }
};


export {
    getAllArticles,
    getArticleById,
    getAllQuizzes,
    createQuiz,
    getAllLiveCams,
    getLiveCamById,
    createLiveCam,
    createArticle,
    getRandomQuiz,
    createResearch,
    getResearchById,
    getAllResearch,
    addComment,

}

