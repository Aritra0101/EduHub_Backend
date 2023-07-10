import mongoose from "mongoose";

const commentSchema = new Schema(
  {
    message: { type: String, required: true, trim: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userModel",
      required: true,
    },
    //replies: [this], // Nested comments
  },
  { timestamps: true }
);

const quesAndAnsSchema = mongoose.Schema(
  {
    question: { type: String, required: true, maxLength: 500, trim: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userModel",
      required: true,
    },
    like: { type: Number, required: true, default: 0 },
    Comment: [commentSchema],
  },
  { timestamps: true }
);

export default mongoose.model("quesAndAnsModel", quesAndAnsSchema);