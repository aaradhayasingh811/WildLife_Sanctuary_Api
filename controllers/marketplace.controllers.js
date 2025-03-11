import { Product , Order , Review } from '../models/marketplace.model.js';


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
        const newOrder = new Order(req.body);
        await newOrder.save();
        res.status(201).json(newOrder);
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
        const newReview = new Review({ ...req.body, product: id });
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