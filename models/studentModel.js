import mongoose from "mongoose";

import institutionType from "../constant/institutionType.js";

const studentSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userModel",
    required: true,
  },
  institution: { type: String, required: true, maxLength:100, trim: true },
  institutionType: { type: Number, required: true, min: 0, max: 4, default: institutionType.school },
  standard: { type: String, required: true, maxLength:15, trim: true },
});

export default mongoose.model("studentModel", studentSchema);
