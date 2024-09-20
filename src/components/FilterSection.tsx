import React, { useState } from 'react';
import Dropdown from './Dropdown';


const FilterSection: React.FC = () => {
  const areaOptions = ['50 sq ft', '100 sq ft', '200 sq ft','none'];
  const floorOptions = ['1st', '2nd', '3rd','none'];
  const typeOptions = ['Office', 'Commercial','none'];
  const priceOptions = ['25,000 - 33,000 ETB', '33,000 - 40,000 ETB','none'];
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [selectedFloor, setSelectedFloor] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);

  const handleSelectArea = (option: string) => {
    setSelectedArea(option);
  }
  const handleSelectFloor = (option: string) => {
    setSelectedFloor(option);
  }
  const handleSelectType = (option: string) => {
    setSelectedType(option);
  }
  const handleSelectPrice = (option: string) => {
    setSelectedPrice(option);
  }

  return (
    <div className="flex space-x-4 items-center justify-center my-8">
      <Dropdown label="Area Sq ft." options={areaOptions}  onSelect={handleSelectArea} />
      <Dropdown label="Floor" options={floorOptions} onSelect={handleSelectFloor} />
      <Dropdown label="Type" options={typeOptions} onSelect={handleSelectType} />
      <Dropdown label="Price" options={priceOptions} onSelect={handleSelectPrice} />
    </div>
  );
};

export default FilterSection;
