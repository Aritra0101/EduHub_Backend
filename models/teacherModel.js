import mongoose from "mongoose";

const teacherSchema = mongoose.Schema({
  fName: { type: String, required: true, maxLength: 50, trim: true },
  lName: { type: String, required: true, maxLength: 50, trim: true },
  userName: { type: String, required: true, maxLength: 50, trim: true, unique: true },
  email: { type: String, required: true, maxLength: 50, trim: true, unique: true },
  phone: { type: String, required: true, maxLength: 15, trim: true, unique: true },
  gender: { type: String, required: true, maxLength: 15, trim: true },
  password: { type: String, required: true, minLength: 8, trim: true },
  bloodGroup: { type: String, maxLength: 5, trim: true },
  dateOfBirth: { type: Date, required: true },
  pinCode: { type: Number, min: 100000, max: 999999, required: true },
  about: { type: String, required: true, maxLength: 250, trim: true },
  coins: { type: Number, required: true, min: 0, max: 999999, default: 0 },
  savePost: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "postModel",
      required: true,
    },
  ],
  experience: { type: Number, required: true, min: 0, max: 75, },
  occupation: { type: String, required: true, maxlength: 100 },
},
  { timestamps: true }
);

export default mongoose.model("teacherModel", teacherSchema);
