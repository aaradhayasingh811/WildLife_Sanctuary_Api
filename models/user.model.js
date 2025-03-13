import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    userId: {
      type: String,
      unique: true,
      required: true, // Unique user ID
    },
    name:{
      type:String,
      required:true
    },
    username: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50, // Username
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      // Email (unique)
    },
    password: {
      type: String,
      required: true, // Password (hashed)
    },
    role: {
      type: String,
      enum: ['Visitor', 'Staff', 'Admin','Volunteer'],
      default: 'Visitor', 
    },
    profilePicture: {
      type: String,
      default: 'https://photosking.net/wp-content/uploads/2024/05/no-dp_16.webp', // Profile picture 
    },
    createdAt: {
      type: Date,
      default: Date.now, // Account creation date
    },
    updatedAt: {
      type: Date,
      default: Date.now, // Last updated timestamp
    },
    accessToken:{
      type:String
    },
    refreshToken:{
      type:String
    }
  });
  

  const User = mongoose.model("User", UserSchema);
  export default User;
  