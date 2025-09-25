import React, { useState } from "react";
import { LuPin, LuPinOff, LuSparkles, LuChevronDown } from "react-icons/lu";
import AIResponsePreview from "../../pages/InterviewPrep/components/AiResponsePreview";

const QuestionCard = ({ question, answer, onLearnMore, isPinned, onTogglePin }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative bg-black border border-orange-500 rounded-lg p-4 mb-4 shadow-md hover:shadow-orange-500 transition-shadow duration-300">
      <div className="flex justify-between items-start">
        {/* Question */}
        <div className="flex flex-col">
          <h3
            className="cursor-pointer font-medium text-white text-lg hover:text-orange-500 transition-colors duration-300"
            onClick={() => setIsExpanded(prev => !prev)}
          >
            {question}
          </h3>

          {/* Inline Answer Toggle */}
          <div className={`overflow-hidden transition-all duration-300 mt-3 text-white ${isExpanded ? "max-h-[1000px]" : "max-h-0"}`}>
            <AIResponsePreview content={answer} />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          {/* Pin */}
          <button onClick={(e) => { e.preventDefault(); onTogglePin(); }} className="p-1 rounded hover:bg-orange-500/20 transition">
            {isPinned ? <LuPinOff className="text-orange-500" size={20} /> : <LuPin className="text-orange-500" size={20} />}
          </button>

          {/* Explore More → only opens drawer */}
          <button onClick={onLearnMore} className="flex items-center space-x-1 text-orange-500 px-2 py-1 rounded hover:bg-orange-500/20 transition">
            <LuSparkles size={18} />
            <span className="text-sm font-medium">Explore More</span>
          </button>

          {/* Expand/Collapse */}
          <button onClick={() => setIsExpanded(prev => !prev)} className="p-1 rounded hover:bg-orange-500/20 transition">
            <LuChevronDown size={20} className={`transform transition-transform duration-300 ${isExpanded ? "rotate-180" : ""} text-orange-500`} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
