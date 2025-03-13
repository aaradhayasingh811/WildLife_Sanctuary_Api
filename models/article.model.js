import mongoose from "mongoose";

const ArticleSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    category: { type: String, enum: ['Wildlife', 'Conservation', 'Research', 'Tourism'], required: true },
    tags: [{ type: String }],
    publishedAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    views: { type: Number, default: 0 },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], 
    comments: [
        {
            userId: { type: "String", required : true},
            comment: { type: String, required: true },
            createdAt: { type: Date, default: Date.now }
        }
    ]
});
export default mongoose.model('Article', ArticleSchema);