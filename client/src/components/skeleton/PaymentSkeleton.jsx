import React from "react";

const PaymentSkeleton = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-lg p-8 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        {/* Title Skeleton */}
        <div className="h-6 w-3/4 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>

        {/* Subtitle Skeleton */}
        <div className="h-4 w-2/3 bg-gray-300 dark:bg-gray-700 rounded mb-6"></div>

        {/* Payment Element Skeleton */}
        <div className="h-20 bg-gray-300 dark:bg-gray-700 rounded-lg mb-6"></div>

        {/* Button Skeleton */}
        <div className="w-full h-10 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
      </div>
    </div>
  );
};

export default PaymentSkeleton;
