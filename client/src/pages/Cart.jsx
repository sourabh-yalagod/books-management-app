import { useUser } from "@clerk/clerk-react";
import { useGetCartBooksQuery, useRemoveCartMutation } from "../state/api";
import CartSkeleton from "../components/skeleton/CartSkeleton";
const Cart = () => {
  const { user } = useUser();

  const { data, isLoading, error } = useGetCartBooksQuery(user?.id);
  console.log(data);

  const [removeCart] = useRemoveCartMutation();
  const handleRemoveBook = async (cartId) => {
    const { data, error } = await removeCart(cartId);
  };
  if (isLoading) return <CartSkeleton />;
  if (error) return <p className="text-red-500">Failed to load cart.</p>;
  const books = data?.data;
  return (
    <div className="min-h-screen w-full flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      <div className="w-full max-w-3xl space-y-4">
        {books?.map((book) => (
          <div
            key={book._id}
            className="flex flex-col sm:flex-row items-center gap-4 p-4 border rounded-lg shadow"
          >
            {/* Book Image */}
            <img
              src={book.bookImage}
              alt={book.title}
              className="w-32 h-40 object-cover rounded"
            />

            {/* Book Details */}
            <div className="flex-1">
              <h2 className="text-xl font-semibold">{book.title}</h2>
              <p className="text-gray-600 text-sm">{book.description}</p>
              <p className="text-sm font-medium">Publisher: {book.publisher}</p>
              <p className="text-sm">Rating: ⭐ {book.rating}/5</p>
            </div>

            {/* Remove Button */}
            <button
              onClick={() => handleRemoveBook(book._id)}
              className="px-4 py-2 text-red-500 border border-red-500 rounded hover:bg-red-100"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
