import mongoose from "mongoose";
import { config } from "dotenv";
config();
console.log("🚀 ~ config:", process.env.MONGO_URL);

export const connectDb = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URL}`, {
      dbName: process.env.DB_NAME || "booksStore"
    });
    console.log(`Database connected successfully.`);
  } catch (error) {
    console.log("Database connection Error : ", error);

    process.exit(1);
  }
};
