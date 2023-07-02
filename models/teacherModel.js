import mongoose from "mongoose";

import institutionType from "../constant/institutionType.js";

const studentSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userModel",
    required: true,
  },
  experiance: { type: Number, required: true, min:0, max: 75, },
  occupation: { type: String, required: true, maxlength:100 },
});

export default mongoose.model("studentModel", studentSchema);
