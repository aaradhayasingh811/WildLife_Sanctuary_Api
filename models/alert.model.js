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
        validate: {
            validator: function (arr) {
                return arr.length === 2;
            },
            message: "Location must have exactly two values [longitude, latitude]",
        },
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
        required: true,
    },
    resolvedBy: {
        type: String, // ID of the person who resolved the alert
    },
}, { timestamps: true });

const Alert = mongoose.model("Alert", AlertSchema);
export default Alert;
