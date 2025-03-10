import { Router } from "express";

import { upload } from "../middlewares/multer";
import {
  addBookToCart,
  getBooksFromCart,
  removeBookFromCart
} from "../controllers/cart.controller";
const router = Router();

router.post("/:bookId", addBookToCart);
router.get("/", getBooksFromCart);
router.delete("/:cartId", removeBookFromCart);

export default router;
