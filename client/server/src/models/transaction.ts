import mongoose from "mongoose";
const transactionSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true
    },
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "book"
    },
    price: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ["pending", "success", "fail"],
      default: "pending"
    }
  },
  { timestamps: true }
);
export const Transaction = mongoose.model("transactions", transactionSchema);
