import { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import BooksError from "../components/BooksError";
import { useAddBookToCartMutation, useGetBookByIdQuery } from "../state/api";
import BookDetailSkeleton from "../components/skeleton/BookDetailSkeleton";
import { useUser } from "@clerk/clerk-react";
const BookDetail = () => {
  const [addedToCart, setAddedToCart] = useState(false);
  const { bookId } = useParams();
  const { user } = useUser();
  const nagivate = useNavigate();
  const userId = user?.id;
  const [addBookToCart] = useAddBookToCartMutation();
  const { data, isLoading, error } = useGetBookByIdQuery(bookId);
  if (isLoading) return <BookDetailSkeleton />;
  if (error) return <BooksError />;
  const book = data.data;
  const addToCart = async ({ bookId }) => {
    if (!user?.id) return;
    console.log({ userId, bookId });

    const { data, error } = await addBookToCart({ userId, bookId });
    console.log({ data, error });
  };
  const handleAddToCart = (bookId) => {
    setAddedToCart(true);
    if (!user.id) nagivate("/signin");
    addToCart({ bookId });
  };

  const handleBuyNow = (bookId) => {
    nagivate(`/payment?bookid=${bookId}`);
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen p-6 text-gray-800 dark:text-gray-200">
      <div className="max-w-md w-full md:w-1/2">
        <img
          src={book.image}
          alt={book.title}
          className="w-full h-96 object-cover rounded-lg shadow-lg"
        />
      </div>

      <div className="md:w-1/2 mt-6 md:mt-0 md:ml-10">
        <h1 className="text-3xl font-bold">{book.title}</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          {book.description}
        </p>

        <div className="mt-3">
          <span className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            ${book.price}
          </span>
          <span className="ml-3 bg-blue-500 text-white px-3 py-1 text-xs rounded-md">
            Rating: {book.rating} ⭐
          </span>
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          Published by: {book.publisher}
        </p>

        <div className="mt-6 flex space-x-4">
          <button
            onClick={() => handleAddToCart(book?._id || book?.id)}
            className={`px-5 py-2 rounded-md font-semibold transition ${
              addedToCart
                ? "bg-green-600 text-white cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
            disabled={addedToCart}
          >
            {addedToCart ? "Added to Cart ✅" : "Add to Cart 🛒"}
          </button>

          <button
            onClick={() => handleBuyNow(book.id || book._id)}
            className="px-5 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-md"
          >
            Buy Now 💳
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
