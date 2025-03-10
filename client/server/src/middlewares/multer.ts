import { Request } from "express";
import multer from "multer";
const storage = multer.diskStorage({
  destination: (req: Request, file: any, cb) => {
    cb(null, "public/"); // Folder where files will be stored
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  }
});
export const upload = multer({
  storage
});
