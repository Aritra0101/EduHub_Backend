import mongoose from "mongoose";

const commentSchema = mongoose.Schema(
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

const studeyMaterialSchema = mongoose.Schema(
  {
    title: { type: String, required: true, maxLength: 30, trim: true },
    description: { type: String, required: true, maxLength: 300, trim: true },
    fileType: { type: String, required: true, maxLength: 50, trim: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userModel",
      required: true,
    },

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

    likes: { type: Map, of: Boolean },
    comments: [commentSchema],
  },
  { timestamps: true }
);

export default mongoose.model("studeyMaterialModel", studeyMaterialSchema);