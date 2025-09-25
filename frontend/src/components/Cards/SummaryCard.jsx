import React from "react";
import { LuTrash2 } from "react-icons/lu";
import { getInitials } from "../../utils/helper";

const SummaryCard = ({
  colors,
  role,
  topicsToFocus,
  experience,
  questions,
  description, // description prop
  lastUpdated,
  onSelect,
  onDelete,
}) => {
  return (
    <div
      className="bg-black border border-orange-500 rounded-xl p-3 overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
      onClick={onSelect}
    >
      <div className="rounded-lg p-4 relative bg-black hover:bg-gray-900 transition-colors duration-200">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-12 h-12 bg-orange-500 rounded-md flex items-center justify-center shadow-md">
            <span className="text-lg font-semibold text-white">{getInitials(role)}</span>
          </div>

          <div className="flex-grow">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-[17px] font-semibold text-white">{role}</h2>
                <p className="text-xs text-orange-400 mt-1">{topicsToFocus}</p>
              </div>
            </div>

            {/* Description */}
            {description && (
              <p className="text-sm text-gray-200 mt-2">{description}</p>
            )}
          </div>

          {/* Delete Button */}
          <button
            className="ml-2 hover:text-red-400 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          >
            <LuTrash2 className="text-orange-400" />
          </button>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-4 text-[10px] font-medium text-gray-300">
          <div>
            Experience: {experience} 

          </div>
          <div>{questions} Q&A</div>
          <div>Last Updated: {lastUpdated}</div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
