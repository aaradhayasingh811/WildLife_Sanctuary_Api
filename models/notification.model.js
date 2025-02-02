import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
    notificationId: {
      type: String,
      unique: true,
      required: true, // Unique notification ID
    },
    userId: {
      type: String,
      required: true, // User to whom the notification is sent
    },
    message: {
      type: String,
      required: true, // Notification message
    },
    type: {
      type: String,
      enum: ['General', 'Booking', 'Alert', 'Promotion'],
      required: true, // Type of notification
    },
    status: {
      type: String,
      enum: ['Unread', 'Read'],
      default: 'Unread', // Read/unread status
    },
    createdAt: {
      type: Date,
      default: Date.now, // Notification creation timestamp
    },
    updatedAt: {
      type: Date,
      default: Date.now, // Last updated timestamp
    },
  });

  
const Notification = mongoose.model("Notification",NotificationSchema)
export default Notification