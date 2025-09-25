import React from "react";
import { LuX } from "react-icons/lu";
import { AnimatePresence, motion } from "framer-motion";

const Drawer = ({ isOpen, onClose, title, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Drawer Panel */}
          <motion.div
            className="fixed top-[64px] right-0 z-50 h-[calc(100vh-64px)] w-full md:w-1/3 bg-white dark:bg-black p-4 overflow-y-auto shadow-lg"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h5 className="text-base font-semibold text-black dark:text-white">{title}</h5>
              <button
                type="button"
                onClick={onClose}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-white rounded-lg w-8 h-8 flex justify-center items-center"
              >
                <LuX className="text-lg" />
              </button>
            </div>

            {/* Body */}
            <div>{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Drawer;
