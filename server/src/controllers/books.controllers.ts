import { Request, Response } from "express";
import { Book } from "../models/book";
import { uploadImageOnCloudinary } from "../utilities/cloudinary";

const publishBook = async (req: Request, res: Response) => {
  const { publisherId, title, description, price, rating } = req.body;
  console.log({ publisherId, title, description, price, rating });

  const bookImageFilePath = req.file?.path;
  console.log("bookImageFilePath : ", bookImageFilePath);
  if ([publisherId, title, description, price, rating].some((c) => c === "")) {
    res.status(401).json({
      success: false,
      message: "all the fields are required to publish Book"
    });
    return;
  }
  const uploadBookImage = await uploadImageOnCloudinary(
    bookImageFilePath as string
  );
  const book = await Book.create({
    publisher: publisherId,
    title,
    description,
    price,
    rating,
    image:
      uploadBookImage?.secure_url ||
      "https://res.cloudinary.com/daaqothd4/image/upload/v1741353928/oz7wxozjohjpbgxkeqrq.jpg"
  });
  if (!book) {
    res.status(401).json({
      success: false,
      message: "Book publishing process failed....!"
    });
  }
  res.status(201).json({
    success: true,
    message: `Book with Title : ${title} published successfully`,
    data: book
  });
  return;
};

const getBooks = async (req: Request, res: Response) => {
  let { limit, page } = req.query;
  const search = req?.body?.search || req?.query?.search;
  if (!search) {
    const books = await Book.find({}).limit(Number(limit) || 25);

    if (!books) {
      res.status(401).json({
        success: false,
        message: "Book publishing process failed....!"
      });
      return;
    }
    res.status(201).json({
      success: true,
      message: `Books fetched successfully.`,
      data: books
    });
    return;
  } else {
    const searchRGX = new RegExp(search, "gi");
    const books = await Book.aggregate([
      {
        $match: {
          $or: [
            { title: { $regex: searchRGX } },
            { description: { $regex: searchRGX } }
          ]
        }
      },
      {
        $limit: Number(limit) || 25
      }
    ]);
    console.log("🚀 ~ getBooksBySearch ~ books:", books);
    if (!books) {
      res.status(401).json({
        success: false,
        message: "Books fetchig based on Search failed.....!"
      });
      return;
    }
    res.status(201).json({
      success: true,
      message: `Books are fetched based on search`,
      data: books
    });
  }
};

const getBookById = async (req: Request, res: Response) => {
  const { bookId } = req.params;

  const book = await Book.findById(bookId);
  if (!book) {
    res.status(401).json({
      success: false,
      message: "Fetching the Book of ID failed....!"
    });
    return;
  }
  res.status(201).json({
    success: true,
    message: `Book fetched by Id successfully.`,
    data: book
  });
};

const getBookByPublisher = async (req: Request, res: Response) => {
  const { publisherId } = req.params;

  const books = await Book.find({ publisher: publisherId });
  if (!books) {
    res.status(401).json({
      success: false,
      message: "Fetching the Books of Publisher failed....!"
    });
    return;
  }
  res.status(201).json({
    success: true,
    message: `Books fetched by publisher successfully.`,
    data: books
  });
};

const deleteBook = async (req: Request, res: Response) => {
  const { bookId } = req.params;

  const book = await Book.findByIdAndDelete(bookId);
  if (!book) {
    res.status(401).json({
      success: false,
      message: "Book publishing process failed....!"
    });
    return;
  }
  res.status(201).json({
    success: true,
    message: `Book Deleted successfully`,
    data: book
  });
};

const updateBook = async (req: Request, res: Response) => {
  const { bookId } = req.params;

  const book = await Book.findByIdAndUpdate(
    bookId,
    {
      $set: req.body
    },
    { new: true, runValidators: true }
  );
  if (!book) {
    res.status(401).json({
      success: false,
      message: "Book upadating failed......!"
    });
    return;
  }
  res.status(401).json({
    success: true,
    message: `Book updated successfully`,
    data: book
  });
};

const getBooksBySearch = async (req: Request, res: Response) => {
  const search = req?.body?.search || req?.query?.search;
  if (!search) {
    res.status(401).json({
      success: false,
      message: "search is required....!"
    });
    return;
  }
  const searchRGX = new RegExp(search, "gi");
  const books = await Book.aggregate([
    {
      $match: {
        $or: [
          { title: { $search: searchRGX } },
          { description: { $search: searchRGX } }
        ]
      }
    }
  ]);
  console.log("🚀 ~ getBooksBySearch ~ books:", books);
  if (!books) {
    res.status(401).json({
      success: false,
      message: "Books fetchig based on Search failed.....!"
    });
    return;
  }
  res.status(201).json({
    success: true,
    message: `Books are fetched based on search`,
    data: books
  });
};

export {
  publishBook,
  getBooks,
  getBookByPublisher,
  deleteBook,
  updateBook,
  getBooksBySearch,
  getBookById
};
