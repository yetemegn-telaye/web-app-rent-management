import React from 'react';
import Dropdown from './Dropdown';


const OptionsSection: React.FC = () => {
  return (
    <div className="flex space-x-0 items-center justify-start mb-7">
        <button className="bg-primary-dark  text-white py-2 px-4 flex items-center justify-between focus:outline-none">
            Set Open House Date
        </button>
        <button className="bg-white text-secondary-dark py-2 px-4 flex items-center justify-between focus:outline-none">
            View Manager
        </button>
        <button className="bg-white text-secondary-dark py-2 px-4 flex items-center justify-between focus:outline-none">
            Document
        </button>
    </div>
  );
};

export default OptionsSection;
