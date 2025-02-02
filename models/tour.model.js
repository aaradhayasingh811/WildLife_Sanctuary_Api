import mongoose from "mongoose";

const TourSchema = new mongoose.Schema({
    tourId: {
      type: String,
      unique: true,
      required: true, // Unique tour ID
    },
    title: {
      type: String,
      required: true, // Tour title
    },
    description: {
      type: String,
      required: true, // Detailed tour description
    },
    duration: {
      type: Number,
      required: true, // Duration of the tour in hours
    },
    price: {
      type: Number,
      required: true, // Price per person
    },
    availableSpots: {
      type: Number,
      required: true, // Number of available spots
    },
    schedule: {
      type: Date,
      required: true, // Tour schedule date and time
    },
    guide: {
      type: String,
      required: true, // Tour guide's name
    },
    reviews: [{
      userId: {
        type: String, // Reviewer's user ID
      },
      rating: {
        type: Number,
        min: 1,
        max: 5, // Review rating (1-5)
      },
      comment: {
        type: String, // Review comment
      },
      createdAt: {
        type: Date,
        default: Date.now, // Review date
      },
    }],
    createdAt: {
      type: Date,
      default: Date.now, // Tour creation timestamp
    },
    updatedAt: {
      type: Date,
      default: Date.now, // Last updated timestamp
    },
  });

  const Tour  = mongoose.model("Tour",TourSchema)
  export default Tour