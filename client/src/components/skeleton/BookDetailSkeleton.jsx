const BookDetailSkeleton = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen p-6 animate-pulse">
      {/* Image Skeleton */}
      <div className="max-w-md w-full md:w-1/2">
        <div className="w-full h-96 bg-gray-300 dark:bg-gray-700 rounded-lg shadow-lg"></div>
      </div>

      {/* Details Skeleton */}
      <div className="md:w-1/2 mt-6 md:mt-0 md:ml-10 space-y-4">
        <div className="h-8 w-48 bg-gray-300 dark:bg-gray-700 rounded"></div>
        <div className="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded"></div>
        <div className="h-4 w-5/6 bg-gray-300 dark:bg-gray-700 rounded"></div>

        <div className="mt-3 flex space-x-4">
          <div className="h-6 w-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="h-6 w-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>

        <div className="h-4 w-40 bg-gray-300 dark:bg-gray-700 rounded"></div>

        <div className="mt-6 flex space-x-4">
          <div className="h-10 w-32 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="h-10 w-32 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailSkeleton;
