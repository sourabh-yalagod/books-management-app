import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  useGetPublisherBooksQuery,
  usePublishBookMutation
} from "../state/api";
import { useClerk, useUser } from "@clerk/clerk-react";
import BooksError from "../components/BooksError";
import UserProfileSkeleton from "../components/skeleton/UserProfileSkeleton";
// user_2u5E6H6yRaESmZ0LFhf87CzyEPL;

const UserProfile = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const { isSignedIn, user } = useClerk();
  console.log({ isSignedIn, user: user.id });

  const navigate = useNavigate();
  if (!isSignedIn) navigate("/signin");
  const [publishBook] = usePublishBookMutation();
  const { data, isLoading, error } = useGetPublisherBooksQuery(user?.id);
  console.log(user.id);

  if (error) return <BooksError />;
  if (isLoading) return <UserProfileSkeleton />;

  const books = data?.data;
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("publisherId", user?.id);
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("rating", data.rating);
    formData.append("bookImage", data.bookImage[0]); // Append file

    try {
      const response = await publishBook(formData);
      console.log("Response:", response);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="min-h-screen w-full flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">Your Books</h1>

      <div className="w-full max-w-3xl space-y-4">
        {books?.map((book) => (
          <div
            key={book._id}
            className="flex sm:flex-row items-center gap-4 p-4 border rounded-lg shadow"
          >
            {/* Book Details */}
            <div className="flex-1">
              <h2 className="text-xl font-semibold">{book.title}</h2>
              <p className="text-gray-600 text-sm">{book.description}</p>
              <p className="text-sm font-medium">Price: ${book.price}</p>
              <p className="text-sm font-medium">Rating: ⭐ {book.rating}/5</p>
            </div>
            <div></div>
          </div>
        ))}
      </div>

      {/* Publish New Book Form */}
      <div className="w-full max-w-lg mt-8 p-6 border rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">Publish a New Book</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            {...register("title", { required: true })}
            className="w-full p-2 border rounded"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">Title is required</p>
          )}

          <textarea
            placeholder="Description"
            {...register("description", { required: true })}
            className="w-full p-2 border rounded"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">Description is required</p>
          )}

          <input
            type="number"
            placeholder="Price"
            {...register("price", { required: true, min: 1 })}
            className="w-full p-2 border rounded"
          />
          {errors.price && (
            <p className="text-red-500 text-sm">Enter a valid price</p>
          )}

          <input
            type="number"
            placeholder="Rating (1-5)"
            {...register("rating", { required: true, min: 1, max: 5 })}
            className="w-full p-2 border rounded"
          />
          {errors.rating && (
            <p className="text-red-500 text-sm">
              Rating must be between 1 and 5
            </p>
          )}

          <input
            type="file"
            {...register("bookImage")}
            className="w-full p-2 border rounded"
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Publish
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
