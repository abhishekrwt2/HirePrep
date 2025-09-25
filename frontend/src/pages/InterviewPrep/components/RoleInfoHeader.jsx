import React from "react";

const RoleInfoHeader = ({
  role,
  topicsToFocus,
  experience,
  questions,
  description,
  lastUpdated,
}) => {
  return (
    <div className="bg-black text-white relative px-6 py-4 rounded-lg shadow-md flex flex-col md:flex-row justify-between items-center overflow-hidden">
      {/* Left: Role and Info */}
      <div className="flex flex-col items-start w-full md:w-auto mb-4 md:mb-0 z-10">
        {/* Role and Topics */}
        <h2 className="text-2xl font-bold text-orange-500">{role}</h2>
        {topicsToFocus && (
          <p className="text-sm text-gray-300">{topicsToFocus}</p>
        )}

        {/* Experience, Q&A, Last Updated */}
        <div className="flex flex-wrap gap-3 mt-3">
          <div className="px-4 py-1 bg-white text-orange-500 rounded-full text-sm font-semibold">
            Experience: {experience} {experience == 1 ? "Year" : "Years"}
          </div>
          <div className="px-4 py-1 bg-white text-orange-500 rounded-full text-sm font-semibold">
            Q&A: {questions}
          </div>
          <div className="px-4 py-1 bg-white text-orange-500 rounded-full text-sm font-semibold">
            Last Updated: {lastUpdated}
          </div>
        </div>
      </div>

      {/* Right: Blurred Decorative Circles */}
      <div className="relative w-48 h-32 flex items-center justify-center">
        <div className="absolute w-32 h-32 bg-orange-500 rounded-full blur-3xl opacity-60" />
        <div className="absolute w-32 h-32 bg-white rounded-full blur-3xl opacity-40 translate-x-8" />
        <div className="absolute w-32 h-32 bg-orange-400 rounded-full blur-3xl opacity-50 -translate-y-6 translate-x-12" />
        <div className="absolute w-32 h-32 bg-white rounded-full blur-3xl opacity-30 -translate-y-4 -translate-x-6" />
      </div>
    </div>
  );
};

export default RoleInfoHeader;
