// Modal.js
import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center ">
      <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-md">
        <button onClick={onClose} className="text-right text-red-500">Close</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
