// Inside BottomSlider.js

import React from 'react';

function BottomSlider({ isOpen, onClose, children }) {
  return (
    <div className={`fixed left-0 bottom-0 w-full bg-white shadow-lg transform transition-transform duration-300 ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}>
      <div className="p-4">
        {children}
      </div>
      <div className="bg-gray-200 py-2 text-center cursor-pointer" onClick={onClose}>
        Close
      </div>
    </div>
  );
}

export default BottomSlider;
