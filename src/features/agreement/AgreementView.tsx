import React, { useState } from 'react';
import ImageOverlay from "../../components/ImageOverlay";
import contractImage from "../../assets/images/contract.jpg";
import ImageModal from '../../components/ImageModal';

const AgreementView: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);
  return (
   
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-24 items-start lg:items-center">
     
      <div className="flex flex-col items-start justify-between gap-4 lg:gap-8">
        
        <ImageOverlay imageUrl={contractImage} />
      </div>


      <div className="flex flex-col gap-4 lg:gap-4">
        <h4 className="text-secondary-dark font-light text-md lg:text-lg">Contract Detail</h4>
        <div className="space-y-3 lg:space-y-2">
          <p className="text-gray-400">
            <span className="text-secondary-dark mr-3">Contract Period:</span>1 year
          </p>
          <p className="text-gray-400">
            <span className="text-secondary-dark mr-3">Contract Signed Date:</span>12/Jan/2024
          </p>
          <p className="text-gray-400">
            <span className="text-secondary-dark mr-3">Contract End Date:</span>12/Jan/2025
          </p>
          <p className="text-gray-400">
            <span className="text-secondary-dark mr-3">Payment Period:</span>Every 6 month
          </p>
        </div>
        <button onClick={handleOpenModal} className="bg-secondary text-white p-2 rounded-xl w-full lg:w-auto">
          View Agreement
        </button>
      </div>
      <ImageModal isOpen={isModalOpen} onClose={handleCloseModal}>
        <img src={contractImage} alt="Contract Agreement" className="max-w-full h-auto" />
      </ImageModal>
    </div>
  
  );
};

export default AgreementView;