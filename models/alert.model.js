import mongoose from "mongoose";
const AlertSchema = new mongoose.Schema({
    alertId: {
      type: String,
      unique: true,
      required: true, // Unique alert ID
    },
    alertType: {
      type: String,
      enum: ['Wildlife', 'Weather', 'Emergency'],
      required: true, // Type of alert
    },
    description: {
      type: String,
      required: true, // Alert description
    },
    location: {
      type: [Number],
      required: true, // Location coordinates [longitude, latitude]
    },
    status: {
      type: String,
      enum: ['Active', 'Resolved'],
      default: 'Active', // Alert status
    },
    severity: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      default: 'Medium', // Severity of alert
    },
    reportedBy: {
      type: String, // ID of the person who reported the alert
    },
    createdAt: {
      type: Date,
      default: Date.now, // Alert creation timestamp
    },
    updatedAt: {
      type: Date,
      default: Date.now, // Last updated timestamp
    },
  });
  
  
const Alert = mongoose.model("Alert", AlertSchema);
export default Alert