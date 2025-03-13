import { Product , Order , Review } from '../models/marketplace.model.js';
import mongoose from 'mongoose';
import User from '../models/user.model.js';

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const placeOrder = async (req, res) => {
    try {
        const { userId } = req.user; 
        const { products, totalPrice, status } = req.body;

        // Ensure products array is provided
        if (!products || products.length === 0) {
            return res.status(400).json({ error: "Products array cannot be empty" });
        }

        const productObjectIds = products.flat().map((prodId) => {
            if (!mongoose.Types.ObjectId.isValid(prodId)) {
                throw new Error(`Invalid product ID: ${prodId}`);
            }
            return new mongoose.Types.ObjectId(prodId);
        });


        // Create new order
        const newOrder = new Order({
            userId: userId, 
            products : productObjectIds,
            totalPrice,
            status: status || "Pending"
        });

        await newOrder.save();
        res.status(201).json({ message: "Order placed successfully", order: newOrder });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
export const getOrder = async (req, res) => {
    try {
        const orders = await Order.find().populate('products');
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const addReview = async (req, res) => {
    try {
        const { id } = req.params;
        const newReview = new Review({
             product: id,
             userId: req.user.userId,
             rating: req.body.rating,
             comment: req.body.comment
             });
        await newReview.save();
        await Product.findByIdAndUpdate(id, { $push: { reviews: newReview._id } });
        res.status(201).json(newReview);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getEcoProducts = async (req, res) => {
    try {
        const ecoProducts = await Product.find({ ecoFriendly: true });
        res.json(ecoProducts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const addProductController = async(req,res) =>{
    try {
        const {userId} = req.user;
        if(!userId){
            return res.status(401).json({error: "Unauthorized"});
        }
        const user = await User.findOne({userId});
        if(user.role != "Admin"){
            return res.status(401).json({error: "Unauthorized"});
        }
        const { name, price, ecoFriendly , category } = req.body;
        const newProduct = new Product({
            name,
            price,
            ecoFriendly,
            category,
            
        })
        await newProduct.save();
        res.status(201).json({ message :"A new product added succesfully", newProduct});
    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }
}

export const getMyOrderController = async(req,res) =>{
    try {
        const {userId} = req.user;
        const orders = await Order.find({ userId: userId });
        if(!orders){
            return res.status(404).json({error: "No orders found"});
        }
        res.json({ message:"Your orders are :" ,orders});

        
    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }
}

export const getMyOrderSpecificController = async(req,res) =>{
    try {
        const {userId} = req.user;
        const {id} =req.params
        const orders = await Order.findOne({ _id:id });
        if(!orders){
            return res.status(404).json({error: "No orders found"});
        }
        res.json({ message:"Your order by Id is  :" ,orders});
        
    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }
}