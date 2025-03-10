import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import fs from "fs";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export const uploadImageOnCloudinary = async (filePath: string) => {
  if (!filePath) {
    return;
  }
  try {
    const response = await cloudinary.uploader.upload(filePath, {
      format: "jpg"
    });
    fs.unlinkSync(filePath);
    return response;
  } catch (error) {
    fs.unlinkSync(filePath);
    console.log("Cloudinary Image Upload Errors : ", error);
  }
};

export { cloudinary };
