import { Router } from "express";
import {
  deleteBook,
  getBookById,
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
router.route("/:bookId").get(getBookById);
router.route("/delete-book/:bookId").delete(deleteBook);
router.route("/update-book/:bookId").put(updateBook);

export default router;
