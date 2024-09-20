import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

interface ColorDropdownProps {
  options: string[];
  onSelect: (option: string) => void;
}

const ColorDropdown: React.FC<ColorDropdownProps> = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const toggleDropdown = (event: React.MouseEvent) => {
    event.preventDefault();
    setIsOpen(!isOpen);
  };

  const selectOption = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option);
  };

  const getColorClass = (color: string | null) => {
    switch (color) {
      case 'red':
        return 'bg-red-500';
      case 'blue':
        return 'bg-blue-500';
      case 'green':
        return 'bg-green-500';
      case 'yellow':
        return 'bg-yellow-500';
      case 'purple':
        return 'bg-purple-500';
      case 'gray':
        return 'bg-gray-500';
      default:
        return 'bg-gray-300'; // Default color when no option is selected
    }
  };

  return (
    <div className="relative w-full">
      <button
        className={`w-full bg-white border ${
          isOpen ? 'border-primary-dark' : 'border-gray-300'
        } text-gray-400 py-2 px-4 flex items-center justify-between focus:outline-none rounded-md`}
        onClick={toggleDropdown}
      >
        <span>{selectedOption ? selectedOption : 'Choose Color'}</span>
        <div className="flex justify-between items-center gap-2">
          <div className={`w-4 h-4 rounded-full ${selectedOption ? 'bg-'+selectedOption+'-500' : selectedOption==='white' ? 'bg-pink-500 border border-primary-dark' : 'bg-gray-300'}`}></div>
          <FontAwesomeIcon icon={faChevronDown} />
        </div>
      </button>
      {isOpen && (
        <ul className="absolute left-0 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
          {options.map((option) => (
            <li
              key={option}
              className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                selectedOption === option ? 'bg-primary-light' : ''
              }`}
              onClick={() => selectOption(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ColorDropdown;
