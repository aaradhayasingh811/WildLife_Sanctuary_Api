import mongoose from "mongoose";
const LiveCamSchema = new mongoose.Schema({
    location: { type: String, required: true }, 
    streamURL: { type: String, required: true }, 
    description: { type: String }, 
    isActive: { type: Boolean, default: true }, 
    createdAt: { type: Date, default: Date.now }
});
export default mongoose.model('LiveCam', LiveCamSchema);
