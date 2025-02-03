import User from "../models/user.model.js";
import Tour from "../models/tour.model.js";
import { v4 as uuidv4 } from "uuid";

const getAllTourController = async (req, res) => {
  try {
    const tours = await Tour.find({});
    if (tours.length == 0) {
      return res.status(404).json({ message: "No tours available" });
    }
    res.status(200).json({ message: "All the available tours", tours });
  } catch (error) {
    res.status(500).json({ message: "Error in getting all the tours." });
  }
};


const bookTourController = async (req, res) => {
  try {
    const id = req.user?.userId;
    if (!id) {
      return res.status(401).json({ message: "Unauthorized access" });
    }
    const userId = await User.findOne({userId:id});

    const tourId = uuidv4();
    const { title, description, duration, schedule, guide, numberOfPerson } = req.body;

    if (!title || !description || !duration || !schedule || !guide || !numberOfPerson) {
      return res.status(400).json({ message: "Please fill in all the fields." });
    }

    const newTour = await Tour.create({
      userId,
      tourId,
      title,
      description,
      duration,
      schedule,
      guide,
      numberOfPerson,
      status: "Booked",
    });

    res.status(201).json({ message: "Tour booked successfully", newTour });
  } catch (error) {
    console.error("Error booking tour:", error);
    res.status(500).json({ message: "Error in booking the tour.", error: error.message });
  }
};



const getMyBookingController = async(req,res)=>{
    try {
        const id = req.user.userId;
        const user  = await User.findOne({userId:id})
        const bookings = await Tour.find({ userId : user });
        // check the length of the my booking items
        if (bookings.length == 0) {
            return res.status(404).json({ message: "No bookings available" });
        }
        res.status(200).json({ message: "All the bookings", bookings });

        
    } catch (error) {
        res.status(500).json({ message: "Error in getting my bookings." });
        
    }
}

const rescheduleTourController = async(req,res) =>{
    try {
        const tourId = req.params.tourId;
        const { newSchedule } = req.body;
        if(!newSchedule){
            return res.status(400).json({ message: "Please fill in all the fields." });
        }
        const tour = await Tour.findOne({tourId});
        // check if tour exist
        if(!tour){
            return res.status(404).json({ message: "Tour not found" });
        }
        tour.schedule = newSchedule;
        await tour.save({validateBeforeSave:false});
        res.status(200).json({ message: "Tour rescheduled successfully" });
        
    } catch (error) {
        res.status(500).json({ message: "Error in rescheduling the tour." });
    }
}

const cancelTourController = async(req,res) =>{
    try {
        const tourId = req.params.tourId;
        // find the tour okay
        const tour = await Tour.findOne({tourId});
        // check if tour exist
        if(!tour){
            return res.status(404).json({ message: "Tour not found" });
        }
        // check if tour is cancelled
        if(tour.cancelled){
            return res.status(400).json({ message: "Tour is already cancelled" });
        }
        // cancel the tour
        tour.status = "Cancelled";
        await tour.save({validateBeforeSave:false});
        const updatedTour = await Tour.findOne({tourId});
        res.status(200).json({ message: "Tour cancelled successfully" , updatedTour });
        
        
    } catch (error) {
        res.status(500).json({ message: "Error in cancelling the tour." });
    }
}

const getReviewByIdController = async(req,res) =>{
    try {
        const tourId = req.params.tourId;
        const review = await Tour.findOne({tourId});
        // check id review exist
        if(!review){
            return res.status(404).json({ message: "Review not found" });
        }
        res.status(200).json({message:"Review of the given id", review });
        
    } catch (error) {
        res.status(500).json({ message: "Error in getting the review." });
        
    }
}

const addReviewController = async(req,res)=>{
    try {
        const tourId = req.params.tourId;
        const userId = req.user.userId;
        console.log(tourId,userId)
        const review = await Tour.findOne({tourId});
        
        // check if review exist
        if(!review){
            return res.status(404).json({ message: "Review not found" });
        }
        // check if review is already added
        if(review.reviews.length > 0){
            return res.status(404).json({ message: "Review already added" });

        }
        const {rating,comment} = req.body;
        if(!rating || !comment){
            return res.status(400).json({ message: "Please fill in all the fields." });
        }
        // add review
        review.reviews.push({rating,comment,userId});

        await review.save({validateBeforeSave:false});
        res.status(200).json({ message: "Review added successfully" , review });

        
    } catch (error) {
        res.status(500).json({ message: "Error in adding the review." });
    }
}





export {
    getAllTourController,
    bookTourController,
    getMyBookingController,
    rescheduleTourController,
    cancelTourController,
    getReviewByIdController,
    addReviewController
}
