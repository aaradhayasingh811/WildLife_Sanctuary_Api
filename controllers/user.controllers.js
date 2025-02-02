import User  from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

const registerController = async (req, res) => {
  const { name, email, password, username, role } = req.body;

  if (!name || !email || !password || !username || !role) {
    return res.status(400).json({ msg: "Please fill in all fields." });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists." });
    }

    const userId = uuidv4();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      userId,
      name,
      email,
      username,
      role,
      password: hashedPassword,
    });

    await newUser.save();

    
    res.status(201).json({ msg: "User registered successfully."});
  } catch (error) {
    console.error("Error in registerController:", error);
    res.status(500).json({ msg: "Server error. Please try again later." });
  }
};

const loginController = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "Please fill in all fields." });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid email or password." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid email or password." });
    }

    const accessToken = jwt.sign({ userId: user.userId }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign({ userId: user.userId }, process.env.REFRESH_SECRET, {
      expiresIn: "7d",
    });

    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    };

    const loggedInUser = await User.findById(user._id).select("-password");
    return res
      .status(200)
      .cookie("token", accessToken, options)
      .json({ accessToken, refreshToken, loggedInUser });
  } catch (error) {
    console.error("Error in loginController:", error);
    res.status(500).json({ msg: "Server error. Please try again later." });
  }
};

const profileController = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findOne({userId}).select("-password");
    if (!user) {
      return res.status(404).json({ msg: "User not found." });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error("Error in profileController:", error);
    res.status(500).json({ msg: "Server error. Please try again later." });
  }
};

const updateProfileController = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { username, password } = req.body;
    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(404).json({ msg: "User not found." });
    }
    if (username) {
      user.username = username;
    }
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }
    await user.save({ validateBeforeSave: false });
    return res.status(200).json(user);
  } catch (error) {
    console.error("Error in updateProfileController:", error);
    res.status(500).json({ msg: "Server error. Please try again later." });
  }
};

const deleteController = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findOne({userId});
    if (!user) {
      return res.status(404).json({ msg: "User not found." });
    }
    await User.findByIdAndDelete(user._id);
    return res.status(200).json({ msg: "User deleted successfully." });
  } catch (error) {
    console.error("Error in deleteController:", error);
    res.status(500).json({ msg: "Server error. Please try again later." });
  }
};

const logoutController = async (req, res) => {
    try {
      res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "None",
      });
  
      return res.status(200).json({ msg: "User logged out successfully." });
    } catch (error) {
      console.error("Error in logoutController:", error);
      res.status(500).json({ msg: "Server error. Please try again later." });
    }
  };
  

export  {
  registerController,
  loginController,
  profileController,
  updateProfileController,
  deleteController,
  logoutController
};
