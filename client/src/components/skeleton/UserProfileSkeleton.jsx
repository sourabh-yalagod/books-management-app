const SkeletonBook = () => (
  <div className="flex sm:flex-row items-center gap-4 p-4 border rounded-lg shadow animate-pulse">
    <div className="flex-1 space-y-2">
      <div className="h-6 bg-gray-300 rounded w-3/4"></div>
      <div className="h-4 bg-gray-300 rounded w-full"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      <div className="h-4 bg-gray-300 rounded w-1/3"></div>
    </div>
  </div>
);

const UserProfileSkeleton = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">Your Books</h1>

      <div className="w-full max-w-3xl space-y-4">
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <SkeletonBook key={i} />
          ))}
      </div>

      <div className="w-full max-w-lg mt-8 p-6 border rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">Publish a New Book</h2>
        <form className="space-y-4">
          <div className="h-10 bg-gray-300 rounded w-full animate-pulse"></div>
          <div className="h-20 bg-gray-300 rounded w-full animate-pulse"></div>
          <div className="h-10 bg-gray-300 rounded w-full animate-pulse"></div>
          <div className="h-10 bg-gray-300 rounded w-full animate-pulse"></div>
          <div className="h-10 bg-gray-300 rounded w-full animate-pulse"></div>
          <div className="h-10 bg-gray-400 rounded w-full animate-pulse"></div>
        </form>
      </div>
    </div>
  );
};
export default UserProfileSkeleton;
