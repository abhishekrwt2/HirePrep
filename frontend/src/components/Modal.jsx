import React from 'react';
import { motion } from 'framer-motion';

const Modal = ({ children, isOpen, onClose, title, hideHeader }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
      onClick={onClose} // click outside to close
    >
      <motion.div
        className="bg-black text-white rounded-xl w-full max-w-md p-6 relative shadow-lg max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
      >
        {/* Header / Close Button */}
        {!hideHeader && (
          <div className="flex justify-end mb-4">
            <button
              onClick={onClose}
              className="text-orange-500 hover:text-white transition-colors text-2xl font-bold"
            >
              ✕
            </button>
          </div>
        )}

        {/* Modal Content */}
        {children}
      </motion.div>
    </div>
  );
};

export default Modal;
