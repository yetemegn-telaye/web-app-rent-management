import React from 'react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-lg font-bold mb-4">Payment Successful</h2>
        <p className="text-sm text-gray-700 mb-4">{message}</p>
        <button className="bg-primary-dark hover:bg-secondary-dark text-white font-bold py-2 px-4 rounded" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
