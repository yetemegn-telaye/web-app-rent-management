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
    <div className="flex flex-wrap gap-4 justify-center my-8">
    <div className="w-full sm:w-auto">
        <Dropdown label="Area Sq ft." options={areaOptions} onSelect={handleSelectArea} />
    </div>
    <div className="w-full sm:w-auto">
        <Dropdown label="Floor" options={floorOptions} onSelect={handleSelectFloor} />
    </div>
    <div className="w-full sm:w-auto">
        <Dropdown label="Type" options={typeOptions} onSelect={handleSelectType} />
    </div>
    <div className="w-full sm:w-auto">
        <Dropdown label="Price" options={priceOptions} onSelect={handleSelectPrice} />
    </div>
</div>

  );
};

export default FilterSection;
