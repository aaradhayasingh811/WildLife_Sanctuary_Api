import mongoose from "mongoose";

const TourSchema = new mongoose.Schema({
    userId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User"
    },
    tourId: {
      type: String,
      unique: true,
      required: true, // Unique tour ID
    },
    title: {
      type: String,
      required: true, // Tour title
    },
    numberOfPerson:{
      type:Number,
      required:true,
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
      default : 500,
      required: true, // Price per person
    },
    availableSpots: {
      type: Number,
      default:10
      // Number of available spots
    },
    schedule: {
      type: Date,
      required: true, // Tour schedule date and time
    },
    guide: {
      type: String,
      required: true, // Tour guide's name
    },
    status:{
      type:String,
      enum :["Booked","Cancelled"]
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