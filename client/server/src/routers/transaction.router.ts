import { Router } from "express";

import { upload } from "../middlewares/multer";
import {
  bookTransaction,
  getTransactions,
  updateTransaction
} from "../controllers/transaction.controllers";
const router = Router();

router.route("/:bookId").post(bookTransaction);
router.route("/:bookId").put(updateTransaction);
router.route("/").get(getTransactions);

export default router;
