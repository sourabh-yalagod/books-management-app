import { Router } from "express";

import { upload } from "../middlewares/multer";
import {
  bookTransaction,
  createPaymentIntent,
  getTransactions,
  updateTransaction
} from "../controllers/transaction.controllers";
const router = Router();

router.route("/create-payment-intent").post(createPaymentIntent);
router.route("/transaction-record").post(bookTransaction);
router.route("/:bookId").put(updateTransaction);
router.route("/:userId").get(getTransactions);

export default router;
