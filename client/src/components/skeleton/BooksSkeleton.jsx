const BookSkeleton = () => {
  return (
    <div className="max-w-sm w-full mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 animate-pulse">
      <div className="w-full h-48 bg-gray-200 dark:bg-gray-700"></div>
      <div className="p-4">
        <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full mt-2"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-5/6 mt-2"></div>

        <div className="mt-4 flex justify-between items-center">
          <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
          <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
        </div>

        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mt-3"></div>
      </div>
    </div>
  );
};
const BooksSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((book) => {
        return <BookSkeleton key={Math.random()} />;
      })}
    </div>
  );
};
export default BooksSkeleton;
