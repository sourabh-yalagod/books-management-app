import express from "express";
import cors from "cors";
import helmte from "helmet";
import { config } from "dotenv";
import { connectDb } from "./db";
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
import bookRouter from "./routers/book.router";
import transactionRouter from "./routers/transaction.router";
import cartRouter from "./routers/cart.router";
app.use("/api/book", bookRouter);
app.use("/api/transaction", transactionRouter);
app.use("/api/cart", cartRouter);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
