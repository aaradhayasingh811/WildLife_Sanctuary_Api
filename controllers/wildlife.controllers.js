import Animal from "../models/animal.model.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
const getAllAnimalsController = async (req, res) => {
  try {
    const animals = await Animal.find({});
    if (animals.length == 0) {
      return res.status(404).json({ message: "No animals found" });
    }
    res.json(animals);
  } catch {
    res.status(500).json({ message: "Error in getting all animals" });
  }
};

const getAnimalByIdController = async (req, res) => {
  try {
    const animalId = req.params.animalId;
    const animal = await Animal.findOne({animalId});
    if (!animal) {
      return res.status(404).json({ message: "Animal not found" });
    }
    res.json(animal);
  } catch (error) {
    res.status(500).json({ message: "Error in getting animal by id" });
  }
};

const addAnimalController = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findOne({userId});
    const role = user.role;
    // console.log(role)
    if (role != "Admin") {
      return res
        .status(403)
        .json({ message: "You are not authorized to add animal" });
    }
    const animalId = uuidv4();
    const {
      species,
      commonName,
      age,
      gender,
      healthStatus,
      habitat,
      endangeredStatus,
    } = req.body;
    // pop stats image gpslocation are left
    if (
      !species ||
      !commonName ||
      !age ||
      !gender ||
      !habitat ||
      !healthStatus ||
      !endangeredStatus
    ) {
      return res.status(400).json({ message: "Please fill all fields" });
    }
    const animal = new Animal({
      animalId,
      species,
      commonName,
      age,
      gender,
      healthStatus,
      habitat,
      endangeredStatus,
    });
    await animal.save({validateBeforeSave:false});
    res.status(200).json({message:"Animal is addded",animal})


  } catch (error) {
    res.status(500).json({ message: "Error in adding animal" });

  }
};

const updateAnimalDetailsController = async (req, res) => {
    try {
      const userId = req.user.userId;
      const user = await User.findOne({userId});
      const role = user.role;   
      if (role != "Admin") {
          return res
            .status(403)
            .json({ message: "You are not authorized to add animal" });
        }
        const {
          species,
          commonName,
          age,
          gender,
          healthStatus,
          habitat,
          endangeredStatus,
        } = req.body;
        // pop stats image gpslocation are left
        const animalId = req.params.animalId;
        if(!animalId){
            return res.status(400).json({message:"Please provide animal id"})
        }
        const animal = await Animal.findOne({animalId});
        if(species){
          animal.species = species;
        }
        if(commonName){
            animal.commonName = commonName;
        }
        if(age){
            animal.age = age;
        }
        if(gender){
            animal.gender = gender;
        }
        if(healthStatus){
            animal.healthStatus = healthStatus;
        }
        if(habitat){
            animal.habitat = habitat;
        }
        if(endangeredStatus){
            animal.endangeredStatus = endangeredStatus;
        }
        await animal.save({validateBeforeSave:false});

        const updatedAnimal = await Animal.findOne({animalId});

        res.status(200).json({message:"Animal is updated",updatedAnimal})
    
    
      } catch (error) {
        res.status(500).json({ message: "Error in updating animal details" });
    
      }
    };


const deleteAnimalController = async(req,res)=>{
    try {
        const animalId = req.params.animalId;
        const userId = req.user.userId;
        const user = await User.findOne({userId});
        const role = user.role;   
        if (role != "Admin") {
          return res
            .status(403)
            .json({ message: "You are not authorized to add animal" });
        }
        const animal = await Animal.findOneAndDelete({ animalId });
        res.status(200).json({ message: "Animal is deleted", animal });
        
    } catch (error) {
        res.status(500).json({ message: "Error in deleting animal" });
        
    }
}

const allEndangeredController = async(req , res)=>{
  try{
    const endangeredStatus = await Animal.find({endangeredStatus:"Endangered"});
    // Check the length of the Endangered animals

    // If the length of the array is zero
    if(endangeredStatus.length==0){
      return res.status(404).json({message:"No endangered animals found"})
    }
    // If the length is not zero
    res.status(200).json({message:"All endangered animals",endangeredStatus})
    

  }
  catch(error){
    res.status(500).json({message:"Error in checking endangered status"})
  }
}


const filterbyEndangeredStatusController = async(req,res) =>{
  try {
    const endangeredStatus = req.params.endangeredStatus;
    const animal = await Animal.find({ endangeredStatus });
    // Check if animal filtered is present or not
    if(animal.length == 0){
      return res.status(404).json({ message: "No animals found with the given endangered status"});
    }
    // If the length is not zero
    res.status(200).json({ message: "Animals with the given endangered status", animal});
    
  } catch (error) {
    res.status(500).json({ message: "Error in filtering endangered status" });
    
  }
}

export {
    getAllAnimalsController,
    getAnimalByIdController,
    addAnimalController,
    updateAnimalDetailsController,
    deleteAnimalController,
    allEndangeredController,
    filterbyEndangeredStatusController
}