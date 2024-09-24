import { faCheckCircle, faChevronCircleLeft, faChevronCircleRight, faClose, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

type RequestViewModalProps = {
  images: { url: string; description: string }[];
  onClose: () => void;
};

const RequestViewModal: React.FC<RequestViewModalProps> = ({ images, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 relative max-w-lg w-full">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="flex flex-col items-center">
          <img
            src={images[currentIndex].url}
            alt="Fix"
            className="w-full h-64 object-cover rounded-lg"
          />
          <p className="text-gray-600 mt-4">{images[currentIndex].description}</p>
          <div className="absolute top-36 flex justify-between w-full mt-4">
            <button
              className="text-secondary-light hover:text-orange-600"
              onClick={handlePrev}
            >
              <FontAwesomeIcon icon={faChevronCircleLeft} className='size-6 mx-3'/>
            </button>
            <button
              className="text-secondary-light hover:text-orange-600"
              onClick={handleNext}
            >
             <FontAwesomeIcon icon={faChevronCircleRight} className='size-6 mx-3'/>
            </button>
          </div>
        </div>
       
        <div className='flex justify-center gap-4 mt-5'>
        
        <button className='bg-success hover:bg-green-600 text-white font-bold p-3 rounded-lg shadow-md'>
        <FontAwesomeIcon icon={faCheckCircle} className='mr-2' />Approve</button>
        <button className='bg-danger hover:bg-red-600 text-white font-bold p-3 rounded-lg shadow-md'> 
          <FontAwesomeIcon icon={faXmarkCircle} className='mr-2' />
          Reject</button>
        </div>
        
      </div>
      
    </div>
  );
};

export default RequestViewModal;
