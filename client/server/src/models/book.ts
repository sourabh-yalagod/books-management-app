import mongoose from "mongoose";
const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    rating: { type: Number, max: 5 },
    publisher: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      default: 0
    },
    image: {
      type: String
    }
  },
  { timestamps: true }
);
export const Book = mongoose.model("Book", bookSchema);
