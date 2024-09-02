import React from 'react';
import Dropdown from './Dropdown';


const FilterSection: React.FC = () => {
  return (
    <div className="flex space-x-4 items-center justify-center my-8">
      <Dropdown label="Area Sq ft." options={['50 sq ft', '100 sq ft', '200 sq ft','none']} />
      <Dropdown label="Floor" options={['1st', '2nd', '3rd','none']} />
      <Dropdown label="Type" options={['Office', 'Commercial','none']} />
      <Dropdown label="Price" options={['25,000 - 33,000 ETB', '33,000 - 40,000 ETB','none']} />
    </div>
  );
};

export default FilterSection;
