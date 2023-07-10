import mongoose from "mongoose";

import userType from "../constant/userType.js";

const userSchema = mongoose.Schema(
  {
    fName: { type: String, required: true, maxLength: 25, trim: true },
    lName: { type: String, required: true, maxLength: 50, trim: true },

    userName: {
      type: String,
      required: true,
      maxLength: 50,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      maxLength: 50,
      trim: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      maxLength: 15,
      trim: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
      minLength: 8,
      trim: true,
    },
    role: {
      type: Number,
      required: true,
      min: 0,
      max: 3,
      default: userType.student,
    },

    gender: { type: String, maxLength: 25, trim: true },
    bloodGroup: { type: String, maxLength: 5, trim: true },
    dateOfBirth: { type: Date, required: true },
    pinCode: { type: Number, min: 100000, max: 999999, required: true },
    about: { type: String, maxLength: 500, trim: true },

    coins: { type: Number, required: true, min: 0, max: 999999, default: 0 },
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel",
        required: true,
      },
    ],
    follower: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel",
        required: true,
      },
    ],
    savePost: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel",
        required: true,
      },
    ],

    institutionName: {
      type: String,
      maxLength: 100,
      trim: true,
    },
    institutionType: {
      type: String,
      maxLength: 50,
      trim: true,
    },
    degree: { type: String, maxLength: 100, trim: true },
    discipline: { type: String, maxLength: 50, trim: true },
    specialization: { type: String, maxLength: 75, trim: true },
    standard: { type: String, maxLength: 15, trim: true },

    experience: { type: Number, min: 0, max: 75 },
    occupation: { type: String, maxlength: 100 },
  },
  { timestamps: true }
);

export default mongoose.model("userModel", userSchema);
