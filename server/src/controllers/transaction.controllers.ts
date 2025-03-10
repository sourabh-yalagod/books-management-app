import { Request, Response } from "express";
import { Transaction } from "../models/transaction";
import { Book } from "../models/book";
import Stripe from "stripe";
const stripeSecreteKey = process.env.STRIPE_SECRETE_KEY;
if (!stripeSecreteKey) {
  throw new Error("Stripe Secrete Key Required....!");
}
const stripe = new Stripe(stripeSecreteKey);

const bookTransaction = async (req: Request, res: Response) => {
  const { price, status, bookId, userId } = req.body;
  if (!userId) {
    res.status(401).json({
      success: false,
      message: "Please authenticate"
    });
    return;
  }
  if ([bookId, price, status, userId].some((c) => c === "")) {
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
  res.status(200).json({
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
  const userId = req?.params?.userId;
  const Transactions = await Transaction.aggregate([
    {
      $match: { user: userId }
    },
    {
      $lookup: {
        from: "books",
        localField: "book",
        foreignField: "_id",
        as: "book"
      }
    }
  ]);
  console.log("🚀 ~ getTransactions ~ Transactions:", Transactions);
  if (!Transactions) {
    res.status(401).json({
      success: false,
      message: "Fetching transaction Request failed....!"
    });
    return;
  }
  res.status(201).json({
    success: true,
    message: `Transactions fetched successfully.`,
    data: Transactions
  });
};

const createPaymentIntent = async (req: Request, res: Response) => {
  const { amount, name, city, address, line1, state, postal_code, country } =
    req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      description: "Books purached store startUp across the India",
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: "always"
      },
      shipping: {
        name: name || "John Doe",
        address: {
          line1: line1 || "123 Street Name",
          city: city || "Mumbai",
          state: state || "MH",
          postal_code: postal_code || "400001",
          country: country || "IN"
        }
      }
    });
    res.status(201).json({
      message: "Payment Intent is created successfully",
      data: paymentIntent.client_secret
    });
    return;
  } catch (error) {
    res.status(501).json({ message: "Stripe paymentIntent Error" });
    return;
  }
};

export {
  bookTransaction,
  updateTransaction,
  getTransactions,
  createPaymentIntent
};
