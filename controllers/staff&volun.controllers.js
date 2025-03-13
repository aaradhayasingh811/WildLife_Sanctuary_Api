import User from "../models/user.model.js";
import Staff from "../models/staff.model.js";
import { v4 as uuidv4 } from "uuid";

const getAllStaffController = async (req, res) => {
  try {
    const staff = await Staff.find({role:"Staff"});
    if (staff.length === 0) {
      return res.status(404).json({ message: "No staff found" });
    }
    res
      .status(200)
      .json({ message: "Successfully fetched all staff members", staff });
  } catch (error) {
    res.status(500).json({ message: "Error in getting all staff" });
  }
};

const getStaffByIdController = async (req, res) => {
  try {
    const id = req.params.id;
    const staff = await Staff.findOne({ staffId: id });
    if (!staff) {
      return res.status(404).json({ message: "Staff not found" });
    }
    res
      .status(200)
      .json({ message: "Successfully fetched staff member", staff });
  } catch (error) {
    res.status(500).json({ message: "Error in getting staff by id" });
  }
};

const addNewStaffController = async (req, res) => {
  try {
    const userId = req.user.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized user" });
    }

    const user = await User.findOne({ userId });
    console.log(user)
    if (user.role != "Admin") {
      return res.status(401).json({ message: "Unauthorized user , not Admin" });
    }
    const { name, role, contactInfo ,specificRole} = req.body;
    if (!name || !role || !contactInfo || !specificRole) {
      return res.status(400).json({ message: "Please fill all fields" });
    }
    const staff = new Staff({
      staffId: uuidv4(),
      name,
      role,
      contactInfo,
      specificRole
    });
    await staff.save();
    res
      .status(201)
      .json({ message: "Successfully added new staff member", staff });
  } catch (error) {
    res.status(500).json({ message: "Error in adding new staff" });
  }
};

// updation of details done by staff itself hence we arer not using auth middleware
const updateDetailsController = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "Please provide staff id" });
    }
    const staff = await Staff.findOne({ staffId: id });
    if (!staff) {
      return res.status(404).json({ message: "Staff not found" });
    }
    const { name, role, contactInfo , specificRole} = req.body;
    
    if (name) {
      staff.name = name;
    }
    if (role) {
      staff.role = role;
    }
    if (contactInfo) {
      staff.contactInfo = contactInfo;
    }
    await staff.save({ validateBeforeSave: false });
    res
      .status(200)
      .json({ message: "Successfully updated staff details", staff });
  } catch (error) {
    res.status(500).json({ message: "Error in updating details of the staff" });
  }
};

const deleteStaffByIdController = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "Please provide staff id" });
    }
    const staff = await Staff.findOneAndDelete({ staffId: id });
    // check kya staff exist krta hai
    if (!staff) {
      return res.status(404).json({ message: "Staff not found" });
    }
    res.status(200).json({ message: "Staff deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error in deleting the controller" });
  }
};

const getAllVolunteerController = async(req,res) =>{
    try {
        const volunteer = await Staff.find({role:"Volunteer"});
        if (volunteer.length === 0) {
          return res.status(404).json({ message: "No Volunteer found" });
        }
        res
          .status(200)
          .json({ message: "Successfully fetched all Volunteer members", volunteer });

        
    } catch (error) {
        res.status(500).json({ message: "Error in getting all volunteer" });   
    }
}

const addShiftController = async (req, res) => {
  try {
    const id = req.params.id;
    const { shiftSchedule } = req.body;
    if (!id || !shiftSchedule) {
      return res.status(400).json({ message: "Please provide staff ID and shift details" });
    }
    const staff = await Staff.findOne({ staffId: id });
    if (!staff) {
      return res.status(404).json({ message: "Staff not found" });
    }
    staff.shiftSchedule.push(...shiftSchedule);
    await staff.save();
    res.status(200).json({ message: "Shift added successfully", staff });
  } catch (error) {
    res.status(500).json({ message: "Error in adding shift" });
  }
};


const volunteerMatchController = async (req, res) => {
  try {
    const volunteers = await Staff.find({ role: "Volunteer" });
    if (volunteers.length === 0) {
      return res.status(404).json({ message: "No volunteers found for matching" });
    }
    // Implement a matching logic based on specific criteria (e.g., skills, availability)
    res.status(200).json({ message: "Volunteer matching completed", volunteers });
  } catch (error) {
    res.status(500).json({ message: "Error in matching volunteers" });
  }
};

const staffNotificationsController = async (req, res) => {
  try {
    const { staffId, message } = req.body;
    if (!staffId || !message) {
      return res.status(400).json({ message: "Please provide staff ID and message" });
    }
    const staff = await Staff.findOne({ staffId });
    if (!staff) {
      return res.status(404).json({ message: "Staff not found" });
    }
    // Logic to send notification (e.g., store in DB, trigger an event, send email/SMS)
    res.status(200).json({ message: "Notification sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error in sending notification" });
  }
};


export {
  getAllStaffController,
  getStaffByIdController,
  addNewStaffController,
  updateDetailsController,
  deleteStaffByIdController,
  getAllVolunteerController,
  addShiftController,
  staffNotificationsController,
  volunteerMatchController
};
