import mongoose from "mongoose";

const StaffSchema = new mongoose.Schema({
    staffId: {
      type: String,
      unique: true,
      required: true, // Unique staff ID
    },
    name: {
      type: String,
      required: true, // Staff name
    },
    role: {
      type: String,
      required: true, // Role of staff (e.g., Animal Care, Guide)
    },
    contactInfo: {
      type: String,
      required: true, // Contact number or email
    },
    shiftSchedule: [{
      day: {
        type: String,
        required: true, // Day of the week
      },
      shiftStart: {
        type: String,
        required: true, // Shift start time
      },
      shiftEnd: {
        type: String,
        required: true, // Shift end time
      },
    }],
    createdAt: {
      type: Date,
      default: Date.now, // Staff record creation timestamp
    },
    updatedAt: {
      type: Date,
      default: Date.now, // Last updated timestamp
    },
  });


const Staff = mongoose.model("Staff" , StaffSchema);
export default Staff


