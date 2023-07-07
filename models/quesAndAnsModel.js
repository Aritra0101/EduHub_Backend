import mongoose from "mongoose";

const commentSchema = new Schema(
  {
    message: { type: String, required: true, trim: true },
    userId: { type: String, required: true, trim: true },
    userType: { type: String, required: true, trim: true },
    replies: [this], // Nested comments
  },
  { timestamps: true }
);

const quesAndAnsSchema = mongoose.Schema(
  {
    question: { type:String, required:true, maxLength:500, trim: true },
    userId: { type:String, required:true, trim: true },
    userType: { type:String, required:true, trim: true },
    like: { type:Number, required:true, default: 0 },
    Comment: [ commentSchema ],
  },
  { timestamps: true }
);

export default mongoose.model("quesAndAnsModel", quesAndAnsSchema);