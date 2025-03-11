import User from "../models/staff.model.js";
import Donation from "../models/donation.model.js";
import { v4 as uuidv4 } from "uuid";

const getAllDonationController = async(req , res) =>{
    try {
        const donation = await Donation.find({});
        if(donation.length === 0){
            return res.status(404).json({message : "No donation found"});
        }
        res.status(200).json({message : "All Donations",donation});
        
    } catch (error) {
        res.status(500).json({ message: "Error in getting all donations" });  
    }
}

const addnewDonationController = async(req,res) =>{
    try {
        const id = req.user.userID;
        const userID = await User.findOne({userID:id});
        const donationId = uuidv4();
        const donorId = uuidv4();
        const { amount , projectId , donationType , donationDate} = req.body;
        const newDonation = new Donation({
            donationId : donationId ,
            userId : userID,
            donorId : donorId ,
            amount : amount ,
            donationDate : donationDate,
            donationType : donationType
        })
        if(projectId){
            newDonation.projectId = projectId;
        }
        const savedDonation = await newDonation.save();
        res.status(201).json({message : "Donation Added Successfully",savedDonation});

        
    } catch (error) {
        res.status(500).json({ message: "Error in adding new donations" });  
    }
}

const getMyDonationController = async(req,res) =>{
    try {
        const donationId = req.params;
        if(!donationId){
            return res.status(404).json({message : "No donation found"});
        }
        const donation = await Donation.find({donationId:id});
        if(donation.length === 0){
            return res.status(404).json({message : "No donation found"});
        }
        res.status(200).json({message : "My Donations",donation});
        
    } catch (error) {
        res.status(500).json({ message: "Error in getting donation by id" });  
    }
}

const getDonationUtilization = async(req,res) =>{
    try {
        
    } catch (error) {
        res.status(500).json({ message: "Error in donation by utlization" });  
    }
}

export {
    getAllDonationController,
    addnewDonationController,
    getMyDonationController,
    getDonationUtilization
}
