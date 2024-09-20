import React, { useState } from 'react';
import ImageUploader from '../ImageUploader';

interface PayProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (file: File | null) => void;
}

const PayModal: React.FC<PayProps> = ({ isOpen, onClose, onConfirm }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleImageUpload = (uploadedFile: File) => {
    setFile(uploadedFile);
  };

  const handleConfirm = () => {
    onConfirm(file);
    onClose(); 
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white space-y-2 p-14 px-12 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-lg text-center font-bold mb-12 text-secondary-dark">Add Deposit Slip to Make Payment</h2>
        <div className="mb-8 space-y-8">
          <label className="flex items-center justify-around text-gray-700 text-sm font-light mb-4">
            Utility: 5,000 birr +<br/>
            Amount: 30,000 birr
            <span className='font-semibold text-secondary'> Total: 35,000 birr</span>
            
          </label>
          <span className='text-secondary-light font-bold ml-12'>Account Number: 1000234433333</span>
          <ImageUploader label="Upload Deposit Slip" onImageUpload={handleImageUpload} />
        </div>
        <div className="flex justify-center items-center gap-4">
          <button className="bg-primary-dark hover:bg-secondary-dark text-white font-bold py-2 px-8 rounded" onClick={handleConfirm}>
            Pay
          </button>
          <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default PayModal;
