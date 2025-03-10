import { Router } from "express";
import {
  deleteBook,
  getBookByPublisher,
  getBooks,
  publishBook,
  updateBook
} from "../controllers/books.controllers";
import { upload } from "../middlewares/multer";
const router = Router();

router.route("/publish-book").post(upload.single("bookImage"), publishBook);
router.route("/book-publisher/:publisherId").get(getBookByPublisher);
router.route("/").get(getBooks);
router.route("/delete-book/:bookId").delete(deleteBook);
router.route("/update-book/:bookId").put(updateBook);

export default router;
