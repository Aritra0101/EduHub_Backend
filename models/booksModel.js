import mongoose from "mongoose";


const bookSchema = mongoose.Schema(
  {
    bookName: { type: String, required: true, maxLength: 100, trim: true },
    description: { type: String, required: true, maxLength: 250, trim: true },
    author: { type: String, required: true, maxLength: 150, trim: true },
    publication: { type: String, required: true, maxLength: 150, trim: true },
    edition: { type: String, required: true, maxLength: 25, trim: true },

    userId: { type: String, required: true, trim: true },
    userType: { type: String, required: true, trim: true },
    userFullName: { type: String, required: true, maxLength: 101, trim: true },
    userPinCode: { type: Number, min: 100000, max: 999999, required: true },
    userPhone: { type: String, required: true, maxLength: 15, trim: true },
    userEmail: { type: String, required: true, maxLength: 50, trim: true },
  },
  { timestamps: true }
);

export default mongoose.model("bookModel", bookSchema);
