import mongoose from "mongoose";


const bookSchema = mongoose.Schema(
  {
    book: { type: String, required: true, maxLength: 100, trim: true },
    description: { type: String, required: true, maxLength: 250, trim: true },
    author: { type: String, required: true, maxLength: 150, trim: true },
    publication: { type: String, required: true, maxLength: 150, trim: true },
    edition: { type: String, required: true, maxLength: 25, trim: true },
    price: { type: Number, required: true, },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel",
        required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("bookModel", bookSchema);
