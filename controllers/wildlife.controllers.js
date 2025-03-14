// import Animal from "../models/animal.model.js";
import Animal from "../models/animal.model.js"
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

// Get all animals
const getAllAnimalsController = async (req, res) => {
  try {
    const animals = await Animal.find({});
    if (!animals.length) {
      return res.status(404).json({ message: "No animals found" });
    }
    res.json(animals);
  } catch (error) {
    res.status(500).json({ message: "Error in getting all animals", error });
  }
};

// Get animal by ID
const getAnimalByIdController = async (req, res) => {
  try {
    const { animalId } = req.params;
    const animal = await Animal.findOne({ animalId });
    if (!animal) {
      return res.status(404).json({ message: "Animal not found" });
    }
    res.json(animal);
  } catch (error) {
    res.status(500).json({ message: "Error in getting animal by ID", error });
  }
};

// Add a new animal
const addAnimalController = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findOne({ userId });
    if (user.role !== "Admin") {
      return res.status(403).json({ message: "Not authorized to add an animal" });
    }
    
    const animalId = uuidv4();
    const newAnimal = new Animal({ ...req.body, animalId });
    await newAnimal.save();
    res.status(201).json({ message: "Animal added successfully", newAnimal });
  } catch (error) {
    res.status(500).json({ message: "Error in adding animal", error });
  }
};

// Update animal details
const updateAnimalDetailsController = async (req, res) => {
  try {
    const { animalId } = req.params;
    const user = await User.findOne({ userId: req.user.userId });
    if (user.role !== "Admin") {
      return res.status(403).json({ message: "Not authorized to update an animal" });
    }
    
    const updatedAnimal = await Animal.findOneAndUpdate(
      { animalId },
      { $set: req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );
    
    if (!updatedAnimal) {
      return res.status(404).json({ message: "Animal not found" });
    }
    
    res.json({ message: "Animal updated successfully", updatedAnimal });
  } catch (error) {
    res.status(500).json({ message: "Error in updating animal", error });
  }
};

// Delete animal
const deleteAnimalController = async (req, res) => {
  try {
    const { animalId } = req.params;
    const user = await User.findOne({ userId: req.user.userId });
    if (user.role !== "Admin") {
      return res.status(403).json({ message: "Not authorized to delete an animal" });
    }
    
    const deletedAnimal = await Animal.findOneAndDelete({ animalId });
    if (!deletedAnimal) {
      return res.status(404).json({ message: "Animal not found" });
    }
    
    res.json({ message: "Animal deleted successfully", deletedAnimal });
  } catch (error) {
    res.status(500).json({ message: "Error in deleting animal", error });
  }
};

// Get all endangered animals
const allEndangeredController = async (req, res) => {
  try {
    const endangeredAnimals = await Animal.find({ endangeredStatus: "Endangered" });
    if (!endangeredAnimals.length) {
      return res.status(404).json({ message: "No endangered animals found" });
    }
    res.json(endangeredAnimals);
  } catch (error) {
    res.status(500).json({ message: "Error in retrieving endangered animals", error });
  }
};

export const getAllEndagnered = async(req,res) =>{
  try {
    console.log("hii")
    const animal = await Animal.find({
      endangeredStatus: "Endangered"
    });
    if (!animal.length) {
      return res.status(404).json({ message: "No endangered animals found" });
    }
    res.json({message:"All endangered animal:",animal});
    
  } catch (error) {
    res.status(500).json({ message: "Error in retrieving endangered animals", error });

  }
}
// Filter by endangered status
const filterbyEndangeredStatusController = async (req, res) => {
  try {
    const { endangeredStatus } = req.params;
    const animals = await Animal.find({ endangeredStatus :"Endangered" });
    if (!animals.length) {
      return res.status(404).json({ message: "No animals found with this status" });
    }
    res.json(animals);
  } catch (error) {
    res.status(500).json({ message: "Error in filtering endangered animals", error });
  }
};

// GPS Tracking
const getGpsTrackingController = async (req, res) => {
  try {
    const id = req.params.animalId;
    const trimmedAnimalId = id.trim();
    // console.log(trimmedAnimalId)
    const animal = await Animal.findOne({ _id:trimmedAnimalId });
    
    // console.log(animal)
    if (!animal || !animal.gpsLocation) {
      return res.status(404).json({ message: "No GPS data available" });
    }
    res.json({ location: animal.gpsLocation });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving GPS tracking data", error });
  }
};

// Population Statistics
// const getPopulationStatsController = async (req, res) => {
//   try {
//     const stats = await Animal.aggregate([
//       { $group: { _id: "$species", count: { $sum: 1 } } }
//     ]);
//     res.json(stats);
//   } catch (error) {
//     res.status(500).json({ message: "Error retrieving population stats", error });
//   }
// };

const PopulationStatsController = async (req, res) => {
  console.log("Received request for population stats");
  try {
    const stats = await Animal.aggregate([
      { $group: { _id: { $ifNull: ["$species", "Unknown"] }, count: { $sum: 1 } } }

    ]);
    console.log("Aggregation Result:", stats);
    res.json(stats);
  } catch (error) {
    console.error("Aggregation Error:", error);
    res.status(500).json({ message: "Error retrieving population stats", error });
  }
};


// AI-Based Health Checkup (Mock Implementation)
const healthCheckController = async (req, res) => {
  try {
    const { animalId } = req.body;
    const animal = await Animal.findOne({ animalId });
    if (!animal) {
      return res.status(404).json({ message: "Animal not found" });
    }
    const healthStatus = "Healthy"; // Simulated AI assessment
    res.json({ animalId, healthStatus });
  } catch (error) {
    res.status(500).json({ message: "Error performing health check", error });
  }
};

// Paginated List of Animals
const getPaginatedAnimalsController = async (req, res) => {
  try {
    const pageNumber = Number(req.query.page) || 1;
    const limitNumber = Number(req.query.limit) || 10;

    if (isNaN(pageNumber) || isNaN(limitNumber) || pageNumber < 1 || limitNumber < 1) {
      return res.status(400).json({ message: "Invalid page or limit values" });
    }

    console.log("Fetching page:", pageNumber, "Limit:", limitNumber);

    const animals = await Animal.find()
      .limit(limitNumber)
      .skip((pageNumber - 1) * limitNumber);

    res.json(animals);
  } catch (error) {
    console.error("Error retrieving paginated animals:", error);
    res.status(500).json({ message: "Error retrieving paginated animals", error });
  }
};


export {
  getAllAnimalsController,
  getAnimalByIdController,
  addAnimalController,
  updateAnimalDetailsController,
  deleteAnimalController,
  allEndangeredController,
  filterbyEndangeredStatusController,
  getGpsTrackingController,
  PopulationStatsController,
  healthCheckController,
  getPaginatedAnimalsController,
};
