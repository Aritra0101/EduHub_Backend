import mongoose from "mongoose";

import userType from "../constant/userType.js";
import userType from "../constant/userBloodGroup.js";

const userSchema = mongoose.Schema(
  {
    fName: { type: String, required: true, maxLength: 50, trim: true },
    lName: { type: String, required: true, maxLength: 50, trim: true },
    userName: { type: String, required: true, maxLength: 50, trim: true, unique: true },
    email: { type: String, required: true, maxLength: 50, trim: true },
    phone: { type: String, required: true, maxLength: 15, trim: true },
    password: { type: String, required: true, minLength: 8, trim: true },
    role: { type: Number, required: true, min: 0, max: 3, default: userType.student },
    bloodGroup: { type: Number, required: true, min: 0, max: 8, default: userBloodGroup.ABpos },
    dateOfBirth: { type: Date, required: true },
    pinCode: { type: Number, min: 100000, max: 999999, required: true },
    coins: { type: Number, required: true, min: 0, max: 999999 },
    savePost: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "postModel",
            required: true,            
        },
    ]
  },
  { timestamps: true }
);

export default mongoose.model("userModel", userSchema);
