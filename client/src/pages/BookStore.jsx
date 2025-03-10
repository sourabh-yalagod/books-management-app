import React, { useState } from "react";
import { useGetBooksQuery } from "../state/api";
import BookCard from "../components/BookCard";
import BooksSkeleton from "../components/skeleton/BooksSkeleton";
import BooksError from "../components/BooksError";
import { Search } from "lucide-react";

const BookStore = () => {
  const { data, isLoading, isError } = useGetBooksQuery();
  const [search, setSearch] = useState("");

  if (isLoading) return <BooksSkeleton />;
  if (isError) return <BooksError />;

  const filteredBooks = data?.data?.filter(
    (book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen w-full p-5 sm:p-10 space-y-6">
      <div className="relative w-full sm:w-1/2">
        <input
          type="text"
          className="border-2 rounded-xl w-full p-2 pr-10"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer size-5 text-gray-500" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredBooks.length ? (
          filteredBooks?.map((book) => <BookCard key={book._id} book={book} />)
        ) : (
          <div className="text-center text-gray-600 text-lg mt-6">
            <span className="font-semibold text-[22px] text-gray-400">
              "{search}"
            </span>{" "}
            book is not available. 📚
          </div>
        )}
      </div>
    </div>
  );
};

export default BookStore;
