import mongoose from "mongoose";

const DonationSchema = new mongoose.Schema({
    userId :{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    donationId: {
      type: String,
      unique: true,
      required: true, // Unique donation ID
    },
    donorId: {
      type: String,
      required: true, // Donor’s user ID
    },
    amount: {
      type: Number,
      required: true, // Donation amount
    },
    donationType: {
      type: String,
      enum: ['One-time', 'Monthly'],
      required: true, // Type of donation
    },
    projectId: {
      type: String, // Optional: ID of the specific donation project
    },
    donationDate: {
      type: Date,
      default: Date.now, // Donation timestamp
    },
    receiptGenerated: {
      type: Boolean,
      default: false, // Whether receipt has been generated
    },
  });

  

const Donation = mongoose.model("Donation", DonationSchema)
export default Donation