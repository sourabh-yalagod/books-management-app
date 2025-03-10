import { useNavigate } from "react-router-dom";

const BooksError = ({ error }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen text-gray-800 dark:text-gray-200 p-6">
      <div className="max-w-md text-center">
        <h1 className="text-3xl font-bold mb-3">
          Oops! Something went wrong 😢
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {error?.message ||
            "We couldn’t fetch the books. Please try again later."}
        </p>

        <button
          onClick={() => navigate(0)}
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
        >
          Retry 🔄
        </button>
      </div>
    </div>
  );
};

export default BooksError;
