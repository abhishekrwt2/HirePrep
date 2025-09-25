import React from "react";

const SkeletonLoader = ({ lines = 3 }) => {
  return (
    <div className="space-y-2 animate-pulse">
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className="h-4 bg-gray-700 rounded w-full"
        />
      ))}
    </div>
  );
};

export default SkeletonLoader;
