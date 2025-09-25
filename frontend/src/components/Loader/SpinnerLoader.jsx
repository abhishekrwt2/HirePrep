import React from "react";

const SpinnerLoader = ({ size = 40, color = "orange" }) => {
  return (
    <div className="flex items-center justify-center">
      <div
        className={`animate-spin rounded-full border-4 border-t-${color}-500 border-r-${color}-500 border-b-transparent border-l-transparent`}
        style={{ width: size, height: size }}
      ></div>
    </div>
  );
};

export default SpinnerLoader;
