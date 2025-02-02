import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
    bookingId: {
      type: String,
      unique: true,
      required: true, // Unique booking ID
    },
    userId: {
      type: String,
      required: true, // User who booked the tour
    },
    tourId: {
      type: String,
      required: true, // Associated tour ID
    },
    numberOfPeople: {
      type: Number,
      required: true, // Number of people in the booking
    },
    bookingStatus: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Cancelled'],
      default: 'Pending', // Booking status
    },
    bookingDate: {
      type: Date,
      default: Date.now, // Booking timestamp
    },
    rescheduledDate: {
      type: Date, // Rescheduled date (if applicable)
    },
    cancellationDate: {
      type: Date, // Cancellation date (if applicable)
    },
  });

const Booking = mongoose.model("Booking",BookingSchema);
export default Booking