import { useClerk, useUser } from "@clerk/clerk-react";
import React from "react";
import { useGetTransactionQuery } from "../state/api";

const Purchases = () => {
  const { user } = useUser();
  const { isSignedIn } = useClerk();

  if (isSignedIn && !user) {
    return <div>Please authenticate</div>;
  }
  const userId = user?.id;
  const { data, error, isLoading } = useGetTransactionQuery(userId);

  if (isLoading) return "loading";
  if (error) return "error";
  const transactions = data?.data;
  console.log("🚀 ~ Purchases ~ transactions:", transactions);
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Your Purchases</h2>

      {transactions.length === 0 ? (
        <p>No purchases found.</p>
      ) : (
        <div className="grid gap-4">
          {transactions.map((transaction) => {
            const book = transaction.book?.[0]; // Get first book
            if (!book) return null;

            return (
              <div
                key={transaction._id}
                className="border p-4 rounded-lg flex gap-4 bg-gray-100 dark:bg-gray-800"
              >
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-24 h-32 object-cover rounded-md"
                />
                <div>
                  <h3 className="text-lg font-semibold">{book.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {book.description}
                  </p>
                  <p className="mt-2 font-semibold text-yellow-500">
                    Price: ${transaction.price}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-300">
                    Purchased on:{" "}
                    {new Date(transaction.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Purchases;
