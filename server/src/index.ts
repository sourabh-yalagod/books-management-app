import express from "express";
import cors from "cors";
import helmte from "helmet";
import { config } from "dotenv";
import { connectDb } from "./db";
import {
  clerkMiddleware,
  createClerkClient,
  requireAuth
} from "@clerk/express";
config({ path: "./.env" });
const port = process.env.PORT || 3000;
connectDb();
const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(helmte.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(express.static("public"));
app.use(
  cors({
    origin: process.env.CROSS_ORIGIN,
    credentials: true
  })
);
app.get("/", (req, res) => {
  res.json("Hey");
});
// app.use(clerkMiddleware());

export const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY
});

import bookRouter from "./routers/book.router";
import transactionRouter from "./routers/transaction.router";
import cartRouter from "./routers/cart.router";
app.use("/api/books", bookRouter);
app.use("/api/transactions", transactionRouter);
app.use("/api/carts", cartRouter);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
