// models/Product.js
import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    name: String,
    price: Number,
    category: String,
    ecoFriendly: Boolean,
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }]
});

export const Product = mongoose.model('Product', ProductSchema);

// models/Order.js
const OrderSchema = new mongoose.Schema({
    userId: { type: "String" , required:true},
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    totalPrice: Number,
    status: { type: String, default: 'Pending' }
});

export const Order = mongoose.model('Order', OrderSchema);

// models/Review.js
const ReviewSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    userId: { type: "String" , required:true},
    rating: Number,
    comment: String
});

export const Review = mongoose.model('Review', ReviewSchema);