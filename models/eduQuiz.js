import mongoose from "mongoose";
const QuizSchema = new mongoose.Schema({
    question: { type: String, required: true },
    options: [{ text: { type: String, required: true }, isCorrect: { type: Boolean, default: false } }],
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
    category: { type: String, enum: ['Mammals', 'Birds', 'Reptiles', 'Conservation', 'Habitats'], required: true }
});
export default mongoose.model('Quiz', QuizSchema);
