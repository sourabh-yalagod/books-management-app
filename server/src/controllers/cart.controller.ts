import { Request, Response } from "express";

import { Cart } from "../models/cart";

const addBookToCart = async (req: Request, res: Response) => {
  const { bookId } = req.params;
  const { userId } = req.body;
  if (!userId) {
    res.status(401).json({
      success: false,
      message: "Please authenticate"
    });
    return;
  }
  if (!bookId) {
    res.status(401).json({
      success: false,
      message: "Please select the Book to add to cart"
    });
    return;
  }
  const cart = await Cart.create({
    book: bookId,
    user: userId
  });
  if (!cart) {
    res.status(401).json({
      success: false,
      message: "book failed to add to cart.....!"
    });
    return;
  }
  res.status(201).json({
    success: true,
    message: `book added to cart Succssfull.`,
    data: cart
  });
  return;
};

const getBooksFromCart = async (req: Request, res: Response) => {
  const { userId } = req.params;

  if (!userId) {
    res.status(401).json({
      success: false,
      message: `userId not Found for Cart operation.`
    });
    return;
  }
  const booksFromCart = await Cart.aggregate([
    {
      $match: {
        user: userId.toString()
      }
    },
    {
      $lookup: {
        from: "books",
        foreignField: "_id",
        localField: "book",
        as: "books"
      }
    },
    {
      $unwind: { path: "$books", preserveNullAndEmptyArrays: true } // Ensures no errors if no book is found
    },
    {
      $project: {
        cartId: "$_id",
        bookId: "$books._id",
        title: "$books.title",
        description: "$books.description",
        bookImage: "$books.image",
        rating: "$books.rating",
        publisher: "$books.publisher",
        userId: "$user",
        createdAt: "$createdAt",
        updatedAt: "$updatedAt"
      }
    }
  ]);
  console.log("🚀 ~ getBooksFromCart ~ booksFromCart:", booksFromCart);

  if (!booksFromCart) {
    res.status(401).json({
      success: false,
      message: "Fetching books from cart Request failed....!"
    });
    return;
  }
  res.status(201).json({
    success: true,
    message: `books fetched successfully.`,
    data: booksFromCart
  });
};

const removeBookFromCart = async (req: Request, res: Response) => {
  const { cartId } = req.params;

  const bookFromCart = await Cart.findByIdAndDelete(cartId);
  if (!bookFromCart) {
    res.status(401).json({
      success: false,
      message: "removing book from cart process failed....!"
    });
    return;
  }
  res.status(201).json({
    success: true,
    message: `book removed successfully`,
    data: bookFromCart
  });
};

export { addBookToCart, getBooksFromCart, removeBookFromCart };
