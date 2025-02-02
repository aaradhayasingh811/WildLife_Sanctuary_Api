import mongoose from "mongoose";
const VolunteerSchema = new mongoose.Schema({
    volunteerId: {
      type: String,
      unique: true,
      required: true, // Unique volunteer ID
    },
    name: {
      type: String,
      required: true, // Volunteer name
    },
    contactInfo: {
      type: String,
      required: true, // Contact details
    },
    hoursContributed: {
      type: Number,
      default: 0, // Total volunteer hours
    },
    assignedTasks: [{
      type: String, // Tasks assigned to the volunteer
    }],
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
      default: Date.now, // Volunteer record creation timestamp
    },
    updatedAt: {
      type: Date,
      default: Date.now, // Last updated timestamp
    },
  });

  
const Volunteer = mongoose.model("Volunteer",VolunteerSchema)
export default  Volunteer