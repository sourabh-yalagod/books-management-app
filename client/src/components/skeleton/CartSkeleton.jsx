const CartSkeleton = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      <div className="w-full max-w-3xl space-y-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row items-center gap-4 p-4 border rounded-lg shadow animate-pulse"
          >
            {/* Book Image Skeleton */}
            <div className="w-32 h-40 bg-gray-300 rounded"></div>

            {/* Book Details Skeleton */}
            <div className="flex-1 space-y-2">
              <div className="h-5 w-3/4 bg-gray-300 rounded"></div>
              <div className="h-4 w-full bg-gray-300 rounded"></div>
              <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
              <div className="h-4 w-1/4 bg-gray-300 rounded"></div>
            </div>

            {/* Remove Button Skeleton */}
            <div className="px-4 py-2 w-20 h-10 bg-gray-300 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default CartSkeleton;
