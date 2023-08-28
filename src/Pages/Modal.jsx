import React from 'react';

const Modal = ({ open, onClose, title, children }) => {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-80">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button
            className="text-gray-500 hover:text-gray-700 cursor-pointer"
            onClick={onClose}
          >
            Close
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
