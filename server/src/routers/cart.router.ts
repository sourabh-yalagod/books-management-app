import { Router } from "express";

import {
  addBookToCart,
  getBooksFromCart,
  removeBookFromCart
} from "../controllers/cart.controller";
const router = Router();

router.post("/:bookId", addBookToCart);
router.get("/:userId", getBooksFromCart);
router.delete("/:cartId", removeBookFromCart);

export default router;
