import { useNavigate } from "react-router-dom";
const BookCard = ({ book }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/store/${book?._id}`)}
      className="max-w-sm w-full mx-auto shadow-lg rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700"
    >
      <img
        src={book.image}
        alt={book.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          {book.title}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
          {book.description.length > 40
            ? book.description.slice(0, 40).concat(".....")
            : book.description}
        </p>
        <div className="mt-3 flex justify-between items-center">
          <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            ${book.price}
          </span>
          <span className="bg-blue-500 text-white px-3 py-1 text-xs rounded-md">
            Rating: {book.rating}
          </span>
        </div>
        <div className="flex justify-between items-center py-3">
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Published by: {book.publisher}
          </p>
          <p className="bg-green-600 hover:scale-105 transition-all cursor-pointer text-white text-xs rounded-md p-1">
            add to Cart
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
