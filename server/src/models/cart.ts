import mongoose from "mongoose";
const cartSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true
    },
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "book"
    }
  },
  { timestamps: true }
);
export const Cart = mongoose.model("carts", cartSchema);
