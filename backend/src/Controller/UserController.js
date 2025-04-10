import userModel from "../Model/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  JWT_KEY,
  JWT_EXPIRE_TIME,
  cookie_EXPIRE_TIME,
} from "../config/config.js";
import { request } from "express";

// Register user route
export const register = async (req, res) => {
  try {
    const { fullName, email, password, PhoneNumber, role } = req.body;
    if (!fullName || !email || !password || !PhoneNumber || !role) {
      return res.status(400).json({
        message: "All fields are required",
        status: false,
      });
    }
    const user = await userModel.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "Email already exists",
        status: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const data = await userModel.create({
      fullName,
      email,
      password: hashedPassword,
      PhoneNumber,
      role,
    });

    return res.status(201).json({
      message: "User registered successfully",
      data,
      status: true,
    });
  } catch (error) {
    console.log(error);
  }
};

//login user route

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "All fields are required",
        status: false,
      });
    }

    // Existing users Validate
    let user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect Email",
        status: false,
      });
    }

    // Password Validation
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect Password",
        status: false,
      });
    }
    // Role Validation

    if (role !== user.role) {
      return res.status(400).json({
        message: "Invalid Role",
        status: false,
      });
    }
    // JWT Token Generation
    const tokenData = { userId: user._id };
    const token = await jwt.sign(tokenData, JWT_KEY, {
      expiresIn: JWT_EXPIRE_TIME,
    });

    user = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      PhoneNumber: user.PhoneNumber,
      role: user.role,
    };
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 2 * 24 * 60 * 60 * 1000,
        httpsOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome Back  ${user.fullName}`,
        user,
        token,
        status: true,
      });
  } catch (error) {
    console.log(error);
  }
};

// Logout user route
export const logout = (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged Out Successfully",
      status: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// User Profile route

export const updateProfile = async (req, res) => {
  try {
    const { fullName, email, password, PhoneNumber, bio, skills } = req.body;

    let skillsArray;
    if (skills) skillsArray = skills.split(",");
    const userID = req.id; // middleware Authentication

    let user = await userModel.findById(userID);

    if (!user) {
      return res.status(400).json({
        message: "User not found",
        status: false,
      });
    }

    //updating User Data
    if(fullName)user.fullName = fullName
      if(email)user.email = email
      if(password)user.password = password
      if(PhoneNumber)user.PhoneNumber = PhoneNumber
      if(bio)user.bio = bio
      if(skills)user.skills = skillsArray

    // Resume Update Here Later.....

    await user.save();

    user = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      PhoneNumber: user.PhoneNumber,
      role: user.role,
    };

    return res.status(200).json({
      message: "User Profile Updated Successfully",
      user,
      status: true,
    });
  } catch (error) {
    console.log(error);
  }
};
