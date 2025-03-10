import { Request, Response } from "express";
import { Transaction } from "../models/transaction";
import { Book } from "../models/book";

const bookTransaction = async (req: Request, res: Response) => {
  const { bookId } = req.params;
  const { price, status } = req.body;
  const userId = 1;
  if (!userId) {
    res.status(401).json({
      success: false,
      message: "Please authenticate"
    });
    return;
  }
  if ([bookId, price, status].some((c) => c === "")) {
    res.status(401).json({
      success: false,
      message: "all the fields are required to publish Book"
    });
    return;
  }
  const book = await Book.findById(bookId);
  if (!book) {
    res.status(401).json({
      success: false,
      message: "Book does not exist....!"
    });
    return;
  }
  const transaction = await Transaction.create({
    book: bookId,
    user: userId,
    price,
    status
  });
  if (!transaction) {
    res.status(401).json({
      success: false,
      message: "Transaction failed.....!"
    });
    return;
  }
  res.status(401).json({
    success: true,
    message: `Transaction Succssfull.`,
    data: transaction
  });
  return;
};

const updateTransaction = async (req: Request, res: Response) => {
  const { bookId } = req.params;
  const status = req.body.status || req.query.status;

  const transaction = await Transaction.findOneAndUpdate(
    { book: bookId },
    {
      $set: { status }
    },
    { new: true, runValidators: true }
  );
  if (!transaction) {
    res.status(401).json({
      success: false,
      message: "Transaction upadating failed......!"
    });
    return;
  }
  res.status(401).json({
    success: true,
    message: `Transaction updated successfully`,
    data: transaction
  });
};

const getTransactions = async (req: Request, res: Response) => {
  const user = 1;
  const Transactions = await Transaction.find({ user });
  // .skip(Number(page) * limit);
  if (!Transactions) {
    res.status(401).json({
      success: false,
      message: "Fetching transaction Request failed....!"
    });
    return;
  }
  res.status(401).json({
    success: true,
    message: `Transactions fetched successfully.`,
    data: Transactions
  });
};

export { bookTransaction, updateTransaction, getTransactions };
