import mongoose from "mongoose";
const ResearchSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  abstract: { type: String, required: true },
  authors: [{ type: String, required: true }],
  publicationDate: { type: Date, default: Date.now },
  researchPaperURL: { type: String, required: true },
  tags: [{ type: String }],
  citationCount: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
});
export default mongoose.model("Research", ResearchSchema);
